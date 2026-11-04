"""«Что такое время», две части Shorts (v19, текст утверждён владельцем 03.11): shots, cues, captions.

One file for both parts: the part is the folder name (time_states_p1 / time_states_p2). A phrase is one line of the
approved text; a line that continues an old phrase is <id>_2, <id>_3 … and the scenes still find their words under
the old id: K[id] is the start of the first line, K[id+"_end"] the end of the last one, K.words[id] all their words.
Every shot gets p.s, p.mode, p.K, p.prev/p.prev_mode; some shots get their own K (OVERRIDE: a scene written for
another phrase plays its timeline on this phrase). Sources from source/onscreen_sources.md are an overlay at the top
(Plex Mono 9.6 px, inside the frame) for the whole span of their lines. The engine camera is neutral.
"""
import copy
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from storylib import Ep, NUMS

PART = Path(__file__).resolve().parent.name
# (first phrase id, scene, mode, what is seen). A beat lasts until the next one.
BEATS = {
    "time_states_p1": [
        ("h", "ts_body", "hook", "Человек из точек, часы у макушки и у ступней; верхние убегают"),
        ("h2", "ts_body", "promise", "«Измерили — часами»: оба часа подсвечены, разница в последнем знаке"),
        ("h3", "ts_body", "height", "Телебашня: часы наверху обгоняют; внизу медленнее для всего; голова — верхние часы"),
        ("t1", "ts_minds", "newton", "Часы разошлись — что они меряют? Стрелка-инструмент, путь/время; Ньютон — река"),
        ("t2", "ts_minds", "universe", "Стрелку придумали люди — а что создала Вселенная? Проверим на яблоке"),
        ("t2_2", "ts_apple", "compare", "На «яблоке» — яблоко и часы: шаг стрелки — сдвиг молекул; чайник и страница"),
        ("a4", "ts_apple", "relative", "Время — перемены всего вокруг; надпись владельца"),
        ("a5", "ts_minds", "leibniz", "Лейбниц: без событий времени нет"),
        ("b1", "ts_strip", "slices", "Плёнка состояний: свежее, потемнело, сгнило"),
        ("c1", "ts_strip", "cold", "Плёнка яблока в холоде: стрелка бежит, кадры почти одинаковые"),
        ("c1b", "ts_earth", "gravity", "Земля: гравитация тормозит всё — яблоко, часы, человек"),
        ("c1b_2", "ts_body", "height", "Вспомни Токио: человек у башни, часы внизу отстали"),
        ("c1b~", "ts_body", "tower2", "v6/v7: «У подножия башни она сильнее» — башня и часы в момент «внизу медленнее»"),
        ("c3", "ts_earth", "gps", "Спутник навигации выше — его часы спешат; поправка"),
        ("c4", "ts_earth", "blackhole", "Эйнштейн, чёрная дыра: часы у горизонта почти замирают"),
        ("q0", "ts_memory", "question", "v35: «?» собирается из часов, яблока и дыры; на «ощущаем» — человек"),
        ("q1", "ts_memory", "ending", "Голова, загорается ПАМЯТЬ; плёнка яблока влетает; «Нет кадров» гаснет; «Больше кадров» — ДЛИННЕЕ"),
        ("q1_3", "ts_fall", "fall", "Превью части 2: падение спиной в сетку (без плёнок ЧУЖОЕ/СВОЁ — их объясняет часть 2)"),
        ("q1_2", "ts_fall", "fall", "v34 и раньше: превью падения на q1_2 (в v35 q1_2 — память, этот бит не нужен)"),
    ],
    "time_states_p2": [
        ("k1", "ts_life", "day", "Пустой кадр: день без отметки — докажи, что вчера было"),
        ("k2", "ts_records", "notch", "Голова и «?»; по отметкам — палка с зарубками; ладонь; лёд и слои"),
        ("f1", "ts_memory", "memory", "Голова из точек, кадры влетают в память"),
        ("f2", "ts_memory", "diary", "Дневник: строки «проснулся» зачёркиваются"),
        ("r4", "ts_records", "duel", "Отметки гаснут вместе с носителем; «?»; Ньютон — ровный поток по оси"),
        ("p1", "ts_minds", "augustine", "Августин: прошлое — в памяти, будущее — в ожидании"),
        ("r3", "ts_records", "bell", "Белл: все записи в одной точке «сейчас»"),  # only while line 15 (Bell) is in the text
        ("e1", "ts_save", "save", "Плёнка с ячейками сохранения; загрузка возвращает кадр"),
        ("z1", "ts_records", "traces", "Следы перемен: лёд, слои, память — три значка"),
        ("g2", "ts_fall", "fall", "Зрители смотрят на чужое падение → падение спиной в сетку → ЧУЖОЕ / СВОЁ +1/3"),
        ("g3", "ts_fall", "recall", "Табло на запястье мигает — НЕ ПРОЧЛИ; плёнка памяти гуще"),
        ("z2", "ts_life", "week", "Неделя в новых местах против одинаковых будней"),
        ("z3", "ts_life", "lives", "Две плёнки одной длины по часам: однообразная и яркая"),
        ("z4", "ts_life", "day", "Пустой кадр без единой отметки"),
        ("z5", "ts_body", "ring", "Человек с часами; кольцо кадров памяти на «пережитым опытом»"),
        ("z5_2", "ts_body", "ring", "v34: «И ещё: твоя голова стареет быстрее ног» — первый кадр: человек с двумя часами"),
    ],
}[PART]
# A shot that must start on a word, not on its line (blind view: the apple appears on «яблоке»): {line id: stem}.
WORD_SHOTS = {"c1b~": ("c1b", "подножи")}   # a shot inside a line: {key: (line, stem)}
START_AT = {"t2_2": "яблок", "c3": "спутник", "g2": "страх", "k2": "откуда"}   # v5 p2 A2: the film stays big through «Время — это перемены»   # v2: p2 A6 — the tower on «в страхе»   # blind view v2 A15: the satellite on «Спутник»
# Shot-local K: the scene's own phrase id is fed this part's phrase (group) — {scene id: part id}.
OVERRIDE = {
    "time_states_p1": {"q1": {"f1": "q1"}, "q1_2": {"g2": "q1_2"}, "q1_3": {"g2": "q1_3"}, "q0": {"f1": "q0"}},
    "time_states_p2": {"k1": {"z4": "k1"}, "r4": {"r4": ("r4", "p_n")}},
}[PART]
# Global aliases (all shots): {scene id: part id}.
ALIAS = {"time_states_p1": {"t3": "a5"}, "time_states_p2": {}}[PART]
SOURCES = {  # (first phrase, last phrase, text) — source/onscreen_sources.md
    "time_states_p1": [
        ("h3", "h4_2", "Takamoto et al., Nat. Photon. 2020"),
        ("t1_3", "t1_3", "Newton, «Начала», 1687"),  # only on «Ньютон…» (blind view A1)
        ("a5", "a5", "Newton 1687 · Leibniz — Clarke 1716"),  # v40: Newton and Leibniz on one line (a5)
        ("c1", "c1_2", "USDA Agric. Handbook 66, 2016"),
        ("c3", "c3", "Ashby, Physics Today, 2002"),
        ("c4", "c4_5", "Эйнштейн, 1915"),
    ],
    "time_states_p2": [
        ("r2b", "r2b", "Nature 650, 652 (2026), Сулавеси"),
        ("r2", "r2", "Стено 1669 · EPICA, Nature 2004"),   # layers (Steno) and the ice (EPICA): both on «слои… лёд»
        ("f2", "f2_3", "O. Sacks, The New Yorker, 2007"),
        ("p1", "p1", "Августин, «Исповедь», XI.20"),
        ("r3", "r3", "J. S. Bell — по Butterfield, arXiv gr-qc/0103055"),
        ("g2_2", "g3", "Stetson, Eagleman, PLoS ONE, 2007"),   # v34: from «Учёные проверили»
        ("g2", "g3", "Stetson, Eagleman, PLoS ONE, 2007"),     # v20 texts without g2_2  # g3 (18б) only in v20; without it — g2 alone
        ("z2", "z2", "Avni-Babad & Ritov, 2003"),
    ],
}[PART]
# Neutral engine camera: scenes move their own camera.
CAM = dict(z0=1, z1=1, x0=0, x1=0, y0=0, y1=0, drift=0, kicks=0)
SUBS = [
    (["девяти", "миллиардов"], "9 миллиардов"),
    (["тридцати", "одного", "метра"], "31 метра"),
    (["тридцати", "метров"], "30 метров"),
    (["шестидесяти", "семи", "тысяч"], "67 тысяч"),
    (["восьмисот", "тысяч"], "800 тысяч"),
    (["шестнадцать", "веков"], "16 веков"),
]
# Pages follow the sense: a phrase or a sentence opens a page; PAGE_STARTS opens one inside a sentence;
# LINE_STARTS puts a second line there (token ids, filled by the measured words).
PAGE_STARTS = {"f1_2.2",   # part 2: «Если так,» / «ощущение времени — это способность…» on two pages
               "k2.4",     # «Время — это перемены,» / «так мы решили в первой части.»
               "z4_3.5",   # «День без единой отметки —» / «ты его вообще прожил?» (no line opens on a dash)
               "f2_2.11"}  # «…по-настоящему проснулся, —» / «и зачёркивал прежние записи.»
