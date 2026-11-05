/* gf_crowd — «Бог ещё не создан», часть 1 (eps/god_future_p1), фразы a05–a09: от одного человека к толпе незнакомцев,
 * что их держит (сплетни до ≈150, дальше — общая вера), общие правила, совесть одного, первый порядок — соты.
 * Раскадровка — eps/god_future/source/storyboard.md (строки a05–a09). Стиль — gf_00_lib.js (window.GF): чёрный фон,
 * люди из точек без лиц, нити, огонь порядка GF.spark, моно Plex капсом. Красного нет.
 * v15, второй проход по слепому просмотру v1 (05.11): на телефоне сцена ужата в .72 — люди на 12 % выше, точки крупнее
 * и ярче, нити ≥ 1,2 px, подписи моно ≥ 12; камера всё время работает на слово (наезд на группу, отъезд к толпе-городу,
 * наезд на одного во весь рост) — каждые 1,5–2,5 с новое событие. Плашку «ВЗГЛЯД АВТОРА» ставит story.py, сцена — нет.
 * Люди: 36 человек толпы — фигурки из 57 точек по схеме (голова-диск, шея, плечи, руки чуть в стороны, ноги врозь),
 * на крупном плане к ним добавляется облако GF.personPts; M (передний ряд, у центра) на входе — сам человек gf_body
 * (SCENES.gf_body.man), с отъездом — фигурка + облако 900 точек; вдали — 44 фигурки по 29 точек; на отъезде a06 —
 * ещё 46 человек вокруг (толпа-город). Где кто стоит — ровный случайный разброс; в ряды и соты встают по глубине.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра. Камера движка нейтральна,
 * своя камера — ключи (zoom, точка мира в якоре 180,230) по словам, между ключами — плавно (zoom по логарифму); точки
 * не растут вместе с камерой (растут расстояния), огонь, плиты и подписи стоят в кадре.
 *
 *  strangers (a05)  «Тот же вопрос — про людей, хоть это уже не физика. Город, страна — толпа незнакомцев. Почему она
 *                   не рассыпается?» Вход наплывом из gf_body/pay: M — сам человек gf_body, пока идёт наплыв, камера
 *                   стоит. «людей» — отъезд до ×1,55, рядом проявляются другие люди; «уже (не физика)» — вверху
 *                   плашка «ДАЛЬШЕ — НЕ ФИЗИКА» (моно 13); «Город» — отъезд до ×1,25: за толпой встаёт город (дома с
 *                   окнами от центра к краям); «страна» — отъезд до ×1: по краям дальние города, по горизонту пунктир
 *                   дороги с огоньками, вдали 44 фигурки; «незнакомцев» — у каждого под ногами свой круг, связей нет,
 *                   каждый дрожит сам по себе; «рассыпается» — люди разбредаются в стороны.
 *  gossip (a06)     «Историк» — подпись «ЮВАЛЬ НОЙ ХАРАРИ · «SAPIENS» · 2011» (моно 12, гаснет к «если»), наезд на
 *                   середину толпы (×1,6), круги гаснут; «дружба» — между соседями в группе дуги-нити (1,5 px), по ним
 *                   бегут огоньки; «сплетни» — ещё дуги, по каждой два тёплых огонька; «держат группу» — эти люди
 *                   сходятся теснее, чужие тускнеют; «примерно» — отъезд до ×1,25; «ста (пятидесяти)» — вокруг группы
 *                   рисуется овал, над ним моно «≈150» (22) со счётом 0→150; «Дальше» — отъезд до ×0,8 к толпе-городу:
 *                   город снова ярче, вокруг ещё 46 человек, от края группы к чужим тянутся нити; «незнакомцы» — нити
 *                   рвутся посередине со вспышкой; «работают вместе» — от голов вверх летят тёплые огоньки и сходятся в
 *                   одну точку; «верят» — там загорается огонь порядка (180,74), от каждого к нему нить, город тускнеет;
 *                   «одно (и то же)» — по всем нитям разом бежит свет вверх, огонь вспыхивает, овал гаснет.
 *  rules (a07)      «Для многих такой верой стала вера в Бога. С ней — одни заповеди на всех: «Не убивай», «Не кради».»
 *                   Начало — наезд до ×1,15 (толпа-город уходит за край), огонь поднимается (180,54); «вера…Бога» —
 *                   огонь крупнее, по нитям вверх бежит свет; «одни…всех» — люди встают ровными рядами; «заповеди» —
 *                   под огнём левая плита (112×92) сразу с надписью «НЕ / УБИВАЙ» (моно 18), «всех» — правая с
 *                   «НЕ / КРАДИ»; «Не убивай», «Не кради» — надпись своей плиты вспыхивает тёплым; нити — за плитами.
 *  conscience (a08) «Для верующего они живут в совести: Бог видит и там, где нет свидетелей.» «верующего» — наезд на M
 *                   до роста ≈290 px (во весь рост сцены, M чуть левее центра), остальные гаснут к «они», огонь —
 *                   вверх вправо (274,62); «они» — плиты уменьшаются и плывут ему в грудь; «совести» — в груди
 *                   крупный тёплый свет, от него нить к огню; «видит» — по нити от огня к груди бежит свет, свет в груди
 *                   вспыхивает; «нет свидетелей» — тело гаснет вполовину, горят только свет в груди, нить и огонь.
 *  order (a09)      кадр идёт до «Но» (дальше — gf_line/daily): «Так вера помогает толпе не рассыпаться.» «Так» —
 *                   отъезд к ×1, толпа снова в рядах, вдали фигурки; «помогает» — каждый уходит в свою соту (решётка
 *                   6×6, r 19,5, центр 180,240), дальние стекаются точками на рёбра сот; «рассыпаться» — соты светятся,
 *                   к огню (180,88, r 8) — нити от верхнего ряда, волна света. Эта поза — шов с gf_line/daily.
 * Слова-основы (GF.w(K, id, основа[, n])), сверены с K.words озвучки (05.11):
 *   a05: людей, уже, город, страна, незнаком, рассыпа;
 *   a06: историк, дружб, сплетн, держат, групп, пример, ста, человек, дальше, незнаком, работа, если, верят, одно;
 *   a07: вера, бога, одни, заповед, всех, не (1 — «Не убивай»; 0-е — «ней»), убива, не (2), крад;
 *   a08: верующ, они, жив, совест, видит, там, нет, свидет;
 *   a09: помогает, рассыпа. Нет слова — GF.w даёт начало фразы + n·0,4 с, без ошибки (так быть не должно).
 * Параметры p (story.py → storybase.build): s — id фразы, mode — имя кадра, K — cues.json, prev/prev_mode — наплыв
 * (делает GF.scene). SCENES.gf_crowd.body — сырой SVG. Нужна SCENES.gf_body.man (gf_body.js); без неё M — своя фигура.
 * Всё важное — y≈20..345 (кадр 360×640); ниже — пусто под субтитры. Пик ≈ 9 тыс. кружков и ≈ 130 нитей (a06 «верят»).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GF.hash(n);
  const qq = (t, a, b) => GF.qq(t, a, b);
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const WARM = '#ffe6bd';
  const A0 = 180, A1 = 230;                                      // якорь камеры: точка мира cam.c стоит здесь

  /* ---------------- раскладка (чистые константы, считаются один раз при загрузке) ---------------- */
  const COLS = 6, ROWS = 6, CR = 19.5, CX = 180, CY = 240;
  const CELLS = GF.lattice(CX, CY, CR, COLS, ROWS);          // a09: соты, индекс = ряд·COLS + столбец
  const HEXP = GF.hexPts(CX, CY, CR, COLS, ROWS);            // a09: точки на рёбрах сот (туда стекаются дальние)
  const GC = [180, 270], GRX = 112, GRY = 46;                 // a06: группа «до ста пятидесяти» (по ногам)
  const HS = 1.12;                                             // слепой просмотр v1: люди крупнее
  const hOf = gy => HS * (24 + (gy - 196) / 138 * 19);         // рост от глубины: дальше — меньше
  // a05: где стоят незнакомцы — ровный случайный разброс (лучший из 16 кандидатов); M — впереди у центра (180,330)
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
  // кто в какой ряд встанет (a07) и в какую соту уйдёт (a09): ряды по глубине, в ряду — слева направо (пути не путаются)
  const SLOT = (() => {
    const ids = SPOTS.map((_, i) => i).sort((a, b) => SPOTS[a][1] - SPOTS[b][1]), slot = new Array(ids.length);
    for (let j = 0; j < ROWS; j++) ids.slice(j * COLS, j * COLS + COLS).sort((a, b) => SPOTS[a][0] - SPOTS[b][0]).forEach((id, i) => { slot[id] = j * COLS + i; });
    return slot;
  })();
  const MI = SLOT[0];                                           // M — его сота и его ряд
  const PPL = CELLS.map((c, k) => {
    const col = k % COLS, row = Math.floor(k / COLS);
    const C = { x: c[0], gy: c[1] + 12.5, h: 25 };
    const R = { x: 180 + (c[0] - 180) * 1.2, gy: 196 + row * 27.6, h: HS * (24 + row * 3.8) };
    const [sx, sgy] = SPOTS[SLOT.indexOf(k)];
    const S = { x: sx, gy: sgy, h: hOf(sgy) };
    const out = Math.atan2(sgy - 262, sx - 180) + (H(k * 13 + 5) - .5) * 1.6, dd = k === MI ? 3 : 16 + H(k * 13 + 6) * 16;
    let dx = Math.cos(out) * dd, dy = Math.sin(out) * dd * .45;
    // у края кадра шаг короче (без упора в край — иначе люди встают друг на друга столбиком)
    dx = dx > 0 ? Math.min(dx, (340 - sx) * .45) : Math.max(dx, (20 - sx) * .45);
    dy = dy > 0 ? Math.min(dy, (336 - sgy) * .5) : Math.max(dy, (186 - sgy) * .5);
    const G = ((sx - GC[0]) / GRX) ** 2 + ((sgy - GC[1]) / GRY) ** 2 < 1;
    const P = { x: sx + (GC[0] - sx) * .26, gy: sgy + (GC[1] - sgy) * .26 };
    const d = Math.hypot((c[0] - CX) / 100, (c[1] - CY) / 80) / 1.25;   // 0 в центре сот … ≈1 по краям
    return Object.freeze({ k, col, row, C, R, S, P, dx, dy, G, d: clamp(d), seed: k + 7, ph: H(k * 3 + 11) * 6.283 });
  });
  // Маленький человек: точки по схеме (голова-диск, шея, плечи, туловище, руки чуть в стороны, ноги врозь) — читается
  // и при росте 25 px; рост 100, ноги в 0, оси как у GF.personPts. Каждому — свой разлёт рук и ног и свой разброс точек.
  function miniPts(seed) {
    const P = [], j = n => (H(seed * 97 + n) - .5) * 2.4, arm = H(seed * 5 + 1), leg = H(seed * 5 + 2);
    const add = (x, y) => { const n = P.length; P.push([x + j(n * 2), y + j(n * 2 + 1)]); };
    add(0, -91);
    for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + .3; add(4 * Math.cos(a), -91 + 4.4 * Math.sin(a)); }
    for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283; add(7.4 * Math.cos(a), -91 + 8.2 * Math.sin(a)); }
    for (let k = 0; k < 5; k++) add(-11 + k * 5.5, -77);
    for (let r = 0; r < 4; r++) { const y = -70 + r * 8.3, hw = 8 - r * .6; for (const u of [-1, 0, 1]) add(u * hw, y); }
    for (const sd of [-1, 1]) for (let k = 0; k < 5; k++) { const u = (k + 1) / 5; add(sd * lerp(13, 16 + 6 * arm, u), lerp(-75, -44, u)); }
    for (const sd of [-1, 1]) for (let k = 0; k < 7; k++) { const u = k / 6; add(sd * lerp(4.5, 5.5 + 4.5 * leg, u), lerp(-43, -1, u)); }
    return Object.freeze(P);
  }
  const TPL = PPL.map(p => miniPts(p.seed));                                       // фигура на общем плане (57 точек)
  const TPX = PPL.map(p => Object.freeze(GF.personPts(0, 0, 100, 90, p.seed)));    // + облако на крупном плане
  const MT = Object.freeze(GF.personPts(0, 0, 100, 900, 5));                       // M крупно (a05 вход, a08 во весь рост)
  const GIDX = PPL.filter(p => p.G && p.k !== MI).map(p => p.k).concat(PPL[MI].G ? [MI] : []);
  // дальние фигурки (44 маленьких человека вдали, 29 точек): появляются на «страна», в a09 стекаются на рёбра сот
  const FAR = (() => {
    const A = [];
    for (let i = 0; i < 44; i++) {
      let best = null, bd = -1;
      for (let c = 0; c < 12; c++) {
        const x = 14 + H(i * 41 + c * 5.3 + 700) * 332, gy = 142 + H(i * 23 + c * 2.9 + 800) * 44;
        let md = 1e9; for (const p of A) md = Math.min(md, Math.hypot(x - p.x, (gy - p.gy) * 2.2));
        if (md > bd) { bd = md; best = { x, gy }; }
      }
      A.push({ ...best, h: HS * (14 + (best.gy - 142) / 44 * 7), ph: H(i * 3 + 7) * 6.283, tpl: miniPts(200 + i).filter((_, j) => j % 2 === 0) });
    }
    return Object.freeze(A.map(Object.freeze));
  })();
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
      A.push(Object.freeze({ x, gy, h, seed: 300 + i, ph: H(i * 5 + 3) * 6.283,
        tpl: gy < 200 ? miniPts(300 + i).filter((_, j) => j % 2 === 0) : miniPts(300 + i) }));
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
    return Object.freeze(A.map((a, n) => Object.freeze({ i: a[0], j: a[1], late: H(n * 5 + 3) > .5, ph: H(n * 9 + 1) * 6.283 })));
  })();
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
  // овал группы — вокруг тел (ноги P.gy, головы на h выше)
  const OVAL = (() => {
    const xs = GIDX.map(i => PPL[i].P.x), ys = GIDX.flatMap(i => [PPL[i].P.gy, PPL[i].P.gy - PPL[i].S.h]);
    const x0 = Math.min(...xs) - 12, x1 = Math.max(...xs) + 12, y0 = Math.min(...ys) - 6, y1 = Math.max(...ys) + 4;
    return Object.freeze({ cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, rx: (x1 - x0) / 2 * 1.12, ry: (y1 - y0) / 2 * 1.22 });
  })();
  // a06 «работают вместе»: огоньки от голов летят вверх и сходятся в точку огня (k — человек толпы, o — толпы-города)
  const RISE = Object.freeze(Array.from({ length: 30 }, (_, n) => Object.freeze({
    k: n < 20 ? Math.floor(H(n * 7 + 1) * PPL.length) : -1, o: n >= 20 ? Math.floor(H(n * 11 + 2) * OUTER.length) : -1,
    d: H(n * 13 + 3) * .55, bend: (H(n * 17 + 4) - .5) * 60 })));

  // a05 «Город, страна»: город за толпой — контуры домов с окнами на горизонте HZ (встают от центра к краям); «страна» —
  // по краям встают дальние города, ниже и тусклее, по горизонту — пунктир дороги с огоньками. a06: тускнеет на «дружба»,
  // снова ярче на «Дальше» (толпа-город), тускнеет на «верят», гаснет к «вера» a07.
  const HZ = 141;
  const CITY = (() => {
    const B = [];
    const add = (x0, x1, h, far, i) => {
      const W = [];
      for (let y = HZ - 7; y > HZ - h + 4; y -= 6) for (let x = x0 + 3.5; x < x1 - 2.5; x += 5)
        if (H(x * 7.1 + y * 3.3 + i) > (far ? .72 : .6)) W.push([x, y]);
      B.push(Object.freeze({ x0, x1, h, far, d: Math.abs((x0 + x1) / 2 - 180) / 180, W: Object.freeze(W) }));
    };
    let x = 64;
    for (let i = 0; x < 290; i++) {
      const w = 15 + 12 * H(i * 7 + 300), cx = x + w / 2;
      const h = .82 * ((24 + 34 * H(i * 11 + 301)) * (1 - .45 * Math.abs(cx - 180) / 120) + (H(i * 13 + 302) > .8 ? 16 : 0));
      add(x, Math.min(296, x + w), h, 0, i);
      x += w + 2 + 3 * H(i * 17 + 303);
    }
    for (const [a, b] of [[-80, 58], [302, 440]]) {
      let x = a;
      for (let i = 0; x < b - 6; i++) {
        const w = 8 + 7 * H(i * 5 + a + 400), h = 9 + 15 * H(i * 9 + a + 401);
        add(x, Math.min(b, x + w), h, 1, i + a);
        x += w + 1.5 + 2 * H(i * 3 + a + 402);
      }
    }
    return Object.freeze(B);
  })();
  function citySvg(t, c, cam) {
    const A = qq(t, c.gor - .2, c.gor + .3) * (1 - .75 * qq(t, c.ist + .3, c.druzh + .2) + .75 * qq(t, c.dal - .1, c.dal + .6))
      * (1 - .6 * qq(t, c.ver - .1, c.ver + .5)) * (1 - qq(t, c.a7 - .1, c.vera));
    if (A <= .003) return '';
    let s = '';
    const win = [], wa = [];
    for (const b of CITY) {
      const t0 = b.far ? c.str - .1 + b.d * .4 : c.gor - .15 + b.d * .45, g = qq(t, t0, t0 + .55);
      if (g <= .003) continue;
      const top = HZ - b.h * g;
      const P = [[b.x0, HZ], [b.x0, top], [b.x1, top], [b.x1, HZ]].map(p => proj(cam, p[0], p[1]));
      if (P[2][0] < -5 || P[0][0] > 365) continue;
      s += `<path d="M${P.map(p => f(p[0]) + ' ' + f(p[1])).join(' L')}" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width="1.2" opacity="${b.far ? .62 : .88}" stroke-linejoin="round"/>`;
      b.W.forEach(([x, y], j) => { if (y > top + 3) { win.push(proj(cam, x, y)); wa.push((b.far ? .65 : 1) * (.7 + .3 * Math.sin(t * .9 + j * 2.3 + b.x0))); } });
    }
    const rd = qq(t, c.str - .05, c.str + .7);
    if (rd > .003) {
      const L = proj(cam, 180 - 260 * rd, HZ + 1), R = proj(cam, 180 + 260 * rd, HZ + 1);
      s += `<line x1="${f(L[0])}" y1="${f(L[1])}" x2="${f(R[0])}" y2="${f(R[1])}" stroke="#fff" stroke-width="1.2" opacity=".55" stroke-dasharray="4 3"/>`;
      for (let i = 0; i < 14; i++) {
        const u = ((t * (.05 + .03 * H(i + 500)) + H(i * 3 + 501)) % 1) * 2 - 1;
        if (Math.abs(u) < rd) { win.push(proj(cam, 180 + 260 * u, HZ + 1)); wa.push(1.5); }
      }
    }
    s += GF.dots(win, { r: 1.1, op: .85, glow: .7, t, color: WARM, alpha: i => wa[i] });
    return `<g opacity="${f(A)}">${s}</g>`;
  }

  /* ---------------- время от слов ---------------- */
  function cues(K) {
    const w = (id, s, n = 0) => GF.w(K, id, s, n), T = id => GF.T(K, id);
    const c = {};
    // a05: «Тот же вопрос — про людей, хоть это уже не физика. Город, страна — толпа незнакомцев. Почему она не рассыпается?»
    c.a5 = T('a05'); c.lyud = w('a05', 'людей'); c.uzhe = w('a05', 'уже'); c.gor = w('a05', 'город'); c.str = w('a05', 'страна');
    c.nez5 = w('a05', 'незнаком'); c.ras5 = w('a05', 'рассыпа');
    // a06: «Историк Юваль Ной Харари пишет: дружба и сплетни держат группу примерно до ста пятидесяти человек. Дальше
    //       незнакомцы работают вместе, если верят в одно и то же.»
    c.a6 = T('a06'); c.ist = w('a06', 'историк'); c.druzh = w('a06', 'дружб'); c.spl = w('a06', 'сплетн');
    c.derzh6 = w('a06', 'держат'); c.grup = w('a06', 'групп'); c.primer = w('a06', 'пример'); c.sta = w('a06', 'ста');
    c.chel = w('a06', 'человек'); c.dal = w('a06', 'дальше'); c.nez6 = w('a06', 'незнаком'); c.rab = w('a06', 'работа');
    c.esli = w('a06', 'если'); c.ver = w('a06', 'верят'); c.odno = w('a06', 'одно');
    // a07: «Для многих такой верой стала вера в Бога. С ней — одни заповеди на всех: «Не убивай», «Не кради».»
    // «не» 0-е — это «ней», поэтому «Не убивай» — 1-е, «Не кради» — 2-е
    c.a7 = T('a07'); c.vera = w('a07', 'вера'); c.boga = w('a07', 'бога'); c.odni = w('a07', 'одни'); c.zap = w('a07', 'заповед');
    c.vseh = w('a07', 'всех'); c.ne1 = w('a07', 'не', 1); c.ubiv = w('a07', 'убива'); c.ne2 = w('a07', 'не', 2);
    c.krad = w('a07', 'крад');
    // a08: «Для верующего они живут в совести: Бог видит и там, где нет свидетелей.»
    c.a8 = T('a08'); c.veru = w('a08', 'верующ'); c.oni = w('a08', 'они'); c.zhiv = w('a08', 'жив');
    c.sov = w('a08', 'совест'); c.vid = w('a08', 'видит'); c.tam = w('a08', 'там'); c.net = w('a08', 'нет'); c.svid = w('a08', 'свидет');
    // a09 до «Но»: «Так вера помогает толпе не рассыпаться.» — дальше («Но, как и в теле…») кадр gf_line/daily
    c.a9 = T('a09'); c.pom = w('a09', 'помогает'); c.ras9 = w('a09', 'рассыпа'); c.wave = c.ras9 + .3;
    return c;
  }

  /* ---------------- камера: ключи по словам ---------------- */
  // ключ — zoom z и точка мира (cx,cy), которая стоит в якоре (180,230); key(z, мир, экран) — точка мира в точке экрана.
  // Вход a05 — M ровно как человек gf_body (подошвы 180,330, рост GB.h); a09 в конце — ×1 без сдвига (шов с gf_line).
  const key = (z, wx, wy, sx = A0, sy = A1) => ({ z, cx: wx - (sx - A0) / z, cy: wy - (sy - A1) / z });
  const mix = (a, b, u) => ({ z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), u)), cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u) });
  function camera(t, c) {
    const M = PPL[MI], GB = SCENES.gf_body && SCENES.gf_body.man;
    const ZE = GB ? GB.h / M.S.h : 6;
    const K = [key(ZE, M.S.x, M.S.gy, 180, 330),   // вход: человек gf_body
      key(1.55, 180, 280),                          // «людей»
      key(1.25, 180, 258),                          // «Город»
      key(1.02, 180, 250),                          // «страна»
      key(1.6, 180, 258),                           // «Историк … дружба»: наезд на группу
      key(1.25, 180, 258),                          // «примерно до ста»: овал целиком
      key(.8, 180, 250),                            // «Дальше … незнакомцы»: толпа-город
      key(1.15, 180, 234.3),                        // a07: ряды и плиты
      key(292 / M.R.h, M.R.x, M.R.gy, 160, 338),    // a08: M во весь рост
      key(1, A0, A1)];                              // a09: ×1 без сдвига
    const S = [[c.a5 + .45, c.lyud + .75], [c.gor - .15, c.gor + .7], [c.str - .1, c.str + .8], [c.ist + .3, c.druzh + .2],
      [c.primer - .1, c.sta + .15], [c.dal - .05, c.nez6 + .55], [c.a7 - .1, c.vera + .1], [c.a8 - .1, c.zhiv + .2],
      [c.a9 - .35, c.pom + .15]];
    // отрезок j ведёт от состояния камеры в его начале к ключу j+1; начался следующий раньше конца — едет оттуда, где был
    let st = K[0];
    for (let j = 0; j < S.length; j++) {
      const [t0, t1] = S[j], nx = S[j + 1];
      if (t < t0) break;
      const cur = mix(st, K[j + 1], qq(nx ? Math.min(t, nx[0]) : t, t0, t1));
      if (!nx || t < nx[0]) return { ...cur, ZE };
      st = cur;
    }
    return { ...st, ZE };
  }
  const proj = (cam, x, y) => [A0 + (x - cam.cx) * cam.z, A1 + (y - cam.cy) * cam.z];

  /* ---------------- люди: где кто в момент t ---------------- */
  function crowd(t, c) {
    const dq = qq(t, c.ras5 - .15, c.ras5 + 2.6);            // a05 «не рассыпается?» — разбредаются
    const jq = qq(t, c.nez5 - .1, c.nez5 + .5);               // a05 «незнакомцев» — каждый дрожит сам по себе
    const gq = qq(t, c.derzh6 - .1, c.grup + .6);             // a06 «держат группу» — сходятся
    const sq = qq(t, c.ver, c.odno + .4);                     // a06 «верят» — общий огонь, разброд утихает
    const rq = qq(t, c.odni - .1, c.ne2 + .35);               // a07 «одни заповеди на всех» — ряды
    const gd = qq(t, c.derzh6, c.grup + .4) * (1 - qq(t, c.dal - .1, c.dal + .5));   // чужие тускнеют, пока держится группа
    return PPL.map((p, k) => {
      // M на входе a05 стоит ровно на месте человека gf_body; покачивание — с отъездом
      const wob = (1 - rq) * (k === MI ? qq(t, c.a5 + .45, c.lyud + .9) : 1);
      let x = p.S.x + p.dx * dq + 2.4 * Math.sin(t * .45 + p.ph) * wob;
      let gy = p.S.gy + p.dy * dq + 1.1 * Math.cos(t * .37 + p.ph * 1.3) * wob;
      let h = p.S.h;
      if (p.G) { x = lerp(x, p.P.x, gq); gy = lerp(gy, p.P.gy, gq); }
      x = lerp(x, p.R.x, rq); gy = lerp(gy, p.R.gy, rq); h = lerp(h, p.R.h, rq);
      const cq = qq(t, c.pom - .1 + p.d * .55, c.pom + .5 + p.d * .55);     // a09 «помогает» — в свою соту
      x = lerp(x, p.C.x, cq); gy = lerp(gy, p.C.gy, cq); h = lerp(h, p.C.h, cq);
      const amp = (.55 + .9 * jq + 1.9 * dq * (p.G ? 1 - .75 * gq : 1)) * (1 - .45 * sq) * (1 - .7 * rq) * (1 - .5 * cq);
      return { x, gy, h, amp, cq, lit: p.G ? 1 : 1 - .5 * gd };
    });
  }
  const outerSt = (t, p) => ({ x: p.x + 2.2 * Math.sin(t * .45 + p.ph), gy: p.gy + 1 * Math.cos(t * .37 + p.ph), h: p.h, amp: .8 });
  const head = s => [s.x, s.gy - .93 * s.h];
  const chest = s => [s.x, s.gy - .64 * s.h];

  // фигура: точки main — всегда, облако extra — с яркостью dense (крупный план); дрожь хаоса — амплитуда s.amp
  function figure(main, extra, s, cam, t, seed, dense, P, A, lit = 1) {
    const [sx, sy] = proj(cam, s.x, s.gy - s.h / 2), half = s.h * cam.z * .6;
    if (sx + half < -10 || sx - half > 370 || sy + half < -10 || sy - half > 650) return;   // вне кадра — не рисуем
    const bx = s.amp * .8 * Math.sin(t * 9.1 + seed * 2.3) * Math.sin(t * 1.3 + seed), by = s.amp * .35 * Math.cos(t * 7.7 + seed);
    const a = .3 + s.amp * .28;
    const put = (tpl, al, off) => {
      for (let i = 0; i < tpl.length; i++) {
        const u = tpl[i], n = i + off;
        const jx = a * Math.sin(t * (1.3 + H(n + seed) * 1.9) + n * 2.1), jy = a * Math.cos(t * (1.1 + H(n * 3 + seed) * 1.7) + n * 1.3);
        P.push(proj(cam, s.x + bx + u[0] * s.h / 100 + jx, s.gy + by + u[1] * s.h / 100 + jy));
        A.push(lit * al);
      }
    };
    put(main, 1, 0);
    if (extra && dense > .003) put(extra, dense, 500);
  }
  const line = (a, b, op, w = 1.2, col = '#fff') => op <= .003 ? '' :
    `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${col}" stroke-width="${w}" opacity="${f(op)}" stroke-linecap="round"/>`;
  const seg = (a, b, u0, u1) => [[lerp(a[0], b[0], u0), lerp(a[1], b[1], u0)], [lerp(a[0], b[0], u1), lerp(a[1], b[1], u1)]];
  const glowDot = (p, r, op, col = '#fff') => op <= .003 ? '' :
    `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r * 2.6)}" fill="${col}" opacity="${f(op * .4)}" filter="url(#un-soft)"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="${col}" opacity="${f(op)}"/>`;
  const bez = (a, b, cc, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * cc[0] + u * u * b[0], v * v * a[1] + 2 * v * u * cc[1] + u * u * b[1]]; };

  // скруглённая плита-скрижаль: арка сверху, контур рисуется с q, мягкий свет; hot — тёплая вспышка внутри
  function tablet(cx, cy, w, h, q, op, hot = 0) {
    if (op <= .003 || q <= .003) return '';
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, r = w / 2;
    const d = `M${f(x0)} ${f(y1)} L${f(x0)} ${f(y0 + r * .55)} Q${f(x0)} ${f(y0)} ${f(cx)} ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + r * .55)} L${f(x1)} ${f(y1)} Z`;
    const dash = `pathLength="1" stroke-dasharray="${f(q)} 2"`;
    return `<g opacity="${f(op)}"><path d="${d}" fill="#000" opacity="${f(.9 * q)}"/>
      <path d="${d}" fill="rgba(255,240,210,${f((.06 + .2 * hot) * q)})" stroke="#fff6e0" stroke-width="${f(3.2 + 2 * hot)}" opacity="${f(.32 + .3 * hot)}" filter="url(#un-soft)" ${dash}/>
      <path d="${d}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".95" stroke-linejoin="round" ${dash}/></g>`;
  }
  function plaque(cx, y, text, op, size = 13) {
    if (op <= .003) return '';
    const fs = UN.fs(size), w = text.length * fs * .6 + 16, h = fs + 10;
    return `<g opacity="${f(op)}"><rect x="${f(cx - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" stroke="#fff" stroke-width="1.2" opacity=".92"/>
      ${GF.mono(cx, y + fs * .36, text, { size, anchor: 'middle', opacity: .97 })}</g>`;
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), cam = camera(t, c), Z = cam.z, ST = crowd(t, c), M = ST[MI];
    const q8 = qq(t, c.a8 - .1, c.zhiv + .2) * (1 - qq(t, c.a9 - .35, c.pom + .15));   // a08: наезд на M (в a09 обратно)
    const a9 = qq(t, c.a9 - .35, c.pom + .2);                       // a09: толпа возвращается
    const gd = qq(t, c.derzh6, c.grup + .4) * (1 - qq(t, c.dal - .1, c.dal + .5));
    // кто виден: в a05 соседи проявляются при отъезде; в a08 гаснут к «они» (он один), в a09 возвращаются
    const othersA = t < c.a8 - .1 ? 1 - clamp((Z - 2) / 1.6) : Math.max(1 - qq(t, c.a8 - .1, c.oni + .1), a9);
    const dense = clamp((Z - 2) / 1.4), denseM = clamp((Z - 1.15) / 1.6);   // крупный план — фигуры плотнее
    const farA = qq(t, c.str - .1, c.str + .5) * (1 - .55 * qq(t, c.odni, c.zap)) * (1 - qq(t, c.a8 - .1, c.zhiv)) * (1 - .45 * gd) + .45 * a9;
    const oa = qq(t, c.dal - .15, c.dal + .45) * (1 - qq(t, c.a7 - .1, c.vera));   // толпа-город a06
    const OS = OUTER.map(p => outerSt(t, p));
    const headOf = (k, o) => k >= 0 ? head(ST[k]) : head(OS[o]);
    let s = '';

    // a05 «Город, страна»: за толпой встаёт город, на «страна» — по краям дальние города и огоньки дороги
    s += citySvg(t, c, cam);

    // дальние фигурки → в a09 стекаются на рёбра сот
    if (farA > .003) {
      const fq = qq(t, c.pom, c.wave + .2);
      const FP = [];
      FAR.forEach(p => {
        const bx = 1.2 * Math.sin(t * .5 + p.ph), by = .5 * Math.cos(t * .43 + p.ph);
        p.tpl.forEach((u, j) => FP.push(proj(cam, p.x + bx + u[0] * p.h / 100 + .25 * Math.sin(t * 1.7 + j + p.ph), p.gy + by + u[1] * p.h / 100)));
      });
      if (fq <= .003) s += GF.dots(FP, { r: 1.05, op: .74 * farA, glow: .35, t });
      else {
        const HP = HEXP.map(p => proj(cam, p[0], p[1]));
        s += GF.dots(GF.morph(FP.filter((_, i) => i % 4 === 0), HP, fq, t, { spread: .4, amp: 1.5, bend: 10 }),
          { r: 1.05, op: lerp(.74 * farA, .8, fq), glow: .35 + fq * .25, t });
      }
    }

    // соты a09
    const lit0 = qq(t, c.pom + .1, c.ras9 + .5);
    if (lit0 > .003) {
      s += GF.comb(CX, CY, CR, COLS, ROWS, {
        op: 1, w: .6,
        lit: (i, x, y) => {
          const d = PPL[i].d;
          const base = qq(t, c.pom + .15 + d * .55, c.pom + .7 + d * .55) * (.55 + .4 * qq(t, c.ras9, c.ras9 + .5));
          const wave = Math.exp(-((((t - c.wave) - d * .9) / .28) ** 2)) * qq(t, c.wave - .3, c.wave);
          return base * (.9 + .1 * Math.sin(t * 1.8 + i * 1.3)) + .4 * wave;
        },
      });
    }

    // огонь порядка: a06 «верят» загорается над толпой (180,74); a07 выше (180,54) и крупнее; a08 вверх вправо от M;
    // a09 — над сотами (180,88, r 8 — как в gf_line/daily)
    const spA = qq(t, c.ver - .1, c.ver + .5);
    const q7 = qq(t, c.a7 - .1, c.vera + .1), q9 = qq(t, c.a9 - .35, c.ras9 + .4);
    const spX = lerp(lerp(180, 274, q8), 180, q9), spY = lerp(lerp(lerp(74, 54, q7), 62, q8), 88, q9);
    const spR = (7 + qq(t, c.vera, c.boga + .4)) * (.35 + .65 * spA) * lerp(1, .9, q8)
      + 2.2 * pulse(t, c.odno, .15, .7) + 1.6 * pulse(t, c.vid - .1, .12, .6) * q8;
    const SP = [spX, spY];

    // a05 «незнакомцев»: у каждого под ногами свой круг — каждый сам по себе (гаснут к «Историк»)
    const ringA = qq(t, c.nez5 - .1, c.nez5 + .45) * (1 - qq(t, c.ist, c.ist + .7));
    if (ringA > .003) {
      ST.forEach((st, k) => {
        const g = qq(t, c.nez5 - .1 + H(k * 7 + 9) * .35, c.nez5 + .3 + H(k * 7 + 9) * .35);
        if (g <= .003) return;
        const p = proj(cam, st.x, st.gy + 1), rx = .34 * st.h * Z * g, ry = .1 * st.h * Z * g;
        s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.6 * ringA)}"/>`;
      });
    }

    // a06: овал «≈150», дуги дружбы и сплетен, рвущиеся нити
    const ovA = qq(t, c.sta - .1, c.chel) * (1 - qq(t, c.ver, c.odno + .3));
    let label150 = '';
    if (ovA > .003) {
      const o = OVAL, cc = proj(cam, o.cx, o.cy), d = qq(t, c.sta - .1, c.chel + .2), rx = o.rx * Z, ry = o.ry * Z;
      s += `<g opacity="${f(ovA)}"><ellipse cx="${f(cc[0])}" cy="${f(cc[1])}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".9" pathLength="1" stroke-dasharray="${f(d)} 2"/>
        <ellipse cx="${f(cc[0])}" cy="${f(cc[1])}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff6e0" stroke-width="4.5" opacity=".25" filter="url(#un-soft)" pathLength="1" stroke-dasharray="${f(d)} 2"/></g>`;
      // «≈150» над овалом, крупно, со счётом 0→150 на «ста пятидесяти»; поверх людей
      const n = Math.round(150 * qq(t, c.sta - .1, c.chel + .15)), txt = '≈' + n, fs = UN.fs(22);
      const lx = cc[0], ly = Math.max(40, cc[1] - ry - 12), w = txt.length * fs * .62 + 14;
      label150 = `<g opacity="${f(ovA * qq(t, c.sta - .1, c.sta + .2))}"><rect x="${f(lx - w / 2)}" y="${f(ly - fs * .95)}" width="${f(w)}" height="${f(fs * 1.25)}" rx="4" fill="#000" stroke="#fff" stroke-width="1" opacity=".85"/>
        ${GF.mono(lx, ly, txt, { size: 22, anchor: 'middle', opacity: .98, glow: true })}</g>`;
    }
    const arcA = (1 - .7 * qq(t, c.odni, c.zap + .3)) * (1 - qq(t, c.a8 - .1, c.zhiv)) * othersA;
    if (arcA > .003 && t > c.druzh - .1) {
      for (const a of ARCS) {
        const t0 = a.late ? c.spl : c.druzh, g = qq(t, t0 - .05, t0 + .35);
        if (g <= .003) continue;
        const A = proj(cam, ...head(ST[a.i])), B = proj(cam, ...head(ST[a.j]));
        const dist = Math.hypot(B[0] - A[0], B[1] - A[1]), C = [(A[0] + B[0]) / 2, Math.min(A[1], B[1]) - dist * .32 - 5];
        const dd = `M${f(A[0])} ${f(A[1] - 2)} Q${f(C[0])} ${f(C[1])} ${f(B[0])} ${f(B[1] - 2)}`;
        s += `<path d="${dd}" fill="none" stroke="#fff" stroke-width="1.5" opacity="${f(.85 * arcA)}" pathLength="1" stroke-dasharray="${f(g)} 2" stroke-linecap="round"/>` +
          `<path d="${dd}" fill="none" stroke="#fff6e0" stroke-width="4" opacity="${f(.2 * arcA)}" filter="url(#un-soft)" pathLength="1" stroke-dasharray="${f(g)} 2"/>`;
        if (g > .9) {
          // огоньки «сплетен» бегут по дуге туда-обратно; с «сплетни» — по два тёплых
          const n = t > c.spl + .2 ? 2 : 1;
          for (let m = 0; m < n; m++) {
            const u = .5 + .5 * Math.sin(t * 2.1 + a.ph + m * 2.6);
            s += glowDot(bez([A[0], A[1] - 2], [B[0], B[1] - 2], C, u), 2.1, .95 * arcA, m ? WARM : '#fff');
          }
        }
      }
    }
    if (t > c.dal - .1 && t < c.ver + 1) {
      for (const b of BREAKS) {
        const A = proj(cam, ...head(ST[b.i])), B = proj(cam, ...headOf(b.k, b.o));
        const grow = qq(t, c.dal + b.dl, c.nez6 - .05), snap = qq(t, c.nez6 + b.dl, c.nez6 + .5 + b.dl);
        const op = .9 * (1 - qq(t, c.nez6 + .5 + b.dl, c.nez6 + 1.1 + b.dl));
        const tl = (a, b, o) => line(a, b, o, 1.8) + line(a, b, .3 * o, 4.5, '#fff6e0');
        if (snap <= .003) { const [p0, p1] = seg(A, B, 0, grow); s += tl(p0, p1, op) + (grow > .02 && grow < .98 ? glowDot(p1, 2, op, WARM) : ''); }
        else {
          const gap = .5 * snap;
          const [p0, p1] = seg(A, B, 0, .5 - gap * .9), [p2, p3] = seg(A, B, .5 + gap * .9, 1);
          s += tl(p0, p1, op) + tl(p2, p3, op * .8) + glowDot(seg(A, B, .5, .5)[0], 3.8, pulse(t, c.nez6 + b.dl, .08, .45), WARM);
        }
      }
    }

    // нити от каждого к огню (a06–a07): толпа, толпа-город, дальние; «одно и то же» — по всем разом свет вверх
    if (spA > .003) {
      const thA = (1 - .62 * qq(t, c.zap, c.zap + .6)) * (1 - qq(t, c.a8 - .1, c.veru + .3));
      const run = qq(t, c.vera - .1, c.boga + .5), run1 = qq(t, c.odno - .05, c.odno + .75);
      if (thA > .003) {
        const ends = [];
        ST.forEach((st, k) => { if (!(k === MI && t > c.a8)) ends.push([head(st), c.ver + H(k * 17 + 2) * .55, .34 * othersA, 1.2]); });
        if (oa > .003) OUTER.forEach((p, i) => { if (i % 2 === 0) ends.push([head(OS[i]), c.ver + .15 + H(i * 7 + 3) * .5, .24 * oa, 1]); });
        FAR.forEach((p, i) => { if (i % 2 === 0) ends.push([[p.x, p.gy - .86 * p.h], c.ver + .2 + H(i * 5 + 1) * .5, .2 * farA, 1]); });
        for (const [hd, st0, al, wd] of ends) {
          const g = qq(t, st0, st0 + .35);
          if (g <= .003 || al <= .003) continue;
          const A = proj(cam, ...hd), [p0, p1] = seg(A, SP, 0, g);
          s += line(p0, p1, al * thA, wd);
          for (const r of [run, run1]) if (r > 0 && r < 1 && g > .99) s += glowDot(seg(A, SP, r, r)[0], 1.5, 2.4 * al * thA * Math.sin(r * Math.PI), WARM);
        }
      }
      const topA = qq(t, c.ras9, c.ras9 + .6) * spA;
      if (topA > .003) for (let i = 0; i < COLS; i++) {
        const cc = CELLS[i], A = proj(cam, cc[0], cc[1] - CR);
        s += line(A, SP, .3 * topA, 1);
      }
    }

    // люди (сзади вперёд): толпа-город, толпа; M — отдельно (при наезде у него 900 точек облака)
    const rDot = lerp(1.3 * Math.pow(Z, .3), 1.05, qq(t, c.pom, c.ras9 + .4));
    if (oa > .003) {
      const P = [], A = [];
      OUTER.map((p, i) => i).sort((a, b) => OS[a].gy - OS[b].gy).forEach(i => {
        const st = OS[i], depth = .72 + .28 * clamp((st.gy - 150) / 230);
        figure(OUTER[i].tpl, null, st, cam, t, OUTER[i].seed, 0, P, A, depth);
      });
      s += GF.dots(P, { r: 1.2 * Math.pow(Z, .3), op: .9 * oa, glow: .6, t, alpha: i => A[i] });
    }
    const order = PPL.map(p => p.k).filter(k => k !== MI).sort((a, b) => ST[a].gy - ST[b].gy);
    if (othersA > .003) {
      const P = [], A = [];
      for (const k of order) {
        const st = ST[k], depth = .78 + .22 * clamp((st.gy - 186) / 148);
        figure(TPL[k], TPX[k], st, cam, t, PPL[k].seed, dense, P, A, lerp(depth, 1, st.cq) * st.lit);
      }
      s += GF.dots(P, { r: rDot, op: othersA, glow: .7, t, alpha: i => A[i] });
    }
    // a08 «нет свидетелей»: тело гаснет вполовину — горит свет в груди
    const litM = 1 - .5 * qq(t, c.net - .05, c.svid + .3) * (1 - a9);
    {
      // a05 вход: M — сам человек gf_body (SCENES.gf_body.man: те же точки и соты в груди, подошвы 180,330, рост GB.h),
      // при отъезде уменьшается вместе с камерой и к ×2,6 сменяется своей фигурой толпы — наплыв без смены силуэта
      const GB = SCENES.gf_body && SCENES.gf_body.man;
      const big = GB && t < c.a8 - .1 ? clamp((Z - 2.6) / 2) : 0;
      if (big > .003) {
        const ft = proj(cam, M.x, M.gy);
        s += `<g opacity="${f(big)}">${GF.zoom(GB.svg(t, K), GB.foot[0], GB.foot[1], Z / cam.ZE, ft[0], ft[1])}</g>`;
      }
      if (big < .997) {
        const MP = [], MA = [];
        // облако M — по росту: мелкий M из 900 точек слипается в белое пятно (начало наезда a08)
        const nM = Math.round(MT.length * clamp((Z - 1.6) / 4.4));
        figure(TPL[MI], nM > 0 ? MT.slice(0, nM) : null, M, cam, t, 1, denseM, MP, MA, litM);
        // крупный M — мелкие точки (как человек gf_body), иначе облако слипается в белое пятно
        s += GF.dots(MP, { r: lerp(rDot, 1.2, clamp((Z - 1.5) / .8)), op: 1 - big, glow: lerp(.7, .5, clamp((Z - 1.5) / .8)), t, alpha: i => MA[i] });
      }
    }

    // a07 плиты под огнём: «заповеди» — левая сразу с «НЕ / УБИВАЙ», «всех» — правая с «НЕ / КРАДИ»; «Не убивай» /
    // «Не кради» — надпись своей плиты вспыхивает; a08 «они» — плиты уменьшаются и плывут в грудь M
    const tbA = qq(t, c.zap - .1, c.zap + .3);
    if (tbA > .003) {
      const fly = qq(t, c.oni - .1, c.sov + .05), ch = proj(cam, ...chest(M));
      const L0 = [116, 112], R0 = [244, 112], TW = 112, TH = 92;
      const L = [lerp(L0[0], ch[0] - 5, fly), lerp(L0[1], ch[1], fly)], Rr = [lerp(R0[0], ch[0] + 5, fly), lerp(R0[1], ch[1], fly)];
      const sc = lerp(1, .06, fly), op = tbA * (1 - qq(t, c.sov - .25, c.sov + .1));
      const one = (P, q, t0, tf, top, bot) => {
        if (q <= .003) return '';
        const hot = pulse(t, tf - .05, .15, .9);
        const txt = GF.typed(0, -9, top, t, t0 + .06, { size: 18, cps: 30, op: .98, glow: true }) +
          GF.typed(0, 17, bot, t, t0 + .14, { size: 18, cps: 34, op: .98, glow: true });
        const extra = [32, 38].map((y, n) => `<line x1="${f(-30 + n * 6)}" x2="${f(lerp(-30 + n * 6, 30 - n * 9, q))}" y1="${y}" y2="${y}" stroke="#fff" stroke-width="1" opacity=".42"/>`).join('');
        return `<g transform="translate(${f(P[0])} ${f(P[1])}) scale(${(sc * (1 + .06 * hot)).toFixed(3)})">${tablet(0, 0, TW, TH, q, 1, hot)}${extra}${txt}</g>`;
      };
      s += `<g opacity="${f(op)}">` +
        one(L, qq(t, c.zap - .05, c.zap + .45), c.zap, c.ne1, 'НЕ', 'УБИВАЙ') +
        one(Rr, qq(t, c.vseh - .05, c.vseh + .45), c.vseh, c.ne2, 'НЕ', 'КРАДИ') + '</g>';
    }

    // огонь (поверх нитей и плит)
    s += GF.spark(spX, spY, spR, { t, op: spA });

    // a06 «работают вместе»: огоньки от голов летят вверх и сходятся в точку, где на «верят» загорится огонь
    if (t > c.rab - .1 && t < c.ver + .4) {
      const P = [], A = [];
      for (const r of RISE) {
        if (r.o >= 0 && oa <= .003) continue;
        const u = qq(t, c.rab - .05 + r.d, c.ver + .08);
        if (u <= 0 || u >= 1) continue;
        const A0p = proj(cam, ...headOf(r.k, r.o)), cc = [(A0p[0] + 180) / 2 + r.bend, Math.min(A0p[1], 74) - 20];
        P.push(bez(A0p, [180, 74], cc, u)); A.push(Math.sin(u * Math.PI) ** .5);
      }
      s += GF.dots(P, { r: 2.4, op: 1, glow: 1, t, color: WARM, alpha: i => A[i] });
      const pre = qq(t, c.rab + .2, c.ver) * (1 - spA);
      if (pre > .003) s += glowDot([180, 74], 2.4 * pre + .6, .9 * pre, WARM);
    }

    // a08 совесть: крупный тёплый свет в груди и нить к огню; «видит» — свет по нити от огня к груди, вспышка
    const cs = qq(t, c.sov - .1, c.sov + .4) * (1 - .5 * qq(t, c.pom, c.ras9));
    if (cs > .003) {
      const ch = proj(cam, ...chest(M)), g = qq(t, c.sov + .1, c.vid), lt = 1 - qq(t, c.a9 - .35, c.pom);   // нить уходит с отъездом a09
      const [p0, p1] = seg(ch, SP, 0, g), dark = 1 - litM;
      s += line(p0, p1, (.8 + .2 * dark) * cs * lt, 1.6, '#fff6e0') + `<line x1="${f(p0[0])}" y1="${f(p0[1])}" x2="${f(p1[0])}" y2="${f(p1[1])}" stroke="#fff6e0" stroke-width="5" opacity="${f(.22 * cs * lt)}" filter="url(#un-soft)"/>`;
      const u = qq(t, c.vid, c.vid + .8);
      if (u > 0 && u < 1) s += glowDot(seg(SP, ch, u, u)[0], 2.6, Math.sin(u * Math.PI) * cs, WARM);
      const flare = 1 + .6 * pulse(t, c.vid + .75, .15, .6) + .25 * dark;
      const cr = lerp(9, 1.6, qq(t, c.a9 - .35, c.pom)) * flare;
      s += `<circle cx="${f(ch[0])}" cy="${f(ch[1])}" r="${f(cr * 8)}" fill="url(#gf-warm)" opacity="${f(.9 * cs)}"/>`;
      s += GF.spark(ch[0], ch[1], cr, { t, op: cs });
    }

    // подписи: a05 «уже не физика» — плашка; a06 мыслитель; a06 «≈150»
    s += label150;
    s += plaque(180, 46, 'ДАЛЬШЕ — НЕ ФИЗИКА', qq(t, c.uzhe - .1, c.uzhe + .35) * (1 - qq(t, c.a6 - .15, c.a6 + .15)));
    const thA = qq(t, c.ist + .2, c.ist + .5) * (1 - qq(t, c.esli - .3, c.esli + .2));
    if (thA > .003) s += `<rect x="28" y="${f(46 - UN.fs(12) - 2)}" width="304" height="${f(UN.fs(12) + 14)}" rx="3" fill="#000" opacity="${f(.85 * thA)}"/>`;
    s += GF.thinker('ЮВАЛЬ НОЙ ХАРАРИ · «SAPIENS» · 2011', t, c.ist + .2, c.esli + .2, { size: 12, y: 46 });
    return s;
  }

  SCENES.gf_crowd = GF.scene('gf_crowd', (t, K, mode, p) => body(t, K));
})();
