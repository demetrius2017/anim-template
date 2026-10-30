"""Step 1: 13 scene contracts, absolute word cues, captions and final hypothesis card.

Scene writers own engine/scenes/un_<name>.js only. Keep scene names and p.s,
p.mode, p.K stable. All K times come from measured speech, never hand seconds.
The scene owns smooth 3D camera travel; engine camera is neutral to avoid jumps.
"""
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS, bare

BEATS = [
    ("1", "un_atom", "number", "Два шара; почти неподвижный фронтальный план"),
    ("2", "un_atom", "atom", "Непрерывный обход верхнего шара; кольцо → орбита"),
    ("3", "un_atom", "bond", "Отъезд для второго атома; плавный перевод к связи"),
    ("4", "un_energy", "activation", "Наезд к сигмоиде; проводка за шариком"),
    ("5", "un_molecule", "layer", "Вода 104,5°; отъезд от молекулы к слою"),
    ("6", "un_tower", "levels", "Подъём вдоль четырёх уровней башни"),
    ("7", "un_loss", "learning", "Обход поверхности; проводка по убыванию ошибки"),
    ("8", "un_person", "brain", "От силуэта точек к сети внутри головы"),
    ("9", "un_person", "chatgpt", "Наезд на маленькую башню в голове"),
    ("10", "un_nested", "nested", "Бесшовный отъезд через минимум три уровня"),
    ("11", "un_cosmos", "return", "Космическая паутина; наезд до двух шаров"),
    ("12", "un_tokens", "sequence", "Проводка по пилюлям к пустой"),
    ("13", "un_tokens", "final", "Одна пустая пилюля; затем гипотеза и источники"),
]
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SUBS = [
    (["четыреста", "шестьдесят", "три", "килоджоуля", "на", "моль"], "463 кДж/моль"),
    (["восемьдесят", "шесть", "миллиардов"], "86 млрд"),
    (["четыре", "миллиарда"], "4 миллиарда"),
    (["десять", "в", "восьмидесятой", "степени"], "10⁸⁰"),
]


class UniverseEp(Ep):
    def _pages(self):
        words, _ = super()._pages()
        # Retain token_map and exact measured times, but group 2–5 words. Break
        # at sentences when possible; single short sentences join the next page.
        for w in words:
            w.pop("br", None)
        pages, cur = [], []
        for i, w in enumerate(words):
            count = sum(len(words[j]["w"].split()) for j in cur)
            new_count = len(w["w"].split())
            prev = words[cur[-1]] if cur else None
            should_break = cur and (count + new_count > 5 or
                (count >= 2 and re.search(r"[.!?]$", prev["w"])))
            if should_break:
                pages.append(cur)
                cur = []
            cur.append(i)
        if cur:
            if len(cur) == 1 and pages and len(pages[-1]) < 5:
                pages[-1] += cur
            else:
                pages.append(cur)
        # Keep at most two short lines. Layout font is episode-scoped in UN.
        for page in pages:
            total = sum(len(words[i]["w"]) + 1 for i in page)
            if total > 24 and len(page) > 1:
                candidates = page[:-1]
                split = min(candidates, key=lambda k: abs(sum(len(words[j]["w"])+1 for j in page if j<=k)-total/2))
                words[split]["br"] = 1
        return words, pages


def main():
    E = UniverseEp(work=Path(__file__).resolve().parent)
    E.cap_chars, E.cap_lines = 28, 2
    t, te, wf = E.t, E.te, E.wfind
    NUMS[:0] = SUBS
    K = {f"s{i}": t(str(i)) for i in range(1, 14)}
    K.update({f"s{i}_end": te(str(i)) for i in range(1, 14)})
    K.update({
        "number": t("1"), "weight": wf("1", "вес"), "inside": wf("1", "внутри"),
        "atom": wf("2", "атом"), "ordinary": wf("2", "ничего"),
        "second": t("3"), "bond": wf("3", "связь"), "strength": wf("3", "сила"),
        "oxygen": wf("3", "кислорода"), "hydrogen": wf("3", "водородом"),
        "bond_value": wf("3", "четыреста"), "bond_weight": wf("3", "вес"),
        "low_energy": t("4"), "enough": wf("4", "хватит"), "reaction": wf("4", "реакция"),
        "activation": wf("4", "энергия"),
        "join": t("5"), "molecule": wf("5", "молекула"), "layer": wf("5", "слой"),
        "stack": t("6"), "molecules": wf("6", "молекулы"), "cells": wf("6", "клетки"),
        "organisms": wf("6", "организмы"), "biosphere": wf("6", "биосфера"),
        "random": t("7"), "learn": wf("7", "обучить"), "mistake": wf("7", "ошибаться"),
        "mutation": wf("7", "мутация"), "shift": wf("7", "двигает"),
        "loss": wf("7", "ошибка"), "years": wf("7", "почти"),
        "inner": t("8"), "neurons_number": wf("8", "восемьдесят"),
        "neurons": wf("8", "нейронов"), "you": wf("8", "ты"),
        "third": wf("9", "третью"), "chatgpt": wf("9", "chatgpt"),
        "nested_1": E.wt("10", 0), "nested_2": E.wt("10", 2), "nested_3": E.wt("10", 4),
        "cosmos": wf("11", "вселенную"), "beginning": wf("11", "началу"),
        "number_return": wf("11", "число"), "weight_return": wf("11", "вес"),
        "power": wf("11", "десять"),
        "hypothesis": t("12"), "if_true": wf("12", "верна"), "universe": wf("12", "вселенная"),
        "next": wf("12", "следующий"), "token": wf("12", "токен"),
        "silence": t("13"), "maybe": wf("13", "возможно"), "final_you": wf("13", "ты"),
        "card": E.wj["voice_end"], "end": E.dur,
    })
    K = {key: round(value, 5) for key, value in K.items()}
    # Full indexed word list is also available, including repeated words.
    K["words"] = {pid: [{"w": w["w"], "t0": w["t0"], "t1": w["t1"], "token_id": w["token_id"]}
                        for w in E.W if w["ph"] == E.PIDX[pid]] for pid, *_ in BEATS}
    for i, (pid, scene, mode, _) in enumerate(BEATS):
        handoff = dict(layerHandoff=.6) if scene in ("un_molecule", "un_tower") else {}
        E.shot(scene, 0 if i == 0 else t(pid) - .05,
               dict(s=f"s{pid}", mode=mode, K=K, **handoff), dict(CAM))
    E.add("part", K["card"], E.dur, y=215, size=24,
          text="Гипотеза, а не<br>доказанный факт")
    E.add("part", K["card"], E.dur, y=290, size=15,
          text='<span class="un-sources">Vanchurin, Entropy 2020<br>Alexander, Smolin и др., 2021</span>')
    E.write(frame=[360, 640], kicks=[], cap_off=[[K["card"], E.dur+1]],
            marks={k: v for k, v in K.items() if k != "words"})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=2)+"\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": "s"+pid, "scene": scene, "mode": mode, "start": t(pid), "speech_end": te(pid),
         "camera": camera} for pid, scene, mode, camera in BEATS], ensure_ascii=False, indent=2)+"\n")


if __name__ == "__main__":
    main()
