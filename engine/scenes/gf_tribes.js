/* gf_tribes — «Бог ещё не создан», часть 2 «От мести к милосердию» (eps/god_future_p2), фразы d08–d09: от двух людей
 * (один простит, другой — нет) к древним племенам, у каждого свой бог и свой закон, стены и спор («Кто их рассудит?»),
 * потом — один огонь над всеми: «закон дал Сам Бог» (вера) и «а что если…» (взгляд автора: один Бог, один закон, один
 * Судья — и люди сначала Его вообразили). Текст — eps/god_future/source/text_v21.md; раскадровка —
 * eps/god_future/source/storyboard_3parts.md (строки d08–d09); словарь — gf_00_lib.js (window.GF). Слова — build/words.json.
 * v1, 05.11. Стиль: чёрный фон, люди из точек без лиц, огонь порядка GF.spark, моно Plex. Красного нет (спор — не война:
 * искры спора тёплые белые). Знаки-боги племён — простые знаки из точек (солнце, луна, бык, гора), не религиозные символы
 * мировых религий; их не ломают — на «один Бог» они только тускнеют. Плашку ВЗГЛЯД АВТОРА ставит story.py (d09 «что»).
 * Уроки слепого просмотра v1–v2: всё крупно (сцена на телефоне ужата в .72), события на словах каждые 1,5–2,5 с,
 * надписи моно ≥ 14, линии ≥ 1,2.
 *
 * Мир (камера ×1): четыре племени 2×2 — у каждого костёр, вокруг 10 человек подковой (сзади и по бокам, спереди
 * открыто — костёр виден), над ним знак-бог (снаружи) и плита-закон (ближе к середине); дальний ряд — костры y 180,
 * рост 33; ближний — y 310, рост 41. Вождь племени — человек подковы, ближний к середине кадра. Один огонь — (180,52),
 * его пунктирный контур r 28; плита ОДИН ЗАКОН — (180,118), 76×56; крупный контур конца — (180,112), r 56, весы в нём
 * (стойка y 91..141, коромысло y 99) — поза, на которую рассчитан вход gf_build/images.
 * Своя камера: в начале d08 наезд ×5,5 на двоих (A — x 165, B — x 195, подошвы y 332) — они на всю высоту сцены; на «А»
 * (в древности) — отъезд к ×1 (подошвы двоих стоят внизу кадра, сверху открываются племена). Точки не растут с камерой.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (шва между режимами нет).
 *  tribes (d08) «Один простит, другой — нет. А в древности спорили целые племена, и у каждого свой бог и свой закон.
 *               Кто их рассудит?» Вход наплывом из gf_book/you (GF.scene). Двое крупно: «Один» — левый ярче; «простит» —
 *               он протягивает открытую ладонь, в ней тёплый свет, от неё к другому тянется тёплая нить; «другой» —
 *               правый ярче; «нет» — он скрещивает руки и отступает, нить рвётся с искрами. «А» — отъезд: двое внизу,
 *               вокруг ночь, звёзды, четыре костра, у каждого люди; «древности» — вверху ДРЕВНОСТЬ (моно 15);
 *               «спорили» — люди трясут кулаками в сторону соседей, между племенами бьют тёплые зигзаги-искры;
 *               «целые» — в каждое племя входят ещё люди, двое уходят каждый в своё; «каждого»/«свой»/«бог» — над
 *               племенами по очереди встают из точек знаки: СОЛНЦЕ, ЛУНА, БЫК, ГОРА (подписей нет — знаки); «свой» (2-е)
 *               и «закон» — рядом у каждого встаёт своя плита со своими значками; сразу за «закон» вокруг каждого
 *               племени поднимается частокол; «Кто» — вверху КТО ИХ РАССУДИТ? (моно 16), в середине крупный «?» (моно 76);
 *               «рассудит» — «?» вздрагивает, со всех частоколов летят искры.
 *  one (d09)    «Верующие скажут: закон людям дал Сам Бог. А что если вождям просто нужен был один Бог для всех
 *               племён — один закон и один Судья, который видит каждого? Тогда, может быть, люди сначала Его вообразили.»
 *               «Верующие» — все поднимают руки к небу, спор стихает; «скажут» — «?» гаснет; «закон» — сверху до середины
 *               между племенами опускается луч; «людям» — от его конца по всем племенам расходится кольцо света; «Сам Бог» —
 *               наверху загорается огонь порядка, волна, луч втягивается в него. «А (что если)» — руки опускаются, огонь
 *               становится пунктирным контуром (образ); «вождям» — вожди выходят вперёд, выше, с посохом и венцом из
 *               трёх огоньков; «нужен» — вожди показывают рукой на контур, к нему тянутся пунктиры; «один Бог» — контур
 *               вспыхивает волной, знаки племён тускнеют; «всех племён» — от каждого человека к контуру нить, частоколы
 *               опускаются; «один закон» — четыре плиты слетаются под огонь в одну крупную ОДИН / ЗАКОН; «Судья» — в контуре
 *               прорисовываются весы (качнутся и встанут ровно); «видит каждого» — от контура к каждой голове бежит тёплый
 *               луч, голова загорается; «Тогда» — лучи и нити гаснут; «может быть» — контур мерцает, плита тише;
 *               «люди» — люди вспыхивают; «сначала Его» — от голов вверх к контуру бегут пунктиры мысли; «вообразили» —
 *               контур с весами вырастает крупно ((180,112), r 56), волна, плита гаснет. Эта поза держится до конца кадра —
 *               из неё наплывает gf_build/images (крупный пунктирный контур-образ над людьми).
 * Слова-основы GF.w (сверены с build/words.json 05.11): d08 — один, прост, друг, нет, а, древн, спор, цел, плем, кажд,
 *   свой (0 и 1), бог, закон, кто, рассуд; d09 — верующ, скажут, закон (0 и 1), людям, сам, бог (0 и 1), что, если,
 *   вожд, нужен, один (0, 1), суд, видит, тогда, может, люди, сначала, вообраз. Нет слова — начало фразы + n·0,4 с.
 * Параметры p: s, mode, K, prev/prev_mode (наплыв — GF.scene). Важное — y≈18..345, низ — пусто под субтитры.
 * Пик ≈ 3 тыс. точек (40 человек × 57 + двое крупно по 620).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const { qq, lerp, clamp } = GF;
  const H = n => GF.hash(n);
  const PI2 = Math.PI * 2;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const mix = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
  const WARM = '#ffe6bd', CREAM = '#fff6e0';
  const A0 = 180, A1 = 200;                         // якорь камеры: точка мира (cx,cy) стоит здесь
  const ZC = 5.5;                                   // наезд на двоих в начале d08
  const AX = 165, BX = 195, ABY = 332, ABH = 41;    // двое: x, подошвы, рост
  const FX = 180, FY = 52, FR = 12, CR0 = 28;       // один огонь; его пунктирный контур
  const GX = 180, GY = 112, GR = 56;                // «вообразили»: крупный контур (шов с gf_build: 180,112, r 56; весы — y 116)
  const LTX = 180, LTY = 118, LTW = 76, LTH = 56;   // плита ОДИН ЗАКОН
  const BEAMY = 245;                                // луч «закон людям дал» — до середины между племенами

  /* ---------------- мир: племена и люди (константы, считаются при загрузке) ---------------- */
  // sc — сторона к середине кадра (+1 — середина справа); sign — знак-бог; marks — значки своей плиты
  const TRIBES = [
    { x: 92, y: 180, h: 33, rx: 32, ry: 9, fr: 58, fry: 18, sc: 1, sign: 'sun', marks: 0 },
    { x: 268, y: 180, h: 33, rx: 32, ry: 9, fr: 58, fry: 18, sc: -1, sign: 'moon', marks: 1 },
    { x: 92, y: 310, h: 41, rx: 38, ry: 11, fr: 68, fry: 24, sc: 1, sign: 'beast', marks: 2 },
    { x: 268, y: 310, h: 41, rx: 38, ry: 11, fr: 68, fry: 24, sc: -1, sign: 'mount', marks: 3 },
  ].map(tr => Object.freeze({ ...tr, far: tr.y < 200, sx: tr.x - 14 * tr.sc, sy: tr.y - (tr.y < 200 ? 68 : 80),
    tx: tr.x + 26 * tr.sc, ss: tr.y < 200 ? 1.05 : 1.15 }));

  const PPL = (() => {
    const A = [];
    TRIBES.forEach((tr, ti) => {
      for (let k = 0; k < 10; k++) {
        const ring = k < 5 ? 0 : 1, j = ring ? k - 5 : k;
        // подковой: сзади и по бокам костра, спереди — открыто (костёр виден); j 0 — к середине кадра
        const a0 = (ring ? [36, -24, -70, -114, 144] : [0, -48, -92, -136, 180])[j] * Math.PI / 180, ang = tr.sc > 0 ? a0 : Math.PI - a0;
        const m = ring ? 1.55 : 1;
        const x = tr.x + tr.rx * m * Math.cos(ang), gy = tr.y + tr.ry * m * Math.sin(ang);
        const h = tr.h * (1 + .05 * Math.sin(ang) * m) * (.94 + .1 * H(ti * 31 + k));
        // A — человек ближнего левого племени (ti 2), B — ближнего правого (ti 3): их место — кольцо 2, ближе к середине
        const ab = ring && j === 0 && ti === 2 ? -1 : ring && j === 0 && ti === 3 ? 1 : 0;
        A.push({ ti, k, ring, x, gy, h, sc: tr.sc, ab, leader: !ring && j === 0, seed: ti * 10 + k + 1,
          x0: tr.x + (x - tr.x) * 2.1, gy0: tr.y + (gy - tr.y) * 1.8 + 6, ph: H(ti * 17 + k * 3) * PI2, armv: H(ti * 13 + k * 7) });
      }
    });
    return Object.freeze(A.map(Object.freeze));
  })();
  const IA = PPL.findIndex(p => p.ab < 0), IB = PPL.findIndex(p => p.ab > 0);

  // маленький человек — точки по схеме (голова-диск, плечи, туловище, руки, ноги врозь), читается и при росте 30 px;
  // рост 100, подошвы в 0; руки — точки на отрезке плечо → кисть (кисть ставит поза)
  function mini(seed) {
    const F = [], ARM = [], j = n => (H(seed * 97 + n) - .5) * 2.2, leg = H(seed * 5 + 2);
    let n = 0;
    const add = (x, y) => { F.push([x + j(n * 2), y + j(n * 2 + 1)]); n++; };
    add(0, -91);
    for (let k = 0; k < 6; k++) { const a = k / 6 * PI2 + .3; add(4 * Math.cos(a), -91 + 4.4 * Math.sin(a)); }
    for (let k = 0; k < 9; k++) { const a = k / 9 * PI2; add(7.4 * Math.cos(a), -91 + 8.2 * Math.sin(a)); }
    for (let k = 0; k < 5; k++) add(-11 + k * 5.5, -77);
    for (let r = 0; r < 4; r++) { const y = -70 + r * 8.3, hw = 8 - r * .6; for (const u of [-1, 0, 1]) add(u * hw, y); }
    for (const sd of [-1, 1]) for (let k = 0; k < 7; k++) { const u = k / 6; add(sd * lerp(4.5, 5.5 + 4.5 * leg, u), lerp(-43, -1, u)); }
    for (const sd of [-1, 1]) for (let k = 0; k < 5; k++) ARM.push({ sd, u: (k + 1) / 5, jx: j(200 + k * 2 + sd), jy: j(201 + k * 2 + sd) });
    return Object.freeze({ F: Object.freeze(F), ARM: Object.freeze(ARM), HAND: [] });
  }
  // крупный человек (двое в начале): облако точек по долям GF.personPts, руки и кисти — по позе
  function dense(seed, n) {
    const F = [], ARM = [], HAND = [];
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3), sd = c < .5 ? -1 : 1;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * PI2; F.push([r * Math.cos(th), -91 + r * 1.12 * Math.sin(th)]); }
      else if (i < n * .48) { const y = -80 + a * 34, wdt = 10.5 - Math.abs(y + 66) * .05; F.push([(b * 2 - 1) * wdt, y]); }
      else if (i < n * .67) ARM.push({ sd, u: a, jx: (b - .5) * 3.4, jy: 0 });
      else if (i < n * .73) HAND.push({ sd, a, b });
      else { const u = a; F.push([sd * (3.2 + u * 2.6) + (b - .5) * 3.4, -46 + u * 46]); }
    }
    return Object.freeze({ F, ARM, HAND });
  }
  const TPL = PPL.map(p => mini(p.seed));
  const DENSE = { [IA]: dense(5, 620), [IB]: dense(9, 620) };

  // знаки-боги (единица — 1 px при ss 1, радиус ≈ 17): солнце, луна, бык, гора
  const SIGNS = (() => {
    const arc = (cx, cy, r, a0, a1, n, P, skip = 0) => { for (let k = skip; k <= n - skip; k++) { const a = lerp(a0, a1, k / n); P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } };
    const seg = (a, b, n, P, from = 0) => { for (let k = from; k <= n; k++) P.push(mix(a, b, k / n)); };
    const sun = [[0, 0]];
    arc(0, 0, 3.2, 0, PI2, 6, sun, 0); sun.pop();
    arc(0, 0, 6.8, 0, PI2, 12, sun, 0); sun.pop();
    for (let r = 0; r < 8; r++) { const a = r / 8 * PI2 + .2; for (let j = 0; j < 3; j++) { const d = 10.5 + j * 3.4; sun.push([d * Math.cos(a), d * Math.sin(a)]); } }
    const D = Math.PI / 180, moon = [];
    arc(0, 0, 15, 63 * D, 297 * D, 22, moon);
    arc(7.5, 0, 13.4, 93 * D, 267 * D, 16, moon, 1);
    arc(3.4, 0, 13.8, 80 * D, 280 * D, 14, moon, 1);
    const beast = [];
    for (let k = 0; k < 18; k++) { const a = k / 18 * PI2; beast.push([3 + 11 * Math.cos(a), 1 + 6.5 * Math.sin(a)]); }
    arc(-11.5, -4, 3.8, 0, PI2, 8, beast); beast.pop(); beast.push([-15.2, -2.2]);
    [[-13.8, -8.8], [-15.2, -10.6], [-16.3, -12.5], [-16.6, -14.4], [-8.6, -9], [-7.8, -10.9], [-6.6, -12.6], [-5.8, -14.2]].forEach(p => beast.push(p));
    for (const x of [-4.5, -1, 7, 10]) for (const y of [9.6, 12.6, 15.6]) beast.push([x, y]);
    [[14, .5], [15.6, 3.2], [16.4, 6], [16, 8.4]].forEach(p => beast.push(p));
    const mount = [];
    seg([-18, 12], [-4, -15], 9, mount); seg([-4, -15], [10, 12], 9, mount, 1);
    seg([4.6, 1.6], [10.5, -5], 4, mount, 1); seg([10.5, -5], [19, 12], 6, mount, 1);
    seg([-18, 12], [19, 12], 11, mount, 1);
    [[-9, -6], [-7.4, -4.3], [-5.8, -7], [-4, -4.8], [-2.4, -7], [-.8, -5]].forEach(p => mount.push(p));
    return Object.freeze({ sun, moon, beast, mount });
  })();
  const STARS = Object.freeze(Array.from({ length: 40 }, (_, i) => Object.freeze([8 + H(i * 7 + 11) * 344, 16 + H(i * 5 + 3) * 74, H(i * 3 + 1) * PI2, .4 + .6 * H(i * 11 + 2)])));
  // зигзаги спора: пары племён (от частокола до частокола)
  const ZIG = Object.freeze([[[150, 172], [210, 172]], [[160, 302], [200, 302]], [[142, 198], [218, 286]], [[218, 198], [142, 286]]]);

  /* ---------------- время от слов ---------------- */
  function cues(K) {
    const w = (s, n = 0) => GF.w(K, 'd08', s, n), v = (s, n = 0) => GF.w(K, 'd09', s, n);
    const c = {};
    c.s8 = GF.T(K, 'd08'); c.e8 = GF.TE(K, 'd08'); c.s9 = GF.T(K, 'd09'); c.e9 = GF.TE(K, 'd09');
    // d08 «Один простит, другой — нет. А в древности спорили целые племена, и у каждого свой бог и свой закон. Кто их рассудит?»
    c.one = w('один'); c.prost = w('прост'); c.drug = w('друг'); c.net = w('нет'); c.a = w('а'); c.drev = w('древн');
    c.spor = w('спор'); c.cel = w('цел'); c.plem = w('плем'); c.kazh = w('кажд'); c.svoi = w('свой'); c.bog = w('бог');
    c.svoi2 = w('свой', 1); c.zak = w('закон'); c.kto = w('кто'); c.rass = w('рассуд');
    // d09 «Верующие скажут: закон людям дал Сам Бог. А что если вождям просто нужен был один Бог для всех племён — один закон
    //      и один Судья, который видит каждого? Тогда, может быть, люди сначала Его вообразили.»
    c.ver = v('верующ'); c.sk = v('скажут'); c.zak9 = v('закон'); c.lyud = v('людям'); c.sam = v('сам'); c.bog9 = v('бог');
    c.chto = v('что'); c.esli = v('если'); c.vozh = v('вожд'); c.nuzh = v('нужен'); c.odin = v('один'); c.bog2 = v('бог', 1);
    c.vseh = v('всех'); c.plem9 = v('племен'); c.odin2 = v('один', 1); c.zak2 = v('закон', 1); c.sud = v('суд');
    c.vid = v('видит'); c.togda = v('тогда'); c.mozh = v('может'); c.lyudi = v('люди'); c.snach = v('сначала');
    c.ego = v('его'); c.voobr = v('вообраз');
    // вспышки спора: на «спорили» — четыре подряд, дальше каждые 0,5 с до «Верующие»; на «рассудит» — все разом
    c.fl = [];
    // диагонали не горят одновременно (иначе в середине крест)
    [0, 2, 1, 3].forEach((k, n) => c.fl.push([c.spor + n * .23, k, 1]));
    for (let x = c.spor + 1.05, k = 4; x < c.ver - .3; x += .5, k++) if (Math.abs(x - c.rass) > .35) c.fl.push([x, (k * 3) % 4, .8]);
    for (let k = 0; k < 2; k++) c.fl.push([c.rass + .04 * k, k, 1.2]);
    return c;
  }

  /* ---------------- камера ---------------- */
  // наезд на двоих (их подошвы — y 318 экрана) → на «А» отъезд к ×1; подошвы двоих скользят к y 332 экрана
  function camera(t, c) {
    const u = qq(t, c.a - .05, c.a + 1.1), z = Math.exp(lerp(Math.log(ZC), 0, u)), sy = lerp(318, ABY, u);
    return { z, u, cx: 180, cy: ABY - (sy - A1) / z };
  }
  const proj = (cam, x, y) => [A0 + (x - cam.cx) * cam.z, A1 + (y - cam.cy) * cam.z];

  /* ---------------- люди: где кто и в какой позе ---------------- */
  function crowd(t, c, cv) {
    const ent = qq(t, c.a - .05, c.a + .8);
    const join = qq(t, c.cel - .1, c.plem + .45);
    const argue = qq(t, c.spor - .1, c.spor + .35) * (1 - qq(t, c.ver - .1, c.ver + .4));
    const pray = qq(t, c.ver - .05, c.ver + .55) * (1 - qq(t, c.chto - .1, c.esli + .35));
    const lead = qq(t, c.vozh - .1, c.vozh + .4);
    const point = qq(t, c.nuzh - .15, c.nuzh + .3) * (1 - qq(t, c.togda, c.togda + .6));
    const reachA = qq(t, c.prost - .05, c.prost + .4) * (1 - qq(t, c.spor - .25, c.spor + .25));
    const cross = qq(t, c.net - .05, c.net + .35) * (1 - qq(t, c.spor - .25, c.spor + .25));
    const boost = pulse(t, c.lyudi - .05, .15, .9);
    return PPL.map((p, i) => {
      let x = p.x, gy = p.gy, h = p.h, op = 1;
      if (p.ab) {
        const back = p.ab > 0 ? 2.6 * qq(t, c.net, c.net + .4) : 0;
        x = lerp((p.ab < 0 ? AX : BX) + back, p.x, join); gy = lerp(ABY, p.gy, join); h = lerp(ABH, p.h, join);
        gy -= 1.2 * Math.abs(Math.sin(join * 9)) * (join > 0 && join < 1 ? 1 : 0);
        op = p.ab < 0 ? lerp(.5, 1, qq(t, c.one - .1, c.one + .25)) :
          lerp(.5, 1, qq(t, c.drug - .1, c.drug + .25)) * (1 - .18 * qq(t, c.net, c.net + .4) * (1 - join));
      } else if (!p.ring) op = ent;
      else {
        op = qq(t, c.cel - .1, c.cel + .45);
        x = lerp(p.x0, p.x, join); gy = lerp(p.gy0, p.gy, join) - 1.1 * Math.abs(Math.sin(join * 8)) * (join < 1 ? 1 : 0);
      }
      if (p.leader) { x += p.sc * 7 * lead; h *= 1 + .22 * lead; }
      // руки: вниз → кулак к соседям (спор) → обе к небу (вера) → вождь показывает на огонь; A протягивает ладонь, B скрещивает
      const v = p.armv;
      let L = [-(15 + 4 * v), -45], R = [15 + 4 * v, -45];
      if (p.ab < 0) R = mix(R, [38, -66], reachA);
      if (p.ab > 0) { L = mix(L, [9, -63], cross); R = mix(R, [-9, -67], cross); }
      if (argue > .003) {
        const T = [p.sc * 27, -95 + 5 * Math.sin(t * 10 + p.ph)];
        if (p.sc > 0) R = mix(R, T, argue); else L = mix(L, T, argue);
      }
      if (pray > .003) { L = mix(L, [-13, -119], pray); R = mix(R, [13, -119], pray); }
      if (p.leader && point > .003) {
        const sx = x + p.sc * 12.5 * h / 100, sy = gy - .76 * h, dx = cv.x - sx, dy = cv.y - sy, d = Math.hypot(dx, dy) || 1;
        const T = [p.sc * 12.5 + dx / d * 44, -76 + dy / d * 44];
        if (p.sc > 0) R = mix(R, T, point); else L = mix(L, T, point);
      }
      const amp = (.35 + .9 * argue) * (1 - .6 * pray);
      return { x, gy, h, op: op * (1 + .45 * boost), L, R, amp, open: p.ab < 0 ? reachA : 0 };
    });
  }
  const head = s => [s.x, s.gy - .91 * s.h];

  // точки фигуры в кадр (дрожь — в пикселях экрана); al — яркость
  function place(tpl, st, cam, t, seed, P, A, al, dl = 1) {
    const s = st.h / 100, amp = st.amp;
    let n = 0;
    const put = (ux, uy, a = al) => {
      const q = proj(cam, st.x + ux * s, st.gy + uy * s), k = n++ + seed * 7;
      P.push([q[0] + amp * Math.sin(t * (1.3 + H(k) * 1.9) + k * 2.1), q[1] + amp * Math.cos(t * (1.1 + H(k * 3) * 1.7) + k * 1.3)]);
      A.push(a);
    };
    for (const p of tpl.F) put(p[0], p[1]);
    for (const a of tpl.ARM) {
      const S = [a.sd * 12.5, -76], Hd = a.sd < 0 ? st.L : st.R, dx = Hd[0] - S[0], dy = Hd[1] - S[1], d = Math.hypot(dx, dy) || 1;
      put(S[0] + dx * a.u - dy / d * a.jx + a.jy * .5, S[1] + dy * a.u + dx / d * a.jx);
    }
    for (const a of tpl.HAND) {
      const S = [a.sd * 12.5, -76], Hd = a.sd < 0 ? st.L : st.R, dx = Hd[0] - S[0], dy = Hd[1] - S[1], d = Math.hypot(dx, dy) || 1;
      const open = a.sd > 0 ? st.open : 0, ux = dx / d, uy = dy / d;
      // открытая ладонь — веер пальцев по ходу руки; иначе — кисть комком
      const fx = Hd[0] + ux * (1 + 7 * a.a) * open - uy * (a.b - .5) * (2.5 + 6 * a.a) * open + (1 - open) * (a.a - .5) * 4.6;
      const fy = Hd[1] + uy * (1 + 7 * a.a) * open + ux * (a.b - .5) * (2.5 + 6 * a.a) * open + (1 - open) * (a.b - .5) * 4.6;
      put(fx, fy, al * dl);
    }
  }

  /* ---------------- рисунки ---------------- */
  const line = (a, b, op, w = 1.3, col = '#fff') => op <= .003 ? '' :
    `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${col}" stroke-width="${w}" opacity="${f(op)}" stroke-linecap="round"/>`;
  const glowDot = (p, r, op, col = '#fff') => op <= .003 ? '' :
    `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r * 2.6)}" fill="${col}" opacity="${f(op * .4)}" filter="url(#un-soft)"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="${col}" opacity="${f(op)}"/>`;
  const halo = (p, r, op) => op <= .003 ? '' : `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="url(#gf-warm)" opacity="${f(op)}"/>`;

  // костёр: ореол, два бревна, тёплые точки пламени уходят вверх
  function campfire(cam, tr, t, op, flare) {
    if (op <= .003) return '';
    const p = proj(cam, tr.x, tr.y), s = (tr.far ? .85 : 1) * cam.z;
    if (p[0] < -60 || p[0] > 420 || p[1] < -60 || p[1] > 700) return '';
    let g = halo([p[0], p[1] - 7 * s], 44 * s * (1 + .25 * flare), 1);
    g += `<ellipse cx="${f(p[0])}" cy="${f(p[1] - 6 * s)}" rx="${f(7 * s)}" ry="${f(9 * s * (1 + .08 * Math.sin(t * 9 + tr.x)))}" fill="${CREAM}" opacity=".35" filter="url(#un-soft)"/>`;
    g += line([p[0] - 10 * s, p[1] + 2 * s], [p[0] + 10 * s, p[1] - 2 * s], .9, 1.8) + line([p[0] - 10 * s, p[1] - 2 * s], [p[0] + 10 * s, p[1] + 2 * s], .9, 1.8);
    const P = [], A = [];
    for (let i = 0; i < 24; i++) {
      const ph = ((t * (1.4 + .5 * H(i + tr.x)) + H(i * 7 + tr.y)) % 1 + 1) % 1;
      P.push([p[0] + ((H(i * 5 + tr.x) - .5) * 13 * (1 - ph) + Math.sin(t * 6 + i) * .9) * s, p[1] - (1.5 + (17 + 6 * flare) * ph) * s]);
      A.push(1 - .8 * ph);
    }
    g += GF.dots(P, { r: 1.8, op: 1, glow: 1, t, color: WARM, alpha: i => A[i] });
    return `<g opacity="${f(op)}">${g}</g>`;
  }
  // частокол вокруг племени: колья по эллипсу и две жерди; rise 0..1 — высота
  function fence(cam, tr, rise, op) {
    if (rise <= .003 || op <= .003) return '';
    const ph = (tr.far ? 10 : 13) * rise, N = 32;
    let s = '';
    for (let k = 0; k < N; k++) {
      const a = k / N * PI2, bx = tr.x + tr.fr * Math.cos(a), by = tr.y + tr.fry * Math.sin(a);
      const P0 = proj(cam, bx, by), P1 = proj(cam, bx, by - ph * (.85 + .3 * H(k + tr.x)));
      s += line(P0, P1, Math.sin(a) < 0 ? .62 : .92, 1.5) + `<circle cx="${f(P1[0])}" cy="${f(P1[1])}" r="1.3" fill="#fff" opacity=".9"/>`;
    }
    for (const hh of [.4, .82]) {
      const c0 = proj(cam, tr.x, tr.y - ph * hh);
      s += `<ellipse cx="${f(c0[0])}" cy="${f(c0[1])}" rx="${f(tr.fr * cam.z)}" ry="${f(tr.fry * cam.z)}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".7"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // зигзаг-искра спора от a к b (каждая вспышка — своя форма), в середине — вспышка
  function zig(a, b, seed, op) {
    if (op <= .003) return '';
    const n = 8, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const P = [];
    for (let i = 0; i <= n; i++) { const u = i / n, o = i === 0 || i === n ? 0 : (H(seed * 13 + i) - .5) * 22; P.push([a[0] + dx * u + nx * o, a[1] + dy * u + ny * o]); }
    const d = 'M' + P.map(p => f(p[0]) + ' ' + f(p[1])).join(' L');
    return `<g opacity="${f(op)}"><path d="${d}" fill="none" stroke="${CREAM}" stroke-width="7" opacity=".4" filter="url(#un-soft)"/>` +
      `<path d="${d}" fill="none" stroke="#fff" stroke-width="2.3" stroke-linejoin="round"/></g>` + glowDot(mix(a, b, .5), 4.2, op, WARM);
  }
  // плита: арка сверху, контур рисуется с q; hot — тёплая вспышка
  function tablet(cx, cy, w, h, q, op, hot = 0, lw = 1.6) {
    if (op <= .003 || q <= .003) return '';
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, r = w / 2;
    const d = `M${f(x0)} ${f(y1)} L${f(x0)} ${f(y0 + r * .55)} Q${f(x0)} ${f(y0)} ${f(cx)} ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r * .55)} L${f(x1)} ${f(y1)} Z`;
    const dash = `pathLength="1" stroke-dasharray="${f(q)} 2"`;
    return `<g opacity="${f(op)}"><path d="${d}" fill="#000" opacity="${f(.92 * q)}"/>
      <path d="${d}" fill="rgba(255,240,210,${f((.06 + .2 * hot) * q)})" stroke="${CREAM}" stroke-width="${f(3.2 + 2 * hot)}" opacity="${f(.3 + .3 * hot)}" filter="url(#un-soft)" ${dash}/>
      <path d="${d}" fill="none" stroke="#fff" stroke-width="${lw}" opacity=".95" stroke-linejoin="round" ${dash}/></g>`;
  }
  // значки своей плиты: черты, точки, засечки, волны — у каждого племени свои
  function marks(kind, cx, cy, s, op) {
    if (op <= .003) return '';
    let g = '';
    const L = (x0, y0, x1, y1) => `<line x1="${f(cx + x0 * s)}" y1="${f(cy + y0 * s)}" x2="${f(cx + x1 * s)}" y2="${f(cy + y1 * s)}"/>`;
    if (kind === 0) [[-6, -3, 6], [-6, 2, 4], [-6, 7, 6]].forEach(([a, y, b]) => { g += L(a, y, b, y); });
    if (kind === 1) for (const y of [-3, 2, 7]) for (const x of [-4.5, 0, 4.5]) g += `<circle cx="${f(cx + x * s)}" cy="${f(cy + y * s)}" r="${f(1.1 * s)}" fill="#fff" stroke="none"/>`;
    if (kind === 2) for (const y of [-4, 3.5]) for (const x of [-4.5, -1.5, 1.5, 4.5]) g += L(x, y - 2.6, x, y + 2.6);
    if (kind === 3) for (const y of [-3, 2, 7]) g += `<path d="M${f(cx - 6 * s)} ${f(cy + y * s)} L${f(cx - 3 * s)} ${f(cy + (y - 2) * s)} L${f(cx)} ${f(cy + y * s)} L${f(cx + 3 * s)} ${f(cy + (y - 2) * s)} L${f(cx + 6 * s)} ${f(cy + y * s)}" fill="none"/>`;
    return `<g stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity="${f(op)}">${g}</g>`;
  }
  // знак-бог из точек: собирается из облака (form 0..1), солнце медленно вращается
  function sign(kind, cx, cy, s, form, op, t, seed) {
    if (op <= .003 || form <= .003) return '';
    const rot = kind === 'sun' ? t * .25 : 0, co = Math.cos(rot), si = Math.sin(rot);
    const B = SIGNS[kind].map(([x, y]) => [cx + (x * co - y * si) * s, cy + (x * si + y * co) * s]);
    const S = B.map((p, i) => [cx + (H(seed * 41 + i) - .5) * 60, cy + (H(seed * 43 + i * 3) - .5) * 44]);
    const P = form >= 1 ? GF.jitter(B, t, .25, seed) : GF.morph(S, B, form, t, { spread: .35, amp: 2, bend: 10, seed });
    return `<g opacity="${f(op)}">${halo([cx, cy], 30 * s, .7 * form)}${GF.dots(P, { r: 1.7, op: 1, glow: .8, t, color: CREAM })}</g>`;
  }
  // огонь пунктиром — образ: тёплый ореол, пунктир крутится; flick — мерцание («может быть»)
  function contour(x, y, r, op, bright, t, flick) {
    if (op <= .003) return '';
    const k = r / CR0, fl = 1 - flick * .55 * (.5 + .5 * Math.sin(t * 17)), dash = `stroke-dasharray="${f(6 * k)} ${f(5 * k)}"`;
    return `<g opacity="${f(op)}">${halo([x, y], r * 2.6, (.3 + .4 * bright) * fl)}
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${CREAM}" stroke-width="${f(5 + 2 * bright)}" ${dash} stroke-dashoffset="${f(-t * 5)}" opacity="${f((.3 + .35 * bright) * fl)}" filter="url(#un-soft)"/>
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="2.4" ${dash} stroke-dashoffset="${f(-t * 5)}" opacity="${f((.8 + .2 * bright) * fl)}"/></g>`;
  }
  // весы в контуре: стойка, коромысло (качается на swing), две чаши; q — прорисовка
  function scales(x, y, s, q, swing, op) {
    if (op <= .003 || q <= .003) return '';
    const by = y - 9 * s, a = swing, ex = 15 * s * Math.cos(a), ey = 15 * s * Math.sin(a);
    const E = [[x - ex, by - ey], [x + ex, by + ey]];
    const dash = `pathLength="1" stroke-dasharray="${f(q)} 2"`;
    let d = `M${f(x)} ${f(y + 13 * s)} L${f(x)} ${f(y - 13 * s)} M${f(x - 7 * s)} ${f(y + 13 * s)} L${f(x + 7 * s)} ${f(y + 13 * s)} M${f(E[0][0])} ${f(E[0][1])} L${f(E[1][0])} ${f(E[1][1])}`;
    for (const e of E) { const py = e[1] + 10 * s; d += ` M${f(e[0])} ${f(e[1])} L${f(e[0])} ${f(py)} M${f(e[0] - 6 * s)} ${f(py)} Q${f(e[0])} ${f(py + 5.5 * s)} ${f(e[0] + 6 * s)} ${f(py)}`; }
    return `<g opacity="${f(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="${CREAM}" stroke-width="${f(4 + s)}" opacity=".35" filter="url(#un-soft)" ${dash}/>` +
      `<path d="${d}" stroke="#fff" stroke-width="${f(1.4 + .3 * s)}" ${dash}/>${glowDot([x, y - 14 * s], 1.8 * Math.sqrt(s), q, WARM)}</g>`;
  }
  const bez = (a, b, cc, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * cc[0] + u * u * b[0], v * v * a[1] + 2 * v * u * cc[1] + u * u * b[1]]; };
  const toEdge = (cv, p) => { const dx = p[0] - cv.x, dy = p[1] - cv.y, d = Math.hypot(dx, dy) || 1; return [cv.x + dx / d * cv.r, cv.y + dy / d * cv.r]; };

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), cam = camera(t, c), Z = cam.z;
    // один огонь: загорается на «Сам Бог», на «А (что если)» становится пунктиром, на «вообразили» — крупным контуром
    const gq = qq(t, c.voobr - .1, c.voobr + .6);
    const cv = { x: lerp(FX, GX, gq), y: lerp(FY, GY, gq), r: lerp(CR0, GR, gq) };
    const ST = crowd(t, c, cv);
    const ent = qq(t, c.a - .05, c.a + .8);
    let s = '';

    // ночь: звёзды проявляются с отъездом, тише, когда загорается огонь
    const stA = qq(t, c.a, c.a + 1) * (1 - .45 * qq(t, c.sam, c.bog9 + .5));
    if (stA > .003) s += GF.dots(STARS.map(p => [p[0], p[1]]), { r: 1.05, op: .7 * stA, glow: .5, t, alpha: i => STARS[i][3] * (.6 + .4 * Math.sin(t * 1.7 + STARS[i][2])) });

    // свет «закон людям дал»: луч сверху до середины, на «людям» — свет к четырём племенам; на «Сам Бог» луч уходит в огонь
    const bm = qq(t, c.zak9 - .1, c.zak9 + .45), bOff = qq(t, c.bog9 + .05, c.bog9 + .6);
    const wash = qq(t, c.lyud - .05, c.lyud + .4) * (1 - .55 * qq(t, c.sam, c.bog9 + .4)) * (1 - qq(t, c.chto, c.esli + .5));
    if (bm > .003 && bOff < .997) {
      const yb = lerp(lerp(-10, BEAMY, bm), FY, qq(t, c.sam - .05, c.bog9 + .35)), op = 1 - bOff;
      s += `<g opacity="${f(op)}"><line x1="${FX}" y1="-10" x2="${FX}" y2="${f(yb)}" stroke="${CREAM}" stroke-width="12" opacity=".28" filter="url(#un-soft)"/>` +
        `<line x1="${FX}" y1="-10" x2="${FX}" y2="${f(yb)}" stroke="#fff" stroke-width="2" opacity=".9"/></g>` + glowDot([FX, yb], 3.6, op * (1 - qq(t, c.sam, c.bog9)), '#fff');
      // «людям»: от точки луча по племенам расходится кольцо света (без лучей-крестом)
      const sp = qq(t, c.lyud - .05, c.lyud + .7);
      if (sp > 0 && sp < 1) s += `<ellipse cx="${FX}" cy="${BEAMY}" rx="${f(10 + 170 * sp)}" ry="${f(4 + 80 * sp)}" fill="none" stroke="${CREAM}" stroke-width="6" opacity="${f(.35 * (1 - sp))}" filter="url(#un-soft)"/>` +
        `<ellipse cx="${FX}" cy="${BEAMY}" rx="${f(10 + 170 * sp)}" ry="${f(4 + 80 * sp)}" fill="none" stroke="#fff" stroke-width="1.6" opacity="${f(.85 * (1 - sp))}"/>`;
    }
    if (wash > .003) TRIBES.forEach(tr => { s += halo(proj(cam, tr.x, tr.y - tr.h * .55), 62 * Z, .55 * wash); });


    // частоколы: встают сразу за «закон» (d08), опускаются на «всех племён» (d09)
    const rise = qq(t, c.zak + .1, c.zak + .6) * (1 - qq(t, c.vseh - .1, c.plem9 + .35));
    TRIBES.forEach((tr, i) => { s += fence(cam, tr, rise * qq(t, c.zak + .1 + i * .06, c.zak + .5 + i * .06), 1); });

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
        for (let k = 0; k < 9; k++) {
          const a = Math.atan2(200 - tr.y, 180 - tr.x) + (H(ti * 19 + k) - .5) * 1.6, v = 40 + 50 * H(ti * 7 + k * 3);
          const o = [tr.x + tr.fr * .8 * Math.cos(a), tr.y + tr.fry * Math.sin(a) - 8];
          P.push(proj(cam, o[0] + Math.cos(a) * v * burst, o[1] + Math.sin(a) * v * burst * .7 + 30 * burst * burst));
          A.push(Math.sin(Math.PI * burst));
        }
      });
      s += GF.dots(P, { r: 1.8, op: 1, glow: 1, t, color: WARM, alpha: i => A[i] });
    }

    // нити от каждого к контуру («для всех племён»); тише на «один закон», уходят на «Тогда»
    const thA = .42 * (1 - .5 * qq(t, c.odin2, c.zak2 + .3)) * (1 - qq(t, c.togda - .1, c.togda + .5));
    if (t > c.vseh - .2 && thA > .003) ST.forEach((st, i) => {
      const d = H(i * 5 + 3) * .45, g = qq(t, c.vseh - .1 + d, c.vseh + .25 + d);
      if (g <= .003) return;
      const hd = proj(cam, ...head(st)), e = toEdge(cv, hd);
      s += line(hd, mix(hd, e, g), thA * st.op, 1.2);
    });
    // вожди «нужен был»: пунктир от руки вождя к контуру
    const lt = qq(t, c.nuzh, c.odin) * (1 - qq(t, c.vseh, c.plem9 + .3));
    if (lt > .003) ST.forEach((st, i) => {
      if (!PPL[i].leader) return;
      const hand = PPL[i].sc > 0 ? st.R : st.L, hp = proj(cam, st.x + hand[0] * st.h / 100, st.gy + hand[1] * st.h / 100), e = toEdge(cv, hp);
      s += `<line x1="${f(hp[0])}" y1="${f(hp[1])}" x2="${f(lerp(hp[0], e[0], lt))}" y2="${f(lerp(hp[1], e[1], lt))}" stroke="${CREAM}" stroke-width="1.6" stroke-dasharray="4 3.5" opacity=".9"/>`;
    });
    // «видит каждого»: тёплые лучи от контура к каждой голове (слева направо), голова загорается
    const rayOff = qq(t, c.togda - .1, c.togda + .5);
    const order = ST.map((st, i) => [i, Math.atan2(head(st)[1] - cv.y, head(st)[0] - cv.x)]).sort((a, b) => b[1] - a[1]);
    if (t > c.vid - .15 && rayOff < .997) order.forEach(([i], n) => {
      const st = ST[i], d = n / order.length * .55, g = qq(t, c.vid - .1 + d, c.vid + .2 + d);
      if (g <= .003) return;
      const hd = proj(cam, ...head(st)), e = toEdge(cv, hd), tip = mix(e, hd, g);
      s += line(e, tip, .8 * (1 - rayOff), 1.3, CREAM) + glowDot(tip, 1.8, (g < 1 ? 1 : 0) * (1 - rayOff), WARM);
      s += glowDot([hd[0], hd[1] + 1], 2.8, qq(g, .9, 1) * (1 - .75 * rayOff), WARM);
    });
    // «сначала Его вообразили»: от голов вверх к контуру бегут пунктиры мысли (половина людей), остаются тонкими
    const thought = qq(t, c.snach - .1, c.voobr + .9);
    if (thought > .003) ST.forEach((st, i) => {
      if (i % 2 && i !== IA && i !== IB) return;
      const d = H(i * 3 + 7) * .4, u = qq(t, c.snach - .1 + d, c.voobr + .25 + d);
      if (u <= .003) return;
      const hd = proj(cam, ...head(st)), e = toEdge(cv, hd), cc = [lerp(hd[0], e[0], .3) + (H(i) - .5) * 30, Math.min(hd[1], e[1]) - 6];
      const P = [], A = [];
      for (let k = 1; k <= 10; k++) { const v = k / 11; if (v <= u) { P.push(bez(hd, e, cc, v)); A.push(.55); } }
      if (u < 1) { P.push(bez(hd, e, cc, u)); A.push(1.6); }
      s += GF.dots(P, { r: 1.2, op: st.op * (1 - .35 * qq(t, c.voobr + .6, c.voobr + 1)), glow: .6, t, color: CREAM, alpha: k => A[k] });
    });

    // люди: 40 фигурок; двое крупно — ещё облако точек (с отъездом гаснет)
    {
      const P = [], A = [];
      const dA = clamp((Z - 1.8) / 2.2);
      ST.forEach((st, i) => {
        if (st.op <= .003) return;
        const depth = .8 + .2 * clamp((st.gy - 160) / 170);
        place(TPL[i], st, cam, t, PPL[i].seed, P, A, st.op * depth);
        if (DENSE[i] && dA > .003) place(DENSE[i], st, cam, t, PPL[i].seed + 50, P, A, st.op * dA);
      });
      s += GF.dots(P, { r: lerp(1.3, 1.25, clamp((Z - 1) / 3)), op: 1, glow: lerp(.45, .6, clamp((Z - 1) / 3)), t, alpha: k => A[k] });
    }
    // костры — перед людьми кольца (спереди кольцо открыто)
    const flare = .8 * pulse(t, c.plem - .05, .15, .8) + .6 * pulse(t, c.lyud + .2, .15, .9);
    TRIBES.forEach(tr => { s += campfire(cam, tr, t, ent, flare); });
    // двое крупно: тень под ногами, свет в ладони A, тёплая нить к B — на «нет» рвётся
    const near = 1 - qq(t, c.a - .1, c.a + .35);
    if (near > .003) {
      const sA = ST[IA], sB = ST[IB];
      for (const st of [sA, sB]) { const g = proj(cam, st.x, st.gy); s += `<ellipse cx="${f(g[0])}" cy="${f(g[1] + 2)}" rx="${f(.2 * st.h * Z)}" ry="${f(.045 * st.h * Z)}" fill="none" stroke="#fff" stroke-width="1.3" opacity="${f(.4 * near * st.op)}"/>`; }
      const palm = proj(cam, sA.x + (sA.R[0] + 4) * sA.h / 100, sA.gy + (sA.R[1] - 1) * sA.h / 100);
      const tgt = proj(cam, sB.x - 4 * sB.h / 100, sB.gy - 66 * sB.h / 100);
      const pl = qq(t, c.prost, c.prost + .35) * (1 - .6 * qq(t, c.net + .1, c.net + .5)) * near;
      s += halo(palm, 30, .9 * pl) + glowDot(palm, 4, pl, WARM);
      const g = qq(t, c.prost + .1, c.prost + .65), cut = qq(t, c.net + .05, c.net + .2), back = qq(t, c.net + .15, c.net + .7);
      if (g > .003) {
        const tip = mix(palm, tgt, .86 * g), end = mix(palm, tip, 1 - back);
        s += line(palm, end, .95 * near, 2, WARM) + line(palm, end, .3 * near, 7, CREAM).replace('/>', ' filter="url(#un-soft)"/>');
        if (cut < .003) s += glowDot(tip, 2.6, near, WARM);
        else {
          // обрывок нити падает искрами
          const fall = qq(t, c.net + .05, c.net + .85), P = [];
          for (let k = 0; k < 10; k++) { const u = .55 + .45 * k / 9, q0 = mix(palm, tip, u); P.push([q0[0] + (H(k * 7) - .5) * 40 * fall, q0[1] + 150 * fall * fall * (.6 + .4 * H(k * 3))]); }
          s += GF.dots(P, { r: 2, op: near * (1 - fall), glow: 1, t, color: WARM });
          s += glowDot(tip, 6 * (1 - fall), pulse(t, c.net + .05, .05, .4) * near, '#fff');
        }
      }
    }

    // вожди: посох и венец из трёх огоньков; кольцо под ногами вспыхивает на «вождям»
    const lead = qq(t, c.vozh - .1, c.vozh + .4);
    if (lead > .003) ST.forEach((st, i) => {
      if (!PPL[i].leader) return;
      const sd = -PPL[i].sc, k = st.h / 100, b = proj(cam, st.x + sd * 26 * k, st.gy), top = proj(cam, st.x + sd * 26 * k, st.gy - 118 * k * lead);
      s = halo(proj(cam, st.x, st.gy - .55 * st.h), 34, .75 * lead) + s;
      s += line(b, top, .95, 2.2) + glowDot(top, 2.2, lead, CREAM);
      for (const dx of [-5, 0, 5]) s += glowDot(proj(cam, st.x + dx * k, st.gy - (105 + (dx ? 0 : 4)) * k), 2, lead, WARM);
      const ring = pulse(t, c.vozh, .15, .9), g = proj(cam, st.x, st.gy);
      if (ring > .003) s += `<ellipse cx="${f(g[0])}" cy="${f(g[1] + 1)}" rx="${f(12 + 10 * qq(t, c.vozh, c.vozh + 1))}" ry="${f(4 + 3 * qq(t, c.vozh, c.vozh + 1))}" fill="none" stroke="${CREAM}" stroke-width="1.6" opacity="${f(ring)}"/>`;
    });

    // знаки-боги: по очереди на «каждого … бог»; на «один Бог» тускнеют и чуть уменьшаются
    const dim = qq(t, c.odin + .05, c.bog2 + .45);
    const sT = [c.kazh, lerp(c.kazh, c.bog, 1 / 3), lerp(c.kazh, c.bog, 2 / 3), c.bog];
    TRIBES.forEach((tr, i) => {
      const form = qq(t, sT[i] - .05, sT[i] + .45);
      const p = proj(cam, tr.sx, tr.sy);
      s += sign(tr.sign, p[0], p[1], tr.ss * Z * lerp(1, .82, dim) * (1 + .12 * pulse(t, sT[i] + .4, .1, .5)), form, lerp(1, .3, dim), t, i + 3);
    });
    // свои плиты: на «свой (2-е) … закон»; на «один закон» слетаются под огонь в одну
    const fly0 = c.odin2 - .1;
    TRIBES.forEach((tr, i) => {
      const t0 = lerp(c.svoi2, c.zak, i / 3), q = qq(t, t0 - .05, t0 + .35), fl = qq(t, fly0 + i * .06, c.zak2 + .05 + i * .06);
      if (q <= .003 || fl >= .999) return;
      const p0 = proj(cam, tr.tx, tr.sy), p = [lerp(p0[0], LTX, fl), lerp(p0[1], LTY, fl) - Math.sin(Math.PI * fl) * 24], sc = Z * lerp(1, .55, fl);
      const hot = pulse(t, t0 + .3, .1, .6);
      s += tablet(p[0], p[1], 21 * sc, 27 * sc, q, 1 - qq(fl, .8, 1), hot, 1.5) + marks(tr.marks, p[0], p[1] + 2 * sc, sc, q * (1 - qq(fl, .6, .9)));
    });

    // один огонь: «Сам Бог» — загорается (волна); «А что если» — пунктирный контур; «вообразили» — крупно
    const ign = qq(t, c.sam - .1, c.bog9 + .15), dz = qq(t, c.chto - .05, c.esli + .35);
    if (ign > .003) {
      s += GF.spark(FX, FY, FR * (.4 + .6 * ign) * (1 + .3 * pulse(t, c.bog9, .12, .6)), { t, op: ign * (1 - dz) });
      const wv = qq(t, c.bog9, c.bog9 + 1.1);
      if (wv > 0 && wv < 1) s += `<circle cx="${FX}" cy="${FY}" r="${f(FR + 60 * wv)}" fill="none" stroke="#fff" stroke-width="1.8" opacity="${f(.85 * (1 - wv))}"/>`;
    }
    if (dz > .003) {
      const bright = .6 * pulse(t, c.odin, .15, .9) + .5 * pulse(t, c.sud, .15, .9) + .5 * pulse(t, c.vid, .15, 1) + .4 * pulse(t, c.voobr, .2, 1.2) + .25 * gq;
      const flick = qq(t, c.mozh - .1, c.mozh + .2) * (1 - qq(t, c.lyudi, c.lyudi + .4));
      s += contour(cv.x, cv.y, cv.r * (1 + .05 * Math.sin(t * 2.3)), dz, bright, t, flick);
      for (const [a, m] of [[c.odin, 1], [c.voobr, 1.4]]) {
        const wv = qq(t, a, a + 1.1);
        if (wv > 0 && wv < 1) s += `<circle cx="${f(cv.x)}" cy="${f(cv.y)}" r="${f(cv.r + 55 * m * wv)}" fill="none" stroke="#fff" stroke-width="1.8" opacity="${f(.8 * (1 - wv))}"/>`;
      }
      // весы — на «Судья»: качаются и встают ровно; растут вместе с контуром
      const sq = qq(t, c.sud - .1, c.sud + .45), sw = t > c.sud ? .4 * Math.exp(-(t - c.sud) * 2.2) * Math.sin((t - c.sud) * 7) : .4;
      s += scales(cv.x, cv.y + 2 * cv.r / CR0, cv.r / CR0 * .95, sq, sw, 1 - .35 * qq(t, c.mozh - .1, c.mozh + .3) * (1 - gq));
    }
    // плита ОДИН ЗАКОН
    const bq = qq(t, c.odin2 + .1, c.zak2 + .3);
    const bop = (1 - .45 * qq(t, c.mozh - .1, c.mozh + .3)) * (1 - qq(t, c.voobr - .1, c.voobr + .35));
    if (bq > .003 && bop > .003) {
      const hot = pulse(t, c.zak2 + .25, .12, .8);
      s += `<g opacity="${f(bop)}">${tablet(LTX, LTY, LTW, LTH, bq, 1, hot, 1.8)}` +
        GF.typed(LTX, LTY - 1, 'ОДИН', t, c.odin2 + .2, { size: 15, cps: 24, glow: true }) +
        GF.typed(LTX, LTY + 19, 'ЗАКОН', t, c.zak2 + .05, { size: 15, cps: 24, glow: true }) + '</g>';
    }

    // подписи: ДРЕВНОСТЬ; КТО ИХ РАССУДИТ? и крупный «?»
    const dv = qq(t, c.drev - .1, c.drev + .2) * (1 - qq(t, c.kto - .3, c.kto));
    if (dv > .003) s += `<g opacity="${f(dv)}">${GF.typed(180, 34, 'ДРЕВНОСТЬ', t, c.drev - .05, { size: 15, cps: 26, glow: true })}</g>`;
    const qa = qq(t, c.kto - .05, c.kto + .3) * (1 - qq(t, c.sk, c.zak9 + .1));
    if (qa > .003) {
      const z = 1 + .3 * (1 - qq(t, c.kto - .05, c.kto + .35)) + .14 * pulse(t, c.rass, .1, .5);
      s += `<g opacity="${f(qa)}">${GF.typed(180, 34, 'КТО ИХ РАССУДИТ?', t, c.kto - .05, { size: 16, cps: 30, glow: true })}` +
        GF.zoom(GF.mono(180, 104, '?', { size: 76, anchor: 'middle', glow: true, opacity: .97 }), 180, 80, z) + '</g>';
    }
    return s;
  }

  SCENES.gf_tribes = GF.scene('gf_tribes', (t, K, mode, p) => body(t, K || {}));
})();
