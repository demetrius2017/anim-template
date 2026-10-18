# озвучка: build/script.json -> audio/voice_<голос>.wav + build/words.json (время каждого слова, цвет из разметки)
# разметка в тексте: *слово* — выделенное (жёлтое; в look night/mono — белое с красным свечением), ~слово~ — красное.
# pause — пауза после фразы, с. voice — голос из VOICES (по умолчанию narr).
# ударение: знак U+0301 сразу после ударной гласной (за́мок) — уходит в edge-tts как есть, из субтитров вырезается.
#   ставить только там, где на слух диктор ошибся; иначе лучше заменить слово.
import asyncio, json, re, subprocess, pathlib, os
import edge_tts

ROOT = pathlib.Path(__file__).parent
WORK = pathlib.Path(os.environ.get("WORK", ROOT / "eps" / "example")).resolve()   # папка ролика: build/ audio/ frames/
VOICES = {  # голос: (модель edge-tts, темп, высота). Список моделей: edge-tts --list-voices | grep ru-RU
    "narr": ("ru-RU-DmitryNeural", "+22%", "-6Hz"),     # рассказчик
    "pa": ("ru-RU-SvetlanaNeural", "+0%", "-4Hz"),      # громкая связь / объявление (фильтр — в mix.py ролика)
    "tema": ("ru-RU-DmitryNeural", "+2%", "+28Hz"),     # парень из телефона
    "boy": ("ru-RU-DmitryNeural", "+10%", "+48Hz"),     # мальчик отвечает издалека
    "kol": ("ru-RU-SvetlanaNeural", "+6%", "+18Hz"),    # «устройство» (колонка, автоответчик); обработка «маленький динамик» — в mix.py ролика
    "rec": ("ru-RU-SvetlanaNeural", "-12%", "-14Hz"),   # тихий голос из записи / шёпот
}
# Поставщик голоса ролика: eps/<имя>/tts.json {"provider": "openai", "model": ..., "voices": {"narr": {"voice", "instructions", "speed"}}}
# (OpenAI — tts_openai.py, ключ OPENAI_API_KEY). Без файла — edge-tts. Настройки попадают в VOICES, а значит и в tts_manifest.
TTS_CFG = json.loads((WORK / "tts.json").read_text()) if (WORK / "tts.json").exists() else {"provider": "edge"}
if TTS_CFG.get("provider") == "openai":
    import hashlib
    for _k, _v in TTS_CFG["voices"].items():
        VOICES[_k] = (f"openai:{TTS_CFG.get('model', 'gpt-4o-mini-tts')}:{_v['voice']}", f"speed:{_v.get('speed', 1)}",
                      "instr:" + hashlib.sha256(_v.get("instructions", "").encode()).hexdigest()[:12])
SR = 48000
STRESS = "\u0301"


def clean(s):
    return s.replace("*", "").replace("~", "")


def tokens(s):
    """слова для субтитров с цветом из разметки: *жёлтое* ~красное~ (знаки препинания после маркера можно)"""
    out = []
    for raw in s.split():
        c = "y" if "*" in raw else ("r" if "~" in raw else "")
        out.append({"w": raw.replace("*", "").replace("~", "").replace(STRESS, ""), "c": c})
    return out


def norm(w):
    return re.sub(r"[^\wёЁ]", "", w.lower().replace(STRESS, ""))


async def synth(text, path, voice="narr", *, rate=None, pitch=None):
    if TTS_CFG.get("provider") == "openai" and voice in TTS_CFG["voices"]:
        import tts_openai
        cfg = {"model": TTS_CFG.get("model", "gpt-4o-mini-tts"), **TTS_CFG["voices"][voice]}
        return await asyncio.to_thread(tts_openai.synth, text, path, cfg)
    for attempt in range(4):          # сервис иногда отвечает пустым потоком — повторяем
        try:
            return await _synth(text, path, voice, rate=rate, pitch=pitch)
        except edge_tts.exceptions.NoAudioReceived:
            await asyncio.sleep(1.5 * (attempt + 1))
    return await _synth(text, path, voice, rate=rate, pitch=pitch)


async def _synth(text, path, voice="narr", *, rate=None, pitch=None):
    v, default_rate, default_pitch = VOICES[voice]
    com = edge_tts.Communicate(text, v, rate=rate or default_rate, pitch=pitch or default_pitch, boundary="WordBoundary")
    bounds = []
    with open(path, "wb") as f:
        async for ch in com.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                bounds.append((ch["offset"] / 1e7, (ch["offset"] + ch["duration"]) / 1e7, ch["text"]))
    return bounds


