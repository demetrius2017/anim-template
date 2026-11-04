"""Sample of style 3 «Лёгкий бит» (bed.py): 40 s of music alone and the opening of part 1 with the voice.

    python3 render_sample.py            # Mac: only orchestration; the work runs on tesla (remote_run, qa container)
    python3 render_sample.py --remote   # tesla: synthesis, voice placement, ducking, loudness, AAC

sample_music.m4a       — the bed alone, a 40 s showcase plan (intro, groove in, a one-bar drop-out with the reversed
                         swell, an awe swell, the final chord), −16 LUFS, TP ≤ −1.
sample_with_voice.m4a  — part 1 from 0 to the end of «…путь, делённый на время» (t1_2) and the final chord: the voice
                         from audio/vo_*.mp3 placed by build/words.json (cut and 40 ms fade as tts.py does), the bed
                         with the plan mix.py writes for part 1 (hook thinner, drop-out after the hook, awe on
                         «телебашню»), ducked under speech like mix.py (env_follow, depth .45), music −11 dB under speech
                         (the music_levels.json metric), mix −14 LUFS, TP ≤ −1.
report.json            — loudness of both files, music vs voice levels, the bed's energy share in 1–4 kHz against the
                         piano bed with the same plan.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
EPS = HERE.parents[2]
ROOT = EPS.parent                   # anim-template: mixlib.env_follow (the same duck detector as mix.py)
P1 = EPS / "time_states_p1"
SR = 48000
OUT_MUSIC, OUT_VOICE, REPORT = HERE / "sample_music.m4a", HERE / "sample_with_voice.m4a", HERE / "report.json"
LAST = "t1_2"                       # the sample ends after this phrase


def words():
    return json.loads((P1 / "build/words.json").read_text())


def decode(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def loudness_of(args):
    err = subprocess.run(["ffmpeg", "-nostats", *args, "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True, input=None).stderr
    I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", err)[-1])
    TP = float(re.findall(r"Peak:\s+(-?[\d.inf]+) dBFS", err)[-1])
    return I, TP


def encode(y, out, target):
    """Gain to the target, a limiter, AAC; checked on the m4a itself and corrected until I ±0.2 and TP ≤ −1."""
    pcm = y.astype("<f4").tobytes()
    src = ["-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-"]
    err = subprocess.run(["ffmpeg", "-nostats", *src, "-af", "ebur128", "-f", "null", "-"], input=pcm,
                         capture_output=True).stderr.decode()
    gain, lim = target - float(re.findall(r"I:\s+(-?[\d.]+) LUFS", err)[-1]), -2.0
    for _ in range(6):
        af = f"volume={gain:.2f}dB,alimiter=limit={10 ** (lim / 20):.4f}:attack=3:release=60:level=disabled"
        subprocess.run(["ffmpeg", "-v", "error", "-y", *src, "-af", af, "-c:a", "aac", "-b:a", "192k", "-ar", str(SR),
                        "-ac", "1", "-movflags", "+faststart", str(out)], input=pcm, check=True)
        I, TP = loudness_of(["-i", str(out)])
        if abs(I - target) <= .2 and TP <= -1.0:
            break
        gain += target - I
        if TP > -1.0:
            lim -= TP + 1.0 + .3
    return {"file": out.name, "lufs_i": I, "true_peak_dbtp": TP, "gain_db": round(gain, 2), "limiter_db": round(lim, 2),
            "duration_s": round(len(y) / SR, 2)}


def rms(x):
    return float(np.sqrt(np.mean(np.square(x, dtype=np.float64)) + 1e-18))


def band_share(x, lo=1000, hi=4000):
    from scipy import signal
    f, p = signal.welch(x, SR, nperseg=8192)
    return float(p[(f >= lo) & (f < hi)].sum() / p[f >= 30].sum())


def band_rms(x, lo=1000, hi=4000):
    from scipy import signal
    return rms(signal.sosfilt(signal.butter(4, [lo, hi], btype="band", fs=SR, output="sos"), x))


def bands(x):
    """Energy share per band (Welch PSD), and where a phone speaker starts (~300 Hz)."""
    from scipy import signal
    f, p = signal.welch(x, SR, nperseg=8192)
    tot = p[f >= 30].sum()
    edges = [(30, 120), (120, 300), (300, 1000), (1000, 4000), (4000, 8000), (8000, 16000)]
    return {f"{lo}-{hi}": round(float(p[(f >= lo) & (f < hi)].sum() / tot), 3) for lo, hi in edges}


def plan_part1(sc, W, tf):
    """The part-1 plan of time_states_p1/mix.py, restricted to the sample's span."""
    PH = {p["id"]: p for p in W["phrases"]}
    group = {}
    for p in W["phrases"]:
        group.setdefault(re.sub(r"_\d+$", "", p["id"]), []).append(p)
    hook_end = group["h4"][-1]["t1"]
    back = PH["t1_2"]["t0"] - .3
    ii = {p["i"] for p in group["h3"]}
    tele = [w["t0"] for w in W["words"] if w["ph"] in ii and w["w"].lower().strip("«».,!?:—").startswith("телебашн")]
    sc.layer("pad", [(0, 0), (1.2, .75), (hook_end, .75), (back, 1)])
    sc.layer("arp", [(0, 0), (1.5, .5), (hook_end, .5), (back, 1)])
    sc.layer("bass", [(0, 0), (1.5, .3), (hook_end, .3), (back, 1)])
    sc.breaks([(hook_end + .05, back)])
    sc.awe(tele[:1])
    sc.final(tf)
    return {"hook_break": [round(hook_end + .05, 2), round(back, 2)], "awe": [round(t, 2) for t in tele[:1]],
            "final_chord": round(tf, 2)}


