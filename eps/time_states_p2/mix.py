"""Voice + SFX, no music (owner 03.11: «давай уберём музыку но добавим sfx»; music samples rejected: «нет музыка не та вся»).

The sounds are files in audio/sfx/<kind>.wav (48 kHz mono), made by the studio sound engineer: Stable Audio 3 Small-SFX on
tesla ($0; DECISIONS 27.10) and, for soft foley SA3 renders as synthesis (pen writing, knife notch), ElevenLabs SFX v2
via lab/ws.py. Provenance, prompts, seeds, measurements and the CLAP check of every file — audio/sfx/kit.json; the
workshop (all takes, sheets, CLAP) — serial-studio/lab/out/time_states_sfx/ (kit.py). Code here only arranges the files:
tick-tock and two tempos from two recorded ticks, the boom with a rising air lead-in and phone harmonics (150–1500 Hz,
soft saturation: a phone speaker plays nothing under ~200 Hz), small pitch/level variation on repeats.

Times come from the measured words (build/words.json) and the picture (build/story.json: shots, overlays); the scenes
key their visual events on the same words (engine/scenes/ts_*.js), so a word anchor is a picture anchor.
Placement (prompts/sfx.md §3–4): an event moves into the nearest pause (window ±0.8 s, key events ±1.2 s) and sounds
there at −9…−15 dB to the voice; a key event with no pause near stays under the speech at −20 dB; a minor one is
dropped; one event at a time (≥ 1.1 s apart); quiet zones before turns («А почему?», «Не прочли», «Проверь её…»).
A missing kit file stops the mix (no silent stand-ins).
Writes audio/mix.wav (−14 LUFS, TP ≤ −1), build/sfx_events.json and sfx_map.md (timecodes, source, level, overlap, check).
The old music mix is mix_music_v20.py (not used).
"""
from pathlib import Path
import json
import re
import subprocess
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import numpy as np
from mixlib import Mix, SR, db, bp, hp, load
from audio_report import measure_audio, write_audio_report

M = Mix(work=Path(__file__).resolve().parent)
RNG = np.random.default_rng(35)
KIT_DIR = M.work / "audio/sfx"
KIT_MAN = json.loads((KIT_DIR / "kit.json").read_text())["kit"]

# ---------------------------------------------------------------- words, phrases, speech
GROUP = {}
for _pid in M.PH:
    GROUP.setdefault(re.sub(r"_\d+$", "", _pid), []).append(_pid)
WORDS = M.WJ["words"]
bare = lambda w: w.lower().strip("«».,!?:;—…\"")


def word(pid, stem, n=0, end=False):
    """Start (or end) of the n-th word of a line (or of its group) that starts with stem; None if absent."""
    ids = set(GROUP.get(pid, [pid] if pid in M.PH else []))
    ii = {M.PH[p]["i"] for p in ids}
    ws = sorted((w for w in WORDS if w["ph"] in ii and bare(w["w"]).startswith(stem)), key=lambda w: w["t0"])
    return (ws[n]["t1"] if end else ws[n]["t0"]) if len(ws) > n else None


def T(pid):
    return M.PH[pid]["t0"] if pid in M.PH else None


def TE(pid):
    return M.PH[pid]["t1"] if pid in M.PH else None


SPEECH = []   # speech blocks: words merged across gaps shorter than 0.12 s
for w in sorted(WORDS, key=lambda w: w["t0"]):
    if SPEECH and w["t0"] - SPEECH[-1][1] < .12:
        SPEECH[-1][1] = max(SPEECH[-1][1], w["t1"])
    else:
        SPEECH.append([w["t0"], w["t1"]])


def overlaps(a, b, margin=0.0):
    return any(s < b + margin and a - margin < e for s, e in SPEECH)


# ---------------------------------------------------------------- the kit: recorded files, arranged here
_cache = {}


