"""Утверждённый текст ролика -> build/script.json обеих частей (eps/god_future_p1, eps/god_future_p2).

    python3 eps/god_future/make_parts.py eps/god_future/source/text_vN.md

Текст — как для blind_read.py: «## Часть N …», строки «NN. фраза», [карточка: ТЕКСТ; мелко: …] в последней строке.
id фраз: a01… (часть 1), b01… (часть 2). Пауза после фразы — 0,3 с; после хука — 0,4 с; перед поворотом
(фраза начинается с «Выходит», «Что, если», «Отсюда», «Но », «На мой взгляд», «Бог ещё не создан») — 0,5 с.
Голос один на весь ролик (tts.json частей одинаковые). Числа — словами в самом тексте озвучки (CLAUDE.md «Озвучка»).
"""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
TURN = ("Выходит", "Что, если", "Отсюда", "Но ", "На мой взгляд", "Бог ещё не создан", "Дальше —", "Такой Бог")
NUM = {"1956": "тысяча девятьсот пятьдесят шестом", "1944": "тысяча девятьсот сорок четвёртом"}


def parse(text):
    parts = {}
    cur = None
    for line in text.splitlines():
        m = re.match(r"^##\s*Часть\s*(\d+)\s*—\s*«(.+)»", line)
        if m:
            cur = parts.setdefault(int(m.group(1)), {"title": m.group(2), "phrases": []})
            continue
        m = re.match(r"^\s*(\d+)\.\s+(.+)$", line)
        if m and cur is not None:
            cur["phrases"].append(m.group(2).strip())
    return parts


def main(src):
    parts = parse(Path(src).read_text())
    # стабильные id (source/ids.json): сцены gf_* ищут слова по id фразы, слитая фраза оставляет пропуск в нумерации
    ids_file = Path(__file__).resolve().parent / "source/ids.json"
    ids = json.loads(ids_file.read_text()) if ids_file.exists() else {}
    for n, part in parts.items():
        work = ROOT / f"eps/god_future_p{n}"
        (work / "build").mkdir(parents=True, exist_ok=True)
        phrases, card = [], None
        for i, raw in enumerate(part["phrases"]):
            m = re.search(r"\[карточка:\s*([^;\]]+)(?:;\s*мелко:\s*([^\]]+))?\]", raw)
            if m:
                card = {"text": m.group(1).strip(), "small": (m.group(2) or "").strip()}
            text = re.sub(r"\s*\[[^\]]*\]", "", raw).strip()
            for k, v in NUM.items():
                text = re.sub(rf"в {k} году", f"в {v} году", text)
                text = re.sub(rf"{k} года", f"{v[:-2]}ого года" if v.endswith("ом") else f"{v} года", text)
            nxt = re.sub(r"\s*\[[^\]]*\]", "", part["phrases"][i + 1]) if i + 1 < len(part["phrases"]) else ""
            pause = .4 if i == 0 else .5 if nxt.startswith(TURN) else .3
            pid = ids[str(n)][i] if str(n) in ids else f"{'ab'[n - 1]}{i + 1:02d}"
            phrases.append({"id": pid, "text": text, "voice": "narr", "pause": pause})
        sc = {"title": f"{part['title']}. Часть {n}", "lead": .05, "tail": .3,
              "end_card": {"dur": 3.5, "text": card["text"] if card else ""},
              "phrases": phrases}
        (work / "build/script.json").write_text(json.dumps(sc, ensure_ascii=False, indent=1) + "\n")
        # мелкая строка карточки (end_card движка знает только dur и text) — для story.py
        (work / "build/card.json").write_text(json.dumps(card or {}, ensure_ascii=False) + "\n")
        words = sum(len(p["text"].split()) for p in phrases)
        print(f"{work.name}: {len(phrases)} фраз, {words} слов -> build/script.json")


if __name__ == "__main__":
    main(sys.argv[1])
