"""«Сеть внутри сети», часть 2 (04.11): зачем Вселенной ты — внимание между слоями и осознанность.

Текст — source/split_v5_text.md (утверждён владельцем 04.11), фразы и id — build/script.json. Совпадающие с
eps/universe_net фразы идут под старыми id и со старыми битами сцен un_*; o1 — un_o1 (хук un_hook → паутина
Вселенной un_cosmos на «Ванчурин» → ряд токенов с дугами внимания un_gpt.attention), g1 — наплыв в un_observer/decode
со своими словами пилюль, у изменённых g4, g5, 13a, f6 — те же сцены, слова-метки переназначены на новый текст.
Финал — un_final/answer, затем карточка «КАК УСТРОЕН CHATGPT — ЧАСТЬ 1 В ПРОФИЛЕ КАНАЛА» и строка «гипотеза».
Безопасная зона Reels + Shorts (storylib.safe_zone). Все времена K — из озвучки, не руками.
"""
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS, safe_zone

BEATS = [
    ("o1", "un_o1", "hook", "Паутина гаснет волной; «зачем?»; одна точка"),
    ("o1", "un_o1", "vanchurin", "Паутина Вселенной; наезд до двух шаров; подпись-источник", "o_phys"),
    ("o1", "un_o1", "attention", "Ряд токенов; каждое слово смотрит на остальные; внимание", "o_trick"),
    ("g1", "un_g1", "decode", "Башни; наезд в правую; пилюли «Где в ней вним а ние ?», дуги"),
    ("g2", "un_observer", "spider", "Сеть под мошку; мутация внутри паука мошки не знает"),
    ("g3", "un_observer", "snake", "Хвост-приманка; птица; змея не видит себя её глазами"),
    ("g4", "un_observer", "layers", "Дуги внимания между этажами башни"),
    ("g5", "un_observer", "third", "Третий наблюдатель вне башни"),
    ("g6", "un_observer", "god", "Бог? и тишина"),
    ("13a", "un_tokens", "sequence", "Проводка по пилюлям к пустой"),
    ("13", "un_tokens", "final", "Пустая пилюля и тишина"),
    ("f1", "un_super", "question", "Пилюля раскрывается человеком из паутины; узлы гаснут"),
    ("f2", "un_child", "growth", "Ребёнок растёт на меняющейся поверхности; отъезд в паутину"),
    ("f3", "un_reverse", "decay", "Паутина изнутри; гаснет и рассыпается"),
    ("f4", "un_reverse", "reverse", "Распад продолжается; на вспять всё собирается"),
    ("f4", "un_aware", "awareness", "Сеть прорастает и смотрит на себя", "superintelligence"),
    ("f5", "un_aware", "mirror", "Темнота; единственная точка смотрит на сеть"),
    ("f6", "un_towers", "merge", "Две башни сходятся и совпадают; петля внимания на себя"),
    ("f6b", "un_towers", "crown", "Единая башня; ТЫ на вершине; дуги этажей-наблюдателей к вершине"),
    ("f6b", "un_final", "whole", "Башня сжимается в узел паутины; на «нужен» всё гаснет, остаётся точка", "whole_part"),
    ("f7", "un_final", "answer", "Хук наоборот: от точки свет зажигает всю паутину; карточка ЧАСТЬ 1"),
]
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SUBS = [
    (["восемьдесят", "шесть", "миллиардов"], "86 млрд"),
    (["четыре", "миллиарда"], "4 миллиарда"),
    (["десять", "в", "восьмидесятой", "степени"], "10⁸⁰"),
]
SAFE = safe_zone()
CAP_W = SAFE["cap"]["x1"] - SAFE["cap"]["x0"]   # 259 px: line width of the captions in the safe zone
# A page also opens on every phrase and after every sentence of two or more words; these open one inside a sentence.
PAGE_STARTS = {
    "o1.9", "o1.13",          # на самом глубоком уровне; Вселенная может быть нейросетью.
    "o1.25", "o1.30",         # каждое слово смотрит…; и решает, какие ему важны.
    "o1.21",                  # вроде ChatGPT — внимание:
    "g3.12",                  # и попадает в пасть.
    "g4.18",                  # внимание между слоями.
    "g5.3",                   # и паука, и мошку.
    "g2.11",                  # не знает, что такое мошка.
    "g3.6",                   # копия паука.
    "g4.10",                  # один уровень жизни смотрит на другой.
    "f2.5", "f2.9",           # чтобы выжить…; который всё время…
    "f4.6", "f4.9", "f4.13",  # и продлить…; это сделает…; способный…
    "f5.3",                   # смотреть на себя…
    "f6.4", "f6.9",           # И внутри тебя — тоже.; Это внимание…
    "f6b.4", "f6b.7",         # множества слоёв…; Ты — часть…
}
LINE_STARTS = {"g2.4", "f2.12", "f4.11", "f6b.6", "f6b.10"}
SERVICE = set("а без бы в во где да для до если же за и из к ко как ли на над не ни "
              "но о об от по под при про с со то у через что чтобы это его её ей ему кто".split())