# Blind view v2 (p1 A14, p2 A19): pages break at these sense borders (the page opens on the first words).
BREAK_BEFORE = ("примерно на четыре", "секунды в сутки", "что оно течёт само", "для всего", "меньше чем на микросекунду", "он тормозит только",
                "а с яркими воспоминаниями", "а пережитым опытом", "это измерили атомными")
LINE_STARTS = set()
LINE_PX = 310   # ≈ 930 px of 1080 (blind view v3 A11 allows 310 for «Без памяти время…»); the Shorts buttons sit on the right
SERVICE = set("а без бы в во где да для до если же за и из или к ко как ли на над не ни "
              "но о об около от по под при про с со то только у через что чтобы чем это".split())
# The owner's key phrases: read whole on one page.
KEEP_WHOLE = ()
# …and these on at most two pages, never three.
KEEP_TWO = ("ощущение времени — это способность запомнить предыдущие состояния",)
# Blind view 03.11 (A3): never break a page or a line between a numeral and the next word, «меньше/больше… | чем»,
# «почти/не/только/ещё/примерно… | next»; prefer a break after punctuation.
NUMERAL = re.compile(r"^(\d[\d\s.,]*|один|одна|одно|одного|одной|два|две|двух|три|трёх|трех|четыре|четырёх|пять|пяти|шесть|шести|"
                     r"семь|семи|восемь|восьми|девять|девяти|десять|десяти|\w+надцат\w*|двадцат\w*|тридцат\w*|сорок\w*|"
                     r"пятьдесят|шестьдесят\w*|семьдесят|восемьдесят|девяносто|сто|двести|триста|четыреста|\w+сот|\w+сот\w+|"
                     r"тысяч\w*|миллион\w*|миллиард\w*|полтора|полторы|половин\w*)$")