def f(kind):
    """A kit file, peak 1. Missing → stop: no silent stand-ins."""
    if kind not in _cache:
        p = KIT_DIR / f"{kind}.wav"
        if not p.exists():
            raise SystemExit(f"нет звука {p} — набор: serial-studio/lab/out/time_states_sfx/kit.py install")
        x = load(p)
        _cache[kind] = x / (np.abs(x).max() + 1e-9)
    return _cache[kind].copy()


def pitch(x, st):
    """Resample by st semitones (shorter and higher for st > 0) — a tape-style shift for variation."""
    if not st:
        return x
    r = 2 ** (st / 12)
    n = max(8, int(len(x) / r))
    return np.interp(np.arange(n) * r, np.arange(len(x)), x).astype(np.float32)


def mixat(parts, d):
    out = np.zeros(int(d * SR), np.float32)
    for x, t0, g in parts:
        i = int(t0 * SR)
        n = min(len(x), len(out) - i)
        if n > 0:
            out[i:i + n] += x[:n] * g
    return out


def norm1(x):
    x = np.asarray(x, np.float32)
    k = min(len(x), int(.004 * SR))
    if k:
        x[-k:] *= np.linspace(1, 0, k)
    return x / (np.abs(x).max() + 1e-9)


def phone_lift(x, drive=5.0):
    """Harmonics of a low boom where a phone speaker plays (150–1500 Hz): soft saturation, band-passed, mixed under."""
    h = bp(np.tanh(drive * x / (np.abs(x).max() + 1e-9)), 150, 1500)
    return x + .6 * h / (np.abs(h).max() + 1e-9)


def k_ticktock():
    return norm1(mixat([(f("tick"), 0, 1), (pitch(f("tock"), -2.5), .36, .8)], .5))


def k_two_tempo():
    """Upper clock a little faster than the lower: two tick lines drifting apart (prompts/sfx.md §3)."""
    up = [(pitch(f("tick"), 1), i * .17, .9) for i in range(4)]
    lo = [(pitch(f("tock"), -3), .05 + i * .27, .75) for i in range(3)]
    return norm1(mixat(up + lo, .72))


def k_impact(small=False):
    hit = phone_lift(f("impact"))
    if small:
        return norm1(pitch(hit, 2)[: int(.9 * SR)])
    return norm1(hit)


PRE = {"impact": .55}   # a rising air lead-in before the hit (whoosh_c), when the pause allows


def lead_in(kind):
    if kind != "impact":
        return None
    w = f("whoosh_c")
    n = int(PRE[kind] * SR)
    w = w[-n:] if len(w) >= n else np.pad(w, (n - len(w), 0))
    return w * np.linspace(.2, 1, n) ** 1.5


_whoosh_n = [0]


def k_whoosh():
    _whoosh_n[0] += 1
    return f("whoosh" if _whoosh_n[0] % 2 else "whoosh_b")


KIT = {
    "tick": lambda: f("tick"), "ticktock": k_ticktock, "two_tempo": k_two_tempo, "clock_rewind": lambda: f("clock_rewind"),
    "stopwatch": lambda: f("stopwatch"), "pop": lambda: f("pop"), "click": lambda: f("click"), "ping": lambda: f("ping"),
    "nav": lambda: f("nav"), "error": lambda: f("error"), "saved": lambda: f("saved"), "power_down": lambda: f("power_down"),
    "led": lambda: f("led"), "accent": lambda: f("accent"), "whoosh": k_whoosh, "fall": lambda: f("fall"),
    "fall_soft": lambda: pitch(f("fall"), 1.5), "impact": k_impact, "impact_small": lambda: k_impact(True),
    "shutter": lambda: f("shutter"), "rewind": lambda: f("rewind"), "rot": lambda: f("rot"), "frost": lambda: f("frost"),
    "page": lambda: f("page"), "pen_write": lambda: f("pen_write"), "strike": lambda: f("pen_strike"),
    "notch": lambda: f("notch"), "spray": lambda: f("spray"), "ice": lambda: f("ice"), "net": lambda: f("net"),
}
FILES = {"ticktock": ["tick", "tock"], "two_tempo": ["tick", "tock"], "impact": ["impact", "whoosh_c"],
         "impact_small": ["impact"], "whoosh": ["whoosh", "whoosh_b"], "fall_soft": ["fall"], "strike": ["pen_strike"]}
