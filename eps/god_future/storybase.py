"""Общая раскадровка двух частей «Бог ещё не создан» (eps/god_future_p1/story.py, eps/god_future_p2/story.py).

Каждая часть даёт BEATS — (id фразы, сцена, режим[, слово начала кадра]) — и карточку конца; здесь: K (начала и концы фраз,
слова каждой фразы — сцены сами находят свои слова через GF.w(K, id, «основа»)), кадры, субтитры страницами по смыслу в
безопасной зоне Reels + Shorts (storylib.safe_zone, решение владельца 04.11), числа цифрами (SUBS), подписи-источники
и карточка. Времена — только из озвучки (build/words.json; до озвучки — fake_words.py ролика), секунд руками нет.
Субтитры — как в eps/universe_net_p1/story.py: страница открывается на каждой фразе и после каждого предложения из двух
слов и больше; по ширине — по смыслу (после запятой, двоеточия, тире; служебное слово не заканчивает страницу).
"""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from storylib import Ep, NUMS, safe_zone  # noqa: E402

SAFE = safe_zone()
CAP_W = SAFE["cap"]["x1"] - SAFE["cap"]["x0"]
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SERVICE = set("а без бы в во где да для до если же за и из к ко как ли на над не ни "
              "но о об от по под при про с со то у через что чтобы это его её ей ему кто их им".split())
SUBS = [
    (["ста", "пятидесяти"], "150"),
    (["тысяча", "девятьсот", "пятьдесят", "шестом"], "1956"),
    (["тысяча", "девятьсот", "пятьдесят", "шестого"], "1956"),
    (["тысяча", "девятьсот", "сорок", "четвёртом"], "1944"),
]


class GodEp(Ep):
    keep_whole = ()
    page_starts = set()

    def _pages(self):
        words, _ = super()._pages()
        from PIL import ImageFont
        font = ImageFont.truetype(str(ROOT / "fonts/PTSerif-Italic.ttf"), 24)
        phrase = lambda i: words[i]["token_id"].split(".")[0]
        width = lambda page: sum(font.getlength(words[i]["w"]) + 5 for i in page)
        splits = lambda page: [n for n in range(1, len(page)) if max(width(page[:n]), width(page[n:])) <= CAP_W]
        fits = lambda page: width(page) <= CAP_W or bool(splits(page))
        for w in words:
            w.pop("br", None)
        pages, cur = [], []
        for i, w in enumerate(words):
            count = sum(len(words[j]["w"].split()) for j in cur)
            prev = words[cur[-1]] if cur else None
            sense = cur and (phrase(cur[-1]) != phrase(i) or w["token_id"] in self.page_starts or
                             (count >= 2 and re.search(r"[.!?»]$", prev["w"]) and re.search(r"[.!?]", prev["w"])))
            if sense:
                pages.append(cur)
                cur = []
            elif cur and not fits(cur + [i]):
                txt = lambda j: words[cur[j]]["w"]
                punct = [m for m in range(2, len(cur)) if re.search(r"[,:;]$", txt(m - 1)) or txt(m - 1) == "—"]
                svc = [m for m in range(2, len(cur)) if txt(m).lower() in SERVICE]
                m = max(punct) if punct else max(svc) if svc else len(cur)
                carry = cur[m:]
                cur = cur[:m]
                while len(cur) > 1 and words[cur[-1]]["w"].lower() in SERVICE:
                    carry.insert(0, cur.pop())
                pages.append(cur)
                cur = carry
            cur.append(i)
        if cur:
            pages.append(cur)
        for page in pages:
            if width(page) > CAP_W and len(page) > 1:
                cands = [n for n in splits(page) if words[page[n - 1]]["w"].lower() not in SERVICE and words[page[n]]["w"] != "—"]
                good = [n for n in cands if re.search(r"[,:—]$", words[page[n - 1]]["w"])] or cands or splits(page)
                if good:
                    cut = min(good, key=lambda n: abs(width(page[:n]) - width(page) / 2))
                    words[page[cut - 1]]["br"] = 1
        texts = [" ".join(words[i]["w"] for i in page) for page in pages]
        broken = [k for k in self.keep_whole if not any(k in text for text in texts)]
        broken += [text for text, page in zip(texts, pages) if words[page[-1]]["w"].lower() in SERVICE]
        if broken:
            raise SystemExit(f"Субтитры разорваны: {broken}")
        (self.work / "build/pages.txt").write_text("\n".join(texts) + "\n")
        return words, pages