LEAN = set("почти не ни только ещё еще примерно около всего лишь уже даже чуть те сотни сотен".split())
COMPARE = set("меньше больше дольше длиннее короче старше моложе раньше позже быстрее медленнее выше ниже".split())


def glued(a, b):
    """True when the words a | b must stay on one page and one line."""
    a0, b0 = (re.sub(r"[«»\"]", "", x) for x in (a, b))
    a, b = a0.lower(), b0.lower()
    if re.search(r"[.,:;!?…—]$", a) or a == "—":
        return False
    if a0[:1].isupper() and b0[:1].isupper() and len(a) > 2 and len(b) > 2:   # a name: «Клайв Уиринг»
        return True
    return bool(NUMERAL.match(a)) or a in LEAN or a in COMPARE   # «быстрее ног», «длиннее будней», «меньше чем»
MONO = ('<span style="font-family:Plex,monospace;font-style:normal;font-weight:{w};font-size:{s}px;'
        'line-height:{lh}px;letter-spacing:0;color:{c};display:inline-block;max-width:{mw}px;white-space:normal;{bg}">{t}</span>')


def mono(text, size=9.4, color="#b4b4b4", weight=500, back=False, maxw=344, frame=False):
    text = text.replace("&", "&amp;")
    bg = "background:rgba(0,0,0,.78);padding:3px 8px;border-radius:3px" if back else ""
    if frame:   # blind view v2: a plate like «+4 НС / СУТКИ» — bold white in a thin white frame
        bg = "background:rgba(0,0,0,.85);padding:4px 10px;border-radius:3px;border:1px solid #fff"
    return MONO.format(t=text, s=size, lh=round(size * 1.18, 1), c=color, w=weight, bg=bg, mw=maxw)


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
            return [n for n in range(1, len(page)) if max(width(page[:n]), width(page[n:])) <= LINE_PX]

        def fits(page):
            return width(page) <= LINE_PX or bool(splits(page))

        def cuts(page):
            safe = [n for n in splits(page) if words[page[n-1]]["w"].lower() not in SERVICE
                    and words[page[n]]["w"] != "—" and not glued(words[page[n-1]]["w"], words[page[n]]["w"])]
            return ([n for n in safe if words[page[n]]["token_id"] in LINE_STARTS] or
                    [n for n in safe if re.search(r"[,:—]$", words[page[n-1]]["w"])] or
                    safe or splits(page))
        for w in words:
            w.pop("br", None)
        flatw = [re.sub(r"[^а-яё0-9]", "", w["w"].lower()) for w in words]
        starts = set(PAGE_STARTS)
        for key in BREAK_BEFORE:
            kw = key.split()
            for j in range(len(words) - len(kw) + 1):
                if flatw[j:j + len(kw)] == kw:
                    starts.add(words[j]["token_id"])
        def weak(i):
            # A page never ends on a service word or a bare dash.
            return words[i]["w"].lower() in SERVICE or words[i]["w"] == "—"
        pages, cur = [], []
        for i, w in enumerate(words):
            count = sum(len(words[j]["w"].split()) for j in cur)
            prev = words[cur[-1]] if cur else None
            sense = cur and (phrase(cur[-1]) != phrase(i) or w["token_id"] in starts or
                             (count >= 2 and re.search(r"[.!?]»?$", prev["w"])))
            if sense or (cur and not fits(cur+[i])):
                carry = []
                # Width break: after the last punctuation of the page when the moved tail still fits with this word
                pun = [n for n in range(2, len(cur)) if re.search(r"[,:;.!?…]»?$", words[cur[n-1]]["w"])
                       and len(cur) - n <= 6 and fits(cur[n:] + [i])] if not sense else []
                if pun:
                    carry, cur = cur[pun[-1]:], cur[:pun[-1]]
                # Otherwise weak tail words and glued pairs open the next page instead.
                while not sense and not pun and len(cur) > 1 and (weak(cur[-1]) or glued(words[cur[-1]]["w"], words[(carry or [i])[0]]["w"])):
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
        # a tail of one or two words joins the page before it (same line, if it still fits on two lines)
        merged = []
        for page in pages:
            real = [i for i in page if words[i]["w"] != "—"]
            short = words[page[-1]]["t1"] - words[page[0]]["t0"] < 1.0   # v3 A11: no page shorter than about a second
            if merged and (len(real) < 3 or short) and phrase(merged[-1][-1]) == phrase(page[0]) and fits(merged[-1] + page) \
                    and words[page[0]]["token_id"] not in starts:
                merged[-1] = merged[-1] + page
            else:
                merged.append(page)
        pages = merged
        for page in pages:
            total = sum(len(words[i]["w"]) + 1 for i in page)
            if (total > 24 or width(page) > LINE_PX) and len(page) > 1:
                cut = min(cuts(page), key=lambda n: abs(sum(len(words[j]["w"])+1 for j in page[:n])-total/2))
                words[page[cut-1]]["br"] = 1
        texts = [" ".join(words[i]["w"] for i in page) for page in pages]
        broken = [k for k in KEEP_WHOLE if any(k in t for t in [" ".join(w["w"] for w in words)])
                  and not any(k in text for text in texts)]
        broken += [text for text, page in zip(texts, pages) if words[page[-1]]["w"].lower() in SERVICE]
        flat = lambda s: re.sub(r"[^а-яё ]", "", s.lower()).split()
        for key in KEEP_TWO:
            kw = flat(key)
            real = [i for i, w in enumerate(words) if flat(w["w"])]
            for j in range(len(real) - len(kw) + 1):
                if [flat(words[i]["w"])[0] for i in real[j:j + len(kw)]] == kw:
                    span = set(range(real[j], real[j + len(kw) - 1] + 1))
                    n = sum(1 for page in pages if span & set(page))
                    if n > 2:
                        broken.append(f"{key}: {n} pages")
        if broken and self.wj.get("fake"):
            print(f"черновые времена, субтитры пока разорваны: {len(broken)}")
        elif broken:
            raise SystemExit(f"Субтитры разорваны: {broken}")
        return words, pages


