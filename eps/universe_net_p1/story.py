"""«Сеть внутри сети», часть 1 (04.11): как собрать ChatGPT с нуля, затем вторая башня — Вселенная.

Текст — source/split_v5_text.md (утверждён владельцем 04.11), фразы и id — build/script.json. Совпадающие с
eps/universe_net фразы идут под старыми id и со старыми битами сцен un_*; хук hn и блок c1–c11 — своя анимация
engine/scenes/un_gpt.js (чужой ролик и всё, что из него сделано, не используются). 12 — башни un_towers/universe
с сетью, которая учится (un_x12), q — паутина хука гаснет, «зачем?» и точка (un_q), затем карточка
«ЧАСТЬ 2 — В ПРОФИЛЕ КАНАЛА». Безопасная зона Reels + Shorts (storylib.safe_zone): субтитры, подписи и карточка
в 8–82 % ширины и 14–62 % высоты, сцена ужата в зону. Все времена K — из озвучки, не руками.
"""
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS, safe_zone

BEATS = [
    ("hn", "un_gpt", "hook", "Две башни ChatGPT и Вселенная; общий кирпич «?»; левая разбирается до нижней плиты"),
    ("c1", "un_gpt", "brick", "Башня собирается заново; наезд в плиту: число 0,7 × вес 2 = 1,4; важность"),
    ("c2", "un_gpt", "sum", "Пять кирпичей в один узел Σ — взвешенная сумма"),
    ("c3", "un_gpt", "neuron", "Стеклянный шар, порог, вспышка — нейрон"),
    ("c4", "un_gpt", "net", "Ряд — слой, слои друг на друге — нейросеть"),
    ("c5", "un_gpt", "net", "Веса дрожат; этажи из стекла; ответ на 2 + 2 невпопад"),
    ("c6", "un_gpt", "learn", "Долина ошибки, веса подкручиваются, шар скатывается, ×1 000 000, ответ 4"),
    ("c7", "un_gpt", "tokens", "«Кот сел на окно.» → токены → столбики чисел"),
    ("c8", "un_gpt", "attention", "«сел» смотрит на всех, все на всех; к «Кот» дуга толще — внимание"),
    ("c9", "un_gpt", "blocks", "Сеть под дугами, блок трансформера; блоки — этажи башни"),
    ("c10", "un_gpt", "train", "Кот сел на ▯ → окно; страницы интернета; люди ✓; ChatGPT"),
    ("c11", "un_gpt", "billions", "Наезд до кирпича 0,7 × 2; миллиарды кирпичей; наплыв в башню un_towers"),
    ("t1", "un_towers", "intro", "Башня ChatGPT анфас; уходит влево"),
    ("t2", "un_towers", "ghost", "Справа проступает призрак второй башни"),
    ("2", "un_atom", "atom", "Наезд на основание; шар, кольцо → орбита"),
    ("3", "un_atom", "bond", "Отъезд для второго атома; плавный перевод к связи"),
    ("4", "un_energy", "activation", "Наезд к сигмоиде; проводка за шариком"),
    ("5", "un_molecule", "layer", "Вода 104,5°; отъезд от молекулы к слою"),
    ("t3", "un_towers", "chem", "Поднос садится первым этажом; линия к СЛОЙ"),
    ("t4", "un_protein", "organics", "Цепочка, дуги внимания; отъезд в этаж ОРГАНИКА"),
    ("t5", "un_towers", "stack", "КЛЕТКИ, ОРГАНИЗМЫ, БИОСФЕРА; вровень с левой"),
    ("7", "un_loss", "learning", "Обход поверхности; на «Смерть» срыв и гашение"),
    ("8", "un_person", "brain", "С вершины башни к сети внутри головы"),
    ("8", "un_towers", "sees", "ТЫ на вершине; взгляд проходит по всей башне", "sees"),
    ("t6", "un_towers", "built", "ТЫ на вершине; дуга к первой башне; ChatGPT вспыхивает"),
    ("10", "un_nested", "nested", "Бесшовный отъезд через минимум три уровня"),
    ("11", "un_cosmos", "return", "Космическая паутина; наезд до двух шаров"),
    ("12", "un_x12", "universe", "Над правой башней Вселенная; внутри сеть, которая учится; интеллект"),
    ("q", "un_q", "question", "Паутина хука гаснет; «зачем?» и точка; карточка ЧАСТЬ 2"),
]
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SUBS = [
    (["восемьдесят", "шесть", "миллиардов"], "86 млрд"),
    (["четыре", "миллиарда"], "4 миллиарда"),
    (["десять", "в", "восьмидесятой", "степени"], "10⁸⁰"),
    (["два", "плюс", "два"], "2 + 2"),
]
SAFE = safe_zone()
CAP_W = SAFE["cap"]["x1"] - SAFE["cap"]["x0"]   # 259 px: line width of the captions in the safe zone
# A page also opens on every phrase and after every sentence of two or more words; these open one inside a sentence.
PAGE_STARTS = {
    "hn.7",                   # Собери ChatGPT…
    "c1.4", "c1.7",           # Её кирпич —; число, умноженное на вес.
    "c3.2",                   # набралось достаточно —
    "c6.4", "c6.6", "c6.9", "c6.11",  # мерить ошибку; и чуть-чуть подкручивать; туда, где ошибка меньше.
    "c7.6", "c7.10",          # Его режут…; и каждый становится…
    "c8.4", "c8.10",          # каждый токен смотрит…; и решает…
    "c9.5",                   # блок трансформера.
    "c10.5", "c10.9", "c10.14",  # на огромной части…; доучи…; и перед тобой ChatGPT.
    "c11.5",                  # снова число…
    "t1.5",                   # придумали не мы?
    "3.5",                    # и у неё есть сила.
    "t4.10",                  # где дальние буквы…
    "7.5", "7.9", "7.14",     # Неудачное…; и веса…; где ошибка падает.
    "8.13",                   # который видит…
    "11.6", "11.13",          # вернёшься…; повторённое…
    "12.5", "12.9", "12.23",  # на самом глубоком уровне; Вселенная может быть…; Вселенная и есть интеллект.
    "q.8",                    # зачем ей ты?
}
LINE_STARTS = {"7.19"}
SERVICE = set("а без бы в во где да для до если же за и из к ко как ли на над не ни "
              "но о об от по под при про с со то у через что чтобы это его её ей ему кто".split())