def remote():
    sys.path.insert(0, str(HERE))
    sys.path.insert(0, str(ROOT))
    from bed import Score
    from mixlib import env_follow
    rep = {}

    # 1) music alone: 40 s showcase
    n = 40 * SR
    sc = Score(n, SR)
    sc.layer("pad", [(0, 0), (1.0, 1)])
    sc.layer("arp", [(0, 1)])
    sc.layer("bass", [(0, 0), (4.75, 0), (4.8, 1)])
    sc.layer("drums", [(0, 0), (2.35, 0), (2.4, .55), (4.75, .55), (4.8, 1)])
    sc.breaks([(16.75, 19.2)])
    sc.awe([24.0])
    sc.final(36.0)
    y = sc.render()
    y *= np.clip((40 - np.arange(n) / SR) / .6, 0, 1)
    rep["music"] = encode(y, OUT_MUSIC, -16.0)
    rep["music"]["plan"] = {"plucks+pad": 0, "groove_half": 2.4, "bass+groove": 4.8, "drop_out": [16.75, 19.2],
                            "awe": 24.0, "final_chord": 36.0}

    # 2) with the voice: part 1 from the start to the end of LAST, then the final chord
    W = words()
    order = [p["id"] for p in json.loads((P1 / "build/script.json").read_text())["phrases"]]
    assert order == [p["id"] for p in W["phrases"]], "script.json and words.json disagree on phrases"
    last = order.index(LAST)
    v_end = W["phrases"][last]["t1"]
    tf = v_end + .3
    dur = tf + 2.8
    n = int(dur * SR)
    voice = np.zeros(n, np.float32)
    mism = []
    for sb in W["source_boundaries"]:
        if sb["ph"] > last:
            continue
        assert sb["file"] == f"vo_{sb['ph']:02d}.mp3"
        seg = W["phrases"][sb["ph"]]["segments"][sb["segment"]]
        clip = decode(P1 / "audio" / sb["file"])[sb["cut0_sample"]:sb["cut1_sample"]].copy()
        if len(clip) != seg["t1_sample"] - seg["t0_sample"]:
            mism.append([sb["file"], len(clip), seg["t1_sample"] - seg["t0_sample"]])
        f = min(int(.04 * SR), len(clip))
        clip[-f:] *= np.linspace(1, 0, f)
        i = seg["t0_sample"]
        m = min(len(clip), n - i)
        voice[i:i + m] += clip[:m]
    from scipy import signal
    voice = signal.sosfilt(signal.butter(2, 75, btype="high", fs=SR, output="sos"), voice).astype(np.float32)

    sc = Score(n, SR)
    plan = plan_part1(sc, W, tf)
    bed = sc.render()
    d = env_follow(voice, att=.03, rel=.4)                       # M.duck(.45, att=.03, rel=.4)
    a = d[d > max(float(d.max()) * 1e-4, 1e-9)]
    duck = 1 - .45 * np.clip(d / np.percentile(a, 95), 0, 1)
    d_env = env_follow(voice)                                    # the music_levels.json metric of mix.py
    act = d_env > .3 * np.percentile(d_env[d_env > 1e-6], 95)

    def place(b):
        m = b / rms(b) * duck
        return m * (10 ** (-11 / 20) * rms(voice[act]) / rms(m[act]))

    music = place(bed)
    under = 20 * np.log10(rms(music[act]) / rms(voice[act]))
    quiet = ~act & (np.abs(music) > 1e-5)
    pauses = 20 * np.log10(rms(music[quiet]) / rms(voice[act]))
    mix = voice + music
    mix *= np.clip((dur - np.arange(n) / SR) / 1.0, 0, 1)
    rep["with_voice"] = encode(mix, OUT_VOICE, -14.0)
    rep["with_voice"].update(plan=plan, voice_phrases=order[:last + 1], clip_length_mismatch=mism,
                             music_under_speech_db=round(float(under), 1), music_in_pauses_db=round(float(pauses), 1),
                             speech_band_margin_db=round(float(20 * np.log10(band_rms(voice[act]) / band_rms(music[act]))), 1))
    # the same opening with the piano bed (same plan, same level rule) for comparison
    cmp = {"bit_bed_1_4khz_share": round(band_share(bed), 3), "bit_bed_bands": bands(bed)}
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("piano_bed", P1 / "music_bed.py")
        pb = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(pb)
        if hasattr(pb, "Score") and getattr(pb, "BPM", None) == 84:
            sp = pb.Score(n, SR)
            plan_part1(sp, W, tf)
            old = sp.render()
            om = place(old)
            cmp.update(piano_bed_1_4khz_share=round(band_share(old), 3), piano_bed_bands=bands(old),
                       piano_speech_band_margin_db=round(float(20 * np.log10(band_rms(voice[act]) / band_rms(om[act]))), 1))
        else:
            cmp["piano_bed"] = "time_states_p1/music_bed.py is no longer the 84 BPM piano bed; skipped"
    except Exception as e:  # the comparison is a bonus; the sample does not depend on it
        cmp["piano_bed_error"] = repr(e)
    rep["compare"] = cmp
    REPORT.write_text(json.dumps(rep, ensure_ascii=False, indent=1) + "\n")
    print(json.dumps(rep, ensure_ascii=False))


def main():
    serial = Path.home() / "Projects/serial-studio"
    W = words()
    last = [p["id"] for p in W["phrases"]].index(LAST)
    vo = sorted({P1 / "audio" / sb["file"] for sb in W["source_boundaries"] if sb["ph"] <= last})
    sync = [HERE / "bed.py", Path(__file__).resolve(), P1 / "build/words.json", P1 / "build/script.json",
            P1 / "music_bed.py", ROOT / "mixlib.py", *vo]
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--sync", *map(str, sync),
                    "--pull", str(OUT_MUSIC), str(OUT_VOICE), str(REPORT), "--no-gpu", "--",
                    "python3", str(Path(__file__).resolve()), "--remote"], check=True, cwd=serial)
    print(REPORT.read_text())


if __name__ == "__main__":
    remote() if "--remote" in sys.argv else main()
