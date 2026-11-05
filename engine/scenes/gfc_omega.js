/* gfc_omega — «Бог ещё не создан», альтернативная версия «Цветная инфографика», часть 2 (eps/god_future_color_p2), фраза b03:
 * древо эволюции Тейяра де Шардена, v2. Перенос gf_omega.js v3 основной версии (те же события на тех же словах, та же
 * геометрия), словарь — gfc_00_lib.js (window.GFC), образец стиля — eps/god_future/qa/style_flatcolor.jpg.
 * Текст v15 (eps/god_future/source/text_v15.md): «Бога в будущем искали и до Курцвейла. Тейяр де Шарден — священник,
 * который раскапывал древних людей, — писал о «Боге Впереди»: эволюция идёт к сознанию — от клетки к думающему
 * человеку, — и в конце её ждёт Бог.»
 * v2 — по слепому просмотру v1 (eps/god_future/qa/blind_view_v1/summary.md, p2 Л1 к10–15 «дерево стоит 12–14 с» 3 из 3;
 * Г1 «всё мелкое» 6 из 6; на телефоне сцена ужата в .72): как в gf_omega v3 — древо на всю ширину сцены (x ≈ 28..332,
 * y 111..332), ствол — сама ось времени по центру; до «эволюция» древа нет, оно растёт ветка за веткой на «от клетки
 * к человеку»; значки в цветных кругах r 21–24; каждые 0,3–2 с — новое событие на слове.
 * В кадре: фон словаря; цветная линия времени gfc_line (полоса бирюза → золото, коралловая стрелка) поворачивается, как
 * стрелка часов, в вертикальную ось-ствол x=180 (ПРОШЛОЕ внизу, БУДУЩЕЕ вверху); пустой золотой пунктирный контур огня
 * едет на её конце в вершину (180, 111.3); внизу — раскоп на всю ширину (пласт земли тёплых тонов, яма, кремовые точки
 * находки); с «эволюция» по оси растёт золотой ствол, цветные ветви (левые — бирюза и небо, правые — коралл и фиалка)
 * растут снизу вверх и сходятся в вершину. Значки — белые плоские силуэты в цветных кругах: клетка (у корня), рыба
 * (внешняя левая ветвь), ящер (внешняя правая), человек (ствол под вершиной). Лиц, портретов и религиозных символов нет.
 *
 * Один режим — tree (b03); картинка — одна непрерывная линия от t и K. Слова фразы b03 (основы GFC.w — те же, что
 * в gf_omega; нет слова — начало фразы, без ошибки):
 *   начало фразы   шов с gfc_line/idea: та же полоса (y 280, x 24→336, 13 засечек), подписи y 304 и контур (296,280) r 30
 *                  с бирюзовой сотой; с T0+0,2 до T0+1,0 линия поворачивается в ось x=180 (y 338 → 78), контур едет
 *                  на ней в вершину и сжимается до r 16, сота в нём гаснет; подписи линии → подписи оси;
 *   «будущем»      подпись БУДУЩЕЕ у вершины светится;
 *   «искали»       три крупные золотые волны от контура на весь кадр (радиус до ≈ 170);
 *   «тейяр»        в середине кадра на тёмной плашке с золотой каймой крупно печатается «ТЕЙЯР ДЕ ШАРДЕН» (26);
 *                  «священник» — вторая строка «СЕРДЦЕ МАТЕРИИ» · 1950 (15, тёплая);
 *   «раскапывал»   блок имени уезжает вверх в шапку (18 / 12, y 40 / 63); внизу на всю ширину — пласт земли (неровная кромка, пласты, камешки), открывается
 *                  яма, комья разлетаются (часть остаётся); «древних» — в яме справа от ствола проступает лежащий человек
 *                  из кремовых точек (≈ 140 px); «людей» — золотое кольцо вокруг находки;
 *   «писал»        перо: золотая искра идёт по оси снизу в вершину, ось за ней светлеет;
 *   «боге»         справа от вершины печатается золотом «БОГ ВПЕРЕДИ» (16), вершина теплеет, ореол ярче; «впереди» —
 *                  вспышка стрелки над вершиной и волна;
 *   «эволюция»     раскоп гаснет (к «сознанию»); под стволом — площадка с корнями; по оси снизу растёт ствол, с ним —
 *                  нижние ветви, ветка за веткой;
 *   «идёт»         по ветвям вверх бегут цветные огоньки; «сознанию» — от верхушки ствола в вершину летит импульс, волна;
 *   «клетки»       у корня крупно — клетка (кольцо-вспышка); дальше рыба (между «клетки» и «думающему»),
 *                  «думающему» — ящер, «человеку» — человек на стволе; ветви растут дальше;
 *   «конце» → конец «ждёт»  ветви дорастают и сходятся в вершину, по ветвям снизу вверх бежит светлая полоса;
 *   «бог» (3-е, «Бог.»)     вершина вспыхивает огнём порядка GFC.spark r 11, золотое кольцо.
 * Вход: наплыв из p.prev (gfc_line/idea) делает GFC.scene; первая поза — та же линия и контур, что у gfc_line.
 * Выход: поза держится (древо горит, огонь дышит, огоньки бегут); огонь в вершине (180, 111.3) r 11, без наезда —
 * из этой точки gfc_lastq/ask опускает огонь в тёмный экран компьютера. Камера неподвижна (движение — рост и события).
 * Важное — y = 26..340, x = 14..346; подписи ≥ 12 (в зоне растут до 13,8).
 * Детерминизм: только t и K (случайность — GFC.hash).
 */
