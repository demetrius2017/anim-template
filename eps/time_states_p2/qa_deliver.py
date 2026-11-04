"""Phone copy and checks on the real compressed file.

out/time_states_p2.mp4 -> delivery/time_states_p2.mp4 (1080×1920, two-pass x264, ≤ 29 MB),
then on THAT file: loudness (−14 LUFS ±0.5, true peak ≤ −1 dBTP), a frame every 2 s,
first vs last frame (loop gate only where LOOP_REQUIRED), still stretches > 3 s, and Whisper on tesla against script.json.
Writes qa/deliver_report.json; exit 1 if any gate fails.
"""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import sys

import numpy as np

WORK = Path(__file__).resolve().parent
SRC, OUT = WORK / "out/time_states_p2.mp4", WORK / "delivery/time_states_p2.mp4"
# Part 2 closes the ring: its last frame must match the first.
LOOP_REQUIRED = False   # 03.11: the ring goes through both parts (p2 ends on the first frame of p1), accepted by the main — not gated
QA = WORK / "qa"
LIMIT_MB = 29.0


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
    # Picture only (top 60%): captions change on their own and must not hide a frozen scene.
    d = np.abs(np.diff(fr[:, :68, :], axis=0)).sum(axis=(1, 2))
    runs, cur = [], 0
    for i, v in enumerate(d):
        cur = cur + 1 if v < thr else 0
        if cur / fps > 3:
            runs.append(round(i / fps, 1))
    return sorted(set(runs))


def sheet():
    QA.mkdir(exist_ok=True)
    run("ffmpeg", "-v", "error", "-y", "-i", OUT, "-vf", "fps=1/2,scale=180:320,tile=10x9:padding=4:color=0x333333",
        "-frames:v", "1", QA / "phone_sheet.jpg")
    run("ffmpeg", "-v", "error", "-y", "-i", OUT, "-vf", "select=eq(n\\,0)", "-frames:v", "1", QA / "phone_first.png")
    run("ffmpeg", "-v", "error", "-y", "-sseof", "-0.05", "-i", OUT, "-frames:v", "1", QA / "phone_last.png")


def norm(s):
    return re.sub(r"[^а-яёa-z0-9 ]", " ", s.lower().replace("ё", "е")).split()


def whisper_check():
    sys.path.insert(0, str(Path.home() / "Projects/serial-studio/tools"))
    import remote_whisper
    seg = remote_whisper.transcribe([OUT])[str(OUT)]
    heard = norm(" ".join(s.get("text", "") for s in seg))
    said = norm(" ".join(p["text"] for p in json.loads((WORK / "build/script.json").read_text())["phrases"]))
    # word error rate by edit distance
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
    """Runs on tesla in tools/qa_container: ffmpeg encode, loudness, frames, stills, sheet."""
    kbps = encode()
    size = OUT.stat().st_size / 1024 / 1024
    I, TP = loudness(OUT)
    fr = frames_gray(OUT)
    sheet()
    probe = json.loads(run("ffprobe", "-v", "error", "-show_streams", "-of", "json", OUT).stdout)
    v = next(s for s in probe["streams"] if s["codec_type"] == "video")
    rep = {"file": str(OUT), "size_mb": round(size, 2), "video_kbps": kbps, "width": v["width"], "height": v["height"],
           "duration_s": round(duration(OUT), 2), "lufs_i": I, "true_peak_dbtp": TP,
           "first_last_mean_abs_diff": round(float(np.abs(fr[0] - fr[-1]).mean()), 2),
           "still_over_3s_at": [float(x) for x in still_runs(fr)], "computed_on": "tesla"}
    (QA / "deliver_partial.json").write_text(json.dumps(rep, ensure_ascii=False, indent=1))
    print(json.dumps(rep, ensure_ascii=False))


def main():
    """On the Mac: only orchestration. Heavy work goes to tesla (owner's rule)."""
    serial = Path.home() / "Projects/serial-studio"
    me = Path(__file__).resolve()
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--sync", str(SRC), str(me), "--pull", str(OUT),
                    str(QA / "deliver_partial.json"), str(QA / "phone_sheet.jpg"), str(QA / "phone_first.png"),
                    str(QA / "phone_last.png"), "--no-gpu", "--", "python3", str(me), "--remote"],
                   check=True, cwd=serial)
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
