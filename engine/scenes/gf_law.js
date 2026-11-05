/* gf_law — «Бог ещё не создан», три части (текст eps/god_future/source/text_v21.md): конец части 1 (c10, c11) и начало
 * части 2 «От мести к милосердию» (d01–d04). Раскадровка — eps/god_future/source/storyboard_3parts.md, стиль —
 * source/storyboard.md и gf_00_lib.js (window.GF): чёрный фон, точки и нити, соты порядка, огонь порядка GF.spark, моно
 * капсом, люди из точек без лиц. Уроки слепого просмотра: на телефоне сцена ужата в .72 — главный объект на всю ширину,
 * подписи моно ≥ 12, новое событие на слове каждые 1,5–2,5 с. Красный #ff3030 — только война (d03 «до войны»).
 *
 * Шов частей: каменная плита «ОКО ЗА ОКО / ЗУБ ЗА ЗУБ» (скруглённая скрижаль 316×270, центр 180,200, моно 42, трещины-точки,
 * мелко на камне «БИБЛИЯ · КНИГА ЛЕВИТ 24:20») — последний кадр части 1 и первый кадр части 2, одна и та же поза:
 * слова высечены, камень тёплый (прощение), вокруг тёплые пылинки.
 *
 * Одна непрерывная линия времени на часть: картинка зависит только от t и K, mode — лишь имя кадра. Часть — по K
 * (есть K.c10/c11 — часть 1, есть K.d01… — часть 2; иначе по mode). Нет слова в K.words — доля фразы (DEF — для
 * scene_test без K). Камера движка нейтральна.
 *
 * Часть 1 (вход наплывом 0,5 с из gf_line/daily — его делает GF.scene; соты 6×6 с людьми ×1 у 180,240, огонь 180,88):
 *  voltaire (c10) «ответ» — огонь вспыхивает и опускается на соты (180,146), соты чуть ниже (центр 180,254);
 *               «боги» — волна света от огня по сотам; «Французский» — подпись «ВОЛЬТЕР · ФРАНЦУЗСКИЙ ФИЛОСОФ · 1769»
 *               (моно 13), «Вольтер» — она вспыхивает; «Если» — крупно печатается цитата (моно 24, три строки по словам:
 *               «Если…», «его…», «выдумать»), «Бога» — БОГА в цитате и огонь теплеют; «насмешка» — цитата качается,
 *               «нет» — встаёт ровно, черта под ней; «веру» — цитата тише, «Бога» — огонь крупнее, волна;
 *               «священной» — вместо цитаты «СВЯЩЕННАЯ СВЯЗЬ ОБЩЕСТВА» (моно 26) и мелко НАШ ПЕРЕВОД С ФРАНЦУЗСКОГО;
 *               «связью» — от каждой соты к огню тянется нить, по нитям бегут огоньки; «общества» — все соты светятся.
 *  teaser (c11) «Но» — соты, огонь и надписи гаснут; «Библии» — из темноты встаёт плита, на ней печатается
 *               «БИБЛИЯ · КНИГА ЛЕВИТ 24:20»; «суровое» — трещины-точки; «правило» — плита садится (толчок, пыль);
 *               «око», «за», «око», «зуб», «за», «зуб» — каждое слово высекается на камне по слову (моно 32, искры);
 *               «глаз» (оба) — ОКО вспыхивают тёплым; «мести» — буквы раскаляются, искры, камень вздрагивает;
 *               «прощению» — сверху вниз по камню проходит тёплый свет, трещины заживают, «милосердию» — тёплый ореол;
 *               «второй» — волна от плиты; с K.card − 0,5 рисунок тише (40 %) под карточку ЧАСТЬ 2, живут пылинки и свет.
 *  v22 (слепой просмотр части 1, 05.11: «соты под цитатой стоят 14 с», подписи мелкие, карточка налезает на плиту):
 *               своя камера на соты и огонь (cam1: «ответ» — наезд ×1,07, «Если» — отъезд ×0,84 под цитату, «священной» —
 *               наезд ×0,98); «ответ» — все соты вспыхивают тёплым, «Бога» — тёплая волна, «нет» — вспышка; подпись
 *               «ВОЛЬТЕР · 1769» моно 24 на тёмной плашке (вспыхивает на «Вольтер», гаснет на «священной»); цитата —
 *               по словам голоса (моно 24, слово выскакивает ×1,3), «насмешка» — перечёркнута пунктиром и качается,
 *               «нет» — пунктир осыпается, черта под цитатой; «СВЯЩЕННАЯ СВЯЗЬ ОБЩЕСТВА» — по словам; «связью» — нити от
 *               голов к огню, огонь растёт. Плита: источник «БИБЛИЯ · ЛЕВИТ 24:20» моно 21 на плашке; после последнего
 *               «зуб» дышит (тёплое свечение слов, искры от букв, пылинки, медленный наезд ×1,045); под карточкой —
 *               вверх и меньше (×0,56 у 180,126 — поза части 2 на «Звучит»), тише на 45 %.
 * Часть 2 (первый кадр без наплыва — сразу та же плита):
 *  hook (d01)   вверху мелко «ЧАСТЬ 2 ИЗ 3 / ЧАСТЬ 1 — В ПРОФИЛЕ КАНАЛА»; каждое слово «око за око, зуб за зуб» вспыхивает
 *               на камне, «глаз» — ОКО снова; «Звучит» — плита уходит вверх (×0,62), камень остывает, внизу две фигуры
 *               друг против друга; «месть» — они подаются вперёд, рука к руке, между ними треск-молния, дрожат;
 *               «а это» — фигуры отступают, плита встаёт между ними; «закон» — на плите печать (сота в круге), рамка,
 *               над плитой крупно ЗАКОН (моно 30).
 *  stele (d02)  «Почти» — плита вытягивается в высокую чёрную стелу (156×256), сверху печатается «ПОЧТИ 3800 ЛЕТ НАЗАД»;
 *               «назад» — на камень ложится пыль веков; «вавилонский» — подпись «ХАММУРАПИ · ЦАРЬ ВАВИЛОНА · ≈1750 ДО Н. Э.»,
 *               «Хаммурапи» — вспыхивает; «высечь» — ряды клинописи из клиньев высекаются сверху вниз (искры);
 *               «камне» — внизу «КАМЕНЬ — В МУЗЕЕ ЛУВР, ПАРИЖ»; «Если» — стела уходит влево (×0,7), справа крупно цитата
 *               § 200 (моно 22) по строкам на словах «Если», «выбил», «человеку», «равному», «то», «выбить», вверху
 *               «ЗАКОНЫ ХАММУРАПИ · § 200»; оба «зуб» — ЗУБ вспыхивает тёплым.
 *  limit (d03)  «правило» — вверху ПРАВИЛО ДЛЯ СУДА; «суда» — крупные весы (коромысло 220), на левой чаше куча ВРЕД;
 *               «наказание» — на правую чашу падает куча больше — перевес; «не больше» — лишнее улетает, «вреда» —
 *               весы ровно, между подписями «=»; «Иначе» — весы гаснут, в центре «1 УДАР»: удар рождает два («месть»),
 *               «разрасталась» — 4, 8, 16, человечки и удары краснеют; «войны» — 32 удара, всё красное, ВОЙНА; гаснет.
 *  equals (d04) «Но» — три фигуры; «только» — вверху ТОЛЬКО ДЛЯ РАВНЫХ; «равных» — над двумя СВОБОДНЫЙ = СВОБОДНЫЙ,
 *               между ними маленькие весы; «раба» — над третьим РАБ, мелко «ЗАКОНЫ ХАММУРАПИ · §§ 198–199»;
 *               «платили» — сверху к ногам раба падают монеты серебра, стопка растёт; «серебром» — серебро блестит, над стопкой СЕРЕБРО. Поза держится —
 *               из неё наплывает gf_book/old.
 * Слова-основы GF.w (сверены с build/words.json озвучки 05.11, v21):
 *   c10 — ответ, боги, французский, вольтер, если, бога (0, 1), его, выдумать, насмешка, нет, веру, священной, связью,
 *         общества; c11 — но, библии, суровое, правило, око (0, 1), за (0, 1), зуб (0, 1), глаз (0, 1), мест, прощению,
 *         милосердию, второй;
 *   d01 — око (0, 1), за (0–2), зуб (0, 1), глаз (0, 1), звучит, месть, это, закон; d02 — почти, назад, вавилонский,
 *         хаммурапи, высечь, камне, если, выбил, зуб (0, 1), человеку, равному, то, выбить; d03 — правило, суда,
 *         наказание, не, больше, вреда, иначе, месть, разрасталась, войны; d04 — но, только, равных, раба, платили, серебром.
 * Параметры p: s, mode, K (cues.json части), prev/prev_mode (наплыв — GF.scene). Важное — y≈30..345 (низ пуст под субтитры).
 * Свой id в SVG: gflaw-cl (тёплый свет по камню), gflaw-red (красная дымка войны).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  const H = n => GF.hash(n);
  const { qq, lerp, clamp } = GF;
  const q = (t, a, d = .6) => GF.q(t, a, d);
  const WARM = '#ffe6bd', RED = '#ff3030', SILVER = '#e3e8ef';
  // phrase bounds only for scene_test without K (the voice of 05.11, v21)
  const DEF = { c10: [75.83, 88.16], c11: [88.66, 98.24], d01: [0.05, 6.02], d02: [6.42, 15.74], d03: [16.04, 21.42], d04: [21.92, 25.01] };
  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GF.bare(stem);
    return ws.filter(w => GF.bare(w.w).startsWith(s)).length > n;
  };
  const W = (K, id, stem, share, n = 0) => {
    if (hasW(K, id, stem, n)) return GF.w(K, id, stem, n);
    const [a, b] = span(K, id);
    return a + share * (b - a);
  };
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const ringAt = (t, a, d = 1.1) => t >= a ? qq(t, a, a + d) : 0;
  const adv = size => .6 * UN.fs(size);
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ---------------- text ---------------- */
  function txt(x, y, s, o = {}) {
    const op = o.op ?? .95;
    if (op <= .003 || !s) return '';
    return `<text x="${f(x)}" y="${f(y)}" fill="${o.color ?? '#fff'}" opacity="${f(op)}" font-family="Plex" font-weight="600" ` +
      `font-size="${f(UN.fs(o.size ?? 12))}" text-anchor="${o.anchor ?? 'start'}"${o.glow ? ' filter="url(#un-text-glow)"' : ''}>${esc(s)}</text>`;
  }
  // typed from a fixed left edge (centred when whole: typedC)
  function typedL(x0, y, s, t, t0, o = {}) {
    if (t < t0) return '';
    const n = Math.min(s.length, Math.floor((t - t0) * (o.cps ?? 22)) + 1);
    const cur = n < s.length && Math.floor(t * 3) % 2 === 0 ? '▌' : '';
    return txt(x0, y, s.slice(0, n) + cur, o);
  }
  const x0C = (xc, s, size) => xc - s.length * adv(size) / 2;
  const typedC = (xc, y, s, t, t0, o = {}) => typedL(x0C(xc, s, o.size ?? 12), y, s, t, t0, o);
  const wrapOp = (s, op) => op <= .003 ? '' : op >= .997 ? s : `<g opacity="${f(op)}">${s}</g>`;

  /* ---------------- small drawings ---------------- */
  // a burst of sparks from (x,y) at t0 (chisel on stone)
  function burst(x, y, t, t0, seed, o = {}) {
    const d = t - t0, dur = o.dur ?? .5;
    if (d < 0 || d > dur) return '';
    const n = o.n ?? 7, u = d / dur;
    let s = '';
    for (let k = 0; k < n; k++) {
      const a = -Math.PI / 2 + (H(seed * 13 + k * 3.1) - .5) * 3.4, v = (o.v ?? 46) * (.45 + H(seed * 7 + k * 5.3));
      const px = x + Math.cos(a) * v * d, py = y + Math.sin(a) * v * d + 70 * d * d;
      s += `<circle cx="${f(px)}" cy="${f(py)}" r="${f((o.r ?? 1.5) * (1 - .5 * u))}" opacity="${f((1 - u) * .95)}"/>`;
    }
    return `<g fill="${o.color ?? WARM}"><g filter="url(#un-soft)">${s}</g>${s}</g>`;
  }
  const glowDot = (x, y, r, op, col = '#fff') => op <= .003 ? '' :
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 2.6)}" fill="${col}" opacity="${f(op * .4)}" filter="url(#un-soft)"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${col}" opacity="${f(op)}"/>`;
  const ringC = (x, y, r, op, w = 1.8, col = '#fff') => op <= .003 ? '' :
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(op)}"/>`;

  // a person of dots (formula of GF.personPts): dir — faces (+1 right), lean — upper body forward, arm — the front arm
  // reaches forward, bow — the head bows a little
  function fig(cx, gy, h, n, seed, o = {}) {
    const P = [], s = h / 100, dir = o.dir ?? 1, lean = o.lean ?? 0, arm = o.arm ?? 0, bow = o.bow ?? 0;
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3);
      let x, y;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * PI2; x = r * Math.cos(th) + dir * bow * 3; y = -91 + r * 1.12 * Math.sin(th) + bow * 5; }
      else if (i < n * .50) { y = -80 + a * 34; const wdt = 10.5 - Math.abs(y + 66) * .05; x = (b * 2 - 1) * wdt; }
      else if (i < n * .72) {
        const side = c < .5 ? -1 : 1, u = a, fr = side === dir ? arm : 0;
        x = side * (11 + lerp(6.5, 27, fr) * u) + (b - .5) * 2.6; y = -78 + lerp(31, 2, fr) * u + (b - .5) * 2;
      } else { const side = c < .5 ? -1 : 1, u = a; x = side * (3.2 + u * 2.6) + (b - .5) * 3.4; y = -46 + u * 46; }
      if (y < -46) x += dir * lean * 9 * (-46 - y) / 50;
      P.push([cx + x * s, gy + y * s]);
    }
    return P;
  }
  const figSvg = (P, t, op, amp, seed, o = {}) => op <= .003 ? '' :
    GF.dots(GF.jitter(P, t, amp, seed), { r: o.r ?? 1.4, op, t, glow: .55, color: o.color });

  /* ---------------- the stone (plate c11/d01 → stele d02) ---------------- */
  const PCX = 180, PCY = 200, PW = 316, PHT = 270;
  function stonePath(cx, cy, w, h) {
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, ah = .55 * w / 2;
    return `M${f(x0)} ${f(y1)} L${f(x0)} ${f(y0 + ah)} Q${f(x0)} ${f(y0)} ${f(cx)} ${f(y0)} Q${f(x1)} ${f(y0)} ${f(x1)} ${f(y0 + ah)} L${f(x1)} ${f(y1)} Z`;
  }
  function inside(cx, cy, w, h, x, y) {
    const y0 = cy - h / 2, ah = .55 * w / 2;
    if (y > cy + h / 2 || x < cx - w / 2 || x > cx + w / 2) return false;
    if (y >= y0 + ah) return true;
    return ((x - cx) / (w / 2)) ** 2 + ((y - y0 - ah) / ah) ** 2 <= 1;
  }
  const GRAIN = (() => { const G = []; for (let i = 0; i < 190; i++) G.push([H(i * 3.3 + 41) - .5, H(i * 5.7 + 83) - .5, H(i + 7)]); return G; })();
  // cracks of dots in unit coords (fractions of w, h): start on an edge, a jagged walk inwards; d — share along the crack
  const CRACKS = (() => {
    const C = [], starts = [[-.5, .1, .25], [.5, -.06, 2.9], [.14, .5, -1.75], [-.3, -.4, .95], [.5, .3, 3.5]];
    starts.forEach(([u0, v0, dir], ci) => {
      let u = u0, v = v0, a = dir;
      const pts = [[u, v]], steps = ci === 4 ? 4 : 7;
      for (let k = 0; k < steps; k++) {
        a += (H(ci * 37 + k * 11) - .5) * 1.1;
        u += Math.cos(a) * .052; v += Math.sin(a) * .05;
        pts.push([u, v]);
        if (k === 3 && ci < 3) {   // a short branch
          const b = a + (H(ci * 5 + 2) > .5 ? .9 : -.9);
          C.push({ pts: [[u, v], [u + Math.cos(b) * .05, v + Math.sin(b) * .045], [u + Math.cos(b) * .085, v + Math.sin(b) * .085]], d0: .5 });
        }
      }
      C.push({ pts, d0: 0 });
    });
    const D = [];
    C.forEach((c, ci) => {
      const n = c.pts.length - 1;
      for (let k = 0; k < n; k++) {
        const A = c.pts[k], B = c.pts[k + 1], m = 4;
        for (let j = 0; j < m; j++) D.push([lerp(A[0], B[0], j / m), lerp(A[1], B[1], j / m), c.d0 + (1 - c.d0) * (k + j / m) / n, ci]);
      }
    });
    return D;
  })();
  // o: op, rise (outline drawn 0..1), warm, halo, grain, crack (0..1 drawn), heal, frame, flash, sweep (−1 none, 0..1)
  function stone(cx, cy, w, h, o) {
    const op = o.op ?? 1;
    if (op <= .003) return '';
    const k = w / PW, rise = o.rise ?? 1, warm = o.warm ?? 0, d = stonePath(cx, cy, w, h), fl = o.flash ?? 0;
    let s = '';
    if ((o.halo ?? 0) > .003) s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(Math.max(w, h) * .82)}" fill="url(#gf-warm)" opacity="${f(o.halo)}"/>`;
    s += `<path d="${d}" fill="#0c0c0b" opacity="${f(.96 * rise)}"/>`;
    if (warm > .003) s += `<path d="${d}" fill="rgba(255,226,182,${f(.17 * warm)})"/>`;
    // the grain of the stone
    const gr = (o.grain ?? .6) * rise;
    if (gr > .003) {
      const P = [], A = [];
      for (const [u, v, a] of GRAIN) {
        const x = cx + u * w * .96, y = cy + v * h * .97;
        if (inside(cx, cy, w - 8 * k, h - 8 * k, x, y)) { P.push([x, y]); A.push(.4 + .6 * a); }
      }
      s += GF.dots(P, { r: .85 * Math.max(.7, Math.sqrt(k)), op: .34 * gr, glow: 0, t: 0, color: warm > .3 ? '#ffe9cc' : '#c8c8c8', alpha: i => A[i] });
    }
    // a band of warm light runs down the stone («прощению»)
    if (o.sweep != null && o.sweep > 0 && o.sweep < 1) {
      const y0 = cy - h / 2 - 30, y = lerp(y0, cy + h / 2 + 30, o.sweep);
      s += `<defs><clipPath id="gflaw-cl"><path d="${d}"/></clipPath></defs><g clip-path="url(#gflaw-cl)">` +
        `<rect x="${f(cx - w / 2)}" y="${f(y - 26)}" width="${f(w)}" height="52" fill="${WARM}" opacity=".32" filter="url(#un-soft)"/>` +
        `<rect x="${f(cx - w / 2)}" y="${f(y - 5)}" width="${f(w)}" height="10" fill="#fff8ec" opacity=".35" filter="url(#un-soft)"/></g>`;
    }
    // cracks
    const cr = o.crack ?? 0;
    if (cr > .003) {
      const heal = o.heal ?? 0, P = [], A = [];
      for (const [u, v, dd] of CRACKS) if (dd <= cr) { P.push([cx + u * w, cy + v * h]); A.push(1 - .25 * dd); }
      const col = heal > .5 ? '#ffe2b5' : '#fff';
      s += GF.dots(P, { r: 1.05 * Math.max(.75, Math.sqrt(k)), op: (.9 - .55 * heal) * rise, glow: .5 + .4 * heal, t: 0, color: col, alpha: i => A[i] });
    }
    // the inner frame of a tablet of law
    const fr = o.frame ?? .35;
    if (fr > .003) s += `<path d="${stonePath(cx, cy, w - 20 * k, h - 20 * k)}" fill="none" stroke="#fff" stroke-width="${f(.9 + .6 * fr)}" opacity="${f((.18 + .5 * fr) * rise)}" stroke-dasharray="${f(rise)} 2" pathLength="1"/>`;
    // the outline
    const dash = `pathLength="1" stroke-dasharray="${f(rise)} 2"`, oc = warm > .5 ? '#fff3dc' : '#fff';
    s += `<path d="${d}" fill="none" stroke="${warm > .2 ? WARM : '#fff'}" stroke-width="${f(5 + 3 * fl + 3 * warm)}" opacity="${f(.25 + .35 * fl + .2 * warm)}" filter="url(#un-soft)" ${dash}/>`;
    s += `<path d="${d}" fill="none" stroke="${oc}" stroke-width="${f(2 + .8 * fl)}" opacity=".97" stroke-linejoin="round" ${dash}/>`;
    return wrapOp(s, op);
  }
  // warm dust motes rising around the stone (the plate lives under the card)
  function motes(cx, cy, w, h, t, op) {
    if (op <= .003) return '';
    let s = '';
    for (let i = 0; i < 30; i++) {
      const per = 5 + 3 * H(i * 7 + 1), u = ((t / per + H(i * 3 + 2)) % 1 + 1) % 1;
      const x = cx + (H(i * 11 + 5) - .5) * w * 1.25 + 6 * Math.sin(t * .7 + i);
      const y = cy + h * .55 - u * h * 1.2, a = Math.sin(Math.PI * u);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1 + .9 * H(i + 9))}" opacity="${f(a * (.5 + .5 * H(i * 5)))}"/>`;
    }
    return `<g fill="${WARM}" opacity="${f(op)}"><g filter="url(#un-soft)">${s}</g>${s}</g>`;
  }

  // the carved words on the plate (local frame: centre 180,206); one entry per word: [line, first char, length]
  const LINES = [{ s: 'ОКО ЗА ОКО', y: 205 }, { s: 'ЗУБ ЗА ЗУБ', y: 266 }];
  const WORDS = [[0, 0, 3], [0, 4, 2], [0, 7, 3], [1, 0, 3], [1, 4, 2], [1, 7, 3]];
  const TS = 42, TX0 = 180 - 10 * .6 * TS / 2, CPS = 13;
  const LABEL = 'БИБЛИЯ · КНИГА ЛЕВИТ 24:20', LABY = 312;
  // P: carve[6] (start times or −1e9), wglow[6], heat, label (op), labT0, rule, seal (stamp time or null), sealOp
  function plateFace(t, P) {
    let s = '';
    WORDS.forEach(([li, c0, len], k) => {
      const t0 = P.carve[k];
      if (t0 == null || t < t0) return;
      const n = Math.min(len, Math.floor((t - t0) * CPS) + 1), x = TX0 + c0 * .6 * TS, y = LINES[li].y;
      const w = LINES[li].s.substr(c0, n);
      s += txt(x + 1.3, y + 1.6, w, { size: TS, color: '#000', op: .95 });
      s += txt(x, y, w, { size: TS, op: .97, glow: true });
      const g = clamp((P.wglow[k] || 0) + (P.heat || 0));
      if (g > .003) s += txt(x, y, w, { size: TS, color: P.heat > .3 ? '#fff8ec' : WARM, op: g, glow: true }) + txt(x, y, w, { size: TS, color: WARM, op: .6 * g, glow: true });
      for (let i = 0; i < n; i++) s += burst(x + (i + .5) * .6 * TS, y - 14, t, t0 + i / CPS, k * 17 + i, { n: 9, v: 60 });
    });
    // «мести»: sparks fly from every word
    if (P.heatT != null) WORDS.forEach(([li, c0, len], k) => { s += burst(TX0 + (c0 + len / 2) * .6 * TS, LINES[li].y - 12, t, P.heatT + k * .04, 300 + k, { n: 10, v: 70, dur: .7, color: '#fff3dc' }); });
    // the rule and the small source on the stone
    if (P.rule > .003) s += `<line x1="70" x2="290" y1="286" y2="286" stroke="#fff" stroke-width="1" opacity="${f(.4 * P.rule)}"/>`;
    // part 1 (v22): the source larger on a dark plate (labText, labSize, labPlate); part 2 — as before
    if (P.label > .003) {
      const lab = P.labText ?? LABEL, lsz = P.labSize ?? 13;
      if (P.labPlate && t >= P.labT0) {
        const fz = UN.fs(lsz), lw = lab.length * adv(lsz) + 20;
        s += `<rect x="${f(180 - lw / 2)}" y="${f(LABY - fz)}" width="${f(lw)}" height="${f(fz * 1.32)}" rx="3" fill="#000" stroke="#fff" stroke-width="1" stroke-opacity=".45" opacity="${f(.9 * P.label * q(t, P.labT0, .2))}"/>`;
      }
      s += wrapOp(typedC(180, LABY, lab, t, P.labT0, { size: lsz, cps: 30, op: P.labPlate ? .97 : .9 }), P.label);
    }
    // the seal of law: a cell in a ring, stamped
    if (P.seal != null && t >= P.seal - .02) {
      const u = qq(t, P.seal - .02, P.seal + .24), sc = lerp(1.7, 1, u), cx = 180, cy = 306;
      let g = ringC(cx, cy, 22, .95, 2) + ringC(cx, cy, 22, .35, 5) + ringC(cx, cy, 16.5, .7, 1);
      for (let i = 0; i < 18; i++) { const a = i / 18 * PI2; g += `<circle cx="${f(cx + 19.2 * Math.cos(a))}" cy="${f(cy + 19.2 * Math.sin(a))}" r=".9" fill="#fff" opacity=".85"/>`; }
      g += GF.hex(cx, cy, 9, { op: .97, w: 1.6, fill: 'rgba(255,255,255,.22)' }) + GF.hex(cx, cy, 9, { op: .5, w: 3, glow: true });
      s += `<g opacity="${f(u * (P.sealOp ?? 1))}">${GF.zoom(g, cx, cy, sc)}</g>`;
      s += ringC(cx, cy, 22 + 40 * ringAt(t, P.seal + .2, .8), .8 * (1 - ringAt(t, P.seal + .2, .8)) * (t > P.seal + .2 ? 1 : 0));
    }
    return s;
  }
  // the whole plate at (cx, cy) scaled z: stone + face + motes
  function plate(t, x, y, z, S, P) {
    const w = PW * z, h = PHT * z;
    let s = motes(x, y, w, h, t, S.motes ?? 0);
    s += stone(x, y, w, h, S);
    s += wrapOp(GF.zoom(plateFace(t, P), PCX, PCY, z, x, y), S.op ?? 1);
    return s;
  }

  /* ---------------- the comb of people (as gf_line/daily ends) ---------------- */
  const CX = 180, CY = 240, CR = 19.5, COLS = 6, ROWS = 6;
  const LAT = GF.lattice(CX, CY, CR, COLS, ROWS);
  const PPL = LAT.map((c, i) => GF.personPts(c[0], c[1] + 12.5, 25, 34, i + 1));
  const CDIST = LAT.map(c => clamp(Math.hypot(c[0] - CX, c[1] - (CY - 110)) / 230));
  // lit(i) 0..1, gone(i) 0..1 the cell goes dark, hot(i) 0..1 a warm flash of the cell (optional)
  function combSvg(t, lit, gone, hot) {
    let lines = '';
    const P = [], A = [];
    LAT.forEach(([x, y], i) => {
      const g = gone(i);
      if (g >= .997) return;
      const l = clamp(lit(i)), k = 1 - g;
      lines += GF.hex(x, y, CR * .96, { op: (.3 + .65 * l) * k, w: 1.25, fill: l > .85 ? `rgba(255,255,255,${f(.14 * (l - .85) / .15 * k)})` : 'none' });
      if (l > .55) lines += GF.hex(x, y, CR * .96, { op: .4 * (l - .5) * 2 * k, w: 2.6, glow: true });
      const hv = hot ? clamp(hot(i)) * k : 0;
      if (hv > .003) lines += GF.hex(x, y, CR * .96, { op: .85 * hv, w: 4, glow: true, color: WARM }) +
        GF.hex(x, y, CR * .96, { op: hv, w: 1.6, color: '#fff8ec', fill: `rgba(255,236,200,${f(.24 * hv)})` });
      PPL[i].forEach(p => { P.push(p); A.push(.95 * k); });
      for (let j = 0; j < 6; j++) { const a = Math.PI / 3 * j - Math.PI / 2; P.push([x + CR * .96 * Math.cos(a), y + CR * .96 * Math.sin(a)]); A.push(.45 * k); }
    });
    return lines + GF.dots(P, { r: 1.35, op: .9, t, glow: .5, alpha: i => A[i] });
  }

  /* ---------------- part 1: voltaire → teaser ---------------- */
  // the quote by the spoken words: [line, text, stem, share (scene_test without K), n]; «бы» n 0 and 2 («было» is n 1 of
  // «бы»), «не» n 0 («нет» is n 1)
  const Q1W = [[0, '«ЕСЛИ', 'если', .33, 0], [0, 'БЫ', 'бы', .37, 0], [0, 'БОГА', 'бога', .39, 0], [0, 'НЕ', 'не', .41, 0],
    [0, 'БЫЛО,', 'было', .42, 0], [1, 'ЕГО', 'его', .46, 0], [1, 'СЛЕДОВАЛО', 'следовало', .48, 0], [1, 'БЫ', 'бы', .51, 2],
    [2, 'ВЫДУМАТЬ»', 'выдумать', .52, 0]];
  const S1W = [[0, '«СВЯЩЕННАЯ', 'svya'], [0, 'СВЯЗЬ', 'svyaz'], [1, 'ОБЩЕСТВА»', 'obsh']];
  const lineup = W => {   // the lines and the char offset of every word in its line
    const L = [], O = [];
    W.forEach(([li, s]) => { const cur = L[li] ?? ''; O.push(cur ? cur.length + 1 : 0); L[li] = cur ? cur + ' ' + s : s; });
    return [L, O];
  };
  const [Q1L, Q1O] = lineup(Q1W), [S1L, S1O] = lineup(S1W);
  const QY = [84, 112, 140], QSZ = 24, SY = [74, 106], SSZ = 26, CAPY = 44, CAPSZ = 24;
  const CARDZ = .56, CARDY = 126;    // the plate under the card ЧАСТЬ 2 (story.py, top 232 of the frame ≈ y 222 of the scene)
  const VOLT = 'ВОЛЬТЕР · 1769', LAB1 = 'БИБЛИЯ · ЛЕВИТ 24:20', LAB1SZ = 21;
  function cues1(K) {
    const c = {};
    [c.s10, c.e10] = span(K, 'c10'); [c.s11, c.e11] = span(K, 'c11');
    const w10 = (st, sh, n = 0) => W(K, 'c10', st, sh, n), w11 = (st, sh, n = 0) => W(K, 'c11', st, sh, n);
    c.otv = w10('ответ', .04); c.bogi = w10('боги', .12); c.fr = w10('французский', .19); c.vol = w10('вольтер', .26);
    c.esli = w10('если', .33); c.boga1 = w10('бога', .39, 0); c.ego = w10('его', .46); c.vyd = w10('выдумать', .52);
    c.nasm = w10('насмешка', .62); c.net = w10('нет', .7); c.veru = w10('веру', .75); c.boga2 = w10('бога', .79, 1);
    c.svya = w10('священной', .86); c.svyaz = w10('связью', .91); c.obsh = w10('общества', .94);
    c.qw = Q1W.map(([, , st, sh, n]) => w10(st, sh, n));
    c.no = w11('но', 0); c.bib = w11('библии', .03); c.sur = w11('суровое', .11); c.prav = w11('правило', .15);
    c.carve = [w11('око', .21, 0), w11('за', .25, 0), w11('око', .27, 1), w11('зуб', .33, 0), w11('за', .36, 1), w11('зуб', .37, 1)];
    c.glaz = [w11('глаз', .45, 0), w11('глаз', .51, 1)]; c.mest = w11('мест', .69); c.prosh = w11('прощению', .74);
    c.mil = w11('милосердию', .81); c.vtor = w11('второй', .92);
    c.card = K.card != null ? K.card : c.e11;
    return c;
  }
  // the camera on the comb and the fire (not on the words): world point (180,254) stands at (180, y), scale z.
  // «ответ» → «французский» — push-in; «Если» — pull-back (room for the quote); «священной» — push-in again
  function cam1(t, c) {
    const k1 = qq(t, c.otv - .1, c.fr + .2), k2 = qq(t, c.esli - .35, c.esli + .45);
    const k3 = qq(t, c.svya - .2, c.svyaz + .2), k4 = qq(t, c.obsh - .05, c.e10 + .3);
    let z = lerp(1, 1.07, k1), y = lerp(254, 250, k1);
    z = lerp(z, .84, k2); y = lerp(y, 267, k2);
    z = lerp(z, .94, k3); y = lerp(y, 264, k3);
    z = lerp(z, .98, k4); y = lerp(y, 262, k4);
    return { z, y };
  }
  // a word that appears on its spoken word: pops from ×1.3, warm for a moment
  function popWord(x, y, s, t, a, o = {}) {
    if (t < a) return '';
    const size = o.size ?? 24, u = qq(t, a, a + .22), z = lerp(1.3, 1, u), op = q(t, a, .12) * (o.op ?? .97);
    const cx = x + s.length * adv(size) / 2, cy = y - UN.fs(size) * .35, hot = Math.min(1, (o.hot ?? 0) + .7 * (1 - u));
    let g = txt(x, y, s, { size, op, glow: true, color: o.color });
    if (hot > .003) g += txt(x, y, s, { size, op: op * hot, glow: true, color: WARM });
    return GF.zoom(g, cx, cy, z);
  }
  // a caption on a dark plate (the phone: small mono over dots is not read), typed from t0; flash 0..1 — warm
  function capPlate(xc, y, s, t, t0, o = {}) {
    if (t < t0) return '';
    const size = o.size ?? CAPSZ, fz = UN.fs(size), w = s.length * adv(size) + 24, h = fz * 1.32, a = q(t, t0 - .02, .2), fl = o.flash ?? 0;
    let g = `<rect x="${f(xc - w / 2)}" y="${f(y - fz * 1.0)}" width="${f(w)}" height="${f(h)}" rx="4" fill="#000" opacity="${f(.84 * a)}"/>` +
      `<rect x="${f(xc - w / 2)}" y="${f(y - fz * 1.0)}" width="${f(w)}" height="${f(h)}" rx="4" fill="none" stroke="${fl > .05 ? WARM : '#fff'}" stroke-width="${f(1.1 + 1.4 * fl)}" opacity="${f((.6 + .4 * fl) * a)}"/>`;
    g += typedC(xc, y, s, t, t0, { size, cps: o.cps ?? 30, op: .97, glow: true });
    if (fl > .003 && t > t0 + s.length / (o.cps ?? 30)) g += txt(xc, y, s, { size, anchor: 'middle', color: WARM, glow: true, op: .85 * fl });
    return GF.zoom(g, xc, y - fz * .35, 1 + .1 * fl);
  }
  // quiet sparks rising from the carved words (plate frame): the plate lives while the words are spoken over it
  function embers(t, op) {
    if (op <= .003) return '';
    let s = '';
    for (let i = 0; i < 22; i++) {
      const li = i % 2, per = 1.8 + 1.1 * H(i * 7 + 3), u = ((t / per + H(i * 3 + 11)) % 1 + 1) % 1;
      const x = TX0 + 6 + H(i * 5 + 2) * (10 * .6 * TS - 12) + 5 * Math.sin(t * 1.7 + i), y = LINES[li].y - 16 - u * 50;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1 + .7 * H(i + 4))}" opacity="${f(Math.sin(Math.PI * u) * (.55 + .45 * H(i * 9)))}"/>`;
    }
    return `<g fill="${WARM}" opacity="${f(op)}"><g filter="url(#un-soft)">${s}</g>${s}</g>`;
  }
  function part1(t, K) {
    const c = cues1(K);
    let s = '';
    // the comb and the fire (world): from the gf_line/daily end pose (×1 at 180,240, the fire 180,88) a little down, the
    // fire down onto it on «ответ»; the camera cam1 moves the whole group
    const mv = qq(t, c.otv - .1, c.otv + .9);
    const ty = lerp(240, 254, mv), fx = 180, fy = lerp(88, 146, mv);
    const out = qq(t, c.no - .05, c.no + .75);                       // c11 «Но»: the comb, the fire and the words go dark
    const scr = i => [LAT[i][0], ty + (LAT[i][1] - CY)];
    if (out < .997) {
      let w = '';
      // «ответ» — every cell flashes; «Бога» (the quote) — a warm wave from the fire; «нет» — a short snap of light
      const flashA = pulse(t, c.otv - .02, .1, .9), snapA = pulse(t, c.net, .06, .5);
      const lit = i => {
        const base = .8 + .14 * Math.sin(t * 1.4 + i * .7);
        const wv = pulse(t, c.bogi - .05 + CDIST[i] * .5, .15, .6) + .5 * pulse(t, c.boga2 + CDIST[i] * .5, .15, .6);
        return Math.max(base + .5 * wv + flashA + .5 * snapA, qq(t, c.obsh - .1 + CDIST[i] * .45, c.obsh + .25 + CDIST[i] * .45));
      };
      const hot = i => Math.max(.9 * flashA, .8 * pulse(t, c.boga1 + CDIST[i] * .45, .12, .55), .45 * snapA,
        .7 * pulse(t, c.obsh + CDIST[i] * .4, .12, .7), .35 * pulse(t, c.vyd + .45 + CDIST[i] * .3, .1, .5));
      const gone = i => qq(t, c.no - .05 + (1 - CDIST[i]) * .45, c.no + .3 + (1 - CDIST[i]) * .45);
      w += GF.zoom(combSvg(t, lit, gone, hot), CX, CY, 1, 180, ty);
      // threads from the fire to the top row (as daily), then on «связью» from every person to the fire, the fire grows
      const th = 1 - out;
      for (let i = 0; i < COLS; i++) {
        const p = scr(i);
        w += UN.thread([fx, fy + 8], [p[0], p[1] - CR], { opacity: (.2 + .05 * Math.sin(t * 1.3 + i)) * th * (1 - qq(t, c.svyaz, c.svyaz + .5)), width: .9 });
      }
      if (t > c.svyaz - .15) {
        LAT.forEach((_, i) => {
          const p = scr(i), hd = [p[0], p[1] - 6], a = c.svyaz - .12 + CDIST[i] * .4, u = qq(t, a, a + .42);
          if (u <= 0) return;
          const e = [lerp(hd[0], fx, u), lerp(hd[1], fy + 6, u)];
          w += UN.thread(hd, e, { opacity: (.66 + .3 * pulse(t, c.obsh + CDIST[i] * .3, .1, .5)) * th, width: 1.5 });
          w += UN.thread(hd, e, { opacity: .22 * th, width: 4, glow: true });
          if (u >= 1) {
            const v = ((t - a - .42) / 1.1 + H(i * 3)) % 1;
            w += glowDot(lerp(hd[0], fx, v), lerp(hd[1], fy + 6, v), 1.8, Math.sin(Math.PI * v) * .95 * th, WARM);
          }
        });
      }
      // the fire of order: flares on «ответ», «Бога» (the quote); grows on «веру в Бога», «связью», «общества»
      const fr = 8 * (1 + .45 * pulse(t, c.otv, .12, .6) + .35 * pulse(t, c.boga1, .1, .6) + .3 * qq(t, c.boga2 - .05, c.boga2 + .45) +
        .35 * qq(t, c.svyaz - .05, c.obsh + .4) + .25 * pulse(t, c.obsh, .12, .7));
      w += GF.spark(fx, fy, fr, { t, op: 1 - out });
      [c.otv, c.boga1, c.vyd + .4, c.boga2, c.svyaz, c.obsh].forEach(a => { const r = ringAt(t, a, 1.1); if (r > 0 && r < 1) w += ringC(fx, fy, fr + 56 * r, .8 * (1 - r) * (1 - out)); });
      const C = cam1(t, c);
      s += GF.zoom(w, 180, 254, C.z, 180, C.y);
    }
    // the words: ВОЛЬТЕР · 1769 on a plate, the quote by the words, «священная связь общества»
    const wo = 1 - qq(t, c.no - .1, c.no + .35);
    if (wo > .003) {
      let g = '';
      const co = 1 - qq(t, c.svya - .3, c.svya + .1);
      if (co > .003) g += wrapOp(capPlate(180, CAPY, VOLT, t, c.fr - .05, { flash: pulse(t, c.vol, .1, .8) }), co);
      // the quote: word by word; «Бога» warm; «выдумать» — a flash; «насмешка» — crossed out by a dashed line, it sways;
      // «нет» — the dashes fall away, the quote stands straight, a line under it; «веру» — quieter
      const qop = (1 - .5 * qq(t, c.veru - .05, c.veru + .4)) * (1 - qq(t, c.svya - .25, c.svya + .1));
      if (qop > .003 && t >= c.qw[0] - .05) {
        let qs = '';
        const bg = pulse(t, c.boga1 - .02, .1, .9);
        Q1W.forEach(([li, w0], k) => {
          const x = x0C(180, Q1L[li], QSZ) + Q1O[k] * adv(QSZ);
          qs += popWord(x, QY[li], w0, t, c.qw[k] - .03, { size: QSZ, hot: k === 2 ? bg : 0 });
        });
        const vf = pulse(t, c.vyd + .45, .08, .6);
        if (vf > .003) qs += `<g opacity="${f(.55 * vf)}">${Q1L.map((l, k) => txt(180, QY[k], l, { size: QSZ, anchor: 'middle', glow: true })).join('')}</g>`;
        const A = [26, QY[0] - 24], B = [334, QY[2] + 4], dr = qq(t, c.nasm - .08, c.nasm + .38), fall = qq(t, c.net - .04, c.net + .6);
        if (dr > .003 && fall < .997) {
          const e = [lerp(A[0], B[0], dr), lerp(A[1], B[1], dr)];
          qs += `<g transform="translate(0 ${f(34 * fall * fall)})" opacity="${f(1 - fall)}"><line x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="#fff" stroke-width="7" opacity=".25" filter="url(#un-soft)" stroke-dasharray="12 8"/>` +
            `<line x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="#fff" stroke-width="2.6" opacity=".95" stroke-dasharray="12 8" stroke-linecap="round"/></g>`;
        }
        const ul = qq(t, c.net - .02, c.net + .4);
        if (ul > .003) {
          const xa = x0C(180, Q1L[0], QSZ), xb = lerp(xa, 360 - xa, ul), uy = QY[2] + 10;
          qs += `<line x1="${f(xa)}" x2="${f(xb)}" y1="${uy}" y2="${uy}" stroke="#fff" stroke-width="6" opacity=".25" filter="url(#un-soft)"/>` +
            `<line x1="${f(xa)}" x2="${f(xb)}" y1="${uy}" y2="${uy}" stroke="#fff" stroke-width="2.4" opacity=".95" stroke-linecap="round"/>`;
        }
        const env = qq(t, c.nasm - .05, c.nasm + .15) * (1 - qq(t, c.net - .06, c.net + .06)), ph = (t - c.nasm) * PI2 * 2.3;
        const ang = env * 7 * Math.sin(ph), dy = env * 3 * Math.cos(ph * 1.3), snap = pulse(t, c.net, .06, .4);
        qs = `<g transform="translate(0 ${f(dy)}) rotate(${f(ang)} 180 ${QY[1]})">${qs}</g>`;
        if (snap > .003) qs += `<g opacity="${f(.5 * snap)}">${Q1L.map((l, k) => txt(180, QY[k], l, { size: QSZ, anchor: 'middle', glow: true })).join('')}</g>`;
        g += wrapOp(qs, qop);
      }
      if (t >= c.svya - .05) {
        S1W.forEach(([li, w0, key], k) => { g += popWord(x0C(180, S1L[li], SSZ) + S1O[k] * adv(SSZ), SY[li], w0, t, c[key] - .03, { size: SSZ }); });
        const sf = pulse(t, c.obsh + .45, .1, .7);
        if (sf > .003) g += `<g opacity="${f(.5 * sf)}">${S1L.map((l, k) => txt(180, SY[k], l, { size: SSZ, anchor: 'middle', color: WARM, glow: true })).join('')}</g>`;
        g += typedC(180, 130, 'НАШ ПЕРЕВОД С ФРАНЦУЗСКОГО', t, c.svya + .5, { size: 15, cps: 34, op: .8 });
      }
      s += wrapOp(g, wo);
    }
    // c11: the plate rises from the dark; after the last word is cut it breathes (warm glow, sparks, a slow push-in);
    // under the card ЧАСТЬ 2 it goes up and smaller (×0.56 at 180,126 — the pose of part 2 on «Звучит»)
    if (t >= c.bib - .1) {
      const rise = qq(t, c.bib - .05, c.prav + .05), land = c.prav + .05;
      const shake = 2.2 * pulse(t, land, .03, .25) * Math.sin((t - land) * 60) + 1.6 * pulse(t, c.mest, .03, .3) * Math.sin((t - c.mest) * 70);
      const cut = c.carve[5] + .45, br = qq(t, cut, cut + .9), cm = qq(t, c.card - .75, c.card + .35);
      const z = lerp(1 + .045 * qq(t, cut, c.card - .75), CARDZ, cm), y = lerp(PCY + 24 * (1 - rise) + shake, CARDY, cm);
      const warm = qq(t, c.prosh, c.mil + .3), heat = pulse(t, c.mest - .05, .12, .55);
      const S = {
        op: q(t, c.bib - .05, .5), rise, warm,
        halo: .5 * qq(t, c.mil - .1, c.mil + .7) + .15 * Math.sin(t * 1.6) * qq(t, c.mil, c.mil + .7) + .2 * br * (.6 + .4 * Math.sin(t * 1.3)),
        grain: .7, crack: qq(t, c.sur - .05, c.prav + .1), heal: qq(t, c.prosh + .2, c.mil + .2),
        frame: .35 + .4 * pulse(t, land, .05, .5), flash: pulse(t, land, .05, .5) + .6 * heat + .5 * pulse(t, c.vtor, .1, .8),
        sweep: t > c.prosh - .05 && t < c.prosh + 1.1 ? qq(t, c.prosh - .05, c.prosh + 1) : null,
        motes: Math.max(.55 * br, .9 * qq(t, c.mil - .2, c.mil + .8)),
      };
      const P = {
        carve: c.carve, heat, heatT: c.mest - .02, label: qq(t, c.bib + .2, c.prav + .1), labT0: c.bib + .25, rule: q(t, c.carve[3], .6),
        labText: LAB1, labSize: LAB1SZ, labPlate: 1,
        wglow: [0, 1, 2, 3, 4, 5].map(k => {
          const own = pulse(t, c.carve[k] + .2, .1, .6) + .22 * br * (.55 + .45 * Math.sin(t * 2.3 + k * 1.1));
          return (k === 0 || k === 2) ? Math.max(own, pulse(t, c.glaz[0] - .02 + k * .03, .1, .5), pulse(t, c.glaz[1] - .02 + k * .03, .1, .6)) : own;
        }),
      };
      s += plate(t, PCX, y, z, S, P);
      s += GF.zoom(embers(t, br * S.op), PCX, PCY, z, PCX, y);
      // dust at the foot when it lands
      if (t > land && t < land + .9) {
        let d = '';
        for (let i = 0; i < 18; i++) {
          const u = (t - land) / .9, side = i % 2 ? 1 : -1, x = PCX + side * (20 + 150 * H(i * 3)) + side * 26 * u * (.5 + H(i)), yy = 335 - 12 * u * H(i * 7) - 3;
          d += `<circle cx="${f(x)}" cy="${f(yy)}" r="${f(1.2 + H(i * 5))}" opacity="${f((1 - u) * .7)}"/>`;
        }
        s += `<g fill="#ddd">${d}</g>`;
      }
      const r2 = ringAt(t, c.vtor, 1.2);
      if (r2 > 0 && r2 < 1) s += ringC(PCX, y, (150 + 70 * r2) * z, .7 * (1 - r2), 2, WARM);
    }
    // the card ЧАСТЬ 2 (story.py) comes on a quieter picture; the plate still breathes, the sparks and motes fly
    const dim = 1 - .45 * qq(t, c.card - .5, c.card + .3);
    return dim < .999 ? `<g opacity="${f(dim)}">${s}</g>` : s;
  }

  /* ---------------- part 2: hook → stele → limit → equals ---------------- */
  function cues2(K) {
    const c = {};
    [c.s1, c.e1] = span(K, 'd01'); [c.s2, c.e2] = span(K, 'd02'); [c.s3, c.e3] = span(K, 'd03'); [c.s4, c.e4] = span(K, 'd04');
    const w1 = (st, sh, n = 0) => W(K, 'd01', st, sh, n), w2 = (st, sh, n = 0) => W(K, 'd02', st, sh, n);
    const w3 = (st, sh, n = 0) => W(K, 'd03', st, sh, n), w4 = (st, sh, n = 0) => W(K, 'd04', st, sh, n);
    c.words = [w1('око', 0, 0), w1('за', .05, 0), w1('око', .07, 1), w1('зуб', .18, 0), w1('за', .23, 1), w1('зуб', .26, 1)];
    c.glaz = [w1('глаз', .43, 0), w1('глаз', .53, 1)]; c.zv = w1('звучит', .65); c.mest = w1('месть', .75);
    c.eto = w1('это', .87); c.zak = w1('закон', .9);
    c.poch = w2('почти', 0); c.naz = w2('назад', .18); c.vav = w2('вавилонский', .21); c.ham = w2('хаммурапи', .32);
    c.vys = w2('высечь', .41); c.kam = w2('камне', .46); c.esli = w2('если', .51);
    c.ql = [c.esli, w2('выбил', .62), w2('человеку', .68), w2('равному', .75), w2('то', .83), w2('выбить', .92)];
    c.zubA = w2('зуб', .66, 0); c.zubB = w2('зуб', .96, 1);
    c.prav = w3('правило', .04); c.suda = w3('суда', .13); c.nak = w3('наказание', .25); c.ne = w3('не', .37);
    c.bol = w3('больше', .43); c.vred = w3('вреда', .48); c.inache = w3('иначе', .6); c.mest3 = w3('месть', .71);
    c.razr = w3('разрасталась', .78); c.voin = w3('войны', .91);
    c.no4 = w4('но', 0); c.tolk = w4('только', .05); c.ravn = w4('равных', .18); c.rab = w4('раба', .48);
    c.plat = w4('платили', .69); c.ser = w4('серебром', .8);
    // the generations of revenge: «Иначе» 1, «месть» 2, «разрасталась» 4 · 8 · 16, «войны» 32
    c.gen = [c.inache + .1, c.mest3, c.razr, lerp(c.razr, c.voin, .36), lerp(c.razr, c.voin, .7), c.voin];
    return c;
  }
  // stele: unit frame, cuneiform rows below the blank top band; glyph [u, v, type, row, col]
  const STW = 156, STH = 256, STX = 180, STY = 196, SBX = 84, SBY = 206, SBS = .62;
  const ROWSN = 16, COLSN = 7;
  const CUNE = (() => {
    const G = [];
    for (let r = 0; r < ROWSN; r++) for (let k = 0; k < COLSN; k++) {
      const u = -.36 + .72 * k / (COLSN - 1) + (H(r * 31 + k * 7) - .5) * .05, v = -.16 + .62 * r / (ROWSN - 1);
      G.push([u, v, Math.floor(H(r * 13 + k * 5 + 1) * 3), r, k]);
    }
    return G;
  })();
  function cuneiform(cx, cy, w, h, t, t0, dur, op) {
    if (op <= .003 || t < t0) return '';
    const g = 4.4 * w / STW, per = dur / ROWSN;
    let heads = '', tails = '', sp = '';
    for (const [u, v, ty, r, k] of CUNE) {
      const ta = t0 + r * per + k * per / COLSN;
      if (t < ta) continue;
      const x = cx + u * w, y = cy + v * h;
      if (ty === 0) { heads += `M${f(x - g)} ${f(y - g * .6)} L${f(x - g)} ${f(y + g * .6)} L${f(x - g * .15)} ${f(y)} Z `; tails += `M${f(x - g * .15)} ${f(y)} L${f(x + g * 1.2)} ${f(y)} `; }
      else if (ty === 1) { heads += `M${f(x - g * .6)} ${f(y - g)} L${f(x + g * .6)} ${f(y - g)} L${f(x)} ${f(y - g * .15)} Z `; tails += `M${f(x)} ${f(y - g * .15)} L${f(x)} ${f(y + g * 1.1)} `; }
      else tails += `M${f(x + g * .8)} ${f(y - g * .75)} L${f(x - g * .5)} ${f(y)} L${f(x + g * .8)} ${f(y + g * .75)} `;
      if (t < ta + .4) sp += burst(x, y, t, ta, r * 11 + k, { n: 5, v: 40, dur: .4 });
    }
    return `<g opacity="${f(op)}"><path d="${heads}" fill="#fff" opacity=".9"/><path d="${tails}" fill="none" stroke="#fff" stroke-width="${f(1.1 * Math.max(.75, w / STW))}" opacity=".85" stroke-linecap="round"/></g>${sp}`;
  }
  const QL = ['«ЕСЛИ ЧЕЛОВЕК', 'ВЫБИЛ ЗУБ', 'ЧЕЛОВЕКУ,', 'РАВНОМУ ЕМУ,', 'ТО ДОЛЖНЫ ЕМУ', 'ВЫБИТЬ ЗУБ»'];
  const QLX = 148, QLY0 = 112, QLDY = 32, QLS = 22;

  // the scales: pivot (cx,py), half-beam L, strings CL, pan half-width PWd; ang in degrees (+ — the right pan down)
  function scales(cx, py, L, CL, PWd, ang, op, o = {}) {
    if (op <= .003) return { svg: '', pans: [[cx - L, py + CL], [cx + L, py + CL]] };
    const a = ang * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a), k = L / 110;
    const E = [[cx - L * ca, py - L * sa], [cx + L * ca, py + L * sa]], base = o.base ?? py + 170 * k;
    let s = `<g stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
      `<line x1="${f(cx)}" y1="${f(py)}" x2="${f(cx)}" y2="${f(base)}" stroke-width="${f(2.4 * Math.max(.6, k))}" opacity=".9"/>` +
      `<path d="M${f(cx - 34 * k)} ${f(base + 8 * k)} L${f(cx)} ${f(base - 6 * k)} L${f(cx + 34 * k)} ${f(base + 8 * k)} Z" stroke-width="${f(1.8 * Math.max(.6, k))}" opacity=".85" fill="#000"/>` +
      `<line x1="${f(E[0][0])}" y1="${f(E[0][1])}" x2="${f(E[1][0])}" y2="${f(E[1][1])}" stroke-width="${f(7 * Math.max(.5, k))}" opacity=".22" filter="url(#un-soft)"/>` +
      `<line x1="${f(E[0][0])}" y1="${f(E[0][1])}" x2="${f(E[1][0])}" y2="${f(E[1][1])}" stroke-width="${f(2.8 * Math.max(.6, k))}" opacity=".97"/>`;
    const pans = [];
    for (const e of E) {
      const px = e[0], pyy = e[1] + CL;
      pans.push([px, pyy]);
      s += `<line x1="${f(e[0])}" y1="${f(e[1])}" x2="${f(px - PWd)}" y2="${f(pyy)}" stroke-width="1" opacity=".7"/>` +
        `<line x1="${f(e[0])}" y1="${f(e[1])}" x2="${f(px + PWd)}" y2="${f(pyy)}" stroke-width="1" opacity=".7"/>` +
        `<path d="M${f(px - PWd)} ${f(pyy)} Q${f(px)} ${f(pyy + PWd * .62)} ${f(px + PWd)} ${f(pyy)}" stroke-width="${f(2.2 * Math.max(.6, k))}" opacity=".97" fill="rgba(255,255,255,.06)"/>` +
        `<line x1="${f(px - PWd)}" y1="${f(pyy)}" x2="${f(px + PWd)}" y2="${f(pyy)}" stroke-width="1" opacity=".45"/>`;
    }
    s += `</g><circle cx="${f(cx)}" cy="${f(py)}" r="${f(4.2 * Math.max(.6, k))}" fill="#fff"/>`;
    return { svg: wrapOp(s, op), pans };
  }
  const HEAP = (() => {
    const P = [];
    for (let i = 0; i < 150; i++) { const u = H(i * 2.3 + 5) * 2 - 1, v = H(i * 4.1 + 9) * (1 - u * u) ** .8; P.push([u, v]); }
    return P.sort((a, b) => a[1] - b[1]);
  })();
  // a heap of n dots on a pan (x,y — the rim centre); extra: dots past n0 leave upwards (shrink 0..1); fall 0..1 per dot
  function heap(x, y, PWd, n, t, o = {}) {
    const P = [], A = [], hh = o.hh ?? 30;
    for (let i = 0; i < n; i++) {
      const [u, v] = HEAP[i];
      let px = x + u * PWd * .86, py = y - 2 - v * hh;
      if (o.fall != null) { const d = clamp((o.fall - H(i * 7 + 3) * .35) / .65); py -= (1 - d * d) * 110; if (d <= 0) continue; }
      let a = 1;
      if (o.shrink != null && i >= (o.n0 ?? n)) { const u2 = clamp((o.shrink - H(i * 5 + 1) * .3) / .7); py -= u2 * 70; px += (H(i) - .5) * 40 * u2; a = 1 - u2; if (a <= .01) continue; }
      P.push([px, py]); A.push(a);
    }
    return GF.dots(P, { r: o.r ?? 1.65, op: o.op ?? .95, t, glow: .6, color: o.color, alpha: i => A[i] });
  }
  // the chain of revenge: a radial tree; gen g node k; the parent of (g,k) is (g−1, k>>1)
  const TCX = 180, TCY = 206, TR = [0, 48, 84, 113, 136, 152];
  const node = (g, k) => {
    if (g === 0) return [TCX, TCY];
    const a = -Math.PI / 2 + (k + .5) / (1 << g) * PI2 + (H(g * 31 + k) - .5) * .25 / g;
    return [TCX + TR[g] * Math.cos(a), TCY + 6 + TR[g] * Math.sin(a) * .8];
  };
  const pawn = (x, y, sc, col, op) => op <= .003 ? '' :
    `<g fill="${col}" opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y - 7 * sc)}" r="${f(2.6 * sc)}"/>` +
    `<path d="M${f(x - 4.2 * sc)} ${f(y + 5 * sc)} Q${f(x - 4.2 * sc)} ${f(y - 3.4 * sc)} ${f(x)} ${f(y - 3.4 * sc)} Q${f(x + 4.2 * sc)} ${f(y - 3.4 * sc)} ${f(x + 4.2 * sc)} ${f(y + 5 * sc)} Z"/></g>`;
  const genCol = (g, war) => war > .5 || g >= 3 ? RED : g === 2 ? '#ff9a8a' : '#fff';

  function coin(x, y, op, spin, glint) {
    if (op <= .003) return '';
    const ry = 3.8 * Math.max(.55, Math.abs(spin));
    return `<g opacity="${f(op)}"><ellipse cx="${f(x)}" cy="${f(y)}" rx="9.5" ry="${f(ry)}" fill="${SILVER}" opacity=".85"/>` +
      `<ellipse cx="${f(x)}" cy="${f(y)}" rx="9.5" ry="${f(ry)}" fill="none" stroke="#fff" stroke-width="1.1"/>` +
      (glint > .003 ? `<circle cx="${f(x - 2)}" cy="${f(y - .8)}" r="${f(1.4 + 1.6 * glint)}" fill="#fff" opacity="${f(.85 * glint)}" filter="url(#un-soft)"/>` : '') + '</g>';
  }

  function part2(t, K) {
    const c = cues2(K);
    let s = '';
    /* d01 / d02: the plate → the law between two people → the stele of Hammurabi */
    const up = qq(t, c.zv - .05, c.zv + .55), mid = qq(t, c.eto - .25, c.zak + .1);
    const pz = lerp(lerp(1, .56, up), .64, mid), pcy = lerp(lerp(PCY, 126, up), 176, mid);
    const m = qq(t, c.poch - .05, c.poch + .9);                       // plate → stele
    const mB = qq(t, c.esli - .1, c.esli + .55);                       // the stele steps left for the quote
    const endS = 1 - qq(t, c.s3 - .1, c.s3 + .4);                      // d03: the stele goes
    if (endS > .003) {
      const sw = lerp(lerp(PW * pz, STW, m), STW * SBS, mB), sh = lerp(lerp(PHT * pz, STH, m), STH * SBS, mB);
      const sx = lerp(180, SBX, mB), sy = lerp(lerp(pcy, STY, m), SBY, mB);
      const warm = 1 - qq(t, c.zv - .1, c.mest + .2), law = q(t, c.zak - .05, .4);
      const S = {
        op: endS, rise: 1, warm, halo: .5 * warm, grain: lerp(.7, 1, q(t, c.naz - .05, .6)),
        crack: 1 - m, heal: 1 - qq(t, c.mest - .1, c.mest + .3), frame: (.35 + .6 * law) * (1 - m),
        flash: pulse(t, c.zak, .08, .7) + .8 * pulse(t, c.naz, .1, .8) + .4 * pulse(t, c.mest, .05, .4), motes: .9 * (1 - qq(t, c.zv, c.zv + .7)),
      };
      if (m < .997) {
        const P = {
          carve: [-1e9, -1e9, -1e9, -1e9, -1e9, -1e9], heat: .5 * pulse(t, c.mest - .05, .1, .5), label: 1 - qq(t, c.zv - .25, c.zv + .25), labT0: -1e9,
          rule: 1 - qq(t, c.zv - .25, c.zv + .25), seal: c.zak - .05,
          wglow: [0, 1, 2, 3, 4, 5].map(k => {
            const own = pulse(t, c.words[k] - .02, .08, .5);
            return (k === 0 || k === 2) ? Math.max(own, pulse(t, c.glaz[0] - .02 + k * .03, .1, .5), pulse(t, c.glaz[1] - .02 + k * .03, .1, .6)) : own;
          }),
        };
        s += motes(sx, sy, sw, sh, t, S.motes);
        s += stone(sx, sy, sw, sh, S);
        s += wrapOp(GF.zoom(plateFace(t, P), PCX, PCY, pz, 180, pcy), (1 - qq(t, c.poch - .1, c.poch + .35)) * endS);
      } else s += stone(sx, sy, sw, sh, S);
      // cuneiform carved row by row on «высечь»
      s += cuneiform(sx, sy, sw, sh, t, c.vys - .02, Math.max(.6, c.esli - c.vys + .05), endS * m);
      // a light band in the blank top of the stele
      if (m > .5) s += `<line x1="${f(sx - sw * .4)}" x2="${f(sx + sw * .4)}" y1="${f(sy - sh * .22)}" y2="${f(sy - sh * .22)}" stroke="#fff" stroke-width="1" opacity="${f(.45 * endS * (m - .5) * 2)}"/>`;
    }
    // d01 the small «part 2 of 3» line at the top (first frame)
    const top = 1 - qq(t, c.zv - .35, c.zv + .15);
    if (top > .003) s += wrapOp(txt(180, 32, 'ЧАСТЬ 2 ИЗ 3', { size: 16, anchor: 'middle', op: .95 }) + txt(180, 50, 'ЧАСТЬ 1 — В ПРОФИЛЕ КАНАЛА', { size: 12, anchor: 'middle', op: .75 }), top);
    // d01 two people: face each other on «Звучит», lunge on «месть» (a crackle between their hands), step back on «а это»
    const fop = q(t, c.zv + .22, .4) * (1 - qq(t, c.poch - .1, c.poch + .4));
    if (fop > .003) {
      const eng = qq(t, c.mest - .2, c.mest + .2) * (1 - qq(t, c.eto - .3, c.eto + .15)), back = qq(t, c.eto - .3, c.zak + .2);
      const GY = 338, FH = 128, xa = 74 + 16 * eng - 22 * back, xb = 286 - 16 * eng + 22 * back;
      const A = fig(xa, GY, FH, 240, 3, { dir: 1, lean: eng, arm: eng }), B = fig(xb, GY, FH, 240, 9, { dir: -1, lean: eng, arm: eng });
      s += figSvg(A, t, fop, .35 + 1.1 * eng, 3) + figSvg(B, t, fop, .35 + 1.1 * eng, 9);
      if (eng > .3) {
        const s2 = FH / 100, ha = [xa + (38 + 9) * s2 * eng + 2, GY - 76 * s2], hb = [xb - (38 + 9) * s2 * eng - 2, GY - 76 * s2];
        const fr = Math.floor(t * 14), N = 10;
        let d = `M${f(ha[0])} ${f(ha[1])}`;
        for (let i = 1; i < N; i++) d += ` L${f(lerp(ha[0], hb[0], i / N))} ${f(ha[1] + (H(fr * 17 + i) - .5) * 16)}`;
        d += ` L${f(hb[0])} ${f(hb[1])}`;
        const lo = fop * (eng - .3) / .7;
        s += `<path d="${d}" fill="none" stroke="#fff" stroke-width="5" opacity="${f(.3 * lo)}" filter="url(#un-soft)"/><path d="${d}" fill="none" stroke="#fff" stroke-width="1.6" opacity="${f(.95 * lo)}" stroke-linejoin="round"/>` +
          glowDot(ha[0], ha[1], 2.4, lo) + glowDot(hb[0], hb[1], 2.4, lo);
      }
    }
    // d01 «закон»: ЗАКОН over the plate
    const zo = 1 - qq(t, c.poch - .2, c.poch + .12);
    if (t >= c.zak - .08 && zo > .003) {
      const zz = 1 + .3 * (1 - qq(t, c.zak - .05, c.zak + .3));
      s += wrapOp(GF.zoom(typedC(180, 72, 'ЗАКОН', t, c.zak - .05, { size: 30, cps: 16, glow: true, op: .98 }), 180, 62, zz), zo);
    }
    // d02 texts: «ПОЧТИ 3800 ЛЕТ НАЗАД»; the thinker; the source; the stone in the Louvre; the quote § 200
    if (t >= c.poch - .1 && t < c.s3 + .6) {
      const o3 = 1 - qq(t, c.vav - .2, c.vav + .15);
      if (o3 > .003) s += wrapOp(typedC(180, 48, 'ПОЧТИ 3800 ЛЕТ НАЗАД', t, c.poch + .08, { size: 20, cps: 20, glow: true, op: .97 }), o3);
      const TH = 'ХАММУРАПИ · ЦАРЬ ВАВИЛОНА · ≈1750 ДО Н. Э.';
      s += GF.thinker(TH, t, c.vav + .1, c.esli + .35, { y: 40, size: 12 });
      const hp = pulse(t, c.ham, .1, .7) * (1 - qq(t, c.esli - .2, c.esli + .1));
      if (hp > .003 && t > c.vav + 1.4) s += GF.mono(180, 40, TH, { size: 12, anchor: 'middle', glow: true, opacity: .8 * hp });
      const o4 = 1 - qq(t, c.s3 - .1, c.s3 + .35);
      s += wrapOp(typedC(180, 40, 'ЗАКОНЫ ХАММУРАПИ · § 200', t, c.esli + .38, { size: 13, cps: 30, op: .92 }), o4);
      s += wrapOp(typedC(180, 342, 'КАМЕНЬ — В МУЗЕЕ ЛУВР, ПАРИЖ', t, c.kam - .02, { size: 12, cps: 30, op: .85 }), o4);
      let qs = '';
      QL.forEach((line, k) => {
        const x = k === 0 ? QLX - adv(QLS) : QLX;
        qs += typedL(x, QLY0 + k * QLDY, line, t, c.ql[k] - .03, { size: QLS, cps: 26, glow: true, op: .97 });
      });
      [[1, 6, c.zubA], [5, 7, c.zubB]].forEach(([k, off, a]) => {
        const g = pulse(t, a - .02, .1, .8);
        if (g > .003) qs += txt(QLX + off * adv(QLS), QLY0 + k * QLDY, 'ЗУБ', { size: QLS, color: WARM, glow: true, op: g });
      });
      s += wrapOp(qs, o4);
    }
    /* d03: the scales of the court → the chain of revenge */
    const sop = qq(t, c.suda - .3, c.suda + .25) * (1 - qq(t, c.inache - .3, c.inache + .1));
    const cap3 = 1 - qq(t, c.inache - .3, c.inache + .05);
    if (t >= c.prav - .1 && cap3 > .003) s += wrapOp(typedC(180, 58, 'ПРАВИЛО ДЛЯ СУДА', t, c.prav - .02, { size: 18, cps: 22, glow: true, op: .97 }), cap3);
    if (sop > .003) {
      const landed = qq(t, c.nak + .15, c.nak + .5), shrink = qq(t, c.ne - .05, c.bol + .35);
      const wr = 120 * landed - 74 * shrink, wl = 46;
      let ang = clamp((wr - wl) * .3, -16, 16);
      const b1 = c.nak + .5, b2 = c.bol + .35;
      if (t > b1) ang += 3.5 * Math.sin((t - b1) * 13) * Math.exp(-(t - b1) * 4);
      if (t > b2) ang += 2.5 * Math.sin((t - b2) * 12) * Math.exp(-(t - b2) * 4);
      const grow = qq(t, c.suda - .3, c.suda + .3), PY = lerp(170, 128, grow);
      const sc = scales(180, PY, 110 * lerp(.6, 1, grow), 72, 36, ang, sop, { base: 302 });
      s += sc.svg;
      const [pl, pr] = sc.pans;
      s += heap(pl[0], pl[1], 36, 46, t, { op: sop, r: 2.1, hh: 34 });
      if (t > c.nak - .1) s += heap(pr[0], pr[1], 36, 120, t, { op: sop, fall: qq(t, c.nak - .1, c.nak + .5), shrink, n0: 46, color: WARM, r: 2.1, hh: 34 });
      // the labels and «=»
      const vr = pulse(t, c.vred - .02, .1, .7);
      s += wrapOp(txt(72, 268, 'ВРЕД', { size: 16, anchor: 'middle', op: .95, glow: vr > .1 }) + (vr > .003 ? txt(72, 268, 'ВРЕД', { size: 16, anchor: 'middle', color: WARM, glow: true, op: vr }) : ''), sop * q(t, c.suda - .1, .4));
      s += wrapOp(txt(288, 268, 'НАКАЗАНИЕ', { size: 16, anchor: 'middle', op: .95 }), sop * q(t, c.nak - .05, .3));
      const eq = q(t, c.vred - .05, .3);
      if (eq > .003) {
        const ez = 1 + .5 * (1 - qq(t, c.vred - .05, c.vred + .3));
        s += wrapOp(`<rect x="160" y="236" width="40" height="40" fill="#000"/>` + GF.zoom(txt(180, 270, '=', { size: 40, anchor: 'middle', glow: true, op: .98 }), 180, 256, ez), eq * sop);
      }
    }
    // «Иначе»: one blow begets two, four … red war, then it goes out
    const war = qq(t, c.voin - .05, c.voin + .25), wout = 1 - qq(t, c.voin + .45, c.no4 + .15);
    if (t >= c.inache - .1 && wout > .003) {
      let g = '';
      if (war > .003) g += `<defs><radialGradient id="gflaw-red"><stop stop-color="${RED}" stop-opacity=".5"/><stop offset=".6" stop-color="${RED}" stop-opacity=".12"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient></defs>` +
        `<circle cx="${TCX}" cy="${TCY}" r="${f(170 + 8 * Math.sin(t * 3))}" fill="url(#gflaw-red)" opacity="${f(.85 * war)}"/>`;
      for (let gg = 1; gg < 6; gg++) {
        const tg = c.gen[gg];
        if (t < tg - .08) continue;
        for (let k = 0; k < (1 << gg); k++) {
          const A = node(gg - 1, k >> 1), B = node(gg, k), d = H(gg * 53 + k) * .1, u = qq(t, tg - .08 + d, tg + .14 + d);
          if (u <= 0) continue;
          const e = [lerp(A[0], B[0], u), lerp(A[1], B[1], u)], col = genCol(gg, war);
          g += `<line x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="${col}" stroke-width="${f(1.5 - .15 * gg)}" opacity=".75"/>`;
          if (u < 1) g += glowDot(e[0], e[1], 2.2, .95, col);
          else g += glowDot(B[0], B[1], 2 + 5 * pulse(t, tg + .14 + d, .05, .35), .7 * pulse(t, tg + .14 + d, .05, .45), col);
        }
      }
      for (let gg = 0; gg < 6; gg++) {
        const tg = c.gen[gg];
        if (t < tg + (gg ? .1 : -.05)) continue;
        for (let k = 0; k < (1 << gg); k++) {
          const B = node(gg, k), d = gg ? H(gg * 53 + k) * .1 + .12 : 0;
          const hit = pulse(t, tg + d, .05, .4), sc = [2.1, 1.75, 1.42, 1.18, 1, .9][gg];
          g += pawn(B[0], B[1] + 4, sc * (1 + .25 * hit), genCol(gg, war), q(t, tg + d - .03, .15) * .95);
        }
      }
      // the counter of blows
      const CNT = ['1 УДАР', '2 УДАРА', '4 УДАРА', '8 УДАРОВ', '16 УДАРОВ'];
      let cur = -1;
      for (let gg = 0; gg < 5; gg++) if (t >= c.gen[gg] + (gg ? .12 : -.02)) cur = gg;
      if (war < .5 && cur >= 0) {
        const a = c.gen[cur] + (cur ? .12 : 0), zc = 1 + .3 * (1 - qq(t, a, a + .25));
        g += GF.zoom(txt(180, 54, CNT[cur], { size: 24, anchor: 'middle', color: cur >= 3 ? RED : cur === 2 ? '#ff9a8a' : '#fff', glow: true, op: .97 }), 180, 46, zc);
      }
      if (war > .003) {
        const zw = 1 + .35 * (1 - qq(t, c.voin - .05, c.voin + .3));
        g += wrapOp(GF.zoom(txt(180, 56, 'ВОЙНА', { size: 32, anchor: 'middle', color: RED, glow: true, op: .98 }), 180, 45, zw), war);
      }
      s += wrapOp(g, wout);
    }
    /* d04: only for the equal — two free men with scales between them; the slave is paid for in silver */
    const eqo = qq(t, c.no4 - .1, c.no4 + .4);
    if (eqo > .003) {
      const GY = 334, FH = 120, XA = 58, XB = 192, XC = 306;
      const lit = qq(t, c.ravn - .05, c.ravn + .4), cl = qq(t, c.rab - .1, c.rab + .35);
      const A = fig(XA, GY, FH, 230, 21, { dir: 1 }), B = fig(XB, GY, FH, 230, 27, { dir: -1 }), C = fig(XC, GY, FH * .97, 230, 33, { dir: -1, bow: .8 });
      s += figSvg(A, t, eqo * (.8 + .2 * lit), .3, 21) + figSvg(B, t, eqo * (.8 + .2 * lit), .3, 27) + figSvg(C, t, eqo * (.55 + .4 * cl), .3, 33);
      const so = lit * eqo, sc = scales(125, 250, 32, 24, 11, 0, so, { base: 322 });
      s += sc.svg;
      if (so > .003) s += heap(sc.pans[0][0], sc.pans[0][1], 11, 14, t, { op: so, hh: 9, r: 1.3 }) + heap(sc.pans[1][0], sc.pans[1][1], 11, 14, t, { op: so, hh: 9, r: 1.3 });
      s += typedC(180, 66, 'ТОЛЬКО ДЛЯ РАВНЫХ', t, c.tolk - .02, { size: 20, cps: 24, glow: true, op: .97 * eqo });
      if (t >= c.ravn - .05) {
        s += typedC(XA, 202, 'СВОБОДНЫЙ', t, c.ravn - .02, { size: 14, cps: 26, op: .95 }) + typedC(XB, 202, 'СВОБОДНЫЙ', t, c.ravn + .08, { size: 14, cps: 26, op: .95 });
        const ez = 1 + .5 * (1 - qq(t, c.ravn + .2, c.ravn + .5));
        s += wrapOp(GF.zoom(txt(125, 205, '=', { size: 26, anchor: 'middle', glow: true, op: .97 }), 125, 197, ez), q(t, c.ravn + .2, .25));
        const sw = pulse(t, c.ravn + .25, .12, .7);
        if (sw > .003) s += glowDot(XA, GY - FH * .55, 6, .5 * sw, WARM) + glowDot(XB, GY - FH * .55, 6, .5 * sw, WARM);
      }
      if (t >= c.rab - .1) {
        s += typedC(XC, 202, 'РАБ', t, c.rab - .05, { size: 16, cps: 20, op: .95 });
        s += typedC(180, 96, 'ЗАКОНЫ ХАММУРАПИ · §§ 198–199', t, c.rab + .1, { size: 12, cps: 34, op: .8 });
      }
      // coins of silver fly to the slave's feet and stack up; «серебром» — they shine
      const PX = 256, PYb = 330, NC = 7;
      for (let k = 0; k < NC; k++) {
        const t0 = c.plat - .05 + k * .13, u = qq(t, t0, t0 + .5);
        if (u <= 0) continue;
        const a = [PX - 8 + 6 * k, 112], b = [PX + (H(k * 3) - .5) * 3, PYb - k * 4.2];
        const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u * u) - Math.sin(Math.PI * u) * 14;
        const gl = u >= 1 ? pulse(t, c.ser + k * .07, .08, .5) + .25 * Math.max(0, Math.sin(t * 2.2 + k * 1.7)) ** 8 : 0;
        s += coin(x, y, eqo, u < 1 ? Math.cos((t - t0) * 14) : 1, gl);
      }
      s += typedC(PX, 286, 'СЕРЕБРО', t, c.ser - .02, { size: 13, cps: 24, op: .92 * eqo });
      const sh = pulse(t, c.ser, .12, 1);
      if (sh > .003) {
        s += `<circle cx="${PX}" cy="${PYb - 12}" r="30" fill="url(#gf-warm)" opacity="${f(.45 * sh)}"/>`;
        for (let i = 0; i < 6; i++) { const a = i / 6 * PI2 + .3; s += `<line x1="${f(PX + 12 * Math.cos(a))}" y1="${f(PYb - 12 + 12 * Math.sin(a))}" x2="${f(PX + (12 + 14 * sh) * Math.cos(a))}" y2="${f(PYb - 12 + (12 + 14 * sh) * Math.sin(a))}" stroke="#fff" stroke-width="1.2" opacity="${f(.8 * sh)}"/>`; }
      }
    }
    return s;
  }

  const P1MODES = new Set(['voltaire', 'teaser']);
  const isP1 = (K, mode) => K.c10 != null || K.c11 != null ? true : K.d01 != null || K.d02 != null ? false : P1MODES.has(mode);
  SCENES.gf_law = GF.scene('gf_law', (t, K, mode, p) => isP1(K || {}, mode) ? part1(t, K || {}) : part2(t, K || {}));
})();
