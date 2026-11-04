"""Samples of the «Тик-так» bed: music alone (40 s, −16 LUFS) and under the voice of part 1 (−14 LUFS, TP ≤ −1).

All compute runs on tesla (owner's rule, serial-studio CLAUDE.md п.16); on the Mac this script only calls remote_run:
    python3 render_samples.py            # Mac: sync inputs, run --remote on tesla, pull the two m4a and levels.json
Inputs (read only): time_states_p1/build/words.json, build/script.json, audio/vo_*.mp3 (placed like tts.py: the cut
[cut0:cut1] with a 40 ms tail fade at the segment start sample), time_states_p1/music_bed.py (the old bed, only for
the comparison numbers in levels.json).
"""
import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
P1 = HERE.parents[2] / "time_states_p1"
SR = 48000
OUT_M, OUT_V, REP = HERE / "sample_music.m4a", HERE / "sample_with_voice.m4a", HERE / "levels.json"
MUSIC_S, VOICE_FROM_S = 40.0, 40.0        # music sample length; the voice sample ends after the phrase running at 40 s


def phrases_needed():
    wj = json.loads((P1 / "build/words.json").read_text())
    ph = wj["phrases"]
    last = next(p for p in ph if p["t1"] >= VOICE_FROM_S)
    files = [sb["file"] for sb in wj["source_boundaries"] if ph[sb["ph"]]["t0"] <= last["t0"]]
    return last, files


# ---------------- remote part ----------------
def ff(*a, inp=None):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, a)], input=inp, check=True)


def decode(p):
    import numpy as np
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                       capture_output=True, check=True).stdout
    return np.frombuffer(b, np.float32).copy()


