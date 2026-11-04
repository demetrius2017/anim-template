"""Own synthesis only, $0, no external files. Every time comes from measured words.

v20 (owner 03.11: «не хватает фоновой музыки — стоит гул»): the 55 Hz drone is gone; a music bed of our own
(music_bed.py: piano and pad, A minor, 84 BPM) sits 9–13 dB under the voice and ducks under speech, with drop-outs
on the turns (after the hook; before «А почему?» at the black hole; before «Вспомни вчера»), awe swells at the
scale points, thinning before the conclusion; part 1 ends on a chord under «ЧАСТЬ 2 — В ПРОФИЛЕ», part 2 fades
out into the ring. The notes below describe the effects (kept). Old drone notes no longer apply.

A low drone from the first frame (the film loops, so it ends at the same level).
Clock blocks (h–a4, c1–c3) carry a quiet tick. Each «Кадр» in b1 rings a soft
tone a step higher. The egg cracks on «осколки», the rewind is a reversed breath
on «Прокрути»; the time machine «loads» with a short rising blip. The fall is a
long descending whoosh and a soft thump on «сетку»; the flickering digits are a
rapid, very quiet click train. Before the answer the drone thins out from z4,
«Длина жизни…» sits on an almost clean voice, and after the last word a soft
two-note motif rings while the drone returns to its first-frame level.
"""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import numpy as np
from mixlib import Mix, SR, db, rms, fade, lp, hp, click, thump, whoosh
from audio_report import measure_audio, write_audio_report
from mixlib import env_follow
import importlib.util

# ── THE MUSIC BED: one line to swap (path from the engine root; remote_anim ships any eps/… path written here).
#    Same interface everywhere: Score(n, sr).layer/breaks/awe/final/render. After a swap: python3 eps/<part>/remix.py
BED = "eps/time_states_p1/music_bed.py"
_spec = importlib.util.spec_from_file_location("music_bed_sel", Path(__file__).resolve().parents[2] / BED)
_bed = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_bed)
Score = _bed.Score
import re
import subprocess

M = Mix(work=Path(__file__).resolve().parent)
tt = np.arange(M.N) / SR
T, TE = M.T, M.TE


# Two parts (v19): a phrase is one line; lines <id>_2, <id>_3 … continue the old phrase <id>. Cues look in the group.
GROUP = {}
for _pid in M.PH:
    GROUP.setdefault(re.sub(r"_\d+$", "", _pid), []).append(_pid)


def TG(gid):
    return T(GROUP[gid][0])


def TEG(gid):
    return TE(GROUP[gid][-1])


def words(gid, stem):
    if gid not in GROUP:
        return []
    ii = {M.PH[p]["i"] for p in GROUP[gid]}
    return [w["t0"] for w in M.WJ["words"] if w["ph"] in ii and w["w"].lower().strip("«».,!?:—").startswith(stem)]


def W(gid, stem, fallback=None):
    """Start of the word anywhere in the group; the group start if the word moved; None if the group is absent."""
    if gid not in GROUP:
        return fallback
    ws = words(gid, stem)
    return ws[0] if ws else (TG(gid) if fallback is None else fallback)


def rise(a, b):
    q = np.clip((tt-a)/max(b-a, 1/SR), 0, 1)
    return q*q*(3-2*q)


def note(hz, dur, decay, attack=.01, release=.3):
    t = np.arange(int(dur*SR)) / SR
    body = np.sin(2*np.pi*hz*t) + .3*np.sin(4*np.pi*hz*t) + .1*np.sin(6*np.pi*hz*t)
    return fade(body*np.exp(-t*decay), attack, release).astype(np.float32)


amb = np.zeros(M.N, np.float32)   # v20: the drone («гул») is out; the music bed below replaces it

fx = np.zeros(M.N, np.float32)
music = np.zeros(M.N, np.float32)

def at(src, t0, g, dst):
    """Place a sound only if its cue exists in this version of the text."""
    if t0 is not None:
        M.put(src, t0, g, dst=dst)


