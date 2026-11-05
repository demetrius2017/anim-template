/* gf_omega — «Бог ещё не создан», часть 2 (eps/god_future_p2), фраза b03: древо эволюции Тейяра де Шардена, v3.
 * Текст v15 (eps/god_future/source/text_v15.md): «Бога в будущем искали и до Курцвейла. Тейяр де Шарден — священник,
 * который раскапывал древних людей, — писал о «Боге Впереди»: эволюция идёт к сознанию — от клетки к думающему
 * человеку, — и в конце её ждёт Бог.» Словарь — gf_00_lib.js (window.GF).
 * v3 — по слепому просмотру v1 (eps/god_future/qa/blind_view_v1/summary.md, p2 Л1 к10–15 «дерево стоит 12–14 с» 3 из 3;
 * Г1 «всё мелкое» 6 из 6): на телефоне сцена ужата в .72, поэтому древо — на всю ширину сцены (x ≈ 28..332, y 111..332),
 * линии ≥ 1,25, точки r 1,6, значки ≈ 45–70 px, подписи моно ≥ 12; каждые 0,3–2 с — новое событие на слове.
 * В кадре: чёрный фон; линия времени gf_line поворачивается, как стрелка часов, в вертикальную ось-ствол по центру
 * (ПРОШЛОЕ внизу, БУДУЩЕЕ вверху), пустой пунктирный контур огня едет на её конце в вершину (180, 111.3); внизу —
 * раскоп на всю ширину; с «эволюция» по оси растёт ствол, ветви растут ветка за веткой снизу вверх и сходятся в вершину. Значки из
 * точек: клетка (у корня), рыба (внешняя левая ветвь), ящер (внешняя правая), человек (ствол под вершиной).
 * Лиц, портретов и религиозных символов нет; люди — облака точек.
 *
 * Один режим — tree (b03); картинка — одна непрерывная линия от t и K. Слова фразы b03 (основы GF.w; нет слова — начало
 * фразы, без ошибки):
 *   начало фразы   шов с gf_line/idea: та же линия (y 280, x 24→336, ширина 1,3, 13 штрихов) и контур (296,280) r 30
 *                  с сотой в центре; с T0+0,2 до T0+1,0 линия поворачивается в ось x=180 (y 338 → 78), контур едет
 *                  на ней в вершину и сжимается до r 16, сота в нём гаснет; подписи линии → подписи оси;
 *   «будущем»      подпись БУДУЩЕЕ у вершины светится;
 *   «искали»       три крупные волны от контура на весь кадр («ищут», радиус до ≈ 170);
 *   «тейяр»        в середине кадра на тёмной плашке крупно печатается «ТЕЙЯР ДЕ ШАРДЕН» (моно 26); «священник» —
 *                  вторая строка «СЕРДЦЕ МАТЕРИИ» · 1950 (моно 15);
 *   «раскапывал»   блок имени уезжает вверх в шапку (моно 18 / 12, y 40 / 63); внизу на всю ширину раскоп: четыре слоя
 *                  земли, комья разлетаются (часть остаётся); «древних» — справа от ствола проступает лежащий человек
 *                  из точек (≈ 140 px); «людей» — кольцо вокруг находки;
 *   «писал»        перо: яркая точка идёт по оси снизу в вершину, ось за ней светлеет;
 *   «боге»         справа от вершины печатается «БОГ ВПЕРЕДИ» (моно 16), вершина впервые теплеет; «впереди» — вспышка
 *                  стрелки над вершиной и волна;
 *   «эволюция»     раскоп гаснет (к «сознанию»); по оси снизу растёт ствол (точки), с ним — нижние ветви, ветка за веткой;
 *   «идёт»         по ветвям вверх бегут огоньки; «сознанию» — от верхушки ствола в вершину летит импульс, волна;
 *   «клетки»       у корня крупно — клетка (кольцо-вспышка); дальше рыба (между «клетки» и «думающему»),
 *                  «думающему» — ящер, «человеку» — человек на стволе; ветви растут дальше;
 *   «конце» → конец «ждёт»  ветви дорастают и сходятся в вершину, по точкам снизу вверх идёт волна света;
 *   «бог» (3-е, «Бог.»)     вершина вспыхивает огнём порядка GF.spark r 11, кольцо света.
 * Вход: наплыв из p.prev (gf_line/idea) делает GF.scene; первая поза — та же линия и контур, что у gf_line.
 * Выход: поза держится (древо горит, огонь дышит, огоньки бегут); огонь в вершине (180, 111.3) r 11 — из этой точки
 * gf_lastq/ask опускает огонь в тёмный экран компьютера. Камера неподвижна (движение — рост и события).
 * Важное — y = 26..340, x = 14..346 (кромки — по безопасной зоне story.safe); подписи моно ≥ 12.
 */