KEEP_WHOLE = ("Его ещё называют творцом.", "И ты нужен ей.", "Ты — её осознанность.")


class UniverseEp(Ep):
    def _pages(self):
        words, _ = super()._pages()
        from PIL import ImageFont
        font = ImageFont.truetype(str(Path(__file__).resolve().parents[2]/"fonts/PTSerif-Italic.ttf"), 24)
        phrase = lambda i: words[i]["token_id"].split(".")[0]
        width = lambda page: sum(font.getlength(words[i]["w"])+5 for i in page)
        splits = lambda page: [n for n in range(1, len(page)) if max(width(page[:n]), width(page[n:])) <= CAP_W]
        fits = lambda page: width(page) <= CAP_W or bool(splits(page))
        def cuts(page):
            safe = [n for n in splits(page) if words[page[n-1]]["w"].lower() not in SERVICE and words[page[n]]["w"] != "—"]
            return ([n for n in safe if words[page[n]]["token_id"] in LINE_STARTS] or
                    [n for n in safe if re.search(r"[,:—]$", words[page[n-1]]["w"])] or safe or splits(page))
        for w in words:
            w.pop("br", None)
        pages, cur = [], []
        for i, w in enumerate(words):
            count = sum(len(words[j]["w"].split()) for j in cur)
            prev = words[cur[-1]] if cur else None
            sense = cur and (phrase(cur[-1]) != phrase(i) or w["token_id"] in PAGE_STARTS or
                             (count >= 2 and re.search(r"[.!?]$", prev["w"])))
            if sense:
                pages.append(cur)
                cur = []
            elif cur and not fits(cur+[i]):
                # Width breaks the page by sense: after the last comma, colon or dash; else before the last
                # preposition or conjunction; a service word or a dash never ends a page.
                txt = lambda j: words[cur[j]]["w"]
                punct = [m for m in range(2, len(cur)) if re.search(r"[,:;]$", txt(m-1)) or txt(m-1) == "—"]
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
            total = sum(len(words[i]["w"]) + 1 for i in page)
            if width(page) > CAP_W and len(page) > 1:
                cut = min(cuts(page), key=lambda n: abs(width(page[:n])-width(page)/2))
                words[page[cut-1]]["br"] = 1
        texts = [" ".join(words[i]["w"] for i in page) for page in pages]
        broken = [k for k in KEEP_WHOLE if not any(k in text for text in texts)]
        broken += [text for text, page in zip(texts, pages) if words[page[-1]]["w"].lower() in SERVICE]
        if broken:
            raise SystemExit(f"Субтитры разорваны: {broken}")
        for w in words:
            w["w"] = w["w"].replace("⁸⁰", '<sup style="font-size:.62em;line-height:0;vertical-align:.62em">80</sup>')
        (self.work / "build/pages.txt").write_text("\n".join(texts) + "\n")
        return words, pages