KEEP_WHOLE = ("Вселенная и есть интеллект.", "Химия — это базовый слой.", "Это нейрон.", "Это внимание.",
              "Органика — это трансформеры.", "Во второй части.")


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
    gpt_out = round(t("t1") - .5, 5)
    K.update({
        # hook and the ChatGPT block (un_gpt)
        "hn": t("hn"), "hn_uni": wf("hn", "вселенная"), "hn_built": wf("hn", "собраны"), "hn_recipe": wf("hn", "одному"),
        "hn_collect": wf("hn", "собери"), "hn_gpt2": E.wt("hn", 8), "hn_zero": wf("hn", "нуля"), "hn_compare": wf("hn", "сравни"),
        "c1": t("c1"), "c1_tower": wf("c1", "башня"), "c1_brick": wf("c1", "кирпич"), "c1_number": wf("c1", "число"),
        "c1_mult": wf("c1", "умноженное"), "c1_weight": E.wt("c1", 10), "c1_imp": E.wt("c1", 11), "c1_imp2": wf("c1", "важность"),
        "c2": t("c2"), "c2_bricks": wf("c2", "кирпичей"), "c2_stack": wf("c2", "сложенных"), "c2_sum": wf("c2", "взвешенная"),
        "c3": t("c3"), "c3_thr": wf("c3", "порог"), "c3_fill": wf("c3", "набралось"), "c3_enough": wf("c3", "достаточно"),
        "c3_fire": wf("c3", "срабатывает"), "c3_neuron": wf("c3", "нейрон"),
        "c4": t("c4"), "c4_layer": wf("c4", "слой"), "c4_layers": wf("c4", "слои"), "c4_net": wf("c4", "нейросеть"),
        "c5": t("c5"), "c5_random": wf("c5", "случайны"), "c5_tower": wf("c5", "башня"), "c5_wrong": wf("c5", "отвечает"),
        "c6": t("c6"), "c6_err": wf("c6", "мерить"), "c6_tweak": wf("c6", "подкручивать"), "c6_less": wf("c6", "туда"),
        "c6_mill": wf("c6", "миллионы"),
        "c7": t("c7"), "c7_text": wf("c7", "ей"), "c7_cut": wf("c7", "режут"), "c7_tokens": wf("c7", "кусочки"),
        "c7_nums": wf("c7", "становится"),
        "c8": t("c8"), "c8_trick": wf("c8", "главный"), "c8_looks": wf("c8", "смотрит"), "c8_others": wf("c8", "остальные"),
        "c8_decide": wf("c8", "решает"), "c8_imp": wf("c8", "кто"), "c8_att": wf("c8", "внимание"),
        "c9": t("c9"), "c9_net": wf("c9", "нейросеть"), "c9_block": wf("c9", "блок"), "c9_many": wf("c9", "десятки"),
        "c9_floors": wf("c9", "этажи"),
        "c10": t("c10"), "c10_next": wf("c10", "следующий"), "c10_net": wf("c10", "огромной"), "c10_people": wf("c10", "доучи"),
        "c10_gpt": E.wt("c10", 14), "c10_name": wf("c10", "chatgpt"),
        "c11": t("c11"), "c11_brick": wf("c11", "кирпича"), "c11_number": wf("c11", "число"), "c11_weight": E.wt("c11", 9),
        "c11_bill": wf("c11", "миллиарды"), "c11_only": wf("c11", "только"), "gpt_out": gpt_out, "hook_cut": gpt_out,
        # old phrases t1…11: the same cues as eps/universe_net/story.py
        "not_us": wf("t1", "не"), "second_tower": wf("t2", "вторая"), "older": wf("t2", "старше"),
        "atom": wf("2", "атом"), "ordinary": wf("2", "ничего"),
        "second": t("3"), "bond": wf("3", "связь"), "strength": wf("3", "сила"),
        "bond_weight": wf("3", "вес"), "recognize": wf("3", "узнаёшь"),
        "low_energy": t("4"), "enough": wf("4", "хватит"), "reaction": wf("4", "реакция"), "like_neuron": wf("4", "нейрон"),
        "join": t("5"), "molecule": wf("5", "молекула"), "layer": te("5"), "s6": t("t3"),
        "chem": wf("t3", "химия"), "base_layer": wf("t3", "базовый"),
        "organics": wf("t4", "органика"), "transformers": wf("t4", "трансформеры"),
        "protein": wf("t4", "белок"), "aminos": wf("t4", "аминокислот"), "far": wf("t4", "дальние"),
        "net": wf("t4", "нейросеть"), "attention": wf("t4", "внимани"),
        "cells": wf("t5", "клетки"), "organisms": wf("t5", "организмы"), "biosphere": wf("t5", "биосфера"),
        "who": t("7"), "death": wf("7", "смерть"), "random": t("7"), "learn": t("7"),
        "mistake": wf("7", "смерть"), "mutation": wf("7", "неудачное"), "fit": wf("7", "удачное"),
        "shift": wf("7", "сдвигаются"), "loss": wf("7", "ошибка"), "years": wf("7", "почти"),
        "inner": t("8"), "other_net": wf("8", "другая"), "neurons_number": wf("8", "восемьдесят"),
        "neurons": wf("8", "нейронов"), "you": wf("8", "ты"), "sees": wf("8", "видит"), "whole_tower": wf("8", "башню"),
        "built": wf("t6", "построил"), "chatgpt": wf("t6", "башню"),
        "nested_1": E.wt("10", 0), "nested_2": E.wt("10", 2), "nested_3": E.wt("10", 4),
        "cosmos": wf("11", "вселенную"), "beginning": wf("11", "началу"),
        "number_return": wf("11", "число"), "weight_return": wf("11", "вес"),
        "power": wf("11", "десять"), "atoms_count": wf("11", "столько"),
        # 12 (new text): the source line is a runtime overlay, so the scene's own small one stays off (no K.vanchurin)
        "hypothesis": t("12"), "u_src": wf("12", "гипотеза"), "u_deep": wf("12", "глубоком"),
        "universe": E.wt("12", 9), "u_net": wf("12", "нейросетью"), "u_learn": wf("12", "учится"),
        "u_if": wf("12", "если"), "u_view": wf("12", "взгляд"), "intellect": wf("12", "интеллект"),
        "g1": te("12") + 3.0,  # the towers' labels stay to the end of 12; q dissolves from them
        # q: the hook's web burns out, «зачем?», one point; un_hook cues, the tower never grows
        "q": t("q"), "h_fades": wf("q", "гаснет"), "h_why": wf("q", "зачем"), "h_you": E.wt("q", 10),
        "h_build": 1e6, "h_answer": 1e6, "hook_end": 1e6, "q_part2": wf("q", "во"),
        "voice_end": E.wj["voice_end"], "end": E.dur,
    })
    K["card"] = round(te("q"), 5)
    K = {key: round(value, 5) for key, value in K.items()}
    K["pill_text"] = ["Кот", "сел", "на", "ок", "но", "."]   # un_protein: our own token row of c7, not the source film's
    K["words"] = {pid: [{"w": w["w"], "t0": w["t0"], "t1": w["t1"], "token_id": w["token_id"]}
                        for w in E.W if w["ph"] == E.PIDX[pid]] for pid in E.PH}
    for i, (pid, scene, mode, _, *cue) in enumerate(BEATS):
        start = 0 if i == 0 else K["gpt_out"] + .55 if pid == "t1" else K[cue[0]]-.05 if cue else t(pid)-.05
        E.shot(scene, start, dict(s=f"s{pid}", mode=mode, K=K), dict(CAM))
    # Source of the hypothesis: big enough to read (13 px of 360), above the captions, inside the safe zone.
    E.add("part", K["u_src"]-.1, te("12"), y=SAFE["cap"]["top"]-22, size=13,
          text='<span class="un-src">Vanchurin, Entropy 22, 1210 (2020)</span>')
    # End card: part 2 is in the channel profile. Big, framed, in the safe zone; the captions are off by then.
    E.add("part", K["card"], E.dur+.2, y=250, size=22,
          text='<span class="un-card">ЧАСТЬ 2 —<br>В ПРОФИЛЕ КАНАЛА</span>')
    E.write(frame=[360, 640], kicks=[], safe=SAFE, cap_off=[[K["voice_end"]+.2, E.dur+1]],
            marks={k: v for k, v in K.items() if k not in ("words", "pill_text")})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=2)+"\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": b[0], "scene": b[1], "mode": b[2], "shot_start": s["t0"], "shot_end": s["t1"],
         "speech_start": t(b[0]), "speech_end": te(b[0]), "camera": b[3]} for b, s in zip(BEATS, E.shots)],
        ensure_ascii=False, indent=2)+"\n")


if __name__ == "__main__":
    main()