# loudness in a pause, dB to the voice (peak 20 ms RMS of the sound vs the speech RMS); under speech it is UNDER
LEVEL = {"tick": -10, "ticktock": -10, "two_tempo": -11, "clock_rewind": -12, "stopwatch": -9, "pop": -12, "click": -14,
         "ping": -12, "nav": -10, "error": -11, "saved": -11, "power_down": -13, "led": -13, "accent": -10, "whoosh": -15,
         "fall": -12, "fall_soft": -15, "impact": -9, "impact_small": -12, "shutter": -10, "rewind": -13, "rot": -10,
         "frost": -12, "page": -11, "pen_write": -14, "strike": -11, "notch": -9, "spray": -12, "ice": -11, "net": -10}
# the loud part that must sit in a pause (default .12 s)
CORE = {"ticktock": .42, "two_tempo": .7, "led": .3, "accent": .3, "fall": .35, "fall_soft": .3, "rewind": .3,
        "clock_rewind": .35, "whoosh": .3, "strike": .25, "pen_write": .35, "saved": .3, "impact": .2, "ping": .15,
        "net": .08,
        "frost": .2, "ice": .2, "power_down": .25, "error": .26, "nav": .23}
UNDER = -20.0
WHAT = {   # what the listener should hear — for the map
    "tick": "щелчок часов", "ticktock": "тик-так (два записанных щелчка)", "two_tempo": "два темпа тиканья",
    "clock_rewind": "стрелки назад, трещотка", "stopwatch": "кнопка секундомера", "pop": "мягкий «плоп»",
    "click": "короткий щелчок", "ping": "звон бокала", "nav": "сигнал навигатора", "error": "зуммер ошибки",
    "saved": "сигнал «сохранение»", "power_down": "электроника гаснет", "led": "мигающие электронные тики",
    "accent": "удар поющей чаши", "whoosh": "мягкий воздух перехода", "fall": "свист падения",
    "fall_soft": "свист падения (тише, выше)", "impact": "мягкий низкий удар с подводкой воздуха",
    "impact_small": "малый низкий удар", "shutter": "затвор плёнки", "rewind": "перемотка плёнки", "rot": "глухой шлепок",
    "frost": "треск инея", "page": "перелист страницы", "pen_write": "росчерк ручки", "strike": "зачёркивание",
    "notch": "нож по дереву", "spray": "выдув краски", "ice": "треск льда", "net": "удар в сетку"}

# ---------------------------------------------------------------- the plan of this part
EVENTS = []   # (t, kind, label, priority, may_stay_under_speech, min gap, pitch st, pause search window s, only after)
QUIET = []    # (a, b): nothing here


MISSING = []  # planned events whose word anchor is not in this text (a text change): listed in the map


def ev(t, kind, label, pr=2, under=True, gap=1.1, st=0.0, win=None, after=False):
    if t is None:
        MISSING.append(f"{kind}: {label}")
    if t is not None:
        EVENTS.append((float(t), kind, label, pr, under, gap, st, win if win is not None else 1.2 if pr >= 3 else .8, after))


def cut(t, lead=.35):
    """A transition whoosh peaks on the cut: it starts lead seconds before."""
    return t - lead


part1, part2 = "h" in M.PH and "c4" in GROUP, "k1" in M.PH
SEAMS = {("ts_body", "hook", "promise"), ("ts_body", "promise", "height"), ("ts_body", "hook", "height"),
         ("ts_strip", "slices", "cold"), ("ts_earth", "gps", "blackhole")}   # continuous shots: no transition sound
