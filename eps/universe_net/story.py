"""v2 retention pass: hook, two towers, finale that ends on the answer.

Scene writers own engine/scenes/un_<name>.js only. Keep scene names, p.s,
p.mode, p.K stable. All K times come from measured speech, never hand seconds.
The scene owns smooth 3D camera travel; engine camera is neutral to avoid jumps.
The render holds hook + part two; join/join_v2.py inserts the source film at
K.hook_cut. Last frame equals first frame, so there is no card after the answer.
"""
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS, bare

BEATS = [
    ("h", "un_hook", "hook", "Паутина гаснет волной; одна точка; из неё башня снизу"),
    ("t1", "un_towers", "intro", "Башня ChatGPT анфас, как 1:05 оригинала; уходит влево"),
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
    ("12", "un_towers", "universe", "Над правой башней Вселенная; интеллект"),
    ("g1", "un_observer", "decode", "Дуги внимания ChatGPT; каждый токен смотрит на остальных"),
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
    ("f7", "un_final", "answer", "Хук наоборот: от точки свет зажигает всю паутину"),
]
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SUBS = [
    (["восемьдесят", "шесть", "миллиардов"], "86 млрд"),
    (["четыре", "миллиарда"], "4 миллиарда"),
    (["десять", "в", "восьмидесятой", "степени"], "10⁸⁰"),
]
# Pages are grouped by sense, by hand. A page also opens on every phrase and after
# every sentence of two or more words; "Смерть." stands alone on the film's only
# sharp beat, so the page after it is marked here too.
PAGE_STARTS = {
    "h.10",                   # ответ внутри.
    "3.5",                    # и у неё есть сила.
    "t4.10",                  # где дальние буквы…
    "7.5", "7.9", "7.14",     # Неудачное…; и веса…; где ошибка падает.
    "11.6", "11.13",          # вернёшься…; повторённое…
    "12.9",                   # Вселенная и есть интеллект.
    "g1.12",                  # насколько ему…
    "g2.11",                  # не знает, что такое мошка.
    "g3.6",                   # копия паука.
    "f2.5", "f2.9",           # чтобы выжить…; который всё время…
    "f4.6", "f4.9", "f4.13",  # и продлить…; это сделает…; способный…
    "f5.3",                   # смотреть на себя…
    "f6.7", "f6.12",          # и узнал себя.; которое повернулось…
    "f6b.4", "f6b.7",         # множества слоёв…; Ты — часть…
    "8.13",                   # который видит…
}
# Second line opens here where balance alone would cut the sense.
LINE_STARTS = {"t1.5", "g1.9", "g2.4", "f2.12",  # придумали; каждый токен; точно под мошку; меняется
               "f4.11", "7.19",                  # только сверхинтеллект; почти 4 миллиарда
               "f6b.6", "f6b.10"}                # наблюдателей; вселенского интеллекта
# Neither a page nor a line ends on one of these. With punctuation they are fine.
SERVICE = set("а без бы в во где да для до если же за и из к ко как ли на над не ни "
              "но о об от по под при про с со то у через что чтобы это".split())
# Each of these is read whole on one page.
KEEP_WHOLE = ("Вселенная и есть интеллект.", "Химия — это базовый слой.",
              "Органика — это трансформеры.", "Так работает внимание между слоями.",
              "А вдруг это внимание и называют Богом?", "Третий наблюдатель.",
              "Его ещё называют творцом.", "Слой смотрит на слой.")