(() => {
  const ID = 'b03';                                       // фраза этой сцены (eps/god_future_p2/story.py, BEATS)
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GFC.hash(n);
  // линия gfc_line/idea (шов): y 280, x 24→336, контур (296,280) r 30, подписи y 304; поворачивается в ось x=CX, y AXB → AXT
  const LN = { y: 280, x0: 24, x1: 336 }, EX = 296, ER = 30, LAB = 12;
  const CX = 180, AXB = 338, AXT = 78;
  const UC = (EX - LN.x0) / (LN.x1 - LN.x0);              // доля контура на линии (.872): он едет вместе с концом линии
  const APEX = AXB - UC * (AXB - AXT);                    // ≈ 111.3 — точка схода древа = место контура на оси
  const BASE = 332, CR = 16;                              // корень древа, радиус контура в вершине
  const SPREAD = 1.6;                                     // ширина древа: внешние ветви доходят до x ≈ 28 и 332
  const ys = s => BASE - s * (BASE - APEX);
  const bump = u => u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * Math.pow(u, 1.2));
  // ветви (как в gf_omega): p — родитель, s0 — высота развилки (доля), a — отход от родителя в самом широком месте, px (× SPREAD)
  const BR = [
    { p: -1, s0: 0, a: 0 },                               // 0 ствол — ось времени, прямо к точке схода
    { p: 0, s0: .08, a: -60 }, { p: 0, s0: .12, a: 63 },
    { p: 1, s0: .24, a: -37 }, { p: 2, s0: .28, a: 35 },
    { p: 1, s0: .36, a: 25 }, { p: 2, s0: .40, a: -25 },
    { p: 0, s0: .46, a: -27 }, { p: 0, s0: .52, a: 29 },
    { p: 3, s0: .46, a: -17 }, { p: 4, s0: .50, a: 17 },
    { p: 5, s0: .58, a: 12 }, { p: 6, s0: .62, a: -12 },
  ];
  // цвет ветви — по роду: ствол золотой, левые внешние — бирюза, левые внутренние — небо, правые внутренние — фиалка,
  // правые внешние — коралл
  const TEAL = '#63e6d2', SKY = '#8ccbff', VIO = '#eba2ff', COR = '#ff9d8f', GOLD = '#ffd166', WARM = '#ffe6a8';
  const PAST = '#7ff0de', CELL = '#2fc9b6', CREAM = '#fff1d0';
  const BCOL = ['#ffd166', TEAL, COR, TEAL, COR, SKY, VIO, SKY, VIO, TEAL, COR, SKY, VIO];
  const bx = (k, s) => k <= 0 ? CX : bx(BR[k].p, s) + SPREAD * BR[k].a * bump((s - BR[k].s0) / (1 - BR[k].s0));
  // тупиковые веточки (вымершие): от ветви p на высоте s0, длина len (доля высоты), отход dx
  const TW = [
    { p: 1, s0: .20, len: .07, dx: -14 }, { p: 2, s0: .22, len: .08, dx: 16 }, { p: 3, s0: .36, len: .07, dx: -13 },
    { p: 4, s0: .40, len: .06, dx: 14 }, { p: 5, s0: .52, len: .07, dx: 13 }, { p: 6, s0: .56, len: .06, dx: -12 },
    { p: 9, s0: .66, len: .06, dx: -10 }, { p: 10, s0: .68, len: .06, dx: 10 }, { p: 0, s0: .30, len: .06, dx: 12 },
    { p: 7, s0: .64, len: .05, dx: -9 }, { p: 8, s0: .68, len: .05, dx: 9 },
  ];
  const DS = .02;
  // раскоп внизу на всю ширину: пласт земли, яма, комья, лежащий человек из точек (находка ≈ 140 px, справа от ствола)
  const PIT = { x0: 16, x1: 344, y0: 252, y1: 328 }, FOS = [262, 296];
  const EARTH = ['#d9a07a', '#b7795e', '#93604f'];
  const SOIL = ['#c98e63', '#ad7352', '#905c4d', '#734750', '#583752'];   // пласты сверху вниз: светлый суглинок → тёмный
  // кромка земли — неровная (не доска): верх волнистый, низ скруглён; пласты рисуются внутри неё (clipPath)
  const SOILD = (() => {
    let d = '';
    for (let x = PIT.x0; x <= PIT.x1; x += 8) d += `${d ? ' L' : 'M'}${f(x)} ${f(PIT.y0 + 2 + 2.4 * Math.sin(x * .09) + 1.5 * Math.sin(x * .23 + 1))}`;
    return d + ` L${PIT.x1} ${PIT.y1 - 12} Q${PIT.x1} ${PIT.y1} ${PIT.x1 - 12} ${PIT.y1} L${PIT.x0 + 12} ${PIT.y1} Q${PIT.x0} ${PIT.y1} ${PIT.x0} ${PIT.y1 - 12} Z`;
  })();
  const DEFS = `<defs><clipPath id="gfco-soil"><path d="${SOILD}"/></clipPath></defs>`;
  let GEO = null;                                         // неизменяемый кеш геометрии (строится при первой отрисовке)
  function geo() {
    if (GEO) return GEO;
    const br = BR.map((b, k) => { const P = []; for (let s = b.s0; s < 1 - 1e-6; s += DS) P.push([bx(k, s), ys(s), s]); P.push([CX, APEX, 1]); return P; });
    const tw = TW.map(w => { const P = []; for (let j = 0; j <= 4; j++) { const s = w.s0 + w.len * j / 4; P.push([bx(w.p, s) + SPREAD * w.dx * Math.pow(j / 4, .8), ys(s) - 2 * j / 4, s]); } return P; });
    const tint = BCOL.map(c => GFC.mixC(c, '#ffffff', .5));   // светлый тон ветви — бусины и бегущая полоса
    // находка: GFC.personPts лёжа (голова слева), ≈ 140 px
    const fossil = GFC.personPts(0, 0, 140, 280, 13).map(([x, y]) => [FOS[0] + y + 70, FOS[1] + x * .9]);
    const dirt = GFC.cloud(170, 17, [PIT.x0 + 6, PIT.y0 + 6, PIT.x1 - 6, PIT.y1 - 4]);
    const strata = [262, 280, 298, 316].map((y, j) => { const P = []; for (let x = PIT.x0 + 8; x <= PIT.x1 - 8; x += 5) P.push([x, y + 2.6 * Math.sin(x * .06 + j * 1.7)]); return P; });
    GEO = Object.freeze({ br, tw, tint, fossil, dirt, strata });
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
  const pathD = P => 'M' + P.map(p => `${f(p[0])} ${f(p[1])}`).join(' L');
  const stroke = (P, col, w, op, extra = '') => op <= .003 || P.length < 2 ? '' :
    `<path d="${pathD(P)}" fill="none" stroke="${col}" stroke-width="${f(w)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f(op)}"${extra}/>`;
  const ring = (x, y, r, op, col = '#fff', w = .9, extra = '') => op <= .003 ? '' :
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${col}" stroke-width="${f(w)}" opacity="${f(op)}"${extra}/>`;

  /* значки — белые плоские силуэты в цветном круге (как в пробе gfx_flatcolor), рисуются вокруг (0,0) для круга r 16 */
  const WF = 'fill="#fff"';
  const ICONS_SVG = {
    cell: `<circle r="8.5" fill="none" stroke="#fff" stroke-width="1.9"/><circle cx="1.6" cy="-1.2" r="3.3" ${WF}/>` +
      `<circle cx="-3.6" cy="3.2" r="1.2" ${WF} opacity=".85"/><circle cx="-2.4" cy="-4.4" r=".9" ${WF} opacity=".85"/>`,
    fish: `<path d="M9 0 C5.5 -5.4 -2.5 -5.6 -6 0 C-2.5 5.6 5.5 5.4 9 0 Z" ${WF}/><path d="M-5 0 L-11.5 -5.4 L-9.6 0 L-11.5 5.4 Z" ${WF}/>` +
      `<path d="M-.5 -4.4 L3 -7.6 L4.2 -3.8 Z" ${WF}/>`,
    lizard: `<g transform="rotate(28)"><ellipse cx="0" cy="-8.4" rx="2.7" ry="3.3" ${WF}/><ellipse cx="0" cy="-1.4" rx="3.2" ry="5.6" ${WF}/>` +
      `<path d="M0 3.5 C.4 7.5 4.2 8.6 4.6 12.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M-2.4 -4.4 L-6 -6 L-7 -9 M2.4 -4.4 L6 -6 L7 -9 M-2.4 1.8 L-6 3.8 L-6.6 7 M2.4 1.8 L6 3.8 L6.6 7" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    human: `<circle cx="0" cy="-6.4" r="3.5" ${WF}/><path d="M-5.2 7.5 L-4.4 -.6 C-4.1 -2.2 -2.6 -2.8 0 -2.8 C2.6 -2.8 4.1 -2.2 4.4 -.6 L5.2 7.5 Z" ${WF}/>`,
  };
  const ICONS = [                                        // ветвь k, высота s, рисунок, цвет круга (GFC.PAL), радиус, ключ времени
    { k: 0, s: .07, svg: 'cell', col: 1, R: 21, key: 'klet' },     // клетка у корня — «клетки»
    { k: 3, s: .38, svg: 'fish', col: 2, R: 24, key: 'fish' },     // рыба — внешняя левая ветвь, между «клетки» и «думающему»
    { k: 4, s: .42, svg: 'lizard', col: 0, R: 24, key: 'dum' },    // ящер — внешняя правая ветвь, «думающему»
    { k: 0, s: .70, svg: 'human', col: 3, R: 24, key: 'chel' },    // человек — ствол под вершиной, «человеку»
  ];

  /* ось: e 0..1 — полоса gfc_line (горизонталь) поворачивается, как стрелка часов, в вертикаль x=CX; pen 0..1 — перо по оси;
   * dim 0..1 — полоса притухает под золотым стволом */
  function axisGeo(e) {
    const cx = lerp((LN.x0 + LN.x1) / 2, CX, e), cy = lerp(LN.y, (AXB + AXT) / 2, e);
    const L = lerp(LN.x1 - LN.x0, AXB - AXT, e), ang = -Math.PI / 2 * e;
    const d = [Math.cos(ang), Math.sin(ang)], n = [-d[1], d[0]];
    const A = [cx - d[0] * L / 2, cy - d[1] * L / 2];
    const pt = (k, m = 0) => [A[0] + d[0] * k + n[0] * m, A[1] + d[1] * k + n[1] * m];
    return { cx, cy, A, L, d, n, pt };
  }
  function axis(t, e, pen, penDone, tipFl, futQ, dim) {
    const G = axisGeo(e), L = G.L, hl = 11, bw = L - hl + 3, x0 = -L / 2;
    // полоса — как tline gfc_line, в своей системе координат (центр в 0,0), повёрнута на −90°·e
    let bar = `<rect x="${f(x0 - 1)}" y="1" width="${f(bw)}" height="4.4" rx="2.2" fill="${GFC.INK}" opacity=".45"/>` +
      `<rect x="${f(x0 - 1)}" y="-2.2" width="${f(bw)}" height="4.4" rx="2.2" fill="url(#gfc-time)"/>` +
      `<path d="M${f(L / 2)} 0 L${f(L / 2 - hl)} -6 L${f(L / 2 - hl)} 6 Z" fill="#ff8a6b" stroke="#ff8a6b" stroke-width="${f(1.6 + 1.4 * tipFl)}" stroke-linejoin="round"/>`;
    for (let i = 0; i <= 12; i++) {
      const x = lerp(x0 + 6, L / 2 - 18, i / 12);
      bar += `<line x1="${f(x)}" x2="${f(x)}" y1="4.5" y2="${i % 6 ? 7.5 : 10}" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".5"/>`;
    }
    let s = `<g opacity="${f(1 - .45 * dim)}" transform="translate(${f(G.cx)} ${f(G.cy)}) rotate(${f(-90 * e)})">${bar}</g>`;
    const B = G.pt(L);
    if (tipFl > .003) s += `<circle cx="${f(B[0])}" cy="${f(B[1])}" r="${f(8 + 14 * tipFl)}" fill="url(#gfc-halo)" opacity="${f(tipFl)}"/>`;
    // перо («писал»): золотая искра идёт снизу в вершину, за ней ось светлеет и остаётся светлее
    if (pen > .003) {
      const k1 = UC * L * pen, a = G.pt(0), h = G.pt(k1);
      s += `<path d="M${f(a[0])} ${f(a[1])} L${f(h[0])} ${f(h[1])}" stroke="${WARM}" stroke-width="5" opacity="${f(.4 * (1 - .5 * penDone))}" stroke-linecap="round" filter="url(#gfc-soft)"/>` +
        `<path d="M${f(a[0])} ${f(a[1])} L${f(h[0])} ${f(h[1])}" stroke="#fff6dc" stroke-width="2.2" opacity="${f(.9 - .4 * penDone)}" stroke-linecap="round"/>`;
      if (pen < .999) s += `<circle cx="${f(h[0])}" cy="${f(h[1])}" r="9" fill="url(#gfc-halo)"/><circle cx="${f(h[0])}" cy="${f(h[1])}" r="4.2" fill="${GOLD}"/><circle cx="${f(h[0])}" cy="${f(h[1])}" r="2" fill="#fff"/>`;
    }
    // подписи линии (как tlabels gfc_line: y 304, кегль 10) гаснут, подписи оси (слева от вершины и корня) проступают
    const lo = 1 - clamp(e * 2), ao = clamp(e * 2 - 1);
    if (lo > .003) s += GFC.mono(LN.x0, LN.y + 24, 'ПРОШЛОЕ', { size: 10, ls: .06, anchor: 'start', opacity: .96 * lo, color: PAST }) +
      GFC.mono(EX - ER - 3, LN.y + 24, 'БУДУЩЕЕ', { size: 10, ls: .06, anchor: 'end', opacity: .96 * lo, color: GFC.ACC });
    if (ao > .003) s += GFC.mono(CX - CR - 10, APEX + 5, 'БУДУЩЕЕ', { size: LAB, ls: .06, anchor: 'end', opacity: (.75 + .25 * futQ) * ao, color: GFC.ACC, glow: futQ > .3 }) +
      GFC.mono(CX - 34, BASE + 5, 'ПРОШЛОЕ', { size: LAB, ls: .06, anchor: 'end', opacity: .9 * ao, color: PAST });   // левее клетки у корня
    return s;
  }
  // пустой золотой пунктирный контур огня — как contour в gfc_line (тёмный внутри, пунктир тёплым по золотому свечению,
  // в центре бирюзовая сота): bright 0..1, cell — сота, e — доля поворота (пунктир мельчает), warm — тепло внутри
  function contour(t, x, y, r, op, bright, cell, e, warm) {
    if (op <= .003) return '';
    const R = r * (1 + .04 * Math.sin(t * 2.3)), k = r / ER;
    const dash = `stroke-dasharray="${f(lerp(6, 3.6, e))} ${f(lerp(5, 3, e))}" stroke-dashoffset="${f(-t * 3.2)}"`;
    let s = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R * lerp(2.5, 3.6, e))}" fill="url(#gfc-halo)" opacity="${f(.12 + .4 * bright + .4 * warm)}"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R - 1)}" fill="${GFC.INK}" opacity="${f(lerp(.9, .6, e))}"/>`;
    s += ring(x, y, R, .2 + .4 * bright, GFC.SUN, lerp(3.4, 3, e), ` ${dash} filter="url(#gfc-soft)"`);
    s += ring(x, y, R, .7 + .3 * bright, WARM, lerp(1.5, 1.6, e), ` stroke-linecap="round" ${dash}`);
    if (warm > .003) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R * .6)}" fill="#ffe8b0" opacity="${f(.45 * warm)}" filter="url(#gfc-soft)"/>`;
    if (cell > .003) s += GFC.hex(x, y, 8.4 * Math.max(k, .6), { op: .45 * cell, w: 3, color: CELL, glow: true }) +
      GFC.hex(x, y, 8.4 * Math.max(k, .6), { op: cell, w: .7, color: 'rgba(255,255,255,.55)', fill: CELL });
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // раскоп: dig 0..1 — пласт земли; hole — яма открывается, комья разлетаются с flyT0; find — находка; ringQ — кольцо
  function pit(t, G, dig, flyT0, find, ringQ) {
    if (dig <= .003) return '';
    const hole = GFC.q(t, flyT0, .6);
    let s = `<path d="${SOILD}" transform="translate(2 5)" fill="${GFC.INK}" opacity=".5" filter="url(#gfc-soft)"/>`;
    // пласты: каждый следующий — от своей волнистой линии вниз, темнее; камешки — светлые овалы
    let L = `<rect x="${PIT.x0}" y="${PIT.y0 - 6}" width="${PIT.x1 - PIT.x0}" height="${PIT.y1 - PIT.y0 + 8}" fill="${SOIL[0]}"/>`;
    G.strata.forEach((P, j) => { L += `<path d="M${P.map(p => `${f(p[0] - (p === P[0] ? 12 : 0))} ${f(p[1])}`).join(' L')} L${PIT.x1 + 4} ${f(P[P.length - 1][1])} L${PIT.x1 + 4} ${PIT.y1 + 4} L${PIT.x0 - 4} ${PIT.y1 + 4} Z" fill="${SOIL[j + 1]}"/>`; });
    G.strata.forEach((P, j) => { L += GFC.polyline(P, { opacity: .45 - .06 * j, width: 1.3, color: '#f3c79c' }); });
    for (let i = 0; i < 22; i++) {
      const x = lerp(PIT.x0 + 10, PIT.x1 - 10, H(i * 5.3 + 2)), y = lerp(PIT.y0 + 8, PIT.y1 - 6, H(i * 3.1 + 7)), r = 1.6 + 2.2 * H(i * 2.7 + 1);
      L += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 1.4)}" ry="${f(r)}" fill="#e9c2a0" opacity="${f(.35 + .25 * H(i))}"/>`;
    }
    s += `<g clip-path="url(#gfco-soil)">${L}<rect x="${PIT.x0}" y="${PIT.y0 - 6}" width="${PIT.x1 - PIT.x0}" height="${PIT.y1 - PIT.y0 + 8}" fill="url(#gfc-shade)"/></g>`;
    s += `<path d="${SOILD.split(' L' + PIT.x1)[0]}" fill="none" stroke="#f6d2a8" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>`;
    // яма вокруг находки: тёмная, с тёплым краем
    if (hole > .003) s += `<ellipse cx="${FOS[0]}" cy="${FOS[1]}" rx="${f(82 * hole)}" ry="${f(26 * hole)}" fill="#2b1440" opacity=".9"/>` +
      `<ellipse cx="${FOS[0]}" cy="${FOS[1]}" rx="${f(82 * hole)}" ry="${f(26 * hole)}" fill="none" stroke="#f0c49a" stroke-width="1.2" opacity="${f(.55 * hole)}"/>`;
    const D = [], DA = [];
    G.dirt.forEach((p, i) => {
      if (H(i * 19 + 4) < .35) { D.push(p); DA.push(.5); return; }   // часть комьев остаётся — земля
      const t0 = flyT0 + H(i * 7 + 2) * .8, u = clamp((t - t0) / .7);
      const vx = (H(i * 3 + 5) - .5) * 70, vy = -(50 + 60 * H(i * 11 + 1));
      D.push([p[0] + vx * u, p[1] + vy * u + 110 * u * u]); DA.push((1 - u) * (u > 0 ? 1 : .85));
    });
    s += GFC.dots(D, { r: 2, op: 1, glow: .25, t, alpha: i => DA[i], color: EARTH });
    if (find > .003) s += GFC.dots(G.fossil, { r: 1.7, op: find, glow: .9, t, color: CREAM });
    if (ringQ > .003 && ringQ < 1) s += `<ellipse cx="${FOS[0]}" cy="${FOS[1]}" rx="${f(86 + 32 * ringQ)}" ry="${f(30 + 18 * ringQ)}" fill="none" stroke="${GOLD}" stroke-width="1.6" opacity="${f(.85 * (1 - ringQ))}"/>`;
    return `<g opacity="${f(dig)}">${s}</g>`;
  }
  // площадка и корни под стволом (проба: холм и корни)
  function roots(op) {
    if (op <= .003) return '';
    let s = GFC.ground(CX, BASE + 5, 96, 13, { op: .95 });
    for (const [dx, y] of [[-36, 340], [-16, 343], [16, 343], [36, 340]])
      s += `<path d="M${CX} ${BASE + 1} Q${f(CX + dx * .4)} ${f(y - 7)} ${f(CX + dx)} ${f(y)}" fill="none" stroke="#8a6ae0" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // имя мыслителя: «тейяр» — крупно в середине кадра (26, на тёмной плашке с золотой каймой), «священник» — вторая строка;
  // «раскапывал» — блок уезжает вверх в шапку (18 / 12, y 40 / 63) и освобождает место раскопу
  function header(t, t1, t2, tUp) {
    if (t < t1) return '';
    const u = GFC.q(t, t1, .7), up = GFC.qq(t, tUp - .1, tUp + .45);
    const y1 = lerp(206, 40, up), y2 = lerp(236, 63, up), s1 = lerp(26, 18, up), s2 = lerp(15, 12, up), hw = lerp(140, 100, up);
    const plate = (1 - GFC.q(t, tUp - .1, .22)) * GFC.q(t, t1, .3);   // плашка гаснет сразу, текст уезжает вверх
    let s = '';
    if (plate > .003) s += `<rect x="20" y="174" width="320" height="82" rx="16" fill="${GFC.INK}" opacity="${f(.5 * plate)}" filter="url(#gfc-soft)"/>` +
      `<rect x="18" y="170" width="324" height="82" rx="16" fill="#1a0e4a" opacity="${f(.92 * plate)}"/>` +
      `<rect x="18" y="170" width="324" height="82" rx="16" fill="none" stroke="${GOLD}" stroke-width="1.1" opacity="${f(.6 * plate)}"/>`;
    s += GFC.typed(CX, y1, 'ТЕЙЯР ДЕ ШАРДЕН', t, t1, { size: s1, cps: 24, glow: true, ls: .03 });
    s += `<rect x="${f(CX - hw * u)}" y="${f(y1 + lerp(8, 6, up))}" width="${f(2 * hw * u)}" height="1.4" rx=".7" fill="url(#gfc-uline)"/>`;
    s += GFC.typed(CX, y2, '«СЕРДЦЕ МАТЕРИИ» · 1950', t, t2, { size: s2, cps: 30, op: .95, color: WARM, ls: .04 });
    return s;
  }

  function cues(K) {
    const w = (stem, n = 0) => GFC.w(K, ID, stem, n), we = (stem, n = 0) => GFC.we(K, ID, stem, n);
    const T0 = GFC.T(K, ID);
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
    const conv = GFC.qq(t, c.kon, c.zhE + .1);
    const g = front(t, c.brK), gT = front(t, c.trK);
    const gk = k => k <= 0 ? gT : g - .05 * H(k * 5 + 1) * (1 - conv);   // ветви растут вразнобой, ствол — впереди
    const wave = s => GFC.q(t, c.zh + s * .6, .35);                         // «ждёт»: волна света снизу вверх
    const named = GFC.q(t, c.boge, .4), fire = GFC.q(t, c.god, .5);
    const lit = .35 * GFC.q(t, c.soz, 1) + .65 * conv;
    let s = DEFS;
    // свечение вокруг вершины (проба: розово-фиолетовый ореол и тонкие кольца) — ярче с «Боге», «конце» и «Бог»
    s += `<circle cx="${CX}" cy="${f(APEX)}" r="150" fill="url(#gfc-glowP)" opacity="${f(GFC.clamp(.15 + .35 * named + .2 * conv + .3 * fire))}"/>`;
    [44, 76, 110].forEach((r, i) => { s += ring(CX, APEX, r, (.05 + .025 * Math.sin(t * 2 + i)) * (.3 + .7 * named), '#fff', 1); });
    // раскоп (под древом): «раскапывал» — пласт, яма и комья, «древних» — находка, «людей» — кольцо; гаснет к «сознанию»
    const dig = GFC.q(t, c.rask - .05, .35) * (1 - GFC.qq(t, c.evo, c.soz));
    s += pit(t, G, dig, c.rask + .05, GFC.qq(t, c.drev - .1, c.lyud + .1), GFC.qq(t, c.lyud, c.lyud + .9));
    s += roots(GFC.q(t, c.evo - .1, .6));
    // ось-ствол (поворот линии), перо «писал», вспышка стрелки «впереди»
    const e = GFC.qq(t, c.rot0, c.rot1);
    const pen = GFC.qq(t, c.pis, Math.max(c.pis + .4, c.boge)), penDone = GFC.q(t, c.boge + .3, .8);
    const tipFl = GFC.q(t, c.vper, .25) * (1 - GFC.q(t, c.vper + .3, .7));
    const fut = GFC.q(t, c.bud, .3) * (1 - GFC.q(t, c.isk + 1.2, .8)) + .6 * named;
    s += axis(t, e, pen, penDone, tipFl, Math.min(1, fut), GFC.q(t, c.evo, .8));

    // древо: тень, свечение, цветная линия, светлая полоса волны «ждёт»; бусины; бутоны на растущих концах
    let shad = '', glow = '', main = '', hi = '', tips = '';
    const BP = [], BA = [], BC = [], BS = [];
    const sLit = (t - c.zh) / .6;                         // фронт волны «ждёт» (доля высоты)
    G.br.forEach((B, k) => {
      const gb = gk(k);
      if (gb <= BR[k].s0 + .003) return;
      const pts = upTo(B, gb);
      if (pts.length < 2) return;
      const col = BCOL[k], wd = k ? 2.8 : 3.8;
      shad += stroke(pts, GFC.INK, wd + 1.4, 1);
      glow += stroke(pts, col, wd + 6, .14 + .12 * lit);
      main += stroke(pts, col, wd, .82 + .18 * lit);
      if (sLit > BR[k].s0) hi += stroke(upTo(B, Math.min(gb, sLit)), G.tint[k], wd * .55, .9 * (1 - .4 * GFC.q(t, c.zh + 1.2, 1.2)));
      pts.forEach((p, i) => {
        if (i % 3 || i === pts.length - 1) return;
        const j = k * 61 + i;
        BP.push([p[0] + .5 * Math.sin(t * 1.3 + j * 2.1), p[1] + .5 * Math.cos(t * 1.1 + j * 1.7)]);
        BA.push(.4 + .6 * wave(p[2])); BC.push(G.tint[k]); BS.push((k ? 1.25 : 1.45) * (1 + .3 * wave(p[2])));
      });
      if (gb < 1) { const tp = pts[pts.length - 1]; tips += `<circle cx="${f(tp[0])}" cy="${f(tp[1])}" r="6" fill="${col}" opacity=".35"/><circle cx="${f(tp[0])}" cy="${f(tp[1])}" r="3.4" fill="${col}"/><circle cx="${f(tp[0])}" cy="${f(tp[1])}" r="1.5" fill="#fff"/>`; }
    });
    // тупиковые веточки (вымершие): тоньше, на конце — пустое кольцо
    let tw = '';
    G.tw.forEach((Wp, k) => {
      const pts = upTo(Wp, gk(TW[k].p));
      if (pts.length < 2 || pts[pts.length - 1][2] <= TW[k].s0 + .002) return;
      const col = BCOL[TW[k].p];
      shad += stroke(pts, GFC.INK, 2.8, 1);
      tw += stroke(pts, col, 1.7, .65 + .25 * lit);
      if (pts.length === Wp.length) { const q = Wp[Wp.length - 1]; tw += `<circle cx="${f(q[0])}" cy="${f(q[1])}" r="2.6" fill="${GFC.INK}" stroke="${col}" stroke-width="1.4" opacity=".95"/>`; }
    });
    s += `<g transform="translate(.8 1.8)" opacity=".34">${shad}</g>` + `<g filter="url(#gfc-soft)">${glow}</g>` + tw + main;
    if (hi) s += `<g filter="url(#gfc-soft)" opacity=".8">${hi}</g>${hi}`;
    s += GFC.dots(BP, { r: 1, op: .95, glow: .5, t, alpha: i => BA[i], size: i => BS[i], color: i => BC[i] });
    s += tips;
    // «идёт»: цветные огоньки бегут вверх по ветвям (только по выросшей части)
    const flow = GFC.q(t, c.idet, .5);
    if (flow > .003) {
      let fl = '';
      G.br.forEach((B, k) => {
        for (let m = 0; m < 2; m++) {
          const u = ((t - c.idet) * .35 + H(k * 3 + m * 7 + 1)) % 1, sv = lerp(BR[k].s0, 1, u);
          if (sv > gk(k) || t < c.idet) continue;
          const p = at(B, sv), a = flow * (.6 + .4 * Math.sin(Math.PI * u));
          fl += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="5.4" fill="${BCOL[k]}" opacity="${f(.4 * a)}"/>` +
            `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(2.1 + .5 * Math.sin(t * 5 + k))}" fill="#fff" opacity="${f(a)}"/>`;
        }
      });
      s += fl;
    }
    // «сознанию»: импульс от верхушки ствола по оси в вершину
    const imp = GFC.qq(t, c.soz, c.soz + .6);
    if (imp > .003 && imp < 1) {
      const y = lerp(ys(front(c.soz, c.trK)), APEX + CR, imp);
      s += `<circle cx="${CX}" cy="${f(y)}" r="12" fill="url(#gfc-halo)"/><circle cx="${CX}" cy="${f(y)}" r="4.6" fill="${GOLD}"/><circle cx="${CX}" cy="${f(y)}" r="2.2" fill="#fff"/>`;
    }
    // значки — крупно, по очереди, каждый со вспышкой-кольцом
    for (const ic of ICONS) {
      const t0 = c.icon[ic.key], a = GFC.q(t, t0, .35);
      if (a <= .003) continue;
      const p = at(G.br[ic.k], ic.s), lw = wave(ic.s);
      const sc = (.55 + .45 * a) * (1 + .12 * GFC.q(t, t0, .2) * (1 - GFC.q(t, t0 + .2, .4))), R = ic.R, pal = GFC.PAL[ic.col];
      const y = p[1] + 1.1 * Math.sin(t * 2.1 + ic.s * 9);
      s += `<ellipse cx="${f(p[0] + 1.5)}" cy="${f(y + R * sc + 3)}" rx="${f(R * .85 * sc)}" ry="${f(R * .24 * sc)}" fill="${GFC.INK}" opacity="${f(.5 * a)}" filter="url(#gfc-soft)"/>`;
      s += `<g opacity="${f(a)}" transform="translate(${f(p[0])} ${f(y)}) scale(${f(sc)})">` +
        `<circle r="${R + 5}" fill="${pal[0]}" opacity="${f(.16 + .24 * lw)}" filter="url(#gfc-soft)"/>` +
        `<circle r="${R}" fill="url(#gfc-p${ic.col})"/><circle r="${R}" fill="url(#gfc-shade)"/>` +
        `<circle r="${R}" fill="none" stroke="#fff" stroke-width="1.5" opacity="${f(.6 + .35 * lw)}"/>` +
        `<g transform="scale(${f(R / 16)})">${ICONS_SVG[ic.svg]}</g></g>`;
      const fl = GFC.qq(t, t0, t0 + .9);
      if (fl > .003 && fl < 1) s += ring(p[0], y, R + 4 + 18 * fl, .8 * (1 - fl), pal[0], 1.5);
    }
    // вершина: контур едет на конце оси; «боге» — теплеет; «бог» — огонь порядка
    const ax = axisGeo(e), cp = ax.pt(UC * ax.L);
    const warm = .55 * GFC.q(t, c.boge, .5) + .25 * conv;
    const bright = .3 * fut + .4 * GFC.q(t, c.boge, .4) + .3 * conv;
    s += contour(t, cp[0], cp[1], lerp(ER, CR, e), 1 - fire, Math.min(1, bright), 1 - GFC.qq(t, c.rot0, c.rot1 - .1), e, Math.min(1, warm));
    for (const [t0, d, R0] of [[c.isk, 0, 150], [c.isk, .35, 150], [c.isk, .7, 150], [c.vper, 0, 44], [c.soz + .6, 0, 44]]) {   // волны: «искали» ×3 (крупно), «впереди», «сознанию»
      const r = GFC.qq(t, t0 + d, t0 + d + (R0 > 60 ? 1.5 : 1.1));
      if (r > .003 && r < 1) s += ring(cp[0], cp[1], CR + 4 + R0 * r, .75 * (1 - r), GOLD, 1.6);
    }
    s += GFC.spark(CX, APEX, 11 * (.4 + .6 * fire), { t, op: fire });
    const burst = GFC.q(t, c.god, 1.1) * (1 - GFC.q(t, c.god + .6, .7));
    if (burst > .003) s += ring(CX, APEX, 18 + 50 * GFC.q(t, c.god, 1.1), .75 * burst, GFC.ACC, 1.6);
    // подписи: «БОГ ВПЕРЕДИ» справа от вершины, шапка мыслителя
    s += GFC.typed(CX + CR + 10, APEX + 6, 'БОГ ВПЕРЕДИ', t, c.boge, { size: 16, cps: 18, anchor: 'start', glow: true, color: GFC.ACC, ls: .03 });
    s += header(t, c.tey, c.svy, c.rask);
    return s;
  }

  SCENES.gfc_omega = GFC.scene('gfc_omega', (t, K, mode, p) => body(t, K, mode, p));
})();