shots = M.ST["shots"]
for a, b in zip(shots, shots[1:]):
    if (b["scene"], a["p"].get("mode"), b["p"].get("mode")) in SEAMS:
        continue
    ev(cut(b["t0"]), "whoosh", f"смена кадра → {b['scene']}/{b['p'].get('mode')}", 2)
# the author's thesis plates (03.11, 19:20 render) are read as the point of a scene: their pop may sit under the voice
# {start of text: (priority, pause window s, only after)}; «ОДНО ОТНОСИТЕЛЬНО ДРУГОГО» continues the first plate — no sound;
# 19:52 render: the author's plate «время — процесс трансформации…» comes with the black hole on «Пространства —», whose
# small boom marks both (a second sound there pushed the boom out and put a pop under the voice)
THESIS = {"ВРЕМЯ = ПЕРЕМЕНЫ": (3, .4, False, 1.1),
          "ЧАСТЬ 1 →": (3, .4, False, .9)}   # 22:31 render: the big call to action of part 2, 1.1 s after the tick-tock
for o in M.ST.get("overlays", []):
    if o.get("t0", 0) > .5:
        txt = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", o.get("text", ""))).strip().replace("&amp;", "&")
        src = txt.startswith("ИСТОЧНИК")
        key = next((v for k, v in THESIS.items() if txt.startswith(k)), None)
        ev(o["t0"] + .05, "click" if src else "pop", ("строка " if src else "плашка: " if key else "подпись: ") + txt[:44],
           key[0] if key else 1, win=key[1] if key else None, after=key[2] if key else False, gap=key[3] if key else 1.1)

