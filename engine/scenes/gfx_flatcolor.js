// сцена gfx_flatcolor: проба альтернативного дизайна «Цветная инфографика» для «Бог ещё не создан» (eps/god_future).
//   Яркая плоская векторная инфографика: фон — градиент глубокий фиолетовый → тёмно-синий, звёзды-точки; люди —
//   крупные силуэты без лиц (круг-голова, скруглённое тело) в 4 цветах, мягкие тени; огонь порядка — тёплый
//   жёлто-оранжевый шар с лучами. Подписи — Montserrat 700. Лиц, богов, религиозных знаков нет.
//   Три момента ролика по времени t (переход около t=3 и t=6: старый гаснет 0,22 с, новый проявляется 0,22 с, подписи не накладываются):
//     t 0–3  «ЗАЧЕМ ЛЮДЯМ БОГИ?» — ночь, 7 человек вокруг костра, над ними огонь порядка, от него нити к каждому
//            (по нитям бегут искры), костёр трепещет, звёзды мерцают;
//     t 3–6  «ЧАЙ ОСТЫВАЕТ…» — чашка с паром, частицы тепла разлетаются во все стороны и остывают (оранжевый → синий),
//            градусы на плашке падают, справа шкала ЭНТРОПИЯ растёт;
//     t 6–9  «БОГ ВПЕРЕДИ» — снизу древо эволюции (клетка, рыба, ящер, человек), ветви растут и сходятся вверх в одну
//            светящуюся точку, по ветвям к ней бегут огоньки; вверху мелко «ТЕЙЯР ДЕ ШАРДЕН · 1955».
//   p — не используется (проба стиля).
// Камера: общий план {z0:1,z1:1}; важное — y 20..370, ниже — ровный тёмно-синий фон под субтитры.
// Проверка (станция tesla): remote_anim.py god_future -- scene_test.py gfx_flatcolor '{}' --dur 9 --at 1.5,4.5,8
//   --cam '{"z0":1,"z1":1,"drift":0,"kicks":0}' --out eps/god_future/qa/style_flatcolor.jpg
(() => {
  const ID = 'gfx-flatcolor';
  const FONT = 'font-family="GFXMont, Mont, sans-serif" font-weight="700"';
  const style = document.createElement('style');
  style.textContent = `
    @font-face{font-family:"GFXMont";src:url("../fonts/Montserrat[wght].ttf");font-weight:100 900;}
    #root:has(#${ID}){background:#070a24}
    #root:has(#${ID}) #grain{display:none}
    #root:has(#${ID}) #vig{opacity:.3}
    #root:has(#${ID}) #cap{font-family:"GFXMont","Mont",sans-serif;font-weight:800}
    #root:has(#${ID}) #cap .w{color:#8d93c4;text-shadow:0 2px 0 rgba(10,6,40,.6)}
    #root:has(#${ID}) #cap .w.on{color:#fff}
    #root:has(#${ID}) #cap .w.on.y{color:#ffd166}
  `;
  document.head.appendChild(style);

  const TAU = Math.PI * 2;
  const CAP = 'stroke-linecap="round" stroke-linejoin="round"';
  const sstep = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
  const frac = x => x - Math.floor(x);
  const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mixC = (a, b, k) => { const A = hx(a), B = hx(b); return `rgb(${A.map((v, i) => Math.round(mix(v, B[i], k))).join(',')})`; };
  const bz = (c, s) => {
    const a = (1 - s) ** 3, b = 3 * (1 - s) ** 2 * s, e = 3 * (1 - s) * s * s, f = s ** 3;
    return [a * c[0][0] + b * c[1][0] + e * c[2][0] + f * c[3][0], a * c[0][1] + b * c[1][1] + e * c[2][1] + f * c[3][1]];
  };
  const bzD = c => `M${f1(c[0][0])} ${f1(c[0][1])} C${f1(c[1][0])} ${f1(c[1][1])} ${f1(c[2][0])} ${f1(c[2][1])} ${f1(c[3][0])} ${f1(c[3][1])}`;
  // цвета: 4 цвета людей и значков (светлый → тёмный), тёплый огонь, акцент
  const PAL = [['#ff9d8f', '#e8505b'], ['#63e6d2', '#17998f'], ['#8ccbff', '#3b6fe0'], ['#eba2ff', '#9547d6']];
  const SUN = '#ffd36b', ACC = '#ffd166', INK = '#12072e';

  // подпись Montserrat 700 с мягкой тенью
  function label(x, y, txt, size, fill, extra = '') {
    return T(x, y + 2, txt, size, INK, `${FONT} text-anchor="middle" opacity=".55" ${extra}`) +
      T(x, y, txt, size, fill, `${FONT} text-anchor="middle" ${extra}`);
  }

  function defs() {
    const pg = PAL.map(([a, b], i) => `<linearGradient id="fc_p${i}" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join('');
    return `<defs>${pg}
      <linearGradient id="fc_bg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="640"><stop offset="0" stop-color="#2e0f5e"/><stop offset=".3" stop-color="#271466"/><stop offset=".5" stop-color="#18195e"/><stop offset=".6" stop-color="#10154a"/><stop offset=".75" stop-color="#0a0e33"/><stop offset="1" stop-color="#070a24"/></linearGradient>
      <linearGradient id="fc_low" gradientUnits="userSpaceOnUse" x1="0" y1="350" x2="0" y2="398"><stop offset="0" stop-color="#0b1034" stop-opacity="0"/><stop offset="1" stop-color="#0b1034"/></linearGradient>
      <radialGradient id="fc_halo"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".6"/><stop offset=".35" stop-color="#ff9a4a" stop-opacity=".22"/><stop offset="1" stop-color="#ff7a3a" stop-opacity="0"/></radialGradient>
      <radialGradient id="fc_glowP"><stop offset="0" stop-color="#ff6fa8" stop-opacity=".34"/><stop offset=".5" stop-color="#b44fd0" stop-opacity=".14"/><stop offset="1" stop-color="#7a3fd0" stop-opacity="0"/></radialGradient>
      <radialGradient id="fc_ball" cx=".42" cy=".4" r=".65"><stop offset="0" stop-color="#fffbe8"/><stop offset=".38" stop-color="#ffe27a"/><stop offset=".75" stop-color="#ffb23d"/><stop offset="1" stop-color="#ff8a3d"/></radialGradient>
      <linearGradient id="fc_ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1a68"/><stop offset=".6" stop-color="#1b1350"/><stop offset="1" stop-color="#0f0f3a"/></linearGradient>
      <linearGradient id="fc_flO" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff5d3a"/><stop offset="1" stop-color="#ff9a3d"/></linearGradient>
      <linearGradient id="fc_flM" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffa63d"/><stop offset="1" stop-color="#ffd25a"/></linearGradient>
      <linearGradient id="fc_steam" gradientUnits="userSpaceOnUse" x1="0" y1="220" x2="0" y2="112"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="fc_tea" cx=".45" cy=".4"><stop offset="0" stop-color="#e8964a"/><stop offset="1" stop-color="#9a4d22"/></radialGradient>
      <linearGradient id="fc_saucer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3eeff"/><stop offset="1" stop-color="#b3a9e6"/></linearGradient>
      <linearGradient id="fc_bar" gradientUnits="userSpaceOnUse" x1="0" y1="330" x2="0" y2="110"><stop offset="0" stop-color="#3fe0c6"/><stop offset=".5" stop-color="#ffd166"/><stop offset="1" stop-color="#ff5f7e"/></linearGradient>
      <radialGradient id="fc_omega"><stop offset="0" stop-color="#fff6d0" stop-opacity=".75"/><stop offset=".3" stop-color="#ffd166" stop-opacity=".28"/><stop offset="1" stop-color="#ff9a4a" stop-opacity="0"/></radialGradient>
      <filter id="fc_soft" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter>
      <clipPath id="fc_cl2"><rect x="0" y="96" width="284" height="276"/></clipPath>
    </defs>`;
  }

  // звёзды-точки и четыре звезды-искры
  function starsBg(t) {
    let s = '';
    for (let i = 0; i < 48; i++) {
      const x = 8 + hash(i * 1.7 + 3) * 344, y = 14 + hash(i * 2.9 + 11) * 236;
      const tw = 0.5 + 0.5 * Math.sin(t * (1.2 + hash(i) * 2) + i * 2.1);
      s += Ci(x, y, 0.6 + 1.1 * hash(i * 4.3), i % 5 ? '#ffffff' : '#ffe9a8', `opacity="${f1(0.3 + 0.55 * tw)}"`);
    }
    [[40, 126, 1], [322, 150, 1.15], [292, 232, .75], [64, 210, .8]].forEach(([x, y, sc], i) => {
      const tw = 0.7 + 0.3 * Math.sin(t * 1.7 + i * 2);
      s += P('M0 -6 Q.9 -.9 6 0 Q.9 .9 0 6 Q-.9 .9 -6 0 Q-.9 -.9 0 -6 Z', '#fff6d8', `transform="translate(${x} ${y}) scale(${f1(sc * tw)})" opacity=".9"`);
    });
    return s;
  }

  // огонь порядка: шар с лучами, дышит, лучи медленно вращаются
  function sun(x, y, r, t, n = 14) {
    let s = '';
    const pulse = 1 + 0.06 * Math.sin(t * 3.1) + 0.03 * noise1(t * 5);
    s += Ci(x, y, r * 4.4 * pulse, 'url(#fc_halo)');
    const rot = t * 0.24;
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU + rot, long = i % 2 ? 0.5 : 1;
      const r0 = r * 1.38, r1 = r * (1.38 + 0.8 * long * (0.88 + 0.12 * Math.sin(t * 4 + i)));
      s += L(x + r0 * Math.cos(a), y + r0 * Math.sin(a), x + r1 * Math.cos(a), y + r1 * Math.sin(a), SUN, f1(r * 0.17), `${CAP} opacity=".9"`);
    }
    s += Ci(x, y, r * 1.16 * pulse, '#ffb84a', 'opacity=".35"');
    s += Ci(x, y, r, 'url(#fc_ball)');
    s += Ci(x - r * 0.34, y - r * 0.36, r * 0.26, '#fffdf2', 'opacity=".85"');
    return s;
  }

  // человек без лица: ступни в (x,y), рост h; lit — насколько лицом к огню (1 — освещён спереди, 0 — к нам спиной)
  const BODY = 'M-15 -58 C-15 -67 -9 -71 0 -71 C9 -71 15 -67 15 -58 L19 -5 C19 -2 17 0 14 0 L-14 0 C-17 0 -19 -2 -19 -5 Z';
  function figure(x, y, h, col, lit, side, t, seed) {
    const s = h / 100, br = 1 + 0.014 * Math.sin(t * 2.3 + seed * 1.7), sw = 2.5 * Math.sin(t * 1.4 + seed * 2.3);
    // руки, тело, голова одним набором фигур: им же кладём тень и тёплый свет
    const shape = (fill, arm) => P(`M-12.5 -61 L${f1(-21 - sw)} -27 M12.5 -61 L${f1(21 + sw)} -27`, 'none', `stroke="${arm || fill}" stroke-width="9" ${CAP}`) +
      P(BODY, fill) + Ci(0, -84, 11.5, fill);
    let b = shape(`url(#fc_p${col})`, PAL[col][1]);
    if (lit < 1) b += G(shape(INK), '', `opacity="${f1(0.42 * (1 - lit))}"`);
    if (lit > 0) b += G(shape('#ffb46a'), '', `opacity="${f1(0.24 * lit)}"`);
    // тёплый ободок со стороны костра
    const rim = f1(0.25 + 0.4 * (1 - lit));
    b += P(`M${15 * side} -58 L${19 * side} -6`, 'none', `stroke="#ffc27a" stroke-width="3" ${CAP} opacity="${rim}"`);
    b += P(`M${f1(4 * side)} -95 A11.5 11.5 0 0 ${side > 0 ? 1 : 0} ${f1(11 * side)} -80`, 'none', `stroke="#ffc27a" stroke-width="2.6" ${CAP} opacity="${rim}"`);
    return G(b, `translate(${f1(x)} ${f1(y)}) scale(${f1(s)} ${f1(s * br)})`);
  }

  function campfire(x, y, t) {
    let s = '';
    s += G(R(-17, -3.2, 34, 6.4, '#7b3f2c', 'rx="3.2"'), `translate(${x} ${y}) rotate(13)`) +
      G(R(-17, -3.2, 34, 6.4, '#5e2e22', 'rx="3.2"'), `translate(${x} ${y}) rotate(-13)`);
    const fl = k => 1 + 0.15 * noise1(t * 8 + k * 3) + 0.06 * noise1(t * 21 + k);
    const flame = (w, h, k, fill) => {
      const hh = h * fl(k), sw = 2.4 * noise1(t * 5 + k * 7);
      return P(`M${f1(-w)} 0 C${f1(-w)} ${f1(-hh * .45)} ${f1(-w * .25 + sw)} ${f1(-hh * .7)} ${f1(sw)} ${f1(-hh)} C${f1(w * .25 + sw)} ${f1(-hh * .7)} ${f1(w)} ${f1(-hh * .45)} ${f1(w)} 0 C${f1(w)} ${f1(w * .55)} ${f1(-w)} ${f1(w * .55)} ${f1(-w)} 0 Z`, fill);
    };
    s += G(flame(12, 30, 1, 'url(#fc_flO)') + flame(8, 22, 2, 'url(#fc_flM)') + flame(4.5, 13, 3, '#fff1a8'), `translate(${x} ${y - 4})`);
    for (let i = 0; i < 7; i++) {
      const q = frac(t * 0.6 + hash(i * 3.1));
      s += Ci(x + 11 * noise1(i * 5 + t * 1.3), y - 20 - q * 46, 1.4 * (1 - q) + 0.3, '#ffd36b', `opacity="${f1(sstep(0, .12, q) * (1 - q))}"`);
    }
    return s;
  }

  // ---------------- 1. ЗАЧЕМ ЛЮДЯМ БОГИ?
  function m1(t) {
    let g = '';
    const fl = 1 + 0.08 * noise1(t * 7) + 0.04 * noise1(t * 19);
    const B = [180, 150], BR = 19;
    // холмы и земля
    g += P('M-10 262 C30 236 72 232 112 250 C142 236 172 226 206 240 C242 224 292 226 330 246 C350 238 364 240 372 244 L372 300 L-10 300 Z', '#3a1f74');
    g += P('M-10 274 C42 256 92 258 132 268 C172 256 222 252 262 264 C302 254 342 258 372 266 L372 300 L-10 300 Z', '#2c1866');
    g += P('M-10 280 C80 270 280 270 372 280 L372 400 L-10 400 Z', 'url(#fc_ground)');
    g += `<ellipse cx="180" cy="308" rx="150" ry="48" fill="#34207c" opacity=".55"/>`;
    g += `<ellipse cx="180" cy="306" rx="${f1(170 * fl)}" ry="${f1(54 * fl)}" fill="url(#fc_halo)"/>`;
    // огонь порядка над кругом
    g += sun(B[0], B[1], BR, t);
    // люди по кругу (сначала дальние)
    const CX = 180, CY = 306, RX = 132, RY = 38, COL = [0, 1, 2, 3, 0, 2, 1];
    const ppl = [];
    for (let i = 0; i < 7; i++) {
      const a = Math.PI / 2 + Math.PI / 7 + i * TAU / 7, sn = Math.sin(a), cs = Math.cos(a);
      const depth = (sn + 1) / 2, x = CX + RX * cs, y = CY + RY * sn, h = mix(60, 96, depth);
      ppl.push({ i, x, y, h, depth, side: x < CX ? 1 : -1, col: COL[i] });
    }
    ppl.sort((a, b) => a.y - b.y);
    const back = ppl.filter(q => q.y < CY), front = ppl.filter(q => q.y >= CY);
    const shadow = q => {
      const dx = (q.x - CX) * 0.22, dy = (q.y - CY) * 0.22;
      return `<ellipse cx="${f1(q.x + dx)}" cy="${f1(q.y + 1 + dy)}" rx="${f1(q.h * 0.26)}" ry="${f1(q.h * 0.06)}" fill="#0a0626" opacity=".55" filter="url(#fc_soft)"/>`;
    };
    const person = q => shadow(q) + figure(q.x, q.y, q.h, q.col, 1 - q.depth, q.side, t, q.i);
    back.forEach(q => g += person(q));
    g += G(campfire(0, 0, t), `translate(${CX} ${CY}) scale(1.3)`);
    front.forEach(q => g += person(q));
    // нити от огня к головам, по ним бегут искры
    ppl.forEach(q => {
      const s = q.h / 100, hx0 = q.x, hy0 = q.y - (84 + 11.5) * s;
      const a = [B[0], B[1] + BR * 0.9], c = [mix(a[0], hx0, .5) + (hx0 - a[0]) * 0.25, mix(a[1], hy0, .25)], e = [hx0, hy0];
      g += P(`M${f1(a[0])} ${f1(a[1])} Q${f1(c[0])} ${f1(c[1])} ${f1(e[0])} ${f1(e[1])}`, 'none', `stroke="${SUN}" stroke-width=".9" opacity=".55" ${CAP}`);
      const u = frac(t * 0.42 + q.i * 0.37), v = 1 - u;
      const px = v * v * a[0] + 2 * v * u * c[0] + u * u * e[0], py = v * v * a[1] + 2 * v * u * c[1] + u * u * e[1];
      g += Ci(px, py, 4.5, '#ffd36b', `opacity="${f1(0.3 * Math.sin(Math.PI * u))}"`) + Ci(px, py, 1.7, '#fff6d0', `opacity="${f1(Math.sin(Math.PI * u))}"`);
    });
    const k = eout(lin(t, 0, 0.5));
    g += label(180, 62 + 5 * (1 - k), 'ЗАЧЕМ ЛЮДЯМ', 25, '#ffffff', 'letter-spacing=".5"');
    g += label(180, 104 + 5 * (1 - k), 'БОГИ?', 40, ACC, 'letter-spacing="1"');
    return g;
  }

  // ---------------- 2. ЧАЙ ОСТЫВАЕТ… ЭНТРОПИЯ РАСТЁТ
  function m2(t) {
    let g = '';
    const u = t - 3, cool = ease(lin(t, 3, 6));
    const C0 = [148, 280];
    g += Ci(148, 262, 140, 'url(#fc_glowP)', `opacity="${f1(1 - 0.5 * cool)}"`);
    // частицы тепла: разлетаются во все стороны и остывают
    let pt = '';
    for (let i = 0; i < 60; i++) {
      const a = hash(i * 7.31) * TAU, sp = 0.22 + 0.2 * hash(i * 3.7);
      const q = frac(u * sp + hash(i * 1.9));
      const r = 40 + q * (100 + 50 * hash(i * 5.5));
      const ca = Math.cos(a) * 1.15, sa = Math.sin(a) * 0.95;
      const x = C0[0] + r * ca, y = C0[1] - 12 + r * sa - q * 16;
      const x0 = C0[0] + (r - 10) * ca, y0 = C0[1] - 12 + (r - 10) * sa - q * 16;
      const op = sstep(0, .12, q) * (1 - sstep(.7, 1, q));
      const c = mixC('#ffb347', '#6fa8ff', q);
      pt += L(x0, y0, x, y, c, f1(1.6 - 0.6 * q), `${CAP} opacity="${f1(0.45 * op)}"`) + Ci(x, y, 2.3 - 0.9 * q, c, `opacity="${f1(op)}"`);
    }
    g += G(pt, '', 'clip-path="url(#fc_cl2)"');
    let cg = '';
    // подставка, блюдце, чашка
    cg += `<ellipse cx="148" cy="320" rx="108" ry="16" fill="#2a1c6c"/><ellipse cx="148" cy="318" rx="104" ry="13" fill="none" stroke="#5a48b8" stroke-width="1.2" opacity=".6"/>`;
    cg += `<ellipse cx="152" cy="312" rx="82" ry="12" fill="#0a0626" opacity=".5" filter="url(#fc_soft)"/>`;
    cg += `<ellipse cx="148" cy="304" rx="80" ry="14" fill="url(#fc_saucer)"/><ellipse cx="148" cy="303" rx="50" ry="8" fill="#9b90d8" opacity=".55"/>`;
    cg += P('M199 242 C230 236 236 274 204 284', 'none', `stroke="#e8505b" stroke-width="8" ${CAP}`) +
      P('M199 242 C226 238 230 270 204 280', 'none', `stroke="#ff9d8f" stroke-width="2.4" ${CAP} opacity=".6"`);
    const CUP = 'M96 228 C96 262 104 290 120 300 C134 306 162 306 176 300 C192 290 200 262 200 228 Z';
    cg += `<clipPath id="fc_cup"><path d="${CUP}"/></clipPath>`;
    cg += P(CUP, 'url(#fc_p0)');
    cg += G(R(90, 248, 120, 10, '#ffe7e0', 'opacity=".9"') + R(90, 263, 120, 3, '#ffe7e0', 'opacity=".55"') +
      P('M170 228 C176 262 172 290 160 306 L210 306 L210 228 Z', INK, 'opacity=".16"'), '', 'clip-path="url(#fc_cup)"');
    cg += P('M107 238 C109 262 114 282 123 293', 'none', `stroke="#fff" stroke-width="4" ${CAP} opacity=".35"`);
    cg += `<ellipse cx="148" cy="228" rx="52" ry="10" fill="#ffd3ca"/><ellipse cx="148" cy="229" rx="46" ry="7.4" fill="url(#fc_tea)"/>`;
    cg += `<ellipse cx="${f1(146 + 10 * Math.sin(u * 1.6))}" cy="228" rx="14" ry="2.2" fill="#fff" opacity="${f1(0.28 - 0.12 * cool)}"/>`;
    // пар: три струйки, слабеют по мере остывания
    for (let i = 0; i < 3; i++) {
      const x0 = 126 + i * 22;
      let d = '';
      for (let k = 0; k <= 14; k++) {
        const yy = 220 - k * 7.6, xx = x0 + 7 * Math.sin(k * 0.55 - u * 3.2 + i * 2) * (0.35 + k / 14);
        d += (k ? ' L' : 'M') + f1(xx) + ' ' + f1(yy);
      }
      cg += P(d, 'none', `stroke="url(#fc_steam)" stroke-width="${f1(5.2 - i * 0.6)}" ${CAP} opacity="${f1(1 - 0.55 * cool)}"`);
    }
    g += G(cg, 'translate(148 324) scale(1.13) translate(-148 -304)');
    // плашка температуры: градусы падают
    const deg = Math.round(mix(82, 26, cool));
    const chipC = mixC('#ff7a59', '#4c8dff', cool);
    g += R(28, 128, 64, 26, '#fff', 'rx="13" opacity=".96"') + R(28, 152, 64, 3, INK, 'rx="1.5" opacity=".25"');
    g += L(42, 134, 42, 144, '#ddd7f2', 4.4, CAP) + Ci(42, 145.5, 4.2, chipC) + L(42, mix(134.5, 141.5, cool), 42, 145, chipC, 2.4, CAP);
    g += T(71, 147.5, `${deg}°`, 16, chipC, `${FONT} text-anchor="middle"`);
    // шкала ЭНТРОПИЯ
    const BX = 318, BT = 110, BB = 330, BW = 18;
    const lvl = mix(0.14, 0.9, ease(lin(t, 3.1, 6.0))) + 0.012 * Math.sin(t * 6);
    const fy = BB - 3 - (BB - BT - 6) * lvl;
    g += R(BX - BW / 2, BT, BW, BB - BT, '#ffffff', 'rx="9" opacity=".08"') + R(BX - BW / 2, BT, BW, BB - BT, 'none', 'rx="9" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"');
    g += R(BX - BW / 2 + 3, fy, BW - 6, BB - 3 - fy, 'url(#fc_bar)', 'rx="6"');
    for (let k = 0; k <= 5; k++) { const y = BB - 12 - k * (BB - BT - 24) / 5; g += L(BX + BW / 2 + 4, y, BX + BW / 2 + (k % 5 ? 8 : 11), y, '#fff', 1, 'opacity=".45"'); }
    g += Ci(BX, fy + 3, 7, '#fff', 'opacity=".25"') + Ci(BX, fy + 3, 3.4, '#fff');
    const ab = 2 * Math.sin(t * 4);
    g += P(`M${BX - 7} ${f1(BT - 10 + ab)} L${BX} ${f1(BT - 20 + ab)} L${BX + 7} ${f1(BT - 10 + ab)} Z`, ACC);
    g += T(BX - 21, (BT + BB) / 2, 'ЭНТРОПИЯ', 12, '#ffffff', `${FONT} text-anchor="middle" letter-spacing="3" opacity=".9" transform="rotate(-90 ${BX - 21} ${(BT + BB) / 2})"`);
    const k = eout(lin(t, 3, 3.5));
    g += label(160, 62 + 5 * (1 - k), 'ЧАЙ ОСТЫВАЕТ…', 25, '#ffffff', 'letter-spacing=".5"');
    g += label(160, 88 + 5 * (1 - k), 'ЭНТРОПИЯ РАСТЁТ', 15, ACC, 'letter-spacing="1.5"');
    return g;
  }

  // значки на ветвях (белые, в круге радиуса 15)
  const ICON = {
    cell: Ci(0, 0, 8.5, 'none', 'stroke="#fff" stroke-width="1.9"') + Ci(1.6, -1.2, 3.3, '#fff') + Ci(-3.6, 3.2, 1.2, '#fff', 'opacity=".85"') + Ci(-2.4, -4.4, 0.9, '#fff', 'opacity=".85"'),
    fish: P('M9 0 C5.5 -5.4 -2.5 -5.6 -6 0 C-2.5 5.6 5.5 5.4 9 0 Z', '#fff') + P('M-5 0 L-11.5 -5.4 L-9.6 0 L-11.5 5.4 Z', '#fff') + P('M-0.5 -4.4 L3 -7.6 L4.2 -3.8 Z', '#fff'),
    lizard: G(`<ellipse cx="0" cy="-8.4" rx="2.7" ry="3.3" fill="#fff"/><ellipse cx="0" cy="-1.4" rx="3.2" ry="5.6" fill="#fff"/>` +
      P('M0 3.5 C0.4 7.5 4.2 8.6 4.6 12.4', 'none', `stroke="#fff" stroke-width="2.2" ${CAP}`) +
      P('M-2.4 -4.4 L-6 -6 L-7 -9 M2.4 -4.4 L6 -6 L7 -9 M-2.4 1.8 L-6 3.8 L-6.6 7 M2.4 1.8 L6 3.8 L6.6 7', 'none', `stroke="#fff" stroke-width="1.7" ${CAP}`), 'rotate(28)'),
    human: Ci(0, -6.4, 3.5, '#fff') + P('M-5.2 7.5 L-4.4 -0.6 C-4.1 -2.2 -2.6 -2.8 0 -2.8 C2.6 -2.8 4.1 -2.2 4.4 -0.6 L5.2 7.5 Z', '#fff'),
  };

  // ---------------- 3. ТЕЙЯР ДЕ ШАРДЕН: БОГ ВПЕРЕДИ
  function m3(t) {
    let g = '';
    const grow = mix(0.24, 1, eout(lin(t, 6.0, 7.4)));
    const O = [180, 128], RT = [180, 338];
    const DX = [-150, -80, 0, 80, 150];
    const COLS = [PAL[1][0], PAL[2][0], ACC, PAL[3][0], PAL[0][0]];
    const BR = DX.map(dx => [RT, [180 + dx, 302], [180 + dx * 1.1, 196], O]);
    // ореол и кольца вокруг точки
    g += Ci(O[0], O[1], 150, 'url(#fc_glowP)', 'opacity=".9"');
    [44, 76, 110].forEach((r, i) => g += Ci(O[0], O[1], r, 'none', `stroke="#fff" stroke-width="1" opacity="${f1(0.07 + 0.03 * Math.sin(t * 2 + i))}"`));
    // холм и корни
    g += P('M30 376 C76 350 136 338 180 338 C224 338 284 350 330 376 Z', '#22175e') + P('M60 362 C100 346 140 340 180 340 C220 340 260 346 300 362', 'none', 'stroke="#4b3aa8" stroke-width="1.4" opacity=".6"');
    [[-40, 362], [-18, 368], [18, 368], [40, 362]].forEach(([dx, y]) => g += P(`M180 342 Q${180 + dx * 0.4} ${y - 8} ${180 + dx} ${y}`, 'none', `stroke="#7a5ad8" stroke-width="2" ${CAP} opacity=".7"`));
    g += L(180, 350, 180, 336, '#ffd166', 6, `${CAP} opacity=".9"`);
    // веточки
    const TW = [[0, [.42, .66]], [1, [.3, .74]], [3, [.32, .46]], [4, [.2, .6]]];
    TW.forEach(([j, ss]) => ss.forEach((s, n) => {
      if (s > grow) return;
      const a = bz(BR[j], s), sd = Math.sign(DX[j]), e = [a[0] + sd * 16, a[1] - 9];
      const kk = sstep(s, s + .12, grow);
      g += P(`M${f1(a[0])} ${f1(a[1])} Q${f1(a[0] + sd * 12)} ${f1(a[1] - 1)} ${f1(mix(a[0], e[0], kk))} ${f1(mix(a[1], e[1], kk))}`, 'none', `stroke="${COLS[j]}" stroke-width="2" ${CAP} opacity=".85"`);
      g += Ci(mix(a[0], e[0], kk), mix(a[1], e[1], kk), 3.2 * kk * (1 + 0.15 * Math.sin(t * 3 + j + n)), COLS[j]);
    }));
    // ветви растут вверх и сходятся в точке
    BR.forEach((c, j) => {
      const dash = `pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${f1(1 - grow)}"`;
      g += `<path d="${bzD(c)}" fill="none" stroke="${COLS[j]}" stroke-width="8" opacity=".16" ${CAP} ${dash}/>`;
      g += `<path d="${bzD(c)}" fill="none" stroke="${COLS[j]}" stroke-width="3.2" ${CAP} ${dash}/>`;
    });
    // огоньки бегут по ветвям к точке
    BR.forEach((c, j) => { for (let k = 0; k < 3; k++) {
      const q = frac(t * 0.26 + k / 3 + j * 0.13);
      if (q > grow) continue;
      const p = bz(c, q);
      g += Ci(p[0], p[1], 4.6, COLS[j], 'opacity=".35"') + Ci(p[0], p[1], 2, '#fff');
    } });
    // значки на ветвях: клетка → рыба → ящер → человек (снизу вверх)
    [['cell', 0, .22, 1], ['fish', 4, .36, 0], ['lizard', 1, .5, 1], ['human', 3, .62, 3]].forEach(([nm, j, s, col], i) => {
      const kk = eout(sstep(s - .02, s + .14, grow));
      if (kk <= 0) return;
      const p = bz(BR[j], s), y = p[1] + 1.3 * Math.sin(t * 2.1 + i * 1.7);
      g += `<ellipse cx="${f1(p[0] + 2)}" cy="${f1(y + 15)}" rx="${f1(13 * kk)}" ry="${f1(3.5 * kk)}" fill="#0a0626" opacity=".5" filter="url(#fc_soft)"/>`;
      g += G(Ci(0, 0, 16, `url(#fc_p${col})`) + Ci(0, 0, 16, 'none', 'stroke="#fff" stroke-width="1.6" opacity=".7"') + ICON[nm], `translate(${f1(p[0])} ${f1(y)}) scale(${f1(kk)})`);
    });
    // светящаяся точка: огонь порядка впереди
    const pr = frac(t * 0.55);
    g += Ci(O[0], O[1], 70, 'url(#fc_omega)', `opacity="${f1(0.55 + 0.45 * grow)}"`);
    g += Ci(O[0], O[1], 10 + 46 * pr, 'none', `stroke="${ACC}" stroke-width="1.4" opacity="${f1(0.7 * (1 - pr) * grow)}"`);
    g += sun(O[0], O[1], 9 + 2 * grow, t, 12);
    const k = eout(lin(t, 6, 6.5));
    g += label(180, 44, 'ТЕЙЯР ДЕ ШАРДЕН · 1955', 10.5, '#ffffff', `letter-spacing="2" opacity="${f1(0.8 * k)}"`);
    g += label(180, 88 + 5 * (1 - k), 'БОГ ВПЕРЕДИ', 24, ACC, 'letter-spacing="1"');
    return g;
  }

  SCENES.gfx_flatcolor = function (u, p, d, t) {
    const k1 = 1 - sstep(2.78, 3.0, t), k2 = sstep(3.0, 3.22, t) * (1 - sstep(5.78, 6.0, t)), k3 = sstep(6.0, 6.22, t);
    let g = defs();
    g += R(-20, -20, 400, 680, 'url(#fc_bg)');
    g += starsBg(t);
    if (k1 > 0.001) g += G(m1(t), '', `opacity="${f1(k1)}"`);
    if (k2 > 0.001) g += G(m2(t), '', `opacity="${f1(k2)}"`);
    if (k3 > 0.001) g += G(m3(t), '', `opacity="${f1(k3)}"`);
    g += R(-20, 350, 400, 48, 'url(#fc_low)') + R(-20, 397, 400, 270, '#0b1034');
    return `<g id="${ID}">${g}</g>`;
  };
})();
