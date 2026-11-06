/* gfc_future — «Бог ещё не создан», цветная версия («Цветная инфографика» v2) сцены gf_future: часть 2 из 3
 * (eps/god_future_color_p2), фраза d12 — конец части, под ней карточка ЧАСТЬ 3 (её ставит story.py, K.card).
 * Содержание, слова и порядок событий — как в принятой gf_future.js (шапка там; раскадровка — eps/god_future/source/
 * storyboard_3parts.md, строка d12; текст — source/text_v21.md): «А что если Бога — того, кто дал заповеди и видит наши мысли
 * и поступки, — не было в прошлом? Тогда, может быть, мы строим Его в будущем. Как — в третьей части.»
 * Словарь — gfc_00_lib.js (window.GFC v2), образец — eps/god_future/qa/style_flatcolor.jpg.
 *
 * Чем вид отличается от gf_future (владелец о цветной части 1: «графика всё же не как на предложенной картинке, цветов мало»):
 *  - сверху крупный заголовок GFC.headline с мыслью фразы (Montserrat 800 капсом, главное — золотом, крупнее), три по ходу
 *    фразы: «БОГ — / В ПРОШЛОМ» (с «Бога»), «В ПРОШЛОМ — / ПУСТО?» (с «не было»), «БОГ — / В БУДУЩЕМ?» (с «Тогда»);
 *    на «третьей» гаснет — под рисунком встаёт карточка ЧАСТЬ 3 (надпись части, заголовок над ней не ставим);
 *  - под сценой фиолетовые холмы и горизонт GFC.ground (линия времени лежит на гребне), звёзды фона;
 *  - люди — плоские разноцветные GFC.person (бирюза · коралл · небо, рост 100), а не облака точек; ноша — цветные предметы
 *    с полосками и бликами: суд (золотой фронтон, белые колонны с тенью, фиалковые ступени), золотая сота, больница (белое
 *    здание, голубая крыша и окна, зелёная табличка с белым «+» — не красный крест);
 *  - огонь порядка — золотое солнце GFC.spark с лучами и тёплым ореолом; луч падения и волны — золотые;
 *  - заповеди — две небесно-голубые скруглённые плиты с белыми строками, бликом и тенью (не ломаем, на «не было» тише);
 *  - нити «видит» — градиентные (золото огня → цвет человека), по ним бегут огоньки;
 *  - «?» на месте огня — крупный фиалковый значок GFC.node('question');
 *  - линия времени — цветная полоса (бирюза → небо → фиалка → коралл → золото) с коралловой стрелкой, ПРОШЛОЕ бирюзой,
 *    БУДУЩЕЕ золотом; огни по линии — золотые;
 *  - контур будущего огня — золотое пунктирное кольцо (r 36) с тёмным нутром и пустыми пунктирными гнёздами; висит над
 *    концом линии, низом на ней (в gf_future — на самой линии: так справа меньше пустоты и люди его не заслоняют); гнёзда
 *    заполняются цветными сотами: больница — зелёная с «+», суд — фиалковая с фронтоном, сота — золотая; под карточкой
 *    каждый человек собирает из точек своего цвета новую соту своего цвета; одно гнездо остаётся пустым (Бог ещё не создан).
 * Раскладка (сцена 360×640, важное y 20..345, подписи не выше y 46): заголовок (25 / акцент ×1,45) y 50..117; огонь (50,150)
 * и плиты (52, низ на линии) — над ПРОШЛЫМ; ЗАПОВЕДИ (56,246); люди x 118 · 186 · 254 (шаг 68 — руки не перекрещиваются) на
 * линии y 300, ноша ×1,45 на поднятых руках (центр y 169), подписи СУД · БОЛЬНИЦА y 138; контур (312,264). На «третьей»
 * рисунок ×0,9 поднимается (линия 300 → 186, ПРОШЛОЕ · БУДУЩЕЕ над верхом карточки), холмы — следом.
 *
 * По словам (как gf_future; одна непрерывная линия от t, mode — лишь имя кадра; вход — наплыв 0,5 с из gfc_build/build):
 *  «А (что если)»  слева направо рисуется линия времени; люди с ношей стоят у её середины, подписи СУД · БОЛЬНИЦА;
 *               ПРОШЛОЕ · БУДУЩЕЕ — когда уйдёт плашка ВЗГЛЯД АВТОРА (3 с от «что», лежит прямо на них);
 *  «Бога»       заголовок «БОГ — В ПРОШЛОМ»; огонь падает сверху по золотому лучу в начало линии, садится со вспышкой и волной;
 *  «дал»        от огня вниз бежит свет; «заповеди» — встают две плиты, печатается ЗАПОВЕДИ;
 *  «видит»      от огня к головам — градиентные нити с огоньками; «мысли» — головы в тёплом свете; «поступки» — ноша вспыхивает;
 *  «не (было)»  заголовок «В ПРОШЛОМ — ПУСТО?»; огонь гаснет в пунктирное кольцо, нити гаснут, плиты и подпись тише;
 *               «прошлом» — кольцо гаснет, на месте огня — крупный «?» (значок);
 *  «Тогда»      «?» гаснет, по линии из прошлого бежит золотой огонёк, заголовок «БОГ — В БУДУЩЕМ?»; «может» — в конце
 *               линии контур будущего огня с пустыми гнёздами, волна; дальше по линии в контур всё время бегут огни;
 *  «мы строим»  люди идут к контуру; «Его» — больница летит в центральное гнездо; «будущем» — сота; «Как» — суд;
 *  «третьей»    заголовок гаснет, контур вспыхивает волной, рисунок уменьшается и поднимается над местом карточки;
 *               «части» — ещё волна;
 *  карточка     каждые 1,2 с у одного из людей над головой из цветных точек собирается сота и летит в своё гнездо (вспышка,
 *               волна); одно гнездо пустое; контур дышит, по линии бегут огни.
 * Слова-основы GFC.w (build/words.json озвучки 05.11): что, бога, дал, заповед, видит, мысли, поступк, не, прошл, тогда,
 *   может, мы (n=1: 0-е — «мысли»), строим, его, будущ, как, треть, част. Нет слова — доля фразы (DEF — для scene_test без K).
 * Бога, Иисуса, пророков не рисуем; красного нет. Свои id в SVG: gfcfu-rev, gfcfu-th0..2. Кадр ≤ ~1500 элементов.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  const H = n => GFC.hash(n);
  const { q, qq, lerp, clamp, PAL, GOLD, INK, ACC } = GFC;
  // the timeline on the whole width, on the crest of the hills
  const LY = 300, LX0 = 24, LX1 = 336, LAB = 14;
  const PAST = '#7ff0de', CORAL = '#ff8a6b', FLOW = '#fff1c2';
  // the big empty contour of the future fire at the end of the line; БУДУЩЕЕ ends before it
  // (it floats over the end of the line, its bottom on the line: the lights run along the line into it)
  const EX = 312, EY = 264, ER = 36, FUTX = LX1 - 2, FLX1 = EX - 4;
  const IR = ER * .6, IH = ER * .33;
  const NEST = [[0, 0], ...[0, 1, 2, 3, 4, 5].map(k => [IR * Math.cos(Math.PI / 3 * k), IR * Math.sin(Math.PI / 3 * k)])];
  // the past: the fire of order over the start of the line, the tablets under it (bottom on the line)
  const FX = 50, FY = 150, FR = 15, TBX = 52, TBY = LY - 3, LABX = 56, LABY = 246;
  // three people at the middle of the line, each holds overhead what was built: court · cell · hospital
  const PH = 100, PX = [118, 186, 254], WALK = [8, 6, 3], LS = 1.45, PSEED = [1, 0, 2];
  const PCOL = PSEED.map(s => GFC.pick(s));            // teal · coral · sky
  const PS = PH / 95.5, HEADY = LY - 84 * PS, CELLY = 169, TAGY = 138;
  const KIND = ['court', 'cell', 'hosp'];
  // camera on «третьей части»: the picture shrinks and rises above the card (card ≈ scene y 222..306)
  const CZ = .9, CTY = 186;
  const DEF = [0, 9.25];
  const HOPT = { size: 25, big: 1.45 };
  const HEADS = ['Бог — / *в прошлом*', 'В прошлом — / *пусто?*', 'Бог — / *в будущем?*'];

  const span = K => K.d12 != null ? [K.d12, K.d12_end != null ? K.d12_end : K.d12 + DEF[1]] : DEF;
  const hasW = (K, stem, n) => {
    const ws = (K.words && K.words.d12) || [], s = GFC.bare(stem);
    return ws.filter(w => GFC.bare(w.w).startsWith(s)).length > n;
  };
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const wave = (t, starts) => { let v = 0; for (const a of starts) if (t >= a) v = qq(t, a, a + 1.1); return v; };

  function cues(K) {
    const [s, e] = span(K), c = { s, e };
    const W = (stem, share, n = 0) => hasW(K, stem, n) ? GFC.w(K, 'd12', stem, n) : s + share * (e - s);
    c.view = W('что', .015); c.bog = W('бога', .063); c.dal = W('дал', .191); c.zap = W('заповед', .212); c.vid = W('видит', .287);
    c.mysl = W('мысли', .338); c.post = W('поступк', .379); c.ne = W('не', .456); c.prosh = W('прошл', .504);
    c.togda = W('тогда', .55); c.mozh = W('может', .6); c.my = W('мы', .644, 1); c.str = W('строим', .657);
    c.ego = W('его', .695); c.bud = W('будущ', .725); c.kak = W('как', .785); c.tret = W('треть', .854);
    c.chast = W('част', .887);
    c.card = K.card != null ? K.card : e;
    c.land = c.bog + .45;
    // when each person lets the load go into the contour: hospital on «Его», cell on «будущем», court on «Как»
    c.rel = [c.kak, Math.max(c.bud, c.ego + .25), c.ego];
    // under the card: each person gathers a new cell of dots and sends it into its nest, one every 1.2 s
    c.gat = [0, 1, 2].map(k => c.card + .25 + 1.2 * k);
    c.fly2 = c.gat.map(a => a + .7);
    // headlines: [text, from, fade out by]
    c.heads = [[HEADS[0], c.bog - .15, c.ne + .05], [HEADS[1], c.ne, c.togda + .45], [HEADS[2], c.togda + .4, c.tret + .25]];
    return c;
  }
  const SLOT1 = [5, 4, 0], SLOT2 = [6, 1, 3];         // nests: first loads, then the cells gathered under the card
  // colour of each nest when filled: hospital green, court violet, the carried cell gold, gathered — the person's colour
  const NCOL = { 0: 6, 5: 3, 4: 4, 6: PCOL[0], 1: PCOL[1], 3: PCOL[2] };
  const ICON = { 0: 'hosp', 5: 'court' };              // a small white sign stays in the nest of the hospital and of the court

  /* ---------------- drawings ---------------- */
  function tline(t, rev, lab) {
    if (rev <= .003) return '';
    const hl = 13, bw = LX1 - LX0 - hl + 3;
    let s = `<rect x="${LX0 - 1}" y="${f(LY + 1.4)}" width="${bw}" height="5.6" rx="2.8" fill="${INK}" opacity=".5"/>` +
      `<rect x="${LX0 - 1}" y="${f(LY - 2.8)}" width="${bw}" height="5.6" rx="2.8" fill="url(#gfc-time)"/>` +
      `<rect x="${LX0 + 2}" y="${f(LY - 2.2)}" width="${bw - 6}" height="1.4" rx=".7" fill="#fff" opacity=".35"/>` +
      `<path d="M${LX1} ${LY} L${LX1 - hl} ${LY - 7.5} L${LX1 - hl} ${LY + 7.5} Z" fill="${CORAL}" stroke="${CORAL}" stroke-width="1.8" stroke-linejoin="round"/>`;
    for (let i = 0; i <= 12; i++) {
      const x = lerp(LX0 + 6, LX1 - 20, i / 12);
      s += `<line x1="${f(x)}" x2="${f(x)}" y1="${LY + 5}" y2="${LY + (i % 6 ? 9 : 12)}" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>`;
    }
    if (lab > .003) s += GFC.mono(LX0, LY + 27, 'ПРОШЛОЕ', { size: LAB, ls: .03, color: PAST, opacity: .98 * lab }) +
      GFC.mono(FUTX, LY + 27, 'БУДУЩЕЕ', { size: LAB, ls: .03, anchor: 'end', color: ACC, opacity: .98 * lab });
    // a light of time flowing along the line
    const u = ((t / 3.8) % 1 + 1) % 1, x = lerp(LX0 + 10, LX1 - 16, u), k = Math.sin(Math.PI * u);
    s += `<circle cx="${f(x)}" cy="${LY}" r="5" fill="#fff" opacity="${f(.5 * k)}" filter="url(#gfc-soft)"/><circle cx="${f(x)}" cy="${LY}" r="2" fill="#fff" opacity="${f(.85 * k)}"/>`;
    if (rev >= .999) return s;
    const w = lerp(LX0 - 18, 352, rev);
    return `<defs><clipPath id="gfcfu-rev"><rect x="-10" y="0" width="${f(w + 10)}" height="640"/></clipPath></defs>` +
      `<g clip-path="url(#gfcfu-rev)">${s}</g><circle cx="${f(Math.min(w, LX1))}" cy="${LY}" r="6" fill="#fff" opacity="${f(.55 * (1 - rev))}" filter="url(#gfc-soft)"/>` +
      `<circle cx="${f(Math.min(w, LX1))}" cy="${LY}" r="3" fill="#fff" opacity="${f(.95 * (1 - rev))}"/>`;
  }
  // golden lights running along the line from the past into the contour
  function flow(t, n, period, op) {
    if (op <= .003) return '';
    let s = '';
    for (let k = 0; k < n; k++) {
      const u = (((t / period) + k / n) % 1 + 1) % 1, a = op * Math.sin(Math.PI * u);
      for (let j = 0; j < 4; j++) {
        const x = lerp(LX0 + 8, FLX1, clamp(u - j * .02));
        s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4.2 - j * .6)}" fill="${j ? GOLD : FLOW}" opacity="${f(a * (1 - j / 4))}"/>`;
      }
    }
    return `<g filter="url(#gfc-soft)">${s}</g>${s}`;
  }
  function comet(u, x0) {
    if (u <= 0 || u >= 1) return '';
    let s = '';
    for (let k = 0; k < 9; k++) {
      const x = lerp(x0, FLX1, clamp(u - k * .025));
      s += `<circle cx="${f(x)}" cy="${LY}" r="${f(5 - k * .42)}" fill="${k ? GOLD : '#fffbe8'}" opacity="${f((1 - k / 9) * .95 * Math.sin(Math.PI * u))}"/>`;
    }
    return `<g filter="url(#gfc-soft)">${s}</g>${s}`;
  }
  // small white signs: the hospital «+» and the court front (inside a nest)
  function sign(kind, x, y, s, op) {
    if (op <= .003) return '';
    if (kind === 'hosp') return `<g opacity="${f(op)}" fill="#fff"><rect x="${f(x - 1.7 * s)}" y="${f(y - 5.2 * s)}" width="${f(3.4 * s)}" height="${f(10.4 * s)}" rx="${f(.8 * s)}"/>` +
      `<rect x="${f(x - 5.2 * s)}" y="${f(y - 1.7 * s)}" width="${f(10.4 * s)}" height="${f(3.4 * s)}" rx="${f(.8 * s)}"/></g>`;
    return `<g opacity="${f(op)}" fill="#fff"><path d="M${f(x - 6.5 * s)} ${f(y - 2 * s)} L${f(x)} ${f(y - 6.5 * s)} L${f(x + 6.5 * s)} ${f(y - 2 * s)} Z"/>` +
      [-4, 0, 4].map(dx => `<rect x="${f(x + (dx - .9) * s)}" y="${f(y - 1 * s)}" width="${f(1.8 * s)}" height="${f(5.4 * s)}"/>`).join('') +
      `<rect x="${f(x - 7 * s)}" y="${f(y + 4.8 * s)}" width="${f(14 * s)}" height="${f(1.8 * s)}" rx="${f(.5 * s)}"/></g>`;
  }
  const hexD = (x, y, r) => 'M' + [0, 1, 2, 3, 4, 5].map(j => { const a = Math.PI / 3 * j - Math.PI / 2; return `${f(x + r * Math.cos(a))} ${f(y + r * Math.sin(a))}`; }).join(' L') + ' Z';
  // a coloured honeycomb tile: gradient of the palette colour ci, white rim, highlight, soft glow of its own colour
  function tile(x, y, r, ci, op, glow = 0) {
    if (op <= .003) return '';
    const lt = PAL[ci][0];
    return `<g opacity="${f(op)}"><path d="${hexD(x, y, r * 1.08)}" fill="none" stroke="${lt}" stroke-width="3.6" opacity="${f(.45 + .5 * glow)}" filter="url(#gfc-soft)"/>` +
      `<path d="${hexD(x + r * .06, y + r * .16, r)}" fill="${INK}" opacity=".4"/>` +
      `<path d="${hexD(x, y, r)}" fill="url(#gfc-p${ci})"/><path d="${hexD(x, y, r)}" fill="url(#gfc-shade)"/>` +
      `<path d="${hexD(x, y, r * .97)}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.1" stroke-linejoin="round"/>` +
      `<path d="M${f(x - r * .62)} ${f(y - r * .28)} L${f(x - r * .1)} ${f(y - r * .6)}" stroke="#fff" stroke-width="${f(Math.max(1, r * .12))}" stroke-linecap="round" opacity=".55"/></g>`;
  }
  // the empty dashed contour of the future fire: bright 0..1; cells — fill of the 7 nests (centre first);
  // slots — faint dashed empty nests; ring — wave 0..1
  function contour(t, op, bright, cells, ring, slots, breath = .05) {
    if (op <= .003) return '';
    const br = 1 + breath * Math.sin(t * 2.3), r = ER * br, dash = 'stroke-dasharray="8 5"', off = f(-t * 4);
    let s = `<circle cx="${EX}" cy="${EY}" r="${f(r * 2.5)}" fill="url(#gfc-halo)" opacity="${f(.3 + .55 * bright)}"/>` +
      `<ellipse cx="${EX - 4}" cy="${LY}" rx="${f(ER * .9)}" ry="7" fill="${GOLD}" opacity="${f(.25 + .3 * bright)}" filter="url(#gfc-blur)"/>` +
      `<circle cx="${EX + 2}" cy="${EY + 4}" r="${f(r)}" fill="${INK}" opacity=".45" filter="url(#gfc-blur)"/>` +
      `<circle cx="${EX}" cy="${EY}" r="${f(r - 1)}" fill="#1a0c46" opacity=".92"/>` +
      `<circle cx="${EX}" cy="${EY}" r="${f(r * .8)}" fill="url(#gfc-glowP)" opacity="${f(.5 + .4 * bright)}"/>`;
    s += `<circle cx="${EX}" cy="${EY}" r="${f(r)}" fill="none" stroke="${GOLD}" stroke-width="6" ${dash} stroke-dashoffset="${off}" opacity="${f(.35 + .45 * bright)}" filter="url(#gfc-soft)"/>`;
    s += `<circle cx="${EX}" cy="${EY}" r="${f(r)}" fill="none" stroke="#ffe7a3" stroke-width="2.8" ${dash} stroke-dashoffset="${off}" opacity="${f(.82 + .18 * bright)}"/>`;
    NEST.forEach(([dx, dy], k) => {
      const l = cells[k] || 0, x = EX + dx, y = EY + dy;
      if (slots > .003 && l < .98) {
        const breathe = .75 + .25 * Math.sin(t * 2.6 + k);
        s += `<path d="${hexD(x, y, IH)}" fill="#cdb8ff" fill-opacity="${f(.07 * slots * (1 - l))}" stroke="#d9c8ff" stroke-width="1.4" stroke-dasharray="2.6 2.2" opacity="${f(.75 * slots * (1 - l) * breathe)}"/>`;
      }
      if (l <= .003) return;
      s += tile(x, y, IH * (.72 + .28 * l), NCOL[k] ?? 4, l, .4);
      if (ICON[k]) s += sign(ICON[k], x, y + (ICON[k] === 'court' ? -.5 : 0), .82, l);
    });
    if (ring > .003 && ring < 1) s += `<circle cx="${EX}" cy="${EY}" r="${f(ER + 52 * ring)}" fill="none" stroke="${GOLD}" stroke-width="2.2" opacity="${f(.9 * (1 - ring))}"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // the fire of order: GFC.spark + a golden beam from above while it falls (beam 0..1) and a wave when it lands (ring 0..1)
  function fire(x, y, r, op, t, beam, ring) {
    let s = '';
    if (beam > .003) {
      s += `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#ffcf6a" stroke-width="10" opacity="${f(.3 * beam)}" filter="url(#gfc-blur)"/>` +
        `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#fff3c4" stroke-width="2" opacity="${f(.85 * beam)}"/>`;
      for (let k = 1; k < 8; k++) s += `<circle cx="${f(x)}" cy="${f(y - k * 9)}" r="${f(4 - k * .42)}" fill="${GOLD}" opacity="${f(.7 * beam * (1 - k / 8))}" filter="url(#gfc-soft)"/>`;
    }
    s += GFC.spark(x, y, r, { t, op });
    if (ring > .003 && ring < 1) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 50 * ring)}" fill="none" stroke="${GOLD}" stroke-width="2.2" opacity="${f(.9 * (1 - ring) * op)}"/>`;
    return s;
  }
  // the commandments: two sky-blue plates with rounded tops side by side (bottom on the line), white lines, highlight
  function tablets(x, by, op, glow) {
    if (op <= .003) return '';
    const w = 25, h = 41, r = w / 2;
    let s = '';
    for (const x0 of [x - w - 2, x + 2]) {
      const d = `M${f(x0)} ${f(by)} L${f(x0)} ${f(by - h + r)} A${r} ${r} 0 0 1 ${f(x0 + w)} ${f(by - h + r)} L${f(x0 + w)} ${f(by)} Z`;
      s += `<path d="${d}" transform="translate(1.8 2.6)" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>`;
      if (glow > .003) s += `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="5" opacity="${f(.6 * glow)}" filter="url(#gfc-soft)"/>`;
      s += `<path d="${d}" fill="url(#gfc-p2)"/><path d="${d}" fill="url(#gfc-shade)"/>` +
        `<path d="${d}" fill="none" stroke="#e6f3ff" stroke-width="1.4" stroke-linejoin="round" opacity=".9"/>`;
      for (let i = 0; i < 4; i++) {
        const yy = by - h + r + 2 + i * 6.6, x1 = x0 + 4.5, x2 = x0 + w - 4.5 - (i === 3 ? 6 : 0);
        s += `<line x1="${f(x1)}" x2="${f(x2)}" y1="${f(yy)}" y2="${f(yy)}" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
      }
      s += `<path d="M${f(x0 + 4)} ${f(by - h + r + .5)} A${f(r - 4)} ${f(r - 4)} 0 0 1 ${f(x0 + r - 1)} ${f(by - h + 4.2)}" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a glowing cell of order (golden by default): warm halo + tile
  function cell(x, y, r, op, t, glow = 0, ci = 4) {
    if (op <= .003) return '';
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * (2.4 + glow))}" fill="url(#gfc-halo)" opacity="${f(.6 + .4 * glow)}"/>` +
      tile(x, y, r, ci, 1, .3 + .7 * glow + .1 * Math.sin(t * 3)) + '</g>';
  }
  const halo = (x, y, r, glow) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#gfc-halo)" opacity="${f(.45 + .55 * glow)}"/>`;
  // the court: a golden front with an oculus, white columns with a shadow stripe, violet steps (centre x,y; height 34·s)
  function court(x, y, s, op, glow) {
    if (op <= .003) return '';
    const by = y + 17 * s, X = v => f(x + v * s), Y = v => f(by + v * s);
    const shape = `<path d="M${X(-22)} ${Y(-23)} L${X(0)} ${Y(-34)} L${X(22)} ${Y(-23)} Z"/><rect x="${X(-21)}" y="${Y(-23.5)}" width="${f(42 * s)}" height="${f(4 * s)}"/>` +
      `<rect x="${X(-22.5)}" y="${Y(-4.5)}" width="${f(45 * s)}" height="${f(6 * s)}"/>` +
      [-14, -4.7, 4.7, 14].map(dx => `<rect x="${X(dx - 2.6)}" y="${Y(-19.5)}" width="${f(5.2 * s)}" height="${f(15 * s)}"/>`).join('');
    let g = `<g transform="translate(${f(1.6 * s)} ${f(2.4 * s)})" fill="${INK}" opacity=".45" filter="url(#gfc-blur)">${shape}</g>`;
    if (glow > .003) g += `<g fill="none" stroke="${GOLD}" stroke-width="${f(4 * s)}" stroke-linejoin="round" opacity="${f(.7 * glow)}" filter="url(#gfc-soft)">${shape}</g>`;
    g += `<path d="M${X(-22)} ${Y(-23)} L${X(0)} ${Y(-34)} L${X(22)} ${Y(-23)} Z" fill="url(#gfc-p4)" stroke="#fff3c4" stroke-width="${f(.9 * s)}" stroke-linejoin="round"/>` +
      `<circle cx="${X(0)}" cy="${Y(-27.3)}" r="${f(2.3 * s)}" fill="#fff8de"/>` +
      `<rect x="${X(-21)}" y="${Y(-23.5)}" width="${f(42 * s)}" height="${f(4 * s)}" rx="${f(.8 * s)}" fill="#f6efff"/>` +
      `<rect x="${X(-21)}" y="${Y(-20.6)}" width="${f(42 * s)}" height="${f(1.1 * s)}" fill="#b9a2ee" opacity=".8"/>`;
    for (const dx of [-14, -4.7, 4.7, 14]) {
      g += `<rect x="${X(dx - 2.6)}" y="${Y(-19.5)}" width="${f(5.2 * s)}" height="${f(15 * s)}" fill="#fbf8ff"/>` +
        `<rect x="${X(dx + .6)}" y="${Y(-19.5)}" width="${f(2 * s)}" height="${f(15 * s)}" fill="#c3adf3"/>` +
        `<rect x="${X(dx - 1.9)}" y="${Y(-19)}" width="${f(1 * s)}" height="${f(14 * s)}" fill="#fff" opacity=".9"/>`;
    }
    g += `<rect x="${X(-20.5)}" y="${Y(-4.5)}" width="${f(41 * s)}" height="${f(2.6 * s)}" rx="${f(.6 * s)}" fill="#c29cff"/>` +
      `<rect x="${X(-22.5)}" y="${Y(-1.9)}" width="${f(45 * s)}" height="${f(3.4 * s)}" rx="${f(.8 * s)}" fill="url(#gfc-p3)"/>`;
    return `<g opacity="${f(op)}">${halo(x, y, 36 * s, glow)}${g}</g>`;
  }
  // the hospital: a white house with a sky-blue roof and windows, a green plate with a white «+» (not a red cross)
  function hosp(x, y, s, op, glow) {
    if (op <= .003) return '';
    const by = y + 15 * s, X = v => f(x + v * s), Y = v => f(by + v * s);
    const shape = `<rect x="${X(-18)}" y="${Y(-26)}" width="${f(36 * s)}" height="${f(26 * s)}"/><rect x="${X(-20.5)}" y="${Y(-30)}" width="${f(41 * s)}" height="${f(5 * s)}"/>`;
    let g = `<g transform="translate(${f(1.6 * s)} ${f(2.4 * s)})" fill="${INK}" opacity=".45" filter="url(#gfc-blur)">${shape}</g>`;
    if (glow > .003) g += `<g fill="none" stroke="${GOLD}" stroke-width="${f(4 * s)}" opacity="${f(.7 * glow)}" filter="url(#gfc-soft)">${shape}</g>`;
    g += `<rect x="${X(-18)}" y="${Y(-26)}" width="${f(36 * s)}" height="${f(26 * s)}" fill="#f3f6ff"/>` +
      `<rect x="${X(9)}" y="${Y(-26)}" width="${f(9 * s)}" height="${f(26 * s)}" fill="#d3dcff"/>` +
      `<rect x="${X(-20.5)}" y="${Y(-30)}" width="${f(41 * s)}" height="${f(5 * s)}" rx="${f(1.2 * s)}" fill="url(#gfc-p2)"/>` +
      `<rect x="${X(-19.5)}" y="${Y(-29.4)}" width="${f(39 * s)}" height="${f(1.2 * s)}" fill="#fff" opacity=".45"/>`;
    for (const wx of [-15, -10.2, 10.2 - 3.6, 15 - 3.6]) for (const wy of [-21.5, -13]) {
      g += `<rect x="${X(wx)}" y="${Y(wy)}" width="${f(3.6 * s)}" height="${f(4.4 * s)}" rx="${f(.5 * s)}" fill="url(#gfc-p2)"/>` +
        `<rect x="${X(wx + .5)}" y="${Y(wy + .5)}" width="${f(1.1 * s)}" height="${f(1.6 * s)}" fill="#fff" opacity=".7"/>`;
    }
    g += `<rect x="${X(-3.6)}" y="${Y(-8)}" width="${f(7.2 * s)}" height="${f(8 * s)}" rx="${f(1 * s)}" fill="url(#gfc-p2)"/>` +
      `<rect x="${X(-6)}" y="${Y(-23.6)}" width="${f(12 * s)}" height="${f(12 * s)}" rx="${f(2.4 * s)}" fill="url(#gfc-p6)"/>` +
      `<rect x="${X(-6)}" y="${Y(-23.6)}" width="${f(12 * s)}" height="${f(12 * s)}" rx="${f(2.4 * s)}" fill="none" stroke="#e6ffd9" stroke-width="${f(.8 * s)}"/>` +
      sign('hosp', x, by - 17.6 * s, .82 * s, 1);
    return `<g opacity="${f(op)}">${halo(x, y, 34 * s, glow)}${g}</g>`;
  }
  function load(kind, x, y, s, op, t, glow) {
    if (kind === 'court') return court(x, y, s, op, glow);
    if (kind === 'hosp') return hosp(x, y, s, op, glow);
    return cell(x, y, 13 * s, op, t, glow, 4);
  }
  // a load flying from a to b along a raised arc (u 0..1), shrinking into the nest
  function flyLoad(kind, a, b, u, op, t, lift = 34, ci = 4) {
    if (u <= 0 || u >= 1 || op <= .003) return '';
    const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(Math.PI * u) * lift;
    const s = kind === 'cell' ? lerp(LS, IH / 13 * .9, u) : lerp(LS, .42, u), o = op * (1 - qq(u, .9, 1)), g = .5 * Math.sin(Math.PI * u);
    if (kind === 'cell') return cell(x, y, 13 * s, o, t, g, ci);
    return load(kind, x, y, s, o, t, g);
  }
  // a gradient thread from the fire to a head (gold → the person's colour), lights run along it towards the person
  function ray(a, b, op, t, k) {
    if (op <= .003) return '';
    const col = PAL[PCOL[k]][0], id = `gfcfu-th${k}`;
    const c = [lerp(a[0], b[0], .5), Math.min(a[1], b[1]) - 16];
    const d = `M${f(a[0])} ${f(a[1])} Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`;
    let s = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}">` +
      `<stop offset="0" stop-color="${GOLD}"/><stop offset="1" stop-color="${col}"/></linearGradient></defs>` +
      `<path d="${d}" fill="none" stroke="url(#${id})" stroke-width="6" opacity="${f(.3 * op)}" filter="url(#gfc-soft)"/>` +
      `<path d="${d}" fill="none" stroke="url(#${id})" stroke-width="1.9" stroke-linecap="round" opacity="${f(.9 * op)}"/>`;
    for (let j = 0; j < 2; j++) {
      const u = ((t * .8 + k * .31 + j * .5) % 1 + 1) % 1, v = 1 - u;
      const px = v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], py = v * v * a[1] + 2 * v * u * c[1] + u * u * b[1];
      s += `<circle cx="${f(px)}" cy="${f(py)}" r="4.6" fill="${GFC.mixC(GOLD, col, u)}" opacity="${f(.45 * op * Math.sin(Math.PI * u))}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${f(px)}" cy="${f(py)}" r="2" fill="#fffbe8" opacity="${f(op * Math.sin(Math.PI * u))}"/>`;
    }
    return s;
  }
  // a new cell gathering from coloured dots over a head (g 0..1), in the person's colour
  const GSRC = Array.from({ length: 24 }, (_, i) => { const a = H(i * 7 + 501) * PI2, r = 26 + 22 * H(i * 3 + 77); return [r * Math.cos(a), r * .8 * Math.sin(a)]; });
  const GDST = Array.from({ length: 24 }, (_, i) => {
    const k = Math.floor(i / 2) % 6, a = Math.PI / 3 * k - Math.PI / 2, a2 = a + Math.PI / 3, r = 13;
    return i % 2 ? [r * (Math.cos(a) + Math.cos(a2)) / 2, r * (Math.sin(a) + Math.sin(a2)) / 2] : [r * Math.cos(a), r * Math.sin(a)];
  });
  function gather(x, y, g, t, k) {
    if (g <= .003) return '';
    const P = GFC.morph(GSRC.map(p => [x + p[0], y + p[1]]), GDST.map(p => [x + p[0], y + p[1]]), g, t, { spread: .4, amp: 2, bend: 18, seed: k + 3 });
    const ci = PCOL[k], cols = [PAL[ci][0], GOLD, '#ffffff', PAL[ci][0]];
    return GFC.dots(P, { r: 2, op: .95 * (1 - qq(g, .85, 1)), t, glow: .8, color: i => cols[i % cols.length] }) +
      cell(x, y, 13, qq(g, .75, 1), t, pulse(g, .85, .1, .1), ci);
  }

  /* ---------------- the scene ---------------- */
  function body(t, K) {
    const c = cues(K);
    let s = '';
    // the timeline is drawn from the left at the very start; ПРОШЛОЕ · БУДУЩЕЕ — when the plaque ВЗГЛЯД АВТОРА is gone
    s += tline(t, qq(t, c.s - .12, c.s + .7), q(t, c.view + 2.9, .4));
    // the past: the fire falls on «Бога»; goes out into a dashed ring on «не было», the ring fades on «прошлом»
    const gone = qq(t, c.ne - .05, c.ne + .45);
    const fall = qq(t, c.bog - .1, c.land), fop = q(t, c.bog - .15, .25) * (1 - gone);
    const beam = q(t, c.bog - .15, .2) * (1 - qq(t, c.land - .05, c.land + .5));
    const fy = lerp(-30, FY, fall);
    // «видит» — gradient threads from the fire to the heads (behind the people); «мысли» — warm light in the heads
    const rop = q(t, c.vid - .05, .35) * (1 - gone);
    const pop = q(t, c.s - .1, .45);
    const wu = clamp((t - (c.str - .1)) / 1.5), amp = Math.sqrt(Math.sin(Math.PI * wu));
    const xs = PX.map((x, k) => x + WALK[k] * GFC.ease(wu));
    for (let k = 0; k < 3; k++) s += ray([FX + 10, FY + 8], [xs[k], HEADY], rop, t, k);
    if (fop > .003) s += fire(FX, fy, lerp(9, FR, fall) * (1 + .35 * pulse(t, c.land, .1, .6) + .2 * pulse(t, c.dal, .1, .5)), fop, t, beam, wave(t, [c.land, c.dal]));
    const ring = q(t, c.ne - .1, .3) * (1 - qq(t, c.prosh + .05, c.prosh + .6));
    if (ring > .003) {
      const r = FR * 1.6 * (1 + .04 * Math.sin(t * 3));
      s += `<circle cx="${FX}" cy="${FY}" r="${f(r)}" fill="none" stroke="${GOLD}" stroke-width="5" stroke-dasharray="6 4" stroke-dashoffset="${f(-t * 4)}" opacity="${f(.35 * ring)}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${FX}" cy="${FY}" r="${f(r)}" fill="none" stroke="#ffe7a3" stroke-width="2.4" stroke-dasharray="6 4" stroke-dashoffset="${f(-t * 4)}" opacity="${f(.95 * ring)}"/>`;
    }
    // «дал» — a light runs down from the fire; «заповеди» — the two plates rise under it, ЗАПОВЕДИ is typed
    const dl = qq(t, c.dal - .05, c.zap + .15);
    if (dl > 0 && dl < 1) s += `<circle cx="${FX}" cy="${f(lerp(FY + 18, TBY - 34, dl))}" r="5" fill="${GOLD}" opacity="${f(.6 * Math.sin(Math.PI * dl))}" filter="url(#gfc-soft)"/>` +
      `<circle cx="${FX}" cy="${f(lerp(FY + 18, TBY - 34, dl))}" r="2.4" fill="#fffbe8" opacity="${f(.95 * Math.sin(Math.PI * dl))}"/>`;
    const tq = q(t, c.zap - .1, .4), tdim = 1 - .45 * qq(t, c.ne, c.ne + .6);
    if (tq > .003) s += GFC.zoom(tablets(TBX, TBY, tq * tdim, pulse(t, c.zap, .15, .8) + .4 * (1 - gone)), TBX, TBY, .6 + .4 * tq);
    if (t >= c.zap - .05) s += `<g opacity="${f(1 - .7 * qq(t, c.ne, c.ne + .6))}">${GFC.typed(LABX, LABY, 'ЗАПОВЕДИ', t, c.zap - .05, { size: 11, cps: 26, ls: .06, glow: true, op: .98 })}</g>`;
    // the contour at the end: on «может»; «Тогда» — a golden light runs from the past into the end first
    s += comet(qq(t, c.togda - .05, c.togda + .75), LX0 + 6);
    const cop = q(t, c.mozh - .15, .4);
    s += flow(t, 3, 2.4, .9 * cop);
    const dock = k => c.rel[k] + .5, dock2 = k => c.fly2[k] + .55;
    const cells = [0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < 3; k++) { cells[SLOT1[k]] = q(t, dock(k), .25); cells[SLOT2[k]] = q(t, dock2(k), .25); }
    const hits = [c.mozh, ...[0, 1, 2].map(dock), c.tret, c.chast, ...[0, 1, 2].map(dock2)];
    let bright = .2 + .12 * (.5 + .5 * Math.sin(t * 3.1)) + .5 * pulse(t, c.mozh, .1, .8) + .25 * q(t, c.ego, 1) +
      .6 * (pulse(t, c.tret, .1, .7) + pulse(t, c.chast, .1, .7));
    for (let k = 0; k < 3; k++) bright += .55 * (pulse(t, dock(k), .1, .8) + pulse(t, dock2(k), .1, .8));
    s += contour(t, cop, clamp(bright), cells, wave(t, hits), q(t, c.mozh + .2, .5));
    // the people: there from the start (they built courts and hospitals — d11); walk to the contour on «строим»
    const hop = q(t, c.mysl - .05, .3) * (1 - gone) + .6 * pulse(t, c.mysl, .1, .6) * (1 - gone);
    const deed = pulse(t, c.post - .05, .15, 1) + .35 * q(t, c.post, .4) * (1 - qq(t, c.ne, c.ne + .6));
    const rim = fop > .05 ? -.8 * fop : .7 * cop;
    for (let k = 0; k < 3; k++) {
      const x = xs[k], rel = c.rel[k];
      const d = qq(t, rel - .1, rel + .5);
      const up = clamp((1 - qq(t, rel + .25, rel + .7)) + qq(t, c.gat[k] - .35, c.gat[k] + .1) * (1 - qq(t, c.fly2[k] + .2, c.fly2[k] + .6)));
      s += GFC.person(x, LY - 1, PH, { seed: PSEED[k], color: PCOL[k], t, up, walk: amp, speed: 5.4, phase: k * 1.7 - c.str * 5.4, dir: 1,
        lit: .25 + .75 * clamp(hop), rim, opacity: pop, shadow: .8 });
      // warm light in the head («мысли»)
      if (hop > .003) s += `<circle cx="${f(x)}" cy="${f(HEADY)}" r="22" fill="url(#gfc-halo)" opacity="${f(clamp(hop))}"/>` +
        `<circle cx="${f(x)}" cy="${f(HEADY)}" r="${f(3 + 2 * clamp(hop))}" fill="#fff3c4" opacity="${f(.85 * clamp(hop))}" filter="url(#gfc-soft)"/>`;
      // the load overhead until it flies into its nest
      s += load(KIND[k], x, CELLY, LS, pop * (d > 0 ? 0 : 1), t, clamp(deed));
    }
    for (let k = 0; k < 3; k++) {
      const x = xs[k], rel = c.rel[k];
      const d = qq(t, rel - .1, rel + .5), d2 = qq(t, c.fly2[k], c.fly2[k] + .55);
      s += flyLoad(KIND[k], [PX[k] + WALK[k] * GFC.ease(clamp((rel - .1 - (c.str - .1)) / 1.5)), CELLY], [EX + NEST[SLOT1[k]][0], EY + NEST[SLOT1[k]][1]], d, 1, t);
      // under the card: a new cell gathers from dots overhead and flies into its own nest
      s += gather(x, CELLY, qq(t, c.gat[k] - .1, c.gat[k] + .55) * (d2 > 0 ? 0 : 1), t, k);
      s += flyLoad('cell', [x, CELLY], [EX + NEST[SLOT2[k]][0], EY + NEST[SLOT2[k]][1]], d2, 1, t, 30, PCOL[k]);
    }
    // labels of the loads: СУД · БОЛЬНИЦА (tinted with the load), gone when the load flies
    const lab = (k, text, col) => GFC.mono(xs[k], TAGY, text, { size: 13, anchor: 'middle', ls: .06, color: col, opacity: .98 * pop * (1 - qq(t, c.rel[k] - .15, c.rel[k] + .15)) });
    s += lab(0, 'СУД', '#ffe9a8') + lab(2, 'БОЛЬНИЦА', '#c8f7b4');
    // «прошлом?» — a big violet «?» sign where the fire was; gone on «Тогда»
    const qm = q(t, c.prosh - .05, .25) * (1 - qq(t, c.togda + .2, c.togda + .7));
    if (qm > .003) s += GFC.node(FX, FY + 1.5 * Math.sin(t * 2.2), 25, 'question', { color: 'violet', op: qm, scale: .55 + .45 * q(t, c.prosh - .05, .3) + .06 * pulse(t, c.prosh + .2, .15, .4) });
    // «третьей части»: the picture shrinks and rises above the card; the hills follow the line
    const L = qq(t, c.tret - .05, Math.max(c.tret + 1.2, c.card + .5));
    const hy = lerp(LY + 3, CTY + 3 * CZ, L);
    let out = GFC.ground({ y: hy, warm: .35 * fop + .3 * cop, seed: 2 });
    out += L > .001 ? GFC.zoom(s, 180, LY, lerp(1, CZ, L), 180, lerp(LY, CTY, L)) : s;
    // the headline over everything (it is gone before the picture rises)
    for (const [text, a, b] of c.heads) out += GFC.headline(text, t, a, b, HOPT);
    return out;
  }

  SCENES.gfc_future = GFC.scene('gfc_future', (t, K, mode, p) => body(t, K || {}));
})();
