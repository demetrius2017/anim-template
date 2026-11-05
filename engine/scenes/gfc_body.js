/* gfc_body — «Бог ещё не создан», альтернативная версия «Цветная инфографика» (eps/god_future_color_p1), фразы a03
 * (gather) и a04 (pay). v2, 05.11: перенос второго прохода основной версии engine/scenes/gf_body.js v3 (слепой просмотр
 * v1, eps/god_future/qa/blind_view_v1/summary.md — Л1 к11–17): человек на всю высоту, над головой на «Ответ» — тот же
 * огонь с лучами, что в первом кадре; узнаваемое крупное яблоко; два потока (еда внутрь слева, рыжее тепло наружу
 * вправо и вверх); на середине цитаты Шрёдингера — смена плана на соты груди; подписи ≥ 16. Словарь — gfc_00_lib.js
 * (window.GFC). Лиц, портретов нет; красного нет (яблоко зелёное, тепло рыжее).
 * Человек — плоская фигура GFC.person (сирень, раскладка: подошвы 180,330, рост 258) + 676 цветных точек тумана gfc_tea,
 * которые собираются в его силуэт; в груди — золотые соты-клетки (GFC.comb, r 8,4, только ячейки внутри туники; точки
 * груди садятся на их вершины). На экран его ставит своя камера: обычный план ×1,22, подошвы на y=344 (макушка y≈29) —
 * на телефоне сцена ужата в .72, поэтому человек на всю высоту.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (gather и pay рисует одно
 * тело), шва между режимами нет. Все события — от слов: GFC.w(K, id, основа); секунд нет. Нет слова — запасное время.
 *
 *  gather (a03) Вход наплывом 0,5 с из gfc_tea/cool (GFC.scene). Начало — тот же цветной туман, что в конце gfc_tea
 *               (SCENES.gfc_tea.fog.pts(t, K): те же места, цвета и мягкие края), поэтому наплыв без скачка. С начала
 *               фразы туман собирается в силуэт (GFC.morph, к «клеток»), точки меняют цвет на сиреневый, к «клеток»
 *               проявляется плоская фигура. «клеток» — наезд на грудь (×1,6, макушка в кадре), проступают соты;
 *               «точн» — тёплые точки груди садятся на вершины сот; «порядк» — плитки вырастают и светятся золотом;
 *               «почему» — обратно к человеку целиком; «рассыпаеш» — фигура бледнеет, края осыпаются цветными точками
 *               и возвращаются; «ответ» — отъезд (×0,84), над головой вспыхивает тот же огонь с лучами, что в первом
 *               кадре (SCENES.gfc_tea.fire, 180,62, r 14); «приведет» — от макушки к огню растёт тёплая нить;
 *               «богам» — огонь вспыхивает, лучи вытягиваются, по нити бегут огоньки.
 *  pay (a04)    Два потока сразу: слева яблоко → яркие точки в живот; справа и сверху от тела — рыжее тепло наружу.
 *               «плат» — огонь гаснет, камера снова к человеку крупно, слева крупное зелёное яблоко (r 38);
 *               «порядок» — под ним ПОРЯДОК (16, бирюзой), яблоко вспыхивает; «береш» — яблоко подаётся к телу;
 *               «еды» — яблоко тает струёй ярких точек в живот (струя идёт до «организм»), соты вспыхивают;
 *               «беспоряд» — от тела (правый бок, плечи и голова) вылетают первые рыжие точки, справа вверху
 *               БЕСПОРЯДОК; «отдаеш»/«наруж» — рыжих точек вдвое, потом втрое, они уходят вправо и вверх; «тепл» —
 *               рыжий ореол вокруг тела, фигура теплеет, под БЕСПОРЯДОК — рыжее ТЕПЛО; «физик»/«эрвин»/«шредингер»/
 *               «так» — слева вверху на плашке по строкам ЭРВИН · ШРЁДИНГЕР · 1944 (золотая черта над ними);
 *               «организ» — по телу снизу вверх бежит полоса света; «пита» — СМЕНА ПЛАНА на середине цитаты: наезд на
 *               соты груди (×2,5), слева в каждую соту по очереди влетают точки и она вспыхивает (кормится);
 *               ПОРЯДОК/БЕСПОРЯДОК/ТЕПЛО и яблоко гаснут; «отрицат» — справа вверху на плашке −ЭНТРОПИЯ (18, золотом);
 *               «прощ» — под ней = ПОРЯДОК (бирюзой); «порядком» — все соты вспыхивают и остаются яркими, подписи и тепло
 *               гаснут, отъезд к раскладке (×1, подошвы 180,330) к началу a05.
 *  Выход: к началу a05 камера ×1 — человек ровно как ждёт gfc_crowd (подошвы 180,330, рост 258). Сам человек (фигура +
 *  соты + точки) — SCENES.gfc_body.man.svg(t, K) ({svg, foot: [180,330], h: 258, color: 'violet'}): его рисует
 *  gfc_crowd на входе, поэтому силуэт в наплыве не меняется.
 * Слова (сверены с K.words озвучки v14, 05.11; текст a03–a04 в v15 тот же): a03 — клеток, точн, порядк, почему,
 *   рассыпаеш, ответ, приведет, богам; a04 — плат, порядок, береш, еды, беспоряд, отдаеш, наруж, тепл, физик, эрвин,
 *   шредингер, так, организ, пита, отрицат, прощ, порядком.
 * Кадр: всё важное в y=22..345, подписи ≥ 16. Пик ≈ 3 тыс. элементов.
 * Проверка: eps/god_future_color_p1/qa/gfc_body_v2*.jpg (станция tesla, render.py --at … --sheet).
 * Параметры p: s, mode, K (cues.json), prev/prev_mode — их разбирает GFC.scene.
 */