def loudness(p):
    err = subprocess.run(["ffmpeg", "-nostats", "-i", str(p), "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    i = float(re.findall(r"^\s*I:\s*(-?[\d.]+|-inf)\s*LUFS", err, re.M)[-1])
    tp = float(re.findall(r"^\s*Peak:\s*(-?[\d.]+|-inf)\s*dBFS", err, re.M)[-1])
    return i, tp


def deliver(x, out, target):
    """Float mono → AAC m4a (dual mono) at `target` LUFS-I, true peak ≤ −1 dBTP; gain refined on the encoded file."""
    import numpy as np
    raw = out.with_suffix(".raw.wav")
    ff("-f", "f32le", "-ar", SR, "-ac", 1, "-i", "-", "-c:a", "pcm_f32le", raw, inp=x.astype("<f4").tobytes())
    i0, _ = loudness(raw)
    g = target - i0 - 3.01                 # the m4a is two identical channels: +3 dB over the mono measurement
    for _ in range(4):
        ff("-i", raw, "-af", f"volume={g:.2f}dB,alimiter=limit=0.84:attack=3:release=60:level=disabled",
           "-ac", 2, "-ar", SR, "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out)
        i, tp = loudness(out)
        if abs(i - target) <= .15 and tp <= -1.0:
            break
        g += target - i - (tp + 1.0 if tp > -1.0 else 0)
    raw.unlink()
    return {"file": out.name, "integrated_lufs": i, "true_peak_dbtp": tp, "gain_db": round(g, 2)}


def k_loud(x):
    """BS.1770 K-weighted mean power, ungated (relative layer balance only)."""
    import numpy as np
    from scipy import signal
    z = signal.lfilter([1.53512485958697, -2.69169618940638, 1.19839281085285], [1, -1.69065929318241, .73248077421585], x)
    z = signal.lfilter([1.0, -2.0, 1.0], [1, -1.99004745483398, .99007225036621], z)
    return round(float(-.691 + 10 * np.log10((z ** 2).mean() + 1e-20)), 1)


def bands(x):
    import numpy as np
    from scipy import signal
    f, p = signal.welch(x, SR, nperseg=8192)
    tot = p.sum()
    edges = [(0, 250), (250, 1000), (1000, 4000), (4000, 24000)]
    return {f"{a}-{b}Hz_%": round(float(100 * p[(f >= a) & (f < b)].sum() / tot), 1) for a, b in edges}


def env_follow(x, att=.03, rel=.4):
    """Same follower as anim-template/mixlib.env_follow (block 32)."""
    import numpy as np
    from scipy import signal
    a = signal.sosfilt(signal.butter(1, 30, fs=SR, output="sos"), np.abs(x))
    out = np.zeros_like(a)
    ca, cr = np.exp(-32 / (att * SR)), np.exp(-32 / (rel * SR))
    v = 0.0
    for i in range(0, len(a), 32):
        s = a[i]
        v = ca * v + (1 - ca) * s if s > v else cr * v + (1 - cr) * s
        out[i:i + 32] = v
    return out


def remote():
    import numpy as np
    from scipy import signal
    sys.path.insert(0, str(HERE))
    from bed import Score
    rep = {}

    # 1) music alone: ticks and shaker for two bars, bass and pad enter on bar 3, the busier half from bar 9 with an
    #    awe swell, the final chord on bar 17
    n = int(MUSIC_S * SR)
    sc = Score(n, SR)
    sc.debug = True
    bar = sc.bar
    sc.layer("arp", [(0, 0), (.25, 1)])
    sc.layer("perc", [(0, 0), (.25, .6), (2 * bar - .1, .6), (2 * bar, 1)])
    sc.layer("bass", [(0, 0), (2 * bar - .05, 0), (2 * bar, 1)])
    sc.layer("pad", [(0, 0), (2 * bar - .3, 0), (2 * bar + .6, 1)])
    sc.awe([8 * bar])
    sc.final(16 * bar)
    y = sc.render()
    y *= np.clip((MUSIC_S - np.arange(n) / SR) / 1.0, 0, 1)
    rep["music_sample"] = deliver(y, OUT_M, -16.0)
    tot = k_loud(y)
    rep["music_sample"]["layers_LU_vs_total"] = {k: round(k_loud(v) - tot, 1) for k, v in sc.parts.items()}
    rep["music_sample"]["attacks_per_s"] = {k: round(v / MUSIC_S, 2) for k, v in sc.count.items()}
    rep["music_sample"]["plan"] = {"bar_s": round(bar, 4), "bass_pad_in": round(2 * bar, 2), "awe": round(8 * bar, 2),
                                   "final": round(16 * bar, 2)}

    # 2) under the voice: first phrases of part 1 placed exactly as tts.py placed them
    wj = json.loads((P1 / "build/words.json").read_text())
    order = [p["id"] for p in json.loads((P1 / "build/script.json").read_text())["phrases"]]
    ph = wj["phrases"]
    assert [p["id"] for p in ph] == order[:len(ph)], "phrase order differs between script.json and words.json"
    bad = [w["token_id"] for w in wj["words"] if w["token_id"].rsplit(".", 1)[0] != ph[w["ph"]]["id"]]
    last = next(p for p in ph if p["t1"] >= VOICE_FROM_S)
    t_end = last["t1"] + .6
    n = int(t_end * SR)
    narr = np.zeros(n, np.float32)
    placed = []
    for sb in wj["source_boundaries"]:
        p = ph[sb["ph"]]
        if p["t0"] > last["t0"]:
            continue
        seg = p["segments"][sb["segment"]]
        x = decode(P1 / "audio" / sb["file"])[sb["cut0_sample"]:sb["cut1_sample"]].copy()
        k = min(int(.04 * SR), len(x))
        x[-k:] *= np.linspace(1, 0, k)
        i0 = seg["t0_sample"]
        m = min(len(x), n - i0)
        narr[i0:i0 + m] += x[:m]
        placed.append({"id": p["id"], "file": sb["file"], "t0": round(i0 / SR, 3),
                       "len_ok": len(x) == seg["t1_sample"] - seg["t0_sample"]})
    narr = signal.sosfilt(signal.butter(2, 75, btype="high", fs=SR, output="sos"), narr).astype(np.float32)
    narr = narr / (np.abs(narr).max() + 1e-9) * 10 ** (-3 / 20)

    def word(pid, stem):
        i = next(p["i"] for p in ph if p["id"] == pid)
        return next(w["t0"] for w in wj["words"] if w["ph"] == i and w["w"].lower().strip("«».,!?:—").startswith(stem))

    PH = {p["id"]: p for p in ph}
    hook_end, back = PH["h4_2"]["t1"], PH["t1_2"]["t0"] - .3        # the drop-out of mix.py (part 1) after the hook
    sc = Score(n, SR)
    sc.layer("arp", [(0, 0), (.25, 1)])
    sc.layer("perc", [(0, 0), (.25, .6), (2 * bar - .1, .6), (2 * bar, 1)])
    sc.layer("bass", [(0, 0), (2 * bar - .05, 0), (2 * bar, 1)])       # bar 3 = 4.62 s, just before «В Токио» (4.90)
    sc.layer("pad", [(0, 0), (2 * bar - .3, 0), (2 * bar + .6, 1)])
    sc.breaks([(hook_end + .05, back)])
    sc.awe([word("h3", "телебашн")])
    bed = sc.render()
    d = env_follow(narr)
    act = d > .3 * np.percentile(d[d > 1e-6], 95)
    level = np.percentile(d[d > max(float(d.max()) * 1e-4, 1e-9)], 95)
    duck = 1 - .45 * np.clip(d / level, 0, 1)
    music = bed * duck
    r = np.sqrt((music[act] ** 2).mean()) / np.sqrt((narr[act] ** 2).mean())
    music *= 10 ** (-11 / 20) / r
    music *= np.clip((t_end - np.arange(n) / SR) / .6, 0, 1)
    rms = lambda v: float(np.sqrt((v ** 2).mean() + 1e-12))
    pauses = ~act & (np.abs(music) > 1e-5)
    rep["voice_sample"] = deliver(narr + music, OUT_V, -14.0)
    rep["voice_sample"].update({
        "length_s": round(t_end, 2), "phrases": placed, "token_mismatch": bad[:5],
        "music_under_speech_db": round(20 * np.log10(rms(music[act]) / rms(narr[act])), 1),
        "music_in_pauses_db": round(20 * np.log10(rms(music[pauses]) / rms(narr[act])), 1),
        "duck_depth": .45, "break": [round(hook_end + .05, 2), round(back, 2)], "awe": round(word("h3", "телебашн"), 2)})

    # 3) comparison with the old bed, both with all layers on, 40 s, no plan
    spec = importlib.util.spec_from_file_location("old_bed", P1 / "music_bed.py")
    old = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(old)
    n = int(MUSIC_S * SR)
    y_old, y_new = old.Score(n, SR).render(), Score(n, SR).render()
    rep["compare_full_40s"] = {
        "old_Am_84bpm": {"bands": bands(y_old)},
        "new_tiktak_D_104bpm": {"bands": bands(y_new)},
        "voice_bands": bands(narr[act])}
    REP.write_text(json.dumps(rep, ensure_ascii=False, indent=1) + "\n")
    print(json.dumps(rep, ensure_ascii=False, indent=1))


def main():
    """On the Mac: only orchestration. Heavy work goes to tesla (owner's rule)."""
    serial = Path.home() / "Projects/serial-studio"
    _, files = phrases_needed()
    inputs = [HERE / "bed.py", Path(__file__).resolve(), P1 / "build/words.json", P1 / "build/script.json",
              P1 / "music_bed.py", *[P1 / "audio" / f for f in files]]
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--sync", *map(str, inputs),
                    "--pull", str(OUT_M), str(OUT_V), str(REP), "--no-gpu", "--",
                    "python3", str(Path(__file__).resolve()), "--remote"], check=True, cwd=serial)


if __name__ == "__main__":
    remote() if "--remote" in sys.argv else main()