if part1:
    # text v43 (03.11, 21:14): blocks re-ordered, the ending is about memory; picture — render 21:19
    # hook: the clocks at the head and the feet; the tower in Tokyo
    ev(TE("h"), "ticktock", "часы у головы и ног: тик-так", 3)
    ev(TE("h2") - .1, "whoosh", "часы уходят к подножию, растёт телебашня", 2)
    ev(word("h3_2", "четыр"), "ping", "«+4 НС / СУТКИ»", 3)
    ev(TE("h3_2"), "two_tempo", "верхние часы обгоняют нижние: два темпа", 3)
    for n, (stem, lab) in enumerate((("часов", "ЧАСЫ"), ("клеток", "КЛЕТКИ"), ("тебя", "ТЫ"))):   # icons one by one
        ev(word("h4", stem, end=True), "pop", f"значок {lab} (ЧАСЫ · КЛЕТКИ · ТЫ)", 3, under=False, gap=.7, st=1.5 * n)
    ev(TE("h4_2"), "ping", "«< 1 МИКРОСЕКУНДЫ ЗА ЖИЗНЬ»", 3)
    # what do clocks measure: the ruler, PEOPLE → HAND, UNIVERSE → ?
    ev(TE("t1"), "pop", "«?» между разошедшимися часами", 2)
    ev(word("t1_2", "учебник"), "click", "шкала-«линейка» с человеком", 2)
    ev(word("t2", "люди", end=True), "pop", "ЛЮДИ → СТРЕЛКА", 2)
    ev(TE("t2"), "pop", "ВСЕЛЕННАЯ → ?", 2, st=1.5)
    ev(word("t2_2", "сами"), "ping", "большой «?» из звёзд: «Может — сами перемены?»", 2)
    # the apple and the clock
    ev(word("a1", "стрелк"), "tick", "стрелка делает шаг", 3)
    ev(word("a5", "философ"), "pop", "НЬЮТОН ↔ ФИЛОСОФ ЛЕЙБНИЦ", 2)
    ev(TE("a5"), "pop", "плашка НЕТ СОБЫТИЙ — НЕТ ВРЕМЕНИ", 3, under=False)
    for k in range(3):
        ev(word("b1", "кадр", k, end=True), "shutter", f"кадр плёнки {k + 1}", 3)
    ev(word("b1", "сгнил", end=True), "rot", "«сгнило»", 3, gap=.3)
    # the cut to the cold film (T(c1) − 0.05) comes right after «сгнило»: the frost sits in that pause, not under «в холод»
    ev(T("c1") - .3 if "c1" in M.PH else None, "frost", "яблоко в холод: иней (смена на плёнку холода)", 3, gap=.3)
    ev(TE("c1"), "ticktock", "«Холод не трогает часы»: часы идут как шли", 3)
    ev(word("c1_2", "медленн", end=True), "pop", "В ХОЛОДЕ · МЕДЛЕННО / В ТЕПЛЕ · БЫСТРО", 2)
    ev(word("c1b", "гравитац") - .3 if word("c1b", "гравитац") else None, "impact", "ГРАВИТАЦИЯ: кольца поля сходятся", 4)
    ev(word("c3", "спутник"), "nav", "спутник навигации", 3)
    ev(word("c3", "туда", end=True), "error", "«завёл бы не туда»: КИЛОМЕТРЫ", 3)
    ev(word("c4", "эйнштейн", end=True), "page", "книга ТЕОРИЯ ОТНОСИТЕЛЬНОСТИ 1915 раскрывается", 3)
    ev(word("c4", "чёрн") or word("c4", "черн"), "impact", "чёрная дыра появляется (ВДАЛИ / У ДЫРЫ)", 4)
    ev(word("c4_4", "гниёт", end=True) or word("c4_4", "гниет", end=True), "rot", "МОЛЕКУЛЫ: яблоко буреет", 3)
    ev(TE("c4_4"), "impact_small", "ПРОСТРАНСТВО искривляется у чёрной дыры", 3)
    ev(TE("c4_5"), "pop", "ОТНОСИТЕЛЬНО", 2)
    pq = word("c4", "почему")
    if pq is not None and "c4_3" in M.PH:
        QUIET.append((pq - .7, T("c4_3") - .1))   # «А почему?» — the turn: silence before and after
    # the ending (v43): «?» from the heroes, the head with MEMORY, the apple film flies in, frames go out, the film stretches
    ev(word("q0", "мира", end=True), "pop", "«?» собирается из часов, яблока и дыры", 3)
    ev(word("q1", "нет", end=True), "ping", "голова: загорается ПАМЯТЬ", 3)
    ev(word("q1_2", "яблок", end=True), "shutter", "кадры плёнки яблока у головы", 3, gap=.9)
    ev(word("q1_2", "нет", 0, end=True), "power_down", "плёнка влетела — «Нет кадров»: кадры гаснут", 3, gap=.9)
    # 22:31 render: on «Больше кадров» the film and ВРЕМЯ ТЯНЕТСЯ come back at once — a shutter in the pause before it
    ev(word("q1_2", "больше"), "shutter", "«Больше кадров»: кадры возвращаются", 3, gap=.9, win=.4)
    ev(TE("q1_2"), "rewind", "«Больше кадров»: плёнка растягивается — ВРЕМЯ ТЯНЕТСЯ", 3)
    ev(word("q1_3", "тридцат"), "fall", "превью части 2: падение спиной с вышки", 3)
    ev(word("q1_3", "сетк", end=True), "net", "приземление в сетку", 3, under=False)
    last = max(M.PH, key=lambda k: M.PH[k]["t1"])   # the card «ЧАСТЬ 2 — В ПРОФИЛЕ» closes on the last word
    ev(TE(last) + .03, "accent", "ЧАСТЬ 2 — В ПРОФИЛЕ КАНАЛА: финальный акцент", 5, under=False)
