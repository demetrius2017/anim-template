"""Озвучка через OpenAI: gpt-4o-mini-tts + границы слов из whisper-1, сшитые со словами сценария.

Назначение: замена edge-tts для ролика, у которого в eps/<имя>/tts.json стоит "provider": "openai".
Контракт: synth(text, path, cfg) пишет mp3 в path и возвращает [(t0, t1, слово сценария)] — по одной границе
на каждое звучащее слово текста, по порядку (как WordBoundary у edge-tts), времена в секундах от начала файла.
  cfg = {"model": "gpt-4o-mini-tts", "voice": "onyx", "instructions": "...", "speed": 1.0, "language": "ru"}
Выравнивание: распознанные слова сопоставляются со словами сценария по основе (первые 5 букв, difflib);
числа и прочие несовпадения получают время своего участка пропорционально длине слова.
Начало первого и конец последнего слова — по энергии сигнала (чтобы не срезать хвосты).
ENV: OPENAI_API_KEY. Ограничения: знак ударения U+0301 в синтез не передаётся (модель ставит ударения сама);
стоимость — около $0.015 за минуту речи плюс $0.006 за минуту распознавания.
"""
import difflib
import re
import subprocess

import numpy as np
from openai import OpenAI

STRESS = "́"


def norm(w):
    return re.sub(r"[^\wёЁ]", "", w.lower().replace(STRESS, ""))


def speech_bounds(path, sr=16000):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "1", "-ar", str(sr), "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32)
    hop = sr // 100
    e = np.sqrt(np.array([np.mean(x[i:i + hop] ** 2) for i in range(0, max(1, len(x) - hop), hop)]) + 1e-12)
    on = np.flatnonzero(e > max(e.max() * 0.03, 1e-4))
    if not len(on):
        return 0.0, len(x) / sr
    return max(0.0, on[0] / 100 - 0.02), min(len(x) / sr, (on[-1] + 1) / 100 + 0.06)


def align_tokens(text, heard, onset, offset):
    """heard: [(start, end, слово)] из распознавания -> [(t0, t1, слово сценария)] для слов с буквами/цифрами."""
    toks = [w for w in text.split() if norm(w)]
    key = lambda w: norm(w)[:5]
    sm = difflib.SequenceMatcher(None, [key(t) for t in toks], [key(h[2]) for h in heard], autojunk=False)
    times, src = [None] * len(toks), [None] * len(toks)
    for a, b, n in sm.get_matching_blocks():
        for k in range(n):
            times[a + k] = (heard[b + k][0], heard[b + k][1])
            src[a + k] = b + k
    i = 0
    while i < len(toks):
        if times[i] is not None:
            i += 1
            continue
        j = i
        while j < len(toks) and times[j] is None:
            j += 1
        left = times[i - 1][1] if i else onset
        right = times[j][0] if j < len(toks) else offset
        hl = src[i - 1] + 1 if i else 0                       # нераспознанные слова между якорями — их участок точнее
        hr = src[j] - 1 if j < len(toks) else len(heard) - 1
        if hl <= hr:
            left, right = max(left, heard[hl][0]), min(right, heard[hr][1])
        right = max(right, left + 0.05 * (j - i))
        w = np.array([len(norm(t)) + 1 for t in toks[i:j]], float)
        edges = left + (right - left) * np.concatenate([[0], np.cumsum(w) / w.sum()])
        for k in range(i, j):
            times[k] = (edges[k - i], edges[k - i + 1])
        i = j
    out, last = [], 0.0
    for k, (t0, t1) in enumerate(times):
        t0 = max(t0, last)
        t1 = max(t1, t0 + 0.02)
        out.append([t0, t1, toks[k]])
        last = t0
    if out:
        out[0][0] = min(out[0][0], onset)
        out[-1][1] = max(out[-1][1], offset)
    return [tuple(o) for o in out]


def synth(text, path, cfg):
    client = OpenAI()
    plain = text.replace(STRESS, "")
    kw = {"instructions": cfg["instructions"]} if cfg.get("instructions") else {}
    if cfg.get("speed") and cfg["speed"] != 1:
        kw["speed"] = cfg["speed"]
    audio = client.audio.speech.create(model=cfg.get("model", "gpt-4o-mini-tts"), voice=cfg["voice"], input=plain,
                                       response_format="mp3", **kw)
    audio.write_to_file(str(path))
    with open(path, "rb") as f:
        tr = client.audio.transcriptions.create(file=f, model="whisper-1", language=cfg.get("language", "ru"), response_format="verbose_json",
                                                timestamp_granularities=["word"], prompt=plain)
    heard = [(w.start, w.end, w.word) for w in (tr.words or [])]
    onset, offset = speech_bounds(path)
    return align_tokens(plain, heard, onset, offset)
