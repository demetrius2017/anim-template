/* «Что такое время» (time_states), сцена ts_records — носители отметок. Главный тезис владельца:
 * «без носителя, который записал отметки времени, времени нет».
 * SCENES.ts_records(u, p, d, t) → UN.wrap(body(...)); SCENES.ts_records.body(t, K, mode) — сырой SVG без wrap и фона.
 * Две части. Цепочка bridge → notch → world → bell (m1, r1, r2[+r2b], r3 идут подряд) — функция только t и K:
 * каждый носитель живёт на своей дорожке ключевых кадров, между своими режимами наплыва нет. duel (r4) стоит
 * отдельно, позже, и рисуется своей функцией (mode === 'duel'). Вход в любой свой кадр из чужой сцены: наплыв
 * 0,75 с от K[p.s] − 0,05 через SCENES[p.prev].body(t, K, p.prev_mode) (нет body — проявление из чёрного),
 * поэтому m1 входит из ts_save/save (полная) или ts_earth/relative (короткая), r4 — из ts_fall/recall
 * (полная) или ts_memory/diary (короткая). Выход: ts_memory/memory наплывает из body(t,K,'bell') (полная)
 * или body(t,K,'world') (короткая, без r2b и r3: цепочка просто живёт дальше на керне льда);
 * ts_body/answer — из body(t,K,'duel'), после «С кем ты?» камера замирает, центр пуст.
 *
 * Режимы p.mode:
 *   bridge (m1) — «Часы» — двое часов стоят друг на друге, стрелки идут вместе; «башне» — вырастает маленькая
 *     решётчатая башня и поднимает верхние часы; «разошлись» — верхняя стрелка уходит вперёд; «записи» —
 *     башня отходит влево, справа выезжает плёнка-запись, нити от часов к рядам ВЕРХ/НИЗ, цифры бегут;
 *     «сравнения» — цифры встают, последний разряд различается — рамка и РАЗНИЦА; «откуда» — запись и башня
 *     уходят влево, входит голова из точек, рядом собирается «?» (до «идёт»).
 *   notch (r1) — «отметкам» — «?» гаснет, кадры плёнки в голове вспыхивают по очереди, ПО ОТМЕТКАМ;
 *     «Зарубка» — справа вырастает палка, на ней вырезается зарубка (искра, щепки), голова отходит влево;
 *     «завтра» — вторая зарубка выше; «носитель» — НОСИТЕЛЬ ОТМЕТОК над палкой; «раньше» — первая зарубка
 *     светится, ВЧЕРА; «по-другому» — СЕГОДНЯ у второй; «прошлое» — БЫЛО ПРОШЛОЕ внизу.
 *   world (r2, в полной ещё r2b в том же кадре) — с начала фразы панорама влево: голова и палка уходят, въезжает
 *     ледяной щит в разрезе (годовые слои). «снег» — снег валит, СНЕГ; слои всё время рождаются у поверхности и
 *     опускаются, сжимаясь книзу («слёживается»); «лёд» — из щита проявляется керн, ЛЁД; «слой» — по слоям
 *     сверху вниз бежит подсветка; «глубоком» — наезд вниз, низ керна светится, пузырьки ярче; «воздух» —
 *     пузырёк выносится крупно на нити; «восьмисот» — ДО 800 000 ЛЕТ со счётом до «лет». r2b (если есть):
 *     «ладонь» — въезжает стена пещеры из точек с тёмным силуэтом ладони; «обвели…краской» — точки краски
 *     обходят контур; «шестидесяти» — НЕ МЕНЬШЕ 67 000 ЛЕТ со счётом; медленный отъезд. Нет r2b — без ладони.
 *   bell (r3, только полная) — к «Физик» носители (лёд, запись, ладонь сверху; голова и палка снизу) встают
 *     вокруг оси времени; ДЖОН БЕЛЛ · ФИЗИК. «прошлому» — стрелка влево по оси, «нет» — упирается в стенку
 *     и гаснет (ПРОШЛОЕ); «память» — голова стягивается в точку, «записи» — остальные; «здесь» — точка
 *     вспыхивает, «настоящем» — СЕЙЧАС.
 *   duel (r4) — с начала кадра: ось, лента-носитель, на ней девять отметок, точка СЕЙЧАС; «носителя» — лента
 *     гаснет, за ней отметки от давних к недавним и СЕЙЧАС, остаётся пустая ось; «есть…вообще» — «?» из точек;
 *     «Ньютон» — слева НЬЮТОН: ЕСТЬ и ровный поток точек по оси; «Лейбницу» — справа ЛЕЙБНИЦ: НЕТ, ось справа
 *     исчезает, пунктирная пустота; «С кем ты» — черта под обеими подписями, камера плавно замирает.
 * Слова (K.words; нет слова — доля фразы): m1 башн, разошл, запис, сравнен, откуда, идет; r1 отметк, зарубк,
 *   завтра, носител, раньше, подруг, прошл; r2 снег, слеж, лед, слой, глубок, воздух, восьмисот, лет;
 *   r2b ладон, обвел, краск, шестидес, лет; r3 физик, прошл, нет, памят, запис, здесь, настоящ;
 *   r4 носител, отметк, есть, вообще, ньютон, лейбниц, кем.
 * p: s (id фразы), mode, K, prev/prev_mode. Камера движка нейтральна; своя камера — лёгкий дрейф всей сцены,
 *   масштаб носителей (наезд на дно керна, отъезд на ладони), в duel — наезд к оси до «кем».
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const lerp = (a, b, q) => a + (b - a) * q;
  const win = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const H = n => UN.hash(n);
  const norm = w => String(w).toLowerCase().replace(/ё/g, 'е').replace(/[^а-яa-z0-9]/g, '');
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const dot = (x, y, r, o) => o > .004 ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(Math.min(1, o))}"/>` : '';
  const NB = ' ';
  const AX_Y = 192, CX = 180, NEVER = 1e6;
  const cache = {};

  /* ---------- times from words; fallback is a fraction of the phrase; a missing phrase never comes ---------- */
  function times(K) {
    const has = id => typeof K[id] === 'number';
    // Part 2 (time_states_p2): no m1 — no tower and no comparison record; «откуда» is taken from k2.
    const noBridge = !has('m1') && has('k2');
    const m1 = K.m1 ?? (noBridge ? K.k2 : 0), m1e = K.m1_end ?? (noBridge ? (K.k2_end ?? m1 + 6.6) : m1 + 6.6);
    const r1 = K.r1 ?? m1e + .35, r1e = K.r1_end ?? r1 + 10.6, r2 = K.r2 ?? r1e + .35, r2e = K.r2_end ?? r2 + 10.1;
    const hasB = has('r2b'), hasBell = has('r3');
    const r2b = hasB ? K.r2b : NEVER, r2be = hasB ? (K.r2b_end ?? r2b + 5.4) : NEVER;
    const r3 = hasBell ? K.r3 : NEVER, r3e = hasBell ? (K.r3_end ?? r3 + 6.5) : NEVER;
    const r4 = K.r4 ?? NEVER, r4e = has('r4') ? (K.r4_end ?? r4 + 10.3) : NEVER;
    const span = { m1: [m1, m1e], r1: [r1, r1e], r2: [r2, r2e], r2b: [r2b, r2be], r3: [r3, r3e], r4: [r4, r4e] };
    const c = (id, stems, frac, nth = 0) => {
      if (span[id][0] >= NEVER) return NEVER;
      for (const st of [].concat(stems)) {
        const a = (K.words?.[id === 'm1' && noBridge ? 'k2' : id] || []).filter(x => norm(x.w).startsWith(norm(st)))[nth];
        if (a) return a.t0;
      }
      return span[id][0] + frac * (span[id][1] - span[id][0]);
    };
    // handFirst: the cave hand (r2b) is told before the ice (r2) — part 2 order
    const handFirst = hasB && r2b < r2;
    const wEnd = hasB && !handFirst ? r2be : r2e, wStart = handFirst ? r2b : r2;
    return {
      m1, m1e, r1, r1e, r2, r2e, r2b, r2be, r3, r3e, r4, r4e, hasB, hasBell, wEnd, wStart, handFirst, noBridge,
      tower: c('m1', 'башн', .09), apart: c('m1', 'разошл', .14), rec: c('m1', 'запис', .47), cmp: c('m1', 'сравнен', .53),
      ask: c('m1', 'откуда', .69), go: c('m1', 'идет', .95),
      // v8 p2 A1: part 2 cuts the second notch on «ещё одна», the day changes on «завтра»
      marks: c('r1', 'отметк', .06), n1: c('r1', 'зарубк', .12), n2: c('r1', noBridge ? ['ещё', 'завтра'] : 'завтра', .24), nos: c('r1', 'носител', .43),
      zav: c('r1', 'завтра', .2),
      early: c('r1', 'раньше', .66), other: c('r1', 'подруг', .73), past: c('r1', 'прошл', .95),
      snow: c('r2', 'снег', .15), press: c('r2', 'слеж', .34), ice: c('r2', 'лед', .44), layer: c('r2', 'слой', .48), layers0: c('r2', 'сло', .2),
      deep: c('r2', 'глубок', .64), air: c('r2', 'воздух', .74), k800: c('r2', 'восьмисот', .87), k800e: c('r2', 'лет', .96),
      // v20 line 6 says «сотни тысяч лет» instead of «около восьмисот тысяч»: the counter becomes a plain caption
      hundreds: (K.words?.r2 || []).some(x => norm(x.w).startsWith('восьмисот')) ? NEVER : c('r2', 'сотни', .87),
      palm: c('r2b', 'ладон', .04), spray: c('r2b', ['обвел', 'краск'], .31), paint: c('r2b', 'краск', .38),
      k67: c('r2b', ['шестидес', 'семьдес'], .6), k67e: c('r2b', 'лет', .89),
      // v34 says «почти семьдесят тысяч лет»: the caption follows the voice (ПОЧТИ 70 000), not the paper's 67 800
      almost70: (K.words?.r2b || []).some(x => norm(x.w).startsWith('семьдес')),
      snowSaid: (K.words?.r2 || []).some(x => norm(x.w).startsWith('снег')),
      bell: c('r3', ['физик', 'белл'], 0), pastA: c('r3', 'прошл', .29), never: c('r3', ['нельз', 'нет'], .44),
      memw: c('r3', 'памят', .57), recw: c('r3', 'запис', .67), here: c('r3', 'здесь', .78), now: c('r3', 'настоящ', .9),
      none: c('r4', 'носител', .04), mk4: c('r4', 'отметк', .21), q: c('r4', 'есть', .36), qe: c('r4', 'вообще', .45),
      // v34: Newton is gone from part 2 — without the word there is no river and no caption
      newton: (K.words?.r4 || []).some(x => norm(x.w).startsWith('ньютон')) ? c('r4', 'ньютон', .5) : NEVER, leib: K.r4_noleib ? NEVER : c('r4', 'лейбниц', .69), who: c('r4', 'кем', .94),
    };
  }

  /* ---------- placement tracks: [time, x, y, scale, opacity], eased between keys ---------- */
  function track(t, keys) {
    const k = keys.slice().sort((a, b) => a[0] - b[0]);
    let i = -1;
    for (let j = 0; j < k.length; j++) if (k[j][0] <= t) i = j;
    const pl = a => ({ x: a[1], y: a[2], s: a[3], op: a[4] });
    if (i < 0) return pl(k[0]);
    if (i === k.length - 1) return pl(k[i]);
    const a = k[i], b = k[i + 1], q = ease((t - a[0]) / Math.max(.001, b[0] - a[0]));
    return { x: lerp(a[1], b[1], q), y: lerp(a[2], b[2], q), s: lerp(a[3], b[3], q), op: lerp(a[4], b[4], q) };
  }
  const group = (op, s) => op > .01 ? `<g opacity="${f(Math.min(1, op))}">${s}</g>` : '';
  // mono label made of parts [[text, opacity]], size ≥ 9.4; spaces are NBSP so the width never jumps
  function label(x, y, parts, o = {}) {
    const op = o.opacity ?? .92; if (op <= .01) return '';
    const size = Math.max(9.4, o.size ?? 10);
    const sp = [].concat(parts).map(p => Array.isArray(p) ? p : [p, 1])
      .map(([s, q]) => `<tspan fill-opacity="${f(clamp(q))}">${esc(String(s).replace(/ /g, NB))}</tspan>`).join('');
    return `<text x="${f(x)}" y="${f(y)}" fill="#fff" opacity="${f(op)}" font-family="Plex" font-weight="600" font-size="${f(size)}" text-anchor="${o.anchor ?? 'middle'}" style="white-space:pre">${sp}</text>`;
  }
  const num = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* ---------- geometry helpers ---------- */
  const inPoly = (poly, x, y) => {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const segDist = (px, py, ax, ay, bx, by) => {
    const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy || 1, q = clamp(((px - ax) * dx + (py - ay) * dy) / l);
    return Math.hypot(px - ax - q * dx, py - ay - q * dy);
  };

  /* ---------- bridge: a small lattice tower that lifts one of two clocks ---------- */
  // local coords: ground y=132, deck y=-110; bottom clock (40,128), top clock rises from (40,90) to (34,-118)
  function drawTower(pl, t, grow, clockA, gain) {
    if (pl.op <= .01) return '';
    const s = pl.s, X = x => pl.x + x * s, Y = y => pl.y + y * s;
    let g = UN.polyline([[X(-70), Y(134)], [X(90), Y(134)]], { opacity: .3 * clockA, width: .6 });
    if (grow > .01) {
      const yTop = lerp(132, -110, grow), w = y => lerp(28, 8, (132 - y) / 242);
      g += UN.polyline([[X(-28), Y(132)], [X(-w(yTop)), Y(yTop)]], { opacity: .8, width: .8 }) + UN.polyline([[X(28), Y(132)], [X(w(yTop)), Y(yTop)]], { opacity: .8, width: .8 });
      g += UN.polyline([[X(-28), Y(132)], [X(-w(yTop)), Y(yTop)]], { opacity: .2, width: 3, glow: true }) + UN.polyline([[X(28), Y(132)], [X(w(yTop)), Y(yTop)]], { opacity: .2, width: 3, glow: true });
      for (let k = 0; k < 6; k++) {
        const ya = 132 - k * 40, yb = ya - 40; if (yb < yTop - .5) break;
        g += UN.polyline([[X(-w(ya)), Y(ya)], [X(w(yb)), Y(yb)]], { opacity: .35, width: .5 }) + UN.polyline([[X(w(ya)), Y(ya)], [X(-w(yb)), Y(yb)]], { opacity: .35, width: .5 });
        g += UN.polyline([[X(-w(yb)), Y(yb)], [X(w(yb)), Y(yb)]], { opacity: .5, width: .6 });
      }
      const ant = win(grow, .85, 1);
      if (ant > .01) {
        g += UN.polyline([[X(-14), Y(-110)], [X(14), Y(-110)]], { opacity: .8 * ant, width: .9 });
        g += UN.thread([X(0), Y(-110)], [X(0), Y(-110 - 36 * ant)], { opacity: .8 * ant, width: .7 });
        g += UN.sphere(X(0), Y(-110 - 36 * ant), Math.max(1.4, 2.4 * s), { glow: .6 + .4 * Math.sin(t * 3.1) ** 2, opacity: ant });
      }
    }
    // clocks: both hands run together; after «разошлись» the top one gains
    const base = t * 1.9, ty = lerp(76, -118, grow), tx = lerp(40, 34, grow), r = lerp(24, 17, grow) * s;
    if (clockA > .01) {
      g += group(clockA, TS.clock(X(40), Y(128 - 20), r, base, { trail: .5 }));
      g += group(clockA, TS.clock(X(tx), Y(ty - 20), r, base + gain, { trail: .5 + .5 * clamp(gain) }));
      if (grow > .2) g += UN.thread([X(9), Y(ty - 20)], [X(tx) - r, Y(ty - 20)], { opacity: .3 * clockA, width: .6 });
    }
    return group(pl.op, g);
  }

  /* ---------- bridge: the comparison record (a tape with two rows of digits) ---------- */
  // local coords: 176×74 centered; rows at y=-10 (ВЕРХ) and y=+16 (НИЗ); text only while scale ≥ .95
  const RW = 88, RH = 37, CW = 6;
  function drawRecord(pl, t, roll, lock, diff) {
    if (pl.op <= .01) return '';
    const s = pl.s, X = x => pl.x + x * s, Y = y => pl.y + y * s;
    let g = `<rect x="${f(X(-RW))}" y="${f(Y(-RH))}" width="${f(2 * RW * s)}" height="${f(2 * RH * s)}" fill="#fff" opacity=".05"/>`;
    g += UN.polyline([[X(-RW), Y(-RH)], [X(RW), Y(-RH)]], { opacity: .6, width: .7 }) + UN.polyline([[X(-RW), Y(RH)], [X(RW), Y(RH)]], { opacity: .6, width: .7 });
    g += UN.polyline([[X(-RW), Y(-RH)], [X(RW), Y(-RH)]], { opacity: .18, width: 2.6, glow: true });
    let perf = '';
    for (let x = -RW + 4; x < RW; x += 7) {
      const lit = .45 + .4 * Math.exp(-(((x + RW) / (2 * RW) - (t * .35) % 1) ** 2) / .004);
      perf += dot(X(x), Y(-RH + 4), Math.max(.45, .8 * s), lit) + dot(X(x), Y(RH - 4), Math.max(.45, .8 * s), lit);
    }
    g += `<g fill="#fff">${perf}</g>`;
    const text = clamp((s - .9) / .05);
    const rows = [['ВЕРХ', '4'], ['НИЗ', '0']];
    rows.forEach(([name, last], k) => {
      const y = k ? 16 : -10;
      let digs = '10:00:00,00000000';
      const rolling = roll * (1 - lock);
      if (rolling > .01) {
        const fr = Math.floor(t * 13);
        const tail = [0, 1, 2].map(j => String(Math.floor(H(fr * 7 + j * 3 + k * 101 + 1201) * 10))).join('');
        digs = digs.slice(0, -2) + (lock > .5 ? '00' : tail.slice(0, 2));
        last = lock > .5 ? last : tail[2];
      }
      if (text > .01) {
        g += label(X(-RW + 7), Y(y), name, { size: 10, anchor: 'start', opacity: .7 * text * roll });
        g += label(X(-48), Y(y), [[digs, 1], [last, 1]], { size: 10, anchor: 'start', opacity: .95 * text * roll });
      }
      // at a small scale the digits become a row of dashes
      if (text < .99) {
        let d = '';
        for (let j = 0; j < 18; j++) d += UN.thread([X(-48 + j * CW + 1), Y(y - 3)], [X(-48 + j * CW + 4.5), Y(y - 3)], { opacity: .6 * (1 - text) * roll, width: .9 });
        g += d;
      }
    });
    if (diff > .01) {
      const x0 = -48 + 17 * CW - 1.5, x1 = x0 + CW + 3;
      const box = [[X(x0), Y(-21)], [X(x1), Y(-21)], [X(x1), Y(21)], [X(x0), Y(21)]];
      g += UN.polyline(box, { close: true, opacity: .4 * diff, width: 2.4, glow: true }) + UN.polyline(box, { close: true, opacity: .9 * diff, width: .8 });
      if (text > .01) g += label(X((x0 + x1) / 2), Y(RH + 15), 'РАЗНИЦА', { size: 10, opacity: .9 * diff * text });
    }
    return group(pl.op, g);
  }

  /* ---------- carrier 1: head of dots (profile, faces right) with a tape of marks inside ---------- */
  const HEAD = [[-28, 98], [-30, 70], [-44, 42], [-52, 8], [-50, -28], [-36, -56], [-10, -72], [18, -70], [38, -54], [48, -32],
    [50, -12], [53, -4], [60, 10], [65, 20], [57, 24], [56, 30], [59, 34], [55, 39], [57, 45], [54, 53], [44, 61], [28, 62], [22, 72], [22, 98]];
  function headPts() {
    if (cache.head) return cache.head;
    const pts = [];
    for (let i = 0; pts.length < 440 && i < 5000; i++) {
      const x = -54 + 120 * H(i * 3 + 7001), y = -74 + 174 * H(i * 3 + 7002);
      if (!inPoly(HEAD, x, y)) continue;
      let d = 1e9;
      for (let k = 0; k < HEAD.length - 1; k++) d = Math.min(d, segDist(x, y, ...HEAD[k], ...HEAD[k + 1]));
      pts.push(Object.freeze({ x, y, rim: Math.exp(-d / 7), h: H(i + 7303), z: (H(i + 7404) - .5) * 2 }));
    }
    const cont = [];
    for (let k = 0; k < HEAD.length - 1; k++) {
      const [ax, ay] = HEAD[k], [bx, by] = HEAD[k + 1], n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / 3.4));
      for (let j = 0; j < n; j++) cont.push(Object.freeze({ x: lerp(ax, bx, j / n), y: lerp(ay, by, j / n), h: H(k * 40 + j + 7505) }));
    }
    return (cache.head = Object.freeze({ pts: Object.freeze(pts), cont: Object.freeze(cont) }));
  }
  function drawHead(pl, t, flash) {
    if (pl.op <= .01) return '';
    const P = headPts(), s = pl.s, X = x => pl.x + x * s, Y = y => pl.y + y * s, keep = clamp(.3 + s * .8);
    const sway = Math.sin(t * .37) * 4;
    let d = '';
    P.pts.forEach((p, i) => {
      if (H(i + 7606) > keep) return;
      const neck = 1 - ease((p.y - 64) / 34), tw = .8 + .2 * Math.sin(t * 2.1 + p.h * 40);
      d += dot(X(p.x + p.z * sway * (1 - p.rim)), Y(p.y), Math.max(.45, (.6 + .55 * p.h) * s), (.2 + .6 * p.rim) * tw * neck);
    });
    P.cont.forEach((c, i) => {
      if (H(i + 7707) > keep + .15) return;
      const neck = 1 - ease((c.y - 64) / 34), tw = .8 + .2 * Math.sin(t * 1.7 + c.h * 30);
      d += dot(X(c.x), Y(c.y), Math.max(.45, .75 * s), .78 * tw * neck);
    });
    let g = UN.polyline(HEAD.slice(0, -1).map(([x, y]) => [X(x), Y(y)]), { opacity: .16, width: 2.4 * Math.max(.5, s), glow: true });
    g += `<g fill="#fff">${d}</g>`;
    // tape of marks inside the head
    const n = 5, fw = 11, fh = 14, gap = 3, tot = n * fw + (n - 1) * gap, fx = -6, fy = -22;
    const L = fx - tot / 2 - 4, R = fx + tot / 2 + 4, T0 = fy - fh / 2 - 5, B0 = fy + fh / 2 + 5;
    g += `<rect x="${f(X(L))}" y="${f(Y(T0))}" width="${f((R - L) * s)}" height="${f((B0 - T0) * s)}" fill="#fff" opacity=".05"/>`;
    g += UN.polyline([[X(L), Y(T0)], [X(R), Y(T0)]], { opacity: .5 }) + UN.polyline([[X(L), Y(B0)], [X(R), Y(B0)]], { opacity: .5 });
    let perf = '';
    for (let x = L + 2; x < R; x += 4) perf += dot(X(x), Y(T0 + 2.4), Math.max(.4, .55 * s), .5) + dot(X(x), Y(B0 - 2.4), Math.max(.4, .55 * s), .5);
    g += `<g fill="#fff">${perf}</g>`;
    const ph = (t * 1.7) % (n + 2) - 1;
    for (let k = 0; k < n; k++) {
      const cx = fx - tot / 2 + fw / 2 + k * (fw + gap);
      const lit = clamp(Math.exp(-((k - ph) ** 2) / .7) * .7 + (flash ? flash(k) : 0));
      g += `<rect x="${f(X(cx - fw / 2))}" y="${f(Y(fy - fh / 2))}" width="${f(fw * s)}" height="${f(fh * s)}" rx="1.2" fill="#fff" fill-opacity="${f(.04 + .12 * lit)}" stroke="#fff" stroke-width=".6" stroke-opacity="${f(.35 + .6 * lit)}"/>`;
      g += UN.thread([X(cx), Y(fy - 4)], [X(cx), Y(fy + 4)], { opacity: .35 + .65 * lit, width: .8 });
      if (lit > .3) g += UN.thread([X(cx), Y(fy - 4)], [X(cx), Y(fy + 4)], { opacity: .5 * lit, width: 2.4, glow: true });
    }
    return group(pl.op, g);
  }

  /* ---------- carrier 2: a stick with notches ---------- */
  const ST = { top: -112, bot: 112, hw: 5.2 };
  function drawStick(pl, t, grow, notches, wx = 1) {   // wx — thickness factor (v8 p2 A1: 2.2, the stick reads on a phone)
    if (pl.op <= .01 || grow <= .01) return '';
    const s = pl.s, X = x => pl.x + x * s * wx, Y = y => pl.y + y * s, yTop = lerp(ST.bot, ST.top, grow);
    const side = sg => { const pts = []; for (let k = 0; k <= 24; k++) { const y = lerp(ST.bot, yTop, k / 24); pts.push([X(sg * ST.hw + .5 * Math.sin(y * .13 + sg)), Y(y)]); } return pts; };
    let g = UN.polyline([[X(0), Y(ST.bot)], [X(0), Y(yTop)]], { opacity: .1, width: 9 * wx * Math.max(.5, s), glow: true });
    if (wx > 1) g += `<path d="M${f(X(-ST.hw))} ${f(Y(ST.bot))} L${f(X(-ST.hw))} ${f(Y(yTop))} L${f(X(ST.hw))} ${f(Y(yTop))} L${f(X(ST.hw))} ${f(Y(ST.bot))} Z" fill="#fff" fill-opacity=".07"/>`;
    g += UN.polyline(side(-1), { opacity: .75, width: .7 }) + UN.polyline(side(1), { opacity: .75, width: .7 });
    g += UN.polyline([[X(-ST.hw), Y(yTop)], [X(0), Y(yTop - 2.2)], [X(ST.hw), Y(yTop)]], { opacity: .75, width: .7 });
    g += UN.polyline([[X(-ST.hw), Y(ST.bot)], [X(0), Y(ST.bot + 2.2)], [X(ST.hw), Y(ST.bot)]], { opacity: .55, width: .7 });
    for (const gx of [-1.8, 1.6]) { const pts = []; for (let k = 0; k <= 16; k++) { const y = lerp(ST.bot - 6, Math.max(yTop + 6, ST.top + 6), k / 16); pts.push([X(gx + .6 * Math.sin(y * .09 + gx)), Y(y)]); } if (yTop < ST.bot - 12) g += UN.polyline(pts, { opacity: .22, width: .45 }); }
    let grain = '';
    for (let k = 0; k < 46; k++) {
      const y = ST.bot - (ST.bot - ST.top) * H(k + 8001); if (y < yTop) continue;
      grain += dot(X((H(k + 8002) - .5) * 2 * ST.hw * .7), Y(y), Math.max(.4, .5 * s), (.2 + .3 * H(k + 8003)) * (.85 + .15 * Math.sin(t * 1.9 + k)));
    }
    g += `<g fill="#fff">${grain}</g>`;
    for (const nt of notches) {
      if (nt.c <= .01) continue;
      const y = nt.y;
      const xe2 = lerp(-ST.hw - 4, ST.hw + 4, nt.c);
      g += UN.polyline([[X(-ST.hw - .6), Y(y - 4.5)], [X(-ST.hw + 3.2), Y(y)], [X(-ST.hw - .6), Y(y + 4.5)]], { opacity: .9 * ease(nt.c * 1.6), width: .8 });
      g += UN.polyline([[X(ST.hw + .6), Y(y - 4.5)], [X(ST.hw - 3.2), Y(y)], [X(ST.hw + .6), Y(y + 4.5)]], { opacity: .9 * ease((nt.c - .5) * 2), width: .8 });
      if (nt.wedge) {   // v8 p2 A1: a bright wedge cut into the wood, with a flash when it is cut
        const dw = 5.5 / wx;
        // two wedges cut in from both edges (a notch, not an arrow), a thin cut line between them
        const cl = clamp(nt.c * 1.6), cr = clamp(nt.c * 1.6 - .6);
        g += `<path d="M${f(X(-ST.hw - .4))} ${f(Y(y - 7))} L${f(X(-ST.hw + 3.6 * cl))} ${f(Y(y))} L${f(X(-ST.hw - .4))} ${f(Y(y + 7))} Z" fill="#fff" opacity="${f(.95 * cl)}"/>`;
        g += `<path d="M${f(X(ST.hw + .4))} ${f(Y(y - 7))} L${f(X(ST.hw - 3.6 * cr))} ${f(Y(y))} L${f(X(ST.hw + .4))} ${f(Y(y + 7))} Z" fill="#fff" opacity="${f(.95 * cr)}"/>`;
        g += UN.thread([X(-ST.hw), Y(y)], [X(lerp(-ST.hw, ST.hw, nt.c)), Y(y)], { opacity: .9, width: 1.4 }) +
          UN.thread([X(-ST.hw), Y(y)], [X(lerp(-ST.hw, ST.hw, nt.c)), Y(y)], { opacity: .4 + .5 * nt.glow, width: 3 + 3 * nt.glow, glow: true });
        const fl = Math.exp(-Math.pow((t - nt.tc + .25) / .3, 2));
        if (fl > .02) g += `<circle cx="${f(X(0))}" cy="${f(Y(y))}" r="${f((16 + 26 * (1 - fl)) * s)}" fill="url(#un-halo)" opacity="${f(.9 * fl)}"/>` +
          UN.thread([X(-ST.hw - 14 * dw), Y(y)], [X(ST.hw + 14 * dw), Y(y)], { opacity: .8 * fl, width: 3, glow: true });
      }
      if (!nt.wedge) {
        g += UN.thread([X(-ST.hw - 4), Y(y)], [X(xe2), Y(y)], { opacity: .95, width: 1.2 });
        g += UN.thread([X(-ST.hw - 4), Y(y)], [X(xe2), Y(y)], { opacity: .45 + .5 * nt.glow, width: 3.4 + 3 * nt.glow, glow: true });
      }
      if (nt.c < .98) g += UN.sphere(X(nt.wedge ? lerp(-ST.hw, ST.hw, nt.c) : xe2), Y(y), Math.max(1.4, 2.3 * s), { glow: .9 });
      if (nt.glow > .01) g += UN.sphere(X(0), Y(y), Math.max(2, 3.4 * s), { glow: 1, opacity: nt.glow });
      const age = t - nt.tc;
      if (age > 0 && age < 1.3) {
        let ch = '';
        for (let k = 0; k < 6; k++) {
          const v = .5 + H(k + nt.y * 7 + 8101);
          ch += dot(X(-ST.hw - 16 * age * v), Y(y - 10 * age * (H(k + 8202) + .3) + 22 * age * age), Math.max(.5, .8 * s), .8 * (1 - age / 1.3));
        }
        g += `<g fill="#fff">${ch}</g>`;
      }
    }
    return group(pl.op, g);
  }

  /* ---------- carrier 3: the ice sheet in section; snow, sinking annual layers, the core, bubbles ---------- */
  const IR = 24, ITOP = -105, IBOT = 105, LA = 7, LSTEP = .5;
  function icePts() {
    if (cache.ice) return cache.ice;
    const bub = [];
    for (let k = 0; k < 95; k++) bub.push(Object.freeze({ x: (H(k + 9001) - .5) * 2 * IR * .8, y: ITOP + 8 + (IBOT - ITOP - 14) * Math.sqrt(H(k + 9002)), r: .5 + 1.9 * H(k + 9003) ** 2, h: H(k + 9004) }));
    const snow = [];
    for (let k = 0; k < 50; k++) snow.push(Object.freeze({ x: (H(k + 9101) - .5) * 320, y: ITOP + 3 + 14 * H(k + 9102) ** 1.5, h: H(k + 9103) }));
    const flakes = [];
    for (let k = 0; k < 46; k++) flakes.push(Object.freeze({ x: (H(k + 9151) - .5) * 330, h: H(k + 9152), v: .7 + .6 * H(k + 9153), w: H(k + 9154) * 6 }));
    return (cache.ice = Object.freeze({ bub: Object.freeze(bub), snow: Object.freeze(snow), flakes: Object.freeze(flakes) }));
  }
  const ell = (X, Y, y, a0, a1, ry = 6) => { const pts = []; for (let k = 0; k <= 20; k++) { const a = lerp(a0, a1, k / 20); pts.push([X(IR * Math.cos(a)), Y(y + ry * Math.sin(a))]); } return pts; };
  // o: sheet, fall, core, tau (layer clock), scan (0..1 depth), scanA, deep, air
  function drawIce(pl, t, o) {
    if (pl.op <= .01) return '';
    const P = icePts(), s = pl.s, X = x => pl.x + x * s, Y = y => pl.y + y * s;
    const surfY = x => ITOP - 7 * (1 - (x / 165) ** 2);
    let g = '';
    // annual layers: line j is born at the surface at tau = -LA + j*LSTEP and sinks, compressing with depth
    const layers = [];
    for (let j = 0; j < 80; j++) {
      const age = o.tau - (-LA + j * LSTEP);
      if (age <= 0) break;
      if (age >= LA) continue;
      const d = (age / LA) ** .6;
      layers.push({ d, y: ITOP + 4 + (IBOT - ITOP - 8) * d, op: win(age, 0, .5) * (1 - win(age, .9 * LA, LA)), j });
    }
    if (o.sheet > .01) {
      const surf = [];
      for (let k = 0; k <= 30; k++) { const x = -165 + 330 * k / 30; surf.push([X(x), Y(surfY(x))]); }
      g += UN.polyline(surf, { opacity: .6 * o.sheet, width: .7 }) + UN.polyline(surf, { opacity: .22 * o.sheet, width: 2.4, glow: true });
      for (const L of layers) {
        const y = L.y, a = (.18 + .2 * (1 - L.d)) * L.op * o.sheet;
        if (a > .01) g += `<path d="M${f(X(-160))} ${f(Y(y))} L${f(X(160))} ${f(Y(y))}" stroke="#fff" stroke-width=".6" stroke-dasharray="2 4" opacity="${f(a)}"/>`;
      }
      let sn = '';
      P.snow.forEach(d => { sn += dot(X(d.x), Y(surfY(d.x) + (d.y - ITOP)), Math.max(.4, .6 * s), (.15 + .3 * d.h) * o.sheet * (.8 + .2 * Math.sin(t * 1.3 + d.h * 20))); });
      g += `<g fill="#fff">${sn}</g>`;
    }
    if (o.fall > .01) {
      let fl = '';
      P.flakes.forEach((d, k) => {
        const ph = (t * .3 * d.v + d.h) % 1, x = d.x + 6 * Math.sin(t * 1.1 + d.w), y = ITOP - 150 + 146 * ph;
        fl += dot(X(x), Y(y), Math.max(.5, (.8 + .8 * d.h) * s), .85 * o.fall * Math.sin(Math.PI * ph) ** .5);
      });
      g += `<g fill="#fff">${fl}</g>`;
    }
    if (o.core > .01) {
      let c = '';
      c += `<rect x="${f(X(-IR))}" y="${f(Y(ITOP))}" width="${f(2 * IR * s)}" height="${f((IBOT - ITOP) * s)}" fill="#000" opacity=".6"/>`;
      c += `<rect x="${f(X(-IR))}" y="${f(Y(ITOP))}" width="${f(2 * IR * s)}" height="${f((IBOT - ITOP) * s)}" fill="#fff" opacity=".05"/>`;
      for (const sg of [-1, 1]) {
        c += UN.thread([X(sg * IR), Y(ITOP)], [X(sg * IR), Y(IBOT)], { opacity: .75, width: .7 });
        c += UN.thread([X(sg * IR), Y(ITOP)], [X(sg * IR), Y(IBOT)], { opacity: .22, width: 2.6, glow: true });
      }
      c += UN.polyline(ell(X, Y, ITOP, 0, 2 * Math.PI), { opacity: .75, width: .7 });
      c += UN.polyline(ell(X, Y, IBOT, 0, Math.PI), { opacity: .7, width: .7 });
      c += `<path d="M${ell(X, Y, IBOT, Math.PI, 2 * Math.PI).map(p => f(p[0]) + ' ' + f(p[1])).join(' L')}" fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray="2 3" opacity=".3"/>`;
      for (const L of layers) {
        const boost = o.scanA * Math.exp(-((L.d - o.scan) ** 2) / .006);
        const a = (.16 + .1 * H(L.j + 9201) + .7 * boost + .25 * o.deep * win(L.d, .72, .85)) * L.op;
        c += UN.polyline(ell(X, Y, L.y, 0, Math.PI, 5), { opacity: Math.min(1, a), width: .5 + .5 * boost });
        if (boost > .3) c += UN.polyline(ell(X, Y, L.y, 0, Math.PI, 5), { opacity: .4 * boost * L.op, width: 2.4, glow: true });
      }
      if (o.deep > .01) {
        const y0 = ITOP + (IBOT - ITOP) * .76;
        c += `<rect x="${f(X(-IR))}" y="${f(Y(y0))}" width="${f(2 * IR * s)}" height="${f((IBOT - y0) * s)}" fill="#fff" opacity="${f(.08 * o.deep)}"/>`;
        const box = [[X(-IR), Y(y0)], [X(IR), Y(y0)], [X(IR), Y(IBOT)], [X(-IR), Y(IBOT)]];
        c += UN.polyline(box, { close: true, opacity: .35 * o.deep, width: 2.2, glow: true });
      }
      let b = '';
      P.bub.forEach((d, k) => {
        const deepB = d.y > ITOP + (IBOT - ITOP) * .74 ? o.deep : 0;
        const tw = .75 + .25 * Math.sin(t * 2.3 + d.h * 50), op = Math.min(1, (.25 + .4 * d.h) * tw * (1 + .8 * o.air + 1.4 * deepB));
        b += `<circle cx="${f(X(d.x))}" cy="${f(Y(d.y + .8 * Math.sin(t * .9 + k)))}" r="${f(Math.max(.5, d.r * s))}" fill="${d.h > .78 ? '#fff' : 'none'}" fill-opacity=".5" stroke="#fff" stroke-width=".45" opacity="${f(op)}"/>`;
      });
      c += b;
      g += group(o.core, c);
    }
    if (o.air > .01) {
      const sx = X(-6), sy = Y(88), bx = X(-74), by = Y(36), br = 16 * s;
      g += UN.sphere(sx, sy, Math.max(1.4, 2.4 * s), { glow: 1, opacity: o.air });
      g += UN.thread([sx, sy], [lerp(sx, bx, o.air), lerp(sy, by, o.air)], { opacity: .6 * o.air, width: .6 });
      let mol = '';
      for (let j = 0; j < 8; j++) mol += dot(bx + br * .55 * Math.cos(t * 1.3 + j * 2.1 + H(j + 9301) * 6), by + br * .55 * Math.sin(t * 1.7 + j * 1.3), Math.max(.6, 1.1 * s), .85);
      g += group(o.air, `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(br * 2.2)}" fill="url(#un-halo)" opacity=".5"/>` +
        `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(br)}" fill="#000" fill-opacity=".6" stroke="#fff" stroke-width=".8" opacity=".9"/>` +
        `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(br)}" fill="none" stroke="#fff" stroke-width="2.4" opacity=".3" filter="url(#un-soft)"/><g fill="#fff">${mol}</g>`);
    }
    return group(pl.op, g);
  }
  // the layer clock: layers drift slowly always, fast while the snow lies down («снег» … «слой»)
  function layerTau(t, T) {
    const a = T.snow, b = T.layer + .4, t0 = T.r2 - 1;
    if (t <= t0) return 0;
    let tau = 0;
    for (let x = t0; x < t; x += .04) {
      const r = .1 + .9 * win(x, a - .2, a + .4) * (1 - win(x, b - .3, b + .4));
      tau += r * Math.min(.04, t - x);
    }
    return tau;
  }

  /* ---------- carrier 4: cave wall of dots with a hand stencil (the palm stays dark) ---------- */
  const HAND = [[-15, -14, -24, -60, 6.6], [-3, -18, -4, -71, 7], [10, -15, 16, -63, 6.6], [21, -6, 34, -42, 5.6], [-20, 16, -50, -12, 7.6], [0, 34, 1, 62, 17.5]];
  const roundBox = (px, py, cx, cy, hx, hy, r) => { const qx = Math.abs(px - cx) - hx + r, qy = Math.abs(py - cy) - hy + r; return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r; };
  const handSdf = (x, y) => { let d = roundBox(x, y, -1, 10, 25, 24, 11); for (const c of HAND) d = Math.min(d, segDist(x, y, c[0], c[1], c[2], c[3]) - c[4]); return d; };
  function handPts() {
    if (cache.hand) return cache.hand;
    const wall = [], spray = [], cracks = [];
    for (let i = 0; wall.length < 700 && i < 3000; i++) {
      const x = (H(i * 2 + 9501) - .5) * 300, y = (H(i * 2 + 9502) - .5) * 250, e = (x / 150) ** 2 + (y / 125) ** 2;
      if (e > 1 || handSdf(x, y) < 1.2) continue;
      const n = .5 + .5 * Math.sin(x * .06 + 1.3 * Math.sin(y * .045)) * Math.cos(y * .05 - x * .021 + .7);
      wall.push(Object.freeze({ x, y, op: (.12 + .4 * n * (.4 + .6 * H(i + 9601))) * (1 - e * e), r: .45 + .6 * H(i + 9602), h: H(i + 9603) }));
    }
    for (let i = 0; spray.length < 700 && i < 12000; i++) {
      const x = -82 + 146 * H(i * 2 + 9701), y = -98 + 186 * H(i * 2 + 9702), d = handSdf(x, y);
      if (d < .4 || H(i + 9801) > Math.exp(-d / 7.5) * .95) continue;
      const ord = (((Math.atan2(y, x + 1) - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) / (2 * Math.PI);
      spray.push(Object.freeze({ x, y, ord: Math.min(.97, ord + .03 * H(i + 9802)), h: H(i + 9803) }));
    }
    for (let c = 0; c < 3; c++) {
      const pts = []; let x = (H(c + 9901) - .5) * 220, y = -110 + 30 * c, a = 1.2 + H(c + 9902);
      for (let k = 0; k < 14; k++) { pts.push([x, y]); a += (H(c * 31 + k + 9903) - .5) * .9; x += Math.cos(a) * 9; y += Math.sin(a) * 9; }
      cracks.push(Object.freeze(pts));
    }
    return (cache.hand = Object.freeze({ wall: Object.freeze(wall), spray: Object.freeze(spray), cracks: Object.freeze(cracks) }));
  }
  function drawHand(pl, t, sp) {
    if (pl.op <= .01) return '';
    const P = handPts(), s = pl.s, X = x => pl.x + x * s, Y = y => pl.y + y * s, keep = clamp(.3 + s * .75);
    let g = '';
    for (const c of P.cracks) g += UN.polyline(c.map(([x, y]) => [X(x), Y(y)]), { opacity: .2, width: .5 });
    let w = '';
    P.wall.forEach((d, i) => { if (H(i + 9611) > keep) return; w += dot(X(d.x), Y(d.y), Math.max(.4, d.r * s), d.op * (.85 + .15 * Math.sin(t * 1.1 + d.h * 40))); });
    let p = '';
    if (sp > 0) P.spray.forEach((d, i) => {
      if (H(i + 9711) > keep + .1) return;
      const a = clamp((sp - d.ord) / .06); if (a <= 0) return;
      p += dot(X(d.x), Y(d.y), Math.max(.45, (.55 + .5 * d.h) * s), (.35 + .55 * d.h) * a * (.85 + .15 * Math.sin(t * 1.6 + d.h * 30)));
    });
    g += `<g fill="#fff">${w}${p}</g>`;
    return group(pl.op, g);
  }

  /* ---------- question mark of dots ---------- */
  function qmark(cx, cy, sc, prog, op, t) {
    if (op <= .01 || prog <= .01) return '';
    const pts = [], N = 34;
    for (let k = 0; k <= N; k++) { const a = Math.PI + (Math.PI + .9) * k / N; pts.push([16 * Math.cos(a), -14 + 16 * Math.sin(a)]); }
    const e = pts[pts.length - 1];
    for (let k = 1; k <= 6; k++) pts.push([lerp(e[0], 0, k / 6), lerp(e[1], 8, k / 6)]);
    for (let k = 1; k <= 4; k++) pts.push([0, 8 + 2 * k]);
    let d = '';
    pts.forEach(([x, y], k) => {
      const a = clamp((prog * 1.08 - k / pts.length) / .08);
      d += dot(cx + (x + .7 * Math.sin(t * 2 + k)) * sc, cy + (y + .7 * Math.cos(t * 1.7 + k)) * sc, 1.5 * sc, .9 * a);
    });
    const vis = pts.filter((_, k) => k / pts.length < prog).map(([x, y]) => [cx + x * sc, cy + y * sc]);
    let g = UN.polyline(vis, { opacity: .22, width: 3, glow: true }) + `<g fill="#fff">${d}</g>`;
    if (prog > .85) g += UN.sphere(cx, cy + 28 * sc, 3.2 * sc, { glow: .9, opacity: ease((prog - .85) / .15) });
    return group(op, g);
  }

  /* ---------- the time axis (bell and duel) ---------- */
  function axis(t, A, center, right) {
    if (A <= .01) return '';
    const breath = .85 + .15 * Math.sin(t * 1.3);
    return UN.thread([22, AX_Y], [152, AX_Y], { opacity: .42 * A * breath, width: .7 }) +
      UN.thread([152, AX_Y], [212, AX_Y], { opacity: .42 * A * breath * center, width: .7 }) +
      UN.thread([212, AX_Y], [338, AX_Y], { opacity: .42 * A * breath * right, width: .7 }) +
      UN.thread([22, AX_Y], [338 - 126 * (1 - right), AX_Y], { opacity: .12 * A, width: 2.6, glow: true });
  }
  function nowPoint(t, A, flare, arrived, here) {
    if (A <= .01) return '';
    let s = '';
    const u = clamp((t - here) / .9), r = 2.2 + 1.3 * arrived + 2.2 * flare + .3 * Math.sin(t * 2.2);
    if (u > 0 && u < 1) s += `<circle cx="${CX}" cy="${AX_Y}" r="${f(6 + 46 * u)}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.5 * (1 - u))}" filter="url(#un-soft)"/>`;
    return s + UN.sphere(CX, AX_Y, r, { glow: .6 + .4 * Math.max(flare, arrived), opacity: A });
  }

  /* ---------- the chain: bridge → notch → world → bell ---------- */
  const SLOT = { ice: [76, 104, .42], record: [180, 100, .5], hand: [282, 102, .44], head: [104, 272, .48], stick: [256, 272, .46] };
  function chain(t, T) {
    let s = UN.bokeh(t, { count: 16, opacity: .8, seed: 31 });
    let labels = '';
    if (T.layers0 < NEVER && T.r2 < NEVER) {   // v6 A4: the cut stands at once over the whole frame from «У мира», bright, until «Лёд»
      const tL = T.r2, lop = win(t, tL - .2, tL + .2) * (1 - win(t, T.ice - .1, T.ice + .4));
      if (lop > .01) {
        let g = `<rect x="-10" y="60" width="380" height="330" fill="#000"/>`, y = 384;   // v5 A4: contrast, the whole frame
        for (let k = 0; k < 16; k++) {
          const h = 10 + 22 * H(k + 9601), on = win(t, tL - .1 + k * .025, tL + .15 + k * .025);
          if (on > .01) g += `<rect x="0" y="${f(y - h * on)}" width="360" height="${f(h * on)}" fill="#fff" fill-opacity="${f((k % 2 ? .06 : .62) + .1 * H(k + 9602))}" stroke="#fff" stroke-width=".6" stroke-opacity=".7"/>`;
          y -= h;
        }
        s += `<g opacity="${f(lop)}">${g}</g>` + plate(180, 112, 'СЛОИ', lop, 18);
      }
    }
    // part 2 (noBridge): other scenes run between the ice and Bell — the carriers regroup just before Bell,
    // and the ice stays through the dissolve into ts_memory
    const regroup0 = T.hasBell ? (T.noBridge ? T.bell - 1.2 : T.wEnd - .25) : NEVER, regroup1 = T.hasBell ? T.bell + .35 : NEVER, shrink = .8;
    const wOut = T.noBridge ? T.wEnd + .9 : T.wEnd;
    const into = (name, t0) => { const sl = SLOT[name]; return [[regroup0, sl[0] - 110, sl[1], sl[2], 0], [regroup1, sl[0], sl[1], sl[2], 1], [t0, sl[0], sl[1], sl[2], 1], [t0 + shrink, CX, AX_Y, .03, 0]]; };
    const pull = { head: T.memw, stick: T.recw, record: T.recw + .12, ice: T.recw + .24, hand: T.recw + .36 };
    if (!T.hasB) delete pull.hand;
    if (T.noBridge) delete pull.record;

    /* m1: tower with two clocks, the comparison record, «откуда знаешь?» */
    const tower = track(t, [[T.m1 - .05, 168, 206, 1, 1], [T.rec - .2, 168, 206, 1, 1], [T.rec + .6, 92, 202, .82, 1], [T.ask - .1, 92, 202, .82, 1], [T.ask + .45, 60, 202, .82, 0]]);
    const grow = win(t, T.tower - .1, T.tower + .7), clockA = win(t, T.m1 - .05, T.m1 + .4);
    const gain = 1.1 * win(t, T.apart - .05, T.apart + 1.3) + .25 * clamp((t - T.apart - 1.3) / 4);
    if (!T.noBridge) s += drawTower(tower, t, grow, clockA, gain);
    const record = track(t, [[T.rec - .15, 330, 200, 1, 0], [T.rec + .55, 258, 200, 1, 1], [T.ask - .1, 258, 200, 1, 1], [T.ask + .45, 228, 200, 1, 0], ...into('record', pull.record)]);
    const lock = win(t, T.cmp - .05, T.cmp + .25), diff = win(t, T.cmp + .1, T.cmp + .5);
    if (!T.noBridge) s += drawRecord(record, t, 1, lock, diff);
    const bridgeLinks = T.noBridge ? 0 : Math.min(tower.op, record.op) * win(t, T.rec + .2, T.rec + .7);
    if (bridgeLinks > .01) {
      const X = x => tower.x + x * tower.s, Y = y => tower.y + y * tower.s, tx = lerp(40, 34, grow), ty = lerp(76, -118, grow);
      const rx = record.x - RW * record.s;
      s += UN.thread([X(tx) + 17 * tower.s, Y(ty - 20)], [rx, record.y - 13 * record.s], { opacity: .5 * bridgeLinks, width: .6 });
      s += UN.thread([X(57), Y(108)], [rx, record.y + 13 * record.s], { opacity: .5 * bridgeLinks, width: .6 });
    }

    /* r1: head and stick */
    const hIn = T.noBridge ? T.m1 : T.ask, p2 = T.noBridge;
    // v8 p2 A1: in part 2 the head with ПО ОТМЕТКАМ leaves on «Зарубка», the stick takes the middle
    const head = track(t, p2 ? [[hIn + .05, 214, 190, 1.12, 0], [hIn + .75, 168, 190, 1.12, 1], [T.n1 - .5, 168, 190, 1.12, 1], [T.n1 + .2, 40, 190, 1, 0]] :
      [[hIn + .05, 214, 190, 1.12, 0], [hIn + .75, 168, 190, 1.12, 1], [T.n1 - .45, 168, 190, 1.12, 1], [T.n1 + .25, 112, 190, 1.08, 1], [T.wStart - .05, 112, 190, 1.08, 1],
      [T.wStart + .85, -150, 190, 1.08, 0], ...into('head', pull.head)]);
    const flash = k => win(t, T.marks + k * .1, T.marks + k * .1 + .25) * (1 - win(t, T.marks + k * .1 + .7, T.marks + k * .1 + 1.4)) +
      (k === 3 ? win(t, T.n1 + .2, T.n1 + .45) * (1 - win(t, T.n1 + .9, T.n1 + 1.6)) : 0) +
      (k === 4 ? win(t, T.n2 + .2, T.n2 + .45) * (1 - win(t, T.n2 + .9, T.n2 + 1.6)) : 0) +
      .8 * win(t, T.other - .05, T.other + .3) * (1 - win(t, T.other + .9, T.other + 1.8));
    s += drawHead(head, t, flash);
    s += qmark(292, 150, 1.3, win(t, T.ask - .05, Math.max(T.ask + .6, T.go + .2)), 1 - win(t, T.marks - .15, T.marks + .3), t);
    const r1lab = 1 - win(t, T.wStart - .05, T.wStart + .4);
    if (r1lab > .01) {
      labels += label(head.x, head.y - 100 * head.s, 'ПО ОТМЕТКАМ', { size: 11, opacity: .95 * win(t, T.marks - .05, T.marks + .4) * r1lab * head.op });
    }
    // blind view v2 A2: the stick larger (about half the frame height)
    const stick = track(t, p2 ? [[T.n1 - .45, 180, 205, 1.3, 1], [T.nos - .15, 180, 205, 1.3, 1], [T.nos + .55, 180, 190, 1.6, 1], [T.wStart - .6, 180, 190, 1.6, 1], [T.wStart, 2, 196, 1.25, 0]] :
      [[T.n1 - .45, 264, 196, 1.25, 1], [T.wStart - .6, 264, 196, 1.25, 1], [T.wStart, 2, 196, 1.25, 0], ...into('stick', pull.stick)]);   // v3 A2: gone by «Ладонь»   // v8 p2: centre, zoom on «носитель»
    const yest = win(t, T.early - .1, T.early + .35);
    const notches = [
      { y: 28, c: win(t, T.n1, T.n1 + .5), tc: T.n1 + .5, glow: yest, wedge: p2 },
      { y: -12, c: win(t, T.n2, T.n2 + .45), tc: T.n2 + .45, glow: .25 * win(t, T.other - .05, T.other + .4), wedge: p2 },
    ];
    if (p2) {   // v8 p2 A1: «завтра ещё одна» — a day passes: the sun sets on the right, a short night, it rises on the left
      const dOn = win(t, T.n1 - .4, T.n1 + .2) * (1 - win(t, T.wStart - .6, T.wStart)) * stick.op, cyc = win(t, T.zav - .15, T.n2 + .5), th = .75 + 2 * Math.PI * cyc;
      if (dOn > .01) {
        const sx = 180 + 128 * Math.sin(th), sy = 330 - 200 * Math.cos(th), day = clamp((330 - sy) / 70), night = (1 - day) * win(t, T.zav - .2, T.zav + .1);
        const dim = 1 - .55 * win(t, T.nos - .1, T.nos + .6);
        let g = `<circle cx="${f(sx)}" cy="${f(sy)}" r="120" fill="url(#un-halo)" opacity="${f(.42 * day * dim)}"/>`;
        if (sy < 336) g += UN.sphere(sx, sy, 10, { glow: 1, opacity: clamp((336 - sy) / 14) * dim });
        g += UN.thread([16, 330], [344, 330], { opacity: .45, width: .7 });
        if (night > .01) {
          let st = '';
          for (let k = 0; k < 26; k++) st += dot(12 + 336 * H(k + 9301), 30 + 250 * H(k + 9311), .6 + 1 * H(k + 9321), night * (.4 + .5 * H(k + 9331)));
          g += `<g fill="#fff">${st}</g><g opacity="${f(night)}"><circle cx="86" cy="104" r="15" fill="#fff" opacity=".85"/><circle cx="93" cy="99" r="13.5" fill="#000"/></g>`;
        }
        s += group(dOn, g);
      }
    }
    s += drawStick(stick, t, win(t, T.n1 - .45, T.n1 + .05), notches, p2 ? 2.2 : 1);
    if (r1lab > .01 && p2) {   // v8 p2 A1: НОСИТЕЛЬ ОТМЕТОК as a large plate; ВЧЕРА / СЕГОДНЯ large at their notches
      labels += plate(CX, 84, 'НОСИТЕЛЬ ОТМЕТОК', win(t, T.nos - .1, T.nos + .3) * r1lab, 19);
      const lx = stick.x - 96, y1 = stick.y + 28 * stick.s, y2 = stick.y - 12 * stick.s, so = win(t, T.other - .05, T.other + .35) * r1lab;
      if (yest > .01) labels += UN.thread([lx + 30, y1], [stick.x - 20, y1], { opacity: .6 * yest * r1lab, width: .8 }) + plate(lx, y1 + 6, 'ВЧЕРА', yest * r1lab, 18);
      if (so > .01) labels += UN.thread([lx + 46, y2], [stick.x - 20, y2], { opacity: .6 * so, width: .8 }) + plate(lx, y2 + 6, 'СЕГОДНЯ', so, 18);
      labels += plate(CX, 344, 'БЫЛО ПРОШЛОЕ', win(t, T.past - .1, T.past + .35) * r1lab, 18);
    }
    if (r1lab > .01 && !p2) {
      labels += label(stick.x, stick.y - 126 * stick.s, 'НОСИТЕЛЬ ОТМЕТОК', { size: 10.5, opacity: .9 * win(t, T.nos - .05, T.nos + .4) * r1lab });
      if (yest > .01) {
        const lx = stick.x + 18 * stick.s;
        labels += UN.thread([stick.x + 6, stick.y + 28 * stick.s], [lx - 2, stick.y + 28 * stick.s], { opacity: .5 * yest * r1lab });
        labels += label(lx, stick.y + 28 * stick.s + 3.6, 'ВЧЕРА', { size: 10.5, anchor: 'start', opacity: .95 * yest * r1lab });
        labels += label(lx, stick.y - 12 * stick.s + 3.6, 'СЕГОДНЯ', { size: 10, anchor: 'start', opacity: .7 * win(t, T.other - .05, T.other + .4) * r1lab });
      }
      const pw = win(t, T.past - .1, T.past + .35) * r1lab;
      if (pw > .01) {
        labels += label(CX, 344, 'БЫЛО ПРОШЛОЕ', { size: 12.5, opacity: .97 * pw });
        labels += UN.thread([CX - 44, 352], [CX + 44, 352], { opacity: .4 * pw, width: .6 });
      }
    }

    /* r2: the ice sheet — snow, layers, the core, the deep air, «до 800 000 лет»; r2b: the hand on the cave wall */
    const iceKeys = [[T.r2 - .05, 442, 236, 1.1, 0], [T.r2 + .85, 180, 236, 1.1, 1], [T.press - .1, 180, 236, 1.1, 1], [T.ice + .5, 180, 182, 1.1, 1], [T.deep - .15, 180, 182, 1.1, 1], [T.deep + .9, 180, 122, 1.35, 1],
      [T.k800e + .3, 180, 128, 1.3, 1], [T.handFirst ? T.k800e + 4 : Math.min(T.k800e + 4, T.palm - .2), 180, 150, 1.18, 1]];
    if (T.hasB && !T.handFirst) iceKeys.push([T.palm - .15, 180, 140, 1.2, 1], [T.palm + .7, -90, 140, 1.2, 0]);
    const ice = track(t, iceKeys.concat(into('ice', pull.ice)));
    const sheet = win(t, T.r2 - .05, T.r2 + .6) * (1 - win(t, T.wEnd - .4, T.bell + .2));
    const fall = (.3 + .7 * win(t, T.snow - .1, T.snow + .4)) * (1 - .75 * win(t, T.ice, T.layer + .8));
    const core = win(t, T.ice - .1, T.ice + .6);
    const scanA = win(t, T.layer - .05, T.layer + .2) * (1 - win(t, T.deep + .1, T.deep + .6));
    const scan = clamp((t - T.layer) / Math.max(.6, T.deep + .2 - T.layer));
    const deep = win(t, T.deep - .05, T.deep + .5) * (1 - .5 * win(t, T.wEnd - .4, T.bell + .2));
    const air = win(t, T.air - .05, T.air + .5) * (T.hasBell ? 1 - win(t, wOut - .4, wOut) : 1);
    s += drawIce(ice, t, { sheet, fall, core, tau: layerTau(t, T), scan, scanA, deep, air });
    const iceLab = ice.op * (T.hasBell ? 1 - win(t, wOut - .4, wOut + .1) : 1);
    if (iceLab > .01) {
      const X = x => ice.x + x * ice.s, Y = y => ice.y + y * ice.s;
      const sw = win(t, T.snow - .05, T.snow + .35) * (1 - win(t, T.deep - .15, T.deep + .4));
      if (T.snowSaid) labels += label(X(-150), Y(-128), 'СНЕГ', { size: 11, anchor: 'start', opacity: .95 * sw * iceLab });   // v34 does not say «снег»
      const iw = win(t, T.ice - .05, T.ice + .35) * (1 - win(t, T.deep - .15, T.deep + .4));
      if (iw > .01) {
        labels += UN.thread([X(IR + 3), Y(-40)], [X(IR + 22), Y(-40)], { opacity: .5 * iw * iceLab });
        labels += label(X(IR + 26), Y(-36.5), 'ЛЁД', { size: 11, anchor: 'start', opacity: .95 * iw * iceLab });
      }
      const kw = win(t, (T.hundreds < NEVER ? T.hundreds : T.k800) - .05, (T.hundreds < NEVER ? T.hundreds : T.k800) + .3) * iceLab;
      if (kw > .01) {
        const v = Math.round(800 * win(t, T.k800, T.k800 + .1 + .7 * (T.k800e - T.k800))) * 1000, lx = X(IR + 12), ly = Y(96);
        labels += UN.thread([X(IR) + 2, ly - 3.5], [lx - 3, ly - 3.5], { opacity: .5 * kw });
        if (T.hundreds < NEVER) labels += plate(196, 344, 'СОТНИ ТЫСЯЧ ЛЕТ', kw, 19);   // blind view v2 B1: the number is the hero
        else labels += label(lx, ly, `≈ ${num(v).padStart(7, ' ')} ЛЕТ`, { size: 11, anchor: 'start', opacity: .97 * kw });
      }
    }
    if (T.hasB) {
      const hand = track(t, T.handFirst ? [[T.palm - .25, 180, 168, 1.26, 0], [T.palm + .45, 180, 168, 1.26, 1], /* v2 A3: in place, on «Ладонь»; v7: this key had fallen into a line comment */ [Math.max(T.palm + .8, T.r2 - .15), 180, 172, 1.08, 1],
        [T.r2 + .7, -90, 172, 1.08, 0], [regroup0, SLOT.hand[0] - 110, SLOT.hand[1], SLOT.hand[2], 0], [regroup1, ...SLOT.hand, 1],
        ...(pull.hand ? [[pull.hand, ...SLOT.hand, 1], [pull.hand + shrink, CX, AX_Y, .03, 0]] : [])] : [[T.palm - .15, 442, 168, 1.28, 0], [T.palm + .7, 180, 168, 1.26, 1], [Math.min(T.k67e + .5, regroup0 - .05), 180, 172, 1.08, 1], [regroup1, ...SLOT.hand, 1],
        ...(pull.hand ? [[pull.hand, ...SLOT.hand, 1], [pull.hand + shrink, CX, AX_Y, .03, 0]] : [])]);
      const sp = clamp((t - T.spray + .05) / Math.max(.5, T.paint + .5 - T.spray));
      s += drawHand(hand, t, sp);
      const hEnd = T.handFirst ? T.r2 - .2 : regroup0;
      const hLab = win(t, T.k67 - .05, T.k67 + .35) * (1 - win(t, hEnd - .05, hEnd + .3)) * hand.op;
      if (hLab > .01) {
        const v = Math.round((T.almost70 ? 70 : 67) * win(t, T.k67, T.k67e + .1)) * 1000;
        labels += plate(CX, Math.min(hand.y + 112 * hand.s, 340), `${T.almost70 ? 'ПОЧТИ' : 'НЕ МЕНЬШЕ'} ${num(v)} ЛЕТ`, hLab, 19);   // blind view v2 B1
      }
    }

    /* r3: the time axis, Bell, the arrow into the past, everything pulls into one point NOW */
    if (T.hasBell) {
      const axisA = win(t, T.wEnd - .1, T.bell + .4);
      s += axis(t, axisA, 1, 1);
      labels += label(CX, T.noBridge ? 52 : 36, 'ДЖОН БЕЛЛ · ФИЗИК', { size: 11, opacity: .95 * win(t, T.bell - .05, T.bell + .4) });
      const arrIn = win(t, T.pastA - .05, T.pastA + .2), arrOut = 1 - win(t, T.never + .1, T.never + .8);
      if (arrIn * arrOut > .01) {
        const tip = lerp(170, 52, win(t, T.pastA - .05, T.never + .05)) + 6 * win(t, T.never + .05, T.never + .35);
        const ao = arrIn * arrOut;
        s += UN.thread([170, AX_Y], [tip, AX_Y], { opacity: .95 * ao, width: 1.1 }) + UN.thread([170, AX_Y], [tip, AX_Y], { opacity: .4 * ao, width: 3.4, glow: true });
        s += UN.polyline([[tip + 7, AX_Y - 5], [tip, AX_Y], [tip + 7, AX_Y + 5]], { opacity: .95 * ao, width: 1.1 });
        labels += label(24, AX_Y - 26, 'ПРОШЛОЕ', { size: 10, anchor: 'start', opacity: .85 * ao });
      }
      const wall = (.3 * win(t, T.pastA, T.pastA + .4) + .7 * win(t, T.never - .05, T.never + .1) * (1 - win(t, T.never + .3, T.never + 1.1))) * (1 - win(t, T.never + .6, T.never + 1.4));
      if (wall > .01) s += UN.thread([44, AX_Y - 20], [44, AX_Y + 20], { opacity: wall, width: 1.2 }) + UN.thread([44, AX_Y - 20], [44, AX_Y + 20], { opacity: .5 * wall, width: 4, glow: true });
      for (const [name, t0] of Object.entries(pull)) {
        const q = clamp((t - t0) / shrink); if (q <= 0 || q >= 1) continue;
        const [sx, sy, sc] = SLOT[name];
        let d = '';
        for (let j = 0; j < 16; j++) {
          const u = ease(clamp(q * 1.5 - H(j + name.length * 31 + 9951) * .5)), ox = (H(j + 9961) - .5) * 90 * sc, oy = (H(j + 9971) - .5) * 70 * sc;
          d += dot(lerp(sx + ox, CX, u), lerp(sy + oy, AX_Y, u), 1.1, .85 * (1 - u) * Math.sin(Math.PI * q) + .05);
        }
        s += `<g fill="#fff">${d}</g>` + UN.thread([sx, sy], [CX, AX_Y], { opacity: .25 * Math.sin(Math.PI * q), width: .6 });
      }
      const pv = Object.values(pull), arrived = pv.reduce((a, t0) => a + win(t, t0 + shrink - .3, t0 + shrink), 0) / pv.length;
      s += nowPoint(t, axisA, win(t, T.here - .1, T.here + .35), arrived, T.here);
      labels += label(CX, AX_Y + 26, 'СЕЙЧАС', { size: 10.5, opacity: .95 * win(t, T.now - .05, T.now + .35) });
    }

    // own camera: a slow drift of the whole scene
    const z = 1.015 + .012 * Math.sin(t * .13), dx = 3 * Math.sin(t * .21 + 1), dy = 2 * Math.sin(t * .17 + 2);
    return `<g transform="translate(${f(CX + dx)} ${f(AX_Y + dy)}) scale(${z.toFixed(4)}) translate(${-CX} ${-AX_Y})">${s}${labels}</g>`;
  }

  // a plate for labels that carry meaning (blind view v2: bold white in a frame)
  function plate(x, y, text, op, size = 15) {
    if (op <= .01) return '';
    const w = text.length * size * .64 + 16, h = size + 10;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
  }

  /* ---------- duel (r4): marks on a carrier go out with it; Newton vs Leibniz ---------- */
  function duel(t, T) {
    let s = UN.bokeh(t, { count: 16, opacity: .8, seed: 31 });
    let labels = '';
    const A = win(t, T.r4 - .1, T.r4 + .5);
    const center = 1 - win(t, T.newton, T.newton + .8), right = 1 - win(t, T.leib, T.leib + .9);
    s += axis(t, A, center, right);
    // the carrier: a tape along the axis under the marks; it goes first on «носителя»
    const carrier = A * (1 - win(t, T.none - .05, T.none + .7));
    if (carrier > .01) {
      let tp = UN.polyline([[26, AX_Y + 5], [168, AX_Y + 5]], { opacity: .6 * carrier, width: .7 }) + UN.polyline([[26, AX_Y + 15], [168, AX_Y + 15]], { opacity: .6 * carrier, width: .7 });
      tp += `<rect x="26" y="${AX_Y + 5}" width="142" height="10" fill="#fff" opacity="${f(.05 * carrier)}"/>`;
      let perf = '';
      for (let x = 30; x < 166; x += 6) perf += dot(x, AX_Y + 10, .7, .5 * carrier * (.8 + .2 * Math.sin(t * 2 + x)));
      s += tp + `<g fill="#fff">${perf}</g>`;
      labels += label(97, AX_Y + 30, 'НОСИТЕЛЬ', { size: 10, opacity: .8 * carrier });
    }
    const mk = [];
    for (let j = 0; j < 9; j++) mk.push(160 - j * 15 + (H(j + 900) - .5) * 5);
    const offEnd = Math.max(T.none + 1.4, Math.min(T.mk4 + .6, T.q - .4)), dtOff = Math.max(.08, (offEnd - .5 - (T.none + .3)) / 8);
    let m = '';
    mk.forEach((x, j) => {
      const lit = win(t, T.r4 - .1 + j * .05, T.r4 + .3 + j * .05);
      const t0 = T.none + .3 + (8 - j) * dtOff, off = 1 - win(t, t0, t0 + .5);
      const ghost = (1 - off) * lit * .14 * (1 - win(t, offEnd + .4, T.q));
      if (lit * off <= .01 && ghost <= .01) return;
      const h = 20 + 30 * H(j + 950), yt = AX_Y - h, o = lit * off * A;
      if (ghost > .01) m += `<path d="M${f(x)} ${AX_Y} L${f(x)} ${f(yt)}" stroke="#fff" stroke-width=".6" stroke-dasharray="1.5 2" opacity="${f(ghost)}"/>`;
      if (o <= .01) return;
      m += UN.thread([x, AX_Y], [x, yt], { opacity: .85 * o, width: .9 }) + UN.thread([x, AX_Y], [x, yt], { opacity: .3 * o, width: 3, glow: true });
      const k = j % 4;
      if (k === 0) m += UN.sphere(x, yt - 2.5, 2.8, { glow: .8, opacity: o });
      else if (k === 1) m += UN.thread([x - 5, yt - 2], [x + 5, yt - 2], { opacity: o, width: .9 }) + UN.thread([x - 5, yt - 5.5], [x + 5, yt - 5.5], { opacity: .7 * o, width: .9 });
      else if (k === 2) m += `<circle cx="${f(x)}" cy="${f(yt - 3.6)}" r="3.4" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(o)}"/>`;
      else m += UN.polyline([[x - 4.5, yt - 6.5], [x, yt - 1], [x + 4.5, yt - 6.5]], { opacity: o, width: .9 });
    });
    s += m;
    const nowA = A * (1 - win(t, offEnd, offEnd + .6));
    s += nowPoint(t, nowA, 0, .6, -NEVER);
    if (T.leib < NEVER) labels += label(CX, AX_Y + 26, 'СЕЙЧАС', { size: 10.5, opacity: .9 * nowA });   // v3 A15: not in part 2
    const qOut = win(t, T.newton + .05, T.newton + .75);
    s += qmark(CX, 112 - 14 * qOut, 1.5, win(t, T.q - .05, Math.max(T.q + .45, T.qe + .2)), 1 - qOut, t);
    const nw = win(t, T.newton - .05, T.newton + .9);
    if (nw > .01) {
      let d = '';
      for (let l = 0; l < 3; l++) for (let k = 0; k < 13; k++) {
        const x = 30 + ((k * 10 + l * 3.3 + t * 15) % 130), edge = clamp((x - 30) / 12) * clamp((158 - x) / 12), rev = clamp((30 + 140 * nw - x) / 10);
        d += dot(x, AX_Y + (l - 1) * 8, l === 1 ? 1.7 : 1.15, (l === 1 ? .9 : .5) * edge * rev);
      }
      s += `<g fill="#fff">${d}</g>`;
    }
    // part 2 (no Leibniz in the voice, owner 03.11 «почти пустой кадр»): this part's carriers stand under the axis —
    // stick, hand, ice, memory — and go out one by one with their marks on «носителя»; dashed ghosts stay while
    // Newton's time flows on without them; the thinker's caption comes with «Ньютон»
    if (T.leib >= NEVER) {
      const CY2 = 296, xs = [56, 138, 222, 304], n0 = Math.max(T.none + .6, T.mk4), step = Math.max(.3, (T.qe + .9 - n0) / 4);
      const fin = win(t, T.r4 - .1, T.r4 + .6);
      // blind view v2 A11: the row is titled and each carrier is named, as large as the captions
      labels += plate(CX, 120, 'НОСИТЕЛИ ОТМЕТОК', fin * A * (1 - win(t, T.q - .4, T.q)), 15);
      xs.forEach((x, k) => {
        const off = win(t, n0 + k * step, n0 + k * step + .5), op = fin * A * (1 - .84 * off);
        labels += plate(x, CY2 + 62, ['ПАЛКА', 'ЛАДОНЬ', 'ЛЁД', 'ПАМЯТЬ'][k], op * (1 - off), 12);
        if (op <= .01) return;
        let g = '';
        if (k === 0) g = drawStick({ x, y: CY2, s: .36, op: 1 }, t, 1, [{ y: 28, c: 1, tc: -9, glow: 0 }, { y: -12, c: 1, tc: -9, glow: 0 }]);
        else if (k === 1) g = drawHand({ x, y: CY2, s: .34, op: 1 }, t, 1);
        else if (k === 2) {   // blind view v2 A15: the ice core as in 0:28 — a long cylinder (1:5) with layers and bubbles, cold blue
          g = `<rect x="${x - 10}" y="${CY2 - 46}" width="20" height="92" fill="#cfe9ff" fill-opacity=".08" stroke="#cfe9ff" stroke-width=".9"/>` +
            `<ellipse cx="${x}" cy="${CY2 - 46}" rx="10" ry="3.2" fill="none" stroke="#cfe9ff" stroke-width=".9"/><ellipse cx="${x}" cy="${CY2 + 46}" rx="10" ry="3.2" fill="none" stroke="#cfe9ff" stroke-width=".9"/>`;
          for (let j = 0; j < 11; j++) { const y = CY2 - 40 + j * 8; g += UN.polyline([[x - 9, y], [x, y + 1.6], [x + 9, y]], { opacity: .25 + .3 * (j / 10), width: .55 }); }
          let bb = '';
          for (let j = 0; j < 10; j++) { const qq = (H(j + 9301) + t * .04) % 1; bb += dot(x - 10 + 20 * H(j + 9302), CY2 + 36 - 72 * qq, .6 + .7 * H(j + 9303), .5); }
          g += `<g fill="#fff">${bb}</g>`;
        } else g = drawHead({ x: x - 4, y: CY2 + 6, s: .4, op: 1 }, t, () => 0);
        s += group(op, g);
        // the wire from the carrier up to the axis: its marks lived there
        const wire = op * (1 - off);
        if (wire > .01) s += `<path d="M${x} ${CY2 - 50} L${x} ${AX_Y + 26}" stroke="#fff" stroke-width=".5" stroke-dasharray="1.5 3" opacity="${f(.4 * wire)}"/>`;
        if (off > .05) s += `<circle cx="${x}" cy="${CY2}" r="44" fill="none" stroke="#fff" stroke-width=".55" stroke-dasharray="2 4" opacity="${f(.3 * off * fin * A)}"/>`;
      });
      const nwC = win(t, T.newton - .05, T.newton + .45) * (1 - win(t, T.r4e + .2, T.r4e + .6));
      if (nwC > .01) {
        labels += label(CX, 70, 'НЬЮТОН · «НАЧАЛА» · 1687', { size: 11, opacity: .95 * nwC });
        labels += label(CX, 92, 'ВРЕМЯ ТЕЧЁТ САМО', { size: 10, opacity: .75 * nwC * win(t, T.newton + 1.2, T.newton + 1.8) });
      }
    }
    const lb = win(t, T.leib - .05, T.leib + .35), who = win(t, T.who - .05, T.who + .4);
    if (lb > .01) s += `<rect x="212" y="${AX_Y - 13}" width="110" height="26" rx="3" fill="none" stroke="#fff" stroke-width=".55" stroke-dasharray="2 4" opacity="${f(.22 * win(t, T.leib + .2, T.leib + 1))}"/>`;
    // own camera: slow drift and a lean in to the axis that stops exactly on «кем», then freezes
    const tc = t < T.who ? t : T.who + .5 * (1 - Math.exp(-(t - T.who) / .5));
    const z = 1.015 + .012 * Math.sin(tc * .13) + .08 * win(t, T.r4, T.who), dx = 3 * Math.sin(tc * .21 + 1), dy = 2 * Math.sin(tc * .17 + 2);
    return `<g transform="translate(${f(CX + dx)} ${f(AX_Y + dy)}) scale(${z.toFixed(4)}) translate(${-CX} ${-AX_Y})">${s}${labels}</g>`;
  }

  /* ---------- traces (z1, part 2): «лёд, слои, память» — three familiar icons, then they leave on «Теперь — о тебе» ---------- */
  function traces(t, K) {
    const id = 'z1', z0 = K[id] ?? 0, ze = K[id + '_end'] ?? z0 + 6;
    const w = (stem, frac) => { const a = (K.words?.[id] || []).find(x => norm(x.w).startsWith(stem)); return a ? a.t0 : z0 + frac * (ze - z0); };
    const tTr = w('след', .35), tIce = w('лед', .55), tLay = w('сло', .62), tMem = w('памят', .7), tYou = w('теперь', .8);
    let s = UN.bokeh(t, { count: 16, opacity: .8, seed: 31 }), labels = '';
    const out = win(t, ze + .2, ze + 1.2), CY = 176;
    const slot = win(t, z0 - .05, z0 + .6) * (1 - out);
    // blind view v3 A11: each icon lights up on its word, the others stay dimmed
    const nextOf = { [tIce]: tLay, [tLay]: tMem, [tMem]: 1e6 };
    const icon = (x, t0) => (.3 * slot + .7 * win(t, t0 - .05, t0 + .45) * (1 - .6 * win(t, (nextOf[t0] ?? 1e6) - .1, (nextOf[t0] ?? 1e6) + .3))) * (1 - out);
    // dashed slots wait for their traces
    for (const x of [70, 180, 290]) s += `<circle cx="${x}" cy="${CY}" r="50" fill="none" stroke="#fff" stroke-width=".6" stroke-dasharray="2 4" opacity="${f(.28 * slot * (.85 + .15 * Math.sin(t * 1.3 + x)))}"/>`;
    // ice core: a vertical cylinder with annual lines and rising bubbles
    const iA = icon(70, tIce);
    if (iA > .01) {
      // blind view v2 A15: a cylinder (caps), not a rounded phone; cold blue as in 0:28
      let g = `<rect x="58" y="${CY - 50}" width="24" height="100" fill="#cfe9ff" fill-opacity=".08" stroke="#cfe9ff" stroke-width=".9" opacity=".95"/>` +
        `<ellipse cx="70" cy="${CY - 50}" rx="12" ry="3.6" fill="none" stroke="#cfe9ff" stroke-width=".9"/><ellipse cx="70" cy="${CY + 50}" rx="12" ry="3.6" fill="none" stroke="#cfe9ff" stroke-width=".9"/>`;
      g += UN.polyline([[70, CY - 50], [70, CY + 50]], { opacity: .12, width: 18, glow: true });
      for (let k = 0; k < 11; k++) { const y = CY - 44 + k * 8.6 + 1.2 * Math.sin(t * .6 + k); g += UN.polyline([[59, y], [70, y + 1.6], [81, y]], { opacity: .25 + .25 * (k / 10), width: .55 }); }
      let b = '';
      for (let k = 0; k < 14; k++) { const q = (H(k + 9101) + t * .04 * (.5 + H(k + 9102))) % 1; b += dot(58 + 24 * H(k + 9103), CY + 44 - 88 * q, .7 + .9 * H(k + 9104), .55 + .35 * Math.sin(t * 2 + k)); }
      s += group(iA, g + `<g fill="#fff">${b}</g>`);
      labels += plate(70, CY + 80, 'ЛЁД', iA, 17);
    }
    // rock layers: stacked wavy strata, the lower the older and thinner
    const lA = icon(180, tLay);
    if (lA > .01) {
      let g = '', grain = '';
      for (let k = 0; k < 8; k++) {
        const y = CY - 40 + k * 11.5 - 1.2 * k * k / 8, pts = [];
        for (let j = 0; j <= 18; j++) { const x = 136 + j * 88 / 18; pts.push([x, y + 3 * Math.sin(x * .07 + k * 1.3) + .6 * Math.sin(t * .8 + k + j * .3)]); }
        g += UN.polyline(pts, { opacity: .45 + .4 * (k % 2), width: k % 2 ? .9 : .6 });
      }
      for (let k = 0; k < 40; k++) grain += dot(138 + 84 * H(k + 9201), CY - 42 + 84 * H(k + 9202), .5 + .5 * H(k + 9203), (.2 + .4 * H(k + 9204)) * (.8 + .2 * Math.sin(t * 1.7 + k)));
      s += group(lA, g + `<g fill="#fff">${grain}</g>`);
      labels += plate(180, CY + 80, 'СЛОИ', lA, 17);
    }
    // memory: the head of dots with its tape of frames
    const mA = icon(290, tMem);
    if (mA > .01) {
      s += drawHead({ x: 284, y: CY - 10, s: .52, op: mA }, t, k => .6 * win(t, tMem + k * .12, tMem + k * .12 + .3) * (1 - win(t, tMem + k * .12 + .6, tMem + k * .12 + 1.2)));
      labels += plate(290, CY + 80, 'ПАМЯТЬ', mA, 17);
    }
    const tT = Math.min(tTr, z0 + .6);
    labels += plate(CX, 96, 'СЛЕДЫ ПЕРЕМЕН', win(t, tT - .05, tT + .4) * (1 - out), 18);
    // own camera: slow drift, a lean in while the icons come, a pull back on «о тебе»
    const z = 1.0 + .03 * win(t, z0, tMem + .5) - .06 * out, dx = 3 * Math.sin(t * .21 + 1), dy = 2 * Math.sin(t * .17 + 2);
    return `<g transform="translate(${f(CX + dx)} ${f(CY + dy)}) scale(${z.toFixed(4)}) translate(${-CX} ${-CY})">${s}${labels}</g>`;
  }

  function body(t, K, mode) {
    K = K || {};
    if (mode === 'traces') return traces(t, K);
    const T = times(K);
    if (mode === 'duel' || (mode == null && t >= T.r4 - .1)) return duel(t, T);
    return chain(t, T);
  }

  SCENES.ts_records = function (u, p = {}, d, t) {
    const K = p.K || {};
    let svg = body(t, K, p.mode);
    if (p.prev && p.prev !== 'ts_records') {
      const t0 = (K[p.s] ?? t) - .05, q = win(t, t0, t0 + .75);
      if (q < 1) {
        let prev = '';
        try { if (typeof SCENES[p.prev]?.body === 'function') prev = SCENES[p.prev].body(t, K, p.prev_mode); } catch (err) { prev = ''; }
        svg = `<g opacity="${f(1 - q)}">${prev}</g><g opacity="${f(q)}">${svg}</g>`;
      }
    }
    return UN.wrap(svg);
  };
  SCENES.ts_records.body = (t, K, mode) => body(t, K || {}, mode);
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_records; SCENES.ts_records = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