elif part2:
    # 21:19 render: the cut to the stick moved to «Но» (4.6 s) — no room for its whoosh; the hook's film of the day gets a shutter
    ev(TE("k1"), "shutter", "плёнка дня: пустой кадр «?» / ВЧЕРА", 3, under=False)
    ev(TE("k2"), "pop", "«?» у головы: откуда ты знаешь", 2)
    ev(word("r1", "зарубк"), "notch", "зарубка на палке", 3)
    ev(word("r1", "одна", end=True), "notch", "завтра — вторая зарубка", 3)
    ev(TE("r1_2"), "pop", "ВЧЕРА / СЕГОДНЯ", 1)
    ev(word("r2b", "ладон"), "spray", "ладонь обводят краской", 3)
    ev(TE("r2b"), "ping", "ПОЧТИ 70 000 ЛЕТ", 2)
    ev(word("r2", "лёд") or word("r2", "лед"), "ice", "лёд Антарктиды: слой за слоем", 3)
    ev(TE("f1"), "rewind", "память: кадры влетают в голову", 3)
    ev(word("f2_2", "годам"), "pen_write", "дневник: «я только что проснулся»", 3)
    ev(TE("f2_2"), "strike", "зачёркнута прежняя запись", 3)
    ev(word("g2_2", "спиной"), "fall", "падение спиной с 31 м", 3)
    ev(TE("g2_2"), "net", "приземление в сетку", 3)
    ev(word("g2_3", "друг", end=True), "fall_soft", "смотрит, как падает другой (ЧУЖОЕ)", 3)
    ev(TE("g2_3"), "net", "падал сам (СВОЁ)", 2)
    ev(word("g2_4", "глаз", end=True), "stopwatch", "секундомер: старт", 3)
    ev(word("g2_4", "секундомер", end=True), "stopwatch", "секундомер: стоп", 3)
    ev(TE("g2_4"), "ping", "+1/3: своё длиннее", 2)
    ev(word("g3", "прочест", end=True) or word("g3", "мигал"), "led", "экранчик: цифры мигают", 3)
    if "g3_2" in M.PH:
        QUIET.append((T("g3_2") - .5, TE("g3_2") + .5))                     # «Не прочли» — silence
    ev(word("g3_3", "растянул"), "rewind", "память пишет подробнее: плёнка густеет", 3)
    ev(word("r4", "нечем", end=True), "power_down", "носители гаснут", 3)
    for st, kind, lab in (("прошл", "pop", "ПРОШЛОЕ ← ПАМЯТЬ"), ("будущ", "pop", "БУДУЩЕЕ ↔ ОЖИДАНИЕ"),
                          ("сейчас", "ping", "светящаяся точка СЕЙЧАС")):
        ev(word("p1", st) - .3 if word("p1", st) else None, kind, f"Августин: {lab}", 2)
    ev(word("e1_2", "сохранен", end=True), "saved", "игра: сохранение загружено", 3)
    ev(TE("e1_3"), "clock_rewind", "часы назад переведёшь — вчера не вернёшь", 3)
    ev(word("z1", "лёд") or word("z1", "лед"), "ice", "СЛЕДЫ ПЕРЕМЕН: ЛЁД", 2)
    ev(TE("z5"), "shutter", "кадры памяти вокруг человека", 2)
    ev(TE("z3"), "pop", "ЯРКАЯ ЖИЗНЬ длиннее", 2)
    ev(T("z5_2"), "accent", "ПОЧЕМУ — ЧАСТЬ 1 В ПРОФИЛЕ", 5, under=False)
    ev(word("z5_2", "атомн"), "ticktock", "часы головы и ног", 3)
    if "z4" in M.PH:
        QUIET.append((T("z4") - .6, TE("z4_3") + .5 if "z4_3" in M.PH else TE("z4") + 1))   # «Проверь её: вспомни вчера…»


# ---------------------------------------------------------------- placement
def free(s, kind, pre=0.0):
    core = CORE.get(kind, .12)
    return 0 <= s - pre and s <= M.DUR - core and not overlaps(s - pre, s + core, .03)


def place(t, kind, window, after=False):
    for k in range(int(window * 100) + 1):
        for s in ((t + k * .01,) if after else (t + k * .01, t - k * .01)):
            if free(s, kind):
                return s, True
    return t, False