# Quiet clock tick in the clock blocks: hook, tower and clocks (up to the apple), cold and gravity.
blocks = []
if "a1" in GROUP:  # part 1: hook, tower and clocks up to the apple
    blocks.append((0, TG("a1")))
if "c1" in GROUP and "c3" in GROUP:
    blocks.append((TG("c1"), TG("c3")))
for a, b in blocks:
    for k, s0 in enumerate(np.arange(a + .25, b, 1.0)):
        M.put(lp(click(.01, seed=20 + k % 2), 3200 if k % 2 else 2400), s0, db(-34), dst=fx)

# Tokyo tower: the upper clock pulls ahead with a tiny rising pair.
at(note(659.25, .6, 6), W("h3", "верхние"), db(-30), music)
at(note(783.99, .6, 6), (W("h3", "верхние") or 0) + .18 if "h3" in GROUP else None, db(-31), music)
# Frames of the film: one soft tone per «Кадр», each a step higher.
for hz, t0 in zip([329.63, 392.0, 440.0], words("b1", "кадр")):
    M.put(note(hz, 1.2, 3.5), t0, db(-26), dst=music)
# Cold: a slow low tone; gravity lands as a soft low thump.
at(note(164.81, 2.0, 1.4), W("c1", "месяц"), db(-28), music)
at(lp(thump(55, .5, seed=3), 400), W("c1b", "гравитация"), db(-20), fx)
# Black hole: a deep, slow thump and a falling tone on «чёрных дыр».
at(lp(thump(40, .9, seed=8), 300), W("c4", "чёрных"), db(-19), fx)
at(note(110.0, 2.4, .9), W("c4", "замедляется"), db(-27), music)

# Egg (full version): crack on «осколки» / «разлетелось», reversed breath on the rewind.
c = np.zeros(int(.35*SR), np.float32)
for i in range(7):
    s1 = click(.006, seed=40+i)
    j = int((i*.035 + .01*(i % 3))*SR)
    c[j:j+len(s1)] += s1 * (.85**i)
at(hp(c, 900), W("d1", "разлетел"), db(-18), fx)
at(whoosh(1.1, 400, 3200, seed=7)[::-1].copy(), (W("d2", "прокрути") - .2) if "d2" in GROUP else None, db(-22), fx)
for t0 in words("d3", "прокрученн"):
    M.put(whoosh(.7, 500, 2600, seed=9)[::-1].copy(), t0-.1, db(-28), dst=fx)
# Time machine (full version): a short rising blip on the save and on «машина».
for t0 in (words("e1", "сохранени")[:1] + words("e1", "машина")[:1]):   # only words that are said
    at(note(523.25, .25, 10), t0, db(-30), music)
    at(note(783.99, .35, 8), None if t0 is None else t0 + .09, db(-30), music)

# Notches on the stick: a dry click per notch.
for t0 in words("r1", "зарубка") + words("r1", "завтра"):
    M.put(lp(click(.008, seed=70), 2500), t0 + .1, db(-26), dst=fx)
# Diary: each crossed-out line is a soft pen scratch.
if "f2" in GROUP:
    for k, t0 in enumerate(np.linspace(W("f2", "писал"), W("f2", "зач", TEG("f2")) + .6, 4)):
        M.put(hp(whoosh(.25, 2000, 6000, seed=30+k), 1500), t0, db(-34), dst=fx)
