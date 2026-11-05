/* gf_build — «Бог ещё не создан», часть 2 из 3 «От мести к милосердию» (eps/god_future_p2), фразы d10–d11:
 * образ → чертёж → здание. Раскадровка — eps/god_future/source/storyboard_3parts.md (строки d10, d11), общий стиль —
 * storyboard.md; текст — source/text_v21.md; словарь — gf_00_lib.js (window.GF). Красного нет.
 * Уроки слепого просмотра v1–v2: сцена на телефоне ужата в .72 — главный объект на всю ширину, линии ≥ 1,2, подписи
 * моно ≥ 12 (цитата 16–18), новое событие каждые 0,3–1,3 с на слове, то, что сказано, видно в момент слова.
 * Три вида линий: ОБРАЗ — тёплые светящиеся точки (то, что люди вообразили); ЧЕРТЁЖ — тонкие голубоватые линии
 * (#cfe4ff) с сеткой и размерами; ЗДАНИЕ — белое, залитое, встаёт снизу вверх светлой полосой, в окнах тёплый свет.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра, между d10 и d11 шва нет.
 *  images (d10) «Вообразили или нет, а этот образ менял жизнь. Верующий философ Николай Фёдоров писал: «все мифические
 *               образы были проектом действия на мир» — то есть планом.»
 *               Вход наплывом 0,5 с из gf_tribes/one (делает GF.scene): крупный пунктирный контур огня с весами Судьи
 *               (180,112, r 56 — поза конца gf_tribes); «нет» — от контура волна; «образ» — весы гаснут, над контуром
 *               ОБРАЗ (моно 18), из контура вниз падает
 *               свет и в воздухе точками проступает здание суда (фронтон, 6 колонн, ступени; 220×142) — сверху вниз;
 *               «менял» — образ опускается на землю и линиями становится чертежом; «жизнь» — линия земли, сетка
 *               и размерные линии чертежа; «Верующий» — контур огня сжимается (180,166, r 14), печатается
 *               РУССКИЙ ПРАВОСЛАВНЫЙ МЫСЛИТЕЛЬ (моно 12); «Николай» — НИКОЛАЙ ФЁДОРОВ (моно 18); «писал» —
 *               «ФИЛОСОФИЯ ОБЩЕГО ДЕЛА» · 1906; цитата — по словам, в момент слова (моно 16/18, три строки):
 *               «ВСЕ МИФИЧЕСКИЕ ОБРАЗЫ / БЫЛИ ПРОЕКТОМ ДЕЙСТВИЯ / НА МИР», «ПРОЕКТОМ ДЕЙСТВИЯ НА МИР» тёплым;
 *               «мифические» — вокруг огня точками встают знаки-образы (луна, солнце, гора, дерево), «образы» — все
 *               вспыхивают; «проектом» — от каждого образа к зданию тянется луч; «действия» — по лучам бегут огоньки,
 *               чертёж вспыхивает; «мир» — по линии земли расходится свет; «планом» — чертёж ярче, во фронтоне
 *               штамп ПЛАН (моно 20).
 *  build (d11)  «Так и мы, люди: представляли справедливость — строили суды, представляли милосердие — строили больницы.»
 *               «Так» — подписи, цитата и образы гаснут, чертёж суда садится на землю города (×0,88, центр 180,
 *               земля 292); «мы»/«люди» — внизу ряд из 7 людей из точек (рост 42); «представляли» — от голов трёх
 *               средних людей точки летят вверх и складываются в образ весов над судом, они качаются; «справедливость» —
 *               СПРАВЕДЛИВОСТЬ (моно 16), весы выравниваются; «строили» — суд встаёт снизу вверх; «суды» — весы
 *               опускаются во фронтон (герб), СУДЫ (моно 20), за судом встают дома; «представляли» — панорама: суд с
 *               домами уезжает влево (×0,76, центр 100), от трёх правых людей точки складываются в образ сердца
 *               (268,138); «милосердие» — МИЛОСЕРДИЕ, справа рисуется чертёж больницы (×0,84, центр 268)
 *               (окна, дверь, табличка); «строили» — больница встаёт; «больницы» — сердце опускается в табличку и
 *               становится белым «+» (не красный крест), БОЛЬНИЦЫ, вокруг встают дома — город растёт из образов
 *               (каждый дом сначала пунктирный образ в воздухе). Поза держится: город живёт (окна мерцают), из неё
 *               наплывает gf_future/future.
 * Слова-основы GF.w (сверены с build/words.json озвучки 05.11, текст v21):
 *   d10 — нет, образ (0 — «образ», 1 — «образы»), менял, жизнь, верующий, николай, фёдоров, писал, все, мифические,
 *         были, проектом, действия, на, мир, то, планом;
 *   d11 — мы, люди, представляли (0, 1), справедливость, строили (0, 1), суды, милосердие, больницы.
 * Нет слова в K.words — доля фразы по озвучке 05.11 (DEF — только для scene_test без K).
 * Параметры p: s (фраза), mode, K (cues.json части), prev/prev_mode (наплыв — GF.scene). Камера движка нейтральна.
 * Важное — y≈22..344 (низ кадра пуст под субтитры). Свои id в SVG: gfb-beam, gfb-cc, gfb-ch.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  const H = n => GF.hash(n);
  const { q, qq, lerp, clamp } = GF;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const BLUE = '#cfe4ff', WARM = '#ffe6bd', IMG = '#fff3dc';

  /* ---------------- раскладка ---------------- */
  const C0 = { x: 180, y: 326, s: 1 };          // чертёж суда в d10 (на всю ширину)
  const CM = { x: 180, y: 292, s: .88 };        // суд в d11 до второго «представляли»: по центру, крупно
  const C1 = { x: 100, y: 292, s: .76 };        // суд в d11 после панорамы вправо (слева, рядом с больницей)
  const HO = { x: 268, y: 292, s: .84 };        // больница в d11 (справа)
  const GY1 = 292;                              // земля города
  const FC0 = [180, 112, 56], FC1 = [180, 170, 14];   // контур огня (образ из d09, как gf_tribes кончает): крупно → среди образов
  const JX = 180, JY = 116, JK = .9;                  // весы Судьи в контуре (поза конца gf_tribes/one)
  const SIGNS = [['moon', 56, 166], ['sun', 118, 160], ['mountain', 242, 160], ['tree', 304, 166]];
  const QY = [104, 126, 148], QS = [16, 18, 18];      // цитата: строки и размеры (≥ 16 — без роста в зоне)
  const PX = [36, 84, 132, 180, 228, 276, 324], PGY = 342, PHT = 42;   // люди d11
  const SC_Y = 134, HT_IMG = [268, 138];             // образы весов (над судом) и сердца
  // доли фраз озвучки 05.11 — только для scene_test без K
  const DEF = { d10: [0, 9.38], d11: [9.68, 16.16] };

  /* ---------------- время от слов ---------------- */
  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GF.bare(stem);
    return ws.filter(w => GF.bare(w.w).startsWith(s)).length > n;
  };
  const W = (K, id, stem, share, n = 0) => {
    if (hasW(K, id, stem, n)) return GF.w(K, id, stem, n);
    const [a, b] = span(K, id);
    return a + share * (b - a);
  };
  // цитата: [текст, основа, n, доля]
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

  /* ---------------- геометрия (локально: x от центра, земля y=0, вверх — минус) ---------------- */
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  const circle = (cx, cy, r, n) => Array.from({ length: n + 1 }, (_, k) => [cx + r * Math.cos(PI2 * k / n), cy + r * Math.sin(PI2 * k / n)]);
  const COLX = [-80, -48, -16, 16, 48, 80];
  const PED = [[-106, -94], [106, -94], [0, -142], [-106, -94]];
  const COURT = [rect(-110, -14, 110, 0), rect(-98, -24, 98, -14),
    ...COLX.map(x => rect(x - 7, -80, x + 7, -24)), ...COLX.map(x => rect(x - 10, -84, x + 10, -80)),
    rect(-102, -94, 102, -84), PED];
  const COURT_BACK = [rect(-110, -14, 110, 0), rect(-98, -24, 98, -14), rect(-102, -94, 102, -24), PED];
  const COURT_GAPS = COLX.slice(0, -1).map((x, i) => rect(x + 7, -80, COLX[i + 1] - 7, -24));
  const STAMP = rect(-30, -12, 30, 12);            // штамп ПЛАН, центр — (0,-108) во фронтоне
  const WX = [-56, -30, 30, 56], WY = [-100, -76, -52];
  const HOSP_WIN = WY.flatMap(y => WX.map(x => rect(x - 8, y, x + 8, y + 14)));
  const PLATE = rect(-15, -104, 15, -74);
  const HOSP = [rect(-78, -118, 78, -110), rect(-75, -110, 75, 0), ...HOSP_WIN, rect(-12, -34, 12, 0), [[-18, -38], [18, -38]], PLATE];
  const PLUS = [[-4, -100], [4, -100], [4, -93], [11, -93], [11, -85], [4, -85], [4, -78], [-4, -78], [-4, -85], [-11, -85], [-11, -93], [-4, -93], [-4, -100]];
  // весы: a — наклон коромысла (рад), центр (0,0), высота ≈ 58
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
  // знаки-образы (как у племён d08): локально вокруг (0,0)
  const SIGN = {
    sun: [circle(0, 0, 9, 20), ...[0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = PI2 * k / 8; return [[13 * Math.cos(a), 13 * Math.sin(a)], [19 * Math.cos(a), 19 * Math.sin(a)]]; })],
    moon: [[...Array.from({ length: 17 }, (_, k) => { const a = (60 + 240 * k / 16) * Math.PI / 180; return [12 * Math.cos(a), 12 * Math.sin(a)]; }),
      ...Array.from({ length: 17 }, (_, k) => { const a = (-92.75 - 174.5 * k / 16) * Math.PI / 180; return [6.5 + 10.41 * Math.cos(a), 10.41 * Math.sin(a)]; })]],
    mountain: [[[-18, 10], [-6, -9], [-1, -3], [6, -13], [18, 10], [-18, 10]]],
    tree: [[[0, 12], [0, 1]], circle(0, -7, 9, 18), [[0, 3], [-5, -3]], [[0, 0], [5, -6]]],
  };
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
  const SIGN_PTS = Object.fromEntries(Object.entries(SIGN).map(([k, v]) => [k, sample(v, 2.6)]));
  const HEART_PTS = sample(HEART, 3.2);
  const PEOPLE = PX.map((x, k) => GF.personPts(x, PGY, PHT, 120, 11 + k * 3));
  const HEADS = PX.map(x => [x, PGY - PHT * .91]);
  // дома города (x, ширина, высота, слово, задержка): за судом — после «суды», остальные — после «больницы»
  // дома при суде стоят от его центра (dx при масштабе C1.s) и едут с ним на панораме
  const HOUSES = [[-54, 30, 112, 'sud', .3], [52, 32, 118, 'sud', .5], [-92, 22, 136, 'sud', .75],
    [193, 14, 152, 'bol', .08], [236, 28, 118, 'bol', .22], [306, 28, 120, 'bol', .36], [348, 24, 136, 'bol', .5]];

  /* ---------------- рисунки ---------------- */
  const xf = (polys, dx, dy, k) => polys.map(poly => poly.map(p => [dx + p[0] * k, dy + p[1] * k]));
  const pd = (poly, cx, cy, s) => 'M' + poly.map(p => `${f(cx + p[0] * s)} ${f(cy + p[1] * s)}`).join(' L');
  // линии с прорисовкой: o.p 0..1 (у каждой линии своя задержка), o.w, o.color, o.glow
  function strokes(polys, cx, cy, s, o = {}) {
    const op = o.op ?? 1, pr = o.p ?? 1;
    if (op <= .003 || pr <= 0) return '';
    let a = '';
    polys.forEach((poly, i) => {
      const pi = clamp((pr - .3 * H(i * 7.3 + (o.seed ?? 1))) / .7);
      if (pi <= .002) return;
      a += `<path d="${pd(poly, cx, cy, s)}"${pi >= .999 ? '' : ` pathLength="1" stroke-dasharray="${pi.toFixed(4)} 1"`}/>`;
    });
    const g = o.glow ?? .5, w = o.w ?? 1.3;
    return `<g fill="none" stroke="${o.color ?? '#fff'}" stroke-linejoin="round" stroke-linecap="round" opacity="${f(op)}">` +
      (g > .003 ? `<g stroke-width="${f(w * 2.8)}" opacity="${f(g * .55)}" filter="url(#un-soft)">${a}</g>` : '') +
      `<g stroke-width="${f(w)}">${a}</g></g>`;
  }
  function fills(polys, cx, cy, s, color, op) {
    if (op <= .003) return '';
    return `<g fill="${color}" opacity="${f(op)}">${polys.map(poly => `<path d="${pd(poly, cx, cy, s)} Z"/>`).join('')}</g>`;
  }
  const ring = (x, y, r0, dr, u, op = .85, w = 1.6) => u > .003 && u < 1 ?
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r0 + dr * u)}" fill="none" stroke="#fff" stroke-width="${w}" opacity="${f(op * (1 - u))}"/>` : '';
  const warmText = svg => svg.replace('fill="#fff"', `fill="${WARM}"`);
  // пунктирный контур огня (образ из d09): тёплый ореол, тёмная середина, пунктир бежит
  function contour(x, y, r, t, op, bright) {
    if (op <= .003) return '';
    const R = r * (1 + .04 * Math.sin(t * 2.3)), dash = `stroke-dasharray="${f(r * .23)} ${f(r * .19)}" stroke-dashoffset="${f(-t * 5)}"`;
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(R * 2.4)}" fill="url(#gf-warm)" opacity="${f(.45 + .35 * bright)}"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="none" stroke="${WARM}" stroke-width="${f(Math.min(6, 3 + r * .05) + 2 * bright)}" ${dash} opacity="${f(.3 + .35 * bright)}" filter="url(#un-soft)"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="none" stroke="#fff" stroke-width="${f(Math.min(2.4, 1.5 + r * .02))}" ${dash} opacity="${f(.8 + .2 * bright)}"/></g>`;
  }
  // огоньки вокруг контура (образ живёт)
  function sparkles(x, y, r, t, op) {
    if (op <= .003) return '';
    const P = [];
    for (let i = 0; i < 34; i++) {
      const a = H(i + 41) * PI2 + t * (.25 + .35 * H(i + 7)) * (i % 2 ? 1 : -1), rr = r * (1.22 + .55 * H(i + 19));
      P.push([x + rr * Math.cos(a), y + rr * Math.sin(a) * .9]);
    }
    return GF.dots(P, { r: 1.2, op: .7 * op, t, glow: .7, color: IMG });
  }

  /* ---------------- части кадра ---------------- */
  // d10: сетка, размерные линии (чертёж) — с «жизнь», гаснут на «Так»
  function sheet(t, c, cx, cy, cs) {
    const op = qq(t, c.zhizn, c.zhizn + .6) * (1 - qq(t, c.s11, c.s11 + .5));
    if (op <= .003) return '';
    let g = '';
    for (let x = 30; x <= 330; x += 20) g += `<line x1="${x}" y1="186" x2="${x}" y2="338"/>`;
    for (let y = 198; y <= 338; y += 20) g += `<line x1="22" y1="${y}" x2="338" y2="${y}"/>`;
    const L = cx - 110 * cs, R = cx + 110 * cs, T = cy - 142 * cs, DX = cx + 132 * cs, DY = cy + 10;
    const dims = [[[L, DY], [R, DY]], [[L, DY - 5], [L, DY + 5]], [[R, DY - 5], [R, DY + 5]],
      [[DX, T], [DX, cy]], [[DX - 5, T], [DX + 5, T]], [[DX - 5, cy], [DX + 5, cy]]];
    return `<g stroke="${BLUE}" stroke-width=".6" opacity="${f(.22 * op)}">${g}</g>` +
      strokes(dims, 0, 0, 1, { p: qq(t, c.zhizn, c.zhizn + .7), op: .75 * op, w: 1.2, color: BLUE, glow: .3, seed: 5 });
  }
  // линия земли: с «жизнь» прорисовывается от центра; «мир» — по ней расходится свет
  function ground(t, c, gy) {
    const u = qq(t, c.zhizn, c.zhizn + .55);
    if (u <= .003) return '';
    let s = `<line x1="${f(180 - 172 * u)}" y1="${f(gy)}" x2="${f(180 + 172 * u)}" y2="${f(gy)}" stroke="#fff" stroke-width="1.3" opacity=".6"/>`;
    const m = qq(t, c.mir, c.mir + 1.1);
    if (m > .003 && m < 1) {
      for (const side of [-1, 1]) {
        const x = 180 + side * 175 * m;
        s += `<line x1="${f(180 + side * 175 * Math.max(0, m - .25))}" y1="${f(gy)}" x2="${f(x)}" y2="${f(gy)}" stroke="${WARM}" stroke-width="5" opacity="${f(.5 * (1 - m))}" filter="url(#un-soft)"/>` +
          `<circle cx="${f(x)}" cy="${f(gy)}" r="3.2" fill="#fff" opacity="${f(.95 * (1 - m))}"/>`;
      }
    }
    return s;
  }
  // суд: образ из точек (d10 «образ») → чертёж («менял») → здание (d11 «строили») → герб-весы («суды»)
  function court(t, c, cx, cy, cs) {
    let s = '';
    const land = qq(t, c.men, c.men + .6), fl = (-10 + 1.6 * Math.sin(t * 1.7)) * (1 - land), y0 = cy + fl;
    const dOp = q(t, c.obr, .15) * (1 - qq(t, c.men + .25, c.zhizn + .55));
    if (dOp > .003) {
      const P = COURT_PTS.map(p => [cx + p[0] * cs, y0 + p[1] * cs]);
      s += GF.dots(GF.jitter(P, t, .6, 4), { r: 1.45, op: .97 * dOp, t, glow: .8, color: IMG, alpha: i => q(t, c.obr + .55 * COURT_ORD[i], .18) });
    }
    const bp = qq(t, c.men, c.men + .75), rc = qq(t, c.str1, c.str1 + .55);
    const plan = qq(t, c.plan, c.plan + .4), act = pulse(t, c.deist, .2, .7) + pulse(t, c.plan, .2, .8);
    s += strokes(COURT, cx, y0, cs, { p: bp, op: .95 * (1 - .8 * rc), w: 1.3 + .5 * plan + .5 * act, color: BLUE, glow: .45 + .35 * plan + .5 * act, seed: 3 });
    // штамп ПЛАН во фронтоне: «планом» → гаснет на «строили»
    const st = qq(t, c.plan, c.plan + .3) * (1 - qq(t, c.str1, c.str1 + .4));
    if (st > .003) {
      const k = 1 + .35 * (1 - qq(t, c.plan, c.plan + .35));
      s += strokes(xf([STAMP], 0, -108, k), cx, y0, cs, { op: st, w: 1.5, color: BLUE, glow: .7 }) +
        `<g opacity="${f(st)}">${GF.mono(cx, y0 - 101 * cs, 'ПЛАН', { size: 20 * cs * k, anchor: 'middle', opacity: 1, glow: true })}</g>`;
    }
    if (rc > .003) {
      const top = cy - 146 * cs, lvl = lerp(cy + 2, top, rc);
      s += `<clipPath id="gfb-cc"><rect x="${f(cx - 120 * cs)}" y="${f(lvl)}" width="${f(240 * cs)}" height="${f(cy + 4 - lvl)}"/></clipPath>` +
        `<g clip-path="url(#gfb-cc)">${fills(COURT_BACK, cx, cy, cs, '#000', 1)}${fills(COURT, cx, cy, cs, '#fff', .08)}` +
        fills(COURT_GAPS, cx, cy, cs, WARM, .14 + .05 * Math.sin(t * 2.1)) +
        strokes(COURT, cx, cy, cs, { w: 1.5, color: '#fff', glow: .6 }) + '</g>';
      const scan = Math.sin(Math.PI * rc);
      if (scan > .01) s += `<line x1="${f(cx - 114 * cs)}" y1="${f(lvl)}" x2="${f(cx + 114 * cs)}" y2="${f(lvl)}" stroke="#fff" stroke-width="5" opacity="${f(.45 * scan)}" filter="url(#un-soft)"/>` +
        `<line x1="${f(cx - 114 * cs)}" y1="${f(lvl)}" x2="${f(cx + 114 * cs)}" y2="${f(lvl)}" stroke="#fff" stroke-width="1.6" opacity="${f(.95 * scan)}"/>`;
    }
    const em = qq(t, c.dS1 - .12, c.dS1 + .15);
    if (em > .003) s += strokes(xf(scalesPolys(0), 0, -114, .55), cx, cy, cs, { op: em, w: 1.5, color: WARM, glow: .9 }) +
      ring(cx, cy - 114 * cs, 12, 60, qq(t, c.dS1, c.dS1 + .9), .8);
    return s;
  }
  // больница: чертёж («милосердие») → здание («строили») → белый «+» («больницы»)
  function hospital(t, c) {
    const hp = qq(t, c.mil, c.mil + .7), hr = qq(t, c.str2, c.str2 + .5), { x, y, s: k } = HO;
    let s = strokes(HOSP, x, y, k, { p: hp, op: .95 * (1 - .8 * hr), w: 1.3, color: BLUE, glow: .45, seed: 9 });
    if (hr > .003) {
      const top = y - 122 * k, lvl = lerp(y + 2, top, hr);
      s += `<clipPath id="gfb-ch"><rect x="${f(x - 84 * k)}" y="${f(lvl)}" width="${f(168 * k)}" height="${f(y + 4 - lvl)}"/></clipPath>` +
        `<g clip-path="url(#gfb-ch)">${fills([rect(-78, -118, 78, 0)], x, y, k, '#000', 1)}${fills([rect(-75, -110, 75, 0)], x, y, k, '#fff', .08)}` +
        fills(HOSP_WIN, x, y, k, WARM, .34 + .1 * Math.sin(t * 1.9)) + fills([rect(-12, -34, 12, 0)], x, y, k, WARM, .2) +
        strokes(HOSP, x, y, k, { w: 1.5, color: '#fff', glow: .6 }) + '</g>';
      const scan = Math.sin(Math.PI * hr);
      if (scan > .01) s += `<line x1="${f(x - 80 * k)}" y1="${f(lvl)}" x2="${f(x + 80 * k)}" y2="${f(lvl)}" stroke="#fff" stroke-width="5" opacity="${f(.45 * scan)}" filter="url(#un-soft)"/>` +
        `<line x1="${f(x - 80 * k)}" y1="${f(lvl)}" x2="${f(x + 80 * k)}" y2="${f(lvl)}" stroke="#fff" stroke-width="1.6" opacity="${f(.95 * scan)}"/>`;
    }
    const pl = qq(t, c.dH1 - .12, c.dH1 + .15);
    if (pl > .003) {
      const br = .85 + .15 * Math.sin(t * 2.4);
      s += `<circle cx="${f(x)}" cy="${f(y - 89 * k)}" r="${f(30 * k)}" fill="url(#gf-warm)" opacity="${f(pl)}"/>` +
        fills([PLUS], x, y, k, '#fff', .97 * pl) + strokes([PLUS], x, y, k, { op: pl * br, w: 2.4, color: '#fff', glow: 1 }) +
        ring(x, y - 89 * k, 14, 60, qq(t, c.dH1, c.dH1 + .9), .8);
    }
    return s;
  }
  // город: каждый дом сначала пунктирный образ в воздухе, потом встаёт с земли; окна мерцают тёплым
  function city(t, c, cx, cs) {
    let s = '';
    HOUSES.forEach(([hx, w, h, key, dl], k) => {
      const x = key === 'sud' ? cx + hx * cs / C1.s : hx;
      const t0 = c[key] + dl, img = q(t, t0 - .4, .15) * (1 - q(t, t0 + .1, .3)), u = qq(t, t0, t0 + .45);
      if (img > .003) s += `<rect x="${f(x - w / 2)}" y="${f(GY1 - h - 10 * (1 - u))}" width="${w}" height="${h}" fill="none" stroke="${IMG}" stroke-width="1.3" stroke-dasharray="2 3" opacity="${f(.85 * img)}"/>`;
      if (u <= .003) return;
      const top = GY1 - h * u;
      s += `<rect x="${f(x - w / 2)}" y="${f(top)}" width="${w}" height="${f(h * u)}" fill="#000" stroke="#fff" stroke-width="1.1" stroke-opacity=".62"/>`;
      const cols = Math.max(1, Math.floor((w - 6) / 9)), rows = Math.floor((h - 10) / 14), ox = x - (cols - 1) * 4.5;
      let win = '';
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const wy = GY1 - h + 8 + j * 14;
        if (wy < top + 2 || H(k * 131 + j * 7 + i * 3) < .38) continue;
        win += `<rect x="${f(ox + i * 9 - 2.2)}" y="${f(wy)}" width="4.4" height="6" opacity="${f(.45 + .4 * Math.sin(t * (.9 + H(k + j + i * 5)) + k * 3 + j))}"/>`;
      }
      s += `<g fill="${WARM}" opacity=".85">${win}</g>`;
    });
    return s;
  }
  // образ из точек, который собирают люди (heads → shape) и потом опускают в здание
  function idea(t, from, B, form, op) {
    if (op <= .003 || form <= 0) return '';
    const A = B.map((p, i) => { const h = HEADS[from[i % from.length]]; return [h[0] + (H(i * 3 + 1) - .5) * 8, h[1] + (H(i * 5 + 2) - .5) * 6]; });
    return GF.dots(GF.morph(A, B, form, t, { spread: .45, amp: 2.5, bend: 22, seed: 7 }), { r: 1.45, op: .97 * op, t, glow: .85, color: IMG });
  }
  function people(t, c) {
    let s = '';
    PEOPLE.forEach((P, k) => {
      const d = Math.abs(k - 3) * .07, pp = qq(t, c.my + d, c.my + .45 + d);
      if (pp <= .003) return;
      const dy = 10 * (1 - pp);
      s += GF.dots(GF.jitter(P.map(p => [p[0], p[1] + dy]), t, .35, k + 1), { r: 1.25, op: .93 * pp, t, glow: .5 });
    });
    return s;
  }
  // подпись: проявляется на слове, с тёплой вспышкой
  function label(x, y, text, t, t0, size, op = 1) {
    const a = q(t, t0, .25) * op;
    if (a <= .003) return '';
    const fl = pulse(t, t0, .15, .7);
    return `<g opacity="${f(a)}">${GF.mono(x, y, text, { size, anchor: 'middle', opacity: 1, glow: true })}` +
      (fl > .01 ? `<g opacity="${f(fl)}">${warmText(GF.mono(x, y, text, { size, anchor: 'middle', opacity: 1, glow: true }))}</g>` : '') + '</g>';
  }

  /* ---------------- кадр ---------------- */
  function body(t, K, mode, p) {
    const c = cues(K);
    const mv = qq(t, c.s11, c.s11 + .8);                       // «Так»: чертёж уменьшается и садится на землю города
    const pan = qq(t, c.pr2 - .1, c.pr2 + .55);               // второе «представляли»: суд уезжает влево, справа место больнице
    const cx = lerp(lerp(C0.x, CM.x, mv), C1.x, pan), cy = lerp(C0.y, CM.y, mv), cs = lerp(lerp(C0.s, CM.s, mv), C1.s, pan);
    const d10 = 1 - qq(t, c.s11 - .1, c.s11 + .4);            // всё, что только в d10, гаснет на «Так»
    let s = `<defs><linearGradient id="gfb-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6e0" stop-opacity=".9"/>` +
      `<stop offset="1" stop-color="#fff6e0" stop-opacity="0"/></linearGradient></defs>`;

    s += sheet(t, c, cx, cy, cs) + ground(t, c, cy) + city(t, c, cx, cs);

    // контур огня: крупно → на «Верующий» сжимается к образам; свет вниз на «образ»
    const m = qq(t, c.ver, c.ver + .7);
    const fx = lerp(FC0[0], FC1[0], m), fy = lerp(FC0[1], FC1[1], m), fr = lerp(FC0[2], FC1[2], m);
    const beam = .16 * qq(t, c.obr, c.obr + .3) * (1 - qq(t, c.men + .3, c.zhizn + .5));
    if (beam > .003) s += `<path d="M${f(fx - fr * .55)} ${f(fy + fr * .8)} L${f(fx + fr * .55)} ${f(fy + fr * .8)} L${f(cx + 116)} ${f(cy - 16)} L${f(cx - 116)} ${f(cy - 16)} Z" fill="url(#gfb-beam)" opacity="${f(beam)}"/>`;

    s += court(t, c, cx, cy, cs) + hospital(t, c);

    // образы-знаки (d10 «мифические»), лучи «проектом», огоньки «действия»
    const fbright = pulse(t, c.net, .15, .6) + pulse(t, c.obr, .15, .6) + pulse(t, c.obr2, .15, .7);
    s += sparkles(fx, fy, fr, t, d10 * (1 - .6 * m)) + contour(fx, fy, fr, t, d10, clamp(fbright));
    // весы Судьи в контуре (как кончает gf_tribes) гаснут, когда из образа рождается здание
    s += strokes(scalesPolys(0), JX, JY, JK, { op: .95 * (1 - qq(t, c.obr - .1, c.obr + .5)), w: 1.6, color: '#fff', glow: .7 });
    s += ring(fx, fy, fr, 50, qq(t, c.net, c.net + .9), .8 * d10) + ring(fx, fy, fr, 40, qq(t, c.obr, c.obr + .9), .7 * d10);
    const src = [...SIGNS.map(([, x, y]) => [x, y]), [FC1[0], FC1[1]]];
    const tgt = [[cx - 106 * cs, cy - 94 * cs], [cx - 50 * cs, cy - 119.4 * cs], [cx + 50 * cs, cy - 119.4 * cs], [cx + 106 * cs, cy - 94 * cs], [cx, cy - 142 * cs]];
    const pj = qq(t, c.proekt, c.proekt + .5);
    if (pj > .003 && d10 > .003) {
      s += strokes(src.map((a, i) => [a, tgt[i]]), 0, 0, 1, { p: pj, op: .75 * d10, w: 1.2, color: WARM, glow: .6, seed: 2 });
      if (t > c.deist) src.forEach((a, i) => {
        for (let j = 0; j < 3; j++) {
          const u = ((t - c.deist) * 1.3 + j / 3 + H(i) * .2) % 1;
          s += `<circle cx="${f(lerp(a[0], tgt[i][0], u))}" cy="${f(lerp(a[1], tgt[i][1], u))}" r="2.4" fill="#fff" opacity="${f(.95 * d10 * Math.sin(Math.PI * u))}" filter="url(#un-soft)"/>` +
            `<circle cx="${f(lerp(a[0], tgt[i][0], u))}" cy="${f(lerp(a[1], tgt[i][1], u))}" r="1.3" fill="#fff" opacity="${f(d10 * Math.sin(Math.PI * u))}"/>`;
        }
      });
    }
    SIGNS.forEach(([name, x, y], k) => {
      const a = q(t, c.mif + k * .12, .25) * d10;
      if (a <= .003) return;
      const z = 1 + .35 * (1 - q(t, c.mif + k * .12, .35)) + .18 * pulse(t, c.obr2, .15, .6);
      s += `<circle cx="${x}" cy="${y}" r="26" fill="url(#gf-warm)" opacity="${f(a * (.35 + .5 * pulse(t, c.obr2, .15, .7)))}"/>` +
        GF.dots(GF.jitter(SIGN_PTS[name].map(p => [x + p[0] * z, y + p[1] * z]), t, .4, k + 3), { r: 1.35, op: .95 * a, t, glow: .8, color: IMG });
    });

    // ОБРАЗ над контуром («образ» → гаснет на «Верующий»)
    s += label(180, 40, 'ОБРАЗ', t, c.obr, 18, 1 - qq(t, c.ver - .35, c.ver + .05));
    // Фёдоров: строки печатаются, когда их говорят («Верующий философ» → «Николай Фёдоров» → «писал»)
    if (t >= c.ver && d10 > .003) {
      // с цитатой подпись чуть тише — цитата главнее
      s += `<g opacity="${f(d10 * (1 - .3 * qq(t, c.qt[0][0], c.qt[0][0] + .5)))}">${GF.typed(180, 32, 'РУССКИЙ ПРАВОСЛАВНЫЙ МЫСЛИТЕЛЬ', t, c.ver, { size: 12, cps: 34, op: .9 })}` +
        GF.typed(180, 53, 'НИКОЛАЙ ФЁДОРОВ', t, c.nik, { size: 18, cps: 40, op: 1, glow: true }) +
        GF.typed(180, 71, '«ФИЛОСОФИЯ ОБЩЕГО ДЕЛА» · 1906', t, c.pis, { size: 12, cps: 40, op: .9 }) + '</g>';
    }
    // цитата по словам
    if (d10 > .003) QUOTE.forEach((line, li) => {
      const size = QS[li], adv = size * .6, L = line.reduce((n, w) => n + w[0].length, 0) + line.length - 1;
      let x = 180 - L * adv / 2;
      line.forEach(([txt], wi) => {
        const tw = c.qt[li][wi], a = q(t, tw - .04, .2) * d10;
        if (a > .003) {
          const hot = li > 0 && txt !== 'БЫЛИ', fl = pulse(t, tw, .15, .8) + (hot ? .25 * pulse(t, c.plan, .2, .8) : 0);
          const one = GF.mono(x, QY[li], txt, { size, anchor: 'start', opacity: 1, glow: true });
          s += `<g opacity="${f(a)}">${hot ? warmText(one) : one}</g>`;
          if (fl > .01) s += `<g opacity="${f(fl * d10)}" filter="url(#un-soft)">${warmText(one)}</g>`;
        }
        x += (txt.length + 1) * adv;
      });
    });

    // d11: образы весов и сердца — из голов людей; опускаются в здания
    const tilt = t < c.spr ? .24 : .24 * Math.exp(-2.6 * (t - c.spr)) * Math.cos(7 * (t - c.spr));
    {
      const u = qq(t, c.dS0, c.dS1), px = cx, py = lerp(SC_Y, cy - 114 * cs, u), k = lerp(1, .55 * cs, u);
      const B = sample(scalesPolys(tilt), 3.2).map(p => [px + p[0] * k, py + p[1] * k]);
      s += idea(t, [2, 3, 4], B, qq(t, c.pr1, c.pr1 + .9), q(t, c.pr1, .2) * (1 - qq(t, c.dS1 - .15, c.dS1 + .1)));
    }
    {
      const u = qq(t, c.dH0, c.dH1), px = lerp(HT_IMG[0], HO.x, u), py = lerp(HT_IMG[1], HO.y - 89 * HO.s, u), k = lerp(1, .5 * HO.s / .78, u);
      const beat = 1 + .06 * pulse(t, c.mil, .12, .4) + .04 * Math.max(0, Math.sin(t * 5.5)) * (1 - u);
      const B = HEART_PTS.map(p => [px + p[0] * k * beat, py + p[1] * k * beat]);
      s += idea(t, [4, 5, 6], B, qq(t, c.pr2, c.pr2 + .9), q(t, c.pr2, .2) * (1 - qq(t, c.dH1 - .15, c.dH1 + .1)));
    }
    s += label(cx, 90, 'СПРАВЕДЛИВОСТЬ', t, c.spr, 16) + label(cx, 160, 'СУДЫ', t, c.sud + .25, 20) +
      label(HO.x, 90, 'МИЛОСЕРДИЕ', t, c.mil, 16) + label(HO.x, 160, 'БОЛЬНИЦЫ', t, c.bol + .25, 20);

    s += people(t, c);
    return s;
  }

  SCENES.gf_build = GF.scene('gf_build', body);
})();