(() => {
  const ID = 'b03';                                       // фраза этой сцены (eps/god_future_p2/story.py, BEATS)
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GF.hash(n);
  // линия gf_line/idea (шов): y 280, x 24→336, контур на ней (296,280) r 30; поворачивается в ось x=CX, y AXB → AXT
  const LN = { y: 280, x0: 24, x1: 336 }, EX = 296, ER = 30, LAB = 12;
  const CX = 180, AXB = 338, AXT = 78;
  const UC = (EX - LN.x0) / (LN.x1 - LN.x0);              // доля контура на линии (.872): он едет вместе с концом линии
  const APEX = AXB - UC * (AXB - AXT);                    // ≈ 111.3 — точка схода древа = место контура на оси
  const BASE = 332, CR = 16;                              // корень древа, радиус контура в вершине
  const SPREAD = 1.6;                                     // ширина древа: внешние ветви доходят до x ≈ 28 и 332
  const ys = s => BASE - s * (BASE - APEX);
  // ветвь мягко отходит от родителя, шире всего чуть дальше середины своего пути, в вершину входит под углом
  const bump = u => u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * Math.pow(u, 1.2));
  // ветви: p — родитель, s0 — высота развилки (доля), a — отход от родителя в самом широком месте, px (× SPREAD)
  const BR = [
    { p: -1, s0: 0, a: 0 },                               // 0 ствол — ось времени, прямо к точке схода
    { p: 0, s0: .08, a: -60 }, { p: 0, s0: .12, a: 63 },
    { p: 1, s0: .24, a: -37 }, { p: 2, s0: .28, a: 35 },
    { p: 1, s0: .36, a: 25 }, { p: 2, s0: .40, a: -25 },
    { p: 0, s0: .46, a: -27 }, { p: 0, s0: .52, a: 29 },
    { p: 3, s0: .46, a: -17 }, { p: 4, s0: .50, a: 17 },
    { p: 5, s0: .58, a: 12 }, { p: 6, s0: .62, a: -12 },
  ];
  const bx = (k, s) => k <= 0 ? CX : bx(BR[k].p, s) + SPREAD * BR[k].a * bump((s - BR[k].s0) / (1 - BR[k].s0));
  // тупиковые веточки (вымершие): от ветви p на высоте s0, длина len (доля высоты), отход dx
  const TW = [
    { p: 1, s0: .20, len: .07, dx: -14 }, { p: 2, s0: .22, len: .08, dx: 16 }, { p: 3, s0: .36, len: .07, dx: -13 },
    { p: 4, s0: .40, len: .06, dx: 14 }, { p: 5, s0: .52, len: .07, dx: 13 }, { p: 6, s0: .56, len: .06, dx: -12 },
    { p: 9, s0: .66, len: .06, dx: -10 }, { p: 10, s0: .68, len: .06, dx: 10 }, { p: 0, s0: .30, len: .06, dx: 12 },
    { p: 7, s0: .64, len: .05, dx: -9 }, { p: 8, s0: .68, len: .05, dx: 9 },
  ];
  const DS = .02;
  // раскоп внизу на всю ширину: слои земли, комья, лежащий человек из точек (находка ≈ 140 px, справа от ствола)
  const PIT = { x0: 16, x1: 344, y0: 252, y1: 326 }, FOS = [262, 296];
  let GEO = null;                                         // неизменяемый кеш геометрии (строится при первой отрисовке)
  function geo() {
    if (GEO) return GEO;
    const br = BR.map((b, k) => { const P = []; for (let s = b.s0; s < 1 - 1e-6; s += DS) P.push([bx(k, s), ys(s), s]); P.push([CX, APEX, 1]); return P; });
    const tw = TW.map(w => { const P = []; for (let j = 0; j <= 4; j++) { const s = w.s0 + w.len * j / 4; P.push([bx(w.p, s) + SPREAD * w.dx * Math.pow(j / 4, .8), ys(s) - 2 * j / 4, s]); } return P; });
    // находка: GF.personPts лёжа (голова слева), ≈ 140 px
    const fossil = GF.personPts(0, 0, 140, 280, 13).map(([x, y]) => [FOS[0] + y + 70, FOS[1] + x * .9]);
    const dirt = GF.cloud(170, 17, [PIT.x0 + 4, PIT.y0 + 6, PIT.x1 - 4, PIT.y1 - 4]);
    const strata = [258, 276, 296, 316].map((y, j) => { const P = []; for (let x = PIT.x0; x <= PIT.x1; x += 5) P.push([x, y + 2.6 * Math.sin(x * .06 + j * 1.7)]); return P; });
    GEO = Object.freeze({ br, tw, fossil, dirt, strata });
    return GEO;
  }
  // часть ломаной до высоты g (с долей последнего отрезка)
  function upTo(P, g) {
    const R = [];
    for (let i = 0; i < P.length; i++) {
      if (P[i][2] <= g) { R.push(P[i]); continue; }
      if (i > 0) { const a = P[i - 1], b = P[i], u = (g - a[2]) / Math.max(1e-6, b[2] - a[2]); R.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u), g]); }
      break;
    }
    return R;
  }
  const at = (P, s) => upTo(P, s).slice(-1)[0] || P[0];
  // кусочно-линейный фронт по ключам [[t, g], …] (времена уже по возрастанию); до первого ключа — 0
  function front(t, keys) {
    if (t < keys[0][0]) return 0;
    for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) {
      const [a, ga] = keys[i - 1], [b, gb] = keys[i];
      return lerp(ga, gb, (t - a) / Math.max(.001, b - a));
    }
    return keys[keys.length - 1][1];
  }
  const mono = (ts, step = .05) => { for (let i = 1; i < ts.length; i++) ts[i] = Math.max(ts[i], ts[i - 1] + step); return ts; };

  /* значки из точек (локальные координаты ≈ 24 px × sc) */
  function cellPts(x, y, sc) {
    const P = [];
    for (let i = 0; i < 30; i++) { const a = i / 30 * 6.283; P.push([x + 8 * sc * Math.cos(a), y + 7 * sc * Math.sin(a)]); }
    for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; P.push([x + 1.4 * sc + 2.4 * sc * Math.cos(a), y - sc + 2.4 * sc * Math.sin(a)]); }
    for (let i = 0; i < 9; i++) P.push([x + (H(i + 3) - .5) * 10 * sc, y + (H(i + 9) - .5) * 8 * sc]);
    return P;
  }
  function fishPts(x, y, sc, dir = -1) {
    const P = [];
    for (let i = 0; i < 34; i++) { const a = i / 34 * 6.283; P.push([x + dir * 9 * sc * Math.cos(a), y + 4.4 * sc * Math.sin(a) * (1 + .18 * Math.cos(a))]); }
    for (let j = 0; j <= 6; j++) { const u = j / 6; P.push([x - dir * (9 + 6 * u) * sc, y - 5 * u * sc]); P.push([x - dir * (9 + 6 * u) * sc, y + 5 * u * sc]); }
    for (let j = 1; j < 6; j++) P.push([x - dir * 15 * sc, y + (j / 3 - 1) * 5 * sc]);
    for (let j = 0; j < 4; j++) P.push([x + dir * (2.4 - 1.2 * j) * sc, y - (4.6 + .6 * j) * sc]);   // спинной плавник
    return P;
  }
  function lizardPts(x, y, sc, dir = 1) {                 // ящер сбоку: тело, голова, хвост, четыре лапы вниз
    const P = [], X = v => x + dir * v * sc, Y = v => y + v * sc;
    for (let i = 0; i < 28; i++) { const a = i / 28 * 6.283; P.push([X(7.5 * Math.cos(a)), Y(-1 + 3.2 * Math.sin(a))]); }
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.push([X(11.5 + 3 * Math.cos(a)), Y(-2.6 + 2 * Math.sin(a))]); }
    for (let j = 1; j <= 14; j++) { const u = j / 14; P.push([X(-7.5 - 14 * u), Y(-1 + 2.2 * Math.sin(u * 2.6))]); }
    for (const lx of [4.5, -4]) for (const k of [0, 1]) for (let j = 1; j <= 4; j++)
      P.push([X(lx + (k ? 1.6 : -.6) + (j === 4 ? 1.3 : .32 * j)), Y(1.8 + 1.15 * j)]);
    return P;
  }
  const humanPts = (x, y, sc) => GF.personPts(x, y + 14 * sc, 28 * sc, 150, 9);
  const ICONS = [                                        // ветвь k, высота s, рисунок, размер, ключ времени появления
    { k: 0, s: .05, pts: cellPts, sz: 2.8, key: 'klet' },  // клетка у корня — «клетки»
    { k: 3, s: .38, pts: fishPts, sz: 2.6, key: 'fish' },  // рыба — внешняя левая ветвь, между «клетки» и «думающему»
    { k: 4, s: .42, pts: lizardPts, sz: 2.3, key: 'dum' }, // ящер — внешняя правая ветвь, «думающему»
    { k: 0, s: .70, pts: humanPts, sz: 2.4, key: 'chel' }, // человек — ствол под вершиной, «человеку»
  ];

  function ring(x, y, r, op, w = 1, dash = null, off = 0) {
    if (op <= .003) return '';
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="${w}" opacity="${f(op)}"${dash ? ` stroke-dasharray="${dash}" stroke-dashoffset="${f(off)}"` : ''}/>`;
  }
  /* ось: e 0..1 — линия gf_line (горизонталь) поворачивается, как стрелка часов, в вертикаль x=CX; pen 0..1 — перо по оси */
  function axisGeo(e) {
    const cx = lerp((LN.x0 + LN.x1) / 2, CX, e), cy = lerp(LN.y, (AXB + AXT) / 2, e);
    const L = lerp(LN.x1 - LN.x0, AXB - AXT, e), ang = -Math.PI / 2 * e;
    const d = [Math.cos(ang), Math.sin(ang)], n = [-d[1], d[0]];
    const A = [cx - d[0] * L / 2, cy - d[1] * L / 2];
    const pt = (k, m = 0) => [A[0] + d[0] * k + n[0] * m, A[1] + d[1] * k + n[1] * m];
    return { A, L, d, n, pt };
  }
  function axis(t, e, pen, penDone, tipFl, futQ) {
    const G = axisGeo(e), P = (k, m = 0) => { const p = G.pt(k, m); return `${f(p[0])} ${f(p[1])}`; };
    const L = G.L, B = G.pt(L);
    let s = `<g stroke="#fff" fill="none" stroke-linecap="round"><path d="M${P(0)} L${P(L)}" stroke-width="1.3" opacity=".85"/>` +
      `<path d="M${P(0)} L${P(L)}" stroke-width="3.4" opacity=".18" filter="url(#un-soft)"/>` +
      `<path d="M${P(L - 11, 6)} L${P(L)} L${P(L - 11, -6)}" stroke-width="${f(1.3 + 1.2 * tipFl)}" opacity="${f(.9)}"/></g>`;
    if (tipFl > .003) s += `<circle cx="${f(B[0])}" cy="${f(B[1])}" r="${f(6 + 8 * tipFl)}" fill="url(#gf-warm)" opacity="${f(tipFl)}"/>`;
    let tk = '';
    for (let i = 0; i <= 12; i++) { const k = lerp(6, L - 16, i / 12); tk += `<path d="M${P(k, -4.5)} L${P(k, 4.5)}"/>`; }
    s += `<g stroke="#fff" stroke-width=".7" opacity=".45">${tk}</g>`;
    // перо («писал»): яркая точка идёт снизу в вершину, за ней ось светлеет и остаётся светлее
    if (pen > .003) {
      const k1 = UC * L * pen, head = G.pt(k1);
      s += `<path d="M${P(0)} L${P(k1)}" stroke="#fff" stroke-width="2.2" opacity="${f(.85 - .35 * penDone)}" stroke-linecap="round"/>`;
      if (pen < .999) s += `<circle cx="${f(head[0])}" cy="${f(head[1])}" r="7" fill="url(#gf-warm)" opacity=".95"/><circle cx="${f(head[0])}" cy="${f(head[1])}" r="2.8" fill="#fff"/>`;
    }
    // подписи линии (под концами, как у gf_line) гаснут, подписи оси (слева от вершины и корня) проступают
    const lo = 1 - clamp(e * 2), ao = clamp(e * 2 - 1);
    if (lo > .003) s += GF.mono(LN.x0, LN.y + 26, 'ПРОШЛОЕ', { size: LAB, anchor: 'start', opacity: .88 * lo }) +
      GF.mono(EX - ER - 6, LN.y + 26, 'БУДУЩЕЕ', { size: LAB, anchor: 'end', opacity: .88 * lo });
    if (ao > .003) s += GF.mono(CX - CR - 10, APEX + 5, 'БУДУЩЕЕ', { size: LAB, anchor: 'end', opacity: (.7 + .3 * futQ) * ao, glow: futQ > .3 }) +
      GF.mono(CX - 40, BASE + 6, 'ПРОШЛОЕ', { size: LAB, anchor: 'end', opacity: .7 * ao });   // левее клетки у корня
    return s;
  }
  // пустой пунктирный контур огня (как contour в gf_line): bright 0..1, cell — сота в центре (её принесли люди в b02)
  function contour(t, x, y, r, op, bright, cell, warm) {
    if (op <= .003) return '';
    const br = 1 + .04 * Math.sin(t * 2.3), R = r * br, dash = `stroke-dasharray="${f(6 * r / ER)} ${f(5 * r / ER)}"`;
    let s = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R * (2.5 + 1.5 * warm))}" fill="url(#gf-warm)" opacity="${f(.14 + .34 * bright + .5 * warm)}"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R - 1)}" fill="#000" opacity=".88"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="none" stroke="#fff" stroke-width="3.2" ${dash} stroke-dashoffset="${f(-t * 3.2)}" opacity="${f(.2 + .3 * bright)}" filter="url(#un-soft)"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="none" stroke="#fff" stroke-width="1.4" ${dash} stroke-dashoffset="${f(-t * 3.2)}" opacity="${f(.65 + .35 * bright)}"/>`;
    if (warm > .003) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R * .55)}" fill="#fff6e0" opacity="${f(.35 * warm)}" filter="url(#un-soft)"/>`;
    if (cell > .003) s += GF.hex(x, y, 9.4 * r / ER, { op: .9 * cell, w: 1.2, fill: `rgba(255,255,255,${f(.22 * cell)})` }) + GF.hex(x, y, 9.4 * r / ER, { op: .5 * cell, w: 2.4, glow: true });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // раскоп: dig 0..1 — слои и комья; fly 0..1 — комья разлетаются; find 0..1 — находка проступает
  function pit(t, G, dig, flyT0, find, ringQ) {
    if (dig <= .003) return '';
    let s = '';
    G.strata.forEach((P, j) => { s += UN.polyline(P, { opacity: .62 - .08 * j, width: 1.3 }); });
    const D = [], DA = [];
    G.dirt.forEach((p, i) => {
      if (H(i * 19 + 4) < .35) { D.push(p); DA.push(.45); return; }   // часть комьев остаётся — земля
      const t0 = flyT0 + H(i * 7 + 2) * .8, u = clamp((t - t0) / .7);
      const vx = (H(i * 3 + 5) - .5) * 70, vy = -(50 + 60 * H(i * 11 + 1));
      D.push([p[0] + vx * u, p[1] + vy * u + 110 * u * u]); DA.push((1 - u) * (u > 0 ? 1 : .8));
    });
    s += GF.dots(D, { r: 1.7, op: 1, glow: .3, t, alpha: i => DA[i] });
    if (find > .003) s += GF.dots(G.fossil, { r: 1.55, op: find, glow: .7, t });
    if (ringQ > .003 && ringQ < 1) s += `<ellipse cx="${FOS[0]}" cy="${FOS[1]}" rx="${f(84 + 30 * ringQ)}" ry="${f(30 + 16 * ringQ)}" fill="none" stroke="#fff" stroke-width="1.4" opacity="${f(.75 * (1 - ringQ))}"/>`;
    return `<g opacity="${f(dig)}">${s}</g>`;
  }
  // имя мыслителя: «тейяр» — крупно в середине кадра (моно 26, на тёмной плашке), «священник» — вторая строка;
  // «раскапывал» — блок уезжает вверх в шапку (моно 18 / 12, y 40 / 63) и освобождает место раскопу
  function header(t, t1, t2, tUp) {
    if (t < t1) return '';
    const u = GF.q(t, t1, .7), up = GF.qq(t, tUp - .1, tUp + .45);
    const y1 = lerp(206, 40, up), y2 = lerp(236, 63, up), s1 = lerp(26, 18, up), s2 = lerp(15, 12, up), hw = lerp(128, 92, up);
    const plate = (1 - up) * GF.q(t, t1, .3);
    return (plate > .003 ? `<rect x="22" y="170" width="316" height="82" rx="8" fill="#000" opacity="${f(.88 * plate)}"/>` : '') +
      GF.typed(CX, y1, 'ТЕЙЯР ДЕ ШАРДЕН', t, t1, { size: s1, cps: 24, glow: true }) +
      `<line x1="${f(CX - hw * u)}" x2="${f(CX + hw * u)}" y1="${f(y1 + 8)}" y2="${f(y1 + 8)}" stroke="#fff" stroke-width="${f(lerp(1.2, .8, up))}" opacity=".55"/>` +
      GF.typed(CX, y2, '«СЕРДЦЕ МАТЕРИИ» · 1950', t, t2, { size: s2, cps: 30, op: .9 });
  }

  function cues(K) {
    const w = (stem, n = 0) => GF.w(K, ID, stem, n), we = (stem, n = 0) => GF.we(K, ID, stem, n);
    const T0 = GF.T(K, ID);
    const c = { T0, bud: w('будущ'), isk: w('искал'), tey: w('тейяр'), svy: w('священ'), rask: w('раскап'), drev: w('древн'),
      lyud: w('людей'), pis: w('писал'), boge: w('боге'), vper: w('вперед'), evo: w('эволюц'), idet: w('идет'), soz: w('сознан'),
      klet: w('клетк'), dum: w('думающ'), chel: w('человек'), kon: w('конце'), zh: w('ждет'), zhE: we('ждет'), god: w('бог', 2) };
    c.fish = (c.klet + c.dum) / 2;
    c.rot0 = T0 + .2; c.rot1 = T0 + 1.0;
    // ключи роста (времена строго по возрастанию даже без слов): ветви и ствол
    const tb = mono([c.evo, c.soz, c.klet, c.fish, c.dum, c.chel, c.kon, c.zhE + .1]);
    c.brK = [[tb[0], .02], [tb[1], .16], [tb[2], .30], [tb[3], .46], [tb[4], .50], [tb[5], .62], [tb[6], .86], [tb[7], 1]];
    c.trK = [[tb[0], .05], [tb[1], .40], [tb[2], .50], [tb[5], .76], [tb[6], .90], [tb[7], 1]];
    c.icon = { klet: tb[2], fish: tb[3], dum: tb[4], chel: tb[5] };
    return c;
  }

  function body(t, K) {
    const c = cues(K), G = geo();
    const conv = GF.qq(t, c.kon, c.zhE + .1);
    const g = front(t, c.brK), gT = front(t, c.trK);
    const gk = k => k <= 0 ? gT : g - .05 * H(k * 5 + 1) * (1 - conv);   // ветви растут вразнобой, ствол — впереди
    const wave = s => GF.q(t, c.zh + s * .6, .35);                         // «ждёт»: волна света снизу вверх
    let s = '';
    // раскоп (под древом): «раскапывал» — слои и комья, «древних» — находка, «людей» — кольцо; гаснет к «сознанию»
    const dig = GF.q(t, c.rask - .05, .35) * (1 - GF.qq(t, c.evo, c.soz));
    s += pit(t, G, dig, c.rask + .05, GF.qq(t, c.drev - .1, c.lyud + .1), GF.qq(t, c.lyud, c.lyud + .9));
    // ось-ствол (поворот линии), перо «писал», вспышка стрелки «впереди»
    const e = GF.qq(t, c.rot0, c.rot1);
    const pen = GF.qq(t, c.pis, Math.max(c.pis + .4, c.boge)), penDone = GF.q(t, c.boge + .3, .8);
    const tipFl = GF.q(t, c.vper, .25) * (1 - GF.q(t, c.vper + .3, .7));
    const fut = GF.q(t, c.bud, .3) * (1 - GF.q(t, c.isk + 1.2, .8)) + .6 * GF.q(t, c.boge, .4);
    s += axis(t, e, pen, penDone, tipFl, Math.min(1, fut));
    // древо: ствол и ветви до фронта
    let lines = '', tips = '';
    const P = [], A = [], R = [];
    const addPts = (pts, k, dim) => pts.forEach((p, i) => {
      const j = k * 61 + i;
      P.push([p[0] + .6 * Math.sin(t * 1.3 + j * 2.1), p[1] + .6 * Math.cos(t * 1.1 + j * 1.7)]);
      A.push((dim ? .55 : .8) + (dim ? .2 : .2) * wave(p[2]));
      R.push((dim ? 1.25 : 1.6 + .3 * H(j)) * (1 + .25 * wave(p[2])));
    });
    G.br.forEach((B, k) => {
      const gb = gk(k);
      if (gb <= BR[k].s0 + .003) return;
      const pts = upTo(B, gb);
      if (pts.length < 2) return;
      lines += UN.polyline(pts, { opacity: .55 + .3 * conv, width: k ? 1.5 : 2 });
      addPts(pts, k, false);
      if (gb < 1) { const tip = pts[pts.length - 1]; tips += `<circle cx="${f(tip[0])}" cy="${f(tip[1])}" r="2.6" opacity=".95"/>`; }
    });
    G.tw.forEach((W, k) => {
      const pts = upTo(W, gk(TW[k].p));
      if (pts.length < 2 || pts[pts.length - 1][2] <= TW[k].s0 + .002) return;
      lines += UN.polyline(pts, { opacity: .38, width: 1 });
      addPts(pts, 40 + k, true);
      if (pts.length === W.length) { const q = W[W.length - 1]; tips += ring(q[0], q[1], 2.2, .6, .9); }
    });
    s += lines + GF.dots(P, { r: 1, op: .95, glow: .6, t, alpha: i => A[i], size: i => R[i] });
    s += `<g fill="#fff"><g filter="url(#un-soft)">${tips}</g>${tips}</g>`;
    // «идёт»: огоньки бегут вверх по ветвям (только по выросшей части)
    const flow = GF.q(t, c.idet, .5);
    if (flow > .003) {
      let fl = '';
      G.br.forEach((B, k) => {
        for (let m = 0; m < 2; m++) {
          const u = ((t - c.idet) * .35 + H(k * 3 + m * 7 + 1)) % 1, sv = lerp(BR[k].s0, 1, u);
          if (sv > gk(k)) continue;
          const p = at(B, sv);
          fl += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(2.2 + .7 * Math.sin(t * 5 + k))}" opacity="${f(flow * (.6 + .4 * Math.sin(Math.PI * u)))}"/>`;
        }
      });
      s += `<g fill="#fff"><g filter="url(#un-soft)">${fl}</g>${fl}</g>`;
    }
    // «сознанию»: импульс от верхушки ствола по оси в вершину
    const imp = GF.qq(t, c.soz, c.soz + .6);
    if (imp > .003 && imp < 1) {
      const y0 = ys(front(c.soz, c.trK)), y = lerp(y0, APEX + CR, imp);
      s += `<circle cx="${CX}" cy="${f(y)}" r="9" fill="url(#gf-warm)" opacity=".95"/><circle cx="${CX}" cy="${f(y)}" r="3" fill="#fff"/>`;
    }
    // значки — крупно, по очереди, каждый со вспышкой-кольцом
    for (const ic of ICONS) {
      const t0 = c.icon[ic.key], a = GF.q(t, t0, .35);
      if (a <= .003) continue;
      const p = at(G.br[ic.k], ic.s), sc = ic.sz * (.55 + .45 * a) * (1 + .12 * GF.q(t, t0, .2) * (1 - GF.q(t, t0 + .2, .4)));
      const lw = wave(ic.s);
      s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(13 * sc)}" ry="${f(11 * sc)}" fill="#000" opacity="${f(.82 * a)}"/>`;
      s += GF.dots(ic.pts(p[0], p[1], sc), { r: 1.35, op: a, glow: .7 + .3 * lw, t });
      const fl = GF.qq(t, t0, t0 + .9);
      if (fl > .003 && fl < 1) s += ring(p[0], p[1], 12 * ic.sz + 16 * fl, .75 * (1 - fl), 1.2);
    }
    // вершина: контур едет на конце оси; «боге» — теплеет; «сознанию» — волна; «бог» — огонь порядка
    const ax = axisGeo(e), cp = ax.pt(UC * ax.L);
    const fire = GF.q(t, c.god, .5);
    const warm = .55 * GF.q(t, c.boge, .5) + .25 * conv;
    const bright = .3 * fut + .4 * GF.q(t, c.boge, .4) + .3 * conv;
    s += contour(t, cp[0], cp[1], lerp(ER, CR, e), 1 - fire, Math.min(1, bright), 1 - GF.qq(t, c.rot0, c.rot1 - .1), Math.min(1, warm));
    for (const [t0, d, R0] of [[c.isk, 0, 150], [c.isk, .35, 150], [c.isk, .7, 150], [c.vper, 0, 44], [c.soz + .6, 0, 44]]) {   // волны: «искали» ×3 (крупно), «впереди», «сознанию»
      const r = GF.qq(t, t0 + d, t0 + d + (R0 > 60 ? 1.5 : 1.1));
      if (r > .003 && r < 1) s += ring(CX, APEX, CR + 4 + R0 * r, .7 * (1 - r), 1.4);
    }
    s += GF.spark(CX, APEX, 11 * (.4 + .6 * fire), { t, op: fire });
    const burst = GF.q(t, c.god, 1.1) * (1 - GF.q(t, c.god + .6, .7));
    if (burst > .003) s += ring(CX, APEX, 18 + 50 * GF.q(t, c.god, 1.1), .7 * burst, 1.4);
    // подписи: «БОГ ВПЕРЕДИ» справа от вершины, шапка мыслителя
    s += GF.typed(CX + CR + 10, APEX + 6, 'БОГ ВПЕРЕДИ', t, c.boge, { size: 16, cps: 18, anchor: 'start', glow: true });
    s += header(t, c.tey, c.svy, c.rask);
    return s;
  }

  SCENES.gf_omega = GF.scene('gf_omega', (t, K, mode, p) => body(t, K, mode, p));
})();