# Fall (full version): descending whoosh, soft thump into the net, flickering digits.
fall0, net = (W("g2", "спиной") if words("g2", "спиной") else W("g2", "роняли")), W("g2", "сетку")
if words("g2", "смотрел") and words("g2", "сам"):   # v20/v34: the falls of ts_fall (other's — softer; own — after «сам(и)»)
    see, oth = words("g2", "смотрел")[0], (words("g2", "падают") or words("g2", "падает") or [None])[0]
    oa = max(see + .15, (oth if oth is not None else see + .45) - .2)
    M.put(whoosh(1.1, 300, 2400, seed=13), oa, db(-30), dst=fx)
    M.put(lp(thump(70, .35, seed=6), 600), oa + .8 + .15, db(-30), dst=fx)
    if fall0 is not None and fall0 < see:          # draft B: «роняли спиной … в сетку» first, own fall after «сами»
        sa = words("g2", "сам")[0] - .1
        M.put(whoosh(1.4, 300, 2400, seed=14), sa, db(-25), dst=fx)
        M.put(lp(thump(70, .35, seed=7), 600), sa + 1.1 + .15, db(-23), dst=fx)
if fall0 is None and "q1" in GROUP:  # part 1: the preview of the fall on «роняли»
    fall0 = W("q1", "роняли")
    net = fall0 + 1.4
if fall0 is not None and net is not None:
    M.put(whoosh(max(.8, net-fall0+.3), 300, 2400, seed=12), fall0, db(-24), dst=fx)
    M.put(lp(thump(70, .35, seed=5), 600), net+.15, db(-22), dst=fx)
t0 = W("g3", "мигали")
if t0 is not None:
    for k in range(16):
        M.put(lp(click(.004, seed=60+k), 5000), t0 + k/16, db(-38), dst=fx)

# ---- v20 music bed (variant B, own synthesis): plan from the measured words of this part
def exact(gid, word):
    """Start of the last word equal to `word` in the group (None if absent)."""
    if gid not in GROUP:
        return None
    ii = {M.PH[p]["i"] for p in GROUP[gid]}
    ws = [w["t0"] for w in M.WJ["words"] if w["ph"] in ii and w["w"].lower().strip("«».,!?:—") == word]
    return ws[-1] if ws else None


sc = Score(M.N, SR)
D = M.DUR
if "h" in GROUP and "c4" in GROUP:      # part 1
    hook_end = TEG("h4")
    back = M.T("t1_2") - .3 if "t1_2" in M.PH else TG("t1") + 3
    pq = W("c4", "почему")
    thin0, q0 = (M.T("c4_4") if "c4_4" in M.PH else pq + 6), TG("q1")
    title = (exact("q1", "во") or TEG("q1") - 1.5) - .1          # «ЧАСТЬ 2 — В ПРОФИЛЕ» (story.py: wfind q1_2 «во» − .1)
    sc.layer("pad", [(0, 0), (1.2, .75), (hook_end, .75), (back, 1), (thin0 - .4, 1), (thin0 + .6, .7), (q0 - .3, .7), (q0 + 1, 1)])
    sc.layer("arp", [(0, 0), (1.5, .5), (hook_end, .5), (back, 1), (thin0 - .4, 1), (thin0 + .4, 0), (q0 - .3, 0), (q0 + .8, .85)])
    sc.layer("bass", [(0, 0), (1.5, .3), (hook_end, .3), (back, 1), (thin0 - .4, 1), (thin0 + .6, .4), (q0, .4), (q0 + 1, .9)])
    sc.breaks([(hook_end + .05, back), (pq - .6, M.T("c4_3") - .2 if "c4_3" in M.PH else pq + 2)])
    sc.awe([x for x in (W("h3", "телебашн"), W("c3", "спутник"), W("c4", "чёрных")) if x is not None])
    sc.final(title)
    plan = {"hook_break": [hook_end + .05, back], "why_break_from": pq - .6, "thin_from": thin0, "final_chord": title}
