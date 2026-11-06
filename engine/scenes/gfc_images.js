/* gfc_images — «Бог ещё не создан», цветная версия «Цветная инфографика» (eps/god_future_color_p3), фразы e04 plough ·
 * e05 skills: сцена gf_images.js основной версии, перерисованная словарём GFC v2 (gfc_00_lib.js, window.GFC).
 *   e04 «Орала — это плуги. Не понял? Вот и загвоздка: слова перевели почти для всех, а образы остались древними.
 *        Ты видел живого пастуха?»
 *   e05 «Чтобы достучаться до каждого, нужны три умения: все семь тысяч языков, образы нашего времени и совет любому —
 *        таксисту, учёному и школьнику.»
 * Сюжет и время — как у gf_images (те же события на тех же словах, те же основы слов, те же швы), меняется только вид.
 * Отличия вида от gf_images (образец владельца eps/god_future/qa/style_flatcolor.jpg, его слова о цветной части 1:
 * «графика всё же не как на предложенной картинке, цветов мало»):
 *   — крупный заголовок GFC.headline на каждой мысли (Montserrat 800 капсом, главное слово золотом): В ЧЁМ / ЗАГВОЗДКА
 *     (с «Не понял?»), СЛОВА ПЕРЕВЕДЕНЫ (СЛОВА — на «слова», ПЕРЕВЕДЕНЫ — на «перевели»; вместо моно-подписи СЛОВА
 *     ПЕРЕВЕЛИ y 40 — она была выше линии y 46), ОБРАЗЫ ДРЕВНИЕ (ОБРАЗЫ — на «образы», ДРЕВНИЕ — на «древними»; вместо
 *     ОБРАЗЫ — ДРЕВНИЕ y 40), КАК ДОЙТИ / ДО КАЖДОГО? (e05 до «нужны»), 3 УМЕНИЯ (вместо ТРИ УМЕНИЯ, гаснет на «совет»);
 *   — плуг не из точек, а плоский цветной: деревянные грядиль и ручки (тёплое дерево с бликом и тёмными железными
 *     полосками), стальной лемех (небесный градиент с бликом), колесо с бирюзовым ободом, спицами и золотой ступицей,
 *     бирюзовые рукояти; из точек он только в первые .45 с (шов А: gfc_reach кончается плугом из искр) — на «Орала»
 *     точки заливаются в плоский плуг со вспышкой. Поле — фиолетовые холмы GFC.ground (y 251) со звёздным небом,
 *     борозда и комья — тёплые; наезд ×1 → ×1,3 — вместе с холмами;
 *   — «?» на «Не» — фиалковый значок GFC.node с золотым «?» (r 26), на «загвоздка» вздрагивает, волна;
 *   — книга — раскрытая, кремовые страницы с разноцветными строками на фиалковом переплёте, золотой ореол; 7 лучей —
 *     градиентные нити (золото у книги → свой цвет у толпы), подписи языков — цветные таблетки;
 *   — толпа — 48 плоских разноцветных людей GFC.person (соседи — разные цвета), на холмах; кому дошёл луч — над головой
 *     золотая строка и тёплый свет на фигуре, пятерым — сиреневый «?»; в e05 над задним рядом — цветные «?» в цвет
 *     человека, волна цветных колец;
 *   — облачка-образы — цветные стеклянные пузыри (бирюза, розовый, небо, зелёный) с плоскими рисунками: овца (белая
 *     шерсть), посох, бурдюк, маленький плуг; на «древними» сереют и осыпаются серыми точками; точки собираются в пастуха
 *     и трёх овец, и с «живого» до «пастуха» они заливаются плоскими цветными фигурами (пастух бирюзовый с посохом),
 *     вспышка на «пастуха», подпись ПАСТУХ — золотом;
 *   — чек-лист e05 — три цветные клетки (бирюза, розовый, золото: языки, образы, совет), счётчик 7 000+ золотом, бегущие
 *     коды языков — цветные таблетки, значки — плоские цветные: жёлтое такси с шашечками и окнами, колба с зелёной
 *     жидкостью и пузырьками, розовый рюкзак с карманом.
 * Бога, Иисуса и пророков нет. Красного нет (опасности в этих фразах нет).
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode (plough / skills) — лишь имя кадра.
 * Вход — наплыв 0,5 с из gfc_reach/swords (делает GFC.scene). Шов А (начало), как кончается gfc_reach: плуг из цветных точек,
 * центр (180, 200), ширина ≈ 260, «МЕЧИ — НА ОРАЛА» (Montserrat 800, 19, ОРАЛА золотом) на y 300, холмы на y 290.
 *  «Орала»      точки плуга заливаются в цветной плуг, вспышка (тёплый ореол, отсвет на холмах); холмы к «плуги»
 *               поднимаются к плугу (y 290 → 252), на них — поле.
 *  «это плуги»  «МЕЧИ — НА ОРАЛА» уходит, по словам ОРАЛО = ПЛУГ (22, ПЛУГ золотом, y 300); плуг пашет: поле едет
 *               вправо, за лемехом растёт тёплая борозда, летят комья, колесо крутится; с «это» наезд ×1 → ×1,3.
 *  «Не понял?»  на «Не» над плугом значок «?», заголовок В ЧЁМ / ЗАГВОЗДКА; «загвоздка» — значок вздрагивает, волна.
 *  «слова»      плуг уменьшается влево-вверх (к 56, 118, ×.32) и тускнеет, поле гаснет; вверху книга (y 79..143), заголовок
 *               СЛОВА…ПЕРЕВЕДЕНЫ; снизу поднимается толпа; «перевели» — из книги веером 7 цветных лучей с подписями
 *               RU · EN · ES · SW · HI · ZH · AR; «почти для всех» — над головами загораются золотые строки, у пятерых «?».
 *  «образы»     лучи и книга гаснут; над толпой четыре цветных пузыря-образа (радиус 42, x 54/138/222/306, y 118/166/118/166):
 *               ОВЦА · ПОСОХ · БУРДЮК · ПЛУГ, заголовок ОБРАЗЫ…ДРЕВНИЕ; «древними» — пузыри сереют и осыпаются точками.
 *  «Ты видел»   толпа уходит вниз; точки собираются в пастуха с посохом справа и трёх овец слева, с «живого» — заливаются
 *               цветом; «пастуха» — вспышка, ПАСТУХ.
 *  (после фразы) точки пастуха летят к головам толпы, она сразу поднимается снизу (×1,12), строк нет.
 *  «Чтобы»      заголовок КАК ДОЙТИ / ДО КАЖДОГО?; «достучаться» — над задним рядом слева направо цветные «?»; «каждого» —
 *               волна колец, «?» вспыхивают; у пятерых — пунктирное кольцо.
 *  «нужны три умения» толпа и холмы уходят вниз; три пустые цветные клетки (квадрат 28, x 52, y 122/188/254) под камерой
 *               списка — сначала крупно в центре, заголовок 3 УМЕНИЯ; клетки мигают рамкой.
 *  «все семь тысяч языков» камера на строке 1 (×1,32–1,38); через кадр бегут две строки цветных таблеток-кодов; коды влетают в счётчик;
 *               «семь» — 0 → 7 000 (21, золото), «языков» — 7 000+ ЯЗЫКОВ.
 *  «образы нашего времени» — камера на строке 2 (×1,06–1,1), ОБРАЗЫ НАШЕГО ВРЕМЕНИ по словам (15, от x 92); «совет» —
 *               3 УМЕНИЯ гаснет; «любому» — камера на строке 3 (×1,08–1,11), СОВЕТ КАЖДОМУ. Наезды на строки 1–3 мягче, чем в
 *               gf_images (×1,45/1,2/1,25): Montserrat капсом шире моно, иначе подписи уходят за край кадра; подписи строк 2–3 —
 *               15 без роста в зоне Reels (16 не помещается от x 92), 7 000+ — 21, ЯЗЫКОВ — 16.
 *  «таксисту», «учёному», «школьнику» — под третьей клеткой (y 290, x 116/184/252, ×1,2) из цветных точек собираются
 *               плоские значки: такси въезжает слева (линии скорости, качается), колба покачивается, рюкзак падает и
 *               подпрыгивает. С c.set (≈ 44,0 с) камера без масштаба, всё стоит: шов Б (конец) — три пустые мигающие
 *               клетки, подписи от x 92, значки на y 290, толпы, холмов и заголовка нет.
 * Слова-основы GFC.w (как у gf_images): e04 — орала, это, плуги, понял, загвоздк, слова, перевели, почти, всех, образы,
 *   остались, древн, ты, живого, пастух (и конец); e05 — чтобы, достучат, каждого, нужны, три, умения, все, семь, языков,
 *   образы, нашего, времени, совет, любому, таксист, ученому, школьник (и конец). Нет слова — доля фразы.
 * Параметры p: s (фраза), mode, K (cues части), prev/prev_mode (наплыв — GFC.scene). Камера движка нейтральна.
 * Свои id в SVG — с приставкой gfci- (градиенты дерева, стали, страниц, пузырей и лучей).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI = Math.PI, PI2 = Math.PI * 2;
  const H = n => GFC.hash(n);
  const { q, qq, lerp, clamp, ease } = GFC;
  const PAL = GFC.PAL, GOLD = GFC.GOLD, INK = GFC.INK, mix = GFC.mixC;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const gop = (op, s) => op <= .003 || !s ? '' : op >= .999 ? s : `<g opacity="${f(op)}">${s}</g>`;
  const ring = (x, y, r0, r1, u, op, w = 1.8, col = '#fff') => u <= 0 || u >= 1 || op <= .003 ? '' :
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(lerp(r0, r1, u))}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(op * (1 - u))}"/>`;
  const ID = c => c;
  const WOOD = '#f0a04a', WOODD = '#a8522a', WOODL = '#ffe09a', IRON = '#3b2a7a', GREY = '#9b96b0';
  // phrase bounds only for scene_test without K (the voice of 05.11)
  const DEF = { e04: [26.32, 34.98], e05: [35.28, 44.01] };

  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GFC.bare(stem);
    return ws.filter(w => GFC.bare(w.w).startsWith(s)).length > n;
  };
  function cues(K) {
    const c = {};
    [c.s4, c.e4] = span(K, 'e04'); [c.s5, c.e5] = span(K, 'e05');
    const W = (id, stem, share, end = false) => {
      if (hasW(K, id, stem, 0)) return end ? GFC.we(K, id, stem) : GFC.w(K, id, stem);
      const [a, e] = span(K, id);
      return a + share * (e - a);
    };
    c.ora = W('e04', 'орала', 0); c.eto = W('e04', 'это', .067); c.plu = W('e04', 'плуги', .102);
    c.pon = W('e04', 'понял', .212); c.zag = W('e04', 'загвоздк', .335);
    c.slo = W('e04', 'слова', .427); c.per = W('e04', 'перевели', .469); c.poc = W('e04', 'почти', .508);
    c.vse = W('e04', 'всех', .561); c.obr = W('e04', 'образы', .644); c.ost = W('e04', 'остались', .697);
    c.dre = W('e04', 'древн', .748); c.ty = W('e04', 'ты', .827); c.ziv = W('e04', 'живого', .87);
    c.pas = W('e04', 'пастух', .931); c.pasE = W('e04', 'пастух', .991, true);
    c.cht = W('e05', 'чтобы', 0); c.dos = W('e05', 'достучат', .025); c.kaz = W('e05', 'каждого', .099);
    c.nuz = W('e05', 'нужны', .179); c.tri = W('e05', 'три', .204); c.ume = W('e05', 'умения', .227);
    c.vs5 = W('e05', 'все', .305); c.sem = W('e05', 'семь', .36); c.yaz = W('e05', 'языков', .424);
    c.ob5 = W('e05', 'образы', .511); c.nas = W('e05', 'нашего', .561); c.vre = W('e05', 'времени', .587);
    c.sov = W('e05', 'совет', .664); c.lub = W('e05', 'любому', .692);
    c.tak = W('e05', 'таксист', .765); c.uch = W('e05', 'ученому', .85); c.shk = W('e05', 'школьник', .928);
    c.shkE = W('e05', 'школьник', .99, true);
    c.set = Math.min(c.shk + .2, c.e5 - .4);        // the checklist stands in the pose of seam Б from here (no motion)
    return c;
  }

  /* ---------------- helpers: segments → evenly spaced dots ---------------- */
  const circ = (cx, cy, r, n, a0 = 0, a1 = PI2, ry = r) => {
    const S = [];
    for (let i = 0; i < n; i++) {
      const a = lerp(a0, a1, i / n), b = lerp(a0, a1, (i + 1) / n);
      S.push([cx + r * Math.cos(a), cy + ry * Math.sin(a), cx + r * Math.cos(b), cy + ry * Math.sin(b)]);
    }
    return S;
  };
  const bez = (a, c, b, n) => {
    const S = [];
    let p = a;
    for (let i = 1; i <= n; i++) {
      const u = i / n, x = (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0],
        y = (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1];
      S.push([p[0], p[1], x, y]); p = [x, y];
    }
    return S;
  };
  function along(segs, N) {
    const L = segs.map(s => Math.hypot(s[2] - s[0], s[3] - s[1]) || .001), tot = L.reduce((a, b) => a + b, 0), P = [];
    for (let i = 0; i < N; i++) {
      let d = (i + .5) / N * tot, k = 0;
      while (k < segs.length - 1 && d > L[k]) { d -= L[k]; k++; }
      const u = clamp(d / L[k]), s = segs[k];
      P.push([lerp(s[0], s[2], u), lerp(s[1], s[3], u)]);
    }
    return P;
  }
  const resample = (P, N) => Array.from({ length: N }, (_, i) => P[Math.floor(i * P.length / N)]);
  const lerpP = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
  const lineS = (x1, y1, x2, y2, col, w, op = 1, cap = 'round') =>
    `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${f(w)}" stroke-linecap="${cap}"${op < .999 ? ` opacity="${f(op)}"` : ''}/>`;

  /* ---------------- own gradients (ids gfci-*) ---------------- */
  const BX = 180, BT = 84, BW = 68, BH = 54, RY0 = BT + BH + 8, RY1 = 236;
  const RX = [36, 84, 132, 180, 228, 276, 324], CODES = ['RU', 'EN', 'ES', 'SW', 'HI', 'ZH', 'AR'];
  const RCOL = [1, 0, 2, 5, 6, 3, 4];                 // colours of the 7 rays (PAL): teal, coral, sky, pink, green, violet, gold
  const lg = (id, stops, at) => `<linearGradient id="${id}" ${at}>${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const DEFS = '<defs>' +
    lg('gfci-wood', [[0, WOODL], [.5, WOOD], [1, WOODD]], 'x1="0" y1="0" x2="0" y2="1"') +
    lg('gfci-iron', [[0, '#eaf5ff'], [.45, '#8cc4ff'], [1, '#3b6fe0']], 'x1="0" y1="0" x2=".8" y2="1"') +
    lg('gfci-page', [[0, '#fffaf0'], [1, '#e4d2ff']], 'x1="0" y1="0" x2="0" y2="1"') +
    lg('gfci-skin', [[0, '#f2b070'], [1, '#9a5230']], 'x1="0" y1="0" x2=".6" y2="1"') +
    `<radialGradient id="gfci-bub" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".45" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    RX.map((x, k) => lg(`gfci-r${k}`, [[0, GOLD], [.35, '#ffe9a8'], [1, PAL[RCOL[k]][0]]],
      `gradientUnits="userSpaceOnUse" x1="${BX}" y1="${RY0}" x2="${x}" y2="${RY1}"`)).join('') + '</defs>';

  /* ---------------- text: words of one line on their words (pop + flash), Montserrat ---------------- */
  function words(x, y, items, size, t, o = {}) {
    const sz = o.grow === false ? size : GFC.fs(size), em = o.ls ?? .06, sp = GFC.textW(' ', sz) + em * sz;
    const W = items.map(([tx]) => GFC.textW(String(tx).toUpperCase(), sz, em * sz));
    const total = W.reduce((a, b) => a + b, 0) + sp * (items.length - 1);
    let pos = o.anchor === 'start' ? x : x - total / 2, s = '';
    items.forEach(([text, t0, col], i) => {
      if (t >= t0 - .03) {
        const k = q(t, t0 - .03, .12), pop = 1 + .3 * Math.min(1, 18 / size) * (1 - qq(t, t0 - .03, t0 + .25)), fl = pulse(t, t0 - .03, .05, .5);
        const oo = { size, anchor: 'start', ls: em, weight: o.weight ?? 700, color: col ?? o.color ?? '#fff', grow: o.grow };
        let g = GFC.mono(pos, y, text, { ...oo, opacity: (o.op ?? .97) * k, glow: o.glow });
        if (fl > .02) g += gop(.6 * fl, GFC.mono(pos, y, text, { ...oo, opacity: 1, glow: true }));
        s += GFC.zoom(g, pos + W[i] / 2, y - sz * .35, pop);
      }
      pos += W[i] + sp;
    });
    return s;
  }
  // one headline line whose parts appear on their own words: parts [[text with *accent*, t0], …]
  const W800 = 1.035;
  function headSeq(parts, t, t1, o = {}) {
    if (t < parts[0][1]) return '';
    const size = o.size ?? 26, ls = o.ls ?? .02;
    const B = GFC.headBox(parts.map(p => p[0]).join(' '), o), L = B.lines[0], g0 = L.segs[0];
    const k = g0.size / (g0.acc ? size * (o.big ?? 1.5) : size);
    const ws = parts.map(p => GFC.headBox(p[0], { ...o, size: size * k, maxW: 1e4 }).lines[0].w);
    const gap = GFC.textW(' ', size * k, size * k * ls) * W800;
    let x = (o.x ?? 180) - (ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1)) / 2, s = '';
    parts.forEach(([tx, t0], i) => {
      s += GFC.headline(tx, t, t0, t1, { ...o, size: size * k, maxW: 1e4, x: x + ws[i] / 2 });
      x += ws[i] + gap;
    });
    return s;
  }

  /* ---------------- the plough (side view): local units, origin at (PCX, PCY); ground at local y 49 ---------------- */
  const PCX = 182, PCY = 200, PGY = 49, WHL = [-100, 30, 19];
  let PL = null;
  function plough0() {               // the dots of the plough (seam A and the crumbling images use them)
    if (PL) return PL;
    const segs = [
      [58, 21, -122, -9], [58, 24.5, -120, -5.5], ...circ(-128, -10, 5, 8), ...circ(WHL[0], WHL[1], WHL[2], 24),
      [-100, -5, -100, 12], [22, 15, 16, 42], [25.5, 15, 19.5, 42],
      [34, 42, 112, -51], [52, 32, 128, -45], [77, -9, 94, -10],
      [-24, 51, 38, 49], [38, 49, 46, 16], ...bez([46, 16], [-4, 20], [-24, 51], 8),
    ];
    const P = along(segs, 300);
    const F = u => { const a = [46, 16], c = [-4, 20], b = [-24, 51]; return [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]; };
    const G = u => u < .5 ? lerpP([46, 16], [38, 49], u * 2) : lerpP([38, 49], [-24, 51], u * 2 - 1);
    for (let i = 1; i < 9; i++) for (const v of [.35, .7]) P.push(lerpP(F(i / 9), G(i / 9), v));
    PL = { P };
    return PL;
  }
  // a wooden stick: dark edge, warm core, light glint
  const stick = (x1, y1, x2, y2, w) => lineS(x1, y1, x2, y2, WOODD, w) + lineS(x1, y1, x2, y2, WOOD, w * .62) +
    lineS(x1 - .5, y1 - .7, x2 - .5, y2 - .7, WOODL, w * .2, .8);
  // the flat plough in local units (origin = plough origin); roll — the wheel angle; G — colour mapper (grey for old images)
  function ploughArt(roll, G = ID) {
    let s = '';
    // the far handle, the rung
    s += stick(52, 32, 128, -45, 5) + lineS(116.6, -33.5, 128, -45, G('#17998f'), 6.4) + lineS(118, -35.6, 127, -44.5, G('#63e6d2'), 2.2, .9);
    s += stick(77, -9, 94, -10, 3.6);
    // the wheel stand and the wheel (teal rim, three spokes, gold hub)
    s += lineS(-100, -6, -100, 30, G(IRON), 3.8) + lineS(-100.6, -6, -100.6, 22, G('#8ccbff'), 1, .7);
    const [wx, wy, wr] = WHL;
    s += `<circle cx="${wx}" cy="${wy}" r="${wr}" fill="${G('#2a1858')}" opacity=".28"/>` +
      `<circle cx="${wx}" cy="${wy}" r="${wr}" fill="none" stroke="${G('#2a1858')}" stroke-width="5.6"/>` +
      `<circle cx="${wx}" cy="${wy}" r="${wr}" fill="none" stroke="${G('#63e6d2')}" stroke-width="2.2"/>` +
      `<circle cx="${wx}" cy="${wy}" r="${wr - 3.6}" fill="none" stroke="${G('#17998f')}" stroke-width="1"/>`;
    for (let k = 0; k < 3; k++) {
      const b = roll + k * PI / 3, dx = Math.cos(b) * (wr - 3), dy = Math.sin(b) * (wr - 3);
      s += lineS(wx - dx, wy - dy, wx + dx, wy + dy, G('#63e6d2'), 2.1);
    }
    s += `<circle cx="${wx}" cy="${wy}" r="4.6" fill="${G('#ffb23d')}" stroke="${G('#fff3c8')}" stroke-width=".9"/>` +
      `<path d="M${f(wx - wr * .87)} ${f(wy - wr * .5)} A${wr} ${wr} 0 0 1 ${f(wx - wr * .26)} ${f(wy - wr * .97)}" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".5"/>`;
    // the beam (wooden, two dark iron bands with a glint)
    const P1 = [60, 18.5], P2 = [60, 26.5], P3 = [-120, -3.5], P4 = [-124, -11];
    s += `<path d="M${P1} L${P2} L${P3} L${P4} Z" fill="${G(WOOD)}" stroke="${G(WOODD)}" stroke-width="1.2" stroke-linejoin="round"/>` +
      lineS(P4[0] + 2, P4[1] + 1.4, P1[0] - 1, P1[1] + 1.2, G(WOODL), 1.8, .9) + lineS(P3[0] + 2, P3[1] - .6, P2[0] - 1, P2[1] - .8, G(WOODD), 1.6, .8);
    for (const u of [.22, .62]) {
      const a = lerpP(P4, P1, u), b = lerpP(P3, P2, u);
      s += lineS(a[0], a[1] - .6, b[0], b[1] + .6, G(IRON), 3.4, 1, 'butt') + lineS(a[0] - .9, a[1] - .4, b[0] - .9, b[1] + .4, G('#b7c6ff'), .8, .8, 'butt');
    }
    // the hitch ring (steel)
    s += `<circle cx="-128" cy="-10" r="5" fill="none" stroke="${G(IRON)}" stroke-width="3.4"/><circle cx="-128" cy="-10" r="5" fill="none" stroke="${G('#8ccbff')}" stroke-width="1.4"/>`;
    // the post
    s += `<path d="M20 12 L28 12 L22.5 44 L14.5 44 Z" fill="${G(WOOD)}" stroke="${G(WOODD)}" stroke-width="1.1" stroke-linejoin="round"/>` + lineS(21.2, 13.5, 16, 42, G(WOODL), 1.4, .85);
    // the moldboard and the share (steel: sky gradient, a glint)
    s += `<path d="M46 16 Q-4 20 -24 51 L38 49 Z" fill="${G('#6aa8f0')}" opacity="${G === ID ? 0 : 1}"/>` +
      `<path d="M46 16 Q-4 20 -24 51 L38 49 Z" fill="url(#gfci-iron)" stroke="${G('#e2f2ff')}" stroke-width="1" stroke-linejoin="round" opacity="${G === ID ? 1 : .2}"/>` +
      lineS(38, 49, 46, 16, G('#2f5fc8'), 2) +
      `<path d="M40.5 22 Q8 25.5 -11 45" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>`;
    // the near handle with its grip
    s += stick(34, 42, 112, -51, 5.4) + lineS(100.3, -37, 112, -51, G('#17998f'), 6.8) + lineS(102, -38.6, 111, -49.8, G('#63e6d2'), 2.3, .9);
    return s;
  }
  function plough(t, z, tx, ty, op, glow, roll, rock, solid) {
    if (op <= .003) return '';
    let s = '';
    if (glow > .003) s += `<ellipse cx="${PCX}" cy="${PCY}" rx="165" ry="92" fill="url(#gfc-halo)" opacity="${f(.95 * glow)}"/>`;
    s += `<ellipse cx="${PCX - 34}" cy="${PCY + PGY + 2}" rx="128" ry="5.5" fill="url(#gfc-shadow)" opacity="${f(.85 * solid)}"/>`;
    if (solid > .003) s += gop(solid, `<g transform="translate(${PCX} ${f(PCY + rock)})">${ploughArt(roll)}</g>`);
    if (solid < .997) {
      const P = GFC.jitter(plough0().P.map(p => [PCX + p[0], PCY + p[1] + rock]), t, .3, 5);
      s += GFC.dots(P, { r: 1.6, op: .95 * (1 - solid), t, glow: .6, color: [WOODL, '#ffcf7a', '#8ccbff', '#63e6d2', '#fff3c8'] });
    }
    return gop(op, GFC.zoom(s, 180, 200, z, tx, ty));
  }
  // the field under the plough: it slides right while the plough ploughs (the plough goes left); a warm furrow grows
  // behind the share, clods fly up from it
  const GX0 = 14, GX1 = 346, GW = GX1 - GX0, GN = 90, GY = PCY + PGY, TIPX = PCX - 24, SPD = 40;
  const SOIL = ['#e0893a', '#ffcf7a', '#b5602e', '#f0a04a', '#c97a40'];
  function field(t, c, op, moving) {
    if (op <= .003) return '';
    const sh = SPD * Math.max(0, t - c.plu);
    const flat = [], ridge = [];
    for (let i = 0; i < GN; i++) {
      const x = GX0 + ((i * GW / GN + (H(i * 3.3 + 1) - .5) * 2.5 + sh) % GW + GW) % GW;
      if (x > TIPX + 4 && x < TIPX + 4 + sh) ridge.push([x, GY - 1 - 3 * H(i * 7.1)], [x + 1.8, GY - 5.5 - 4 * H(i * 5.3)], [x - 1.5, GY - 9.5 - 3 * H(i * 2.9)]);
      else flat.push([x, GY + 2 + (H(i * 2.7) - .5) * 1.6]);
    }
    let s = GFC.dots(flat, { r: 1.35, op: .7, t, glow: 0, color: ['#b89aff', '#9c7ef2', '#d7c4ff'] }) +
      GFC.dots(ridge, { r: 2.2, op: .98, t, glow: .5, color: SOIL });
    if (moving > .003) {
      let cl = '';
      for (let k = 0; k < 9; k++) {
        const u = (((t - c.plu) * 1.7 + k / 9) % 1 + 1) % 1, x = TIPX + 4 + 46 * u + 6 * H(k), y = GY - 3 - 34 * u * (1 - u) * (1 + H(k * 3));
        cl += `<circle cx="${f(x)}" cy="${f(y)}" r="2.1" fill="${SOIL[k % SOIL.length]}" opacity="${f(.95 * Math.sin(PI * u) * moving)}"/>`;
      }
      s += cl;
    }
    return gop(op, s);
  }

  /* ---------------- the book (open: cream pages, colour lines, violet cover) and the rays of translation ---------------- */
  const LINEC = ['#17998f', '#e8505b', '#3b6fe0', '#9547d6', '#2f9e5e', '#e0559a'];
  function book(t, op, lit) {
    if (op <= .003) return '';
    const pg = (sd, dx = 0, dy = 0) => `M${BX + dx} ${BT + 4 + dy} Q${BX + sd * 26 + dx} ${BT - 5 + dy} ${BX + sd * BW + dx} ${BT + dy} L${BX + sd * BW + dx} ${BT + BH + dy} Q${BX + sd * 26 + dx} ${BT + BH - 4 + dy} ${BX + dx} ${BT + BH + 5 + dy} Z`;
    let s = `<ellipse cx="${BX}" cy="${BT + BH / 2}" rx="104" ry="70" fill="url(#gfc-halo)" opacity="${f(.45 + .55 * lit)}"/>` +
      `<ellipse cx="${BX}" cy="${BT + BH / 2 + 6}" rx="80" ry="44" fill="url(#gfc-glowP)" opacity=".8"/>`;
    // the cover (violet) under the pages
    s += `<path d="M${BX} ${BT + BH + 11} Q${BX - 30} ${BT + BH + 1} ${BX - BW - 5} ${BT + BH + 5} L${BX - BW - 5} ${BT + 2} L${BX + BW + 5} ${BT + 2} L${BX + BW + 5} ${BT + BH + 5} Q${BX + 30} ${BT + BH + 1} ${BX} ${BT + BH + 11} Z" fill="url(#gfc-p3)" stroke="#eba2ff" stroke-width="1" stroke-linejoin="round"/>`;
    s += `<path d="${pg(-1, 0, 2)} ${pg(1, 0, 2)}" fill="#c9b6ff" opacity=".8"/>` +            // page edges
      `<path d="${pg(-1)} ${pg(1)}" fill="url(#gfci-page)" stroke="#fff" stroke-width="1" stroke-linejoin="round"/>`;
    for (const side of [-1, 1]) for (let r = 0; r < 5; r++) {
      const y = BT + 12 + r * 8.6, x0 = BX + side * 8, x1 = BX + side * (BW - 8) * (r === 4 ? .6 : 1), da = [];
      for (let k = 0; k < 6; k++) da.push(f(4 + 9 * H(r * 11 + k + side * 5)), f(3 + 2 * H(r * 7 + k)));
      s += `<line x1="${x0}" y1="${y}" x2="${f(x1)}" y2="${y}" stroke="${LINEC[(r + (side > 0 ? 3 : 0)) % LINEC.length]}" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="${da.join(' ')}" opacity="${f(.7 + .25 * Math.sin(t * 3 + r + side))}"/>`;
    }
    s += `<line x1="${BX}" y1="${BT + 4}" x2="${BX}" y2="${BT + BH + 5}" stroke="#b89aff" stroke-width="1.6"/>` +
      `<path d="M${BX - BW + 4} ${BT + 3} Q${BX - 30} ${BT - 3} ${BX - 6} ${BT + 3}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`;
    return gop(op, s);
  }
  const land = (c, k) => c.per - .05 + k * .11 + .42;      // the ray k reaches the crowd
  function rays(t, c, op) {
    if (op <= .003) return '';
    let s = '', g0 = '';
    for (let k = 0; k < 7; k++) {
      const L0 = c.per - .05 + k * .11, g = qq(t, L0, L0 + .42);
      if (g <= 0) continue;
      const a = [BX, RY0], b = [RX[k], RY1], e = lerpP(a, b, g), col = PAL[RCOL[k]];
      g0 += `<line x1="${a[0]}" y1="${a[1]}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="${col[0]}" stroke-width="6"/>`;
      s += `<line x1="${a[0]}" y1="${a[1]}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="url(#gfci-r${k})" stroke-width="2.2" stroke-linecap="round"/>`;
      if (g < 1) s += `<circle cx="${f(e[0])}" cy="${f(e[1])}" r="4.2" fill="${col[0]}" opacity=".8" filter="url(#gfc-soft)"/><circle cx="${f(e[0])}" cy="${f(e[1])}" r="2.2" fill="#fff"/>`;
      else for (let j = 0; j < 2; j++) {
        // a line of text running down the ray
        const u = ((t * .85 + j * .5 + k * .13) % 1 + 1) % 1, p = lerpP(a, b, u), op2 = Math.sin(PI * u);
        for (let r = 0; r < 3; r++) s += lineS(p[0] - 6, p[1] - 3 + r * 3, p[0] + 6 - 4 * (r === 2), p[1] - 3 + r * 3, '#fff', 1.4, .92 * op2);
      }
      const lq = q(t, L0 + .22, .2);
      if (lq > .003) {
        const lp = lerpP(a, b, .74), z = 1 + .5 * (1 - qq(t, L0 + .22, L0 + .5));
        const lab = `<rect x="${f(lp[0] - 17)}" y="${f(lp[1] - 14)}" width="34" height="20" rx="10" fill="${col[1]}" stroke="${col[0]}" stroke-width="1.3"/>` +
          `<rect x="${f(lp[0] - 13)}" y="${f(lp[1] - 12.5)}" width="26" height="4" rx="2" fill="#fff" opacity=".22"/>` +
          GFC.mono(lp[0], lp[1] + 1.6, CODES[k], { size: 16, anchor: 'middle', opacity: 1, ls: .04, weight: 800 });
        s += gop(lq, GFC.zoom(lab, lp[0], lp[1] - 4, z));
      }
    }
    return gop(op, `<g filter="url(#gfc-soft)" opacity=".35">${g0}</g>${s}`);
  }

  /* ---------------- the crowd: 48 flat people in three rows, neighbours of different colours ---------------- */
  // rows: [feet y, height, -, people, x0, step] — back 18, middle 16, front 14 (48 people)
  const ROWS = [[282, 38, 30, 18, 24, 18], [306, 46, 38, 16, 26, 20.5], [336, 56, 46, 14, 30, 23]];
  const UNLIT = new Set([36, 41, 45, 21, 28]);
  let CR = null;
  function crowd0() {
    if (CR) return CR;
    CR = [];
    ROWS.forEach(([gy, h0, , cnt, x0, dx], j) => {
      let prev = -1;
      for (let i = 0; i < cnt; i++) {
        const x = x0 + i * dx + (H(j * 41 + i * 3.7) - .5) * 4, h = h0 * (.93 + .14 * H(j * 13 + i * 5.1));
        let ci = Math.floor(H(j * 29 + i * 7.3 + 5) * 6) % 6;
        if (ci === prev) ci = (ci + 1 + Math.floor(H(i * 9.1 + j) * 4)) % 6;
        prev = ci;
        CR.push({ x, gy, h, row: j, col: GFC.CROWD[ci], top: gy - h, head: gy - .87 * h, seed: 100 + j * 20 + i });
      }
    });
    return CR;
  }
  const zone = x => { let b = 0; for (let k = 1; k < 7; k++) if (Math.abs(RX[k] - x) < Math.abs(RX[b] - x)) b = k; return b; };
  function crowd(t, c, dy, op, lit = 1) {          // lit — the lines over the heads (e04); e05 has «?» there instead
    if (op <= .003) return '';
    const C = crowd0();
    let s = '', L = '', G = '', R = '';
    C.forEach((p, i) => {
      const la = land(c, zone(p.x)) + .03 * p.row, on = UNLIT.has(i) ? 0 : q(t, la, .2) * lit;
      const wv = c.kaz - .12 + p.x / 360 * .45, wf = pulse(t, wv, .08, .45) * (1 - lit);
      s += GFC.person(p.x, p.gy + dy, p.h, { t, color: p.col, seed: p.seed, shade: [.4, .2, 0][p.row] * (1 - .6 * on),
        lit: .55 * on + .5 * wf, shadow: .7 });
      const hy = p.top + dy, ly = hy - 4 - p.h * .05;
      // «до каждого»: a wave of colour rings over the heads (left → right); the unlit ones keep a dashed ring
      R += ring(p.x, p.head + dy, 4, 16, qq(t, wv, wv + .5), .9 * (1 - lit), 1.5, PAL[p.col][0]);
      if (UNLIT.has(i)) {
        const u = q(t, c.kaz + .2, .3) * (1 - lit);
        if (u > .003) R += `<circle cx="${f(p.x)}" cy="${f(p.head + dy)}" r="${f(p.h * .17 + 2 + 1.5 * Math.sin(t * 5 + i))}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 2.4" opacity="${f(.9 * u)}"/>`;
        // «почти»: no line over these heads — a small lilac «?» instead, until the images come
        const qo = q(t, c.vse + .15, .25) * (1 - qq(t, c.obr - .1, c.obr + .2)) * lit;
        if (qo > .003) R += GFC.mono(p.x, ly + 3, '?', { size: 14, anchor: 'middle', opacity: .9 * qo, color: '#cdb8ff', weight: 800 });
        return;
      }
      if (on <= .003) return;
      const fl = pulse(t, la, .05, .45), w = 3.2 + p.h * .07;
      const pill = `<rect x="${f(p.x - w)}" y="${f(ly - 2)}" width="${f(2 * w)}" height="4" rx="2"`;
      L += `${pill} fill="${GOLD}" opacity="${f(on * (.85 + .15 * Math.sin(t * 3 + i)))}"/>` +
        lineS(p.x - w + 1.5, ly - .3, p.x + w * .3, ly - .3, '#fff8de', .9, .8 * on);
      G += `${pill} fill="${GOLD}" opacity="${f(.5 * on + .45 * fl)}"/>`;
    });
    return gop(op, s + (L ? `<g filter="url(#gfc-glow3)">${G}</g>${L}` : '') + R);
  }

  /* ---------------- the ancient images: four colour bubbles over the crowd ---------------- */
  const BUB = [54, 138, 222, 306], BUBYS = [118, 166, 118, 166], BR = 42, BLAB = ['ОВЦА', 'ПОСОХ', 'БУРДЮК', 'ПЛУГ'];
  const BCOL = [1, 5, 2, 6];                     // bubble tints: teal, pink, sky, green
  const NN = 400, NB = 100;                      // dots of all the images; per bubble: 56 outline + 44 icon
  // dots: a sheep facing left (44), a staff (44), a wineskin (44) — as gf_images
  function sheepPts(cx, cy, s, seed) {
    const P = [];
    for (let i = 0; i < 20; i++) { const a = i / 20 * PI2, r = 1 + .13 * Math.abs(Math.cos(4 * a)); P.push([cx + 14 * s * r * Math.cos(a), cy + 8.5 * s * r * Math.sin(a)]); }
    for (let i = 0; i < 8; i++) { const a = H(seed + i * 3.1) * PI2, r = Math.sqrt(H(seed + i * 5.7)) * .6; P.push([cx + 14 * s * r * Math.cos(a), cy + 8.5 * s * r * Math.sin(a)]); }
    for (let i = 0; i < 8; i++) { const a = i / 8 * PI2, r = i % 2 ? 1 : .45; P.push([cx - 19 * s + 4.6 * s * r * Math.cos(a), cy - 6 * s + 3.4 * s * r * Math.sin(a)]); }
    for (const lx of [-9, -4, 5, 10]) for (let j = 0; j < 2; j++) P.push([cx + lx * s, cy + (10.5 + 4.5 * j) * s]);
    return P;
  }
  const staffPts = (cx, cy, s) => along([[cx, cy + 15 * s, cx, cy - 8 * s], [cx + 1.2 * s, cy + 15 * s, cx + 1.2 * s, cy - 8 * s],
    ...circ(cx + 5 * s, cy - 8 * s, 5 * s, 8, PI, PI2), [cx + 10 * s, cy - 8 * s, cx + 10 * s, cy - 4 * s]], 44);
  const skinPts = (cx, cy, s) => along([...circ(cx + 2 * s, cy + 5 * s, 15 * s, 18, -PI * .655, PI * 1.222, 9 * s),
    [cx - 10 * s, cy - 1 * s, cx - 15 * s, cy - 11 * s], [cx - 5 * s, cy - 3 * s, cx - 10 * s, cy - 13 * s],
    [cx - 17 * s, cy - 9 * s, cx - 9 * s, cy - 13 * s], [cx - 16 * s, cy - 13 * s, cx - 11 * s, cy - 15.5 * s],
    [cx + 9 * s, cy + 12 * s, cx + 11 * s, cy + 16 * s], [cx - 4 * s, cy + 13 * s, cx - 5 * s, cy + 17 * s],
    ...bez([cx - 11 * s, cy - 8 * s], [cx + 2 * s, cy - 20 * s], [cx + 15 * s, cy], 6)], 44);
  let BS = null;
  function bubbles0() {
    if (BS) return BS;
    BS = [];
    BUB.forEach((x, k) => {
      const by = BUBYS[k];
      for (let i = 0; i < 56; i++) { const a = i / 56 * PI2, r = 1 + .06 * Math.cos(7 * a); BS.push([x + BR * r * Math.cos(a), by + BR * r * Math.sin(a)]); }
      const I = k === 0 ? sheepPts(x + 5, by - 14, 1.6, 7) : k === 1 ? staffPts(x - 5, by - 13, 1.7) : k === 2 ? skinPts(x + 1, by - 12, 1.35) :
        resample(plough0().P, 44).map(p => [x + p[0] * .28, by - 10 + p[1] * .28]);
      BS.push(...resample(I, 44));
    });
    return BS;
  }
  // flat pictures (G — colour mapper: they grey out on «древними»)
  function sheepArt(cx, cy, s, G) {
    const wool = G('#fbf7ff'), wd = G('#c9b8ee'), face = G('#6a54a6'), dark = G('#3e2c74');
    let o = '';
    for (const lx of [-9, -4, 5, 10]) o += lineS(cx + lx * s, cy + 5 * s, cx + lx * s, cy + 15.5 * s, dark, 2.6 * s);
    let bumps = `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(13 * s)}" ry="${f(8 * s)}"/>`;
    for (let i = 0; i < 11; i++) { const a = i / 11 * PI2; bumps += `<circle cx="${f(cx + 12.5 * s * Math.cos(a))}" cy="${f(cy + 7.6 * s * Math.sin(a))}" r="${f(4.2 * s)}"/>`; }
    o += `<g fill="${wd}" transform="translate(${f(.6 * s)} ${f(1.4 * s)})">${bumps}</g><g fill="${wool}">${bumps}</g>`;
    o += `<ellipse cx="${f(cx - 3 * s)}" cy="${f(cy - 4 * s)}" rx="${f(6 * s)}" ry="${f(2.2 * s)}" fill="#fff" opacity=".7"/>`;
    const hx = cx - 19.5 * s, hy = cy - 4.5 * s;
    o += `<ellipse cx="${f(hx + 4.6 * s)}" cy="${f(hy - 3.4 * s)}" rx="${f(3.4 * s)}" ry="${f(1.5 * s)}" fill="${dark}" transform="rotate(32 ${f(hx + 4.6 * s)} ${f(hy - 3.4 * s)})"/>` +
      `<ellipse cx="${f(hx)}" cy="${f(hy)}" rx="${f(5.6 * s)}" ry="${f(4.3 * s)}" fill="${face}" transform="rotate(-16 ${f(hx)} ${f(hy)})"/>` +
      `<ellipse cx="${f(hx - 1.6 * s)}" cy="${f(hy - 1.6 * s)}" rx="${f(2.4 * s)}" ry="${f(1.2 * s)}" fill="#fff" opacity=".25"/>` +
      `<circle cx="${f(hx - 1.2 * s)}" cy="${f(hy - .8 * s)}" r="${f(.9 * s)}" fill="#fff"/>` +
      `<circle cx="${f(hx + 3.4 * s)}" cy="${f(hy - 3.6 * s)}" r="${f(2.6 * s)}" fill="${wool}"/>`;
    return o;
  }
  const staffArt = (cx, cy, s, G) => {
    const d = `M${f(cx)} ${f(cy + 15 * s)} L${f(cx)} ${f(cy - 8 * s)} A${f(5 * s)} ${f(5 * s)} 0 0 1 ${f(cx + 10 * s)} ${f(cy - 8 * s)} L${f(cx + 10 * s)} ${f(cy - 4 * s)}`;
    return `<path d="${d}" fill="none" stroke="${G(WOODD)}" stroke-width="${f(3.4 * s)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${d}" fill="none" stroke="${G(WOOD)}" stroke-width="${f(2 * s)}" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${d}" fill="none" stroke="${G(WOODL)}" stroke-width="${f(.7 * s)}" stroke-linecap="round" opacity=".8" transform="translate(${f(-.5 * s)} 0)"/>`;
  };
  const skinArt = (cx, cy, s, G) =>
    lineS(cx + 9 * s, cy + 12 * s, cx + 11 * s, cy + 16 * s, G(WOODD), 2.6 * s) + lineS(cx - 4 * s, cy + 13 * s, cx - 5 * s, cy + 17 * s, G(WOODD), 2.6 * s) +
    `<path d="M${f(cx - 10 * s)} ${f(cy - 1 * s)} L${f(cx - 4.5 * s)} ${f(cy - 3 * s)} L${f(cx - 9.5 * s)} ${f(cy - 13 * s)} L${f(cx - 15.5 * s)} ${f(cy - 11 * s)} Z" fill="${G('#c97a40')}"/>` +
    `<ellipse cx="${f(cx + 2 * s)}" cy="${f(cy + 5 * s)}" rx="${f(15 * s)}" ry="${f(9 * s)}" fill="${G === ID ? 'url(#gfci-skin)' : G('#c97a40')}"/>` +
    `<ellipse cx="${f(cx - 2 * s)}" cy="${f(cy + 1.5 * s)}" rx="${f(6 * s)}" ry="${f(2.4 * s)}" fill="#fff" opacity=".32"/>` +
    lineS(cx - 16 * s, cy - 10 * s, cx - 9 * s, cy - 13 * s, G(GOLD), 1.8 * s) +
    `<path d="M${f(cx - 11 * s)} ${f(cy - 8 * s)} Q${f(cx + 2 * s)} ${f(cy - 20 * s)} ${f(cx + 15 * s)} ${f(cy)}" fill="none" stroke="${G('#7a3f2a')}" stroke-width="${f(1.4 * s)}" stroke-linecap="round"/>`;
  function bubbleArt(k, G) {
    const x = BUB[k], by = BUBYS[k], P = PAL[BCOL[k]];
    let s = `<circle cx="${x}" cy="${by}" r="${BR}" fill="${G(P[1])}" opacity=".34"/>` +
      `<circle cx="${x}" cy="${by}" r="${BR}" fill="url(#gfci-bub)"/>` +
      `<circle cx="${x}" cy="${by}" r="${BR}" fill="none" stroke="${G(P[0])}" stroke-width="6" opacity=".25" filter="url(#gfc-soft)"/>` +
      `<circle cx="${x}" cy="${by}" r="${BR}" fill="none" stroke="${G(P[0])}" stroke-width="2.2" opacity=".95"/>` +
      `<path d="M${f(x - BR * .78)} ${f(by - BR * .3)} A${BR * .84} ${BR * .84} 0 0 1 ${f(x - BR * .2)} ${f(by - BR * .8)}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>`;
    s += k === 0 ? sheepArt(x + 5, by - 14, 1.6, G) : k === 1 ? staffArt(x - 5, by - 13, 1.7, G) : k === 2 ? skinArt(x + 1, by - 12, 1.35, G) :
      `<g transform="translate(${x} ${by - 10}) scale(.28)">${ploughArt(.4, G)}</g>`;
    const yb = by + BR + 2, dir = k < 2 ? 1 : -1;
    [[5, 5, 3.4], [9, 14, 2.6], [12, 22, 1.8]].forEach(([dx, dy, r]) => { s += `<circle cx="${f(x + dir * dx)}" cy="${f(yb + dy)}" r="${r}" fill="${G(P[0])}" opacity=".9"/>`; });
    const lw = GFC.textW(BLAB[k], 17, 17 * .04) + 14;
    s += `<rect x="${f(x - lw / 2)}" y="${f(by + 15)}" width="${f(lw)}" height="21" rx="10.5" fill="${G(P[1])}" stroke="${G(P[0])}" stroke-width="1.2" opacity=".95"/>` +
      GFC.mono(x, by + 31, BLAB[k], { size: 17, anchor: 'middle', opacity: 1, ls: .04, weight: 800 });
    return s;
  }
  // the shepherd with his staff (right) and three sheep (left): dots (400) and the flat picture
  const SHEEP = [[52, 278], [118, 283], [184, 278]], SHS = 1.72;
  let T1 = null;
  function shepherd0() {
    if (T1) return T1;
    const P = GFC.personPts(242, 304, 170, 196, 9);
    const S = along([[279, 304, 279, 138], ...circ(269, 138, 10, 8, 0, -PI), [259, 138, 259, 145]], 64);
    const sh = [];
    SHEEP.forEach(([x, y], k) => sh.push(...sheepPts(x, y, SHS, 20 + k * 7), ...sheepPts(x, y, SHS, 40 + k * 7).slice(20, 28)));
    T1 = resample(P.concat(S, sh), NN);
    return T1;
  }
  function shepherdArt(t) {
    let s = '';
    SHEEP.forEach(([x, y]) => { s += `<ellipse cx="${x - 3}" cy="${f(y + 15.5 * SHS + 1)}" rx="${f(18 * SHS)}" ry="${f(3 * SHS)}" fill="url(#gfc-shadow)"/>`; });
    SHEEP.forEach(([x, y], k) => { s += sheepArt(x, y + .8 * Math.sin(t * 2 + k * 1.7), SHS, ID); });
    s += GFC.person(242, 304, 170, { t, color: 'teal', seed: 9, lit: .3, rim: -.7, up: .08 });
    const d = 'M279 304 L279 138 A10 10 0 0 0 259 138 L259 146';
    s += `<path d="${d}" fill="none" stroke="${WOODD}" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${d}" fill="none" stroke="${WOOD}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M278.2 300 L278.2 140" stroke="${WOODL}" stroke-width="1" opacity=".8"/>`;
    return s;
  }
  // after «пастуха» the shepherd's dots fly to the heads of the e05 crowd; the crowd rises bigger (×1.12 around (180, 300))
  const CZ = 1.12, CZY = 300;
  const czx = x => 180 + (x - 180) * CZ, czy = y => CZY + (y - CZY) * CZ;
  function headsTo(dy) {
    const C = crowd0();
    return Array.from({ length: NN }, (_, i) => {
      const p = C[i % C.length];
      return [czx(p.x + (H(i * 2.3) - .5) * 6), czy(p.head + dy + (H(i * 4.1) - .5) * 6)];
    });
  }
  // «достучаться»: colour «?» pop left → right over the back row (sizes 17..23, they float up); «каждого» — each flashes
  function asks(t, c, dy) {
    let s = '';
    crowd0().forEach((p, i) => {
      if (p.row !== 0) return;
      const a = c.dos - .12 + p.x / 360 * .5, op = q(t, a, .18);
      if (op <= .003) return;
      const w = c.kaz - .12 + p.x / 360 * .45, fl = pulse(t, w, .06, .4), sz = 17 + 6 * H(i * 7.7);
      const y = p.top + dy - 5 - 12 * H(i * 3.3) * qq(t, a, a + 1.4) - 2 * Math.sin(t * 2.3 + i);
      const z = 1 + .7 * (1 - qq(t, a, a + .3)) + .35 * fl;
      s += GFC.zoom(GFC.mono(p.x, y, '?', { size: sz, anchor: 'middle', opacity: .97 * op, color: fl > .2 ? GOLD : PAL[p.col][0], weight: 800,
        glow: fl > .2 || H(i * 5.1) > .6 }), p.x, y - 6, z);
    });
    return s;
  }

  /* ---------------- e05: three empty colour cells, labels, icons ---------------- */
  const CXC = 52, CYC = [122, 188, 254], CS = 28, LBX = 92;
  const CCOL = [1, 5, 4];                                // the cells: teal (languages), pink (images), gold (advice)
  const ICX = [116, 184, 252], ICY = 290, ICS = 1.2;     // seam Б: gf_phone draws the same icons here
  const STREAM = ['RU', 'EN', 'ES', 'SW', 'HI', 'ZH', 'AR', 'FR', 'DE', 'PT', 'TR', 'UK', 'YO'];
  function cells(t, c) {
    let s = '';
    const fls = [c.yaz, c.ob5, c.sov];
    for (let k = 0; k < 3; k++) {
      const a = c.tri - .05 + k * .14, op = q(t, a, .25);
      if (op <= .003) continue;
      const z = 1 + .7 * (1 - qq(t, a, a + .35)), y = CYC[k], P = PAL[CCOL[k]];
      const bl = .5 + .5 * Math.sin(t * 4.4 + k * 2.1), fl = clamp(pulse(t, fls[k] - .05, .1, .6) + pulse(t, a, .05, .5));
      const r = `x="${f(CXC - CS / 2)}" y="${f(y - CS / 2)}" width="${CS}" height="${CS}" rx="6"`;
      const g = `<rect ${r} fill="none" stroke="${P[0]}" stroke-width="7" opacity="${f(.25 * bl + .5 * fl)}" filter="url(#gfc-soft)"/>` +
        `<rect ${r} fill="${P[1]}" opacity="${f(.28 + .25 * fl)}"/>` +
        `<rect ${r} fill="none" stroke="${P[0]}" stroke-width="2.6" opacity="${f(.62 + .38 * bl)}"/>` +
        lineS(CXC - CS / 2 + 5, y - CS / 2 + 3.6, CXC + 2, y - CS / 2 + 3.6, '#fff', 1.4, .5);
      s += gop(op, GFC.zoom(g, CXC, y, z));
    }
    return s;
  }
  // the flat icons in local units (×ICS at the icon point)
  function taxiArt() {
    const body = 'M-24 -3 L-13.5 -3 L-8.6 -12.4 Q-8 -13.5 -6.8 -13.5 L7.8 -13.5 Q9 -13.5 9.6 -12.4 L15.4 -3 L23 -3 Q26 -3 26 0 L26 5.4 Q26 8 23.4 8 L-23.4 8 Q-26 8 -26 5.4 L-26 0 Q-26 -3 -24 -3 Z';
    let ch = '', ck = '';
    for (let i = 0; i < 16; i++) if (i % 2 === 0) ch += `<rect x="${f(-22.4 + i * 2.8)}" y="1" width="2.8" height="2.8"/>`;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2 === 0) ck += `<rect x="${f(-5.6 + i * 2.8)}" y="${f(-19.6 + j * 2.8)}" width="2.8" height="2.8"/>`;
    return `<path d="${body}" fill="url(#gfc-p4)"/><path d="${body}" fill="url(#gfc-shade)"/>` +
      `<path d="M-12 -4 L-7.6 -11.6 L-.8 -11.6 L-.8 -4 Z M1.2 -4 L1.2 -11.6 L7.8 -11.6 L12.4 -4 Z" fill="url(#gfc-p2)"/>` +
      `<path d="M-9.6 -5 L-6.6 -10.4 M3 -5 L3 -10.4" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".7"/>` +
      `<g fill="#2a1858">${ch}</g>` + lineS(.2, -3, .2, 7.6, '#9a5a1a', .7, .5) +
      `<rect x="-5.6" y="-19.6" width="11.2" height="5.6" rx=".8" fill="#fff"/><g fill="#2a1858">${ck}</g>` +
      `<path d="${body}" fill="none" stroke="#fff3c8" stroke-width=".8" opacity=".55"/>` +
      `<circle cx="-14" cy="8" r="5.2" fill="#1c1150"/><circle cx="-14" cy="8" r="2.2" fill="#cfd2ff"/>` +
      `<circle cx="14" cy="8" r="5.2" fill="#1c1150"/><circle cx="14" cy="8" r="2.2" fill="#cfd2ff"/>` +
      `<circle cx="24.4" cy="1.2" r="1.6" fill="#fffbe8"/><circle cx="24.4" cy="1.2" r="3.4" fill="#ffe9a8" opacity=".35"/><circle cx="-25" cy="1.2" r="1.2" fill="#ffb07a"/>`;
  }
  function flaskArt() {
    const glass = 'M-4 -17 L-4 -6 L-15 12.4 Q-16.4 15 -13.4 15 L13.4 15 Q16.4 15 15 12.4 L4 -6 L4 -17 Z';
    return `<path d="${glass}" fill="#e8f6ff" opacity=".16"/>` +
      `<path d="M-10.2 4 L10.2 4 L15 12.4 Q16.4 15 13.4 15 L-13.4 15 Q-16.4 15 -15 12.4 Z" fill="url(#gfc-p6)"/>` +
      lineS(-10, 4, 10, 4, '#d4ffc0', 1.2, .9) +
      `<path d="${glass}" fill="none" stroke="#e2f2ff" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<rect x="-7.4" y="-19" width="14.8" height="3" rx="1.5" fill="#e2f2ff"/>` +
      lineS(-1.8, -14, -1.8, -7.5, '#fff', 1.3, .7) + lineS(-9.6, 9.6, -7.4, 6.2, '#fff', 1.2, .6);
  }
  function packArt() {
    return `<rect x="-13" y="-12" width="26" height="28" rx="6" fill="url(#gfc-p5)"/><rect x="-13" y="-12" width="26" height="28" rx="6" fill="url(#gfc-shade)"/>` +
      `<path d="M-13 -3 L13 -3 L13 -6 Q13 -12 7 -12 L-7 -12 Q-13 -12 -13 -6 Z" fill="#e0559a" opacity=".55"/>` +
      `<path d="M-5 -12 A5 5 0 0 1 5 -12" fill="none" stroke="#e0559a" stroke-width="2.6" stroke-linecap="round"/>` +
      lineS(-13, -3, 13, -3, '#ffd6ec', 1.2, .8) +
      `<rect x="-8" y="3" width="16" height="9.5" rx="2.6" fill="#e0559a" stroke="#ffd6ec" stroke-width=".9"/>` +
      `<circle cx="0" cy="7.6" r="1.3" fill="${GOLD}"/>` +
      `<rect x="-13" y="-12" width="26" height="28" rx="6" fill="none" stroke="#ffd6ec" stroke-width=".8" opacity=".6"/>` +
      lineS(-10, -9, -4, -9, '#fff', 1.2, .55);
  }
  const taxiSegs = () => [[-24, -3, -13, -3], [-13, -3, -8, -13], [-8, -13, 9, -13], [9, -13, 15, -3], [15, -3, 24, -3], [24, -3, 24, 7],
    [24, 7, 19, 7], [9, 7, -9, 7], [-19, 7, -24, 7], [-24, 7, -24, -3], [0.5, -13, 0.5, -3], ...circ(-14, 8, 5, 10), ...circ(14, 8, 5, 10)];
  const flaskSegs = () => [[-7, -17, 7, -17], [-4, -17, -4, -6], [4, -17, 4, -6], [-4, -6, -15, 13], [4, -6, 15, 13], [-15, 13, 15, 13], [-10, 4, 10, 4]];
  const packSegs = () => [[-8, -12, 8, -12], ...circ(8, -7, 5, 3, -PI / 2, 0), [13, -7, 13, 11], ...circ(8, 11, 5, 3, 0, PI / 2), [8, 16, -8, 16],
    ...circ(-8, 11, 5, 3, PI / 2, PI), [-13, 11, -13, -7], ...circ(-8, -7, 5, 3, PI, PI * 1.5), ...circ(0, -12, 5, 6, PI, PI2),
    [-8, 3, 8, 3], [8, 3, 8, 12], [8, 12, -8, 12], [-8, 12, -8, 3], [-13, -3, 13, -3]];
  const ICONS = [taxiSegs, flaskSegs, packSegs], ARTS = [taxiArt, flaskArt, packArt];
  const IDOTS = [[GOLD, '#ffe27a', '#ffb547', '#8ccbff'], ['#95e67c', '#63e6d2', '#e2f2ff'], ['#ffa6d6', '#ff9d8f', '#ffd6ec']];
  // the icons move while they come (no motion after c.set — seam Б): the taxi drives in from the left with speed lines and
  // rocks on its springs; the flask swirls (tilts) with two more bubbles; the backpack drops in and bounces
  function icon(k, t, a, c) {
    const g = k === 0 ? qq(t, a - .32, a + .05) : qq(t, a - .08, a + .42);
    if (g <= 0) return '';
    const still = 1 - qq(t, c.set - .35, c.set);
    let ox = 0, oy = 0, ang = 0, sl = '';
    if (k === 0) {
      const u = clamp((t - (a - .34)) / .75), v = (1 - u) * (1 - u);
      ox = -84 * v;
      oy = -1.3 * Math.abs(Math.sin(t * 12)) * qq(t, a + .3, a + .6) * still;
      if (v > .02) for (let j = 0; j < 3; j++) {
        const yy = ICY + [-8, -2, 4][j] * ICS, x1 = ICX[0] + ox - 29 * ICS - 3 * j, len = (12 + 26 * H(j * 3.1)) * Math.sqrt(v);
        sl += lineS(x1 - len, yy, x1, yy, j === 1 ? GOLD : '#8ccbff', 1.7, .9 * Math.sqrt(v));
      }
    } else if (k === 1) ang = 11 * Math.sin((t - a) * 8.5) * qq(t, a + .05, a + .35) * still;
    else {
      const d = clamp((t - (a - .14)) / .26), b = clamp((t - (a + .12)) / .14);
      oy = d < 1 ? -36 * (1 - d * d) : -6 * Math.sin(PI * b);
    }
    const x = ICX[k] + ox, y = ICY + oy;
    const P = along(ICONS[k](), 46).map(p => [x + p[0] * ICS, y + p[1] * ICS]);
    const src = GFC.cloud(46, 60 + k, [x - 46, y - 56, x + 46, y + 14]);
    const Q = GFC.jitter(GFC.morph(src, P, g, t, { spread: .35, amp: 2.5, bend: 14, seed: 30 + k }), t, .3, k);
    const ok = qq(g, .7, 1);
    let s = sl;
    if (ok > .003) {
      s += `<ellipse cx="${f(x)}" cy="${f(ICY + 17 * ICS)}" rx="${f(24 * ICS)}" ry="${f(3 * ICS)}" fill="url(#gfc-shadow)" opacity="${f(ok)}"/>`;
      s += gop(ok, `<g transform="translate(${f(x)} ${f(y)}) scale(${ICS})">${ARTS[k]()}</g>`);
    }
    if (k === 1 && ok > .003) {         // the bubbles in the flask (3 as gf_phone; 2 more while it swirls)
      let b = '';
      for (let j = 0; j < 5; j++) {
        const u = ((t * (j < 3 ? 1.1 : 1.6) + j / 3) % 1 + 1) % 1, bx = x + (j < 3 ? -4 + j * 4 : j === 3 ? -7 : 7) * ICS, by = y + (12 - 10 * u) * ICS;
        const bo = j < 3 ? 1 : still;
        if (bo > .003) b += `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(1.6 + .6 * u)}" fill="#eaffd8" fill-opacity=".25" stroke="#eaffd8" stroke-width="1.1" opacity="${f(.95 * bo * Math.sin(PI * u))}"/>`;
      }
      s += gop(ok, b);
    }
    s += GFC.dots(Q, { r: 1.5, op: .95 * (1 - .9 * ok), t, glow: .5, color: IDOTS[k] });
    if (Math.abs(ang) > .05) s = `<g transform="rotate(${f(ang)} ${f(x)} ${f(y + 13 * ICS)})">${s}</g>`;
    s += ring(x, y, 10, 40, qq(t, a + .25, a + .9), .85, 1.8, IDOTS[k][0]);
    return s;
  }
  // e05: a camera over the checklist (cells, labels, counter, icons) — content point (cx, cy) goes to screen (sx, sy), zoom z;
  // as gf_images (A — three cells big, B — row 1, C — row 2, D — row 3 with the icons, from c.set — the pose of seam Б)
  function listCam(t, c) {
    if (t >= c.set) return null;
    const KF = [
      [c.tri - .1, 1.52, 52, 188, 180, 214], [c.vs5, 1.6, 52, 188, 180, 214],
      [c.vs5 + .5, 1.32, 148, 122, 180, 128], [c.ob5 - .1, 1.38, 148, 122, 180, 128],
      [c.ob5 + .45, 1.06, 185, 188, 180, 184], [c.lub - .1, 1.1, 185, 188, 180, 184],
      [c.lub + .35, 1.08, 185, 266, 180, 240], [c.uch + .1, 1.11, 185, 266, 180, 240],
      [c.set, 1, 160, 272, 160, 272]];
    if (t <= KF[0][0]) return KF[0].slice(1);
    let i = 0;
    while (i < KF.length - 2 && t > KF[i + 1][0]) i++;
    const A = KF[i], B = KF[i + 1], u = ease((t - A[0]) / Math.max(.001, B[0] - A[0]));
    return A.slice(1).map((v, j) => lerp(v, B[j + 1], u));
  }
  // «все семь тысяч языков»: two running lines of colour code pills across the whole frame (screen, outside the camera)
  const LANGS = ['RU', 'EN', 'ES', 'SW', 'HI', 'ZH', 'AR', 'FR', 'DE', 'PT', 'TR', 'UK', 'YO', 'JA', 'KO', 'VI', 'TH', 'FA',
    'UR', 'BN', 'TA', 'QU', 'GN', 'NV', 'MI', 'ZU', 'XH', 'HA', 'IG', 'AM', 'SO', 'ID', 'MS', 'TL'];
  function marquee(t, c) {
    const op = qq(t, c.vs5 + .1, c.vs5 + .45) * (1 - qq(t, c.ob5 - .45, c.ob5 - .1));
    if (op <= .003) return '';
    const STEP = 42, L = LANGS.length * STEP;
    let s = '';
    [[176, -78, 0], [200, 62, 17]].forEach(([y, v, sh], r) => {
      for (let i = 0; i < LANGS.length; i++) {
        const x = ((i * STEP + v * (t - c.vs5) + sh) % L + L) % L - 20;
        if (x > 380) continue;
        const k = (i + r * 7) % LANGS.length, hi = H(k * 3.7 + r) > .78, P = PAL[RCOL[(k + r * 3) % 7]];
        s += `<rect x="${f(x - 17)}" y="${f(y - 13)}" width="34" height="18" rx="9" fill="${P[1]}" opacity="${hi ? .95 : .7}" stroke="${P[0]}" stroke-width="1"/>` +
          GFC.mono(x, y + .6, LANGS[k], { size: 14, anchor: 'middle', opacity: hi ? 1 : .88, ls: .04, weight: 800, glow: hi });
      }
    });
    return gop(op, s);
  }

  /* ---------------- the scene ---------------- */
  function body(t, K) {
    const c = cues(K);
    let s = DEFS;
    /* e04: the plough on the field (seam A), ploughing; «?»; it leaves up-left on «слова» */
    const go = qq(t, c.slo - .1, c.slo + .6);
    const pop = (1 - .45 * go) * (1 - qq(t, c.obr - .2, c.obr + .3));
    const moving = clamp((t - c.plu) / .3) * (1 - go);
    const roll = -SPD * Math.max(0, Math.min(t, c.slo) - c.plu) / WHL[2];
    const rock = .9 * Math.sin(t * 11) * moving;
    const pglow = pulse(t, c.ora + .05, .12, .7) + .8 * pulse(t, c.plu, .1, .6);
    const solid = q(t, c.ora - .05, .45);
    // a slow push-in on the ploughing plough (from «это»): ×1 → ×1.3 by «слова»; the hills and the field go with it
    const push = 1 + .3 * qq(t, c.eto, c.slo - .1), pz = lerp(push, 1, go);
    const hop = 1 - qq(t, c.nuz - .05, c.ume + .25);
    // seam A: gfc_reach ends with its hills at y 290; on «Орала» — «плуги» they rise to the field under the plough (y 252)
    let gs = GFC.ground({ y: lerp(290, 252, qq(t, c.ora, c.plu)), warm: .3 + .55 * pglow * (1 - go), seed: 3, op: hop });
    gs += field(t, c, q(t, c.ora + .4, .4) * (1 - qq(t, c.slo - .1, c.slo + .35)), moving);
    s += pz > 1.0001 ? GFC.zoom(gs, 180, 200, pz) : gs;
    s += plough(t, lerp(1, .32, go) * pz, lerp(180, 56, go), lerp(200, 118, go), pop, pglow, roll, rock, solid);
    // labels at y 300: «МЕЧИ — НА ОРАЛА» (seam A) → ОРАЛО = ПЛУГ (ПЛУГ in gold)
    const old = 1 - qq(t, c.eto - .32, c.eto - .05);
    if (old > .003) s += gop(old, words(180, 300 - 16 * (1 - old), [['МЕЧИ', -9], ['—', -9], ['НА', -9], ['ОРАЛА', -9, GOLD]], 19, t, { weight: 800, ls: .06, glow: true }));
    s += gop(1 - qq(t, c.slo - .15, c.slo + .1), words(180, 302, [['ОРАЛО', c.eto], ['=', c.plu - .12, GOLD], ['ПЛУГ', c.plu, GOLD]], 22, t, { glow: true, weight: 800 }));
    // «Не понял?» — a violet badge with a gold «?» over the plough, the headline; «загвоздка» — the badge jerks
    s += GFC.headline('В чём / *загвоздка*', t, c.pon - .36, c.slo - .05, { y: 58 });
    const qm = q(t, c.pon - .36, .2) * (1 - qq(t, c.slo - .3, c.slo));
    if (qm > .003) {
      const z = (1 + .5 * (1 - qq(t, c.pon - .36, c.pon - .03))) * (1 + .03 * Math.sin(t * 3.2));
      const sh = pulse(t, c.zag - .05, .05, .8), ang = 16 * sh * Math.sin((t - c.zag) * 34), dx = 4 * sh * Math.sin((t - c.zag) * 47);
      const g = GFC.node(180, 140, 24, 'question', { color: 'violet', ink: GOLD, glow: 1 + .8 * sh });
      s += gop(qm, `<g transform="translate(${f(dx)} 0) rotate(${f(ang)} 180 140)">${GFC.zoom(g, 180, 140, z)}</g>`) +
        ring(180, 140, 26, 74, qq(t, c.zag, c.zag + .7), .9, 2.2, '#eba2ff') + ring(180, 140, 26, 56, qq(t, c.zag + .12, c.zag + .7), .7, 1.6, GOLD);
    }
    /* e04: the book and the rays of translation; the crowd */
    const bop = q(t, c.slo - .02, .4) * (1 - qq(t, c.obr - .25, c.obr + .1));
    s += book(t, bop, pulse(t, c.per - .05, .1, .9) + .3 * pulse(t, c.slo, .1, .6));
    s += headSeq([['*Слова*', c.slo], ['переведены', c.per - .02]], t, c.obr - .05, { y: 58 });
    s += headSeq([['*Образы*', c.obr], ['древние', c.dre]], t, c.pasE + .05, { y: 58 });
    s += rays(t, c, 1 - qq(t, c.obr - .25, c.obr + .1));
    let cdy, cop, cz = 1;
    if (t < c.pasE) {
      const up = q(t, c.slo + .05, .7);
      cdy = lerp(46, 0, up) + 56 * qq(t, c.ty - .15, c.ty + .5);
      cop = up * (1 - qq(t, c.ty - .15, c.ty + .5));
    } else {
      // the crowd comes right after «пастуха», bigger and higher, with «?» over the heads
      cz = CZ;
      cdy = lerp(80, -24, qq(t, c.pasE + .05, c.dos + .4)) + 110 * qq(t, c.nuz - .05, c.ume + .25);
      cop = qq(t, c.pasE + .05, c.pasE + .55) * (1 - qq(t, c.nuz - .05, c.ume + .25));
    }
    let cs = crowd(t, c, cdy, cop, cz !== 1 ? 0 : 1);
    if (cz !== 1 && cop > .003) cs += gop(cop, asks(t, c, cdy));
    s += cz !== 1 && cs ? GFC.zoom(cs, 180, CZY, cz) : cs;
    /* e04: the images — colour bubbles → grey on «древними» → crumble → the shepherd (dots → colour) → his dots fly to the heads */
    if (t >= c.obr - .25 && t < c.pasE + .9) {
      const S = bubbles0(), T1s = shepherd0();
      const ga = qq(t, c.ty - .1, c.ty + .45), gb = qq(t, c.pasE + .02, c.pasE + .7);
      const fallT = clamp(t - (c.dre + .1), 0, c.ty + .25 - (c.dre + .1));
      const appear = k => qq(t, c.obr - .2 + k * .07, c.obr + .12 + k * .07);
      const dre = qq(t, c.dre - .05, c.dre + .35);              // grey out
      const brk = qq(t, c.dre + .05, c.dre + .3);               // flat bubbles → dots
      // the flat bubbles (appear one by one, bob, grey out, break)
      if (brk < .997) {
        const Gm = dre > .003 ? (col => mix(col, GREY, .85 * dre)) : ID;
        BUB.forEach((x, k) => {
          const ap = appear(k); if (ap <= .003) return;
          const z = lerp(.3, 1, ease(ap)), bob = 2 * Math.sin(t * 1.6 + k * 1.3);
          s += gop(ap * (1 - brk), `<g transform="translate(0 ${f(bob)})">${GFC.zoom(bubbleArt(k, Gm), x, BUBYS[k], z)}</g>`);
        });
      }
      // the dots: crumbling bubbles → the shepherd → the heads
      const flat = qq(t, c.ziv - .1, c.pas) * (1 - qq(t, c.pasE - .05, c.pasE + .25));
      if (brk > .003) {
        let P;
        if (gb > 0) P = GFC.morph(GFC.jitter(T1s, t, .5, 9), headsTo(cdy), gb, t, { spread: .35, amp: 2, bend: 18, seed: 6 });
        else {
          const A = S.map((p, i) => {
            const k = Math.floor(i / NB), bob = 2 * Math.sin(t * 1.6 + k * 1.3);
            return [p[0] + (H(i * 3.1 + 7) - .5) * 40 * fallT, p[1] + bob + (55 + 60 * H(i * 1.7 + 3)) * fallT * fallT + 14 * fallT];
          });
          P = ga > 0 ? GFC.morph(A, T1s, ga, t, { spread: .4, amp: 3, bend: 22, seed: 4 }) : GFC.jitter(A, t, .4, 3);
        }
        const dop = (ga > 0 ? lerp(.6, .95, ga) : lerp(.95, .62, qq(t, c.dre + .1, c.ty))) * (1 - qq(gb, .5, 1)) * brk * (1 - .85 * flat);
        const GR = ['#b9b3cf', '#a29cb8', '#d6d1e6'], lv = Math.round(ga * 5) / 5;
        const col = i => { const gcol = GR[i % 3]; return lv <= 0 ? gcol : mix(gcol, GFC.DOT[Math.floor(H(i * 7.31) * 7) % 7], lv); };
        s += GFC.dots(P, { r: 1.7, op: dop, t, glow: .45 + .2 * ga, color: gb > 0 ? undefined : col, seed: 2 });
      }
      // the flat shepherd and the sheep (from «живого»), the warm flash on «пастуха»
      const fl = pulse(t, c.pas - .05, .12, .8);
      if (fl > .003) s += `<ellipse cx="242" cy="214" rx="86" ry="116" fill="url(#gfc-halo)" opacity="${f(.85 * fl)}"/>`;
      s += ring(242, 220, 70, 140, qq(t, c.pas, c.pas + .6), .6, 2, GOLD);
      if (flat > .003) s += gop(flat, shepherdArt(t));
      s += gop(q(t, c.pas - .05, .25) * (1 - qq(t, c.pasE + .05, c.pasE + .35)), words(228, 112, [['ПАСТУХ', c.pas]], 20, t, { glow: true, color: GOLD, weight: 800 }));
    }
    /* e05: the headlines */
    s += GFC.headline('Как дойти / *до каждого?*', t, c.cht + .05, c.nuz + .15, { y: 58 });
    s += GFC.headline('*3* умения', t, c.tri - .05, c.sov + .2, { y: 60, size: 28 });
    /* e05: three empty cells (seam B), the labels, the icons — under the camera listCam */
    s += marquee(t, c);
    let L = cells(t, c);
    // «все семь тысяч»: a train of language codes runs along the first row into the counter
    for (let k = 0; k < STREAM.length; k++) {
      const a = c.vs5 - .1 + k * .056, u = clamp((t - a) / .45);
      if (u <= 0 || u >= 1) continue;
      const x = lerp(372, LBX + 40, u), op = .95 * (1 - qq(u, .7, 1));
      L += GFC.mono(x, CYC[0] + 6, STREAM[k], { size: 14, anchor: 'middle', opacity: op, color: PAL[RCOL[k % 7]][0], weight: 800, glow: k % 3 === 0 });
    }
    const CNT = { size: 21, anchor: 'start', ls: .04, weight: 800, color: GOLD };
    if (t >= c.sem - .08) {
      const n = Math.round(7000 * ease(qq(t, c.sem - .05, c.yaz - .02)));
      const txt = (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}` : `${n}`) + (t >= c.yaz - .02 ? '+' : '');
      const fl = pulse(t, c.yaz - .02, .06, .5);
      L += GFC.mono(LBX, CYC[0] + 7, txt, { ...CNT, glow: true, opacity: .98 * q(t, c.sem - .08, .12) });
      if (fl > .003) L += gop(.7 * fl, GFC.mono(LBX, CYC[0] + 7, txt, { ...CNT, glow: true, opacity: 1, color: '#fff3c8' }));
    }
    L += words(LBX + GFC.textW('7 000+', 21, 21 * .04) + 7, CYC[0] + 7, [['ЯЗЫКОВ', c.yaz]], 16, t, { anchor: 'start', ls: .03 });
    L += words(LBX, CYC[1] + 6, [['ОБРАЗЫ', c.ob5], ['НАШЕГО', c.nas], ['ВРЕМЕНИ', c.vre]], 15, t, { anchor: 'start', ls: .02, grow: false });
    L += words(LBX, CYC[2] + 6, [['СОВЕТ', c.sov], ['КАЖДОМУ', c.lub]], 15, t, { anchor: 'start', ls: .02, grow: false });
    L += icon(0, t, c.tak, c) + icon(1, t, c.uch, c) + icon(2, t, c.shk, c);
    const cam = listCam(t, c);
    s += cam && L ? GFC.zoom(L, cam[1], cam[2], cam[0], cam[3], cam[4]) : L;
    return s;
  }

  SCENES.gfc_images = GFC.scene('gfc_images', (t, K, mode, p) => body(t, K || {}));
})();
