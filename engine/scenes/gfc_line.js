/* gfc_line — «Бог ещё не создан», альтернативная версия «Цветная инфографика» v2 (eps/god_future_color_p1): шов части 1 с
 * gfc_law, линия времени. Перевод принятой чёрно-белой gf_line.js (источник содержания: те же события на тех же словах,
 * те же позы на швах; раскадровка — eps/god_future/source/storyboard.md, строки a10–a12 и b01–b02; K.a10 — часть a09 от
 * «Но», её даёт storybase) в дизайн v2 по образцу eps/god_future/qa/style_flatcolor.jpg; словарь — gfc_00_lib.js (GFC v2).
 * В ролике сейчас идёт только режим daily (a09 от «Но», текст v21, кадр 69,17–75,78); past/flip (a11/a12) и часть 2
 * (notyet/idea) перенесены из прежней gfc_line как есть (вид v1): в текущих роликах они не наступают — part2-ветка gf_line
 * в новой части 3 не используется, а в части 1 за a10 идёт c10 (gfc_law), фраз a11/a12 нет.
 *
 * Чем вид отличается от gf_line (v2, владелец о прошлой цветной: «графика всё же не как на предложенной картинке, цветов
 * мало»): фон GFC (градиент, звёзды); вверху крупный заголовок GFC.headline с мыслью фразы (Montserrat 800 капсом, главное
 * слово золотом); соты — цветные плитки (бирюза → небо → фиалка → коралл → золото), в них кремовые фигурки, как в конце
 * gfc_crowd/order; хаос — цветные точки; огонь порядка — золотое солнце GFC.spark с лучами; нити от огня — градиентные
 * (золото → цвет плитки) с бегущими искрами; под сценой фиолетовые холмы GFC.ground (есть земля — на ней стоит тело);
 * тело — фиалковое с золотыми сотами в груди (как gfc_body); счётчик дней — цветные значки GFC.node с цифрами (бирюза,
 * небо, розовый, зелёный) под вторым заголовком, а не моно-надпись ДЕНЬ 1·2·3·4 внизу; «честным» — над сотами всплывают
 * значки честных поступков (сердце, весы, плюс, звезда; без коралла — тёмный коралл читается красным). Красного нет.
 * Раскладка daily — под заголовок: заголовок y≈36..101, огонь (210,114, r 10), соты ×1,06 (центр 210,238, y≈140..336,
 * x≈94..326 — на всю ширину вместе с телом), тело — слева (x 48, рост 160, ноги на холмах y 300).
 *
 *  daily (a10 = a09 от «Но»; v21: «Но, как в теле, этот порядок не собрать навсегда: мы собираем его каждый день — каждым
 *               честным поступком.»)
 *               вход — наплыв 0,5 с из gfc_crowd/order (его делает GFC.scene): соты 6×6 с фигурками ×1 (центр 180,240,
 *               r 19,5), огонь (180,88, r 8), нити от огня к верхнему ряду;
 *               «Но» — огонь уходит под место заголовка (210,114), соты вырастают на всю ширину (×1,06, центр 210,238),
 *               проявляются холмы; нити становятся градиентными, по ним бегут искры; +0,6 с — заголовок
 *               «ПОРЯДОК / НЕ НАВСЕГДА» (до «мы»);
 *               «теле» — слева проявляется крупное фиалковое тело с золотыми сотами в груди;
 *               «порядок» — по сотам от центра бежит золотая волна;
 *               «не» (не собрать) — краевые плитки гаснут, фигурки и рёбра разлетаются цветными точками и дрожат, края тела
 *               осыпаются, к «навсегда» — сильнее;
 *               «мы» — заголовок в одну строку «КАЖДЫЙ ДЕНЬ ЗАНОВО» (до «поступком»);
 *               «собираем» — края собираются, под заголовком цветной значок «1» (счётчик дней); «каждый» — «2», «день» —
 *               «3», «каждым» — «4» (каждый значок выскакивает с отскоком и вспышкой): каждый день половина краевых сот
 *               осыпается и собирается обратно;
 *               «честным» — в каждой соте по очереди тёплая вспышка, над девятью сотами всплывают и гаснут цветные значки
 *               поступков (сердце, весы, плюс, звезда);
 *               «поступком» — золотая волна от центра, огонь вспыхивает с кольцом, заголовок, тело, счётчик и холмы гаснут,
 *               соты и огонь возвращаются в позу gfc_crowd/order: соты 6×6 ×1 (центр 180,240), огонь (180,88, r 8), тонкие
 *               тёплые нити к верхнему ряду. Эта поза — шов с gfc_law/voltaire (c10, вход наплывом).
 *  past (a11), flip (a12), notyet (b01), idea (b02) — как в шапке gf_line.js (перенос прежней цветной версии, вид v1).
 * Слова-основы GFC.w — те же, что у gf_line (сверены с eps/god_future_color_p1/build/cues.json, текст v21, 06.11): a10 —
 *   теле, порядок, не, навсегда, мы, собираем, каждый, день, каждым, честн, поступк (нет слова — события нет, кроме
 *   «теле», «не», «навсегда», «собираем», «каждый», «день» — у них доля фразы, как в gf_line); a11 — откуда, взялся,
 *   порядок, религии, дан, бог, начале, сотворил, дал, будущее, руках; a12 — дальше, взгляд, будущее, наших, руках,
 *   не (2-е), конце, сложится, порядка, мы, собираем, религии, черновик, работы, собирают, второй; b01 — бог, рэй, ответил,
 *   пока, нет; b02 — шутка, идея, религиях, бог, начале, сотворил, будущее, руках, идее, конце, собирают, его (2-е), люди.
 * Одна непрерывная линия времени на часть: картинка зависит только от t и K, p.mode — лишь имя кадра. Часть — по K.
 * Параметры p: s, mode, K (cues.json части), prev/prev_mode (наплыв — GFC.scene). Камера движка нейтральна.
 * Важное — в y=20..345 (низ кадра — под субтитры), подписи — не выше базовой линии y 46 (верх закрывает интерфейс Reels):
 * заголовок — базовая линия 52. Свои id в SVG: gfcl-rev (прорисовка линии), gfcl-fut (отрезок будущего), gfcl-th0..5
 * (градиенты нитей). Экспорта для соседей нет.
 * Проверка (станция tesla): ANIM_TEMPLATE=$HOME/Projects/anim-template-god python3 <serial-studio>/tools/remote_anim.py
 *   god_future_color_p1 -- render.py --story eps/god_future_color_p1/build/story.json --at 69.4,71.4,… --sheet
 *   eps/god_future_color_p1/qa/gfc_line_<метка>.jpg
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  // line geometry: the same as gf_line (the seam); the whole composition spans x 24..336, y 27..340
  const LY = 280, LX0 = 24, LX1 = 336, FX = 40, FR = 12, EX = 296, ER = 30, NOWX = 158;
  const FUTX = EX - ER;                              // БУДУЩЕЕ ends before the contour
  const LAB = 11.5, LABY = LY + 26, NOWLX = NOWX - 6; // ПРОШЛОЕ · СЕЙЧАС · БУДУЩЕЕ (13,2 in the safe zone)
  const LBX = 22, LBY1 = 222, LBY2 = 244, LBS = 11.5; // СОТВОРИЛ МИР · ДАЛ ЗАКОН (above the fire, left of «СЕЙЧАС»)
  const PH = 100, GY = LY - 2.2, P1X = NOWX + 6, P2X = 44;   // people on the line stand on the bar; the second is 44 right
  const CELLY = LY - 118, CRAD = 13;                 // a cell held over the head (arms up)
  // draft over the start, clean cells over the end (a12)
  const DRX = 84, DRY = 92, DR = 21, CLX = 272;
  // a10 comb (as gfc_crowd/order ends: the comb, the fire of order above it)
  const CX = 180, CY = 240, CR = 19.5, COLS = 6, ROWS = 6, SX0 = 180, SY0 = 88, SR0 = 8;
  // daily (v2): the comb grows to the whole width under the headline, the fire above it (between the headline and the comb)
  const DZ = 1.06, DCX = 210, DCY = 238, DFX = 210, DFY = 114, DFR = 10;
  const QZ = 1, QCX = 150, QCY = 192, QMX = 300, QMY = 230;   // a11: the comb next to a big «?»
  const RZ = .62, RCX = 180, RCY = 178, RFY = 104;              // a11 «религии … дан свыше»: the fire lands above the comb
  const DAYC = 210, DAYY = 84, DNR = 15, DNS = 40;              // the day counter under the 2nd headline: centre, y, node r, step
  const HL = { y: 52, size: 22, big: 1.45 };                    // the 1st headline: first baseline 52 (not above 46), bottom ≈ 94
  const HL2 = { y: 58, size: 22, big: 1.45, maxW: 326 };        // the 2nd: one line (shrinks to 326), the day nodes under it
  const FFM = 'GFCMont, Mont, sans-serif';
  const HILLY = 300;                                            // the horizon of the hills (the body stands on it)
  const HCX = 250, HCY = 236, HS = 1.9;                         // the palms over the future part of the line
  // draft phrase bounds only for scene_test without K (real proportions of the voice of 05.11)
  const DEF = { a10: [0, 5.28], a11: [5.28, 14.14], a12: [14.69, 28.4], b01: [0.05, 4.06], b02: [4.46, 15.4] };

  const H = n => GFC.hash(n);
  const { q, qq, lerp, clamp, INK, SUN, ACC } = GFC;
  const PAST = '#7ff0de', CORAL = '#ff8a6b', WARM = '#ffe6a8', PENCIL = '#cbc4f2';
  const TEAL = '#2fc9b6', SKY = '#4f9bf2', VIO = '#a66ef0', PINK = '#f0708a', GOLD = '#ffb547', MINT = '#63e6d2';
  // the cells of the contour: centre (the first person's), three from the line of the past, the second person's, two empty
  const INCOL = [TEAL, SKY, PINK, GOLD, VIO, SKY, PINK];
  const CLCOL = [TEAL, SKY, VIO, PINK, GOLD, MINT];
  const HCOL = ['#fff3dc', '#ffe27a', '#ffd08a', '#ffb98f'];   // warm dots of the palms

  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GFC.bare(stem);
    return ws.filter(w => GFC.bare(w.w).startsWith(s)).length > n;
  };
  // word start through GFC.w; without the word — a share of the phrase
  const W = (K, id, stem, share, n = 0) => {
    if (hasW(K, id, stem, n)) return GFC.w(K, id, stem, n);
    const [a, b] = span(K, id);
    return a + share * (b - a);
  };
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  // a wave: the latest of the starts (0..1, 1 = gone)
  const wave = (t, starts) => { let v = 0; for (const a of starts) if (t >= a) v = qq(t, a, a + 1.1); return v; };

  function cues1(K) {
    const c = {};
    // текст v21 (как gf_line): за a10 в части 1 идёт c10 (gfc_law), фраз a11/a12 нет — их события уходят за конец ролика
    // (не наступают), а не на черновые доли DEF (иначе в daily сразу видна поза конца flip)
    const solo = K.a10 != null && K.a11 == null && K.a12 == null;
    const sp = id => solo && id !== 'a10' ? [1e6, 1e6 + 3] : span(K, id);
    const W = (K2, id, stem, share, n = 0) => {
      if (hasW(K2, id, stem, n)) return GFC.w(K2, id, stem, n);
      const [a, b] = sp(id);
      return a + share * (b - a);
    };
    const W10 = stem => hasW(K, 'a10', stem, 0) ? GFC.w(K, 'a10', stem) : 1e6;   // v21-слова a10: нет слова — нет события
    [c.s10, c.e10] = sp('a10'); [c.s11, c.e11] = sp('a11'); [c.s12, c.e12] = sp('a12');
    c.tele = W(K, 'a10', 'теле', .18); c.ne10 = W(K, 'a10', 'не', .37); c.nav = W(K, 'a10', 'навсегда', .53);
    c.sob = W(K, 'a10', 'собираем', .71); c.kazh = W(K, 'a10', 'каждый', .83); c.den = W(K, 'a10', 'день', .9);
    c.otk = W(K, 'a11', 'откуда', .02); c.vzl = W(K, 'a11', 'взялся', .06);
    c.rel = W(K, 'a11', 'религии', .13);
    // v15 «А откуда взялся сам порядок?»; the v14 voice has no «порядок» — just after «взялся», before «религии»
    c.por11 = hasW(K, 'a11', 'порядок', 0) ? GFC.w(K, 'a11', 'порядок') : Math.min(c.vzl + .4, c.rel - .2);
    c.dan = W(K, 'a11', 'дан', .29); c.nach = W(K, 'a11', 'начале', .48); c.sotv = W(K, 'a11', 'сотворил', .59);
    c.dal = W(K, 'a11', 'дал', .7); c.bud = W(K, 'a11', 'будущее', .82); c.ruk = W(K, 'a11', 'руках', .93);
    c.dalshe = W(K, 'a12', 'дальше', 0); c.vzg = W(K, 'a12', 'взгляд', .07); c.bud12 = W(K, 'a12', 'будущее', .21);
    c.nash = W(K, 'a12', 'наших', .28); c.ruk12 = W(K, 'a12', 'руках', .3); c.ne12 = W(K, 'a12', 'не', .38, 1);
    c.kon = W(K, 'a12', 'конце', .46); c.slozh = W(K, 'a12', 'сложится', .53); c.por = W(K, 'a12', 'порядка', .57);
    c.my = W(K, 'a12', 'мы', .61); c.sobm = W(K, 'a12', 'собираем', .62); c.rel12 = W(K, 'a12', 'религии', .7);
    c.cher = W(K, 'a12', 'черновик', .77); c.rab = W(K, 'a12', 'работы', .81); c.sobt = W(K, 'a12', 'собирают', .89);
    c.vtor = W(K, 'a12', 'второй', .94);
    if (c.kon < c.ne12 + .8) c.kon = c.ne12 + .8;
    // v21: «этот порядок» — волна; «мы» — второй заголовок; «каждым» — день 4; «честным» — тёплые вспышки в сотах;
    // «поступком» — назад в позу шва
    c.por10 = W10('порядок'); c.my10 = W10('мы'); c.kazh2 = W10('каждым'); c.chest = W10('честн'); c.post = W10('поступк');
    if (c.my10 > 1e5) c.my10 = c.sob - .3;
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
  const DEFS = `<defs><linearGradient id="gfcl-fut" gradientUnits="userSpaceOnUse" x1="${NOWX}" y1="0" x2="${LX1}" y2="0">` +
    `<stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="${SUN}"/></linearGradient></defs>`;
  const hexPath = (cx, cy, r) => 'M' + [0, 1, 2, 3, 4, 5].map(j => { const a = Math.PI / 3 * j - Math.PI / 2; return `${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`; }).join(' L') + ' Z';
  // the timeline (colour bar as GFC.line), revealed from the left: bar, arrow, ticks; now — the «СЕЙЧАС» mark;
  // fut — the segment from «СЕЙЧАС» to the end lights up («будущее — и в наших руках»); the labels — tlabels (over the fire)
  function tline(t, rev, now, fut) {
    if (rev <= .003) return '';
    const hl = 13, bw = LX1 - LX0 - hl + 3;
    let s = `<rect x="${LX0 - 1}" y="${f(LY + 1.4)}" width="${bw}" height="5.6" rx="2.8" fill="${INK}" opacity=".45"/>` +
      `<rect x="${LX0 - 1}" y="${f(LY - 2.8)}" width="${bw}" height="5.6" rx="2.8" fill="url(#gfc-time)"/>` +
      `<path d="M${LX1} ${LY} L${LX1 - hl} ${LY - 7.5} L${LX1 - hl} ${LY + 7.5} Z" fill="${CORAL}" stroke="${CORAL}" stroke-width="1.8" stroke-linejoin="round"/>`;
    for (let i = 0; i <= 12; i++) {
      const x = lerp(LX0 + 6, LX1 - 20, i / 12);
      s += `<line x1="${f(x)}" x2="${f(x)}" y1="${LY + 5}" y2="${LY + (i % 6 ? 9 : 12)}" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>`;
    }
    if (fut > .003) {
      const fw = LX1 - hl - NOWX;
      s += `<g opacity="${f(fut)}"><rect x="${NOWX}" y="${LY - 8}" width="${fw}" height="16" rx="8" fill="${SUN}" opacity=".55" filter="url(#gfc-blur)"/>` +
        `<rect x="${NOWX}" y="${f(LY - 3.4)}" width="${fw}" height="6.8" rx="3.4" fill="url(#gfcl-fut)"/></g>`;
    }
    if (now > .003) {
      s += `<g opacity="${f(now)}"><line x1="${NOWX}" x2="${NOWX}" y1="${f(LY - 16 * now)}" y2="${f(LY + 16 * now)}" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".95"/>` +
        `<circle cx="${NOWX}" cy="${LY}" r="4.6" fill="#fff"/><circle cx="${NOWX}" cy="${LY}" r="2" fill="${INK}"/></g>`;
    }
    // a light of time flowing along the line
    const u = ((t / 3.8) % 1 + 1) % 1, x = lerp(LX0 + 10, LX1 - 16, u), k = Math.sin(Math.PI * u);
    s += `<circle cx="${f(x)}" cy="${LY}" r="5" fill="#fff" opacity="${f(.5 * k)}" filter="url(#gfc-soft)"/><circle cx="${f(x)}" cy="${LY}" r="2" fill="#fff" opacity="${f(.85 * k)}"/>`;
    if (rev >= .999) return s;
    const w = lerp(LX0 - 18, 352, rev);
    return `<defs><clipPath id="gfcl-rev"><rect x="-10" y="0" width="${f(w + 10)}" height="640"/></clipPath></defs>` +
      `<g clip-path="url(#gfcl-rev)">${s}</g><circle cx="${f(Math.min(w, LX1))}" cy="${LY}" r="6" fill="#fff" opacity="${f(.55 * (1 - rev))}" filter="url(#gfc-soft)"/>` +
      `<circle cx="${f(Math.min(w, LX1))}" cy="${LY}" r="3" fill="#fff" opacity="${f(.95 * (1 - rev))}"/>`;
  }
  // ПРОШЛОЕ appears as the bar reaches it, БУДУЩЕЕ — near the end of the reveal; СЕЙЧАС — with the mark
  function tlabels(rev, now) {
    if (rev <= .003) return '';
    let s = GFC.mono(LX0, LABY, 'ПРОШЛОЕ', { size: LAB, ls: .03, color: PAST, opacity: .98 * qq(rev, .08, .25) }) +
      GFC.mono(FUTX, LABY, 'БУДУЩЕЕ', { size: LAB, ls: .03, anchor: 'end', color: ACC, opacity: .98 * qq(rev, .6, .8) });
    if (now > .003) s += GFC.mono(NOWLX, LABY, 'СЕЙЧАС', { size: LAB, ls: .03, anchor: 'middle', opacity: .98 * now });
    return s;
  }
  // lights running along the line from the past into the contour (part 2: the line is always in motion)
  function flow(t, n, period, op) {
    if (op <= .003) return '';
    let s = '';
    for (let k = 0; k < n; k++) {
      const u = (((t / period) + k / n) % 1 + 1) % 1, a = op * Math.sin(Math.PI * u);
      for (let j = 0; j < 4; j++) {
        const x = lerp(LX0 + 8, EX - ER - 2, clamp(u - j * .02));
        s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4.2 - j * .6)}" fill="${j ? SUN : '#fffbe8'}" opacity="${f(a * (1 - j / 4))}"/>`;
      }
    }
    return `<g filter="url(#gfc-soft)">${s}</g>${s}`;
  }
  // a comet running along the line from x0 into the contour (u 0..1)
  function comet(u, x0) {
    if (u <= 0 || u >= 1) return '';
    let s = '';
    for (let k = 0; k < 9; k++) {
      const x = lerp(x0, EX - ER, clamp(u - k * .025));
      s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4.6 - k * .38)}" fill="${k ? SUN : '#fffbe8'}" opacity="${f((1 - k / 9) * .95 * Math.sin(Math.PI * u))}"/>`;
    }
    return `<g filter="url(#gfc-soft)">${s}</g>${s}`;
  }
  // the empty dashed contour of the fire; bright 0..1; cells — presence of the 7 inner cells (centre first);
  // slots — faint dashed empty nests for the cells; ring — wave 0..1; breath — how much it breathes
  const IR = 17.2, IH = 9.4, IT = 8.6;
  const INNER = [[0, 0], ...[0, 1, 2, 3, 4, 5].map(k => [IR * Math.cos(Math.PI / 3 * k), IR * Math.sin(Math.PI / 3 * k)])];
  function contour(t, op, bright, cells, ring, slots = 0, cols = INCOL, breath = .04) {
    if (op <= .003) return '';
    const br = 1 + breath * Math.sin(t * 2.3), r = ER * br, dash = 'stroke-dasharray="6 5"';
    let s = `<circle cx="${EX}" cy="${LY}" r="${f(r * 2.5)}" fill="url(#gfc-halo)" opacity="${f(.16 + .45 * bright)}"/>` +
      `<circle cx="${EX}" cy="${LY}" r="${f(r - 1)}" fill="${INK}" opacity=".9"/>`;
    s += `<circle cx="${EX}" cy="${LY}" r="${f(r)}" fill="none" stroke="${SUN}" stroke-width="4.4" ${dash} ` +
      `stroke-dashoffset="${f(-t * 4)}" opacity="${f(.25 + .4 * bright)}" filter="url(#gfc-soft)"/>`;
    s += `<circle cx="${EX}" cy="${LY}" r="${f(r)}" fill="none" stroke="${WARM}" stroke-width="2.2" stroke-linecap="round" ${dash} ` +
      `stroke-dashoffset="${f(-t * 4)}" opacity="${f(.8 + .2 * bright)}"/>`;
    INNER.forEach(([dx, dy], k) => {
      const l = (cells || [])[k] || 0;
      if (slots > .003 && l < .98) {
        s += `<path d="${hexPath(EX + dx, LY + dy, IH * .95)}" fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="2 2.2" opacity="${f(.55 * slots * (1 - l))}"/>`;
      }
      if (l <= .003) return;
      s += GFC.hex(EX + dx, LY + dy, IT * (.7 + .3 * l), { op: .5 * l, w: 3.4, color: cols[k % cols.length], glow: true }) +
        GFC.hex(EX + dx, LY + dy, IT * (.7 + .3 * l), { op: l, w: .8, color: 'rgba(255,255,255,.6)', fill: cols[k % cols.length] });
    });
    if (ring > .003 && ring < 1) s += `<circle cx="${EX}" cy="${LY}" r="${f(ER + 46 * ring)}" fill="none" stroke="${SUN}" stroke-width="1.8" opacity="${f(.85 * (1 - ring))}"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a glowing colour cell carried by a person
  function cell(x, y, r, op, t, col) {
    if (op <= .003) return '';
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 2.5)}" fill="url(#gfc-halo)" opacity="${f(.75 + .08 * Math.sin(t * 3))}"/>` +
      GFC.hex(x, y, r * 1.05, { op: .55, w: 3.4, color: col, glow: true }) +
      GFC.hex(x, y, r, { op: 1, w: 1, color: 'rgba(255,255,255,.75)', fill: col, shadow: .6 }) + '</g>';
  }
  // a cell flying from a to b along a raised arc (u 0..1), shrinking from r0 to r1
  function flyCell(a, b, u, r0, r1, op, t, lift, col) {
    if (u <= 0 || op <= .003) return '';
    const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(Math.PI * u) * lift;
    return cell(x, y, lerp(r0, r1, u), op * (1 - qq(u, .92, 1)), t, col);
  }
  // a flat person walking on the line: ph — step phase (from the walk start), walk 0..1, up 0..1 — arms raised
  const walker = (cx, h, color, seed, ph, walk, up, t, op = 1) =>
    GFC.person(cx, GY, h, { color, t, walk, speed: 0, phase: ph, up, dir: 1, seed, opacity: op, shadow: .5 });
  // the world: a flat ring of colour dots around the fire
  function world(x, y, k, t) {
    if (k <= .003) return '';
    const P = [];
    for (let i = 0; i < 90; i++) {
      const th = H(i + 71) * PI2 + t * (.35 + .25 * H(i + 9)), rr = (21 + 35 * H(i + 33)) * (.35 + .65 * k);
      P.push([x + rr * Math.cos(th), y + rr * .3 * Math.sin(th)]);
    }
    return GFC.dots(P, { r: 1.7, op: .95 * k, t, glow: .6, seed: 3 });
  }
  // the fire of order: GFC.spark + a warm beam from above while it falls (beam 0..1) and a wave when it lands (ring 0..1)
  function fire(x, y, r, op, t, beam, ring) {
    let s = '';
    if (beam > .003) {
      s += `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="${SUN}" stroke-width="9" stroke-linecap="round" opacity="${f(.3 * beam)}" filter="url(#gfc-soft)"/>` +
        `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#fff6d8" stroke-width="1.9" stroke-linecap="round" opacity="${f(.85 * beam)}"/>`;
      for (let k = 1; k < 8; k++) s += `<circle cx="${f(x)}" cy="${f(y - k * 8)}" r="${f(3.8 - k * .4)}" fill="${SUN}" opacity="${f(.65 * beam * (1 - k / 8))}"/>`;
    }
    s += GFC.spark(x, y, r, { t, op });
    if (ring > .003 && ring < 1) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 50 * ring)}" fill="none" stroke="${SUN}" stroke-width="1.8" opacity="${f(.85 * (1 - ring) * op)}"/>`;
    return s;
  }
  // «будущее — в Его руках»: two cupped palms of warm dots (palms up, little fingers together, thumbs outside) over the
  // future part of the line; they gather from dots that fly out of the fire (form 0..1), light shines in the palms
  const HANDS = (() => {
    const L = [];
    for (let i = 0; i < 52; i++) { const r = Math.sqrt(H(900 + i * 1.3)), th = H(1300 + i * 2.1) * PI2; L.push([12 * r * Math.cos(th), 12.5 * r * Math.sin(th)]); }
    for (let i = 0; i < 26; i++) { const th = i / 26 * PI2; L.push([12 * Math.cos(th), 12.5 * Math.sin(th)]); }
    // fingers, inner (little) → outer (index): base x, length; together, tips bent a little towards the other hand
    [[-7.4, 13], [-2.4, 17.5], [2.6, 19], [7.6, 16.5]].forEach(([x0, len], j) => {
      const n = Math.round(len * 1.25);
      for (let i = 0; i < n; i++) { const u = (i + .5) / n, w = (H(1700 + j * 37 + i) - .5) * 4.6; L.push([x0 + w - 5 * u * u, -10.5 - len * u * (1 - .12 * u * u)]); }
    });
    // the thumb: outer side, up and a little out
    for (let i = 0; i < 15; i++) { const u = (i + .5) / 15, w = (H(2100 + i) - .5) * 4.4, a = .55; L.push([10.5 + Math.sin(a) * 14 * u + w * Math.cos(a), 2 - Math.cos(a) * 14 * u + w * Math.sin(a)]); }
    const th = .3, co = Math.cos(th), si = Math.sin(th), pv = [-9.5, 9.5], piv = [pv[0] * co - pv[1] * si, pv[0] * si + pv[1] * co];
    const R = [];
    for (const side of [1, -1]) {
      for (const [x, y] of L) R.push([HCX + side * (x * co - y * si - piv[0] + 1) * HS, HCY + (x * si + y * co - piv[1]) * HS]);
      // the wrist: straight down from the heel of the palm
      for (let i = 0; i < 20; i++) R.push([HCX + side * (4 + 14 * H(2300 + i)) * HS, HCY + (2 + 15 * H(2400 + i)) * HS]);
    }
    return R;
  })();
  const HSRC = HANDS.map((p, i) => [(H(i * 7 + 3) - .5) * 18, (H(i * 11 + 5) - .5) * 14 - 6]);
  function hands(t, form, op, sx, sy) {
    if (op <= .003 || form <= .003) return '';
    const P = GFC.morph(HSRC.map(p => [sx + p[0], sy + p[1]]), HANDS, form, t, { spread: .45, amp: 1.5, bend: 50, seed: 7 });
    const lit = qq(form, .7, 1);
    let s = '';
    if (lit > .003) {
      s += `<circle cx="${HCX}" cy="${HCY - 36}" r="66" fill="url(#gfc-halo)" opacity="${f(lit * (.9 + .1 * Math.sin(t * 1.7)))}"/>` +
        `<circle cx="${HCX}" cy="${HCY - 30}" r="15" fill="#fff3c4" opacity="${f(.45 * lit)}" filter="url(#gfc-blur)"/>` +
        `<rect x="${HCX - 60}" y="${LY - 7}" width="${LX1 - 8 - HCX + 60}" height="14" rx="7" fill="${SUN}" opacity="${f(.45 * lit)}" filter="url(#gfc-blur)"/>`;
    }
    s += GFC.dots(GFC.jitter(P, t, .3, 9), { r: 1.85, op: .98, t, glow: .7, color: HCOL, seed: 4 });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // pencil draft of cells: lavender wobbly double strokes with bulging edges and overshooting ends, uneven sizes and tilt,
  // drawn progressively (prog 0..1 over all cells)
  function draft(cx, cy, r, prog, op) {
    if (op <= .003 || prog <= .003) return '';
    const C = GFC.lattice(cx, cy, r, 3, 2), sc = r / 14;
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
        s += `<path d="${d}" pathLength="1" stroke-dasharray="${f(p)} 1" fill="none" stroke="${PENCIL}" stroke-width="${pass ? 1.2 : 1.8}" ` +
          `opacity="${pass ? .6 : .95}" stroke-linecap="round"/>`;
      }
    });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // clean cells: regular colour tiles, one by one (prog 0..1); the cells in empty stay dashed nests (the work is not finished)
  function clean(cx, cy, r, prog, op, t, empty) {
    if (op <= .003 || prog <= .003) return '';
    const C = GFC.lattice(cx, cy, r, 3, 2);
    let s = '';
    C.forEach((c, i) => {
      const p = clamp(prog * C.length - i);
      if (p <= 0) return;
      if (empty.includes(i)) {
        s += `<path d="${hexPath(c[0], c[1], r * .9)}" fill="none" stroke="#fff" stroke-width="1.3" stroke-dasharray="3 3" opacity="${f(.6 * p)}"/>`;
        return;
      }
      const br = .9 + .08 * Math.sin(t * 1.8 + i), rr = r * .88 * (.7 + .3 * p);
      s += GFC.hex(c[0], c[1], rr, { op: br * p, w: 1, color: 'rgba(255,255,255,.55)', fill: CLCOL[i], shadow: .55 });
    });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a dashed arrow from the draft to the clean cells (prog 0..1)
  function dashArrow(x0, x1, y, prog) {
    if (prog <= .003) return '';
    const x = lerp(x0, x1, prog);
    return `<g stroke="#fff" fill="none" stroke-linecap="round" opacity=".9"><line x1="${x0}" y1="${y}" x2="${f(x)}" y2="${y}" stroke-width="1.9" stroke-dasharray="5 4"/>` +
      (prog > .85 ? `<path d="M${f(x - 9)} ${y - 6} L${f(x)} ${y} L${f(x - 9)} ${y + 6}" stroke-width="2" stroke-linejoin="round" opacity="${f(qq(prog, .85, 1))}"/>` : '') + '</g>';
  }
  // the a10 comb: edge tiles crumble into chaos (colour points fly far apart and tremble) and are built again
  const LAT = GFC.lattice(CX, CY, CR, COLS, ROWS);
  const SXC = Math.max(1, (COLS - .5) * Math.sqrt(3) * CR / 2), SYC = Math.max(1, (ROWS - 1) * .75 * CR + CR);
  const TCOL = LAT.map(c => GFC.ramp(.5 + .36 * (c[0] - CX) / SXC + .22 * (c[1] - CY) / SYC));   // = GFC.comb default
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
  // «честным»: the start of the deed of cell i and its flash 0..1 (as gf_line)
  const deedT = (c, i) => c.chest + H(i * 3 + 7) * .55;
  const deed = (t, c, i) => pulse(t, deedT(c, i), .1, .65);
  // the cells whose deed rises as an icon node above them: cell, icon
  // colours: pink, teal, sky, green, violet — no coral (the dark coral reads as red; red is only for danger)
  const DEEDS = [[1, 'heart', 'pink'], [4, 'scales', 'teal'], [8, 'plus', 'green'], [13, 'heart', 'sky'], [16, 'star', 'violet'],
    [21, 'scales', 'sky'], [26, 'heart', 'pink'], [29, 'plus', 'teal'], [33, 'scales', 'green']];
  const PGY = 12.5, PHC = 25;                                      // the cream figure in a tile (as gfc_crowd/order)
  const PPTS = LAT.map((c, i) => GFC.personPts(c[0], c[1] + PGY, PHC, 22, i + 1));
  const FCOL = LAT.map((_, i) => GFC.mixC(GFC.PAL[Math.floor(H(i * 3.7 + 1) * 5)][0], '#fff3e2', .82));
  function comb(t, c, flash) {
    const CRS = LAT.map((_, i) => crumble(i, t, c));
    let s = GFC.comb(CX, CY, CR, COLS, ROWS, { w: .6, lit: i => (1 - CRS[i]) * (.94 + .06 * Math.sin(t * 1.8 + i * 1.3)), color: i => TCOL[i] });
    const P = [], A = [], C = [];
    let fl = '';
    LAT.forEach((cc, i) => {
      const cr = CRS[i], [x, y] = cc;
      // «честным (поступком)»: a warm flash in each cell in turn — the deed of its person (v21)
      const dd = deed(t, c, i);
      if (dd > .003) fl += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(CR * 1.6)}" fill="url(#gfc-halo)" opacity="${f(dd)}"/>`;
      // the figure of the cell (as gfc_crowd/order): fades as its cell crumbles and comes back; lit by its deed
      if (cr < .97) s += GFC.person(x, y + PGY, PHC, { color: FCOL[i], t, opacity: 1 - cr, shadow: .5, seed: i + 1, lit: dd });
      // «порядок»: a golden wave from the centre outwards; the deed — a warm golden rim on the tile
      const k = Math.max(flash * clamp(1.4 - Math.hypot(x - CX, y - CY) / 110), .9 * dd) * (1 - cr);
      if (k > .02) fl += GFC.hex(x, y, CR * .9, { op: k, w: 2.6, color: ACC, glow: true, fill: `rgba(255,236,170,${f(.4 * k)})`, shade: false });
      if (cr <= .003) return;
      const al = Math.min(1, cr * 3);
      PPTS[i].forEach((p, k2) => {
        const dir = Math.atan2(p[1] - CY, p[0] - CX) + (H(i * 19 + k2) - .5) * 2.2, dist = cr * (14 + 34 * H(i * 11 + k2 * 5));
        P.push([p[0] + Math.cos(dir) * dist + 2.6 * cr * Math.sin(t * (1.9 + H(k2 + i * 3)) + k2),
          p[1] + Math.sin(dir) * dist + 2.6 * cr * Math.cos(t * (1.5 + H(k2 * 5 + i)) + k2)]);
        A.push(al * (.95 - .35 * cr)); C.push(FCOL[i]);
      });
      for (let k2 = 0; k2 < 12; k2++) {
        const a = Math.PI / 3 * Math.floor(k2 / 2) - Math.PI / 2, a2 = a + Math.PI / 3;
        let px = x + CR * .84 * Math.cos(a), py = y + CR * .84 * Math.sin(a);
        if (k2 % 2) { px = (px + x + CR * .84 * Math.cos(a2)) / 2; py = (py + y + CR * .84 * Math.sin(a2)) / 2; }
        const dir = Math.atan2(y - CY, x - CX) + (H(i * 13 + k2) - .5) * 1.8, dist = cr * (16 + 30 * H(i * 7 + k2 * 3));
        P.push([px + Math.cos(dir) * dist + 3 * cr * Math.sin(t * (2.1 + H(k2 + i)) + k2),
          py + Math.sin(dir) * dist + 3 * cr * Math.cos(t * (1.7 + H(k2 * 3 + i)) + k2)]);
        A.push(al * (.95 - .3 * cr)); C.push(TCOL[i]);
      }
    });
    return s + fl + GFC.dots(P, { r: 1.5, op: .97, t, glow: .5, alpha: i => A[i], color: i => C[i] });
  }
  // «как и в теле»: a big flat body with golden cells in the chest (as gfc_body), its edges crumble and gather with the comb
  const BX = 48, BG = HILLY, BH = 160;
  const BODY = GFC.personPts(BX, BG, BH, 190, 5).filter((_, k) => H(k * 7 + 3) > .42);
  const BCOL = ['#eba2ff', '#ffffff', '#c58cff'];
  function body(t, c, op) {
    if (op <= .003) return '';
    const cr0 = crumbleAt(t, c, .3, 41);
    let s = GFC.person(BX, BG, BH, { color: 'violet', t, opacity: 1 - .45 * cr0, seed: 5, shadow: .7 });
    s += `<circle cx="${BX}" cy="${f(BG - BH * .55)}" r="30" fill="url(#gfc-halo)" opacity="${f(.85 * (1 - .6 * cr0))}"/>`;
    s += GFC.comb(BX, BG - BH * .55, 6.8, 3, 3, { grid: .3, gap: .9, lit: () => 1 - .6 * cr0, color: i => ['#ffe27a', '#ffb547', '#ffd36b'][i % 3] });
    const P = [], A = [];
    BODY.forEach((p, k) => {
      const cr = crumbleAt(t, c, H(k * 3 + 2) * .6, 40 + (k % 9));
      if (cr <= .003) return;
      const dir = Math.atan2(p[1] - (BG - BH * .55), p[0] - BX) + (H(k * 11) - .5) * 1.6, dist = cr * (10 + 26 * H(k * 5 + 1));
      P.push([p[0] + Math.cos(dir) * dist + 2.4 * cr * Math.sin(t * (1.8 + H(k)) + k), p[1] + Math.sin(dir) * dist + 2.4 * cr * Math.cos(t * (1.6 + H(k * 3)) + k)]);
      A.push(Math.min(1, cr * 3) * (.95 - .4 * cr));
    });
    s += GFC.dots(P, { r: 1.5, op: .97, t, glow: .5, alpha: i => A[i], color: BCOL, seed: 5 });
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  /* ---------------- part 1: daily → past → flip ---------------- */
  function part1(t, K) {
    const c = cues1(K);
    let s = '';
    // the comb: after «Но» steps right under the headline (×1.02, centre 212,214), steps left for the «?» on «А», on
    // «религии» shrinks to the centre above the line (the fire falls onto it on «дан свыше»), on «Бог — в начале» goes
    // with the fire into the start; «поступком» (v21): back to the pose of gfc_crowd/order — the seam with gfc_law/voltaire
    const back = qq(t, c.post - .05, c.post + .85);
    const zq = qq(t, c.s10 + .3, c.s10 + 1.3) * (1 - back), aq = qq(t, c.s11 - .05, c.s11 + .7), rq = qq(t, c.rel - .05, c.rel + .8);
    const fq = qq(t, c.s10 + .05, c.s10 + .75) * (1 - back);   // the fire rises first: it leaves the headline's place
    const mv = qq(t, c.mv0, c.land);
    let z = lerp(1, DZ, zq), tx = lerp(CX, DCX, zq), ty = lerp(CY, DCY, zq);
    z = lerp(z, QZ, aq); tx = lerp(tx, QCX, aq); ty = lerp(ty, QCY, aq);
    z = lerp(z, RZ, rq); tx = lerp(tx, RCX, rq); ty = lerp(ty, RCY, rq);
    z = lerp(z, .08, mv); tx = lerp(tx, FX, mv); ty = lerp(ty, LY - 6, mv);
    const cop = 1 - qq(mv, .55, 1);
    // v2 look of daily (0 at both seams): the hills, the gradient threads with sparks
    const vk = zq * (1 - aq);
    // the hills under the scene (the body stands on them): with the comb after «Но», gone on «поступком» and on «А»
    const hillOp = q(t, c.s10 + .3, .8) * (1 - back) * (1 - aq);
    if (hillOp > .003) s += GFC.ground({ y: HILLY, op: hillOp, warm: .25, seed: 3 });
    // the fire: above the comb (daily) → flies up out of the frame on «А» («откуда?») → falls at once from above along a
    // beam onto the comb on «дан (свыше)» → with the comb into the start of the line on «Бог — в начале» → a flare and a
    // wave there → goes out on «не в начале» (a12); «поступком» — a flare and back to (180,88)
    const up = qq(t, c.s11 - .05, c.s11 + .7), fall = qq(t, c.dan - .1, c.land1), gone = qq(t, c.ne12 - .05, c.ne12 + .45);
    let fx, fy, fr, fop = 1, beam = 0;
    if (t < c.dan - .1) { fx = lerp(SX0, DFX, fq); fy = lerp(lerp(SY0, DFY, fq), -70, up); fr = lerp(SR0, DFR, fq) * (1 + .45 * pulse(t, c.post, .15, .8)); }
    else {
      const a = (1 - mv) ** 2, b = 2 * mv * (1 - mv), e = mv * mv;
      fx = a * RCX + b * 70 + e * FX; fy = a * lerp(-30, RFY, fall) + b * 150 + e * LY;
      fr = lerp(10, FR, mv) * (1 + .35 * pulse(t, c.land, .12, .7)) * (1 - .6 * gone);
      fop = 1 - gone; beam = q(t, c.dan - .15, .2) * (1 - qq(t, c.land1 - .05, c.land1 + .5));
    }
    // threads from the fire to the top row of the comb (daily; and again when the fire has come down onto it): at the seams
    // thin warm lines (as gfc_crowd/order), in daily — gradient gold → the colour of the tile, sparks run down them
    const th = Math.max((1 - up) * (1 - aq), q(t, c.land1 - .1, .3) * (1 - mv)) * cop;
    if (th > .003) {
      let defs = '';
      for (let i = 0; i < COLS; i++) {
        const a = [fx, fy + 8], p = [tx + (LAT[i][0] - CX) * z, ty + (LAT[i][1] - CR - CY) * z];
        s += GFC.thread(a, p, { opacity: (.3 + .08 * Math.sin(t * 1.3 + i)) * th * (1 - .6 * vk), width: .8, color: WARM });
        if (vk * th > .003) {
          const id = `gfcl-th${i}`, k = vk * th;
          defs += `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(p[0])}" y2="${f(p[1])}">` +
            `<stop offset="0" stop-color="${SUN}"/><stop offset="1" stop-color="${TCOL[i]}"/></linearGradient>`;
          const ln = (w, o, soft) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(p[0])}" y2="${f(p[1])}" stroke="url(#${id})" stroke-width="${w}" stroke-linecap="round" opacity="${f(o)}"${soft ? ' filter="url(#gfc-soft)"' : ''}/>`;
          s += ln(4, .3 * k, true) + ln(1.4, .85 * k, false);
          const u = ((t * .55 + H(i * 9 + 2)) % 1 + 1) % 1, sk = k * Math.sin(Math.PI * u);
          const px = lerp(a[0], p[0], u), py = lerp(a[1], p[1], u), col = GFC.mixC(SUN, TCOL[i], u);
          s += `<circle cx="${f(px)}" cy="${f(py)}" r="4.2" fill="${col}" opacity="${f(.35 * sk)}" filter="url(#gfc-soft)"/>` +
            `<circle cx="${f(px)}" cy="${f(py)}" r="1.8" fill="#fffbe8" opacity="${f(sk)}"/>`;
        }
      }
      if (defs) s = `<defs>${defs}</defs>` + s;
    }
    // «порядок» (a11; v21 — a10 «этот порядок»), «поступком» — a golden wave over the comb from the centre
    const flash = Math.max(pulse(t, c.por11 - .05, .15, 1.1), pulse(t, c.por10 - .05, .15, 1.1), pulse(t, c.post, .15, 1.1));
    if (cop > .003) s += `<g opacity="${f(cop)}">${GFC.zoom(comb(t, c, flash), CX, CY, z, tx, ty)}</g>`;
    // «честным»: icon nodes of honest deeds rise from nine cells and fade (in the screen place of the cell)
    for (const [i, icon, col] of DEEDS) {
      const a = deedT(c, i), k = q(t, a, .22) * (1 - qq(t, a + .55, a + .9)) * cop;
      if (k <= .003) continue;
      const x = tx + (LAT[i][0] - CX) * z, y = ty + (LAT[i][1] - CY) * z - 4 - 16 * qq(t, a, a + .9);
      s += GFC.node(x, y, 12.5 * z, icon, { color: col, op: k, scale: .4 + .6 * q(t, a, .22) + .18 * pulse(t, a + .12, .1, .25) });
    }
    // «как и в теле»: the body at the left (gone on «А»; v21 — on «поступком»)
    s += body(t, c, q(t, c.tele - .1, .5) * (1 - qq(t, c.s11 - .05, c.s11 + .5)) * (1 - back));
    // the day counter (v2: under the 2nd headline «Каждый день заново», not under the comb): colour number nodes
    // 1 · 2 · 3 · 4 on «собираем», «каждый», «день», «каждым», the new one pops with a glow
    const dayN = c.days.filter(x => t >= x).length;
    const dop = (1 - qq(t, c.s11 - .05, c.s11 + .45)) * q(t, c.sob - .05, .25) * (1 - qq(t, c.post - .05, c.post + .3));
    if (dayN > 0 && dop > .003) {
      const n = Math.max(4, c.days.length), x0 = DAYC - (n - 1) * DNS / 2;
      let g = '';
      for (let k = 0; k < dayN; k++) {
        const x = x0 + k * DNS, a = c.days[k], d = String(k + 1);
        const sc = q(t, a - .02, .18) * (1 + .3 * pulse(t, a + .1, .08, .3));
        const ic = `<text y="9.6" font-family="${FFM}" font-weight="800" font-size="23" text-anchor="middle" fill="${INK}" opacity=".35">${d}</text>` +
          `<text y="8.2" font-family="${FFM}" font-weight="800" font-size="23" text-anchor="middle" fill="#fff">${d}</text>`;
        g += GFC.node(x, DAYY, DNR, ic, { color: GFC.pick(k + 1), scale: sc, glow: 1 + 1.5 * pulse(t, a, .06, .5) });
      }
      s += `<g opacity="${f(dop)}">${g}</g>`;
    }
    // «А откуда взялся сам порядок?»: a big «?» next to the comb; «порядок» — the comb flashes, ПОРЯДОК under it
    const qm = q(t, c.otk - .05, .3) * (1 - qq(t, c.rel - .05, c.rel + .4));
    if (qm > .003) {
      const z2 = 1 + .4 * (1 - qq(t, c.otk - .05, c.otk + .35)) + .15 * pulse(t, c.por11, .1, .5);
      s += `<g opacity="${f(qm)}">${GFC.zoom(GFC.mono(QMX, QMY, '?', { size: 96, anchor: 'middle', color: ACC, glow: true, opacity: 1 }), QMX, QMY - 34, z2)}</g>`;
    }
    const pl = 1 - qq(t, c.rel + .05, c.rel + .55);
    if (pl > .003) s += `<g opacity="${f(pl)}">${GFC.typed(QCX, 320, 'ПОРЯДОК', t, c.por11 - .05, { size: 18, ls: .08, color: ACC, glow: true })}</g>`;
    // the timeline is drawn from the left on «религии»; «СЕЙЧАС» on «взгляд»; the future segment on «будущее» (a12)
    const rev = qq(t, c.rel - .1, c.rel + 1.3), now = qq(t, c.vzg - .1, c.vzg + .5);
    const fut = qq(t, c.bud12 - .05, c.bud12 + .4) * (1 - .65 * qq(t, c.ruk12 + .5, c.ruk12 + 1.3));
    s += tline(t, rev, now, fut);
    // the world, the fire and its labels at the start of the line
    s += world(FX, LY, q(t, c.sotv, .9) * (1 - qq(t, c.ne12, c.ne12 + .6)), t);
    if (fop > .003 && fy > -60) s += fire(fx, fy, fr, fop, t, beam, wave(t, [c.post, c.land1, c.land, c.dal]));
    s += tlabels(rev, now);
    const lab = 1 - .45 * qq(t, c.nash - .3, c.nash + .3) - .3 * qq(t, c.ne12, c.ne12 + .6);
    s += `<g opacity="${f(lab)}">` + GFC.typed(LBX, LBY1, 'СОТВОРИЛ МИР', t, c.sotv, { size: LBS, anchor: 'start', ls: .03, color: WARM }) +
      GFC.typed(LBX, LBY2, 'ДАЛ ЗАКОН', t, c.dal, { size: LBS, anchor: 'start', ls: .03, color: WARM }) + '</g>';
    // «будущее — в Его руках»: palms gather from the fire over the future; quieter on «дальше», gone on «не в начале»
    const hop = q(t, c.bud - .05, .3) * (1 - .45 * qq(t, c.dalshe, c.dalshe + .7)) * (1 - qq(t, c.ne12 - .1, c.ne12 + .5));
    s += hands(t, qq(t, c.bud - .05, c.ruk + .35), hop, FX, LY);
    // «не в начале, а в конце»: the old fire goes out, a light rides along the line into the end and melts into the contour
    const pu = qq(t, c.ne12 + .2, c.kon + .05), pop = q(t, c.ne12 + .1, .25) * (1 - qq(t, c.kon, c.kon + .35));
    if (pop > .003) {
      const x = lerp(FX, EX - ER + 4, pu);
      for (let k = 1; k < 10; k++) {
        const xx = lerp(FX, EX - ER + 4, clamp(pu - k * .03));
        s += `<circle cx="${f(xx)}" cy="${LY}" r="${f(5.5 - k * .45)}" fill="${SUN}" opacity="${f(pop * .75 * (1 - k / 10))}" filter="url(#gfc-soft)"/>`;
      }
      s += GFC.spark(x, LY, 8, { t, op: pop, warm: .7 });
    }
    // the contour: emerges on «конце»; the centre cell docks after «сложится», three cells from the line of the past on
    // «порядка», one more from the second person on «собирают»; two nests stay empty
    const d1 = qq(t, c.slozh, c.slozh + .7), d2 = qq(t, c.sobt, c.sobt + .7);
    const tick = k => qq(t, c.por + k * .22, c.por + .8 + k * .22);
    const cells = [q(t, c.slozh + .62, .3), ...[0, 1, 2].map(k => q(t, c.por + .72 + k * .22, .3)), q(t, c.sobt + .62, .3), 0, 0];
    s += contour(t, qq(t, c.kon - .25, c.kon + .4),
      .45 * pulse(t, c.kon, .2, .8) + .7 * pulse(t, c.slozh + .65, .15, 1) + .5 * pulse(t, c.sobt + .65, .15, 1) + .7 * pulse(t, c.vtor + .7, .15, 1),
      cells, wave(t, [c.kon, c.slozh + .65, c.sobt + .65, c.vtor + .7]), q(t, c.slozh + .5, .5));
    [[72, 0], [104, 1], [130, 2]].forEach(([x, k]) => {
      const u = tick(k), pl2 = pulse(t, c.por + k * .22 - .1, .1, .45);
      if (u > 0 && u < 1) s += flyCell([x, LY - 7], [EX + INNER[1 + k][0], LY + INNER[1 + k][1]], u, 6, IT, 1, t, 70, INCOL[1 + k]);
      if (pl2 > .003) s += `<circle cx="${x}" cy="${LY}" r="${f(3.5 + 7 * pl2)}" fill="${INCOL[1 + k]}" opacity="${f(.9 * pl2)}" filter="url(#gfc-soft)"/>`;
    });
    // the people at «СЕЙЧАС»: the first one appears on «наших», raises a cell by «руках» («и в наших руках»),
    // the cell flies into the contour on «сложится»; on «мы» a second one comes with a cell, on «собираем» the first
    // raises a new cell and both walk to the contour; the second's cell docks on «собирают»
    const p1 = qq(t, c.nash - .2, c.nash + .3);
    if (p1 > .003) {
      const wt = Math.max(0, t - c.sobm), v = 4, wk = qq(t, c.sobm, c.sobm + .5);
      const p1x = P1X + v * wt, p2x = P1X + P2X + v * wt, ph = wt * 5.2;
      const up1 = qq(t, c.nash, c.ruk12 + .35) * (1 - qq(t, c.slozh + .15, c.slozh + .55)) + qq(t, c.sobm - .1, c.sobm + .35);
      s += walker(p1x, PH, 0, 3, ph, wk, clamp(up1), t, p1);
      const held1 = qq(t, c.nash + .05, c.ruk12 + .3), cy1 = lerp(LY - 70, CELLY, held1);
      s += cell(p1x, cy1, CRAD, p1 * held1 * (d1 > 0 ? 0 : 1), t, INCOL[0]);
      s += flyCell([P1X, CELLY], [EX, LY], d1, CRAD, IT, 1, t, 40, INCOL[0]);
      s += cell(p1x, CELLY, CRAD, q(t, c.sobm - .05, .35), t, MINT);
      const p2 = qq(t, c.my - .2, c.my + .3);
      if (p2 > .003) {
        const up2 = 1 - qq(t, c.sobt + .15, c.sobt + .55);
        s += walker(p2x, PH, 2, 11, ph + 2.2, wk, up2, t, p2);
        s += cell(p2x, CELLY, CRAD, p2 * (d2 > 0 ? 0 : 1), t, INCOL[4]);
        s += flyCell([P1X + P2X + v * Math.max(0, c.sobt - c.sobm), CELLY], [EX + INNER[4][0], LY + INNER[4][1]], d2, CRAD, IT, 1, t, 34, INCOL[4]);
      }
    }
    // «религии — первый черновик этой работы»: the draft is sketched over the start from «религии», ЧЕРНОВИК lands big
    // on «черновик»; «работы» — an arrow to clean cells over the end
    s += draft(DRX, DRY, DR, qq(t, c.rel12 - .05, c.cher + .25), 1);
    if (t >= c.cher - .08) {
      const cz = 1 + .35 * (1 - qq(t, c.cher - .08, c.cher + .3)), cf = pulse(t, c.cher - .08, .08, .6);
      s += `<g opacity="${f(q(t, c.cher - .08, .18))}">` + GFC.zoom(GFC.mono(DRX, 42, 'ЧЕРНОВИК', { size: 18, anchor: 'middle', ls: .06, color: '#ece6ff', opacity: .92 + .08 * cf, glow: true }), DRX, 35, cz) + '</g>';
    }
    s += dashArrow(DRX + 70, CLX - 70, DRY, qq(t, c.rab - .1, c.rab + .5));
    s += clean(CLX, DRY, DR, qq(t, c.rab + .2, c.rab + 1.3), 1, t, [2, 5]);
    // «во второй части»: a light runs from «СЕЙЧАС» into the contour
    s += comet(qq(t, c.vtor - .1, c.vtor + .75), NOWX);
    // v2: the headline of daily — the thought of the phrase, not the subtitle: «Порядок не навсегда» from «Но» (+.6 s, when
    // the fire has left its place) to «мы»; «Каждый день заново» from «мы» to «поступком» (the seam pose has no headline)
    s += GFC.headline('Порядок / *не навсегда*', t, c.s10 + .6, c.my10 + .05, HL);
    s += GFC.headline('Каждый день *заново*', t, c.my10 + .15, Math.min(c.post + .3, c.s11 + .2), HL2);
    // the card ЧАСТЬ 2 (story.py) comes on a quieter picture
    const dim = K.card != null ? 1 - .6 * qq(t, K.card - .5, K.card + .3) : 1;
    return dim < .999 ? `<g opacity="${f(dim)}">${s}</g>` : s;
  }

  /* ---------------- part 2: notyet → idea ---------------- */
  // «ЕСТЬ ЛИ БОГ?» / «ПОКА НЕТ.»: Montserrat is proportional — typed from a fixed left edge (centred when whole)
  const QS = 34, AS = 46, QY = 84, AY = 206, TY = 122, BL = .03;
  const QSTR = 'ЕСТЬ ЛИ БОГ?';
  const QX = 180 - GFC.textW(QSTR, QS, QS * BL) / 2, AX = 180 - GFC.textW('ПОКА НЕТ.', AS, AS * BL) / 2;
  const PW = GFC.textW('ПОКА', AS, AS * BL), NX = AX + GFC.textW('ПОКА ', AS, AS * BL), NW = GFC.textW('НЕТ.', AS, AS * BL);
  const PCOL = [TEAL, VIO, CORAL];                   // the people (back → front)
  const PCELL = [PINK, SKY, GOLD];                   // their cells
  function part2(t, K) {
    const c = cues2(K);
    let s = '';
    s += tline(t, 1, 0, 0);
    // the line is always in motion: lights run into the contour (quieter after «религиях»)
    s += flow(t, 4, 2.6, .95 * (1 - .6 * qq(t, c.rel, c.rel + .8)));
    s += comet(qq(t, c.otv - .05, c.otv + .7), LX0 + 6);
    s += comet(qq(t, c.ideya - .05, c.ideya + .75), LX0 + 6);
    // the question is typed from the very first frame; «ПОКА» on «пока», «НЕТ.» lands big on «нет»
    const qa = 1 - qq(t, c.rel, c.rel + .6);
    if (qa > .003) {
      const fl = pulse(t, c.bog1, .1, .6), nf = pulse(t, c.net, .06, .7) + .5 * pulse(t, c.shut, .1, .6);
      s += `<g opacity="${f(qa)}">` + GFC.typed(QX, QY, QSTR, t, -.06, { size: QS, cps: 22, anchor: 'start', ls: BL, op: .95 + .05 * fl, glow: fl > .2 });
      if (t >= c.poka - .02) {
        const zp = 1 + .25 * (1 - qq(t, c.poka - .02, c.poka + .25));
        s += GFC.zoom(GFC.typed(AX, AY, 'ПОКА', t, c.poka - .02, { size: AS, cps: 22, anchor: 'start', ls: BL, op: 1 }), AX + PW / 2, AY - AS * .35, zp);
      }
      // «это не шутка»: «ПОКА» is underlined
      const ul = qq(t, c.shut - .05, c.shut + .4);
      if (ul > .003) s += `<rect x="${f(AX)}" y="${AY + 9}" width="${f(PW * ul)}" height="10" rx="5" fill="${ACC}" opacity=".35" filter="url(#gfc-blur)"/>` +
        `<rect x="${f(AX)}" y="${AY + 11}" width="${f(PW * ul)}" height="4.6" rx="2.3" fill="${ACC}"/>`;
      if (t >= c.net - .02) {
        const zn = 1 + .3 * (1 - qq(t, c.net - .02, c.net + .3));
        s += GFC.zoom(GFC.mono(NX, AY, 'НЕТ.', { size: AS, anchor: 'start', ls: BL, color: ACC, opacity: 1 }) +
          (nf > .003 ? `<g opacity="${f(.7 * clamp(nf))}">${GFC.mono(NX, AY, 'НЕТ.', { size: AS, anchor: 'start', ls: BL, color: ACC, glow: true, shadow: 0 })}</g>` : ''),
          NX + NW / 2, AY - AS * .35, zn);
      }
      s += '</g>';
    }
    s += GFC.thinker('РЭЙ КУРЦВЕЙЛ · «TRANSCENDENT MAN» · 2009', t, c.rey - .2, c.rel + .4, { y: TY, size: 12, ls: .04, maxW: 320 });
    // religions: the fire falls from above into the start on «бог», lands on «начале»; the world; quieter on «идее»
    const ig = q(t, c.bog - .2, .4) * (1 - .45 * qq(t, c.idee, c.idee + .6));
    if (ig > .003) {
      const g = qq(t, c.bog - .1, c.land), fy = lerp(-30, LY, g);
      const beam = q(t, c.bog - .2, .3) * (1 - qq(t, c.land - .1, c.land + .7));
      s += world(FX, LY, q(t, c.sotv, .9) * (1 - .5 * qq(t, c.idee, c.idee + .6)), t);
      s += fire(FX, fy, lerp(8, FR, g), ig, t, beam, qq(t, c.land, c.land + 1.1));
    }
    s += tlabels(1, 0);
    const lab = 1 - .6 * qq(t, c.idee, c.idee + .6);
    s += `<g opacity="${f(lab)}">${GFC.typed(LBX, LBY1, 'СОТВОРИЛ МИР', t, c.sotv, { size: LBS, anchor: 'start', ls: .03, color: WARM })}</g>`;
    // «будущее — в Его руках»: the same palms as in part 1, gone on «идее»
    s += hands(t, qq(t, c.bud - .05, c.ruk + .1), q(t, c.bud - .05, .3) * (1 - qq(t, c.idee + .05, c.idee + .55)), FX, LY);
    // three people bring cells to the contour and put them in: the front one on «собирают», the middle one on «Его»,
    // the last one on «люди»
    const people = qq(t, c.sob - .45, c.sob);
    const X0 = [120, 172, 224], SEED = [7, 13, 19], SLOT = [5, 4, 0];
    const T = [Math.max(c.lyud + .1, c.ego + .3), Math.max(c.ego, c.sob + .35), c.sob + .1];   // when each lets the cell go
    const walkX = (k, tt) => { const wt = Math.max(0, tt - (c.sob - .45)); return X0[k] + 14 * clamp(wt / 1.2) + 3 * Math.max(0, wt - 1.2); };
    const docked = [0, 0, 0];
    if (people > .003) {
      for (let k = 0; k < 3; k++) {
        const x = walkX(k, t), wt = Math.max(0, t - (c.sob - .45)), ph = wt * 5.6 + k * 1.7;
        const d = qq(t, T[k], T[k] + .6);
        docked[k] = q(t, T[k] + .52, .25);
        const upk = 1 - qq(t, T[k] + .25, T[k] + .7);
        s += walker(x, PH, PCOL[k], SEED[k], ph, qq(wt, 0, .4), upk, t, people);
        s += cell(x, CELLY, CRAD, people * (d > 0 ? 0 : 1), t, PCELL[k]);
        s += flyCell([walkX(k, T[k]), CELLY], [EX + INNER[SLOT[k]][0], LY + INNER[SLOT[k]][1]], d, CRAD, IT, 1, t, 30, PCELL[k]);
      }
    }
    // the contour at the end: there from the start and always breathing; «бог», «нет» — a wave; «конце» — brighter with
    // empty nests; each docked cell — a flash and a wave
    const cells = [docked[2], 0, 0, 0, docked[1], docked[0], 0];
    const ccol = [PCELL[2], SKY, PINK, GOLD, PCELL[1], PCELL[0], PINK];
    const bright = .2 + .14 * (.5 + .5 * Math.sin(t * 3.1)) + .12 * pulse(t, c.bog1, .1, .7) + .55 * pulse(t, c.net, .1, .9) +
      .4 * pulse(t, c.shut, .1, .7) + .5 * q(t, c.kon, .6) + .35 * (pulse(t, T[2] + .55, .1, .8) + pulse(t, T[1] + .55, .1, .8) + pulse(t, T[0] + .55, .1, .8));
    s += contour(t, 1, bright, cells, wave(t, [c.bog1, c.net, c.ideya + .6, c.kon, T[2] + .55, T[1] + .55, T[0] + .55]),
      Math.max(.5 * q(t, c.ideya + .55, .4), q(t, c.kon, .5)), ccol, .07);
    return s;
  }

  const P2MODES = new Set(['notyet', 'idea']);
  const isP1 = (K, mode) => K.a10 != null || K.a11 != null || K.a12 != null ? true :
    K.b01 != null || K.b02 != null ? false : !P2MODES.has(mode);

  SCENES.gfc_line = GFC.scene('gfc_line', (t, K, mode, p) => DEFS + (isP1(K || {}, mode) ? part1(t, K || {}) : part2(t, K || {})));
})();
