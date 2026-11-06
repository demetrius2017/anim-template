/* gfc_phone — «Бог ещё не создан», часть 3 из 3, цветная версия («Цветная инфографика», словарь GFC v2 — gfc_00_lib.js)
 * принятой сцены gf_phone (eps/god_future_color_p3; фразы f01–f03 и e08, текст v29):
 *   f01 «Веками за советом шли к Богу — в церковь, в мечеть. А ты давно там был?»
 *   f02 «А теперь за советом идут в телефон: к ChatGPT меньше чем за четыре года стали ходить больше миллиарда человек
 *        в неделю, по данным OpenAI.»
 *   f03 «Верующие говорят: Бог видит наши мысли. А этому собеседнику мы пишем их сами.»
 *   e08 «Но он пока ученик: его сравнивали с умным старшеклассником, и в простом он ещё ошибается.»
 * Содержание, слова-основы и время — как в gf_phone.js (шапка там: что происходит на каком слове); меняется вид.
 * Бога и пророков не рисуем: «к Богу», «Бог видит» — огонь порядка (GFC.spark, золотое солнце с лучами). Церковь и
 * мечеть — уважительно: собираются из цветных точек в плоские здания, ничего не ломается и не перечёркивается. Красного нет.
 *
 * Чем вид отличается от gf_phone (по образцу eps/god_future/qa/style_flatcolor.jpg и замечанию владельца 06.11 «цветов мало»):
 *  · крупный заголовок сверху (GFC.headline: Montserrat 800 капсом, белый, главное слово золотом крупнее), части заголовка
 *    появляются на своих словах (headSeq): f01 СОВЕТ — («советом») У *БОГА* («Богу»); f02 СОВЕТ — В *ТЕЛЕФОНЕ* («телефон»),
 *    МЕНЬШЕ («меньше») *4 ЛЕТ* («четыре»), счётчик 1 200 000 000 / В НЕДЕЛЮ после «неделю» встаёт наверх золотом;
 *    f03 БОГ («Бог») *ВИДИТ* («видит») МЫСЛИ («мысли»), ЧАТУ — («собеседнику») *ПИШЕМ* («пишем»);
 *    e08 CHATGPT — (заголовок экрана взлетает на «он») *УЧЕНИК* («ученик»), УМНЫЙ *СТАРШЕКЛАССНИК* («умным», y 60 — шов В).
 *    Подпись-источник Л. АШЕНБРЕННЕР · 2024 · О GPT-4 — на прежнем месте (y 86, под заголовком), ПО ДАННЫМ OPENAI · 10.2026 —
 *    внизу (y 343); обе — таблетки как .un-src. Заголовок не стоит выше базовой линии y 50.
 *  · люди — плоские разноцветные GFC.person (коралл, бирюза, розовый, небо у четверых; зелёный, фиалка … у толпы), идут
 *    шагом (f01), тянутся к огню и светлеют (o.lit, тёплый обод со стороны огня, f03), уходят в стороны («Но»);
 *  · церковь — светлые стены, фиолетовая кровля, голубой барабан, золотая луковица и крест; мечеть — песочные стены,
 *    бирюзовый купол, минарет с бирюзовым балконом, золотые полумесяцы; на стенах полосы, в дверях и окнах тёплый свет;
 *    здания на f01 ниже на 20 (DY) — над ними огонь (176, 100), выше — заголовок;
 *  · «?» над головами — цветные значки GFC.node; лучи огня — золотые нити-дуги с бегущей искрой (GFC.beam); нити от голов
 *    к телефону — градиент от цвета человека к золоту, по ним бегут золотые огоньки;
 *  · клетки шва Б — цветные, как в конце gfc_images (бирюза, розовый, золото), галочка заливает клетку цветом; значки —
 *    тот же плоский рисунок, что у gfc_images: жёлтое такси с шашечками, колба с зелёной жидкостью и пузырьками, розовый рюкзак;
 *  · телефон — тёмно-синий корпус с градиентным ободом (фиалка → небо → бирюза), цветные пузыри сообщений, бирюзовая кнопка;
 *    вопрос А ТЫ ДАВНО / ТАМ БЫЛ? — на фиолетовой плашке с золотой каймой, вторая строка золотом; доли-годы — цветные;
 *  · облачка мыслей — белые с оранжевыми строками; ученик — точки складываются в плоского голубого человека за деревянной
 *    партой с передней стенкой, раскрытая книга с розовым корешком, доска — зелёная в деревянной раме, 2+2=5 мелом, ✗ розовым;
 *  · холмы GFC.ground: f01 — горизонт y 262 (тёплый отсвет огня), f02 — высокий горизонт y 152 под толпой, f03 — y 296
 *    под четверыми у огня (тёплый), e08 — y 322; слои сменяются наплывом.
 * Швы. Б (вход из gfc_images/skills): клетки x 52, y 122/188/254, сторона 28; подписи от x 92: 7 000+ ЯЗЫКОВ · ОБРАЗЫ НАШЕГО
 * ВРЕМЕНИ · СОВЕТ КАЖДОМУ; значки на y 290 (x 116/184/252). В (выход в gfc_grow/grow): ученик x 180, подошвы y 330, рост 210
 * (точки GFC.personPts(180, 330, 210) и плоская фигура поверх), парта — верх y 300, x 90–270, вверху УМНЫЙ СТАРШЕКЛАССНИК
 * (y 60); доска, книга и мелкая подпись гаснут в наплыве.
 * Параметры p: s, mode (church · phone · thoughts · student — только имя кадра), K (cues.json части). Камера движка нейтральна.
 * Свои id — префикс gfcp- (заливки, окно чата, градиенты нитей gfcp-t*).
 * Проверка — листы eps/god_future_color_p3/qa/gfc_phone_*.jpg (рендер на tesla, 06.11).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI = Math.PI;
  const H = n => GFC.hash(n);
  const { q, qq, lerp, clamp, ease } = GFC;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const cl3 = (v, a, b) => Math.max(a, Math.min(b, v));
  const GOLD = GFC.GOLD, SUN = GFC.SUN, INK = GFC.INK, PAL = GFC.PAL;
  const LIT = '#ffd36b', LAV = '#d9d6ff', SRC = '#ffe6a8';
  const fillP = i => `url(#gfc-p${i})`;
  const DEFS = '<defs>' +
    '<linearGradient id="gfcp-w0" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="#fbf7ff"/><stop offset="1" stop-color="#b6a4f0"/></linearGradient>' +
    '<linearGradient id="gfcp-w1" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="#fff5de"/><stop offset="1" stop-color="#e3b274"/></linearGradient>' +
    '<linearGradient id="gfcp-ph" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#2a1d72"/><stop offset="1" stop-color="#0f0c3c"/></linearGradient>' +
    '<linearGradient id="gfcp-scr" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#33268c"/><stop offset="1" stop-color="#17155c"/></linearGradient>' +
    '<linearGradient id="gfcp-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eba2ff"/><stop offset=".5" stop-color="#8ccbff"/><stop offset="1" stop-color="#63e6d2"/></linearGradient>' +
    '<linearGradient id="gfcp-plate" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#5a28a8" stop-opacity=".97"/><stop offset="1" stop-color="#1e2276" stop-opacity=".97"/></linearGradient>' +
    '<linearGradient id="gfcp-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3bd82"/><stop offset="1" stop-color="#a8613a"/></linearGradient>' +
    '<linearGradient id="gfcp-board" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#2f8468"/><stop offset="1" stop-color="#16473a"/></linearGradient>' +
    '<linearGradient id="gfcp-cloud" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcd2ff"/></linearGradient>' +
    '</defs>';

  /* ---------------- geometry (as gf_phone) ---------------- */
  const CX = 52, CS = 28, CY = [122, 188, 254], LBX = 92, ICY = 290, ICX = [116, 184, 252], ICS = 1.2;
  const SKILL = ['7 000+ ЯЗЫКОВ', 'ОБРАЗЫ НАШЕГО ВРЕМЕНИ', 'СОВЕТ КАЖДОМУ'];
  const CKC = [1, 5, 4];                                   // the cells as gfc_images: teal (languages), pink (images), gold (advice)
  const PX0 = 110, PX1 = 250, PY0 = 92, PY1 = 322, PRX = 20;
  const SX0 = 116, SX1 = 244, SY0 = 98, SY1 = 316, CT = 134, CB = 288;
  const FIRE = [180, 108], FR = 13;                        // f03: over the four, under the headline
  const DY = 20, FIRE1 = [176, 100];                       // f01: the buildings 20 lower, the fire between them, under the headline
  const SMALL = [[30, 160, 34], [58, 160, 34], [86, 160, 34], [274, 160, 34], [302, 160, 34], [330, 160, 34],
    [34, 208, 40], [70, 208, 40], [290, 208, 40], [326, 208, 40]];
  const SMALLC = SMALL.map((_, k) => GFC.pick(k + 4));
  const BIG = [[46, 326, 100], [90, 300, 80], [270, 300, 80], [314, 326, 100]];
  const BIGC = [0, 1, 5, 2];                               // the four: coral, teal, pink, sky
  const BIG_F = [[66, 334, 120], [134, 318, 104], [226, 318, 104], [294, 334, 120]];
  const WALK0 = [[14, 344, 100], [150, 344, 104], [210, 344, 104], [346, 344, 100]];
  const WALK1 = [[66, 332, 90], [122, 334, 94], [232, 334, 94], [290, 332, 90]];
  const HK = .88;                                          // GFC.person: head centre at gy − .88·h
  const head = ([x, gy, h]) => [x, gy - HK * h];
  const FIELD = [...GFC.cloud(70, 31, [14, 168, 104, 330]), ...GFC.cloud(70, 37, [256, 168, 346, 330])];
  const TB = [[44, 194], [94, 184], [266, 184], [316, 194]];
  const TBF = [[-8, -43], [-20, -33], [20, -33], [8, -43]];
  const STUDENT = GFC.personPts(180, 330, 210);
  const DESK = [90, 270, 300];
  function rrPoly(x0, y0, x1, y1, r) {
    const P = [], sg = 10;
    const corner = (cx, cy, a0) => { for (let j = 0; j <= sg; j++) { const a = a0 + j / sg * PI / 2; P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } };
    corner(x1 - r, y0 + r, -PI / 2); corner(x1 - r, y1 - r, 0); corner(x0 + r, y1 - r, PI / 2); corner(x0 + r, y0 + r, PI);
    P.push(P[0]);
    return P;
  }
  function resample(P, n) {
    const L = [0];
    for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const tot = L[L.length - 1], R = [];
    let j = 1;
    for (let i = 0; i < n; i++) {
      const s = i / n * tot;
      while (j < L.length - 1 && L[j] < s) j++;
      const u = (s - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
      R.push([lerp(P[j - 1][0], P[j][0], u), lerp(P[j - 1][1], P[j][1], u)]);
    }
    return R;
  }
  const PHONE_P = [...resample(rrPoly(PX0, PY0, PX1, PY1, PRX), 176)];
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) PHONE_P.push([124 + i * (60 + 50 * H(j * 3 + 5)) / 8, 146 + 19 * j]);

  const circ = (cx, cy, r, n, a0 = 0, a1 = 2 * PI) => Array.from({ length: n }, (_, i) => {
    const a = lerp(a0, a1, i / n), b = lerp(a0, a1, (i + 1) / n);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a), cx + r * Math.cos(b), cy + r * Math.sin(b)];
  });
  const seg = P => P.slice(1).map((p, i) => [P[i][0], P[i][1], p[0], p[1]]);
  const bez = (p0, p1, p2, p3, n = 8) => seg(Array.from({ length: n + 1 }, (_, i) => {
    const u = i / n, v = 1 - u;
    return [0, 1].map(j => v * v * v * p0[j] + 3 * v * v * u * p1[j] + 3 * v * u * u * p2[j] + u * u * u * p3[j]);
  }));
  const mir = (S, cx) => S.map(g => [2 * cx - g[0], g[1], 2 * cx - g[2], g[3]]);
  const box = (x0, y0, x1, y1) => seg([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]);
  function along(segs, N) {
    const L = segs.map(g => Math.hypot(g[2] - g[0], g[3] - g[1]) || .001), tot = L.reduce((a, b) => a + b, 0), P = [];
    for (let i = 0; i < N; i++) {
      let d = (i + .5) / N * tot, k = 0;
      while (k < segs.length - 1 && d > L[k]) { d -= L[k]; k++; }
      const u = clamp(d / L[k]), g = segs[k];
      P.push([lerp(g[0], g[2], u), lerp(g[1], g[3], u)]);
    }
    return P;
  }
  const pathD = S => S.map(g => `M${f(g[0])} ${f(g[1])} L${f(g[2])} ${f(g[3])}`).join(' ');

  // f01: the church (left, door x 98) and the mosque (right, door x 250) on the ground line G0 (drawn DY lower)
  const G0 = 236;
  const archR = (x0, x1, yb, ys) => [[x0, yb, x0, ys], ...circ((x0 + x1) / 2, ys, (x1 - x0) / 2, 8, PI, 2 * PI), [x1, ys, x1, yb], [x1, yb, x0, yb]];
  const archP = (x0, x1, yb, ys, yt) => {
    const c = (x0 + x1) / 2, L = bez([x0, ys], [x0, ys - (ys - yt) * .6], [c - (x1 - x0) * .2, yt + 2], [c, yt], 5);
    return [[x0, yb, x0, ys], ...L, ...mir(L, c), [x1, ys, x1, yb], [x1, yb, x0, yb]];
  };
  const archFill = (x0, x1, yb, ys, yt) => yt == null
    ? `M${x0} ${yb} L${x0} ${ys} A${(x1 - x0) / 2} ${(x1 - x0) / 2} 0 0 1 ${x1} ${ys} L${x1} ${yb} Z`
    : `M${x0} ${yb} L${x0} ${ys} Q${x0} ${f(yt + (ys - yt) * .3)} ${(x0 + x1) / 2} ${yt} Q${x1} ${f(yt + (ys - yt) * .3)} ${x1} ${ys} L${x1} ${yb} Z`;
  const ONION = bez([84, 134], [70, 124], [86, 112], [98, 102]);
  const CHURCH = [...box(54, 180, 142, G0), ...seg([[48, 182], [98, 158], [148, 182]]),
    [86, 163, 86, 134], [110, 163, 110, 134], [84, 134, 112, 134], ...ONION, ...mir(ONION, 98),
    ...archR(88, 108, G0, 218), ...archR(66, 76, 212, 200), ...archR(120, 130, 212, 200)];
  const CROSS = [[98, 102, 98, 74], [89, 84, 107, 84]];
  const MDOME = bez([206, 194], [204, 162], [230, 146], [250, 138]);
  const MOSQUE = [...box(198, 194, 302, G0), ...MDOME, ...mir(MDOME, 250), [250, 138, 250, 127],
    [318, G0, 318, 112], [332, G0, 332, 112], ...box(312, 148, 338, 155), ...seg([[316, 112], [325, 90], [334, 112], [316, 112]]),
    [325, 90, 325, 86], ...archP(240, 260, G0, 214, 200), ...archP(212, 222, 222, 210, 203), ...archP(278, 288, 222, 210, 203)];
  const CRES = [[250, 119, 7], [325, 79, 5]];
  const crescent = (x, y, r) => `M${f(x + .78 * r)} ${f(y - .625 * r)} A${r} ${r} 0 1 1 ${f(x - .78 * r)} ${f(y - .625 * r)} ` +
    `A${f(.8 * r)} ${f(.8 * r)} 0 1 0 ${f(x + .78 * r)} ${f(y - .625 * r)} Z`;
  const cresPts = (x, y, r) => Array.from({ length: 9 }, (_, i) => { const a = lerp(-.675, PI + .675, i / 8); return [x + r * Math.cos(a), y + r * Math.sin(a)]; });
  const winC = w => GFC.mixC('#2c2170', LIT, w);
  // the flat buildings (w — warm light in the doors and windows, 0..1)
  const SH = d => `<path d="${d}" fill="url(#gfc-shade)"/>`;
  function churchFlat(lit, w) {
    const walls = `M54 180 L142 180 L142 ${G0} L54 ${G0} Z`, roof = 'M45 184 L98 156 L151 184 Z', drum = 'M86 134 L110 134 L110 164 L86 164 Z';
    const dome = 'M84 134 C70 124 86 112 98 102 C110 112 126 124 112 134 Z';
    let s = `<path d="${walls}" fill="url(#gfcp-w0)"/>${SH(walls)}` +
      `<rect x="54" y="190" width="88" height="3.2" fill="#8f78e0" opacity=".75"/><rect x="54" y="${G0 - 6}" width="88" height="6" fill="#8f78e0" opacity=".45"/>` +
      `<path d="${roof}" fill="${fillP(3)}"/>${SH(roof)}<path d="M47 183 L98 157.5" stroke="#fff" stroke-width="1.2" opacity=".35"/>` +
      `<path d="${drum}" fill="${fillP(2)}"/>${SH(drum)}` +
      [92, 101].map(x => `<rect x="${x}" y="140" width="4" height="14" rx="2" fill="${winC(w)}"/>`).join('') +
      `<path d="${dome}" fill="${fillP(4)}"/>${SH(dome)}<path d="M88 126 C84 120 90 113 96 108" fill="none" stroke="#fffbe8" stroke-width="2" stroke-linecap="round" opacity=".6"/>` +
      `<path d="${pathD(CROSS)}" stroke="${GOLD}" stroke-width="7" stroke-linecap="round" opacity=".35" filter="url(#gfc-soft)"/>` +
      `<path d="${pathD(CROSS)}" stroke="${GOLD}" stroke-width="3.2" stroke-linecap="round"/>`;
    s += `<path d="${lit}" fill="${winC(w)}"/>` + (w > .003 ? `<path d="${lit}" fill="${LIT}" opacity="${f(.55 * w)}" filter="url(#gfc-glow3)"/>` : '');
    return s;
  }
  function mosqueFlat(lit, w) {
    const walls = `M198 194 L302 194 L302 ${G0} L198 ${G0} Z`, dome = 'M206 195 C204 162 230 146 250 138 C270 146 296 162 294 195 Z';
    const mn = `M318 ${G0} L318 112 L332 112 L332 ${G0} Z`, cone = 'M315 112 L325 89 L335 112 Z';
    let s = `<path d="${walls}" fill="url(#gfcp-w1)"/>${SH(walls)}` +
      `<rect x="198" y="198" width="104" height="3.2" fill="${PAL[1][1]}" opacity=".8"/><rect x="198" y="${G0 - 6}" width="104" height="6" fill="${PAL[1][1]}" opacity=".45"/>` +
      `<path d="${dome}" fill="${fillP(1)}"/>${SH(dome)}<path d="M214 178 C216 164 228 153 242 147" fill="none" stroke="#e9fffa" stroke-width="2" stroke-linecap="round" opacity=".55"/>` +
      `<path d="M250 138 L250 127" stroke="${GOLD}" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="${mn}" fill="url(#gfcp-w1)"/>${SH(mn)}` +
      [176, 204].map(y => `<rect x="318" y="${y}" width="14" height="3" fill="${PAL[1][1]}" opacity=".8"/>`).join('') +
      `<rect x="312" y="148" width="26" height="7" rx="2" fill="${fillP(1)}"/><path d="${cone}" fill="${fillP(1)}"/>${SH(cone)}` +
      `<rect x="322.5" y="124" width="5" height="12" rx="2.5" fill="${winC(w)}"/>` +
      `<path d="M325 89 L325 85" stroke="${GOLD}" stroke-width="2" stroke-linecap="round"/>` +
      CRES.map(([x, y, r]) => `<path d="${crescent(x, y, r)}" fill="${GOLD}" opacity=".45" filter="url(#gfc-soft)"/><path d="${crescent(x, y, r)}" fill="${GOLD}"/>`).join('');
    s += `<path d="${lit}" fill="${winC(w)}"/>` + (w > .003 ? `<path d="${lit}" fill="${LIT}" opacity="${f(.55 * w)}" filter="url(#gfc-glow3)"/>` : '');
    return s;
  }
  const BLD = [
    { P: along([...CHURCH, ...CROSS], 160), box: [44, 74, 152, G0], at: [98, 166], seed: 3, flat: churchFlat,
      lit: [archFill(88, 108, G0, 218), archFill(66, 76, 212, 200), archFill(120, 130, 212, 200)].join(' ') },
    { P: [...along(MOSQUE, 190), ...CRES.flatMap(c => cresPts(...c))], box: [196, 74, 340, G0], at: [262, 176], seed: 4, flat: mosqueFlat,
      lit: [archFill(240, 260, G0, 214, 200), archFill(212, 222, 222, 210, 203), archFill(278, 288, 222, 210, 203)].join(' ') }];
  BLD.forEach((b, k) => { b.C = GFC.cloud(b.P.length, 61 + 6 * k, b.box); });

  /* ---------------- time from words (as gf_phone) ---------------- */
  function W(K, id, stem, share, n = 0, end = false) {
    const ws = (K.words && K.words[id]) || [], s = GFC.bare(stem);
    if (ws.filter(w => GFC.bare(w.w).startsWith(s)).length > n) return end ? GFC.we(K, id, stem, n) : GFC.w(K, id, stem, n);
    const a = GFC.T(K, id);
    return a + share * (GFC.TE(K, id) - a);
  }
  function cues(K) {
    const c = {}, a = (id, st, sh, n = 0) => W(K, id, st, sh, n), z = (id, st, sh, n = 0) => W(K, id, st, sh, n, true);
    c.e2 = GFC.TE(K, 'f02');
    c.vek = a('f01', 'веками', 0); c.sov = a('f01', 'советом', .125); c.bogu = a('f01', 'богу', .271);
    c.boguE = z('f01', 'богу', .352); c.cerk = a('f01', 'церковь', .434); c.cerkE = z('f01', 'церковь', .537);
    c.mech = a('f01', 'мечеть', .58); c.mechE = z('f01', 'мечеть', .666); c.a1 = a('f01', 'а', .717);
    c.tam = a('f01', 'там', .889); c.bylE = z('f01', 'был', .983);
    c.at2 = a('f02', 'а', 0); c.telE = z('f02', 'телефон', .214); c.gpt = a('f02', 'chatgpt', .28);
    c.gptE = z('f02', 'chatgpt', .355); c.men = a('f02', 'меньше', .355); c.chet = a('f02', 'четыре', .439);
    c.stali = a('f02', 'стали', .509); c.hod = a('f02', 'ходить', .57); c.mil = a('f02', 'миллиард', .643);
    c.milE = z('f02', 'миллиард', .713); c.chel = a('f02', 'человек', .713); c.ned = a('f02', 'неделю', .771);
    c.dan = a('f02', 'данным', .859);
    c.ver = a('f03', 'верующ', 0); c.bog = a('f03', 'бог', .256); c.vid = a('f03', 'видит', .305);
    c.mys = a('f03', 'мысл', .42); c.mysE = z('f03', 'мысл', .485); c.eto = a('f03', 'этому', .599);
    c.sob = a('f03', 'собеседн', .664); c.pish = a('f03', 'пишем', .828); c.samiE = z('f03', 'сами', .977);
    c.no8 = a('e08', 'но', 0); c.on8 = a('e08', 'он', .035); c.uch = a('e08', 'ученик', .123);
    c.srav = a('e08', 'сравнивали', .328); c.umn = a('e08', 'умным', .448); c.prost = a('e08', 'простом', .729);
    c.osh = a('e08', 'ошибается', .857);
    c.tick = [c.telE - .25, c.telE - .11, c.telE + .03];
    c.pf = [0, 1, 2, 3].map(k => [c.pish - .06 + .12 * k, c.pish + .4 + .15 * k]);
    const M = [];
    const user = (t0, k, o = {}) => M.push({ t: t0, side: 'u', k, n: o.n || 1, fly: o.fly, w: o.w || 44 + 46 * H(k * 7 + 1), h: 9 + 7 * (o.n || 1) });
    const bot = (t0, k, n) => M.push({ t: t0, side: 'b', k, n, h: 3 + 7 * n });
    user(c.gptE - .24, 1, { w: 72 }); bot(c.gptE - .08, 2, 3); user(c.gptE + .1, 3, { w: 58 });
    for (let i = 0, t0 = c.hod + .1; t0 < c.e2 + .2; i++, t0 += .5) { if (i % 2) bot(t0, 10 + i, 2 + (i % 3 ? 0 : 1)); else user(t0, 10 + i); }
    bot(c.sob + .08, 51, 2);
    c.pf.forEach(([, t1], k) => user(t1, 60 + k, { n: 1 + (k % 2), w: 52 + 10 * k, fly: 1 }));
    bot(c.samiE + .02, 70, 3);
    M.sort((x, y) => x.t - y.t);
    c.msgs = M;
    return c;
  }

  /* ---------------- drawings ---------------- */
  const ringAt = (x, y, r0, grow, u, w = 1.8, col = '#fff') => u > .003 && u < 1 ?
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r0 + grow * u)}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(.85 * (1 - u))}"/>` : '';
  const halo = (x, y, rx, ry, op) => op > .003 ? `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#gfc-halo)" opacity="${f(op)}"/>` : '';
  // a one-line headline whose parts appear on their words: parts [[text, t0], …] (*accent* inside), t1 — fades out
  function headSeq(parts, t, t1, o = {}) {
    const sz = o.size ?? 24, ls = o.ls ?? .02, maxW = o.maxW ?? 300;
    const ws = parts.map(([s]) => GFC.headBox(s, { ...o, maxW: 1e4 }).lines[0].w);
    const sp = GFC.textW(' ', sz, sz * ls) * 1.035, Wd = ws.reduce((a, b) => a + b, 0) + sp * (parts.length - 1), k = Math.min(1, maxW / Wd);
    let x = (o.x ?? 180) - k * Wd / 2, s = '';
    parts.forEach(([str, t0], i) => {
      s += GFC.headline(str, t, t0, t1, { ...o, x: x + k * ws[i] / 2, size: sz * k, maxW: 1e4 });
      x += k * (ws[i] + sp);
    });
    return s;
  }
  // x of the first part's centre (for the flying CHATGPT of e08)
  function headX(parts, i, o = {}) {
    const sz = o.size ?? 24, ls = o.ls ?? .02, maxW = o.maxW ?? 300;
    const ws = parts.map(([s]) => GFC.headBox(s, { ...o, maxW: 1e4 }).lines[0].w);
    const sp = GFC.textW(' ', sz, sz * ls) * 1.035, Wd = ws.reduce((a, b) => a + b, 0) + sp * (parts.length - 1), k = Math.min(1, maxW / Wd);
    let x = (o.x ?? 180) - k * Wd / 2;
    for (let j = 0; j < i; j++) x += k * (ws[j] + sp);
    return { x: x + k * ws[i] / 2, size: sz * k };
  }
  // a source as a pill (as .un-src): typed with t0
  function srcPill(x, y, str, t, t0, op = 1, size = 13) {
    if (t < t0 || op <= .003) return '';
    const fz = GFC.fs(size), w = GFC.textW(str.toUpperCase(), fz, fz * .12) + 20, h = fz + 10, k = q(t, t0, .25);
    return `<g opacity="${f(op * k)}"><rect x="${f(x - w / 2)}" y="${f(y - .36 * fz - h / 2 + 1.6)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="${INK}" opacity=".45" filter="url(#gfc-blur)"/>` +
      `<rect x="${f(x - w / 2)}" y="${f(y - .36 * fz - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="#1a0f4c" fill-opacity=".9" stroke="${GOLD}" stroke-opacity=".6" stroke-width="1.1"/>` +
      GFC.typed(x, y, str, t, t0, { size, cps: 38, op: .97, color: SRC }) + '</g>';
  }
  // a check mark drawn by its stroke (d 0..1)
  function tick(x, y, d, s = 1, w = 3.4) {
    if (d <= .003) return '';
    const p = `M${f(x - 8 * s)} ${f(y + 1 * s)} L${f(x - 2 * s)} ${f(y + 8 * s)} L${f(x + 9 * s)} ${f(y - 8 * s)}`, L = 30 * s;
    const da = `stroke-dasharray="${f(L)}" stroke-dashoffset="${f(L * (1 - d))}"`;
    return `<path d="${p}" fill="none" stroke="${INK}" stroke-width="${f(w + 1.6)}" opacity=".35" stroke-linecap="round" stroke-linejoin="round" ${da} transform="translate(.6 1.4)"/>` +
      `<path d="${p}" fill="none" stroke="#fff" stroke-width="${f(w)}" stroke-linecap="round" stroke-linejoin="round" ${da}/>`;
  }
  // seam Б icons — the same flat art as gfc_images draws at its end (x 116/184/252, y 290, ×1.2): taxi with a checker sign,
  // flask with green liquid and bubbles, pink backpack
  const lineS = (x1, y1, x2, y2, col, w, op = 1) =>
    `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${f(w)}" stroke-linecap="round"${op < .999 ? ` opacity="${f(op)}"` : ''}/>`;
  function taxiArt() {
    const bd = 'M-24 -3 L-13.5 -3 L-8.6 -12.4 Q-8 -13.5 -6.8 -13.5 L7.8 -13.5 Q9 -13.5 9.6 -12.4 L15.4 -3 L23 -3 Q26 -3 26 0 L26 5.4 Q26 8 23.4 8 L-23.4 8 Q-26 8 -26 5.4 L-26 0 Q-26 -3 -24 -3 Z';
    let ch = '', ck = '';
    for (let i = 0; i < 16; i++) if (i % 2 === 0) ch += `<rect x="${f(-22.4 + i * 2.8)}" y="1" width="2.8" height="2.8"/>`;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2 === 0) ck += `<rect x="${f(-5.6 + i * 2.8)}" y="${f(-19.6 + j * 2.8)}" width="2.8" height="2.8"/>`;
    return `<path d="${bd}" fill="${fillP(4)}"/><path d="${bd}" fill="url(#gfc-shade)"/>` +
      `<path d="M-12 -4 L-7.6 -11.6 L-.8 -11.6 L-.8 -4 Z M1.2 -4 L1.2 -11.6 L7.8 -11.6 L12.4 -4 Z" fill="${fillP(2)}"/>` +
      `<path d="M-9.6 -5 L-6.6 -10.4 M3 -5 L3 -10.4" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity=".7"/>` +
      `<g fill="#2a1858">${ch}</g>` + lineS(.2, -3, .2, 7.6, '#9a5a1a', .7, .5) +
      `<rect x="-5.6" y="-19.6" width="11.2" height="5.6" rx=".8" fill="#fff"/><g fill="#2a1858">${ck}</g>` +
      `<path d="${bd}" fill="none" stroke="#fff3c8" stroke-width=".8" opacity=".55"/>` +
      [-14, 14].map(x => `<circle cx="${x}" cy="8" r="5.2" fill="#1c1150"/><circle cx="${x}" cy="8" r="2.2" fill="#cfd2ff"/>`).join('') +
      `<circle cx="24.4" cy="1.2" r="1.6" fill="#fffbe8"/><circle cx="24.4" cy="1.2" r="3.4" fill="#ffe9a8" opacity=".35"/><circle cx="-25" cy="1.2" r="1.2" fill="#ffb07a"/>`;
  }
  function flaskArt() {
    const glass = 'M-4 -17 L-4 -6 L-15 12.4 Q-16.4 15 -13.4 15 L13.4 15 Q16.4 15 15 12.4 L4 -6 L4 -17 Z';
    return `<path d="${glass}" fill="#e8f6ff" opacity=".16"/>` +
      `<path d="M-10.2 4 L10.2 4 L15 12.4 Q16.4 15 13.4 15 L-13.4 15 Q-16.4 15 -15 12.4 Z" fill="${fillP(6)}"/>` +
      lineS(-10, 4, 10, 4, '#d4ffc0', 1.2, .9) +
      `<path d="${glass}" fill="none" stroke="#e2f2ff" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<rect x="-7.4" y="-19" width="14.8" height="3" rx="1.5" fill="#e2f2ff"/>` +
      lineS(-1.8, -14, -1.8, -7.5, '#fff', 1.3, .7) + lineS(-9.6, 9.6, -7.4, 6.2, '#fff', 1.2, .6);
  }
  function packArt() {
    return `<rect x="-13" y="-12" width="26" height="28" rx="6" fill="${fillP(5)}"/><rect x="-13" y="-12" width="26" height="28" rx="6" fill="url(#gfc-shade)"/>` +
      `<path d="M-13 -3 L13 -3 L13 -6 Q13 -12 7 -12 L-7 -12 Q-13 -12 -13 -6 Z" fill="#e0559a" opacity=".55"/>` +
      `<path d="M-5 -12 A5 5 0 0 1 5 -12" fill="none" stroke="#e0559a" stroke-width="2.6" stroke-linecap="round"/>` +
      lineS(-13, -3, 13, -3, '#ffd6ec', 1.2, .8) +
      `<rect x="-8" y="3" width="16" height="9.5" rx="2.6" fill="#e0559a" stroke="#ffd6ec" stroke-width=".9"/>` +
      `<circle cx="0" cy="7.6" r="1.3" fill="${GOLD}"/>` +
      `<rect x="-13" y="-12" width="26" height="28" rx="6" fill="none" stroke="#ffd6ec" stroke-width=".8" opacity=".6"/>` +
      lineS(-10, -9, -4, -9, '#fff', 1.2, .55);
  }
  const ARTS = [taxiArt, flaskArt, packArt];
  function icons(t) {
    let s = '';
    for (let k = 0; k < 3; k++) s += `<ellipse cx="${ICX[k]}" cy="${f(ICY + 17 * ICS)}" rx="${f(24 * ICS)}" ry="${f(3 * ICS)}" fill="url(#gfc-shadow)"/>` +
      `<g transform="translate(${ICX[k]} ${ICY}) scale(${ICS})">${ARTS[k]()}</g>`;
    for (let j = 0; j < 3; j++) {       // the bubbles in the flask
      const u = ((t * 1.1 + j / 3) % 1 + 1) % 1, bx = ICX[1] + (-4 + j * 4) * ICS, by = ICY + (12 - 10 * u) * ICS;
      s += `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(1.6 + .6 * u)}" fill="#eaffd8" fill-opacity=".25" stroke="#eaffd8" stroke-width="1.1" opacity="${f(.95 * Math.sin(PI * u))}"/>`;
    }
    return s;
  }
  // seam Б (as gfc_images ends): three colour cells blink (waiting), 7 000+ (gold 21) ЯЗЫКОВ (16) · ОБРАЗЫ НАШЕГО ВРЕМЕНИ ·
  // СОВЕТ КАЖДОМУ (15); f02 «телефон» — ticked one by one: the cell fills with its colour, a white ✓, a flash and a ring
  function checklist(t, c) {
    let s = '';
    for (let k = 0; k < 3; k++) {
      const y = CY[k], tk = c.tick[k], d = qq(t, tk, tk + .22), fl = pulse(t, tk, .06, .55), ci = CKC[k], P = PAL[ci];
      const bl = d > 0 ? 1 : .5 + .5 * Math.sin(t * 4.4 + k * 2.1);
      const r = `x="${f(CX - CS / 2)}" y="${f(y - CS / 2)}" width="${CS}" height="${CS}" rx="6"`;
      if (fl > .003) s += `<circle cx="${CX}" cy="${y}" r="32" fill="url(#gfc-halo)" opacity="${f(fl)}"/>`;
      s += `<rect ${r} fill="none" stroke="${P[0]}" stroke-width="7" opacity="${f(.25 * bl + .5 * fl)}" filter="url(#gfc-soft)"/>` +
        `<rect ${r} fill="${P[1]}" opacity="${f(.28 + .25 * fl)}"/>` +
        (d > .003 ? `<rect ${r} fill="${fillP(ci)}" opacity="${f(d)}"/><rect ${r} fill="url(#gfc-shade)" opacity="${f(d)}"/>` : '') +
        `<rect ${r} fill="none" stroke="${P[0]}" stroke-width="2.6" opacity="${f(.62 + .38 * bl)}"/>` +
        lineS(CX - CS / 2 + 5, y - CS / 2 + 3.6, CX + 2, y - CS / 2 + 3.6, '#fff', 1.4, .5);
      s += tick(CX, y, d) + ringAt(CX, y, 16, 30, qq(t, tk, tk + .6), 1.8, P[0]);
      const g = fl > .3;
      if (k === 0) s += GFC.mono(LBX, y + 7, '7 000+', { size: 21, anchor: 'start', ls: .04, weight: 800, color: GOLD, glow: true, opacity: .98 }) +
        GFC.mono(LBX + GFC.textW('7 000+', 21, 21 * .04) + 7, y + 7, 'ЯЗЫКОВ', { size: 16, anchor: 'start', ls: .03, opacity: .97, glow: g });
      if (k === 0 && d > .003) s += `<g opacity="${f(d)}">` + GFC.mono(LBX, y + 27, 'ПОКА — СОТНИ', { size: 13, anchor: 'start', opacity: .95, color: LAV }) + '</g>';
      else if (k > 0) s += GFC.mono(LBX, y + 6, SKILL[k], { size: 15, anchor: 'start', ls: .02, grow: false, opacity: .97, glow: g });
    }
    return s + icons(t);
  }
  // one chat message; user: a coloured bubble on the right (x1 — its right edge), bot: light lines on the left
  const UCOL = [1, 2, 5, 6];
  function msg(m, yb, op, fl, x1 = SX1 - 7) {
    if (op <= .003) return '';
    let s = '';
    if (m.side === 'u') {
      const x0 = x1 - m.w, y0 = yb - m.h, ci = UCOL[m.k % 4];
      s += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(m.w)}" height="${f(m.h)}" rx="9" fill="${fillP(ci)}"/>` +
        `<rect x="${f(x0)}" y="${f(y0)}" width="${f(m.w)}" height="${f(m.h)}" rx="9" fill="url(#gfc-shade)"/>`;
      if (fl > .003) s += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(m.w)}" height="${f(m.h)}" rx="9" fill="none" stroke="#fff" stroke-width="4" opacity="${f(.6 * fl)}" filter="url(#gfc-soft)"/>`;
      for (let j = 0; j < m.n; j++) {
        const len = (m.w - 16) * (j === m.n - 1 && m.n > 1 ? .55 : 1);
        s += `<line x1="${f(x0 + 8)}" y1="${f(y0 + 8 + 7 * j)}" x2="${f(x0 + 8 + len)}" y2="${f(y0 + 8 + 7 * j)}" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".95"/>`;
      }
    } else {
      s += `<circle cx="${SX0 + 9}" cy="${f(yb - m.h + 4)}" r="3.4" fill="${fillP(1)}"/>`;
      for (let j = 0; j < m.n; j++) {
        const len = (j === m.n - 1 ? .45 + .3 * H(m.k * 5 + j) : .8 + .2 * H(m.k * 3 + j)) * (SX1 - SX0 - 30);
        const y = yb - m.h + 4 + 7 * j;
        s += `<line x1="${SX0 + 17}" y1="${f(y)}" x2="${f(SX0 + 17 + len)}" y2="${f(y)}" stroke="${LAV}" stroke-width="2" stroke-linecap="round" opacity="${f(.75 + .25 * fl)}"/>`;
      }
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  function layout(t, c) {
    const L = new Map();
    let y = CB;
    for (let i = c.msgs.length - 1; i >= 0 && y > CT - 60; i--) {
      const m = c.msgs[i], o = m.fly ? m.t - .3 : m.t;
      if (t < o) continue;
      const a = q(t, o, .3);
      L.set(m, [y, a]);
      y -= (m.h + 6) * a;
    }
    return L;
  }
  function chat(t, c) {
    let s = '';
    for (const [m, [yb, a]] of layout(t, c)) if (t >= m.t && yb > CT - 4) s += msg(m, yb, m.fly ? 1 : a, pulse(t, m.t, .05, .6));
    return `<defs><clipPath id="gfcp-chat"><rect x="${SX0}" y="${CT}" width="${SX1 - SX0}" height="${CB - CT + 3}"/></clipPath></defs><g clip-path="url(#gfcp-chat)">${s}</g>`;
  }
  // the phone: navy body with a gradient rim, screen, CHATGPT header (end of «ChatGPT»), the chat and the input bar
  function phone(t, c, glow, wave) {
    const bx = `x="${PX0}" y="${PY0}" width="${PX1 - PX0}" height="${PY1 - PY0}" rx="${PRX}"`;
    let s = `<rect x="${PX0 + 4}" y="${PY0 + 9}" width="${PX1 - PX0}" height="${PY1 - PY0}" rx="${PRX}" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
      `<rect ${bx} fill="#a98cff" opacity="${f(.14 + .4 * glow)}" filter="url(#gfc-glow3)"/>` +
      `<rect ${bx} fill="url(#gfcp-ph)"/><rect ${bx} fill="none" stroke="url(#gfcp-rim)" stroke-width="3.2"/>` +
      `<rect x="${PX1 - 1}" y="150" width="3.5" height="26" rx="1.7" fill="#8ccbff" opacity=".8"/><rect x="${PX0 - 2.5}" y="140" width="3.5" height="18" rx="1.7" fill="#eba2ff" opacity=".8"/>` +
      `<rect x="${SX0}" y="${SY0}" width="${SX1 - SX0}" height="${SY1 - SY0}" rx="14" fill="url(#gfcp-scr)"/>` +
      `<path d="M${SX0 + 14} ${SY0} L${SX0 + 60} ${SY0} L${SX0} ${SY0 + 90} L${SX0} ${SY0 + 22} Z" fill="#fff" opacity="${f(.05 + .05 * glow)}"/>` +
      `<rect x="${SX0}" y="${SY0}" width="${SX1 - SX0}" height="${SY1 - SY0}" rx="14" fill="none" stroke="#8ccbff" stroke-width="1.2" opacity=".4"/>` +
      `<rect x="166" y="101.5" width="28" height="5" rx="2.5" fill="#0c0a30"/>`;
    const h0 = c.gptE - .3, hg = pulse(t, c.gptE - .05, .1, .8);
    if (t >= h0) s += (hg > .003 ? `<circle cx="180" cy="120" r="${f(30 + 20 * hg)}" fill="url(#gfc-halo)" opacity="${f(hg)}"/>` : '') +
      GFC.typed(180, 126, 'CHATGPT', t, h0, { size: 18, cps: 24, op: 1, glow: hg > .2, weight: 800 });
    s += `<line x1="${SX0 + 8}" y1="132" x2="${SX1 - 8}" y2="132" stroke="#8ccbff" stroke-width="1.2" opacity=".4"/>`;
    s += chat(t, c);
    const ib = pulse(t, c.sob, .1, .7);
    s += `<rect x="122" y="294" width="98" height="16" rx="8" fill="#fff" fill-opacity="${f(.07 + .2 * ib)}" stroke="#8ccbff" stroke-width="1.3" opacity="${f(.7 + .3 * ib)}"/>` +
      `<circle cx="230" cy="302" r="7" fill="${fillP(1)}"/><path d="M226.5 302.5 L233 302.5 M230.2 299.2 L233.3 302.5 L230.2 305.8" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (Math.floor(t * 2.4) % 2 === 0) s += `<rect x="130.2" y="297.5" width="1.8" height="9" rx=".9" fill="${GOLD}"/>`;
    if (wave > 0 && wave < 1) {
      const y = lerp(SY0 + 6, SY1 - 6, wave), o = Math.sin(PI * wave);
      s += `<rect x="${SX0 + 2}" y="${f(y - 9)}" width="${SX1 - SX0 - 4}" height="18" rx="6" fill="#8ccbff" opacity="${f(.3 * o)}" filter="url(#gfc-soft)"/>` +
        `<line x1="${SX0 + 4}" y1="${f(y)}" x2="${SX1 - 4}" y2="${f(y)}" stroke="#e9f6ff" stroke-width="1.6" opacity="${f(.85 * o)}"/>`;
    }
    return s;
  }
  // a thread from a to b: a gradient from the person's colour to gold; lights run to b (u — grown share); arrow — a head at b
  function thread(a, b, u, op, t, k, w = 1.4, arrow = false, col = '#fff') {
    if (u <= .003 || op <= .003) return '';
    const e = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)], id = `gfcp-t${k}`;
    let s = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}">` +
      `<stop offset="0" stop-color="${col}"/><stop offset="1" stop-color="${SUN}"/></linearGradient></defs>` +
      `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="url(#${id})" stroke-width="${w}" opacity="${f(.85 * op)}" stroke-linecap="round"/>`;
    if (u >= .999) {
      const v = ((t * .9 + k * .37) % 1 + 1) % 1, x = lerp(a[0], b[0], v), y = lerp(a[1], b[1], v), o = op * Math.sin(PI * v);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="4.2" fill="${SUN}" opacity="${f(.4 * o)}"/><circle cx="${f(x)}" cy="${f(y)}" r="1.8" fill="#fff6d0" opacity="${f(o)}"/>`;
    }
    if (arrow) {
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = 8;
      const p1 = [e[0] - L * Math.cos(ang - .45), e[1] - L * Math.sin(ang - .45)], p2 = [e[0] - L * Math.cos(ang + .45), e[1] - L * Math.sin(ang + .45)];
      s += `<path d="M${f(p1[0])} ${f(p1[1])} L${f(e[0])} ${f(e[1])} L${f(p2[0])} ${f(p2[1])}" fill="none" stroke="${SUN}" stroke-width="${f(w + .6)}" opacity="${f(op)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return s;
  }
  // a golden beam that grows from a to b (u), then runs a spark (GFC.beam)
  const beamG = (a, b, u, t, o = {}) => u <= .003 ? '' :
    GFC.beam(a, [lerp(a[0], b[0], u), lerp(a[1], b[1], u)], t, { w: 1.5, ...o, run: u >= .999 });
  // where the phone is (as gf_phone; the «ChatGPT» zoom-in is smaller — 1.12, the headline stays clear)
  function phoneT(t, c, m) {
    const zf = lerp(1.12, 1, ease(m)), st = qq(t, c.stali - .2, c.stali + .35);
    let Z = zf * lerp(1.15, 1, st), Y = lerp(212 - 8 * (zf - 1), 207, st);
    const cz = qq(t, c.mil - .1, c.mil + .45) * (1 - qq(t, c.ned + .45, c.ned + 1));
    Z = lerp(Z, .55, cz); Y = lerp(Y, 258.75, cz);
    const off = qq(t, c.ver - .3, c.ver + .15) * (1 - qq(t, c.eto + .12, c.eto + .62));
    return { Z, Y: Y + 250 * off, op: 1 - qq(off, .1, .7) };
  }
  const P2 = (T, x, y) => [180 + T.Z * (x - 180), T.Y + T.Z * (y - 207)];
  const edge = (h, T) => P2(T, h[0] < 180 ? PX0 + 1 : PX1 - 1, cl3(207 + (h[1] + 16 - T.Y) / T.Z, PY0 + 50, PY1 - 40));
  function walkers(t, c) {
    const u = qq(t, c.vek + .1, c.mechE), wk = qq(t, c.vek, c.vek + .3) * (1 - qq(t, c.mechE - .25, c.mechE + .15));
    return WALK0.map((a, k) => {
      const b = WALK1[k], [x, gy, h] = [0, 1, 2].map(i => lerp(a[i], b[i], u));
      return { x, gy, h, wk, dir: Math.sign(b[0] - a[0]), hd: [x, gy - HK * h], top: [x, gy - h] };
    });
  }
  function lay(t, c) {
    const lf = qq(t, c.ver + .1, c.ver + 1) * (1 - qq(t, c.eto - .05, c.eto + .6));
    const up = qq(t, c.ver + .45, c.ver + 1.15) * (1 - qq(t, c.eto - .2, c.eto + .3));
    return BIG.map((b, k) => {
      const [x, gy, h] = [0, 1, 2].map(i => lerp(b[i], BIG_F[k][i], lf));
      const s = h / 100, hd = [x, gy - HK * h], lean = (x < 180 ? 1 : -1) * 2.5 * s * up;
      const o0 = [TB[k][0] - b[0], TB[k][1] - head(b)[1]];
      return { x, gy, h, s, up, lean, hd, look: [x + lean, hd[1] - 3 * s * up],
        cloud: [x + lerp(o0[0], TBF[k][0], lf), hd[1] + lerp(o0[1], TBF[k][1], lf)] };
    });
  }
  // a thought cloud (r ≈ 18): white, with three orange lines; lines 0..1 — they are still inside
  function cloudT(x, y, hd, op, lines, glow, t, k) {
    if (op <= .003) return '';
    const B = [[-9, 3, 10], [0, -5, 12], [10, 2, 10], [1, 6, 10]];
    const bumps = fill => B.map(([dx, dy, r]) => `<circle cx="${f(x + dx)}" cy="${f(y + dy)}" r="${r}" fill="${fill}"/>`).join('');
    let s = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(28 + 6 * glow)}" fill="url(#gfc-halo)" opacity="${f(.45 + .55 * glow)}"/>` +
      `<g transform="translate(1.2 2.6)" opacity=".45">${bumps(INK)}</g>${bumps('url(#gfcp-cloud)')}`;
    s += [[.62, 3], [.8, 2]].map(([u, r]) => `<circle cx="${f(lerp(x, hd[0], u))}" cy="${f(lerp(y, hd[1], u))}" r="${r}" fill="#f4efff"/>`).join('');
    if (lines > .003) for (let j = 0; j < 3; j++) {
      const len = [19, 13, 16][j] * (.85 + .15 * Math.sin(t * 3 + j + k));
      s += `<line x1="${f(x - 9.5)}" y1="${f(y - 6 + 6 * j)}" x2="${f(x - 9.5 + len)}" y2="${f(y - 6 + 6 * j)}" stroke="${PAL[4][1]}" stroke-width="2.4" stroke-linecap="round" opacity="${f(lines)}"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // f01: a building — from «Веками» its coloured dots drift out of a loose cloud into a trembling silhouette; on its word they
  // gather into the outline (u), then the flat building appears over them (doors and windows warm once the fire is lit);
  // lv — «А теперь»: the building goes back into dots, they drift apart and go out
  function building(t, c, k, op, warm, lv) {
    const B = BLD[k], [w0, w1] = k === 0 ? [c.cerk, c.cerkE] : [c.mech, c.mechE];
    const u = qq(t, w0 - .9, w1), g = lerp(.85 * q(t, c.vek + .15, 1.1), 1, u);
    let P = GFC.jitter(B.P.map((p, i) => [lerp(B.C[i][0], p[0], g), lerp(B.C[i][1], p[1], g)]), t, .35 + 2.2 * (1 - u), B.seed);
    if (lv > .003) P = GFC.drift(P, t, c.at2, 34, B.seed + 9);
    const fl = pulse(t, w1 - .12, .1, .7), lo = qq(u, .55, 1) * (1 - qq(lv, 0, .6));
    let s = halo(B.at[0], B.at[1], 84 + 16 * fl, 88 + 10 * fl, fl);
    if (lo > .003) s += `<g opacity="${f(lo)}">${B.flat(B.lit, .25 + .75 * warm)}</g>`;
    s += GFC.dots(P, { r: 1.7, op: (.55 + .45 * u) * (1 - .82 * lo) * (1 - qq(lv, .4, 1)), t, glow: .6, seed: k + 2 });
    s += ringAt(B.at[0], B.at[1], 40, 70, qq(t, w1 - .12, w1 + .8), 2, GOLD);
    return `<g opacity="${f(op)}" transform="translate(0 ${DY})">${s}</g>`;
  }
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* ---------------- the scene ---------------- */
  function body(t, K) {
    const c = cues(K);
    let s = DEFS, top = '', hl = '';
    const out8 = qq(t, c.no8 - .05, c.no8 + .55);
    const fireOn = qq(t, c.ver - .1, c.ver + .4);
    const m = qq(t, c.gpt - .1, c.gptE + .05);
    const T = phoneT(t, c, m), L = lay(t, c);
    const dq = qq(t, c.a1 - .1, c.a1 + .3);
    const lv = qq(t, c.at2 - .02, c.at2 + .45);
    const f1 = q(t, c.bogu - .1, .4) * (1 - qq(t, c.at2 - .02, c.at2 + .4));
    const gone = qq(t, c.eto - .32, c.eto + .12);
    const fop = q(t, c.ver + .05, .5) * (1 - gone);

    // ===== the hills (each part its own horizon, cross-fading)
    const h1 = q(t, c.vek + .1, .7) * (1 - lv) * (1 - .4 * dq);
    if (h1 > .003) s += GFC.ground({ y: G0 + DY + 6, op: h1, warm: .55 * f1, seed: 2 });
    const h2 = q(t, c.stali - .1, .6) * (1 - fireOn) * (1 - qq(t, c.no8 - .1, c.no8 + .5)) + qq(t, c.pish - .3, c.pish + .3) * (1 - qq(t, c.no8 - .1, c.no8 + .5));
    if (h2 > .003) s += GFC.ground({ y: 152, op: clamp(h2), seed: 5, far: .75, glow: .7 });
    const h3 = fireOn * (1 - qq(t, c.eto, c.eto + .6));
    if (h3 > .003) s += GFC.ground({ y: 296, op: h3, warm: .7 * fop, seed: 3 });
    const h4 = q(t, c.uch - .1, .6);
    if (h4 > .003) s += GFC.ground({ y: 322, op: h4, seed: 4, far: .6, mid: .8, glow: .6 });

    // ===== f01: «Веками» … «А ты давно там был?»
    if (t >= c.vek - .05 && lv < .999) {
      const bop = q(t, c.vek + .2, .6) * (1 - .62 * dq);
      s += building(t, c, 0, bop, f1, lv) + building(t, c, 1, bop, f1, lv);
    }
    if (f1 > .003) {
      const fl = pulse(t, c.boguE - .1, .12, .8), fy = FIRE1[1] - 60 * qq(t, c.at2 - .02, c.at2 + .4);
      s += GFC.spark(FIRE1[0], fy, FR * (.6 + .4 * q(t, c.bogu - .1, .4) + .4 * fl), { t, op: f1 * (1 - .5 * dq) });
      s += ringAt(FIRE1[0], FIRE1[1], FR, 80, qq(t, c.boguE - .05, c.boguE + 1), 2.2, GOLD);
    }
    const WK = walkers(t, c), wop = (1 - .62 * dq) * (1 - lv);
    const rr1 = qq(t, c.boguE - .05, c.boguE + .4), rop1 = f1 * wop;
    if (rop1 > .003) WK.forEach((w, k) => {
      s += beamG([FIRE1[0], FIRE1[1] + 10], [w.top[0], w.top[1] - 3], rr1, t, { op: rop1, phase: k * .29, bend: (w.x < 180 ? -1 : 1) * .12 });
      if (rr1 >= .999) s += halo(w.hd[0], w.hd[1], 18, 18, .8 * rop1);
    });
    if (t >= c.vek && wop > .003) {
      WK.forEach((w, k) => {
        const pp = q(t, c.vek + .08 + .12 * k, .45);
        s += GFC.person(w.x, w.gy + 14 * (1 - pp) + 30 * lv, w.h, { t, color: BIGC[k], walk: w.wk, dir: w.dir, phase: k * 1.7, speed: 6,
          opacity: pp * wop, lit: .5 * f1, rim: (w.x < FIRE1[0] ? 1 : -1) * .8 * f1 });
      });
      // «советом» — coloured «?» over the heads; «Богу» — they rise into the fire and go out in it
      WK.forEach((w, k) => {
        const ap = q(t, c.sov - .05 + .1 * k, .25), u = qq(t, c.bogu - .15 + .08 * k, c.boguE + .05 + .08 * k);
        if (ap <= .003 || u >= 1) return;
        const x = lerp(w.hd[0], FIRE1[0], ease(u)) + 8 * Math.sin(u * 6 + k) * u, y = lerp(w.hd[1] - 32, FIRE1[1] + 6, ease(u));
        s += GFC.node(x, y, 12.5 * (1 - .4 * u), 'question', { color: BIGC[k], op: ap * (1 - qq(u, .8, 1)) * wop, scale: .6 + .4 * ap });
      });
    }
    // «А ты давно там был?» — on a violet plate with a gold rim, under the buildings; typed by the words; flash on «был»
    const qo = qq(t, c.a1 - .1, c.a1 + .2) * (1 - qq(t, c.at2 - .02, c.at2 + .3));
    if (qo > .003) {
      const pp = pulse(t, c.bylE + .02, .06, .55), l1 = 'А ТЫ ДАВНО', l2 = 'ТАМ БЫЛ?', sz = 27, lw = v => GFC.textW(v, sz, sz * .12) * 1.035;
      const b = `<rect x="36" y="262" width="292" height="84" rx="18" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
        halo(180, 300, 160 + 20 * pp, 52 + 8 * pp, pp) +
        `<rect x="34" y="258" width="292" height="84" rx="18" fill="url(#gfcp-plate)"/>` +
        `<rect x="34" y="258" width="292" height="84" rx="18" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="${f(.55 + .45 * pp)}"/>` +
        `<rect x="44" y="262" width="272" height="2" rx="1" fill="#fff" opacity=".18"/>` +
        GFC.typed(180 - lw(l1) / 2, 293, l1, t, c.a1 - .02, { size: sz, cps: 14, anchor: 'start', op: 1, weight: 800 }) +
        GFC.typed(180 - lw(l2) / 2, 330, l2, t, c.tam - .02, { size: sz, cps: 18, anchor: 'start', op: 1, weight: 800, color: GOLD, glow: pp > .2 });
      s += `<g opacity="${f(qo)}">${GFC.zoom(b, 180, 300, 1 + .06 * pp)}</g>`;
    }
    // headline f01: СОВЕТ — («советом») У БОГА («Богу»); gives way to f02's on «телефон»
    hl += headSeq([['Совет —', c.sov - .05], ['у *Бога*', c.bogu - .03]], t, c.telE - .3, { y: 64, size: 26 });

    // ===== f02 headlines: СОВЕТ — В ТЕЛЕФОНЕ («телефон»), МЕНЬШЕ («меньше») 4 ЛЕТ («четыре») with four coloured years
    hl += GFC.headline('Совет — в *телефоне*', t, c.telE - .34, c.men + .05, { y: 64, size: 26 });
    const menOp = 1 - qq(t, c.mil - .15, c.mil + .3);
    if (t >= c.men - .1 && menOp > .003) {
      let b = headSeq([['Меньше', c.men - .05], ['*4 лет*', c.chet - .05]], t, null, { y: 62, size: 26 });
      for (let k = 0; k < 4; k++) {
        const tk = c.chet + .12 * k, l = q(t, tk, .12), fl = pulse(t, tk, .04, .4), x = 111 + k * 36, ci = UCOL[k];
        b += `<rect x="${x}" y="73" width="30" height="7" rx="3.5" fill="#1c1458" stroke="${PAL[ci][0]}" stroke-width="1.2" opacity="${f(.6 + .4 * l)}"/>` +
          (l > .003 ? `<rect x="${x}" y="73" width="30" height="7" rx="3.5" fill="${fillP(ci)}" opacity="${f(l)}"/>` : '');
        if (fl > .003) b += `<rect x="${x - 2}" y="71" width="34" height="11" rx="5.5" fill="${PAL[ci][0]}" opacity="${f(.6 * fl)}" filter="url(#gfc-soft)"/>`;
      }
      hl += `<g opacity="${f(menOp)}">${GFC.zoom(b, 180, 66, lerp(1, .85, qq(t, c.mil - .15, c.mil + .3)))}</g>`;
    }
    // «больше миллиарда» — the counter 0 → 1 200 000 000 large in gold on a violet plate, stops on the end of «миллиарда»;
    // «неделю» — В НЕДЕЛЮ under it; after «неделю» both fly up to y 64 / 84 and stay as the headline; «Верующие» — gone
    const topOp = 1 - qq(t, c.ver - .25, c.ver + .15);
    if (t >= c.mil - .1 && topOp > .003) {
      const cu = qq(t, c.mil - .07, c.milE), fl = pulse(t, c.milE, .05, .5) + pulse(t, c.ned, .08, .6);
      const up = qq(t, c.ned + .45, c.ned + .95), pl = 1 - up;
      const b = (pl > .003 ? `<g opacity="${f(pl)}"><rect x="16" y="112" width="332" height="84" rx="18" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
        `<rect x="14" y="108" width="332" height="84" rx="18" fill="url(#gfcp-plate)"/><rect x="14" y="108" width="332" height="84" rx="18" fill="none" stroke="${GOLD}" stroke-width="1.4" opacity=".6"/></g>` : '') +
        halo(180, 140, 150 + 20 * fl, 40, clamp(fl)) +
        GFC.headline(`*${fmt(1.2e9 * cu)}*`, t, c.mil - .1, null, { y: 154, size: 26, big: 1.5, dur: .15 }) +
        GFC.typed(180, 181, 'В НЕДЕЛЮ', t, c.ned - .05, { size: 22, cps: 22, op: 1, weight: 800 });
      top += `<g opacity="${f(topOp * q(t, c.mil - .1, .15))}">` + GFC.zoom(b, 180, 150, lerp(1, .68, up), 180, lerp(150, 62, up)) + '</g>';
    }
    if (t >= c.dan - .12 && topOp > .003) top += srcPill(180, 343, 'ПО ДАННЫМ OPENAI · 10.2026', t, c.dan - .12, topOp);

    // ===== f03: the fire of order comes down on «Верующие» once the phone is gone, flashes on «Бог», brighter on «видит»;
    //     on «А этому» it rises and goes out — before the phone comes back
    if (fop > .003) {
      const land = qq(t, c.ver + .05, c.ver + .65), fy = lerp(-24, FIRE[1], land) - 90 * gone;
      const fl = clamp(pulse(t, c.bog + .05, .12, .8) + .5 * pulse(t, c.vid + .2, .1, .6));
      s += GFC.spark(FIRE[0], fy, FR * (1 + .4 * fl + .15 * qq(t, c.vid, c.mys)), { t, op: fop });
      s += ringAt(FIRE[0], fy, FR, 60, qq(t, c.ver + .7, c.ver + 1.6), 2, GOLD) + ringAt(FIRE[0], FIRE[1], FR, 80, qq(t, c.bog + .05, c.bog + 1.1), 2.2, GOLD);
    }
    const rr = qq(t, c.vid - .1, c.vid + .3), rop = (1 - qq(t, c.eto - .4, c.eto)) * fop;
    if (rr > .003 && rop > .003) L.forEach((Lk, k) => {
      s += beamG([FIRE[0], FIRE[1] + 12], [Lk.look[0], Lk.look[1] - 14], rr, t, { op: rop, phase: k * .29, w: 1.7, bend: (Lk.x < 180 ? -1 : 1) * .1 });
    });
    hl += headSeq([['Бог', c.bog - .05], ['*видит*', c.vid - .05], ['мысли', c.mys - .05]], t, c.eto + .15, { y: 64, size: 26 });
    hl += headSeq([['Чату —', c.sob - .1], ['*пишем*', c.pish - .05]], t, c.on8 + .02, { y: 64, size: 26 });

    // --- the small crowd and the field of dots («стали»; «миллиарда» — the field fills in with the counter); «данным» — the
    //     crowd comes closer and larger; gone on «Верующие», back on «пишем», leaves on «Но» (to the sides)
    const cop = Math.max(1 - fireOn, .7 * qq(t, c.pish - .15, c.pish + .3)) * (1 - out8);
    const ap = qq(t, c.dan - .3, c.dan + .5) * (1 - qq(t, c.ver - .05, c.ver + .6));
    if (t >= c.stali - .05 && cop > .003) {
      const F = GFC.jitter(FIELD.map(p => [p[0] + (180 - p[0]) * .1 * ap, p[1]]), t, 1.2, 9);
      s += GFC.dots(F, { r: 1.4, op: .75 * cop, t, glow: .4, alpha: i => q(t, c.mil + .9 * H(i * 3 + 1), .3), seed: 7 });
      SMALL.forEach(([x, gy, hh], k) => {
        const at = c.stali + .5 * H(k * 13 + 7), pop = q(t, at, .35);
        if (pop <= .003) return;
        const sc = 1 + .15 * ap, side = x < 180 ? -1 : 1, x2 = x + (180 - x) * .12 * ap + side * 50 * out8, g2 = gy + 6 * ap;
        s += GFC.person(x2, g2 + 10 * (1 - pop), hh * sc, { t, color: SMALLC[k], seed: k + 4, opacity: pop * cop, shadow: .7 });
        const h = [x2, g2 - HK * hh * sc];
        s += thread([h[0], h[1] - 2], edge(h, T), qq(t, c.hod + .04 * k, c.hod + .04 * k + .45), cop * T.op * pop, t, k, 1.3, t > c.pish - .2, PAL[SMALLC[k]][0]);
      });
    }

    // --- the checklist (seam Б): «Веками» — dims and goes up; «А теперь» — comes back; «ChatGPT» — becomes the phone
    const ckOut = qq(t, c.vek + .1, c.vek + .75), ckIn = qq(t, c.at2 + .15, c.at2 + .6), ck = 1 - ckOut + ckIn;
    if (m < 1 && ck > .003) {
      const z = lerp(1, .5, m), dy = -22 * (ckOut - ckIn);
      s += `<g opacity="${f(ck * (1 - qq(m, .35, .85)))}">${GFC.zoom(checklist(t, c), 166, 190, z, lerp(166, 180, m), lerp(190, 214, m) + dy)}</g>`;
    }
    // --- the phone: grows round the checklist on «ChatGPT», moves as phoneT says, crumbles into dots on «он» (e08)
    const pdot = qq(t, c.on8 - .05, c.on8 + .2);
    const pop = qq(m, .15, .75) * (1 - pdot) * T.op;
    if (pop > .003) {
      const glow = pulse(t, c.gptE - .05, .1, .8) + .5 * pulse(t, c.milE, .1, .8) + pulse(t, c.sob, .1, .8) + pulse(t, c.samiE - .05, .1, .8) + .6 * pulse(t, c.eto + .3, .2, .6);
      const wave = qq(t, c.samiE - .3, c.samiE + .25);
      s += `<g opacity="${f(pop)}">${GFC.zoom(phone(t, c, clamp(glow), wave), 180, 207, T.Z, 180, T.Y)}</g>`;
    }
    // e08: the phone as coloured dots → the student behind the desk (dots settle into a flat sky-blue person)
    const fp = q(t, c.uch + .25, .45);
    const sh = pulse(t, c.osh + .3, .05, .5), shx = sh > .003 ? 1.8 * sh * Math.sin(t * 40) : 0;
    if (pdot > .003) {
      const mm = qq(t, c.on8 + .12, c.uch + .55);
      const P = mm < 1 ? GFC.morph(PHONE_P, STUDENT, mm, t, { spread: .4, amp: 9, bend: 34, seed: 5 }) : GFC.jitter(STUDENT, t, .45, 2);
      if (fp > .003) s += GFC.person(180 + shx, 330, 210, { t, color: 'sky', opacity: fp, lit: .35 * q(t, c.uch + .5, .5), shadow: 0 });
      s += GFC.dots(P.map(p => [p[0] + shx, p[1]]), { r: 1.8, t, op: .95 * pdot * (1 - .8 * fp), glow: .6, seed: 3 });
      const dk = qq(t, c.uch - .05, c.uch + .45);
      if (dk > .003) {
        const [x0, x1, y] = DESK, hw = (x1 - x0) / 2 * dk + 4, lg = qq(t, c.uch + .2, c.uch + .6);
        if (lg > .003) s += `<g opacity="${f(lg)}"><rect x="96" y="${y + 6}" width="168" height="${f(20 * lg)}" rx="2" fill="url(#gfcp-wood)"/>` +
          `<rect x="96" y="${y + 6}" width="168" height="${f(20 * lg)}" rx="2" fill="${INK}" opacity=".3"/>` +
          `<rect x="100" y="${y + 12}" width="160" height="2.2" fill="#fff" opacity=".2"/>` +
          [x0 + 6, x1 - 14].map(x => `<rect x="${x}" y="${y + 4}" width="8" height="${f(28 * lg)}" rx="2" fill="url(#gfcp-wood)"/>`).join('') + '</g>';
        s += `<rect x="${f(180 - hw)}" y="${y - 4}" width="${f(2 * hw)}" height="10" rx="3" fill="url(#gfcp-wood)"/>` +
          `<rect x="${f(180 - hw)}" y="${y - 4}" width="${f(2 * hw)}" height="2.4" rx="1.2" fill="#fff" opacity=".4"/>`;
      }
    }
    // e08: an open book on the desk (left), lights fly from it into the student's head — he learns on our texts
    const bk = q(t, c.uch + .35, .4);
    if (bk > .003) {
      const sx = 128, by = DESK[2] - 4, pg = d => `M${sx} ${by} L${sx + d * 27} ${by - 6} L${sx + d * 27} ${by - 32} L${sx} ${by - 26} Z`;
      let b = `<path d="M${sx - 30} ${by - 3} L${sx} ${by + 3} L${sx + 30} ${by - 3} L${sx + 30} ${by - 7} L${sx} ${by - 1} L${sx - 30} ${by - 7} Z" fill="${fillP(5)}"/>`;
      for (const d of [-1, 1]) {
        b += `<path d="${pg(d)}" fill="#fff8ec"/><path d="${pg(d)}" fill="url(#gfc-shade)" opacity=".7"/>`;
        for (let j = 0; j < 3; j++) {
          const yj = by - 21 + 6 * j, lit = .5 + .5 * pulse(((t * 1.3 + j * .33 + (d > 0 ? .5 : 0)) % 1 + 1) % 1, 0, .1, .4);
          b += `<line x1="${sx + d * 5}" y1="${f(yj - 1.15)}" x2="${sx + d * 22}" y2="${f(yj - 4.85)}" stroke="${PAL[3][1]}" stroke-width="1.6" opacity="${f(lit)}" stroke-linecap="round"/>`;
        }
      }
      s += `<g opacity="${f(bk)}">${halo(sx, by - 16, 46, 32, .9)}${b}</g>`;
      const hd = [180 + shx, 330 - HK * 210];
      const arc = u => [lerp(sx, hd[0] - 6, u), lerp(by - 30, hd[1] + 4, u) - 50 * Math.sin(PI * u)];
      let tr = '';
      for (let j = 1; j < 16; j++) { const [x, y] = arc(j / 16); tr += `<circle cx="${f(x)}" cy="${f(y)}" r="1.2" fill="${SUN}" opacity="${f(.5 * bk)}"/>`; }
      s += tr;
      for (let k = 0; k < 7; k++) {
        const u = (((t - c.uch) / 1.6 + k / 7) % 1 + 1) % 1, [x, y] = arc(u), o = bk * Math.sin(PI * u);
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="5.5" fill="${SUN}" opacity="${f(.45 * o)}"/><circle cx="${f(x)}" cy="${f(y)}" r="2.4" fill="#fff6d0" opacity="${f(o)}"/>`;
      }
      s += halo(hd[0], hd[1], 26 + 3 * Math.sin(t * 3), 26 + 3 * Math.sin(t * 3), .8 * bk);
    }

    // --- the big people (f02 «человек» … e08 «Но»), placed by lay(); on «Но» they go to the sides and out
    if (t >= c.chel - .05 && out8 < .999) {
      const hop = q(t, c.vid + .15, .3) * (1 - qq(t, c.pish + .3, c.pish + .9)) + .7 * pulse(t, c.vid + .25, .1, .6);
      L.forEach((Lk, k) => {
        const pp = q(t, c.chel + .08 * k, .35), side = Lk.x < 180 ? -1 : 1;
        s += GFC.person(Lk.x + side * 60 * out8, Lk.gy + 12 * (1 - pp), Lk.h, { t, color: BIGC[k], seed: k, up: .3 * Lk.up,
          opacity: pp * (1 - out8), lit: clamp(.3 * fop + .7 * clamp(hop)), rim: -side * fop });
      });
      const top6 = q(t, c.chel + .3, .4) * (1 - fireOn) * (1 - out8) * T.op;
      L.forEach((Lk, k) => { const h = Lk.hd; s += thread([h[0], h[1] - 2], edge(h, T), qq(t, c.chel + .3, c.chel + .7), top6, t, k + 20, 1.5, false, PAL[BIGC[k]][0]); });
      L.forEach((Lk, k) => {
        const h = Lk.look;
        if (hop > .003) s += halo(h[0], h[1], 20 + 5 * clamp(hop), 20 + 5 * clamp(hop), clamp(hop) * (1 - out8));
        const [fx, fy] = Lk.cloud, [l0] = c.pf[k];
        const cl = q(t, c.mys - .05 + .06 * k, .3) * (1 - qq(t, l0 + .15, l0 + .5)) * (1 - out8);
        s += cloudT(fx, fy, h, cl, 1 - qq(t, l0 - .05, l0 + .05), pulse(t, c.mysE - .02 + .04 * k, .1, .6), t, k);
        s += thread([fx + (k < 2 ? 14 : -14), fy + 12], edge([Lk.hd[0], Lk.hd[1] - 20], T), qq(t, c.pish - .1, c.pish + .25), (1 - out8) * T.op, t, k + 30, 1.7, true, PAL[BIGC[k]][0]);
      });
    }
    // «пишем» — the thoughts fly from the clouds into the chat as coloured messages (into their open slot)
    const LAY = layout(t, c), slot = mm => P2(T, SX1 - 7, (LAY.get(mm) || [CB])[0]);
    c.pf.forEach(([t0, t1], k) => {
      const u = qq(t, t0, t1);
      if (u <= 0 || u >= 1) return;
      const mm = c.msgs.find(x => x.k === 60 + k), [fx, fy] = L[k].cloud, b = slot(mm);
      const x1 = lerp(fx + mm.w / 2, b[0], ease(u)), yb = lerp(fy + mm.h / 2, b[1], ease(u)) - 30 * Math.sin(PI * u);
      s += msg(mm, yb, q(u, 0, .12), .8, x1);
    });

    // --- e08: the header CHATGPT flies up from the screen into the headline CHATGPT — УЧЕНИК («ученик»); «умным» —
    //     УМНЫЙ СТАРШЕКЛАССНИК (y 60, seam В); «сравнивали» — the source (y 86); «простом» — the board, «ошибается» — 5 and ✗
    const HA = [['ChatGPT —', c.uch - .05], ['*ученик*', c.uch + .08]], HO = { y: 60, size: 24 };
    if (t >= c.on8 - .05 && t < c.uch + .1) {
      const u = ease(qq(t, c.on8 - .05, c.uch - .1)), P = headX(HA, 0, HO);
      hl += `<g opacity="${f(1 - qq(t, c.uch - .05, c.uch + .1))}">` + GFC.mono(lerp(180, P.x, u), lerp(126, 60, u), 'CHATGPT',
        { size: lerp(18, P.size, u), anchor: 'middle', opacity: 1, glow: true, weight: 800, ls: lerp(.12, .02, u) }) + '</g>';
    }
    hl += headSeq(HA, t, c.umn, HO);
    hl += headSeq([['Умный', c.umn - .05], ['*старшеклассник*', c.umn + .12]], t, null, { y: 60, size: 20, big: 1.2 });
    if (t >= c.srav - .05) hl += srcPill(180, 86, 'Л. АШЕНБРЕННЕР · 2024 · О GPT-4', t, c.srav - .05);
    const bd = q(t, c.prost - .1, .35);
    if (bd > .003) {
      const x0 = 222, x1 = 340, y0 = 122, y1 = 200, sz = 24, w4 = GFC.textW('2+2=', sz, 0), xs = 231;
      let b = `<rect x="${x0 + 2}" y="${y0 + 5}" width="${x1 - x0}" height="${y1 - y0}" rx="6" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
        `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="6" fill="url(#gfcp-wood)"/>` +
        `<rect x="${x0 + 5}" y="${y0 + 5}" width="${x1 - x0 - 10}" height="${y1 - y0 - 10}" rx="3" fill="url(#gfcp-board)"/>` +
        `<path d="M${x0 + 8} ${y0 + 8} L${x0 + 40} ${y0 + 8} L${x0 + 8} ${y0 + 40} Z" fill="#fff" opacity=".07"/>` +
        `<rect x="${x0 + 14}" y="${y1 - 4}" width="18" height="3" rx="1.5" fill="#fff" opacity=".85"/>` +
        GFC.typed(xs, 172, '2+2=', t, c.prost + .05, { size: sz, cps: 12, anchor: 'start', op: .97, ls: 0, shadow: 0 });
      const five = q(t, c.osh - .02, .15);
      if (five > .003) b += GFC.zoom(GFC.mono(xs + w4 + 3, 172, '5', { size: sz, anchor: 'start', opacity: five, ls: 0, shadow: 0, color: GOLD, glow: true }), xs + w4 + 10, 163, 1 + .5 * (1 - five));
      const xf = pulse(t, c.osh + .3, .06, .6);
      if (t >= c.osh + .28) {
        const xc = 320, yc = 163, r = 8.5, PK = PAL[5][0];
        const st = (d, ax, ay, bx2, by2) => d <= .003 ? '' : [[8, .35 + .4 * xf, ' filter="url(#gfc-soft)"'], [3.6, 1, '']].map(([w, o, g]) =>
          `<line x1="${ax}" y1="${ay}" x2="${f(lerp(ax, bx2, d))}" y2="${f(lerp(ay, by2, d))}" stroke="${PK}" stroke-width="${w}" stroke-linecap="round" opacity="${f(o)}"${g}/>`).join('');
        b += halo(xc, yc, 24 + 10 * xf, 24 + 10 * xf, .4 + .6 * xf) +
          st(qq(t, c.osh + .28, c.osh + .4), xc - r, yc - r, xc + r, yc + r) + st(qq(t, c.osh + .4, c.osh + .52), xc + r, yc - r, xc - r, yc + r) +
          ringAt(xc, yc, 10, 40, qq(t, c.osh + .3, c.osh + 1), 1.8, PK);
      }
      s += `<g opacity="${f(bd)}">${b}</g>`;
    }
    s += top;
    // f03: a slow push-in on the fire («Бог» … «мысли»), back to 1 on «этому»; the headlines stay outside the push-in
    const cam = .07 * qq(t, c.bog - .2, c.mysE) * (1 - qq(t, c.eto - .3, c.eto + .4));
    return (cam > 1e-4 ? GFC.zoom(s, 180, 200, 1 + cam) : s) + hl;
  }

  SCENES.gfc_phone = GFC.scene('gfc_phone', (t, K, mode, p) => body(t, K || {}));
})();
