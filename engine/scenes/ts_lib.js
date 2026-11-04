/* «Время — это трансформация» (time_states): общий словарь рисунков window.TS, v1.
 * Стиль — «Сеть внутри сети» (un_lib.js): чёрный фон, белый и серые, светящиеся шары на нитях.
 * Все функции возвращают SVG-строку и зависят только от аргументов (никаких Math.random/Date/
 * состояния; случайность — UN.hash). Градиенты и фильтры (#un-ball, #un-halo, #un-soft) живут
 * в UN.wrap, поэтому сцена оборачивает результат в UN.wrap(svg).
 * Порядок загрузки: render.py грузит engine/scenes/*.js по алфавиту, ts_lib.js идёт РАНЬШЕ
 * un_lib.js, поэтому UN здесь вызывается только внутри функций (во время отрисовки).
 * Кадр 360×640, всё важное y=16..370, подписи ≥ 9,4 px. Углы стрелки — радианы, 0 = «12 часов»,
 * по часовой. Углы поворота плёнки — градусы.
 *
 * TS.strip(x, y, o)        плёнка состояний; (x,y) — центр ленты при offset=0.
 *   o.n=4 кадров, o.w=62, o.h=82 (3:4), o.gap=12, o.offset=0 (сдвиг по x, прокрутка),
 *   o.frame(i,cx,cy,w,h) → SVG содержимого кадра i (обрезается по кадру),
 *   o.lit(i) → 0..1 яркость кадра (по умолчанию 1), o.caption(i) → подпись под кадром (моно 9,4),
 *   o.opacity=1, o.angle=0 (наклон, градусы), o.view — полуширина окна: кадры дальше от x гаснут,
 *   o.id — уникальный id ленты в кадре (для clipPath; две ленты в одном кадре — разные id),
 *   o.t — время для бегущего блика по перфорации.
 * TS.clock(x, y, r, angle, o) кольцо-циферблат, 12 рисок, стрелка с шаром; o.digits — моно-подпись
 *   под часами, o.size=10, o.opacity=1, o.ticks=true, o.trail=0..1 (след стрелки).
 * TS.person(cx, groundY, height, o) человек облаком светящихся точек (как un_person).
 *   o.pose 'stand'|'fall'; o.fall 0..1 — плавный переход (перекрывает pose); o.rot — угол тела
 *   в градусах (по умолчанию 0 стоя, −88 в падении: спиной вниз, голова слева, руки чуть вверх);
 *   o.yaw (−0.3 стоя), o.opacity, o.t — дыхание и мерцание. Стоя: подошвы на groundY;
 *   в падении центр тела на groundY − 0.15·height.
 * TS.personAnchors(cx, groundY, height, pose|o) → {head:{x,y}, feet:{x,y}, center:{x,y}}:
 *   макушка, подошвы, центр — для часов у головы и ног. pose — строка или объект как o у person.
 * TS.apple(cx, cy, r, o)   яблоко из молекул-шаров на нитях с хвостиком и листом; r — полуширина,
 *   верх листа ≈ cy − 1.25r, низ ≈ cy + 0.95r. o.decay 0..1 (0 свежее, .5 потемнело, 1 сгнило),
 *   o.cold 0..1 (иней по контуру, дрожь замирает), o.t (дрожь молекул), o.opacity, o.yaw=.35, o.seed.
 * TS.egg(cx, cy, r, o)     яйцо из точек; r — полувысота (ширина ≈ 0.76r). o.broken 0..1:
 *   трещина → осколки летят по детерминированным траекториям, белок растекается до ±1.9r на
 *   y ≈ cy + 0.95r, желток опускается в лужу. Картина зависит только от broken (реверс — убывающий
 *   broken). o.opacity, o.t (только лёгкое мерцание точек).
 * TS.atom(cx, cy, r, o)    ядро-шар и орбиты с электроном. o.phase (радианы), o.rings=1|2,
 *   o.tilt (градусы первой орбиты, 28), o.opacity, o.trail=.6.
 * TS.ease(x) smoothstep 0..1; TS.between(t,a,b) smoothstep по абсолютным временам a→b;
 *   TS.fadeIn(t,a,dur=.4), TS.fadeOut(t,a,dur=.4) (1 до a, 0 после a+dur); TS.lerp(a,b,q).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const between = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const fadeIn = (t, a, dur = .4) => between(t, a, a + dur);
  const fadeOut = (t, a, dur = .4) => 1 - between(t, a, a + dur);
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => UN.hash(n);
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;
  const GA = 2.3999632297;
  // Lazy immutable caches: built once on first call from UN.hash, never mutated afterwards.
  const cache = {};
  const fib = (n, i) => { const y = 1 - 2 * (i + .5) / n, rr = Math.sqrt(1 - y * y), a = i * GA; return [rr * Math.cos(a), y, rr * Math.sin(a)]; };

  /* ---------------- плёнка состояний ---------------- */
  function strip(x, y, o = {}) {
    const n = o.n ?? 4, w = o.w ?? 62, h = o.h ?? 82, gap = o.gap ?? 12, off = o.offset ?? 0;
    const id = String(o.id ?? 's').replace(/[^A-Za-z0-9_-]/g, '');
    const pad = Math.max(9, h * .14), total = n * w + (n - 1) * gap;
    const x0 = x - total / 2 + off, bandL = x0 - gap * .75, bandR = x0 + total + gap * .75;
    const view = o.view ?? 1e9;
    const vis = cx => 1 - ease((Math.abs(cx - x) - view * .72) / (view * .28 + .001));
    let s = '', clips = '';
    // base of the film: faint fill and two hairline edges
    const top = y - h / 2 - pad, bot = y + h / 2 + pad;
    s += `<rect x="${f(bandL)}" y="${f(top)}" width="${f(bandR - bandL)}" height="${f(bot - top)}" rx="3" fill="#fff" opacity=".035"/>`;
    s += UN.polyline([[bandL, top], [bandR, top]], { opacity: .55, width: .5 });
    s += UN.polyline([[bandL, bot], [bandR, bot]], { opacity: .55, width: .5 });
    // perforation: dots fixed to the film (they move with offset)
    const step = 7.5, py1 = top + pad * .5, py2 = bot - pad * .5, run = (o.t ?? 0) * 60;
    let perf = '';
    for (let px = bandL + step * .5, k = 0; px < bandR; px += step, k++) {
      const v = vis(px); if (v <= .01) continue;
      const shine = .45 + .35 * Math.max(0, Math.cos((px - x0 - run) / 40));
      perf += `<rect x="${f(px - 1.5)}" y="${f(py1 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(shine * v)}"/>`;
      perf += `<rect x="${f(px - 1.5)}" y="${f(py2 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(shine * v)}"/>`;
    }
    s += `<g fill="#fff">${perf}</g>`;
    for (let i = 0; i < n; i++) {
      const cx = x0 + w / 2 + i * (w + gap), v = vis(cx); if (v <= .01) continue;
      const lit = clamp(o.lit ? o.lit(i) : 1), cid = `ts-clip-${id}-${i}`;
      clips += `<clipPath id="${cid}"><rect x="${f(cx - w / 2)}" y="${f(y - h / 2)}" width="${w}" height="${h}" rx="2.5"/></clipPath>`;
      let g = '';
      if (o.frame) g += `<g clip-path="url(#${cid})" opacity="${f(.22 + .78 * lit)}">${o.frame(i, cx, y, w, h)}</g>`;
      g += `<rect x="${f(cx - w / 2)}" y="${f(y - h / 2)}" width="${w}" height="${h}" rx="2.5" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.35 + .6 * lit)}"/>`;
      if (lit > .05) g += `<rect x="${f(cx - w / 2)}" y="${f(y - h / 2)}" width="${w}" height="${h}" rx="2.5" fill="none" stroke="#fff" stroke-width="2" opacity="${f(.3 * lit)}" filter="url(#un-soft)"/>`;
      const cap = o.caption ? o.caption(i) : '';
      if (cap) g += UN.mono(cx, bot + 13, cap, { size: o.capSize ?? 9.4, anchor: 'middle', opacity: .5 + .4 * lit });
      s += `<g opacity="${f(v)}">${g}</g>`;
    }
    const rot = o.angle ? ` transform="rotate(${f(o.angle)} ${f(x)} ${f(y)})"` : '';
    return `<g opacity="${f(o.opacity ?? 1)}"${rot}><defs>${clips}</defs>${s}</g>`;
  }

  /* ---------------- часы ---------------- */
  function clock(x, y, r, angle = 0, o = {}) {
    let s = '';
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#un-halo)" opacity=".18"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="${f(Math.max(1.2, r * .05))}" opacity=".35" filter="url(#un-soft)"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="${f(Math.max(.6, r * .012))}" opacity=".92"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * .86)}" fill="none" stroke="#fff" stroke-width=".4" opacity=".16"/>`;
    if (o.ticks !== false) for (let k = 0; k < 12; k++) {
      const a = k * Math.PI / 6, big = k % 3 === 0, r1 = r * (big ? .74 : .8), r2 = r * .92;
      s += UN.thread([x + Math.sin(a) * r1, y - Math.cos(a) * r1], [x + Math.sin(a) * r2, y - Math.cos(a) * r2],
        { width: big ? Math.max(.9, r * .022) : .55, opacity: big ? .85 : .55 });
    }
    const L = r * .7, tx = x + Math.sin(angle) * L, ty = y - Math.cos(angle) * L;
    if (o.trail) {
      let tr = '';
      for (let k = 1; k <= 10; k++) { const a = angle - k * .06; tr += dot(x + Math.sin(a) * L, y - Math.cos(a) * L, Math.max(.6, r * .022), o.trail * (1 - k / 11) * .5); }
      s += `<g fill="#fff">${tr}</g>`;
    }
    s += UN.thread([x, y], [tx, ty], { width: Math.max(.8, r * .018), opacity: .95 });
    s += UN.thread([x, y], [tx, ty], { width: Math.max(2, r * .05), opacity: .25, glow: true });
    s += UN.sphere(tx, ty, Math.max(2.2, r * .075), { glow: .9 });
    s += UN.sphere(x, y, Math.max(1.6, r * .05), { glow: .6, highlight: false });
    if (o.digits) s += UN.mono(x, y + r + 8 + (o.size ?? 10), o.digits, { size: Math.max(9.4, o.size ?? 10), anchor: 'middle', opacity: .92 });
    return `<g opacity="${f(o.opacity ?? 1)}">${s}</g>`;
  }

  /* ---------------- человек ---------------- */
  // Anatomical point cloud in local units: head centre (0,0,0), crown y=-27, soles y=273,
  // face looks to -z (camera). Same construction as un_person, ~4.5k points.
  function body() {
    if (cache.body) return cache.body;
    const pts = [];
    const push = (p, h, arm = 0) => pts.push({ p, h, arm });
    function ellipsoid(c, r, n, seed, face = false, arm = 0) {
      for (let i = 0; i < n; i++) {
        const zeta = 1 - 2 * (i + .5) / n, th = i * GA + seed, ring = Math.sqrt(1 - zeta * zeta), sh = .89 + .11 * H(i + seed);
        let x = r[0] * ring * Math.cos(th), y = r[1] * zeta, z = r[2] * ring * Math.sin(th);
        if (face) {
          x *= 1 - .22 * ease((y / r[1] - .08) / .82);
          if (z < 0) {
            const eye = Math.exp(-Math.pow((Math.abs(x) - 6.7) / 3.2, 2) - Math.pow((y + 2) / 3.5, 2));
            const nose = 6 * Math.exp(-x * x / 10 - Math.pow((y - 4) / 7, 2));
            z += 2.8 * eye - nose;
          }
        }
        push([c[0] + x * sh, c[1] + y * sh, c[2] + z * sh], H(i + seed * 13), arm);
      }
    }
    const shape = [[-0, 8, 8], [19, 8, 8], [29, 15, 10], [37, 34, 13], [46, 37, 15], [61, 32, 17], [84, 26, 15], [104, 23, 13], [121, 29, 15], [137, 27, 15], [147, 22, 13]];
    for (let i = 0; i < 1150; i++) {
      const y = 17 + H(i + 41) * 130;
      let j = 1; while (j < shape.length - 1 && shape[j][0] < y) j++;
      const a = shape[j - 1], b = shape[j], q = ease((y - a[0]) / (b[0] - a[0]));
      const rx = a[1] + (b[1] - a[1]) * q, rz = a[2] + (b[2] - a[2]) * q, ang = i * GA;
      push([rx * Math.cos(ang), y, rz * Math.sin(ang)], H(i + 874));
    }
    ellipsoid([0, 0, 0], [18.8, 27, 20.5], 950, 31, true);
    ellipsoid([-18, 2, 0], [3.8, 7, 3.5], 50, 61);
    ellipsoid([18, 2, 0], [3.8, 7, 3.5], 50, 71);
    function limb(sign, keys, n, seed, arm) {
      for (let i = 0; i < n; i++) {
        const y = keys[0][0] + H(i + seed) * (keys[keys.length - 1][0] - keys[0][0]);
        let j = 1; while (j < keys.length - 1 && keys[j][0] < y) j++;
        const a = keys[j - 1], b = keys[j], q = ease((y - a[0]) / (b[0] - a[0]));
        const cx = a[1] + (b[1] - a[1]) * q, rx = a[2] + (b[2] - a[2]) * q, rz = a[3] + (b[3] - a[3]) * q, ang = i * GA;
        push([sign * (cx + rx * Math.cos(ang)), y, rz * Math.sin(ang)], H(i + seed * 3), arm);
      }
    }
    for (const sign of [-1, 1]) {
      limb(sign, [[36, 32, 8, 9], [48, 36, 10, 10], [72, 39, 8, 8], [90, 42, 6.4, 7], [107, 44, 7.3, 7.5], [131, 45, 4.5, 5]], 460, 110 + sign, sign);
      ellipsoid([sign * 45, 139, -1], [5.5, 12, 5.3], 100, 310 + sign, false, sign);
      limb(sign, [[132, 15, 13, 13], [153, 16, 13, 13], [179, 17, 10.4, 11], [199, 17, 7.4, 8], [220, 17, 9, 9], [244, 18, 6, 6.5], [263, 18, 4.7, 5]], 620, 410 + sign, 0);
      ellipsoid([sign * 18, 263, -6], [6.5, 5, 14], 90, 610 + sign);
    }
    return (cache.body = Object.freeze(pts));
  }
  const PIVOT = 120;
  function rig(cx, groundY, height, o = {}) {
    if (typeof o === 'string') o = { pose: o };
    const q = clamp(o.fall ?? (o.pose === 'fall' ? 1 : 0)), sc = height / 300;
    const rot = (o.rot ?? -88 * q) * Math.PI / 180;
    const yaw = lerp(o.yaw ?? -.3, -Math.PI / 2 + .3, q), A = 1.15 * q;
    const cy = lerp(groundY - (273 - PIVOT) * sc, groundY - .15 * height, q);
    const cyw = Math.cos(yaw), syw = Math.sin(yaw), cr = Math.cos(rot), sr = Math.sin(rot);
    const tf = (x, y, z, arm = 0) => {
      if (arm && q > 0) { // arms rise toward the sky (face side) around the shoulder
        const dy = y - 36;
        const k2 = arm > 0 ? 1 : .72, c2 = Math.cos(A * k2), s2 = Math.sin(A * k2);
        y = 36 + dy * c2 + z * s2; z = -dy * s2 + z * c2; x += arm * dy * .14 * q;
      }
      y -= PIVOT;
      const X = x * cyw + z * syw, Z = -x * syw + z * cyw;
      const rx = X * cr - y * sr, ry = X * sr + y * cr;
      return { x: cx + rx * sc, y: cy + ry * sc, z: Z };
    };
    return { tf, sc };
  }
  function personAnchors(cx, groundY, height, pose = 'stand') {
    const { tf } = rig(cx, groundY, height, pose);
    const p = v => ({ x: v.x, y: v.y });
    return { head: p(tf(0, -27, 0)), feet: p(tf(0, 273, 0)), center: p(tf(0, PIVOT, 0)) };
  }
  function person(cx, groundY, height, o = {}) {
    const op = o.opacity ?? 1; if (op <= 0) return '';
    const { tf, sc } = rig(cx, groundY, height, o), t = o.t ?? 0;
    let sharp = '', soft = '';
    const pts = body();
    for (let i = 0; i < pts.length; i++) {
      const v = pts[i], [x, y, z] = v.p;
      const br = 1 + .012 * Math.sin(t * 1.7) * ease(y / 35) * (1 - ease((y - 105) / 50));
      const p = tf(x * br, y, z, v.arm);
      if (p.y < -12 || p.y > 652 || p.x < -12 || p.x > 372) continue;
      const front = clamp((20 - p.z) / 40), tw = .86 + .14 * Math.sin(t * 2.3 + v.h * 40);
      const a = (.25 + .6 * front) * (.7 + .3 * v.h) * tw;
      const r = Math.max(.2, (.26 + .22 * v.h) * Math.pow(sc * 1.15, .58));
      sharp += dot(p.x, p.y, r, a);
      if (i % 7 === 0) soft += dot(p.x, p.y, r * 1.4, a * .6);
    }
    return `<g opacity="${f(op)}" fill="#fff"><g filter="url(#un-soft)">${soft}</g>${sharp}</g>`;
  }

  /* ---------------- яблоко ---------------- */
  function appleGeo() {
    if (cache.apple) return cache.apple;
    const N = 70, mol = [], fine = [];
    for (let i = 0; i < N; i++) mol.push({ u: fib(N, i), h: H(i + 501), g: H(i + 777) });
    for (let i = 0; i < 320; i++) fine.push({ u: fib(320, i), h: H(i + 901) });
    const edges = [];
    for (let i = 0; i < N; i++) {
      const near = mol.map((m, j) => ({ j, d: m.u.reduce((s, v, k) => s + (v - mol[i].u[k]) ** 2, 0) }))
        .filter(m => m.j !== i).sort((a, b) => a.d - b.d).slice(0, 3);
      for (const m of near) if (m.j > i) edges.push([i, m.j, H(i * 31 + m.j)]);
    }
    return (cache.apple = { mol, fine, edges });
  }
  // unit apple: (u on unit sphere) -> local apple coords, r=1 half-width.
  function appleR(th, d) {
    return 1 - (.2 + .06 * d) * Math.exp(-th * th / .05) - .07 * Math.exp(-Math.pow(th - Math.PI, 2) / .06);
  }
  function applePt(u, d) {
    const hz = Math.sqrt(u[0] * u[0] + u[2] * u[2]), th = Math.atan2(hz, -u[1]);
    const ph = Math.atan2(u[2], u[0]);
    const R = appleR(th, d) * (1 + .05 * d * Math.sin(7 * ph + 3 * th));
    let Y = -Math.cos(th) * R * .97;
    let hr = Math.sin(th) * R * (1.02 - .07 * Y) * (1 + .05 * Math.exp(-Math.pow(th - .8, 2) / .12));
    const k = 1 - .15 * d; Y = .92 + (Y - .92) * k; hr *= 1 + .07 * d;
    const n = hz || 1;
    return [hr * u[0] / n, Y, hr * u[2] / n];
  }
  function apple(cx, cy, r, o = {}) {
    const op = o.opacity ?? 1; if (op <= 0) return '';
    const d = clamp(o.decay ?? 0), cold = clamp(o.cold ?? 0), t = o.t ?? 0, seed = o.seed ?? 0;
    r *= 1 - .2 * ease((d - .5) / .5);   // blind view v2 A3: a rotten apple shrinks — the silhouette changes, not only the light
    const yaw = o.yaw ?? .35, cyw = Math.cos(yaw), syw = Math.sin(yaw);
    const lum = 1 - .5 * d, spread = ease((d - .55) / .45), amp = .016 * (1 - .92 * cold);
    const { mol, fine, edges } = appleGeo();
    const proj = (u, h, i) => {
      let [x, y, z] = applePt(u, d);
      if (spread > 0) { x += (H(i * 3 + 11 + seed) - .5) * .32 * spread; y += (H(i * 3 + 12 + seed) - .5) * .2 * spread + .06 * spread * (1 + y); }
      x += amp * Math.sin(t * 5.1 + h * 37); y += amp * Math.cos(t * 4.3 + h * 53);
      const X = x * cyw + z * syw, Z = -x * syw + z * cyw;
      return { x: cx + X * r, y: cy + y * r, z: Z };
    };
    const spots = [[-.38, .12, .0], [.3, .38, .25], [.12, -.3, .45]].map(([sx, sy, st]) => ({ x: sx, y: sy, r: (.38 + .2 * ease((d - .6) / .4)) * ease((d - .3 - st * .5) / .4) }));
    const inSpot = p => spots.some(s => s.r > 0 && Math.hypot((p.x - cx) / r - s.x, (p.y - cy) / r - s.y) < s.r);
    let s = '';
    // silhouette contour (front view)
    const cont = [];
    for (let k = 0; k <= 72; k++) {
      const th = k / 72 * 2 * Math.PI, side = th <= Math.PI ? 1 : -1, tt = th <= Math.PI ? th : 2 * Math.PI - th;
      const p = applePt([side * Math.sin(tt), -Math.cos(tt), 0], d);
      cont.push([cx + p[0] * r, cy + p[1] * r]);
    }
    s += UN.polyline(cont, { opacity: .16 * lum, width: 2.2, glow: true });
    s += UN.polyline(cont, { opacity: .42 * lum, width: .55 });
    // fine dots
    let fd = '';
    fine.forEach((m, i) => {
      const p = proj(m.u, m.h, i + 300), front = clamp(.5 - p.z * .9);
      if (inSpot(p)) return;
      fd += dot(p.x, p.y, (.45 + .4 * m.h) * Math.max(.6, r / 60), (.15 + .55 * front) * lum);
    });
    s += `<g fill="#fff">${fd}</g>`;
    // molecules and threads
    const P = mol.map((m, i) => proj(m.u, m.h, i));
    let th = '';
    for (const [i, j, e] of edges) {
      if (e < d * .75) continue;
      const fr = clamp(.55 - (P[i].z + P[j].z) * .45);
      th += UN.thread(P[i], P[j], { width: .45, opacity: (.08 + .3 * fr) * lum });
    }
    s += th;
    // rot spots: drawn after the molecules (below), a warm brown fill with a light rim — black on black did not read (blind view v5 A5)
    let rot = '';
    for (const sp of spots) if (sp.r > .01) {
      const x = cx + sp.x * r, y = cy + sp.y * r, rr = sp.r * r;
      rot += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rr)}" ry="${f(rr * .8)}" fill="#7a5530" opacity=".92"/>`;
      rot += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rr)}" ry="${f(rr * .8)}" fill="none" stroke="#e8d2b0" stroke-width=".9" opacity=".75"/>`;
    }
    const order = P.map((p, i) => i).sort((a, b) => P[b].z - P[a].z);
    for (const i of order) {
      const m = mol[i], p = P[i], front = clamp(.6 - p.z * .8), rm = r * .052 * (.8 + .45 * m.h);
      const grey = m.g < d * .8 || inSpot(p);
      if (grey) s += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(rm * .85)}" fill="#5a5a5a" fill-opacity=".55" stroke="#9a9a9a" stroke-width=".4" opacity="${f(.35 + .45 * front)}"/>`;
      else s += UN.sphere(p.x, p.y, rm, { opacity: (.35 + .65 * front) * (1 - .25 * d), glow: .28 });
    }
    s += rot;
    // stem and leaf
    const top = applePt([0, -1, 0], d), droop = .25 * d;
    const sb = [cx + top[0] * r, cy + (top[1] + .03) * r];
    const se = [cx + (.13 + .12 * droop) * r, cy + (top[1] - .36 + .2 * droop) * r];
    const sc_ = [cx + .02 * r, cy + (top[1] - .26) * r];
    s += `<path d="M${f(sb[0])} ${f(sb[1])} Q${f(sc_[0])} ${f(sc_[1])} ${f(se[0])} ${f(se[1])}" fill="none" stroke="#fff" stroke-width="${f(Math.max(.8, r * .035))}" stroke-linecap="round" opacity="${f(.85 * lum)}"/>`;
    s += UN.sphere(se[0], se[1], Math.max(1.2, r * .03), { glow: .4, opacity: lum, highlight: false });
    const lb = [lerp(sb[0], se[0], .55) + .02 * r, lerp(sb[1], se[1], .55)];
    const la = -.42 + .75 * d, L = r * (.55 - .1 * d), wl = .3 - .12 * d;
    const lp = (q, sgn) => { const along = q * L, off = sgn * Math.sin(Math.PI * Math.pow(q, .8)) * L * wl;
      return [lb[0] + Math.cos(la) * along - Math.sin(la) * off, lb[1] + Math.sin(la) * along + Math.cos(la) * off]; };
    const leaf = [];
    for (let k = 0; k <= 14; k++) leaf.push(lp(k / 14, 1));
    for (let k = 14; k >= 0; k--) leaf.push(lp(k / 14, -1));
    s += `<path d="M${leaf.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')} Z" fill="#fff" fill-opacity="${f(.06 * lum)}" stroke="#fff" stroke-width=".7" opacity="${f(.8 * lum)}"/>`;
    s += UN.polyline([lp(0, 0), lp(1, 0)], { opacity: .45 * lum, width: .45 });
    for (let k = 1; k <= 3; k++) { const a = lp(k / 4.5, 0); s += UN.polyline([a, lp(k / 4.5 + .16, 1)], { opacity: .25 * lum, width: .35 }); s += UN.polyline([a, lp(k / 4.5 + .16, -1)], { opacity: .25 * lum, width: .35 }); }
    // frost
    if (cold > 0) {
      let fr = '';
      for (let i = 0; i < 170; i++) {
        const k = Math.floor(H(i + 1201) * 72), c = cont[k], out = 1.5 + H(i + 1301) * 5 * Math.max(.6, r / 60);
        const dx = c[0] - cx, dy = c[1] - cy, n = Math.hypot(dx, dy) || 1;
        const a = cold * (.35 + .6 * H(i + 1401)) * (.85 + .15 * Math.sin(t * 1.3 + i));
        fr += dot(c[0] + dx / n * out, c[1] + dy / n * out, .35 + .55 * H(i + 1501), a);
      }
      s += `<g fill="#fff">${fr}</g>`;
      for (let i = 0; i < 9; i++) {
        const c = cont[Math.floor(H(i + 1601) * 72)], dx = c[0] - cx, dy = c[1] - cy, n = Math.hypot(dx, dy) || 1;
        const x = c[0] + dx / n * 4, y = c[1] + dy / n * 4, L2 = (1.6 + 2.2 * H(i + 1701)) * Math.max(.7, r / 60);
        for (let k = 0; k < 3; k++) { const a = k * Math.PI / 3 + H(i + 1801); s += UN.thread([x - Math.cos(a) * L2, y - Math.sin(a) * L2], [x + Math.cos(a) * L2, y + Math.sin(a) * L2], { width: .4, opacity: .7 * cold }); }
      }
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  /* ---------------- яйцо ---------------- */
  function eggGeo() {
    if (cache.egg) return cache.egg;
    const K = 11, seeds = [], shell = [];
    for (let k = 0; k < K; k++) seeds.push({ u: fib(K, k), h: H(k + 2001), h2: H(k + 2101), h3: H(k + 2201) });
    for (let i = 0; i < 420; i++) {
      const u = fib(420, i);
      let best = 0, bd = 9;
      seeds.forEach((sd, k) => { const dd = sd.u.reduce((s, v, j) => s + (v - u[j]) ** 2, 0); if (dd < bd) { bd = dd; best = k; } });
      shell.push({ u, k: best, h: H(i + 2301) });
    }
    return (cache.egg = { seeds, shell });
  }
  const eggPt = u => { const y = u[1], w = .76 * (1 + .1 * y); return [u[0] * w, y, u[2] * w]; };
  function egg(cx, cy, r, o = {}) {
    const op = o.opacity ?? 1; if (op <= 0) return '';
    const b = clamp(o.broken ?? 0), t = o.t ?? 0, fly = ease((b - .12) / .88), crack = ease(b / .05) * (1 - ease((b - .14) / .08));
    const { seeds, shell } = eggGeo();
    const yaw = .4, cyw = Math.cos(yaw), syw = Math.sin(yaw);
    let s = '';
    // contents: albumen puddle and yolk (only after the shell opens)
    const spill = ease((b - .1) / .9);
    if (spill > 0) {
      const py = cy + .95 * r, rx = r * (.45 + 1.45 * spill), ry = r * (.07 + .12 * spill);
      s += `<ellipse cx="${f(cx)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" fill="#fff" opacity="${f(.07 * ease(spill / .15))}"/>`;
      let pd = '';
      for (let i = 0; i < 90; i++) {
        const a = i * GA, rr = Math.sqrt((i + .5) / 90), wob = 1 + .12 * Math.sin(a * 3 + 1.3);
        pd += dot(cx + Math.cos(a) * rx * rr * wob, py + Math.sin(a) * ry * rr * wob, .45 + .35 * H(i + 2401), .55 * ease(spill / .2) * (.5 + .5 * rr));
      }
      s += `<g fill="#fff">${pd}</g>`;
      s += `<ellipse cx="${f(cx)}" cy="${f(py)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width=".55" opacity="${f(.55 * ease(spill / .2))}"/>`;
      const yy = lerp(cy + .2 * r, py - r * .12 * (1 - .4 * spill), ease(spill / .6)), yr = r * .2;
      s += UN.sphere(cx + .05 * r * spill, yy, yr, { glow: .7, opacity: ease(spill / .12) });
      s += UN.weight(cx + .05 * r * spill, yy + yr * .55, yr * 1.35, yr * .32, { opacity: .5 * ease((spill - .4) / .4) });
    }
    // contour of the whole egg
    const cont = [];
    for (let k = 0; k <= 64; k++) { const a = k / 64 * 2 * Math.PI, p = eggPt([Math.sin(a), -Math.cos(a), 0]); cont.push([cx + p[0] * r, cy + p[1] * r]); }
    const whole = 1 - ease(b / .2);
    if (whole > 0) { s += UN.polyline(cont, { opacity: .2 * whole, width: 2.2, glow: true }); s += UN.polyline(cont, { opacity: .7 * whole, width: .6 }); }
    // shell fragments
    const frag = seeds.map((sd, k) => {
      const c = eggPt(sd.u), X = c[0] * cyw + c[2] * syw;
      const vx = (X >= 0 ? 1 : -1) * (.35 + .6 * sd.h) + X * .5, vy = c[1] * .4 - .75 - .45 * sd.h2;
      return { dx: (vx * fly) * r, dy: (vy * fly + (1.15 + .3 * sd.h3) * fly * fly) * r, rot: (sd.h3 - .5) * 3.2 * fly, c: [cx + X * r, cy + c[1] * r] };
    });
    const move = (x, y, F) => {
      if (fly <= 0) return [x, y];
      const ca = Math.cos(F.rot), sa = Math.sin(F.rot), ox = x - F.c[0], oy = y - F.c[1];
      return [F.c[0] + ox * ca - oy * sa + F.dx, F.c[1] + ox * sa + oy * ca + F.dy];
    };
    if (fly > 0) {
      // each shard keeps its piece of the outline, so flying pieces read as shell
      const near = u => { let best = 0, bd = 9; seeds.forEach((q, k) => { const dd = q.u.reduce((s2, v, j) => s2 + (v - u[j]) ** 2, 0); if (dd < bd) { bd = dd; best = k; } }); return best; };
      let arc = [], prev = -1;
      const flush = () => { if (arc.length > 1) s += UN.polyline(arc, { opacity: .75, width: .6 }); arc = []; };
      for (let k = 0; k <= 64; k++) {
        const a = k / 64 * 2 * Math.PI, u = [Math.sin(a) * cyw, -Math.cos(a), Math.sin(a) * syw], kk = near(u);
        if (kk !== prev) flush();
        prev = kk; arc.push(move(cont[k][0], cont[k][1], frag[kk]));
      }
      flush();
    }
    let sd = '';
    for (const m of shell) {
      const p = eggPt(m.u), X = p[0] * cyw + p[2] * syw, Z = -p[0] * syw + p[2] * cyw, F = frag[m.k];
      let x = cx + X * r, y = cy + p[1] * r;
      [x, y] = move(x, y, F);
      const front = clamp(.55 - Z * .9), tw = .9 + .1 * Math.sin(t * 2 + m.h * 30);
      sd += dot(x, y, (.5 + .45 * m.h) * Math.max(.6, r / 55), (.18 + .7 * front) * tw * (1 - .25 * fly));
    }
    s += `<g fill="#fff">${sd}</g>`;
    // crack
    if (crack > 0) {
      const pts = [];
      for (let k = 0; k <= 9; k++) { const q = k / 9; pts.push([cx + (-.62 + 1.24 * q) * .76 * r, cy + (-.05 + (k % 2 ? .09 : -.07) + .05 * Math.sin(q * 5)) * r]); }
      s += UN.polyline(pts, { opacity: .95 * crack, width: .9 });
      s += UN.polyline(pts, { opacity: .4 * crack, width: 2.4, glow: true });
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  /* ---------------- атом ---------------- */
  function atom(cx, cy, r, o = {}) {
    const op = o.opacity ?? 1; if (op <= 0) return '';
    const n = o.rings ?? 1, ph = o.phase ?? 0, tilt = o.tilt ?? 28, ry = r * .3, trail = o.trail ?? .6;
    let back = '', front = '';
    for (let k = 0; k < n; k++) {
      const ang = (k ? -tilt : tilt) * Math.PI / 180, ca = Math.cos(ang), sa = Math.sin(ang);
      const at = a => { const x = Math.cos(a) * r, y = Math.sin(a) * ry; return [cx + x * ca - y * sa, cy + x * sa + y * ca]; };
      const ring = UN.weight(cx, cy, r, ry, { opacity: .7, angle: (k ? -tilt : tilt) });
      back += ring;
      const a0 = ph + k * 2.1, e = at(a0);
      let tr = '';
      for (let j = 1; j <= 14; j++) { const p = at(a0 - j * .07); tr += dot(p[0], p[1], Math.max(.5, r * .018) * (1 - j / 18), trail * (1 - j / 15) * .7); }
      const target = Math.sin(a0) > 0 ? 'front' : 'back';
      const g = `<g fill="#fff">${tr}</g>` + UN.sphere(e[0], e[1], Math.max(2, r * .07), { glow: .9 });
      if (target === 'front') front += g; else back += g;
    }
    const nuc = UN.sphere(cx, cy, Math.max(4, r * .2), { glow: 1 });
    return `<g opacity="${f(op)}">${back}${nuc}${front}</g>`;
  }

  // Blind view 03.11 (A2): on a phone, captions under ~11 px of the 360 frame read as dust — every scene of this film
  // passes its SVG through bigText: any font-size between 5 and 12 becomes 12 (5 and less are glyph details, kept).
  const bigText = svg => String(svg).replace(/font-size="([\d.]+)"/g, (m, v) => (+v > 5 && +v < 14 ? 'font-size="14"' : m));
  window.TS = Object.freeze({ strip, clock, person, personAnchors, apple, egg, atom, ease, between, fadeIn, fadeOut, lerp, bigText });
})();
