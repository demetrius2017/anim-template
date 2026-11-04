"""«Время — это трансформация»: shots, cues and captions from measured speech.

Scene writers own engine/scenes/ts_<name>.js only. Every shot gets p.s (phrase
id), p.mode, p.K and the outgoing scene p.prev/p.prev_mode, so the incoming
scene can own the dissolve by calling SCENES[p.prev].body(t, K, p.prev_mode).
K holds absolute times only: K[id] and K[id+"_end"] per phrase, K.words[id] with
every word, plus K.voice_end, K.end and K.note (honesty line). Never hand seconds.
The engine camera is neutral; scenes move their own camera. The last frame equals
the first one (ts_body ring == ts_body hook at t=0), so the film loops.
"""
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS

# (first phrase id, scene, mode, what is seen). A beat lasts until the next one.
BEATS = [
    ("h", "ts_body", "hook", "Человек из точек, часы у макушки и у ступней; верхние убегают"),
    ("h2", "ts_body", "promise", "«Измерили — часами»: оба часа подсвечены, разница в последнем знаке"),
    ("h3", "ts_body", "height", "Телебашня 450 м: часы наверху обгоняют (≈4 нс/сутки); голова — верхние часы"),
    ("h5", "ts_earth", "gps", "Ставка: спутник над Землёй — спешат или отстают?"),
    ("t1", "ts_minds", "newton", "Часы разошлись — что они меряют? Стрелка-инструмент, путь/время"),
    ("t2", "ts_minds", "universe", "Стрелку придумали люди — а что создала Вселенная? Звёздное поле, знак вопроса; к яблоку"),
    ("p1", "ts_minds", "augustine", "Августин: вопросительный знак из точек рассыпается"),
    ("t3", "ts_minds", "leibniz", "Ньютон и Лейбниц: река и события на нити (только полная версия)"),
    ("a1", "ts_apple", "compare", "Яблоко из молекул и часы; шаг стрелки — сдвиг молекул; «1 МИН»"),
    ("a3", "ts_apple", "cesium", "Наезд в часы: атом цезия, счётчик колебаний до 1 с"),
    ("a4", "ts_apple", "relative", "Яблоко и атом связаны нитью; всё вокруг меняется и сдвигается"),
    ("b1", "ts_strip", "slices", "Плёнка состояний: свежее, потемнело, сгнило"),
    ("c1", "ts_strip", "cold", "Плёнка яблока в холоде: стрелка бежит, кадры почти одинаковые"),
    ("c1b", "ts_earth", "gravity", "Помнишь башню? Холод вокруг яблока; Земля тормозит всё внизу"),
    ("c3", "ts_earth", "gps", "Спутник навигации ещё выше: его часы спешат; телефон поправляют"),
    ("c4", "ts_earth", "blackhole", "Эйнштейн? Чёрная дыра: часы у горизонта почти замирают; три плёнки с разной скоростью"),
    ("d1", "ts_egg", "break", "Яйцо разбивается, осколки разлетаются"),
    ("d2", "ts_egg", "reverse", "Плёнка назад: яйцо собирается — подделка"),
    ("d3", "ts_egg", "atoms", "Два атома сталкиваются, вперёд и назад неразличимо"),
    ("d4", "ts_egg", "disorder", "Много путей разлёта, один путь сборки"),
    ("e1", "ts_save", "save", "Плёнка с ячейками сохранения; загрузка возвращает кадр"),
    ("m1", "ts_records", "bridge", "Башня и запись сравнения; «а ты откуда знаешь, что время идёт?»"),
    ("r1", "ts_records", "notch", "Палка с зарубками: носитель отметок; «было прошлое»"),
    ("r2", "ts_records", "world", "Пласты снизу вверх, керн льда с пузырьками, ладонь на стене"),
    ("r3", "ts_records", "bell", "Все записи лежат в одной точке «сейчас»; стрелка в прошлое упирается"),
    ("f1", "ts_memory", "memory", "Голова из точек, кадры влетают в память"),
    ("f2", "ts_memory", "diary", "Дневник: строки «проснулся» зачёркиваются"),
    ("g2", "ts_fall", "fall", "Падение спиной вниз в сеть; своё — длиннее"),
    ("g3", "ts_fall", "recall", "Табло не читается быстрее; в памяти больше кадров"),
    ("r4", "ts_records", "duel", "Отметки гаснут — остаётся ли время? Ньютон: есть / Лейбниц: нет"),
    ("z1", "ts_body", "answer", "Человек с часами: стрелка для часов, память для тебя"),
    ("z2", "ts_life", "week", "Неделя в новых местах против одинаковых будней"),
    ("z3", "ts_life", "lives", "Две плёнки одной длины по часам: однообразная и яркая"),
    ("z4", "ts_life", "day", "Пустой кадр без единой отметки"),
    ("z5", "ts_body", "ring", "Возврат к первому кадру: человек с двумя часами; подпись «Перешли тому…»"),
]
# Neutral engine camera: scenes move their own camera; the last frame must equal the first.
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SUBS = [
    (["девяти", "миллиардов"], "9 миллиардов"),
    (["тридцати", "метров"], "30 метров"),
]
# Pages follow the sense: a phrase or a sentence opens a page; PAGE_STARTS opens
# one inside a sentence; LINE_STARTS puts a second line there. Filled after the
# real voice, by the measured words.
PAGE_STARTS = set()
LINE_STARTS = set()
SERVICE = set("а без бы в во где да для до если же за и из к ко как ли на над не ни "
              "но о об от по под при про с со то у через что чтобы это".split())
