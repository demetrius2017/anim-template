"""Phone copy and checks on the real compressed file (one part of «Сеть внутри сети», 04.11).

Same as eps/time_states_p1/qa_deliver.py: out/<part>.mp4 -> delivery/<part>.mp4 (1080×1920, two-pass x264, ≤ 29 MB),
then on THAT file: loudness (−14 LUFS ±0.5, true peak ≤ −1 dBTP), still stretches > 3 s (picture zone only: the
captions of the safe layout start at 52 % of the height), Whisper on tesla against script.json (spans joined), length
< 180 s. The ring (first frame = last frame) is measured, not gated. Plus, on tesla from the delivery copy:
  qa/blind_view/<p>_sheet_%d.jpg — fps=1/2, 270×480, tile 6×5 (sheet K, frame N = (K−1)·60 + (N−1)·2 s);
  qa/blind_view/<p>_text.md      — the voice-over with the start of every phrase (min:sec) and the sheet scheme;
  qa/blind_view/safe_zone_check.jpg — key frames under the platform mask: top 14 %, bottom 35 %, right 15 % (red),
                                       the text zone of story.safe (green).
Writes qa/deliver_report.json; exit 1 if any gate fails. Heavy work only on tesla (owner's rule); the Mac orchestrates.
"""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

import numpy as np

WORK = Path(__file__).resolve().parent
NAME = WORK.name
PART = "p" + NAME[-1]
SRC, OUT = WORK / f"out/{NAME}.mp4", WORK / f"delivery/{NAME}.mp4"
LOOP_REQUIRED = False
QA = WORK / "qa"
BV = QA / "blind_view"
LIMIT_MB = 29.0
# Key frames for the safe-zone check: first frame, two-line captions, the source line, scene labels, the end card.
SAFE_AT = {"universe_net_p1": [0.5, 13.3, 56.5, 80.6, 102.4, 137.4, 152.6],
           "universe_net_p2": [0.5, 4.6, 18.8, 39.0, 86.0, 99.2]}[NAME]


def run(*cmd, **kw):
    return subprocess.run(list(map(str, cmd)), check=True, capture_output=True, text=True, **kw)


def duration(p):
    return float(run("ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p).stdout)


def encode():
    OUT.parent.mkdir(exist_ok=True)
    dur = duration(SRC)
    v_kbps = int((LIMIT_MB * 8 * 1024 / dur) - 160) - 40
    log = WORK / "delivery/x264"
    common = ["-c:v", "libx264", "-preset", "slow", "-b:v", f"{v_kbps}k", "-maxrate", f"{int(v_kbps*1.6)}k",
              "-bufsize", f"{v_kbps*3}k", "-pix_fmt", "yuv420p", "-r", "30", "-passlogfile", log]
    run("ffmpeg", "-v", "error", "-y", "-i", SRC, *common, "-pass", "1", "-an", "-f", "mp4", "/dev/null")
    run("ffmpeg", "-v", "error", "-y", "-i", SRC, *common, "-pass", "2",
        "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-movflags", "+faststart", OUT)
    for f in WORK.glob("delivery/x264*"):
        f.unlink()
    return v_kbps


def loudness(p):
    err = subprocess.run(["ffmpeg", "-nostats", "-i", str(p), "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", err)[-1])
    TP = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", err)[-1])
    return I, TP


def frames_gray(p, fps=2):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(p), "-vf", f"fps={fps},scale=64:114,format=gray",
                          "-f", "rawvideo", "-"], check=True, capture_output=True).stdout
    a = np.frombuffer(raw, np.uint8)
    return a.reshape(-1, 114, 64).astype(np.int16)


def still_runs(fr, fps=2, thr=700):
    # Picture only (top 51 %): in the safe layout the captions start at 52 % and change on their own.
    d = np.abs(np.diff(fr[:, :58, :], axis=0)).sum(axis=(1, 2))
    runs, cur = [], 0
    for i, v in enumerate(d):
        cur = cur + 1 if v < thr else 0
        if cur / fps > 3:
            runs.append(round(i / fps, 1))
    return sorted(set(runs))


