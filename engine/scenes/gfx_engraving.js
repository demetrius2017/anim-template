// сцена gfx_engraving: проба альтернативного дизайна «Гравюра» для «Бог ещё не создан» (eps/god_future).
//   Лист из рукописной книги-космографии: тёплый пергамент (#efe4cc, неровный тон, зерно, тёмные края), рисунок —
//   чёрной тушью, тени и ночь — параллельной и перекрёстной штриховкой (линии переменной толщины, как след резца;
//   свет — там, где штрих истончается до бумаги). Подписи — PT Serif Italic капсом в картушах с вогнутыми углами.
//   Один акцент — киноварь #b3261e: только огонь порядка (и его нити). Рисунок в рамке-гравюре y 12…378,
//   ниже — спокойный пергамент под субтитры (субтитры этой сцены — тушь, PT Serif Italic).
//   Три момента по времени ролика t (по 3 с, смена — растворением 0,4 с; в каждом что-то движется):
//     t 0–3  хук «ЗАЧЕМ ЛЮДЯМ БОГИ?»: ночь, семеро у маленького костра, над ними огонь порядка; от него к каждому
//            тянется нить, по нитям сбегают искры; лучи огня медленно вращаются, костёр мерцает, звёзды дрожат.
//     t 3–6  «чай остывает… энтропия растёт»: чашка на блюдце, пар слабеет, частицы тепла разлетаются во все стороны
//            и путаются; слева шкала ЭНТРОПИЯ — штриховка и указатель ползут вверх.
//     t 6–9  «Тейяр де Шарден: Бог Впереди»: из клетки растёт древо (рыба, ящер, человек в медальонах), ветви
//            сходятся вверху в огонь порядка с картушем БОГ ВПЕРЕДИ; по ветвям поднимаются точки; круги-сферы
//            вокруг точки, как в старинной космографии; вверху мелко «ТЕЙЯР ДЕ ШАРДЕН · 1955».
//   p — не используется (проба стиля). Камеры: общий план z 1–1.04, без толчков.
// Проверка (станция tesla): remote_anim.py god_future -- scene_test.py gfx_engraving '{}' --dur 9 --at 1.5,4.5,8
//   --cam '{"z0":1,"z1":1,"drift":0,"kicks":0}' --out eps/god_future/qa/style_engraving.jpg
(() => {
  const INK = '#1c150f', PAPER = '#efe4cc', CIN = '#b3261e';
  const FNT = 'font-family="EgSerif,serif" font-style="italic" font-weight="400"';
  const css = document.createElement('style');
  css.textContent = `@font-face{font-family:EgSerif;src:url('../fonts/PTSerif-Italic.ttf');font-style:italic;font-weight:400}
#root:has(#gfx-engraving){background:${PAPER}}
#root:has(#gfx-engraving) #grain,#root:has(#gfx-engraving) #vig{display:none}
#root:has(#gfx-engraving) #cap{top:400px;left:24px;right:24px;font-family:EgSerif,serif;font-style:italic;font-weight:400;font-size:24px;line-height:29px;letter-spacing:0;text-transform:none}
#root:has(#gfx-engraving) #cap .w{color:#9b8a6c;text-shadow:none;margin:0 2.5px}
#root:has(#gfx-engraving) #cap .w.on{color:${INK}}
#root:has(#gfx-engraving) #cap .w.on.y,#root:has(#gfx-engraving) #cap .w.on.r{color:${CIN}}`;
  document.head.appendChild(css);

  const X0 = 14, Y0 = 16, X1 = 346, Y1 = 374;                 // поле гравюры (внутренняя линия рамки)
  const TAU = Math.PI * 2;
  const sst = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
  const fx = v => Math.round(v * 10) / 10;
  const fxx = v => Math.round(v * 100) / 100;

  // лента — линия резца переменной толщины: pts [[x,y],…], ws — толщины; где тоньше thr — разрыв (бумага)
  function ribbon(pts, ws, thr = .07) {
    let d = '', top = [], bot = [];
    const flush = () => { if (top.length > 1) d += 'M' + top.join('L') + 'L' + bot.reverse().join('L') + 'Z'; top = []; bot = []; };
    for (let i = 0; i < pts.length; i++) {
      const w = ws[i];
      if (!(w > thr)) { flush(); continue; }
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
      const nx = -ty * w / 2, ny = tx * w / 2;
      top.push(fx(pts[i][0] + nx) + ' ' + fx(pts[i][1] + ny));
      bot.push(fx(pts[i][0] - nx) + ' ' + fx(pts[i][1] - ny));
    }
    flush();
    return d;
  }
  const rib = (pts, ws, fill = INK, extra = '') => { const d = ribbon(pts, ws); return d ? `<path d="${d}" fill="${fill}" ${extra}/>` : ''; };
  // поле штриховки: параллельные линии под углом ang (°) с шагом sp в рамке box; толщина — o.w(x,y)
  function hatch(o) {
    const a = (o.ang || 0) * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx;
    const [x0, y0, x1, y1] = o.box, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const R = Math.hypot(x1 - x0, y1 - y0) / 2 + 1, st = o.step || 3, sp = o.sp || 2.4, wob = o.wob ?? .22, sd = o.seed || 0;
    let d = '';
    for (let k = -R + (o.off || 0); k <= R; k += sp) {
      const pts = [], ws = [];
      for (let s = -R; s <= R + .01; s += st) {
        const e = k + wob * noise1(s * .07 + k * 1.7 + sd);
        const x = cx + dx * s + nx * e, y = cy + dy * s + ny * e;
        if (x < x0 - st || x > x1 + st || y < y0 - st || y > y1 + st) { if (pts.length) { pts.push([x, y]); ws.push(0); } continue; }
        pts.push([x, y]); ws.push(o.w(x, y));
      }
      d += ribbon(pts, ws, o.thr);
    }
    return d ? `<path d="${d}" fill="${o.color || INK}"${o.clip ? ` clip-path="url(#${o.clip})"` : ''}/>` : '';
  }
  const stroke = (d, w = .8, c = INK, extra = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const ell = (cx, cy, rx, ry, fill, extra = '') => `<ellipse cx="${fxx(cx)}" cy="${fxx(cy)}" rx="${fxx(rx)}" ry="${fxx(ry)}" fill="${fill}" ${extra}/>`;
  // подпись капсом: PT Serif Italic, разрядка letter-spacing (центр поправлен на хвост разрядки)
  const caps = (x, y, s, size, ls, fill = INK, extra = '') =>
    `<text x="${fxx(x + ls / 2)}" y="${fxx(y)}" ${FNT} font-size="${size}" letter-spacing="${ls}" text-anchor="middle" fill="${fill}" ${extra}>${s}</text>`;

  // картуш: прямоугольник с вогнутыми углами, двойная линия, завитки по бокам
  function cartouche(cx, cy, w, h, o = {}) {
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    const shape = (i, r) => {
      const a0 = fxx(x0 + i), a1 = fxx(x1 - i), b0 = fxx(y0 + i), b1 = fxx(y1 - i);
      return `M${fxx(a0 + r)} ${b0}L${fxx(a1 - r)} ${b0}A${r} ${r} 0 0 0 ${a1} ${fxx(b0 + r)}L${a1} ${fxx(b1 - r)}A${r} ${r} 0 0 0 ${fxx(a1 - r)} ${b1}` +
        `L${fxx(a0 + r)} ${b1}A${r} ${r} 0 0 0 ${a0} ${fxx(b1 - r)}L${a0} ${fxx(b0 + r)}A${r} ${r} 0 0 0 ${fxx(a0 + r)} ${b0}Z`;
    };
    const r = o.r ?? Math.min(7, h * .24);
    let g = '';
    // завитки: две C-образные волюты сходятся в острие, за ним — точка
    const curl = (sx, xe) => {
      const k = h / 30;
      const up = `M${fxx(xe)} ${fxx(cy - 6 * k)}C${fxx(xe - sx * 8 * k)} ${fxx(cy - 11 * k)} ${fxx(xe - sx * 15 * k)} ${fxx(cy - 5 * k)} ${fxx(xe - sx * 11 * k)} ${fxx(cy - 1.2 * k)}` +
        `C${fxx(xe - sx * 9 * k)} ${fxx(cy + .6 * k)} ${fxx(xe - sx * 6.2 * k)} ${fxx(cy - .8 * k)} ${fxx(xe - sx * 7.4 * k)} ${fxx(cy - 3 * k)}`;
      const dn = `M${fxx(xe)} ${fxx(cy + 6 * k)}C${fxx(xe - sx * 8 * k)} ${fxx(cy + 11 * k)} ${fxx(xe - sx * 15 * k)} ${fxx(cy + 5 * k)} ${fxx(xe - sx * 11 * k)} ${fxx(cy + 1.2 * k)}` +
        `C${fxx(xe - sx * 9 * k)} ${fxx(cy - .6 * k)} ${fxx(xe - sx * 6.2 * k)} ${fxx(cy + .8 * k)} ${fxx(xe - sx * 7.4 * k)} ${fxx(cy + 3 * k)}`;
      return stroke(up + dn, .9) + stroke(`M${fxx(xe - sx * 13.5 * k)} ${fxx(cy)}L${fxx(xe - sx * 19 * k)} ${fxx(cy)}`, .7) + Ci(xe - sx * 21.5 * k, cy, 1.1 * k, INK);
    };
    if (o.curls !== false) g += curl(1, x0) + curl(-1, x1);
    g += P(shape(0, r), PAPER) + P(shape(0, r), 'none', `stroke="${INK}" stroke-width="1.2"`) + P(shape(2.6, r * .8), 'none', `stroke="${INK}" stroke-width=".45"`);
    // гравированная тень по нижнему и правому краю внутри
    g += hatch({ box: [x0 + 3, y1 - 6, x1 - 3, y1 - 2.6], ang: 70, sp: 1.6, w: (x) => .5 * sst(x0 + 20, x1, x), seed: cx * .1 });
    return g;
  }

  // огонь порядка: светящийся шар (бумага в центре, киноварная штриховка к краю), клинья и волнистые лучи вращаются,
  // пунктирные круги расходятся; k — разгорание 0..1
  function orderFire(x, y, r, t, k = 1, clipId = 'eg_fc') {
    let g = '';
    for (let i = 0; i < 3; i++) {
      const ph = (t * .4 + i / 3) % 1, rr = r * (2.05 + 1.7 * ph);
      g += `<circle cx="${fxx(x)}" cy="${fxx(y)}" r="${fxx(rr)}" fill="none" stroke="${CIN}" stroke-width=".7" stroke-dasharray=".1 2.7" stroke-linecap="round" opacity="${fxx(k * Math.sin(Math.PI * ph) * .9)}"/>`;
    }
    let rays = '';
    const N = 32, rot = t * 5 * Math.PI / 180;
    for (let i = 0; i < N; i++) {
      const an = (i / N) * TAU + rot, cs = Math.cos(an), sn = Math.sin(an);
      const fl = 1 + .08 * noise1(t * 2.1 + i * 1.7);
      if (i % 2 === 0) {
        const r0 = r * 1.16, r1 = r * (1.16 + (i % 4 === 0 ? .95 : .7) * k * fl), hw = r * .09;
        rays += `M${fx(x + cs * r0 - sn * hw)} ${fx(y + sn * r0 + cs * hw)}L${fx(x + cs * r1)} ${fx(y + sn * r1)}L${fx(x + cs * r0 + sn * hw)} ${fx(y + sn * r0 - cs * hw)}Z`;
      } else {
        const pts = [], ws = [], L = r * .62 * k * fl;
        for (let j = 0; j <= 10; j++) {
          const s = j / 10, rr = r * 1.18 + L * s, wv = Math.sin(s * TAU * 1.2 + t * 3.2 + i) * r * .08 * s;
          pts.push([x + cs * rr - sn * wv, y + sn * rr + cs * wv]); ws.push(r * .075 * (1 - s) + .12);
        }
        rays += ribbon(pts, ws);
      }
    }
    if (k > .01) g += `<path d="${rays}" fill="${CIN}"/>`;
    // шар
    const pul = .3 + .06 * Math.sin(t * 2.6) + .03 * noise1(t * 5);
    g += `<clipPath id="${clipId}"><circle cx="${fxx(x)}" cy="${fxx(y)}" r="${fxx(r)}"/></clipPath>` + Ci(x, y, r, PAPER);
    g += hatch({ box: [x - r, y - r, x + r, y + r], ang: -8, sp: Math.max(1.1, r * .085), step: 1.2, wob: .1, w: (px, py) => {
      const q = Math.hypot(px - x + r * .12, py - y + r * .12) / r; return (r * .07 + .3) * sst(pul, 1.05, q);
    }, color: CIN, clip: clipId, seed: 3 });
    g += Ci(x, y, r, 'none', `stroke="${CIN}" stroke-width="${fxx(Math.max(.9, r * .07))}"`) + Ci(x, y, r * 1.08, 'none', `stroke="${CIN}" stroke-width=".4"`);
    return g;
  }

  // гравированная виньетка: штрих сгущается к углам листа
  const vign = (sd) => {
    const e = (x, y) => Math.hypot((x - 180) / 168, (y - 195) / 181);
    return hatch({ box: [X0, Y0, X1, Y1], ang: 0, sp: 2.4, step: 4, w: (x, y) => 1.05 * sst(.92, 1.38, e(x, y)), seed: sd }) +
      hatch({ box: [X0, Y0, X1, Y1], ang: 58, sp: 2.8, step: 4, w: (x, y) => .85 * sst(1.12, 1.45, e(x, y)), seed: sd + 1 });
  };

  // ======================= 1. ХУК: «ЗАЧЕМ ЛЮДЯМ БОГИ?» =======================
  // фигуры сидящих в плащах (земля — y 0, рост ≈ 40): в профиль лицом вправо, лицом к нам, спиной к нам; лиц нет
  const FIG = {
    side: { c: 'M-10.5 0C-11.6 -8 -10.6 -17 -7.6 -24C-6 -27.6 -2.6 -29.6 1.6 -29.6C5.6 -29.4 8.4 -27 9.6 -23.4C10.8 -20 13 -17 15.4 -14.2C17.4 -11.8 17.6 -6 16.4 0C8 1.6 -3 1.6 -10.5 0Z',
      h: 'M-1.7 -34.6C-1.7 -38 .6 -40.1 3.4 -40.1C6.2 -40.1 8.5 -38 8.5 -34.6C8.5 -31.4 6.2 -29.3 3.4 -29.3C.6 -29.3 -1.7 -31.4 -1.7 -34.6Z',
      f: 'M-4 -25C-6.4 -17 -7.4 -8 -7.4 -.6M0 -27C-.6 -18 0 -9 .6 .8M5 -24C8 -19 11 -15.4 14.6 -13.4', head: [3.4, -34.6] },
    front: { c: 'M-13 0C-13.6 -6 -12.4 -12.6 -10.4 -17.6C-9.2 -21.8 -8.8 -25 -6.6 -27C-4.2 -29 4.2 -29 6.6 -27C8.8 -25 9.2 -21.8 10.4 -17.6C12.4 -12.6 13.6 -6 13 0C6.5 1.8 -6.5 1.8 -13 0Z',
      h: 'M-5.2 -34.4C-5.2 -38 -2.8 -40.2 0 -40.2C2.8 -40.2 5.2 -38 5.2 -34.4C5.2 -30.9 2.8 -28.7 0 -28.7C-2.8 -28.7 -5.2 -30.9 -5.2 -34.4Z',
      f: 'M-5 -24C-6 -16 -6.6 -8 -7 0M5 -24C6 -16 6.6 -8 7 0M0 -27C.3 -18 -.3 -9 0 1M-10.6 -8.6C-5 -10.8 5 -10.8 10.6 -8.6', head: [0, -34.4] },
    back: { c: 'M-13 0C-13.6 -6 -12.4 -12.6 -10.4 -17.6C-9.2 -21.8 -8.8 -25 -6.6 -27C-4.2 -29 4.2 -29 6.6 -27C8.8 -25 9.2 -21.8 10.4 -17.6C12.4 -12.6 13.6 -6 13 0C6.5 1.8 -6.5 1.8 -13 0Z',
      h: 'M-5 -34.6C-5 -38.1 -2.7 -40.2 0 -40.2C2.7 -40.2 5 -38.1 5 -34.6C5 -32 3.6 -30.2 2.2 -29.2L2.4 -27.6L-2.4 -27.6L-2.2 -29.2C-3.6 -30.2 -5 -32 -5 -34.6Z',
      f: 'M0 -28C-.4 -18 .4 -8 0 1M-6 -25C-8 -16 -9 -8 -9.4 0M6 -25C8 -16 9 -8 9.4 0', head: [0, -34.6] },
  };
  function m1(t) {
    const F = [180, 140], FR = 20, C = [180, 320];
    const fl = 1 + .07 * noise1(t * 3.1) + .04 * noise1(t * 7.3 + 2);
    const br = 1 + .04 * Math.sin(t * 2.2);
    const ST = [];
    for (let i = 0; i < 60; i++) {
      const sx = X0 + 6 + hash(i * 3.17 + .5) * (X1 - X0 - 12), sy = Y0 + 4 + hash(i * 7.31 + 1.2) * 240;
      if (Math.hypot(sx - F[0], sy - F[1]) < 80) continue;
      if (sy > 22 && sy < 82 && sx > 36 && sx < 324) continue;
      const tw = .5 + .5 * Math.sin(t * (1.4 + hash(i) * 2.2) + i * 2.1);
      ST.push([sx, sy, (1.3 + 2.1 * hash(i * 5.5) ** 2) * (.75 + .45 * tw)]);
    }
    const light = (x, y) => {
      let L = 1 - sst(FR * 1.5, 112 * br, Math.hypot(x - F[0], (y - F[1]) * 1.08));
      L = Math.max(L, (1 - sst(8, 76 * fl, Math.hypot((x - C[0]) / 1.8, y - C[1] + 10))) * .95);
      for (const s of ST) { const d2 = (x - s[0]) ** 2 + (y - s[1]) ** 2; if (d2 < s[2] * s[2]) L = Math.max(L, 1 - d2 / (s[2] * s[2])); }
      return L;
    };
    let g = '';
    // небо: горизонтальный штрих, у краёв — второй, косой
    g += hatch({ box: [X0, Y0, X1, 296], ang: 0, sp: 2.25, step: 3.5, w: (x, y) => 1.25 * (1 + .16 * sst(200, 20, y)) * Math.pow(1 - light(x, y), .8), seed: 1 });
    g += hatch({ box: [X0, Y0, X1, 296], ang: -18, sp: 3, step: 4, w: (x, y) => .95 * sst(.5, 1, 1 - light(x, y)) * sst(.62, 1.15, Math.hypot((x - 180) / 170, (y - 160) / 150)), seed: 2 });
    // земля: штрих гуще к краям, у костра — светлое пятно
    const lg = (x, y) => (1 - sst(12, 150 * fl, Math.hypot((x - C[0]) / 1.7, (y - C[1]) * 1.25))) * .98;
    g += hatch({ box: [X0, 280, X1, Y1], ang: 0, sp: 2.5, step: 3.5, w: (x, y) => 1.25 * (1 - lg(x, y)), seed: 4 });
    g += hatch({ box: [X0, 280, X1, Y1], ang: 12, sp: 3.2, step: 4, w: (x, y) => .9 * sst(.5, 1, 1 - lg(x, y)), seed: 5 });
    // дальние холмы — плотная перекрёстная масса
    const HILL = `M${X0} 298L${X0} 284C52 275 92 277 128 285C158 291 202 290 236 283C274 275 316 277 ${X1} 286L${X1} 298Z`;
    g += `<clipPath id="eg_hill"><path d="${HILL}"/></clipPath>` + P(HILL, PAPER);
    g += hatch({ box: [X0, 272, X1, 298], ang: 0, sp: 1.9, w: (x, y) => 1.25 - .4 * lg(x, y), clip: 'eg_hill', seed: 6 });
    g += hatch({ box: [X0, 272, X1, 298], ang: 35, sp: 2.4, w: () => .7, clip: 'eg_hill', seed: 7 });
    g += stroke(`M${X0} 284C52 275 92 277 128 285C158 291 202 290 236 283C274 275 316 277 ${X1} 286`, .8);

    // люди: семеро на эллипсе вокруг костра, впереди по центру — просвет на огонь
    const ppl = [];
    for (let i = 0; i < 7; i++) {
      const an = (90 + 25.714 + i * 51.428) * Math.PI / 180, ca = Math.cos(an), sa = Math.sin(an);
      const bx = C[0] + 118 * ca, by = C[1] + 32 * sa;
      const s = mix(1.12, 1.72, (by - 288) / 64) * (.95 + .08 * hash(i * 4.4));
      const kind = Math.abs(ca) > .55 ? 'side' : (sa < 0 ? 'front' : 'back'), dir = kind === 'side' ? -Math.sign(ca) : 1;
      const lean = kind === 'side' ? dir * (4 + 3 * hash(i * 2.9)) : (hash(i * 2.9) - .5) * 5;
      ppl.push({ i, bx, by, s, an, kind, dir, lean });
    }
    const headAt = q => { const F0 = FIG[q.kind], a = q.lean * Math.PI / 180, hx = F0.head[0] * q.dir, hy = F0.head[1] - 6;
      return [q.bx + (hx * Math.cos(a) - hy * Math.sin(a)) * q.s, q.by + (hx * Math.sin(a) + hy * Math.cos(a)) * q.s]; };
    // нити от огня порядка к каждому (под фигурами), по нитям сбегают искры
    let th = '', beads = '';
    ppl.forEach((q, j) => {
      const [hx, hy] = headAt(q);
      const dx = hx - F[0], dy = hy - F[1], l = Math.hypot(dx, dy);
      const A = [F[0] + dx / l * FR * 1.1, F[1] + dy / l * FR * 1.1];
      const M = [(A[0] + hx) / 2 - dy / l * 9 * Math.sign(dx || 1) * .6, (A[1] + hy) / 2 + Math.abs(dx / l) * 6];
      const kq = sst(.1 + .06 * j, .75 + .06 * j, t);
      const pts = [];
      for (let k = 0; k <= 24; k++) { const s = k / 24 * kq, v = 1 - s; pts.push([v * v * A[0] + 2 * v * s * M[0] + s * s * hx, v * v * A[1] + 2 * v * s * M[1] + s * s * hy]); }
      const d = 'M' + pts.map(p => fx(p[0]) + ' ' + fx(p[1])).join('L');
      th += stroke(d, 2.4, PAPER) + stroke(d, .65, CIN);
      if (kq > .98) for (let b = 0; b < 2; b++) {
        const s = (t * .42 + hash(j * 3.3) + b * .5) % 1, v = 1 - s;
        const bx = v * v * A[0] + 2 * v * s * M[0] + s * s * hx, by = v * v * A[1] + 2 * v * s * M[1] + s * s * hy;
        beads += Ci(bx, by, 2.1, PAPER) + Ci(bx, by, 1.15, CIN, `opacity="${fxx(sst(0, .08, s) * sst(1, .9, s))}"`);
      }
    });
    g += th + beads;
    g += orderFire(F[0], F[1], FR, t, 1, 'eg_fc1');

    // фигура: плащ и голова, тень — штрих поперёк складок; сторона от огня темнее, задние ряды освещены спереди
    const figure = (q) => {
      const F0 = FIG[q.kind], tr = `translate(${fxx(q.bx)} ${fxx(q.by)}) rotate(${fxx(q.lean)}) scale(${fxx(q.s * q.dir)} ${fxx(q.s)})`, id = `eg_f${q.i}`;
      const fb = (q.by - C[1]) / 32, sg = Math.cos(q.an);
      let o = '';
      // тень на земле — от огня наружу
      const vx = q.bx - C[0], vy = (q.by - C[1]) * 2.4, vl = Math.hypot(vx, vy) || 1;
      const sl = 26 * q.s, sx = q.bx + vx / vl * sl * .5, sy = q.by + 1 + vy / vl * 2.4 * q.s, sa = Math.atan2(vy * .3, vx) * 180 / Math.PI;
      o += `<clipPath id="${id}s"><ellipse cx="${fxx(sx)}" cy="${fxx(sy)}" rx="${fxx(sl * .62)}" ry="${fxx(3.6 * q.s)}" transform="rotate(${fxx(sa)} ${fxx(sx)} ${fxx(sy)})"/></clipPath>`;
      o += hatch({ box: [sx - sl, sy - 10, sx + sl, sy + 10], ang: 0, sp: 1.3, step: 2, w: () => 1.0, clip: id + 's', seed: q.i * 3 });
      o += `<clipPath id="${id}"><path d="${F0.c}" transform="${tr}"/><path d="${F0.h}" transform="${tr}"/></clipPath>`;
      o += P(F0.c, PAPER, `transform="${tr}"`) + P(F0.h, PAPER, `transform="${tr}"`);
      const box = [q.bx - 19 * q.s, q.by - 42 * q.s, q.bx + 19 * q.s, q.by + 2];
      const dk = (x, y) => {
        const lat = (x - q.bx) / (13 * q.s), v = (q.by - y) / (40 * q.s);
        return clamp((.24 + .36 * fb + (q.kind === 'front' ? .16 : 0) + .52 * lat * sg + (fb < 0 ? .42 : .22) * lat * lat + .14 * v) * (1.08 - .1 * fl));
      };
      o += hatch({ box, ang: 84 + q.lean, sp: 1.55, step: 1.6, wob: .12, w: (x, y) => 1.12 * dk(x, y), clip: id, seed: q.i * 9 });
      o += hatch({ box, ang: 30, sp: 1.85, step: 1.6, wob: .12, w: (x, y) => 1.0 * sst(.58, 1, dk(x, y)), clip: id, seed: q.i * 9 + 4 });
      o += P(F0.f, 'none', `transform="${tr}" stroke="${INK}" stroke-width="${fxx(.55 / q.s)}" stroke-linecap="round" opacity=".85"`);
      o += P(F0.c, 'none', `transform="${tr}" stroke="${INK}" stroke-width="${fxx(1 / q.s)}" stroke-linejoin="round"`) +
        P(F0.h, 'none', `transform="${tr}" stroke="${INK}" stroke-width="${fxx(1 / q.s)}"`);
      return o;
    };
    // костёр: два полена, языки (тушь по бумаге), искры летят вверх
    const camp = () => {
      let o = '';
      const b = 326;
      o += rib([[158, 334], [180, 329], [202, 324]], [3.4, 4, 3]) + rib([[160, 323], [181, 329], [201, 335]], [3, 4, 3.4]);
      o += stroke('M162 332.6L198 324.6M163 324.6L199 333', .5, PAPER, 'opacity=".7"');
      const flame = (x, h, w, tip) => {
        const tx = x + tip;
        return `M${fx(x - w)} ${b}C${fx(x - w * 1.3)} ${fx(b - h * .32)} ${fx(x - w * .55)} ${fx(b - h * .52)} ${fx(x - w * .3 + tip * .35)} ${fx(b - h * .7)}` +
          `C${fx(x - w * .1 + tip * .6)} ${fx(b - h * .82)} ${fx(tx - w * .2)} ${fx(b - h * .9)} ${fx(tx)} ${fx(b - h)}` +
          `C${fx(tx + w * .08)} ${fx(b - h * .84)} ${fx(x + w * .35 + tip * .4)} ${fx(b - h * .7)} ${fx(x + w * .55)} ${fx(b - h * .5)}` +
          `C${fx(x + w * .9)} ${fx(b - h * .36)} ${fx(x + w * 1.25)} ${fx(b - h * .2)} ${fx(x + w)} ${b}Z`;
      };
      [[-9.5, 20, 6.4], [9.6, 22, 6.6], [0, 33, 9.6], [-3.4, 13, 4.2], [4.2, 11, 3.6]].forEach(([dx, h, w], j) => {
        const k = 1 + .17 * noise1(t * 4.3 + j * 3.1), tip = 4 * noise1(t * 3.4 + j * 5.2), x = C[0] + dx;
        o += P(flame(x, h * k, w, tip), PAPER, `stroke="${INK}" stroke-width=".85" stroke-linejoin="round"`);
        if (j < 3) o += stroke(`M${fx(x - w * .25)} ${b - 1}C${fx(x - w * .5)} ${fx(b - h * k * .3)} ${fx(x + tip * .3 + w * .1)} ${fx(b - h * k * .45)} ${fx(x + tip * .55)} ${fx(b - h * k * .7)}`, .45) +
          stroke(`M${fx(x + w * .4)} ${b - 1}C${fx(x + w * .55)} ${fx(b - h * k * .2)} ${fx(x + w * .3 + tip * .2)} ${fx(b - h * k * .32)} ${fx(x + w * .25 + tip * .3)} ${fx(b - h * k * .42)}`, .4);
      });
      for (let i = 0; i < 16; i++) {
        const ag = (t * (.45 + .25 * hash(i)) + hash(i * 7.7)) % 1;
        const x = C[0] + (hash(i * 3.3) - .5) * 22 + Math.sin(ag * 6 + i) * 6 + (hash(i * 1.9) - .5) * 36 * ag, y = 300 - 90 * ag;
        o += Ci(x, y, .9 * (1 - ag) + .3, INK, `opacity="${fxx(sst(0, .1, ag) * (1 - ag))}"`);
      }
      return o;
    };
    const order = ppl.map(q => ({ y: q.by, f: () => figure(q) })).concat([{ y: C[1] + 4, f: camp }]).sort((a, b) => a.y - b.y);
    order.forEach(o => g += o.f());
    // заголовок
    g += cartouche(180, 52, 252, 38);
    g += caps(180, 58.5, 'ЗАЧЕМ ЛЮДЯМ БОГИ?', 17.5, 2);
    return g;
  }

  // ======================= 2. ЧАЙ ОСТЫВАЕТ: ЭНТРОПИЯ РАСТЁТ =======================
  function m2(u) {
    const cx = 218, RY = 210, RX = 54, H = 76, YB = RY + H, RRY = 13;
    const rxv = v => RX * (1 - .5 * v * v), yv = v => RY + H * v, ryv = v => RRY * rxv(v) / RX;
    let g = vign(11);
    // стена: лёгкий вертикальный штрих, правее — темнее (свет слева)
    g += hatch({ box: [X0, Y0, X1, 270], ang: 90, sp: 3.1, step: 4, w: (x, y) => .2 + .38 * sst(30, 346, x) * (.6 + .4 * sst(16, 270, y)), seed: 21 });
    // стол: дальний край, столешница в перспективе, тень чашки, передний край
    const sh = (x, y) => 1 - sst(.55, 1.05, Math.hypot((x - cx - 48) / 100, (y - 309) / 15));
    g += R(X0, 270, X1 - X0, 92, PAPER);
    g += hatch({ box: [X0, 271, X1, 360], ang: 0, sp: 2.2, step: 3.5, w: (x, y) => .3 + .55 * sst(270, 362, y) + .75 * sh(x, y), seed: 22 });
    g += stroke(`M${X0} 270.5L${X1} 270.5`, 1.1) + stroke(`M${X0} 360.5L${X1} 360.5`, 1.5);
    g += hatch({ box: [X0, 362, X1, Y1], ang: 0, sp: 1.8, w: () => 1.1, seed: 23 }) + hatch({ box: [X0, 362, X1, Y1], ang: 70, sp: 2.4, w: () => .7, seed: 24 });
    // блюдце
    const SC = [cx, 298], SRX = 96, SRY = 18;
    g += ell(SC[0], SC[1] + 3.4, SRX - 1, SRY, INK, 'opacity=".9"');
    g += `<clipPath id="eg_sc"><ellipse cx="${SC[0]}" cy="${SC[1]}" rx="${SRX}" ry="${SRY}"/></clipPath>` + ell(SC[0], SC[1], SRX, SRY, PAPER);
    g += hatch({ box: [SC[0] - SRX, SC[1] - SRY, SC[0] + SRX, SC[1] + SRY], ang: 0, sp: 1.7, step: 2.5, w: (x, y) => .95 * clamp(sst(-.2, 1, (x - cx) / SRX) * .8 + .5 * sst(.2, 1, (y - SC[1]) / SRY) - .1), clip: 'eg_sc', seed: 25 });
    g += ell(SC[0], SC[1], SRX, SRY, 'none', `stroke="${INK}" stroke-width="1"`) + ell(SC[0], SC[1] - 1, 45, 8.4, 'none', `stroke="${INK}" stroke-width=".5"`);
    // ножка чашки
    g += P(`M${cx - 26} ${YB}L${cx - 29} 295C${cx - 14} 300 ${cx + 14} 300 ${cx + 29} 295L${cx + 26} ${YB}Z`, PAPER, `stroke="${INK}" stroke-width=".8"`);
    g += hatch({ box: [cx - 30, YB, cx + 30, 300], ang: 90, sp: 1.6, w: x => 1 * sst(cx - 12, cx + 29, x) + .2, seed: 26 });
    // ручка (масштаб от чашки)
    const k = RX / 44, hx = v => fx(cx + v * k), hy = v => fx(RY + v * k);
    const HD = `M${hx(40)} ${hy(10)}C${hx(72)} ${hy(2)} ${hx(76)} ${hy(44)} ${hx(33)} ${hy(50)}L${hx(34)} ${hy(41)}C${hx(62)} ${hy(36)} ${hx(60)} ${hy(15)} ${hx(41)} ${hy(18)}Z`;
    g += `<clipPath id="eg_hd"><path d="${HD}"/></clipPath>` + P(HD, PAPER);
    g += hatch({ box: [cx + 30 * k, RY, cx + 80 * k, RY + 56 * k], ang: 100, sp: 1.6, step: 2, w: (x, y) => .35 + .85 * sst(cx + 44 * k, cx + 70 * k, x) + .3 * sst(RY + 24 * k, RY + 50 * k, y), clip: 'eg_hd', seed: 27 });
    g += P(HD, 'none', `stroke="${INK}" stroke-width=".9" stroke-linejoin="round"`);
    // тело чашки: контурный штрих по сечениям (как резец ведёт по форме) + меридианы в тени
    let body = `M${cx - RX} ${RY}`;
    for (let j = 1; j <= 12; j++) { const v = j / 12; body += `L${fx(cx - rxv(v))} ${fx(yv(v))}`; }
    for (let j = 1; j <= 20; j++) { const th = Math.PI - j / 20 * Math.PI; body += `L${fx(cx + rxv(1) * Math.cos(th))} ${fx(YB + ryv(1) * Math.sin(th))}`; }
    for (let j = 11; j >= 0; j--) { const v = j / 12; body += `L${fx(cx + rxv(v))} ${fx(yv(v))}`; }
    for (let j = 1; j < 30; j++) { const th = j / 30 * Math.PI; body += `L${fx(cx + RX * Math.cos(th))} ${fx(RY + RRY * Math.sin(th))}`; }
    body += 'Z';
    g += `<clipPath id="eg_cup"><path d="${body}"/></clipPath>` + P(body, PAPER);
    const shade = (uu, v) => clamp(.04 + .95 * Math.pow(sst(-.42, 1.02, uu), 1.15) + .32 * sst(-.72, -1.02, uu) + .18 * v);
    let cont = '';
    for (let j = 0; j <= 36; j++) {
      const v = (j + .5) / 37, rx = rxv(v), ry = ryv(v), yc = yv(v), pts = [], ws = [];
      for (let q = 0; q <= 56; q++) { const th = Math.PI - q / 56 * Math.PI, uu = Math.cos(th); pts.push([cx + rx * uu, yc + ry * Math.sin(th)]); ws.push(1.05 * shade(uu, v)); }
      cont += ribbon(pts, ws);
    }
    for (let j = 0; j < 10; j++) {
      const th = .05 * Math.PI + j * .04 * Math.PI, pts = [], ws = [];
      for (let q = 0; q <= 30; q++) { const v = q / 30; pts.push([cx + rxv(v) * Math.cos(th), yv(v) + ryv(v) * Math.sin(th)]); ws.push(.9 * sst(.6, 1, shade(Math.cos(th), v))); }
      cont += ribbon(pts, ws);
    }
    g += `<path d="${cont}" fill="${INK}" clip-path="url(#eg_cup)"/>`;
    g += P(body, 'none', `stroke="${INK}" stroke-width="1.05" stroke-linejoin="round"`);
    // внутренность: задняя стенка светлая, чай тёмный штрих с бликом, который колышется
    g += ell(cx, RY, RX, RRY, PAPER, `stroke="${INK}" stroke-width="1.15"`);
    const TY = RY + 3, TRX = RX - 4, TRY = RRY * .8;
    g += `<clipPath id="eg_tea"><ellipse cx="${cx}" cy="${TY}" rx="${TRX}" ry="${fxx(TRY)}"/></clipPath>`;
    const hlx = cx - 16 + 3 * Math.sin(u * 1.7), hly = TY - 2;
    g += hatch({ box: [cx - TRX, TY - TRY, cx + TRX, TY + TRY], ang: 0, sp: 1.35, step: 2, wob: .15, w: (x, y) => 1.05 * sst(.7, 1.25, Math.hypot((x - hlx) / 19, (y - hly) / 3.2)) * (.75 + .25 * sst(cx - 50, cx + 50, x)), clip: 'eg_tea', seed: 28 });
    g += ell(cx, TY, TRX, TRY, 'none', `stroke="${INK}" stroke-width=".55"`);
    g += stroke(`M${cx - RX + 2} ${RY + .5}C${cx - 38} ${RY - 8.6} ${cx + 38} ${RY - 8.6} ${cx + RX - 2} ${RY + .5}`, .4, INK, 'opacity=".7"');
    // пар: двойные линии-ленты, колышутся; к концу остывания — короче и бледнее
    const cool = clamp(u / 3);
    for (let i = 0; i < 4; i++) {
      const x0 = cx - 26 + i * 17, top = mix(70 + i * 8, 150 + i * 6, cool), y0 = RY - 2;
      for (let side = 0; side < 2; side++) {
        const pts = [], ws = [];
        for (let j = 0; j <= 44; j++) {
          const q = j / 44, y = y0 - (y0 - top) * q;
          const x = x0 + side * 2.8 * (1 - q * .5) + (5 + 12 * q) * Math.sin(q * 5.2 - u * 1.9 + i * 1.7) + 7 * q * noise1(i * 3 + u * .6);
          pts.push([x, y]); ws.push((side ? .6 : 1.3) * (1 - q * .9) * (1 - .45 * cool) + .05);
        }
        g += rib(pts, ws);
      }
    }
    // частицы тепла: вылетают из чашки во все стороны и путаются (беспорядок растёт с возрастом частицы); хвостик — откуда летит
    const PC = [cx, 246];
    for (let i = 0; i < 170; i++) {
      const born = hash(i * 3.71) * 2.8 - .3, age = u - born;
      if (age <= 0) continue;
      const an = hash(i * 1.37 + .3) * TAU, spd = 26 + 34 * hash(i * 2.13);
      const pos = a => { const r = 62 + spd * a; return [PC[0] + Math.cos(an) * r * 1.12 + a * 10 * noise1(i * 1.3 + (born + a) * 1.1), PC[1] + Math.sin(an) * r * .92 + a * 10 * noise1(i * 2.7 + (born + a) * 1.1 + 40)]; };
      const [x, y] = pos(age);
      if (x < X0 + 4 || x > X1 - 4 || y < Y0 + 4 || y > Y1 - 4) continue;
      const op = sst(0, .2, age) * (1 - .4 * sst(1.8, 3.2, age));
      const rr = 1.05 + .55 * hash(i * 6.1);
      const tail = [pos(Math.max(0, age - .22)), pos(Math.max(0, age - .11)), [x, y]];
      g += rib(tail, [.15, rr * .7, rr * 1.2], INK, `opacity="${fxx(op * .55)}"`);
      g += Ci(x, y, rr + 1.1, PAPER, `opacity="${fxx(op * .9)}"`) + (i % 3 === 0 ? Ci(x, y, rr, 'none', `stroke="${INK}" stroke-width=".6" opacity="${fxx(op)}"`) : Ci(x, y, rr * .85, INK, `opacity="${fxx(op)}"`));
    }
    // шкала ЭНТРОПИЯ: линейка с делениями, штриховка и указатель ползут вверх
    const GX0 = 34, GX1 = 52, GY0 = 116, GY1 = 334, lvl = mix(.18, .9, sst(-.2, 3.2, u));
    const yl = GY1 - 3 - (GY1 - GY0 - 6) * lvl;
    g += R(GX0, GY0, GX1 - GX0, GY1 - GY0, PAPER, `stroke="${INK}" stroke-width="1.1"`) + R(GX0 + 2.6, GY0 + 2.6, GX1 - GX0 - 5.2, GY1 - GY0 - 5.2, 'none', `stroke="${INK}" stroke-width=".45"`);
    g += `<clipPath id="eg_gv"><rect x="${GX0 + 3}" y="${fxx(yl)}" width="${GX1 - GX0 - 6}" height="${fxx(GY1 - 3 - yl)}"/></clipPath>`;
    g += hatch({ box: [GX0 + 3, GY0, GX1 - 3, GY1 - 3], ang: 45, sp: 1.9, step: 2, w: () => .95, clip: 'eg_gv', seed: 31 }) + hatch({ box: [GX0 + 3, GY0, GX1 - 3, GY1 - 3], ang: -45, sp: 2.3, step: 2, w: (x, y) => .75 * sst(yl, yl + 60, y), clip: 'eg_gv', seed: 32 });
    g += stroke(`M${GX0 + 2.6} ${fxx(yl)}L${GX1 - 2.6} ${fxx(yl)}`, 1.2);
    for (let k = 0; k <= 20; k++) { const y = GY1 - 3 - (GY1 - GY0 - 6) * k / 20; g += L(GX1, y, GX1 + (k % 5 === 0 ? 8 : 4), y, INK, k % 5 === 0 ? .9 : .55); }
    const py = yl + .6 * Math.sin(u * 6);
    g += P(`M${GX1 + 10} ${fxx(py)}L${GX1 + 19} ${fxx(py - 5)}L${GX1 + 19} ${fxx(py + 5)}Z`, INK) + stroke(`M${GX1 + 19} ${fxx(py)}L${GX1 + 25} ${fxx(py)}`, .8);
    // стрелка «растёт» над шкалой
    g += stroke(`M${(GX0 + GX1) / 2} ${GY0 - 4}L${(GX0 + GX1) / 2} ${GY0 - 13}M${(GX0 + GX1) / 2 - 3.5} ${GY0 - 9.5}L${(GX0 + GX1) / 2} ${GY0 - 13.5}L${(GX0 + GX1) / 2 + 3.5} ${GY0 - 9.5}`, 1);
    g += cartouche(64, 88, 84, 24, { r: 4.5, curls: false });
    g += caps(64, 92.2, 'ЭНТРОПИЯ', 11.5, 1.6);
    return g;
  }

  // ======================= 3. ТЕЙЯР ДЕ ШАРДЕН: БОГ ВПЕРЕДИ =======================
  function m3(u) {
    const Pt = [180, 130], J = [180, 334];
    let g = vign(41);
    const grow = (i) => eout(clamp((u - .05 - Math.abs(i - 3) * .06) / 1.25));
    const kF = sst(.85, 1.45, u);
    // сферы космографии вокруг точки: пунктирные круги, деления бегут
    [[34, .5, 0], [52, .45, 1], [74, .4, 2], [100, .35, 3]].forEach(([r, w, j]) => {
      const a = sst(.3 + j * .12, .9 + j * .12, u) * .85;
      g += Ci(Pt[0], Pt[1], r, 'none', `stroke="${INK}" stroke-width="${w}" opacity="${fxx(a)}"${j % 2 ? ` stroke-dasharray="1.2 2.4" stroke-dashoffset="${fxx(-u * (6 + j * 2))}"` : ''}`);
      if (j === 2) for (let k = 0; k < 36; k++) {
        const an = k / 36 * TAU + u * .12, c = Math.cos(an), s = Math.sin(an), l = k % 3 === 0 ? 5 : 2.6;
        g += L(Pt[0] + c * r, Pt[1] + s * r, Pt[0] + c * (r + l), Pt[1] + s * (r + l), INK, .5, `opacity="${fxx(a)}"`);
      }
    });
    // земля и корни
    g += hatch({ box: [X0, 356, X1, Y1], ang: 0, sp: 2.1, step: 3.5, w: (x, y) => (.45 + .5 * sst(356, 374, y)) * (.4 + .6 * sst(0, 1, Math.abs(x - 180) / 60)), seed: 42 });
    g += stroke(`M${X0} 356.5C120 355 240 355 ${X1} 356.5`, .7);
    [[-34, 372, -.6], [-16, 375, -.2], [15, 375, .2], [36, 371, .6]].forEach(([dx, y, c]) =>
      g += rib([[180, 352], [180 + dx * .3, 360], [180 + dx * .7 + c * 6, 366], [180 + dx, y]], [3.4, 2.4, 1.4, .3]));
    g += rib([[180, 366], [180, 352]], [4.6, 4.4]);
    // ветви: 7 лент от клетки к точке, толще у основания; рядом — тонкая линия тени
    const SX = [-190, -125, -60, 0, 60, 125, 190];
    const bz = (sx, s) => { const v = 1 - s, P1 = [180 + sx * .6, 314], P2 = [180 + sx * 1.15, 198], P3 = [180 + sx * .035, Pt[1] + 18];
      return [v * v * v * J[0] + 3 * v * v * s * P1[0] + 3 * v * s * s * P2[0] + s * s * s * P3[0], v * v * v * J[1] + 3 * v * v * s * P1[1] + 3 * v * s * s * P2[1] + s * s * s * P3[1]]; };
    let br = '', tw = '', dots = '';
    SX.forEach((sx, i) => {
      const gk = grow(i);
      if (gk <= .01) return;
      const pts = [], ws = [], sh = [], shw = [];
      const n = 60;
      for (let k = 0; k <= n; k++) {
        const s = k / n * gk, p = bz(sx, s), p2 = bz(sx, Math.min(1, s + .01));
        pts.push(p); ws.push(mix(3.3, .7, s) * (1 - .25 * Math.abs(sx) / 190));
        const tx = p2[0] - p[0], ty = p2[1] - p[1], l = Math.hypot(tx, ty) || 1, side = sx >= 0 ? 1 : -1;
        sh.push([p[0] - ty / l * 2.6 * side, p[1] + tx / l * 2.6 * side]); shw.push(s < .9 ? .45 : 0);
      }
      br += ribbon(pts, ws) + ribbon(sh, shw);
      // побеги с листками
      if (sx !== 0) [.22, .4, .58, .8].forEach((s0, j) => {
        if (s0 > gk) return;
        const p = bz(sx, s0), p2 = bz(sx, s0 + .01), tx = p2[0] - p[0], ty = p2[1] - p[1], l = Math.hypot(tx, ty) || 1;
        const side = (j % 2 ? 1 : -1) * Math.sign(sx), nx = -ty / l * side, ny = tx / l * side;
        const e = [p[0] + nx * 8 + tx / l * 5, p[1] + ny * 8 + ty / l * 5];
        tw += stroke(`M${fx(p[0])} ${fx(p[1])}Q${fx(p[0] + nx * 5)} ${fx(p[1] + ny * 5)} ${fx(e[0])} ${fx(e[1])}`, .7);
        const an = Math.atan2(e[1] - p[1], e[0] - p[0]) * 180 / Math.PI + 3 * Math.sin(u * 1.6 + i + j);
        tw += G(P('M0 0C2.2 -2.6 6 -2.8 8.6 0C6 2.8 2.2 2.6 0 0Z', PAPER, `stroke="${INK}" stroke-width=".6"`) + stroke('M.6 0L7.6 0', .4), `translate(${fx(e[0])} ${fx(e[1])}) rotate(${fx(an)})`);
      });
      // точки поднимаются к огню
      if (gk > .99) for (let b = 0; b < 3; b++) {
        const s = (u * .32 + b / 3 + hash(i * 2.2) * .3) % 1, p = bz(sx, s), op = sst(1.1, 1.6, u) * sst(0, .1, s) * sst(1, .9, s);
        dots += Ci(p[0], p[1], 2.3, PAPER, `opacity="${fxx(op)}"`) + Ci(p[0], p[1], 1.15, INK, `opacity="${fxx(op)}"`);
      }
    });
    g += tw + `<path d="${br}" fill="${INK}"/>` + dots;
    // медальоны: клетка (из неё растут ветви), рыба, ящер, человек
    const medal = (x, y, r, inner, a) => {
      if (a <= .01) return '';
      const k = .6 + .4 * eout(a);
      return G(Ci(0, 0, r, PAPER, `stroke="${INK}" stroke-width="1.15"`) + Ci(0, 0, r - 2.6, 'none', `stroke="${INK}" stroke-width=".45"`) + G(inner, `scale(${fxx(r / 13.5)})`),
        `translate(${fx(x)} ${fx(y)}) scale(${fxx(k)})`, `opacity="${fxx(clamp(a * 1.5))}"`);
    };
    // клетка: неровная живая оболочка, ядро сбоку в штриховке, зёрна и пузырёк
    let cell = '';
    { let d = ''; for (let k = 0; k <= 48; k++) { const an = k / 48 * TAU, rr = 9 + 1.3 * Math.sin(an * 3 + u * 1.5) + .7 * Math.sin(an * 5 - u * 2 + 1); d += (k ? 'L' : 'M') + fx(Math.cos(an) * rr) + ' ' + fx(Math.sin(an) * rr * .9); }
      cell += P(d + 'Z', PAPER, `stroke="${INK}" stroke-width=".95"`) + P(d + 'Z', 'none', `stroke="${INK}" stroke-width=".35" transform="scale(.86)" opacity=".7"`);
      cell += `<clipPath id="eg_nu"><ellipse cx="2.6" cy="-1.4" rx="3.8" ry="3.2"/></clipPath>` + ell(2.6, -1.4, 3.8, 3.2, 'none', `stroke="${INK}" stroke-width=".7"`);
      cell += hatch({ box: [-1.4, -4.8, 6.6, 2], ang: 35, sp: 1.05, step: 1, wob: .05, w: () => .55, clip: 'eg_nu', seed: 51 }) + Ci(3.4, -2, .9, INK);
      cell += Ci(-4.2, 3.2, 1.7, 'none', `stroke="${INK}" stroke-width=".5"`);
      for (let k = 0; k < 11; k++) { const an = hash(k * 4.1) * TAU, rr = 4.6 + 2.8 * hash(k * 2.7); cell += Ci(Math.cos(an) * rr - .8, Math.sin(an) * rr * .85, .42, INK); } }
    // рыба: вилочкой хвост, плавники, жабра; хвост чуть ходит
    const FB = 'M-8 0C-4.6 -5.2 3.4 -5.8 9.6 -.4C9.9 0 9.9 .4 9.6 .6C3.4 5.6 -4.6 5 -8 0Z', tw0 = 1.2 * Math.sin(u * 5);
    const fish = P(`M-7.4 0L-12.8 ${fx(-5.8 + tw0)}C-12 -2.6 -11.6 -1.2 -10.8 0C-11.6 1.2 -12 2.6 -12.8 ${fx(5.8 + tw0)}Z`, INK) +
      P('M-3 -4.4C-1.6 -8.4 2.6 -8.6 4.6 -4.8Z', PAPER, `stroke="${INK}" stroke-width=".6"`) + P('M-1.4 4.2C-.4 7 1.8 7.2 2.8 4.4Z', PAPER, `stroke="${INK}" stroke-width=".6"`) +
      P(FB, PAPER, `stroke="${INK}" stroke-width=".85"`) + `<clipPath id="eg_fi"><path d="${FB}"/></clipPath>` +
      hatch({ box: [-8, -6, 10, 6], ang: 0, sp: 1.05, step: 1, wob: .05, w: (x, y) => .7 * sst(-1.4, 4.6, y), clip: 'eg_fi', seed: 52 }) +
      hatch({ box: [-8, -6, 10, 6], ang: 60, sp: 1.6, step: 1, wob: .05, w: (x, y) => .45 * sst(1, 4.6, y), clip: 'eg_fi', seed: 53 }) +
      stroke('M5.8 -3.4C4.8 -1.2 4.8 1.2 5.8 3.4', .6) + Ci(7.7, -1.1, .5, INK);
    // ящер (вид сверху)
    const liz = rib([[8.6, -5.6], [5.4, -3.6], [1.6, -1.2], [-2.6, 1.4], [-6.6, 3.8], [-10, 3.6], [-11.6, .8]], [2.6, 2, 3.4, 3.2, 1.8, 1, .3]) +
      ell(8.8, -5.8, 2.6, 1.8, INK, 'transform="rotate(-32 8.8 -5.8)"') +
      stroke('M4.2 -2.8L2.4 -6.6L3.8 -8.4M5.6 -1.8L8.2 .6L9.8 .4M-2.2 1.2L-5 -2.2L-3.6 -4.2M-1 2.6L-1.6 6.4L.2 7.6', .95);
    // человек: стоящая фигура тушью, без лица
    const man = Ci(0, -8.4, 2.3, INK) + P('M-3.3 -5.6C-2.2 -6.4 2.2 -6.4 3.3 -5.6L4.6 1.6L3.5 1.9L2.5 -2.2L2.3 1.6L2.1 9.4L.5 9.4L0 2.6L-.5 9.4L-2.1 9.4L-2.3 1.6L-2.5 -2.2L-3.5 1.9L-4.6 1.6Z', INK);
    const mAt = (sx, s) => bz(sx, s);
    const pf = mAt(-125, .3), pl = mAt(125, .5), ph = mAt(-60, .72);
    g += medal(J[0], J[1], 18, cell, sst(0, .3, u));
    g += medal(pf[0], pf[1], 17.5, fish, sst(.32, .62, u));
    g += medal(pl[0], pl[1], 17.5, liz, sst(.55, .85, u));
    g += medal(ph[0], ph[1], 17.5, man, sst(.8, 1.1, u));
    // точка схождения — огонь порядка
    if (kF > .01) g += G(orderFire(Pt[0], Pt[1], 14.5, u, kF, 'eg_fc3'), '', `opacity="${fxx(clamp(kF * 1.6))}"`);
    // подписи
    const la = sst(1.15, 1.6, u);
    if (la > .01) g += G(cartouche(180, 80, 176, 30) + caps(180, 85.6, 'БОГ ВПЕРЕДИ', 16.5, 2.4), '', `opacity="${fxx(la)}"`);
    const ha = sst(.1, .6, u);
    g += G(caps(180, 42, 'ТЕЙЯР ДЕ ШАРДЕН · 1955', 10.5, 2.2) +
      stroke('M30 38.5L80 38.5M280 38.5L330 38.5', .6) + P('M80 38.5L83 36.5L86 38.5L83 40.5Z', INK) + P('M280 38.5L277 36.5L274 38.5L277 40.5Z', INK) +
      Ci(27, 38.5, 1, INK) + Ci(333, 38.5, 1, INK), '', `opacity="${fxx(ha)}"`);
    return g;
  }

  SCENES.gfx_engraving = function (u, p, d, t) {
    const a1 = 1 - sst(2.8, 3.2, t), a2 = sst(2.8, 3.2, t) * (1 - sst(5.8, 6.2, t)), a3 = sst(5.8, 6.2, t);
    let g = `<g id="gfx-engraving"><defs>
      <filter id="eg_blot" x="0" y="0" width="360" height="640" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".009 .013" numOctaves="4" seed="11"/>
        <feColorMatrix type="matrix" values="0 0 0 0 .5  0 0 0 0 .37  0 0 0 0 .2  1.9 0 0 0 -.82"/></filter>
      <filter id="eg_grain" x="0" y="0" width="360" height="640" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/>
        <feColorMatrix type="matrix" values="0 0 0 0 .36  0 0 0 0 .26  0 0 0 0 .13  2.6 0 0 0 -1.12"/></filter>
      <radialGradient id="eg_edge" cx=".5" cy=".42" r=".75"><stop offset=".6" stop-color="#7a5a30" stop-opacity="0"/><stop offset="1" stop-color="#6e4f28" stop-opacity=".42"/></radialGradient>
      <clipPath id="eg_frame"><rect x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}"/></clipPath>
    </defs>`;
    g += R(-20, -20, 400, 680, PAPER);
    g += R(0, 0, 360, 640, '#000', 'filter="url(#eg_blot)" opacity=".4"');
    g += `<g clip-path="url(#eg_frame)">`;
    if (a1 > .004) g += G(m1(t), '', a1 < .996 ? `opacity="${fxx(a1)}"` : '');
    if (a2 > .004) g += G(m2(t - 3), '', a2 < .996 ? `opacity="${fxx(a2)}"` : '');
    if (a3 > .004) g += G(m3(t - 6), '', a3 < .996 ? `opacity="${fxx(a3)}"` : '');
    g += '</g>';
    // рамка гравюры: толстая и тонкая линии, точки в углах
    g += R(10, 12, 340, 370, 'none', `stroke="${INK}" stroke-width="1.6"`) + R(X0, Y0, X1 - X0, Y1 - Y0, 'none', `stroke="${INK}" stroke-width=".6"`);
    [[12, 14], [348, 14], [12, 376], [348, 376]].forEach(([x, y]) => g += Ci(x, y, 1.3, INK));
    // бумага поверх туши: зерно и потемневшие края листа
    g += R(0, 0, 360, 640, '#000', 'filter="url(#eg_grain)" opacity=".32" style="mix-blend-mode:multiply"');
    g += R(0, 0, 360, 640, 'url(#eg_edge)', 'style="mix-blend-mode:multiply"');
    g += `<text x="-50" y="-50" ${FNT} font-size="10" opacity="0">ЗБТЭ·</text></g>`;
    return g;
  };
})();
