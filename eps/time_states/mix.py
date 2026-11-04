"""Own synthesis only, $0, no external files. Every time comes from measured words.

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
import subprocess

M = Mix(work=Path(__file__).resolve().parent)
tt = np.arange(M.N) / SR
T, TE = M.T, M.TE


def W(pid, stem, fallback=None):
    """Start of the word; the phrase start if the word moved; None if the phrase is absent."""
    if pid not in M.PH:
        return fallback
    try:
        return M.word(pid, stem)
    except StopIteration:
        return T(pid) if fallback is None else fallback


def words(pid, stem):
    if pid not in M.PH:
        return []
    i = M.PH[pid]["i"]
    return [w["t0"] for w in M.WJ["words"] if w["ph"] == i and w["w"].lower().strip("«».,!?:—").startswith(stem)]


def rise(a, b):
    q = np.clip((tt-a)/max(b-a, 1/SR), 0, 1)
    return q*q*(3-2*q)


def note(hz, dur, decay, attack=.01, release=.3):
    t = np.arange(int(dur*SR)) / SR
    body = np.sin(2*np.pi*hz*t) + .3*np.sin(4*np.pi*hz*t) + .1*np.sin(6*np.pi*hz*t)
    return fade(body*np.exp(-t*decay), attack, release).astype(np.float32)


# Drone: 55 Hz family with phone-audible partials; breathing; thins before the answer.
drone = (np.sin(2*np.pi*55*tt) + .35*np.sin(2*np.pi*82.4*tt) + .22*np.sin(2*np.pi*110.15*tt)
         + .25*np.sin(2*np.pi*220.3*tt) + .15*np.sin(2*np.pi*329.9*tt) + .08*np.sin(2*np.pi*440.7*tt))
drone *= .8 + .2*np.sin(2*np.pi*.06*tt)
end_word = M.WJ["words"][-1]["t1"]
thin = 1 - (1-db(-10))*rise(T("z4"), T("z5")) + (1-db(-10))*rise(end_word+.2, M.DUR-.2)
amb = drone * M.R_NARR / rms(drone) * db(-25) * M.duck(.35) * thin.astype(np.float32)

fx = np.zeros(M.N, np.float32)
music = np.zeros(M.N, np.float32)

def at(src, t0, g, dst):
    """Place a sound only if its cue exists in this version of the text."""
    if t0 is not None:
        M.put(src, t0, g, dst=dst)


# Quiet clock tick in the clock blocks: hook, tower and clocks (up to the apple), cold and gravity.
first_apple = T("a1") if "a1" in M.PH else M.DUR / 4
blocks = [(0, first_apple)]
if "c1" in M.PH and "c3" in M.PH:
    blocks.append((T("c1"), T("c3")))
for a, b in blocks:
    for k, s0 in enumerate(np.arange(a + .25, b, 1.0)):
        M.put(lp(click(.01, seed=20 + k % 2), 3200 if k % 2 else 2400), s0, db(-34), dst=fx)

# Tokyo tower: the upper clock pulls ahead with a tiny rising pair.
at(note(659.25, .6, 6), W("h3", "верхние"), db(-30), music)
at(note(783.99, .6, 6), (W("h3", "верхние") or 0) + .18 if "h3" in M.PH else None, db(-31), music)
# Frames of the film: one soft tone per «Кадр», each a step higher.
for hz, t0 in zip([329.63, 392.0, 440.0], words("b1", "кадр")):
    M.put(note(hz, 1.2, 3.5), t0, db(-26), dst=music)
# Cold: a slow low tone; gravity lands as a soft low thump.
at(note(164.81, 2.0, 1.4), W("c1", "месяц"), db(-28), music)
at(lp(thump(55, .5, seed=3), 400), W("c1", "гравитация"), db(-20), fx)
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
at(whoosh(1.1, 400, 3200, seed=7)[::-1].copy(), (W("d2", "прокрути") - .2) if "d2" in M.PH else None, db(-22), fx)
for t0 in words("d3", "прокрученн"):
    M.put(whoosh(.7, 500, 2600, seed=9)[::-1].copy(), t0-.1, db(-28), dst=fx)
# Time machine (full version): a short rising blip on the save and on «машина».
for t0 in (W("e1", "сохранения"), W("e1", "машина")):
    at(note(523.25, .25, 10), t0, db(-30), music)
    at(note(783.99, .35, 8), None if t0 is None else t0 + .09, db(-30), music)

# Notches on the stick: a dry click per notch.
for t0 in words("r1", "зарубка") + words("r1", "завтра"):
    M.put(lp(click(.008, seed=70), 2500), t0 + .1, db(-26), dst=fx)
# Diary: each crossed-out line is a soft pen scratch.
if "f2" in M.PH:
    for k, t0 in enumerate(np.linspace(W("f2", "писал"), TE("f2"), 4)):
        M.put(hp(whoosh(.25, 2000, 6000, seed=30+k), 1500), t0, db(-34), dst=fx)
# Fall (full version): descending whoosh, soft thump into the net, flickering digits.
fall0, net = W("g2", "роняли"), W("g2", "сетку")
if fall0 is not None and net is not None:
    M.put(whoosh(max(.8, net-fall0+.3), 300, 2400, seed=12), fall0, db(-24), dst=fx)
    M.put(lp(thump(70, .35, seed=5), 600), net+.15, db(-22), dst=fx)
t0 = W("g3", "мигали")
if t0 is not None:
    for k in range(16):
        M.put(lp(click(.004, seed=60+k), 5000), t0 + k/16, db(-38), dst=fx)

# After the last word: a soft two-note motif under the ring.
M.put(note(329.63, 2.4, 1.2, .02, .6), end_word+.35, db(-24), dst=music)
M.put(note(493.88, 2.4, 1.2, .02, .6), end_word+.95, db(-25), dst=music)

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
