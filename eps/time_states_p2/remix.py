"""New sound on the same picture: swap the music without re-rendering frames (all heavy work on tesla).

    python3 eps/<part>/remix.py          # from ~/Projects/anim-template; then python3 eps/<part>/qa_deliver.py

1. remote_anim <part> --no-render: story.py + mix.py on tesla (mix.py takes the bed named in its BED line) →
   audio/mix.wav, build/story.json, build/music_levels.json back on the Mac.
2. remote_run: out/<part>.mp4 keeps its video stream (-c:v copy), the audio becomes the new mix.wav (AAC 256k, as
   build.py); out/<part>_small.mp4 likewise (AAC 160k). The picture must be the one rendered for this text:
   words.json / story.json timings are checked against build/build_report.json inputs before the remux.
"""
from pathlib import Path
import hashlib
import json
import subprocess
import sys

WORK = Path(__file__).resolve().parent
ROOT = WORK.parents[1]
NAME = WORK.name
SERIAL = ROOT.parent / "serial-studio"
OUT, SMALL, MIX = WORK / f"out/{NAME}.mp4", WORK / f"out/{NAME}_small.mp4", WORK / "audio/mix.wav"


def remote_anim():
    for p in [SERIAL / "tools/remote_anim.py", *sorted((SERIAL / ".claude/worktrees").glob("*/tools/remote_anim.py"))]:
        if p.exists():
            return p
    raise SystemExit("remote_anim.py не найден (serial-studio/tools или worktree сессии рендера)")


def remux_here():
    """In the tesla container: copy the video stream, put the new mix under it."""
    for src, br in ((OUT, "256k"), (SMALL, "160k")):
        tmp = src.with_name(src.stem + ".remux.mp4")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-i", str(MIX), "-map", "0:v:0", "-map", "1:a:0",
                        "-c:v", "copy", "-c:a", "aac", "-b:a", br, "-movflags", "+faststart", "-shortest", str(tmp)], check=True)
        tmp.replace(src)
        print(f"{src.name}: новая музыка, видео без перекодирования")


def main():
    rep = json.loads((WORK / "build/build_report.json").read_text())
    words = hashlib.sha256((WORK / "build/words.json").read_bytes()).hexdigest()
    if rep.get("inputs", {}).get("build/words.json") not in (None, words):
        raise SystemExit("words.json изменился после рендера кадров — нужен полный рендер (remote_anim без --no-render)")
    ra = remote_anim()
    # story.json + mix.wav come back; the SFX map and its events and the loudness report too (03.11: mix.py writes them)
    subprocess.run(["python3", str(ra), NAME, "--no-render", "--pull", f"eps/{NAME}/sfx_map.md", f"eps/{NAME}/build/sfx_events.json",
                    f"eps/{NAME}/build/audio_report.json"], check=True, cwd=ra.parents[1])
    ev = WORK / "build/sfx_events.json"   # 03.11: a parallel run on the same tesla mirror re-uploaded an old map over the new one
    if not ev.exists() or ev.stat().st_mtime < MIX.stat().st_mtime - 120:
        print("ВНИМАНИЕ: sfx_map.md / sfx_events.json старше mix.wav — параллельный прогон перезаписал карту на станции; звук верный, "
              "карту пересоберите: remote_anim.py <часть> --pull eps/<часть>/sfx_map.md eps/<часть>/build/sfx_events.json -- eps/<часть>/mix.py")
    me = Path(__file__).resolve()
    subprocess.run(["python3", str(SERIAL / "tools/remote_run.py"), "--no-gpu", "--sync", str(OUT), str(SMALL), str(MIX), str(me),
                    "--pull", str(OUT), str(SMALL), "--", "python3", str(me), "--remote"], check=True, cwd=SERIAL)
    print(f"дальше: python3 eps/{NAME}/qa_deliver.py")


if __name__ == "__main__":
    remux_here() if "--remote" in sys.argv else main()
