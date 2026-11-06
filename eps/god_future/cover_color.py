"""Обложки 3:4 (1080×1440) цветной версии «Бог ещё не создан» — eps/god_future_color_pN/delivery/cover.jpg.

Правило владельца (06.11, docs/FORMAT.md «Обложка»): внизу обложки текста нет — его закрывают значки рейтинга и просмотров.
Поэтому «ЧАСТЬ N» и заголовок (2 строки, вторая — золотом, как акцент заголовков ролика) — вверху; под ними — кадр из
сданного файла: окно без заголовка кадра и без субтитров (y 440…1000 кадра 1080×1920, середина 860 px, увеличено до
ширины 1080); ниже — только тёмный фон. ffmpeg drawtext — на tesla (правило владельца), Mac только запускает.

    python3 eps/god_future/cover_color.py
"""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
FONT = ROOT / "fonts/IBMPlexMono-SemiBold.ttf"
# часть: (секунда кадра, строка 1, строка 2 — золотом)
CFG = {1: (1.5, "ЗАЧЕМ ЛЮДЯМ", "БОГИ?", 490), 2: (1.0, "ОТ МЕСТИ", "К МИЛОСЕРДИЮ", 430), 3: (71.0, "БОГ", "БУДУЩЕГО", 497)}
# окно кадра 860×430 без заголовка кадра, подписей внизу и субтитров -> картинка 1080×540 на y 520…1060; ниже (26 %) — фон
BG = "0x1b0b40"                       # тёмно-фиолетовый верх фона цветной версии
CROP_X, CROP_W, CROP_H = 110, 860, 430
PIC_Y = 520


def paths(n):
    work = ROOT / f"eps/god_future_color_p{n}"
    return work / f"delivery/god_future_color_p{n}.mp4", work / "delivery/cover.jpg"


def remote():
    for n, (t, l1, l2, cy) in CFG.items():
        src, out = paths(n)
        texts = []
        for i, s in enumerate([f"ЧАСТЬ {n}", l1, l2]):
            p = out.parent / f".cover_{i}.txt"
            p.write_text(s)
            texts.append(p)
        dt = f"drawtext=fontfile={FONT}:x=(w-text_w)/2"
        vf = ";".join([
            f"[0:v]crop={CROP_W}:{CROP_H}:{CROP_X}:{cy},scale=1080:540,pad=1080:1440:0:{PIC_Y}:color={BG}[p]",
            "[p]" + ",".join([
            f"{dt}:textfile={texts[0]}:fontsize=150:fontcolor=white:borderw=2:bordercolor=white:y=44",
            f"{dt}:textfile={texts[1]}:fontsize=100:fontcolor=white:y=236",
            f"{dt}:textfile={texts[2]}:fontsize=100:fontcolor=0xffc94a:y=356"])])
        subprocess.run(["/usr/bin/ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", str(src), "-frames:v", "1",
                        "-filter_complex", vf, "-q:v", "2", str(out)], check=True)
        for p in texts:
            p.unlink()
        print(out)


def main():
    serial = Path.home() / "Projects/serial-studio"
    me = Path(__file__).resolve()
    sync = [str(paths(n)[0]) for n in CFG] + [str(me), str(FONT)]
    pull = [str(paths(n)[1]) for n in CFG]
    subprocess.run(["python3", str(serial / "tools/remote_run.py"), "--no-gpu", "--sync", *sync, "--pull", *pull,
                    "--", "python3", str(me), "--remote"], check=True, cwd=serial)


if __name__ == "__main__":
    remote() if "--remote" in sys.argv else main()