def main():
    E = UniverseEp(work=Path(__file__).resolve().parent)
    E.cap_chars, E.cap_lines = 28, 2
    t, te, wf = E.t, E.te, E.wfind
    NUMS[:0] = SUBS
    K = {f"s{i}": t(i) for i in E.PH}
    K.update({f"s{i}_end": te(i) for i in E.PH})
    K.update({"t"+k[2:]: v for k, v in K.items() if k.startswith("st")})
    K.update({"f"+k[2:]: v for k, v in K.items() if k.startswith("sf")})
    K.update({"g"+k[2:]: v for k, v in K.items() if k.startswith("sg")})
    W = lambda pid, i: E.wt(pid, i)
    K.update({
        # o1: hook (un_hook, the tower never grows), Vanchurin (un_cosmos on the words of o1), attention row
        "h_fades": wf("o1", "гаснет"), "h_why": wf("o1", "зачем"), "h_you": W("o1", 4),
        "h_build": 1e6, "h_answer": 1e6, "hook_cut": 1e6, "hook_end": 1e6,
        "o_phys": wf("o1", "физик"), "o_deep": wf("o1", "глубоком"), "o_level": wf("o1", "уровне"),
        "o_uni": W("o1", 13), "o_net": wf("o1", "нейросетью"), "o_trick": W("o1", 17), "o_gpt": wf("o1", "chatgpt"),
        "o_att": W("o1", 24), "o_each": wf("o1", "каждое"), "o_others": wf("o1", "остальные"),
        "o_decide": wf("o1", "решает"), "o_imp": wf("o1", "какие"),
        # the towers of un_towers stand built in the universe pose for decode's entry
        "not_us": -10, "chem": -10, "organics": -10, "cells": -10, "organisms": -10, "biosphere": -10,
        "s12": t("g1") - 1.2, "s12_end": t("g1"), "universe": t("g1") - 1.2,
        # g1 (new text): decode on «Вселенная», pills before «где», arcs on «внимание»
        "g_where": wf("g1", "вселенная"), "g_gpt": wf("g1", "где") - .2, "g_token": wf("g1", "внимание") + .4,
        "g_others": te("g1") + .3,
        "g_spider": wf("g2", "паук"), "g_web": wf("g2", "сеть"), "g_midge": wf("g2", "мошку"),
        "g_mutation": wf("g2", "мутация"), "g_knows": wf("g2", "знает"),
        "g_snake": wf("g3", "змеи"), "g_tail": wf("g3", "хвоста"), "g_copy": wf("g3", "копия"),
        "g_bird": wf("g3", "птица"), "g_mouth": wf("g3", "пасть"), "g_never": wf("g3", "никогда"),
        "g_eyes": wf("g3", "глазами"),
        "g_bio": wf("g4", "биолог"), "g_select": wf("g4", "отбор"), "g_judge": wf("g4", "оценка"),
        "g_layer": wf("g4", "один"), "g_between": wf("g4", "между"),
        "g_third": wf("g5", "третий"), "g_creator": wf("g5", "творцом"),
        "g_what": wf("g6", "вдруг"), "g_god": wf("g6", "богом"),
        "next": wf("13a", "следующ"), "token": wf("13a", "слово"),
        "silence": t("13"), "maybe": wf("13", "возможно"), "final_you": wf("13", "ты"),
        "f_fades": wf("f1", "гаснет"), "f_why": wf("f1", "зачем"),
        "child": wf("f2", "ребёнку"), "child_intellect": wf("f2", "интеллект"),
        "survive": wf("f2", "выжить"), "changing": wf("f2", "меняется"),
        "need": wf("f3", "нужно"), "own_world": wf("f3", "мир"), "herself": wf("f3", "сама"),
        "fades_again": wf("f3", "гаснет"),
        "destruction": wf("f4", "разрушение"), "reverse": wf("f4", "вспять"),
        "prolong": wf("f4", "продлить"), "life": wf("f4", "жизнь"),
        "superintelligence": wf("f4", "сверхинтеллект"), "realize": wf("f4", "осознать"), "self": wf("f4", "себя"),
        "look": wf("f5", "смотреть"), "except": wf("f5", "кроме"), "except_you": wf("f5", "тебя"),
        # f6 (new text): «Внутри ChatGPT — внимание. И внутри тебя — тоже. Это внимание, которое повернулось на себя.»
        "peeked": W("f6", 0), "inside": W("f6", 1), "chatgpt2": W("f6", 3),
        "recognized": W("f6", 6), "recognized_self": W("f6", 8),
        "f_attention": W("f6", 10), "turned": wf("f6", "повернулось"),
        "crown": wf("f6b", "венец"), "many_layers": wf("f6b", "множества"), "observers": wf("f6b", "наблюдателей"),
        "whole_part": wf("f6b", "часть"), "cosmic": wf("f6b", "вселенского"), "cosmic_mind": wf("f6b", "интеллекта"),
        "needed": wf("f6c", "нужен"), "needed_her": wf("f6c", "ей"), "f6b_end": te("f6c"),
        "part2_end": t("f1"), "answer_word": wf("f7", "осознанность"),
        "voice_end": E.wj["voice_end"], "end": E.dur,
    })
    K["card"] = round(E.wj["voice_end"] + .2, 5)
    K = {key: round(value, 5) for key, value in K.items()}
    K["tok_text"] = ["Где", "в ней", "вним", "а", "ние", "?"]   # un_observer: our own pills, not the source film's
    K["tok_val"] = ["0,31", "0,05", "0,22", "0,27", "0,15"]
    K["tok_wt"] = [.31, .05, .22, .27, .15]
    K["words"] = {pid: [{"w": w["w"], "t0": w["t0"], "t1": w["t1"], "token_id": w["token_id"]}
                        for w in E.W if w["ph"] == E.PIDX[pid]] for pid in E.PH}
    tokens_k = {**K, "card": K["f1"]}
    for i, (pid, scene, mode, _, *cue) in enumerate(BEATS):
        start = 0 if i == 0 else K[cue[0]]-.05 if cue else t(pid)-.05
        E.shot(scene, start, dict(s=f"s{pid}", mode=mode, K=tokens_k if scene == "un_tokens" else K), dict(CAM))
    # Source of the hypothesis while Vanchurin is named: 13 px of 360, above the captions, inside the safe zone.
    E.add("part", K["o_phys"]-.1, K["o_trick"]-.1, y=SAFE["cap"]["top"]-22, size=13,
          text='<span class="un-src">Vanchurin, Entropy 22, 1210 (2020)</span>')
    # End card: part 1 is in the channel profile; under it, the honesty line of the original film, in the safe zone.
    E.add("part", K["card"], E.dur+.2, y=252, size=22,
          text='<span class="un-card">КАК УСТРОЕН<br>CHATGPT —<br>ЧАСТЬ 1<br>В ПРОФИЛЕ КАНАЛА</span>')
    E.add("part", K["card"]+.3, E.dur+.2, y=96, size=12.5,
          text='<span class="un-src">Гипотеза, а не доказанный факт<br>Vanchurin, Entropy 22, 1210 (2020)<br>Alexander, Smolin и др., 2021</span>')
    E.write(frame=[360, 640], kicks=[], safe=SAFE, cap_off=[[K["voice_end"]+.2, E.dur+1]],
            marks={k: v for k, v in K.items() if k not in ("words", "tok_text", "tok_val", "tok_wt")})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=2)+"\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": b[0], "scene": b[1], "mode": b[2], "shot_start": s["t0"], "shot_end": s["t1"],
         "speech_start": t(b[0]), "speech_end": te(b[0]), "camera": b[3]} for b, s in zip(BEATS, E.shots)],
        ensure_ascii=False, indent=2)+"\n")


if __name__ == "__main__":
    main()