placed = []
for t, kind, label, pr, under, gap, st, win, after in sorted(EVENTS, key=lambda e: (-e[3], e[0])):
    s, ok = place(t, kind, win, after)
    if not ok and (pr < 3 or not under):   # no pause near: a minor sound is dropped, a key one stays under the voice
        continue
    core = CORE.get(kind, .12)
    if any(a <= s + core and s <= b for a, b in QUIET):
        continue
    if any(abs(s - p["t"]) < min(gap, p["gap"]) for p in placed):     # one event at a time, about a second apart
        continue
    pre = PRE.get(kind, 0.0) if ok and free(s, kind, PRE.get(kind, 0.0)) else 0.0
    if pre and any(0 < p["t"] - (s - pre) < 1.1 and p["t"] < s for p in placed):
        pre = 0.0
    placed.append({"t": round(s, 3), "anchor": round(t, 3), "kind": kind, "label": label, "pause": ok,
                   "level_db": LEVEL[kind] if ok else UNDER, "lead_in_s": pre, "gap": gap, "st": st})
placed.sort(key=lambda p: p["t"])

fx = np.zeros(M.N, np.float32)
win = int(.02 * SR)
for i, p in enumerate(placed):
    x = KIT[p["kind"]]()
    if p["st"]:
        x = pitch(x, p["st"])
    elif sum(q["kind"] == p["kind"] for q in placed) > 1 and p["kind"] not in ("ticktock", "two_tempo", "impact"):
        x = pitch(x, float(RNG.uniform(-.4, .4)))        # repeats: a hair of pitch and level, not a copy-paste
        p["vary_db"] = round(float(RNG.uniform(-1, 1)), 2)
    pk = max(np.sqrt(np.mean(x[j:j + win] ** 2)) for j in range(0, max(1, len(x) - win), win // 2))
    hpf = 50 if p["kind"].startswith("impact") else 150
    g = M.R_NARR * db(p["level_db"] + p.get("vary_db", 0)) / (pk + 1e-9)
    M.put(hp(x, hpf) * g, p["t"], 1.0, dst=fx)
    if p["lead_in_s"]:
        li = lead_in(p["kind"])
        lpk = np.sqrt(np.mean(li[-win:] ** 2)) + 1e-9
        M.put(hp(li, 150) * (M.R_NARR * db(p["level_db"] - 6) / lpk), p["t"] - p["lead_in_s"], 1.0, dst=fx)

# ---------------------------------------------------------------- report: overlap with words, the map
over = [p for p in placed if overlaps(p["t"], p["t"] + CORE.get(p["kind"], .12))]
share = len(over) / max(1, len(placed))
(M.work / "build/sfx_events.json").write_text(json.dumps({"events": placed, "overlap_share": round(share, 3),
                                                         "overlap_n": len(over)}, ensure_ascii=False, indent=1) + "\n")
mmss = lambda s: f"{int(s // 60)}:{s % 60:04.1f}"


def src(kind):
    out = []
    for k in FILES.get(kind, [kind]):
        m = KIT_MAN.get(k, {})
        s = "SA3" if m.get("source") == "sa3" else "ElevenLabs" if m.get("source") == "elevenlabs" else "?"
        out.append(f"{k}.wav ({s} {m.get('cand', '').rsplit('_', 1)[-1]})")
    return ", ".join(out)


def check(kind):
    out = []
    for k in FILES.get(kind, [kind]):
        c = (KIT_MAN.get(k) or {}).get("clap") or {}
        if c.get("own_rank"):
            out.append(f"CLAP {c['own_rank']}-я ({c.get('margin'):+.2f})")
    return "; ".join(dict.fromkeys(out)) or "—"


n_pause = sum(p["pause"] for p in placed)
lines = [f"# SFX — {M.work.name} (без музыки)", "",
         f"Событий: {len(placed)} (в паузах {n_pause}, под речью {len(placed) - n_pause}); перекрывают слова: {len(over)} "
         f"({share:.0%}, цель < 10%). Музыки и подложки нет.", "",
         "Звуки — записи моделей, не синтез кодом: Stable Audio 3 Small-SFX на tesla ($0) и ElevenLabs SFX v2 (мягкое фоли: "
         "росчерк ручки, нож по дереву). Код только раскладывает файлы: тик-так и два темпа — из двух записанных щелчков, у "
         "удара — подводка воздухом и гармоники 150–1500 Гц для динамика телефона. Происхождение каждого файла — "
         "`audio/sfx/kit.json`, мастерская — `serial-studio/lab/out/time_states_sfx/`.", "",
         "**Проверка.** Уши nemotron с 03.11 на WaveSpeed нет (HTTP 404) — вместо них CLAP (laion/larger_clap_general, tesla, $0): "
         "ранг своей метки среди 36 описаний и 5 отвлекающих (речь, музыка, шум, тон синтезатора, тишина), в скобках — запас до "
         "лучшей чужой метки. Плюс спектрограммы и огибающие всех дублей (глазами; брак SA3 — «плита» в клипе — отсеян) и Whisper "
         "готового файла (qa_deliver.py). Человеческим ухом звуки не слушались.", "",
         "Уровень — пик 20 мс звука к средней громкости речи; «время» — начало звука (у удара подводка воздухом начинается раньше).", "",
         "| время | звук | файл (источник, дубль) | что в кадре / слово | где | уровень к голосу | проверка |",
         "|---|---|---|---|---|---|---|"]
lines += [f"| {mmss(p['t'])} | {WHAT.get(p['kind'], p['kind'])} | {src(p['kind'])} | {p['label']} | "
          f"{'пауза' if p['pause'] else 'под речью'}{' + подводка ' + str(p['lead_in_s']) + ' с' if p.get('lead_in_s') else ''} | "
          f"{p['level_db'] + p.get('vary_db', 0):.0f} дБ | {check(p['kind'])} |" for p in placed]
if MISSING:
    lines += ["", f"**Якорь не найден в тексте** ({len(MISSING)}): " + "; ".join(MISSING)]
(M.work / "sfx_map.md").write_text("\n".join(lines) + "\n")
print(f"SFX: {len(placed)} событий, под словами {len(over)} ({share:.0%})" + (f"; якорь не найден: {MISSING}" if MISSING else ""))

# ---------------------------------------------------------------- master
M.fx += fx
M.finish(np.zeros(M.N, np.float32), None, lufs=-14)
out = M.work / "audio/mix.wav"
tmp = M.work / "audio/mix_trim.wav"


def rewrite(af):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-af", af,
                    "-t", str(M.DUR), "-c:a", "pcm_s16le", str(tmp)], check=True)
    tmp.replace(out)


