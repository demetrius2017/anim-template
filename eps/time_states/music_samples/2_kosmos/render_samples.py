"""Two samples of the «Открытие» bed (bed.py): the music alone (40 s, −16 LUFS) and under the first ~45 s of part 1
(voice placed as in the film, music −11 dB under speech with ducking, −14 LUFS, TP ≤ −1).
All compute runs on tesla (serial-studio CLAUDE.md п.16); on the Mac this only starts it:  python3 render_samples.py
"""
import importlib.util
import json
import subprocess
import sys
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
AT = HERE.parents[3]                       # anim-template
P1 = AT / "eps/time_states_p1"
SERIAL = Path.home() / "Projects/serial-studio"
SR = 48000
OUT_M, OUT_V, REP = HERE / "sample_music.m4a", HERE / "sample_with_voice.m4a", HERE / "render_report.json"
WORK = HERE / "work"                       # intermediate wavs, stay on tesla
SAMPLE_S, VOICE_FROM_S = 40.0, 40.0        # music sample length; the voice sample ends with the phrase running at 40 s
UNDER_DB, DUCK = -11.0, .45                # music vs speech (as measured in mix.py), duck depth (as mix.py)


def phrases_needed():
    W = json.loads((P1 / "build/words.json").read_text())
    last = max(p["i"] for p in W["phrases"] if p["t0"] < VOICE_FROM_S)
    files = sorted({b["file"] for b in W["source_boundaries"] if b["ph"] <= last})
    return W, last, files


# ---------------------------------------------------------------- tesla
def write_wav(x, p):
    p.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                    "-c:a", "pcm_f32le", str(p)], input=np.asarray(x, np.float32).tobytes(), check=True)


def measure(p):
    r = subprocess.run(["ffmpeg", "-nostats", "-hide_banner", "-i", str(p), "-af", "ebur128=peak=true", "-f", "null", "-"],
                       capture_output=True, text=True, check=True)
    lines = [ln.strip() for ln in r.stderr.splitlines()]
    I = float([ln for ln in lines if ln.startswith("I:")][-1].split()[1])
    TP = float([ln for ln in lines if ln.startswith("Peak:")][-1].split()[1])
    return I, TP


def master(wav, out, target):
    """Gain to the target loudness, a limiter for the true peak, AAC mono; iterate on the encoded file."""
    I0, _ = measure(wav)
    gain, lim = target - I0, .82
    for _ in range(8):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(wav), "-af",
                        f"volume={gain:.2f}dB,alimiter=limit={lim:.3f}:attack=3:release=60:level=disabled",
                        "-ac", "1", "-ar", str(SR), "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(out)],
                       check=True)
        I, TP = measure(out)
        if abs(I - target) <= .3 and TP <= -1.05:
            return {"lufs_i": I, "true_peak_dbtp": TP, "gain_db": round(gain, 2), "limiter": round(lim, 3)}
        if TP > -1.05:
            lim *= .93
        gain += target - I
    raise SystemExit(f"{out.name}: loudness gate failed (I {I}, TP {TP})")


def probe(p):
    s = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=channels,sample_rate,codec_name:format=duration",
                                   "-of", "json", str(p)], capture_output=True, text=True, check=True).stdout)
    return {"duration_s": round(float(s["format"]["duration"]), 2), **s["streams"][0]}