def dur(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                                capture_output=True, text=True).stdout)


def align_report(toks, bounds):
    """сопоставить слова субтитров с границами TTS по порядку"""
    res, report, j = [], [], 0
    for tk in toks:
        n = norm(tk["w"])
        if not n:                      # тире и прочие знаки: своей границы у TTS нет, время возьмём у соседа
            res.append(None)
            report.append({"status": "punctuation", "source_index": None})
            continue
        hit = None
        status = "missing"
        for k in range(j, min(j + 4, len(bounds))):
            if n and (norm(bounds[k][2]) == n or n.startswith(norm(bounds[k][2])) or norm(bounds[k][2]).startswith(n)):
                hit = k
                status = "exact" if norm(bounds[k][2]) == n else "prefix"
                break
        if hit is None and j < len(bounds):
            hit = j
            status = "fallback"
        if hit is not None:
            res.append((bounds[hit][0], bounds[hit][1]))
            j = hit + 1
        else:
            res.append(None)
        report.append({"status": status, "source_index": hit})
    # дыры — интерполяцией
    for i, r in enumerate(res):
        if r is None:
            prev = next((res[k] for k in range(i - 1, -1, -1) if res[k]), (0, 0))
            # Пунктуация не звучит: нельзя придумывать ей четверть секунды поверх следующего слова.
            res[i] = (prev[1], prev[1])
    return res, report


def align(toks, bounds):
    """Совместимый интерфейс; подробная диагностика доступна через align_report."""
    return align_report(toks, bounds)[0]


def sample(seconds):
    """Единая сетка монтажа: ближайший отсчёт 48 кГц, половина вверх."""
    return int(float(seconds) * SR + 0.5)


def phrase_segments(ph):
    """Текст старой фразы — один сегмент; spans задают настоящие речевые швы.

    emphasis — сознательно более размеренный темп (+0%), не SSML-эмоция.
    focus — смысловая метка для титров/раскадровки, не изменение голоса.
    """
    spans = ph.get("spans")
    source = spans if spans is not None else [{"text": ph["text"]}]
    for span in source:
        emphasis = span.get("emphasis", ph.get("emphasis", False))
        yield {
            **span,
            "emphasis": emphasis,
            "focus": span.get("focus", ph.get("focus")),
            "pause_after": span.get("pause_after", 0),
            "rate": span.get("rate", ph.get("rate", "+0%" if emphasis else None)),
            "pitch": span.get("pitch", ph.get("pitch")),
        }