elif "k1" in GROUP:                     # part 2
    hook_end = TEG("k2")
    back = (W("r1", "зарубк") or TG("r1") + 1.2) - .15
    clive0, clive1 = TG("f2"), TEG("f2")
    q0, q1 = TG("r4"), (TG("p1") if "p1" in GROUP else TEG("r4") + 6)
    z_out, z_in = TG("z4") - .45, TG("z5") - .3     # v34: «Проверь её: вспомни вчера» follows z1 (z3 moved to the end)
    ring0 = M.T("z5_2") if "z5_2" in M.PH else TEG("z5") - 3
    sc.layer("pad", [(0, 0), (1.5, .7), (hook_end, .7), (back, 1), (q0, 1), (q0 + .6, .7), (q1 - .3, .7), (q1 + .6, 1),
                     (z_in, .8), (ring0, .8), (D - .2, 0)])
    sc.layer("arp", [(0, 0), (1.8, .45), (hook_end, .45), (back, 1), (clive0, 1), (clive0 + .6, .55), (clive1, .55), (clive1 + .6, 1),
                     (q0, 1), (q0 + .5, 0), (q1 - .3, 0), (q1 + .8, 1), (z_in, 0), (ring0, 0), (ring0 + .5, .5), (D - .2, 0)])
    sc.layer("bass", [(0, 0), (1.8, .3), (hook_end, .3), (back, 1), (q0, 1), (q0 + .6, .6), (q1, .6), (q1 + .6, 1),
                      (z_in, .4), (ring0, .4), (D - .2, 0)])
    sc.breaks([(hook_end + .05, back), (z_out, z_in)])
    sc.awe([x for x in (W("r2b", "шестидес"), W("r2", "восьмисот")) if x is not None])
    plan = {"hook_break": [hook_end + .05, back], "yesterday_break": [z_out, z_in], "ring_fade_from": ring0}
else:
    plan = {}
bed = sc.render()
BED_DB, BED_DUCK = -8.0, .45   # measured on p1: −11 dB under speech, ≈ −9 in pauses
music += bed / rms(bed) * M.R_NARR * db(BED_DB) * M.duck(BED_DUCK, att=.03, rel=.4)
# loop seam: the bed of part 2 starts and ends at zero; part 1 ends on its chord, trimmed by the end fade
d_env = env_follow(M.narr)
act = d_env > .3 * np.percentile(d_env[d_env > 1e-6], 95)
lvl = {"music_under_speech_db": round(float(20 * np.log10(np.sqrt((music[act] ** 2).mean()) / np.sqrt((M.narr[act] ** 2).mean()))), 1),
       "music_in_pauses_db": round(float(20 * np.log10(np.sqrt((music[~act & (np.abs(music) > 1e-5)] ** 2).mean() + 1e-12) / np.sqrt((M.narr[act] ** 2).mean()))), 1),
       "bed": BED, "bed_db": BED_DB, "duck_depth": BED_DUCK, "plan": {k: ([round(float(x), 2) for x in v] if isinstance(v, (list, tuple)) else round(float(v), 2)) for k, v in plan.items()}}
(M.work / "build/music_levels.json").write_text(__import__("json").dumps(lvl, ensure_ascii=False, indent=1) + "\n")
print(f"music vs voice: {lvl['music_under_speech_db']} dB under speech, {lvl['music_in_pauses_db']} dB in pauses")

M.fx += fx
M.finish(amb, music, lufs=-14)
out = M.work/"audio/mix.wav"
tmp = M.work/"audio/mix_trim.wav"


def rewrite(af):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-af", af,
                    "-t", str(M.DUR), "-c:a", "pcm_s16le", str(tmp)], check=True)
    tmp.replace(out)


rewrite(f"afade=t=out:st={M.DUR-.012:.6f}:d=0.012")
rewrite(f"volume={-14-measure_audio(out)['integrated_lufs']:.2f}dB,alimiter=limit=0.85:attack=3:release=60:level=disabled")
report = write_audio_report([out], M.work/"build/audio_report.json")
item = report["audio_outputs"][0]
print(f"final mix: {item['integrated_lufs']} LUFS-I / {item['true_peak_dbtp']} dBTP")
if item["true_peak_dbtp"] > -1.0 or abs(item["integrated_lufs"] + 14) > .5:
    raise SystemExit("Mix failed −14 LUFS / TP ≤ −1 gate; see build/audio_report.json")
