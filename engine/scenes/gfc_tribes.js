/* gfc_tribes — «Бог ещё не создан», цветная версия («Цветная инфографика» v2, словарь gfc_00_lib.js — window.GFC) сцены
 * gf_tribes, часть 2 (eps/god_future_color_p2), фразы d08–d09. Сюжет, слова и время — те же, что у принятой чёрно-белой
 * gf_tribes (GF.w → GFC.w, те же основы слов, те же события на тех же словах); меняется вид. v2, 06.11 — по замечанию
 * владельца к цветной части 1 («графика всё же не как на предложенной картинке, цветов мало»), ближе к образцу
 * eps/god_future/qa/style_flatcolor.jpg.
 *
 * Чем вид отличается от gf_tribes:
 *  — на каждой фразе вверху крупный заголовок GFC.headline с мыслью фразы (главное слово золотом), вместо мелких надписей
 *    ДРЕВНОСТЬ и КТО ИХ РАССУДИТ? (те стояли на y 34 — выше 46, под интерфейсом Reels); базовая линия заголовков — y 58;
 *  — люди не из точек, а плоские цветные фигуры без лиц (палитра GFC.PAL по кругу GFC.pick: в одном племени все цвета);
 *    двое в начале — бирюзовый (простит) и фиолетовый (нет);
 *  — под сценой фиолетовые холмы GFC.ground (горизонт поднимается с отъездом), под каждым племенем — площадка с отсветом;
 *  — костры — цветные: поленья, камни, три языка пламени, искры (как костёр образца);
 *  — знаки-боги племён — цветные кружки-значки GFC.node со своими рисунками (солнце — коралл, луна — небо, бык — зелёный,
 *    гора — фиалка); у племени свой цвет: значок, плита и частокол этого цвета;
 *  — плиты-законы — цветные, с белыми полосками и бликом; ОДИН ЗАКОН — крупная золотая плита;
 *  — частоколы — колья цвета племени со светлыми верхушками; зигзаги спора — тёплые золотые (красного нет: спор — не война);
 *  — один огонь — золотое солнце GFC.spark с лучами; образ — золотой пунктирный круг с розово-фиолетовым светом внутри,
 *    весы в нём — золотые; нити «для всех племён» — градиент от цвета человека к золоту; мысли — точки цвета человека;
 *  — крупный «?» — розовый значок GFC.node; ладонь «простит» — с розовым значком-сердцем, нить к другому — золото → розовый.
 * Бога, Иисуса, пророков нет — только подписи и образ-контур; знаки племён — простые рисунки, не символы мировых религий;
 * на «один Бог» их не ломают — только тускнеют. Плашку ВЗГЛЯД АВТОРА ставит story.py (d09 «что»).
 *
 * Мир (камера ×1): четыре племени 2×2 — костёр, вокруг 10 человек подковой (сзади и по бокам, спереди открыто), над ними
 * значок-бог (снаружи) и плита-закон (ближе к середине); дальний ряд — костры y 204, рост 36; ближний — y 316, рост 46.
 * Вождь — человек подковы, ближний к середине кадра. Один огонь — (180,132), его пунктирный контур r 28; плита ОДИН ЗАКОН —
 * (180,190), 72×56; крупный контур конца — (180,112), r 56, весы в нём — поза, на которую рассчитан вход gfc_build/images
 * (та же, что у gf_tribes → gf_build).
 * Своя камера: в начале d08 наезд ×4,55 на двоих (A — x 160, B — x 200, подошвы y 332, рост 44 → на экране рост 200,
 * подошвы y 330: над ними помещается заголовок); на «А» (в древности) — отъезд к ×1, подошвы двоих остаются внизу кадра.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (шва между режимами нет).
 *  tribes (d08) «Один простит, другой — нет. А в древности спорили целые племена, и у каждого свой бог и свой закон.
 *               Кто их рассудит?» Вход наплывом из gfc_book/you (GFC.scene). Двое крупно на холмах, заголовок
 *               ПРОСТИТ / НЕ КАЖДЫЙ; «Один» — левый (бирюзовый) светлеет; «простит» — протягивает руку, в ладони тёплый свет
 *               и розовое сердце, к другому тянется нить; «другой» — правый (фиолетовый) светлеет; «нет» — скрещивает
 *               руки и отступает, нить рвётся золотыми искрами. «А» — отъезд: двое внизу, холмы опускаются к горизонту,
 *               четыре костра, у каждого люди; «древности» — ДРЕВНИЕ / ПЛЕМЕНА; «спорили» — люди трясут кулаками в сторону
 *               соседей, между племенами бьют золотые зигзаги; «целые» — в каждое племя входят ещё люди, двое уходят каждый
 *               в своё; «племена» — костры вспыхивают; «каждого»/«свой»/«бог» — над племенами по очереди выскакивают
 *               значки СОЛНЦЕ, ЛУНА, БЫК, ГОРА, заголовок У КАЖДОГО / СВОЯ ПРАВДА; «свой» (2-е) и «закон» — рядом встают
 *               свои цветные плиты; сразу за «закон» вокруг каждого племени поднимается частокол его цвета; «Кто» —
 *               КТО / СУДЬЯ? и в середине крупный розовый значок «?»; «рассудит» — «?» вздрагивает, с частоколов летят искры.
 *  one (d09)    «Верующие скажут: закон людям дал Сам Бог. А что если вождям просто нужен был один Бог для всех
 *               племён — один закон и один Судья, который видит каждого? Тогда, может быть, люди сначала Его вообразили.»
 *               «Верующие» — все поднимают руки к небу, спор стихает; «скажут» — «?» гаснет, ЗАКОН / СВЫШЕ; «закон» — сверху
 *               до середины между племенами опускается золотой луч; «людям» — от его конца по племенам расходится кольцо
 *               света, люди теплеют; «Сам Бог» — под заголовком загорается золотое солнце, волна, луч втягивается в него.
 *               «А (что если)» — руки опускаются, солнце становится золотым пунктирным кругом (образ); «вождям» — вожди
 *               выходят вперёд, выше, с посохом и венцом из трёх огоньков, ОДИН БОГ / НА ВСЕХ; «нужен» — вожди показывают
 *               на круг, к нему тянутся пунктиры; «один Бог» — круг вспыхивает волной, значки племён тускнеют; «всех
 *               племён» — от каждого человека к кругу цветная нить, частоколы опускаются; «один закон» — четыре плиты
 *               слетаются под круг в одну крупную золотую ОДИН / ЗАКОН; «Судья» — в круге прорисовываются весы (качнутся и
 *               встанут ровно), ВСЕВИДЯЩИЙ / СУДЬЯ; «видит каждого» — от круга к каждой голове бежит золотой луч, голова
 *               загорается; «Тогда» — лучи и нити гаснут, СНАЧАЛА / ВООБРАЗИЛИ?; «может быть» — круг мерцает, плита тише;
 *               «люди» — люди вспыхивают; «сначала Его» — от голов вверх к кругу бегут цветные точки-мысли; «вообразили» —
 *               заголовок уходит, круг с весами вырастает крупно ((180,112), r 56), волна, плита гаснет. Эта поза держится
 *               до конца кадра — из неё наплывает gfc_build/images.
 * Слова-основы GFC.w (те же, что у gf_tribes; сверены с build/words.json 06.11): d08 — один, прост, друг, нет, а, древн,
 *   спор, цел, плем, кажд, свой (0 и 1), бог, закон, кто, рассуд; d09 — верующ, скажут, закон (0 и 1), людям, сам, бог
 *   (0 и 1), что, если, вожд, нужен, один (0, 1), всех, племен, суд, видит, тогда, может, люди, сначала, его, вообраз.
 *   Нет слова — начало фразы + n·0,4 с.
 * Кадр: заголовки — базовая линия y 58 (низ ≈ 101), всё важное — y 33..338, низ — под субтитры. Пик ≈ 40 фигур + 40 нитей.
 * Проверка (станция tesla): eps/god_future_color_p2/qa/gfc_tribes_*.jpg (render.py --story … --at … --sheet).
 * Параметры p: s, mode, K, prev/prev_mode (наплыв — GFC.scene).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const { qq, lerp, clamp } = GFC;
  const H = n => GFC.hash(n);
  const PI2 = Math.PI * 2;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const mix = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
  const PAL = GFC.PAL, GOLD = GFC.GOLD, INK = GFC.INK;
  const SUNC = '#ffd36b', ORANGE = '#ffb547', CREAM = '#fff1c8';
  const A0 = 180, A1 = 200;                         // якорь камеры: точка мира (cx,cy) стоит здесь
  const ZC = 4.55;                                  // наезд на двоих в начале d08
  const AX = 160, BX = 200, ABY = 332, ABH = 44;    // двое: x, подошвы, рост (мир)
  const ACOL = 1, BCOL = 3;                         // A — бирюза, B — фиалка
  const FX = 180, FY = 132, FR = 14, CR0 = 28;      // один огонь; его пунктирный контур
  const GX = 180, GY = 112, GR = 56;                // «вообразили»: крупный контур (шов с gfc_build)
  const LTX = 180, LTY = 190, LTW = 72, LTH = 56;   // плита ОДИН ЗАКОН
  const BEAMY = 262;                                // луч «закон людям дал» — до середины между племенами
  const HY = 172;                                   // горизонт холмов при ×1
  const QX = 180, QY = 150, QR = 28;                // крупный «?»
  const HL = { y: 58, size: 22, big: 1.5 };         // заголовки

  /* ---------------- мир: племена и люди (константы) ---------------- */
  // sc — сторона к середине кадра (+1 — середина справа); col — цвет племени (значок, плита, частокол)
  const TRIBES = [
    { x: 88, y: 204, h: 36, rx: 33, ry: 9, fr: 58, fry: 17, sc: 1, sign: 'sun', col: 0, marks: 0 },
    { x: 272, y: 204, h: 36, rx: 33, ry: 9, fr: 58, fry: 17, sc: -1, sign: 'moon', col: 2, marks: 1 },
    { x: 88, y: 316, h: 46, rx: 40, ry: 11, fr: 66, fry: 20, sc: 1, sign: 'beast', col: 6, marks: 2 },
    { x: 272, y: 316, h: 46, rx: 40, ry: 11, fr: 66, fry: 20, sc: -1, sign: 'mount', col: 3, marks: 3 },
  ].map(tr => Object.freeze({ ...tr, far: tr.y < 250, sx: tr.x - 18 * tr.sc, sy: tr.y - tr.h - (tr.y < 250 ? 36 : 32),
    tx: tr.x + 23 * tr.sc, sr: tr.y < 250 ? 16 : 16.5, fs: tr.y < 250 ? .5 : .62 }));

  const PPL = (() => {
    const A = [];
    TRIBES.forEach((tr, ti) => {
      for (let k = 0; k < 10; k++) {
        const ring = k < 5 ? 0 : 1, j = ring ? k - 5 : k;
        const a0 = (ring ? [36, -24, -70, -114, 144] : [0, -48, -92, -136, 180])[j] * Math.PI / 180, ang = tr.sc > 0 ? a0 : Math.PI - a0;
        const m = ring ? 1.55 : 1;
        const x = tr.x + tr.rx * m * Math.cos(ang), gy = tr.y + tr.ry * m * Math.sin(ang);
        const h = tr.h * (1 + .05 * Math.sin(ang) * m) * (.94 + .1 * H(ti * 31 + k));
        const ab = ring && j === 0 && ti === 2 ? -1 : ring && j === 0 && ti === 3 ? 1 : 0;
        const seed = ti * 10 + k + 1;
        A.push({ ti, k, ring, x, gy, h, sc: tr.sc, ab, leader: !ring && j === 0, seed,
          ci: ab < 0 ? ACOL : ab > 0 ? BCOL : GFC.pick(seed + ti * 2),
          x0: tr.x + (x - tr.x) * 2.1, gy0: tr.y + (gy - tr.y) * 1.8 + 6, ph: H(ti * 17 + k * 3) * PI2, armv: H(ti * 13 + k * 7),
          rim: Math.abs(x - tr.x) > 4 ? Math.sign(tr.x - x) * .75 : 0 });
      }
    });
    return Object.freeze(A.map(Object.freeze));
  })();
  const IA = PPL.findIndex(p => p.ab < 0), IB = PPL.findIndex(p => p.ab > 0);
  // зигзаги спора: пары племён (от края до края)
  const ZIG = Object.freeze([[[148, 196], [212, 196]], [[152, 306], [208, 306]], [[140, 222], [220, 298]], [[220, 222], [140, 298]]]);

  /* ---------------- значки племён (поле ±10 при r 16; c — белый, d — тёмный цвет круга) ---------------- */
  const ICON = {
    sun: c => {
      let s = `<circle r="4.8" fill="${c}"/>`;
      for (let k = 0; k < 8; k++) { const a = k / 8 * PI2 + .2; s += `<line x1="${f(6.8 * Math.cos(a))}" y1="${f(6.8 * Math.sin(a))}" x2="${f(9.9 * Math.cos(a))}" y2="${f(9.9 * Math.sin(a))}" stroke="${c}" stroke-width="2.1" stroke-linecap="round"/>`; }
      return s;
    },
    moon: c => `<path d="M5.5 -8.65 A9 9 0 1 0 5.5 8.65 A9.55 9.55 0 0 1 5.5 -8.65 Z" fill="${c}"/><circle cx="6.6" cy="-3.4" r="1.2" fill="${c}"/><circle cx="8.6" cy="2.6" r=".9" fill="${c}"/>`,
    beast: (c, d) => `<path d="M-5.6 -3.2 C-6.4 3.2 -3.6 9.2 0 9.2 C3.6 9.2 6.4 3.2 5.6 -3.2 C4.6 -6 -4.6 -6 -5.6 -3.2 Z" fill="${c}"/>` +
      `<path d="M-4.4 -4.6 C-8.8 -4.6 -10.4 -7.6 -9.6 -10.6 M4.4 -4.6 C8.8 -4.6 10.4 -7.6 9.6 -10.6" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>` +
      `<path d="M-5.6 -2.4 L-9.8 -1 L-6.2 .9 Z M5.6 -2.4 L9.8 -1 L6.2 .9 Z" fill="${c}"/>` +
      `<circle cx="-2.1" cy="5.6" r="1.15" fill="${d}"/><circle cx="2.1" cy="5.6" r="1.15" fill="${d}"/><circle cx="-2.6" cy="-.6" r="1" fill="${d}"/><circle cx="2.6" cy="-.6" r="1" fill="${d}"/>`,
    mount: (c, d) => `<path d="M-10.6 8 L-3.2 -7.6 L1.4 1.6 L4.6 -3.2 L10.6 8 Z" fill="${c}" stroke="${c}" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<path d="M-3.2 -7.6 L-5.7 -2.4 L-3.9 -3.7 L-2.5 -2.1 L-1.1 -3.5 Z M4.6 -3.2 L3.2 -.4 L4.6 -1.3 L5.9 -.4 Z" fill="${d}" opacity=".55"/>`,
  };

  /* ---------------- время от слов ---------------- */
  function cues(K) {
    const w = (s, n = 0) => GFC.w(K, 'd08', s, n), v = (s, n = 0) => GFC.w(K, 'd09', s, n);
    const c = {};
    c.s8 = GFC.T(K, 'd08'); c.e8 = GFC.TE(K, 'd08'); c.s9 = GFC.T(K, 'd09'); c.e9 = GFC.TE(K, 'd09');
    c.one = w('один'); c.prost = w('прост'); c.drug = w('друг'); c.net = w('нет'); c.a = w('а'); c.drev = w('древн');
    c.spor = w('спор'); c.cel = w('цел'); c.plem = w('плем'); c.kazh = w('кажд'); c.svoi = w('свой'); c.bog = w('бог');
    c.svoi2 = w('свой', 1); c.zak = w('закон'); c.kto = w('кто'); c.rass = w('рассуд');
    c.ver = v('верующ'); c.sk = v('скажут'); c.zak9 = v('закон'); c.lyud = v('людям'); c.sam = v('сам'); c.bog9 = v('бог');
    c.chto = v('что'); c.esli = v('если'); c.vozh = v('вожд'); c.nuzh = v('нужен'); c.odin = v('один'); c.bog2 = v('бог', 1);
    c.vseh = v('всех'); c.plem9 = v('племен'); c.odin2 = v('один', 1); c.zak2 = v('закон', 1); c.sud = v('суд');
    c.vid = v('видит'); c.togda = v('тогда'); c.mozh = v('может'); c.lyudi = v('люди'); c.snach = v('сначала');
    c.ego = v('его'); c.voobr = v('вообраз'); c.a9 = v('а');
    // вспышки спора: на «спорили» — четыре подряд, дальше каждые 0,5 с до «Верующие»; на «рассудит» — две разом
    c.fl = [];
    [0, 2, 1, 3].forEach((k, n) => c.fl.push([c.spor + n * .23, k, 1]));
    for (let x = c.spor + 1.05, k = 4; x < c.ver - .3; x += .5, k++) if (Math.abs(x - c.rass) > .35) c.fl.push([x, (k * 3) % 4, .8]);
    for (let k = 0; k < 2; k++) c.fl.push([c.rass + .04 * k, k, 1.2]);
    return c;
  }

  /* ---------------- камера ---------------- */
  function camera(t, c) {
    const u = qq(t, c.a - .05, c.a + 1.1), z = Math.exp(lerp(Math.log(ZC), 0, u)), sy = lerp(330, ABY, u);
    return { z, u, cx: 180, cy: ABY - (sy - A1) / z };
  }
  const proj = (cam, x, y) => [A0 + (x - cam.cx) * cam.z, A1 + (y - cam.cy) * cam.z];

  /* ---------------- плоский человек с руками по позе ---------------- */
  // Те же оси, что у GFC.person: голова r 11,5 в (0,−84), плечи (±12,5,−61), туника до подошв (0), рост 95,5 единиц.
  // Кисти L/R ставит поза; front — руки поверх туники (скрещены). Свет: lit — тёплый, dim — в тени, rim — тёплый ободок.
  function tunic(hem) {
    const b = 19 - .07 * hem, y0 = -hem;
    return `M-15 -58 C-15 -67 -9 -71 0 -71 C9 -71 15 -67 15 -58 L${f(b)} ${f(y0 - 5)} C${f(b)} ${f(y0 - 2)} ${f(b - 2)} ${f(y0)} ${f(b - 5)} ${f(y0)} ` +
      `L${f(5 - b)} ${f(y0)} C${f(2 - b)} ${f(y0)} ${f(-b)} ${f(y0 - 2)} ${f(-b)} ${f(y0 - 5)} Z`;
  }
  function fig(x, gy, h, st, t) {
    if (st.op <= .003 || h <= .5) return '';
    const s = h / 95.5, C = PAL[st.ci], fill = `url(#gfc-p${st.ci})`;
    const wk = clamp(st.wk || 0), dir = st.dir || 1, ph = st.ph + t * 7, sw = Math.sin(ph) * wk, cw = Math.cos(ph) * wk;
    const lift = 1.8 * (1 - Math.abs(Math.sin(ph))) * wk, hem = 16 * wk;
    const arm = (Hd, side) => {
      const S = [side * 12.5, -61], m = [(S[0] + Hd[0]) / 2 + side * 2.5, (S[1] + Hd[1]) / 2 + 2];
      return `M${f(S[0])} ${f(S[1])} Q${f(m[0])} ${f(m[1])} ${f(Hd[0])} ${f(Hd[1])}`;
    };
    const armD = arm(st.L, -1) + ' ' + arm(st.R, 1), bodyD = tunic(hem), head = '<circle cx="0" cy="-84" r="11.5"';
    const arms = col => `<path d="${armD}" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>`;
    const shape = (fl, ac) => (st.front ? '' : arms(ac)) + `<path d="${bodyD}" fill="${fl}"/>${head} fill="${fl}"/>` + (st.front ? arms(ac) : '');
    let legs = '';
    if (wk > .01) {
      const hipY = -hem - 3;
      let d = '';
      [1, -1].forEach(side => {
        const fx = side * 4.5 + side * 11 * sw * dir, ly = 4 * Math.max(0, side * cw), fy = -4.2 - ly + lift;
        d += `M${f(side * 5)} ${f(hipY)} Q${f((side * 5 + fx) / 2 + dir * 2.5 * ly)} ${f((hipY + fy) / 2)} ${f(fx)} ${f(fy)} `;
      });
      legs = `<path d="${d}" fill="none" stroke="${C[1]}" stroke-width="8.5" stroke-linecap="round"/>`;
    }
    let b = legs + shape(fill, C[1]);
    if (st.lit > .003) b += `<g opacity="${f(.26 * Math.min(1.6, st.lit))}">${shape('#ffb46a', '#ffb46a')}</g>`;
    if (st.dim > .003) b += `<g opacity="${f(.5 * st.dim)}">${shape(INK, INK)}</g>`;
    if (st.rim) {
      const sd = Math.sign(st.rim), ro = f(.55 * Math.min(1, Math.abs(st.rim)));
      b += `<path d="M${15 * sd} -58 L${f((19 - .07 * hem) * sd)} ${f(-hem - 6)}" fill="none" stroke="#ffc27a" stroke-width="3" stroke-linecap="round" opacity="${ro}"/>` +
        `<path d="M${f(4 * sd)} -95 A11.5 11.5 0 0 ${sd > 0 ? 1 : 0} ${f(11 * sd)} -80" fill="none" stroke="#ffc27a" stroke-width="2.6" stroke-linecap="round" opacity="${ro}"/>`;
    }
    b += '<ellipse cx="-4.4" cy="-88.8" rx="3.45" ry="2.3" fill="#fff" opacity=".22"/>';
    const sh = `<ellipse cx="${f(x)}" cy="${f(gy + .4)}" rx="${f(h * .27)}" ry="${f(h * .06)}" fill="url(#gfc-shadow)"/>`;
    return `<g opacity="${f(st.op)}">${sh}<g transform="translate(${f(x)} ${f(gy - lift * s)}) rotate(${f(4 * wk * dir)}) scale(${s.toFixed(4)})">${b}</g></g>`;
  }
  const headOf = (st) => [st.sx, st.sgy - .88 * st.sh];               // центр головы на экране

  /* ---------------- люди: где кто и в какой позе ---------------- */
  function crowd(t, c, cam, cv, wash) {
    const ent = qq(t, c.a - .05, c.a + .8);
    const join = qq(t, c.cel - .1, c.plem + .45), jw = clamp(Math.sin(Math.PI * join) * 3);
    const argue = qq(t, c.spor - .1, c.spor + .35) * (1 - qq(t, c.ver - .1, c.ver + .4));
    const pray = qq(t, c.ver - .05, c.ver + .55) * (1 - qq(t, c.chto - .1, c.esli + .35));
    const lead = qq(t, c.vozh - .1, c.vozh + .4);
    const point = qq(t, c.nuzh - .15, c.nuzh + .3) * (1 - qq(t, c.togda, c.togda + .6));
    const reachA = qq(t, c.prost - .05, c.prost + .4) * (1 - qq(t, c.spor - .25, c.spor + .25));
    const cross = qq(t, c.net - .05, c.net + .35) * (1 - qq(t, c.spor - .25, c.spor + .25));
    const boost = pulse(t, c.lyudi - .05, .15, .9);
    const warmFire = .25 * ent;
    return PPL.map((p, i) => {
      let x = p.x, gy = p.gy, h = p.h, op = 1, dim = 0, wk = 0, dir = 1;
      if (p.ab) {
        const back = p.ab > 0 ? 3 * qq(t, c.net, c.net + .4) : 0, x0 = (p.ab < 0 ? AX : BX) + back;
        x = lerp(x0, p.x, join); gy = lerp(ABY, p.gy, join); h = lerp(ABH, p.h, join);
        wk = jw; dir = Math.sign(p.x - x0) || 1;
        dim = (p.ab < 0 ? 1 - qq(t, c.one - .1, c.one + .25) : (1 - qq(t, c.drug - .1, c.drug + .25)) + .3 * qq(t, c.net, c.net + .4)) * (1 - join);
      } else if (!p.ring) op = ent;
      else {
        op = qq(t, c.cel - .1, c.cel + .45);
        x = lerp(p.x0, p.x, join); gy = lerp(p.gy0, p.gy, join); wk = jw; dir = Math.sign(p.x - p.x0) || 1;
      }
      if (p.leader) { x += p.sc * 7 * lead; h *= 1 + .22 * lead; }
      // руки: вниз → кулак к соседям (спор) → обе к небу (вера) → вождь показывает на огонь; A протягивает ладонь, B скрещивает
      const v = p.armv;
      let L = [-(20 + 3 * v), -27], R = [20 + 3 * v, -27];
      if (p.ab < 0) R = mix(R, [41, -58], reachA);
      if (p.ab > 0) { L = mix(L, [11, -45], cross); R = mix(R, [-11, -52], cross); }
      if (argue > .003) {
        const T = [p.sc * 25, -99 + 7 * Math.sin(t * 11 + p.ph)];
        if (p.sc > 0) R = mix(R, T, argue); else L = mix(L, T, argue);
      }
      if (pray > .003) { const wv = 3 * Math.sin(t * 2.2 + p.ph); L = mix(L, [-27 - wv, -97], pray); R = mix(R, [27 + wv, -97], pray); }
      const S = proj(cam, x, gy), sh = h * cam.z;
      if (p.leader && point > .003) {
        const k = sh / 95.5, sx = S[0] + p.sc * 12.5 * k, sy = S[1] - 61 * k, dx = cv.x - sx, dy = cv.y - sy, d = Math.hypot(dx, dy) || 1;
        const T = [p.sc * 12.5 + dx / d * 37, -61 + dy / d * 37];
        if (p.sc > 0) R = mix(R, T, point); else L = mix(L, T, point);
      }
      const shake = argue * .5 * Math.sin(t * 13 + p.ph);
      return { i, x, gy, h, op, sx: S[0] + shake * cam.z, sgy: S[1], sh, ci: p.ci, L, R, front: p.ab > 0 && cross > .05, wk, dir, ph: p.ph,
        dim, lit: (p.ab ? 0 : warmFire) + .7 * wash + .6 * boost, rim: p.ab ? 0 : p.rim * ent };
    });
  }

  /* ---------------- рисунки ---------------- */
  let DEF = '', GID = 0;   // градиенты нитей текущего кадра (тело сцены синхронное)
  const grad = (a, b, c0, c1) => {
    const id = `gfctr-g${GID++}`;
    DEF += `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1]) + .01}"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>`;
    return `url(#${id})`;
  };
  const DEFS = '<linearGradient id="gfctr-flO" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff7a3d"/><stop offset="1" stop-color="#ffa23d"/></linearGradient>' +
    '<linearGradient id="gfctr-flM" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb03d"/><stop offset="1" stop-color="#ffd85a"/></linearGradient>';
  const line = (a, b, op, w = 1.3, col = '#fff', extra = '') => op <= .003 ? '' :
    `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${col}" stroke-width="${f(w)}" opacity="${f(op)}" stroke-linecap="round"${extra}/>`;
  const glowDot = (p, r, op, col = GOLD) => op <= .003 ? '' :
    `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r * 2.6)}" fill="${col}" opacity="${f(op * .35)}" filter="url(#gfc-soft)"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="${col}" opacity="${f(op)}"/>`;
  const halo = (p, r, op) => op <= .003 ? '' : `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="url(#gfc-halo)" opacity="${f(Math.min(1, op))}"/>`;

  // костёр (как в образце): камни, два полена крест-накрест, три языка пламени, искры, ореол
  function campfire(cam, tr, t, op, flare) {
    if (op <= .003) return '';
    const p = proj(cam, tr.x, tr.y), sc = tr.fs * cam.z;
    if (p[0] < -80 || p[0] > 440 || p[1] < -80 || p[1] > 700) return '';
    const n = GFC.noise, fl = k => (1 + .15 * n(t * 8 + k * 3 + tr.x) + .06 * n(t * 21 + k)) * (1 + .3 * flare);
    const flame = (w, h, k, fill) => {
      const hh = h * fl(k), sw = 2.4 * n(t * 5 + k * 7 + tr.y);
      return `<path d="M${f(-w)} 0 C${f(-w)} ${f(-hh * .45)} ${f(-w * .25 + sw)} ${f(-hh * .7)} ${f(sw)} ${f(-hh)} C${f(w * .25 + sw)} ${f(-hh * .7)} ${f(w)} ${f(-hh * .45)} ${f(w)} 0 C${f(w)} ${f(w * .55)} ${f(-w)} ${f(w * .55)} ${f(-w)} 0 Z" fill="${fill}"/>`;
    };
    let s = halo([p[0], p[1] - 10 * sc], 70 * sc * (1 + .25 * flare), .9);
    s += `<g transform="translate(${f(p[0])} ${f(p[1])}) scale(${f(sc)})">`;
    for (let i = 0; i < 9; i++) { const a = Math.PI * (.05 + .9 * i / 8); s += `<ellipse cx="${f(21 * Math.cos(a))}" cy="${f(2 + 5 * Math.sin(a))}" rx="4.2" ry="3" fill="#6d5aa8"/>`; }
    s += '<g transform="rotate(13)"><rect x="-17" y="-3.2" width="34" height="6.4" rx="3.2" fill="#7b3f2c"/></g>' +
      '<g transform="rotate(-13)"><rect x="-17" y="-3.2" width="34" height="6.4" rx="3.2" fill="#5e2e22"/></g>';
    s += `<g transform="translate(0 -4)"><g filter="url(#gfc-soft)" opacity=".7">${flame(13, 32, 1, '#ff9a3d')}</g>${flame(12, 30, 1, 'url(#gfctr-flO)')}` +
      `${flame(8, 22, 2, 'url(#gfctr-flM)')}${flame(4.5, 13, 3, '#fff1a8')}</g>`;
    for (let i = 0; i < 9; i++) {
      const u = ((t * .7 + H(i * 3.1 + tr.x)) % 1 + 1) % 1, a = clamp(u / .12) * (1 - u);
      if (a > .01) s += `<circle cx="${f(11 * n(i * 5 + t * 1.3 + tr.x))}" cy="${f(-20 - u * (46 + 20 * flare))}" r="${f(1.6 * (1 - u) + .4)}" fill="${SUNC}" opacity="${f(a)}"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g></g>`;
  }
  // частокол цвета племени: колья по эллипсу и две жерди; half −1 — задняя половина (за людьми), +1 — передняя
  function fence(cam, tr, rise, half) {
    if (rise <= .003) return '';
    const ph = (tr.far ? 11 : 14) * rise, N = 30, C = PAL[tr.col], z = cam.z;
    let s = '';
    const rails = () => {
      let r = '';
      for (const hh of [.4, .82]) {
        const c0 = proj(cam, tr.x, tr.y - ph * hh), rx = tr.fr * z, ry = tr.fry * z;
        r += `<path d="M${f(c0[0] - rx)} ${f(c0[1])} A${f(rx)} ${f(ry)} 0 0 ${half < 0 ? 1 : 0} ${f(c0[0] + rx)} ${f(c0[1])}" fill="none" stroke="${C[0]}" stroke-width="${f(1.6 * z)}" opacity=".85"/>`;
      }
      return r;
    };
    if (half < 0) s += rails();
    for (let k = 0; k < N; k++) {
      const a = k / N * PI2, sn = Math.sin(a);
      if ((half > 0) !== (sn > .001)) continue;
      const bx = tr.x + tr.fr * Math.cos(a), by = tr.y + tr.fry * sn, hh = ph * (.85 + .3 * H(k + tr.x));
      const P0 = proj(cam, bx, by), P1 = proj(cam, bx, by - hh);
      s += line(P0, P1, 1, 3 * z, C[1]) + `<circle cx="${f(P1[0])}" cy="${f(P1[1])}" r="${f(1.6 * z)}" fill="${C[0]}"/>`;
    }
    if (half > 0) s += rails();
    return `<g opacity="${f(half > 0 ? .95 : .9)}">${s}</g>`;
  }
  // зигзаг-искра спора от a к b (каждая вспышка — своя форма), в середине — вспышка
  function zig(a, b, seed, op) {
    if (op <= .003) return '';
    const n = 8, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const P = [];
    for (let i = 0; i <= n; i++) { const u = i / n, o = i === 0 || i === n ? 0 : (H(seed * 13 + i) - .5) * 22; P.push([a[0] + dx * u + nx * o, a[1] + dy * u + ny * o]); }
    const d = 'M' + P.map(p => f(p[0]) + ' ' + f(p[1])).join(' L');
    return `<g opacity="${f(op)}"><path d="${d}" fill="none" stroke="#ff9a3d" stroke-width="8" opacity=".45" filter="url(#gfc-soft)"/>` +
      `<path d="${d}" fill="none" stroke="${ORANGE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<path d="${d}" fill="none" stroke="#fff6d0" stroke-width="1.1" stroke-linejoin="round"/></g>` + glowDot(mix(a, b, .5), 4.4, op, SUNC);
  }
  // плита: арка сверху, заливка цвета, светотень, белая обводка, блик, полоски; k — появление (0→1), hot — вспышка
  function tablet(cx, cy, w, h, ci, k, op, hot, kind) {
    if (op <= .003 || k <= .003) return '';
    const x0 = -w / 2, x1 = w / 2, y0 = -h / 2, y1 = h / 2, r = w / 2, u = w / 22;
    const d = `M${f(x0)} ${f(y1)} L${f(x0)} ${f(y0 + r * .55)} Q${f(x0)} ${f(y0)} 0 ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r * .55)} L${f(x1)} ${f(y1)} Z`;
    let s = `<path d="${d}" transform="translate(${f(w * .06)} ${f(h * .09)})" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>`;
    s += `<path d="${d}" fill="url(#gfc-p${ci})"/><path d="${d}" fill="url(#gfc-shade)"/>`;
    if (hot > .003) s += `<path d="${d}" fill="#fff6d8" opacity="${f(.4 * hot)}"/>`;
    s += `<path d="${d}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="${f(Math.max(.9, 1.1 * u))}" stroke-linejoin="round"/>`;
    s += `<path d="M${f(x0 + 3 * u)} ${f(y0 + r * .5)} Q${f(x0 + 3.4 * u)} ${f(y0 + 3 * u)} ${f(-2 * u)} ${f(y0 + 2.6 * u)}" fill="none" stroke="#fff" stroke-width="${f(1.2 * u)}" stroke-linecap="round" opacity=".5"/>`;
    if (kind != null) {
      let g = '';
      const L = (a, y, b2) => `<line x1="${f(a * u)}" y1="${f(y * u)}" x2="${f(b2 * u)}" y2="${f(y * u)}"/>`;
      if (kind === 0) [[-6, -2, 6], [-6, 3, 4], [-6, 8, 6]].forEach(([a, y, b2]) => { g += L(a, y, b2); });
      if (kind === 1) for (const y of [-2, 3, 8]) for (const x of [-4.5, 0, 4.5]) g += `<circle cx="${f(x * u)}" cy="${f(y * u)}" r="${f(1.4 * u)}" fill="#fff" stroke="none"/>`;
      if (kind === 2) for (const y of [-3, 5]) for (const x of [-4.5, -1.5, 1.5, 4.5]) g += `<line x1="${f(x * u)}" y1="${f((y - 2.6) * u)}" x2="${f(x * u)}" y2="${f((y + 2.6) * u)}"/>`;
      if (kind === 3) for (const y of [-2, 3, 8]) g += `<path d="M${f(-6 * u)} ${f(y * u)} L${f(-3 * u)} ${f((y - 2) * u)} L0 ${f(y * u)} L${f(3 * u)} ${f((y - 2) * u)} L${f(6 * u)} ${f(y * u)}" fill="none"/>`;
      s += `<g stroke="#fff" stroke-width="${f(1.6 * u)}" stroke-linecap="round" stroke-linejoin="round" opacity=".92">${g}</g>`;
    }
    const kk = k * (1 + .22 * Math.sin(Math.PI * k));
    return `<g opacity="${f(op * clamp(k * 2))}" transform="translate(${f(cx)} ${f(cy)}) scale(${kk.toFixed(4)})">${s}</g>`;
  }
  // огонь пунктиром — образ: тёплый ореол, розово-фиолетовый свет внутри, золотой пунктир крутится; flick — мерцание
  function contour(x, y, r, op, bright, t, flick) {
    if (op <= .003) return '';
    const k = r / CR0, fl = 1 - flick * .55 * (.5 + .5 * Math.sin(t * 17)), dash = `stroke-dasharray="${f(7 * k)} ${f(5 * k)}" stroke-dashoffset="${f(-t * 6 * k)}"`;
    return `<g opacity="${f(op)}">${halo([x, y], r * 2.5, (.32 + .4 * bright) * fl)}
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 1.05)}" fill="url(#gfc-glowP)" opacity="${f(.95 * fl)}"/>
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#2a1460" opacity=".35"/>
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#ff9a3d" stroke-width="${f((6 + 3 * bright) * Math.sqrt(k))}" ${dash} opacity="${f((.4 + .35 * bright) * fl)}" filter="url(#gfc-soft)"/>
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${GOLD}" stroke-width="${f(2.7 * Math.sqrt(k))}" stroke-linecap="round" ${dash} opacity="${f((.85 + .15 * bright) * fl)}"/></g>`;
  }
  // весы в контуре: стойка, коромысло (качается на swing), две чаши; q — прорисовка; золото
  function scales(x, y, s, q, swing, op) {
    if (op <= .003 || q <= .003) return '';
    const by = y - 9 * s, ex = 15 * s * Math.cos(swing), ey = 15 * s * Math.sin(swing);
    const E = [[x - ex, by - ey], [x + ex, by + ey]];
    const dash = `pathLength="1" stroke-dasharray="${f(q)} 2"`;
    let d = `M${f(x)} ${f(y + 13 * s)} L${f(x)} ${f(y - 13 * s)} M${f(x - 7 * s)} ${f(y + 13 * s)} L${f(x + 7 * s)} ${f(y + 13 * s)} M${f(E[0][0])} ${f(E[0][1])} L${f(E[1][0])} ${f(E[1][1])}`;
    let bowls = '';
    for (const e of E) {
      const py = e[1] + 10 * s;
      d += ` M${f(e[0])} ${f(e[1])} L${f(e[0] - 5 * s)} ${f(py)} M${f(e[0])} ${f(e[1])} L${f(e[0] + 5 * s)} ${f(py)}`;
      bowls += `<path d="M${f(e[0] - 6.5 * s)} ${f(py)} Q${f(e[0])} ${f(py + 7 * s)} ${f(e[0] + 6.5 * s)} ${f(py)} Z" fill="${GOLD}" opacity="${f(q)}"/>`;
    }
    return `<g opacity="${f(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="#ff9a3d" stroke-width="${f(4 + 1.5 * s)}" opacity=".45" filter="url(#gfc-soft)" ${dash}/>` +
      `<path d="${d}" stroke="${GOLD}" stroke-width="${f(1.6 + .5 * s)}" ${dash}/>${bowls}${glowDot([x, y - 14 * s], 2 * Math.sqrt(s), q, '#fff6d0')}</g>`;
  }
  const bez = (a, b, cc, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * cc[0] + u * u * b[0], v * v * a[1] + 2 * v * u * cc[1] + u * u * b[1]]; };
  const toEdge = (cv, p) => { const dx = p[0] - cv.x, dy = p[1] - cv.y, d = Math.hypot(dx, dy) || 1; return [cv.x + dx / d * cv.r, cv.y + dy / d * cv.r]; };
  const pop = k => k * (1 + .25 * Math.sin(Math.PI * k));

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    DEF = ''; GID = 0;
    const c = cues(K), cam = camera(t, c), Z = cam.z;
    const gq = qq(t, c.voobr - .1, c.voobr + .6);
    const cv = { x: lerp(FX, GX, gq), y: lerp(FY, GY, gq), r: lerp(CR0, GR, gq) };
    const ent = qq(t, c.a - .05, c.a + .8);
    const wash = qq(t, c.lyud - .05, c.lyud + .4) * (1 - .55 * qq(t, c.sam, c.bog9 + .4)) * (1 - qq(t, c.chto, c.esli + .5));
    const ST = crowd(t, c, cam, cv, wash);
    let s = '';

    // холмы и горизонт: при наезде горизонт за ногами двоих, с отъездом поднимается к y 172
    s += GFC.ground({ y: lerp(262, HY, cam.u), warm: .3 * ent + .25 * wash, glow: 1, seed: 2 });
    // площадки под племенами
    TRIBES.forEach(tr => {
      const p = proj(cam, tr.x, tr.y);
      if (ent > .003) s += GFC.ground(p[0], p[1] + 2 * Z, tr.fr * 1.12 * Z, tr.fry * 1.35 * Z, { op: ent, warm: .55 + .4 * wash });
    });

    // свет «закон людям дал»: золотой луч сверху до середины, на «людям» — кольцо света к четырём племенам
    const bm = qq(t, c.zak9 - .1, c.zak9 + .45), bOff = qq(t, c.bog9 + .05, c.bog9 + .6);
    if (bm > .003 && bOff < .997) {
      const yb = lerp(lerp(-10, BEAMY, bm), FY, qq(t, c.sam - .05, c.bog9 + .35)), op = 1 - bOff;
      s += `<g opacity="${f(op)}"><line x1="${FX}" y1="-10" x2="${FX}" y2="${f(yb)}" stroke="#ff9a3d" stroke-width="16" opacity=".3" filter="url(#gfc-soft)"/>` +
        `<line x1="${FX}" y1="-10" x2="${FX}" y2="${f(yb)}" stroke="${GOLD}" stroke-width="4" opacity=".9"/>` +
        `<line x1="${FX}" y1="-10" x2="${FX}" y2="${f(yb)}" stroke="#fff6d0" stroke-width="1.4"/></g>` + glowDot([FX, yb], 4.2, op * (1 - qq(t, c.sam, c.bog9)), '#fff6d0');
      const sp = qq(t, c.lyud - .05, c.lyud + .7);
      if (sp > 0 && sp < 1) s += `<ellipse cx="${FX}" cy="${BEAMY}" rx="${f(10 + 175 * sp)}" ry="${f(4 + 80 * sp)}" fill="none" stroke="#ff9a3d" stroke-width="8" opacity="${f(.35 * (1 - sp))}" filter="url(#gfc-soft)"/>` +
        `<ellipse cx="${FX}" cy="${BEAMY}" rx="${f(10 + 175 * sp)}" ry="${f(4 + 80 * sp)}" fill="none" stroke="${GOLD}" stroke-width="2.2" opacity="${f(.9 * (1 - sp))}"/>`;
    }
    if (wash > .003) TRIBES.forEach(tr => { s += halo(proj(cam, tr.x, tr.y - tr.h * .55), 70 * Z, .6 * wash); });

    // частоколы: встают сразу за «закон» (d08), опускаются на «всех племён» (d09)
    const rise = qq(t, c.zak + .1, c.zak + .6) * (1 - qq(t, c.vseh - .1, c.plem9 + .35));
    const riseOf = i => rise * qq(t, c.zak + .1 + i * .06, c.zak + .5 + i * .06);
    TRIBES.forEach((tr, i) => { s += fence(cam, tr, riseOf(i), -1); });

    // люди и костры по глубине (дальние первыми); двое крупно — тоже в этом ряду (они ближе всех)
    const flare = .8 * pulse(t, c.plem - .05, .15, .8) + .6 * pulse(t, c.lyud + .2, .15, .9);
    const items = [];
    ST.forEach(st => items.push([st.gy, fig(st.sx, st.sgy, st.sh, st, t)]));
    TRIBES.forEach(tr => items.push([tr.y + .5, campfire(cam, tr, t, ent, flare)]));
    items.sort((a, b) => a[0] - b[0]).forEach(it => { s += it[1]; });
    TRIBES.forEach((tr, i) => { s += fence(cam, tr, riseOf(i), 1); });

    // искры спора
    for (const [t0, k, m] of c.fl) {
      const op = pulse(t, t0, .05, .38) * m;
      if (op > .003) s += zig(proj(cam, ...ZIG[k][0]), proj(cam, ...ZIG[k][1]), Math.round(t0 * 10) + k, Math.min(1, op));
    }
    // «рассудит»: искры с частоколов летят к середине и вверх
    const burst = qq(t, c.rass, c.rass + .8);
    if (burst > 0 && burst < 1) {
      const P = [], A = [];
      TRIBES.forEach((tr, ti) => {
        for (let k = 0; k < 10; k++) {
          const a = Math.atan2(220 - tr.y, 180 - tr.x) + (H(ti * 19 + k) - .5) * 1.6, v = 40 + 50 * H(ti * 7 + k * 3);
          const o = [tr.x + tr.fr * .8 * Math.cos(a), tr.y + tr.fry * Math.sin(a) - 8];
          P.push(proj(cam, o[0] + Math.cos(a) * v * burst, o[1] + Math.sin(a) * v * burst * .7 + 30 * burst * burst));
          A.push(Math.sin(Math.PI * burst));
        }
      });
      s += GFC.dots(P, { r: 2.2, op: 1, glow: 1, t, color: [SUNC, ORANGE, '#fff1a8'], alpha: i => A[i] });
    }

    // нити от каждого к контуру («для всех племён»): от цвета человека к золоту; тише на «один закон», уходят на «Тогда»
    const thA = .8 * (1 - .4 * qq(t, c.odin2, c.zak2 + .3)) * (1 - qq(t, c.togda - .1, c.togda + .5));
    if (t > c.vseh - .2 && thA > .003) ST.forEach((st, i) => {
      const d = H(i * 5 + 3) * .45, g = qq(t, c.vseh - .1 + d, c.vseh + .25 + d);
      if (g <= .003) return;
      const hd = headOf(st), e = toEdge(cv, hd), tip = mix(hd, e, g);
      s += line(hd, tip, thA * st.op, 1.5, grad(hd, e, PAL[st.ci][0], GOLD));
    });
    // вожди «нужен был»: золотой пунктир от руки вождя к контуру
    const lt = qq(t, c.nuzh, c.odin) * (1 - qq(t, c.vseh, c.plem9 + .3));
    if (lt > .003) ST.forEach((st, i) => {
      if (!PPL[i].leader) return;
      const hand = PPL[i].sc > 0 ? st.R : st.L, k = st.sh / 95.5, hp = [st.sx + hand[0] * k, st.sgy + hand[1] * k], e = toEdge(cv, hp);
      s += `<line x1="${f(hp[0])}" y1="${f(hp[1])}" x2="${f(lerp(hp[0], e[0], lt))}" y2="${f(lerp(hp[1], e[1], lt))}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="4 3.5" stroke-linecap="round" opacity=".95"/>`;
    });
    // «видит каждого»: золотые лучи от контура к каждой голове (слева направо), голова загорается
    const rayOff = qq(t, c.togda - .1, c.togda + .5);
    const order = ST.map((st, i) => [i, Math.atan2(headOf(st)[1] - cv.y, headOf(st)[0] - cv.x)]).sort((a, b) => b[1] - a[1]);
    if (t > c.vid - .15 && rayOff < .997) order.forEach(([i], n) => {
      const st = ST[i], d = n / order.length * .55, g = qq(t, c.vid - .1 + d, c.vid + .2 + d);
      if (g <= .003) return;
      const hd = headOf(st), e = toEdge(cv, hd), tip = mix(e, hd, g);
      s += line(e, tip, .85 * (1 - rayOff), 1.4, GOLD) + glowDot(tip, 1.9, (g < 1 ? 1 : 0) * (1 - rayOff), '#fff6d0');
      s += glowDot(hd, 3.4 * st.sh / 46, qq(g, .9, 1) * (1 - .75 * rayOff) * .8, GOLD);
    });
    // «сначала Его вообразили»: от голов вверх к контуру бегут точки-мысли цвета человека (половина людей)
    const thought = qq(t, c.snach - .1, c.voobr + .9);
    if (thought > .003) ST.forEach((st, i) => {
      if (i % 2 && i !== IA && i !== IB) return;
      const d = H(i * 3 + 7) * .4, u = qq(t, c.snach - .1 + d, c.voobr + .25 + d);
      if (u <= .003) return;
      const hd = headOf(st), e = toEdge(cv, hd), cc = [lerp(hd[0], e[0], .3) + (H(i) - .5) * 30, Math.min(hd[1], e[1]) - 6];
      const P = [], A = [];
      for (let k = 1; k <= 10; k++) { const v = k / 11; if (v <= u) { P.push(bez(hd, e, cc, v)); A.push(.7); } }
      if (u < 1) { P.push(bez(hd, e, cc, u)); A.push(1.5); }
      s += GFC.dots(P, { r: 1.7, op: st.op * (1 - .35 * qq(t, c.voobr + .6, c.voobr + 1)), glow: .8, t, color: PAL[st.ci][0], size: k => k === P.length - 1 && u < 1 ? 1.4 : 1, alpha: k => A[k] });
    });

    // двое крупно: свет и сердце в ладони A, нить к B (золото → розовый) — на «нет» рвётся искрами
    const near = 1 - qq(t, c.a - .1, c.a + .35);
    if (near > .003) {
      const sA = ST[IA], sB = ST[IB], kA = sA.sh / 95.5, kB = sB.sh / 95.5;
      const palm = [sA.sx + (sA.R[0] + 3) * kA, sA.sgy + (sA.R[1] - 1) * kA];
      const tgt = [sB.sx - 9 * kB, sB.sgy - 56 * kB];
      const pl = qq(t, c.prost, c.prost + .35) * (1 - .6 * qq(t, c.net + .1, c.net + .5)) * near;
      s += halo(palm, 46, 1.2 * pl) + glowDot(palm, 4.5, pl, '#fff6d0');
      const hk = qq(t, c.prost + .05, c.prost + .4);
      if (hk > .003) s += GFC.node(palm[0] - 2, palm[1] - 30 - 4 * Math.sin(t * 2.4), 15, 'heart',
        { color: 'pink', scale: pop(hk) * (1 - .35 * qq(t, c.net + .1, c.net + .5)), op: near * (1 - .55 * qq(t, c.net + .1, c.net + .5)) });
      const g = qq(t, c.prost + .1, c.prost + .65), cut = qq(t, c.net + .05, c.net + .2), back = qq(t, c.net + .15, c.net + .7);
      if (g > .003) {
        const tip = mix(palm, tgt, .9 * g), end = mix(palm, tip, 1 - back), gr = grad(palm, tgt, GOLD, '#ffa6d6');
        s += line(palm, end, .45 * near, 9, '#ffb46a', ' filter="url(#gfc-soft)"') + line(palm, end, near, 3.2, gr);
        if (cut < .003) s += glowDot(tip, 3.2, near, '#fff6d0');
        else {
          const fall = qq(t, c.net + .05, c.net + .85), P = [];
          for (let k = 0; k < 14; k++) { const u = .5 + .5 * k / 13, q0 = mix(palm, tip, u); P.push([q0[0] + (H(k * 7) - .5) * 44 * fall, q0[1] + 150 * fall * fall * (.6 + .4 * H(k * 3))]); }
          s += GFC.dots(P, { r: 2.4, op: near * (1 - fall), glow: 1, t, color: [GOLD, '#ffa6d6', '#fff1a8'] });
          s += glowDot(tip, 7 * (1 - fall), pulse(t, c.net + .05, .05, .4) * near, '#fff6d0');
        }
      }
    }

    // вожди: посох и венец из трёх огоньков; золотое кольцо под ногами вспыхивает на «вождям»
    const lead = qq(t, c.vozh - .1, c.vozh + .4);
    if (lead > .003) ST.forEach((st, i) => {
      if (!PPL[i].leader) return;
      const sd = -PPL[i].sc, k = st.sh / 95.5, b = [st.sx + sd * 27 * k, st.sgy], top = [st.sx + sd * 27 * k, st.sgy - 112 * k * lead];
      s = halo([st.sx, st.sgy - .55 * st.sh], 40, .8 * lead) + s;
      s += line(b, top, .95, 2.6, '#c98a4a') + glowDot(top, 2.4, lead, GOLD);
      for (const dx of [-6, 0, 6]) s += glowDot([st.sx + dx * k, st.sgy - (100 + (dx ? 0 : 5)) * k], 2.1, lead, GOLD);
      const ring = pulse(t, c.vozh, .15, .9), gg = qq(t, c.vozh, c.vozh + 1);
      if (ring > .003) s += `<ellipse cx="${f(st.sx)}" cy="${f(st.sgy + 1)}" rx="${f(12 + 12 * gg)}" ry="${f(4 + 3.5 * gg)}" fill="none" stroke="${GOLD}" stroke-width="2" opacity="${f(ring)}"/>`;
    });

    // знаки-боги — цветные значки: по очереди на «каждого … бог»; на «один Бог» тускнеют и чуть уменьшаются
    const dim = qq(t, c.odin + .05, c.bog2 + .45);
    const sT = [c.kazh, lerp(c.kazh, c.bog, 1 / 3), lerp(c.kazh, c.bog, 2 / 3), c.bog];
    TRIBES.forEach((tr, i) => {
      const k = qq(t, sT[i] - .05, sT[i] + .35);
      if (k <= .003) return;
      const p = proj(cam, tr.sx, tr.sy + 1.2 * Math.sin(t * 2 + i * 1.7));
      s += GFC.node(p[0], p[1], tr.sr * Z * (1 + .12 * pulse(t, sT[i] + .35, .1, .5)), ICON[tr.sign],
        { color: tr.col, scale: pop(k) * lerp(1, .82, dim), op: lerp(1, .35, dim), glow: 1 - .6 * dim });
    });
    // свои плиты: на «свой (2-е) … закон»; на «один закон» слетаются под огонь в одну
    const fly0 = c.odin2 - .1;
    TRIBES.forEach((tr, i) => {
      const t0 = lerp(c.svoi2, c.zak, i / 3), q = qq(t, t0 - .05, t0 + .35), fl = qq(t, fly0 + i * .06, c.zak2 + .05 + i * .06);
      if (q <= .003 || fl >= .999) return;
      const p0 = proj(cam, tr.tx, tr.sy), p = [lerp(p0[0], LTX, fl), lerp(p0[1], LTY, fl) - Math.sin(Math.PI * fl) * 24], sc = Z * lerp(1, .6, fl);
      s += tablet(p[0], p[1], 24 * sc, 31 * sc, tr.col, q, 1 - qq(fl, .8, 1), pulse(t, t0 + .3, .1, .6), tr.marks);
    });

    // один огонь: «Сам Бог» — золотое солнце (волна); «А что если» — пунктирный контур; «вообразили» — крупно
    const ign = qq(t, c.sam - .1, c.bog9 + .15), dz = qq(t, c.chto - .05, c.esli + .35);
    if (ign > .003) {
      s += GFC.spark(FX, FY, FR * (.4 + .6 * ign) * (1 + .3 * pulse(t, c.bog9, .12, .6)), { t, op: ign * (1 - dz) });
      const wv = qq(t, c.bog9, c.bog9 + 1.1);
      if (wv > 0 && wv < 1) s += `<circle cx="${FX}" cy="${FY}" r="${f(FR + 70 * wv)}" fill="none" stroke="${GOLD}" stroke-width="2.4" opacity="${f(.9 * (1 - wv))}"/>`;
    }
    if (dz > .003) {
      const bright = .6 * pulse(t, c.odin, .15, .9) + .5 * pulse(t, c.sud, .15, .9) + .5 * pulse(t, c.vid, .15, 1) + .4 * pulse(t, c.voobr, .2, 1.2) + .25 * gq;
      const flick = qq(t, c.mozh - .1, c.mozh + .2) * (1 - qq(t, c.lyudi, c.lyudi + .4));
      s += contour(cv.x, cv.y, cv.r * (1 + .05 * Math.sin(t * 2.3)), dz, bright, t, flick);
      for (const [a, m] of [[c.odin, 1], [c.voobr, 1.4]]) {
        const wv = qq(t, a, a + 1.1);
        if (wv > 0 && wv < 1) s += `<circle cx="${f(cv.x)}" cy="${f(cv.y)}" r="${f(cv.r + 60 * m * wv)}" fill="none" stroke="${GOLD}" stroke-width="2.4" opacity="${f(.85 * (1 - wv))}"/>`;
      }
      const sq = qq(t, c.sud - .1, c.sud + .45), sw = t > c.sud ? .4 * Math.exp(-(t - c.sud) * 2.2) * Math.sin((t - c.sud) * 7) : .4;
      s += scales(cv.x, cv.y + 2 * cv.r / CR0, cv.r / CR0 * .95, sq, sw, 1 - .35 * qq(t, c.mozh - .1, c.mozh + .3) * (1 - gq));
    }
    // плита ОДИН ЗАКОН — крупная золотая
    const bq = qq(t, c.odin2 + .1, c.zak2 + .3);
    const bop = (1 - .45 * qq(t, c.mozh - .1, c.mozh + .3)) * (1 - qq(t, c.voobr - .1, c.voobr + .35));
    if (bq > .003 && bop > .003) {
      const hot = pulse(t, c.zak2 + .25, .12, .8);
      s += `<g opacity="${f(bop)}">${halo([LTX, LTY], 70, .6 * bq + .5 * hot)}${tablet(LTX, LTY, LTW, LTH, 4, bq, 1, hot, null)}` +
        GFC.typed(LTX, LTY + 2, 'ОДИН', t, c.odin2 + .2, { size: 15, cps: 24, color: INK, shadow: 0, maxW: 62, ls: .04, op: 1 }) +
        GFC.typed(LTX, LTY + 20, 'ЗАКОН', t, c.zak2 + .05, { size: 15, cps: 24, color: INK, shadow: 0, maxW: 62, ls: .04, op: 1 }) + '</g>';
    }

    // крупный «?» — розовый значок; на «рассудит» вздрагивает
    const qa = qq(t, c.kto - .05, c.kto + .3) * (1 - qq(t, c.sk, c.zak9 + .1));
    if (qa > .003) {
      const sh = pulse(t, c.rass, .05, .5);
      s += GFC.node(QX + 4 * sh * Math.sin(t * 46), QY, QR * (1 + .12 * sh), 'question',
        { color: 'pink', scale: pop(qq(t, c.kto - .05, c.kto + .35)), op: qa });
    }

    // заголовки: мысль каждой фразы (главное слово золотом)
    s += GFC.headline('Простит / *не каждый*', t, Math.max(c.one + .15, c.s8 + .38), c.a + .05, HL);   // после наплыва: заголовок gfc_book уже ушёл
    s += GFC.headline('Древние / *племена*', t, c.drev - .05, c.kazh - .02, HL);
    s += GFC.headline('У каждого / *своя правда*', t, c.kazh + .02, c.kto - .02, HL);
    s += GFC.headline('Кто / *судья?*', t, c.kto, c.sk + .05, HL);
    s += GFC.headline('Закон / *свыше*', t, c.sk + .1, c.a9 + .1, HL);
    s += GFC.headline('Один Бог / *на всех*', t, c.vozh, c.odin2 - .05, HL);
    s += GFC.headline('*Всевидящий* / судья', t, c.sud - .1, c.togda - .02, HL);
    s += GFC.headline('Сначала / *вообразили?*', t, c.togda + .02, c.voobr - .05, HL);

    return `<defs>${DEFS}${DEF}</defs>${s}`;
  }

  SCENES.gfc_tribes = GFC.scene('gfc_tribes', (t, K, mode, p) => body(t, K || {}));
})();
