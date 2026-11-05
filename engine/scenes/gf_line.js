/* gf_line — «Бог ещё не создан» (eps/god_future_p1, eps/god_future_p2): шов двух частей, линия времени.
 * Раскадровка — eps/god_future/source/storyboard.md (строки a10–a12 и b01–b02; текст — source/text_v15.md, фразы слиты:
 * K.a10 — часть a09 от «Но», её даёт storybase); словарь — gf_00_lib.js (window.GF).
 * Доводка 2 по слепому просмотру v1 (eps/god_future/qa/blind_view_v1/summary.md): на телефоне сцена ужата в .72, поэтому
 * главный объект — на всю ширину, линии ≥ 1,2, подписи моно ≥ 14 (в зоне ≥ 16), точки крупнее; каждые 1,5–2,5 с —
 * новое событие на слове. Дуги «в Его руках» больше нет (её видели куполом/радугой) — две ладони из точек.
 * Финал части 1 и первый кадр части 2 — одна и та же линия времени на всю ширину сцены: стрелка y=280, x 24→336,
 * огонь порядка (GF.spark, r 12) — в начале (40,280), пустой пунктирный контур огня (r 30) — у конца (296,280)
 * (тот же шов ждёт gf_omega); подписи ПРОШЛОЕ · СЕЙЧАС · БУДУЩЕЕ (моно 14) под линией, СЕЙЧАС — x 158.
 * Лиц нет: люди — облака точек ростом 108 (свой walker по формуле GF.personPts: шаг ногами, руки вверх с сотой).
 * Крупную плашку ВЗГЛЯД АВТОРА ставит story.py (VIEWS) — в сцене её нет.
 *
 * Одна непрерывная линия времени на часть: картинка зависит только от t и K, p.mode — лишь имя кадра, поэтому между
 * режимами нет швов. Часть — по K: есть K.a10/a11/a12 — часть 1, есть K.b01/b02 — часть 2 (иначе по mode).
 * Нет слова в K.words — доля фразы (черновые доли DEF только для scene_test без K).
 *
 * Часть 1 (вход наплывом 0,5 с из gf_crowd/order — его делает GF.scene; соты 6×6 с людьми и огонь над ними — как там):
 *  daily (a10 = a09 от «Но»; текст v21: «Но, как в теле, этот порядок не собрать навсегда: мы собираем его каждый
 *               день — каждым честным поступком.») «Но» — соты вырастают на всю ширину (×1,15, центр 210,196), огонь
 *               над ними (210,60), нити от огня к верхнему ряду; «теле» — слева проявляется крупное тело из точек с
 *               сотами в груди; «порядок» — по сотам от центра бежит волна света; «не» (не собрать) — края сот и тела
 *               осыпаются (точки разлетаются далеко и дрожат), к «навсегда» — сильнее; «собираем» — края собираются,
 *               внизу крупный счётчик ДЕНЬ 1 (моно 20–24); «каждый» — ·2, «день» — ·3, «каждым» — ·4 (без этого
 *               слова — каждые 0,5 с до конца фразы): каждый день половина краевых сот осыпается и собирается обратно;
 *               «честным» — в каждой соте по очереди тёплая вспышка (честный поступок человека этой соты);
 *               «поступком» — волна света от центра, огонь вспыхивает с кольцом, тело и счётчик гаснут, соты и огонь
 *               возвращаются в позу gf_crowd/order: соты 6×6 с людьми ×1 (центр 180,240, r 19,5), огонь (180,88, r 8),
 *               нити от огня к верхнему ряду. Эта поза — шов с gf_law/voltaire (c10, вход наплывом).
 *               v21: в части 1 после a10 фраз a11/a12 нет (дальше c10, c11 — gf_law), поэтому past/flip не наступают
 *               (cues1: их фразы — за пределами ролика); режимы past/flip остаются для части 1 со старым текстом.
 *  past (a11)   «А» — счётчик и тело уходят, огонь улетает вверх за кадр, соты отходят влево (×0,95, центр 150,192);
 *               «откуда» — справа от сот крупный «?» (моно 80); «порядок» (v15: «А откуда взялся сам порядок?») — соты
 *               вспыхивают, под ними печатается ПОРЯДОК (моно 18); «религии» — «?» гаснет, соты сжимаются (×0,62) в центр
 *               над линией, линия прорисовывается слева направо; «дан» — огонь сразу падает сверху по лучу на соты (≈0,6 с),
 *               волна, нити к верхнему ряду; «Бог» — огонь с сотами уходит в начало линии, «начале» — садится, вспышка и
 *               волна; «сотворил» — кольцо точек-мира, СОТВОРИЛ МИР; «дал» — ДАЛ ЗАКОН,
 *               волна; «будущее» — тёплые точки летят от огня над линией и к «руках» собираются в две ладони (ладони
 *               вверх, пальцы вместе, кончики к другой ладони, большие пальцы снаружи) над будущим отрезком линии,
 *               в ладонях — тёплый свет, отрезок под ним тёплый.
 *  flip (a12)   «дальше» — ладони тише (крупную плашку ВЗГЛЯД АВТОРА ставит story.py); «взгляд» — отметка СЕЙЧАС;
 *               «будущее» — отрезок от СЕЙЧАС к концу светлеет; «наших» — у СЕЙЧАС проявляется человек, к «руках»
 *               поднимает светящуюся соту; «не» (не в начале) — старый огонь в ПРОШЛОМ гаснет вместе с миром и ладонями,
 *               подписи тише, из него по линии в конец едет огонёк; «конце» — огонёк входит в пустой пунктирный контур,
 *               волна; «сложится» — сота человека улетает в контур (в контуре — пустые гнёзда); «порядка» — с линии
 *               прошлого взлетают три соты и встают в гнёзда; «мы» — второй человек с сотой, «собираем» — первый поднимает
 *               новую соту, оба идут к контуру; «религии» — над началом линии рисуется карандашный набросок сот,
 *               «черновик» — крупно встаёт ЧЕРНОВИК (моно 18, со вспышкой); «работы» — стрелка к ровным сотам над концом
 *               (две ячейки пустые); «собирают» — сота второго встаёт в гнездо; «второй» — по линии в контур бежит
 *               огонёк, контур вспыхивает. С K.card − 0,5 рисунок тускнеет до 40 % — под карточку ЧАСТЬ 2 (story.py).
 * Часть 2 (первый кадр без наплыва — сразу целый; хук ленты; линия всё время в движении: по ней бегут огоньки,
 *          контур дышит и мерцает):
 *  notyet (b01) вверху «ЧАСТЬ 3 ИЗ 3 / ЧАСТИ 1 И 2 — В ПРОФИЛЕ КАНАЛА» (моно 19 / 14,5, как в части 2, гаснет к «пока»);
 *               «ЕСТЬ ЛИ БОГ?» (моно 36) целиком с первого кадра (слепой просмотр v5: «ЕС▌» читали как глюк); «бог» — волна от контура; «рэй» — подпись GF.thinker
 *               «РЭЙ КУРЦВЕЙЛ · «TRANSCENDENT MAN» · 2009» (моно 12); «ответил» — по линии в контур бежит огонёк;
 *               «пока» — печатается крупно «ПОКА» (моно 46), «нет» — встаёт «НЕТ.» со вспышкой, контур вздрагивает волной.
 *  idea (b02)   «шутка» — «ПОКА» подчёркивается, контур вспыхивает; «идея» — по линии в контур бежит огонёк, в контуре
 *               проступают пустые гнёзда; «религиях» — вопрос и ответ гаснут;
 *               «бог» (1-е) — огонь падает сверху в начало линии, садится к «начале»; «сотворил» — кольцо мира и
 *               СОТВОРИЛ МИР; «будущее» — ладони из точек над будущим (как в части 1), «руках» — свет в ладонях;
 *               «идее» — ладони гаснут, огонь и подпись тише; «конце» — контур ярче, в нём пустые гнёзда, волна;
 *               «собирают» — три человека с сотами над головой идут к контуру, передний ставит соту в центр контура,
 *               на «Его» — средний, на «люди» — задний (каждый раз волна). Поза держится — из неё наплывает gf_omega/tree.
 * Слова-основы GF.w (a10 сверены с eps/god_future_p1/build/words.json, текст v21, 05.11; остальные — с cues.json 05.11,
 *   текст v15): a10 — теле, порядок, не, навсегда, собираем, каждый, день, каждым, честн, поступк (последние четыре — v21,
 *   нет слова — события нет);
 *   a11 — откуда, взялся, порядок (v15; до переозвучки — доля после «взялся»), религии, дан, бог, начале, сотворил, дал,
 *   будущее, руках; a12 — дальше, взгляд, будущее, наших, руках, не (2-е), конце, сложится, порядка, мы, собираем,
 *   религии, черновик, работы, собирают, второй;
 *   b01 — бог, рэй, ответил, пока, нет; b02 — шутка, идея, религиях, бог, начале, сотворил, будущее, руках, идее, конце,
 *   собирают, его (2-е), люди.
 * Параметры p: s (фраза), mode, K (cues.json части), prev/prev_mode (наплыв — GF.scene). Камера движка нейтральна.
 * Важное — в y=20..345 (низ кадра пуст под субтитры). Кадр ≤ ~3500 элементов (пик — соты a10 с людьми).
 * Свои id в SVG: gfl-rev (прорисовка линии).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  // line geometry: the same in both parts (the seam with gf_omega); the whole composition spans x 24..336, y 27..338
  const LY = 280, LX0 = 24, LX1 = 336, FX = 40, FR = 12, EX = 296, ER = 30, NOWX = 158, TOPY = 30;
  const FUTX = EX - ER - 6;                          // БУДУЩЕЕ ends before the contour
  const LAB = 14;                                    // ПРОШЛОЕ · СЕЙЧАС · БУДУЩЕЕ (16 in the safe zone)
  const LBX = 24, LBY1 = 228, LBY2 = 250;           // СОТВОРИЛ МИР · ДАЛ ЗАКОН (above the fire, left of «СЕЙЧАС»)
  const PH = 108, PR = 1.45;                         // height of the people on the line, their dots
  const CR1 = 12, CELLY = LY - 134;                  // a glowing cell held over the head (arms up)
  // draft over the start, clean cells over the end (a12)
  const DRX = 84, DRY = 92, DR = 21, CLX = 272;
  // a10 comb (as gf_crowd/order ends: the comb, the fire of order above it)
  const CX = 180, CY = 240, CR = 19.5, COLS = 6, ROWS = 6, SX0 = 180, SY0 = 88, SR0 = 8;
  const DZ = 1.15, DCX = 210, DCY = 196, DFX = 210, DFY = 60;   // daily: the comb on the whole width, the fire above it
  const QZ = 1, QCX = 150, QCY = 192, QMX = 300, QMY = 230;   // a11: the comb next to a big «?»
  const RZ = .62, RCX = 180, RCY = 178, RFY = 104;              // a11 «религии … дан свыше»: the comb, the fire lands above it
  const DAYX = 92, DAYY = 330;                                  // the day counter under the comb (v22: larger, on a plate)
  const HCX = 250, HCY = 236, HS = 1.9;                         // the palms over the future part of the line
  // draft phrase bounds only for scene_test without K (real proportions of the voice of 05.11)
  const DEF = { a10: [0, 5.28], a11: [5.28, 14.14], a12: [14.69, 28.4], b01: [0.05, 4.06], b02: [4.46, 15.4] };

  const H = n => GF.hash(n);
  const { q, qq, lerp, clamp } = GF;
  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GF.bare(stem);
    return ws.filter(w => GF.bare(w.w).startsWith(s)).length > n;
  };
  // word start through GF.w; without the word — a share of the phrase
  const W = (K, id, stem, share, n = 0) => {
    if (hasW(K, id, stem, n)) return GF.w(K, id, stem, n);
    const [a, b] = span(K, id);
    return a + share * (b - a);
  };
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  // a wave: the latest of the starts (0..1, 1 = gone)
  const wave = (t, starts) => { let v = 0; for (const a of starts) if (t >= a) v = qq(t, a, a + 1.1); return v; };

  function cues1(K) {
    const c = {};
    // текст v21: за a10 в части 1 идёт c10 (gf_law), фраз a11/a12 нет — их события уходят за конец ролика (не наступают),
    // а не на черновые доли DEF (иначе в daily сразу видна поза конца flip)
    const solo = K.a10 != null && K.a11 == null && K.a12 == null;
    const sp = id => solo && id !== 'a10' ? [1e6, 1e6 + 3] : span(K, id);
    const W = (K2, id, stem, share, n = 0) => {
      if (hasW(K2, id, stem, n)) return GF.w(K2, id, stem, n);
      const [a, b] = sp(id);
      return a + share * (b - a);
    };
    const W10 = stem => hasW(K, 'a10', stem, 0) ? GF.w(K, 'a10', stem) : 1e6;   // v21-слова a10: нет слова — нет события
    [c.s10, c.e10] = sp('a10'); [c.s11, c.e11] = sp('a11'); [c.s12, c.e12] = sp('a12');
    c.tele = W(K, 'a10', 'теле', .18); c.ne10 = W(K, 'a10', 'не', .37); c.nav = W(K, 'a10', 'навсегда', .53);
    c.sob = W(K, 'a10', 'собираем', .71); c.kazh = W(K, 'a10', 'каждый', .83); c.den = W(K, 'a10', 'день', .9);
    c.otk = W(K, 'a11', 'откуда', .02); c.vzl = W(K, 'a11', 'взялся', .06);
    c.rel = W(K, 'a11', 'религии', .13);
    // v15 «А откуда взялся сам порядок?»; the v14 voice has no «порядок» — just after «взялся», before «религии»
    c.por11 = hasW(K, 'a11', 'порядок', 0) ? GF.w(K, 'a11', 'порядок') : Math.min(c.vzl + .4, c.rel - .2);
    c.dan = W(K, 'a11', 'дан', .29); c.nach = W(K, 'a11', 'начале', .48); c.sotv = W(K, 'a11', 'сотворил', .59);
    c.dal = W(K, 'a11', 'дал', .7); c.bud = W(K, 'a11', 'будущее', .82); c.ruk = W(K, 'a11', 'руках', .93);
    c.dalshe = W(K, 'a12', 'дальше', 0); c.vzg = W(K, 'a12', 'взгляд', .07); c.bud12 = W(K, 'a12', 'будущее', .21);
    c.nash = W(K, 'a12', 'наших', .28); c.ruk12 = W(K, 'a12', 'руках', .3); c.ne12 = W(K, 'a12', 'не', .38, 1);
    c.kon = W(K, 'a12', 'конце', .46); c.slozh = W(K, 'a12', 'сложится', .53); c.por = W(K, 'a12', 'порядка', .57);
    c.my = W(K, 'a12', 'мы', .61); c.sobm = W(K, 'a12', 'собираем', .62); c.rel12 = W(K, 'a12', 'религии', .7);
    c.cher = W(K, 'a12', 'черновик', .77); c.rab = W(K, 'a12', 'работы', .81); c.sobt = W(K, 'a12', 'собирают', .89);
    c.vtor = W(K, 'a12', 'второй', .94);
    if (c.kon < c.ne12 + .8) c.kon = c.ne12 + .8;
    // v21: «этот порядок» — волна; «каждым» — день 4; «честным» — тёплые вспышки в сотах; «поступком» — назад в позу шва
    c.por10 = W10('порядок'); c.kazh2 = W10('каждым'); c.chest = W10('честн'); c.post = W10('поступк');
    // day ticks: «собираем», «каждый», «день», «каждым» (without it — every .5 s until the phrase ends; at most 4 days)
    c.days = [c.sob, c.kazh, c.den];
    if (c.kazh2 < 1e5) c.days.push(c.kazh2);
    for (let x = c.den + .5; x < c.s11 - .15 && c.days.length < 4; x += .5) c.days.push(x);
    // the fire falls from above onto the comb on «дан (свыше)», then on «Бог — в начале» takes it into the start of the line
    c.bog11 = W(K, 'a11', 'бог', .4); c.land1 = c.dan + .5;
    c.mv0 = Math.max(c.bog11 - .1, c.land1 + .1); c.land = Math.max(c.nach + .1, c.mv0 + .7);
    return c;
  }
  function cues2(K) {
    const c = {};
    [c.s1, c.e1] = span(K, 'b01'); [c.s2, c.e2] = span(K, 'b02');
    c.bog1 = W(K, 'b01', 'бог', .1); c.rey = W(K, 'b01', 'рэй', .42); c.otv = W(K, 'b01', 'ответил', .62);
    c.poka = W(K, 'b01', 'пока', .8); c.net = W(K, 'b01', 'нет', .87);
    c.shut = W(K, 'b02', 'шутка', .03); c.ideya = W(K, 'b02', 'идея', .13); c.rel = W(K, 'b02', 'религиях', .22);
    c.bog = W(K, 'b02', 'бог', .27); c.nach = W(K, 'b02', 'начале', .33); c.sotv = W(K, 'b02', 'сотворил', .41);
    c.bud = W(K, 'b02', 'будущее', .52); c.ruk = W(K, 'b02', 'руках', .61); c.idee = W(K, 'b02', 'идее', .71);
    c.kon = W(K, 'b02', 'конце', .81); c.sob = W(K, 'b02', 'собирают', .9); c.ego = W(K, 'b02', 'его', .94, 1);
    c.lyud = W(K, 'b02', 'люди', .96);
    c.land = Math.max(c.nach, c.bog + .5);
    return c;
  }

  /* ---------------- drawings ---------------- */
  // the timeline, revealed from the left: arrow, ticks, ПРОШЛОЕ · БУДУЩЕЕ; now — the «СЕЙЧАС» mark; fut — the segment
  // from «СЕЙЧАС» to the end lights up («будущее — и в наших руках»)
  function tline(t, rev, now, fut) {
    if (rev <= .003) return '';
    let s = `<g stroke="#fff" fill="none" stroke-linecap="round"><line x1="${LX0}" y1="${LY}" x2="${LX1}" y2="${LY}" stroke-width="2.2" opacity=".92"/>` +
      `<line x1="${LX0}" y1="${LY}" x2="${LX1}" y2="${LY}" stroke-width="6" opacity=".2" filter="url(#un-soft)"/>` +
      `<path d="M${LX1 - 13} ${LY - 7} L${LX1} ${LY} L${LX1 - 13} ${LY + 7}" stroke-width="2.2" opacity=".95"/></g>`;
    for (let i = 0; i <= 12; i++) {
      const x = lerp(LX0 + 6, LX1 - 16, i / 12);
      s += `<line x1="${f(x)}" x2="${f(x)}" y1="${LY - 6}" y2="${LY + 6}" stroke="#fff" stroke-width="1.3" opacity=".55"/>`;
    }
    s += GF.mono(LX0, LY + 27, 'ПРОШЛОЕ', { size: LAB, anchor: 'start', opacity: .92 }) +
      GF.mono(FUTX, LY + 27, 'БУДУЩЕЕ', { size: LAB, anchor: 'end', opacity: .92 });
    if (fut > .003) {
      s += `<g opacity="${f(fut)}"><line x1="${NOWX}" y1="${LY}" x2="${LX1 - 6}" y2="${LY}" stroke="#fff6e0" stroke-width="14" opacity=".5" filter="url(#un-soft)"/>` +
        `<line x1="${NOWX}" y1="${LY}" x2="${LX1 - 6}" y2="${LY}" stroke="#fff" stroke-width="3.6" opacity="1"/></g>`;
    }
    if (now > .003) {
      s += `<g opacity="${f(now)}"><line x1="${NOWX}" x2="${NOWX}" y1="${f(LY - 16 * now)}" y2="${f(LY + 16 * now)}" stroke="#fff" stroke-width="2.2" opacity=".95"/>` +
        GF.mono(NOWX, LY + 27, 'СЕЙЧАС', { size: LAB, anchor: 'middle', opacity: .95 }) + '</g>';
    }
    // a light of time flowing along the line
    const u = ((t / 3.8) % 1 + 1) % 1, x = lerp(LX0 + 10, LX1 - 10, u);
    s += `<circle cx="${f(x)}" cy="${LY}" r="3.4" fill="#fff" opacity="${f(.75 * Math.sin(Math.PI * u))}" filter="url(#un-soft)"/>`;
    if (rev >= .999) return s;
    const w = lerp(LX0 - 18, 352, rev);
    return `<defs><clipPath id="gfl-rev"><rect x="-10" y="0" width="${f(w + 10)}" height="640"/></clipPath></defs>` +
      `<g clip-path="url(#gfl-rev)">${s}</g><circle cx="${f(Math.min(w, LX1))}" cy="${LY}" r="4" fill="#fff" opacity="${f(.95 * (1 - rev))}" filter="url(#un-soft)"/>`;
  }
  // lights running along the line from the past into the contour (part 2: the line is always in motion)
  function flow(t, n, period, op) {
    if (op <= .003) return '';
    let s = '';
    for (let k = 0; k < n; k++) {
      const u = (((t / period) + k / n) % 1 + 1) % 1, a = op * Math.sin(Math.PI * u);
      for (let j = 0; j < 4; j++) {
        const x = lerp(LX0 + 8, EX - ER - 2, clamp(u - j * .02));
        s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4 - j * .6)}" fill="#fff" opacity="${f(a * (1 - j / 4))}"/>`;
      }
    }
    return `<g filter="url(#un-soft)">${s}</g>${s}`;
  }
  // a comet running along the line from x0 into the contour (u 0..1)
  function comet(u, x0) {
    if (u <= 0 || u >= 1) return '';
    let s = '';
    for (let k = 0; k < 9; k++) {
      const x = lerp(x0, EX - ER, clamp(u - k * .025));
      s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4.2 - k * .36)}" fill="#fff" opacity="${f((1 - k / 9) * .95 * Math.sin(Math.PI * u))}"/>`;
    }
    return `<g filter="url(#un-soft)">${s}</g>${s}`;
  }
  // the empty dashed contour of the fire; bright 0..1; cells — brightness of the 7 inner cells (centre first);
  // slots — faint dashed empty nests for the cells; ring — wave 0..1; breath — how much it breathes
  const IR = 17.2, IH = 9.4;
  const INNER = [[0, 0], ...[0, 1, 2, 3, 4, 5].map(k => [IR * Math.cos(Math.PI / 3 * k), IR * Math.sin(Math.PI / 3 * k)])];
  function contour(t, op, bright, cells, ring, slots = 0, breath = .04) {
    if (op <= .003) return '';
    const br = 1 + breath * Math.sin(t * 2.3), r = ER * br, dash = 'stroke-dasharray="6 5"';
    let s = `<circle cx="${EX}" cy="${LY}" r="${f(r * 2.5)}" fill="url(#gf-warm)" opacity="${f(.16 + .38 * bright)}"/>` +
      `<circle cx="${EX}" cy="${LY}" r="${f(r - 1)}" fill="#000" opacity=".88"/>`;
    s += `<circle cx="${EX}" cy="${LY}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="4.5" ${dash} ` +
      `stroke-dashoffset="${f(-t * 4)}" opacity="${f(.25 + .35 * bright)}" filter="url(#un-soft)"/>`;
    s += `<circle cx="${EX}" cy="${LY}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="2.2" ${dash} ` +
      `stroke-dashoffset="${f(-t * 4)}" opacity="${f(.75 + .25 * bright)}"/>`;
    INNER.forEach(([dx, dy], k) => {
      const l = (cells || [])[k] || 0;
      if (slots > .003 && l < .98) {
        const V = [0, 1, 2, 3, 4, 5].map(j => { const a = Math.PI / 3 * j - Math.PI / 2; return [EX + dx + IH * Math.cos(a), LY + dy + IH * Math.sin(a)]; });
        s += `<path d="M${V.map(v => `${f(v[0])} ${f(v[1])}`).join(' L')} Z" fill="none" stroke="#fff" stroke-width="1.2" stroke-dasharray="2 2.2" opacity="${f(.5 * slots * (1 - l))}"/>`;
      }
      if (l <= .003) return;
      s += GF.hex(EX + dx, LY + dy, IH, { op: .97 * l, w: 1.6, fill: `rgba(255,255,255,${f(.28 * l)})` }) +
        GF.hex(EX + dx, LY + dy, IH, { op: .6 * l, w: 3.2, glow: true });
    });
    if (ring > .003 && ring < 1) s += `<circle cx="${EX}" cy="${LY}" r="${f(ER + 46 * ring)}" fill="none" stroke="#fff" stroke-width="1.8" opacity="${f(.85 * (1 - ring))}"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a glowing cell carried by a person
  function cell(x, y, r, op, t) {
    if (op <= .003) return '';
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 2.6)}" fill="url(#gf-warm)" opacity=".8"/>` +
      GF.hex(x, y, r, { op: .97, w: 1.7, fill: `rgba(255,255,255,${f(.26 + .05 * Math.sin(t * 3))})` }) +
      GF.hex(x, y, r, { op: .6, w: 3.2, glow: true }) + '</g>';
  }
  // a cell flying from a to b along a raised arc (u 0..1), shrinking from r0 to r1
  function flyCell(a, b, u, r0, r1, op, t, lift = 26) {
    if (u <= 0 || op <= .003) return '';
    const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(Math.PI * u) * lift;
    return cell(x, y, lerp(r0, r1, u), op * (1 - qq(u, .92, 1)), t);
  }
  // a person of dots (formula of GF.personPts): ph — step phase (legs lift in turn), up 0..1 — arms raised
  function walker(cx, gy, h, n, seed, ph, up, t) {
    const P = [], s = h / 100, lift = [Math.max(0, Math.sin(ph)), Math.max(0, -Math.sin(ph))];
    const bob = -1.2 * s * Math.abs(Math.sin(ph));
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3);
      let x, y;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * PI2; x = r * Math.cos(th); y = -91 + r * 1.12 * Math.sin(th); }
      else if (i < n * .50) { y = -80 + a * 34; const wdt = 10.5 - Math.abs(y + 66) * .05; x = (b * 2 - 1) * wdt; }
      else if (i < n * .72) {
        const side = c < .5 ? -1 : 1, u = a;
        const dx = lerp(6.5, -3.5, up) * u, dy = lerp(31, -34, up) * u;
        x = side * (11 + dx) + (b - .5) * 2.6; y = -78 + dy + (b - .5) * 2;
      } else {
        const side = c < .5 ? -1 : 1, u = a;
        x = side * (3.2 + u * 2.6) + (b - .5) * 3.4; y = -46 + u * 46 - 9 * lift[side < 0 ? 0 : 1] * u;
      }
      P.push([cx + x * s, gy + y * s + bob]);
    }
    return GF.dots(GF.jitter(P, t, .3, seed), { r: PR, op: .95, t, glow: .5 });
  }
  // the world: a flat ring of dots around the fire
  function world(x, y, k, t) {
    if (k <= .003) return '';
    const P = [];
    for (let i = 0; i < 84; i++) {
      const th = H(i + 71) * PI2 + t * (.35 + .25 * H(i + 9)), rr = (21 + 33 * H(i + 33)) * (.35 + .65 * k);
      P.push([x + rr * Math.cos(th), y + rr * .3 * Math.sin(th)]);
    }
    return GF.dots(P, { r: 1.5, op: .9 * k, t, glow: .6 });
  }
  // the fire of order: GF.spark + a beam from above while it falls (beam 0..1) and a wave when it lands (ring 0..1)
  function fire(x, y, r, op, t, beam, ring) {
    let s = '';
    if (beam > .003) {
      s += `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#fff6e0" stroke-width="9" opacity="${f(.25 * beam)}" filter="url(#un-soft)"/>` +
        `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#fff" stroke-width="1.8" opacity="${f(.8 * beam)}"/>`;
      for (let k = 1; k < 8; k++) s += `<circle cx="${f(x)}" cy="${f(y - k * 8)}" r="${f(3.8 - k * .4)}" fill="#fff" opacity="${f(.6 * beam * (1 - k / 8))}" filter="url(#un-soft)"/>`;
    }
    s += GF.spark(x, y, r, { t, op });
    if (ring > .003 && ring < 1) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 50 * ring)}" fill="none" stroke="#fff" stroke-width="1.8" opacity="${f(.85 * (1 - ring) * op)}"/>`;
    return s;
  }
  // «будущее — в Его руках»: two cupped palms of dots (palms up, little fingers together, thumbs outside) over the future
  // part of the line; they gather from warm dots that fly out of the fire (form 0..1), light shines in the palms
  const HANDS = (() => {
    const L = [];
    for (let i = 0; i < 46; i++) { const r = Math.sqrt(H(900 + i * 1.3)), th = H(1300 + i * 2.1) * PI2; L.push([12 * r * Math.cos(th), 12.5 * r * Math.sin(th)]); }
    for (let i = 0; i < 24; i++) { const th = i / 24 * PI2; L.push([12 * Math.cos(th), 12.5 * Math.sin(th)]); }
    // fingers, inner (little) → outer (index): base x, length, lean
    // fingers together, tips bent a little towards the other hand (the palms cup the light)
    [[-7.4, 13, 0], [-2.4, 17.5, 0], [2.6, 19, 0], [7.6, 16.5, 0]].forEach(([x0, len], j) => {
      const n = Math.round(len * 1.15);
      for (let i = 0; i < n; i++) { const u = (i + .5) / n, w = (H(1700 + j * 37 + i) - .5) * 4.6; L.push([x0 + w - 5 * u * u, -10.5 - len * u * (1 - .12 * u * u)]); }
    });
    // the thumb: outer side, up and a little out
    for (let i = 0; i < 14; i++) { const u = (i + .5) / 14, w = (H(2100 + i) - .5) * 4.4, a = .55; L.push([10.5 + Math.sin(a) * 14 * u + w * Math.cos(a), 2 - Math.cos(a) * 14 * u + w * Math.sin(a)]); }
    const th = .3, co = Math.cos(th), si = Math.sin(th), pv = [-9.5, 9.5], piv = [pv[0] * co - pv[1] * si, pv[0] * si + pv[1] * co];
    const R = [];
    for (const side of [1, -1]) {
      for (const [x, y] of L) R.push([HCX + side * (x * co - y * si - piv[0] + 1) * HS, HCY + (x * si + y * co - piv[1]) * HS]);
      // the wrist: straight down from the heel of the palm
      for (let i = 0; i < 18; i++) R.push([HCX + side * (4 + 14 * H(2300 + i)) * HS, HCY + (2 + 15 * H(2400 + i)) * HS]);
    }
    return R;
  })();
  const HSRC = HANDS.map((p, i) => [(H(i * 7 + 3) - .5) * 18, (H(i * 11 + 5) - .5) * 14 - 6]);
  function hands(t, form, op, sx, sy) {
    if (op <= .003 || form <= .003) return '';
    const P = GF.morph(HSRC.map(p => [sx + p[0], sy + p[1]]), HANDS, form, t, { spread: .45, amp: 1.5, bend: 50, seed: 7 });
    const lit = qq(form, .7, 1);
    let s = '';
    if (lit > .003) {
      s += `<circle cx="${HCX}" cy="${HCY - 38}" r="58" fill="url(#gf-warm)" opacity="${f(lit * (.85 + .15 * Math.sin(t * 1.7)))}"/>` +
        `<line x1="${HCX - 60}" y1="${LY}" x2="${LX1 - 8}" y2="${LY}" stroke="#ffe9c0" stroke-width="10" opacity="${f(.4 * lit)}" filter="url(#un-soft)"/>`;
    }
    s += GF.dots(GF.jitter(P, t, .3, 9), { r: 1.55, op: .97, t, glow: .7, color: '#fff3dc' });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // pencil draft of cells: grey wobbly double strokes with bulging edges and overshooting ends, uneven sizes and tilt,
  // drawn progressively (prog 0..1 over all cells)
  function draft(cx, cy, r, prog, op) {
    if (op <= .003 || prog <= .003) return '';
    const C = GF.lattice(cx, cy, r, 3, 2), sc = r / 14;
    let s = '';
    C.forEach((c, i) => {
      const p = clamp(prog * C.length - i);
      if (p <= 0) return;
      const rot = (H(i * 3 + 1) - .5) * .35, rr = r * (.8 + .2 * H(i * 5 + 2));
      for (let pass = 0; pass < 2; pass++) {
        const V = [0, 1, 2, 3, 4, 5].map(k => {
          const a = Math.PI / 3 * k - Math.PI / 2 + rot, j = k * 7 + i * 61 + pass * 17;
          return [c[0] + rr * Math.cos(a) + (H(j) - .5) * 4.6 * sc, c[1] + rr * Math.sin(a) + (H(j + 3) - .5) * 4.6 * sc];
        });
        const o = [(V[0][0] - V[5][0]) * .22, (V[0][1] - V[5][1]) * .22];   // start a bit before the first corner
        let d = `M${f(V[5][0] + o[0] * 2.6)} ${f(V[5][1] + o[1] * 2.6)}`;
        for (let k = 0; k <= 6; k++) {
          const A = V[(k + 5) % 6], B = V[k % 6], n = [B[1] - A[1], A[0] - B[0]], L = Math.hypot(n[0], n[1]) || 1;
          const b = (H(i * 13 + k * 5 + pass * 29) - .5) * 5 * sc;
          const B2 = k === 6 ? [B[0] + (V[1][0] - B[0]) * .3, B[1] + (V[1][1] - B[1]) * .3] : B;   // overshoot past the start
          d += ` Q${f((A[0] + B[0]) / 2 + n[0] / L * b)} ${f((A[1] + B[1]) / 2 + n[1] / L * b)} ${f(B2[0])} ${f(B2[1])}`;
        }
        s += `<path d="${d}" pathLength="1" stroke-dasharray="${f(p)} 1" fill="none" stroke="#c4c4c4" stroke-width="${pass ? 1.2 : 1.7}" ` +
          `opacity="${pass ? .6 : .92}" stroke-linecap="round"/>`;
      }
    });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // clean cells: regular white outlines with a soft glow and a faint fill, one by one (prog 0..1);
  // the cells in empty stay dashed nests (the work is not finished)
  function clean(cx, cy, r, prog, op, t, empty) {
    if (op <= .003 || prog <= .003) return '';
    const C = GF.lattice(cx, cy, r, 3, 2);
    let s = '';
    C.forEach((c, i) => {
      const p = clamp(prog * C.length - i);
      if (p <= 0) return;
      if (empty.includes(i)) {
        const V = [0, 1, 2, 3, 4, 5].map(j => { const a = Math.PI / 3 * j - Math.PI / 2; return [c[0] + r * .94 * Math.cos(a), c[1] + r * .94 * Math.sin(a)]; });
        s += `<path d="M${V.map(v => `${f(v[0])} ${f(v[1])}`).join(' L')} Z" fill="none" stroke="#fff" stroke-width="1.3" stroke-dasharray="3 3" opacity="${f(.55 * p)}"/>`;
        return;
      }
      const br = .8 + .1 * Math.sin(t * 1.8 + i), rr = r * .94 * (.7 + .3 * p);
      s += GF.hex(c[0], c[1], rr, { op: br * p, w: 1.7, fill: `rgba(255,255,255,${f(.08 * p)})` }) + GF.hex(c[0], c[1], rr, { op: .35 * p, w: 3.2, glow: true });
    });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a dashed arrow from the draft to the clean cells (prog 0..1)
  function dashArrow(x0, x1, y, prog) {
    if (prog <= .003) return '';
    const x = lerp(x0, x1, prog);
    return `<g stroke="#fff" fill="none" stroke-linecap="round" opacity=".9"><line x1="${x0}" y1="${y}" x2="${f(x)}" y2="${y}" stroke-width="1.8" stroke-dasharray="5 4"/>` +
      (prog > .85 ? `<path d="M${f(x - 9)} ${y - 6} L${f(x)} ${y} L${f(x - 9)} ${y + 6}" stroke-width="1.9" opacity="${f(qq(prog, .85, 1))}"/>` : '') + '</g>';
  }
  // the a10 comb: edge cells crumble into chaos (points fly far apart and tremble) and are built again
  const LAT = (() => GF.lattice(CX, CY, CR, COLS, ROWS))();
  const isEdge = i => { const ii = i % COLS, j = Math.floor(i / COLS); return ii === 0 || ii === COLS - 1 || j === 0 || j === ROWS - 1; };
  function crumbleAt(t, c, d, key) {
    let v = qq(t, c.ne10 + d * .45, c.nav + .3 + d * .35) * (1 - qq(t, c.sob - .05 + d * .25, c.sob + .5 + d * .25));
    for (let k = 1; k < c.days.length; k++) {
      if (H(key * 31 + k * 7) > .5) continue;
      const tau = c.days[k];
      v = Math.max(v, qq(t, tau - .28, tau - .02) * (1 - qq(t, tau + .04, tau + .42)));
    }
    return v;
  }
  const crumble = (i, t, c) => isEdge(i) ? crumbleAt(t, c, H(i * 5 + 1), i) : 0;
  const PPL = LAT.map((c, i) => GF.personPts(c[0], c[1] + 12.5, 25, 34, i + 1));
  function comb(t, c, flash) {
    let lines = '', P = [], A = [];
    LAT.forEach((cc, i) => {
      const cr = crumble(i, t, c), [x, y] = cc;
      // «честным (поступком)»: a warm flash in each cell in turn — the deed of its person
      const dd = pulse(t, c.chest + H(i * 3 + 7) * .55, .1, .65);
      // the person of the cell (as gf_crowd/order): scatters with the cell and comes back
      PPL[i].forEach((p, k) => {
        let px = p[0], py = p[1];
        if (cr > .003) {
          const dir = Math.atan2(py - CY, px - CX) + (H(i * 19 + k) - .5) * 2.2, dist = cr * (14 + 34 * H(i * 11 + k * 5));
          px += Math.cos(dir) * dist + 2.6 * cr * Math.sin(t * (1.9 + H(k + i * 3)) + k);
          py += Math.sin(dir) * dist + 2.6 * cr * Math.cos(t * (1.5 + H(k * 5 + i)) + k);
        }
        P.push([px, py]); A.push(.95 - .5 * cr + .5 * dd);
      });
      // «порядок»: a wave of light from the centre outwards
      const fl = flash * clamp(1.4 - Math.hypot(x - CX, y - CY) / 110);
      if (dd > .003) lines += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(CR * 1.5)}" fill="url(#gf-warm)" opacity="${f(dd)}"/>` +
        GF.hex(x, y, CR * .96, { op: .9 * dd, w: 3, glow: true, color: '#ffe6bd' });
      const lit = clamp(clamp(1 - cr) * (.82 + .18 * Math.sin(t * 1.4 + i * .7)) + .5 * fl + .5 * dd);
      lines += GF.hex(x, y, CR * .96, { op: (.3 + .65 * lit) * (1 - .85 * cr), w: 1.25, fill: fl > .05 ? `rgba(255,255,255,${f(.16 * fl)})` : 'none' });
      if (lit > .55 && cr < .3) lines += GF.hex(x, y, CR * .96, { op: (.25 * (lit - .5) + .4 * fl) * (1 - cr), w: 2.6, glow: true });
      for (let k = 0; k < 12; k++) {
        const a = Math.PI / 3 * Math.floor(k / 2) - Math.PI / 2, a2 = a + Math.PI / 3;
        let px = x + CR * .96 * Math.cos(a), py = y + CR * .96 * Math.sin(a);
        if (k % 2) { px = (px + x + CR * .96 * Math.cos(a2)) / 2; py = (py + y + CR * .96 * Math.sin(a2)) / 2; }
        if (cr > .003) {
          const dir = Math.atan2(y - CY, x - CX) + (H(i * 13 + k) - .5) * 1.8, dist = cr * (16 + 30 * H(i * 7 + k * 3));
          px += Math.cos(dir) * dist + 3 * cr * Math.sin(t * (2.1 + H(k + i)) + k);
          py += Math.sin(dir) * dist + 3 * cr * Math.cos(t * (1.7 + H(k * 3 + i)) + k);
        }
        if (cr > .02 || k % 2 === 0) { P.push([px, py]); A.push((.75 - .3 * cr) * (cr > .02 ? 1 : .6)); }
      }
    });
    return lines + GF.dots(P, { r: 1.35, op: .9, t, glow: .5, alpha: i => A[i] });
  }
  // «как и в теле»: a big body of dots with cells in the chest (as gf_body), its edges crumble and gather with the comb
  const BX = 46, BG = 300, BH = 150;
  const BODY = GF.personPts(BX, BG, BH, 230, 5);
  const BCELL = GF.lattice(BX, BG - BH * .62, 5.2, 3, 3);
  function body(t, c, op) {
    if (op <= .003) return '';
    const P = [], A = [];
    BODY.forEach((p, k) => {
      const edge = H(k * 7 + 3) > .42, cr = edge ? crumbleAt(t, c, H(k * 3 + 2) * .6, 40 + (k % 9)) : 0;
      let [px, py] = p;
      if (cr > .003) {
        const dir = Math.atan2(py - (BG - BH * .55), px - BX) + (H(k * 11) - .5) * 1.6, dist = cr * (10 + 26 * H(k * 5 + 1));
        px += Math.cos(dir) * dist + 2.4 * cr * Math.sin(t * (1.8 + H(k)) + k);
        py += Math.sin(dir) * dist + 2.4 * cr * Math.cos(t * (1.6 + H(k * 3)) + k);
      }
      P.push([px, py]); A.push(.95 - .45 * cr);
    });
    const cr0 = crumbleAt(t, c, .3, 41);
    let s = GF.dots(P, { r: 1.35, op: .92, t, glow: .5, alpha: i => A[i] });
    BCELL.forEach((cc, i) => { s += GF.hex(cc[0], cc[1], 5, { op: (.8 + .2 * Math.sin(t * 1.6 + i)) * (1 - .7 * cr0), w: 1.2, fill: 'rgba(255,255,255,.16)' }); });
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  /* ---------------- part 1: daily → past → flip ---------------- */
  function part1(t, K) {
    const c = cues1(K);
    let s = '';
    // the comb: grows to the whole width after «Но», steps left for the «?» on «А», on «религии» shrinks to the centre
    // above the line (the fire falls onto it on «дан свыше»), on «Бог — в начале» goes with the fire into the start
    // «поступком» (v21): back to the pose of gf_crowd/order — the seam with gf_law/voltaire
    const back = qq(t, c.post - .05, c.post + .85);
    const zq = qq(t, c.s10 + .3, c.s10 + 1.3) * (1 - back), aq = qq(t, c.s11 - .05, c.s11 + .7), rq = qq(t, c.rel - .05, c.rel + .8);
    const mv = qq(t, c.mv0, c.land);
    let z = lerp(1, DZ, zq), tx = lerp(CX, DCX, zq), ty = lerp(CY, DCY, zq);
    z = lerp(z, QZ, aq); tx = lerp(tx, QCX, aq); ty = lerp(ty, QCY, aq);
    z = lerp(z, RZ, rq); tx = lerp(tx, RCX, rq); ty = lerp(ty, RCY, rq);
    z = lerp(z, .08, mv); tx = lerp(tx, FX, mv); ty = lerp(ty, LY - 6, mv);
    const cop = 1 - qq(mv, .55, 1);
    const flash = Math.max(pulse(t, c.por11 - .05, .15, 1.1), pulse(t, c.por10 - .05, .15, 1.1), pulse(t, c.post, .15, 1.1));
    if (cop > .003) s += `<g opacity="${f(cop)}">${GF.zoom(comb(t, c, flash), CX, CY, z, tx, ty)}</g>`;
    // «как в теле»: the body at the left (gone on «А»; v21 — on «поступком»)
    s += body(t, c, q(t, c.tele - .1, .5) * (1 - qq(t, c.s11 - .05, c.s11 + .5)) * (1 - back));
    // the fire: above the comb (daily) → flies up out of the frame on «А» («откуда?») → falls at once from above along a
    // beam onto the comb on «дан (свыше)» → with the comb into the start of the line on «Бог — в начале» → a flare and a
    // wave there → goes out on «не в начале» (a12)
    const up = qq(t, c.s11 - .05, c.s11 + .7), fall = qq(t, c.dan - .1, c.land1), gone = qq(t, c.ne12 - .05, c.ne12 + .45);
    let fx, fy, fr, fop = 1, beam = 0;
    if (t < c.dan - .1) { fx = lerp(SX0, DFX, zq); fy = lerp(lerp(SY0, DFY, zq), -70, up); fr = SR0 * (1 + .45 * pulse(t, c.post, .15, .8)); }
    else {
      const a = (1 - mv) ** 2, b = 2 * mv * (1 - mv), e = mv * mv;
      fx = a * RCX + b * 70 + e * FX; fy = a * lerp(-30, RFY, fall) + b * 150 + e * LY;
      fr = lerp(SR0, FR, mv) * (1 + .35 * pulse(t, c.land, .12, .7)) * (1 - .6 * gone);
      fop = 1 - gone; beam = q(t, c.dan - .15, .2) * (1 - qq(t, c.land1 - .05, c.land1 + .5));
    }
    // threads from the fire to the top row of the comb (daily; and again when the fire has come down onto it)
    const th = Math.max((1 - up) * (1 - aq), q(t, c.land1 - .1, .3) * (1 - mv)) * cop;
    if (th > .003) for (let i = 0; i < COLS; i++) {
      const p = [tx + (LAT[i][0] - CX) * z, ty + (LAT[i][1] - CR - CY) * z];
      s += UN.thread([fx, fy + 8], p, { opacity: (.16 + .05 * Math.sin(t * 1.3 + i)) * th, width: .8 });
    }
    // the day counter under the comb: ДЕНЬ 1 · 2 · 3 …, the new number pops and glows
    const dayN = c.days.filter(x => t >= x).length, dop = (1 - qq(t, c.s11 - .05, c.s11 + .45)) * q(t, c.sob - .05, .25) * (1 - qq(t, c.post + .25, c.post + .85));
    // v22 (слепой просмотр: «ДЕНЬ 1·2·3·4» на телефоне не читался): моно 26/30 (было 20/24) на тёмной плашке, выше
    // нижнего затухания кадра
    if (dayN > 0 && dop > .003) {
      const DS = 26, NS = 30, DX = DAYX, DY = DAYY, NX0 = DX + 4 * .6 * DS + 24, NDX = 40;
      const right = NX0 + (dayN - 1) * NDX + .3 * NS + 12;
      let g = `<rect x="${f(DX - 12)}" y="${f(DY - NS * .92)}" width="${f(right - DX + 12)}" height="${f(NS * 1.2)}" rx="4" fill="#000" opacity=".84"/>` +
        `<rect x="${f(DX - 12)}" y="${f(DY - NS * .92)}" width="${f(right - DX + 12)}" height="${f(NS * 1.2)}" rx="4" fill="none" stroke="#fff" stroke-width="1.1" opacity=".55"/>`;
      g += GF.mono(DX, DY, 'ДЕНЬ', { size: DS, anchor: 'start', opacity: .97 });
      for (let k = 0; k < dayN; k++) {
        const x = NX0 + k * NDX, a = c.days[k], fl = pulse(t, a, .06, .5);
        if (k) g += GF.mono(x - NDX / 2, DY, '·', { size: DS, anchor: 'middle', opacity: .8 });
        g += GF.zoom(GF.mono(x, DY, String(k + 1), { size: NS, anchor: 'middle', opacity: .9 + .1 * fl, glow: fl > .15 }), x, DY - 10, 1 + .7 * (1 - qq(t, a, a + .3)));
      }
      s += `<g opacity="${f(dop)}">${g}</g>`;
    }
    // «А откуда взялся сам порядок?»: a big «?» next to the comb; «порядок» — the comb flashes, ПОРЯДОК under it
    const qm = q(t, c.otk - .05, .3) * (1 - qq(t, c.rel - .05, c.rel + .4));
    if (qm > .003) {
      const z2 = 1 + .4 * (1 - qq(t, c.otk - .05, c.otk + .35)) + .15 * pulse(t, c.por11, .1, .5);
      s += `<g opacity="${f(qm)}">${GF.zoom(GF.mono(QMX, QMY, '?', { size: 96, anchor: 'middle', glow: true, opacity: .97 }), QMX, QMY - 34, z2)}</g>`;
    }
    const pl = 1 - qq(t, c.rel + .05, c.rel + .55);
    if (pl > .003) s += `<g opacity="${f(pl)}">${GF.typed(QCX, 318, 'ПОРЯДОК', t, c.por11 - .05, { size: 18, glow: true })}</g>`;
    // the timeline is drawn from the left on «религии»; «СЕЙЧАС» on «взгляд»; the future segment on «будущее» (a12)
    const rev = qq(t, c.rel - .1, c.rel + 1.3), now = qq(t, c.vzg - .1, c.vzg + .5);
    const fut = qq(t, c.bud12 - .05, c.bud12 + .4) * (1 - .65 * qq(t, c.ruk12 + .5, c.ruk12 + 1.3));
    s += tline(t, rev, now, fut);
    // the world, the fire and its labels at the start of the line
    s += world(FX, LY, q(t, c.sotv, .9) * (1 - qq(t, c.ne12, c.ne12 + .6)), t);
    if (fop > .003 && fy > -60) s += fire(fx, fy, fr, fop, t, beam, wave(t, [c.post, c.land1, c.land, c.dal]));
    const lab = 1 - .7 * qq(t, c.ne12, c.ne12 + .6);
    s += `<g opacity="${f(lab)}">` + GF.typed(LBX, LBY1, 'СОТВОРИЛ МИР', t, c.sotv, { size: 14, anchor: 'start', glow: true }) +
      GF.typed(LBX, LBY2, 'ДАЛ ЗАКОН', t, c.dal, { size: 14, anchor: 'start', glow: true }) + '</g>';
    // «будущее — в Его руках»: palms gather from the fire over the future; quieter on «дальше», gone on «не в начале»
    const hop = q(t, c.bud - .05, .3) * (1 - .45 * qq(t, c.dalshe, c.dalshe + .7)) * (1 - qq(t, c.ne12 - .1, c.ne12 + .5));
    s += hands(t, qq(t, c.bud - .05, c.ruk + .35), hop, FX, LY);
    // «не в начале, а в конце»: the old fire goes out, a light rides along the line into the end and melts into the contour
    const pu = qq(t, c.ne12 + .2, c.kon + .05), pop = q(t, c.ne12 + .1, .25) * (1 - qq(t, c.kon, c.kon + .35));
    if (pop > .003) {
      const x = lerp(FX, EX - ER + 4, pu);
      for (let k = 1; k < 10; k++) {
        const xx = lerp(FX, EX - ER + 4, clamp(pu - k * .03));
        s += `<circle cx="${f(xx)}" cy="${LY}" r="${f(5.5 - k * .45)}" fill="#fff" opacity="${f(pop * .7 * (1 - k / 10))}" filter="url(#un-soft)"/>`;
      }
      s += GF.spark(x, LY, 8, { t, op: pop });
    }
    // the contour: emerges on «конце»; the centre cell docks after «сложится», three cells from the line of the past on
    // «порядка», one more from the second person on «собирают»; two nests stay empty
    const d1 = qq(t, c.slozh, c.slozh + .7), d2 = qq(t, c.sobt, c.sobt + .7);
    const tick = k => qq(t, c.por + k * .22, c.por + .8 + k * .22);
    const cells = [q(t, c.slozh + .62, .3), ...[0, 1, 2].map(k => q(t, c.por + .72 + k * .22, .3)), q(t, c.sobt + .62, .3), 0, 0];
    s += contour(t, qq(t, c.kon - .25, c.kon + .4),
      .45 * pulse(t, c.kon, .2, .8) + .7 * pulse(t, c.slozh + .65, .15, 1) + .5 * pulse(t, c.sobt + .65, .15, 1) + .7 * pulse(t, c.vtor + .7, .15, 1),
      cells, wave(t, [c.kon, c.slozh + .65, c.sobt + .65, c.vtor + .7]), q(t, c.slozh + .5, .5));
    [[72, 0], [112, 1], [136, 2]].forEach(([x, k]) => {
      const u = tick(k);
      if (u > 0 && u < 1) s += flyCell([x, LY - 6], [EX + INNER[1 + k][0], LY + INNER[1 + k][1]], u, 6, IH * .9, 1, t, 70);
      s += `<circle cx="${x}" cy="${LY}" r="${f(3.5 + 7 * pulse(t, c.por + k * .22 - .1, .1, .4))}" fill="#fff" opacity="${f(.85 * pulse(t, c.por + k * .22 - .1, .1, .5))}" filter="url(#un-soft)"/>`;
    });
    // the people at «СЕЙЧАС»: the first one appears on «наших», raises a cell by «руках» («и в наших руках»),
    // the cell flies into the contour on «сложится»; on «мы» a second one comes with a cell, on «собираем» the first
    // raises a new cell and both walk to the contour; the second's cell docks on «собирают»
    const p1 = qq(t, c.nash - .2, c.nash + .3);
    if (p1 > .003) {
      const wt = Math.max(0, t - c.sobm), v = 7;
      const p1x = NOWX + v * wt, p2x = NOWX + 42 + v * wt, ph = wt * 5.2;
      const up1 = qq(t, c.nash, c.ruk12 + .35) * (1 - qq(t, c.slozh + .15, c.slozh + .55)) + qq(t, c.sobm - .1, c.sobm + .35);
      s += `<g opacity="${f(p1)}">${walker(p1x, LY - 1, PH, 220, 3, wt > 0 ? ph : 0, clamp(up1), t)}</g>`;
      const held1 = qq(t, c.nash + .05, c.ruk12 + .3), cy1 = lerp(LY - 70, CELLY, held1);
      s += cell(p1x, cy1, CR1, p1 * held1 * (d1 > 0 ? 0 : 1), t);
      s += flyCell([NOWX, CELLY], [EX, LY], d1, CR1, IH * .9, 1, t, 40);
      s += cell(p1x, CELLY, CR1, q(t, c.sobm - .05, .35), t);
      const p2 = qq(t, c.my - .2, c.my + .3);
      if (p2 > .003) {
        const up2 = 1 - qq(t, c.sobt + .15, c.sobt + .55);
        s += `<g opacity="${f(p2)}">${walker(p2x, LY - 1, PH, 220, 11, wt > 0 ? ph + 2.2 : 0, up2, t)}</g>`;
        s += cell(p2x, CELLY, CR1, p2 * (d2 > 0 ? 0 : 1), t);
        s += flyCell([NOWX + 42 + v * Math.max(0, c.sobt - c.sobm), CELLY], [EX + INNER[4][0], LY + INNER[4][1]], d2, CR1, IH * .9, 1, t, 34);
      }
    }
    // «религии — первый черновик этой работы»: the draft is sketched over the start from «религии», ЧЕРНОВИК lands big
    // on «черновик»; «работы» — an arrow to clean cells over the end
    s += draft(DRX, DRY, DR, qq(t, c.rel12 - .05, c.cher + .25), 1);
    if (t >= c.cher - .08) {
      const cz = 1 + .35 * (1 - qq(t, c.cher - .08, c.cher + .3)), cf = pulse(t, c.cher - .08, .08, .6);
      s += `<g opacity="${f(q(t, c.cher - .08, .18))}">` + GF.zoom(GF.mono(DRX, 40, 'ЧЕРНОВИК', { size: 18, anchor: 'middle', opacity: .9 + .1 * cf, glow: true }), DRX, 34, cz) + '</g>';
    }
    s += dashArrow(DRX + 70, CLX - 70, DRY, qq(t, c.rab - .1, c.rab + .5));
    s += clean(CLX, DRY, DR, qq(t, c.rab + .2, c.rab + 1.3), 1, t, [2, 5]);
    // «во второй части»: a light runs from «СЕЙЧАС» into the contour
    s += comet(qq(t, c.vtor - .1, c.vtor + .75), NOWX);
    // the card ЧАСТЬ 2 (story.py) comes on a quieter picture
    const dim = K.card != null ? 1 - .6 * qq(t, K.card - .5, K.card + .3) : 1;
    return dim < .999 ? `<g opacity="${f(dim)}">${s}</g>` : s;
  }

  /* ---------------- part 2: notyet → idea ---------------- */
  // «ЕСТЬ ЛИ БОГ?» / «ПОКА НЕТ.»: mono SemiBold advances .6 em — typed from a fixed left edge (centred when whole)
  const QS = 36, AS = 46, QY = 84, AY = 206, TY = 122;
  const QX = 180 - 12 * .6 * QS / 2, AX = 180 - 9 * .6 * AS / 2, NX = AX + 5 * .6 * AS;
  function part2(t, K) {
    const c = cues2(K);
    let s = '';
    s += tline(t, 1, 0, 0);
    // the line is always in motion: lights run into the contour (quieter after «религиях»)
    s += flow(t, 4, 2.6, .95 * (1 - .6 * qq(t, c.rel, c.rel + .8)));
    s += comet(qq(t, c.otv - .05, c.otv + .7), LX0 + 6);
    s += comet(qq(t, c.ideya - .05, c.ideya + .75), LX0 + 6);
    // «part 3 of 3» at the top from the first frame, as in part 2 (gf_law/hook); gone by «пока» (owner 05.11). Blind view v5:
    // at 16/12 the second line was hard to read (2/2 on the full-size first frame) — 19/14.5, both lines bright
    const badge = 1 - qq(t, c.otv - .1, c.poka);
    if (badge > .003) s += `<g opacity="${f(badge)}">` + GF.mono(180, 33, 'ЧАСТЬ 3 ИЗ 3', { size: 19, anchor: 'middle', opacity: 1 }) +
      GF.mono(180, 55, 'ЧАСТИ 1 И 2 — В ПРОФИЛЕ КАНАЛА', { size: 14.5, anchor: 'middle', opacity: .95 }) + '</g>';
    const qy = QY + 18 * badge;   // the question sits lower under the badge, rises back as it goes
    // the question is typed from the very first frame; «ПОКА» on «пока», «НЕТ.» lands big on «нет»
    const qa = 1 - qq(t, c.rel, c.rel + .6);
    if (qa > .003) {
      const fl = pulse(t, c.bog1, .1, .6), nf = pulse(t, c.net, .06, .7) + .5 * pulse(t, c.shut, .1, .6);
      s += `<g opacity="${f(qa)}">` + GF.typed(QX, qy, 'ЕСТЬ ЛИ БОГ?', t, -1, { size: QS, cps: 22, anchor: 'start', op: .92 + .08 * fl, glow: true });
      if (t >= c.poka - .02) {
        const zp = 1 + .25 * (1 - qq(t, c.poka - .02, c.poka + .25));
        s += GF.zoom(GF.typed(AX, AY, 'ПОКА', t, c.poka - .02, { size: AS, cps: 22, anchor: 'start', glow: true }), AX + 2 * .6 * AS, AY - AS * .35, zp);
      }
      // «это не шутка»: «ПОКА» is underlined
      const ul = qq(t, c.shut - .05, c.shut + .4);
      if (ul > .003) s += `<line x1="${f(AX)}" y1="${AY + 12}" x2="${f(AX + 4 * .6 * AS * ul)}" y2="${AY + 12}" stroke="#fff" stroke-width="7" opacity=".3" filter="url(#un-soft)"/>` +
        `<line x1="${f(AX)}" y1="${AY + 12}" x2="${f(AX + 4 * .6 * AS * ul)}" y2="${AY + 12}" stroke="#fff" stroke-width="3" opacity=".95" stroke-linecap="round"/>`;
      if (t >= c.net - .02) {
        const zn = 1 + .3 * (1 - qq(t, c.net - .02, c.net + .3));
        s += GF.zoom(GF.mono(NX, AY, 'НЕТ.', { size: AS, anchor: 'start', opacity: .97, glow: true }) +
          (nf > .003 ? `<g opacity="${f(.6 * clamp(nf))}">${GF.mono(NX, AY, 'НЕТ.', { size: AS, anchor: 'start', glow: true })}</g>` : ''),
          NX + 2 * .6 * AS, AY - AS * .35, zn);
      }
      s += '</g>';
    }
    s += GF.thinker('РЭЙ КУРЦВЕЙЛ · «TRANSCENDENT MAN» · 2009', t, c.rey - .2, c.rel + .4, { y: TY, size: 12 });
    // religions: the fire falls from above into the start on «бог», lands on «начале»; the world; quieter on «идее»
    const ig = q(t, c.bog - .2, .4) * (1 - .45 * qq(t, c.idee, c.idee + .6));
    if (ig > .003) {
      const g = qq(t, c.bog - .1, c.land), fy = lerp(-30, LY, g);
      const beam = q(t, c.bog - .2, .3) * (1 - qq(t, c.land - .1, c.land + .7));
      s += world(FX, LY, q(t, c.sotv, .9) * (1 - .5 * qq(t, c.idee, c.idee + .6)), t);
      s += fire(FX, fy, lerp(8, FR, g), ig, t, beam, qq(t, c.land, c.land + 1.1));
    }
    const lab = 1 - .6 * qq(t, c.idee, c.idee + .6);
    s += `<g opacity="${f(lab)}">${GF.typed(LBX, LBY1, 'СОТВОРИЛ МИР', t, c.sotv, { size: 14, anchor: 'start', glow: true })}</g>`;
    // «будущее — в Его руках»: the same palms as in part 1, gone on «идее»
    s += hands(t, qq(t, c.bud - .05, c.ruk + .1), q(t, c.bud - .05, .3) * (1 - qq(t, c.idee + .05, c.idee + .55)), FX, LY);
    // three people bring cells to the contour and put them in: the front one on «собирают», the middle one on «Его»,
    // the last one on «люди»
    const people = qq(t, c.sob - .45, c.sob);
    const X0 = [146, 188, 230], SEED = [7, 13, 19], SLOT = [5, 4, 0];
    const T = [Math.max(c.lyud + .1, c.ego + .3), Math.max(c.ego, c.sob + .35), c.sob + .1];   // when each lets the cell go
    const walkX = (k, tt) => { const wt = Math.max(0, tt - (c.sob - .45)); return X0[k] + 16 * clamp(wt / 1.2) + 4 * Math.max(0, wt - 1.2); };
    const docked = [0, 0, 0];
    if (people > .003) {
      for (let k = 0; k < 3; k++) {
        const x = walkX(k, t), wt = Math.max(0, t - (c.sob - .45)), ph = wt * 5.6 + k * 1.7;
        const d = qq(t, T[k], T[k] + .6);
        docked[k] = q(t, T[k] + .52, .25);
        const upk = 1 - qq(t, T[k] + .25, T[k] + .7);
        s += `<g opacity="${f(people)}">${walker(x, LY - 1, PH, 210, SEED[k], ph, upk, t)}</g>`;
        s += cell(x, CELLY, CR1, people * (d > 0 ? 0 : 1), t);
        s += flyCell([walkX(k, T[k]), CELLY], [EX + INNER[SLOT[k]][0], LY + INNER[SLOT[k]][1]], d, CR1, IH * .9, 1, t, 30);
      }
    }
    // the contour at the end: there from the start and always breathing; «бог», «нет» — a wave; «конце» — brighter with
    // empty nests; each docked cell — a flash and a wave
    const cells = [docked[2], 0, 0, 0, docked[1], docked[0], 0];
    const bright = .2 + .14 * (.5 + .5 * Math.sin(t * 3.1)) + .12 * pulse(t, c.bog1, .1, .7) + .55 * pulse(t, c.net, .1, .9) +
      .4 * pulse(t, c.shut, .1, .7) + .5 * q(t, c.kon, .6) + .35 * (pulse(t, T[2] + .55, .1, .8) + pulse(t, T[1] + .55, .1, .8) + pulse(t, T[0] + .55, .1, .8));
    s += contour(t, 1, bright, cells, wave(t, [c.bog1, c.net, c.ideya + .6, c.kon, T[2] + .55, T[1] + .55, T[0] + .55]),
      Math.max(.5 * q(t, c.ideya + .55, .4), q(t, c.kon, .5)), .07);
    return s;
  }

  const P2MODES = new Set(['notyet', 'idea']);
  const isP1 = (K, mode) => K.a10 != null || K.a11 != null || K.a12 != null ? true :
    K.b01 != null || K.b02 != null ? false : !P2MODES.has(mode);

  SCENES.gf_line = GF.scene('gf_line', (t, K, mode, p) => isP1(K || {}, mode) ? part1(t, K || {}) : part2(t, K || {}));
})();