def sheets():
    BV.mkdir(parents=True, exist_ok=True)
    for f in BV.glob(f"{PART}_sheet_*.jpg"):
        f.unlink()
    run("ffmpeg", "-v", "error", "-y", "-i", OUT, "-vf", "fps=1/2,scale=270:480,tile=6x5", "-q:v", "3",
        BV / f"{PART}_sheet_%d.jpg")
    run("ffmpeg", "-v", "error", "-y", "-i", OUT, "-vf", "select=eq(n\\,0)", "-frames:v", "1", QA / "phone_first.png")
    run("ffmpeg", "-v", "error", "-y", "-sseof", "-0.05", "-i", OUT, "-frames:v", "1", QA / "phone_last.png")
    return sorted(p.name for p in BV.glob(f"{PART}_sheet_*.jpg"))


def safe_check():
    """Platform mask over key frames of the delivery copy: red — interface of Instagram Reels / YouTube Shorts
    (top 14 %, bottom 35 %, right 15 %), green — the text zone of story.safe."""
    safe = json.loads((WORK / "build/story.json").read_text())["safe"]
    x0, y0, x1, y1 = safe["zone"]
    W, H = 1080, 1920
    red = "color=red@0.32:t=fill"
    vf = (f"drawbox=x=0:y=0:w={W}:h={int(.14*H)}:{red},drawbox=x=0:y={int(.65*H)}:w={W}:h={H-int(.65*H)}:{red},"
          f"drawbox=x={int(.85*W)}:y={int(.14*H)}:w={W-int(.85*W)}:h={int(.65*H)-int(.14*H)}:{red},"
          f"drawbox=x={int(x0*W)}:y={int(y0*H)}:w={int((x1-x0)*W)}:h={int((y1-y0)*H)}:color=lime@0.9:t=4,scale=360:640")
    tiles = []
    for i, t in enumerate(SAFE_AT):
        f = BV / f".safe_{i}.png"
        run("ffmpeg", "-v", "error", "-y", "-ss", f"{t}", "-i", OUT, "-frames:v", "1", "-vf", vf, f)
        tiles.append(f)
    ins = sum((["-i", str(f)] for f in tiles), [])
    run("ffmpeg", "-v", "error", "-y", *ins, "-filter_complex",
        "".join(f"[{i}:v]" for i in range(len(tiles))) + f"hstack=inputs={len(tiles)}", "-q:v", "3", BV / "safe_zone_check.jpg")
    for f in tiles:
        f.unlink()
    return {"at_s": SAFE_AT, "zone": safe["zone"], "cap": safe["cap"], "scene": safe["scene"]}


def blind_text(names):
    words = json.loads((WORK / "build/words.json").read_text())
    script = {p["id"]: p for p in json.loads((WORK / "build/script.json").read_text())["phrases"]}
    card = json.loads((WORK / "build/script.json").read_text())["end_card"]["text"]
    dur = words["duration"]
    mmss = lambda s: f"{int(s // 60)}:{s % 60:04.1f}"
    lines = [f"Ролик: YouTube Shorts / Instagram Reels 9:16, ≈{int(dur // 60)}:{int(dur % 60):02d}, часть {NAME[-1]} из двух.",
             f"Листы кадров: {', '.join(names)} — по 30 кадров (6 в ряд, 5 рядов), кадр каждые 2 секунды. "
             "Кадр №N на листе K (слева направо, сверху вниз, с 1) = секунда (K−1)·60 + (N−1)·2.",
             "Ниже — закадровый текст с временем начала каждой фразы (мин:сек).", ""]
    for p in words["phrases"]:
        ph = script[p["id"]]
        text = " ".join(sp["text"] for sp in ph.get("spans") or [{"text": ph["text"]}])
        lines.append(f"[{mmss(p['t0'])}] {text}")
    lines.append(f"[{mmss(words['voice_end'])}] (надпись на экране, без голоса) {card}")
    (BV / f"{PART}_text.md").write_text("\n".join(lines) + "\n")


def norm(s):
    return re.sub(r"[^а-яёa-z0-9 ]", " ", s.lower().replace("ё", "е")).split()


