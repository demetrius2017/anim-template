"""Обложка 3:4 (1080×1440) части 3 «Бог будущего» из кадра сданного файла: «ЧАСТЬ 3» и заголовок (2 строки) — ВВЕРХУ,
под ними кадр; внизу текста нет — его закрывают значки рейтинга и просмотров (владелец 06.11, docs/FORMAT.md «Обложка»). Окно кадра — без полосы субтитров (в раскладке
story.safe верх субтитров ≈ 1007 px кадра 1080×1920): y 170…1000. ffmpeg drawtext — на tesla (правило владельца).

    python3 eps/god_future_p3/cover.py            # все варианты -> delivery/cover_<k>.jpg
"""
from pathlib import Path
import subprocess
import sys

WORK = Path(__file__).resolve().parent
FONT = WORK.parents[1] / "fonts/IBMPlexMono-SemiBold.ttf"
SRC = WORK / f"delivery/{WORK.name}.mp4"
# вариант: (секунда кадра, строки заголовка)
VARIANTS = {"A": (75.8, ["ИИ — НОВЫЙ", "МЕССИЯ?"]),
            "B": (50.6, ["УЧИТЕЛЬ", "ИЛИ СУДЬЯ?"]),
            "C": (104.6, ["КОГО МЫ", "РАСТИМ?"])}
PART = "ЧАСТЬ 3"
CROP_Y, PIC_H, PIC_Y = 170, 830, 560   # кадр ниже текста; нижние ≈ 30 % обложки — только картинка


def out(k):
    return WORK / f"delivery/cover_{k}.jpg"


def remote():
    for k, (t, title) in VARIANTS.items():
        texts = []
        for i, s in enumerate([PART, *title]):
            p = WORK / f"delivery/.cover_{k}_{i}.txt"
            p.write_text(s)
            texts.append(p)
        dt = f"drawtext=fontfile={FONT}:fontcolor=white:x=(w-text_w)/2"
        vf = ",".join([
            f"crop=1080:{PIC_H}:0:{CROP_Y}", f"pad=1080:{PIC_Y + PIC_H}:0:{PIC_Y}:black", "crop=1080:1440:0:0",
            f"{dt}:textfile={texts[0]}:fontsize=168:borderw=3:bordercolor=white:y=34",
            f"{dt}:textfile={texts[1]}:fontsize=106:y=226",
            f"{dt}:textfile={texts[2]}:fontsize=106:y=346",
        ])
        subprocess.run(["/usr/bin/ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", str(SRC), "-frames:v", "1",
                        "-vf", vf, "-q:v", "2", str(out(k))], check=True)
        for p in texts:
            p.unlink()
        print(out(k))


def main():
    serial = Path.home() / "Projects/serial-studio"
    me = Path(__file__).resolve()
    pulls = [str(out(k)) for k in VARIANTS]
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--no-gpu", "--sync", str(SRC), str(me), str(FONT),
                    "--pull", *pulls, "--", "python3", str(me), "--remote"], check=True, cwd=serial)


if __name__ == "__main__":
    remote() if "--remote" in sys.argv else main()
