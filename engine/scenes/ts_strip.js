/* «Время — это трансформация» (eps/time_states), сцена ts_strip: плёнка состояний (фишка ролика).
 * Одна непрерывная картина по абсолютному t (события на своих словах из K.words); режим задаёт
 * только нижнюю границу времени. Камера — внутри сцены (рост кадров, подъём плёнки, дыхание).
 *
 * Режимы (кадры из eps/time_states/build/scene_handoff.json):
 *   slices (b1) наплыв 0,7 с из ts_apple/relative (SCENES.ts_apple.body, если есть);
 *          «представить…кино» — справа въезжает пустая плёнка TS.strip (3 кадра в центре);
 *          «нарезки» — подпись «НАРЕЗКИ СОСТОЯНИЙ», по промежуткам пробегают блики-разрезы;
 *          1-е «кадр» — загорается кадр 1 (яблоко decay 0), «свежее» — подпись СВЕЖЕЕ;
 *          2-е «кадр» — кадр 2 (decay .5), «потемнело» — ПОТЕМНЕЛО; 3-е «кадр» — кадр 3
 *          (decay 1), «сгнило» — СГНИЛО; бусина-указатель под плёнкой идёт к горящему кадру;
 *          «каждом» — горят все три; «расстановка» — наезд: кадры растут, в кадрах сетка,
 *          видно, что молекулы стоят по-разному (у кадров свой поворот и распад).
 *   cold   (c1) с начала фразы плёнка едет (кадры по кругу свежее/потемнело/сгнило);
 *          «замедлять» — плёнка почти встаёт, «МЕДЛЕННЕЕ»; «ускорять» — бежит, «БЫСТРЕЕ»;
 *          «положи» — плёнка уходит вверх и уменьшается; «яблоко» — внизу слева большое
 *          TS.apple; «холод» — иней (TS.apple cold) и падающие крупинки, в кадрах плёнки
 *          холодные яблоки и мини-часы; «стрелка» — справа часы; «отсчитает» — стрелка
 *          делает много оборотов; «месяц» — моно «1 МЕСЯЦ»; «почти» — кадры плёнки горят,
 *          между ними знаки ≈ (кадры почти одинаковые, разнятся только мини-часы).
 *
 * p: {s, mode, K, prev, prev_mode}. K — cues.json: K[id], K[id+'_end'], K.words[id].
 * Слова: b1 представить, кино, нарезки, кадр ×3, свежее, потемнело, сгнило, каждом,
 * расстановка; c1 замедлять, ускорять, положи, яблоко, холод, стрелка, отсчитает, месяц,
 * почти. Нет слова — берётся начало фразы.
 * Выход: ts_earth/gravity сам наплывает из SCENES.ts_strip.body(t, K, 'cold').
 * Нагрузка: крупные кадры — TS.apple (≈800 элементов, до 3–4 кадров), мелкие кадры в
 * холоде — своё упрощённое яблоко liteApple (≈130 элементов).
 * Проверка: scene_test.py ts_strip '{"mode":"slices","K":<cues.json>,"prev":"ts_apple",
 *   "prev_mode":"relative"}' --dur 66 --at 42.7,43.5,... --cam '{"z0":1,"z1":1}'
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, q) => a + (b - a) * q;
  const B = (t, a, b) => TS.between(t, a, b);
  const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const norm = w => w.toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  const word = (K, id, stems, n = 0) => {
    for (const st of [].concat(stems)) { const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[n]; if (a) return a; }
    return null;
  };
  const cue = (K, id, st, n = 0) => { const a = word(K, id, st, n); return a ? a.t0 : (K[id] ?? 0); };
  const cueE = (K, id, st, n = 0) => { const a = word(K, id, st, n); return a ? a.t1 : (K[id] ?? 0) + .5; };

  const times = K => {
    const T = {
      start: (K.b1 ?? 0) - .05,
      pres: cue(K, 'b1', ['представ', 'кино']), kinoE: cueE(K, 'b1', 'кино'), nar: cue(K, 'b1', 'нарезк'),
      k1: cue(K, 'b1', 'кадр', 0), k2: cue(K, 'b1', 'кадр', 1), k3: cue(K, 'b1', 'кадр', 2),
      w1: cue(K, 'b1', 'свеж'), w2: cue(K, 'b1', 'потемн'), w3: cue(K, 'b1', 'сгнил'),
      each: cue(K, 'b1', 'каждом'), ras: cue(K, 'b1', 'расстановк'),
      c0: (K.c1 ?? 0) - .05, slow: cue(K, 'c1', 'замедля'), fast: cue(K, 'c1', 'ускоря'),
      put: cue(K, 'c1', 'положи'), ap: cue(K, 'c1', 'яблоко'), cold: cue(K, 'c1', 'холод'),
      hand: cue(K, 'c1', 'стрелк'), count: cue(K, 'c1', 'отсчита'), month: cue(K, 'c1', 'месяц'),
      almost: cue(K, 'c1', 'почти'),
    };
    if (T.k2 <= T.k1) { T.k2 = T.k1 + 1.4; T.k3 = T.k1 + 2.8; }
    return T;
  };

  /* ---------- simplified apple for small frames (same shape as TS.apple) ---------- */
  const GA = 2.3999632297, cache = {};
  const fib = (n, i) => { const y = 1 - 2 * (i + .5) / n, rr = Math.sqrt(1 - y * y), a = i * GA; return [rr * Math.cos(a), y, rr * Math.sin(a)]; };
  const appleR = (th, d) => 1 - (.2 + .06 * d) * Math.exp(-th * th / .05) - .07 * Math.exp(-Math.pow(th - Math.PI, 2) / .06);
  function applePt(u, d) {
    const hz = Math.sqrt(u[0] * u[0] + u[2] * u[2]), th = Math.atan2(hz, -u[1]), ph = Math.atan2(u[2], u[0]);
    const R = appleR(th, d) * (1 + .05 * d * Math.sin(7 * ph + 3 * th));
    let Y = -Math.cos(th) * R * .97, hr = Math.sin(th) * R * (1.02 - .07 * Y) * (1 + .05 * Math.exp(-Math.pow(th - .8, 2) / .12));
    const k = 1 - .15 * d; Y = .92 + (Y - .92) * k; hr *= 1 + .07 * d;
    const n = hz || 1; return [hr * u[0] / n, Y, hr * u[2] / n];
  }
  function liteGeo() {
    if (cache.lite) return cache.lite;
    const N = 30, mol = [], fine = [], edges = [];
    for (let i = 0; i < N; i++) mol.push({ u: fib(N, i), h: hash(i + 31) });
    for (let i = 0; i < 60; i++) fine.push({ u: fib(60, i), h: hash(i + 91) });
    for (let i = 0; i < N; i++) {
      const near = mol.map((m, j) => ({ j, d: m.u.reduce((s, v, k) => s + (v - mol[i].u[k]) ** 2, 0) })).filter(m => m.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
      for (const m of near) if (m.j > i) edges.push([i, m.j]);
    }
    return (cache.lite = { mol, fine, edges });
  }
  function liteApple(cx, cy, r, o = {}) {
    const op = o.opacity ?? 1; if (op <= .01) return '';
    const d = clamp(o.decay ?? 0), cold = clamp(o.cold ?? 0), t = o.t ?? 0, yaw = o.yaw ?? .35;
    const cyw = Math.cos(yaw), syw = Math.sin(yaw), lum = 1 - .5 * d, spread = TS.ease((d - .55) / .45), amp = .02 * (1 - .9 * cold);
    const { mol, fine, edges } = liteGeo();
    const proj = (u, h, i) => {
      let [x, y, z] = applePt(u, d);
      if (spread > 0) { x += (hash(i * 3 + 11) - .5) * .32 * spread; y += (hash(i * 3 + 12) - .5) * .2 * spread + .06 * spread * (1 + y); }
      x += amp * Math.sin(t * 5.1 + h * 37); y += amp * Math.cos(t * 4.3 + h * 53);
      return { x: cx + (x * cyw + z * syw) * r, y: cy + y * r, z: -x * syw + z * cyw };
    };
    let s = '';
    const cont = [];
    for (let k = 0; k <= 40; k++) {
      const th = k / 40 * 2 * Math.PI, side = th <= Math.PI ? 1 : -1, tt = th <= Math.PI ? th : 2 * Math.PI - th;
      const p = applePt([side * Math.sin(tt), -Math.cos(tt), 0], d); cont.push([cx + p[0] * r, cy + p[1] * r]);
    }
    s += UN.polyline(cont, { opacity: .18 * lum, width: 2, glow: true }) + UN.polyline(cont, { opacity: .5 * lum, width: .55 });
    let fd = '';
    fine.forEach((m, i) => { const p = proj(m.u, m.h, i + 100); fd += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(.5 + .3 * m.h)}" opacity="${f((.15 + .5 * clamp(.5 - p.z)) * lum)}"/>`; });
    s += `<g fill="#fff">${fd}</g>`;
    const P = mol.map((m, i) => proj(m.u, m.h, i));
    s += `<path d="${edges.map(([i, j]) => `M${f(P[i].x)} ${f(P[i].y)} L${f(P[j].x)} ${f(P[j].y)}`).join(' ')}" stroke="#fff" stroke-width=".4" opacity="${f(.3 * lum)}" fill="none"/>`;
    if (d > .3) s += `<ellipse cx="${f(cx - .3 * r)}" cy="${f(cy + .15 * r)}" rx="${f(.35 * r * clamp((d - .3) / .4))}" ry="${f(.28 * r * clamp((d - .3) / .4))}" fill="#000" opacity=".8"/>`;
    const order = P.map((p, i) => i).sort((a, b) => P[b].z - P[a].z);
    for (const i of order) {
      const p = P[i], front = clamp(.6 - p.z * .8), rm = r * .07 * (.8 + .4 * mol[i].h), grey = mol[i].h < d * .8;
      s += grey ? `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(rm * .8)}" fill="#5a5a5a" stroke="#999" stroke-width=".3" opacity="${f(.4 + .4 * front)}"/>`
        : `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(rm)}" fill="url(#un-ball)" stroke="#fff" stroke-width=".3" opacity="${f((.35 + .65 * front) * (1 - .25 * d))}"/>`;
    }
    const top = applePt([0, -1, 0], d);
    s += `<path d="M${f(cx + top[0] * r)} ${f(cy + (top[1] + .03) * r)} Q${f(cx + .02 * r)} ${f(cy + (top[1] - .26) * r)} ${f(cx + .13 * r)} ${f(cy + (top[1] - .36 + .05 * d) * r)}" fill="none" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity="${f(.85 * lum)}"/>`;
    if (cold > .01) {
      let fr = '';
      for (let i = 0; i < 46; i++) {
        const c = cont[Math.floor(hash(i + 701) * 40)], dx = c[0] - cx, dy = c[1] - cy, n = Math.hypot(dx, dy) || 1, out = 1 + hash(i + 801) * 3.5;
        fr += `<circle cx="${f(c[0] + dx / n * out)}" cy="${f(c[1] + dy / n * out)}" r="${f(.35 + .45 * hash(i + 901))}" opacity="${f(cold * (.4 + .55 * hash(i + 1001)) * (.85 + .15 * Math.sin(t * 1.3 + i)))}"/>`;
      }
      s += `<g fill="#fff">${fr}</g>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  const miniClock = (x, y, r, a, op) => `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#000" fill-opacity=".6" stroke="#fff" stroke-width=".6" opacity=".9"/>` +
    UN.thread([x, y], [x + Math.sin(a) * r * .72, y - Math.cos(a) * r * .72], { width: .8, opacity: .95 }) +
    `<circle cx="${f(x + Math.sin(a) * r * .72)}" cy="${f(y - Math.cos(a) * r * .72)}" r="1.1" fill="#fff"/></g>`;

  // ≈ drawn as two small waves
  const approx = (x, y, w, op) => {
    if (op <= .01) return '';
    let d = '';
    for (const dy of [-1.6, 1.6]) { d += `M${f(x - w / 2)} ${f(y + dy)}`; for (let k = 1; k <= 8; k++) { const q = k / 8; d += ` L${f(x - w / 2 + w * q)} ${f(y + dy - 1.1 * Math.sin(q * 2 * Math.PI))}`; } }
    return `<path d="${d}" fill="none" stroke="#fff" stroke-width=".9" stroke-linecap="round" opacity="${f(op)}"/>`;
  };

  // film speed in frames per second (pitch units)
  const speed = (t, T) => {
    const v0 = .75;
    let v = v0 * B(t, T.c0, T.c0 + .7);
    v = lerp(v, v0 * .12, B(t, T.slow, T.slow + .45));
    v = lerp(v, v0 * 3.4, B(t, T.fast, T.fast + .3));
    v = lerp(v, v0 * .45, B(t, T.put, T.put + .7));
    return v;
  };
  const scrollAt = (t, T) => {   // integral of speed since c0, in frames
    if (t <= T.c0) return 0;
    const n = Math.min(600, Math.ceil((t - T.c0) * 30)), dt = (t - T.c0) / n;
    let s = 0; for (let i = 0; i < n; i++) s += speed(T.c0 + (i + .5) * dt, T) * dt;
    return s;
  };

  const DEC = [0, .5, 1], YAW = [.35, .62, .9];
  const cyc = k => ((k - 1) % 3 + 3) % 3;

  // a plate for labels that carry meaning (blind view v2: bold white in a frame)
  function plate(x, y, text, op, size = 15) {
    if (op <= .01) return '';
    const w = text.length * size * .64 + 16, h = size + 10;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
  }

  function body(t, K, mode, p = {}) {
    const T = times(K);
    const lo = mode === 'cold' ? T.c0 : T.start;
    const tt = Math.max(t, lo);
    const zoom = B(tt, T.ras, T.ras + .8), up = B(tt, T.put, T.put + .8), coldQ = B(tt, T.cold, T.cold + 1);
    const w = lerp(lerp(104, 112, zoom), 62, up), h = w * 4 / 3,   // blind view v2 A3: windows 1.2× larger
    gap = lerp(lerp(14, 8, zoom), 10, up), P = w + gap;
    const SX = 180, SY = lerp(lerp(186, 190, zoom), 98, up);
    const slide = 430 * (1 - B(tt, T.pres, T.kinoE + .25));
    const scroll = scrollAt(tt, T);                       // frames
    const sPx = scroll * P - slide, m = Math.floor(sPx / P), frac = sPx - m * P;
    const inCold = tt >= T.c0, scrollIn = B(tt, T.c0, T.c0 + .7);
    const lite = w < 80;
    const each = B(tt, T.each, T.each + .4), almost = B(tt, T.almost, T.almost + .5);
    const kt = [T.k1, T.k2, T.k3];
    let s = '';

    s += UN.bokeh(tt, { count: 12, opacity: .45, seed: 41 });

    // frame content by absolute frame index k (1..3 are the slices of b1)
    const frame = (i, cx, cy, fw, fh) => {
      const k = i - 4 + 2 + m;
      const base = k >= 1 && k <= 3 ? B(tt, kt[k - 1], kt[k - 1] + .35) : 0;
      const app = Math.max(base, scrollIn);
      if (app <= .01) return '';
      const r = fw * .37, c = cyc(k);
      let g = '';
      if (coldQ > .01) {
        // cold film: the same fresh apple in every frame, only the mini clock changes
        g += lite ? liteApple(cx, cy + fh * .06, r, { decay: .02 + .004 * (k % 5), cold: coldQ, t: tt, yaw: .4 + .03 * (k % 3), opacity: coldQ })
          : TS.apple(cx, cy + fh * .06, r, { decay: .02, cold: coldQ, t: tt, yaw: .4, opacity: coldQ });
        g += miniClock(cx + fw * .3, cy - fh * .34, Math.max(4.5, fw * .11), k * 1.9 + 3.5 * Math.max(0, tt - T.count), coldQ);
      }
      if (coldQ < .99) {
        const o = { decay: DEC[c], t: tt + k * .7, yaw: YAW[c], seed: k, opacity: app * (1 - coldQ) };
        g += lite ? liteApple(cx, cy + fh * .06, r, o) : TS.apple(cx, cy + fh * .06, r, o);
      }
      // registration grid during the close-up
      const gq = zoom * (1 - scrollIn);
      if (gq > .01) {
        let d = '';
        for (let j = 1; j < 4; j++) { const x = cx - fw / 2 + fw * j / 4, y = cy - fh / 2 + fh * j / 4; d += `M${f(x)} ${f(cy - fh / 2)} L${f(x)} ${f(cy + fh / 2)} M${f(cx - fw / 2)} ${f(y)} L${f(cx + fw / 2)} ${f(y)} `; }
        g += `<path d="${d}" stroke="#fff" stroke-width=".4" stroke-dasharray="1.5 2.5" opacity="${f(.35 * gq)}" fill="none"/>`;
      }
      return g;
    };
    const lit = i => {
      const k = i - 4 + 2 + m;
      let l = .15;
      if (!inCold && k >= 1 && k <= 3) {
        const on = B(tt, kt[k - 1], kt[k - 1] + .3), next = k < 3 ? B(tt, kt[k], kt[k] + .3) : 0;
        l = lerp(.15, lerp(1, .6, next), on);
        l = lerp(l, 1, each);
      }
      if (inCold) l = lerp(lerp(k >= 1 && k <= 3 ? 1 : .15, .75, scrollIn), 1, almost);
      return l;
    };
    const caps = ['СВЕЖЕЕ', 'ПОТЕМНЕЛО', 'СГНИЛО'], wt = [T.w1, T.w2, T.w3];
    // blind view v2 B2: the caption comes with its frame, on «Кадр», not a word later
    const caption = i => { const k = i - 4 + 2 + m; return coldQ < .01 && k >= 1 && k <= 3 && tt >= kt[k - 1] ? caps[k - 1] : ''; };

    // blind view v2 B3/B4: in the cold the small film at the top edge leaves once the big apple is there
    const topOut = mode === 'cold' ? B(tt, T.ap + .2, T.ap + .9) : 0;
    const strip = topOut > .99 ? '' : TS.strip(SX, SY, { id: 'b', n: 9, w, h, gap, offset: -frac, frame, lit, caption, view: 176, t: tt * .3 + scroll * .5, opacity: 1 - topOut });
    s += strip;

    const pad = Math.max(9, h * .14), top = SY - h / 2 - pad, bot = SY + h / 2 + pad;

    // label and cut glints («нарезки»)
    const lab = B(tt, T.nar, T.nar + .45) * (1 - B(tt, T.c0, T.c0 + .5));
    if (lab > .01) s += UN.mono(SX, top - 14, 'НАРЕЗКИ СОСТОЯНИЙ', { size: 11, anchor: 'middle', opacity: .9 * lab, glow: true });
    for (let j = 0; j < 4; j++) {
      const gx = SX - frac + (j - 1.5) * P, q = clamp((tt - T.nar - .12 * j) / .55);
      if (q > 0 && q < 1 && !inCold) s += UN.thread([gx, top - 4], [gx, bot + 4], { width: 1.4, opacity: .9 * Math.sin(Math.PI * q), glow: true });
    }

    // playhead bead under the film
    const ph = B(tt, T.k1, T.k1 + .3) * (1 - up);
    if (ph > .01) {
      let px = SX - P;
      px = lerp(px, SX, B(tt, T.k2, T.k2 + .4)); px = lerp(px, SX + P, B(tt, T.k3, T.k3 + .4));
      px = lerp(px, SX, Math.max(each, scrollIn));
      const ly = bot + 28;
      s += `<g opacity="${f(ph)}">${UN.thread([SX - 1.5 * P, ly], [SX + 1.5 * P, ly], { width: .5, opacity: .35 })}${UN.sphere(px, ly, 3.4, { glow: .9 })}</g>`;
    }

    // speed words («замедлять», «ускорять»)
    const sw = B(tt, T.slow, T.slow + .3) * (1 - B(tt, T.fast - .05, T.fast + .15)), fw2 = B(tt, T.fast, T.fast + .25) * (1 - B(tt, T.put, T.put + .4));
    const v = speed(tt, T) / .75;
    if (sw > .01 || fw2 > .01) {
      const ly = bot + 52;
      if (sw > .01) s += UN.mono(SX, ly, 'МЕДЛЕННЕЕ', { size: 11, anchor: 'middle', opacity: .9 * sw });
      if (fw2 > .01) s += UN.mono(SX, ly, 'БЫСТРЕЕ', { size: 11, anchor: 'middle', opacity: .9 * fw2 });
      const bw = 20 + 30 * Math.min(3.4, v);
      s += `<g opacity="${f(Math.max(sw, fw2))}">${UN.thread([SX - bw, ly + 12], [SX + bw, ly + 12], { width: 1, opacity: .7 })}${UN.sphere(SX + bw, ly + 12, 2.2, { glow: .7, highlight: false })}${UN.sphere(SX - bw, ly + 12, 2.2, { glow: .7, highlight: false })}</g>`;
    }

    // ≈ between cold frames («почти не изменится»)
    if (almost * (1 - topOut) > .01) for (let j = -2; j <= 1; j++) s += approx(SX - frac + (j + .5) * P, bot + 12, Math.min(14, gap + 6), .9 * almost);

    // cold: big apple, frost grains, clock
    const apQ = B(tt, T.ap, T.ap + .6);
    if (apQ > .01) {
      const ax = 104, ay = 268 - 30 * (1 - apQ), ar = 54;
      if (coldQ > .01) {
        let sn = '';
        for (let i = 0; i < 34; i++) {
          const h1 = hash(i + 1301), h2 = hash(i + 1351), fall = ((tt - T.cold) * (6 + 8 * h2) + h1 * 160) % 160;
          const x = ax - 80 + h1 * 160 + 5 * Math.sin(tt * .8 + i), y = ay - 95 + fall;
          sn += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.5 + .8 * h2)}" opacity="${f(coldQ * (.25 + .5 * h2) * Math.sin(Math.PI * fall / 160))}"/>`;
        }
        s += `<g fill="#fff">${sn}</g>`;
        s += `<ellipse cx="${f(ax)}" cy="${f(ay + ar * 1.08)}" rx="${f(ar * 1.15)}" ry="${f(ar * .14)}" fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray="1 2.2" opacity="${f(.45 * coldQ)}"/>`;
      }
      s += TS.apple(ax, ay, ar, { decay: .02, cold: coldQ, t: tt, yaw: .4, opacity: apQ });
    }
    const clQ = B(tt, T.hand, T.hand + .5);
    // blind view v3 A4: «Холод не трогает часы» — the clock never leaves: when the warm apple comes it moves up between the apples
    const wsC = K.words?.c1 || [], wMc = mode === 'cold' ? (wsC.find(x => norm(x.w).startsWith('тормоз')) || wsC.find(x => norm(x.w).startsWith('медленн'))) : null;
    const swapC = wMc ? B(tt, wMc.t0 - .3, wMc.t0 + .3) : 0;
    if (clQ > .01) {
      const cx = lerp(266, 186, swapC), cy = lerp(270, 150, swapC), r = lerp(44, 34, swapC);
      const u = Math.max(0, tt - T.count), rev = u < 1.2 ? .42 * u * u / 2.4 : .21 + .42 * (u - 1.2);   // blind view v2: .42 turns/s — the hand reads as running on a phone (1.5 turns/s looked still on the sheets)
      const spin = B(tt, T.count, T.count + 1);
      s += TS.clock(cx, cy, r, 2 * Math.PI * rev - .5, { opacity: clQ, trail: spin });
      const mq = B(tt, T.month, T.month + .4);
      // blind view v2 A1: «за месяц» — a day counter 1 → 30 as a plate
      const day = 1 + Math.round(29 * B(tt, T.month, T.month + 2.6));
      if (mq > .01) s += plate(cx, cy - r - 18, `ДЕНЬ ${day}`, mq, 16);
    }

    // blind view 03.11 (1:34–1:50): the cold must read as cold — snowflakes and a thermometer; «Холод не трогает часы» —
    // the clock rings as it runs; «…для яблока оно и правда пошло медленнее» — the clock leaves, a warm apple comes
    // next to the cold one and spoils while the cold one stays (В ТЕПЛЕ / В ХОЛОДЕ)
    if (mode === 'cold' && apQ > .01 && coldQ > .01) {
      let fl = '';
      for (let i = 0; i < 12; i++) {
        const h1 = hash(i + 2301), h2 = hash(i + 2351), y = 92 + ((tt - T.cold) * (9 + 7 * h2) + h1 * 270) % 270, x = 26 + h1 * 308 + 8 * Math.sin(tt * .6 + i);
        const r = 3.5 + 2.5 * h2, rot = tt * (.3 + .4 * h2) + i, o = coldQ * (.35 + .4 * h2) * Math.sin(Math.PI * (y - 92) / 270);
        for (let k = 0; k < 3; k++) { const a = rot + k * Math.PI / 3; fl += `<line x1="${f(x - r * Math.cos(a))}" y1="${f(y - r * Math.sin(a))}" x2="${f(x + r * Math.cos(a))}" y2="${f(y + r * Math.sin(a))}" stroke="#fff" stroke-width=".8" opacity="${f(o)}"/>`; }
      }
      s += fl;
      const th = coldQ * apQ, TX = 30, lvl = lerp(.7, .18, B(tt, T.cold, T.cold + 1.2));
      s += `<g opacity="${f(th)}"><rect x="${TX - 5}" y="190" width="10" height="84" rx="5" fill="none" stroke="#fff" stroke-width=".9"/>` +
        `<circle cx="${TX}" cy="284" r="9" fill="#fff" fill-opacity=".85"/><rect x="${TX - 2.2}" y="${f(272 - 78 * lvl)}" width="4.4" height="${f(78 * lvl + 6)}" fill="#fff" opacity=".85"/></g>`;
      s += UN.mono(TX + 2, 312, 'ХОЛОД', { size: 12, anchor: 'middle', opacity: .9 * th });
    }
    {
      const ws = K.words?.c1 || [], wH = ws.find(x => norm(x.w).startsWith('трога')), wM = ws.find(x => norm(x.w).startsWith('тормоз')) || ws.find(x => norm(x.w).startsWith('медленн'));
      const wS = ws.find(x => norm(x.w).startsWith('медленн')), wQ = ws.find(x => norm(x.w).startsWith('время'));
      // «при чём тут время?» — a large «?» between the apple and the clock
      if (mode === 'cold' && wQ) { const q = B(tt, wQ.t0 - .1, wQ.t0 + .3) * (1 - B(tt, wQ.t0 + 1.6, wQ.t0 + 2.2)); if (q > .01) s += UN.italic(186, 262, '?', { size: 46, anchor: 'middle', opacity: .95 * q }); }
      if (mode === 'cold' && wH) {
        const rq = clamp((tt - wH.t0) / 1.1);
        if (rq > 0 && rq < 1) s += `<circle cx="266" cy="270" r="${f(46 + 20 * rq)}" fill="none" stroke="#fff" stroke-width="1" opacity="${f(.55 * (1 - rq))}"/>`;
      }
      if (mode === 'cold' && wM) {
        const wq = B(tt, wM.t0 - .3, wM.t0 + .2), spoil = B(tt, wM.t0 + .2, (wS ? wS.t0 + .6 : wM.t0 + 3.2));
        if (wq > .01) {
          // v3: no cover — the clock stays (it moved up between the apples)
          s += TS.apple(276, 280, 44, { decay: .02 + .98 * spoil, t: tt, yaw: .4, opacity: wq });
          s += plate(276, 346, 'В ТЕПЛЕ', wq, 15) + plate(104, 346, 'В ХОЛОДЕ', wq, 15);
          // «…для яблока оно и правда пошло медленнее»: a small film under each apple — warm frames run and change (>>>),
          // cold frames step slowly and stay the same (>)
          // v3: on «медленнее» plates МЕДЛЕННО / БЫСТРО instead of the small films
          const mf = wS ? B(tt, wS.t0 - .3, wS.t0 + .1) : 0;
          if (mf > .01) s += plate(104, 378, 'МЕДЛЕННО', mf, 15) + plate(276, 378, 'БЫСТРО', mf, 15);
          if (false) for (const [cx0, warm] of [[104, false], [266, true]]) {
            let g = '';
            const run = warm ? Math.floor((tt - wS.t0) * 4) : Math.floor((tt - wS.t0) * .9);
            for (let k = 0; k < 4; k++) {
              const x = cx0 - 39 + k * 26, on = ((run % 4) + 4) % 4 === k;
              g += `<rect x="${f(x - 11)}" y="334" width="22" height="28" rx="2" fill="#fff" fill-opacity="${on ? .16 : .03}" stroke="#fff" stroke-width="${on ? 1.2 : .6}"/>`;
              g += liteApple(x, 350, 8, { decay: warm ? Math.min(1, (k + Math.max(0, run - 3)) * .3) : .02, cold: warm ? 0 : 1, t: tt, yaw: .4, opacity: 1 });
            }
            g += UN.mono(cx0 + 56, 352, warm ? '>>>' : '>', { size: 14, anchor: 'start', opacity: .95 });
            s += `<g opacity="${f(mf * wq)}">${g}</g>`;
          }
        }
      }
    }

    // in-scene camera: slow breathing
    const z = 1 + .018 * Math.sin((tt - T.start) * .25);
    s = `<g transform="translate(180 200) scale(${z.toFixed(4)}) translate(-180 -200)">${s}</g>`;

    if (mode === 'slices') {
      const q = B(t, T.start, T.start + .7);
      if (q < 1) {
        const prev = p.prev && typeof SCENES[p.prev]?.body === 'function' ? SCENES[p.prev].body(t, K, p.prev_mode) : '';
        return `<g opacity="${f(1 - q)}">${prev}</g><g opacity="${f(q)}">${s}</g>`;
      }
    }
    return s;
  }

  SCENES.ts_strip = function (u, p, d, t) {
    p = p || {};
    return UN.wrap(body(t, p.K || {}, p.mode, p));
  };
  SCENES.ts_strip.body = (t, K, mode) => body(t, K || {}, mode, {});
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_strip; SCENES.ts_strip = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