def build(work, beats, sources=(), keep_whole=(), page_starts=(), aliases=None, views=()):
    """beats: [(pid, scene, mode[, stem начала кадра внутри фразы])]; sources: [(pid, stem, text)] — подпись-источник
    над субтитрами от слова stem до конца фразы. Карточка — из build/script.json (end_card) и build/card.json (мелко)."""
    E = GodEp(work=work)
    E.keep_whole, E.page_starts = tuple(keep_whole), set(page_starts)
    E.cap_chars, E.cap_lines = 28, 2
    NUMS[:0] = SUBS
    K = {}
    for pid in E.PH:
        K[pid], K[pid + "_end"] = round(E.t(pid), 5), round(E.te(pid), 5)
    K["voice_end"], K["end"] = round(E.wj["voice_end"], 5), round(E.dur, 5)
    K["card"] = round(E.te(list(E.PH)[-1]), 5)
    K["words"] = {pid: [{"w": w["w"], "t0": round(w["t0"], 5), "t1": round(w["t1"], 5)}
                        for w in E.W if w["ph"] == E.PIDX[pid]] for pid in E.PH}
    # Слитые фразы (утверждённый текст v12): сцене кадра нужен «свой» id — часть фразы от слова stem до её конца.
    # aliases = {"a10": ("a09", "но")}: K.a10 — начало слова «Но…» фразы a09, K.a10_end — конец a09, K.words.a10 — слова с него.
    for alias, (pid, stem) in (aliases or {}).items():
        t0 = E.wfind(pid, stem)
        K[alias], K[alias + "_end"] = round(t0, 5), K[pid + "_end"]
        K["words"][alias] = [w for w in K["words"][pid] if w["t0"] >= t0 - 1e-6]
    prev = None
    for i, (pid, scene, mode, *cue) in enumerate(beats):
        start = 0 if i == 0 else (E.wfind(pid, cue[0]) if cue else E.t(pid)) - .05
        p = dict(s=pid, mode=mode, K=K, prev=prev[0] if prev else None, prev_mode=prev[1] if prev else None)
        E.shot(scene, round(start, 5), p, dict(CAM))
        prev = (scene, mode)
    for pid, stem, text in sources:
        E.add("part", E.wfind(pid, stem) - .1, E.te(pid) + .2, y=SAFE["cap"]["top"] - 22, size=13,
              text=f'<span class="un-src">{text}</span>')
    # «ВЗГЛЯД АВТОРА» крупно, размером почти с субтитр, на 3 с от слова (слепой просмотр v1: мелкую подпись не видели 6 из 6)
    for pid, stem in views:
        t0 = E.wfind(pid, stem) - .1
        E.add("part", t0, t0 + 3.0, y=SAFE["cap"]["top"] - 40, size=20, text='<span class="gf-view">ВЗГЛЯД АВТОРА</span>')
    sc = json.loads((E.work / "build/script.json").read_text())
    card = json.loads((E.work / "build/card.json").read_text()) if (E.work / "build/card.json").exists() else {}
    title = sc["end_card"]["text"].replace(" — ", " —<br>", 1)
    small = f'<span class="gf-small">{card["small"]}</span>' if card.get("small") else ""
    E.add("part", K["card"], E.dur + .2, y=232, size=20,
          text=f'<span class="gf-card">{title}{small}</span>')
    # субтитры уходят, как только встаёт карточка (не висят под ней)
    E.write(frame=[360, 640], kicks=[], safe=SAFE, cap_off=[[min(K["voice_end"] + .2, K["card"] + .05), E.dur + 1]],
            marks={k: v for k, v in K.items() if k != "words"})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=1) + "\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": b[0], "scene": b[1], "mode": b[2], "shot_start": s["t0"], "shot_end": s["t1"],
         "speech_start": E.t(b[0]), "speech_end": E.te(b[0])} for b, s in zip(beats, E.shots)],
        ensure_ascii=False, indent=1) + "\n")
    return E