async def main():
    from engine_contracts import validate_script, write_tts_manifest
    import numpy as np

    sc = json.loads((WORK / "build" / "script.json").read_text())
    validate_script(sc, VOICES)
    (WORK / "audio").mkdir(exist_ok=True)
    words, parts, cursor = [], [], sample(sc.get("lead", 0.35))
    phrases_out, source_boundaries, alignment = [], [], []
    for i, ph in enumerate(sc["phrases"]):
        vc = ph.get("voice", "narr")
        phrase_id, phrase_start, token_index = ph.get("id", str(i)), cursor, 0
        segments_out = []
        for si, segment in enumerate(phrase_segments(ph)):
            # Сохраняем привычные имена файлов для старого формата.
            suffix = f"_{si:02d}" if "spans" in ph else ""
            path = WORK / "audio" / f"vo_{i:02d}{suffix}.mp3"
            bounds = await synth(clean(segment["text"]), path, vc,
                                 rate=segment["rate"], pitch=segment["pitch"])
            raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                                 capture_output=True, check=True).stdout
            decoded = np.frombuffer(raw, np.float32)
            # Обрезаем и считаем длительность по реальным PCM-отсчётам, а не MP3 container duration.
            cut0 = min(len(decoded), max(0, sample(bounds[0][0] - 0.04))) if bounds else 0
            cut1 = min(len(decoded), sample(bounds[-1][1] + 0.12)) if bounds else len(decoded)
            if cut1 <= cut0:
                raise ValueError(f"Пустой TTS-сегмент {phrase_id}/{si}")
            clip = decoded[cut0:cut1].copy()
            fade = min(sample(0.04), len(clip))
            clip[-fade:] *= np.linspace(1, 0, fade)
            toks = tokens(segment["text"])
            times, evidence = align_report(toks, bounds)
            if any(item["status"] == "missing" for item in evidence):
                raise ValueError(f"Потеря токенов TTS в {phrase_id}/{si}; проверьте границы речи")
            if (segment["emphasis"] or segment["focus"] or "token_id" in segment) and any(
                    item["status"] == "fallback" for item in evidence):
                raise ValueError(f"Неоднозначное выравнивание ключевого токена TTS в {phrase_id}/{si}")
            segment_end = cursor + len(clip)
            pause_samples = sample(segment["pause_after"])
            for ti, (tk, (a, b), record) in enumerate(zip(toks, times, evidence)):
                token_id = segment.get("token_id", f"{phrase_id}.{token_index}")
                start = cursor + min(len(clip), max(0, sample(a) - cut0))
                end = cursor + min(len(clip), max(0, sample(b) - cut0))
                words.append({**tk, "t0": start / SR, "t1": end / SR,
                              "t0_sample": start, "t1_sample": end, "ph": i,
                              "token_id": token_id, "segment": si,
                              "emphasis": segment["emphasis"], "focus": segment["focus"],
                              "pause_after": pause_samples / SR if ti == len(toks) - 1 else 0})
                if ti == len(toks) - 1:
                    words[-1].update(pause_t0=segment_end / SR, pause_t1=(segment_end + pause_samples) / SR)
                alignment.append({"token_id": token_id, "ph": i, "segment": si, **record})
                token_index += 1
            source_boundaries.append({"ph": i, "segment": si, "file": path.name,
                                      "cut0_sample": cut0, "cut1_sample": cut1,
                                      "rate": segment["rate"] or VOICES[vc][1],
                                      "pitch": segment["pitch"] or VOICES[vc][2],
                                      "boundaries": [{"t0": a, "t1": b, "text": text} for a, b, text in bounds]})
            segments_out.append({"i": si, "t0": cursor / SR, "t1": segment_end / SR,
                                 "t0_sample": cursor, "t1_sample": segment_end,
                                 "pause_after": pause_samples / SR,
                                 "pause_t0": segment_end / SR, "pause_t1": (segment_end + pause_samples) / SR,
                                 "emphasis": segment["emphasis"], "focus": segment["focus"]})
            parts.append((clip, cursor, vc))
            cursor = segment_end + pause_samples
        pause_samples = sample(ph.get("pause_after", ph.get("pause", 0.12)))
        words[-1]["pause_after"] += pause_samples / SR
        words[-1]["pause_t1"] = (cursor + pause_samples) / SR
        phrases_out.append({"i": i, "id": phrase_id, "voice": vc,
                            "t0": phrase_start / SR, "t1": cursor / SR,
                            "t0_sample": phrase_start, "t1_sample": cursor,
                            "pause_after": pause_samples / SR, "pause_t0": cursor / SR,
                            "pause_t1": (cursor + pause_samples) / SR,
                            "emphasis": ph.get("emphasis", False), "focus": ph.get("focus"),
                            "segments": segments_out})
        cursor += pause_samples
    t_end_voice = cursor + sample(sc.get("tail", 0.5))
    total = t_end_voice + sample(sc.get("end_card", {}).get("dur", 0))
    # склейка: отдельная дорожка на каждый голос — в numpy, каждый кусок ровно на своё место
    for vc in VOICES:
        mine = [(clip, at) for clip, at, v in parts if v == vc]
        if not mine:
            continue
        track = np.zeros(total, np.float32)
        for clip, at in mine:
            track[at: at + len(clip)] += clip
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                        str(WORK / "audio" / f"voice_{vc}.wav")], input=track.tobytes(), check=True)
    (WORK / "build" / "words.json").write_text(json.dumps({"words": words, "phrases": phrases_out,
                                                          "voice_end": t_end_voice / SR, "duration": total / SR,
                                                          "sample_rate": SR, "duration_samples": total,
                                                          "source_boundaries": source_boundaries, "alignment": alignment},
                                                          ensure_ascii=False, indent=1))
    write_tts_manifest(WORK, VOICES, expected_script=sc)
    n = len(words)
    print(f"озвучка {total / SR:.1f} с, {n} слов, {n / (total / SR / 60):.0f} слов/мин")


if __name__ == "__main__":
    asyncio.run(main())
