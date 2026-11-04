"""Cover 3:4 (1080×1440) from a frame of the delivered file: big «ЧАСТЬ N» on top, the picture, a short title below.

Same as eps/time_states_p1/cover.py. The safe layout (story.safe) keeps the picture in y ≈ 230–1000 of the 1080×1920
frame and the captions start at y ≈ 1007, so the window 230..1000 takes the picture and no caption.
ffmpeg drawtext runs on tesla (owner's rule; /usr/bin/ffmpeg of the QA image has drawtext); the Mac only orchestrates.
Writes delivery/cover.jpg.
"""
from pathlib import Path
import subprocess
import sys

WORK = Path(__file__).resolve().parent
FONT = WORK.parents[1] / "fonts/IBMPlexMono-SemiBold.ttf"
SRC, OUT = WORK / f"delivery/{WORK.name}.mp4", WORK / "delivery/cover.jpg"
# frame time (s), part label, title lines — per part
CFG = {"universe_net_p1": (1.6, "ЧАСТЬ 1", ["КАК УСТРОЕН", "CHATGPT"]),
       "universe_net_p2": (0.3, "ЧАСТЬ 2", ["ЗАЧЕМ", "ВСЕЛЕННОЙ ТЫ?"])}
T, PART, TITLE = CFG[WORK.name]
CROP_Y, PIC_H, PIC_Y = 230, 770, 230  # picture window in the frame, its height, its top on the cover


def remote():
    texts = []
    for i, s in enumerate([PART, *TITLE]):
        p = WORK / f"delivery/.cover_{i}.txt"
        p.write_text(s)
        texts.append(p)
    dt = f"drawtext=fontfile={FONT}:fontcolor=white:x=(w-text_w)/2"
    vf = ",".join([
        f"crop=1080:{PIC_H}:0:{CROP_Y}", f"pad=1080:1440:0:{PIC_Y}:black",
        f"{dt}:textfile={texts[0]}:fontsize=168:borderw=3:bordercolor=white:y=34",
        f"{dt}:textfile={texts[1]}:fontsize=106:y={PIC_Y + PIC_H + 22}",
        f"{dt}:textfile={texts[2]}:fontsize=106:y={PIC_Y + PIC_H + 22 + 120}",
    ])
    subprocess.run(["/usr/bin/ffmpeg", "-v", "error", "-y", "-ss", str(T), "-i", str(SRC), "-frames:v", "1",
                    "-vf", vf, "-q:v", "2", str(OUT)], check=True)
    for p in texts:
        p.unlink()
    print(OUT)


def main():
    serial = Path.home() / "Projects/serial-studio"
    me = Path(__file__).resolve()
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--no-gpu", "--sync", str(SRC), str(me), str(FONT),
                    "--pull", str(OUT), "--", "python3", str(me), "--remote"], check=True, cwd=serial)


if __name__ == "__main__":
    remote() if "--remote" in sys.argv else main()