def load_score(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.Score


def band_shares(x):
    from scipy import signal
    f, p = signal.welch(x, SR, nperseg=8192)
    tot = p.sum()
    bands = {"<150": (0, 150), "150-1k": (150, 1000), "1k-4k": (1000, 4000), ">4k": (4000, SR)}
    return {k: round(float(p[(f >= a) & (f < b)].sum() / tot * 100), 1) for k, (a, b) in bands.items()}


def remote():
    sys.path.insert(0, str(AT))
    from mixlib import load, hp, rms, env_follow
    from scipy import signal
    Score = load_score(HERE / "bed.py", "bed_kosmos")
    OldScore = load_score(P1 / "music_bed.py", "music_bed_p1")
    rep = {"computed_on": "tesla"}

    # 1) the music alone: 40 s, fade-in bar, bass and kick from bar 2, awe at bars 5 and 11, final chord on bar 16
    n = int(SAMPLE_S * SR)
    bar = 4 * 60 / 96

    def plan_music(sc):
        sc.layer("pad", [(0, 0), (1.2, .85), (bar * 4, .85), (bar * 4 + .5, 1)])
        sc.layer("arp", [(0, 0), (.4, .9), (bar * 4, .9), (bar * 4 + .3, 1)])
        sc.layer("bass", [(0, 0), (bar - .05, 0), (bar, .85), (bar * 4, .85), (bar * 4 + .3, 1)])
        sc.awe([bar * 4, bar * 10])
        sc.final(bar * 15)
        return sc
    bed = plan_music(Score(n, SR)).render()
    tt = np.arange(n) / SR
    bed = bed * np.clip((SAMPLE_S - tt) / .8, 0, 1)
    write_wav(bed, WORK / "music.wav")
    rep["sample_music"] = {**master(WORK / "music.wav", OUT_M, -16.0), **probe(OUT_M)}
    old = plan_music(OldScore(n, SR)).render()
    rep["spectrum_share_pct"] = {"new": band_shares(bed[:int(37 * SR)]), "old": band_shares(old[:int(37 * SR)])}

    # 2) under the voice of part 1: clips placed exactly as tts.py placed them (segment start, cut0..cut1, 40 ms fade)
    W, last, _ = phrases_needed()
    S = json.loads((P1 / "build/script.json").read_text())
    end = W["phrases"][last]["pause_t1"] + .5
    nv = int(end * SR)
    voice = np.zeros(nv, np.float32)
    for b in W["source_boundaries"]:
        if b["ph"] > last:
            continue
        ph = W["phrases"][b["ph"]]
        assert ph["id"] == S["phrases"][b["ph"]]["id"], ph["id"]
        seg = ph["segments"][b["segment"]]
        clip = load(P1 / "audio" / b["file"])[b["cut0_sample"]:b["cut1_sample"]].copy()
        assert len(clip) == seg["t1_sample"] - seg["t0_sample"], (b["file"], len(clip))
        k = min(int(.04 * SR), len(clip))
        clip[-k:] *= np.linspace(1, 0, k)
        i = seg["t0_sample"]
        voice[i:i + len(clip)] += clip[:nv - i]
    toks = [w for w in W["words"] if w["ph"] <= last]
    assert all(w["token_id"].rsplit(".", 1)[0] == W["phrases"][w["ph"]]["id"] for w in toks)
    narr = hp(voice, 75)
    narr = narr / (np.abs(narr).max() + 1e-9) * 10 ** (-3 / 20)
    R = rms(narr)

    PH = {p["id"]: p for p in W["phrases"]}
    hook_end, back = PH["h4_2"]["t1"], PH["t1_2"]["t0"] - .3
    tower = next(w["t0"] for w in toks if w["w"].lower().startswith("телебашн"))

    def plan_voice(sc):    # the turns of mix.py part 1 (hook, break on «Часы разошлись», back on t1_2); bass+kick from bar 2
        sc.layer("pad", [(0, 0), (1.0, .8), (hook_end, .8), (back, 1)])
        sc.layer("arp", [(0, 0), (.6, .85), (hook_end, .85), (back, 1)])
        sc.layer("bass", [(0, 0), (bar - .05, 0), (bar, .8), (hook_end, .8), (back, 1)])
        sc.breaks([(hook_end + .05, back)])
        sc.awe([tower])
        return sc

    d = env_follow(narr, att=.03, rel=.4)
    active = d[d > max(float(d.max()) * 1e-4, 1e-9)]
    duck = 1 - DUCK * np.clip(d / np.percentile(active, 95), 0, 1)
    d_env = env_follow(narr)
    act = d_env > .3 * np.percentile(d_env[d_env > 1e-6], 95)
    sp = np.sqrt((narr[act] ** 2).mean())
    sos = signal.butter(4, [1000, 4000], btype="bandpass", fs=SR, output="sos")
    nb = signal.sosfilt(sos, narr)
    tv = np.arange(nv) / SR
    tail = np.clip((end - tv) / 1.2, 0, 1)

    def under_voice(ScoreCls):
        bedv = plan_voice(ScoreCls(nv, SR)).render()
        m = bedv / rms(bedv) * R * duck * tail
        m *= 10 ** ((UNDER_DB - 20 * np.log10(np.sqrt((m[act] ** 2).mean()) / sp)) / 20)
        pz = ~act & (np.abs(m) > 1e-5)
        mb = signal.sosfilt(sos, m)
        return m, {"music_under_speech_db": round(float(20 * np.log10(np.sqrt((m[act] ** 2).mean()) / sp)), 1),
                   "music_in_pauses_db": round(float(20 * np.log10(np.sqrt((m[pz] ** 2).mean()) / sp)), 1),
                   "band_1k_4k_music_vs_voice_db": round(float(20 * np.log10(np.sqrt((mb[act] ** 2).mean())
                                                                            / np.sqrt((nb[act] ** 2).mean()))), 1)}
    music, lv = under_voice(Score)
    _, lv_old = under_voice(OldScore)
    mix = narr + music
    mix = mix / (np.abs(mix).max() + 1e-9) * 10 ** (-1 / 20)
    write_wav(mix, WORK / "with_voice.wav")
    rep["sample_with_voice"] = {**master(WORK / "with_voice.wav", OUT_V, -14.0), **probe(OUT_V), **lv,
                                "voice_phrases": [p["id"] for p in W["phrases"][:last + 1]],
                                "plan": {"bass_kick_in": round(bar, 2), "hook_break": [round(hook_end + .05, 2), round(back, 2)],
                                         "awe_tower": round(tower, 2)}}
    rep["old_bed_same_plan"] = lv_old

    # 3) drop-in check: the full part 1 length with a mix.py-like plan renders clean
    import time
    t_start = time.time()
    nf = int(172.97 * SR) + SR
    sc = Score(nf, SR)
    sc.layer("pad", [(0, 0), (1.2, .75), (33, .75), (37, 1)])
    sc.layer("arp", [(0, 0), (1.5, .5), (33, .5), (37, 1), (144, 1), (144.4, 0), (150, 0), (151, .85)])
    sc.layer("bass", [(0, 0), (1.5, .3), (33, .3), (37, 1)])
    sc.breaks([(33.15, 37.14), (135.6, 138.0)])
    sc.awe([6.8, 100.0, 136.0])
    sc.final(170.31)
    yf = sc.render()
    rep["dropin_full_part1"] = {"samples": int(len(yf)), "finite": bool(np.isfinite(yf).all()),
                                "peak": round(float(np.abs(yf).max()), 3), "render_s": round(time.time() - t_start, 1)}
    for ss, name in ((0, "qa_spectrum_0-12s.png"), (28, "qa_spectrum_28-40s.png")):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", "12", "-i", str(OUT_M), "-lavfi",
                        "showspectrumpic=s=1400x600:legend=1:fscale=log:stop=8000:color=intensity", "-frames:v", "1",
                        str(HERE / name)], check=True)
    REP.write_text(json.dumps(rep, ensure_ascii=False, indent=1) + "\n")
    print(json.dumps(rep, ensure_ascii=False))


# ---------------------------------------------------------------- Mac: orchestration only
def main():
    _, _, files = phrases_needed()
    sync = [HERE / "bed.py", Path(__file__).resolve(), AT / "mixlib.py", P1 / "music_bed.py",
            P1 / "build/words.json", P1 / "build/script.json", *[P1 / "audio" / f for f in files]]
    subprocess.run(["python3", str(SERIAL / "tools/remote_run.py"), "--sync", *map(str, sync),
                    "--pull", str(OUT_M), str(OUT_V), str(REP), str(HERE / "qa_spectrum_0-12s.png"), str(HERE / "qa_spectrum_28-40s.png"), "--no-gpu", "--",
                    "python3", str(Path(__file__).resolve()), "--remote"], check=True, cwd=SERIAL)
    print(REP.read_text())


if __name__ == "__main__":
    remote() if "--remote" in sys.argv else main()
