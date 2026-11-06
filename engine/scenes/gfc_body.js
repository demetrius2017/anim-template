/* gfc_body — «Бог ещё не создан», альтернативная версия «Цветная инфографика» (eps/god_future_color_p1), фразы a03
 * (gather) и a04 (pay). v3, 06.11: стиль словаря GFC v2 (владелец о цветной части 1: «графика всё же не как на
 * предложенной картинке, цветов мало»; образец — eps/god_future/qa/style_flatcolor.jpg). Содержание и время — принятой
 * сцены основной версии engine/scenes/gf_body.js v4 (текст v21): те же события на тех же словах, те же надписи-источники
 * на тех же местах, те же швы. Словарь — gfc_00_lib.js (window.GFC). Лиц, портретов, богов нет; красного нет (яблоко
 * зелёное, тепло рыжее).
 *
 * Человек — плоская фигура GFC.person, бирюзовая (раскладка: подошвы 180,330, рост 258) + 676 точек тумана gfc_tea,
 * которые собираются в его силуэт; в груди — соты-клетки GFC.comb (r 8,4, только ячейки внутри туники; точки груди
 * садятся на их вершины), плитки — градиент золото → коралл → розовый → сирень → небо. На экран его ставит своя камера:
 * обычный план ×0,88, подошвы на y=350 (макушка y≈123 — над ней заголовок в две строки, буквы y≈36…106).
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (gather и pay рисует одно
 * тело), шва между режимами нет. Все события — от слов: GFC.w(K, id, основа); секунд нет. Нет слова — запасное время.
 * Заголовки (GFC.headline, Montserrat 800 капсом, главное слово золотом) — по страницам субтитров, ключевая мысль, не
 * субтитр, в две строки (26 / акцент 39, как «ЗАЧЕМ ЛЮДЯМ / БОГИ?» образца): ТЫ — ЖИВОЙ / ПОРЯДОК (с «А ты»), ЧТО ТЕБЯ /
 * ДЕРЖИТ? («почему»), ОТСЮДА ПУТЬ / К БОГАМ («ответ»), ЕДА — ЭТО / ПОРЯДОК («ешь»), ПОРЯДОК — / ВНУТРЬ («из»), его сменяет
 * БЕСПОРЯДОК — / НАРУЖУ (с «а беспорядок»). С «физик» и до конца вверху стоят надписи-источники (ЭРВИН ШРЁДИНГЕР 1944,
 * −ЭНТРОПИЯ = ПОРЯДОК) — заголовка нет.
 *
 *  gather (a03) Вход наплывом 0,5 с из gfc_tea/cool (GFC.scene). Начало — тот же цветной туман, что в конце gfc_tea
 *               (SCENES.gfc_tea.fog.pts(t, K): те же места, цвета и мягкие края), поэтому наплыв без скачка; под ним
 *               проступают фиолетовые холмы. С начала фразы туман собирается в силуэт (GFC.morph, к «клеток»), к
 *               «клеток» проявляется бирюзовая фигура. «клеток» — наезд на грудь (×1,2, макушка под заголовком),
 *               проступают цветные соты, по бокам выскакивают шесть разноцветных значков-клеток (GFC.node 'cell'), от
 *               каждого к своей соте растёт градиентная нить, по нитям бегут огоньки; «точн» — точки груди садятся на
 *               вершины сот; «порядк» — плитки вырастают и светятся; «почему» — обратно к человеку целиком;
 *               «рассыпаеш» — фигура бледнеет, края осыпаются разноцветными точками, значки отскакивают в стороны, всё
 *               возвращается; «ответ» — значки гаснут, отъезд (×0,6), над головой вспыхивает тот же огонь с лучами,
 *               что в первом кадре (SCENES.gfc_tea.fire, 180,142, r 13, лучи не выше заголовка); «приведет» — от
 *               макушки к огню растёт градиентная нить (бирюза → золото); «богам» — огонь вспыхивает, по нити бегут
 *               огоньки.
 *  pay (a04)    Два потока сразу: слева яблоко → яркие точки в живот; справа и сверху от тела — рыжее тепло наружу.
 *               «ешь» — огонь гаснет, камера снова к человеку, слева крупное зелёное яблоко (r 42, блик, листик);
 *               «еда» — яблоко вспыхивает; «собранн» — вокруг яблока прорисовывается золотая сота (знак порядка);
 *               «порядке» — сота и яблоко вспыхивают, под ними ПОРЯДОК (бирюзой); «из» — яблоко с сотой подаётся к
 *               телу; «чинишь» — яблоко тает струёй ярких точек в живот (до «организм»), у плеча — зелёный значок
 *               «плюс»; «себя» — соты груди вспыхивают; «беспоряд» — от тела (правый бок, плечи и голова) вылетают
 *               первые рыжие точки, справа БЕСПОРЯДОК; «отдаеш»/«тем» — рыжих точек вдвое, потом втрое, они уходят
 *               вправо и вверх; «тепл» — рыжий ореол вокруг тела, фигура и земля теплеют, справа оранжевый значок
 *               огня и рыжее ТЕПЛО; «физик»/«эрвин»/«шредингер»/«писал» — слева вверху на плашке по строкам ЭРВИН ·
 *               ШРЁДИНГЕР · 1944, на «писал» рядом — голубой значок-книга; «организ» — по телу снизу вверх бежит
 *               полоса света; «пита» — СМЕНА ПЛАНА на середине цитаты: наезд на соты груди (×2,3), слева в каждую соту
 *               по очереди влетают цветные точки и она вспыхивает (кормится); ПОРЯДОК/БЕСПОРЯДОК/ТЕПЛО, значки и
 *               яблоко гаснут; «отрицат» — справа вверху на плашке −ЭНТРОПИЯ (золотом); «прощ» — под ней = ПОРЯДОК
 *               (бирюзой); «порядком» — все соты вспыхивают и остаются яркими, подписи и тепло гаснут, отъезд к
 *               раскладке (×1, подошвы 180,330) к началу a05.
 *  Выход: к началу a05 камера ×1 — человек ровно как ждёт gfc_crowd (подошвы 180,330, рост 258). Сам человек (фигура +
 *  соты + точки) — SCENES.gfc_body.man.svg(t, K) ({svg, foot: [180,330], h: 258, color: 'teal'}): его рисует gfc_crowd
 *  на входе, поэтому силуэт в наплыве не меняется.
 * Чем вид отличается от gf_body (сюжет и время те же): плоская бирюзовая фигура вместо человека из точек (точки — только
 *   туман, сборка и осыпание); соты — цветные плитки, а не белые контуры; крупные заголовки сверху (в основной версии
 *   их нет), поэтому человек ниже и меньше (×0,88 вместо ×1,22; наезд на грудь ×1,2 вместо ×1,9; отъезд ×0,6 вместо
 *   ×0,84, огонь на «Ответ» — 180,142 вместо 180,62; соты на «питается» ×2,3 вместо ×2,8); холмы под человеком; цветные значки GFC.node (клетки на «клеток», плюс на «чинишь», огонь на
 *   «тепл», книга на «писал») и градиентные нити; яблоко — плоское зелёное с бликом, а не контур; подписи —
 *   Montserrat капсом на цветных плашках-таблетках, места те же (Шрёдингер — слева вверху, −ЭНТРОПИЯ — справа вверху,
 *   ПОРЯДОК — под яблоком, БЕСПОРЯДОК/ТЕПЛО — справа внизу).
 * Слова (сверены с eps/god_future_color_p1/build/cues.json, текст v21, 06.11): a03 — клеток, точн, порядк, почему,
 *   рассыпаеш, ответ, приведет, богам; a04 — ешь, еда, собранн, порядке (не «порядок»: эта основа ловит «порядком» в
 *   конце фразы), из, чинишь, себя, беспоряд, отдаеш, тем, тепл, физик, эрвин, шредингер, писал, организ, пита, отрицат,
 *   прощ, порядком.
 * Кадр: всё важное в y=36..355, подписи 19–21, базовые линии не выше y 54. Пик ≈ 3 тыс. элементов.
 * Проверка: eps/god_future_color_p1/qa/gfc_body_v3*.jpg (станция tesla, render.py --at … --sheet; финал — gfc_body_v3_final.jpg,
 *   каждые 2,0 с от начала a03 + швы; та же раскладка основной версии — gfc_body_bw_v3.jpg).
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
  const INK = GFC.INK, GOLD = GFC.GOLD;
  const cache = {};
  const PCX = 180, GY = 330, PHT = 258, S = PHT / 95.5, HOR = 275;   // HOR — горизонт холмов в раскладке
  const APPLE = { x: 60, y: 226, r: 42 }, FIRE = [180, 142], FIRE_R = 13, FIRE_YMIN = 110;
  const MANC = 1, MAN_LIGHT = GFC.PAL[MANC][0];                          // бирюза
  const COMB = { cx: 180, cy: 211, r: 8.4, cols: 7, rows: 9 };
  const TILE = ['#ffc23d', '#ff8a4c', '#f2606f', '#e9579f', '#a66ef0', '#4f8ff2'];   // соты: золото → рыжий → коралл → розовый → фиалка → небо
  const WARM = '#ffa850', WARMS = ['#ffa850', '#ff9a4a', '#ffb35c', '#ffc46e'];       // рыжее тепло (не красный)
  const TEAL = '#7ff0de', TIP = '#fffbe8';
  const U = (x, y) => [PCX + x * S, GY + y * S];
  // полуширина туники GFC.person (единицы фигуры: макушка −95,5, подошвы 0): плечи −71…−58, книзу до 19
  const hwU = u => u < -58 ? 15 * Math.sqrt(clamp((u + 71) / 13)) : 15 + 4 * (u + 58) / 53;
  // камера: точка f раскладки встаёт в точку t кадра, масштаб Z (макушка — 72 раскладки)
  const CAM = {
    base: { Z: .88, f: [PCX, GY], t: [PCX, 350] },      // человек целиком под заголовком: макушка y≈123, подошвы y=350
    chest: { Z: 1.2, f: [PCX, 208], t: [PCX, 287] },    // «клеток»: грудь крупно (соты y≈220…355), макушка y≈124 — под заголовком
    far: { Z: .6, f: [PCX, GY], t: [PCX, 350] },        // «Ответ»: над головой (макушка y≈195) — огонь, выше — заголовок
    cells: { Z: 2.3, f: [PCX, 208], t: [PCX, 226] },    // «питается»: соты груди на весь кадр (y≈96…357), плечи под плашками
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
  const fire = (x, y, r, t, op, boost, ymin) => SCENES.gfc_tea && SCENES.gfc_tea.fire ? SCENES.gfc_tea.fire(x, y, r, t, op, boost, ymin) : GFC.spark(x, y, r, { t, op });

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
    // a04 (v21): «Ты ешь. Еда — вещество, собранное в порядке: из неё ты чинишь себя, а беспорядок отдаёшь — тем самым
    //   теплом. Физик Эрвин Шрёдингер писал: организм питается «отрицательной энтропией», проще говоря — порядком.»
    // «порядке», а не «порядок»: основа «порядок» ловит только «порядком» в конце фразы
    c.plat = B('ешь', c.a4 + .15); c.eda = B('еда', c.plat + .6); c.sobr = B('собранн', c.eda + 1.6); c.por = B('порядке', c.sobr + .5);
    c.ber = B('из', c.por + .7); c.edy = B('чинишь', c.ber + .6); c.sebya = B('себя', c.edy + .35);
    c.bes = B('беспоряд', c.sebya + .55); c.otd = B('отдаеш', c.bes + .5); c.nar = B('тем', c.otd + .6); c.tepl = B('тепл', c.nar + .6);
    c.erv = B('физик', c.tepl + .6); c.erv2 = B('эрвин', c.erv + .5); c.shr = B('шредингер', c.erv2 + .3); c.tak = B('писал', c.shr + .5);
    c.org = B('организ', c.tak + .6); c.pit = B('пита', c.org + .6); c.otr = B('отрицат', c.pit + .5); c.pros = B('прощ', c.otr + 1.6);
    c.pkom = B('порядком', c.pros + .8);
    c.end = Math.max(c.pkom + .5, K && K.a05 != null ? K.a05 - .12 : c.a4e + .3);
    // заголовки по страницам субтитров (ключевая мысль, не субтитр); с «физик» вверху — надписи-источники, заголовка нет
    c.HL = [
      { s: 'Ты — живой / *порядок*', t0: c.a3 + .3, t1: c.poch },
      { s: 'Что тебя / *держит?*', t0: c.poch, t1: c.zap },
      { s: 'Отсюда путь / *к богам*', t0: c.zap, t1: c.plat },
      { s: 'Еда — это / *порядок*', t0: c.plat, t1: c.ber },
      { s: 'Порядок — / *внутрь*', t0: c.ber, t1: c.bes - .2 },
      { s: 'Беспорядок — / *наружу*', t0: c.bes - .2, t1: c.erv },
    ];
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
    // соты, к которым идут нити от значков-клеток: в трёх рядах — крайняя левая и крайняя правая
    const rows = [...new Set(cells.map(c => Math.round(c.y * 10) / 10))].sort((a, b) => a - b);
    const pickRow = k => rows[Math.min(rows.length - 1, Math.max(0, Math.round(k * (rows.length - 1))))];
    const links = [];
    for (const sd of [-1, 1]) for (const k of [.15, .5, .85]) {
      const ry = pickRow(k), row = cells.filter(c => Math.abs(c.y - ry) < .2).sort((a, b) => sd * (b.x - a.x));
      links.push(row[0] || cells[0]);
    }
    return (cache.base = { n, pts, kind, snap, crumb, cells, tile, right, top, links, headTop: GY - PHT });
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

  // цвет точки: туман → (середина) → разноцветные (края, что осыпаются) / светлые у вершин сот; у каждой точки свой порог
  const MIX = new Map();
  const mixed = (a, b) => { const k = a + '|' + b; if (!MIX.has(k)) MIX.set(k, GFC.mixC(a, b, .5)); return MIX.get(k); };
  const DOTC = [MAN_LIGHT, ...GFC.DOT];
  function dotColor(i, qm, FG) {
    const B = base(), th = .3 + .35 * H(i * 23 + 9), to = B.snap[i] ? TIP : DOTC[Math.floor(H(i * 5 + 61) * DOTC.length) % DOTC.length];
    const from = FG.color ? FG.color(i) : '#cfd2ff';
    if (qm < th) return from;
    if (qm < th + .2) return mixed(from, to);
    return to;
  }

  /* ---------------- соты в груди (координаты раскладки; на экран — камерой) ---------------- */
  const tileCol = (x, y) => GFC.ramp(.5 + .42 * (x - COMB.cx) / 47 + .3 * (y - COMB.cy) / 50, TILE);
  // когда сота кормится k-й раз на «питается» (по очереди, каждые 1,5 с)
  const fedAt = (c, cl, k) => c.pit + .35 + cl.feed * 1.5 + k * 1.5;
  function combSvg(t, c) {
    const B = base();
    const appear = GFC.qq(t, c.klet, c.klet + .8), glow = GFC.qq(t, c.por3, c.por3 + .5);
    const flash = .45 * pulse(t, c.sebya + .3, .3, 1.3);
    const bright = GFC.qq(t, c.pkom, c.pkom + .6), burst = pulse(t, c.pkom, .25, .8);
    const crumb = crumbAt(t, c);
    const wv = GFC.qq(t, c.org, c.org + 1), wy = lerp(GY + 10, B.headTop - 10, wv), won = wv > 0 && wv < 1;
    if (appear <= .003) return '';
    const lit = (i) => {
      const cl = B.tile.get(i); if (!cl) return 0;
      const a = GFC.qq(t, c.klet + cl.d * .5, c.klet + cl.d * .5 + .4);
      return a * (.36 + .64 * glow);
    };
    let s = GFC.comb(COMB.cx, COMB.cy, COMB.r, COMB.cols, COMB.rows, { lit, grid: .34, gap: .86, op: 1 - .15 * crumb,
      color: (i, x, y) => tileCol(x, y) });
    // вспышки поверх плиток: «себя», «питается» (каждая сота по очереди), «порядком», волна света на «организм»
    let g = '';
    for (const cl of B.cells) {
      const a = GFC.qq(t, c.klet + cl.d * .5, c.klet + cl.d * .5 + .4);
      const shim = .16 * glow * Math.max(0, Math.sin(t * 2.4 - cl.d * 4)) * (1 - .5 * bright);
      const wave = won ? Math.exp(-(((cl.y - wy) / 16) ** 2)) : 0;
      let fed = 0;
      for (let k = 0; k < 3; k++) { const ft = fedAt(c, cl, k); if (ft < c.pkom + .2) fed = Math.max(fed, .9 * pulse(t, ft, .1, .7) + .25 * GFC.q(t, ft, .3)); }
      const l = a * (shim + flash + fed + .3 * bright + .9 * burst + .6 * wave);
      if (l <= .02) continue;
      g += GFC.hex(cl.x, cl.y, COMB.r * .8, { op: Math.min(1, l), w: .9, color: '#fff6d0', fill: `rgba(255,248,220,${f(Math.min(.42, .34 * l))})`, shade: false });
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
    if (bodyOp > .003) s += GFC.person(PCX, GY, PHT, { color: MANC, t, seed: 0, opacity: bodyOp * (1 - .6 * crumb), shade: .08, lit: .8 * warm, shadow: .8 });
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
    // точки: туман собирается в силуэт; потом точки тела гаснут в фигуре, на вершинах сот остаются светлые огоньки
    const fa = FG.alpha || (() => 1);
    const alpha = i => {
      if (B.snap[i]) return lerp(qm < 1 ? fa(i) : 1, 1 - .65 * glow, qm);
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
    return P.length ? GFC.dots(P, { r: 2, op: 1, t, glow: 1, alpha: i => A[i], color: i => CC[i] }) : '';
  }
  /* «питается»: в каждую соту по очереди слева влетают цветные точки */
  const FEEDC = ['#fffbe8', TEAL, '#ffe27a', '#ffa6d6', '#8ccbff', '#95e67c'];
  function feedStream(t, c, C) {
    if (t < c.pit) return '';
    const B = base(), P = [], A = [], CC = [];
    B.cells.forEach((cl, i) => {
      for (let k = 0; k < 3; k++) {
        const ft = fedAt(c, cl, k); if (ft > c.pkom + .2) break;
        const dur = .7, v = (t - (ft - dur)) / dur;
        if (v <= 0 || v >= 1) continue;
        const b = C.P([cl.x, cl.y]), col = FEEDC[Math.floor(H(i * 3 + k * 7) * FEEDC.length) % FEEDC.length];
        for (let m = 0; m < 3; m++) {
          const a = [-8, 110 + 220 * H(i * 7 + k * 13 + m * 3)], ctl = [lerp(a[0], b[0], .5), Math.min(a[1], b[1]) - 30 * H(i + m)];
          const u = GFC.ease(Math.max(0, v - m * .08) / (1 - m * .08));
          P.push(bez(a, ctl, b, u)); A.push(1 - m * .25); CC.push(m ? col : '#fffbe8');
        }
      }
    });
    return P.length ? GFC.dots(P, { r: 2.5, op: 1, t, glow: 1.1, alpha: i => A[i], color: i => CC[i] }) : '';
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
      if (y > 352 || x > 372 || y < 30) continue;
      P.push([x, y]); A.push((1 - age / PD) * Math.min(1, age * 4) * boost * dim);
    }
    return GFC.dots(P, { r: 2.1, op: .95, t, glow: 1, color: WARMS, seed: 3, alpha: i => A[i] });
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
    s += `<ellipse cx="${f(-.62 * r)}" cy="${f(.12 * r)}" rx="${f(.06 * r)}" ry="${f(.1 * r)}" fill="#fff" opacity=".35"/>`;
    return `<g opacity="${f(op)}" transform="translate(${f(x)} ${f(y)})">${s}</g>`;
  }
  const DEFS = `<defs><linearGradient id="gfcb-apple" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="#c8f57e"/><stop offset=".55" stop-color="#7fd65e"/><stop offset="1" stop-color="#2f9a5a"/></linearGradient>` +
    `<radialGradient id="gfcb-heat"><stop stop-color="#ffb060" stop-opacity=".45"/><stop offset=".5" stop-color="#ff9a4a" stop-opacity=".16"/><stop offset="1" stop-color="#ff9a4a" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="gfcb-plate" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#3b2190"/><stop offset="1" stop-color="#1a1458"/></linearGradient></defs>`;
  const APPLE_C = ['#e6ffb0', '#c8f57e', '#95e67c', '#fffbe8'];

  /* градиентная нить a → b по дуге (bend — изгиб), растёт на g (0..1); от цвета ca к cb */
  function gthread(id, a, b, ca, cb, op, g = 1, bend = 0, w = 1.6) {
    if (op <= .003 || g <= .003) return '';
    const m = [lerp(a[0], b[0], .5) - (b[1] - a[1]) * bend, lerp(a[1], b[1], .5) + (b[0] - a[0]) * bend];
    const d = `M${f(a[0])} ${f(a[1])} Q${f(m[0])} ${f(m[1])} ${f(b[0])} ${f(b[1])}`, dash = g < .999 ? ` pathLength="1" stroke-dasharray="${f(g)} 2"` : '';
    return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}">` +
      `<stop offset="0" stop-color="${ca}"/><stop offset="1" stop-color="${cb}"/></linearGradient></defs>` +
      `<g opacity="${f(op)}"><path d="${d}" fill="none" stroke="url(#${id})" stroke-width="${f(w * 3)}" stroke-linecap="round" opacity=".35" filter="url(#gfc-soft)"${dash}/>` +
      `<path d="${d}" fill="none" stroke="url(#${id})" stroke-width="${f(w)}" stroke-linecap="round"${dash}/></g>`;
  }
  const onQ = (a, b, bend, u) => bez(a, [lerp(a[0], b[0], .5) - (b[1] - a[1]) * bend, lerp(a[1], b[1], .5) + (b[0] - a[0]) * bend], b, u);

  /* «клеток»: шесть разноцветных значков-клеток по бокам, от каждого к своей соте груди — градиентная нить */
  const CELLN = [[50, 176, 'coral', -1], [42, 246, 'sky', -1], [52, 316, 'green', -1], [310, 176, 'pink', 1], [318, 246, 'violet', 1], [308, 316, 'teal', 1]];
  function cellNodes(t, c, C) {
    if (t < c.klet) return '';
    const fade = GFC.out(t, c.zap - .1, .4); if (fade <= .003) return '';
    const B = base(), cr = crumbAt(t, c);
    let th = '', nd = '';
    CELLN.forEach(([x, y, col, sd], i) => {
      const t0 = c.klet + .2 + i * .09, k = GFC.q(t, t0, .35); if (k <= .003) return;
      const wob = cr * (12 + 8 * H(i * 5 + 1));
      const nx = x + sd * wob + 1.2 * Math.sin(t * 1.9 + i), ny = y + 1.6 * Math.sin(t * 2.2 + i * 1.7) - cr * 8 * H(i + 3);
      const cl = B.links[i], e = C.P([cl.x, cl.y]), a = [nx, ny], bend = .12 * sd * (i % 3 === 1 ? 0 : (i % 3 ? 1 : -1));
      const g = GFC.qq(t, t0 + .1, t0 + .6), light = GFC.PAL[GFC.NAME[col]][0];
      th += gthread(`gfcb-n${i}`, a, e, light, '#fff1b8', .9 * k * fade, g, bend, 1.5);
      if (g >= .999) {
        const u = frac((t - t0) / 1.4 + i * .23), p = onQ(a, e, bend, u);
        th += GFC.dots([p], { r: 2.1, op: fade * Math.sin(Math.PI * u), t, glow: 1, color: '#fffbe8' });
        th += `<circle cx="${f(e[0])}" cy="${f(e[1])}" r="2.3" fill="#fffbe8" opacity="${f(.9 * fade)}"/>`;
      }
      nd += GFC.node(nx, ny, 17, 'cell', { color: col, scale: .55 + .45 * k, op: k * fade });
    });
    return th + nd;
  }

  /* подпись (Montserrat 800 капсом, ≥ 16 — на телефоне не растёт), печатается по буквам с t0 */
  const label = (x, y, text, t, t0, o = {}) => GFC.typed(x, y, text, t, t0, { size: o.size ?? 19, cps: o.cps ?? 22,
    anchor: o.anchor ?? 'middle', op: o.op ?? 1, color: o.color, glow: true, ls: .04, maxW: o.maxW, weight: 800 });
  // плашка-таблетка под надписи-источники: тёмно-фиолетовый градиент, тень, светлый кант, золотая черта сверху
  function pill(x, y, w, h, op, bar = 1) {
    if (op <= .003) return '';
    return `<g opacity="${f(op)}"><rect x="${f(x)}" y="${f(y + 3)}" width="${f(w)}" height="${f(h)}" rx="12" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
      `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="12" fill="url(#gfcb-plate)" opacity=".94"/>` +
      `<rect x="${f(x + .5)}" y="${f(y + .5)}" width="${f(w - 1)}" height="${f(h - 1)}" rx="11.5" fill="none" stroke="#fff" stroke-opacity=".24" stroke-width="1"/>` +
      (bar > .003 ? `<rect x="${f(x + 12)}" y="${f(y + 6)}" width="${f((w - 24) * bar)}" height="2.2" rx="1.1" fill="${GOLD}" opacity=".95"/>` : '') + '</g>';
  }

  const HLO = { y: 55 };   // заголовок в две строки, как в образце: 26 / акцент 39, буквы y≈36…106

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), B = base(), C = camera(t, c);
    let s = DEFS;
    // холмы и горизонт (идут с камерой; на крупных планах уходят вниз за кадр); «тепл» — тёплый отсвет на земле
    const hy = C.P([PCX, HOR])[1], hop = GFC.q(t, c.a3 - .2, 1.1) * (1 - GFC.qq(hy, 330, 362));
    const hwarm = .5 * GFC.q(t, c.tepl, .8) * (1 - GFC.qq(t, c.pkom, c.end));
    if (hop > .003) s += GFC.ground({ y: hy, op: hop, warm: hwarm, seed: 2 });
    // рыжий ореол вокруг тела («теплом»)
    const halo = .9 * GFC.q(t, c.tepl, .8) * (1 - .5 * GFC.qq(t, c.pit, c.pit + .8)) * (1 - GFC.qq(t, c.pkom, c.end));
    if (halo > .003) {
      const p = C.P([PCX, 205]);
      s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(80 * C.Z)}" ry="${f(150 * C.Z)}" fill="url(#gfcb-heat)" opacity="${f(halo * (.9 + .1 * Math.sin(t * 2)))}"/>`;
    }
    s += heat(t, c, C);
    s += manSvg(t, c);
    s += cellNodes(t, c, C);
    // «Ответ» — над головой тот же огонь с лучами, что в первом кадре; «приведёт» — нить от макушки; «богам» — вспышка
    const sop = GFC.q(t, c.zap - .05, .45) * GFC.out(t, c.plat, .8);
    if (sop > .003) {
      const top = C.P([PCX, B.headTop - 4]), g = GFC.qq(t, c.priv, c.bogam + .1), bot = [FIRE[0], FIRE[1] + FIRE_R + 3];
      if (g > .003 && top[1] > bot[1] + 2) {
        s += gthread('gfcb-up', top, bot, TEAL, '#ffe27a', sop, g, 0, 2.2);
        if (g < 1) s += GFC.dots([[PCX, lerp(top[1], bot[1], g)]], { r: 2.8, op: sop, t, glow: 1, color: '#fff6d0' });
        else {
          const R = [];
          for (let m = 0; m < 3; m++) { const k = frac((t - c.bogam) / 1.1 + m / 3); R.push([PCX, lerp(bot[1], top[1], k)]); }
          s += GFC.dots(R, { r: 2.8, op: sop, t, glow: 1, color: '#fff6d0' });
        }
      }
      s += fire(FIRE[0], FIRE[1], FIRE_R, t, sop, .7 * pulse(t, c.zap, .15, .9) + 1.0 * pulse(t, c.bogam, .15, .9), FIRE_YMIN);
    }
    // a04: крупное яблоко слева — вспыхивает на «еда»; «собранное» — вокруг прорисовывается золотая сота (знак порядка);
    // «порядке» — сота и яблоко вспыхивают; «из (неё)» — подаётся к телу; «чинишь» — тает струёй в живот
    const aop = GFC.q(t, c.plat, .3) * GFC.out(t, c.pit - .1, .6);
    if (aop > .003) {
      const sc = (.7 + .3 * GFC.q(t, c.plat, .5)) * (1 - .4 * GFC.qq(t, c.edy, c.org));
      const ax = APPLE.x + 10 * GFC.qq(t, c.ber, c.ber + .5), ay = APPLE.y + 2 * Math.sin(t * 1.3), r = APPLE.r * sc;
      const fl = Math.max(pulse(t, c.eda, .15, .8), pulse(t, c.por, .15, .8));
      if (fl > .01) s += `<circle cx="${f(ax)}" cy="${f(ay)}" r="${f(r * 2.1)}" fill="url(#gfc-halo)" opacity="${f(fl * aop)}"/>`;
      const hq = GFC.qq(t, c.sobr - .05, c.sobr + .5), hf = pulse(t, c.por, .15, 1);
      if (hq > .003) {
        const V = [0, 1, 2, 3, 4, 5].map(k => { const a = Math.PI / 3 * k - Math.PI / 2, R = r * 1.3; return [ax + R * Math.cos(a), ay + 2 + R * Math.sin(a)]; });
        const d = 'M' + V.map(v => `${f(v[0])} ${f(v[1])}`).join(' L') + ' Z';
        s += `<g opacity="${f(aop)}"><path d="${d}" fill="none" stroke="#ffb547" stroke-width="${f(5 + 3 * hf)}" opacity="${f(.35 + .4 * hf)}" filter="url(#gfc-soft)" pathLength="1" stroke-dasharray="${f(hq)} 2"/>` +
          `<path d="${d}" fill="${hf > .05 ? `rgba(255,226,122,${f(.16 * hf)})` : 'none'}" stroke="#ffe27a" stroke-width="2.2" stroke-linejoin="round" pathLength="1" stroke-dasharray="${f(hq)} 2"/></g>`;
      }
      s += apple(ax, ay, r, t, aop);
    }
    if (t > c.edy) s += stream(t, C, c.edy + .05, c.org + .3, 110, 21, [APPLE.x + 10, APPLE.y, 30], 1.4, APPLE_C);
    s += feedStream(t, c, C);
    // значки: «чинишь» — плюс у плеча, «тепл» — огонь среди рыжих точек, «писал» — книга рядом с плашкой Шрёдингера
    const kp = GFC.q(t, c.edy + .1, .35) * GFC.out(t, c.tepl, .5);
    if (kp > .003) s += GFC.node(114, 156, 17, 'plus', { color: 'green', scale: (.55 + .45 * kp) * (1 + .14 * pulse(t, c.sebya + .2, .15, .5)), op: kp });
    const kf = GFC.q(t, c.tepl + .05, .35) * GFC.out(t, c.pit - .05, .5);
    if (kf > .003) s += GFC.node(306, 248, 18, 'flame', { color: '#ffa04a', scale: .55 + .45 * kf, op: kf });
    const kb = GFC.q(t, c.tak, .35) * GFC.out(t, c.pit - .1, .4);
    if (kb > .003) s += GFC.node(204, 66, 17, 'book', { color: 'sky', scale: .55 + .45 * kb, op: kb });
    // подписи: гаснут на наезд «питается» (соты на весь кадр); мыслитель и −ЭНТРОПИЯ = ПОРЯДОК — до «порядком»
    const side = GFC.out(t, c.pit - .05, .5), fin = GFC.out(t, c.pkom + .25, .5);
    s += label(APPLE.x + 2, 298, 'ПОРЯДОК', t, c.por, { op: side, color: TEAL, maxW: 112 });
    s += label(298, 296, 'БЕСПОРЯДОК', t, c.bes, { op: side, color: '#ffc29a', maxW: 118 });
    s += label(298, 321, 'ТЕПЛО', t, c.tepl, { op: side, color: WARM });
    const lp = GFC.q(t, c.erv2 - .1, .25) * fin;
    s += pill(6, 25, 172, 90, .96 * lp, GFC.q(t, c.erv2 - .1, .6));
    s += label(17, 54, 'ЭРВИН', t, c.erv2 - .05, { anchor: 'start', op: fin, size: 20 });
    s += label(17, 80, 'ШРЁДИНГЕР', t, c.shr - .05, { anchor: 'start', op: fin, size: 20, color: GOLD, maxW: 148 });
    s += label(17, 106, '1944', t, c.tak - .1, { anchor: 'start', op: fin, size: 20, color: TEAL });
    s += pill(190, 25, 164, 70, .96 * GFC.q(t, c.otr - .05, .25) * fin, GFC.q(t, c.otr - .05, .6));
    s += label(272, 54, '−ЭНТРОПИЯ', t, c.otr, { size: 21, op: fin, color: GOLD, maxW: 142 });
    s += label(272, 83, '= ПОРЯДОК', t, c.pros, { size: 21, op: fin, color: TEAL, maxW: 142 });
    // крупные заголовки сверху (до «физик»)
    for (const h of c.HL) s += GFC.headline(h.s, t, h.t0, h.t1, HLO);
    return s;
  }
  SCENES.gfc_body = GFC.scene('gfc_body', (t, K, mode, p) => body(t, K));
  // шов с gfc_crowd (a05): человек к началу a05 — подошвы (180,330), рост 258, бирюза, цветные соты в груди; в координатах кадра
  SCENES.gfc_body.man = Object.freeze({ svg: (t, K) => manSvg(t, cues(K)), foot: [PCX, GY], h: PHT, color: 'teal' });
})();
