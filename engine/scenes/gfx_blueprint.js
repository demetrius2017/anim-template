// сцена gfx_blueprint: «Бог ещё не создан», пробный дизайн «Чертёж» (blueprint), v1.
// Тёмно-синий лист (#0f2f57) с голубой сеткой, рамка с зонами и штамп в правом нижнем углу: ПРОЕКТ «БОГ»,
// УЗЕЛ: ОГОНЬ ПОРЯДКА, СТАТУС: НЕ СОЗДАН, номер листа. Рисунок — белые и голубые линии, размерные стрелки,
// выноски с номерами в кружках, пунктир скрытых линий, штрихпунктир осей. «Огонь порядка» — узел чертежа:
// шестигранник в кольце с тёплым ядром. Подписи — IBM Plex Mono капсом. Лиц и религиозных символов нет.
// Три листа (время ролика t; без p.m — по t, смена листа — скан-«перепечатка» сверху вниз за 0,8 с):
//   лист 1, t 0–3   «ЗАЧЕМ ЛЮДЯМ БОГИ?»: ночь, круг из 7 людей у костра, над ними огонь порядка, нити к каждому,
//                   по нитям вниз бегут огоньки; размеры H = ? и R 2000; выноски 1 КОСТЁР, 2 ЛЮДИ, 3 ОГОНЬ ПОРЯДКА;
//   лист 2, t 3–6   «ЧАЙ ОСТЫВАЕТ»: чашка с паром, частицы тепла стрелками расходятся во все стороны и их всё больше,
//                   температура в выноске падает, справа шкала ЭНТРОПИЯ — уровень растёт, стрелка РАСТЁТ;
//   лист 3, t 6–9+  «ТЕЙЯР ДЕ ШАРДЕН · 1955»: снизу древо эволюции (клетка на стволе, рыба, ящер, человек на ветвях,
//                   тупиковые веточки), ветви сходятся вверх в точку — огонь порядка, выноска БОГ ВПЕРЕДИ;
//                   линия СЕЙЧАС: выше неё ветви — пунктир (ещё проект), по ветвям вверх бегут огоньки.
//   p.m    — 1|2|3: показывать только этот лист (без смены по t), местное время листа — u
//   p.plot — true: при p.m лист «печатается» сканом в начале кадра (0,8 с)
// Важное — y 20..370 (рамка 12..348 × 16..370), ниже — та же сетка, притушенная, пустая — под субтитры.
// Камеры: общий план z 1 (сцена рассчитана на целый лист); наезд до 1.15 на огонь порядка (ox 0, oy −180)
// в листе 1 и на точку схода (ox 0, oy −215) в листе 3. CSS — только #root:has(#gfx-blueprint).
(() => {
  const css = document.createElement('style');
  css.textContent = "@font-face{font-family:BPMono;src:url('../fonts/IBMPlexMono-SemiBold.ttf');font-weight:600}" +
    '#root:has(#gfx-blueprint){background:#0f2f57}' +
    '#root:has(#gfx-blueprint) #vig{background:radial-gradient(ellipse 84% 66% at 50% 36%,rgba(5,16,36,0) 58%,rgba(5,16,36,.5) 100%)}';
  document.head.appendChild(css);

  const BG = '#0f2f57', FILL = '#11345f', INK = '#f2f8ff', CY = '#9fd3ff', CY2 = '#62a3e0', WARM = '#ffe2b0';
  const FONT = 'font-family="BPMono,Plex,monospace" font-weight="600"';
  const TAU = Math.PI * 2;
  const fr = x => x - Math.floor(x);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const st = (c, w, ex = '') => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}`;
  const pa = (d, c, w, ex = '') => `<path d="${d}" ${st(c, w, ex)}/>`;
  const ln = (x1, y1, x2, y2, c, w, ex = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" ${st(c, w, ex)}/>`;
  const ci = (x, y, r, c, w, ex = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" ${st(c, w, ex)}/>`;
  const el = (x, y, rx, ry, c, w, ex = '') => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" ${st(c, w, ex)}/>`;
  const arcTop = (x, y, rx, ry) => `M${f1(x - rx)} ${f1(y)} A${f1(rx)} ${f1(ry)} 0 0 1 ${f1(x + rx)} ${f1(y)}`;
  const arcBot = (x, y, rx, ry) => `M${f1(x + rx)} ${f1(y)} A${f1(rx)} ${f1(ry)} 0 0 1 ${f1(x - rx)} ${f1(y)}`;
  const DASH = 'stroke-dasharray="3.4 2.6"';            // скрытая линия
  const AXIS = 'stroke-dasharray="10 2.4 1.6 2.4"';     // осевая (штрихпунктир)
  const HALO = `stroke="${FILL}" stroke-width="2.6" stroke-linejoin="round" paint-order="stroke"`;

  function tx(x, y, s, size, o = {}) {
    const { col = INK, anc = 'start', op = 1, ls = .6, rot = 0, halo = true } = o;
    return `<text x="${f1(x)}" y="${f1(y)}" ${FONT} font-size="${size}" letter-spacing="${ls}" fill="${col}" text-anchor="${anc}"` +
      (op < 1 ? ` opacity="${f1(op)}"` : '') + (halo ? ' ' + HALO : '') +
      (rot ? ` transform="rotate(${rot} ${f1(x)} ${f1(y)})"` : '') + `>${esc(s)}</text>`;
  }
  // стрелка размера: острие в (x,y), смотрит по углу a
  function ah(x, y, a, s = 4.4, c = CY, ex = '') {
    const bx = x - Math.cos(a) * s, by = y - Math.sin(a) * s, nx = -Math.sin(a) * s * .34, ny = Math.cos(a) * s * .34;
    return `<path d="M${f1(x)} ${f1(y)} L${f1(bx + nx)} ${f1(by + ny)} L${f1(bx - nx)} ${f1(by - ny)} Z" fill="${c}" ${ex}/>`;
  }
  function dimH(x0, x1, y, label) {
    return ln(x0, y, x1, y, CY, .6) + ah(x0, y, Math.PI) + ah(x1, y, 0) + tx((x0 + x1) / 2, y - 3.5, label, 8, { col: CY, anc: 'middle' });
  }
  function dimV(x, y0, y1, label) {
    return ln(x, y0, x, y1, CY, .6) + ah(x, y0, -Math.PI / 2) + ah(x, y1, Math.PI / 2) +
      tx(x - 3.5, (y0 + y1) / 2, label, 8, { col: CY, anc: 'middle', rot: -90 });
  }
  // выноска: точка на детали → кружок с номером → подпись сбоку (side 1 вправо, −1 влево)
  function callout(n, px, py, bx, by, label, side = 1) {
    const a = Math.atan2(py - by, px - bx);
    return Ci(px, py, 1.5, INK) + ln(bx + Math.cos(a) * 6.6, by + Math.sin(a) * 6.6, px, py, INK, .6) +
      `<circle cx="${f1(bx)}" cy="${f1(by)}" r="6.6" fill="${FILL}" stroke="${INK}" stroke-width=".9"/>` +
      tx(bx + .3, by + 2.8, n, 7.6, { anc: 'middle', ls: 0, halo: false }) +
      tx(bx + side * 10.5, by + 3, label, 8.5, { anc: side > 0 ? 'start' : 'end' });
  }
  // узел «огонь порядка»: кольцо пунктиром (бежит), кольцо, шестигранник со спицами, тёплое ядро; s — масштаб
  function node(x, y, s, t) {
    const br = .5 + .5 * Math.sin(t * 2.1);
    let g = Ci(x, y, 54 * s, 'url(#bp_glow)', `opacity="${f1(.62 + .3 * br)}"`);
    g += ci(x, y, 31 * s, CY, .75, `stroke-dasharray="2.4 3" stroke-dashoffset="${f1(-t * 6)}"`);
    g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(22 * s)}" fill="${FILL}" stroke="${INK}" stroke-width="1.1"/>`;
    const rot = t * 5;
    let hp = '';
    for (let k = 0; k < 6; k++) {
      const a = (-90 + 60 * k + rot) * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
      hp += (k ? 'L' : 'M') + f1(x + 13.5 * s * c) + ' ' + f1(y + 13.5 * s * sn);
      g += ln(x + 13.5 * s * c, y + 13.5 * s * sn, x + 22 * s * c, y + 22 * s * sn, CY, .6);
    }
    g += pa(hp + 'Z', INK, 1.2);
    g += Ci(x, y, 11 * s, 'url(#bp_warm)', `opacity="${f1(.8 + .2 * br)}"`);
    g += Ci(x, y, (3.6 + .6 * br) * s, WARM, 'filter="url(#bp_bl)"');
    return g;
  }

  // ---------- лист 1: круг у костра
  const BODY = 'M-7.5 -20.5 C-9.6 -20 -10.2 -17.6 -10.2 -15.5 L-9.6 -7.4 C-12.6 -6.2 -14.6 -3.4 -14.6 -1.2 C-14.6 .4 -13.6 1 -12 1 L12 1 C13.6 1 14.6 .4 14.6 -1.2 C14.6 -3.4 12.6 -6.2 9.6 -7.4 L10.2 -15.5 C10.2 -17.6 9.6 -20 7.5 -20.5 C4 -21.8 -4 -21.8 -7.5 -20.5 Z';
  function man(q) {
    const sw = `stroke="${INK}" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"`;
    return G(P(BODY, FILL, sw) + P('M-9.6 -14 C-7 -8.6 -2 -6.4 3.5 -6.6 M9.6 -14 C8.6 -10 6.5 -7.6 3.5 -6.6', 'none', `stroke="${CY}" stroke-width=".6" vector-effect="non-scaling-stroke" stroke-linecap="round" opacity=".7"`) +
      `<circle cx="0" cy="${f1((q.hy - q.y) / q.sc)}" r="5" fill="${FILL}" ${sw}/>`,
      `translate(${f1(q.x)} ${f1(q.y)}) scale(${f1(q.sc)})`);
  }
  function m1(lt, t) {
    const GY = 268, RX = 112, RY = 30, NX = 180, NY = 136;
    let s = '';
    for (let i = 0; i < 28; i++) {                       // ночь: звёзды-точки мерцают
      const x = 22 + hash(i * 3.17 + .4) * 316, y = 82 + hash(i * 7.31 + 1.1) * 74;
      if (Math.abs(x - 180) < 52 && y > 90) continue;
      if (x > 238 && x < 345 && y > 94 && y < 116) continue;
      const tw = .3 + .65 * (.5 + .5 * Math.sin(t * (1.1 + 2 * hash(i * 1.3)) + i * 2.3));
      s += Ci(x, y, .7 + 1.1 * hash(i * 1.9) * hash(i * 4.7), INK, `opacity="${f1(tw)}"`);
    }
    s += tx(180, 40, 'НОЧЬ · КРУГ У КОСТРА', 8, { col: CY, anc: 'middle', ls: 1.6 });
    s += tx(180, 64, 'ЗАЧЕМ ЛЮДЯМ БОГИ?', 17, { anc: 'middle', ls: .5 });
    s += ln(88, 72, 272, 72, CY, .5, 'opacity=".7"') + ln(88, 69, 88, 75, CY, .5) + ln(272, 69, 272, 75, CY, .5);

    const ppl = [];
    for (let i = 0; i < 7; i++) {
      const th = Math.PI / 2 + Math.PI / 7 + i * TAU / 7, sn = Math.sin(th);
      const x = 180 + RX * Math.cos(th), y = GY + RY * sn, sc = .92 + .18 * sn;
      ppl.push({ i, x, y, sc, back: sn < 0, hx: x, hy: y - 28 * sc + .35 * Math.sin(t * 1.7 + i * 1.3) });
    }
    // размеры: высота огня над кругом и радиус круга
    s += ln(NX - 34, NY, 34, NY, CY, .45, 'stroke-dasharray="1 2.2"') + ln(66, GY, 34, GY, CY, .45, 'stroke-dasharray="1 2.2"');
    s += dimV(40, NY, GY, 'H = ?');
    s += ln(180, GY + 9, 180, 321, CY, .5, AXIS) + ln(292, GY + 12, 292, 321, CY, .45);
    s += dimH(180, 292, 316, 'R 2000');
    // нити от огня порядка к каждому; огоньки бегут вниз
    s += node(NX, NY, 1, t);
    ppl.forEach(q => {
      const ex = q.hx, ey = q.hy - 5.3 * q.sc - 1.2, a = Math.atan2(ey - NY, ex - NX);
      const sx = NX + Math.cos(a) * 23, sy = NY + Math.sin(a) * 23;
      s += ln(sx, sy, ex, ey, CY, .55, 'opacity=".7"');
      const k = fr(t * .42 + q.i * .29);
      s += Ci(mix(sx, ex, k), mix(sy, ey, k), 1.5, INK, `opacity="${f1(Math.sin(k * Math.PI) * .95)}"`);
    });
    // круг: дальняя половина — скрытая линия
    s += pa(arcTop(180, GY, RX, RY), CY, .8, DASH);
    ppl.filter(q => q.back).sort((a, b) => a.y - b.y).forEach(q => s += man(q));
    // костёр
    s += `<ellipse cx="180" cy="${GY - 8}" rx="50" ry="30" fill="url(#bp_warm)" opacity="${f1(.5 + .15 * noise1(t * 6))}"/>`;
    s += el(180, GY + 2, 21, 5.5, CY, .6, DASH);
    s += G(R(-13, -2.2, 26, 4.4, FILL, `rx="2.2" stroke="${INK}" stroke-width=".9"`), `translate(180 ${GY}) rotate(-13)`) +
      G(R(-13, -2.2, 26, 4.4, FILL, `rx="2.2" stroke="${INK}" stroke-width=".9"`), `translate(180 ${GY}) rotate(13)`);
    const FL = 'M-8 0 C-10 -6 -6.5 -10 -4.5 -14.5 C-3.6 -11.4 -1.8 -10.4 -1.2 -12.4 C-.6 -16.4 1 -19.4 2.4 -23 C3.6 -18.4 7.2 -13.6 8.2 -8.6 C9 -4.4 8.4 -1.4 7.6 0 Z';
    const fh = (21 + 3.5 * noise1(t * 5.3 + 2)) / 23, sw = 6 * noise1(t * 4.1), fw = 1 + .06 * noise1(t * 7.7);
    s += G(P(FL, 'rgba(255,226,176,.14)', `stroke="${WARM}" stroke-width="1.1" stroke-linejoin="round" vector-effect="non-scaling-stroke" filter="url(#bp_bl)"`) +
      G(P(FL, 'none', `stroke="${WARM}" stroke-width=".8" stroke-linejoin="round" vector-effect="non-scaling-stroke"`), 'translate(0 -1) scale(.5 .5)'),
      `translate(180 ${GY - 1}) skewX(${f1(sw)}) scale(${f1(fw)} ${f1(fh)})`);
    for (let j = 0; j < 6; j++) {                        // искры
      const k = fr(t * .7 + hash(j * 4.1));
      s += Ci(180 + (hash(j * 2.3) - .5) * 14 + 4 * noise1(t * 2 + j), GY - 14 - k * 42, .9, WARM, `opacity="${f1((1 - k) * .9)}"`);
    }
    s += pa(arcBot(180, GY, RX, RY), INK, 1);
    ppl.filter(q => !q.back).sort((a, b) => a.y - b.y).forEach(q => s += man(q));
    // выноски
    const q4 = ppl[4];
    s += callout('3', NX + 17, NY - 14, 250, 104, 'ОГОНЬ ПОРЯДКА', 1);
    s += callout('2', q4.hx + 4.6, q4.hy - 2.2, 300, 196, 'ЛЮДИ', 1);
    s += callout('1', 177, GY + 3, 154, 336, 'КОСТЁР', -1);
    return s;
  }

  // ---------- лист 2: чай остывает, энтропия растёт
  function m2(lt, t) {
    const CX = 150, HC = 228;
    let s = '';
    s += tx(180, 40, 'ВТОРОЕ НАЧАЛО ТЕРМОДИНАМИКИ', 8, { col: CY, anc: 'middle', ls: 1 });
    s += tx(180, 64, 'ЧАЙ ОСТЫВАЕТ', 17, { anc: 'middle', ls: .5 });
    s += ln(115, 72, 245, 72, CY, .5, 'opacity=".7"') + ln(115, 69, 115, 75, CY, .5) + ln(245, 69, 245, 75, CY, .5);
    // частицы тепла: стрелки расходятся во все стороны, их всё больше
    const nOn = 26 + 54 * eout(clamp(lt / 2.6));
    for (let i = 0; i < 80; i++) {
      const vis = clamp(nOn - i);
      if (vis <= 0) continue;
      const a = hash(i * 1.73 + .3) * TAU, sp = .2 + .16 * hash(i * 5.31), ph = fr(lt * sp + hash(i * 9.13));
      const r = 50 + ph * 160, ca = Math.cos(a), sa = Math.sin(a) * .8;
      const x = CX + ca * r, y = HC + sa * r;
      if (x < 18 || x > 280 || y < 86 || y > 322 || (x > 60 && x < 300 && y < 80)) continue;
      const op = Math.pow(Math.sin(ph * Math.PI), .7) * vis, an = Math.atan2(sa, ca);
      s += i % 3 ? G(ln(x - ca * 7, y - sa * 7, x - ca * 2, y - sa * 2, CY, .8) + ah(x, y, an, 3.4, CY), '', `opacity="${f1(op * .9)}"`)
        : Ci(x, y, 1.1, INK, `opacity="${f1(op * .8)}"`);
    }
    // волнистые стрелки «тепло уходит»: две волны по 4 стрелки расходятся от чашки
    [[180, 0], [-24, 0], [24, 0], [232, 0], [203, .5], [157, .5], [0, .5], [-54, .5]].forEach(([deg, ph0]) => {
      const a = deg * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a) * .8, L0 = Math.hypot(ca, sa), nx = -sa / L0, ny = ca / L0;
      const right = Math.abs(deg) < 60, k = fr(lt * .45 + ph0), r0 = (right ? 70 : 54) + k * (right ? 28 : 44), op = Math.sin(k * Math.PI);
      let dd = '', ex = 0, ey = 0;
      for (let m = 0; m <= 16; m++) {
        const q = m / 16, r = r0 + q * 26, w = 2 * Math.sin(q * TAU * 2) * Math.sin(q * Math.PI);
        ex = CX + ca * r; ey = HC + sa * r;
        dd += (m ? 'L' : 'M') + f1(ex + nx * w) + ' ' + f1(ey + ny * w);
      }
      s += G(pa(dd, INK, 1) + ah(ex + ca / L0 * 5, ey + sa / L0 * 5, Math.atan2(sa, ca), 5.4, INK), '', `opacity="${f1(op)}"`);
    });
    // блюдце
    s += `<ellipse cx="${CX}" cy="262" rx="64" ry="12" fill="${FILL}" stroke="${INK}" stroke-width="1"/>`;
    s += pa(arcBot(CX, 265, 64, 12), INK, 1) + ln(CX - 64, 262, CX - 64, 265, INK, 1) + ln(CX + 64, 262, CX + 64, 265, INK, 1);
    s += el(CX, 262, 36, 6.5, CY, .6);
    // чашка
    s += P(`M110 196 C111 224 116 248 127 258 A23 5 0 0 0 173 258 C184 248 189 224 190 196 Z`, FILL, `stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"`);
    s += pa(arcTop(CX, 258, 23, 5), CY, .6, DASH);
    s += pa('M189 207 C217 203 219 243 182 245', INK, 1.2) + pa('M189 215 C206 213 207 236 185 237', INK, .9);
    s += `<clipPath id="bp_rim"><ellipse cx="${CX}" cy="196" rx="40" ry="9"/></clipPath>`;
    s += `<ellipse cx="${CX}" cy="196" rx="40" ry="9" fill="#0c2849" stroke="${INK}" stroke-width="1.2"/>`;
    s += el(CX, 203, 36.5, 7.5, CY, .7, DASH);           // уровень чая за стенкой — скрытая линия
    s += G(`<ellipse cx="${CX}" cy="203" rx="36.5" ry="7.5" fill="#16406f" stroke="${INK}" stroke-width=".8"/>`, '', 'clip-path="url(#bp_rim)"');
    s += ln(CX, 172, CX, 284, CY, .5, AXIS);
    // пар
    [-12, 0, 12].forEach((dx, i) => {
      let d = '';
      for (let k = 0; k <= 26; k++) {
        const q = k / 26, y = 201 - q * 98, a = 1.5 + 7 * q;
        const x = CX + dx * (1 + .45 * q) + a * Math.sin(q * 8.5 - t * 3 + i * 2.1) + 4 * q * noise1(t * .6 + i * 3);
        d += (k ? 'L' : 'M') + f1(x) + ' ' + f1(y);
      }
      s += pa(d, 'url(#bp_steam)', 1.1);
    });
    // шкала энтропии
    const GX = 304, G0 = 300, G1 = 100;
    const lev = .14 + .7 * ease(clamp(lt / 2.8)) + .012 * Math.sin(t * 7);
    const yL = G0 - (G0 - G1) * lev;
    s += tx(GX, 90, 'ЭНТРОПИЯ', 8.5, { anc: 'middle', ls: .5 });
    s += R(GX - 7, G1, 14, G0 - G1, FILL, `rx="3" stroke="${INK}" stroke-width="1"`);
    s += R(GX - 4.5, yL, 9, G0 - 2.5 - yL, 'url(#bp_hat)', 'rx="1.5"') + R(GX - 4.5, yL, 9, 1.6, INK);
    for (let k = 0; k <= 20; k++) {
      const y = G0 - k * (G0 - G1) / 20;
      s += ln(GX - 9, y, GX - 9 - (k % 5 ? 3.5 : 7), y, CY, .6);
    }
    s += `<path d="M${GX + 9} ${f1(yL + .8)} L${GX + 15} ${f1(yL - 2.7)} L${GX + 15} ${f1(yL + 4.3)} Z" fill="${INK}"/>` + tx(GX + 17, yL + 3.6, 'S', 8.5, { ls: 0 });
    const bob = 3 * Math.sin(t * 3.2);
    s += ln(334, 290, 334, 132 + bob, CY, .7) + ah(334, 126 + bob, -Math.PI / 2, 6, CY);
    s += tx(343, 220, 'РАСТЁТ', 8, { col: CY, anc: 'middle', rot: -90, ls: 1.2 });
    // выноски
    const T = Math.round(80 - 12 * ease(clamp(lt / 2.8)));
    s += callout('1', 114, 238, 60, 300, `ЧАЙ · T ${T}°C`, 1);
    s += callout('2', 74, 200, 42, 146, 'ТЕПЛО', 1);
    return s;
  }

  // ---------- лист 3: древо Тейяра сходится в точку впереди
  const OX = 180, OY = 100, NOW = 196;
  // ветвь: от старта веером вверх до ширины xw у линии СЕЙЧАС (yw), дальше — сходится в точку (OX, OY)
  const cubAt = (P0, P1, P2, P3, q) => { const m = 1 - q; return [0, 1].map(i => m * m * m * P0[i] + 3 * m * m * q * P1[i] + 3 * m * q * q * P2[i] + q * q * q * P3[i]); };
  function branch(s0, xw, yw) {
    const W = [xw, yw], c1 = [s0[0] + (xw - s0[0]) * .12, s0[1] - 42], c2 = [xw + (s0[0] - xw) * .1, yw + 38];
    const d1 = [xw + (xw - OX) * .02, yw - 22], d2 = [OX + (xw - OX) * .2, OY + 24], E = [OX, OY];
    const seg = [[s0, c1, c2, W], [W, d1, d2, E]], pt = q => { const i = Math.min(1, Math.floor(q)); return cubAt(...seg[i], q - i); };
    const fp = v => f1(v[0]) + ' ' + f1(v[1]);
    return { pt, d: `M${fp(s0)} C${fp(c1)} ${fp(c2)} ${fp(W)} C${fp(d1)} ${fp(d2)} ${fp(E)}` };
  }
  const BRS = [[328, 64, 206], [312, 102, 192], [300, 146, 200], [298, 208, 194], [310, 254, 199], [324, 302, 208]].map(([ys, xw, yw]) => branch([180, ys], xw, yw));
  BRS.push(branch(BRS[1].pt(.45), 124, 198), branch(BRS[4].pt(.42), 231, 197));
  function fish(x, y, t) {
    const tl = 7 * Math.sin(t * 5);
    return G(P('M-9 0 C-5 -5.4 4 -5.4 8 0 C4 5.4 -5 5.4 -9 0 Z', FILL, `stroke="${INK}" stroke-width=".9" vector-effect="non-scaling-stroke"`) +
      G(P('M0 0 L5 -4 L5 4 Z', FILL, `stroke="${INK}" stroke-width=".9" stroke-linejoin="round" vector-effect="non-scaling-stroke"`), `translate(8 0) rotate(${f1(tl)})`) +
      Ci(-5, -1, .9, INK) + P('M-2.5 -3.6 C-1.5 -1 -1.5 1 -2.5 3.6', 'none', `stroke="${CY}" stroke-width=".6" vector-effect="non-scaling-stroke"`),
      `translate(${f1(x)} ${f1(y)}) scale(1.45)`);
  }
  function lizard(x, y, t) {
    const tw = 2.2 * Math.sin(t * 3);
    const sw = `stroke="${INK}" stroke-width=".9" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"`;
    return G(P(`M-9 0.6 C-14 0.6 -17 ${f1(-2 + tw)} -21 ${f1(-4.5 + tw)}`, 'none', sw) +
      P('M-6 1.5 L-8.5 5.5 M-6 -1 L-8 -4.5 M4 1.5 L6 5.5 M4 -1 L6 -4.5', 'none', sw) +
      P('M-10 0.4 C-6 -3.2 3 -3.4 7 -2 C10 -1.6 12.5 -1 13.5 0.2 C12.5 1.6 10 2 7 2.2 C3 3.4 -6 3.2 -10 0.4 Z', FILL, sw) + Ci(10.4, -0.4, .75, INK),
      `translate(${f1(x)} ${f1(y)}) scale(1.45)`);
  }
  function human(x, y, t) {
    const sw = `stroke="${INK}" stroke-width="1.3" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"`;
    const wv = 1.2 * Math.sin(t * 2.4);
    return G(R(-6, -21, 12, 26, FILL, 'opacity=".9"') + P(`M0 -12 L0 -3 M-5 ${f1(-6.5 + wv * .3)} L0 -10.6 L5 ${f1(-6.5 - wv * .3)} M-3.4 4.6 L0 -3 L3.4 4.6`, 'none', sw) +
      `<circle cx="0" cy="-15.6" r="3.2" fill="${FILL}" ${sw}/>`, `translate(${f1(x)} ${f1(y)}) scale(1.15)`);
  }
  function m3(lt, t) {
    let s = '';
    s += tx(180, 40, 'ТЕЙЯР ДЕ ШАРДЕН · 1955', 9, { col: CY, anc: 'middle', ls: 1.2 });
    // ось времени
    s += ln(24, 352, 24, 94, CY, .6) + ah(24, 88, -Math.PI / 2, 5.5, CY);
    for (let k = 0; k < 10; k++) s += ln(24, 340 - k * 26, 28, 340 - k * 26, CY, .5);
    s += tx(19, 250, 'ВРЕМЯ', 8, { col: CY, anc: 'middle', rot: -90, ls: 1.4 });
    // линия СЕЙЧАС
    s += ln(30, NOW, 332, NOW, CY, .7, 'stroke-dasharray="6 3"');
    s += tx(34, NOW - 4.5, 'СЕЙЧАС', 8, { col: CY, ls: 1 }) + tx(330, NOW - 4.5, 'ПРОЕКТ', 8, { col: CY, anc: 'end', ls: 1 });
    // ветви: прошлое — сплошные, выше СЕЙЧАС — пунктир (ещё не построено)
    const br = BRS.map(b => `<path d="${b.d}" fill="none" stroke-linecap="round"/>`).join('');
    s += `<clipPath id="bp_past"><rect x="0" y="${NOW}" width="360" height="300"/></clipPath><clipPath id="bp_fut"><rect x="0" y="0" width="360" height="${NOW}"/></clipPath>`;
    s += G(br, '', `stroke="${INK}" stroke-width="1.1" clip-path="url(#bp_past)"`);
    s += G(br, '', `stroke="${CY}" stroke-width=".95" ${DASH} clip-path="url(#bp_fut)"`);
    // тупиковые веточки (вымершие): короткий отросток и пустой кружок на конце
    [[0, .25, 13, -1], [5, .28, 13, 1], [1, .3, 10, -1], [2, .5, 10, -1], [3, .55, 10, 1], [4, .7, 10, 1], [0, .78, 10, -1], [5, .8, 10, 1], [6, .6, 9, 1], [7, .6, 9, -1]].forEach(([bi, q, len, dir]) => {
      const [x, y] = BRS[bi].pt(q), ex = x + dir * len, ey = y - len * .7;
      s += pa(`M${f1(x)} ${f1(y)} Q${f1(x + dir * len * .75)} ${f1(y - len * .1)} ${f1(ex)} ${f1(ey)}`, INK, .8) +
        `<circle cx="${f1(ex)}" cy="${f1(ey)}" r="1.7" fill="${FILL}" stroke="${INK}" stroke-width=".7"/>`;
    });
    // ствол
    s += ln(180, 358, 180, 296, INK, 1.4) + ln(166, 358, 194, 358, CY, .6) + ln(171, 361, 189, 361, CY, .5);
    // огоньки вверх по ветвям — до самой точки схода
    BRS.forEach((b, i) => {
      const q = fr(t * .22 + hash(i * 3 + 7)) * 2, [x, y] = b.pt(q);
      s += Ci(x, y, 1.7, INK, `opacity="${f1((.45 + .5 * q / 2) * Math.min(1, (2 - q) * 6, q * 6))}"`);
    });
    const tq = fr(t * .5 + .3);
    s += Ci(180, mix(356, 298, tq), 1.6, INK, `opacity="${f1(Math.sin(tq * Math.PI))}"`);
    // значки
    const cr = 8.5 + .5 * Math.sin(t * 2);
    s += `<circle cx="180" cy="341" r="${f1(cr)}" fill="${FILL}" stroke="${INK}" stroke-width="1"/>` + ci(180, 341, cr - 2.4, CY, .5, DASH) +
      Ci(181.6, 339.4, 2.8, CY) + Ci(176.4, 344, .9, CY) + Ci(184.6, 345, .8, CY);
    s += tx(166, 344, 'КЛЕТКА', 8, { anc: 'end' });
    const [fx, fy] = BRS[0].pt(.55), [lx, ly] = BRS[5].pt(.62), [hx, hy] = BRS[1].pt(.8);
    s += fish(fx, fy, t) + tx(fx - 16, fy + 3, 'РЫБА', 8, { anc: 'end' });
    s += lizard(lx, ly, t) + tx(lx + 22, ly + 3, 'ЯЩЕР', 8);
    s += human(hx, hy + 5, t) + tx(hx - 11, hy + 3, 'ЧЕЛОВЕК', 8, { anc: 'end' });
    // точка схода = огонь порядка; кольца расходятся
    for (let j = 0; j < 3; j++) {
      const q = fr(t * .45 + j / 3);
      s += ci(OX, OY, 12 + q * 38, CY, .7, `opacity="${f1((1 - q) * .65)}"`);
    }
    s += node(OX, OY, .62, t);
    s += Ci(OX + 10, OY - 9, 1.5, INK) + ln(OX + 10, OY - 9, 224, 76, INK, .6) + ln(224, 76, 320, 76, INK, .6);
    s += tx(227, 71.5, 'БОГ ВПЕРЕДИ', 13, { ls: .5 });
    return s;
  }

  // ---------- лист, рамка, штамп
  function frame() {
    let s = R(12, 16, 336, 354, 'none', `stroke="${CY}" stroke-width="1" opacity=".75"`) + R(7, 11, 346, 364, 'none', `stroke="${CY}" stroke-width=".4" opacity=".4"`);
    for (let k = 1; k < 6; k++) { const x = 12 + 56 * k; s += ln(x, 11, x, 16, CY, .4, 'opacity=".6"') + ln(x, 370, x, 375, CY, .4, 'opacity=".6"'); }
    for (let k = 0; k < 6; k++) s += tx(40 + 56 * k, 15, String(k + 1), 4.2, { col: CY, anc: 'middle', op: .6, ls: 0, halo: false });
    for (let k = 1; k < 5; k++) { const y = 16 + 70.8 * k; s += ln(7, y, 12, y, CY, .4, 'opacity=".6"') + ln(348, y, 353, y, CY, .4, 'opacity=".6"'); }
    'АБВГД'.split('').forEach((c, k) => s += tx(9.5, 16 + 35.4 + 70.8 * k + 1.5, c, 4.2, { col: CY, anc: 'middle', op: .6, ls: 0, halo: false }));
    return s;
  }
  function stamp(n, t) {
    const x0 = 222, y0 = 326, w = 126, h = 44, xc = x0 + 90;
    let s = R(x0, y0, w, h, FILL, `stroke="${INK}" stroke-width=".9"`);
    s += ln(x0, y0 + 16, xc, y0 + 16, CY, .5) + ln(x0, y0 + 30, xc, y0 + 30, CY, .5) + ln(xc, y0, xc, y0 + h, INK, .7);
    s += tx(x0 + 5, y0 + 11.6, 'ПРОЕКТ «БОГ»', 8.4, { ls: .6, halo: false });
    s += tx(x0 + 5, y0 + 25.6, 'УЗЕЛ: ОГОНЬ ПОРЯДКА', 6.3, { col: CY, ls: .1, halo: false });
    s += Ci(x0 + 7.6, y0 + 37.2, 1.9, WARM, `opacity="${f1(.3 + .7 * (.5 + .5 * Math.sin(t * 4)))}"`);
    s += tx(x0 + 12.5, y0 + 39.6, 'СТАТУС: НЕ СОЗДАН', 6.3, { col: CY, ls: .1, halo: false });
    s += tx(xc + 18, y0 + 10, 'ЛИСТ', 5.6, { col: CY, anc: 'middle', ls: 1, halo: false });
    s += tx(xc + 18, y0 + 28, '0' + n, 14, { anc: 'middle', ls: 0, halo: false });
    s += tx(xc + 18, y0 + 39, 'ИЗ 03', 5.6, { col: CY, anc: 'middle', ls: .6, halo: false });
    return s;
  }
  const DEFS = `<defs>
    <radialGradient id="bp_paper" cx=".5" cy=".34" r=".72"><stop offset="0" stop-color="#143a68"/><stop offset=".6" stop-color="#0f2f57"/><stop offset="1" stop-color="#0b264a"/></radialGradient>
    <pattern id="bp_g1" x="12" y="16" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#8ec5ff" stroke-opacity=".1" stroke-width=".5"/></pattern>
    <pattern id="bp_g5" x="12" y="16" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#8ec5ff" stroke-opacity=".2" stroke-width=".6"/></pattern>
    <pattern id="bp_hat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" stroke="#9fd3ff" stroke-width=".8"/></pattern>
    <linearGradient id="bp_bot" gradientUnits="userSpaceOnUse" x1="0" y1="376" x2="0" y2="440"><stop offset="0" stop-color="#091f3c" stop-opacity="0"/><stop offset="1" stop-color="#091f3c" stop-opacity=".82"/></linearGradient>
    <linearGradient id="bp_steam" gradientUnits="userSpaceOnUse" x1="0" y1="200" x2="0" y2="102"><stop offset="0" stop-color="#f2f8ff" stop-opacity=".9"/><stop offset="1" stop-color="#f2f8ff" stop-opacity="0"/></linearGradient>
    <linearGradient id="bp_scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd3ff" stop-opacity="0"/><stop offset="1" stop-color="#9fd3ff" stop-opacity=".22"/></linearGradient>
    <radialGradient id="bp_glow"><stop offset="0" stop-color="#d8eeff" stop-opacity=".5"/><stop offset=".45" stop-color="#8fc8ff" stop-opacity=".15"/><stop offset="1" stop-color="#8fc8ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="bp_warm"><stop offset="0" stop-color="#ffe6b8" stop-opacity=".6"/><stop offset=".5" stop-color="#ffc070" stop-opacity=".14"/><stop offset="1" stop-color="#ffc070" stop-opacity="0"/></radialGradient>
    <filter id="bp_bl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;
  const MOM = [m1, m2, m3], T0 = [0, 3, 6];

  SCENES.gfx_blueprint = function (u, p, d, t) {
    let cur, lt, prev = -1, plt = 0, kR = 1;
    if (p.m) { cur = clamp(Math.round(p.m), 1, 3) - 1; lt = u; if (p.plot) kR = eout(lin(u, 0, .8)); }
    else {
      cur = t < 3 ? 0 : t < 6 ? 1 : 2; lt = t - T0[cur];
      if (cur > 0) { kR = eout(lin(lt, 0, .8)); prev = cur - 1; plt = t - T0[prev]; }
    }
    const rY = mix(10, 378, kR);
    let g = DEFS + R(-30, -30, 420, 700, 'url(#bp_paper)') + R(-30, -30, 420, 700, 'url(#bp_g1)') + R(-30, -30, 420, 700, 'url(#bp_g5)');
    g += frame();
    if (kR < 1) {
      g += `<clipPath id="bp_cn"><rect x="0" y="0" width="360" height="${f1(rY)}"/></clipPath><clipPath id="bp_co"><rect x="0" y="${f1(rY)}" width="360" height="${f1(660 - rY)}"/></clipPath>`;
      if (prev >= 0) g += G(MOM[prev](plt, t), '', 'clip-path="url(#bp_co)"');
      g += G(MOM[cur](lt, t), '', 'clip-path="url(#bp_cn)"');
      const a = Math.sin(kR * Math.PI) * .9 + .1 * (1 - kR);
      g += R(8, rY - 26, 344, 26, 'url(#bp_scan)', `opacity="${f1(a)}"`) + ln(8, rY, 352, rY, INK, 1, `opacity="${f1(a)}" filter="url(#bp_bl)"`);
    } else g += MOM[cur](lt, t);
    g += stamp((kR < 1 && rY < 340 && prev >= 0) ? prev + 1 : cur + 1, t);
    g += R(-30, 376, 420, 300, 'url(#bp_bot)');
    return `<g id="gfx-blueprint">${g}</g>`;
  };
})();
