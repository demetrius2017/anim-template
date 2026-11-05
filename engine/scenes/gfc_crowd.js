/* gfc_crowd — «Бог ещё не создан», альтернативная версия «Цветная инфографика», часть 1 (eps/god_future_color_p1),
 * фразы a05–a09 до «Но»: сцены gf_crowd.js основной версии, перерисованные словарём gfc_00_lib.js (window.GFC).
 * Сценарий тот же, что у gf_crowd (события, слова-основы, камера по словам, порядок): от одного человека к толпе
 * незнакомцев, что их держит (сплетни до ≈150, дальше — общая вера), общие правила, совесть одного, первый порядок — соты.
 * Раскадровка — eps/god_future/source/storyboard.md (строки a05–a09), текст — source/text_v15.md.
 * v15, второй проход по слепому просмотру v1 (05.11), перенос правок gf_crowd: на телефоне сцена ужата в .72 — люди на
 * 12 % выше, нити толще (≥ 1 px, с мягким свечением), подписи крупнее (плашка 13, мыслитель 12 на тёмной таблетке,
 * «≈150» — 22 со счётом 0→150, карточки правил 18); камера всё время работает на слово (наезд на группу, отъезд к
 * толпе-городу, наезд на одного во весь рост) — каждые 1,5–2,5 с новое событие. Плашку «ВЗГЛЯД АВТОРА» ставит story.py.
 * Стиль: фон словаря (градиент, звёзды — GFC.wrap), люди — плоские GFC.person без лиц (палитра: коралл, бирюза, небо,
 * фиалка), огонь порядка — GFC.spark, соты — цветные плитки GFC.comb, частицы — цветные GFC.dots, нити — тёплые линии
 * со свечением, подписи — Montserrat капсом. Красного нет (опасности в этих фразах нет). Скрижалей нет: правила a07 —
 * две скруглённые карточки инфографики (не религиозный символ), текст на них — сразу с карточкой.
 * Раскладка людей — та же, что в gf_crowd (тот же hash): 36 человек толпы, M (передний ряд, у центра) — тот, за кем идёт
 * камера; вдали 44 маленьких человека; на отъезде a06 — ещё 46 человек вокруг (толпа-город); город и дальние города
 * a05 — плоские цветные дома с тёплыми окнами. Двигаются люди шагом (o.walk от скорости).
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра. Камера движка нейтральна,
 * своя камера — ключи (zoom, точка мира в якоре 180,230) по словам, между ключами — плавно (zoom по логарифму), как в
 * gf_crowd; фигуры и дома растут с камерой, огонь, карточки и подписи стоят в кадре.
 *
 *  strangers (a05)  вход наплывом из gfc_body/pay: M — сам человек gfc_body (SCENES.gfc_body.man: {svg(t,K), foot, h,
 *                   color}), камера стоит. «людей» — отъезд до ×1,55, к ×2,6 человек gfc_body сменяется фигурой толпы,
 *                   рядом проявляются другие люди и площадка; «уже (не физика)» — вверху плашка «ДАЛЬШЕ — НЕ ФИЗИКА»
 *                   (13); «Город» — отъезд до ×1,25: за толпой встают дома с окнами от центра к краям; «страна» — отъезд
 *                   до ×1: по краям дальние города, по горизонту пунктир дороги с огоньками, вдали 44 человечка;
 *                   «незнакомцев» — у каждого под ногами свой цветной круг, связей нет, каждый дрожит сам по себе;
 *                   «рассыпается» — люди расходятся шагом в стороны.
 *  gossip (a06)     «Историк» — GFC.thinker «ЮВАЛЬ НОЙ ХАРАРИ · «SAPIENS» · 2011» (12, на тёмной таблетке, гаснет к
 *                   «если»), наезд на середину толпы (×1,6), круги гаснут; «дружба» — бирюзовые дуги между соседями в
 *                   группе, по ним бегут огоньки; «сплетни» — ещё сиреневые дуги, по каждой два огонька (белый и тёплый);
 *                   «держат группу» — эти люди сходятся теснее, чужие темнеют; «примерно» — отъезд до ×1,25; «ста» —
 *                   вокруг группы золотой овал, над ним золотая таблетка «≈150» (22) со счётом 0→150; «Дальше» — отъезд
 *                   до ×0,8 к толпе-городу: город снова ярче, вокруг ещё 46 человек, от края группы к чужим тянутся нити;
 *                   «незнакомцы» — нити рвутся посередине со вспышкой; «работают вместе» — от голов вверх летят тёплые
 *                   огоньки и сходятся в одну точку; «верят» — там загорается огонь порядка (180,74), от каждого к нему
 *                   нить, город тускнеет; «одно (и то же)» — по всем нитям разом бежит свет вверх, огонь вспыхивает.
 *  rules (a07)      начало — наезд до ×1,15 (толпа-город уходит за край), огонь поднимается (180,54); «вера…Бога» —
 *                   огонь крупнее, по нитям вверх бежит свет; «одни…всех» — люди встают в ровные ряды; «заповеди» — под
 *                   огнём левая карточка (112×92, бирюзовая метка) сразу с «НЕ / УБИВАЙ» (18), «всех» — правая (небесная)
 *                   с «НЕ / КРАДИ»; «Не убивай», «Не кради» — своя карточка вспыхивает тёплым.
 *  conscience (a08) «верующего» — наезд на M до роста ≈290 px (во весь рост сцены, чуть левее центра), остальные гаснут
 *                   к «они» — он один; огонь — вверх вправо (274,62); «они» — карточки уменьшаются и плывут ему в грудь;
 *                   «совести» — в груди крупный тёплый свет, от него нить к огню; «видит» — по нити от огня к груди
 *                   бежит свет, свет в груди вспыхивает; «нет свидетелей» — тело темнеет, горят свет в груди, нить, огонь.
 *  order (a09)      кадр идёт до «Но» (дальше — gfc_line/daily): «Так» — отъезд к ×1, толпа снова в рядах, вдали
 *                   человечки; «помогает» — каждый уходит в свою соту (6×6, r 19,5, центр 180,240; от центра к краям),
 *                   плитки проявляются, люди в сотах светлеют до кремовых силуэтов, дальние рассыпаются цветными точками
 *                   на рёбра сот; «рассыпаться» — от верхнего ряда к огню (180,88, r 8) нити, по сотам волна света.
 *                   Эта поза — шов с gfc_line/daily.
 * Слова-основы (GFC.w) — те же, что в gf_crowd, сверены с K.words озвучки:
 *   a05: людей, уже, город, страна, незнаком, рассыпа;
 *   a06: историк, дружб, сплетн, держат, групп, пример, ста, человек, дальше, незнаком, работа, если, верят, одно;
 *   a07: вера, бога, одни, заповед, всех, не (1 — «Не убивай»; 0-е — «ней»), убива, не (2), крад;
 *   a08: верующ, они, жив, совест, видит, там, нет, свидет;   a09: помогает, рассыпа.
 * Свои id в SVG: gfcc-card (заливка карточек). Важное — y≈40..345 (кадр 360×640), ниже — фон под субтитры.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => GFC.hash(n);
  const qq = (t, a, b) => GFC.qq(t, a, b);
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const { PAL, INK, ACC, mixC } = GFC;
  const WARM = '#ffd36b', CREAM = '#fff3e2', NIGHT = '#2a1b6a';
  const A0 = 180, A1 = 230;                                      // якорь камеры: точка мира cam.c стоит здесь

  /* ---------------- раскладка — та же, что в gf_crowd (тот же hash) ---------------- */
  const COLS = 6, ROWS = 6, CR = 19.5, CX = 180, CY = 240;
  const CELLS = GFC.lattice(CX, CY, CR, COLS, ROWS);
  const HEXP = GFC.hexPts(CX, CY, CR, COLS, ROWS);
  const GC = [180, 270], GRX = 112, GRY = 46;
  const HS = 1.12;                                             // слепой просмотр v1: люди крупнее
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
  // цвет: M — цвет человека gfc_body (SCENES.gfc_body.man.color — фиалка; без него — коралл), остальные — бирюза, небо,
  // фиалка, коралл по hash
  const tone = ci => mixC(PAL[ci][0], PAL[ci][1], .3);
  const PNAME = { coral: 0, teal: 1, sky: 2, violet: 3, gold: 4 };
  const GBC = (typeof SCENES !== 'undefined' && SCENES.gfc_body && SCENES.gfc_body.man && SCENES.gfc_body.man.color) || 'coral';
  const MCI = typeof GBC === 'number' ? GBC : PNAME[GBC] ?? 0;
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
    const ci = k === MI ? MCI : [1, 2, 3, 0, 1, 3, 2][Math.floor(H(k * 7 + 3) * 7)];
    return Object.freeze({ k, col, row, C, R, S, P, dx, dy, G, d: clamp(d), seed: k + 7, ph: H(k * 3 + 11) * 6.283,
      col0: tone(ci), ring: PAL[ci][0] });
  });
  // фигурка в соте — тот же кремовый цвет, что у gfc_line/daily (FCOL там): шов без смены цвета
  const CELLC = CELLS.map((_, i) => mixC(PAL[Math.floor(H(i * 3.7 + 1) * 5)][0], CREAM, .82));
  const GIDX = PPL.filter(p => p.G && p.k !== MI).map(p => p.k).concat(PPL[MI].G ? [MI] : []);
  // дальние человечки (44): появляются на «страна», в a09 рассыпаются точками и стекаются на рёбра сот
  const HAZE = '#3b2d8e';
  const FAR = (() => {
    const A = [];
    for (let i = 0; i < 44; i++) {
      let best = null, bd = -1;
      for (let c = 0; c < 12; c++) {
        const x = 14 + H(i * 41 + c * 5.3 + 700) * 332, gy = 142 + H(i * 23 + c * 2.9 + 800) * 44;
        let md = 1e9; for (const p of A) md = Math.min(md, Math.hypot(x - p.x, (gy - p.gy) * 2.2));
        if (md > bd) { bd = md; best = { x, gy }; }
      }
      const ci = Math.floor(H(i * 11 + 900) * 4);
      A.push({ ...best, h: HS * (14 + (best.gy - 142) / 44 * 7), ph: H(i * 3 + 7) * 6.283, ci, col0: mixC(tone(ci), HAZE, .22), dot: PAL[ci][0] });
    }
    return Object.freeze(A.map(Object.freeze));
  })();
  // точки дальнего человечка (доли роста): голова, грудь, плечи, бёдра, ноги — для рассыпания в a09
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
      const [x, gy] = best, h = gy < 190 ? HS * (14 + (gy - 142) / 44 * 7) : hOf(gy), ci = [1, 2, 3, 0][Math.floor(H(i * 13 + 960) * 4)];
      A.push(Object.freeze({ x, gy, h, seed: 300 + i, ph: H(i * 5 + 3) * 6.283, col0: mixC(tone(ci), HAZE, gy < 200 ? .25 : .1) }));
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
  // овал группы — вокруг тел (ноги P.gy, макушки на h выше)
  const OVAL = (() => {
    const xs = GIDX.map(i => PPL[i].P.x), ys = GIDX.flatMap(i => [PPL[i].P.gy, PPL[i].P.gy - PPL[i].S.h]);
    const x0 = Math.min(...xs) - 12, x1 = Math.max(...xs) + 12, y0 = Math.min(...ys) - 6, y1 = Math.max(...ys) + 4;
    return Object.freeze({ cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, rx: (x1 - x0) / 2 * 1.12, ry: (y1 - y0) / 2 * 1.22 });
  })();
  // a06 «работают вместе»: огоньки от голов летят вверх и сходятся в точку огня (k — человек толпы, o — толпы-города)
  const RISE = Object.freeze(Array.from({ length: 30 }, (_, n) => Object.freeze({
    k: n < 20 ? Math.floor(H(n * 7 + 1) * PPL.length) : -1, o: n >= 20 ? Math.floor(H(n * 11 + 2) * OUTER.length) : -1,
    d: H(n * 13 + 3) * .55, bend: (H(n * 17 + 4) - .5) * 60 })));

  /* ---------------- город a05 (как gf_crowd): дома на горизонте HZ, по краям дальние города, дорога ---------------- */
  const HZ = 141;
  const CITY = (() => {
    const B = [];
    const add = (x0, x1, h, far, i) => {
      const W = [];
      for (let y = HZ - 7; y > HZ - h + 4; y -= 6) for (let x = x0 + 3.5; x < x1 - 2.5; x += 5)
        if (H(x * 7.1 + y * 3.3 + i) > (far ? .72 : .6)) W.push([x, y]);
      B.push(Object.freeze({ x0, x1, h, far, d: Math.abs((x0 + x1) / 2 - 180) / 180, W: Object.freeze(W),
        fill: far ? mixC('#33287f', '#43308f', H(i * 3 + 9)) : mixC('#4a33a3', '#5a37b0', H(i * 5 + 7)) }));
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
  // a06: тускнеет на «дружба», снова ярче на «Дальше» (толпа-город), тускнеет на «верят», гаснет к «вера» a07
  function citySvg(t, c, cam) {
    const A = qq(t, c.gor - .2, c.gor + .3) * (1 - .75 * qq(t, c.ist + .3, c.druzh + .2) + .75 * qq(t, c.dal - .1, c.dal + .6))
      * (1 - .6 * qq(t, c.ver - .1, c.ver + .5)) * (1 - qq(t, c.a7 - .1, c.vera));
    if (A <= .003) return '';
    let s = '';
    const WB = ['', '', '', ''], ww = 1.7 * cam.z, wh = 2.1 * cam.z;   // окна: 4 яркости одной дорожкой
    for (const b of CITY) {
      const t0 = b.far ? c.str - .1 + b.d * .4 : c.gor - .15 + b.d * .45, g = qq(t, t0, t0 + .55);
      if (g <= .003) continue;
      const top = HZ - b.h * g;
      const P = [[b.x0, HZ], [b.x0, top], [b.x1, top], [b.x1, HZ]].map(p => proj(cam, p[0], p[1]));
      if (P[2][0] < -5 || P[0][0] > 365) continue;
      const d = `M${P.map(p => f(p[0]) + ' ' + f(p[1])).join(' L')} Z`;
      s += `<g opacity="${b.far ? .78 : 1}"><path d="${d}" fill="${b.fill}"/><path d="${d}" fill="url(#gfc-shade)"/>` +
        `<path d="M${f(P[1][0])} ${f(P[1][1])} L${f(P[2][0])} ${f(P[2][1])}" stroke="#b9a0ff" stroke-width="${f(Math.max(1, .9 * cam.z))}" opacity=".7"/></g>`;
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
      s += `<line x1="${f(L[0])}" y1="${f(L[1])}" x2="${f(R[0])}" y2="${f(R[1])}" stroke="${WARM}" stroke-width="1.2" opacity=".6" stroke-dasharray="4 3" stroke-linecap="round"/>`;
      for (let i = 0; i < 14; i++) {
        const u = ((t * (.05 + .03 * H(i + 500)) + H(i * 3 + 501)) % 1) * 2 - 1;
        if (Math.abs(u) < rd) LP.push(proj(cam, 180 + 260 * u, HZ + 1));
      }
      s += GFC.dots(LP, { r: 1.5, op: .95, glow: .9, t, color: '#ffe6a8' });
    }
    return `<g opacity="${f(A)}">${s}</g>`;
  }

  /* ---------------- время от слов (как gf_crowd) ---------------- */
  function cues(K) {
    const w = (id, s, n = 0) => GFC.w(K, id, s, n), T = id => GFC.T(K, id);
    const c = {};
    c.a5 = T('a05'); c.lyud = w('a05', 'людей'); c.uzhe = w('a05', 'уже'); c.gor = w('a05', 'город'); c.str = w('a05', 'страна');
    c.nez5 = w('a05', 'незнаком'); c.ras5 = w('a05', 'рассыпа');
    c.a6 = T('a06'); c.ist = w('a06', 'историк'); c.druzh = w('a06', 'дружб'); c.spl = w('a06', 'сплетн');
    c.derzh6 = w('a06', 'держат'); c.grup = w('a06', 'групп'); c.primer = w('a06', 'пример'); c.sta = w('a06', 'ста');
    c.chel = w('a06', 'человек'); c.dal = w('a06', 'дальше'); c.nez6 = w('a06', 'незнаком'); c.rab = w('a06', 'работа');
    c.esli = w('a06', 'если'); c.ver = w('a06', 'верят'); c.odno = w('a06', 'одно');
    // «не» 0-е — это «ней», поэтому «Не убивай» — 1-е, «Не кради» — 2-е
    c.a7 = T('a07'); c.vera = w('a07', 'вера'); c.boga = w('a07', 'бога'); c.odni = w('a07', 'одни'); c.zap = w('a07', 'заповед');
    c.vseh = w('a07', 'всех'); c.ne1 = w('a07', 'не', 1); c.ubiv = w('a07', 'убива'); c.ne2 = w('a07', 'не', 2);
    c.krad = w('a07', 'крад');
    c.a8 = T('a08'); c.veru = w('a08', 'верующ'); c.oni = w('a08', 'они'); c.zhiv = w('a08', 'жив');
    c.sov = w('a08', 'совест'); c.vid = w('a08', 'видит'); c.tam = w('a08', 'там'); c.net = w('a08', 'нет'); c.svid = w('a08', 'свидет');
    c.a9 = T('a09'); c.pom = w('a09', 'помогает'); c.ras9 = w('a09', 'рассыпа'); c.wave = c.ras9 + .3;
    return c;
  }

  /* ---------------- камера: ключи по словам (как gf_crowd) ---------------- */
  // ключ — zoom z и точка мира (cx,cy), которая стоит в якоре (180,230); key(z, мир, экран) — точка мира в точке экрана.
  // Вход a05 — M ровно как человек gfc_body (подошвы 180,330, рост GB.h); a09 в конце — ×1 без сдвига (шов с gfc_line).
  const key = (z, wx, wy, sx = A0, sy = A1) => ({ z, cx: wx - (sx - A0) / z, cy: wy - (sy - A1) / z });
  const mixK = (a, b, u) => ({ z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), u)), cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u) });
  function camera(t, c) {
    const M = PPL[MI], GB = SCENES.gfc_body && SCENES.gfc_body.man;
    const ZE = (GB ? GB.h : 258) / M.S.h;
    const K = [key(ZE, M.S.x, M.S.gy, 180, 330),   // вход: человек gfc_body
      key(1.55, 180, 280),                          // «людей»
      key(1.25, 180, 258),                          // «Город»
      key(1.02, 180, 250),                          // «страна»
      key(1.6, 180, 258),                           // «Историк … дружба»: наезд на группу
      key(1.25, 180, 258),                          // «примерно до ста»: овал целиком
      key(.8, 180, 250),                            // «Дальше … незнакомцы»: толпа-город
      key(1.15, 180, 234.3),                        // a07: ряды и карточки
      key(292 / M.R.h, M.R.x, M.R.gy, 160, 338),    // a08: M во весь рост
      key(1, A0, A1)];                              // a09: ×1 без сдвига
    const S = [[c.a5 + .45, c.lyud + .75], [c.gor - .15, c.gor + .7], [c.str - .1, c.str + .8], [c.ist + .3, c.druzh + .2],
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
    const dq = qq(t, c.ras5 - .15, c.ras5 + 2.6);            // a05 «не рассыпается?» — разбредаются
    const jq = qq(t, c.nez5 - .1, c.nez5 + .5);               // a05 «незнакомцев» — каждый дрожит сам по себе
    const gq = qq(t, c.derzh6 - .1, c.grup + .6);             // a06 «держат группу» — сходятся
    const sq = qq(t, c.ver, c.odno + .4);                     // a06 «верят» — общий огонь, разброд утихает
    const rq = qq(t, c.odni - .1, c.ne2 + .35);               // a07 «одни заповеди на всех» — ряды
    const gd = qq(t, c.derzh6, c.grup + .4) * (1 - qq(t, c.dal - .1, c.dal + .5));   // чужие темнеют, пока держится группа
    return PPL.map((p, k) => {
      const wob = (1 - rq) * (k === MI ? qq(t, c.a5 + .45, c.lyud + .9) : 1);
      let x = p.S.x + p.dx * dq + 2.4 * Math.sin(t * .45 + p.ph) * wob;
      let gy = p.S.gy + p.dy * dq + 1.1 * Math.cos(t * .37 + p.ph * 1.3) * wob;
      let h = p.S.h;
      if (p.G) { x = lerp(x, p.P.x, gq); gy = lerp(gy, p.P.gy, gq); }
      x = lerp(x, p.R.x, rq); gy = lerp(gy, p.R.gy, rq); h = lerp(h, p.R.h, rq);
      const cq = qq(t, c.pom - .1 + p.d * .55, c.pom + .5 + p.d * .55);     // a09 «помогает» — в свою соту
      x = lerp(x, p.C.x, cq); gy = lerp(gy, p.C.gy, cq); h = lerp(h, p.C.h, cq);
      const amp = (.55 + .9 * jq + 1.9 * dq * (p.G ? 1 - .75 * gq : 1)) * (1 - .45 * sq) * (1 - .7 * rq) * (1 - .5 * cq);
      return { x, gy, h, amp, cq, gdim: p.G ? 0 : gd };
    });
  }
  function crowd(t, c) {
    const A = place(t, c), B = place(t + .1, c);
    return A.map((s, k) => {
      const seed = PPL[k].seed, vx = (B[k].x - s.x) / .1, v = Math.hypot(vx, (B[k].gy - s.gy) / .1);
      const am = s.amp * (k === MI ? qq(t, c.a5 + .45, c.lyud + .9) : 1);   // M на входе стоит, как человек gfc_body
      const bx = am * .8 * Math.sin(t * 9.1 + seed * 2.3) * Math.sin(t * 1.3 + seed), by = am * .35 * Math.cos(t * 7.7 + seed);
      return { ...s, bx, by, walk: clamp((v - 3) / 9), dir: vx >= 0 ? 1 : -1 };
    });
  }
  const outerSt = (t, p) => ({ x: p.x + 2.2 * Math.sin(t * .45 + p.ph), gy: p.gy + 1 * Math.cos(t * .37 + p.ph), h: p.h,
    bx: .5 * Math.sin(t * 6.3 + p.seed), by: 0, walk: 0, dir: 1, cq: 0 });
  const head = s => [s.x + s.bx, s.gy + s.by - .88 * s.h];
  const crown = s => [s.x + s.bx, s.gy + s.by - 1.02 * s.h];
  const chest = s => [s.x + s.bx, s.gy + s.by - .56 * s.h];

  // плоский человек в кадре камеры; вне кадра — не рисуем
  function who(s, cam, t, o) {
    const [x, y] = proj(cam, s.x + s.bx, s.gy + s.by), h = s.h * cam.z;
    if (x + h * .45 < -10 || x - h * .45 > 370 || y - h > 650 || y + 4 < -10) return '';
    const edge = clamp((y - h + 30) / 60) * clamp((x + h * .1 + 10) / 40) * clamp((370 - x + h * .1) / 40);
    if (edge <= .003) return '';
    return GFC.person(x, y, h, { t, walk: s.walk, dir: s.dir, ...o, opacity: (o.opacity ?? 1) * edge });
  }
  const thread = (a, b, op, w = .5, color = '#fff', soft = false) => op <= .003 ? '' :
    `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${color}" stroke-width="${f(w)}" opacity="${f(op)}" stroke-linecap="round"${soft ? ' filter="url(#gfc-soft)"' : ''}/>`;
  const tline = (a, b, op, w, color) => thread(a, b, .32 * op, w * 3, color, true) + thread(a, b, op, w, color);   // нить со свечением
  const seg = (a, b, u0, u1) => [[lerp(a[0], b[0], u0), lerp(a[1], b[1], u0)], [lerp(a[0], b[0], u1), lerp(a[1], b[1], u1)]];
  const glowDot = (p, r, op, color = '#fff2c8') => op <= .003 ? '' :
    `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r * 2.8)}" fill="${WARM}" opacity="${f(op * .4)}" filter="url(#gfc-soft)"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(r)}" fill="${color}" opacity="${f(op)}"/>`;
  const bez = (a, b, cc, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * cc[0] + u * u * b[0], v * v * a[1] + 2 * v * u * cc[1] + u * u * b[1]]; };

  // карточка правила (a07): скруглённая плашка инфографики с меткой; текст «НЕ / …» печатается сразу с карточкой (t0);
  // hot — тёплая вспышка на «Не убивай» / «Не кради»
  const TW = 112, TH = 92;
  const DEFS = `<defs><linearGradient id="gfcc-card" x1="0" y1="0" x2=".55" y2="1"><stop offset="0" stop-color="#7a3fd6"/><stop offset="1" stop-color="#2f32a0"/></linearGradient></defs>`;
  function card(q, accent, top, bot, t, t0, hot) {
    if (q <= .003) return '';
    const k = GFC.ease(q), x0 = -TW / 2, y0 = -TH / 2, pop = lerp(.8, 1, k) * (1 + .06 * hot);
    const r = `x="${f(x0)}" y="${f(y0)}" width="${TW}" height="${TH}" rx="13"`;
    const tc = hot > .02 ? mixC('#ffffff', '#ffe6a8', hot) : '#fff';
    const txt = GFC.typed(0, -7, top, t, t0 + .06, { size: 18, cps: 30, op: 1, ls: .04, maxW: 98, color: tc, glow: hot > .15 }) +
      GFC.typed(0, 18, bot, t, t0 + .14, { size: 18, cps: 34, op: 1, ls: .04, maxW: 98, color: tc, glow: hot > .15 });
    const lines = [32, 38].map((y, n) => `<rect x="${f(-28 + n * 7)}" y="${y - .9}" width="${f(Math.max(.1, (56 - n * 20) * k))}" height="1.8" rx=".9" fill="#fff" opacity=".3"/>`).join('');
    return `<g opacity="${f(k)}" transform="scale(${pop.toFixed(3)})">` +
      `<rect x="${f(x0 + 2)}" y="${f(y0 + 6)}" width="${TW}" height="${TH}" rx="13" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
      (hot > .003 ? `<rect ${r} fill="none" stroke="${WARM}" stroke-width="5" opacity="${f(.75 * hot)}" filter="url(#gfc-soft)"/>` : '') +
      `<rect ${r} fill="url(#gfcc-card)"/><rect ${r} fill="url(#gfc-shade)"/>` +
      (hot > .003 ? `<rect ${r} fill="#ffb46a" opacity="${f(.22 * hot)}"/>` : '') +
      `<rect ${r} fill="none" stroke="${hot > .02 ? mixC('#ffffff', WARM, hot) : '#fff'}" stroke-opacity="${f(.32 + .5 * hot)}" stroke-width="${f(1 + .8 * hot)}"/>` +
      `<rect x="-14" y="${f(y0 + 8)}" width="28" height="3.6" rx="1.8" fill="${accent}"/>${lines}${txt}</g>`;
  }
  // плашка-таблетка подписи по центру
  function plaque(cx, y, text, op, size = 13) {
    if (op <= .003) return '';
    const fs = GFC.fs(size), w = GFC.textW(text, fs, fs * .12) + 22, h = fs + 12;
    return `<g opacity="${f(op)}"><rect x="${f(cx - w / 2)}" y="${f(y - h / 2 + 1.5)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="${INK}" opacity=".45"/>` +
      `<rect x="${f(cx - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="#160c44" fill-opacity=".92" stroke="${ACC}" stroke-opacity=".75" stroke-width="1.1"/>` +
      GFC.mono(cx, y + fs * .36, text, { size, anchor: 'middle', opacity: 1, color: '#ffe6a8', shadow: 0 }) + '</g>';
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), cam = camera(t, c), Z = cam.z, ST = crowd(t, c), M = ST[MI];
    const q8 = qq(t, c.a8 - .1, c.zhiv + .2) * (1 - qq(t, c.a9 - .35, c.pom + .15));   // a08: наезд на M (в a09 обратно)
    const a9 = qq(t, c.a9 - .35, c.pom + .2);                                          // a09: толпа возвращается
    const gd = qq(t, c.derzh6, c.grup + .4) * (1 - qq(t, c.dal - .1, c.dal + .5));
    // кто виден: в a05 соседи проявляются при отъезде; в a08 гаснут к «они» (он один), в a09 возвращаются
    const othersA = t < c.a8 - .1 ? 1 - clamp((Z - 2) / 1.6) : Math.max(1 - qq(t, c.a8 - .1, c.oni + .1), a9);
    const farA = qq(t, c.str - .1, c.str + .5) * (1 - .55 * qq(t, c.odni, c.zap)) * (1 - qq(t, c.a8 - .1, c.zhiv)) * (1 - .45 * gd) + .45 * a9;
    const oa = qq(t, c.dal - .15, c.dal + .45) * (1 - qq(t, c.a7 - .1, c.vera));   // толпа-город a06
    const OS = OUTER.map(p => outerSt(t, p));
    const headOf = (k, o) => k >= 0 ? head(ST[k]) : head(OS[o]);
    // огонь порядка: a06 «верят» над толпой (180,74); a07 выше (180,54) и крупнее; a08 вверх вправо от M (274,62);
    // a09 — над сотами (180,88, r 8 — как в gfc_line/daily)
    const spA = qq(t, c.ver - .1, c.ver + .5);
    const q7 = qq(t, c.a7 - .1, c.vera + .1), q9 = qq(t, c.a9 - .35, c.ras9 + .4);
    const spX = lerp(lerp(180, 274, q8), 180, q9), spY = lerp(lerp(lerp(74, 54, q7), 62, q8), 88, q9);
    const spR = (7 + qq(t, c.vera, c.boga + .4)) * (.35 + .65 * spA) * lerp(1, .9, q8)
      + 2.2 * pulse(t, c.odno, .15, .7) + 1.6 * pulse(t, c.vid - .1, .12, .6) * q8;
    const SP = [spX, spY];
    const shine = spA * (1 - .55 * q8);   // тёплый свет огня на людях
    // a08 «нет свидетелей»: тело темнеет — горят свет в груди, нить и огонь
    const dark = qq(t, c.net - .05, c.svid + .3) * (1 - a9);
    let s = DEFS;

    // площадка под толпой (появляется с отъездом, шире на толпе-городе; в a08 гаснет)
    const gA = .8 * (t < c.a8 - .1 ? 1 - clamp((Z - 1.8) / 2.2) : Math.max(1 - q8, a9));
    if (gA > .003) {
      const gc = proj(cam, 180, 252);
      s += GFC.ground(gc[0], gc[1], Math.min(205 * Z, 188) + 80 * oa, Math.min(98 * Z, 120) + 34 * oa, { op: gA, warm: .3 * spA });
    }
    if (q8 > .003) {   // a08: своя площадка под M
      const ft = proj(cam, M.x, M.gy), hp = M.h * Z;
      s += GFC.ground(ft[0], ft[1], .38 * hp, .085 * hp, { op: .8 * q8 * (1 - .5 * dark), warm: .4 * qq(t, c.sov, c.vid) });
    }

    // a05 «Город, страна»
    s += citySvg(t, c, cam);

    // дальние человечки → в a09 рассыпаются точками на рёбра сот
    if (farA > .003) {
      const fq = qq(t, c.pom, c.wave + .2), pa = farA * (1 - qq(fq, 0, .3));
      FAR.forEach(p => {
        if (pa <= .003) return;
        const bx = 1.2 * Math.sin(t * .5 + p.ph), by = .5 * Math.cos(t * .43 + p.ph);
        const [x, y] = proj(cam, p.x + bx, p.gy + by), h = p.h * Z;
        if (x < -20 || x > 380 || y - h > 650 || y < -10) return;
        s += GFC.person(x, y, h, { color: p.col0, opacity: .9 * pa, t, seed: p.ph * 3, shadow: .5, lit: .35 * shine, shade: .2 });
      });
      if (fq > .003) {
        const FP = [], FC = [];
        FAR.forEach(p => FDOT.forEach(([u, v]) => { FP.push(proj(cam, p.x + u * p.h, p.gy + v * p.h)); FC.push(p.dot); }));
        const HP = HEXP.map(p => proj(cam, p[0], p[1]));
        s += GFC.dots(GFC.morph(FP, HP, fq, t, { spread: .4, amp: 1.5, bend: 10 }),
          { r: lerp(1.1, 1.25, fq), op: lerp(.75 * farA, .88, fq) * qq(fq, 0, .2), glow: .4 + .3 * fq, t, color: i => FC[i % FC.length] });
      }
    }

    // соты a09: плитки проявляются от центра; на «рассыпаться» — волна света
    const lit0 = qq(t, c.pom + .1, c.ras9 + .5);
    if (lit0 > .003) {
      const L = i => qq(t, c.pom + .15 + PPL[i].d * .55, c.pom + .7 + PPL[i].d * .55) * (.62 + .38 * qq(t, c.ras9, c.ras9 + .5));
      s += GFC.comb(CX, CY, CR, COLS, ROWS, { op: 1, w: .6, lit: i => L(i) * (.94 + .06 * Math.sin(t * 1.8 + i * 1.3)) });
      CELLS.forEach((cc, i) => {
        const wv = Math.exp(-((((t - c.wave) - PPL[i].d * .9) / .28) ** 2)) * qq(t, c.wave - .3, c.wave);
        if (wv > .01) s += GFC.hex(cc[0], cc[1], CR * .84 * (.5 + .5 * GFC.ease(L(i))), { fill: '#fff6dc', color: 'none', op: .38 * wv, shade: false });
      });
    }

    // a05 «незнакомцев»: у каждого под ногами свой цветной круг — каждый сам по себе (гаснут к «Историк»)
    const ringA = qq(t, c.nez5 - .1, c.nez5 + .45) * (1 - qq(t, c.ist, c.ist + .7));
    if (ringA > .003) {
      ST.forEach((st, k) => {
        const g = qq(t, c.nez5 - .1 + H(k * 7 + 9) * .35, c.nez5 + .3 + H(k * 7 + 9) * .35);
        if (g <= .003) return;
        const p = proj(cam, st.x, st.gy + 1), rx = .36 * st.h * Z * g, ry = .11 * st.h * Z * g;
        s += `<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="${f(rx)}" ry="${f(ry)}" fill="${PPL[k].ring}" fill-opacity="${f(.12 * ringA)}" stroke="${PPL[k].ring}" stroke-width="1.6" opacity="${f(.85 * ringA)}"/>`;
      });
    }

    // a06 овал «≈150» (на земле, под людьми); подпись — поверх людей
    const ovA = qq(t, c.sta - .1, c.chel) * (1 - qq(t, c.ver, c.odno + .3));
    let label150 = '';
    if (ovA > .003) {
      const o = OVAL, cc = proj(cam, o.cx, o.cy), d = qq(t, c.sta - .1, c.chel + .2), rx = o.rx * Z, ry = o.ry * Z;
      const el = `cx="${f(cc[0])}" cy="${f(cc[1])}" rx="${f(rx)}" ry="${f(ry)}"`, draw = `pathLength="1" stroke-dasharray="${f(d)} 2"`;
      s += `<g opacity="${f(ovA)}"><ellipse ${el} fill="${ACC}" opacity="${f(.08 * d)}"/>` +
        `<ellipse ${el} fill="none" stroke="${ACC}" stroke-width="4.5" opacity=".3" filter="url(#gfc-soft)" ${draw}/>` +
        `<ellipse ${el} fill="none" stroke="${ACC}" stroke-width="2" opacity=".95" stroke-linecap="round" ${draw}/></g>`;
      // «≈150» над овалом, крупно, со счётом 0→150 на «ста пятидесяти»
      const n = Math.round(150 * qq(t, c.sta - .1, c.chel + .15)), txt = '≈' + n, fs = GFC.fs(22);
      const lx = cc[0], ly = Math.max(44, cc[1] - ry - 14), pw = GFC.textW('≈150', fs, fs * .06) + 22, ph = fs + 12;
      label150 = `<g opacity="${f(ovA * qq(t, c.sta - .1, c.sta + .2))}">` +
        `<rect x="${f(lx - pw / 2)}" y="${f(ly - fs * .86 - 6 + 2)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="${INK}" opacity=".5"/>` +
        `<rect x="${f(lx - pw / 2)}" y="${f(ly - fs * .86 - 6)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="${ACC}"/>` +
        GFC.mono(lx, ly, txt, { size: 22, anchor: 'middle', opacity: 1, color: INK, shadow: 0, ls: .06 }) + '</g>';
    }

    // нити от каждого к огню (a06–a07): толпа, толпа-город, дальние; «одно и то же» — по всем разом свет вверх
    if (spA > .003) {
      const thA = (1 - .62 * qq(t, c.zap, c.zap + .6)) * (1 - qq(t, c.a8 - .1, c.veru + .3));
      const run = qq(t, c.vera - .1, c.boga + .5), run1 = qq(t, c.odno - .05, c.odno + .75);
      if (thA > .003) {
        const ends = [];
        ST.forEach((st, k) => { if (!(k === MI && t > c.a8)) ends.push([head(st), c.ver + H(k * 17 + 2) * .55, .5 * othersA, 1.1]); });
        if (oa > .003) OUTER.forEach((p, i) => { if (i % 2 === 0) ends.push([head(OS[i]), c.ver + .15 + H(i * 7 + 3) * .5, .34 * oa, .9]); });
        FAR.forEach((p, i) => { if (i % 2 === 0) ends.push([[p.x, p.gy - .86 * p.h], c.ver + .2 + H(i * 5 + 1) * .5, .28 * farA, .8]); });
        for (const [hd, st0, al, wd] of ends) {
          const g = qq(t, st0, st0 + .35);
          if (g <= .003 || al <= .003) continue;
          const A = proj(cam, ...hd), [p0, p1] = seg(A, SP, 0, g);
          s += thread(p0, p1, al * thA, wd, WARM);
          for (const r of [run, run1]) if (r > 0 && r < 1 && g > .99) s += glowDot(seg(A, SP, r, r)[0], 1.5, Math.min(1, 2 * al) * thA * Math.sin(r * Math.PI));
        }
      }
      const topA = qq(t, c.ras9, c.ras9 + .6) * spA;
      if (topA > .003) for (let i = 0; i < COLS; i++) {
        const cc = CELLS[i], A = proj(cam, cc[0], cc[1] - CR);
        s += thread([spX, spY + 8], A, .3 * topA, .8, WARM);
      }
    }

    // люди — все вместе по глубине (толпа-город, толпа, M): ближе — позже
    // dim — a08: остальные темнеют до цвета ночи и гаснут к «они»; gdim — a06: чужие темнеют, пока держится группа
    const look = (st, k, dim = 0) => {
      const depth = clamp((st.gy - 186) / 148), inCell = st.cq;
      let col = inCell > .003 ? mixC(PPL[k].col0, CELLC[k], inCell) : PPL[k].col0;
      const dd = Math.max(dim, .55 * st.gdim);
      if (dd > .003) col = mixC(col, NIGHT, .62 * dd);
      const rim = (st.x < spX ? 1 : -1) * .85 * shine * (1 - inCell) * (1 - dd);
      return { color: col, seed: inCell > .999 ? k + 1 : PPL[k].seed, shade: clamp((.32 * (1 - depth) + .5 * dd) * (1 - inCell)),
        lit: .55 * shine * (1 - .6 * inCell) * (1 - .8 * dd), rim, shadow: 1 - .5 * inCell };
    };
    const items = [];
    if (oa > .003) OUTER.forEach((p, i) => {
      const st = OS[i], depth = clamp((st.gy - 150) / 240), rim = (st.x < spX ? 1 : -1) * .7 * shine;
      items.push([st.gy, () => who(st, cam, t, { color: p.col0, seed: p.seed, shade: .35 * (1 - depth), lit: .45 * shine, rim, opacity: oa })]);
    });
    if (othersA > .003) {
      const dim = t > c.a8 - .1 ? q8 : 0;
      PPL.forEach((p, k) => { if (k !== MI) items.push([ST[k].gy, () => who(ST[k], cam, t, look(ST[k], k, dim))]); });
    }
    const drawM = () => {
      // a05 вход: M — сам человек gfc_body (если он есть), при отъезде к ×2,6 сменяется фигурой толпы
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
        if (M.cq <= .999) L.seed = 0;        // seed человека gfc_body
        const lm = t > c.a8 - .1 ? .5 * qq(t, c.sov - .1, c.sov + .5) * (1 - a9) : 0;   // a08: свет совести на нём
        r += who(M, cam, t, { ...L, lit: Math.max(L.lit, lm) * (1 - .8 * dark), shade: Math.max(L.shade * (1 - q8), 1.6 * dark),
          rim: L.rim * (1 - dark), opacity: (1 - big) * (1 - .25 * dark) });
      }
      return r;
    };
    // остальные проявляются и гаснут одним слоем (не просвечивают друг через друга); толпа-город видна только при
    // othersA = 1 — тогда M идёт в общий порядок по глубине
    items.sort((a, b) => a[0] - b[0]);
    if (othersA >= .999) {
      items.push([M.gy + .01, drawM]); items.sort((a, b) => a[0] - b[0]);
      for (const [, fn] of items) s += fn();
    } else {
      const layer = items.map(([, fn]) => fn()).join('');
      if (layer) s += `<g opacity="${f(othersA)}">${layer}</g>`;
      s += drawM();
    }

    // a06: дуги дружбы и сплетен (поверх людей), рвущиеся нити
    const arcA = (1 - .7 * qq(t, c.odni, c.zap + .3)) * (1 - qq(t, c.a8 - .1, c.zhiv)) * othersA;
    if (arcA > .003 && t > c.druzh - .1) {
      for (const a of ARCS) {
        const t0 = a.late ? c.spl : c.druzh, g = qq(t, t0 - .05, t0 + .35);
        if (g <= .003) continue;
        const A = proj(cam, ...crown(ST[a.i])), B = proj(cam, ...crown(ST[a.j]));
        const dist = Math.hypot(B[0] - A[0], B[1] - A[1]), C = [(A[0] + B[0]) / 2, Math.min(A[1], B[1]) - dist * .32 - 5];
        const col = a.late ? '#f2b6ff' : '#7ff0de', dd = `M${f(A[0])} ${f(A[1])} Q${f(C[0])} ${f(C[1])} ${f(B[0])} ${f(B[1])}`;
        s += `<path d="${dd}" fill="none" stroke="${col}" stroke-width="4.5" opacity="${f(.3 * arcA)}" filter="url(#gfc-soft)" pathLength="1" stroke-dasharray="${f(g)} 2"/>` +
          `<path d="${dd}" fill="none" stroke="${col}" stroke-width="1.6" opacity="${f(.95 * arcA)}" stroke-linecap="round" pathLength="1" stroke-dasharray="${f(g)} 2"/>`;
        if (g > .9) {
          // огоньки «сплетен» бегут по дуге туда-обратно; с «сплетни» — по два: белый и тёплый
          const n = t > c.spl + .2 ? 2 : 1;
          for (let m = 0; m < n; m++) {
            const u = .5 + .5 * Math.sin(t * 2.1 + a.ph + m * 2.6);
            s += glowDot(bez(A, B, C, u), 2, .95 * arcA, m ? WARM : '#ffffff');
          }
        }
      }
    }
    if (t > c.dal - .1 && t < c.ver + 1) {
      for (const b of BREAKS) {
        if (b.o >= 0 && oa <= .003) continue;
        const A = proj(cam, ...head(ST[b.i])), B = proj(cam, ...headOf(b.k, b.o));
        const grow = qq(t, c.dal + b.dl, c.nez6 - .05), snap = qq(t, c.nez6 + b.dl, c.nez6 + .5 + b.dl);
        const op = .95 * (1 - qq(t, c.nez6 + .5 + b.dl, c.nez6 + 1.1 + b.dl));
        if (snap <= .003) { const [p0, p1] = seg(A, B, 0, grow); s += tline(p0, p1, op, 1.8, '#d6ecff') + (grow > .02 && grow < .98 ? glowDot(p1, 1.8, op, '#ffffff') : ''); }
        else {
          const gap = .5 * snap;
          const [p0, p1] = seg(A, B, 0, .5 - gap * .9), [p2, p3] = seg(A, B, .5 + gap * .9, 1);
          s += tline(p0, p1, op, 1.8, '#d6ecff') + tline(p2, p3, op * .8, 1.8, '#d6ecff') +
            glowDot(seg(A, B, .5, .5)[0], 3.4, pulse(t, c.nez6 + b.dl, .08, .45), '#ffffff');
        }
      }
    }

    // a07 карточки правил под огнём: «заповеди» — левая сразу с «НЕ / УБИВАЙ», «всех» — правая с «НЕ / КРАДИ»;
    // «Не убивай» / «Не кради» — своя карточка вспыхивает; a08 «они» — уменьшаются и плывут в грудь M
    const tbA = qq(t, c.zap - .1, c.zap + .3);
    if (tbA > .003) {
      const fly = qq(t, c.oni - .1, c.sov + .05), ch = proj(cam, ...chest(M));
      const L0 = [116, 112], R0 = [244, 112];
      const L = [lerp(L0[0], ch[0] - 5, fly), lerp(L0[1], ch[1], fly)], Rr = [lerp(R0[0], ch[0] + 5, fly), lerp(R0[1], ch[1], fly)];
      const sc = lerp(1, .06, fly), op = tbA * (1 - qq(t, c.sov - .25, c.sov + .1));
      const one = (P, q, acc, top, bot, t0, tf) => `<g transform="translate(${f(P[0])} ${f(P[1])}) scale(${sc.toFixed(3)})">${card(q, acc, top, bot, t, t0, pulse(t, tf - .05, .15, .9))}</g>`;
      s += `<g opacity="${f(op)}">` +
        one(L, qq(t, c.zap - .05, c.zap + .45), '#63e6d2', 'НЕ', 'УБИВАЙ', c.zap, c.ne1) +
        one(Rr, qq(t, c.vseh - .05, c.vseh + .45), '#8ccbff', 'НЕ', 'КРАДИ', c.vseh, c.ne2) + '</g>';
    }

    // огонь (поверх нитей и карточек)
    s += GFC.spark(spX, spY, spR, { t, op: spA });

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
      s += GFC.dots(P, { r: 2.4, op: 1, glow: 1, t, color: WARM, alpha: i => A[i] });
      const pre = qq(t, c.rab + .2, c.ver) * (1 - spA);
      if (pre > .003) s += glowDot([180, 74], 2.4 * pre + .6, .9 * pre);
    }

    // a08 совесть: крупный тёплый свет в груди и нить к огню; «видит» — свет по нити от огня к груди, вспышка
    const cs = qq(t, c.sov - .1, c.sov + .4) * (1 - .5 * qq(t, c.pom, c.ras9));
    if (cs > .003) {
      const ch = proj(cam, ...chest(M)), g = qq(t, c.sov + .1, c.vid), lt = 1 - qq(t, c.a9 - .35, c.pom);   // нить уходит с отъездом a09
      const [p0, p1] = seg(ch, SP, 0, g);
      s += thread(p0, p1, .3 * cs * lt, 5, WARM, true) + thread(p0, p1, .95 * cs * lt, 1.6, '#ffe6a8');
      const u = qq(t, c.vid, c.vid + .8);
      if (u > 0 && u < 1) s += glowDot(seg(SP, ch, u, u)[0], 2.6, Math.sin(u * Math.PI) * cs);
      const flare = 1 + .6 * pulse(t, c.vid + .75, .15, .6) + .25 * dark;
      const cr = lerp(11, 1.4, qq(t, c.a9 - .35, c.pom)) * flare;
      s += `<circle cx="${f(ch[0])}" cy="${f(ch[1])}" r="${f(cr * 8)}" fill="url(#gfc-halo)" opacity="${f(cs)}"/>` +
        `<circle cx="${f(ch[0])}" cy="${f(ch[1])}" r="${f(cr * 3)}" fill="${WARM}" opacity="${f(.3 * cs)}" filter="url(#gfc-blur)"/>`;
      s += GFC.spark(ch[0], ch[1], cr, { t, op: cs, rays: 12 });
    }

    // подписи: a05 «уже не физика» — плашка; a06 мыслитель на тёмной таблетке; «≈150»
    s += label150;
    s += plaque(180, 46, 'ДАЛЬШЕ — НЕ ФИЗИКА', qq(t, c.uzhe - .1, c.uzhe + .35) * (1 - qq(t, c.a6 - .15, c.a6 + .15)));
    const thA = qq(t, c.ist + .2, c.ist + .5) * (1 - qq(t, c.esli - .3, c.esli + .2));
    if (thA > .003) {
      const fs = GFC.fs(12);
      s += `<rect x="22" y="${f(46 - fs - 4)}" width="316" height="${f(fs + 20)}" rx="${f((fs + 20) / 2)}" fill="#160c44" fill-opacity="${f(.85 * thA)}" stroke="${ACC}" stroke-opacity="${f(.35 * thA)}" stroke-width=".9"/>`;
    }
    s += GFC.thinker('ЮВАЛЬ НОЙ ХАРАРИ · «SAPIENS» · 2011', t, c.ist + .2, c.esli + .2, { size: 12, y: 46, maxW: 300, ls: .06 });
    return s;
  }

  SCENES.gfc_crowd = GFC.scene('gfc_crowd', (t, K, mode, p) => body(t, K));
})();
