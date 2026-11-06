/* gfc_build — «Бог ещё не создан», цветная версия («Цветная инфографика», словарь gfc_00_lib.js v2, window.GFC) сцены
 * gf_build: часть 2 (eps/god_future_color_p2), фразы d10–d11, образ → чертёж → здание. Сюжет, слова-основы, время и позы на
 * швах — как у принятой gf_build (её шапка — источник содержания; раскадровка — eps/god_future/source/storyboard_3parts.md,
 * строки d10, d11; текст — source/text_v21.md). Меняется вид — по образцу владельца eps/god_future/qa/style_flatcolor.jpg.
 *
 * Чем вид отличается от gf_build:
 *  · на фразе — крупный заголовок GFC.headline (Montserrat 800, главное слово золотом): d10 «СИЛА ОБРАЗА» (с «образ» до
 *    «Верующий»; дальше вверху подпись-источник Фёдорова и цитата — заголовка нет, цитата сама набрана крупно, как
 *    заголовок); d11 «ИЗ ОБРАЗА — / ЗДАНИЕ», затем «СПРАВЕДЛИВОСТЬ — / СУДЫ» и «МИЛОСЕРДИЕ — / БОЛЬНИЦЫ» (строки встают на
 *    своих словах; они заменили моно-подписи gf_build СПРАВЕДЛИВОСТЬ · СУДЫ · МИЛОСЕРДИЕ · БОЛЬНИЦЫ над зданиями);
 *  · горизонт — фиолетовые холмы GFC.ground (земля d10 y 326, на «Так» — 292, как земля gf_build), звёзды фона;
 *  · контур-образ — золотой пунктирный круг с тёплым ореолом и разноцветными искрами, весы Судьи в нём золотые;
 *  · образ суда — разноцветные светящиеся точки (вся палитра), чертёж — голубые линии на синем листе с сеткой и
 *    размерами, здание — плоское цветное: фиолетовый фронтон, белые колонны с бликом, тёплый свет между колоннами,
 *    сиреневые ступени; штамп ПЛАН — золотая плашка; герб суда — голубой значок GFC.node «весы»;
 *  · знаки-образы (луна, солнце, гора, дерево) — цветные значки GFC.node (фиалка, коралл, бирюза, зелёный), к зданию от них
 *    тянутся градиентные нити их цвета, по нитям бегут огоньки;
 *  · люди d11 — 7 плоских разноцветных GFC.person (seed 1..7); образы весов (голубые и золотые точки) и сердца (розовые)
 *    летят от их голов; больница — светлая, с тёплыми окнами и бирюзовой крышей; сердце становится белым «+» на зелёном
 *    значке (не красный крест); дома города — цветные (фиалка, синий, бирюза, сирень) с бликом и тёплыми окнами.
 * Бога не рисуем: контур — образ (как в gf_build), подписи — только источник. Красного нет.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра, между d10 и d11 шва нет.
 *  images (d10) Вход наплывом 0,5 с из gfc_tribes/one (GFC.scene): поза конца gf_tribes — крупный контур (180,112, r 56) с
 *               весами. «нет» — волна, контур опускается и чуть сжимается (180,136, r 44): сверху место заголовку; «образ» —
 *               заголовок СИЛА ОБРАЗА, весы гаснут, из контура вниз — золотой свет, в воздухе разноцветными точками
 *               проступает суд (сверху вниз); «менял» — образ садится на землю и линиями становится чертежом; «жизнь» —
 *               линия земли, синий лист с сеткой и размерами; «Верующий» — заголовок уходит, контур сжимается (180,172, r 12),
 *               печатается РУССКИЙ ПРАВОСЛАВНЫЙ МЫСЛИТЕЛЬ (y 50); «Николай» — НИКОЛАЙ ФЁДОРОВ (800, 20, y 70, золотая
 *               черта); «писал» — «ФИЛОСОФИЯ ОБЩЕГО ДЕЛА» · 1906 (золото, y 89); цитата по словам, в момент слова (Montserrat
 *               800, 17, y 111/132/153): «ВСЕ МИФИЧЕСКИЕ ОБРАЗЫ / БЫЛИ ПРОЕКТОМ ДЕЙСТВИЯ / НА МИР», «ПРОЕКТОМ ДЕЙСТВИЯ НА МИР»
 *               золотом; «мифические» — вокруг контура выскакивают значки-образы; «образы» — все вспыхивают; «проектом» — от
 *               каждого значка к зданию тянется нить; «действия» — по нитям бегут огоньки, чертёж вспыхивает; «мир» — по
 *               линии земли расходится золотой свет, холмы теплеют; «планом» — чертёж ярче, во фронтоне золотой штамп ПЛАН.
 *  build (d11)  «Так» — подписи, цитата и значки гаснут, чертёж садится на землю города (×0,88, центр 180, земля 292),
 *               заголовок ИЗ ОБРАЗА — ЗДАНИЕ; «мы»/«люди» — внизу 7 разноцветных людей (рост 54); «представляли» — трое средних
 *               тянут руки, от их голов точки летят вверх и складываются в весы над судом, весы качаются; «справедливость» —
 *               заголовок СПРАВЕДЛИВОСТЬ —, весы выравниваются; «строили» — суд встаёт снизу вверх цветным зданием; «суды» —
 *               весы опускаются во фронтон (голубой герб-значок), строка СУДЫ, за судом встают дома; «представляли» —
 *               панорама: суд с домами уезжает влево (×0,76, центр 100), от трёх правых людей — розовое сердце (268,138);
 *               «милосердие» — МИЛОСЕРДИЕ —, справа чертёж больницы (×0,84, центр 268); «строили» — больница встаёт;
 *               «больницы» — сердце опускается в табличку и становится белым «+» на зелёном значке, строка БОЛЬНИЦЫ, вокруг
 *               встают дома (каждый сначала пунктирный образ в воздухе). Поза держится (окна мерцают), из неё наплывает
 *               gfc_future/future.
 * Слова-основы GFC.w (те же, что у gf_build; сверены с build/words.json озвучки 05.11, текст v21):
 *   d10 — нет, образ (0, 1), менял, жизнь, верующий, николай, фёдоров, писал, все, мифические, были, проектом, действия,
 *         на, мир, то, планом;  d11 — мы, люди, представляли (0, 1), справедливость, строили (0, 1), суды, милосердие, больницы.
 * Нет слова в K.words — доля фразы по озвучке 05.11 (DEF — только для scene_test без K).
 * Параметры p: s, mode, K (cues.json части), prev/prev_mode (наплыв — GFC.scene). Камера движка нейтральна.
 * Подписи — базовая линия не выше y 50 (верх закрывает интерфейс Reels), важное — y 39..345, низ кадра — под субтитры.
 * Свои id в SVG: gfcb-*.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  const H = n => GFC.hash(n);
  const { q, qq, lerp, clamp } = GFC;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const FF = 'GFCMont, Mont, sans-serif';
  const GOLD = GFC.GOLD, ACC = GFC.ACC, INK = GFC.INK, PAL = GFC.PAL;
  const SKY = '#9fd3ff', WARM = '#ffe6a8', WIN = '#ffd98a';

  /* ---------------- раскладка (как gf_build) ---------------- */
  const C0 = { x: 180, y: 326, s: 1 };          // чертёж суда в d10 (на всю ширину)
  const CM = { x: 180, y: 292, s: .88 };        // суд в d11 до второго «представляли»
  const C1 = { x: 100, y: 292, s: .76 };        // суд после панорамы (слева)
  const HO = { x: 268, y: 292, s: .84 };        // больница (справа)
  const GY1 = 292;                              // земля города
  const FC0 = [180, 112, 56], FCN = [180, 136, 44], FC1 = [180, 172, 12];   // контур: поза шва → под заголовком → среди образов
  const SIGNS = [['moon', 56, 166, 'violet'], ['sun', 118, 160, 'coral'], ['mountain', 242, 160, 'teal'], ['tree', 304, 166, 'green']];
  const QY = [111, 132, 153], QS = 17;           // цитата: строки и кегль (Montserrat 800)
  const PX = [36, 84, 132, 180, 228, 276, 324], PGY = 342, PHT = 54;   // люди d11
  const SC_Y = 140, HT_IMG = [268, 140];         // образы весов (над судом) и сердца
  const DEF = { d10: [0, 9.38], d11: [9.68, 16.16] };

  /* ---------------- время от слов (как gf_build) ---------------- */
  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GFC.bare(stem);
    return ws.filter(w => GFC.bare(w.w).startsWith(s)).length > n;
  };
  const W = (K, id, stem, share, n = 0) => {
    if (hasW(K, id, stem, n)) return GFC.w(K, id, stem, n);
    const [a, b] = span(K, id);
    return a + share * (b - a);
  };
  const QUOTE = [
    [['«ВСЕ', 'все', 0, .548], ['МИФИЧЕСКИЕ', 'мифические', 0, .591], ['ОБРАЗЫ', 'образ', 1, .642]],
    [['БЫЛИ', 'были', 0, .702], ['ПРОЕКТОМ', 'проектом', 0, .733], ['ДЕЙСТВИЯ', 'действия', 0, .785]],
    [['НА', 'на', 0, .829], ['МИР»', 'мир', 0, .842]]];
  function cues(K) {
    const c = {};
    [c.s10, c.e10] = span(K, 'd10'); [c.s11, c.e11] = span(K, 'd11');
    c.net = W(K, 'd10', 'нет', .073); c.obr = W(K, 'd10', 'образ', .164); c.men = W(K, 'd10', 'менял', .192);
    c.zhizn = W(K, 'd10', 'жизнь', .235); c.ver = W(K, 'd10', 'верующий', .303); c.nik = W(K, 'd10', 'николай', .409);
    c.fed = W(K, 'd10', 'фёдоров', .446); c.pis = W(K, 'd10', 'писал', .48); c.mif = W(K, 'd10', 'мифические', .591);
    c.obr2 = W(K, 'd10', 'образ', .642, 1); c.proekt = W(K, 'd10', 'проектом', .733); c.deist = W(K, 'd10', 'действия', .785);
    c.mir = W(K, 'd10', 'мир', .842); c.plan = W(K, 'd10', 'планом', .93);
    c.qt = QUOTE.map(line => line.map(([, stem, n, share]) => W(K, 'd10', stem, share, n)));
    c.my = W(K, 'd11', 'мы', .043); c.lyudi = W(K, 'd11', 'люди', .096);
    c.pr1 = W(K, 'd11', 'представляли', .222, 0); c.spr = W(K, 'd11', 'справедливость', .296);
    c.str1 = W(K, 'd11', 'строили', .448, 0); c.sud = W(K, 'd11', 'суды', .497);
    c.pr2 = W(K, 'd11', 'представляли', .63, 1); c.mil = W(K, 'd11', 'милосердие', .701);
    c.str2 = W(K, 'd11', 'строили', .849, 1); c.bol = W(K, 'd11', 'больницы', .901);
    c.dS0 = c.sud - .1; c.dS1 = c.dS0 + .55;      // весы опускаются во фронтон
    c.dH0 = c.bol - .1; c.dH1 = c.dH0 + .55;      // сердце опускается в табличку «+»
    return c;
  }

  /* ---------------- геометрия (как gf_build: x от центра, земля y=0, вверх — минус) ---------------- */
  const xf = (polys, dx, dy, k) => polys.map(poly => poly.map(p => [dx + p[0] * k, dy + p[1] * k]));
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  const circle = (cx, cy, r, n) => Array.from({ length: n + 1 }, (_, k) => [cx + r * Math.cos(PI2 * k / n), cy + r * Math.sin(PI2 * k / n)]);
  const COLX = [-80, -48, -16, 16, 48, 80];
  const PED = [[-106, -94], [106, -94], [0, -142], [-106, -94]];
  const COURT = [rect(-110, -14, 110, 0), rect(-98, -24, 98, -14),
    ...COLX.map(x => rect(x - 7, -80, x + 7, -24)), ...COLX.map(x => rect(x - 10, -84, x + 10, -80)),
    rect(-102, -94, 102, -84), PED];
  const STAMP = rect(-30, -12, 30, 12);
  const WX = [-56, -30, 30, 56], WY = [-100, -76, -52];
  const HOSP_WIN = WY.flatMap(y => WX.map(x => rect(x - 8, y, x + 8, y + 14)));
  const PLATE = rect(-15, -104, 15, -74);
  const HOSP = [rect(-78, -118, 78, -110), rect(-75, -110, 75, 0), ...HOSP_WIN, rect(-12, -34, 12, 0), [[-18, -38], [18, -38]], PLATE];
  function scalesPolys(a) {
    const ca = Math.cos(a), sa = Math.sin(a), E = [[-34 * ca, -20 - 34 * sa], [34 * ca, -20 + 34 * sa]];
    const P = [[[0, -26], [0, 26]], [[-14, 26], [14, 26]], [E[0], E[1]], circle(0, -29, 3, 10)];
    for (const [ex, ey] of E) {
      P.push([[ex, ey], [ex - 11, ey + 22]], [[ex, ey], [ex + 11, ey + 22]]);
      P.push(Array.from({ length: 9 }, (_, k) => [ex - 12 + 3 * k, ey + 22 + 7 * Math.sin(Math.PI * k / 8)]));
    }
    return P;
  }
  const HEART = [Array.from({ length: 61 }, (_, k) => {
    const th = PI2 * k / 60, s3 = Math.sin(th) ** 3;
    return [24 * s3, -1.5 * (13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th)) - 4];
  })];
  function sample(polys, step) {
    const P = [];
    for (const poly of polys) for (let i = 0; i + 1 < poly.length; i++) {
      const a = poly[i], b = poly[i + 1], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
      for (let k = 0; k < n; k++) P.push([lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n)]);
    }
    return P;
  }
  const COURT_PTS = sample(COURT, 5);
  const COURT_ORD = COURT_PTS.map(p => clamp((p[1] + 142) / 142));    // образ проступает сверху вниз
  const HEART_PTS = [...sample(HEART, 3.2), ...sample(xf(HEART, 0, 0, .56), 3.4)];
  const HEADS = PX.map(x => GFC.anchors(x, PGY, PHT, {}).head);
  // дома города (x, ширина, высота, слово, задержка) — как gf_build; при суде x от его центра (масштаб C1.s), едут с ним
  const HOUSES = [[-54, 30, 112, 'sud', .3], [52, 32, 118, 'sud', .5], [-92, 22, 136, 'sud', .75],
    [193, 14, 152, 'bol', .08], [236, 28, 118, 'bol', .22], [306, 28, 120, 'bol', .36], [348, 24, 136, 'bol', .5]];
  const HCOL = ['#5b3fc2', '#2f63c9', '#7c45c6', '#1d8a91', '#4c3bb4', '#a84a92', '#3570c4'];

  // значки-образы GFC.node: белые рисунки в поле ±10 (c — цвет значка, d — тёмный тон круга)
  const MOON = (() => {
    const P = [...Array.from({ length: 17 }, (_, k) => { const a = (60 + 240 * k / 16) * Math.PI / 180; return [12 * Math.cos(a), 12 * Math.sin(a)]; }),
      ...Array.from({ length: 17 }, (_, k) => { const a = (-92.75 - 174.5 * k / 16) * Math.PI / 180; return [6.5 + 10.41 * Math.cos(a), 10.41 * Math.sin(a)]; })];
    return 'M' + P.map(p => `${f(p[0] * .78 + 2.4)} ${f(p[1] * .78)}`).join(' L') + ' Z';
  })();
  const ICON = {
    moon: c => `<path d="${MOON}" fill="${c}"/>`,
    sun: c => `<circle r="4.6" fill="${c}"/><path d="${[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = PI2 * k / 8; return `M${f(6.6 * Math.cos(a))} ${f(6.6 * Math.sin(a))} L${f(9.6 * Math.cos(a))} ${f(9.6 * Math.sin(a))}`; }).join(' ')}" stroke="${c}" stroke-width="1.9" stroke-linecap="round"/>`,
    mountain: (c, d) => `<path d="M-10.2 7.4 L-3.6 -4.6 L-.6 -1.2 L3.6 -8 L10.2 7.4 Z" fill="${c}" stroke="${c}" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<path d="M1.2 -4.2 L3.6 -8 L6 -3.6 L4.4 -4.6 L3 -3 Z" fill="${d}" opacity=".55"/>`,
    tree: (c, d) => `<rect x="-1.5" y="1.5" width="3" height="8" rx="1.2" fill="${c}"/><circle cy="-3" r="6.8" fill="${c}"/>` +
      `<path d="M0 3 L0 -2.6 M0 -.4 L-3 -3.6 M0 -1.6 L2.8 -4.6" stroke="${d}" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".6"/>`,
  };

  /* ---------------- рисунки ---------------- */
  const pd = (poly, cx, cy, s) => 'M' + poly.map(p => `${f(cx + p[0] * s)} ${f(cy + p[1] * s)}`).join(' L');
  // линии с прорисовкой (как gf_build): o.p 0..1, o.w, o.color, o.glow — мягкое свечение того же цвета
  function strokes(polys, cx, cy, s, o = {}) {
    const op = o.op ?? 1, pr = o.p ?? 1;
    if (op <= .003 || pr <= 0) return '';
    let a = '';
    polys.forEach((poly, i) => {
      const pi = clamp((pr - .3 * H(i * 7.3 + (o.seed ?? 1))) / .7);
      if (pi <= .002) return;
      a += `<path d="${pd(poly, cx, cy, s)}"${pi >= .999 ? '' : ` pathLength="1" stroke-dasharray="${pi.toFixed(4)} 1"`}/>`;
    });
    const g = o.glow ?? .5, w = o.w ?? 1.4;
    return `<g fill="none" stroke="${o.color ?? '#fff'}" stroke-linejoin="round" stroke-linecap="round" opacity="${f(op)}">` +
      (g > .003 ? `<g stroke-width="${f(w * 2.8)}" opacity="${f(g * .55)}" filter="url(#gfc-soft)">${a}</g>` : '') +
      `<g stroke-width="${f(w)}">${a}</g></g>`;
  }
  const ring = (x, y, r0, dr, u, op = .85, w = 1.8, col = '#fff') => u > .003 && u < 1 ?
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r0 + dr * u)}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(op * (1 - u))}"/>` : '';
  // крупный текст Montserrat 800 (как GFC.headline): тень, тёплое свечение у золота
  function big(x, y, txt, size, col, op, anchor = 'start', glow = 0) {
    if (op <= .003) return '';
    const at = `x="${f(x)}" font-family="${FF}" font-weight="800" font-size="${f(size)}" letter-spacing="${f(size * .02)}" text-anchor="${anchor}"`;
    const sh = `<text ${at} y="${f(y + Math.max(1, size * .075))}" fill="${INK}">${txt}</text>`;
    return `<g opacity="${f(op)}"><g filter="url(#gfc-hblur)" opacity=".7">${sh}</g><g opacity=".55">${sh}</g>` +
      (glow > .003 ? `<text ${at} y="${f(y)}" fill="#ffa040" filter="url(#gfc-glow3)" opacity="${f(.8 * glow)}">${txt}</text>` : '') +
      `<text ${at} y="${f(y)}" fill="${col}">${txt}</text></g>`;
  }
  const bigW = (txt, size) => GFC.textW(txt, size, size * .02) * 1.035;

  // контур-образ: тёплый ореол, розово-фиолетовая сердцевина, золотой пунктир бежит
  function contour(x, y, r, t, op, bright) {
    if (op <= .003) return '';
    const R = r * (1 + .04 * Math.sin(t * 2.3)), dash = `stroke-dasharray="${f(r * .23)} ${f(r * .19)}" stroke-dashoffset="${f(-t * 5)}"`;
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(R * 2.5)}" fill="url(#gfc-halo)" opacity="${f(.55 + .35 * bright)}"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R * 1.05)}" fill="url(#gfc-glowP)" opacity=".9"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="none" stroke="${GOLD}" stroke-width="${f(Math.min(7, 3.4 + r * .05) + 2 * bright)}" ${dash} opacity="${f(.45 + .35 * bright)}" filter="url(#gfc-soft)"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="none" stroke="#fff1c2" stroke-width="${f(Math.min(2.8, 1.7 + r * .02))}" ${dash} opacity="${f(.85 + .15 * bright)}"/></g>`;
  }
  function sparkles(x, y, r, t, op) {
    if (op <= .003) return '';
    const P = [];
    for (let i = 0; i < 34; i++) {
      const a = H(i + 41) * PI2 + t * (.25 + .35 * H(i + 7)) * (i % 2 ? 1 : -1), rr = r * (1.22 + .55 * H(i + 19));
      P.push([x + rr * Math.cos(a), y + rr * Math.sin(a) * .9]);
    }
    return GFC.dots(P, { r: 1.5, op: .85 * op, t, glow: .8, seed: 3 });
  }

  /* ---------------- части кадра ---------------- */
  // d10: синий лист чертежа — сетка, размеры (с «жизнь», гаснут на «Так»)
  function sheet(t, c, cx, cy, cs) {
    const op = qq(t, c.zhizn, c.zhizn + .6) * (1 - qq(t, c.s11, c.s11 + .5));
    if (op <= .003) return '';
    let g = '';
    for (let x = 30; x <= 330; x += 20) g += `<line x1="${x}" y1="182" x2="${x}" y2="${f(cy)}"/>`;
    for (let y = 186; y <= cy; y += 20) g += `<line x1="24" y1="${y}" x2="336" y2="${y}"/>`;
    const L = cx - 110 * cs, R = cx + 110 * cs, T = cy - 142 * cs, DX = cx + 132 * cs, DY = cy + 10;
    const dims = [[[L, DY], [R, DY]], [[L, DY - 5], [L, DY + 5]], [[R, DY - 5], [R, DY + 5]],
      [[DX, T], [DX, cy]], [[DX - 5, T], [DX + 5, T]], [[DX - 5, cy], [DX + 5, cy]]];
    return `<rect x="22" y="178" width="316" height="${f(cy - 176)}" rx="10" fill="url(#gfcb-paper)" opacity="${f(.85 * op)}"/>` +
      `<rect x="22" y="178" width="316" height="${f(cy - 176)}" rx="10" fill="none" stroke="${SKY}" stroke-width="1" opacity="${f(.35 * op)}"/>` +
      `<g stroke="${SKY}" stroke-width=".6" opacity="${f(.3 * op)}">${g}</g>` +
      strokes(dims, 0, 0, 1, { p: qq(t, c.zhizn, c.zhizn + .7), op: .85 * op, w: 1.3, color: SKY, glow: .3, seed: 5 });
  }
  // линия земли: с «жизнь» прорисовывается от центра; «мир» — по ней расходится золотой свет
  function groundLine(t, c, gy, op) {
    const u = qq(t, c.zhizn, c.zhizn + .55) * op;
    if (u <= .003) return '';
    let s = `<line x1="${f(180 - 172 * u)}" y1="${f(gy)}" x2="${f(180 + 172 * u)}" y2="${f(gy)}" stroke="#d9c8ff" stroke-width="1.4" opacity="${f(.7 * op)}"/>`;
    const m = qq(t, c.mir, c.mir + 1.1);
    if (m > .003 && m < 1) {
      for (const side of [-1, 1]) {
        const x = 180 + side * 175 * m;
        s += `<line x1="${f(180 + side * 175 * Math.max(0, m - .25))}" y1="${f(gy)}" x2="${f(x)}" y2="${f(gy)}" stroke="${GOLD}" stroke-width="6" opacity="${f(.6 * (1 - m))}" filter="url(#gfc-soft)"/>` +
          `<circle cx="${f(x)}" cy="${f(gy)}" r="3.6" fill="#fff6d0" opacity="${f(.95 * (1 - m))}"/>`;
      }
    }
    return s;
  }
  // суд как здание (цветное, плоское): ступени, стена с тёплым светом, колонны с бликом, архитрав, фронтон
  function courtArt(cx, cy, s, t) {
    const R = (x0, y0, x1, y1, more = '') => `<rect x="${f(cx + x0 * s)}" y="${f(cy + y0 * s)}" width="${f((x1 - x0) * s)}" height="${f((y1 - y0) * s)}"${more}/>`;
    let a = `<ellipse cx="${f(cx)}" cy="${f(cy + 1)}" rx="${f(122 * s)}" ry="${f(8 * s)}" fill="url(#gfc-shadow)"/>`;
    a += R(-102, -86, 102, -24, ' fill="url(#gfcb-wall)"') + R(-96, -80, 96, -24, ` fill="${WIN}" opacity="${f(.26 + .06 * Math.sin(t * 2.1))}"`);
    COLX.forEach(x => {
      a += R(x - 7, -80, x + 7, -26, ' fill="url(#gfcb-col)"') + R(x - 4.6, -79, x - 2.6, -27, ' fill="#fff" opacity=".7"') +
        R(x + 2.2, -79, x + 3.2, -27, ' fill="#7d63d6" opacity=".45"') +
        R(x - 10, -84, x + 10, -79.5, ' fill="#f4efff" rx="1"') + R(x - 9, -28, x + 9, -24, ' fill="#e4dbff"');
    });
    a += R(-104, -95, 104, -84, ' fill="url(#gfcb-arch)"') + R(-104, -90.6, 104, -89.2, ` fill="${GOLD}" opacity=".85"`);
    const P = PED.slice(0, 3).map(p => [cx + p[0] * s, cy + p[1] * s]);
    a += `<path d="M${f(P[0][0])} ${f(P[0][1])} L${f(P[1][0])} ${f(P[1][1])} L${f(P[2][0])} ${f(P[2][1])} Z" fill="url(#gfcb-ped)" stroke="#f3eaff" stroke-width="${f(1.6 * s)}" stroke-linejoin="round"/>` +
      `<path d="M${f(cx - 84 * s)} ${f(cy - 98 * s)} L${f(cx + 84 * s)} ${f(cy - 98 * s)} L${f(cx)} ${f(cy - 135 * s)} Z" fill="#fff" opacity=".1"/>`;
    a += R(-98, -24, 98, -14, ' fill="url(#gfcb-step)"') + R(-110, -14, 110, 0, ' fill="url(#gfcb-step2)"') +
      `<path d="M${f(cx - 98 * s)} ${f(cy - 24 * s)} H${f(cx + 98 * s)} M${f(cx - 110 * s)} ${f(cy - 14 * s)} H${f(cx + 110 * s)}" stroke="#fff" stroke-width="1" opacity=".55"/>`;
    return a;
  }
  // суд: образ из точек (d10 «образ») → чертёж («менял») → здание (d11 «строили») → герб-весы («суды»)
  function court(t, c, cx, cy, cs) {
    let s = '';
    const land = qq(t, c.men, c.men + .6), fl = (-10 + 1.6 * Math.sin(t * 1.7)) * (1 - land), y0 = cy + fl;
    const dOp = q(t, c.obr, .15) * (1 - qq(t, c.men + .25, c.zhizn + .55));
    if (dOp > .003) {
      const P = COURT_PTS.map(p => [cx + p[0] * cs, y0 + p[1] * cs]);
      s += GFC.dots(GFC.jitter(P, t, .6, 4), { r: 1.75, op: dOp, t, glow: .9, seed: 2, alpha: i => q(t, c.obr + .55 * COURT_ORD[i], .18) });
    }
    const bp = qq(t, c.men, c.men + .75), rc = qq(t, c.str1, c.str1 + .55);
    const plan = qq(t, c.plan, c.plan + .4), act = pulse(t, c.deist, .2, .7) + pulse(t, c.plan, .2, .8);
    s += strokes(COURT, cx, y0, cs, { p: bp, op: .95 * (1 - .85 * rc), w: 1.4 + .5 * plan + .5 * act, color: act > .3 ? '#e6f4ff' : SKY, glow: .5 + .35 * plan + .5 * act, seed: 3 });
    // золотой штамп ПЛАН во фронтоне: «планом» → гаснет на «строили»
    const st = qq(t, c.plan, c.plan + .3) * (1 - qq(t, c.str1, c.str1 + .4));
    if (st > .003) {
      const k = (1 + .35 * (1 - qq(t, c.plan, c.plan + .35))) * cs, px = cx, py = y0 - 108 * cs;
      s += `<g opacity="${f(st)}" transform="translate(${f(px)} ${f(py)}) rotate(-5) scale(${k.toFixed(4)})">` +
        `<rect x="-33" y="-12" width="66" height="24" rx="6" fill="${GOLD}" opacity=".35" filter="url(#gfc-glow3)"/>` +
        `<rect x="-31" y="-11" width="62" height="22" rx="5.5" fill="url(#gfc-p4)" stroke="#fff3c4" stroke-width="1.3"/>` +
        `<text y="5.6" text-anchor="middle" font-family="${FF}" font-weight="800" font-size="15" letter-spacing="1.5" fill="${INK}">ПЛАН</text></g>`;
    }
    if (rc > .003) {
      const top = cy - 146 * cs, lvl = lerp(cy + 6, top, rc);
      s += `<clipPath id="gfcb-cc"><rect x="${f(cx - 126 * cs)}" y="${f(lvl)}" width="${f(252 * cs)}" height="${f(cy + 14 - lvl)}"/></clipPath>` +
        `<g clip-path="url(#gfcb-cc)">${courtArt(cx, cy, cs, t)}</g>`;
      const scan = Math.sin(Math.PI * rc);
      if (scan > .01) s += `<line x1="${f(cx - 114 * cs)}" y1="${f(lvl)}" x2="${f(cx + 114 * cs)}" y2="${f(lvl)}" stroke="${GOLD}" stroke-width="6" opacity="${f(.55 * scan)}" filter="url(#gfc-soft)"/>` +
        `<line x1="${f(cx - 114 * cs)}" y1="${f(lvl)}" x2="${f(cx + 114 * cs)}" y2="${f(lvl)}" stroke="#fff6d0" stroke-width="1.8" opacity="${f(.95 * scan)}"/>`;
    }
    const em = qq(t, c.dS1 - .12, c.dS1 + .15);
    if (em > .003) s += GFC.node(cx, cy - 113 * cs, 14 * cs / .88, 'scales', { color: 'sky', scale: .4 + .6 * em + .12 * pulse(t, c.dS1, .12, .5), op: em }) +
      ring(cx, cy - 113 * cs, 12, 60, qq(t, c.dS1, c.dS1 + .9), .85, 1.8, '#cfe8ff');
    return s;
  }
  // больница: чертёж («милосердие») → здание («строили») → белый «+» на зелёном значке («больницы»)
  function hospital(t, c) {
    const hp = qq(t, c.mil, c.mil + .7), hr = qq(t, c.str2, c.str2 + .5), { x, y, s: k } = HO;
    let s = strokes(HOSP, x, y, k, { p: hp, op: .95 * (1 - .85 * hr), w: 1.4, color: SKY, glow: .5, seed: 9 });
    if (hr > .003) {
      const R = (x0, y0, x1, y1, more = '') => `<rect x="${f(x + x0 * k)}" y="${f(y + y0 * k)}" width="${f((x1 - x0) * k)}" height="${f((y1 - y0) * k)}"${more}/>`;
      const top = y - 122 * k, lvl = lerp(y + 4, top, hr);
      let a = `<ellipse cx="${f(x)}" cy="${f(y + 1)}" rx="${f(88 * k)}" ry="${f(7 * k)}" fill="url(#gfc-shadow)"/>` +
        R(-75, -110, 75, 0, ' fill="url(#gfcb-hosp)"') + R(-75, -110, -68, 0, ' fill="#fff" opacity=".45"') + R(64, -110, 75, 0, ' fill="#5a6fc8" opacity=".25"') +
        R(-80, -120, 80, -109, ' fill="url(#gfc-p1)" rx="2"') + R(-80, -120, 80, -117.5, ' fill="#fff" opacity=".45"');
      let wn = '';
      HOSP_WIN.forEach((w, i) => {
        const [x0, y0] = w[0], br = .78 + .22 * Math.sin(t * (1.3 + H(i) * .8) + i * 2.1);
        wn += R(x0, y0, x0 + 16, y0 + 14, ` fill="${WIN}" opacity="${f(br)}" rx="1.5"`) + R(x0 + 1.5, y0 + 1.5, x0 + 5, y0 + 12.5, ' fill="#fff" opacity=".45"');
      });
      a += `<g>${wn}</g><g stroke="#6d82d6" stroke-width="${f(1.1 * k)}" fill="none" opacity=".7">${HOSP_WIN.map(w => `<path d="M${f(x + (w[0][0] + 8) * k)} ${f(y + w[0][1] * k)} V${f(y + (w[0][1] + 14) * k)}"/>`).join('')}</g>`;
      a += R(-12, -34, 12, 0, ' fill="url(#gfcb-door)" rx="2"') + R(-1, -32, 1, 0, ' fill="#8a4a1a" opacity=".35"') +
        R(-19, -40, 19, -36, ' fill="url(#gfc-p1)" rx="2"') +
        R(-15, -104, 15, -74, ' fill="#eef4ff" rx="4" stroke="#9fb4ee" stroke-width="1.2"');
      s += `<clipPath id="gfcb-ch"><rect x="${f(x - 92 * k)}" y="${f(lvl)}" width="${f(184 * k)}" height="${f(y + 14 - lvl)}"/></clipPath><g clip-path="url(#gfcb-ch)">${a}</g>`;
      const scan = Math.sin(Math.PI * hr);
      if (scan > .01) s += `<line x1="${f(x - 82 * k)}" y1="${f(lvl)}" x2="${f(x + 82 * k)}" y2="${f(lvl)}" stroke="${GOLD}" stroke-width="6" opacity="${f(.55 * scan)}" filter="url(#gfc-soft)"/>` +
        `<line x1="${f(x - 82 * k)}" y1="${f(lvl)}" x2="${f(x + 82 * k)}" y2="${f(lvl)}" stroke="#fff6d0" stroke-width="1.8" opacity="${f(.95 * scan)}"/>`;
    }
    const pl = qq(t, c.dH1 - .12, c.dH1 + .15);
    if (pl > .003) s += GFC.node(x, y - 89 * k, 15.5 * k / .84, 'plus', { color: 'green', scale: .4 + .6 * pl + .12 * pulse(t, c.dH1, .12, .5), op: pl }) +
      ring(x, y - 89 * k, 14, 60, qq(t, c.dH1, c.dH1 + .9), .85, 1.8, '#c9ffd8');
    return s;
  }
  // город: каждый дом сначала пунктирный образ в воздухе (цвет дома), потом встаёт с земли; окна мерцают тёплым
  function city(t, c, cx, cs) {
    let s = '', win = '';
    HOUSES.forEach(([hx, w, h, key, dl], k) => {
      const x = key === 'sud' ? cx + hx * cs / C1.s : hx, col = HCOL[k], lt = GFC.mixC(col, '#ffffff', .55);
      const t0 = c[key] + dl, img = q(t, t0 - .4, .15) * (1 - q(t, t0 + .1, .3)), u = qq(t, t0, t0 + .45);
      if (img > .003) s += `<rect x="${f(x - w / 2)}" y="${f(GY1 - h - 10 * (1 - u))}" width="${w}" height="${h}" rx="2" fill="none" stroke="${lt}" stroke-width="1.5" stroke-dasharray="3 3" opacity="${f(.95 * img)}"/>`;
      if (u <= .003) return;
      const top = GY1 - h * u;
      s += `<rect x="${f(x - w / 2)}" y="${f(top)}" width="${w}" height="${f(h * u)}" fill="${col}"/>` +
        `<rect x="${f(x - w / 2)}" y="${f(top)}" width="${w}" height="${f(h * u)}" fill="url(#gfc-shade)"/>` +
        `<rect x="${f(x - w / 2)}" y="${f(top)}" width="3" height="${f(h * u)}" fill="#fff" opacity=".18"/>` +
        `<line x1="${f(x - w / 2)}" y1="${f(top)}" x2="${f(x + w / 2)}" y2="${f(top)}" stroke="${lt}" stroke-width="1.4" opacity=".85"/>`;
      const cols = Math.max(1, Math.floor((w - 6) / 9)), rows = Math.floor((h - 10) / 14), ox = x - (cols - 1) * 4.5;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const wy = GY1 - h + 8 + j * 14;
        if (wy < top + 2 || H(k * 131 + j * 7 + i * 3) < .38) continue;
        win += `<rect x="${f(ox + i * 9 - 2.4)}" y="${f(wy)}" width="4.8" height="6.4" rx=".8" opacity="${f(.5 + .45 * Math.sin(t * (.9 + H(k + j + i * 5)) + k * 3 + j))}"/>`;
      }
    });
    return s + (win ? `<g fill="${WIN}">${win}</g>` : '');
  }
  // образ из точек, который собирают люди (головы → фигура) и потом опускают в здание
  function idea(t, from, B, form, op, colors) {
    if (op <= .003 || form <= 0) return '';
    const A = B.map((p, i) => { const h = HEADS[from[i % from.length]]; return [h[0] + (H(i * 3 + 1) - .5) * 8, h[1] + (H(i * 5 + 2) - .5) * 6]; });
    return GFC.dots(GFC.morph(A, B, form, t, { spread: .45, amp: 2.5, bend: 22, seed: 7 }), { r: 1.75, op, t, glow: .9, color: colors });
  }
  function people(t, c) {
    let s = '';
    PX.forEach((x, k) => {
      const d = Math.abs(k - 3) * .07, pp = qq(t, c.my + d, c.my + .45 + d);
      if (pp <= .003) return;
      const g1 = k >= 2 && k <= 4 ? pulse(t, c.pr1 - .1, .3, .9) : 0, g2 = k >= 4 ? pulse(t, c.pr2 - .1, .3, .9) : 0, g = Math.max(g1, g2);
      s += GFC.person(x, PGY + 10 * (1 - pp), PHT, { t, seed: k + 1, opacity: pp, up: .45 * g, lit: .2 + .6 * g, rim: x < 180 ? .5 : x > 180 ? -.5 : 0 });
    });
    return s;
  }
  // цитата Фёдорова по словам: Montserrat 800, «ПРОЕКТОМ ДЕЙСТВИЯ НА МИР» — золотом
  function quote(t, c, op) {
    if (op <= .003) return '';
    let s = '';
    const sp = bigW(' ', QS) * .7;
    QUOTE.forEach((line, li) => {
      const ws = line.map(([txt]) => bigW(txt, QS)), L = ws.reduce((a, b) => a + b, 0) + sp * (line.length - 1);
      let x = 180 - L / 2;
      line.forEach(([txt], wi) => {
        const tw = c.qt[li][wi], a = q(t, tw - .04, .2) * op;
        if (a > .003) {
          const hot = li > 0 && txt !== 'БЫЛИ', fl = pulse(t, tw, .15, .8) + (hot ? .3 * pulse(t, c.plan, .2, .8) : 0);
          s += big(x, QY[li] + 6 * (1 - q(t, tw - .04, .25)), txt, QS, hot ? GOLD : '#fff', a, 'start', hot ? .6 + fl : .5 * fl);
        }
        x += ws[wi] + sp;
      });
    });
    return s;
  }
  // подпись-источник Фёдорова: печатается, когда её говорят («Верующий философ» → «Николай Фёдоров» → «писал»)
  function source(t, c, op) {
    if (t < c.ver || op <= .003) return '';
    const L = Math.min(118, 118 * q(t, c.nik + .2, .6));
    return `<g opacity="${f(op)}">${GFC.typed(180, 50, 'Русский православный мыслитель', t, c.ver + .05, { size: 11, cps: 34, op: .92, color: '#ddd6ff', ls: .08, maxW: 296 })}` +
      GFC.typed(180, 70, 'Николай Фёдоров', t, c.nik, { size: 20, cps: 40, op: 1, weight: 800, ls: .03, maxW: 300 }) +
      (L > .3 ? `<rect x="${f(180 - L)}" y="75.4" width="${f(2 * L)}" height="1.4" rx=".7" fill="${ACC}" opacity=".9"/>` : '') +
      GFC.typed(180, 90, '«Философия общего дела» · 1906', t, c.pis, { size: 11, cps: 40, op: .95, color: ACC, ls: .06, maxW: 296 }) + '</g>';
  }
  // градиентная нить от значка к зданию (прорисовка p), цвет значка → голубой чертежа
  function thread(a, b, col, p, op, i) {
    if (op <= .003 || p <= .003) return '';
    const id = `gfcb-th${i}`, d = `M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}`, da = p >= .999 ? '' : ` pathLength="1" stroke-dasharray="${p.toFixed(4)} 1"`;
    return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}"><stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="#e6f4ff"/></linearGradient>` +
      `<g opacity="${f(op)}" fill="none" stroke-linecap="round"><path d="${d}"${da} stroke="${col}" stroke-width="4.5" opacity=".4" filter="url(#gfc-soft)"/><path d="${d}"${da} stroke="url(#${id})" stroke-width="1.8"/></g>`;
  }

  /* ---------------- кадр ---------------- */
  const DEFS = `<defs>
    <linearGradient id="gfcb-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd36b" stop-opacity=".95"/><stop offset="1" stop-color="#ff9ad0" stop-opacity="0"/></linearGradient>
    <linearGradient id="gfcb-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8cff" stop-opacity=".42"/><stop offset="1" stop-color="#2a4fc8" stop-opacity=".2"/></linearGradient>
    <linearGradient id="gfcb-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9b8fa"/><stop offset=".35" stop-color="#ffffff"/><stop offset=".7" stop-color="#e2d8ff"/><stop offset="1" stop-color="#9580e6"/></linearGradient>
    <linearGradient id="gfcb-ped" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c58cff"/><stop offset="1" stop-color="#6c3fd6"/></linearGradient>
    <linearGradient id="gfcb-arch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f1ff"/><stop offset="1" stop-color="#c2acff"/></linearGradient>
    <linearGradient id="gfcb-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d2a96"/><stop offset="1" stop-color="#231a66"/></linearGradient>
    <linearGradient id="gfcb-step" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eae2ff"/><stop offset="1" stop-color="#ab96f2"/></linearGradient>
    <linearGradient id="gfcb-step2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfaaf6"/><stop offset="1" stop-color="#7a5ed6"/></linearGradient>
    <linearGradient id="gfcb-hosp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f9ff"/><stop offset="1" stop-color="#b9cdf6"/></linearGradient>
    <linearGradient id="gfcb-door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffab45"/></linearGradient>
  </defs>`;
  function body(t, K, mode, p) {
    const c = cues(K);
    const mv = qq(t, c.s11, c.s11 + .8);                       // «Так»: чертёж уменьшается и садится на землю города
    const pan = qq(t, c.pr2 - .1, c.pr2 + .55);               // второе «представляли»: суд уезжает влево
    const cx = lerp(lerp(C0.x, CM.x, mv), C1.x, pan), cy = lerp(C0.y, CM.y, mv), cs = lerp(lerp(C0.s, CM.s, mv), C1.s, pan);
    const d10 = 1 - qq(t, c.s11 - .1, c.s11 + .4);            // всё, что только в d10, гаснет на «Так»
    const mir = pulse(t, c.mir, .3, 1.2);
    let s = DEFS;

    // холмы и горизонт (земля суда), лист чертежа, линия земли, город
    s += GFC.ground({ y: cy, warm: .25 + .45 * mir + .2 * mv, glow: 1 + .4 * mir, seed: 2 });
    s += sheet(t, c, cx, cy, cs) + groundLine(t, c, cy, d10) + city(t, c, cx, cs);

    // контур-образ: поза шва (180,112, r 56) → «нет» — ниже, под заголовок → «Верующий» — маленький среди образов
    const mn = qq(t, c.net, c.net + .6), m = qq(t, c.ver, c.ver + .7);
    const fx = lerp(lerp(FC0[0], FCN[0], mn), FC1[0], m), fy = lerp(lerp(FC0[1], FCN[1], mn), FC1[1], m), fr = lerp(lerp(FC0[2], FCN[2], mn), FC1[2], m);
    const beam = .3 * qq(t, c.obr, c.obr + .3) * (1 - qq(t, c.men + .3, c.zhizn + .5));
    if (beam > .003) s += `<path d="M${f(fx - fr * .6)} ${f(fy + fr * .8)} L${f(fx + fr * .6)} ${f(fy + fr * .8)} L${f(cx + 118)} ${f(cy - 14)} L${f(cx - 118)} ${f(cy - 14)} Z" fill="url(#gfcb-beam)" opacity="${f(beam)}"/>`;

    s += court(t, c, cx, cy, cs) + hospital(t, c);

    const fbright = pulse(t, c.net, .15, .6) + pulse(t, c.obr, .15, .6) + pulse(t, c.obr2, .15, .7);
    s += sparkles(fx, fy, fr, t, d10 * (1 - .5 * m)) + contour(fx, fy, fr, t, d10, clamp(fbright));
    // весы Судьи в контуре (как кончает gf_tribes) — золотые; гаснут, когда из образа рождается здание
    const jk = .9 * fr / 56;
    s += strokes(scalesPolys(0), fx, fy + 4 * fr / 56, jk, { op: .97 * (1 - qq(t, c.obr - .1, c.obr + .5)), w: 1.9, color: '#ffe27a', glow: .8 });
    s += ring(fx, fy, fr, 50, qq(t, c.net, c.net + .9), .85 * d10, 2, '#ffe9a8') + ring(fx, fy, fr, 40, qq(t, c.obr, c.obr + .9), .75 * d10, 2, '#ffe9a8');

    // значки-образы (d10 «мифические»), нити «проектом», огоньки «действия»
    const src = [...SIGNS.map(([, x, y]) => [x, y]), [FC1[0], FC1[1]]];
    const tgt = [[cx - 106 * cs, cy - 94 * cs], [cx - 50 * cs, cy - 119.4 * cs], [cx + 50 * cs, cy - 119.4 * cs], [cx + 106 * cs, cy - 94 * cs], [cx, cy - 142 * cs]];
    const tcol = [...SIGNS.map(([, , , cl]) => PAL[GFC.NAME[cl]][0]), GOLD];
    const pj = qq(t, c.proekt, c.proekt + .5);
    if (pj > .003 && d10 > .003) {
      src.forEach((a, i) => { s += thread(a, tgt[i], tcol[i], clamp((pj - .1 * i) / .6), .9 * d10, i); });
      if (t > c.deist) src.forEach((a, i) => {
        for (let j = 0; j < 3; j++) {
          const u = ((t - c.deist) * 1.3 + j / 3 + H(i) * .2) % 1, x = lerp(a[0], tgt[i][0], u), y = lerp(a[1], tgt[i][1], u), k = d10 * Math.sin(Math.PI * u);
          s += `<circle cx="${f(x)}" cy="${f(y)}" r="3.4" fill="${tcol[i]}" opacity="${f(.7 * k)}" filter="url(#gfc-soft)"/><circle cx="${f(x)}" cy="${f(y)}" r="1.6" fill="#fff" opacity="${f(k)}"/>`;
        }
      });
    }
    SIGNS.forEach(([name, x, y, cl], k) => {
      const a = q(t, c.mif + k * .12, .25) * d10;
      if (a <= .003) return;
      const z = .55 + .45 * q(t, c.mif + k * .12, .3) + .2 * pulse(t, c.obr2, .15, .6);
      s += GFC.node(x, y + 1.4 * Math.sin(t * 2 + k * 1.7), 17, ICON[name], { color: cl, scale: z, op: a, glow: 1 + 1.2 * pulse(t, c.obr2, .15, .7) }) +
        ring(x, y, 17, 24, qq(t, c.obr2, c.obr2 + .8), .8 * a, 1.6, PAL[GFC.NAME[cl]][0]);
    });

    // заголовок d10 (с «образ» до «Верующий»); дальше — подпись-источник и цитата
    s += GFC.headline('Сила *образа*', t, c.obr, c.ver + .05, { y: 68 });
    s += source(t, c, d10 * (1 - .25 * qq(t, c.qt[0][0], c.qt[0][0] + .5)));
    s += quote(t, c, d10);

    // d11: образы весов и сердца — из голов людей; опускаются в здания
    const tilt = t < c.spr ? .24 : .24 * Math.exp(-2.6 * (t - c.spr)) * Math.cos(7 * (t - c.spr));
    {
      const u = qq(t, c.dS0, c.dS1), px = cx, py = lerp(SC_Y, cy - 113 * cs, u), k = lerp(1, .45 * cs, u);
      const B = sample(scalesPolys(tilt), 3.2).map(p => [px + p[0] * k, py + p[1] * k]);
      s += idea(t, [2, 3, 4], B, qq(t, c.pr1, c.pr1 + .9), q(t, c.pr1, .2) * (1 - qq(t, c.dS1 - .15, c.dS1 + .1)), ['#8ccbff', '#ffe27a', '#cfe8ff', '#ffffff']);
      const sp = q(t, c.spr, .3) * (1 - qq(t, c.dS0 - .2, c.dS0));
      if (sp > .003) s += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="58" ry="42" fill="url(#gfc-halo)" opacity="${f(.55 * sp)}"/>`;
    }
    {
      const u = qq(t, c.dH0, c.dH1), px = lerp(HT_IMG[0], HO.x, u), py = lerp(HT_IMG[1], HO.y - 89 * HO.s, u), k = lerp(1, .5, u);
      const beat = 1 + .06 * pulse(t, c.mil, .12, .4) + .04 * Math.max(0, Math.sin(t * 5.5)) * (1 - u);
      const B = HEART_PTS.map(p => [px + p[0] * k * beat, py + p[1] * k * beat]);
      const hop = q(t, c.pr2, .2) * (1 - qq(t, c.dH1 - .15, c.dH1 + .1));
      if (hop > .003) s += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(46 * k)}" ry="${f(40 * k)}" fill="url(#gfc-glowP)" opacity="${f(hop * qq(t, c.pr2 + .5, c.mil + .2))}"/>`;
      s += idea(t, [4, 5, 6], B, qq(t, c.pr2, c.pr2 + .9), hop, ['#ffa6d6', '#ff9d8f', '#ffd0ea', '#eba2ff']);
    }
    // заголовки d11: строка 1 и строка 2 встают каждая на своём слове
    const HB = GFC.headBox('Справедливость — / *суды*', { y: 64, size: 22 }), y2 = HB.lines[1].y;
    s += GFC.headline('Из образа — / *здание*', t, c.s11 + .4, c.spr, { y: 64, size: 22 });
    s += GFC.headline('Справедливость —', t, c.spr, c.pr2 + .15, { y: 64, size: 22 }) + GFC.headline('*суды*', t, c.sud, c.pr2 + .15, { y: y2, size: 22 });
    s += GFC.headline('Милосердие —', t, c.mil, null, { y: 64, size: 22 }) + GFC.headline('*больницы*', t, c.bol, null, { y: y2, size: 22 });

    s += people(t, c);
    return s;
  }

  SCENES.gfc_build = GFC.scene('gfc_build', body);
})();