# The owner's key phrases are read whole on one page.
KEEP_WHOLE = ("Нет памяти — нет ощущения.", "Не спеши.")
NOTE = ('Взгляд автора, а не закон физики<br><span class="un-sources">'
        'Takamoto и др., Nat. Photonics 2020 · Stetson, Eagleman, PLoS ONE 2007 · Sacks, 2007 · Augustinus, Conf. XI · Leibniz–Clarke, 1716</span>')


class TimeEp(Ep):
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
            return [n for n in range(1, len(page)) if max(width(page[:n]), width(page[n:])) <= 302]

        def fits(page):
            return width(page) <= 302 or bool(splits(page))

        def cuts(page):
            safe = [n for n in splits(page) if words[page[n-1]]["w"].lower() not in SERVICE
                    and words[page[n]]["w"] != "—"]
            return ([n for n in safe if words[page[n]]["token_id"] in LINE_STARTS] or
                    [n for n in safe if re.search(r"[,:—]$", words[page[n-1]]["w"])] or
                    safe or splits(page))
        for w in words:
            w.pop("br", None)
        def weak(i):
            # A page never ends on a service word or a bare dash.
            return words[i]["w"].lower() in SERVICE or words[i]["w"] == "—"
        pages, cur = [], []
        for i, w in enumerate(words):
            count = sum(len(words[j]["w"].split()) for j in cur)
            prev = words[cur[-1]] if cur else None
            sense = cur and (phrase(cur[-1]) != phrase(i) or w["token_id"] in PAGE_STARTS or
                             (count >= 2 and re.search(r"[.!?]»?$", prev["w"])))
            if sense or (cur and not fits(cur+[i])):
                carry = []
                # Width break: weak tail words open the next page instead.
                while not sense and len(cur) > 1 and weak(cur[-1]):
                    carry.insert(0, cur.pop())
                # Nor does a page open on a particle or a dash: «можно ли», «— это».
                glue = lambda j: words[j]["w"].lower() in ("ли", "бы", "же", "—")
                if not sense and len(cur) > 1 and glue(carry[0] if carry else i):
                    carry.insert(0, cur.pop())
                    while len(cur) > 1 and (weak(cur[-1]) or glue(carry[0])):
                        carry.insert(0, cur.pop())
                pages.append(cur)
                cur = carry
            cur.append(i)
        if cur:
            pages.append(cur)
        for page in pages:
            total = sum(len(words[i]["w"]) + 1 for i in page)
            if (total > 24 or width(page) > 302) and len(page) > 1:
                cut = min(cuts(page), key=lambda n: abs(sum(len(words[j]["w"])+1 for j in page[:n])-total/2))
                words[page[cut-1]]["br"] = 1
        texts = [" ".join(words[i]["w"] for i in page) for page in pages]
        broken = [k for k in KEEP_WHOLE if any(k in t for t in [" ".join(w["w"] for w in words)])
                  and not any(k in text for text in texts)]
        broken += [text for text, page in zip(texts, pages) if words[page[-1]]["w"].lower() in SERVICE]
        if broken and self.wj.get("fake"):
            print(f"черновые времена, субтитры пока разорваны: {len(broken)}")
        elif broken:
            raise SystemExit(f"Субтитры разорваны: {broken}")
        return words, pages


def main():
    E = TimeEp(work=Path(__file__).resolve().parent)
    E.cap_chars, E.cap_lines = 28, 2
    NUMS[:0] = SUBS
    t, te = E.t, E.te
    K = {}
    for pid in E.PH:
        K[pid], K[pid + "_end"] = t(pid), te(pid)
    K.update({"voice_end": E.wj["voice_end"], "end": E.dur, "note": te(list(E.PH)[-1]) + .6})
    K = {key: round(value, 5) for key, value in K.items()}
    K["words"] = {pid: [{"w": w["w"], "t0": w["t0"], "t1": w["t1"], "token_id": w["token_id"]}
                        for w in E.W if w["ph"] == E.PIDX[pid]] for pid in E.PH}
    beats = [b for b in BEATS if b[0] in E.PH]
    missing = [pid for pid in E.PH if pid not in {b[0] for b in beats}]
    for i, (pid, scene, mode, _) in enumerate(beats):
        prev = beats[i-1] if i else (None, None, None, None)
        E.shot(scene, 0 if i == 0 else t(pid) - .05,
               dict(s=pid, mode=mode, K=K, prev=prev[1], prev_mode=prev[2]), dict(CAM))
    # The honesty line shows after the last word and is gone before the last
    # frame, which must equal the first one.
    if "a4" in E.PH:  # the owner's formula as an on-screen caption while the voice says it plainly
        E.add("part", t("a4"), te("a4") + .4, y=64, size=13,
              text='время — процесс трансформации пространства<br><span class="un-sources">взгляд автора</span>')
    E.add("part", K["note"], max(K["note"] + 1.6, E.dur - .8), y=447, size=15, text=NOTE)
    E.write(frame=[360, 640], kicks=[], cap_off=[[K["voice_end"] + .15, E.dur + 1]],
            marks={k: v for k, v in K.items() if k != "words"})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=1) + "\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": b[0], "scene": b[1], "mode": b[2], "shot_start": s["t0"], "shot_end": s["t1"],
         "prev": s["p"]["prev"], "prev_mode": s["p"]["prev_mode"], "what": b[3]}
        for b, s in zip(beats, E.shots)], ensure_ascii=False, indent=1) + "\n")
    if missing:
        print("фразы без своего кадра (идут в предыдущем):", missing)


if __name__ == "__main__":
    main()