class UniverseEp(Ep):
    def _pages(self):
        words, _ = super()._pages()
        from PIL import ImageFont
        font = ImageFont.truetype(str(Path(__file__).resolve().parents[2]/"fonts/PTSerif-Italic.ttf"), 24)
        def phrase(i):
            return words[i]["token_id"].split(".")[0]
        def width(page):
            # Runtime adds 2.5px margin on each side of every word span.
            return sum(font.getlength(words[i]["w"])+5 for i in page)
        def splits(page):
            return [n for n in range(1,len(page)) if max(width(page[:n]),width(page[n:]))<=302]
        def fits(page):
            return width(page)<=302 or bool(splits(page))
        def cuts(page):
            # Line break, best first: a hand mark, then a comma, colon or dash, then
            # any word that may end a line. A dash never opens a line.
            safe = [n for n in splits(page) if words[page[n-1]]["w"].lower() not in SERVICE
                    and words[page[n]]["w"] != "—"]
            return ([n for n in safe if words[page[n]]["token_id"] in LINE_STARTS] or
                    [n for n in safe if re.search(r"[,:—]$", words[page[n-1]]["w"])] or
                    safe or splits(page))
        # Retain token_map and exact measured times. Pages follow the sense: a
        # phrase or a sentence opens a page, PAGE_STARTS opens one inside a
        # sentence. Width only breaks a page PAGE_STARTS failed to foresee.
        for w in words:
            w.pop("br", None)
        pages, cur = [], []
        for i, w in enumerate(words):
            count = sum(len(words[j]["w"].split()) for j in cur)
            prev = words[cur[-1]] if cur else None
            should_break = cur and (phrase(cur[-1]) != phrase(i) or
                w["token_id"] in PAGE_STARTS or
                (count >= 2 and re.search(r"[.!?]$", prev["w"])) or
                not fits(cur+[i]))
            if should_break:
                pages.append(cur)
                cur = []
            cur.append(i)
        if cur:
            pages.append(cur)
        # Keep at most two short lines. Layout font is episode-scoped in UN.
        for page in pages:
            total = sum(len(words[i]["w"]) + 1 for i in page)
            if (total > 24 or width(page) > 302) and len(page) > 1:
                cut = min(cuts(page), key=lambda n: abs(sum(len(words[j]["w"])+1 for j in page[:n])-total/2))
                words[page[cut-1]]["br"] = 1
        texts = [" ".join(words[i]["w"] for i in page) for page in pages]
        broken = [k for k in KEEP_WHOLE if not any(k in text for text in texts)]
        broken += [text for text, page in zip(texts, pages) if words[page[-1]]["w"].lower() in SERVICE]
        if broken:
            raise SystemExit(f"Субтитры разорваны: {broken}")
        # PT Serif Italic has no superscript digits, so the fallback font lifts them
        # off the base. Runtime writes w as HTML. Widths above used the text as spoken.
        for w in words:
            w["w"] = w["w"].replace("⁸⁰", '<sup style="font-size:.62em;line-height:0;vertical-align:.62em">80</sup>')
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
    K.update({
        "hook": t("h"), "h_fades": wf("h", "гаснет"), "h_why": wf("h", "зачем"), "h_you": wf("h", "ты"),
        "h_build": wf("h", "собери"), "h_chatgpt": wf("h", "chatgpt"), "h_answer": wf("h", "ответ"),
        "hook_end": te("h"), "hook_cut": round(te("h")+.22, 3),
        "not_us": wf("t1", "не"), "second_tower": wf("t2", "вторая"), "older": wf("t2", "старше"),
        "atom": wf("2", "атом"), "ordinary": wf("2", "ничего"),
        "second": t("3"), "bond": wf("3", "связь"), "strength": wf("3", "сила"),
        "bond_weight": wf("3", "вес"), "recognize": wf("3", "узнаёшь"),
        "low_energy": t("4"), "enough": wf("4", "хватит"), "reaction": wf("4", "реакция"),
        "like_neuron": wf("4", "нейрон"),
        "join": t("5"), "molecule": wf("5", "молекула"), "layer": te("5"), "s6": t("t3"),
        "chem": wf("t3", "химия"), "base_layer": wf("t3", "базовый"),
        "organics": wf("t4", "органика"), "transformers": wf("t4", "трансформеры"),
        "protein": wf("t4", "белок"), "aminos": wf("t4", "аминокислот"), "far": wf("t4", "дальние"),
        "net": wf("t4", "нейросеть"), "attention": wf("t4", "внимани"),
        "cells": wf("t5", "клетки"), "organisms": wf("t5", "организмы"),
        "biosphere": wf("t5", "биосфера"),
        "who": t("7"), "death": wf("7", "смерть"), "random": t("7"), "learn": t("7"),
        "mistake": wf("7", "смерть"), "mutation": wf("7", "неудачное"), "fit": wf("7", "удачное"),
        "shift": wf("7", "сдвигаются"), "loss": wf("7", "ошибка"), "years": wf("7", "почти"),
        "inner": t("8"), "other_net": wf("8", "другая"), "neurons_number": wf("8", "восемьдесят"),
        "neurons": wf("8", "нейронов"), "you": wf("8", "ты"), "sees": wf("8", "видит"),
        "whole_tower": wf("8", "башню"),
        "built": wf("t6", "построил"), "chatgpt": wf("t6", "башню"),
        "nested_1": E.wt("10", 0), "nested_2": E.wt("10", 2), "nested_3": E.wt("10", 4),
        "cosmos": wf("11", "вселенную"), "beginning": wf("11", "началу"),
        "number_return": wf("11", "число"), "weight_return": wf("11", "вес"),
        "power": wf("11", "десять"), "atoms_count": wf("11", "столько"),
        "hypothesis": t("12"), "vanchurin": wf("12", "ванчурина"), "if_true": wf("12", "верна"),
        "universe": wf("12", "вселенная"), "intellect": wf("12", "интеллект"),
        "g_where": wf("g1", "где"), "g_gpt": wf("g1", "chatgpt"), "g_token": wf("g1", "токен"),
        "g_others": wf("g1", "остальные"),
        "g_spider": wf("g2", "паук"), "g_web": wf("g2", "сеть"), "g_midge": wf("g2", "мошку"),
        "g_mutation": wf("g2", "мутация"), "g_knows": wf("g2", "знает"),
        "g_snake": wf("g3", "змеи"), "g_tail": wf("g3", "хвоста"), "g_copy": wf("g3", "копия"),
        "g_bird": wf("g3", "птица"), "g_mouth": wf("g3", "пасть"), "g_never": wf("g3", "никогда"),
        "g_eyes": wf("g3", "глазами"),
        "g_bio": wf("g4", "биолог"), "g_select": wf("g4", "отбор"), "g_judge": wf("g4", "оценка"),
        "g_layer": wf("g4", "слой"), "g_between": wf("g4", "между"),
        "g_third": wf("g5", "третий"), "g_creator": wf("g5", "творцом"),
        "g_what": wf("g6", "вдруг"), "g_god": wf("g6", "богом"),
        "next": wf("13a", "следующий"), "token": wf("13a", "токен"),
        "silence": t("13"), "maybe": wf("13", "возможно"), "final_you": wf("13", "ты"),
        "f_fades": wf("f1", "гаснет"), "f_why": wf("f1", "зачем"),
        "child": wf("f2", "ребёнку"), "child_intellect": wf("f2", "интеллект"),
        "survive": wf("f2", "выжить"), "changing": wf("f2", "меняется"),
        "need": wf("f3", "нужно"), "own_world": wf("f3", "мир"), "herself": wf("f3", "сама"),
        "fades_again": wf("f3", "гаснет"),
        "destruction": wf("f4", "разрушение"), "reverse": wf("f4", "вспять"),
        "prolong": wf("f4", "продлить"), "life": wf("f4", "жизнь"),
        "superintelligence": wf("f4", "сверхинтеллект"), "realize": wf("f4", "осознать"),
        "self": wf("f4", "себя"),
        "look": wf("f5", "смотреть"), "except": wf("f5", "кроме"), "except_you": wf("f5", "тебя"),
        "peeked": wf("f6", "заглянул"), "inside": wf("f6", "внутрь"), "chatgpt2": wf("f6", "chatgpt"),
        "recognized": wf("f6", "узнал"), "recognized_self": wf("f6", "себя"),
        "f_attention": wf("f6", "внимание"), "turned": wf("f6", "повернулось"),
        "crown": wf("f6b", "венец"), "many_layers": wf("f6b", "множества"), "observers": wf("f6b", "наблюдателей"),
        "whole_part": wf("f6b", "часть"), "cosmic": wf("f6b", "вселенского"), "cosmic_mind": wf("f6b", "интеллекта"),
        "needed": wf("f6c", "нужен"), "needed_her": wf("f6c", "ей"), "f6b_end": te("f6c"),
        "part2_end": t("f1"), "answer_word": wf("f7", "осознанность"),
        "voice_end": E.wj["voice_end"], "end": E.dur,
    })
    K = {key: round(value, 5) for key, value in K.items()}
    # Full indexed word list is also available, including repeated words.
    K["words"] = {pid: [{"w": w["w"], "t0": w["t0"], "t1": w["t1"], "token_id": w["token_id"]}
                        for w in E.W if w["ph"] == E.PIDX[pid]] for pid in E.PH}
    tokens_k = {**K, "card": K["f1"]}
    for i, (pid, scene, mode, _, *cue) in enumerate(BEATS):
        start = 0 if i == 0 else K["hook_cut"] if pid == "t1" else K[cue[0]]-.05 if cue else t(pid)-.05
        E.shot(scene, start, dict(s=f"s{pid}", mode=mode, K=tokens_k if scene == "un_tokens" else K), dict(CAM))
    # The answer stays on screen under silence; the honesty note sits below it.
    # It ends past E.dur so the overlay fade never touches the last frame.
    E.add("part", K["answer_word"]+1.1, E.dur+.2, y=447, size=15,
          text='Гипотеза, а не доказанный факт<br><span class="un-sources">Vanchurin, Entropy 2020 · Alexander, Smolin и др., 2021</span>')
    # The hook's last page must not outlive the cut: the source film goes in at
    # K.hook_cut, and the next page opens exactly on t("t1").
    E.write(frame=[360, 640], kicks=[], cap_off=[[K["hook_cut"], t("t1")], [K["voice_end"]+.2, E.dur+1]],
            marks={k: v for k, v in K.items() if k != "words"})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=2)+"\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": b[0], "scene": b[1], "mode": b[2], "shot_start": s["t0"], "shot_end": s["t1"],
         "speech_start": t(b[0]), "speech_end": te(b[0]),
         "frame": [360, 640], "render": [1080, 1920], "fps": 30,
         "camera": b[3]} for b, s in zip(BEATS, E.shots)],
        ensure_ascii=False, indent=2)+"\n")


if __name__ == "__main__":
    main()