rewrite(f"afade=t=out:st={M.DUR - .012:.6f}:d=0.012")
# 03.11, 21:40: with a −1.4 dBFS ceiling and a 3 ms attack the AAC 160k copy of part 2 came out at −0.7 dBTP (+2.4 dB codec
# overshoot on limited peaks). Now: a true-peak-style limiter at 4× rate, ceiling −3 dBFS, softer attack/release.
TP_LIMIT = (
    "aresample=192000,alimiter=limit=0.708:attack=5:release=80:level=disabled,aresample=48000")
rewrite(f"volume={-14 - measure_audio(out)['integrated_lufs']:.2f}dB,{TP_LIMIT}")
lufs_now = measure_audio(out)["integrated_lufs"]
if abs(lufs_now + 14) > .15:                 # the limiter took some loudness: one more pass at the same ceiling
    rewrite(f"volume={-14 - lufs_now:.2f}dB,{TP_LIMIT}")
report = write_audio_report([out], M.work / "build/audio_report.json")
item = report["audio_outputs"][0]
print(f"final mix: {item['integrated_lufs']} LUFS-I / {item['true_peak_dbtp']} dBTP")
if item["true_peak_dbtp"] > -1.0 or abs(item["integrated_lufs"] + 14) > .5:
    raise SystemExit("Mix failed −14 LUFS / TP ≤ −1 gate; see build/audio_report.json")