(() => {
  const TAU = Math.PI * 2;
  const f = v => Number(v).toFixed(2);
  const H = n => GFC.hash(n);
  const frac = x => x - Math.floor(x);
  const lerp = (a, b, k) => a + (b - a) * k;
  const clamp = x => Math.max(0, Math.min(1, x));
  const pulse = (t, a, up, down) => GFC.qq(t, a, a + up) * (1 - GFC.qq(t, a + up, a + up + down));
  const bez = (a, b, c, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * b[0] + u * u * c[0], v * v * a[1] + 2 * v * u * b[1] + u * u * c[1]]; };
  const INK = GFC.INK, ACC = GFC.ACC;
  const cache = {};
  const PCX = 180, GY = 330, PHT = 258, S = PHT / 95.5;
  const APPLE = { x: 58, y: 206, r: 38 }, FIRE = [180, 62], FIRE_R = 14;
  const MANC = 3, MAN_LIGHT = GFC.PAL[MANC][0];                            // сирень
  const COMB = { cx: 180, cy: 211, r: 8.4, cols: 7, rows: 9 };
  const GOLD = ['#ffe27a', '#ffd36b', '#ffc04f', '#ffe9a0'];
  const WARM = '#ffa850', WARMS = ['#ffa850', '#ff9a4a', '#ffb35c'];      // рыжее тепло (не красный)
  const TEAL = '#7ff0de';
  const TIP = '#fff3c4';                                                     // точки на вершинах сот
  const U = (x, y) => [PCX + x * S, GY + y * S];
  // полуширина туники GFC.person (единицы фигуры: макушка −95,5, подошвы 0): плечи −71…−58, книзу до 19
  const hwU = u => u < -58 ? 15 * Math.sqrt(clamp((u + 71) / 13)) : 15 + 4 * (u + 58) / 53;
  // камера: точка f раскладки встаёт в точку t кадра, масштаб Z
  const CAM = {
    base: { Z: 1.22, f: [PCX, GY], t: [PCX, 344] },     // человек на всю высоту: макушка y≈29, подошвы y=344
    chest: { Z: 1.6, f: [PCX, 211], t: [PCX, 246] },    // «клеток»: грудь крупно, макушка y≈24
    far: { Z: .84, f: [PCX, GY], t: [PCX, 354] },       // «Ответ»: место над головой для огня (макушка y≈137)
    cells: { Z: 2.5, f: [PCX, 208], t: [PCX, 190] },    // «питается»: соты груди на весь кадр (y 50…332), голова за кадром
    end: { Z: 1, f: [PCX, GY], t: [PCX, GY] },          // к началу a05 — раскладка, как ждёт gfc_crowd
  };

  /* туман из gfc_tea (конец a02); без gfc_tea — та же раскладка здесь (без вихря) */
  function fog() {
    const g = SCENES.gfc_tea && SCENES.gfc_tea.fog;
    if (g) return g;
    if (!cache.fogFb) {
      const P = [], COOL = ['#b3dcff', '#f2c4ff', '#9ff0e2', '#d6daff'], cw = 352 / 26, ch = 342 / 26;
      for (let j = 0; j < 26; j++) for (let i = 0; i < 26; i++) { const k = j * 26 + i; P.push([4 + (i + .1 + .8 * H(k * 3 + 1100)) * cw, 14 + (j + .1 + .8 * H(k * 5 + 1101)) * ch]); }
      cache.fogFb = { n: 676, op: .92, r: 1.9, glow: .55, pts: t => GFC.jitter(P, t, 1.8, 7), alpha: () => 1,
        color: i => COOL[Math.floor(H(i * 7 + 1200) * 4) % 4] };
    }
    return cache.fogFb;
  }
  const fire = (x, y, r, t, op, boost) => SCENES.gfc_tea && SCENES.gfc_tea.fire ? SCENES.gfc_tea.fire(x, y, r, t, op, boost) : GFC.spark(x, y, r, { t, op });

  /* ---------------- слова ---------------- */
  const has = (K, id, s, n = 0) => ((K && K.words && K.words[id]) || []).filter(w => GFC.bare(w.w).startsWith(GFC.bare(s))).length > n;
  const wd = (K, id, s, n, alt) => has(K, id, s, n) ? GFC.w(K, id, s, n) : alt;
  function cues(K) {
    const c = { K, a3: GFC.T(K, 'a03'), a3e: GFC.TE(K, 'a03'), a4: GFC.T(K, 'a04'), a4e: GFC.TE(K, 'a04') };
    const A = (s, alt) => wd(K, 'a03', s, 0, alt), B = (s, alt) => wd(K, 'a04', s, 0, alt);
    // a03: «А ты — триллионы клеток в точном порядке. Почему ты не рассыпаешься? Ответ и приведёт к богам.»
    c.klet = A('клеток', c.a3 + 1.1); c.tochn = A('точн', c.klet + .55); c.por3 = A('порядк', c.tochn + .35);
    c.poch = A('почему', c.por3 + .6); c.ras = A('рассыпаеш', c.poch + .65); c.zap = A('ответ', c.ras + .9);
    c.priv = A('приведет', c.zap + .8); c.bogam = A('богам', c.priv + .5);
    // a04: «Ты платишь: порядок берёшь из еды, а беспорядок отдаёшь наружу — тем самым теплом. Физик Эрвин Шрёдингер
    //   называл это так: организм питается «отрицательной энтропией» — проще говоря, порядком.»
    c.plat = B('плат', c.a4 + .1); c.por = B('порядок', c.plat + .6); c.ber = B('береш', c.por + .6); c.edy = B('еды', c.ber + .4);
    c.bes = B('беспоряд', c.edy + .6); c.otd = B('отдаеш', c.bes + .6); c.nar = B('наруж', c.otd + .4); c.tepl = B('тепл', c.nar + 1.1);
    c.erv = B('физик', c.tepl + .6); c.erv2 = B('эрвин', c.erv + .5); c.shr = B('шредингер', c.erv2 + .3); c.tak = B('так', c.shr + 1);
    c.org = B('организ', c.tak + .6); c.pit = B('пита', c.org + .6); c.otr = B('отрицат', c.pit + .5); c.pros = B('прощ', c.otr + 1.6);
    c.pkom = B('порядком', c.pros + .8);
    c.end = Math.max(c.pkom + .5, K && K.a05 != null ? K.a05 - .12 : c.a4e + .3);
    return c;
  }

  /* ---------------- силуэт, точки и соты (статичная раскладка) ---------------- */
  function base() {
    if (cache.base) return cache.base;
    const n = fog().n, pts = [], kind = [];
    // точки внутри плоской фигуры: голова 13 %, руки 12 %, туника 75 %
    for (let i = 0; i < n; i++) {
      const a = H(i * 1.7 + 31), b = H(i * 2.9 + 53), cc = H(i * 4.3 + 71);
      let x, y, k;
      if (i < n * .13) { const r = 10.6 * Math.sqrt(a), th = b * TAU; x = r * Math.cos(th); y = -84 + r * Math.sin(th); k = 0; }
      else if (i < n * .25) { const sd = cc < .5 ? -1 : 1; x = sd * (12.5 + 8.47 * a) + (b - .5) * 6; y = -61 + 33.96 * a + (b - .5) * 2; k = 1; }
      else { y = -70 + 69 * a; x = (b * 2 - 1) * (hwU(y) - 1.4); k = 2; }
      pts.push(U(x, y)); kind.push(k);
    }
    // соты груди: только ячейки внутри туники, в полосе −66…−24
    const lat = GFC.lattice(COMB.cx, COMB.cy, COMB.r, COMB.cols, COMB.rows), y0 = GY - 66 * S, y1 = GY - 24 * S;
    const inside = lat.map(([x, y]) => y - COMB.r > y0 && y + COMB.r < y1 && Math.abs(x - PCX) + COMB.r * .9 < hwU((y - GY) / S) * S - 2);
    const cells = lat.map((p, i) => ({ i, x: p[0], y: p[1], d: Math.hypot(p[0] - COMB.cx, (p[1] - COMB.cy) * .7) / 40 })).filter(c => inside[c.i]);
    cells.forEach((cl, j) => { cl.feed = H(j * 41 + 17); });   // в каком порядке кормятся соты на «питается»
    // вершины и середины рёбер сот — места, куда садятся точки груди
    const seen = new Set(), T = [];
    const add = p => { const k = Math.round(p[0] * 2) + ',' + Math.round(p[1] * 2); if (!seen.has(k)) { seen.add(k); T.push(p); } };
    for (const c of cells) {
      const V = [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k - Math.PI / 2; return [c.x + COMB.r * Math.cos(a), c.y + COMB.r * Math.sin(a)]; });
      V.forEach((v, k) => { add(v); const u = V[(k + 1) % 6]; add([(v[0] + u[0]) / 2, (v[1] + u[1]) / 2]); });
    }
    let bx0 = 1e9, bx1 = -1e9, by0 = 1e9, by1 = -1e9;
    T.forEach(p => { bx0 = Math.min(bx0, p[0]); bx1 = Math.max(bx1, p[0]); by0 = Math.min(by0, p[1]); by1 = Math.max(by1, p[1]); });
    const snap = new Array(n).fill(null), used = new Array(T.length).fill(false);
    const ids = []; for (let i = 0; i < n; i++) if (kind[i] === 2 && pts[i][0] > bx0 - 2 && pts[i][0] < bx1 + 2 && pts[i][1] > by0 - 2 && pts[i][1] < by1 + 2) ids.push(i);
    ids.sort((a, b) => pts[a][1] - pts[b][1]);
    for (const i of ids) {
      let best = -1, bd = 1e9, any = -1, ad = 1e9;
      T.forEach((p, k) => { const d = (p[0] - pts[i][0]) ** 2 + (p[1] - pts[i][1]) ** 2; if (!used[k] && d < bd) { bd = d; best = k; } if (d < ad) { ad = d; any = k; } });
      const k = best >= 0 ? best : any; used[k] = true; snap[i] = T[k];
    }
    // края силуэта, которые осыпаются на «рассыпаешься» (не соты)
    const crumb = pts.map((p, i) => !snap[i] && H(i * 7 + 3) < .7);
    // откуда уходит тепло: правый бок и правая рука (вправо), плечи и голова (вверх)
    const right = [], top = [];
    pts.forEach((p, i) => { if (p[0] > PCX + 8 && p[1] > GY - 70 * S && p[1] < GY - 10 * S) right.push(i); if (p[1] < GY - 64 * S) top.push(i); });
    const tile = new Map(cells.map(c => [c.i, c]));
    return (cache.base = { n, pts, kind, snap, crumb, cells, tile, right, top, headTop: GY - PHT });
  }

  const blend = (a, b, k) => k <= 0 ? a : k >= 1 ? b : { Z: Math.exp(lerp(Math.log(a.Z), Math.log(b.Z), k)),
    f: [lerp(a.f[0], b.f[0], k), lerp(a.f[1], b.f[1], k)], t: [lerp(a.t[0], b.t[0], k), lerp(a.t[1], b.t[1], k)] };
  function camera(t, c) {
    let s = CAM.base;
    s = blend(s, CAM.chest, GFC.qq(t, c.klet - .05, c.klet + .8));
    s = blend(s, CAM.base, GFC.qq(t, c.poch - .1, c.poch + .7));
    s = blend(s, CAM.far, GFC.qq(t, c.zap - .1, c.zap + .75));
    s = blend(s, CAM.base, GFC.qq(t, c.plat, c.plat + .9));
    s = blend(s, CAM.cells, GFC.qq(t, c.pit - .1, c.pit + .75));
    s = blend(s, CAM.end, GFC.qq(t, c.pkom + .05, c.end));
    const Z = s.Z, F = s.f, T0 = s.t;
    return { Z, F, T: T0, P: p => [T0[0] + (p[0] - F[0]) * Z, T0[1] + (p[1] - F[1]) * Z] };
  }

  const crumbAt = (t, c) => pulse(t, c.ras + .05, .42, .75);
  function bodyPts(t, c) {
    const B = base(), sn = GFC.qq(t, c.tochn, c.tochn + .55), br = 1 + .012 * Math.sin(t * 1.7);
    const A = 46 * crumbAt(t, c);
    return B.pts.map((p, i) => {
      let x = p[0], y = p[1];
      if (B.snap[i]) { x = lerp(x, B.snap[i][0], sn); y = lerp(y, B.snap[i][1], sn); }
      else { x += .55 * Math.sin(t * (1.2 + H(i) * 1.6) + i); y += .55 * Math.cos(t * (1.1 + H(i * 3) * 1.4) + i * 1.3); }
      if (A > .01 && B.crumb[i]) {
        const a = Math.atan2((y - 205) * .35, x - PCX + (H(i * 11) - .5) * 8) + (H(i * 13) - .5) * 1.1, m = A * (.5 + .9 * H(i * 17));
        x += Math.cos(a) * m; y += Math.sin(a) * m * .6 + m * .55 * H(i * 19);
      }
      return [PCX + (x - PCX) * (B.snap[i] ? 1 : br), y];
    });
  }

  // цвет точки: туман → (середина) → сирень тела / тёплый у вершин сот; у каждой точки свой порог (переливается)
  const MIX = new Map();
  const mixed = (a, b) => { const k = a + '|' + b; if (!MIX.has(k)) MIX.set(k, GFC.mixC(a, b, .5)); return MIX.get(k); };
  function dotColor(i, qm, FG) {
    const B = base(), th = .3 + .35 * H(i * 23 + 9), to = B.snap[i] ? TIP : MAN_LIGHT;
    if (qm < th) return FG.color ? FG.color(i) : '#cfd2ff';
    if (qm < th + .2) return mixed(FG.color ? FG.color(i) : '#cfd2ff', to);
    return to;
  }

  /* ---------------- соты в груди (координаты раскладки; на экран — камерой) ---------------- */
  // когда сота j кормится k-й раз на «питается» (по очереди, каждые 1,5 с)
  const fedAt = (c, cl, k) => c.pit + .35 + cl.feed * 1.5 + k * 1.5;
  function combSvg(t, c) {
    const B = base();
    const appear = GFC.qq(t, c.klet, c.klet + .8), glow = GFC.qq(t, c.por3, c.por3 + .5);
    const flash = .45 * pulse(t, c.edy + .7, .3, 1.3);
    const bright = GFC.qq(t, c.pkom, c.pkom + .6), burst = pulse(t, c.pkom, .25, 1.1);
    const crumb = crumbAt(t, c);
    const wv = GFC.qq(t, c.org, c.org + 1), wy = lerp(GY + 10, B.headTop - 10, wv), won = wv > 0 && wv < 1;
    if (appear <= .003) return '';
    const lit = (i) => {
      const cl = B.tile.get(i); if (!cl) return 0;
      const a = GFC.qq(t, c.klet + cl.d * .5, c.klet + cl.d * .5 + .4);
      return a * (.36 + .64 * glow);
    };
    let s = GFC.comb(COMB.cx, COMB.cy, COMB.r, COMB.cols, COMB.rows, { lit, grid: .34, gap: .84, op: 1 - .15 * crumb,
      color: i => GOLD[Math.floor(H(i * 5 + 77) * GOLD.length) % GOLD.length] });
    // вспышки поверх плиток: «еды», «питается» (каждая сота по очереди), «порядком», волна света на «организм»
    let g = '';
    for (const cl of B.cells) {
      const a = GFC.qq(t, c.klet + cl.d * .5, c.klet + cl.d * .5 + .4);
      const shim = .16 * glow * Math.max(0, Math.sin(t * 2.4 - cl.d * 4)) * (1 - .5 * bright);
      const wave = won ? Math.exp(-(((cl.y - wy) / 16) ** 2)) : 0;
      let fed = 0;
      for (let k = 0; k < 3; k++) { const ft = fedAt(c, cl, k); if (ft < c.pkom + .2) fed = Math.max(fed, .9 * pulse(t, ft, .1, .7) + .25 * GFC.q(t, ft, .3)); }
      const l = a * (shim + flash + fed + .55 * bright + .9 * burst + .6 * wave);
      if (l <= .02) continue;
      g += GFC.hex(cl.x, cl.y, COMB.r * .8, { op: Math.min(1, l), w: .9, color: '#fff6d0', fill: `rgba(255,246,208,${f(Math.min(.55, .45 * l))})`, shade: false });
    }
    if (g) s += `<g filter="url(#gfc-soft)" opacity=".8">${g}</g>${g}`;
    if (bright > .003) s += `<ellipse cx="${PCX}" cy="${COMB.cy}" rx="58" ry="66" fill="url(#gfc-halo)" opacity="${f(.45 * bright + .5 * burst)}"/>`;
    return s;
  }

  /* силуэт GFC.person (seed 0, руки опущены) — для полосы света по телу */
  function silhouetteClip(t) {
    const br = 1 + .014 * Math.sin(t * 2.3), idle = 2.4 * Math.sin(t * 1.4);
    const tr = `transform="translate(${PCX} ${GY}) scale(${S.toFixed(4)} ${(S * br).toFixed(4)})"`;
    let s = `<path d="M-15 -58 C-15 -67 -9 -71 0 -71 C9 -71 15 -67 15 -58 L19 -5 C19 -2 17 0 14 0 L-14 0 C-17 0 -19 -2 -19 -5 Z" ${tr}/>` +
      `<circle cx="0" cy="-84" r="11.5" ${tr}/>`;
    for (const sd of [-1, 1]) {
      const a = [sd * 12.5, -61], b = [sd * (12.5 + 35 * Math.sin(14 * Math.PI / 180) + idle), -61 + 35 * Math.cos(14 * Math.PI / 180)];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * 4.5, ny = dx / L * 4.5;
      s += `<path d="M${f(a[0] + nx)} ${f(a[1] + ny)} L${f(b[0] + nx)} ${f(b[1] + ny)} L${f(b[0] - nx)} ${f(b[1] - ny)} L${f(a[0] - nx)} ${f(a[1] - ny)} Z" ${tr}/>` +
        `<circle cx="${f(b[0])}" cy="${f(b[1])}" r="4.5" ${tr}/>`;
    }
    return `<clipPath id="gfcb-clip">${s}</clipPath>`;
  }

  /* человек: фигура + соты груди + точки. Его же рисует gfc_crowd на входе a05 (SCENES.gfc_body.man):
   * к началу a05 камера ×1 — силуэт ровно на раскладке (подошвы 180,330, рост 258). */
  function manSvg(t, c) {
    const B = base(), C = camera(t, c), FG = fog();
    const qm = GFC.qq(t, c.a3 - .35, c.klet);
    let P = bodyPts(t, c).map(C.P);
    if (qm < 1) P = GFC.morph(FG.pts(t, c.K), P, qm, t, { spread: .4, amp: 3, bend: 16, seed: 4 });
    const bodyOp = GFC.qq(t, c.klet - .7, c.klet + .15), crumb = crumbAt(t, c);
    const glow = GFC.qq(t, c.por3, c.por3 + .5), warm = .6 * GFC.q(t, c.tepl, .8) * (1 - GFC.qq(t, c.pkom, c.end));
    let s = '';
    if (bodyOp > .003) s += GFC.person(PCX, GY, PHT, { color: MANC, t, seed: 0, opacity: bodyOp * (1 - .6 * crumb), shade: .12, lit: .7 * warm, shadow: .8 });
    s += combSvg(t, c);
    // полоса света по телу на «организм»
    const wv = GFC.qq(t, c.org, c.org + 1);
    if (wv > 0 && wv < 1) {
      const wy = lerp(GY + 14, B.headTop - 14, wv), a = Math.sin(Math.PI * wv);
      s += `<defs>${silhouetteClip(t)}<linearGradient id="gfcb-band" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d0" stop-opacity="0"/>` +
        `<stop offset=".5" stop-color="#fff6d0" stop-opacity=".8"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></linearGradient></defs>` +
        `<rect x="100" y="${f(wy - 22)}" width="160" height="44" fill="url(#gfcb-band)" clip-path="url(#gfcb-clip)" opacity="${f(.9 * a)}"/>`;
    }
    s = GFC.zoom(s, C.F[0], C.F[1], C.Z, C.T[0], C.T[1]);
    // точки: туман собирается в силуэт; потом точки тела гаснут в фигуре, на вершинах сот остаются тёплые огоньки
    const fa = FG.alpha || (() => 1);
    const alpha = i => {
      if (B.snap[i]) return lerp(qm < 1 ? fa(i) : 1, 1 - .45 * glow, qm);
      let a = (qm < 1 ? lerp(fa(i), 1, qm) : 1) * (1 - .94 * bodyOp);
      if (B.crumb[i]) a += crumb * 1.1;
      return a;
    };
    const zr = Math.pow(C.Z, .3);
    s += GFC.dots(P, { r: lerp(FG.r, 1.3, qm) * zr, op: lerp(FG.op, .9, qm), t, glow: lerp(FG.glow, .5, qm), alpha,
      color: i => dotColor(i, qm, FG) });
    return s;
  }

  /* струя ярких точек: из яблока (кадр) в живот (раскладка → камера), по кругу с периодом per до stop */
  function stream(t, C, t0, stop, m, seed, src, per, cols) {
    const P = [], A = [], CC = [];
    for (let j = 0; j < m; j++) {
      const st = t0 + per * H(j * 3 + seed), dur = .8 + .25 * H(j * 5 + seed);
      if (t < st) continue;
      const cs = st + Math.floor((t - st) / per) * per;
      if (cs > stop) continue;
      const v = (t - cs) / dur;
      if (v >= 1) continue;
      const a = [src[0] + (H(j * 7 + seed) - .5) * src[2], src[1] + (H(j * 11 + seed) - .5) * src[2]];
      const b = C.P([PCX + (H(j * 13 + seed) - .5) * 40, 205 + 50 * H(j * 17 + seed)]);
      const ctl = [lerp(a[0], b[0], .45), Math.min(a[1], b[1]) - 26 - 22 * H(j * 19 + seed)];
      const u = GFC.ease(v), col = cols[Math.floor(H(j * 23 + seed) * cols.length) % cols.length];
      for (let k = 0; k < 3; k++) {
        const uk = Math.max(0, u - k * .05);
        P.push(bez(a, ctl, b, uk)); A.push((1 - k * .33) * Math.sin(Math.PI * Math.min(1, v * 1.15)) ** .5);
        CC.push(uk > .55 ? '#fffbe8' : col);
      }
    }
    return P.length ? GFC.dots(P, { r: 1.9, op: 1, t, glow: 1, alpha: i => A[i], color: i => CC[i] }) : '';
  }
  /* «питается»: в каждую соту по очереди слева влетают точки */
  function feedStream(t, c, C) {
    if (t < c.pit) return '';
    const B = base(), P = [], A = [];
    B.cells.forEach((cl, i) => {
      for (let k = 0; k < 3; k++) {
        const ft = fedAt(c, cl, k); if (ft > c.pkom + .2) break;
        const dur = .7, v = (t - (ft - dur)) / dur;
        if (v <= 0 || v >= 1) continue;
        const b = C.P([cl.x, cl.y]);
        for (let m = 0; m < 3; m++) {
          const a = [-8, 110 + 220 * H(i * 7 + k * 13 + m * 3)], ctl = [lerp(a[0], b[0], .5), Math.min(a[1], b[1]) - 30 * H(i + m)];
          const u = GFC.ease(Math.max(0, v - m * .08) / (1 - m * .08));
          P.push(bez(a, ctl, b, u)); A.push(1 - m * .25);
        }
      }
    });
    return P.length ? GFC.dots(P, { r: 2.4, op: 1, t, glow: 1.1, alpha: i => A[i], color: ['#fffbe8', TEAL, GOLD[0]] }) : '';
  }

  /* тепло наружу: рыжие точки от тела — с правого бока вправо, с плеч и головы вверх */
  function heat(t, c, C) {
    if (t < c.bes) return '';
    const B = base(), P = [], A = [], PD = 2.4;
    const boost = 1 + .4 * GFC.qq(t, c.tepl, c.tepl + .8), dim = (1 - .45 * GFC.qq(t, c.pit, c.pit + .8)) * (1 - GFC.qq(t, c.pkom, c.end));
    for (let j = 0; j < 270; j++) {
      const t0 = j < 70 ? c.bes + .08 : j < 160 ? c.otd : c.nar;
      const st = t0 + PD * H(j * 5 + 2) * (j < 70 ? .45 : 1);
      if (t < st) continue;
      const age = (t - st) % PD, up = H(j * 3 + 9) < .3;
      const list = up ? B.top : B.right, o = B.pts[list[(j * 37) % list.length]];
      const ang = up ? -Math.PI / 2 + (H(j * 7 + 1) - .5) * 1.3 : -.6 + 1.0 * H(j * 7 + 1);
      const d = 4 + age * (42 + 34 * H(j * 11 + 3)), s0 = C.P(o);
      const x = s0[0] + Math.cos(ang) * d, y = s0[1] + Math.sin(ang) * d - age * 6;
      if (y > 352 || x > 372 || y < -8) continue;
      P.push([x, y]); A.push((1 - age / PD) * Math.min(1, age * 4) * boost * dim);
    }
    return GFC.dots(P, { r: 2, op: .95, t, glow: 1, color: WARMS, seed: 3, alpha: i => A[i] });
  }

  // яблоко: плоское, зелёное (не красное — красный только опасность), черенок, листик, блик, тёмный контур
  function apple(x, y, r, t, op) {
    if (op <= .003) return '';
    const d = `M0 ${f(-.62 * r)} C${f(.35 * r)} ${f(-.95 * r)} ${f(1.02 * r)} ${f(-.85 * r)} ${f(1.02 * r)} ${f(-.12 * r)} C${f(1.02 * r)} ${f(.55 * r)} ${f(.5 * r)} ${f(1.02 * r)} 0 ${f(.86 * r)} ` +
      `C${f(-.5 * r)} ${f(1.02 * r)} ${f(-1.02 * r)} ${f(.55 * r)} ${f(-1.02 * r)} ${f(-.12 * r)} C${f(-1.02 * r)} ${f(-.85 * r)} ${f(-.35 * r)} ${f(-.95 * r)} 0 ${f(-.62 * r)} Z`;
    const sw = 6 * Math.sin(t * 1.4);
    let s = `<ellipse cx="${f(r * .1)}" cy="${f(r * 1.2)}" rx="${f(r * .85)}" ry="${f(r * .2)}" fill="url(#gfc-shadow)"/>`;
    s += `<path d="M0 ${f(-.6 * r)} Q${f(.05 * r)} ${f(-.95 * r)} ${f(.22 * r)} ${f(-1.12 * r)}" fill="none" stroke="#7b4a2c" stroke-width="${f(r * .12)}" stroke-linecap="round"/>`;
    s += `<g transform="translate(${f(.18 * r)} ${f(-.98 * r)}) rotate(${f(-28 + sw)})"><path d="M0 0 C${f(.22 * r)} ${f(-.3 * r)} ${f(.62 * r)} ${f(-.28 * r)} ${f(.78 * r)} ${f(-.06 * r)} C${f(.5 * r)} ${f(.16 * r)} ${f(.18 * r)} ${f(.14 * r)} 0 0 Z" fill="#2fc9a0"/>` +
      `<path d="M${f(.06 * r)} ${f(-.02 * r)} Q${f(.4 * r)} ${f(-.16 * r)} ${f(.7 * r)} ${f(-.07 * r)}" fill="none" stroke="#17998f" stroke-width="${f(r * .035)}" stroke-linecap="round"/></g>`;
    s += `<path d="${d}" fill="url(#gfcb-apple)" stroke="#1f6b45" stroke-width="${f(r * .05)}" stroke-linejoin="round"/><path d="${d}" fill="url(#gfc-shade)"/>`;
    s += `<path d="M${f(-.12 * r)} ${f(-.55 * r)} Q0 ${f(-.46 * r)} ${f(.12 * r)} ${f(-.55 * r)}" fill="none" stroke="#2f9a5a" stroke-width="${f(r * .05)}" stroke-linecap="round" opacity=".8"/>`;
    s += `<ellipse cx="${f(-.42 * r)}" cy="${f(-.3 * r)}" rx="${f(.16 * r)}" ry="${f(.28 * r)}" fill="#fff" opacity=".5" transform="rotate(18 ${f(-.42 * r)} ${f(-.3 * r)})"/>`;
    return `<g opacity="${f(op)}" transform="translate(${f(x)} ${f(y)})">${s}</g>`;
  }
  const DEFS = `<defs><linearGradient id="gfcb-apple" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="#c8f57e"/><stop offset=".55" stop-color="#7fd65e"/><stop offset="1" stop-color="#2f9a5a"/></linearGradient>` +
    `<radialGradient id="gfcb-heat"><stop stop-color="#ffb060" stop-opacity=".45"/><stop offset=".5" stop-color="#ff9a4a" stop-opacity=".16"/><stop offset="1" stop-color="#ff9a4a" stop-opacity="0"/></radialGradient></defs>`;
  const APPLE_C = ['#e6ffb0', '#c8f57e', '#fffbe8'];

  /* подпись (Montserrat 700 капсом, ≥ 16 — на телефоне не растёт), печатается по буквам с t0 */
  const label = (x, y, text, t, t0, o = {}) => GFC.typed(x, y, text, t, t0, { size: o.size ?? 16, cps: o.cps ?? 22,
    anchor: o.anchor ?? 'middle', op: o.op ?? 1, color: o.color, glow: true, ls: .04, maxW: o.maxW });
  const pill = (x, y, w, h, op) => op <= .003 ? '' : `<g opacity="${f(op)}"><rect x="${f(x)}" y="${f(y + 2.5)}" width="${f(w)}" height="${f(h)}" rx="12" fill="${INK}" opacity=".4"/>` +
    `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="12" fill="${INK}" opacity=".62"/>` +
    `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="12" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1"/></g>`;

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), B = base(), C = camera(t, c);
    let s = DEFS;
    // рыжий ореол вокруг тела («теплом»)
    const halo = .9 * GFC.q(t, c.tepl, .8) * (1 - .5 * GFC.qq(t, c.pit, c.pit + .8)) * (1 - GFC.qq(t, c.pkom, c.end));
    if (halo > .003) {
      const p = C.P([PCX, 205]);
      s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(80 * C.Z)}" ry="${f(150 * C.Z)}" fill="url(#gfcb-heat)" opacity="${f(halo * (.9 + .1 * Math.sin(t * 2)))}"/>`;
    }
    s += heat(t, c, C);
    s += manSvg(t, c);
    // «Ответ» — над головой тот же огонь с лучами, что в первом кадре; «приведёт» — нить от макушки; «богам» — вспышка
    const sop = GFC.q(t, c.zap - .05, .45) * GFC.out(t, c.plat, .8);
    if (sop > .003) {
      const top = C.P([PCX, B.headTop - 4]), g = GFC.qq(t, c.priv, c.bogam + .1), bot = [FIRE[0], FIRE[1] + FIRE_R + 3];
      if (g > .003 && top[1] > bot[1] + 2) {
        const end = [PCX, lerp(top[1], bot[1], g)];
        s += GFC.thread(top, end, { opacity: .4 * sop, width: 4.5, glow: true, color: GFC.SUN }) + GFC.thread(top, end, { opacity: .95 * sop, width: 1.8, color: GFC.SUN });
        if (g < 1) s += GFC.dots([end], { r: 2.6, op: sop, t, glow: 1, color: '#fff6d0' });
        else {
          const R = [];
          for (let m = 0; m < 3; m++) { const k = frac((t - c.bogam) / 1.1 + m / 3); R.push([PCX, lerp(bot[1], top[1], k)]); }
          s += GFC.dots(R, { r: 2.6, op: sop, t, glow: 1, color: '#fff6d0' });
        }
      }
      s += fire(FIRE[0], FIRE[1], FIRE_R, t, sop, .7 * pulse(t, c.zap, .15, .9) + 1.0 * pulse(t, c.bogam, .15, .9));
    }
    // a04: крупное яблоко слева — вспыхивает на «порядок», подаётся к телу на «берёшь», тает струёй на «еды»
    const aop = GFC.q(t, c.plat, .5) * GFC.out(t, c.pit - .1, .6);
    if (aop > .003) {
      const sc = (.7 + .3 * GFC.q(t, c.plat, .5)) * (1 - .4 * GFC.qq(t, c.edy, c.org));
      const ax = APPLE.x + 10 * GFC.qq(t, c.ber, c.ber + .5), ay = APPLE.y + 2 * Math.sin(t * 1.3), r = APPLE.r * sc;
      const fl = pulse(t, c.por, .15, .8);
      if (fl > .01) s += `<circle cx="${f(ax)}" cy="${f(ay)}" r="${f(r * 2.1)}" fill="url(#gfc-halo)" opacity="${f(fl * aop)}"/>`;
      s += apple(ax, ay, r, t, aop);
    }
    if (t > c.edy) s += stream(t, C, c.edy + .05, c.org + .3, 110, 21, [APPLE.x + 10, APPLE.y, 30], 1.4, APPLE_C);
    s += feedStream(t, c, C);
    // подписи: гаснут на наезд «питается» (соты на весь кадр); мыслитель и −ЭНТРОПИЯ = ПОРЯДОК — до «порядком»
    const side = GFC.out(t, c.pit - .05, .5), fin = GFC.out(t, c.pkom + .25, .5);
    s += label(APPLE.x, 288, 'ПОРЯДОК', t, c.por, { op: side, color: TEAL, maxW: 100 });
    s += label(280, 120, 'БЕСПОРЯДОК', t, c.bes, { op: side, color: '#ffc29a', maxW: 128 });
    s += label(280, 143, 'ТЕПЛО', t, c.tepl, { op: side, color: WARM });
    s += pill(6, 26, 134, 72, .95 * GFC.q(t, c.erv2 - .3, .35) * fin);
    const rule = GFC.q(t, c.erv2 - .3, .5) * fin;
    if (rule > .003) s += `<rect x="14" y="33" width="${f(100 * rule)}" height="2" rx="1" fill="${ACC}" opacity="${f(.9 * rule)}"/>`;
    s += label(14, 54, 'ЭРВИН', t, c.erv2 - .05, { anchor: 'start', op: fin });
    s += label(14, 73, 'ШРЁДИНГЕР', t, c.shr - .05, { anchor: 'start', op: fin, maxW: 120 });
    s += label(14, 92, '1944', t, c.tak - .1, { anchor: 'start', op: .9 * fin, color: ACC });
    s += pill(196, 24, 146, 56, .95 * GFC.q(t, c.otr - .05, .4) * fin);
    s += label(269, 46, '−ЭНТРОПИЯ', t, c.otr, { size: 18, op: fin, color: ACC, maxW: 134 });
    s += label(269, 70, '= ПОРЯДОК', t, c.pros, { size: 18, op: fin, color: TEAL, maxW: 134 });
    return s;
  }
  SCENES.gfc_body = GFC.scene('gfc_body', (t, K, mode, p) => body(t, K));
  // шов с gfc_crowd (a05): человек к началу a05 — подошвы (180,330), рост 258, сирень, золотые соты в груди; в координатах кадра
  SCENES.gfc_body.man = Object.freeze({ svg: (t, K) => manSvg(t, cues(K)), foot: [PCX, GY], h: PHT, color: 'violet' });
})();
