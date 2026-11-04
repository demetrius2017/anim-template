/* «Время — это трансформация» (eps/time_states), сцена ts_fall — блок g: страх, падение, память.
 * Стиль — un_lib (чёрный фон, белый и серые, шары на нитях); фишка — плёнка состояний.
 *
 * SCENES.ts_fall(u, p, d, t) → UN.wrap(body(t, p.K, p.mode, p)); SCENES.ts_fall.body(t, K, mode) — сырой SVG
 * без wrap и без фона (его зовёт следующая сцена для наплыва). Параметры p:
 *   p.mode  'danger' | 'fall' | 'recall';  p.K — времена фраз и слов (eps/time_states/build/cues.json);
 *   p.s     id фразы кадра (g1/g2/g3) — начало наплыва K[p.s]−0.05;
 *   p.prev, p.prev_mode — уходящая сцена: 0,7 с её body() гаснет под нашей (нет body — из чёрного).
 * Камера движка нейтральна, камера — внутри сцены (масштаб/сдвиг группы).
 *
 * Режимы и слова (время — только из K: cue(K, фраза, начало_слова, доля_фразы_на_случай_без_слов, № повтора)):
 *   danger (g1): голова из точек и почти пустая плёнка (вход из ts_memory/none: светится последний кадр).
 *     «наоборот» — кадры плёнки загораются от последнего к первому; «опасности» — кольца-сигналы от головы;
 *     «обостряет»…«внимание» — точки головы ярче и мельче (резче), рамка-прицел сходится, подпись ВНИМАНИЕ;
 *     «запоминает» — кадры чаще летят из плёнки в голову; «больше обычного» — плёнка вдруг густеет
 *     (7 кадров → 13); второе «больше» — кадры летят в голову плотным потоком.
 *   fall (g2): каркасная вышка, размер «30 М», человек (TS.person, поза fall) лежит спиной вниз на площадке.
 *     «роняли» — сигнал у площадки; «спиной» — створки под телом раскрываются, падение до «сетку» (ускорение, плавно);
 *     сеть из нитей прогибается и качается. «Своё» — сцена отъезжает вверх-в-малое, снизу разматывается
 *     плёнка СВОЁ (6 кадров), «оценили» — над ней ЧУЖОЕ (6 кадров), «треть» — СВОЁ дорастает до 8 кадров
 *     (на треть длиннее) со скобкой +1/3, «других» — вспыхивает ЧУЖОЕ и пунктир сравнения.
 *   recall (g3): запястье из точек с табло 8×8 светодиодов; «мелькающие» — цифры сменяются ~16 раз в секунду
 *     со шлейфом прошлых — прочесть нельзя; линии скорости (полёт); «прочли» — курсивный «?».
 *     «Время» — табло уходит в угол, появляются часы с ровным ходом и ровная шкала РОВНО;
 *     «нарезок» — снизу быстро набирается густая плёнка ПАМЯТЬ из 15 кадров того же падения.
 *     Дальше ts_body/answer (он владеет наплывом и зовёт body(t, K, 'recall')).
 * Проверка: scene_test.py ts_fall '{"mode":"fall","s":"g2","K":…}' --dur 240 --at 182.4,…
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const between = (t, a, b) => ease((t - a) / Math.max(.001, b - a));
  const lerp = (a, b, q) => a + (b - a) * q;
  const H = n => UN.hash(n);
  const GA = 2.3999632297;
  const norm = w => String(w).toLowerCase().replace(/[^а-яёa-z0-9]/g, '');
  // Start of the n-th word of phrase id beginning with stem; without words — a share of the phrase.
  // stem may be a list of alternatives (the text is still being edited): the first one found wins.
  const cue = (K, id, stem, share = 0, n = 0) => {
    for (const st of [].concat(stem)) {
      const a = (K.words?.[id] || []).filter(x => norm(x.w).startsWith(st))[n];
      if (a) return a.t0;
    }
    const s = K[id] ?? 0, e = K[id + '_end'] ?? s + 6;
    return s + share * (e - s);
  };
  const dot = (x, y, r, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(o)}"/>`;
  const cam = (s, sc, ox, oy, fx = 180, fy = 190) =>
    `<g transform="translate(${f(fx + ox - fx * sc)} ${f(fy + oy - fy * sc)}) scale(${f(sc)})">${s}</g>`;

  /* плёнка с кадрами в произвольных местах (вид как у TS.strip) */
  function film(y, frames, o = {}) {
    if (!frames.length) return '';
    const id = o.id || 'Ef', hm = o.hmax ?? Math.max(...frames.map(q => q.h)), pad = Math.max(9, hm * .14);
    const top = y - hm / 2 - pad, bot = y + hm / 2 + pad;
    const L = o.left ?? Math.min(...frames.map(q => q.x - q.w / 2)) - 6;
    const R = o.right ?? Math.max(...frames.map(q => q.x + q.w / 2)) + 6;
    if (R - L < 2) return '';
    let s = `<rect x="${f(L)}" y="${f(top)}" width="${f(R - L)}" height="${f(bot - top)}" rx="3" fill="#fff" opacity=".035"/>`;
    s += UN.polyline([[L, top], [R, top]], { opacity: .55, width: .5 }) + UN.polyline([[L, bot], [R, bot]], { opacity: .55, width: .5 });
    const run = (o.t ?? 0) * 60, py1 = top + pad * .5, py2 = bot - pad * .5;
    let perf = '';
    for (let px = L + 3.75; px < R - 1; px += 7.5) {
      const sh = .45 + .35 * Math.max(0, Math.cos((px - L - run) / 40));
      perf += `<rect x="${f(px - 1.5)}" y="${f(py1 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(sh)}"/><rect x="${f(px - 1.5)}" y="${f(py2 - 1.1)}" width="3" height="2.2" rx="1" opacity="${f(sh)}"/>`;
    }
    s += `<g fill="#fff">${perf}</g>`;
    let clips = '';
    frames.forEach((q, i) => {
      const op = q.op ?? 1; if (op <= .01 || q.w < .5) return;
      const lit = clamp(q.lit ?? 1), cid = `${id}-${i}`, x0 = q.x - q.w / 2, y0 = y - q.h / 2;
      let g = '';
      if (q.fill) g += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5" fill="#000" opacity="${f(q.fill)}"/>`;
      if (q.draw) {
        clips += `<clipPath id="${cid}"><rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5"/></clipPath>`;
        g += `<g clip-path="url(#${cid})" opacity="${f(.22 + .78 * lit)}">${q.draw(q.x, y, q.w, q.h)}</g>`;
      }
      g += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.35 + .6 * lit)}"/>`;
      if (lit > .05) g += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q.w)}" height="${f(q.h)}" rx="2.5" fill="none" stroke="#fff" stroke-width="2" opacity="${f(.3 * lit)}" filter="url(#un-soft)"/>`;
      s += `<g opacity="${f(op)}">${g}</g>`;
    });
    return `<g opacity="${f(o.opacity ?? 1)}"><defs>${clips}</defs>${s}</g>`;
  }

  /* голова с плечами из точек (облегчённый бюст в духе TS.person) */
  let BUST = null;
  function bustPts() {
    if (BUST) return BUST;
    const pts = [];
    const ell = (c, r, n, seed, face) => {
      for (let i = 0; i < n; i++) {
        const z0 = 1 - 2 * (i + .5) / n, th = i * GA + seed, ring = Math.sqrt(1 - z0 * z0), sh = .89 + .11 * H(i + seed);
        let x = r[0] * ring * Math.cos(th), y = r[1] * z0, z = r[2] * ring * Math.sin(th);
        if (face) {
          x *= 1 - .22 * ease((y / r[1] - .08) / .82);
          if (z < 0) {
            const eye = Math.exp(-Math.pow((Math.abs(x) - 6.7) / 3.2, 2) - Math.pow((y + 2) / 3.5, 2));
            z += 2.8 * eye - 6 * Math.exp(-x * x / 10 - Math.pow((y - 4) / 7, 2));
          }
        }
        pts.push([c[0] + x * sh, c[1] + y * sh, c[2] + z * sh, H(i + seed * 13)]);
      }
    };
    ell([0, 0, 0], [18.8, 27, 20.5], 720, 31, true);
    ell([-18, 2, 0], [3.8, 7, 3.5], 36, 61);
    ell([18, 2, 0], [3.8, 7, 3.5], 36, 71);
    for (let i = 0; i < 90; i++) { const y = 18 + H(i + 900) * 18, a = i * GA; pts.push([8.5 * Math.cos(a), y, 8 * Math.sin(a), H(i + 950)]); }
    const shape = [[29, 13, 9], [36, 33, 13], [46, 37, 15], [62, 33, 17], [82, 28, 15]];
    for (let i = 0; i < 380; i++) {
      const y = 29 + H(i + 41) * 53;
      let j = 1; while (j < shape.length - 1 && shape[j][0] < y) j++;
      const a = shape[j - 1], b = shape[j], q = ease((y - a[0]) / (b[0] - a[0])), ang = i * GA;
      pts.push([lerp(a[1], b[1], q) * Math.cos(ang), y, lerp(a[2], b[2], q) * Math.sin(ang), H(i + 874)]);
    }
    return (BUST = Object.freeze(pts));
  }
  function bust(cx, cy, sc, o = {}) {
    const yaw = o.yaw ?? -.25, cyw = Math.cos(yaw), syw = Math.sin(yaw), t = o.t ?? 0, sharp = clamp(o.sharp ?? 0);
    let hard = '', soft = '';
    bustPts().forEach((v, i) => {
      const [x, y, z, h] = v, X = x * cyw + z * syw, Z = -x * syw + z * cyw;
      const px = cx + X * sc, py = cy + y * sc, front = clamp((20 - Z) / 40);
      const low = 1 - ease((y - 50) / 32), tw = .82 + .18 * Math.sin(t * (2.1 + 2.5 * sharp) + h * 40);
      const a = (.3 + .7 * front) * (.7 + .3 * h) * tw * low * (.6 + .4 * sharp);
      const r = (.36 + .26 * h) * (1.1 - .3 * sharp) * Math.pow(sc / 2.4, .5);
      hard += dot(px, py, r, Math.min(1, a * (1 + .35 * sharp)));
      if (i % 6 === 0) soft += dot(px, py, r * (1.9 - .6 * sharp), a * (.5 - .25 * sharp));
    });
    return `<g fill="#fff" opacity="${f(o.opacity ?? 1)}"><g filter="url(#un-soft)">${soft}</g>${hard}</g>`;
  }

  /* мини-кадр падения: вышка, сеть и фигурка на высоте k (0 — верх, 1 — сеть) */
  function miniFall(k, bright = 1) {
    return (cx, cy, w, h) => {
      const tx = cx - w * .3, y = lerp(cy - h * .3, cy + h * .22, k), x = cx + w * .1;
      let s = UN.thread([tx, cy - h * .42], [tx, cy + h * .45], { width: .5, opacity: .45 * bright });
      s += UN.thread([tx, cy - h * .36], [tx + w * .2, cy - h * .36], { width: .5, opacity: .45 * bright });
      s += UN.polyline([[cx - w * .12, cy + h * .3], [cx + w * .12, cy + h * .34], [cx + w * .4, cy + h * .3]], { width: .5, opacity: .5 * bright });
      s += UN.thread([x - w * .2, y], [x + w * .2, y], { width: Math.max(1, w * .07), opacity: .9 * bright });
      s += `<circle cx="${f(x - w * .25)}" cy="${f(y - .5)}" r="${f(Math.max(1, w * .065))}" fill="#fff" opacity="${f(.95 * bright)}"/>`;
      return s;
    };
  }
  // abstract state inside a memory frame
  function stateArt(seed) {
    return (cx, cy, w, h) => {
      let s = UN.thread([cx - w * .4, cy + h * .18], [cx + w * .4, cy + h * .18], { width: .4, opacity: .35 });
      let d = '';
      for (let k = 0; k < 4; k++) d += dot(cx + (H(seed * 9 + k) - .5) * w * .7, cy + (H(seed * 9 + k + 4) - .6) * h * .6, Math.max(.6, w * .045), .85);
      s += `<g fill="#fff">${d}</g>`;
      s += `<circle cx="${f(cx + (H(seed + 77) - .5) * w * .4)}" cy="${f(cy - h * .12)}" r="${f(w * .11)}" fill="url(#un-ball)" stroke="#fff" stroke-width=".4" opacity=".9"/>`;
      return s;
    };
  }

  /* ---------------- danger (g1) ---------------- */
  function danger(t, K) {
    const s0 = K.g1 ?? 0, e0 = K.g1_end ?? s0 + 7.6;
    const tNao = cue(K, 'g1', 'наоборот', .08), tOp = cue(K, 'g1', 'опасн', .19), tSharp = cue(K, 'g1', 'обостр', .32);
    const tAtt = cue(K, 'g1', 'вниман', .41), tRem = cue(K, 'g1', 'запомин', .6), tMore = cue(K, 'g1', 'больше', .69);
    const tMore2 = cue(K, 'g1', 'больше', .87, 1);
    const sharp = between(t, tSharp, tAtt + .45), dense = between(t, tMore, tMore + .45);
    const HX = 180, HY = 150, HS = 2.5, SY = 318;
    let s = '';
    // signal rings from the head ("в опасности"), then a slow pulse
    for (let k = 0; k < 3; k++) {
      const q = (t - tOp - k * .32) / 1.3;
      if (q > 0 && q < 1) s += UN.weight(HX, HY - 6, 46 + 110 * q, 60 + 110 * q, { opacity: .55 * (1 - q) * (1 - .3 * k) });
    }
    if (t > tOp + 1) { const q = ((t - tOp - 1) / 1.7) % 1; s += UN.weight(HX, HY - 6, 50 + 70 * q, 64 + 70 * q, { opacity: .22 * (1 - q) }); }
    s += `<circle cx="${HX}" cy="${HY}" r="${f(120 + 10 * sharp)}" fill="url(#un-halo)" opacity="${f(.12 + .2 * sharp + .04 * Math.sin(t * 2.2))}"/>`;
    s += bust(HX, HY, HS, { t, sharp, yaw: -.25 + .12 * Math.sin(t * .4) });
    // focus brackets close in on "обостряет … внимание"
    const br = between(t, tSharp - .1, tAtt + .3);
    if (br > 0) {
      const bw = lerp(132, 64, br), bh = lerp(150, 86, br), a = 15, op = .9 * br;
      let b = '';
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const x = HX + sx * bw, y = HY - 4 + sy * bh;
        b += UN.polyline([[x, y - sy * a], [x, y], [x - sx * a, y]], { width: 1.1, opacity: op });
      }
      s += b;
      s += UN.mono(HX + bw, HY - 4 - bh - 7, 'ВНИМАНИЕ', { size: 9.4, anchor: 'end', opacity: .85 * between(t, tAtt - .05, tAtt + .4) });
    }
    // the film: 7 sparse frames → 13 dense frames (even slots keep the old frames)
    const frames = [];
    for (let i = 0; i < 13; i++) {
      const even = i % 2 === 0, k = i / 2;
      let x, w, h, op = 1, lit;
      if (even) { x = lerp(42 + 46 * k, 36 + 24 * i, dense); w = lerp(26, 20, dense); h = lerp(35, 27, dense); }
      else { const q = between(t, tMore + .04 * i, tMore + .04 * i + .3); x = 36 + 24 * i; w = 20 * q; h = 27 * (.6 + .4 * q); op = q; }
      if (dense > 0) lit = lerp(even ? .55 : .3, .62 + .38 * Math.sin(t * 5 + i * 1.7) ** 2, dense);
      else lit = k === 6 ? 1 : .1 + .45 * between(t, tNao + (6 - k) * .11, tNao + (6 - k) * .11 + .3);
      frames.push({ x, w, h, op, lit, draw: stateArt(i + 3) });
    }
    s += film(SY, frames, { id: 'Efd', t, left: 25, right: 335, hmax: lerp(35, 27, dense) });
    // frames fly from the film into the head: sparse, then on "запоминает", then dense on the 2nd "больше"
    const segs = [[s0 + .5, 1.25], [tRem, .55], [tMore2, .15]], FLY = .85;
    let fly = '', flash = '';
    segs.forEach(([a, per], si) => {
      const b = si < segs.length - 1 ? segs[si + 1][0] : e0 + 3;
      for (let j = Math.max(0, Math.floor((t - FLY - .4 - a) / per)); ; j++) {
        const ts = a + j * per; if (ts >= b || ts > t) break;
        const q = (t - ts) / FLY, id = si * 1000 + j;
        const slot = Math.floor(H(id * 7.3 + 1) * 13), ox = 36 + 24 * slot, oy = SY;
        const tx = HX + (H(id + 2) - .5) * 46, ty = HY - 8 + (H(id + 3) - .5) * 56;
        if (q < 1) {
          const e = q * q * (3 - 2 * q), c = [lerp(ox, tx, .3) + (H(id + 5) - .5) * 80, SY - 150];
          const x = (1 - e) * (1 - e) * ox + 2 * (1 - e) * e * c[0] + e * e * tx, y = (1 - e) * (1 - e) * oy + 2 * (1 - e) * e * c[1] + e * e * ty;
          const sc = lerp(1, .28, e), w = 20 * sc, h = 27 * sc, op = clamp(q / .12) * (1 - ease((q - .75) / .25));
          fly += `<g opacity="${f(op)}" transform="rotate(${f((H(id + 9) - .5) * 30 * e)} ${f(x)} ${f(y)})"><rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="1.5" fill="none" stroke="#fff" stroke-width=".8"/><rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="1.5" fill="none" stroke="#fff" stroke-width="2" opacity=".35" filter="url(#un-soft)"/>${dot(x, y, 1.2 * sc + .4, .9)}</g>`;
        } else if (q < 1.45) {
          const k2 = (q - 1) / .45;
          flash += `<circle cx="${f(tx)}" cy="${f(ty)}" r="${f(4 + 10 * k2)}" fill="url(#un-halo)" opacity="${f(.9 * (1 - k2))}"/>` + dot(tx, ty, 1.4, .9 * (1 - k2));
        }
      }
    });
    s += `<g fill="#fff">${flash}</g>${fly}`;
    s += UN.bokeh(t, { count: 10, opacity: .45, seed: 41 });
    const z = 1 + .04 * between(t, s0, e0 + 1) + .025 * sharp;
    return cam(s, z, 0, 0, 180, 200);
  }

  /* ---------------- fall (g2) ---------------- */
  function tower(t) {
    let s = '';
    const yT = 86, yB = 348, xl = y => lerp(68, 60, (y - yT) / (yB - yT)), xr = y => lerp(100, 110, (y - yT) / (yB - yT));
    const BX = 9, BY = -7; // back face offset
    for (const [ax, dx, dy, op] of [[xl, 0, 0, .7], [xr, 0, 0, .7], [xl, BX, BY, .3], [xr, BX, BY, .3]])
      s += UN.thread([ax(yT) + dx, yT + dy], [ax(yB) + dx, yB + dy], { width: .7, opacity: op });
    const lv = 9;
    for (let k = 0; k <= lv; k++) {
      const y = lerp(yT, yB, k / lv);
      s += UN.thread([xl(y), y], [xr(y), y], { width: .55, opacity: .55 });
      s += UN.thread([xl(y) + BX, y + BY], [xr(y) + BX, y + BY], { width: .45, opacity: .25 });
      s += UN.thread([xr(y), y], [xr(y) + BX, y + BY], { width: .45, opacity: .3 });
      if (k < lv) {
        const y2 = lerp(yT, yB, (k + 1) / lv);
        s += UN.thread([xl(y), y], [xr(y2), y2], { width: .4, opacity: .3 });
        s += UN.thread([xr(y), y], [xl(y2), y2], { width: .4, opacity: .3 });
      }
    }
    s += UN.sphere(xl(yB), yB, 2.2, { glow: .5, highlight: false }) + UN.sphere(xr(yB), yB, 2.2, { glow: .5, highlight: false });
    return s;
  }
  function net(t, dipX, dip) {
    const P = (u, v) => {
      const nl = [118, 340], nr = [340, 340], fl = [146, 308], fr = [320, 308];
      let x = lerp(lerp(nl[0], nr[0], u), lerp(fl[0], fr[0], u), v), y = lerp(lerp(nl[1], nr[1], u), lerp(fl[1], fr[1], u), v);
      y += dip * Math.exp(-Math.pow((x - dipX) / 48, 2) - Math.pow((v - .5) / .45, 2)) + 1.2 * Math.sin(t * 1.8 + u * 7 + v * 3);
      return [x, y];
    };
    let s = '';
    for (let j = 0; j <= 4; j++) { const row = []; for (let i = 0; i <= 20; i++) row.push(P(i / 20, j / 4)); s += UN.polyline(row, { width: .5, opacity: .32 + .1 * (j === 0 || j === 4) }); }
    for (let i = 0; i <= 12; i++) { const col = []; for (let j = 0; j <= 8; j++) col.push(P(i / 12, j / 8)); s += UN.polyline(col, { width: .45, opacity: .3 }); }
    for (const [u, v] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
      const p = P(u, v); s += UN.thread(p, [p[0], p[1] + 20], { width: .6, opacity: .45 }) + UN.sphere(p[0], p[1], 2.4, { glow: .6, highlight: false });
    }
    return s;
  }
  function fallMode(t, K) {
    const s0 = K.g2 ?? 0, e0 = K.g2_end ?? s0 + 8.4;
    // part 2 v20 (owner 03.11: «не раскрыт эксперимент»): the text says «смотрели, как падают другие … падали сами».
    // Up to three falls in the order of the words: an optional intro fall («роняли спиной … в сетку» said before
    // «смотрели»), the other's fall (an eye watches it, ЧУЖОЕ), the volunteer's own fall (СВОЁ); a stopwatch on
    // «оценивали»/«секундомером»; the films come on «Своё». Without those words (part 1 preview) — the old single fall.
    const has = st => (K.words?.g2 || []).some(x => norm(x.w).startsWith(st));
    const exp = has('смотрел') && (has('сами') || has('сам'));   // v34: «…потом падал сам»
    const tBack = cue(K, 'g2', ['спиной', 'роня'], .15), tNet = cue(K, 'g2', 'сетку', .41);   // v38 part 1: «роняя людей … в сетку»
    const tLater = cue(K, 'g2', 'потом', .4), tOwn = cue(K, 'g2', 'своё', .53), tThird = cue(K, 'g2', 'треть', .63);
    const tOthers = cue(K, 'g2', 'чуж', .77);
    const tSee = exp ? cue(K, 'g2', 'смотрел', .2) : NaN, tSelf = exp ? cue(K, 'g2', ['сами', 'сам'], .4) : NaN;
    const tOth = exp ? cue(K, 'g2', ['падают', 'падает'], .25) : NaN, tShut = exp && has('закрыв') ? cue(K, 'g2', 'закрыв') : NaN;
    const tEst = !exp ? NaN : has('оценивал') ? cue(K, 'g2', 'оценивал') : has('секундомер') ? cue(K, 'g2', 'секундомер') : has('отмеря') ? cue(K, 'g2', 'отмеря') : NaN;
    const tSide = exp ? tOthers : cue(K, 'g2', 'сторон', .9);
    const tLand = tNet + .15, PH = 112, PX = 205, Y0 = 74, Y1 = 306;
    let falls;
    // v8 A6 (part 1 preview, K.q1_3): the last frame does not stand — after the landing the fall replays slowly under the
    // plate ЧАСТЬ 2 (the scene pulls back on «Во второй»), a film of frames trails behind the person
    const rep = !exp && K.q1_3 != null, tVo = rep ? cue(K, 'g2', 'во', .9) : 1e6;
    if (!exp) falls = [{ a: tBack, l: tLand, who: 'one' }];
    if (rep) { const rA = Math.max(tLand + 1.2, e0 - .4); falls.push({ a: rA, l: rA + 2.2, who: 'one', rep: true }); }
    else {
      falls = [];
      if (tBack < tSee) falls.push({ a: tBack, l: (tNet > tBack ? tNet : tBack + 1.2) + .15, who: 'demo' });
      const oa = Math.max(tSee + .15, tOth - .2);
      falls.push({ a: oa, l: oa + .8, who: 'other' });
      const sa = tBack > tSee ? tBack : tSelf - .1;   // v34: the own fall on «падал сам», not after it
      falls.push({ a: sa, l: tBack > tSee && tNet > tBack ? tLand : sa + 1.1, who: 'own' });
    }
    falls.forEach((F, i) => { F.s = i ? F.a - .7 : -1e6; F.e = i + 1 < falls.length ? falls[i + 1].a - .7 : 1e6; });
    const cur = falls.find(F => t >= F.s && t < F.e) || falls[falls.length - 1];
    const tDrop = exp ? falls[0].a - .35 : cue(K, 'g2', ['ронял', 'роня'], .1) - .3;
    const fA = cur.a, fL = cur.l, own = cur.who === 'own', other = cur.who === 'other';
    // fall: accelerating, lands on "сетку", then the net catches
    const q = clamp((t - fA) / Math.max(.4, fL - fA));
    const dt = t - fL;
    const dip = dt > 0 ? 16 * Math.exp(-dt * 2.4) * Math.sin(dt * 7 + .2) + 6 * ease(dt / .3) : 0;
    const py = t < fL ? lerp(Y0, Y1, q * q * (1.6 - .6 * q)) : Y1 + dip;
    const segOut = cur.e < 1e5 ? 1 - between(t, cur.e - .35, cur.e) : 1;
    const pOp = (cur.s > -1e5 ? between(t, cur.s, cur.s + .35) : 1) * segOut;
    let w = '';
    w += tower(t);
    // platform with two trapdoor halves under the body (hinges at x=140 and x=270), opening on each fall
    const door = Math.max(...falls.map(F => between(t, F.a - .3, F.a + .12) * (F.e < 1e5 ? 1 - between(t, F.e - .6, F.e - .1) : 1))) * 1.45, DL = 65;
    w += UN.thread([100, 86], [140, 86], { width: 1, opacity: .8 }) + UN.thread([100, 92], [140, 92], { width: .5, opacity: .4 });
    w += UN.thread([140, 86], [140 + DL * Math.cos(door), 86 + DL * Math.sin(door)], { width: 1, opacity: .8 });
    w += UN.thread([270, 86], [270 - DL * Math.cos(door), 86 + DL * Math.sin(door)], { width: 1, opacity: .8 });
    w += UN.thread([140, 86], [140, 74], { width: .6, opacity: .5 }) + UN.thread([270, 86], [270, 70], { width: .6, opacity: .5 }) + UN.thread([140, 74], [270, 70], { width: .4, opacity: .3 });
    w += UN.sphere(140, 87, 2.3, { glow: .7, highlight: false }) + UN.sphere(270, 87, 2.3, { glow: .7, highlight: false });
    for (let k = 0; k < 2; k++) { const qq = (t - tDrop - k * .3) / .9; if (qq > 0 && qq < 1) w += UN.weight(205, 86, 14 + 50 * qq, 4 + 12 * qq, { opacity: .6 * (1 - qq) }); }
    // height dimension "30 М" with a marker that rides down with the person
    w += UN.thread([26, 86], [26, 322], { width: .5, opacity: .5 }) + UN.thread([21, 86], [31, 86], { width: .5, opacity: .5 }) + UN.thread([21, 322], [31, 322], { width: .5, opacity: .5 });
    // part 2 says «с тридцати одного метра» (brief: 31 m); every other text says 30
    const h31 = (K.words?.g2 || []).some(x => /^одного/.test(String(x.w).toLowerCase()));
    w += UN.mono(31, 208, h31 ? '31 М' : '30 М', { size: 10.4, opacity: .9 });
    w += UN.sphere(26, Math.min(322, py + 8), 2.6, { glow: .8, highlight: false });
    w += net(t, PX, dt > 0 ? (dip + 10 * ease(dt / .25)) * segOut : 0);
    // speed streaks above the falling body
    if (q > 0 && q < 1.02 && t < fL + .3) {
      const sp = q * (1 - between(t, fL, fL + .3)) * pOp;
      for (let k = 0; k < 7; k++) { const x = PX - 40 + k * 13 + 3 * H(k), L = (18 + 30 * H(k + 9)) * sp; w += UN.thread([x, py - 22 - L], [x, py - 22], { width: .5, opacity: .35 * sp }); }
    }
    if (cur.rep && t > fA) {   // v8 A6: a trail of film frames behind the replayed fall (strobe of where the body was)
      const at = tk => { const qk = clamp((tk - fA) / Math.max(.4, fL - fA)); return lerp(Y0, Y1, qk * qk * (1.6 - .6 * qk)); };
      let tr = '', ys = [];
      for (let k = 4; k >= 1; k--) {
        const tk = t - .3 * k; if (tk <= fA) continue;
        const yk = at(tk), o = 1 - k / 5; ys.push(yk);
        tr += `<g opacity="${f(.2 * o)}">${TS.person(PX, yk + .15 * PH, PH, { pose: 'fall', t: tk })}</g>`;
        tr += `<rect x="${f(PX - 66)}" y="${f(yk - 20)}" width="132" height="42" rx="3" fill="none" stroke="#fff" stroke-width=".8" opacity="${f(.7 * o)}"/>`;
      }
      if (ys.length) {   // the film's edges with perforation, from the first trailing frame down to the body
        const yA = ys[0] - 20, yB = py + 22;
        let pf = '';
        for (let y = yA + 3; y < yB; y += 7.5) pf += `<rect x="${f(PX - 73)}" y="${f(y)}" width="2.2" height="3" rx="1"/><rect x="${f(PX + 71)}" y="${f(y)}" width="2.2" height="3" rx="1"/>`;
        tr += UN.thread([PX - 68, yA], [PX - 68, yB], { width: .6, opacity: .6 }) + UN.thread([PX + 68, yA], [PX + 68, yB], { width: .6, opacity: .6 }) +
          `<g fill="#fff" opacity=".55">${pf}</g>` + `<rect x="${f(PX - 66)}" y="${f(py - 20)}" width="132" height="42" rx="3" fill="none" stroke="#fff" stroke-width="1.4" opacity=".9"/>`;
      }
      w += tr;
    }
    w += pOp > .99 ? TS.person(PX, py + .15 * PH, PH, { pose: 'fall', t }) : pOp > .01 ? `<g opacity="${f(pOp)}">${TS.person(PX, py + .15 * PH, PH, { pose: 'fall', t })}</g>` : '';
    if (exp) {
      // the watchers: an eye at the right with a dashed line of sight to the other's body, label ЧУЖОЕ;
      // on «оценивали» a stopwatch under the eye; both leave before «Потом»; the volunteer gets СВОЁ
      const oF = falls.find(F => F.who === 'other'), sF = falls.find(F => F.who === 'own');
      const eyeA = between(t, tSee - .3, tSee + .3) * (1 - between(t, oF.e - .5, oF.e));
      if (eyeA > .01) {
        const ex = 306, ey = 196, blink = 1 - .85 * Math.max(0, Math.sin((t - tSee) * 2.2)) ** 40, ty = other ? py : Y1;
        let e = UN.polyline([[ex - 18, ey], [ex, ey - 9 * blink], [ex + 18, ey]], { width: .9, opacity: .85 }) +
          UN.polyline([[ex - 18, ey], [ex, ey + 9 * blink], [ex + 18, ey]], { width: .9, opacity: .85 }) + UN.sphere(ex - 2, ey, 4.2 * blink, { glow: .7 });
        const ax = ex - 24, ay = ey, bx = PX + 24, by = ty + 20, n = Math.floor(Math.hypot(bx - ax, by - ay) / 7);
        for (let k = 0; k < n; k++) { const u0 = k / n, u1 = (k + .5) / n; e += UN.thread([lerp(ax, bx, u0), lerp(ay, by, u0)], [lerp(ax, bx, u1), lerp(ay, by, u1)], { width: .6, opacity: .45 }); }
        // blind view v2 A7: the watcher is a person standing by the net, the eye at the head; ЧУЖОЕ ПАДЕНИЕ on the other's fall
        e += TS.person(ex, 300, 22, { t });   // v4 A7: a person is tiny next to a 31 m tower; the big eye stays
        e += plate(246, 150, 'ЧУЖОЕ ПАДЕНИЕ', between(t, tOth - .2, tOth + .2), 13);
                w += `<g opacity="${f(eyeA)}">${e}</g>`;
      }
      const ownL = between(t, sF.s, sF.s + .4) * (1 - between(t, tOwn - .7, tOwn - .2));
      if (ownL > .01) w += UN.mono(PX + 48, 66, 'СВОЁ', { size: 10.4, anchor: 'middle', opacity: .9 * ownL });
      // a stopwatch on «оценивали» / «секундомером»: runs 2.5 s, stops, leaves with the films
      const swEnd = tEst < sF.s ? sF.s : tOwn - .3;   // the watchers' estimate leaves with the eye; an after-landing one stays to «Своё»
      const sw = Number.isFinite(tEst) ? between(t, tEst - .2, tEst + .3) * (1 - between(t, swEnd - .5, swEnd)) : 0;
      // blind view v2 A8: the stopwatch large in the middle of the frame, a thumb presses stop
      if (sw > .01) { const el = clamp((t - tEst + 1.2) / 1.2) * 2.5, pr = Math.sin(Math.PI * clamp((t - tEst) / .35));
        w += `<g opacity="${f(sw)}"><circle cx="200" cy="196" r="58" fill="#000" fill-opacity=".9"/>${TS.clock(200, 200, 44, el * Math.PI * 2 / 2.5, { trail: .5 })}` +
          `<rect x="192" y="${f(140 - 4 * pr)}" width="16" height="12" rx="2" fill="#fff" opacity=".9"/><ellipse cx="200" cy="${f(124 - 6 * pr)}" rx="13" ry="9" fill="none" stroke="#fff" stroke-width="1.2"/></g>` + plate(200, 278, 'СЕКУНДОМЕР', sw, 14); }
      // v34 «Потом, закрыв глаза, мысленно проигрывал оба падения»: a closed eye above the stopwatch
      const ce = Number.isFinite(tShut) ? between(t, tShut - .1, tShut + .35) * (1 - between(t, tOwn - .8, tOwn - .3)) : 0;
      // blind view v2 A8: «закрыв глаза» — one closed eye across the frame, over a dark band
      const ceOut = Number.isFinite(tEst) ? 1 - between(t, tEst - .5, tEst - .1) : 1;
      if (ce * ceOut > .01) { const o = ce * ceOut; let e = `<rect x="20" y="150" width="320" height="110" fill="#000" fill-opacity=".9"/>`;
        e += UN.polyline([[60, 190], [110, 214], [180, 222], [250, 214], [300, 190]], { width: 2.4, opacity: .95 });
        for (const x of [90, 130, 180, 230, 270]) e += UN.thread([x, x < 180 ? 214 + (x - 90) * .1 : 222 - (x - 180) * .1], [x - 4, 236], { width: 1.6, opacity: .9 });
        w += `<g opacity="${f(o)}">${e}</g>` + plate(180, 172, 'ЗАКРЫВ ГЛАЗА', o, 15); }
    }
    // part 2: the world shrinks up, two films below
    // part 2 ("Потом каждый оценил"): the world shrinks up, two empty films below; "своё" fills the lower one,
    // "треть" grows it to 8 frames, "чужое" fills the upper one, "со стороны" — an eye watching it
    const W = exp ? between(t, Math.max(falls[falls.length - 1].l + .4, tOwn - .75), Math.max(falls[falls.length - 1].l + 1.1, tOwn + .05)) : has('сво') ? between(t, tLater - .1, tLater + .7) : 0;   // part 1 preview: no ЧУЖОЕ/СВОЁ films (blind view: unexplained)
    let s = W > 0 ? `<g transform="translate(${f(lerp(0, 90, W))} ${f(lerp(0, 16, W))}) scale(${f(lerp(1, .5, W))})">${w}</g>` : w;
    if (rep) {   // v8 A6: pull back under the plate ЧАСТЬ 2 (y ≈ 96–176): the platform goes below y ≈ 196
      const Q = between(t, tVo - .1, tVo + .6);
      if (Q > .001) s = `<g transform="translate(${f(61.2 * Q)} ${f(152.4 * Q)}) scale(${f(lerp(1, .66, Q))})">${s}</g>`;
    }
    if (W > 0) {
      const L0 = 24, step = 38, fw = 30, fh = 40, Y_O = 246, Y_S = 326;
      const ext = 2 * between(t, tThird, tThird + .55);
      const glowO = between(t, tOthers - .1, tOthers + .3) * (1 - .4 * between(t, tOthers + 1.4, tOthers + 2.2));
      const strip = (Y, n, total, id, lit, fill, small) => {
        const fr = [];
        for (let i = 0; i < total; i++) {
          const a = clamp(n - i); if (a <= 0) break;
          const fi = fill(i);
          fr.push({ x: L0 + fw / 2 + i * step, w: fw, h: fh, op: a, lit: lit(i) * (.25 + .75 * fi), draw: fi > .02 ? (cx, cy, ww, hh) => `<g opacity="${f(fi)}">${miniFall(i / (total - 1), .95)(cx, cy, ww * small, hh)}</g>` : null });
        }
        return fr.length ? film(Y, fr, { id, t, left: L0 - 6, right: L0 - 6 + Math.max(12, n * step), hmax: fh }) : '';
      };
      s += `<g opacity="${f(W)}">`;
      s += strip(Y_S, 6 + ext, 8, 'Efs', i => .8 + .2 * Math.sin(t * 2.4 + i) ** 2, i => between(t, tOwn + i * .09, tOwn + .35 + i * .09), 1);
      s += strip(Y_O, 6, 6, 'Efo', i => .6 + .3 * glowO + .1 * Math.sin(t * 2 + i), i => between(t, tOthers + i * .09, tOthers + .35 + i * .09), .8);
      s += UN.mono(L0 - 2, Y_S - 38, 'СВОЁ', { size: 10.4, opacity: .55 + .4 * between(t, tOwn, tOwn + .4) });
      s += UN.mono(L0 - 2, Y_O - 38, 'ЧУЖОЕ', { size: 10.4, opacity: .55 + .4 * glowO });
      s += '</g>';
      // the eye that watched the other fall from the side
      const eye = between(t, tSide - .35, tSide + .25);
      if (eye > 0) {
        const ex = 300, ey = Y_O, blink = 1 - .85 * Math.max(0, Math.sin((t - tSide) * 2.2)) ** 40;
        s += `<g opacity="${f(eye)}">` + UN.polyline([[ex - 18, ey], [ex, ey - 9 * blink], [ex + 18, ey]], { width: .9, opacity: .85 }) +
          UN.polyline([[ex - 18, ey], [ex, ey + 9 * blink], [ex + 18, ey]], { width: .9, opacity: .85 }) + UN.sphere(ex - 2, ey, 4.2 * blink, { glow: .7 });
        let dl = '';
        for (let x = ex - 26; x > L0 + 6 * step - 2; x -= 7) dl += UN.thread([x, ey], [x - 3.5, ey], { width: .6, opacity: .5 });
        s += dl + '</g>';
      }
      const third = between(t, tThird + .2, tThird + .7);
      if (third > 0) {
        const xa = L0 + 6 * step - 4, xb = L0 + 8 * step - 8, yb = Y_S - 36;
        s += UN.polyline([[xa, yb + 5], [xa, yb], [xb, yb], [xb, yb + 5]], { width: .8, opacity: .85 * third });
        s += plate((xa + xb) / 2, yb - 12, '+1/3', third, 22);   // blind view v2 A8: as large as the captions
        let dash = '';
        for (let y = Y_O - 24; y < Y_S + 26; y += 6) dash += UN.thread([xa, y], [xa, y + 3], { width: .6, opacity: .55 * third });
        s += dash;
      }
    }
    s += UN.bokeh(t, { count: 9, opacity: .4, seed: 43 });
    return cam(s, 1 + .03 * between(t, s0, e0), 0, 0, 180, 200);
  }

  /* ---------------- recall (g3) ---------------- */
  const GLYPH = ['01110100011001110101110011000101110', '00100011000010000100001000010001110', '01110100010000100010001000100011111',
    '11111000100010000010000011000101110', '00010001100101010010111110001000010', '11111100001111000001000011000101110',
    '00110010001000011110100011000101110', '11111000010001000100010000100001000', '01110100011000101110100011000101110',
    '01110100011000101111000010001001100'];
  function ledBoard(cx, cy, t, t0, o = {}) {
    // 8×8 LED board; the digit changes ~16 times a second, older digits leave a trail — unreadable
    const sp = 12.5, rate = 16, idx = Math.floor((t - t0) * rate), run = t >= t0;   // before t0 the board is dark
    const dig = k => Math.floor(H(k * 3.7 + 11) * 10);
    const on = new Array(64).fill(0);
    if (o.mush && run) {
      // blind view v2 (p2 A9): «чуть быстрее, чем глаз успевает прочесть» — a digit, its negative and the next digit
      // overlap every 1/16 s; no frame shows one readable digit
      const a = dig(idx), b = dig(idx + 1), c = dig(idx + 2), neg = idx % 2;
      for (let r = 0; r < 8; r++) for (let cc = 0; cc < 8; cc++) {
        const inG = (d, ox) => { const rr = r, c2 = cc - ox; return rr < 7 && c2 >= 0 && c2 < 5 && GLYPH[d][rr * 5 + c2] === '1'; };
        let v = Math.max(inG(a, 1) ? 1 : 0, inG(b, 2) ? .8 : 0, inG(c, 0) ? .6 : 0);
        if (H(r * 8 + cc + idx * 3.1 + 77) > .58) v = 1 - v;   // a random 40 % of the cells flipped every frame: never a digit
        if (neg) v = 1 - v * .85;
        on[r * 8 + cc] = v;
      }
    } else if (o.digit != null) {
      const g = GLYPH[o.digit];
      for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) if (g[r * 5 + c] === '1') on[r * 8 + c + 1] = 1;
    } else if (run) [[0, 1], [1, .55], [2, .28]].forEach(([back, a]) => {
      const g = GLYPH[dig(idx - back)], ox = 1 + ((idx - back) % 2 ? 1 : 0), oy = (idx - back) % 3 === 0 ? 1 : 0;
      for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) if (g[r * 5 + c] === '1') { const n = (r + oy) * 8 + c + ox; on[n] = Math.max(on[n], a); }
    });
    let off = '', lit = '', glow = '';
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const x = cx + (c - 3.5) * sp, y = cy + (r - 3.5) * sp, a = on[r * 8 + c];
      if (a > 0) { lit += dot(x, y, 3.6, .35 + .65 * a); glow += dot(x, y, 6.5, .45 * a); }
      else off += dot(x, y, 3.2, .1);
    }
    let s = `<rect x="${f(cx - 58)}" y="${f(cy - 58)}" width="116" height="116" rx="12" fill="#000" stroke="#fff" stroke-width="1" opacity=".95"${o.ghost ? ' stroke-dasharray="5 4"' : ''}/>`;
    s += `<rect x="${f(cx - 58)}" y="${f(cy - 58)}" width="116" height="116" rx="12" fill="none" stroke="#fff" stroke-width="2.4" opacity=".25" filter="url(#un-soft)"/>`;
    s += `<g fill="#fff">${off}<g filter="url(#un-soft)">${glow}</g>${lit}</g>`;
    return `<g opacity="${f(o.opacity ?? 1)}" transform="rotate(${f(o.rot ?? -10)} ${f(cx)} ${f(cy)})">${s}</g>`;
  }
  function arm(t, shake) {
    // forearm from the lower left to the wrist (dot cylinder) with a fist-shaped end
    const A = [-30, 392], B = [262, 150], ux = (B[0] - A[0]), uy = (B[1] - A[1]), Lh = Math.hypot(ux, uy), nx = -uy / Lh, ny = ux / Lh;
    let d = '';
    for (let i = 0; i < 520; i++) {
      const s = H(i + 3001), a = i * GA, r = lerp(46, 34, s), c = Math.cos(a), z = Math.sin(a);
      const x = A[0] + ux * s + nx * r * c, y = A[1] + uy * s + ny * r * c * .98 + z * 4;
      const front = clamp(.55 - z * .6), tw = .85 + .15 * Math.sin(t * 3 + i);
      d += dot(x + shake[0], y + shake[1], .55 + .4 * H(i + 3101), (.12 + .5 * front) * tw);
    }
    for (let i = 0; i < 170; i++) {
      const z0 = 1 - 2 * (i + .5) / 170, th = i * GA, ring = Math.sqrt(1 - z0 * z0);
      const lx = 40 * z0, ly = 30 * ring * Math.cos(th), front = clamp(.55 - Math.sin(th) * ring * .6);
      const x = B[0] + 22 + (ux * lx - uy * ly) / Lh, y = B[1] - 18 + (uy * lx + ux * ly) / Lh;
      d += dot(x + shake[0], y + shake[1], .6, (.12 + .5 * front) * (.85 + .15 * Math.sin(t * 2.6 + i)));
    }
    let s = `<g fill="#fff">${d}</g>`;
    // strap rings around the wrist
    for (const k of [.42, .78]) {
      const x = A[0] + ux * k + shake[0], y = A[1] + uy * k + shake[1];
      s += UN.weight(f(x), f(y), 44, 12, { opacity: .55, angle: f(Math.atan2(ny, nx) * 180 / Math.PI) });
    }
    return s;
  }
  /* v8 p2 A7: the forearm with a hand and a strap, solid lines (the dotted tube read as «a cube / a column»).
     W — the wrist (the screen sits on it), the arm comes from the lower left, the open hand goes up to the right. */
  const AW = [150, 230], AD = [.667, -.745], AN = [.745, .667];
  const AP = (u, v) => [AW[0] + AD[0] * u + AN[0] * v, AW[1] + AD[1] * u + AN[1] * v];
  function arm2(t, shake) {
    const P = (u, v) => { const q = AP(u, v); return [q[0] + shake[0], q[1] + shake[1]]; };
    const path = pts => 'M' + pts.map(q => `${f(q[0])} ${f(q[1])}`).join(' L');
    const capsule = (u0, v0, u1, v1, w) => {   // a finger: two side lines and a round tip
      const du = u1 - u0, dv = v1 - v0, L = Math.hypot(du, dv) || 1, pu = -dv / L * w / 2, pv = du / L * w / 2;
      const a = P(u0 + pu, v0 + pv), b = P(u1 + pu, v1 + pv), c = P(u1 - pu, v1 - pv), d = P(u0 - pu, v0 - pv);
      return `<path d="M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])} A${f(w / 2)} ${f(w / 2)} 0 0 0 ${f(c[0])} ${f(c[1])} L${f(d[0])} ${f(d[1])}" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>`;
    };
    let s = '';
    // forearm: two edges tapering to the wrist, a faint fill
    const top = [P(-300, -50), P(-120, -42), P(0, -34), P(96, -31)], bot = [P(96, 31), P(0, 34), P(-120, 42), P(-300, 50)];
    s += `<path d="${path(top.concat(bot))} Z" fill="#fff" fill-opacity=".05"/>`;
    s += `<path d="${path(top)}" fill="none" stroke="#fff" stroke-width="1.6"/><path d="${path(bot)}" fill="none" stroke="#fff" stroke-width="1.6"/>`;
    s += `<path d="${path(top)}" fill="none" stroke="#fff" stroke-width="4" opacity=".18" filter="url(#un-soft)"/>`;
    // the hand: palm, four fingers, thumb
    const palm = [P(96, -31), P(118, -34), P(168, -32), P(178, -12), P(178, 14), P(170, 32), P(118, 34), P(96, 31)];
    s += `<path d="${path(palm)} Z" fill="#fff" fill-opacity=".07" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>`;
    const curl = .06 * Math.sin(t * 1.3);
    [[-23, 38], [-8, 46], [7, 43], [21, 34]].forEach(([v, L], i) => { s += capsule(174, v, 174 + L * (1 - curl * i), v + 2 * i - 3, 12); });
    s += capsule(122, -32, 152, -66, 13);
    // the strap: a band across the wrist on both sides of the screen, with holes
    for (const [u0, u1] of [[-108, -84], [84, 108]]) {
      const band = [P(u0, -38), P(u1, -38), P(u1, 38), P(u0, 38)];
      s += `<path d="${path(band)} Z" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width="1.3"/>`;
      for (const v of [-22, -6, 10, 26]) { const h = P((u0 + u1) / 2, v); s += `<circle cx="${f(h[0])}" cy="${f(h[1])}" r="1.6" fill="#fff" opacity=".7"/>`; }
    }
    return s;
  }
  // the wrist of TS.person in the fall pose (the same rig as ts_lib), the arm nearer to the camera
  function fallWrist(cx, gy, h) {
    const sc = h / 300, rot = -88 * Math.PI / 180, yaw = -Math.PI / 2 + .3, A = 1.15, cy = gy - .15 * h;
    let best = null;
    for (const arm of [1, -1]) {
      let x = arm * 45, y = 128, z = 0;
      const dy = y - 36, k2 = arm > 0 ? 1 : .72, c2 = Math.cos(A * k2), s2 = Math.sin(A * k2);
      y = 36 + dy * c2 + z * s2; z = -dy * s2 + z * c2; x += arm * dy * .14;
      y -= 120;
      const X = x * Math.cos(yaw) + z * Math.sin(yaw), Z = -x * Math.sin(yaw) + z * Math.cos(yaw);
      const p = { x: cx + (X * Math.cos(rot) - y * Math.sin(rot)) * sc, y: cy + (X * Math.sin(rot) + y * Math.cos(rot)) * sc, z: Z };
      if (!best || p.z < best.z) best = p;
    }
    return best;
  }

  function recall34(t, K) {
    // blind view v2 (p2 A9, A10): the screen on the wrist shows only mush; «Ускорилось бы зрение — прочли бы» — a dashed
    // ghost panel ЕСЛИ БЫ… with one clear digit; «Не прочли» — the ghost is crossed out, the real screen keeps mush and «?»;
    // «Глаза не ускорились» — row ГЛАЗА (the same ticks); «растянулось воспоминание» — row ПАМЯТЬ, a film that grows
    const s0 = K.g3 ?? 0, e0 = K.g3_end ?? s0 + 20;
    const tWr = cue(K, 'g3', ['экранчик', 'руку'], .1), tFl = cue(K, 'g3', 'мигал', .2), tFast = cue(K, 'g3', 'чуть', .3);
    const tIf = cue(K, 'g3', 'ускорил', .45), tNo = cue(K, 'g3', 'не', .6), tEyes = cue(K, 'g3', 'глаза', .65);
    const tStr = cue(K, 'g3', 'растянул', .75), tMore = cue(K, 'g3', 'подробн', .9);
    // v8 p2 A7: «как в замедленной съёмке» — the fall in slow motion with a trail; «На руку им надели экранчик» — the camera
    // dives into the wrist of the falling person: the hand with a strap and the screen on it
    const tHand = cue(K, 'g3', ['на', 'руку'], .08), tMore2 = cue(K, 'g3', 'отметок', .95), zq = between(t, tHand - .05, tHand + .75);
    const side = between(t, tIf - .1, tIf + .6), fallV = 1 - between(t, tIf - .1, tIf + .5);
    const shake = [1.6 * Math.sin(t * 13) * fallV, 1.4 * Math.cos(t * 11.3) * fallV];
    let s = '';
    if (fallV > 0) {
      for (let i = 0; i < 16; i++) {
        const x = 14 + H(i + 5001) * 332, L = 40 + 70 * H(i + 5101), span = 520;
        const y = ((H(i + 5201) * span - (t - s0) * (520 + 200 * H(i + 5301))) % span + span) % span - 80;
        s += UN.thread([x, y], [x, y + L], { width: .5, opacity: (.12 + .14 * H(i + 5401)) * fallV });
      }
    }
    let close = fallV > 0 ? `<g opacity="${f(fallV)}">${arm2(t, shake)}</g>` : '';
    // the real screen: on the wrist (≈ 40 % of the width, tilted 4°), mush from «мигали»; on «Ускорилось бы» it moves left
    const bx = lerp(AW[0] + shake[0], 92, side), by = lerp(AW[1] + shake[1], 150, side), bs = lerp(1.22, .62, side);
    const after = (1 - .7 * between(t, tNo + .4, tNo + 1.2)) * (1 - between(t, tEyes - .4, tEyes + .2));   // v6: the board leaves when ГЛАЗА / ПАМЯТЬ come
    close += `<g transform="translate(${f(bx)} ${f(by)}) scale(${f(bs)})">${ledBoard(0, 0, t, tFl, { rot: lerp(-4, 0, side), mush: true, opacity: after })}</g>`;
    if (zq < .999) {   // the slow fall, then the dive into its wrist
      const gy = lerp(150, 236, clamp((t - s0) / Math.max(1, tHand + .8 - s0))), PH = 168, W0 = fallWrist(180, gy, PH);
      let pre = '';
      for (let k = 3; k >= 1; k--) { const gk = lerp(150, 236, clamp((t - .35 * k - s0) / Math.max(1, tHand + .8 - s0))); pre += `<g opacity="${f(.13 * (1 - k / 4))}">${TS.person(180, gk, PH, { pose: 'fall', t: t - .35 * k })}</g>`; }
      pre += TS.person(180, gy, PH, { pose: 'fall', t });
      const wr = fallWrist(180, gy, PH), hl = between(t, tHand - .6, tHand - .2);
      pre += `<rect x="${f(wr.x - 6)}" y="${f(wr.y - 5)}" width="12" height="10" rx="2" fill="#000" stroke="#fff" stroke-width="1.2"/>` +
        `<circle cx="${f(wr.x)}" cy="${f(wr.y)}" r="${f(16 + 6 * Math.sin(t * 6))}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.9 * hl)}"/>`;
      const e = ease(zq), k = lerp(.1, 1, e), px = lerp(W0.x, AW[0], e), py2 = lerp(W0.y, AW[1], e), kp = k / .1;
      s += `<g opacity="${f(1 - e)}" transform="translate(${f(px - W0.x * kp)} ${f(py2 - W0.y * kp)}) scale(${f(kp)})">${pre}</g>`;
      close = zq > .001 ? `<g opacity="${f(Math.min(1, e * 2))}" transform="translate(${f(px - AW[0] * k)} ${f(py2 - AW[1] * k)}) scale(${f(k)})">${close}</g>` : '';
    }
    s += close;
    s += plate(AW[0], 128, 'ЦИФРЫ', between(t, tFl - .1, tFl + .3) * (1 - between(t, tFl + 1.6, tFl + 2)), 16);   // v8 A7: next to the screen
    if (side < .5) s += plate(176, 338, 'ЭКРАНЧИК НА РУКЕ', between(t, tHand + .2, tHand + .6) * (1 - side * 2), 18);
    // the ghost: what one would read if the eyes were faster
    const gIn = between(t, tIf + .1, tIf + .6), gX = between(t, tNo - .05, tNo + .35), gOut = between(t, tNo + 1.2, tNo + 1.8);
    if (gIn * (1 - gOut) > .01) {
      const go = gIn * (1 - gOut);
      s += `<g transform="translate(262 150) scale(.62)">${ledBoard(0, 0, t, tFl, { rot: 0, digit: 7, ghost: true, opacity: .85 * go })}</g>`;
      s += plate(262, 92, 'ЕСЛИ БЫ…', go, 15);
      if (gX > .01) s += `<g opacity="${f(go)}"><line x1="${f(222)}" y1="${f(110)}" x2="${f(222 + 80 * gX)}" y2="${f(110 + 80 * gX)}" stroke="#fff" stroke-width="3"/>` +
        `<line x1="${f(302)}" y1="${f(110)}" x2="${f(302 - 80 * gX)}" y2="${f(110 + 80 * gX)}" stroke="#fff" stroke-width="3"/></g>`;
    }
    const qm = between(t, tNo, tNo + .35) * (1 - between(t, tEyes - .2, tEyes + .3));
    if (qm > .01) s += UN.italic(92, 236, '?', { size: 40, anchor: 'middle', opacity: .95 * qm });
    if (qm > .01) s += plate(176, 318, 'НЕ ПРОЧЛИ', qm, 17);
    // two rows: ГЛАЗА (the same ticks) and ПАМЯТЬ (the film grows)
    const eyes = between(t, tEyes - .1, tEyes + .4);
    if (eyes > .01) {
      let r = '';
      // v4 A9: the bar ГЛАЗА as thick as a film frame, 200 px; the film ПАМЯТЬ starts at the same length, then grows ≈ 1.5×
      // v8 A8: the rows move apart (≥ 12 px between ГЛАЗА and the plate ПАМЯТЬ)
      for (let i = 0; i < 11; i++) r += UN.thread([22 + i * 21, 232], [22 + i * 21, 256], { width: 1.2, opacity: .85 });   // v5 A7: the scheme across ≈ 85 % of the width
      s += `<g opacity="${f(eyes)}"><rect x="20" y="232" width="231" height="24" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-width="1"/>${r}</g>` + plate(76, 212, 'ГЛАЗА', eyes, 18);
    }
    const mem = between(t, tEyes - .1, tEyes + .3);
    let memR = 251;
    if (mem > .01) {
      const n = 15, fw = 18, fh = 24, stp = 21, L0 = 20, MY = 330, fr = [];
      const pulse = between(t, tMore - .05, tMore + .3) * (1 - .6 * between(t, tMore + .6, tMore + 1.4));
      // v7 A9: the new frames are inserted BETWEEN the old ones; v8 A8: the old ones move apart on «растянулось» (the gaps
      // stand empty), the gaps fill on «подробнее», the new frames flash one by one on «отметок больше»
      const ins = [2, 5, 9, 12]; let xx = L0, k = 0;
      for (let i = 0; i < n; i++) {
        const isNew = ins.includes(i);
        const gap = isNew ? between(t, tStr - .1 + k * .12, tStr + .5 + k * .12) : 1;
        const fill = isNew ? between(t, tMore - .1 + k * .2, tMore + .2 + k * .2) : 1;
        const a = isNew ? gap : between(t, tEyes - .1, tEyes + .3), fl = isNew ? Math.exp(-Math.pow((t - tMore2 - .15 - k * .18) / .16, 2)) : 0;
        if (isNew) k++;
        if (a <= .001) continue;
        fr.push({ x: xx + fw / 2, w: fw, h: fh, op: isNew ? .35 + .65 * fill : a, lit: clamp(isNew ? .15 + .85 * fill * (.6 + .4 * pulse) + fl : .6 + .4 * Math.sin(t * 4 - i * .5) ** 2 + .4 * pulse),
          draw: fill > .02 ? (cx, cy, ww, hh) => `<g opacity="${f(fill)}">${miniFall(i / (n - 1), 1)(cx, cy, ww, hh)}</g>` : null });
        xx += (isNew ? a : 1) * stp;
      }
      memR = Math.max(memR, xx);
      s += film(MY, fr, { id: 'Efm', t, left: L0 - 5, right: Math.max(L0 + 10, fr.length ? fr[fr.length - 1].x + fr[fr.length - 1].w / 2 + 5 : 0), hmax: fh });
      s += plate(80, 290, 'ПАМЯТЬ', mem, 18);
    }
    s += UN.bokeh(t, { count: 9, opacity: .4, seed: 47 });
    // v7 A9: once the rows come, the frame zooms on them (larger, centred)
    const rz = between(t, tEyes - .3, tEyes + .4);
    if (rz > .01) {   // the scheme (x 20..memR) is moved to the middle and enlarged up to 1.15×, never wider than 336 px
      const cxC = (20 + memR) / 2, sc = 1 + rz * (Math.min(1.15, 336 / (memR - 20)) - 1), dx = rz * (180 - cxC);
      s = `<g transform="translate(${f(cxC + dx - cxC * sc)} ${f(280 - 10 * rz - 280 * sc)}) scale(${f(sc)})">${s}</g>`;
    }
    return cam(s, 1 + .05 * between(t, tFast, tFast + 1.2) * (1 - side), 0, 0, 176, 214);
  }

  // a plate for labels that carry meaning (blind view v2: bold white in a frame, like «+4 НС / СУТКИ»)
  function plate(x, y, text, op, size = 15) {
    if (op <= .01) return '';
    const w = text.length * size * .64 + 16, h = size + 10;
    return `<g opacity="${f(op)}"><rect x="${f(x - w / 2)}" y="${f(y - h / 2 - size * .32)}" width="${f(w)}" height="${f(h)}" rx="3" fill="#000" fill-opacity=".85" stroke="#fff" stroke-width=".8"/>` +
      `<text x="${f(x)}" y="${f(y)}" fill="#fff" font-family="Plex" font-weight="700" font-size="${size}" text-anchor="middle">${text}</text></g>`;
  }

  function recall(t, K) {
    if ((K.words?.g3 || []).some(x => norm(x.w).startsWith('экранчик'))) return recall34(t, K);
    const s0 = K.g3 ?? 0, e0 = K.g3_end ?? s0 + 11.2;
    // part 2 v20 (owner 03.11): «Может, в страхе мозг видит быстрее? На запястье… мигали цифры — чуть быстрее, чем глаз
    // успевает прочесть. В полёте их тоже не прочли. Значит, ускорилось не зрение, а запись: момент… запомнился подробнее»
    // — no «если бы» ghost board; НЕ ПРОЧЛИ on «не»; the steady clock on «Значит»; the dense film on «запись»
    // Two v20 drafts: A «…не прочли. Значит, ускорилось не зрение, а запись» (no ghost board, steady clock on «Значит»);
    // B «Если бы зрение ускорилось, в полёте их бы прочли. Не прочли. Похоже, дело в памяти…» — the old «если бы» beats
    // (board to the corner on «Если», stretched scale on «ускорилось», readable ghost on «прочли»), then НЕ ПРОЧЛИ.
    const g3w = st => (K.words?.g3 || []).some(x => norm(x.w).startsWith(st));
    // v34 (final): «На руку им надели экранчик… Ускорилось бы зрение — прочли бы. | Не прочли. | Глаза не ускорились —
    // растянулось воспоминание…» — the «если бы» beats on «Ускорилось бы», НЕ ПРОЧЛИ its own beat, the film on «растянулось»
    const v34 = g3w('экранчик') || g3w('руку');
    const v20 = g3w('прочл'), vB = v34 || (v20 && g3w('если') && !g3w('значит'));
    const tWr = cue(K, 'g3', ['запяст', 'экранчик', 'руку'], .03), tFl = cue(K, 'g3', 'мигал', .12), tFast = v20 ? cue(K, 'g3', 'чуть', .3) : cue(K, 'g3', 'быстро', .27);
    const tTime = v34 ? cue(K, 'g3', 'ускорил', .45) : vB ? cue(K, 'g3', 'если', .5) : v20 ? cue(K, 'g3', 'значит', .62) : cue(K, 'g3', ['если', 'время', 'мир'], .38);
    const tStr = v34 ? tTime + .35 : vB ? cue(K, 'g3', 'ускорил', .55) : v20 ? 1e6 : cue(K, 'g3', ['замедл', 'растянул'], .5);
    const tRead = vB ? cue(K, 'g3', 'прочл', .6) : v20 ? 1e6 : cue(K, 'g3', 'цифр', .6, 1);
    const tNo = cue(K, 'g3', 'не', .69), tCuts = v34 ? cue(K, 'g3', ['растянул', 'пишет'], .8) : v20 ? cue(K, 'g3', 'запис', .78) : cue(K, 'g3', 'нарезок', .84);
    const tMore = v20 ? cue(K, 'g3', 'подробн', .9) : cue(K, 'g3', 'больше', .96);
    const side = between(t, tTime - .1, tTime + .7);
    const fallV = 1 - between(t, tTime - .1, tTime + .5);
    const shake = [1.6 * Math.sin(t * 13) * fallV, 1.4 * Math.cos(t * 11.3) * fallV];
    let s = '';
    // speed lines: the world rushes up while falling
    if (fallV > 0) {
      for (let i = 0; i < 16; i++) {
        const x = 14 + H(i + 5001) * 332, L = 40 + 70 * H(i + 5101), span = 520;
        const y = ((H(i + 5201) * span - (t - s0) * (520 + 200 * H(i + 5301))) % span + span) % span - 80;
        s += UN.thread([x, y], [x, y + L], { width: .5, opacity: (.12 + .14 * H(i + 5401)) * fallV });
      }
      s += `<g opacity="${f(fallV * (.55 + .45 * between(t, tWr - .3, tWr + .3)))}">${arm(t, shake)}</g>`;
    }
    // board: big on the wrist ("запястье"), flickers from "мигали"; on "время" it goes to the upper left corner
    const bx = lerp(176 + shake[0], 84, side), by = lerp(214 + shake[1], 128, side), bs = lerp(1, .55, side);
    s += `<g transform="translate(${f(bx)} ${f(by)}) scale(${f(bs)})">${ledBoard(0, 0, t, tFl, { rot: lerp(-14, 0, side) })}</g>`;
    // "если бы … прочли": a dashed ghost board with a steady digit and a stretched dashed scale; "Не прочли" — gone
    const gone = 1 - between(t, tNo - .05, tNo + .45);
    const gb = between(t, tRead - .2, tRead + .3) * gone;
    if (gb > 0) s += `<g transform="translate(172 128) scale(${f(.55 * (.85 + .15 * gb))})">${ledBoard(0, 0, t, tFl, { rot: 0, digit: 7, ghost: true, opacity: .75 * gb })}</g>`;
    const qm = between(t, tNo, tNo + .35) * (1 - between(t, tCuts - .3, tCuts + .2));
    if (qm > 0) s += UN.italic(150, 144, '?', { size: 34, anchor: 'middle', opacity: .9 * qm });
    if (v20) {  // «не прочли»: a plain caption next to the board, stays until the board leaves for the corner
      const np = between(t, tNo - .05, tNo + .3) * (1 - (vB ? between(t, tCuts - .4, tCuts) : between(t, tTime - .1, tTime + .4)));
      if (np > .01) s += UN.mono(vB ? 172 : 176, vB ? 204 : 318, 'НЕ ПРОЧЛИ', { size: 12, anchor: 'middle', opacity: .95 * np });
    }
    // steady clock and an even scale
    if (side > 0) {
      const cl = between(t, tTime, tTime + .55), el = Math.max(0, t - tTime), sec = Math.floor(el), cs = Math.floor((el % 1) * 100);
      const digits = `00:00:${String(sec).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
      s += `<g transform="translate(262 128) scale(${f(lerp(.6, 1, cl))})">${TS.clock(0, 0, 44, el * Math.PI * 2 / 5, { digits, size: 9.4, opacity: cl, trail: .5 })}</g>`;
      const ru = between(t, tTime + .2, tTime + .8), RY = 232, off = (el * 16) % 16;
      if (ru > 0) {
        let r = UN.thread([24, RY], [24 + 312 * ru, RY], { width: .6, opacity: .7 });
        for (let x = 24 + 16 - off; x < 24 + 312 * ru; x += 16) r += UN.thread([x, RY - 4], [x, RY + 4], { width: .6, opacity: .65 });
        r += UN.mono(24, RY - 12, 'РОВНО', { size: 9.4, opacity: .8 * ru });
        s += r;
      }
      const gs = between(t, tStr - .1, tStr + .6) * gone, RY2 = 266;
      if (gs > 0) {
        const sp = 16 * lerp(1, 2.3, gs), o2 = (el * 16) % sp;
        let r = '';
        for (let x = 24; x < 336; x += 6) r += UN.thread([x, RY2], [Math.min(336, x + 3), RY2], { width: .6, opacity: .5 });
        for (let x = 24 + sp - o2; x < 336; x += sp) r += UN.thread([x, RY2 - 4], [x, RY2 + 4], { width: .6, opacity: .55 });
        r += UN.mono(24, RY2 - 12, 'ЕСЛИ БЫ', { size: 9.4, opacity: .7 });
        s += `<g opacity="${f(gs)}">${r}</g>`;
      }
    }
    // dense memory film of the same fall: "нарезок запомнилось больше"
    const mem = between(t, tCuts - .25, tCuts + .15);
    if (mem > 0) {
      const n = 15, fw = 18, fh = 24, stp = 21, L0 = 24, MY = 322, fr = [];
      const pulse = between(t, tMore - .05, tMore + .3) * (1 - .6 * between(t, tMore + .6, tMore + 1.4));
      for (let i = 0; i < n; i++) {
        const a = between(t, tCuts - .2 + i * .065, tCuts + .1 + i * .065);
        if (a <= 0) break;
        const wave = .6 + .4 * Math.sin(t * 4 - i * .5) ** 2;
        fr.push({ x: L0 + fw / 2 + i * stp, w: fw, h: fh, op: a, lit: clamp(wave + .4 * pulse), draw: miniFall(i / (n - 1), 1) });
      }
      s += film(MY, fr, { id: 'Efm', t, left: L0 - 5, right: Math.max(L0 + 10, fr.length ? fr[fr.length - 1].x + fw / 2 + 5 : 0), hmax: fh });
      s += UN.mono(L0 - 1, MY - 30, 'ПАМЯТЬ', { size: 9.4, opacity: .85 * mem });
    }
    s += UN.bokeh(t, { count: 9, opacity: .4, seed: 47 });
    const push = between(t, tFast, tFast + 1.2) * (1 - side);
    return cam(s, 1 + .06 * push + .025 * between(t, tTime, e0 + 1), 0, 0, 176, 214);
  }

  const MODES = { danger, fall: fallMode, recall };
  function body(t, K = {}, mode = 'danger', p) {
    const draw = MODES[mode] || danger;
    const own = draw(t, K);
    if (!p || !p.s) return own;
    const t0 = (K[p.s] ?? t) - .05, q = between(t, t0, t0 + .7);
    if (q >= 1) return own;
    const prev = p.prev && typeof SCENES[p.prev]?.body === 'function' ? SCENES[p.prev].body(t, K, p.prev_mode) : '';
    return (prev ? `<g opacity="${f(1 - q)}">${prev}</g>` : '') + `<g opacity="${f(q)}">${own}</g>`;
  }
  SCENES.ts_fall = function (u, p = {}, d, t) { return UN.wrap(body(t, p.K || {}, p.mode, p)); };
  SCENES.ts_fall.body = (t, K, mode) => body(t, K || {}, mode);
})();
// blind view A2: text floor
(() => { const f = SCENES.ts_fall; SCENES.ts_fall = Object.assign((u, p, d, t) => TS.bigText(f(u, p, d, t)), f); })();
