// сцена gfx_stainedglass: пробный дизайн «Витраж» для «Бог ещё не создан» (eps/god_future) — альтернатива точкам и сотам gf_*.
// Рисунок — цветные стёкла (кобальт, рубин, янтарь, изумруд; полупрозрачные, с внутренним свечением и разводами)
// в чёрной свинцовой обводке. Хаос — разбитые осколки; порядок — стёкла складываются в окно-розу из шестиугольников;
// огонь порядка — сияющее белое стекло. Подписи — Montserrat 600 капсом. Важное — y 20…370, ниже тёмные стёкла под субтитры.
// Без лиц, без религиозных фигур и символов: люди — плоские фигуры в плащах, голова — круглое стекло.
// Три момента ролика по времени t (каждый живёт):
//   0–3 с  «Зачем людям боги?» — ночь, семь человек вокруг костра, над ними огонь порядка, к каждому тянется нить;
//   3–6 с  «Чай остывает… энтропия растёт» — чашка с паром, осколки тепла разлетаются, сбоку шкала ЭНТРОПИЯ;
//   6–9 с  «Тейяр де Шарден: Бог Впереди» — древо эволюции (клетка, рыба, ящер, человек) сходится в окно-розу.
//   p.m — 1 | 2 | 3: весь кадр — один момент, его время идёт от начала кадра (u); без p.m — по t, как выше (смена 0,3 с).
// Камеры: общий план z 1; огонь порядка — z 1.5 (oy −190); чашка — z 1.4 (ox −34, oy −70); роза — z 1.6 (oy −170).
(() => {
  const css = document.createElement('style');
  css.textContent = "@font-face{font-family:SGMont;src:url('../fonts/Montserrat[wght].ttf');font-weight:100 900}" +
    '#root:has(#gfx-stainedglass){background:#040308}#root:has(#gfx-stainedglass) #grain{opacity:.025}';
  document.head.appendChild(css);

  const rad = a => a * Math.PI / 180;
  const sstep = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
  const frac = x => x - Math.floor(x);
  // стекло: светлая середина, насыщенный цвет, тёмный край
  const PAL = {
    blue: ['#a9ccff', '#2f66e6', '#0b1d74'],
    ruby: ['#ff9aa4', '#d41c3e', '#5a0618'],
    amber: ['#fff0b8', '#f3a818', '#894600'],
    emer: ['#a8f5cb', '#15a866', '#03462a'],
    violet: ['#d2b0ff', '#6d36c8', '#240a50'],
    white: ['#ffffff', '#fff6dc', '#f4cf78'],
    pale: ['#fff3da', '#e9c995', '#8a6536'],
    mist: ['#ffffff', '#d9e8ff', '#7d9bd0'],
    ember: ['#ffcf86', '#b5491c', '#3c0e04'],
    night: ['#3c52b8', '#18246e', '#070b2c'],
    deep: ['#2b3172', '#121642', '#05061a'],
  };
  const LEAD = '#050407';
  const FONT = 'font-family="SGMont, Mont" font-weight="600"';

  function sgDefs() {
    let g = '<defs>';
    for (const k in PAL) {
      const [l, m, d] = PAL[k];
      g += `<radialGradient id="sg_${k}" cx=".42" cy=".36" r=".8"><stop offset="0" stop-color="${l}"/><stop offset=".5" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></radialGradient>`;
      g += `<radialGradient id="sg_${k}L" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${l}"/><stop offset="1" stop-color="${m}"/></radialGradient>`;
    }
    // разводы стекла (тёмные и светлые пятна по шуму) + мягкое свечение сквозь стекло
    const mott = (dk, lt) => `<feTurbulence type="fractalNoise" baseFrequency=".045 .11" numOctaves="2" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${-dk} 0 0 0 ${f1(dk * .56)}" result="dk"/>
      <feComposite in="dk" in2="SourceGraphic" operator="atop" result="a"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 ${lt} 0 0 ${f1(-lt * .53)}" result="lt"/>
      <feComposite in="lt" in2="a" operator="atop" result="b"/>`;
    g += `<filter id="sg_fx" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">${mott(1.8, 1.8)}
      <feGaussianBlur in="b" stdDeviation="4.5" result="bl"/>
      <feColorMatrix in="bl" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .6 0" result="bl2"/>
      <feMerge><feMergeNode in="bl2"/><feMergeNode in="b"/></feMerge></filter>`;
    g += `<filter id="sg_fxb" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">${mott(1.5, .5)}</filter>`;
    g += '<filter id="sg_tg" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>';
    g += '<filter id="sg_bl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>';
    g += '<radialGradient id="sg_halo"><stop offset="0" stop-color="#fffaea" stop-opacity=".95"/><stop offset=".22" stop-color="#ffe9b0" stop-opacity=".38"/><stop offset=".55" stop-color="#ffcf70" stop-opacity=".1"/><stop offset="1" stop-color="#ffc060" stop-opacity="0"/></radialGradient>';
    g += '<radialGradient id="sg_core"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".4" stop-color="#fffbe8" stop-opacity=".75"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient>';
    g += '<radialGradient id="sg_fire"><stop offset="0" stop-color="#ffb347" stop-opacity=".75"/><stop offset=".4" stop-color="#ff6a24" stop-opacity=".22"/><stop offset="1" stop-color="#ff4a10" stop-opacity="0"/></radialGradient>';
    g += '<radialGradient id="sg_vig" cx=".5" cy=".36" r=".78"><stop offset=".5" stop-color="#040308" stop-opacity="0"/><stop offset="1" stop-color="#040308" stop-opacity=".8"/></radialGradient>';
    g += '<linearGradient id="sg_bot" gradientUnits="userSpaceOnUse" x1="0" y1="326" x2="0" y2="396"><stop offset="0" stop-color="#040308" stop-opacity="0"/><stop offset="1" stop-color="#040308" stop-opacity=".9"/></linearGradient>';
    return g + '</defs>';
  }

  // ---------- геометрия
  const polyD = pts => 'M' + pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L') + 'Z';
  const hexPts = (cx, cy, r, a0 = -90) => [0, 1, 2, 3, 4, 5].map(i => [cx + r * Math.cos(rad(a0 + 60 * i)), cy + r * Math.sin(rad(a0 + 60 * i))]);
  const ellD = (x, y, rx, ry) => `M${f1(x - rx)} ${f1(y)}A${f1(rx)} ${f1(ry)} 0 1 0 ${f1(x + rx)} ${f1(y)}A${f1(rx)} ${f1(ry)} 0 1 0 ${f1(x - rx)} ${f1(y)}Z`;
  const circD = (x, y, r) => ellD(x, y, r, r);
  const bez = (Q, s) => { const a = 1 - s; return [0, 1].map(k => a * a * a * Q[0][k] + 3 * a * a * s * Q[1][k] + 3 * a * s * s * Q[2][k] + s * s * s * Q[3][k]); };
  const bezD = (Q, s1, n = 26) => { let d = ''; for (let k = 0; k <= n; k++) { const p = bez(Q, s1 * k / n); d += (k ? 'L' : 'M') + f1(p[0]) + ' ' + f1(p[1]); } return d; };
  const rotP = (p, c, a) => { const ca = Math.cos(a), sa = Math.sin(a), x = p[0] - c[0], y = p[1] - c[1]; return [c[0] + x * ca - y * sa, c[1] + x * sa + y * ca]; };
  function hexRing(k) {
    if (!k) return [[0, 0, 1]];
    const dirs = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
    let q = -k, r = k; const res = [];
    for (let i = 0; i < 6; i++) for (let j = 0; j < k; j++) { res.push([q, r, j === 0 ? 1 : 0]); q += dirs[i][0]; r += dirs[i][1]; }
    return res;
  }
  // кольцо из сегментов эллипса (rx0=0 — клинья)
  function ringPts(cx, cy, rx0, ry0, rx1, ry1, aa, ab) {
    const pts = [];
    for (let s = 0; s <= 4; s++) { const a = rad(mix(aa, ab, s / 4)); pts.push([cx + rx1 * Math.cos(a), cy + ry1 * Math.sin(a)]); }
    for (let s = 4; s >= 0; s--) { const a = rad(mix(aa, ab, s / 4)); pts.push([cx + rx0 * Math.cos(a), cy + ry0 * Math.sin(a)]); }
    return pts;
  }

  // ---------- витражный слой: стёкла под фильтром, свинец поверх
  const Lay = () => ({ s: '', f: '', l: {} });
  function gl(ly, d, c, op = 1, w = 2.4) {
    ly.f += `<path d="${d}" fill="url(#sg_${c})"${op < .999 ? ` opacity="${f1(clamp(op))}"` : ''}/>`;
    if (w > 0) (ly.l[w] = ly.l[w] || []).push(d);
  }
  const lead = (ly, d, w = 1.6) => (ly.l[w] = ly.l[w] || []).push(d);
  // стеклянная полоса (ветка, ручка): свинец снизу, стекло поверх
  function strip(ly, d, c, w, op = 1) {
    ly.s += `<path d="${d}" fill="none" stroke="${LEAD}" stroke-width="${f1(w + 2.6)}" stroke-linecap="round" stroke-linejoin="round"${op < .999 ? ` opacity="${f1(clamp(op))}"` : ''}/>`;
    ly.f += `<path d="${d}" fill="none" stroke="${PAL[c][1]}" stroke-width="${f1(w)}" stroke-linecap="round" stroke-linejoin="round"${op < .999 ? ` opacity="${f1(clamp(op))}"` : ''}/>` +
      `<path d="${d}" fill="none" stroke="${PAL[c][0]}" stroke-width="${f1(w * .34)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(.6 * clamp(op))}"/>`;
  }
  function out(ly, fx = 'sg_fx', tr = '', extra = '') {
    let s = ly.s + `<g filter="url(#${fx})">${ly.f}</g>`;
    for (const w in ly.l) {
      const D = ly.l[w].join('');
      s += `<path d="${D}" fill="none" stroke="${LEAD}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>` +
        `<path d="${D}" fill="none" stroke="#9a94a6" stroke-opacity=".26" stroke-width="${f1(w * .24)}" stroke-linejoin="round"/>`;
    }
    return (tr || extra) ? G(s, tr, extra) : s;
  }
  // фон: неровная сетка стёкол (четырёхугольники, часть — пополам по диагонали)
  function panes(seed, colF, x0 = -8, y0 = -8, x1 = 368, y1 = 660, nc = 5, nr = 11) {
    const cw = (x1 - x0) / nc, ch = (y1 - y0) / nr, P0 = [];
    for (let j = 0; j <= nr; j++) {
      const row = [];
      for (let i = 0; i <= nc; i++) {
        const ex = i === 0 || i === nc, ey = j === 0 || j === nr;
        row.push([x0 + i * cw + (ex ? 0 : (hash(seed + i * 7.1 + j * 13.3) - .5) * .7 * cw),
          y0 + j * ch + (ey ? 0 : (hash(seed + i * 3.7 + j * 5.9 + .5) - .5) * .6 * ch)]);
      }
      P0.push(row);
    }
    const ly = Lay();
    for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
      const a = P0[j][i], b = P0[j][i + 1], c = P0[j + 1][i + 1], d = P0[j + 1][i], h = hash(seed * .37 + i * 1.9 + j * 2.7);
      const cells = h < .24 ? [[a, b, c], [a, c, d]] : h < .48 ? [[a, b, d], [b, c, d]] : [[a, b, c, d]];
      cells.forEach((pts, n) => {
        const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
        const [col, op] = colF(hash(seed + i * 4.3 + j * 8.1 + n * 2.2), cx, cy);
        gl(ly, polyD(pts), col, op, 2.2);
      });
    }
    return out(ly, 'sg_fxb');
  }
  function label(x, y, txt, size, op = 1, ls = 1.2, col = '#fff6e2', glow = '#ffcf70') {
    if (op < .01) return '';
    const a = `x="${f1(x)}" y="${f1(y)}" font-size="${size}" ${FONT} letter-spacing="${ls}" text-anchor="middle"`;
    return `<g opacity="${f1(clamp(op))}"><text ${a} fill="${glow}" opacity=".6" filter="url(#sg_tg)">${txt}</text>` +
      `<text ${a} fill="${col}" stroke="${LEAD}" stroke-width="${f1(size * .17)}" stroke-linejoin="round" paint-order="stroke">${txt}</text></g>`;
  }
  const screen = 'style="mix-blend-mode:screen"';

  // огонь порядка: белое стекло-шестиугольник, венец из шести, лучи-осколки; дышит и медленно вращает лучи
  function orderFire(cx, cy, s, t, op = 1) {
    const br = .5 + .5 * Math.sin(t * 2.2);
    let g = Ci(cx, cy, 128 * s, 'url(#sg_halo)', `opacity="${f1(op * (.55 + .14 * br))}" ${screen}`);
    const ry = Lay();
    for (let k = 0; k < 12; k++) {
      const a = rad(k * 30 + 15 + t * 7), L = (k % 2 ? 46 : 62) * s, r0 = 29 * s, wv = (k % 2 ? 4.6 : 6.6) * s;
      const ax = Math.cos(a), ay = Math.sin(a), nx = -ay, ny = ax;
      gl(ry, polyD([[cx + ax * r0 + nx * wv, cy + ay * r0 + ny * wv], [cx + ax * L, cy + ay * L], [cx + ax * r0 - nx * wv, cy + ay * r0 - ny * wv], [cx + ax * (r0 - 5 * s), cy + ay * (r0 - 5 * s)]]),
        k % 2 ? 'amber' : 'white', .78 + .2 * Math.sin(t * 3 + k), 1.6);
    }
    g += out(ry, 'sg_fx', '', `opacity="${f1(op)}"`);
    const hx = Lay(), R = 10 * s;
    for (let k = 0; k < 6; k++) { const a = rad(60 * k); gl(hx, polyD(hexPts(cx + Math.sqrt(3) * R * Math.cos(a), cy + Math.sqrt(3) * R * Math.sin(a), R)), 'white', .82 + .16 * Math.sin(t * 2.6 - k), 2.2); }
    gl(hx, polyD(hexPts(cx, cy, R)), 'whiteL', 1, 2.2);
    g += out(hx, 'sg_fx', '', `opacity="${f1(op)}"`);
    g += Ci(cx, cy, 15 * s, 'url(#sg_core)', `opacity="${f1(op * (.75 + .25 * br))}" ${screen}`);
    return g;
  }

  // лента вдоль ломаной C (ширина w0 → w1) — рука, ветка: замкнутое стекло со свинцом по краю
  function ribbon(C, w0, w1) {
    const L = [], Rr = [];
    C.forEach((p, k) => {
      const a = C[Math.max(0, k - 1)], b = C[Math.min(C.length - 1, k + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      const w = mix(w0, w1, k / (C.length - 1)) / 2, nx = -dy / l * w, ny = dx / l * w;
      L.push([p[0] + nx, p[1] + ny]); Rr.unshift([p[0] - nx, p[1] - ny]);
    });
    return polyD(L.concat(Rr));
  }
  // сидящий человек (локально: низ в 0; сбоку — лицом и светом к костру по +x; front — лицом к нам), без лица
  function person(x, y, H, side, col, t, i, fl, front) {
    const ly = Lay(), h = H, F = v => f1(v * h), lop = .55 + .35 * fl;
    const reach = .02 * Math.sin(t * 1.3 + i * 2.2);
    if (front) {
      gl(ly, `M${F(-.42)} 0Q0 ${F(-.32)} ${F(.42)} 0Q0 ${F(.08)} ${F(-.42)} 0Z`, col, .95, 2.4);
      gl(ly, `M${F(-.3)} ${F(.012)}Q0 ${F(-.12)} ${F(.3)} ${F(.012)}Q0 ${F(.07)} ${F(-.3)} ${F(.012)}Z`, col + 'L', lop, 1.8);
      gl(ly, `M${F(-.2)} ${F(-.12)}C${F(-.25)} ${F(-.32)} ${F(-.22)} ${F(-.52)} ${F(-.12)} ${F(-.6)}Q0 ${F(-.67)} ${F(.12)} ${F(-.6)}C${F(.22)} ${F(-.52)} ${F(.25)} ${F(-.32)} ${F(.2)} ${F(-.12)}Q0 ${F(-.05)} ${F(-.2)} ${F(-.12)}Z`, col, .93, 2.4);
      [-1, 1].forEach(sd => gl(ly, ribbon([[sd * .15 * h, -.53 * h], [sd * .23 * h, -.34 * h], [sd * .07 * h, -.19 * h]], .085 * h, .07 * h), col + 'L', .5 + .3 * fl, 1.8));
      gl(ly, circD(0, -.18 * h, .045 * h), 'pale', 1, 1.4);
      gl(ly, circD(0, -.77 * h, .125 * h), 'pale', 1, 2.3);
      gl(ly, `M${F(-.1)} ${F(-.7)}Q0 ${F(-.62)} ${F(.1)} ${F(-.7)}Q0 ${F(-.66)} ${F(-.1)} ${F(-.7)}Z`, 'amberL', lop, 1);
    } else {
      gl(ly, `M${F(-.24)} 0L${F(.36)} 0C${F(.46)} ${F(-.02)} ${F(.47)} ${F(-.17)} ${F(.37)} ${F(-.22)}C${F(.24)} ${F(-.27)} ${F(.02)} ${F(-.21)} ${F(-.12)} ${F(-.15)}C${F(-.22)} ${F(-.11)} ${F(-.27)} ${F(-.04)} ${F(-.24)} 0Z`, col, .95, 2.4);
      gl(ly, `M${F(.37)} ${F(-.22)}C${F(.47)} ${F(-.17)} ${F(.46)} ${F(-.02)} ${F(.36)} 0L${F(.29)} 0C${F(.37)} ${F(-.06)} ${F(.37)} ${F(-.15)} ${F(.29)} ${F(-.21)}Z`, col + 'L', lop, 1.8);
      gl(ly, `M${F(-.2)} ${F(-.1)}C${F(-.25)} ${F(-.3)} ${F(-.21)} ${F(-.5)} ${F(-.09)} ${F(-.6)}Q${F(.04)} ${F(-.67)} ${F(.14)} ${F(-.58)}C${F(.2)} ${F(-.46)} ${F(.2)} ${F(-.28)} ${F(.16)} ${F(-.14)}Q${F(-.02)} ${F(-.06)} ${F(-.2)} ${F(-.1)}Z`, col, .93, 2.4);
      gl(ly, `M${F(.14)} ${F(-.58)}C${F(.2)} ${F(-.46)} ${F(.2)} ${F(-.28)} ${F(.16)} ${F(-.14)}L${F(.08)} ${F(-.12)}C${F(.12)} ${F(-.3)} ${F(.12)} ${F(-.45)} ${F(.06)} ${F(-.61)}Q${F(.1)} ${F(-.61)} ${F(.14)} ${F(-.58)}Z`, col + 'L', lop, 1.8);
      lead(ly, `M${F(-.1)} ${F(-.56)}C${F(-.16)} ${F(-.4)} ${F(-.16)} ${F(-.24)} ${F(-.1)} ${F(-.12)}`, 1.4);
      const hx = .36 + reach, hy = -.31 - reach * .6;
      gl(ly, ribbon([[.05 * h, -.53 * h], [.2 * h, -.43 * h], [hx * h, hy * h]], .09 * h, .065 * h), col + 'L', .5 + .35 * fl, 1.8);
      gl(ly, circD((hx + .02) * h, (hy + .005) * h, .045 * h), 'pale', 1, 1.4);
      gl(ly, circD(.04 * h, -.77 * h, .125 * h), 'pale', 1, 2.3);
      gl(ly, `M${F(.09)} ${F(-.886)}A${F(.125)} ${F(.125)} 0 0 1 ${F(.12)} ${F(-.672)}Q${F(.07)} ${F(-.77)} ${F(.09)} ${F(-.886)}Z`, 'amberL', lop, 1.1);
    }
    const sw = 1.2 * noise1(t * .55 + i * 3.1), by = 1 + .012 * Math.sin(t * 2.1 + i * 1.7);
    return out(ly, 'sg_fx', `translate(${f1(x)} ${f1(y)}) scale(${side} ${f1(by)}) rotate(${f1(sw)})`);
  }

  // ===================== 1. ЗАЧЕМ ЛЮДЯМ БОГИ? =====================
  const RING = [-90, -38, -142, 12, 168, 56, 124];
  const RCOL = ['blue', 'ruby', 'emer', 'violet', 'ruby', 'emer', 'blue'];
  const FX = 180, FY = 300, OX = 180, OY = 134;
  function M1(lt, t) {
    const fl = clamp(.82 + .14 * noise1(t * 7) + .07 * noise1(t * 17.3));
    let g = panes(11, (h, cx, cy) => {
      if (cy < 252) { const k = mix(.62, 1, clamp(cy / 252)); return h < .45 ? ['night', .82 * k] : h < .8 ? ['deep', .9 * k] : ['blue', .4 * k]; }
      return h < .62 ? ['deep', .85] : ['emer', .28];
    });
    // звёзды — осколки стекла
    const st = Lay();
    for (let i = 0; i < 22; i++) {
      const x = 14 + hash(i * 5.3 + 1) * 332, y = 74 + hash(i * 2.9 + 4) * 140;
      if (Math.abs(x - OX) < 78 && y < 205) continue;
      const r = 1.8 + 1.8 * hash(i * 7.7), tw = .4 + .6 * Math.pow(.5 + .5 * Math.sin(t * (1.4 + hash(i)) * 2 + i * 2.1), 2);
      gl(st, polyD([[x, y - r * 1.7], [x + r, y], [x, y + r * 1.7], [x - r, y]]), hash(i * 3.1) < .55 ? 'white' : 'amber', tw, 1.2);
    }
    g += out(st);
    // нити от огня порядка к каждому
    const P = RING.map((a, i) => { const x = FX + 122 * Math.cos(rad(a)), y = 292 + 36 * Math.sin(rad(a)), H = (46 + (y - 256) * .45) * 1.12; return { i, x, y, H, side: x < FX - 1 ? 1 : -1, front: Math.abs(x - FX) < 1, hx: x + (Math.abs(x - FX) < 1 ? 0 : .04 * H * (x < FX - 1 ? 1 : -1)), hy: y - .9 * H }; });
    const grow = mix(.3, 1, eout(lin(lt, 0, 1.1)));
    let th = '', bd = '';
    P.forEach(q => {
      const ex = mix(OX, q.hx, grow), ey = mix(OY, q.hy, grow);
      th += `<path d="M${OX} ${OY}L${f1(ex)} ${f1(ey)}" stroke="#ffd98a" stroke-width="3.2" opacity=".14" fill="none"/>` +
        `<path d="M${OX} ${OY}L${f1(ex)} ${f1(ey)}" stroke="#fff0c8" stroke-width=".9" opacity=".7" fill="none"/>`;
      for (let b = 0; b < 2; b++) {
        const u = frac(lt * .55 + q.i * .143 + b * .5), k = mix(.3, 1, u);
        if (k > grow) continue;
        const bx = mix(OX, q.hx, k), by = mix(OY, q.hy, k);
        bd += Ci(bx, by, 5, 'url(#sg_core)', `opacity="${f1(.7 * Math.sin(Math.PI * u))}" ${screen}`) + Ci(bx, by, 1.3, '#fffdf2', `opacity="${f1(.9 * Math.sin(Math.PI * u))}"`);
      }
    });
    g += Ci(OX, OY, 140, 'url(#sg_halo)', `opacity=".28" ${screen}`);
    g += th;
    g += orderFire(OX, OY, 1, t);
    // земля в свете костра — кольца стёкол
    const gr = Lay();
    for (let k = 0; k < 12; k++) gl(gr, polyD(ringPts(FX, 298, 98, 30, 160, 52, k * 30 + 8, k * 30 + 38)), k % 2 ? 'ember' : 'deep', k % 2 ? .38 : .7, 2.2);
    for (let k = 0; k < 9; k++) gl(gr, polyD(ringPts(FX, 298, 40, 12.5, 98, 30, k * 40 + 20, k * 40 + 60)), 'ember', (.58 + .3 * hash(k * 2.7)) * (.7 + .3 * fl), 2.2);
    gl(gr, ellD(FX, 298, 40, 12.5), 'ember', .95, 2.2);
    g += out(gr);
    g += `<ellipse cx="${FX}" cy="298" rx="${f1(120 * (.92 + .08 * fl))}" ry="${f1(40 * (.92 + .08 * fl))}" fill="url(#sg_fire)" opacity="${f1(.6 * fl)}" ${screen}/>`;
    // люди за огнём
    const order = P.slice().sort((a, b) => a.y - b.y);
    order.filter(q => q.y <= FY).forEach(q => { g += person(q.x, q.y, q.H, q.side, RCOL[q.i], t, q.i, fl, q.front); });
    // костёр: поленья, три языка пламени, искры
    const fi = Lay();
    strip(fi, `M${FX - 20} 306L${FX + 18} 296`, 'ember', 5.5); strip(fi, `M${FX - 18} 296L${FX + 20} 306`, 'ember', 5.5);
    const tongue = (w, hh, sw, dy = 0, dx = 0) => { const bx = FX + dx, by = 302 + dy; return `M${f1(bx - w / 2)} ${f1(by)}C${f1(bx - w / 2)} ${f1(by - hh * .45)} ${f1(bx - w * .12 + sw * .5)} ${f1(by - hh * .66)} ${f1(bx + sw)} ${f1(by - hh)}` +
      `C${f1(bx + w * .16 + sw * .5)} ${f1(by - hh * .62)} ${f1(bx + w / 2)} ${f1(by - hh * .42)} ${f1(bx + w / 2)} ${f1(by)}Q${f1(bx)} ${f1(by + 4)} ${f1(bx - w / 2)} ${f1(by)}Z`; };
    gl(fi, tongue(15, 22 + 6 * noise1(t * 5 + 3), 4 * noise1(t * 3.3 + 1), 1, -13), 'ruby', .92, 2);
    gl(fi, tongue(14, 20 + 6 * noise1(t * 5.4 + 8), 4 * noise1(t * 3.1 + 6), 1, 13), 'ruby', .92, 2);
    gl(fi, tongue(30, 40 + 7 * noise1(t * 4.2), 6 * noise1(t * 2.7 + 2)), 'ruby', .95, 2.2);
    gl(fi, tongue(20, 29 + 5 * noise1(t * 5.1 + 4), 4 * noise1(t * 3.5 + 5), -1), 'amber', 1, 2);
    gl(fi, tongue(10, 16 + 4 * noise1(t * 6.3 + 9), 2.5 * noise1(t * 4.4 + 7), -2), 'whiteL', 1, 1.6);
    for (let k = 0; k < 9; k++) {
      const u = frac(t * .7 + hash(k * 3.3)), x = FX + (hash(k * 1.7) - .5) * 30 + 8 * Math.sin(t * 2 + k), y = 268 - u * 70, r = 1.6 + 1.2 * hash(k * 5.5);
      gl(fi, polyD([[x, y - r * 1.6], [x + r, y], [x, y + r * 1.6], [x - r, y]]), 'amber', Math.sin(Math.PI * u) * .9, 1);
    }
    g += out(fi);
    g += Ci(FX, 282, 70 * (.9 + .1 * fl), 'url(#sg_fire)', `opacity="${f1(.75 * fl)}" ${screen}`);
    order.filter(q => q.y > FY).forEach(q => { g += person(q.x, q.y, q.H, q.side, RCOL[q.i], t, q.i, fl, q.front); });
    g += bd;
    g += label(180, 58, 'ЗАЧЕМ ЛЮДЯМ БОГИ?', 22, mix(.35, 1, eout(lin(lt, 0, .4))), 1.4);
    return g;
  }

  // ===================== 2. ЧАЙ ОСТЫВАЕТ, ЭНТРОПИЯ РАСТЁТ =====================
  const CX = 146, RIM = 230;
  const LB = [[CX - 48, RIM], [CX - 47, RIM + 34], [CX - 34, RIM + 60], [CX - 18, RIM + 66]];
  const RB = LB.map(p => [2 * CX - p[0], p[1]]);
  function M2(lt, t) {
    const cool = ease(lin(lt, 0, 3.2)), hot = 1 - .72 * cool;
    let g = panes(23, (h, cx, cy) => {
      if (cy > 304) return h < .55 ? ['ember', .26] : ['deep', .8];
      return h < .5 ? ['deep', .9] : h < .82 ? ['night', .72] : ['violet', .34];
    });
    g += Ci(CX, 244, 160, 'url(#sg_fire)', `opacity="${f1(.5 * hot)}" ${screen}`);
    // осколки тепла: вылетают из чашки во все стороны, с возрастом остывают (янтарь → рубин → кобальт)
    const sh = Lay();
    for (let i = 0; i < 84; i++) {
      const s0 = -1.3 + i * .043, age = lt - s0;
      if (age <= 0) continue;
      const a = rad(i * 137.508 + 25 * hash(i * 1.3)), v = 22 + 40 * hash(i * 2.1);
      const d = 52 + v * Math.pow(age, .8);
      const x = CX + Math.cos(a) * d * 1.05, y = 245 + Math.sin(a) * d * .9 - 7 * age;
      const op = eout(lin(age, 0, .3)) * clamp((y - 16) / 22) * clamp((360 - y) / 26) * clamp((x + 4) / 18) * clamp((362 - x) / 18);
      if (op < .02) continue;
      const tp = clamp(1 - age / 1.9), col = tp > .62 ? 'amber' : tp > .3 ? 'ruby' : 'blue';
      const sz = 4.2 + 6.2 * hash(i * 4.4) * (1 - .3 * clamp(age / 3)), sp = a + age * (hash(i * 6.6) - .5) * 3.4, nv = hash(i * 7.9) < .5 ? 3 : 4;
      const pts = [];
      for (let k = 0; k < nv; k++) { const aa = sp + k * 2 * Math.PI / nv + (hash(i * 3 + k) - .5) * 1.1, rr = sz * (.55 + .7 * hash(i * 5 + k * 2.3)) * (k === 0 ? 1.5 : 1); pts.push([x + rr * Math.cos(aa), y + rr * Math.sin(aa)]); }
      gl(sh, polyD(pts), col, op * (.8 + .2 * tp), 1.3);
    }
    g += out(sh);
    // стол
    const tb = Lay();
    [[-8, 54], [54, 128], [128, 214], [214, 290], [290, 368]].forEach(([a, b], k) => gl(tb, polyD([[a, 304], [b, 304], [b + (b - 180) * .12, 360], [a + (a - 180) * .12, 360]]), k % 2 ? 'ember' : 'amber', k % 2 ? .42 : .26, 2.2));
    g += out(tb);
    // ручка — за чашкой
    const hd = Lay();
    strip(hd, `M${CX + 44} ${RIM + 12}C${CX + 74} ${RIM + 6} ${CX + 80} ${RIM + 46} ${CX + 40} ${RIM + 50}`, 'blue', 7.5);
    const CT = `translate(${CX} 302) scale(1.15) translate(${-CX} -302)`;
    g += out(hd, 'sg_fx', CT);
    // блюдце, чашка, поясок, блик, чай
    const cp = Lay();
    gl(cp, `M${CX - 76} 300Q${CX} 284 ${CX + 76} 300Q${CX} 322 ${CX - 76} 300Z`, 'ruby', .95, 2.4);
    gl(cp, ellD(CX, 298, 38, 6), 'rubyL', .5, 1.8);
    const body = `M${LB[0][0]} ${LB[0][1]}C${LB[1][0]} ${LB[1][1]} ${LB[2][0]} ${LB[2][1]} ${LB[3][0]} ${LB[3][1]}L${RB[3][0]} ${RB[3][1]}C${RB[2][0]} ${RB[2][1]} ${RB[1][0]} ${RB[1][1]} ${RB[0][0]} ${RB[0][1]}A48 9 0 0 1 ${LB[0][0]} ${LB[0][1]}Z`;
    gl(cp, body, 'blue', .95, 2.6);
    const band = (s1, s2) => {
      const pts = [];
      for (let k = 0; k <= 5; k++) pts.push(bez(LB, mix(s1, s2, k / 5)));
      const pb = bez(LB, s2), pr = bez(RB, s2), hw = CX - pb[0];
      for (let k = 1; k < 8; k++) pts.push([mix(pb[0], pr[0], k / 8), pb[1] + 8.5 * (hw / 48) * Math.sin(Math.PI * k / 8)]);
      for (let k = 5; k >= 0; k--) pts.push(bez(RB, mix(s1, s2, k / 5)));
      const pa = bez(LB, s1), pc = bez(RB, s1), hw1 = CX - pa[0];
      for (let k = 7; k >= 1; k--) pts.push([mix(pa[0], pc[0], k / 8), pa[1] + 8.5 * (hw1 / 48) * Math.sin(Math.PI * k / 8)]);
      return polyD(pts);
    };
    gl(cp, band(.34, .5), 'amber', .95, 2.2);
    const hl = []; for (let k = 0; k <= 5; k++) { const p = bez(LB, mix(.08, .78, k / 5)); hl.push([p[0] + 6, p[1] + 3]); }
    for (let k = 5; k >= 0; k--) { const p = bez(LB, mix(.08, .78, k / 5)); hl.push([p[0] + 11 + 3 * Math.sin(Math.PI * k / 5), p[1] + 3]); }
    gl(cp, polyD(hl), 'mist', .55, 1.6);
    gl(cp, ellD(CX, RIM, 48, 9), 'blue', 1, 2.4);
    gl(cp, ellD(CX, RIM + 1, 43, 7), 'ember', 1, 2);
    gl(cp, ellD(CX, RIM + 1, 43, 7), 'amber', .3 + .7 * hot, 0);
    gl(cp, ellD(CX - 8, RIM, 18, 2.6), 'whiteL', .45 * hot, 0);
    g += out(cp, 'sg_fx', CT);
    // пар — три стеклянные ленты, колышутся и тают по мере остывания
    const st = Lay();
    [[CX - 20, 0], [CX + 1, 2.1], [CX + 21, 4.4]].forEach(([x0, ph], r) => {
      const C = [];
      for (let k = 0; k <= 9; k++) C.push([x0 + (5 + 9 * k / 9) * Math.sin(k * .78 - lt * 2.3 + ph) * (k / 9 + .2) + k * 1.2 * (r - 1), RIM - 6 - k * 13.5 - 3 * Math.sin(lt * 1.7 + r)]);
      const hw = k => 5.4 * (1 - k / 11) + .9;
      [[0, 3], [3, 6], [6, 9]].forEach(([a, b], n) => {
        const pts = [];
        for (let k = a; k <= b; k++) pts.push([C[k][0] - hw(k), C[k][1]]);
        for (let k = b; k >= a; k--) pts.push([C[k][0] + hw(k), C[k][1]]);
        gl(st, polyD(pts), 'mist', (.72 - n * .16) * (1 - .6 * cool), 1.5);
      });
    });
    g += out(st, 'sg_fx', CT);
    // шкала энтропии
    const SX = 316, Y0 = 106, Y1 = 334, NC = 10, CH = (Y1 - Y0) / NC;
    const lv = NC * mix(.22, .92, ease(lin(lt, .1, 3.1)));
    const sc = Lay();
    gl(sc, polyD([[SX - 15, Y0 - 4], [SX + 15, Y0 - 4], [SX + 15, Y1 + 4], [SX - 15, Y1 + 4]]), 'deep', .95, 3);
    for (let k = 0; k < NC; k++) {
      const y1 = Y1 - k * CH, y0 = y1 - CH, on = clamp(lv - k);
      const col = k < 3 ? 'emer' : k < 6 ? 'amber' : 'ruby';
      gl(sc, polyD([[SX - 11, y0 + 1.5], [SX + 11, y0 + 1.5], [SX + 11, y1 - 1.5], [SX - 11, y1 - 1.5]]), on > .01 ? col : 'night', on > .01 ? .35 + .62 * on : .55, 1.8);
    }
    const ap = .55 + .45 * Math.sin(t * 5);
    gl(sc, polyD([[SX, Y0 - 22 - 2 * ap], [SX + 10, Y0 - 9], [SX - 10, Y0 - 9]]), 'ruby', .6 + .4 * ap, 1.8);
    g += Ci(SX, Y1 - lv * CH, 30, 'url(#sg_fire)', `opacity="${f1(.55 + .2 * Math.sin(t * 6))}" ${screen}`);
    g += out(sc);
    g += label(SX - 2, Y0 - 32, 'ЭНТРОПИЯ', 12, mix(.4, 1, eout(lin(lt, 0, .4))), 1.3);
    return g;
  }

  // ===================== 3. ТЕЙЯР ДЕ ШАРДЕН: БОГ ВПЕРЕДИ =====================
  const RX = 180, RY = 154, HR = 10.2, RO = 50, RO2 = 60;
  const ringPt = a => [RX + RO2 * Math.cos(rad(a)), RY + RO2 * Math.sin(rad(a))];
  const FK = [180, 334], FA = [148, 314], FB = [213, 316];
  // ветви эволюции: от развилок — к оправе розы (кривые Безье); цвет; рыба на внешней левой, ящер — на внешней правой, человек — в центре
  const LIN = [[FA, [82, 294], [86, 228], ringPt(126)], [FA, [124, 282], [150, 240], ringPt(103)], [FK, [176, 300], [184, 252], ringPt(90)],
    [FB, [236, 284], [210, 240], ringPt(77)], [FB, [280, 296], [276, 226], ringPt(54)]];
  const LCOL = ['emer', 'amber', 'emer', 'amber', 'emer'];
  const MED = [{ x: 180, y: 352, s: -1, k: 'cell' }, { l: 0, s: .3, k: 'fish' }, { l: 4, s: .5, k: 'lizard' }, { l: 2, s: .8, k: 'human' }];
  const TWIG = [[0, .14, -24, 6], [0, .6, -24, -6], [1, .46, -14, -14], [2, .42, -16, -8], [3, .5, 16, -12], [4, .24, 24, 4], [4, .72, 22, -4]];
  function icon(ly, k, x = 0, y = 0) {
    if (k === 'cell') {
      gl(ly, circD(x, y, 8.4), 'emer', 1, 1.6); gl(ly, circD(x + 1.4, y - 1, 3.4), 'amberL', 1, 1.3);
      gl(ly, circD(x - 4, y + 3, 1.3), 'white', .9, 0); gl(ly, circD(x + 4.2, y + 4, 1), 'white', .8, 0);
    } else if (k === 'fish') {
      gl(ly, `M${x - 6} ${y}Q${x + 1} ${y - 7.5} ${x + 9} ${y}Q${x + 1} ${y + 7.5} ${x - 6} ${y}Z`, 'amber', 1, 1.5);
      gl(ly, polyD([[x - 6, y], [x - 11, y - 5.5], [x - 10, y + 5.5]]), 'amberL', 1, 1.4);
      lead(ly, `M${x + 3.5} ${y - 4.6}Q${x + 1.8} ${y} ${x + 3.5} ${y + 4.6}`, 1.1);
    } else if (k === 'lizard') {
      [[3.5, -1.8, 5.6, -6, 8.2, -7], [3.5, 1.8, 5.6, 6, 8.2, 7], [-3.6, -1.8, -5.2, -6, -2.6, -7.8], [-3.6, 1.8, -5.2, 6, -2.6, 7.8]].forEach(([a, b, c, d, e, f]) =>
        strip(ly, `M${x + a} ${y + b}L${x + c} ${y + d}L${x + e} ${y + f}`, 'emer', 1.7));
      gl(ly, ribbon([[x - 13.5, y + 6.5], [x - 12.6, y + 2.6], [x - 10, y + .4], [x - 6, y]], 1.2, 3.6), 'emer', 1, 1.3);
      gl(ly, ellD(x, y, 7, 3.3), 'emer', 1, 1.5);
      gl(ly, ellD(x + 8.6, y, 3.3, 2.5), 'emerL', 1, 1.3);
    } else {
      gl(ly, circD(x, y - 7.5, 2.9), 'pale', 1, 1.3);
      gl(ly, polyD([[x - 3.6, y - 3.6], [x + 3.6, y - 3.6], [x + 2.6, y + 3.6], [x - 2.6, y + 3.6]]), 'amber', 1, 1.3);
      strip(ly, `M${x - 1.6} ${y + 4}L${x - 2.6} ${y + 10}`, 'amber', 1.9); strip(ly, `M${x + 1.6} ${y + 4}L${x + 2.6} ${y + 10}`, 'amber', 1.9);
      strip(ly, `M${x - 4} ${y - 2.4}L${x - 6.6} ${y + 3.6}`, 'amber', 1.6); strip(ly, `M${x + 4} ${y - 2.4}L${x + 6.6} ${y + 3.6}`, 'amber', 1.6);
    }
  }
  function M3(lt, t) {
    let g = panes(37, (h, cx, cy) => h < .45 ? ['deep', .9] : h < .75 ? ['violet', .4] : h < .9 ? ['night', .7] : ['blue', .3]);
    const br = .5 + .5 * Math.sin(t * 2.4);
    g += Ci(RX, RY, 170, 'url(#sg_halo)', `opacity="${f1(.32 + .08 * br)}" ${screen}`);
    // окно-роза: тёмный диск, соты собираются из осколков, кольцо-оправа
    const dq = ease(lin(lt, 0, .5));
    const dk = Lay();
    for (let k = 0; k < 12; k++) gl(dk, polyD(ringPts(RX, RY, 0, 0, RO, RO, k * 30, k * 30 + 30)), k % 2 ? 'night' : 'deep', .95 * dq, 1.8);
    g += out(dk, 'sg_fxb');
    const hx = Lay();
    let idx = 0;
    for (let ring = 0; ring <= 2; ring++) hexRing(ring).forEach(([q, r, corner]) => {
      const tx = RX + Math.sqrt(3) * HR * (q + r / 2), ty = RY + 1.5 * HR * r, hh = hash(idx * 3.7 + 1.1);
      const d0 = ring * .3 + hh * .28, qq = eout(lin(lt, d0 - .15, d0 + .85));
      const ang = ring ? Math.atan2(ty - RY, tx - RX) : rad(-90 + 50 * hh);
      const far = (1 - qq) * (120 + 70 * hh);
      const c = [tx + Math.cos(ang + .6 * (hh - .5)) * far, ty + Math.sin(ang + .6 * (hh - .5)) * far];
      const pts = hexPts(c[0], c[1], HR).map(p => rotP(p, c, (1 - qq) * (hh - .5) * 5));
      const wave = .82 + .18 * Math.sin(t * 3.2 - ring * 1.3 + idx * .2);
      const col = ring === 0 ? 'whiteL' : ring === 1 ? 'amber' : corner ? 'ruby' : 'blue';
      gl(hx, polyD(pts), col, Math.pow(qq, .6) * (ring ? wave : 1), 2.2);
      idx++;
    });
    g += out(hx);
    const fr = Lay();
    for (let k = 0; k < 18; k++) {
      const hh = hash(k * 9.1 + 3), qq = eout(lin(lt, .35 + .04 * k, 1.2 + .04 * k)), off = (1 - qq) * (40 + 30 * hh);
      gl(fr, polyD(ringPts(RX, RY, RO + off, RO + off, RO2 + off, RO2 + off, k * 20 + (1 - qq) * 30, k * 20 + 20 + (1 - qq) * 30)), k % 2 ? 'emer' : 'violet', qq * (.85 + .15 * Math.sin(t * 2 + k)), 2.4);
    }
    g += out(fr);
    // древо: ствол из клетки, развилки, пять ветвей сходятся к розе, тупиковые веточки с листьями
    const gw = mix(.3, 1, eout(lin(lt, 0, 1.3)));
    const tr = Lay();
    strip(tr, `M180 372L${FK[0]} ${FK[1]}`, 'ember', 9);
    strip(tr, `M${FK[0]} ${FK[1]}Q164 ${FK[1] - 4} ${FA[0]} ${FA[1]}`, 'ember', 6.5);
    strip(tr, `M${FK[0]} ${FK[1]}Q198 ${FK[1] - 4} ${FB[0]} ${FB[1]}`, 'ember', 6.5);
    LIN.forEach((Q, i) => strip(tr, bezD(Q, gw), LCOL[i], 3.2));
    LIN.forEach((Q, i) => strip(tr, bezD(Q, Math.min(gw, .42), 12), LCOL[i], 4.8));
    TWIG.forEach(([li, s, dx, dy], k) => {
      if (gw < s + .05) return;
      const p = bez(LIN[li], s), e = [p[0] + dx, p[1] + dy], a = Math.atan2(dy, dx);
      strip(tr, `M${f1(p[0])} ${f1(p[1])}Q${f1(p[0] + dx * .5)} ${f1(p[1] + dy * .2 - 4)} ${f1(e[0])} ${f1(e[1])}`, 'emer', 2.2);
      const lf = [[0, 0], [5.5, -3.8], [12, 0], [5.5, 3.8]].map(([u, v]) => [e[0] + u * Math.cos(a) - v * Math.sin(a), e[1] + u * Math.sin(a) + v * Math.cos(a)]);
      gl(tr, polyD(lf), 'emerL', .75 + .2 * Math.sin(t * 2.3 + k * 1.7), 1.3);
    });
    g += out(tr);
    // свет по ветвям — внутрь розы, к белому центру
    LIN.forEach((Q, i) => {
      const E = Q[3];
      g += `<path d="M${f1(E[0])} ${f1(E[1])}L${RX} ${RY}" stroke="#fff3cf" stroke-width="1.1" opacity="${f1(.55 * ease(lin(lt, .8, 1.5)))}" fill="none"/>`;
      const u = frac(t * .42 + i * .21);
      let p;
      if (u < .8) { const s = u / .8; if (s > gw) return; p = bez(Q, s); } else p = [mix(E[0], RX, (u - .8) / .2), mix(E[1], RY, (u - .8) / .2)];
      const a = Math.sin(Math.PI * Math.min(1, u * 1.1));
      g += Ci(p[0], p[1], 6, 'url(#sg_core)', `opacity="${f1(.8 * a)}" ${screen}`) + Ci(p[0], p[1], 1.5, '#fffdf2', `opacity="${f1(.95 * a)}"`);
    });
    g += Ci(RX, RY, 26, 'url(#sg_core)', `opacity="${f1(.7 + .3 * br)}" ${screen}`);
    MED.forEach(m => {
      const p = m.s < 0 ? [m.x, m.y] : bez(LIN[m.l], m.s);
      const sq = m.s < 0 ? 1 : eout(lin(gw, m.s - .02, m.s + .12));
      if (sq < .02) return;
      const md = Lay(), r = 15.5;
      gl(md, circD(0, 0, r + 3.4), 'amber', 1, 2.4);
      gl(md, circD(0, 0, r), 'blue', 1, 2);
      icon(md, m.k, 0, 0);
      g += out(md, 'sg_fx', `translate(${f1(p[0])} ${f1(p[1])}) scale(${f1(sq * (1.14 + .025 * Math.sin(t * 2.6 + p[1])))})`);
    });
    g += label(180, 34, 'ТЕЙЯР ДЕ ШАРДЕН · 1955', 10, mix(.3, 1, eout(lin(lt, 0, .5))), 2.2, '#efe4cc');
    g += label(180, 80, 'БОГ ВПЕРЕДИ', 19, eout(lin(lt, .35, .9)), 1.6);
    return g;
  }

  SCENES.gfx_stainedglass = function (u, p, d, t) {
    const parts = [];
    if (p.m) parts.push([p.m, u, 1]);
    else {
      const w1 = 1 - sstep(2.85, 3.15, t), w3 = sstep(5.85, 6.15, t), w2 = clamp(1 - w1 - w3);
      if (w1 > .001) parts.push([1, t, w1]);
      if (w2 > .001) parts.push([2, t - 3, w2]);
      if (w3 > .001) parts.push([3, t - 6, w3]);
    }
    let g = sgDefs() + R(-20, -20, 400, 680, '#040308');
    parts.forEach(([m, lt, w]) => {
      const body = m === 1 ? M1(lt, t) : m === 2 ? M2(lt, t) : M3(lt, t);
      g += w < .999 ? G(body, '', `opacity="${f1(w)}"`) : body;
    });
    g += R(-20, -20, 400, 680, 'url(#sg_vig)');
    g += R(-20, 326, 400, 72, 'url(#sg_bot)') + R(-20, 396, 400, 280, '#040308', 'opacity=".9"');
    return G(g, '', 'id="gfx-stainedglass"');
  };
})();
