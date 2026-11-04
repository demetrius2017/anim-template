/* «Время — это трансформация» (time_states), сцена ts_save — «машина времени» в искусственных системах.
 * Вход из ts_egg/disorder (наплыв 0,7 с владеет эта сцена). Плёнка состояний — TS.strip, яйца — лёгкое
 * локальное liteEgg (≈ 90 точек, тот же силуэт и разлёт осколков, что TS.egg).
 *
 * Режимы p.mode:
 *   save (e1) — «А назад можно?»: плёнка с яйцом едет вперёд, на «назад» тормозит и трогается назад
 *     (шевроны стрелки под плёнкой разворачиваются), на «соберётся» встаёт и снова идёт вперёд;
 *     «нарезки состояний» — по кадрам пробегает свет; «машина» — плёнка уходит вверх;
 *     «искусственных» — каркасный блок-система (UN.block) с 8 ячейками; «хранят» — кадры слетают с плёнки
 *     в ячейки; «умеют/воспроизводить» — кадр выходит из блока и проигрывает нарезки назад (яйцо собирается
 *     по ступеням, головка чтения бежит по точкам); «сохранение» — ряд ячеек «СОХР. 1/2/3»;
 *     «откат/версии» — подписи становятся V1→V2→V3, дуга-стрелка и маркер возвращаются к V2.
 *   jump (e2) — ячейка V2 вырастает в большой кадр плёнки (соседи — V1 и V3); «сохранить» — уголки записи;
 *     маленький человек из точек (упрощённый, не TS.person) входит в кадр и останавливается к «наблюдателя»;
 *     «весь мир» — горизонт, сетка земли, звёзды и луна расходятся от человека; «прыжок» — шар перелетает
 *     дугой из соседнего кадра; «загрузкой» — кадр заливается светом до 87 %, на «кадра» повисает «?».
 *     body(t,K,'jump',{ask}) — ask 0..1 гасит «?» и подпись загрузки (так ts_memory/memory продолжает кадр).
 * Слова (cue по K.words): e1 — назад, можно, соберёт, нарезки, состояний, машина, искусств, хранят, умеют,
 *   воспроизв, сохранение, откат, версии; e2 — сохранить, наблюдател, весь, мир, прыжок, времени, загрузк, кадра.
 * p: s (id фразы), mode, K (абсолютные времена), prev/prev_mode (наплыв со входа). Камера движка нейтральна.
 * Проверка: scene_test.py ts_save '<p с K из build/cues.json>' --dur 145 --at 122.5,…; лист qa/D_save.jpg.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const lerp = (a, b, q) => a + (b - a) * q;
  const win = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const norm = w => String(w).toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // first word starting with any of the stems; otherwise a fraction of the phrase (the text is still a draft)
  const cue = (K, id, stems, frac = 0, nth = 0) => {
    for (const st of [].concat(stems)) {
      const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[nth];
      if (a) return a.t0;
    }
    const a = K[id] ?? 0, b = K[id + '_end'] ?? a + 4;
    return a + frac * (b - a);
  };
  const H = n => UN.hash(n);
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;
  const GA = 2.3999632297;
  const fib = (n, i) => { const y = 1 - 2 * (i + .5) / n, rr = Math.sqrt(1 - y * y), a = i * GA; return [rr * Math.cos(a), y, rr * Math.sin(a)]; };

  /* ---------- лёгкое яйцо: силуэт и разлёт как у TS.egg, но ≈ 90 точек ---------- */
  let eggG = null;
  function eggGeo() {
    if (eggG) return eggG;
    const seeds = [], shell = [], cont = [], cyw = Math.cos(.4), syw = Math.sin(.4);
    for (let k = 0; k < 7; k++) seeds.push({ u: fib(7, k), h: H(k + 3001), h2: H(k + 3101), h3: H(k + 3201) });
    const near = u => { let best = 0, bd = 9; seeds.forEach((q, k) => { const d = q.u.reduce((s, v, j) => s + (v - u[j]) ** 2, 0); if (d < bd) { bd = d; best = k; } }); return best; };
    for (let i = 0; i < 80; i++) { const u = fib(80, i); shell.push({ u, k: near(u), h: H(i + 3301) }); }
    for (let k = 0; k <= 36; k++) { const a = k / 36 * 2 * Math.PI; cont.push({ a, k: near([Math.sin(a) * cyw, -Math.cos(a), Math.sin(a) * syw]) }); }
    return (eggG = { seeds, shell, cont });
  }
  const eggPt = u => { const y = u[1], w = .76 * (1 + .1 * y); return [u[0] * w, y, u[2] * w]; };
  function liteEgg(cx, cy, r, b, t = 0, op = 1, noYolk = false) {
    if (op <= .01) return '';
    b = clamp(b);
    const { seeds, shell, cont } = eggGeo(), cyw = Math.cos(.4), syw = Math.sin(.4);
    const fly = ease((b - .12) / .88), crack = ease(b / .05) * (1 - ease((b - .14) / .08)), spill = ease((b - .1) / .9);
    let s = '';
    if (spill > 0) {
      const py = cy + .95 * r, rx = r * (.45 + 1.45 * spill), ry = r * (.07 + .12 * spill);
      s += `<ellipse cx="${f(cx)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" fill="#fff" fill-opacity=".07" stroke="#fff" stroke-width=".5" stroke-opacity="${f(.55 * ease(spill / .2))}"/>`;
      const yy = lerp(cy + .2 * r, py - r * .12 * (1 - .4 * spill), ease(spill / .6));
      if (!noYolk) s += UN.sphere(cx + .05 * r * spill, yy, r * .2, { glow: .5, opacity: ease(spill / .12) });
    }
    const frag = seeds.map(sd => {
      const c = eggPt(sd.u), X = c[0] * cyw + c[2] * syw;
      const vx = (X >= 0 ? 1 : -1) * (.35 + .6 * sd.h) + X * .5, vy = c[1] * .4 - .75 - .45 * sd.h2;
      return { dx: vx * fly * r, dy: (vy * fly + (1.15 + .3 * sd.h3) * fly * fly) * r, rot: (sd.h3 - .5) * 3.2 * fly, c: [cx + X * r, cy + c[1] * r] };
    });
    const move = (x, y, F) => {
      if (fly <= 0) return [x, y];
      const ca = Math.cos(F.rot), sa = Math.sin(F.rot), ox = x - F.c[0], oy = y - F.c[1];
      return [F.c[0] + ox * ca - oy * sa + F.dx, F.c[1] + ox * sa + oy * ca + F.dy];
    };
    let arc = [], prev = -1;
    const flush = () => { if (arc.length > 1) s += UN.polyline(arc, { opacity: .75, width: .6 }); arc = []; };
    for (const c of cont) {
      const p = eggPt([Math.sin(c.a), -Math.cos(c.a), 0]);
      if (fly > 0 && c.k !== prev) flush();
      prev = c.k; arc.push(move(cx + p[0] * r, cy + p[1] * r, frag[c.k]));
    }
    flush();
    let sd = '';
    for (const m of shell) {
      const p = eggPt(m.u), X = p[0] * cyw + p[2] * syw, Z = -p[0] * syw + p[2] * cyw;
      const [x, y] = move(cx + X * r, cy + p[1] * r, frag[m.k]);
      const front = clamp(.55 - Z * .9), tw = .85 + .15 * Math.sin(t * 2 + m.h * 30);
      sd += dot(x, y, Math.max(.35, r * .02 * (1 + m.h)), (.2 + .7 * front) * tw);
    }
    s += `<g fill="#fff">${sd}</g>`;
    if (crack > 0) {
      const pts = [];
      for (let k = 0; k <= 7; k++) { const q = k / 7; pts.push([cx + (-.62 + 1.24 * q) * .76 * r, cy + (-.05 + (k % 2 ? .09 : -.07)) * r]); }
      s += UN.polyline(pts, { opacity: .95 * crack, width: .8 });
      s += UN.polyline(pts, { opacity: .35 * crack, width: 2.2, glow: true });
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  // a frame of the film outside TS.strip (cells, slots): same look as TS.strip frames
  function frameBox(cx, cy, w, h, lit = 1, op = 1, fill = 0) {
    let s = '';
    if (fill) s += `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2.5" fill="#000" opacity="${f(fill)}"/>`;
    s += `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2.5" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.35 + .6 * lit)}"/>`;
    if (lit > .05) s += `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${f(w)}" height="${f(h)}" rx="2.5" fill="none" stroke="#fff" stroke-width="2" opacity="${f(.3 * lit)}" filter="url(#un-soft)"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  const chevron = (x, y, dir, size, op) => UN.polyline([[x - dir * size, y - size], [x, y], [x - dir * size, y + size]], { opacity: op, width: .8 });

  /* ---------- save (e1) ---------- */
  const B = [0, 0, .12, .35, .6, .85, 1, 1, 1, 1, 1];        // egg state of each film frame
  const CB = [0, .03, .1, .2, .35, .55, .75, 1];                   // egg state stored in each cell
  const SLOT = [0, .12, 1];                                        // V1 whole, V2 cracked, V3 broken
  const SX = [84, 180, 276], SY = 214, SW = 72, SH = 96;
  const PLAYF = { x: 180, y: 238, w: 96, h: 128 };                // the playing frame; jump grows from it
  function filmPos(t, K) {
    const T0 = (K.e1 ?? 0) - .05, A = cue(K, 'e1', 'назад', .02), Q = cue(K, 'e1', 'можно', .04), N = cue(K, 'e1', 'соберёт', .12);
    const v = x => 18 * (1 - win(x, A, Q + .2)) - 34 * win(x, A + .15, Q + .35) * (1 - win(x, N - .2, N + .45)) + 9 * win(x, N + .5, N + 1.6);
    let s = 0;
    const end = Math.max(T0, t), dt = .02;
    for (let x = T0; x < end; x += dt) { const step = Math.min(dt, end - x); s += v(x + step / 2) * step; }
    return { pos: s, vel: v(t) };
  }
  function save(t, K) {
    const T0 = (K.e1 ?? 0) - .05, c = (w, fr) => cue(K, 'e1', w, fr);
    const A = c('назад', .02), Q = c('можно', .04), N = c('соберёт', .12), GAME = c('сохранение', .2), VER = c('откат', .3), VER2 = c('версии', .33);
    const RET = c(['возвращ', 'версии'], .36), PRE = c(['прежн', 'кадр'], .45), M = c('машина', .55), AR = c('искусств', .68);
    const KEEP = c('хранят', .82), CAN = c('умеют', .9), PLAY = c('воспроизв', .94), END = K.e1_end ?? PLAY + 1;
    let s = UN.bokeh(t, { count: 12, opacity: .45, seed: 33 });
    const { pos, vel } = filmPos(t, K);
    const up = win(t, GAME - .15, GAME + .55);
    const sy = lerp(190, 72, up), sc = lerp(1, .72, up);
    // film of the egg; frames flash when their copies leave for the cells
    const n = B.length, w = 62, h = 82, gap = 12, total = n * w + (n - 1) * gap, off = -pos + 150;
    const x0 = 180 - total / 2 + off;
    const fx = i => 180 + (x0 + w / 2 + i * (w + gap) - 180) * sc;     // screen x of film frame i
    const ci = Math.round((180 - (x0 + w / 2)) / (w + gap));
    const lit = i => .55 + .45 * Math.max(Math.exp(-Math.pow((t - KEEP - .11 * (i - ci + 2)) / .25, 2)), Math.exp(-Math.pow((t - GAME - .15 * (i - ci + 1)) / .25, 2)));
    const strip = TS.strip(180, 190, { id: 'sv', n, w, h, gap, offset: off, t, view: 168,
      frame: (i, cx, cy) => liteEgg(cx, cy - 3, 25, B[i], t + i), lit, caption: i => `T${i + 1}`, capSize: 9.4 / sc });
    s += `<g transform="translate(180 ${f(sy)}) scale(${f(sc)}) translate(-180 -190)">${strip}</g>`;
    // arrow of time under the film: chevrons ride with the film, their wings follow its velocity
    const aop = 1 - up;
    if (aop > .01) {
      const ay = 284, back = win(t, A, Q + .2) * (1 - win(t, N, N + .7)), dir = Math.max(-1, Math.min(1, vel / 10));
      let a = UN.thread([52, ay], [308, ay], { opacity: .4, width: .6 });
      for (let k = 0; k < 9; k++) {
        const x = 52 + (((k * 32 - pos * .9) % 256) + 256) % 256, edge = Math.min(1, (x - 52) / 20, (308 - x) / 20);
        a += chevron(x, ay, dir, 3.6, .75 * Math.max(0, edge));
      }
      a += UN.sphere(lerp(312, 48, back), ay, 3.2, { glow: .8 });
      a += UN.mono(308, ay + 20, 'ВПЕРЁД', { size: 9.4, anchor: 'end', opacity: .75 * (1 - back) + .2 });
      a += UN.mono(52, ay + 20, 'НАЗАД', { size: 9.4, anchor: 'start', opacity: .2 + .7 * back });
      const no = win(t, N - .1, N + .4);   // "the egg won't reassemble": НАЗАД is struck out
      if (no > 0) a += UN.thread([50, ay + 16.5], [50 + 38 * no, ay + 16.5], { opacity: .8, width: .9 });
      s += `<g opacity="${f(aop)}">${a}</g>`;
    }
    // game saves -> version chain -> rollback to V2 (the system returns to an earlier frame)
    const chain = 1 - win(t, M, M + .6);
    if (chain > .01 && t > GAME - .2) {
      const verQ = win(t, VER - .1, VER + .35), arcQ = win(t, RET - .1, RET + .5), back = win(t, RET + .05, RET + .7);
      const pre = Math.exp(-Math.pow((t - PRE - .4) / .45, 2));
      let g = '';
      for (let k = 0; k < 3; k++) {
        const st = GAME - .05 + k * .16, q = clamp((t - st) / .7), land = win(t, st + .6, st + .75);
        if (q <= 0) continue;
        const lit = k === 2 ? 1 - .7 * back : k === 1 ? .55 + .45 * back + .3 * pre : .55;
        if (q < 1) {   // a copy of a film frame flies down into its slot
          const e = ease(q), x = lerp(fx(ci - 1 + k), SX[k], e), y = lerp(sy, SY, e) - 26 * Math.sin(Math.PI * q);
          const fw = lerp(w * sc, SW, e), fh = lerp(h * sc, SH, e);
          g += frameBox(x, y, fw, fh, 1, Math.min(1, q * 5)) + liteEgg(x, y - 2, lerp(25 * sc, 25, e), SLOT[k], t);
        }
        if (land <= .01) continue;
        g += `<defs><clipPath id="tsv-slot-${k}"><rect x="${SX[k] - SW / 2}" y="${SY - SH / 2}" width="${SW}" height="${SH}" rx="2.5"/></clipPath></defs>`;
        g += frameBox(SX[k], SY, SW, SH, Math.min(1, lit), land) + `<g clip-path="url(#tsv-slot-${k})">${liteEgg(SX[k], SY - 2, 25, SLOT[k], t + k, land * (.55 + .45 * Math.min(1, lit)))}</g>`;
        g += UN.mono(SX[k], SY + SH / 2 + 15, `СОХР. ${k + 1}`, { size: 9.4, anchor: 'middle', opacity: .8 * land * (1 - verQ) });
        g += UN.mono(SX[k], SY + SH / 2 + 15, `V${k + 1}`, { size: 10.5, anchor: 'middle', opacity: (.45 + .5 * Math.min(1, lit)) * land * verQ });
        if (k > 0) {
          const xa = SX[k - 1] + SW / 2 + 5, xb = SX[k] - SW / 2 - 5;
          g += UN.thread([xa, SY], [xb, SY], { opacity: .7 * verQ, width: .7 }) + chevron(xb, SY, 1, 3.5, .8 * verQ);
        }
      }
      if (verQ > .01) g += UN.sphere(lerp(SX[2], SX[1], back), SY + SH / 2 + 34, 3.4 + .4 * Math.sin(t * 3), { glow: .9, opacity: verQ });
      if (arcQ > .01) {
        const P0 = [SX[2], SY - SH / 2 - 6], P1 = [228, SY - SH / 2 - 60], P2 = [SX[1] + 6, SY - SH / 2 - 6];
        const qb = (q, i) => (1 - q) * (1 - q) * P0[i] + 2 * q * (1 - q) * P1[i] + q * q * P2[i];
        const d = `M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`;
        g += `<path d="${d}" pathLength="1" stroke-dasharray="${f(arcQ)} 2" fill="none" stroke="#fff" stroke-width=".9" opacity=".85"/>`;
        g += `<path d="${d}" pathLength="1" stroke-dasharray="${f(arcQ)} 2" fill="none" stroke="#fff" stroke-width="2.4" opacity=".3" filter="url(#un-soft)"/>`;
        g += UN.sphere(qb(arcQ, 0), qb(arcQ, 1), 2.8, { glow: .9, opacity: 1 - .6 * win(t, RET + .7, RET + 1.1) });
        if (arcQ > .85) g += UN.polyline([[P2[0] - 6, P2[1] - 7], [P2[0], P2[1]], [P2[0] + 7, P2[1] - 5]], { opacity: .85 * win(t, RET + .3, RET + .45), width: .9 });
      }
      if (pre > .02) g += `<circle cx="${SX[1]}" cy="${SY}" r="${f(56 + 6 * pre)}" fill="url(#un-halo)" opacity="${f(.6 * pre)}"/>`;
      s += `<g opacity="${f(chain)}">${g}</g>`;
    }
    // the system: a wireframe block with 8 cells, filled from the film
    const bo = win(t, M - .05, AR + .5);
    const playIn = win(t, CAN - .1, CAN + .45);
    if (bo > .01) {
      const cam = { cx: 180, cy: 238, yaw: -.3 + .09 * Math.sin((t - T0) * .4), pitch: .2, scale: lerp(.86, 1, win(t, M, AR + .8)) };
      const BW = 236, BH = 124, BD = 80;
      let b = UN.block([0, 0, 0], { w: BW, h: BH, depth: BD, nx: 11, ny: 6, nz: 3, rays: false, opacity: win(t, AR - .3, AR + .5) * .55 + .45 }, cam);
      for (let k = 0; k < 8; k++) {
        const col = k % 4, row = Math.floor(k / 4), X = (col - 1.5) * 54, Y = (row - .5) * 58, Z = -BD / 2;
        const pp = (dx, dy) => UN.project([X + dx, Y + dy, Z], cam), C = pp(0, 0);
        const P = [pp(-19, -24), pp(19, -24), pp(19, 24), pp(-19, 24)];
        const start = KEEP - .35 + k * .11, land = start + .8, filled = win(t, land - .1, land + .1);
        const reading = t >= PLAY && k === readIdx(t) ? 1 : 0;
        b += UN.polyline(P, { close: true, opacity: .3 + .5 * filled + .2 * reading, width: .7 + .6 * reading });
        if (filled > 0) b += liteEgg(C.x, C.y, 15 * C.s, CB[k], t + k, filled);
        const q = clamp((t - start) / .8);
        if (q > 0 && q < 1) {   // flight from the film into the cell
          const e = ease(q), x = lerp(fx(ci - 2 + col), C.x, e), y = lerp(sy, C.y, e) - 34 * Math.sin(Math.PI * q);
          const fw = lerp(w * sc, 38 * C.s, e), fh = lerp(h * sc, 48 * C.s, e);
          b += frameBox(x, y, fw, fh, 1, Math.min(1, q * 6)) + liteEgg(x, y, lerp(25 * sc, 15 * C.s, e), CB[k], t);
        }
      }
      s += `<g opacity="${f(bo * (1 - .55 * playIn))}">${b}</g>`;
    }
    // playback: a frame leaves the block and plays the stored slices backwards
    function readIdx(x) { return Math.max(0, 7 - Math.floor(clamp((x - PLAY) / Math.max(.6, END + .35 - PLAY)) * 8 + 1e-6)); }
    if (playIn > .01) {
      const idx = readIdx(t), st = t < PLAY ? CB[7] : CB[idx];
      const x = lerp(230, PLAYF.x, playIn), y = PLAYF.y;
      const fw = lerp(38, PLAYF.w, playIn), fh = lerp(48, PLAYF.h, playIn);
      let g = frameBox(x, y, fw, fh, 1, 1, .85) + liteEgg(x, y - 2, fh * .26, st, t);
      g += `<g opacity="${f(playIn)}">`;
      for (const k of [0, 1]) g += `<path d="M${f(x - fw / 2 + 14 + k * 7)} ${f(y - fh / 2 + 7)} l-6 4 l6 4 Z" fill="#fff" opacity=".85"/>`;
      for (let k = 0; k < 8; k++) {
        const on = k === idx && t >= PLAY ? 1 : 0;
        g += UN.sphere(x - 31.5 + k * 9, y + fh / 2 + 11, on ? 2.6 : 1.4, { glow: on ? .9 : .2, opacity: on ? 1 : .5, highlight: false });
      }
      s += g + '</g>';
    }
    return s;
  }

  /* ---------- маленький человек из точек (упрощённый) ---------- */
  let manG = null;
  function manGeo() {
    if (manG) return manG;
    const pts = [];
    // segments in units of height 100 (y up from the ground is negative); each point: [part, along, jitterX, jitterY]
    const add = (part, n, seed) => { for (let i = 0; i < n; i++) pts.push({ part, q: (i + .5) / n, jx: H(i + seed) - .5, jy: H(i + seed + 50) - .5, h: H(i + seed + 90) }); };
    add('head', 30, 5101); add('torso', 34, 5201); add('armL', 12, 5301); add('armR', 12, 5401); add('legL', 16, 5501); add('legR', 16, 5601);
    return (manG = pts);
  }
  function miniMan(x, gy, hgt, phase, amp, t, op = 1) {
    if (op <= .01) return '';
    // frontal figure: walking shows as alternating steps (feet lift and slide) and a light bob
    const k = hgt / 100, bob = amp * 1.4 * Math.abs(Math.sin(phase)), br = .6 * Math.sin(t * 1.7);
    const sw = amp * Math.sin(phase), lift = v => amp * 6 * Math.max(0, v);
    const ends = {
      torso: [[0, -77 + bob], [0, -48 + bob]],
      legL: [[-5, -48 + bob], [-6 - 5 * sw, -lift(sw)]], legR: [[5, -48 + bob], [6 - 5 * sw, -lift(-sw)]],
      armL: [[-10, -76 + bob + br * .3], [-14 + 4 * sw, -47 + bob]], armR: [[10, -76 + bob + br * .3], [14 + 4 * sw, -47 + bob]],
    };
    const head = [0, -89 + bob];
    let a = '', soft = '';
    manGeo().forEach((p, i) => {
      let px, py;
      if (p.part === 'head') { const an = p.q * 2 * Math.PI * 3.1, rr = 7.2 * Math.sqrt(p.h); px = head[0] + Math.cos(an) * rr * .85; py = head[1] + Math.sin(an) * rr; }
      else {
        const [s0, s1] = ends[p.part], wd = p.part === 'torso' ? 13 - 5 * p.q : 3.2;
        px = lerp(s0[0], s1[0], p.q) + p.jx * wd; py = lerp(s0[1], s1[1], p.q) + p.jy * 1.5;
      }
      const tw = .75 + .25 * Math.sin(t * 2.6 + p.h * 40), o = (.55 + .45 * p.h) * tw;
      a += dot(x + px * k, gy + py * k, .55 + .25 * p.h, o);
      if (i % 3 === 0) soft += dot(x + px * k, gy + py * k, 1.2, o * .5);
    });
    return `<g fill="#fff" opacity="${f(op)}"><g filter="url(#un-soft)">${soft}</g>${a}</g>`;
  }

  /* ---------- jump (e2) ---------- */
  const JF = { x: 180, y: 196, w: 176, h: 234, z: 1.05 };   // the big frame; ts_memory starts from it
  function jump(t, K, o = {}) {
    const T0 = (K.e2 ?? 0) - .05, c = (w, fr) => cue(K, 'e2', w, fr);
    const SAVE = c('сохранить', .05), OBS = c('наблюдател', .2), ALL = c('весь', .33), WORLD = c('мир', .38), JMP = c('прыжок', .55), TIME = c('времени', .62);
    const LOAD = c('загрузк', .8), FR = c('кадра', .9), ask = o.ask ?? 1;
    const g = win(t, T0, T0 + 1.0), z = lerp(1, JF.z, win(t, WORLD, LOAD + .4));
    const w = lerp(PLAYF.w, JF.w, g), h = lerp(PLAYF.h, JF.h, g), gap = lerp(60, 18, g), y = lerp(PLAYF.y, JF.y, g);
    const walkA = SAVE - .15, walkB = OBS + .65, wq = clamp((t - walkA) / (walkB - walkA));
    const prog = .87 * ease((t - LOAD) / Math.max(.3, FR + .55 - LOAD)) + .006 * Math.sin(t * 2.2) * win(t, FR + .5, FR + 1);
    let s = UN.bokeh(t, { count: 10, opacity: .4, seed: 34 });
    const inner = (cx, cy, fw, fh) => {
      let q = liteEgg(cx, cy - 2, fh * .26, 0, t, 1 - win(t, T0 + .25, T0 + .95));
      const gy = cy + fh / 2 - 46, hy = gy - 74;
      const spread = d => win(t, ALL - .1 + d * .7, ALL + .35 + d * .7);
      // world: horizon, perspective ground, stars, a moon — spreading from the observer
      const sx = lerp(cx + fw / 2 + 26, cx + 6, ease(wq));
      q += UN.thread([cx - fw / 2, hy], [cx + fw / 2, hy], { opacity: .55 * spread(.2), width: .6 });
      q += UN.thread([cx - fw / 2, hy], [cx + fw / 2, hy], { opacity: .2 * spread(.2), width: 2, glow: true });
      for (let k = -5; k <= 5; k++) q += UN.thread([cx + k * 6, hy], [cx + k * 46, cy + fh / 2], { opacity: .22 * spread(.35 + Math.abs(k) * .06), width: .45 });
      for (let k = 1; k <= 4; k++) { const yy = hy + (cy + fh / 2 - hy) * Math.pow(k / 4.4, 1.8); q += UN.thread([cx - fw / 2, yy], [cx + fw / 2, yy], { opacity: .18 * spread(.3 + k * .1), width: .45 }); }
      let st = '';
      for (let k = 0; k < 22; k++) {
        const px = cx + (H(k + 5901) - .5) * fw * .94, py = cy - fh / 2 + 8 + H(k + 5951) * (hy - cy + fh / 2 - 14);
        const d = Math.hypot(px - sx, py - gy) / 150;
        st += dot(px, py, .5 + .6 * H(k + 5991), (.35 + .45 * Math.sin(t * 1.7 + k * 2.1) ** 2) * spread(d));
      }
      for (let k = 0; k < 14; k++) {
        const u = H(k + 6031), v = H(k + 6061), py = hy + 6 + (cy + fh / 2 - hy - 6) * v * v, px = cx + (u - .5) * fw * (.3 + .9 * v);
        st += dot(px, py, .6 + .5 * v, .55 * spread(.25 + Math.abs(px - sx) / 160));
      }
      q += `<g fill="#fff">${st}</g>`;
      q += UN.sphere(cx - fw * .28, cy - fh * .3, 5.5, { glow: .6, opacity: spread(.8), highlight: false });
      // the observer walks in and stops
      const amp = ease(wq / .08) * (1 - ease((wq - .82) / .18));
      q += miniMan(sx, gy, 96, (cx + fw / 2 + 26 - sx) / 8.5, amp, t, wq > 0 ? 1 : 0);
      // loading: the frame fills with light from the left
      if (prog > .002) {
        const lx = cx - fw / 2, lw = fw * prog;
        q += `<rect x="${f(lx)}" y="${f(cy - fh / 2)}" width="${f(lw)}" height="${f(fh)}" fill="#fff" opacity="${f(.36 + .04 * Math.sin(t * 3))}"/>`;
        q += `<rect x="${f(lx + lw - 5)}" y="${f(cy - fh / 2)}" width="8" height="${f(fh)}" fill="#fff" opacity=".55" filter="url(#un-soft)"/>`;
      }
      return q;
    };
    const strip = TS.strip(180, y, { id: 'jp', n: 3, w, h, gap, t,
      frame: (i, cx, cy, fw, fh) => i === 1 ? inner(cx, cy, fw, fh) : '',
      lit: i => i === 1 ? 1 : .15, opacity: 1 });
    s += `<g transform="translate(${JF.x} ${JF.y}) scale(${f(z)}) translate(${-JF.x} ${-JF.y})">${strip}`;
    // record corners on "сохранить"
    const rc = win(t, SAVE - .1, SAVE + .25), pulse = .55 + .45 * Math.exp(-Math.max(0, t - SAVE - .25) * 2.5);
    if (rc > .01) {
      const L = 14, X0 = 180 - w / 2 - 7, X1 = 180 + w / 2 + 7, Y0 = y - h / 2 - 7, Y1 = y + h / 2 + 7;
      let cr = '';
      for (const [X, Y, dx, dy] of [[X0, Y0, 1, 1], [X1, Y0, -1, 1], [X0, Y1, 1, -1], [X1, Y1, -1, -1]]) cr += UN.polyline([[X, Y + dy * L], [X, Y], [X + dx * L, Y]], { opacity: .9, width: 1 });
      s += `<g opacity="${f(rc * pulse * (1 - .6 * win(t, LOAD, LOAD + .5)))}">${cr}</g>`;
      s += UN.mono(X0 + 2, Y0 - 6, 'СОХР.', { size: 9.4, opacity: .75 * rc * (1 - win(t, LOAD - .3, LOAD + .2)) });
    }
    // the jump: a ball arcs from the neighbouring moment into the saved frame
    const jq = clamp((t - JMP) / Math.max(.4, TIME + .45 - JMP));
    if (jq > 0 && t < TIME + 1.4) {
      const a = [180 - w / 2 - gap - 22, y - h / 2 + 20], b = [180 - 10, y - h / 2 + 38], e = ease(jq);
      const px = lerp(a[0], b[0], e), py = lerp(a[1], b[1], e) - 70 * Math.sin(Math.PI * e);
      let tr = '';
      for (let k = 1; k <= 12; k++) { const e2 = Math.max(0, e - k * .025); tr += dot(lerp(a[0], b[0], e2), lerp(a[1], b[1], e2) - 70 * Math.sin(Math.PI * e2), 1.3 * (1 - k / 13), .5 * (1 - k / 13)); }
      const fade = 1 - win(t, TIME + .7, TIME + 1.3);
      s += `<g opacity="${f(fade)}"><g fill="#fff">${tr}</g>${UN.sphere(px, py, 3.6, { glow: 1 })}</g>`;
      if (jq >= 1) s += UN.weight(b[0], b[1], 6 + 30 * win(t, TIME + .45, TIME + 1.3), 2 + 9 * win(t, TIME + .45, TIME + 1.3), { opacity: .6 * fade });
    }
    // loading bar and the hanging question
    if (prog > .002) {
      const by = y + h / 2 - 14, bx = 180 - w / 2 + 14, bw = w - 28;
      s += `<g opacity="${f(ask)}">` + UN.thread([bx, by], [bx + bw, by], { opacity: .35, width: 1.4 }) +
        UN.thread([bx, by], [bx + bw * prog / .87 * .87, by], { opacity: .95, width: 1.6 }) +
        UN.mono(180, by - 8, `ЗАГРУЗКА ${Math.round(prog * 100)}%`, { size: 9.4, anchor: 'middle', opacity: .9 }) + '</g>';
    }
    const qa = win(t, FR - .05, FR + .5) * ask;
    if (qa > .01) {
      const qy = y + 14 + 3 * Math.sin(t * 1.6);
      s += UN.italic(180, qy, '?', { size: 84, anchor: 'middle', opacity: .35 * qa, glow: true });
      s += UN.italic(180, qy, '?', { size: 84, anchor: 'middle', opacity: .95 * qa });
    }
    return s + '</g>';
  }

  // a plate for labels that carry meaning (blind view v2: bold white in a frame)
  function plate(x, y, text, op, size = 15) {
    if (op <= .01) return '';
    const w = text.length * size * .64 + 16, h = size + 10;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
  }

  /* world (e1…e1_3, part 2 v34; blind view v2 A13–A14): «от прошлого остались только следы» — one big egg falls and
     breaks, the shards stay; «В игре — да: загрузил сохранение» — a game frame with a slot and the button ЗАГРУЗИТЬ
     СОХРАНЕНИЕ, on «загрузил» the egg in the game is whole again; «Наш мир хранит следы, а не сохранения» — out of the
     game: the shards on a table, the card СОХРАНЕНИЕ is crossed out; «часы назад переведёшь» — a big wall clock, hands
     run backwards, the shards stay shards; «а вчера не вернёшь» — the calendar leaf ВЧЕРА flies off and does not return. */
  // v6 A11: the card-frame ВЧЕРА from the hook (nobody recognised the egg in 4 rounds); b: 0 whole … 1 torn, the strips on the table
  // v7 A11: the card IS the hook's own frame at 0:01 (ts_life «day»: the film with perforations, the dashed empty frame
  // with «?», the plate ВЧЕРА under it), cut into six strips that tear apart on «от прошлого»
  const HOOK_K = { z4: .05, z4_end: 1e5, words: { z4: [{ w: 'Докажи,', t0: .05, t1: .5 }, { w: 'вчера', t0: .8, t1: 1.2 }] } };
  function vcard(cx, cy, b, op = 1, tableY = null, t = 0) {
    if (op <= .01) return '';
    let img = '';
    try { img = SCENES.ts_life && SCENES.ts_life.body ? SCENES.ts_life.body(1.05 + .04 * Math.sin(t * 1.3), HOOK_K, 'day') : ''; } catch (e) { img = ''; }
    const k0 = .7, W = 252, n = 6, top = cy - 70, Hc = 158;
    const pic = `<g transform="translate(${f(cx - 186 * k0)} ${f(cy - 213 * k0)}) scale(${k0})">${img}</g>`;
    let s = '';
    for (let k = 0; k < n; k++) {
      const x0 = cx - W / 2 + k * W / n, w = W / n, fall = tableY == null ? 0 : (tableY - (top + Hc) + 6) * ease(b);
      const dx = (k - 2.5) * 16 * ease(b), rot = (H(k + 77) - .5) * 70 * ease(b), mx = x0 + w / 2 + dx, my = cy + fall + 10 * Math.sin(k * 1.7) * b;
      const id = `vc${Math.round(cx)}x${Math.round(cy)}x${k}`;
      s += `<clipPath id="${id}"><rect x="${f(x0)}" y="${f(top)}" width="${f(w + .6)}" height="${Hc}"/></clipPath>`;
      s += `<g transform="translate(${f(mx - (x0 + w / 2))} ${f(my - cy)}) rotate(${f(rot)} ${f(x0 + w / 2)} ${f(cy + 20)})"><g clip-path="url(#${id})">${pic}</g></g>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  function world(t, K) {
    const c = (w, fr, n = 0) => cue(K, 'e1', w, fr, n);
    // v4 A13: falls on «Похоже, он прав», breaks on «от прошлого»
    const z = (K.e1 ?? 0) - .05, tSl = c(['прошл', 'след'], .12), tGame = c('игре', .35), tLoad = c('загрузил', .45);
    const tWorld = c('наш', .6), tNot = c('сохранен', .7, 1), tBack = c('назад', .78), tYest = c('вчера', .9);
    const ze = K.e1_end ?? tYest + 1.5;
    let s = UN.bokeh(t, { count: 12, opacity: .45, seed: 33 });
    const TY = 262;   // the table
    // the real egg: falls on «следы» and breaks; its shards stay on the table from then on
    const drop = ease((t - z - .3) / Math.max(.5, tSl - z - .3)), brk = clamp((t - tSl - .1) / 1.1);
    const game = win(t, tGame - .15, tGame + .45) * (1 - win(t, tWorld - .2, tWorld + .4));
    const realOp = 1 - .85 * game;
    s += UN.thread([46, TY + 34], [314, TY + 34], { opacity: .5 * realOp, width: .8 }) + UN.thread([60, TY + 44], [300, TY + 44], { opacity: .2 * realOp, width: .6 });
    // v6 A11: the card ВЧЕРА from the hook stands, then tears into strips on «от прошлого остались только следы»
    s += vcard(180, 170, brk, realOp, TY + 30, t);   // v7 A11: ВЧЕРА is inside the hook frame itself
    if (realOp > .5) s += plate(180, 344, 'СЛЕДЫ', win(t, tSl + .6, tSl + 1) * (1 - win(t, tGame - .3, tGame)), 20);
    // the game frame
    if (game > .01) {
      const gb = win(t, tLoad - .1, tLoad + .25), whole = 1 - win(t, tLoad + .15, tLoad + .8);
      let g = `<rect x="56" y="78" width="248" height="292" rx="14" fill="#000" fill-opacity=".9" stroke="#fff" stroke-width="1.2"/>`;
      g += `<rect x="56" y="78" width="248" height="30" rx="14" fill="#fff" fill-opacity=".1"/>` + `<text x="180" y="99" fill="#fff" font-family="Plex" font-weight="700" font-size="14" text-anchor="middle">ИГРА</text>`;
      g += `<rect x="112" y="128" width="136" height="150" rx="6" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="3 4"/>`;
      g += `<g transform="translate(180 206) scale(.55) translate(-180 -206)">${vcard(180, 206, whole, 1, 270, t)}</g>`;   // v6: the card in the game
      const pr = 1 - .06 * Math.sin(Math.PI * clamp((t - tLoad + .1) / .3));
      g += `<g transform="translate(180 322) scale(${f(pr)}) translate(-180 -322)"><rect x="76" y="304" width="208" height="36" rx="8" fill="#fff" fill-opacity="${f(.12 + .5 * gb * (1 - win(t, tLoad + .5, tLoad + 1)))}" stroke="#fff" stroke-width="1.2"/>` +
        `<text x="180" y="327" fill="#fff" font-family="Plex" font-weight="700" font-size="13" text-anchor="middle">ЗАГРУЗИТЬ СОХРАНЕНИЕ</text></g>`;
      s += `<g opacity="${f(game)}">${g}</g>`;
    }
    // the real world: the card СОХРАНЕНИЕ, crossed out on «а не сохранения»
    const card = win(t, tWorld + .1, tWorld + .5) * (1 - win(t, tBack - .4, tBack - .1));
    if (card > .01) {
      s += plate(180, 118, 'СОХРАНЕНИЕ', card, 17);
      const x = win(t, tNot - .05, tNot + .3);
      if (x > .01) s += `<g opacity="${f(card)}"><line x1="92" y1="${f(104)}" x2="${f(92 + 176 * x)}" y2="${f(104 + 24 * x)}" stroke="#fff" stroke-width="3"/></g>`;
    }
    // the wall clock: hands run backwards on «часы назад переведёшь»; the shards stay
    const ck = win(t, tBack - .35, tBack + .1) * (1 - win(t, ze + .3, ze + .9));
    if (ck > .01) {
      const back = Math.max(0, t - tBack), ang = 2.2 - 9 * (1 - Math.exp(-back / .9));
      s += `<g opacity="${f(ck)}">${TS.clock(160, 128, 46, ang, { trail: .6 * win(t, tBack, tBack + .3) * (1 - win(t, tBack + 1.6, tBack + 2.2)) })}</g>`;
      s += plate(160, 196, 'ЧАСЫ НАЗАД', ck * (1 - win(t, tYest - .3, tYest)), 14);
    }
    // the calendar leaf ВЧЕРА: flies off on «вчера» and does not come back
    const cal = win(t, tBack + .2, tBack + .6), off = ease((t - tYest - .1) / 1.2);
    if (cal > .01) {
      const lx = 266 + 60 * off, ly = 112 + 140 * off * off, rot = 40 * off;
      s += `<g opacity="${f(cal * (1 - off))}" transform="rotate(${f(rot)} ${f(lx)} ${f(ly)})"><rect x="${f(lx - 30)}" y="${f(ly - 34)}" width="60" height="68" rx="4" fill="#000" stroke="#fff" stroke-width="1.1"/>` +
        `<rect x="${f(lx - 30)}" y="${f(ly - 34)}" width="60" height="16" rx="4" fill="#fff" fill-opacity=".25"/>` +
        `<text x="${f(lx)}" y="${f(ly + 10)}" fill="#fff" font-family="Plex" font-weight="700" font-size="13" text-anchor="middle">ВЧЕРА</text></g>`;
      s += `<rect x="236" y="78" width="60" height="68" rx="4" fill="none" stroke="#fff" stroke-width=".7" stroke-dasharray="3 3" opacity="${f(.5 * cal * off)}"/>`;
    }
    return s;
  }

  const BODY = { save, jump, world };
  const body = (t, K, mode, o) => (BODY[mode] || save)(t, K || {}, o);
  SCENES.ts_save = function (u, p, d, t) {
    const K = p.K || {}, t0 = (K[p.s] ?? (t - u)) - .05, q = win(t, t0, t0 + .7);
    let s = body(t, K, p.mode);
    if (q < 1) {
      const pb = p.prev && SCENES[p.prev] && typeof SCENES[p.prev].body === 'function' ? SCENES[p.prev].body(t, K, p.prev_mode) : '';
      s = (pb ? `<g opacity="${f(1 - q)}">${pb}</g>` : '') + `<g opacity="${f(q)}">${s}</g>`;
    }
    return UN.wrap(s);
  };
  SCENES.ts_save.body = body;
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_save; SCENES.ts_save = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
