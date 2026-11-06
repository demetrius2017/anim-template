/* gfc_crowd — «Бог ещё не создан», альтернативная версия «Цветная инфографика» v2, часть 1 (eps/god_future_color_p1),
 * фразы a05–a09 до «Но»: принятая сцена gf_crowd.js (текст v21, 05.11), перерисованная словарём gfc_00_lib.js v2
 * (window.GFC; образец владельца — eps/god_future/qa/style_flatcolor.jpg). Сюжет и время — как у gf_crowd: те же события
 * на тех же словах (GF.w → GFC.w, основы те же), та же камера по словам, та же раскладка людей (тот же hash), те же позы на
 * швах: вход — человек gfc_body (SCENES.gfc_body.man), конец a09 — соты 6×6 (r 19,5, центр 180,240) с кремовыми
 * фигурками и огонь (180,88, r 8), как начало gfc_line/daily. Плашку «ВЗГЛЯД АВТОРА» ставит story.py, сцена — нет.
 *
 * Чем вид отличается от gf_crowd (v2, 06.11, владелец о цветной части 1: «графика всё же не как на предложенной картинке,
 * цветов мало»):
 *  - фон словаря (градиент, звёзды) и фиолетовые холмы GFC.ground под толпой: на входе — горизонт человека gfc_body (y 275,
 *    тот же рисунок), с отъездом поднимается к линии города HZ и идёт за камерой (не выше y 40); в a08 — свой горизонт за
 *    человеком (y 262), в a09 опускается под соты к y 300 (как холмы gfc_line/daily) и стоит до шва; по бокам земля гаснет
 *    своей маской gfcr-side (0…90, 270…360), чтобы у краёв сцены не было тёмной «коробки»;
 *  - люди, чья макушка заходит под надпись вверху (заголовок, таблетка подписи), мягко гаснут: надпись стоит на «небе»;
 *  - люди — плоские GFC.person шести цветов (коралл, бирюза, небо, розовый, зелёный, фиалка): в рядах и сотах соседи разного
 *    цвета; M — фиалка, как человек gfc_body; толпа-город и дальние — те же цвета в дымке;
 *  - крупный заголовок GFC.headline на каждой фразе (Montserrat 800 капсом, главное слово золотом), только когда вверху нет
 *    подписи-источника: a05 «НЕ ФИЗИКА, / А СРАВНЕНИЕ» (вторая строка — на «сравнение», вместо плашки gf_crowd) → «ГОРОД
 *    = ТЕЛО» («тело») → «ЧТО ЕГО ДЕРЖИТ?» («Почему»); a06 — подпись-источник «ХАРАРИ · SAPIENS · 2011» на таблетке, затем
 *    «ОБЩАЯ ВЕРА» («верят»); a07 «ВЕРА В БОГА» («вера») → «ОБЩИЕ ПРАВИЛА» («одни») → подпись-источник «БИБЛИЯ» со значком
 *    книги («Библии»); a08 «ПРАВИЛА ВНУТРИ» («хранит») → «БОГ ВИДИТ ВСЁ» («Бог»); a09 «ВЕРА ДЕРЖИТ» (гаснет к «Но»);
 *  - цветные значки GFC.node: a05 «незнакомых» — над семью головами «?»; a06 «дружба» — розовые сердца на бирюзовых дугах,
 *    «сплетни» — небесные «облачка речи» на сиреневых дугах; a07 «Библии» — бирюзовая книга у подписи;
 *  - огонь порядка — золотое солнце GFC.spark крупнее (r 9…11; в a09 — 8, как в gfc_line); нити к нему — градиент от цвета
 *    человека к золоту; сота «тела» a05 и круг под ногами — цвета своего человека; овал «≈150» — золотой, счёт на золотой
 *    таблетке; город — цветные дома с полоской крыши и тёплыми окнами; скрижали a07 — фиолетовые плиты с бликом, кантом,
 *    полосками и золотой точкой, на «Не убивай»/«Не кради» — золотой кант и тёплая вспышка;
 *  - чтобы заголовок не ложился на огонь и плиты: огонь a06 — (180,102), не (180,74); a07 — (180,92), не (180,54); плиты a07 —
 *    центры (96,132) и (264,132), не (116,112) и (244,112); огонь a08 — (284,104), не (274,62); M в a08 — рост 260, а не 292
 *    (голова под заголовком; рост как у человека gfc_body); город на 15 % ниже.
 *
 *  strangers (a05)  «Дальше — не физика, а сравнение. Город, страна — тоже «тело», только из незнакомых людей. Почему оно не
 *                   рассыпается?» Вход наплывом из gfc_body/pay: M — сам человек gfc_body, камера стоит. «не (физика)» —
 *                   заголовок «НЕ ФИЗИКА,», на «сравнение» — вторая строка «А СРАВНЕНИЕ»; «физика»…«сравнение» — отъезд
 *                   до ×1,55, рядом проявляются другие люди и земля; «Город» — отъезд до ×1,25: за толпой встаёт город на
 *                   горизонте холмов; «страна» — отъезд до ×1: дальние города, пунктир дороги с огоньками, 44 человечка
 *                   вдали; «тело» — вокруг каждого цветная сота-клетка, заголовок «ГОРОД = ТЕЛО»; «незнакомых» — соты
 *                   гаснут, у каждого свой цветной круг, над головами «?»; «почему» — «ЧТО ЕГО ДЕРЖИТ?»; «рассыпается» —
 *                   люди расходятся шагом.
 *  gossip (a06)     «Историк» — таблетка «ХАРАРИ · SAPIENS · 2011» (печатается, гаснет к «если»), наезд ×1,6; «дружба» —
 *                   бирюзовые дуги с огоньками и сердцами; «сплетни» — сиреневые дуги, облачка речи, по два огонька;
 *                   «держат группу» — группа сходится, чужие темнеют; «примерно» — отъезд ×1,25, золотой овал и счёт
 *                   0→150 к «пятидесяти»; «Дальше» — отъезд ×0,8 к толпе-городу, нити к чужим; «незнакомцы» — нити рвутся
 *                   со вспышкой; «работают вместе» — золотые огоньки летят вверх; «верят» — загорается солнце-огонь, от
 *                   каждого к нему цветная нить, «ОБЩАЯ ВЕРА»; «одно (и то же)» — свет бежит по всем нитям вверх.
 *  rules (a07)      наезд ×1,15, огонь чуть выше; «вера…Бога» — огонь крупнее, свет по нитям, «ВЕРА В БОГА»; «одни…всех» —
 *                   люди встают рядами, «ОБЩИЕ ПРАВИЛА»; «заповеди» — левая скрижаль «НЕ / УБИВАЙ», через 0,3 с правая
 *                   «НЕ / КРАДИ»; «Божьи» — огонь вспыхивает, к плитам золотые лучи; «Библии» — вверху «БИБЛИЯ» с книгой;
 *                   «Не убивай», «Не кради» — своя плита вспыхивает золотом.
 *  conscience (a08) «Верующий» — наезд на M во весь рост (260), остальные гаснут к «хранит», огонь вправо вверх; «хранит» —
 *                   плиты плывут ему в грудь, «ПРАВИЛА ВНУТРИ»; «совести» — в груди тёплый свет; «верит…Бог» — нить к
 *                   огню, «БОГ ВИДИТ ВСЁ»; «видит» — свет по нити к груди, вспышка; «нет свидетелей» — тело и холмы
 *                   темнеют, горят свет в груди, нить и огонь.
 *  order (a09)      до «Но» (дальше — gfc_line/daily): «Так» — отъезд к ×1, ряды, «ВЕРА ДЕРЖИТ»; «даёт» — каждый в свою
 *                   соту (цветные плитки, фигурки светлеют до кремовых), дальние — цветными точками на рёбра сот;
 *                   «рассыпаться» — нити от верхнего ряда к огню (180,88, r 8), волна света. Эта поза — шов с gfc_line/daily.
 * Слова-основы (GFC.w) — те же, что в gf_crowd (сверены с K.words):
 *   a05: не (0-е — «не физика»), физик, сравнен, город, страна, тело, незнаком, почему, рассыпа;
 *   a06: историк, дружб, сплетн, держат, групп, пример, ста, пятидесят, человек, дальше, незнаком, работа, если, верят, одно;
 *   a07: вера, бога, одни, заповед, божьи, библи, не (1 — «Не убивай»), убива, не (2), крад;
 *   a08: верующ, хранит, эти, совест, верит, бог, видит, нет, свидет;   a09: дает, рассыпа, но (конец заголовка).
 * Свои id в SVG: gfcr-tab, gfcr-warm, gfcr-sx, gfcr-side, gfcr-tN (нити). Важное — y 20..345 (кадр 360×640), подписи — с базовой линии ≥ 46.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GFC.hash(n);
  const qq = (t, a, b) => GFC.qq(t, a, b);
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const { PAL, INK, ACC, GOLD, mixC } = GFC;
  const WARM = '#ffd36b', CREAM = '#fff3e2', NIGHT = '#2a1b6a', HAZE = '#3b2d8e';
  const CRW = GFC.CROWD;                                         // коралл, бирюза, небо, розовый, зелёный, фиалка
  const A0 = 180, A1 = 230;                                      // якорь камеры: точка мира cam.c стоит здесь

  /* ---------------- раскладка — та же, что в gf_crowd (тот же hash) ---------------- */
  const COLS = 6, ROWS = 6, CR = 19.5, CX = 180, CY = 240;
  const CELLS = GFC.lattice(CX, CY, CR, COLS, ROWS);
  const HEXP = GFC.hexPts(CX, CY, CR, COLS, ROWS);
  const GC = [180, 270], GRX = 112, GRY = 46;
  const HS = 1.12;
  const hOf = gy => HS * (24 + (gy - 196) / 138 * 19);
  const SPOTS = (() => {
    const S = [[180, 330]];
    for (let k = 1; k < COLS * ROWS; k++) {
      let best = null, bd = -1;
      for (let c = 0; c < 16; c++) {
        const x = 34 + H(k * 31 + c * 7.7 + 100) * 292, gy = 190 + H(k * 17 + c * 3.3 + 200) * 142;
        let md = 1e9; for (const p of S) md = Math.min(md, Math.hypot(x - p[0], (gy - p[1]) * 2.4));
        if (md > bd) { bd = md; best = [x, gy]; }
      }
      S.push(best);
    }
    return S;
  })();
  const SLOT = (() => {
    const ids = SPOTS.map((_, i) => i).sort((a, b) => SPOTS[a][1] - SPOTS[b][1]), slot = new Array(ids.length);
    for (let j = 0; j < ROWS; j++) ids.slice(j * COLS, j * COLS + COLS).sort((a, b) => SPOTS[a][0] - SPOTS[b][0]).forEach((id, i) => { slot[id] = j * COLS + i; });
    return slot;
  })();
  const MI = SLOT[0];
  // цвет: M — цвет человека gfc_body (фиалка); остальные — по месту в рядах a07 / сотах a09: соседи в ряду и через ряд разные
  const tone = ci => mixC(PAL[ci][0], PAL[ci][1], .28);
  const GBC = (typeof SCENES !== 'undefined' && SCENES.gfc_body && SCENES.gfc_body.man && SCENES.gfc_body.man.color) || 'violet';
  const MCI = typeof GBC === 'number' ? GBC : GFC.NAME[GBC] ?? 3;
  const PPL = CELLS.map((c, k) => {
    const col = k % COLS, row = Math.floor(k / COLS);
    const C = { x: c[0], gy: c[1] + 12.5, h: 25 };
    const R = { x: 180 + (c[0] - 180) * 1.2, gy: 196 + row * 27.6, h: HS * (24 + row * 3.8) };
    const [sx, sgy] = SPOTS[SLOT.indexOf(k)];
    const S = { x: sx, gy: sgy, h: hOf(sgy) };
    const out = Math.atan2(sgy - 262, sx - 180) + (H(k * 13 + 5) - .5) * 1.6, dd = k === MI ? 3 : 16 + H(k * 13 + 6) * 16;
    let dx = Math.cos(out) * dd, dy = Math.sin(out) * dd * .45;
    dx = dx > 0 ? Math.min(dx, (340 - sx) * .45) : Math.max(dx, (20 - sx) * .45);
    dy = dy > 0 ? Math.min(dy, (336 - sgy) * .5) : Math.max(dy, (186 - sgy) * .5);
    const G = ((sx - GC[0]) / GRX) ** 2 + ((sgy - GC[1]) / GRY) ** 2 < 1;
    const P = { x: sx + (GC[0] - sx) * .26, gy: sgy + (GC[1] - sgy) * .26 };
    const d = Math.hypot((c[0] - CX) / 100, (c[1] - CY) / 80) / 1.25;
    const ci = k === MI ? MCI : CRW[(col + 2 * row + 1) % CRW.length];
    return Object.freeze({ k, col, row, C, R, S, P, dx, dy, G, d: clamp(d), seed: k + 7, ph: H(k * 3 + 11) * 6.283,
      ci, col0: tone(ci), light: PAL[ci][0] });
  });
  // фигурка в соте — тот же кремовый цвет, что у gfc_line/daily (FCOL там): шов без смены цвета
  const CELLC = CELLS.map((_, i) => mixC(PAL[Math.floor(H(i * 3.7 + 1) * 5)][0], CREAM, .82));
  const GIDX = PPL.filter(p => p.G && p.k !== MI).map(p => p.k).concat(PPL[MI].G ? [MI] : []);
  // дальние человечки (44): появляются на «страна», в a09 рассыпаются точками и стекаются на рёбра сот
  const FAR = (() => {
    const A = [];
    for (let i = 0; i < 44; i++) {
      let best = null, bd = -1;
      for (let c = 0; c < 12; c++) {
        const x = 14 + H(i * 41 + c * 5.3 + 700) * 332, gy = 142 + H(i * 23 + c * 2.9 + 800) * 44;
        let md = 1e9; for (const p of A) md = Math.min(md, Math.hypot(x - p.x, (gy - p.gy) * 2.2));
        if (md > bd) { bd = md; best = { x, gy }; }
      }
      const ci = CRW[Math.floor(H(i * 11 + 900) * CRW.length) % CRW.length];
      A.push({ ...best, h: HS * (14 + (best.gy - 142) / 44 * 7), ph: H(i * 3 + 7) * 6.283, col0: mixC(tone(ci), HAZE, .2), dot: PAL[ci][0] });
    }
    return Object.freeze(A.map(Object.freeze));
  })();
  const FDOT = [[0, -.88], [0, -.62], [-.16, -.52], [.16, -.52], [0, -.36], [-.09, -.12], [.09, -.12]];
  // a06 «Дальше»: толпа-город — ещё 46 человек вокруг (за краями кадра ×1 и спереди); видны только на отъезде ×0,8
  const OUTER = (() => {
    const A = [], occ = SPOTS.map(p => [p[0], p[1]]).concat(FAR.map(p => [p.x, p.gy]));
    for (let i = 0; i < 46; i++) {
      let best = null, bd = -1;
      for (let c = 0; c < 24; c++) {
        const x = -60 + H(i * 37 + c * 4.1 + 900) * 480, gy = 146 + H(i * 29 + c * 6.7 + 950) * 248;
        if ((x > 22 && x < 338 && gy > 182 && gy < 342) || (x > 8 && x < 352 && gy <= 182)) continue;
        let md = 1e9; for (const p of occ) md = Math.min(md, Math.hypot(x - p[0], (gy - p[1]) * 2.4));
        if (md > bd) { bd = md; best = [x, gy]; }
      }
      if (!best) continue;
      occ.push(best);
      const [x, gy] = best, h = gy < 190 ? HS * (14 + (gy - 142) / 44 * 7) : hOf(gy);
      const ci = CRW[Math.floor(H(i * 13 + 960) * CRW.length) % CRW.length];
      A.push(Object.freeze({ x, gy, h, seed: 300 + i, ph: H(i * 5 + 3) * 6.283, col0: mixC(tone(ci), HAZE, gy < 200 ? .22 : .08), light: PAL[ci][0] }));
    }
    return Object.freeze(A);
  })();
  // дуги «дружбы и сплетен»: каждый в группе — к двум ближайшим соседям по группе
  const ARCS = (() => {
    const seen = new Set(), A = [];
    for (const i of GIDX) {
      const near = GIDX.filter(j => j !== i).map(j => [j, Math.hypot(PPL[j].P.x - PPL[i].P.x, PPL[j].P.gy - PPL[i].P.gy)])
        .sort((a, b) => a[1] - b[1]).slice(0, 2);
      for (const [j, dist] of near) {
        const key = Math.min(i, j) + ':' + Math.max(i, j);
        if (dist < 95 && !seen.has(key)) { seen.add(key); A.push([i, j]); }
      }
    }
    return Object.freeze(A.map((a, n) => Object.freeze({ i: a[0], j: a[1], late: H(n * 5 + 3) > .5, ph: H(n * 9 + 1) * 6.283, n })));
  })();
  // значки на дугах: на каждой второй дуге своего вида — сердце (дружба) или облачко речи (сплетни)
  const ICON_ARCS = (() => {
    const fr = ARCS.filter(a => !a.late), go = ARCS.filter(a => a.late);
    return Object.freeze(fr.filter((_, i) => i % 2 === 0).concat(go.filter((_, i) => i % 2 === 0)).map(a => a.n));
  })();
  const SPEECH = '<g transform="scale(.86)"><path d="M-8.6 -7.4 H8.6 A2.8 2.8 0 0 1 11.4 -4.6 V3 A2.8 2.8 0 0 1 8.6 5.8 H-.6 L-6.6 10.2 V5.8 H-8.6 A2.8 2.8 0 0 1 -11.4 3 V-4.6 A2.8 2.8 0 0 1 -8.6 -7.4 Z" fill="#fff"/>' +
    '<circle cx="-5" cy="-.8" r="1.7" fill="#3b6fe0"/><circle cy="-.8" r="1.7" fill="#3b6fe0"/><circle cx="5" cy="-.8" r="1.7" fill="#3b6fe0"/></g>';
  // a05 «незнакомых»: над семью головами — «?» (кто это?); не M, по всей ширине
  const ASK = Object.freeze(PPL.filter(p => p.k !== MI && p.S.x > 40 && p.S.x < 320).map(p => p.k)
    .sort((a, b) => H(a * 19 + 3) - H(b * 19 + 3)).slice(0, 7));
  // a06 «Дальше»: нити с края группы наружу к ближайшему чужому (из толпы или толпы-города) — на «незнакомцы» рвутся
  const BREAKS = (() => {
    const edge = GIDX.map(i => [i, Math.hypot((PPL[i].P.x - GC[0]) / GRX, (PPL[i].P.gy - GC[1]) / GRY)]).sort((a, b) => b[1] - a[1]).slice(0, 12);
    const cand = PPL.filter(p => !p.G).map(p => ({ id: 'm' + p.k, x: p.S.x + p.dx, gy: p.S.gy + p.dy, k: p.k, o: -1 }))
      .concat(OUTER.map((p, j) => ({ id: 'o' + j, x: p.x, gy: p.gy, k: -1, o: j })));
    const used = new Set();
    return Object.freeze(edge.map(([i], n) => {
      const P = PPL[i].P, ox = P.x - GC[0], oy = P.gy - GC[1];
      let best = null, bd = 1e9;
      for (const q of cand) {
        if (used.has(q.id)) continue;
        const dx = q.x - P.x, dy = q.gy - P.gy;
        if (dx * ox + dy * oy <= 0) continue;
        const d = Math.hypot(dx, dy * 1.6);
        if (d > 24 && d < bd) { bd = d; best = q; }
      }
      if (!best) return null;
      used.add(best.id);
      return Object.freeze({ i, k: best.k, o: best.o, dl: n * .045 });
    }).filter(Boolean));
  })();
  const OVAL = (() => {
    const xs = GIDX.map(i => PPL[i].P.x), ys = GIDX.flatMap(i => [PPL[i].P.gy, PPL[i].P.gy - PPL[i].S.h]);
    const x0 = Math.min(...xs) - 12, x1 = Math.max(...xs) + 12, y0 = Math.min(...ys) - 6, y1 = Math.max(...ys) + 4;
    return Object.freeze({ cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, rx: (x1 - x0) / 2 * 1.12, ry: (y1 - y0) / 2 * 1.22 });
  })();
  const RISE = Object.freeze(Array.from({ length: 30 }, (_, n) => Object.freeze({
    k: n < 20 ? Math.floor(H(n * 7 + 1) * PPL.length) : -1, o: n >= 20 ? Math.floor(H(n * 11 + 2) * OUTER.length) : -1,
    d: H(n * 13 + 3) * .55, bend: (H(n * 17 + 4) - .5) * 60 })));

  /* ---------------- город a05: цветные дома на горизонте HZ, по краям дальние города, дорога ---------------- */
  const HZ = 141, CITYK = .85;
  const BFILL = ['#4b3aa8', '#3d4fb4', '#5a37b0', '#2f5aa8', '#6a3aa6', '#41369e'];
  const ROOF = [PAL[1][0], PAL[5][0], PAL[2][0], PAL[4][0], PAL[6][0], PAL[0][0]];
  const CITY = (() => {
    const B = [];
    const add = (x0, x1, h, far, i) => {
      const W = [];
      for (let y = HZ - 7; y > HZ - h + 4; y -= 6) for (let x = x0 + 3.5; x < x1 - 2.5; x += 5)
        if (H(x * 7.1 + y * 3.3 + i) > (far ? .72 : .6)) W.push([x, y]);
      const n = Math.floor(H(i * 5 + 7 + (far ? 50 : 0)) * 6);
      B.push(Object.freeze({ x0, x1, h, far, d: Math.abs((x0 + x1) / 2 - 180) / 180, W: Object.freeze(W),
        fill: far ? mixC(BFILL[n], HAZE, .45) : BFILL[n], roof: ROOF[(n + Math.floor(H(i * 3 + 2) * 3)) % 6] }));
    };
    let x = 64;
    for (let i = 0; x < 290; i++) {
      const w = 15 + 12 * H(i * 7 + 300), cx = x + w / 2;
      const h = CITYK * .82 * ((24 + 34 * H(i * 11 + 301)) * (1 - .45 * Math.abs(cx - 180) / 120) + (H(i * 13 + 302) > .8 ? 16 : 0));
      add(x, Math.min(296, x + w), h, 0, i);
      x += w + 2 + 3 * H(i * 17 + 303);
    }
    for (const [a, b] of [[-80, 58], [302, 440]]) {
      let x = a;
      for (let i = 0; x < b - 6; i++) {
        const w = 8 + 7 * H(i * 5 + a + 400), h = CITYK * (9 + 15 * H(i * 9 + a + 401));
        add(x, Math.min(b, x + w), h, 1, i + a);
        x += w + 1.5 + 2 * H(i * 3 + a + 402);
      }
    }
    return Object.freeze(B);
  })();
  // a06: тускнеет на «дружба», снова ярче на «Дальше» (толпа-город), тускнеет на «верят», гаснет к «вера» a07
  function citySvg(t, c, cam) {
    const A = qq(t, c.gor - .2, c.gor + .3) * (1 - .75 * qq(t, c.ist + .3, c.druzh + .2) + .75 * qq(t, c.dal - .1, c.dal + .6))
      * (1 - .6 * qq(t, c.ver - .1, c.ver + .5)) * (1 - qq(t, c.a7 - .1, c.vera));
    if (A <= .003) return '';
    let s = '';
    const WB = ['', '', '', ''], ww = 1.7 * cam.z, wh = 2.1 * cam.z;
    for (const b of CITY) {
      const t0 = b.far ? c.str - .1 + b.d * .4 : c.gor - .15 + b.d * .45, g = qq(t, t0, t0 + .55);
      if (g <= .003) continue;
      const top = HZ - b.h * g;
      const P = [[b.x0, HZ], [b.x0, top], [b.x1, top], [b.x1, HZ]].map(p => proj(cam, p[0], p[1]));
      if (P[2][0] < -5 || P[0][0] > 365) continue;
      const d = `M${P.map(p => f(p[0]) + ' ' + f(p[1])).join(' L')} Z`;
      s += `<g opacity="${b.far ? .8 : 1}"><path d="${d}" fill="${b.fill}"/><path d="${d}" fill="url(#gfc-shade)"/>` +
        `<path d="M${f(P[1][0])} ${f(P[1][1] + .9 * cam.z)} L${f(P[2][0])} ${f(P[2][1] + .9 * cam.z)}" stroke="${b.roof}" stroke-width="${f(Math.max(1.3, 1.8 * cam.z))}" opacity="${b.far ? .55 : .9}"/></g>`;
      b.W.forEach(([x, y], j) => {
        if (y <= top + 3) return;
        const a = (b.far ? .6 : 1) * (.62 + .38 * Math.sin(t * .9 + j * 2.3 + b.x0)), lv = Math.min(3, Math.floor(a * 4));
        const p = proj(cam, x, y);
        WB[lv] += `M${f(p[0] - ww / 2)} ${f(p[1] - wh / 2)}h${f(ww)}v${f(wh)}h${f(-ww)}Z`;
      });
    }
    WB.forEach((d, lv) => { if (d) s += `<path d="${d}" fill="#ffd98a" opacity="${f(.36 + .22 * lv)}"/>`; });
    const rd = qq(t, c.str - .05, c.str + .7);
    if (rd > .003) {
      const L = proj(cam, 180 - 260 * rd, HZ + 1), R = proj(cam, 180 + 260 * rd, HZ + 1), LP = [];
      s += `<line x1="${f(L[0])}" y1="${f(L[1])}" x2="${f(R[0])}" y2="${f(R[1])}" stroke="${WARM}" stroke-width="1.3" opacity=".65" stroke-dasharray="4 3" stroke-linecap="round"/>`;
      for (let i = 0; i < 14; i++) {
        const u = ((t * (.05 + .03 * H(i + 500)) + H(i * 3 + 501)) % 1) * 2 - 1;
        if (Math.abs(u) < rd) LP.push(proj(cam, 180 + 260 * u, HZ + 1));
      }
      s += GFC.dots(LP, { r: 1.6, op: .95, glow: .9, t, color: '#ffe6a8' });
    }
    return `<g opacity="${f(A)}">${s}</g>`;
  }

  /* ---------------- время от слов (как gf_crowd) ---------------- */
  function cues(K) {
    const w = (id, s, n = 0) => GFC.w(K, id, s, n), T = id => GFC.T(K, id);
    const c = {};
    c.a5 = T('a05'); c.uzhe = w('a05', 'не'); c.fiz = w('a05', 'физик'); c.lyud = w('a05', 'сравнен');
    c.gor = w('a05', 'город'); c.str = w('a05', 'страна'); c.telo = w('a05', 'тело');
    c.nez5 = w('a05', 'незнаком'); c.poch5 = w('a05', 'почему'); c.ras5 = w('a05', 'рассыпа');
    c.a6 = T('a06'); c.ist = w('a06', 'историк'); c.druzh = w('a06', 'дружб'); c.spl = w('a06', 'сплетн');
    c.derzh6 = w('a06', 'держат'); c.grup = w('a06', 'групп'); c.primer = w('a06', 'пример'); c.sta = w('a06', 'ста');
    c.pyat = w('a06', 'пятидесят');
    c.chel = w('a06', 'человек'); c.dal = w('a06', 'дальше'); c.nez6 = w('a06', 'незнаком'); c.rab = w('a06', 'работа');
    c.esli = w('a06', 'если'); c.ver = w('a06', 'верят'); c.odno = w('a06', 'одно');
    // «не» 0-е — это «ней», поэтому «Не убивай» — 1-е, «Не кради» — 2-е
    c.a7 = T('a07'); c.vera = w('a07', 'вера'); c.boga = w('a07', 'бога'); c.odni = w('a07', 'одни'); c.zap = w('a07', 'заповед');
    c.tab2 = c.zap + .3; c.bozh = w('a07', 'божьи'); c.bibl = w('a07', 'библи');
    c.ne1 = w('a07', 'не', 1); c.ubiv = w('a07', 'убива'); c.ne2 = w('a07', 'не', 2); c.krad = w('a07', 'крад');
    c.a8 = T('a08'); c.veru = w('a08', 'верующ'); c.oni = w('a08', 'хранит'); c.zhiv = w('a08', 'эти');
    c.sov = w('a08', 'совест'); c.verit = w('a08', 'верит'); c.bog8 = w('a08', 'бог'); c.vid = w('a08', 'видит');
    c.net = w('a08', 'нет'); c.svid = w('a08', 'свидет');
    c.a9 = T('a09'); c.pom = w('a09', 'дает'); c.ras9 = w('a09', 'рассыпа'); c.wave = c.ras9 + .3; c.no = w('a09', 'но');
    return c;
  }

  /* ---------------- камера: ключи по словам (как gf_crowd; a08 — рост 260 вместо 292) ---------------- */
  const key = (z, wx, wy, sx = A0, sy = A1) => ({ z, cx: wx - (sx - A0) / z, cy: wy - (sy - A1) / z });
  const mixK = (a, b, u) => ({ z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), u)), cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u) });
  const MH8 = 260;                                               // a08: рост M во весь кадр (голова под заголовком)
  function camera(t, c) {
    const M = PPL[MI], GB = SCENES.gfc_body && SCENES.gfc_body.man;
    const ZE = (GB ? GB.h : 258) / M.S.h;
    const K = [key(ZE, M.S.x, M.S.gy, 180, 330),   // вход: человек gfc_body
      key(1.55, 180, 280),                          // «сравнение»
      key(1.25, 180, 258),                          // «Город»
      key(1.02, 180, 250),                          // «страна»
      key(1.6, 180, 258),                           // «Историк … дружба»: наезд на группу
      key(1.25, 180, 258),                          // «примерно до ста»: овал целиком
      key(.8, 180, 250),                            // «Дальше … незнакомцы»: толпа-город
      key(1.15, 180, 234.3),                        // a07: ряды и плиты
      key(MH8 / M.R.h, M.R.x, M.R.gy, 160, 338),    // a08: M во весь рост
      key(1, A0, A1)];                              // a09: ×1 без сдвига
    const S = [[c.fiz - .1, c.lyud + .75], [c.gor - .15, c.gor + .7], [c.str - .1, c.str + .8], [c.ist + .3, c.druzh + .2],
      [c.primer - .1, c.sta + .15], [c.dal - .05, c.nez6 + .55], [c.a7 - .1, c.vera + .1], [c.a8 - .1, c.zhiv + .2],
      [c.a9 - .35, c.pom + .15]];
    let st = K[0];
    for (let j = 0; j < S.length; j++) {
      const [t0, t1] = S[j], nx = S[j + 1];
      if (t < t0) break;
      const cur = mixK(st, K[j + 1], qq(nx ? Math.min(t, nx[0]) : t, t0, t1));
      if (!nx || t < nx[0]) return { ...cur, ZE };
      st = cur;
    }
    return { ...st, ZE };
  }
  const proj = (cam, x, y) => [A0 + (x - cam.cx) * cam.z, A1 + (y - cam.cy) * cam.z];

  /* ---------------- люди: где кто в момент t (как gf_crowd) + дрожь и шаг ---------------- */
  function place(t, c) {
    const dq = qq(t, c.ras5 - .15, c.ras5 + 2.6);
    const jq = qq(t, c.nez5 - .1, c.nez5 + .5);
    const gq = qq(t, c.derzh6 - .1, c.grup + .6);
    const sq = qq(t, c.ver, c.odno + .4);
    const rq = qq(t, c.odni - .1, c.ne2 + .35);
    const gd = qq(t, c.derzh6, c.grup + .4) * (1 - qq(t, c.dal - .1, c.dal + .5));
    return PPL.map((p, k) => {
      const wob = (1 - rq) * (k === MI ? qq(t, c.fiz - .1, c.lyud + .9) : 1);
      let x = p.S.x + p.dx * dq + 2.4 * Math.sin(t * .45 + p.ph) * wob;
      let gy = p.S.gy + p.dy * dq + 1.1 * Math.cos(t * .37 + p.ph * 1.3) * wob;
      let h = p.S.h;
      if (p.G) { x = lerp(x, p.P.x, gq); gy = lerp(gy, p.P.gy, gq); }
      x = lerp(x, p.R.x, rq); gy = lerp(gy, p.R.gy, rq); h = lerp(h, p.R.h, rq);
      const cq = qq(t, c.pom - .1 + p.d * .55, c.pom + .5 + p.d * .55);
      x = lerp(x, p.C.x, cq); gy = lerp(gy, p.C.gy, cq); h = lerp(h, p.C.h, cq);
      const amp = (.55 + .9 * jq + 1.9 * dq * (p.G ? 1 - .75 * gq : 1)) * (1 - .45 * sq) * (1 - .7 * rq) * (1 - .5 * cq);
      return { x, gy, h, amp, cq, gdim: p.G ? 0 : gd };
    });
  }
  function crowd(t, c) {
    const A = place(t, c), B = place(t + .1, c);
    return A.map((s, k) => {
      const seed = PPL[k].seed, vx = (B[k].x - s.x) / .1, v = Math.hypot(vx, (B[k].gy - s.gy) / .1);
      const am = s.amp * (k === MI ? qq(t, c.fiz - .1, c.lyud + .9) : 1);   // M на входе стоит, как человек gfc_body
      const bx = am * .8 * Math.sin(t * 9.1 + seed * 2.3) * Math.sin(t * 1.3 + seed), by = am * .35 * Math.cos(t * 7.7 + seed);
      return { ...s, bx, by, walk: clamp((v - 3) / 9), dir: vx >= 0 ? 1 : -1 };
    });
  }
  const outerSt = (t, p) => ({ x: p.x + 2.2 * Math.sin(t * .45 + p.ph), gy: p.gy + 1 * Math.cos(t * .37 + p.ph), h: p.h,
    bx: .5 * Math.sin(t * 6.3 + p.seed), by: 0, walk: 0, dir: 1, cq: 0 });
  const head = s => [s.x + s.bx, s.gy + s.by - .88 * s.h];
  const crown = s => [s.x + s.bx, s.gy + s.by - 1.02 * s.h];
  const chest = s => [s.x + s.bx, s.gy + s.by - .56 * s.h];

  // BAND — низ надписей вверху кадра (заголовок, таблетка подписи) в этом кадре: люди, чья макушка заходит под надпись,
  // мягко гаснут (заголовок стоит на «небе», как в образце); ставится в начале body
  let BAND = 30;
  const bandFade = top => clamp((top - BAND + 30) / 34);
  function who(s, cam, t, o) {
    const [x, y] = proj(cam, s.x + s.bx, s.gy + s.by), h = s.h * cam.z;
    if (x + h * .45 < -10 || x - h * .45 > 370 || y - h > 650 || y + 4 < -10) return '';
    const edge = bandFade(y - h) * clamp((x + h * .1 + 10) / 40) * clamp((370 - x + h * .1) / 40);
    if (edge <= .003) return '';
    return GFC.person(x, y, h, { t, walk: s.walk, dir: s.dir, ...o, opacity: (o.opacity ?? 1) * edge });
  }
  const thread = (a, b, op, w = .5, color = '#fff', soft = false) => op <= .003 ? '' :
    `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${color}" stroke-width="${f(w)}" opacity="${f(op)}" stroke-linecap="round"${soft ? ' filter="url(#gfc-soft)"' : ''}/>`;
  const tline = (a, b, op, w, color) => thread(a, b, .32 * op, w * 3, color, true) + thread(a, b, op, w, color);
  const seg = (a, b, u0, u1) => [[lerp(a[0], b[0], u0), lerp(a[1], b[1], u0)], [lerp(a[0], b[0], u1), lerp(a[1], b[1], u1)]];
  const glowDot = (p, r, op, color = '#fff2c8') => op <= .003 ? '' :
    `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r * 2.8)}" fill="${WARM}" opacity="${f(op * .4)}" filter="url(#gfc-soft)"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="${color}" opacity="${f(op)}"/>`;
  const bez = (a, b, cc, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * cc[0] + u * u * b[0], v * v * a[1] + 2 * v * u * cc[1] + u * u * b[1]]; };
  // холмы GFC.ground: горизонт не выше 40 (иначе земля закрывает весь кадр); по бокам земля гаснет шире, чем маска словаря
  // (gfcr-side, 0…90 и 270…360): у краёв сцены нет тёмной «коробки» на фоне неба
  const land = (y, op, warm, seed) => op <= .003 ? '' : `<g mask="url(#gfcr-side)">${GFC.ground({ y: Math.max(40, y), op, warm, seed })}</g>`;

  /* ---------------- скрижаль a07: фиолетовая плита с аркой, блик, кант, полоски, золотая точка ---------------- */
  const TW = 112, TH = 92;
  const DEFS = `<defs><linearGradient id="gfcr-tab" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#a990ff"/><stop offset=".55" stop-color="#6c4fd9"/><stop offset="1" stop-color="#3c2a9e"/></linearGradient>` +
    `<linearGradient id="gfcr-sx" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="360" y2="0"><stop stop-color="#000"/><stop offset=".25" stop-color="#fff"/><stop offset=".75" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>` +
    `<mask id="gfcr-side" maskUnits="userSpaceOnUse" x="-400" y="-640" width="1160" height="1920" style="mask-type:luminance"><rect x="0" y="-640" width="360" height="1920" fill="url(#gfcr-sx)"/></mask>` +
    `<radialGradient id="gfcr-warm"><stop stop-color="#ffc070" stop-opacity=".7"/><stop offset=".35" stop-color="#ffa64a" stop-opacity=".25"/><stop offset="1" stop-color="#ff9e45" stop-opacity="0"/></radialGradient></defs>`;
  const archD = i => {
    const a = -TW / 2 + i, b = TW / 2 - i, yt = -TH / 2 + i, yb = TH / 2 - i, rr = (b - a) / 2;
    return `M${f(a)} ${f(yb)} L${f(a)} ${f(yt + rr * .55)} Q${f(a)} ${f(yt)} 0 ${f(yt)} Q${f(b)} ${f(yt)} ${f(b)} ${f(yt + rr * .55)} L${f(b)} ${f(yb)} Z`;
  };
  const TAB = archD(0), TABIN = archD(5);
  function tablet(q, hot, top, bot, t, t0) {
    if (q <= .003) return '';
    const k = GFC.ease(q), pop = lerp(.82, 1, k) * (1 + .06 * hot);
    const tc = hot > .02 ? mixC('#ffffff', '#ffe6a8', hot) : '#fff';
    let s = `<path d="${TAB}" transform="translate(3 7)" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>`;
    if (hot > .003) s += `<path d="${TAB}" fill="none" stroke="${WARM}" stroke-width="8" opacity="${f(.7 * hot)}" filter="url(#gfc-soft)"/>`;
    s += `<path d="${TAB}" fill="url(#gfcr-tab)"/><path d="${TAB}" fill="url(#gfc-shade)"/>`;
    if (hot > .003) s += `<path d="${TAB}" fill="#ffb46a" opacity="${f(.24 * hot)}"/>`;
    s += `<path d="${TABIN}" fill="none" stroke="#fff" stroke-opacity=".24" stroke-width="1"/>` +
      `<path d="${TAB}" fill="none" stroke="${hot > .02 ? mixC('#e6dcff', GOLD, hot) : '#e6dcff'}" stroke-width="${f(1.4 + 1.2 * hot)}" stroke-opacity="${f(.75 + .25 * hot)}"/>` +
      `<path d="M${f(-TW / 2 + 9)} ${f(-TH / 2 + 32)} Q${f(-TW / 2 + 10)} ${f(-TH / 2 + 11)} -14 ${f(-TH / 2 + 8)}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".42"/>` +
      [33, 39].map((y, n) => `<rect x="${f(-26 + n * 7)}" y="${y - .9}" width="${f(Math.max(.1, (52 - n * 14) * k))}" height="1.8" rx=".9" fill="#fff" opacity=".35"/>`).join('') +
      `<circle cx="0" cy="${f(-TH / 2 + 11)}" r="2.6" fill="${GOLD}"/>` +
      GFC.typed(0, -6, top, t, t0 + .06, { size: 19, cps: 30, op: 1, ls: .04, maxW: 96, color: tc, glow: hot > .15 }) +
      GFC.typed(0, 19, bot, t, t0 + .14, { size: 19, cps: 34, op: 1, ls: .04, maxW: 96, color: tc, glow: hot > .15 });
    return `<g opacity="${f(k)}" transform="scale(${pop.toFixed(3)})">${s}</g>`;
  }
  // подпись-таблетка по центру (БИБЛИЯ), со значком слева
  function pill(cx, y, text, op, size, icon, ic) {
    if (op <= .003) return '';
    const fs = GFC.fs(size), w = GFC.textW(text, fs, fs * .1) + 24, h = fs + 14, gx = icon ? 18 : 0;
    const x0 = cx - w / 2 + gx;
    return `<g opacity="${f(op)}"><rect x="${f(x0)}" y="${f(y - fs * .86 - 7 + 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="${INK}" opacity=".45"/>` +
      `<rect x="${f(x0)}" y="${f(y - fs * .86 - 7)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="#1a0f52" fill-opacity=".94" stroke="${ACC}" stroke-opacity=".8" stroke-width="1.2"/>` +
      GFC.mono(cx + gx, y, text, { size, anchor: 'middle', opacity: 1, color: '#ffe6a8', shadow: 0, ls: .1 }) +
      (icon ? GFC.node(x0 - 9, y - fs * .36, 15, icon, { color: ic, scale: .7 + .3 * op }) : '') + '</g>';
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), cam = camera(t, c), Z = cam.z, ST = crowd(t, c), M = ST[MI];
    const q8 = qq(t, c.a8 - .1, c.zhiv + .2) * (1 - qq(t, c.a9 - .35, c.pom + .15));
    const a9 = qq(t, c.a9 - .35, c.pom + .2);
    const gd = qq(t, c.derzh6, c.grup + .4) * (1 - qq(t, c.dal - .1, c.dal + .5));
    const othersA = t < c.a8 - .1 ? 1 - clamp((Z - 2) / 1.6) : Math.max(1 - qq(t, c.a8 - .1, c.oni + .1), a9);
    const farA = qq(t, c.str - .1, c.str + .5) * (1 - .55 * qq(t, c.odni, c.zap)) * (1 - qq(t, c.a8 - .1, c.zhiv)) * (1 - .45 * gd) + .45 * a9;
    const oa = qq(t, c.dal - .15, c.dal + .45) * (1 - qq(t, c.a7 - .1, c.vera));
    const OS = OUTER.map(p => outerSt(t, p));
    const headOf = (k, o) => k >= 0 ? head(ST[k]) : head(OS[o]);
    // огонь: a06 «верят» (180,102); a07 (180,92), крупнее; a08 вправо вверх от M (284,104); a09 над сотами (180,88, r 8)
    const spA = qq(t, c.ver - .1, c.ver + .5);
    const q7 = qq(t, c.a7 - .1, c.vera + .1), q9 = qq(t, c.a9 - .35, c.ras9 + .4);
    const spX = lerp(lerp(180, 284, q8), 180, q9), spY = lerp(lerp(lerp(102, 92, q7), 104, q8), 88, q9);
    const spR = lerp(9 + 2 * qq(t, c.vera, c.boga + .4), 8, q9) * (.35 + .65 * spA) * lerp(1, .9, q8)
      + 2.2 * pulse(t, c.odno, .15, .7) + 2 * pulse(t, c.bozh - .05, .15, .7) + 1.6 * pulse(t, c.vid - .1, .12, .6) * q8;
    const SP = [spX, spY];
    const k8 = q8 * (1 - q9), spRw = spR * lerp(1, 1.5, k8);
    const shine = spA * (1 - .55 * q8);
    const dark = qq(t, c.net - .05, c.svid + .3) * (1 - a9);
    const cs = qq(t, c.sov - .1, c.sov + .4) * (1 - .5 * qq(t, c.pom, c.ras9));
    let s = DEFS;
    // низ надписей вверху: заголовок в одну строку (акцент 39) — 65, в две строки — 108, таблетки подписей — 62…67
    const vis = (t0, t1) => qq(t, t0, t0 + .3) * (1 - qq(t, t1 - .35, t1));
    BAND = 30 + Math.max(0,
      vis(c.uzhe, c.gor - .02) * (lerp(66, 108, qq(t, c.lyud, c.lyud + .3)) + 6 - 30),
      Math.max(vis(c.telo - .05, c.poch5 - .02), vis(c.poch5, c.ist + .2), vis(c.ver, c.vera - .02), vis(c.vera, c.odni - .02),
        vis(c.odni, c.bibl - .02), vis(c.oni + .05, c.bog8 - .05), vis(c.bog8, c.a9), vis(c.a9 + .05, c.no + .05)) * (65 + 6 - 30),
      qq(t, c.ist + .2, c.ist + .5) * (1 - qq(t, c.esli - .3, c.esli + .2)) * (67 + 6 - 30),
      qq(t, c.bibl - .1, c.bibl + .3) * (1 - qq(t, c.a8 - .1, c.oni)) * (62 + 6 - 30));

    // холмы: вход — горизонт человека gfc_body (275, тот же рисунок seed 2), с отъездом a05 поднимается к линии города HZ
    // и дальше идёт с камерой (не выше 40); a08 — свой горизонт за M (262), в a09 опускается под соты к 300 (как HILLY
    // gfc_line/daily, seed 3) и стоит до шва
    const hyW = proj(cam, 180, HZ)[1], up5 = qq(t, c.fiz - .1, c.lyud + .75);
    s += land(lerp(275, Math.max(40, hyW), up5), 1 - qq(t, c.a8 - .1, c.zhiv + .2), .45 * spA, 2);
    const h8 = qq(t, c.a8 - .1, c.zhiv + .2) * (1 - .5 * dark * (1 - a9)) * (1 - .25 * a9);
    s += land(lerp(262, 300, a9), h8, .5 * cs * (1 - a9) + .25 * a9, 3);

    s += citySvg(t, c, cam);

    // дальние человечки → в a09 рассыпаются цветными точками на рёбра сот
    if (farA > .003) {
      const fq = qq(t, c.pom, c.wave + .2), pa = farA * (1 - qq(fq, 0, .3));
      FAR.forEach(p => {
        if (pa <= .003) return;
        const bx = 1.2 * Math.sin(t * .5 + p.ph), by = .5 * Math.cos(t * .43 + p.ph);
        const [x, y] = proj(cam, p.x + bx, p.gy + by), h = p.h * Z;
        if (x < -20 || x > 380 || y - h > 650 || y < -10) return;
        const bf = bandFade(y - h); if (bf <= .003) return;
        s += GFC.person(x, y, h, { color: p.col0, opacity: .92 * pa * bf, t, seed: p.ph * 3, shadow: .5, lit: .35 * shine, shade: .15 });
      });
      if (fq > .003) {
        const FP = [], FC = [];
        FAR.forEach(p => FDOT.forEach(([u, v]) => { FP.push(proj(cam, p.x + u * p.h, p.gy + v * p.h)); FC.push(p.dot); }));
        const HP = HEXP.map(p => proj(cam, p[0], p[1]));
        s += GFC.dots(GFC.morph(FP, HP, fq, t, { spread: .4, amp: 1.5, bend: 10 }),
          { r: lerp(1.1, 1.25, fq), op: lerp(.75 * farA, .88, fq) * qq(fq, 0, .2), glow: .4 + .3 * fq, t, color: i => FC[i % FC.length] });
      }
    }

    // соты a09: цветные плитки проявляются от центра; на «рассыпаться» — волна света
    const lit0 = qq(t, c.pom + .1, c.ras9 + .5);
    if (lit0 > .003) {
      const L = i => qq(t, c.pom + .15 + PPL[i].d * .55, c.pom + .7 + PPL[i].d * .55) * (.62 + .38 * qq(t, c.ras9, c.ras9 + .5));
      s += GFC.comb(CX, CY, CR, COLS, ROWS, { op: 1, w: .6, lit: i => L(i) * (.94 + .06 * Math.sin(t * 1.8 + i * 1.3)) });
      CELLS.forEach((cc, i) => {
        const wv = Math.exp(-((((t - c.wave) - PPL[i].d * .9) / .28) ** 2)) * qq(t, c.wave - .3, c.wave);
        if (wv > .01) s += GFC.hex(cc[0], cc[1], CR * .84 * (.5 + .5 * GFC.ease(L(i))), { fill: '#fff6dc', color: 'none', op: .38 * wv, shade: false });
      });
    }

    // a05 «тоже тело»: вокруг каждого встаёт сота-клетка его цвета; гаснут к «незнакомых»
    const celA = qq(t, c.telo - .1, c.telo + .3) * (1 - qq(t, c.nez5 - .05, c.nez5 + .45));
    if (celA > .003) {
      ST.forEach((st, k) => {
        const g = qq(t, c.telo - .1 + H(k * 5 + 4) * .3, c.telo + .25 + H(k * 5 + 4) * .3);
        if (g <= .003) return;
        const p = proj(cam, st.x, st.gy - .5 * st.h), r = .6 * st.h * Z * (.75 + .25 * g), L = PPL[k].light;
        s += GFC.hex(p[0], p[1], r, { op: .45 * celA * g, w: 4, color: L, glow: true }) +
          GFC.hex(p[0], p[1], r, { op: .95 * celA * g, w: 1.6, color: L, fill: mixC(L, INK, .55), shade: false }) +
          `<path d="M${f(p[0] - r * .6)} ${f(p[1] - r * .62)} L${f(p[0])} ${f(p[1] - r * .95)}" stroke="#fff" stroke-width="1.2" opacity="${f(.4 * celA * g)}" stroke-linecap="round"/>`;
      });
    }
    // a05 «незнакомых»: у каждого под ногами свой цветной круг (гаснут к «Историк»)
    const ringA = qq(t, c.nez5 - .1, c.nez5 + .45) * (1 - qq(t, c.ist, c.ist + .7));
    if (ringA > .003) {
      ST.forEach((st, k) => {
        const g = qq(t, c.nez5 - .1 + H(k * 7 + 9) * .35, c.nez5 + .3 + H(k * 7 + 9) * .35);
        if (g <= .003) return;
        const p = proj(cam, st.x, st.gy + 1), rx = .36 * st.h * Z * g, ry = .11 * st.h * Z * g;
        s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(rx)}" ry="${f(ry)}" fill="${PPL[k].light}" fill-opacity="${f(.16 * ringA)}" stroke="${PPL[k].light}" stroke-width="1.7" opacity="${f(.9 * ringA)}"/>`;
      });
    }

    // a06 овал «≈150» (на земле, под людьми); счёт — поверх людей
    const ovA = qq(t, c.primer - .1, c.primer + .3) * (1 - qq(t, c.ver, c.odno + .3));
    let label150 = '';
    if (ovA > .003) {
      const o = OVAL, cc = proj(cam, o.cx, o.cy), d = qq(t, c.primer - .1, c.pyat), rx = o.rx * Z, ry = o.ry * Z;
      const el = `cx="${f(cc[0])}" cy="${f(cc[1])}" rx="${f(rx)}" ry="${f(ry)}"`, draw = `pathLength="1" stroke-dasharray="${f(d)} 2"`;
      s += `<g opacity="${f(ovA)}"><ellipse ${el} fill="${GOLD}" opacity="${f(.1 * d)}"/>` +
        `<ellipse ${el} fill="none" stroke="${GOLD}" stroke-width="5" opacity=".32" filter="url(#gfc-soft)" ${draw}/>` +
        `<ellipse ${el} fill="none" stroke="${GOLD}" stroke-width="2.2" opacity=".95" stroke-linecap="round" ${draw}/></g>`;
      const n = Math.round(150 * qq(t, c.primer - .05, c.pyat - .06)), txt = '≈' + n, fs = GFC.fs(24);
      const lx = cc[0], ly = Math.max(98, cc[1] - ry - 14), pw = GFC.textW('≈150', fs, fs * .06) + 24, ph = fs + 12;
      label150 = `<g opacity="${f(ovA)}">` +
        `<rect x="${f(lx - pw / 2)}" y="${f(ly - fs * .86 - 6 + 2.5)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="${INK}" opacity=".5"/>` +
        `<rect x="${f(lx - pw / 2 - 3)}" y="${f(ly - fs * .86 - 9)}" width="${f(pw + 6)}" height="${f(ph + 6)}" rx="${f(ph / 2 + 3)}" fill="${GOLD}" opacity=".35" filter="url(#gfc-glow3)"/>` +
        `<rect x="${f(lx - pw / 2)}" y="${f(ly - fs * .86 - 6)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="${GOLD}"/>` +
        `<path d="M${f(lx - pw / 2 + ph * .45)} ${f(ly - fs * .86 - 3.5)} H${f(lx + pw / 2 - ph * .45)}" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>` +
        GFC.mono(lx, ly, txt, { size: 24, anchor: 'middle', opacity: 1, color: INK, shadow: 0, ls: .06 }) + '</g>';
    }

    // нити от каждого к огню (a06–a07): градиент от цвета человека к золоту; «одно и то же» — свет вверх по всем разом
    if (spA > .003) {
      const thA = (1 - .62 * qq(t, c.zap, c.zap + .6)) * (1 - qq(t, c.a8 - .1, c.veru + .3));
      const run = qq(t, c.vera - .1, c.boga + .5), run1 = qq(t, c.odno - .05, c.odno + .75);
      if (thA > .003) {
        const ends = [];
        ST.forEach((st, k) => { if (!(k === MI && t > c.a8)) ends.push([head(st), c.ver + H(k * 17 + 2) * .55, .62 * othersA, 1.2, PPL[k].light]); });
        if (oa > .003) OUTER.forEach((p, i) => { if (i % 2 === 0) ends.push([head(OS[i]), c.ver + .15 + H(i * 7 + 3) * .5, .42 * oa, 1, p.light]); });
        FAR.forEach((p, i) => { if (i % 2 === 0) ends.push([[p.x, p.gy - .86 * p.h], c.ver + .2 + H(i * 5 + 1) * .5, .34 * farA, .85, p.dot]); });
        let defs = '', ln = '';
        ends.forEach(([hd, st0, al, wd, col], n) => {
          const g = qq(t, st0, st0 + .35);
          if (g <= .003 || al <= .003) return;
          const A = proj(cam, ...hd), [p0, p1] = seg(A, SP, 0, g);
          defs += `<linearGradient id="gfcr-t${n}" gradientUnits="userSpaceOnUse" x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(SP[0])}" y2="${f(SP[1])}"><stop stop-color="${col}"/><stop offset="1" stop-color="${GOLD}"/></linearGradient>`;
          ln += thread(p0, p1, al * thA, wd, `url(#gfcr-t${n})`);
          for (const r of [run, run1]) if (r > 0 && r < 1 && g > .99) ln += glowDot(seg(A, SP, r, r)[0], 1.6, Math.min(1, 2 * al) * thA * Math.sin(r * Math.PI));
        });
        if (ln) s += `<defs>${defs}</defs>${ln}`;
      }
      const topA = qq(t, c.ras9, c.ras9 + .6) * spA;
      if (topA > .003) for (let i = 0; i < COLS; i++) {
        const cc = CELLS[i], A = proj(cam, cc[0], cc[1] - CR);
        s += thread([spX, spY + 8], A, .3 * topA, .9, GFC.SUN);
      }
    }

    // люди — все вместе по глубине (толпа-город, толпа, M): ближе — позже
    const look = (st, k, dim = 0) => {
      const depth = clamp((st.gy - 186) / 148), inCell = st.cq;
      let col = inCell > .003 ? mixC(PPL[k].col0, CELLC[k], inCell) : PPL[k].col0;
      const dd = Math.max(dim, .55 * st.gdim);
      if (dd > .003) col = mixC(col, NIGHT, .62 * dd);
      const rim = (st.x < spX ? 1 : -1) * .85 * shine * (1 - inCell) * (1 - dd);
      return { color: col, seed: inCell > .999 ? k + 1 : PPL[k].seed, shade: clamp((.26 * (1 - depth) + .5 * dd) * (1 - inCell)),
        lit: .5 * shine * (1 - .6 * inCell) * (1 - .8 * dd), rim, shadow: 1 - .5 * inCell };
    };
    const items = [];
    if (oa > .003) OUTER.forEach((p, i) => {
      const st = OS[i], depth = clamp((st.gy - 150) / 240), rim = (st.x < spX ? 1 : -1) * .7 * shine;
      items.push([st.gy, () => who(st, cam, t, { color: p.col0, seed: p.seed, shade: .3 * (1 - depth), lit: .45 * shine, rim, opacity: oa })]);
    });
    if (othersA > .003) {
      const dim = t > c.a8 - .1 ? q8 : 0;
      PPL.forEach((p, k) => { if (k !== MI) items.push([ST[k].gy, () => who(ST[k], cam, t, look(ST[k], k, dim))]); });
    }
    const drawM = () => {
      const GB = SCENES.gfc_body && SCENES.gfc_body.man;
      const big = GB && t < c.a8 - .1 ? clamp((Z - 2.6) / 2) : 0;
      let r = '';
      if (big > .003) {
        const ft = proj(cam, M.x, M.gy);
        r += `<g opacity="${f(big)}">${GFC.zoom(GB.svg(t, K), GB.foot[0], GB.foot[1], Z / cam.ZE, ft[0], ft[1])}</g>`;
      }
      if (big < .997) {
        const L = look(M, MI);
        if (M.cq <= .003) L.color = MCI;     // градиент палитры — как у человека gfc_body
        if (M.cq <= .999) L.seed = 0;
        const lm = t > c.a8 - .1 ? .5 * qq(t, c.sov - .1, c.sov + .5) * (1 - a9) : 0;
        r += who(M, cam, t, { ...L, lit: Math.max(L.lit, lm) * (1 - .8 * dark), shade: Math.max(L.shade * (1 - q8), dark),
          rim: L.rim * (1 - dark), opacity: (1 - big) * (1 - .35 * dark) });
      }
      return r;
    };
    items.sort((a, b) => a[0] - b[0]);
    if (othersA >= .999) {
      items.push([M.gy + .01, drawM]); items.sort((a, b) => a[0] - b[0]);
      for (const [, fn] of items) s += fn();
    } else {
      const layer = items.map(([, fn]) => fn()).join('');
      if (layer) s += `<g opacity="${f(othersA)}">${layer}</g>`;
      s += drawM();
    }

    // a05 «незнакомых»: над семью головами «?» — цветные значки (гаснут к «Историк»)
    const askA = qq(t, c.nez5 - .05, c.nez5 + .3) * (1 - qq(t, c.ist - .1, c.ist + .35)) * othersA;
    if (askA > .003) ASK.forEach((k, n) => {
      const st = ST[k], p = proj(cam, ...crown(st)), pop = qq(t, c.nez5 + n * .07, c.nez5 + n * .07 + .3);
      if (pop <= .003) return;
      s += GFC.node(p[0], p[1] - 13 + 1.2 * Math.sin(t * 2.3 + n), 10, 'question', { seed: n + 2, scale: .55 + .45 * pop, op: askA * pop * bandFade(p[1] - 22), glow: .7 });
    });

    // a06: дуги дружбы и сплетен (поверх людей) со значками, рвущиеся нити
    const arcA = (1 - .7 * qq(t, c.odni, c.zap + .3)) * (1 - qq(t, c.a8 - .1, c.zhiv)) * othersA;
    if (arcA > .003 && t > c.druzh - .1) {
      const icA = arcA * (1 - qq(t, c.dal - .15, c.dal + .35));
      for (const a of ARCS) {
        const t0 = a.late ? c.spl : c.druzh, g = qq(t, t0 - .05, t0 + .35);
        if (g <= .003) continue;
        const A = proj(cam, ...crown(ST[a.i])), B = proj(cam, ...crown(ST[a.j]));
        const dist = Math.hypot(B[0] - A[0], B[1] - A[1]), C = [(A[0] + B[0]) / 2, Math.min(A[1], B[1]) - dist * .32 - 5];
        const col = a.late ? '#f2b6ff' : '#7ff0de', dd = `M${f(A[0])} ${f(A[1])} Q${f(C[0])} ${f(C[1])} ${f(B[0])} ${f(B[1])}`;
        s += `<path d="${dd}" fill="none" stroke="${col}" stroke-width="4.5" opacity="${f(.3 * arcA)}" filter="url(#gfc-soft)" pathLength="1" stroke-dasharray="${f(g)} 2"/>` +
          `<path d="${dd}" fill="none" stroke="${col}" stroke-width="1.7" opacity="${f(.95 * arcA)}" stroke-linecap="round" pathLength="1" stroke-dasharray="${f(g)} 2"/>`;
        if (g > .9) {
          const n = t > c.spl + .2 ? 2 : 1;
          for (let m = 0; m < n; m++) {
            const u = .5 + .5 * Math.sin(t * 2.1 + a.ph + m * 2.6);
            s += glowDot(bez(A, B, C, u), 2, .95 * arcA, m ? WARM : '#ffffff');
          }
        }
        if (icA > .003 && ICON_ARCS.includes(a.n)) {
          const pop = qq(t, t0 + .2, t0 + .55), top = bez(A, B, C, .5);
          if (pop > .003) s += GFC.node(top[0], top[1] - 9 + Math.sin(t * 2 + a.ph), 8.5, a.late ? SPEECH : 'heart',
            { color: a.late ? 'sky' : 'pink', scale: .5 + .5 * pop, op: icA * pop, glow: .8 });
        }
      }
    }
    if (t > c.dal - .1 && t < c.ver + 1) {
      for (const b of BREAKS) {
        if (b.o >= 0 && oa <= .003) continue;
        const A = proj(cam, ...head(ST[b.i])), B = proj(cam, ...headOf(b.k, b.o));
        const grow = qq(t, c.dal + b.dl, c.nez6 - .05), snap = qq(t, c.nez6 + b.dl, c.nez6 + .5 + b.dl);
        const op = .95 * (1 - qq(t, c.nez6 + .5 + b.dl, c.nez6 + 1.1 + b.dl));
        if (snap <= .003) { const [p0, p1] = seg(A, B, 0, grow); s += tline(p0, p1, op, 1.8, '#9fd8ff') + (grow > .02 && grow < .98 ? glowDot(p1, 1.8, op, '#ffffff') : ''); }
        else {
          const gap = .5 * snap;
          const [p0, p1] = seg(A, B, 0, .5 - gap * .9), [p2, p3] = seg(A, B, .5 + gap * .9, 1);
          s += tline(p0, p1, op, 1.8, '#9fd8ff') + tline(p2, p3, op * .8, 1.8, '#9fd8ff') +
            glowDot(seg(A, B, .5, .5)[0], 3.6, pulse(t, c.nez6 + b.dl, .08, .45), '#ffffff');
        }
      }
    }

    // a07 скрижали под огнём: «заповеди» — левая с «НЕ / УБИВАЙ», через 0,3 с — правая с «НЕ / КРАДИ»; «Божьи» —
    // золотые лучи от огня; «Не убивай» / «Не кради» — своя плита вспыхивает; a08 «хранит» — плывут в грудь M
    const tbA = qq(t, c.zap - .1, c.zap + .3);
    if (tbA > .003) {
      const fly = qq(t, c.oni - .1, c.sov + .05), ch = proj(cam, ...chest(M));
      const L0 = [96, 132], R0 = [264, 132];
      const L = [lerp(L0[0], ch[0] - 5, fly), lerp(L0[1], ch[1], fly)], Rr = [lerp(R0[0], ch[0] + 5, fly), lerp(R0[1], ch[1], fly)];
      const sc = lerp(1, .06, fly), op = tbA * (1 - qq(t, c.sov - .25, c.sov + .1));
      const bz = pulse(t, c.bozh - .05, .15, 1.1);
      const beam = qq(t, c.bozh - .05, c.bozh + .4) * (1 - qq(t, c.a8 - .15, c.a8 + .3));
      if (beam > .003) for (const P of [L, Rr]) {
        const B = [P[0] + (P === L ? 22 : -22) * sc, P[1] - (TH / 2 - 8) * sc], [p0, p1] = seg(SP, B, 0, beam);
        s += `<g opacity="${f(op)}">${thread(p0, p1, .32 * (.4 + .6 * bz), 8, WARM, true)}${thread(p0, p1, .95 * (.55 + .45 * bz), 2.2, '#ffe6a8')}</g>`;
      }
      const one = (P, q, t0, tf, top, bot) => `<g transform="translate(${f(P[0])} ${f(P[1])}) scale(${sc.toFixed(3)})">${tablet(q, Math.max(pulse(t, tf - .05, .15, .9), .7 * bz), top, bot, t, t0)}</g>`;
      s += `<g opacity="${f(op)}">` +
        one(L, qq(t, c.zap - .05, c.zap + .45), c.zap, c.ne1, 'НЕ', 'УБИВАЙ') +
        one(Rr, qq(t, c.tab2 - .05, c.tab2 + .45), c.tab2, c.ne2, 'НЕ', 'КРАДИ') + '</g>';
    }

    // огонь (поверх нитей и плит); a08 — крупнее, тёплый ореол
    if (k8 > .003) s += `<circle cx="${f(spX)}" cy="${f(spY)}" r="${f(spRw * 6.5)}" fill="url(#gfcr-warm)" opacity="${f(.8 * k8 * spA)}"/>`;
    s += GFC.spark(spX, spY, spRw, { t, op: spA });

    // a06 «работают вместе»: золотые огоньки от голов летят вверх и сходятся там, где на «верят» загорится огонь
    if (t > c.rab - .1 && t < c.ver + .4) {
      const P = [], A = [], F = [180, 102];
      for (const r of RISE) {
        if (r.o >= 0 && oa <= .003) continue;
        const u = qq(t, c.rab - .05 + r.d, c.ver + .08);
        if (u <= 0 || u >= 1) continue;
        const A0p = proj(cam, ...headOf(r.k, r.o)), cc = [(A0p[0] + F[0]) / 2 + r.bend, Math.min(A0p[1], F[1]) - 20];
        P.push(bez(A0p, F, cc, u)); A.push(Math.sin(u * Math.PI) ** .5);
      }
      s += GFC.dots(P, { r: 2.4, op: 1, glow: 1, t, color: WARM, alpha: i => A[i] });
      const pre = qq(t, c.rab + .2, c.ver) * (1 - spA);
      if (pre > .003) s += glowDot(F, 2.4 * pre + .6, .9 * pre);
    }

    // a08 совесть: тёплый свет в груди, нить к огню на «верит…Бог»; «видит» — свет по нити к груди, вспышка
    if (cs > .003) {
      const ch = proj(cam, ...chest(M)), g = qq(t, c.verit - .05, c.bog8 + .15), lt = 1 - qq(t, c.a9 - .35, c.pom);
      const [p0, p1] = seg(ch, SP, 0, g);
      s += thread(p0, p1, .32 * cs * lt, 9, '#ffb35c', true) + thread(p0, p1, (.85 + .15 * dark) * cs * lt, 2.4, '#ffd9a0');
      const u = qq(t, c.vid, c.vid + .8);
      if (u > 0 && u < 1) s += glowDot(seg(SP, ch, u, u)[0], 3.2, Math.sin(u * Math.PI) * cs);
      const flare = 1 + .6 * pulse(t, c.vid + .75, .15, .6) + .25 * dark;
      const cr = lerp(12, 1.6, qq(t, c.a9 - .35, c.pom)) * flare;
      s += `<circle cx="${f(ch[0])}" cy="${f(ch[1])}" r="${f(cr * 7)}" fill="url(#gfcr-warm)" opacity="${f(.95 * cs)}"/>`;
      s += GFC.spark(ch[0], ch[1], cr, { t, op: cs, rays: 12 });
    }

    // подписи: «≈150»; a06 — подпись-источник «ХАРАРИ · SAPIENS · 2011» на таблетке; a07 — «БИБЛИЯ» с книгой
    s += label150;
    const thA = qq(t, c.ist + .2, c.ist + .5) * (1 - qq(t, c.esli - .3, c.esli + .2));
    if (thA > .003) {
      const TT = 'ХАРАРИ · SAPIENS · 2011', fs = 17, w = Math.min(316, GFC.textW(TT, fs, fs * .06) + 34);
      s += `<rect x="${f(180 - w / 2)}" y="${f(27 + 2)}" width="${f(w)}" height="40" rx="20" fill="${INK}" opacity="${f(.45 * thA)}"/>` +
        `<rect x="${f(180 - w / 2)}" y="27" width="${f(w)}" height="40" rx="20" fill="#1a0f52" fill-opacity="${f(.92 * thA)}" stroke="${ACC}" stroke-opacity="${f(.7 * thA)}" stroke-width="1.1"/>`;
    }
    s += GFC.thinker('ХАРАРИ · SAPIENS · 2011', t, c.ist + .2, c.esli + .2, { size: 17, y: 50, maxW: 290, ls: .06, color: '#ffe6a8' });
    s += pill(180, 52, 'БИБЛИЯ', qq(t, c.bibl - .1, c.bibl + .3) * (1 - qq(t, c.a8 - .1, c.oni)), 17, 'book', 'teal');

    // заголовки: ключевая мысль фразы, главное слово золотом; не ставятся под подписью-источником
    const HL = (txt, t0, t1, o = {}) => GFC.headline(txt, t, t0, t1, { y: 56, ...o });
    s += HL('Не физика, / а *сравнение*', c.uzhe, c.gor - .02, { y: 58, stagger: Math.max(.1, c.lyud - c.uzhe) });
    s += HL('Город = *тело*', c.telo - .05, c.poch5 - .02);
    s += HL('Что его *держит?*', c.poch5, c.ist + .2);
    s += HL('Общая *вера*', c.ver, c.vera - .02);
    s += HL('Вера *в Бога*', c.vera, c.odni - .02);
    s += HL('*Общие* правила', c.odni, c.bibl - .02);
    s += HL('Правила *внутри*', c.oni + .05, c.bog8 - .05);
    s += HL('Бог видит *всё*', c.bog8, c.a9);
    s += HL('Вера *держит*', c.a9 + .05, c.no + .05);
    return s;
  }

  SCENES.gfc_crowd = GFC.scene('gfc_crowd', (t, K, mode, p) => body(t, K));
})();