def whisper_check():
    sys.path.insert(0, str(Path.home() / "Projects/serial-studio/tools"))
    import remote_whisper
    seg = remote_whisper.transcribe([OUT])[str(OUT)]
    heard = norm(" ".join(s.get("text", "") for s in seg))
    said = norm(" ".join(" ".join(sp["text"] for sp in p.get("spans") or [{"text": p["text"]}])
                         for p in json.loads((WORK / "build/script.json").read_text())["phrases"]))
    n, m = len(said), len(heard)
    D = np.zeros((n + 1, m + 1), int); D[:, 0] = range(n + 1); D[0, :] = range(m + 1)
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            D[i, j] = min(D[i-1, j] + 1, D[i, j-1] + 1, D[i-1, j-1] + (said[i-1] != heard[j-1]))
    (QA / "deliver_whisper.txt").write_text(" ".join(heard))
    (QA / "deliver_whisper.json").write_text(json.dumps(
        [{"start": s["start"], "end": s["end"], "text": s.get("text", "")} for s in seg], ensure_ascii=False, indent=1))
    return round(D[n, m] / max(1, n), 3), n, m


def remote_part():
    """Runs on tesla in tools/qa_container: encode, loudness, frames, stills, sheets, safe-zone check."""
    kbps = encode()
    size = OUT.stat().st_size / 1024 / 1024
    I, TP = loudness(OUT)
    fr = frames_gray(OUT)
    names = sheets()
    blind_text(names)
    safe = safe_check()
    probe = json.loads(run("ffprobe", "-v", "error", "-show_streams", "-of", "json", OUT).stdout)
    v = next(s for s in probe["streams"] if s["codec_type"] == "video")
    rep = {"file": str(OUT), "size_mb": round(size, 2), "video_kbps": kbps, "width": v["width"], "height": v["height"],
           "duration_s": round(duration(OUT), 2), "lufs_i": I, "true_peak_dbtp": TP,
           "first_last_mean_abs_diff": round(float(np.abs(fr[0] - fr[-1]).mean()), 2),
           "still_over_3s_at": [float(x) for x in still_runs(fr)], "blind_sheets": names, "safe_zone": safe,
           "computed_on": "tesla"}
    (QA / "deliver_partial.json").write_text(json.dumps(rep, ensure_ascii=False, indent=1))
    print(json.dumps(rep, ensure_ascii=False))


def main():
    """On the Mac: only orchestration. Heavy work goes to tesla (owner's rule)."""
    serial = Path.home() / "Projects/serial-studio"
    me = Path(__file__).resolve()
    pulls = [OUT, QA / "deliver_partial.json", QA / "phone_first.png", QA / "phone_last.png", BV]
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--sync", str(SRC), str(me),
                    str(WORK / "build/story.json"), str(WORK / "build/words.json"), str(WORK / "build/script.json"),
                    "--pull", *map(str, pulls), "--no-gpu", "--", "python3", str(me), "--remote"], check=True, cwd=serial)
    rep = json.loads((QA / "deliver_partial.json").read_text())
    rep["src"], rep["src_sha256"] = str(SRC), hashlib.sha256(SRC.read_bytes()).hexdigest()
    wer, n_said, n_heard = whisper_check()
    rep.update(whisper_wer=float(wer), words_script=n_said, words_heard=n_heard)
    gates = {"size": rep["size_mb"] <= 30, "aspect": (rep["width"], rep["height"]) == (1080, 1920),
             "lufs": abs(rep["lufs_i"] + 14) <= .5, "true_peak": rep["true_peak_dbtp"] <= -1.0,
             "loop": rep["first_last_mean_abs_diff"] < 6 or not LOOP_REQUIRED, "stills": not rep["still_over_3s_at"],
             "whisper": wer <= .12, "shorts_length": rep["duration_s"] < 180}
    rep["gates"] = {k: bool(v) for k, v in gates.items()}
    rep["loop_required"] = LOOP_REQUIRED
    rep["pass"] = all(rep["gates"].values())
    (QA / "deliver_report.json").write_text(json.dumps(rep, ensure_ascii=False, indent=1))
    print(json.dumps(rep, ensure_ascii=False))
    sys.exit(0 if rep["pass"] else 1)


if __name__ == "__main__":
    remote_part() if "--remote" in sys.argv else main()