def group(pid):
    return re.sub(r"_\d+$", "", pid)


def main():
    E = TimeEp(work=Path(__file__).resolve().parent)
    E.cap_chars, E.cap_lines = 28, 2
    NUMS[:0] = SUBS
    t, te = E.t, E.te
    ids = list(E.PH)
    groups = {}
    for pid in ids:
        groups.setdefault(group(pid), []).append(pid)

    def words_of(pids):
        idx = {E.PIDX[p] for p in pids}
        return [{"w": w["w"], "t0": w["t0"], "t1": w["t1"], "token_id": w["token_id"]} for w in E.W if w["ph"] in idx]

    K = {}
    for pid in ids:
        K[pid], K[pid + "_end"] = t(pid), te(pid)
    for g, pids in groups.items():
        K[g], K[g + "_end"] = t(pids[0]), te(pids[-1])
    for a, src in ALIAS.items():
        K[a], K[a + "_end"] = K[src], K[src + "_end"]
    if PART == "time_states_p2" and "p1" in K:
        # ts_minds runs newton (t1) → universe (t2) → augustine (p1); part 2 has only Augustine, so the first two
        # are placed long before him (no default times, no Newton caption fading over «АВГУСТИН»)
        K.update(t1=K["p1"] - 40, t1_end=K["p1"] - 30, t2=K["p1"] - 29.6, t2_end=K["p1"] - 20)
    K.update({"voice_end": E.wj["voice_end"], "end": E.dur, "note": te(ids[-1]) + .3})
    K = {key: round(value, 5) for key, value in K.items()}
    K["words"] = {pid: words_of([pid]) for pid in ids}
    K["words"].update({g: words_of(pids) for g, pids in groups.items()})
    K["words"].update({a: K["words"][src] for a, src in ALIAS.items()})
    WORDS = dict(K["words"])   # shot overrides read the real words
    if PART == "time_states_p2":
        K["words"].update(t1=[], t2=[])
        # ts_minds draws Newton's river and caption wherever «Ньютон» is spoken; in part 2 Newton is the duel's
        # flow of dots (r4 shot, its own K), so the Augustine shot must not find him (caption garbled over his)
        K["words"]["p_n"] = []

    def shot_k(pid):
        o = OVERRIDE.get(pid)
        if not o:
            return K
        k = copy.deepcopy(K)
        for dst, src in o.items():
            src = (src,) if isinstance(src, str) else src
            src = tuple(x for x in src if x in K and x in WORDS) or src[:1]   # v34: p_n (Newton) is gone from part 2
            k[dst], k[dst + "_end"] = K[src[0]], K[src[-1] + "_end"]
            k["words"][dst] = sum((WORDS[s] for s in src), [])
        if pid == "r4":
            k["r4_noleib"] = 1   # part 2: no Leibniz in the voice — the right half of the axis stays
        return k

    # in the order the lines are spoken (v20: the fall experiment may move), not the order of BEATS
    def ws_ok(k):
        if k not in WORD_SHOTS or WORD_SHOTS[k][0] not in E.PH:
            return False
        try:
            E.wfind(*WORD_SHOTS[k])
            return True
        except KeyError:
            return False
    for k in [k for k in WORD_SHOTS if ws_ok(k)]:
        K[k + "@"] = E.wfind(*WORD_SHOTS[k]) - .3
    bstart = lambda pid: K[pid + "@"] if pid in WORD_SHOTS else t(pid)
    beats = sorted((b for b in BEATS if b[0] in E.PH or ws_ok(b[0])), key=lambda b: bstart(b[0]))
    covered = {b[0] for b in beats}
    for pid, stem in START_AT.items():   # the shot's own start key: scenes fade in from K[p.s] − .05
        if pid in E.PH:
            K[pid + "@"] = E.wfind(pid, stem) - .3
    # v34 part 2: the time-machine block is the egg, the game and the wall clock (blind view v2 A13–A14)
    beats = [(b[0], b[1], "world" if b[0] == "e1" and "e1_3" in E.PH else b[2], b[3]) for b in beats]
    if "q1_3" in E.PH:   # v35 part 1: q1_2 belongs to the memory shot
        beats = [b for b in beats if b[0] != "q1_2"]
    for i, (pid, scene, mode, _) in enumerate(beats):
        prev = beats[i-1] if i else (None, None, None, None)
        E.shot(scene, 0 if i == 0 else (K[pid + "@"] if pid in WORD_SHOTS else E.wfind(pid, START_AT[pid]) - .35 if pid in START_AT else t(pid) - .05),
               # part 2 opens on ts_life/day: without p.s it skips its fade from black, frame 0 is the film strip
               dict(s=None if i == 0 and scene == "ts_life" else (pid + "@" if pid in START_AT or pid in WORD_SHOTS else pid), mode=mode, K=shot_k(pid),
                    prev=prev[1], prev_mode=prev[2]), dict(CAM))
    # sources: Plex Mono at the top for the whole span of their lines; one line of ≤ 44 characters at 12.5 px (blind view A1)
    # Blind view v2 (decision of the main 03.11): sources leave the Shorts top bar — above the captions, inside the
    # safe zone (12–75 % of the height, left of the 85 % buttons), larger, on their own fact for about 3 s
    SOURCE_AT = {"h3": "токио", "c3": "спутник"}
    shown = set()
    for a, b, text in SOURCES:  # a line missing from this text drops its source; a missing end falls back to the start
        if a in E.PH and text not in shown:
            shown.add(text)
            s0 = (E.wfind(a, SOURCE_AT[a]) if a in SOURCE_AT else t(a)) - .05
            E.add("part", s0, min(te(b if b in E.PH else a), s0 + 3.4), y=358, size=13,
                  text=mono("ИСТОЧНИК: " + text, 13, "#e8e8e8", 600, maxw=250))

    def plate(pid, stem, t1, text, y, size=18, end=False):
        """A plate on a word (bold white in a frame), until t1."""
        if pid in E.PH:
            try:
                a0 = E.wfind(pid, stem, end) - .1
            except KeyError:
                return
            E.add("part", a0, t1, y=y, size=size, text=mono(text, size, "#ffffff", 700, frame=True, maxw=300))

    if PART == "time_states_p1":
        # A6: on «перемены всего вокруг» / «относительно другого» — two large plates; the owner's formula moves to
        # «…молекул объекта или самого пространства» (c4_5), large (decision of the main 03.11)
        # A2: «Ньютон вообще считал, что оно течёт само, как река» — the claim as a plate
        if "t1_3" in E.PH:
            plate("t1_3", "течёт", te("t1_3") + .3, "НЬЮТОН: ВРЕМЯ ТЕЧЁТ САМО", 96, 16)
        try:   # v40: Newton's river is in a5 now
            plate("a5", "течёт", E.wfind("a5", "философ") - .2, "НЬЮТОН: ВРЕМЯ ТЕЧЁТ САМО", 96, 16)
        except KeyError:
            pass
        # v3 B4: the step «химия → время» is the author's view — the same mark as the formula
        if "c1_2" in E.PH and False:   # B4 waits for the owner's decision on T1 (it also crowds the cold scene)
            try:
                plate("c1_2", "если", E.wfind("c1_2", "медленн", True) + .4, "ВЗГЛЯД АВТОРА", 410, 15)
            except KeyError:
                pass
        if "a4" in E.PH:
            plate("a4", "перемен", E.wfind("a4", "изменени") - .15, "ВРЕМЯ = ПЕРЕМЕНЫ", 330)
            plate("a4", "относительн", te("a4") + .4, "ОДНО ОТНОСИТЕЛЬНО ДРУГОГО", 330, 16)
        c44 = [w["w"].lower() for w in E.W if "c4_4" in E.PIDX and w["ph"] == E.PIDX["c4_4"]]
        if any(x.startswith("процесс") for x in c44):   # v43: «Вот как я это вижу: время — это процесс изменения…» — the owner's formula here
            p0 = E.wfind("c4_4", "время") - .15
            p1 = E.wfind("c4_4", "меняются") - .15 if any(x.startswith("меняются") for x in c44) else te("c4_4")
            # v7 A6: one thing per line — the formula's first half only on its own line, alone in the middle; МОЛЕКУЛ and
            # ИЛИ ПРОСТРАНСТВА are drawn by the scene over the apple and over the hole
            # v8 A2: the thesis stands over a living picture — the film of 1:16 unfolds from the hole under it
            # (ts_earth blackhole); two lines, inside the safe zone (≈16–84 % of the width), above the film
            E.add("part", p0, p1, y=88, size=22,
                  text=mono("ВРЕМЯ —", 22, "#ffffff", 700, frame=True, maxw=250) + "<br>" +
                  mono("ПРОЦЕСС ИЗМЕНЕНИЯ", 22, "#ffffff", 700, frame=True, maxw=250) + "<br>" +
                  mono("взгляд автора", 16, "#d6d6d6", 500))
        elif "c4_5" in E.PH:   # v3 A3: only on «Пространства — чёрная дыра», above the hole (~45 % height), the author line inside
            sp = [w for w in E.W if w["ph"] == E.PIDX["c4_5"] and w["w"].lower().strip("«».,—:").startswith("пространств")]
            p0 = (sp[0]["t0"] if sp else E.wfind("c4_5", "процесс")) - .15   # v4 A3: from «самого пространства», ≈ 6 s, two lines
            E.add("part", p0, te("c4_5") + .4, y=336, size=15,
                  text=mono("время — процесс трансформации пространства (взгляд автора)", 15, "#ffffff", 700, frame=True, maxw=320))
        t0 = E.wfind("q1_3" if "q1_3" in E.PH else "q1_2", "во")
        # v8 A6: the call to part 2 large, in two lines, out of the Shorts top bar and inside the safe zone; the fall scene
        # pulls back under it and replays the fall slowly with a film of frames behind the person (ts_fall)
        E.add("part", t0 - .1, E.dur, y=96, size=24, text=mono("ЧАСТЬ 2 —", 24, "#ffffff", 700, frame=True, maxw=260) + "<br>" +
              mono("В ПРОФИЛЕ КАНАЛА", 24, "#ffffff", 700, frame=True, maxw=260))   # owner 03.11
    else:
        t0 = E.wfind("f2", "дирижёр") if any(w["w"].lower().startswith("дирижёр") for w in E.W) else E.wfind("f2", "клайв")
        E.add("part", t0 - .1, t0 + 2.6, y=86, size=16, text=mono("КЛАЙВ УИРИНГ · ДИРИЖЁР", 16, "#ffffff", 700, frame=True, maxw=300))
        # A16: «Взгляд автора, а не закон физики» large under «длина жизни… / Проживи ярко»; the list of sources goes to the
        # description; the last line gets ПОЧЕМУ — ЧАСТЬ 1 В ПРОФИЛЕ from its first word and ЧАСТЬ 1 → on «в первой части»
        # A6: «А если отметок много — время тянется» still on the diary, with a plate; A12: Augustine named and his three claims
        plate("g2", "тянет", t("g2_2") if "g2_2" in E.PH else te("g2"), "ВРЕМЯ ТЯНЕТСЯ", 168, 18)   # v3: above the stretched tape
        # v3 p2 A1: the hook as a large title in the middle while it is said (the frame works without sound)
        if "k1" in E.PH:
            E.add("part", 0, te("k1") + .3, y=344, size=26, text=mono("ДОКАЖИ, ЧТО ВЧЕРА<br>ВООБЩЕ БЫЛО", 26, "#ffffff", 700, maxw=320))
        if "p1" in E.PH and False:   # v3: Augustine is drawn by ts_minds (augustineLayer), no plates
            try:
                ap0, ap1, ap2, ap3 = (E.wfind("p1", st) for st in ("августин", "прошлое", "будущее", "есть"))
                plate("p1", "августин", ap1 - .1, "АВГУСТИН", 300, 20)
                plate("p1", "прошлое", ap2 - .1, "ПРОШЛОЕ — В ПАМЯТИ", 300, 16)
                plate("p1", "будущее", ap3 - .1, "БУДУЩЕЕ — В ОЖИДАНИИ", 300, 16)
                plate("p1", "есть", te("p1") + .3, "ЕСТЬ ТОЛЬКО «СЕЙЧАС»", 300, 16)
            except KeyError:
                pass
        if "z5" in E.PH:
            z_end = te("z3") if "z3" in E.PH and t("z3") > t("z5") else te("z5")
            # v3 A12: a large stamp in the upper third over the figure, through «…пережитым опытом»
            E.add("part", t("z5") - .05, te("z5") + .3, y=128, size=22,
                  text=mono("ВЗГЛЯД АВТОРА<br><span style=\"font-size:15px\">не закон физики</span>", 22, "#ffffff", 700, frame=True, maxw=300))
        if "z5_2" in E.PH:
            try:
                t1 = E.wfind("z5_2", "первой") - .1
            except KeyError:
                t1 = E.dur
            t1 = min(t1, E.dur - 3.2)   # v7 A14: the final card stays ≥ 3 s
            # v7 A14: the call is large, at the top over the figure and the clocks (not by the subtitle and the source line)
            # (y 10 and 40 px to the left: clear of the figure's head and of the clock ГОЛОВА on the right)
            sh = lambda h: '<div style="position:relative;left:-40px">' + h + '</div>'
            E.add("part", t("z5_2") - .05, t1, y=10, size=20, text=sh(mono("ПОЧЕМУ — ЧАСТЬ 1<br>В ПРОФИЛЕ КАНАЛА", 20, "#ffffff", 700, frame=True, maxw=330)))   # owner 03.11
            E.add("part", t1, E.dur, y=10, size=26, text=sh(mono("ЧАСТЬ 1 →", 28, "#ffffff", 700, frame=True) + "<br>" +
                  mono("В ПРОФИЛЕ КАНАЛА", 22, "#ffffff", 700, frame=True)))
    E.write(frame=[360, 640], kicks=[], cap_off=[[K["voice_end"] + .15, E.dur + 1]],
            marks={k: v for k, v in K.items() if k != "words"})
    (E.work / "build/cues.json").write_text(json.dumps(K, ensure_ascii=False, indent=1) + "\n")
    (E.work / "build/scene_handoff.json").write_text(json.dumps([
        {"id": b[0], "scene": b[1], "mode": b[2], "shot_start": s["t0"], "shot_end": s["t1"],
         "prev": s["p"]["prev"], "prev_mode": s["p"]["prev_mode"], "what": b[3]}
        for b, s in zip(beats, E.shots)], ensure_ascii=False, indent=1) + "\n")
    print(f"{PART}: {E.dur:.2f} s, voice end {E.wj['voice_end']:.2f} s, {len(beats)} shots")


if __name__ == "__main__":
    main()
