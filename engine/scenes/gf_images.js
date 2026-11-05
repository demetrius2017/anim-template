/* gf_images — «Бог ещё не создан», часть 3 из 3 «Бог будущего» (eps/god_future_p3), фразы e04 plough · e05 skills.
 * Раскадровка — eps/god_future/source/storyboard_p3new.md (раздел gf_images), текст — source/text_v26.md:
 *   e04 «Орала — это плуги. Не понял? Вот и загвоздка: слова перевели почти для всех, а образы остались древними.
 *        Ты видел живого пастуха?»
 *   e05 «Чтобы достучаться до каждого, нужны три умения: все семь тысяч языков, образы нашего времени и совет любому —
 *        таксисту, учёному и школьнику.»
 * Словарь — gf_00_lib.js (window.GF). Стиль: чёрный фон, белые точки и нити, моно Plex капсом; люди — облака точек
 * (GF.personPts), без лиц. Бога, Иисуса, пророков не рисуем. Книга — простой контур, её не ломаем, она только тише.
 * Красного нет. Уроки слепого просмотра: сцена на телефоне ужата в .72 — главный объект на всю ширину (x 24..336),
 * линии ≥ 1,2, подписи моно ≥ 13 (важные ≥ 16), новое событие каждые 1,5–2,5 с на слове, важное — в y 20..345.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode (plough / skills) — лишь имя кадра.
 * Вход — наплыв 0,5 с из gf_reach/swords (делает GF.scene). Шов А (начало): плуг из точек, центр (180, 200), ширина ≈ 260,
 * подпись «МЕЧИ — НА ОРАЛА» (моно 18) на y 300.
 *  «Орала»      плуг теплеет (вспышка); под ним — поле (линия точек).
 *  «это плуги»  «МЕЧИ — НА ОРАЛА» уходит, по словам ОРАЛО = ПЛУГ (моно 20, y 300); плуг пашет: поле едет вправо (плуг идёт
 *               влево), за лемехом растёт тёплая борозда-гребень, из-под лемеха летят комья, колесо крутится.
 *               v6: с «это» медленный наезд на плуг и поле (×1 → ×1,3 к «слова»).
 *  «Не понял?»  на «Не» над плугом крупно «?» (моно 56); «загвоздка» — «?» вздрагивает, волна.
 *  «слова»      плуг уменьшается вверх-влево и тускнеет, поле гаснет; вверху раскрытая книга (контур), над ней СЛОВА —
 *               «перевели» — ПЕРЕВЕЛИ; снизу поднимается толпа (48 человек точками, три ряда, головы крупнее); из книги веером к толпе
 *               бегут 7 лучей со строками текста, на каждом подпись языка RU · EN · ES · SW · HI · ZH · AR (моно 16);
 *  «почти для всех» луч дошёл — над головами его части толпы зажигаются строки; у пятерых — нет, над ними
 *               маленький серый «?».
 *  «образы»     лучи и книга гаснут чуть раньше слова; над толпой четыре серых облачка-образа из точек (радиус 42, зигзагом
 *               верх · низ · верх · низ, x 54/138/222/306): ОВЦА · ПОСОХ · БУРДЮК · ПЛУГ (моно 17 на тёмной плашке),
 *               вверху ОБРАЗЫ —; «древними» — ДРЕВНИЕ, облачка сереют и осыпаются вниз.
 *  «Ты видел»   толпа уходит вниз; осыпавшиеся точки (к «живого») собираются в пастуха с посохом справа и трёх овец слева (на всю
 *               ширину); «пастуха» — вспышка, подпись ПАСТУХ (моно 16).
 *  (после фразы) города нет: точки пастуха и овец летят к головам толпы, которая сразу поднимается снизу — крупнее
 *               (×1,12) и выше, чем была; строк над головами нет.
 *  «достучаться» над головами заднего ряда слева направо выскакивают «?» (моно 15–20, всплывают) — люди с вопросами;
 *               «каждого» — по головам бежит волна колец, каждый «?» вспыхивает; у пятерых — пунктирное кольцо.
 *  «нужны три умения» толпа уходит вниз; три пустые клетки (квадрат 28, x 52, y 122/188/254) под камерой списка
 *               (listCam): сначала крупно в центре (×1,5–1,6, наезд), вверху ТРИ УМЕНИЯ (моно 22); клетки мигают рамкой.
 *  «все семь тысяч языков» камера на первой строке (×1,45–1,53); через весь кадр бегут две строки кодов языков (навстречу
 *               друг другу), в счётчик влетают коды; «семь» — счётчик 0 → 7 000 (моно 21), «языков» — 7 000+ ЯЗЫКОВ.
 *  «образы нашего времени» — камера на второй строке (×1,2–1,24), ОБРАЗЫ НАШЕГО ВРЕМЕНИ по словам (моно 16, от x 92);
 *               «совет» — ТРИ УМЕНИЯ гаснет; «любому» — камера на третьей строке со значками (×1,25–1,3), СОВЕТ КАЖДОМУ.
 *  «таксисту», «учёному», «школьнику» — под третьей клеткой (y 290, x 116/184/252, ×1,2 — так же рисует
 *               gf_phone) из точек значки: такси собирается слева на «любому —» и въезжает (линии скорости, качается на
 *               рессорах), колба с пузырьками покачивается, рюкзак падает сверху и подпрыгивает. С c.set (≈ 43,6 с, за ≥ 0,6 с
 *               до конца кадра) камера — без масштаба, всё стоит: шов Б (конец) — три пустые мигающие клетки, подписи от
 *               x 92, значки на y 290, толпы и ТРИ УМЕНИЯ нет.
 * v6-правка (05.11, слепые зрители v6): чек-лист e05 больше не «стоит» — камера списка (крупно в центре → строка 1 →
 *   строка 2 → строка 3 → поза шва Б), бегущие строки кодов, значки въезжают/качаются/падают; облачка e04 крупнее
 *   (радиус 42 вместо 37), подписи моно 17 (было 13) на плашке, значки в них крупнее; города нет — пастух сразу
 *   перетекает в толпу с «?» над головами; плюс для смены каждые 2 с: наезд на плуг, «?» на «Не», пастух собирается
 *   на «Ты видел». Швы А и Б, тексты и время фраз не менялись. Листы: qa/gf_images_v6fix_*.jpg.
 * Слова-основы GF.w (сверены с build/words.json озвучки 05.11): e04 — орала, это, плуги, понял, загвоздк, слова, перевели,
 *   почти, всех, образы, остались, древн, ты, пастух (и конец); e05 — чтобы, достучат, каждого, нужны, три, умения, все,
 *   семь, языков, образы, нашего, времени, совет, любому, таксист, ученому, школьник (и конец). Нет слова — доля фразы.
 * Параметры p: s (фраза), mode, K (cues части), prev/prev_mode (наплыв — GF.scene). Камера движка нейтральна.
 * Пик ≈ 2,8 тыс. элементов (толпа 1792 точки без свечения + облачка/пастух по 400 точек со свечением). Своих id в SVG нет.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI = Math.PI, PI2 = Math.PI * 2;
  const H = n => GF.hash(n);
  const { q, qq, lerp, clamp, ease } = GF;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const gop = (op, s) => op <= .003 || !s ? '' : op >= .999 ? s : `<g opacity="${f(op)}">${s}</g>`;
  const ring = (x, y, r0, r1, u, op, w = 1.8, col = '#fff') => u <= 0 || u >= 1 || op <= .003 ? '' :
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(lerp(r0, r1, u))}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(op * (1 - u))}"/>`;
  const grey = v => { const k = Math.round(clamp(v / 255) * 255); return `rgb(${k},${k},${k})`; };
  const WARM = '#ffe9c4';
  // phrase bounds only for scene_test without K (the voice of 05.11)
  const DEF = { e04: [26.32, 34.98], e05: [35.28, 44.01] };

  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  const hasW = (K, id, stem, n) => {
    const ws = (K.words && K.words[id]) || [], s = GF.bare(stem);
    return ws.filter(w => GF.bare(w.w).startsWith(s)).length > n;
  };
  function cues(K) {
    const c = {};
    [c.s4, c.e4] = span(K, 'e04'); [c.s5, c.e5] = span(K, 'e05');
    const W = (id, stem, share, end = false) => {
      if (hasW(K, id, stem, 0)) return end ? GF.we(K, id, stem) : GF.w(K, id, stem);
      const [a, e] = span(K, id);
      return a + share * (e - a);
    };
    c.ora = W('e04', 'орала', 0); c.eto = W('e04', 'это', .067); c.plu = W('e04', 'плуги', .102);
    c.pon = W('e04', 'понял', .212); c.zag = W('e04', 'загвоздк', .335);
    c.slo = W('e04', 'слова', .427); c.per = W('e04', 'перевели', .469); c.poc = W('e04', 'почти', .508);
    c.vse = W('e04', 'всех', .561); c.obr = W('e04', 'образы', .644); c.ost = W('e04', 'остались', .697);
    c.dre = W('e04', 'древн', .748); c.ty = W('e04', 'ты', .827); c.pas = W('e04', 'пастух', .931);
    c.pasE = W('e04', 'пастух', .991, true);
    c.cht = W('e05', 'чтобы', 0); c.dos = W('e05', 'достучат', .025); c.kaz = W('e05', 'каждого', .099);
    c.nuz = W('e05', 'нужны', .179); c.tri = W('e05', 'три', .204); c.ume = W('e05', 'умения', .227);
    c.vs5 = W('e05', 'все', .305); c.sem = W('e05', 'семь', .36); c.yaz = W('e05', 'языков', .424);
    c.ob5 = W('e05', 'образы', .511); c.nas = W('e05', 'нашего', .561); c.vre = W('e05', 'времени', .587);
    c.sov = W('e05', 'совет', .664); c.lub = W('e05', 'любому', .692);
    c.tak = W('e05', 'таксист', .765); c.uch = W('e05', 'ученому', .85); c.shk = W('e05', 'школьник', .928);
    c.shkE = W('e05', 'школьник', .99, true);
    c.set = Math.min(c.shk + .2, c.e5 - .4);        // the checklist stands in the pose of seam Б from here (no motion)
    return c;
  }

  /* ---------------- helpers: segments → evenly spaced dots ---------------- */
  const circ = (cx, cy, r, n, a0 = 0, a1 = PI2, ry = r) => {
    const S = [];
    for (let i = 0; i < n; i++) {
      const a = lerp(a0, a1, i / n), b = lerp(a0, a1, (i + 1) / n);
      S.push([cx + r * Math.cos(a), cy + ry * Math.sin(a), cx + r * Math.cos(b), cy + ry * Math.sin(b)]);
    }
    return S;
  };
  const bez = (a, c, b, n) => {
    const S = [];
    let p = a;
    for (let i = 1; i <= n; i++) {
      const u = i / n, x = (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0],
        y = (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1];
      S.push([p[0], p[1], x, y]); p = [x, y];
    }
    return S;
  };
  function along(segs, N) {
    const L = segs.map(s => Math.hypot(s[2] - s[0], s[3] - s[1]) || .001), tot = L.reduce((a, b) => a + b, 0), P = [];
    for (let i = 0; i < N; i++) {
      let d = (i + .5) / N * tot, k = 0;
      while (k < segs.length - 1 && d > L[k]) { d -= L[k]; k++; }
      const u = clamp(d / L[k]), s = segs[k];
      P.push([lerp(s[0], s[2], u), lerp(s[1], s[3], u)]);
    }
    return P;
  }
  const segPath = segs => segs.map(s => `M${f(s[0])} ${f(s[1])} L${f(s[2])} ${f(s[3])}`).join(' ');
  const resample = (P, N) => Array.from({ length: N }, (_, i) => P[Math.floor(i * P.length / N)]);
  const lerpP = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];

  /* ---------------- text: words of one mono line on their words (pop + flash) ---------------- */
  function words(x, y, items, size, t, o = {}) {
    const adv = .6 * UN.fs(size);
    const total = items.reduce((n, it) => n + it[0].length, 0) + items.length - 1;
    let pos = o.anchor === 'start' ? x : x - total * adv / 2, s = '';
    for (const [text, t0] of items) {
      if (t >= t0 - .03) {
        const k = q(t, t0 - .03, .12), pop = 1 + .3 * Math.min(1, 18 / size) * (1 - qq(t, t0 - .03, t0 + .25)), fl = pulse(t, t0 - .03, .05, .5);
        let g = GF.mono(pos, y, text, { size, anchor: 'start', opacity: (o.op ?? .96) * k, glow: o.glow });
        if (fl > .02) g += `<g opacity="${f(.75 * fl)}">${GF.mono(pos, y, text, { size, anchor: 'start', opacity: 1, glow: true })}</g>`;
        s += GF.zoom(g, pos + text.length * adv / 2, y - size * .35, pop);
      }
      pos += (text.length + 1) * adv;
    }
    return s;
  }

  /* ---------------- the plough (side view): local units, origin at (PCX, PCY); ground at local y 49 ---------------- */
  const PCX = 182, PCY = 200, PGY = 49, WHL = [-100, 30, 19];
  let PL = null;
  function plough0() {
    if (PL) return PL;
    const segs = [
      [58, 21, -122, -9], [58, 24.5, -120, -5.5],                    // the beam (two rows)
      ...circ(-128, -10, 5, 8),                                       // the hitch ring
      ...circ(WHL[0], WHL[1], WHL[2], 24),                            // the wheel rim
      [-100, -5, -100, 12],                                           // the wheel stand
      [22, 15, 16, 42], [25.5, 15, 19.5, 42],                         // the post
      [34, 42, 112, -51], [52, 32, 128, -45], [77, -9, 94, -10],      // the handles and the rung
      [-24, 51, 38, 49], [38, 49, 46, 16],                            // the moldboard: bottom and back
      ...bez([46, 16], [-4, 20], [-24, 51], 8),                       // the moldboard: curved front
    ];
    const P = along(segs, 300);
    // the moldboard filled with a few dots
    const F = u => { const a = [46, 16], c = [-4, 20], b = [-24, 51]; return [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]; };
    const G = u => u < .5 ? lerpP([46, 16], [38, 49], u * 2) : lerpP([38, 49], [-24, 51], u * 2 - 1);
    for (let i = 1; i < 9; i++) for (const v of [.35, .7]) P.push(lerpP(F(i / 9), G(i / 9), v));
    PL = { P, lines: segPath(segs.filter((s, i) => i < 2 || i >= 2 + 8 + 24)) };
    return PL;
  }
  // three spokes of the wheel turned by angle a
  function spokes(a) {
    const P = [];
    for (let k = 0; k < 3; k++) {
      const b = a + k * PI / 3, dx = Math.cos(b) * 17, dy = Math.sin(b) * 17;
      for (let j = 0; j <= 8; j++) P.push([WHL[0] - dx + 2 * dx * j / 8, WHL[1] - dy + 2 * dy * j / 8]);
    }
    return P;
  }
  function plough(t, z, tx, ty, op, glow, roll, rock) {
    if (op <= .003) return '';
    const B = plough0();
    const P = GF.jitter(B.P.concat(spokes(roll)).map(p => [PCX + p[0], PCY + p[1] + rock]), t, .3, 5);
    let s = '';
    if (glow > .003) s += `<ellipse cx="${PCX}" cy="${PCY}" rx="150" ry="80" fill="url(#gf-warm)" opacity="${f(.85 * glow)}"/>`;
    s += `<g transform="translate(${PCX} ${f(PCY + rock)})"><circle cx="${WHL[0]}" cy="${WHL[1]}" r="${WHL[2]}" fill="none" stroke="#fff" stroke-width="1.4" opacity="${f(.4 + .3 * glow)}"/>` +
      `<path d="${B.lines}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity="${f(.4 + .3 * glow)}"/></g>`;
    s += GF.dots(P, { r: 1.6, op: .95, t, glow: .5 + .4 * glow });
    return gop(op, GF.zoom(s, 180, 200, z, tx, ty));
  }
  // the field under the plough: it slides right while the plough ploughs (the plough goes left); a warm ridge grows
  // behind the share, clods fly up from it
  const GX0 = 14, GX1 = 346, GW = GX1 - GX0, GN = 90, GY = PCY + PGY, TIPX = PCX - 24, SPD = 40;
  function field(t, c, op, moving) {
    if (op <= .003) return '';
    const sh = SPD * Math.max(0, t - c.plu);
    const flat = [], ridge = [];
    for (let i = 0; i < GN; i++) {
      const x = GX0 + ((i * GW / GN + (H(i * 3.3 + 1) - .5) * 2.5 + sh) % GW + GW) % GW;
      if (x > TIPX + 4 && x < TIPX + 4 + sh) ridge.push([x, GY - 2 - 4 * H(i * 7.1)], [x + 1.8, GY - 7 - 5 * H(i * 5.3)], [x - 1.5, GY - 12 - 4 * H(i * 2.9)]);
      else flat.push([x, GY + 1 + (H(i * 2.7) - .5) * 1.6]);
    }
    let s = `<line x1="${GX0}" y1="${GY + 2}" x2="${GX1}" y2="${GY + 2}" stroke="#fff" stroke-width="1.3" opacity=".42"/>` +
      GF.dots(flat, { r: 1.25, op: .65, t, glow: 0 }) + GF.dots(ridge, { r: 1.7, op: .95, t, glow: .7, color: WARM });
    if (moving > .003) {
      let cl = '';
      for (let k = 0; k < 9; k++) {
        const u = (((t - c.plu) * 1.7 + k / 9) % 1 + 1) % 1, x = TIPX + 4 + 46 * u + 6 * H(k), y = GY - 3 - 34 * u * (1 - u) * (1 + H(k * 3));
        cl += `<circle cx="${f(x)}" cy="${f(y)}" r="1.8" opacity="${f(.9 * Math.sin(PI * u) * moving)}"/>`;
      }
      s += `<g fill="${WARM}">${cl}</g>`;
    }
    return gop(op, s);
  }

  /* ---------------- the book (open, simple contour) and the rays of translation ---------------- */
  const BX = 180, BT = 58, BW = 56, BH = 54, RY0 = BT + BH + 8, RY1 = 236;
  const RX = [36, 84, 132, 180, 228, 276, 324], CODES = ['RU', 'EN', 'ES', 'SW', 'HI', 'ZH', 'AR'];
  function book(t, op, lit) {
    if (op <= .003) return '';
    const L = `M${BX} ${BT + 4} Q${BX - 26} ${BT - 5} ${BX - BW} ${BT} L${BX - BW} ${BT + BH} Q${BX - 26} ${BT + BH - 4} ${BX} ${BT + BH + 5} Z`;
    const R = `M${BX} ${BT + 4} Q${BX + 26} ${BT - 5} ${BX + BW} ${BT} L${BX + BW} ${BT + BH} Q${BX + 26} ${BT + BH - 4} ${BX} ${BT + BH + 5} Z`;
    let s = `<ellipse cx="${BX}" cy="${BT + BH / 2}" rx="92" ry="62" fill="url(#gf-warm)" opacity="${f(.4 + .5 * lit)}"/>` +
      `<path d="${L} ${R}" fill="none" stroke="${WARM}" stroke-width="6" opacity="${f(.25 + .35 * lit)}" filter="url(#un-soft)"/>` +
      `<path d="${L} ${R}" fill="#060606" stroke="#fff" stroke-width="1.8" stroke-linejoin="round" opacity=".96"/>`;
    for (const side of [-1, 1]) for (let r = 0; r < 5; r++) {
      const y = BT + 12 + r * 8.5, x0 = BX + side * 8, x1 = BX + side * (BW - 8) * (r === 4 ? .6 : 1), da = [];
      for (let k = 0; k < 6; k++) da.push(f(4 + 9 * H(r * 11 + k + side * 5)), f(3 + 2 * H(r * 7 + k)));
      s += `<line x1="${x0}" y1="${y}" x2="${f(x1)}" y2="${y}" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="${da.join(' ')}" opacity="${f(.5 + .25 * Math.sin(t * 3 + r + side))}"/>`;
    }
    s += `<line x1="${BX}" y1="${BT + 4}" x2="${BX}" y2="${BT + BH + 5}" stroke="#fff" stroke-width="1.5" opacity=".85"/>`;
    return gop(op, s);
  }
  const land = (c, k) => c.per - .05 + k * .11 + .42;      // the ray k reaches the crowd
  function rays(t, c, op) {
    if (op <= .003) return '';
    let s = '', g0 = '';
    for (let k = 0; k < 7; k++) {
      const L0 = c.per - .05 + k * .11, g = qq(t, L0, L0 + .42);
      if (g <= 0) continue;
      const a = [BX, RY0], b = [RX[k], RY1], e = lerpP(a, b, g);
      g0 += `<line x1="${a[0]}" y1="${a[1]}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="${WARM}" stroke-width="5"/>`;
      s += `<line x1="${a[0]}" y1="${a[1]}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="#fff" stroke-width="1.4" opacity=".7"/>`;
      if (g < 1) s += `<circle cx="${f(e[0])}" cy="${f(e[1])}" r="3.4" fill="#fff" opacity=".95" filter="url(#un-soft)"/>`;
      else for (let j = 0; j < 2; j++) {
        // a line of text running down the ray
        const u = ((t * .85 + j * .5 + k * .13) % 1 + 1) % 1, p = lerpP(a, b, u), op2 = Math.sin(PI * u);
        for (let r = 0; r < 3; r++) s += `<line x1="${f(p[0] - 6)}" x2="${f(p[0] + 6 - 4 * (r === 2))}" y1="${f(p[1] - 3 + r * 3)}" y2="${f(p[1] - 3 + r * 3)}" stroke="#fff" stroke-width="1.3" opacity="${f(.9 * op2)}"/>`;
      }
      const lq = q(t, L0 + .22, .2);
      if (lq > .003) {
        const lp = lerpP(a, b, .74), z = 1 + .5 * (1 - qq(t, L0 + .22, L0 + .5));
        const lab = `<rect x="${f(lp[0] - 15)}" y="${f(lp[1] - 13)}" width="30" height="19" rx="3" fill="#000" stroke="#fff" stroke-width="1.2" opacity=".9"/>` +
          GF.mono(lp[0], lp[1] + 2, CODES[k], { size: 16, anchor: 'middle', opacity: .98, glow: true });
        s += gop(lq, GF.zoom(lab, lp[0], lp[1] - 4, z));
      }
    }
    return gop(op, `<g filter="url(#un-soft)" opacity=".3">${g0}</g>${s}`);
  }

  /* ---------------- the crowd: 60 people of dots in three rows; a line of light over a head ---------------- */
  // rows: [feet y, height, dots, people, x0, step] — back 18, middle 16, front 14 (48 people); heads stay apart
  const ROWS = [[282, 38, 30, 18, 24, 18], [306, 46, 38, 16, 26, 20.5], [336, 56, 46, 14, 30, 23]];
  const UNLIT = new Set([36, 41, 45, 21, 28]);
  let CR = null;
  function crowd0() {
    if (CR) return CR;
    CR = [];
    ROWS.forEach(([gy, h0, n, cnt, x0, dx], j) => {
      for (let i = 0; i < cnt; i++) {
        const x = x0 + i * dx + (H(j * 41 + i * 3.7) - .5) * 4, h = h0 * (.93 + .14 * H(j * 13 + i * 5.1));
        CR.push({ x, gy, h, n, row: j, P: GF.personPts(x, gy, h, n, 100 + j * 20 + i), head: gy - .91 * h });
      }
    });
    return CR;
  }
  const zone = x => { let b = 0; for (let k = 1; k < 7; k++) if (Math.abs(RX[k] - x) < Math.abs(RX[b] - x)) b = k; return b; };
  function crowd(t, c, dy, op, lit = 1) {          // lit — the lines over the heads (e04); e05 has «?» there instead
    if (op <= .003) return '';
    const C = crowd0();
    let s = '', L = '', G = '', R = '';
    for (let j = 0; j < 3; j++) {
      let P = [];
      const SZ = [];
      for (const p of C) if (p.row === j) { P = P.concat(p.P); p.P.forEach((_, m) => SZ.push(m < p.n * .14 ? 1.35 : 1)); }
      P = GF.jitter(P, t, .4, j * 7 + 1).map(p => [p[0], p[1] + dy]);
      s += GF.dots(P, { r: [1.15, 1.3, 1.45][j], op: [.42, .68, .95][j], t, glow: 0, size: i => SZ[i] });
    }
    C.forEach((p, i) => {
      const hy = p.head + dy, ly = hy - 8 - p.h * .05;
      // «до каждого»: a wave of rings over the heads (left → right); the unlit ones keep a ring
      const a = c.kaz - .12 + p.x / 360 * .45;
      R += ring(p.x, hy - 2, 3, 15, qq(t, a, a + .5), .85, 1.3);
      if (UNLIT.has(i)) {
        const u = q(t, c.kaz + .2, .3);
        if (u > .003) R += `<circle cx="${f(p.x)}" cy="${f(hy - 2)}" r="${f(8.5 + 1.5 * Math.sin(t * 5 + i))}" fill="none" stroke="#fff" stroke-width="1.4" stroke-dasharray="3 2.4" opacity="${f(.9 * u)}"/>`;
        // «почти»: no line over these heads — a small grey «?» instead, until the images come
        const qo = q(t, c.vse + .15, .25) * (1 - qq(t, c.obr - .1, c.obr + .2));
        if (qo > .003) R += GF.mono(p.x, ly + 4, '?', { size: 13, anchor: 'middle', opacity: .75 * qo });
        return;
      }
      const la = land(c, zone(p.x)) + .03 * p.row, on = q(t, la, .2), fl = pulse(t, la, .05, .45);
      if (on <= .003) return;
      const w = 3 + p.h * .07;
      const ln = `<line x1="${f(p.x - w)}" x2="${f(p.x + w)}" y1="${f(ly)}" y2="${f(ly)}" stroke-linecap="round"`;
      L += `${ln} stroke="${WARM}" stroke-width="${f(1.7 + 1.3 * fl)}" opacity="${f(on * (.8 + .2 * Math.sin(t * 3 + i)))}"/>`;
      G += `${ln} stroke="${WARM}" stroke-width="5" opacity="${f(.55 * on + .4 * fl)}"/>`;
    });
    return gop(op, s + gop(lit, `<g filter="url(#un-soft)">${G}</g>${L}`) + R);
  }

  /* ---------------- the ancient images: four grey bubbles over the crowd ---------------- */
  // v6: bigger bubbles (radius 42) in a zigzag upper · lower · upper · lower, so they do not touch; labels mono 17
  const BUB = [54, 138, 222, 306], BUBYS = [118, 166, 118, 166], BR = 42, BLAB = ['ОВЦА', 'ПОСОХ', 'БУРДЮК', 'ПЛУГ'];
  const NN = 400, NB = 100;            // dots of all the images; per bubble: 56 outline + 44 icon
  // a sheep facing left, body centre (cx,cy), scale s → 44 dots: woolly outline, a little wool, solid head, legs
  function sheep(cx, cy, s, seed) {
    const P = [];
    for (let i = 0; i < 20; i++) { const a = i / 20 * PI2, r = 1 + .13 * Math.abs(Math.cos(4 * a)); P.push([cx + 14 * s * r * Math.cos(a), cy + 8.5 * s * r * Math.sin(a)]); }
    for (let i = 0; i < 8; i++) { const a = H(seed + i * 3.1) * PI2, r = Math.sqrt(H(seed + i * 5.7)) * .6; P.push([cx + 14 * s * r * Math.cos(a), cy + 8.5 * s * r * Math.sin(a)]); }
    for (let i = 0; i < 8; i++) { const a = i / 8 * PI2, r = i % 2 ? 1 : .45; P.push([cx - 19 * s + 4.6 * s * r * Math.cos(a), cy - 6 * s + 3.4 * s * r * Math.sin(a)]); }
    for (const lx of [-9, -4, 5, 10]) for (let j = 0; j < 2; j++) P.push([cx + lx * s, cy + (10.5 + 4.5 * j) * s]);
    return P;
  }
  // a shepherd's staff with the crook (44 dots)
  const staffIcon = (cx, cy, s) => along([[cx, cy + 15 * s, cx, cy - 8 * s], [cx + 1.2 * s, cy + 15 * s, cx + 1.2 * s, cy - 8 * s],
    ...circ(cx + 5 * s, cy - 8 * s, 5 * s, 8, PI, PI2), [cx + 10 * s, cy - 8 * s, cx + 10 * s, cy - 4 * s]], 44);
  // a wineskin (БУРДЮК): a lying goat-skin bag, its neck up-left tied with a cord, two leg stumps, a strap (44 dots)
  const skin = (cx, cy, s) => along([...circ(cx + 2 * s, cy + 5 * s, 15 * s, 18, -PI * .655, PI * 1.222, 9 * s),
    [cx - 10 * s, cy - 1 * s, cx - 15 * s, cy - 11 * s], [cx - 5 * s, cy - 3 * s, cx - 10 * s, cy - 13 * s],
    [cx - 17 * s, cy - 9 * s, cx - 9 * s, cy - 13 * s], [cx - 16 * s, cy - 13 * s, cx - 11 * s, cy - 15.5 * s],
    [cx + 9 * s, cy + 12 * s, cx + 11 * s, cy + 16 * s], [cx - 4 * s, cy + 13 * s, cx - 5 * s, cy + 17 * s],
    ...bez([cx - 11 * s, cy - 8 * s], [cx + 2 * s, cy - 20 * s], [cx + 15 * s, cy], 6)], 44);
  let BS = null;
  function bubbles0() {
    if (BS) return BS;
    BS = [];
    BUB.forEach((x, k) => {
      const by = BUBYS[k];
      for (let i = 0; i < 56; i++) { const a = i / 56 * PI2, r = 1 + .06 * Math.cos(7 * a); BS.push([x + BR * r * Math.cos(a), by + BR * r * Math.sin(a)]); }
      const I = k === 0 ? sheep(x + 5, by - 14, 1.6, 7) : k === 1 ? staffIcon(x - 5, by - 13, 1.7) : k === 2 ? skin(x + 1, by - 12, 1.35) :
        resample(plough0().P, 44).map(p => [x + p[0] * .28, by - 10 + p[1] * .28]);
      BS.push(...resample(I, 44));
    });
    return BS;
  }
  // the shepherd with his staff (right) and three sheep (left), big: resampled to 400 dots
  let T1 = null;
  function shepherd0() {
    if (T1) return T1;
    const P = GF.personPts(242, 304, 170, 196, 9);
    const S = along([[274, 304, 274, 134], ...circ(264, 134, 10, 8, 0, -PI), [254, 134, 254, 141]], 64);
    const sh = [];
    [[54, 282], [118, 286], [182, 282]].forEach(([x, y], k) => sh.push(...sheep(x, y, 1.55, 20 + k * 7), ...sheep(x, y, 1.55, 40 + k * 7).slice(20, 28)));
    T1 = resample(P.concat(S, sh), NN);
    return T1;
  }
  // v6: no city (blind viewers: «город — зачем?»). After «пастуха» the shepherd's dots fly to the heads of the e05 crowd
  // and go out there; the crowd rises bigger (×1.12 around (180, 300)) with a «?» over every head of the back row.
  const CZ = 1.12, CZY = 300;
  const czx = x => 180 + (x - 180) * CZ, czy = y => CZY + (y - CZY) * CZ;
  function headsTo(dy) {
    const C = crowd0();
    return Array.from({ length: NN }, (_, i) => {
      const p = C[i % C.length];
      return [czx(p.x + (H(i * 2.3) - .5) * 6), czy(p.head + dy + (H(i * 4.1) - .5) * 6)];
    });
  }
  // «достучаться»: the «?» pop left → right (sizes 15..20, they float up a little); «каждого» — each flashes as the wave passes
  function asks(t, c, dy) {
    let s = '';
    crowd0().forEach((p, i) => {
      if (p.row !== 0) return;
      const a = c.dos - .12 + p.x / 360 * .5, op = q(t, a, .18);
      if (op <= .003) return;
      const w = c.kaz - .12 + p.x / 360 * .45, fl = pulse(t, w, .06, .4), sz = 15 + 5 * H(i * 7.7);
      const y = p.head + dy - 9 - 10 * H(i * 3.3) * qq(t, a, a + 1.4) - 2 * Math.sin(t * 2.3 + i);
      const z = 1 + .7 * (1 - qq(t, a, a + .3)) + .35 * fl;
      s += GF.zoom(GF.mono(p.x, y, '?', { size: sz, anchor: 'middle', opacity: .92 * op, glow: fl > .2 || H(i * 5.1) > .7 }), p.x, y - 5, z);
    });
    return s;
  }

  /* ---------------- e05: three empty cells, labels, icons ---------------- */
  const CXC = 52, CYC = [122, 188, 254], CS = 28, LBX = 92;
  const ICX = [116, 184, 252], ICY = 290, ICS = 1.2;   // seam Б: gf_phone draws the same icons here
  const STREAM = ['RU', 'EN', 'ES', 'SW', 'HI', 'ZH', 'AR', 'FR', 'DE', 'PT', 'TR', 'UK', 'YO'];
  function cells(t, c) {
    let s = '';
    const fls = [c.yaz, c.ob5, c.sov];
    for (let k = 0; k < 3; k++) {
      const a = c.tri - .05 + k * .14, op = q(t, a, .25);
      if (op <= .003) continue;
      const z = 1 + .7 * (1 - qq(t, a, a + .35)), y = CYC[k];
      const bl = .5 + .5 * Math.sin(t * 4.4 + k * 2.1), fl = clamp(pulse(t, fls[k] - .05, .1, .6) + pulse(t, a, .05, .5));
      const r = `x="${f(CXC - CS / 2)}" y="${f(y - CS / 2)}" width="${CS}" height="${CS}" rx="3.5"`;
      const g = `<rect ${r} fill="rgba(255,255,255,${f(.04 + .12 * fl)})" stroke="#fff" stroke-width="5" opacity="${f(.2 * bl + .45 * fl)}" filter="url(#un-soft)"/>` +
        `<rect ${r} fill="none" stroke="#fff" stroke-width="2.4" opacity="${f(.5 + .5 * bl)}"/>`;
      s += gop(op, GF.zoom(g, CXC, y, z));
    }
    return s;
  }
  const taxiSegs = () => [[-24, -3, -13, -3], [-13, -3, -8, -13], [-8, -13, 9, -13], [9, -13, 15, -3], [15, -3, 24, -3], [24, -3, 24, 7],
    [24, 7, 19, 7], [9, 7, -9, 7], [-19, 7, -24, 7], [-24, 7, -24, -3], [0.5, -13, 0.5, -3], ...circ(-14, 8, 5, 10), ...circ(14, 8, 5, 10)];
  const flaskSegs = () => [[-7, -17, 7, -17], [-4, -17, -4, -6], [4, -17, 4, -6], [-4, -6, -15, 13], [4, -6, 15, 13], [-15, 13, 15, 13], [-10, 4, 10, 4]];
  const packSegs = () => [[-8, -12, 8, -12], ...circ(8, -7, 5, 3, -PI / 2, 0), [13, -7, 13, 11], ...circ(8, 11, 5, 3, 0, PI / 2), [8, 16, -8, 16],
    ...circ(-8, 11, 5, 3, PI / 2, PI), [-13, 11, -13, -7], ...circ(-8, -7, 5, 3, PI, PI * 1.5), ...circ(0, -12, 5, 6, PI, PI2),
    [-8, 3, 8, 3], [8, 3, 8, 12], [8, 12, -8, 12], [-8, 12, -8, 3], [-13, -3, 13, -3]];
  const ICONS = [taxiSegs, flaskSegs, packSegs];
  // v6: the icons move while they come (no motion after c.set — seam Б): the taxi drives in from the left with speed
  // lines and rocks on its springs; the flask swirls (tilts) with two more bubbles; the backpack drops in and bounces
  function icon(k, t, a, c) {
    const g = k === 0 ? qq(t, a - .32, a + .05) : qq(t, a - .08, a + .42);
    if (g <= 0) return '';
    const still = 1 - qq(t, c.set - .35, c.set);
    let ox = 0, oy = 0, ang = 0, sl = '';
    if (k === 0) {
      const u = clamp((t - (a - .34)) / .75), v = (1 - u) * (1 - u);
      ox = -84 * v;
      oy = -1.3 * Math.abs(Math.sin(t * 12)) * qq(t, a + .3, a + .6) * still;
      if (v > .02) for (let j = 0; j < 3; j++) {
        const yy = ICY + [-8, -2, 4][j] * ICS, x1 = ICX[0] + ox - 29 * ICS - 3 * j, len = (12 + 26 * H(j * 3.1)) * Math.sqrt(v);
        sl += `<line x1="${f(x1 - len)}" y1="${f(yy)}" x2="${f(x1)}" y2="${f(yy)}" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="${f(.85 * Math.sqrt(v))}"/>`;
      }
    } else if (k === 1) ang = 11 * Math.sin((t - a) * 8.5) * qq(t, a + .05, a + .35) * still;
    else {
      const d = clamp((t - (a - .14)) / .26), b = clamp((t - (a + .12)) / .14);
      oy = d < 1 ? -36 * (1 - d * d) : -6 * Math.sin(PI * b);
    }
    const segs = ICONS[k](), x = ICX[k] + ox, y = ICY + oy;
    const P = along(segs, 46).map(p => [x + p[0] * ICS, y + p[1] * ICS]);
    const src = GF.cloud(46, 60 + k, [x - 46, y - 56, x + 46, y + 14]);
    const Q = GF.jitter(GF.morph(src, P, g, t, { spread: .35, amp: 2.5, bend: 14, seed: 30 + k }), t, .3, k);
    const ok = qq(g, .7, 1);
    let s = sl + gop(.6 * ok, `<g transform="translate(${f(x)} ${f(y)}) scale(${ICS})"><path d="${segPath(segs)}" fill="none" stroke="#fff" stroke-width="${f(1.3 / ICS)}" stroke-linecap="round" stroke-linejoin="round"/></g>`);
    if (k === 0 && ok > .003) {         // the checker sign on the roof
      let ch = '';
      for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2 === 0) ch += `<rect x="${f(-5.6 + i * 2.8)}" y="${f(-19.6 + j * 2.8)}" width="2.8" height="2.8"/>`;
      s += gop(ok, `<g transform="translate(${f(x)} ${f(y)}) scale(${ICS})"><rect x="-5.6" y="-19.6" width="11.2" height="5.6" fill="none" stroke="#fff" stroke-width=".9"/><g fill="#fff">${ch}</g></g>`);
    }
    if (k === 1 && ok > .003) {         // the liquid and bubbles in the flask (3 as gf_phone; 2 more while it swirls)
      let b = '';
      for (let j = 0; j < 5; j++) {
        const u = ((t * (j < 3 ? 1.1 : 1.6) + j / 3) % 1 + 1) % 1, bx = x + (j < 3 ? -4 + j * 4 : j === 3 ? -7 : 7) * ICS, by = y + (11 - 10 * u) * ICS;
        const bo = j < 3 ? 1 : still;
        if (bo > .003) b += `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(1.6 + .6 * u)}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.9 * bo * Math.sin(PI * u))}"/>`;
      }
      s += gop(ok, `<path d="M${f(x - 10 * ICS)} ${f(y + 4 * ICS)} L${f(x + 10 * ICS)} ${f(y + 4 * ICS)} L${f(x + 15 * ICS)} ${f(y + 13 * ICS)} L${f(x - 15 * ICS)} ${f(y + 13 * ICS)} Z" fill="${WARM}" opacity=".28"/>` + b);
    }
    s += GF.dots(Q, { r: 1.45, op: .95, t, glow: .5 });
    if (Math.abs(ang) > .05) s = `<g transform="rotate(${f(ang)} ${f(x)} ${f(y + 13 * ICS)})">${s}</g>`;
    s += ring(x, y, 10, 40, qq(t, a + .25, a + .9), .8);
    return s;
  }
  // e05: a camera over the checklist (cells, labels, counter, icons) — content point (cx, cy) goes to screen (sx, sy), zoom z.
  // A «три умения» — the three cells big in the centre, push in; B «семь тысяч языков» — row 1 close; C «образы нашего
  // времени» — row 2; D «совет любому — таксисту, учёному» — row 3 with the icons; from c.set (in «школьнику», ≥ .6 s
  // before the end of the shot) — identity: the pose of seam Б.
  function listCam(t, c) {
    if (t >= c.set) return null;
    const KF = [
      [c.tri - .1, 1.52, 52, 188, 180, 214], [c.vs5, 1.6, 52, 188, 180, 214],
      [c.vs5 + .5, 1.45, 140, 122, 180, 128], [c.ob5 - .1, 1.53, 140, 122, 180, 128],
      [c.ob5 + .45, 1.2, 166, 188, 180, 184], [c.lub - .1, 1.24, 166, 188, 180, 184],
      [c.lub + .35, 1.25, 160, 272, 180, 246], [c.uch + .1, 1.3, 160, 272, 180, 246],
      [c.set, 1, 160, 272, 160, 272]];
    if (t <= KF[0][0]) return KF[0].slice(1);
    let i = 0;
    while (i < KF.length - 2 && t > KF[i + 1][0]) i++;
    const A = KF[i], B = KF[i + 1], u = ease((t - A[0]) / Math.max(.001, B[0] - A[0]));
    return A.slice(1).map((v, j) => lerp(v, B[j + 1], u));
  }
  // «все семь тысяч языков»: two running lines of language codes across the whole frame (screen, outside the camera)
  const LANGS = ['RU', 'EN', 'ES', 'SW', 'HI', 'ZH', 'AR', 'FR', 'DE', 'PT', 'TR', 'UK', 'YO', 'JA', 'KO', 'VI', 'TH', 'FA',
    'UR', 'BN', 'TA', 'QU', 'GN', 'NV', 'MI', 'ZU', 'XH', 'HA', 'IG', 'AM', 'SO', 'ID', 'MS', 'TL'];
  function marquee(t, c) {
    const op = qq(t, c.vs5 + .1, c.vs5 + .45) * (1 - qq(t, c.ob5 - .45, c.ob5 - .1));
    if (op <= .003) return '';
    const STEP = 40, L = LANGS.length * STEP;
    let s = '';
    [[176, -78, 0], [198, 62, 17]].forEach(([y, v, sh], r) => {
      for (let i = 0; i < LANGS.length; i++) {
        const x = ((i * STEP + v * (t - c.vs5) + sh) % L + L) % L - 20;
        if (x > 380) continue;
        const k = (i + r * 7) % LANGS.length, hi = H(k * 3.7 + r) > .78;
        s += GF.mono(x, y, LANGS[k], { size: 15, anchor: 'middle', opacity: hi ? .95 : .62, glow: hi });
      }
    });
    return gop(op, s);
  }

  /* ---------------- the scene ---------------- */
  function body(t, K) {
    const c = cues(K);
    let s = '';
    /* e04: the plough on the field (seam A), ploughing; «?»; it leaves up-left on «слова» */
    const go = qq(t, c.slo - .1, c.slo + .6);
    const pop = (1 - .5 * go) * (1 - qq(t, c.obr - .2, c.obr + .3));
    const moving = clamp((t - c.plu) / .3) * (1 - go);
    const roll = -SPD * Math.max(0, Math.min(t, c.slo) - c.plu) / WHL[2];
    const rock = .9 * Math.sin(t * 11) * moving;
    const pglow = pulse(t, c.ora + .05, .12, .7) + .8 * pulse(t, c.plu, .1, .6);
    // v6: a slow push-in on the ploughing plough (after the entry dissolve, from «это»): ×1 → ×1.3 by «слова»
    const push = 1 + .3 * qq(t, c.eto, c.slo - .1), pz = lerp(push, 1, go);
    const fs0 = field(t, c, q(t, c.s4 - .15, .5) * (1 - qq(t, c.slo - .1, c.slo + .35)), moving);
    s += fs0 && pz > 1.0001 ? GF.zoom(fs0, 180, 200, pz) : fs0;
    s += plough(t, lerp(1, .32, go) * pz, lerp(180, 64, go), lerp(200, 62, go), pop, pglow, roll, rock);
    // labels: «МЕЧИ — НА ОРАЛА» (seam A) → ОРАЛО = ПЛУГ
    const old = 1 - qq(t, c.eto - .32, c.eto - .05);
    if (old > .003) s += gop(old, GF.mono(180, 300 - 16 * (1 - old), 'МЕЧИ — НА ОРАЛА', { size: 18, anchor: 'middle', opacity: .96, glow: true }));
    s += gop(1 - qq(t, c.slo - .15, c.slo + .1), words(180, 300, [['ОРАЛО', c.eto], ['=', c.plu - .12], ['ПЛУГ', c.plu]], 20, t, { glow: true }));
    // «Не понял?» — a big «?» over the plough; «загвоздка» — it jerks
    const qm = q(t, c.pon - .36, .2) * (1 - qq(t, c.slo - .3, c.slo));
    if (qm > .003) {
      const z = (1 + .5 * (1 - qq(t, c.pon - .36, c.pon - .03))) * (1 + .03 * Math.sin(t * 3.2));
      const sh = pulse(t, c.zag - .05, .05, .8), ang = 16 * sh * Math.sin((t - c.zag) * 34), dx = 4 * sh * Math.sin((t - c.zag) * 47);
      const g = GF.mono(180, 140, '?', { size: 56, anchor: 'middle', glow: true, opacity: .97 });
      s += gop(qm, `<g transform="translate(${f(dx)} 0) rotate(${f(ang)} 180 122)">${GF.zoom(g, 180, 122, z)}</g>`) +
        ring(180, 122, 22, 70, qq(t, c.zag, c.zag + .7), .85, 2);
    }
    /* e04: the book and the rays of translation; the crowd */
    const bop = q(t, c.slo - .02, .4) * (1 - qq(t, c.obr - .25, c.obr + .1));
    s += book(t, bop, pulse(t, c.per - .05, .1, .9) + .3 * pulse(t, c.slo, .1, .6));
    s += gop(1 - qq(t, c.obr - .35, c.obr - .08), words(180, 40, [['СЛОВА', c.slo], ['ПЕРЕВЕЛИ', c.per]], 18, t, { glow: true }));
    s += gop(1 - qq(t, c.ty - .1, c.ty + .3), words(180, 40, [['ОБРАЗЫ', c.obr], ['—', c.ost], ['ДРЕВНИЕ', c.dre]], 18, t, { glow: true }));
    s += rays(t, c, 1 - qq(t, c.obr - .25, c.obr + .1));
    let cdy, cop, cz = 1;
    if (t < c.pasE) {
      const up = q(t, c.slo + .05, .7);
      cdy = lerp(46, 0, up) + 56 * qq(t, c.ty - .15, c.ty + .5);
      cop = up * (1 - qq(t, c.ty - .15, c.ty + .5));
    } else {
      // v6: the crowd comes right after «пастуха» (no city), bigger and higher, with «?» over the heads
      cz = CZ;
      cdy = lerp(80, -24, qq(t, c.pasE + .05, c.dos + .4)) + 110 * qq(t, c.nuz - .05, c.ume + .25);
      cop = qq(t, c.pasE + .05, c.pasE + .55) * (1 - qq(t, c.nuz - .05, c.ume + .25));
    }
    let cs = crowd(t, c, cdy, cop, cz !== 1 ? 0 : 1);
    if (cz !== 1 && cop > .003) cs += gop(cop, asks(t, c, cdy));
    s += cz !== 1 && cs ? GF.zoom(cs, 180, CZY, cz) : cs;
    /* e04: the images — bubbles → crumble on «древними» → the shepherd → his dots fly to the heads of the crowd */
    if (t >= c.obr - .25 && t < c.pasE + .9) {
      const S = bubbles0(), T1s = shepherd0();
      const ga = qq(t, c.ty - .1, c.ty + .45), gb = qq(t, c.pasE + .02, c.pasE + .7);
      const fallT = clamp(t - (c.dre + .1), 0, c.ty + .25 - (c.dre + .1));
      let P;
      const appear = k => qq(t, c.obr - .2 + k * .07, c.obr + .12 + k * .07);
      if (gb > 0) P = GF.morph(GF.jitter(T1s, t, .5, 9), headsTo(cdy), gb, t, { spread: .35, amp: 2, bend: 18, seed: 6 });
      else {
        const A = S.map((p, i) => {
          const k = Math.floor(i / NB), cx = BUB[k], by = BUBYS[k], z = lerp(.3, 1, ease(appear(k))), bob = 2 * Math.sin(t * 1.6 + k * 1.3);
          const x = cx + (p[0] - cx) * z + (H(i * 3.1 + 7) - .5) * 40 * fallT, y = by + (p[1] - by) * z + bob + (55 + 60 * H(i * 1.7 + 3)) * fallT * fallT + 14 * fallT;
          return [x, y];
        });
        P = ga > 0 ? GF.morph(A, T1s, ga, t, { spread: .4, amp: 3, bend: 22, seed: 4 }) : GF.jitter(A, t, .4, 3);
      }
      const dre = qq(t, c.dre - .05, c.dre + .4);
      const col = grey(lerp(lerp(205, 140, dre), 240, ga));
      const dop = (ga > 0 ? lerp(.6, .95, ga) : lerp(.92, .6, qq(t, c.dre + .1, c.ty))) * (1 - qq(gb, .5, 1));
      const alpha = ga > 0 || gb > 0 ? null : (i => appear(Math.floor(i / NB)));
      // warm flash behind the shepherd on «пастуха»
      const fl = pulse(t, c.pas - .05, .12, .8);
      if (fl > .003) s += `<ellipse cx="242" cy="214" rx="70" ry="100" fill="url(#gf-warm)" opacity="${f(.6 * fl)}"/>`;
      s += ring(242, 220, 70, 140, qq(t, c.pas, c.pas + .6), .55, 1.8);
      s += GF.dots(P, { r: 1.6, op: dop, t, glow: .45 + .15 * ga, color: col, alpha });
      // the bubble tails and the labels of the images (mono 17; gone when they crumble)
      const lop = 1 - qq(t, c.dre + .05, c.dre + .4);
      BUB.forEach((x, k) => {
        const ap = appear(k);
        if (ap <= .003 || lop <= .003) return;
        const by = BUBYS[k], yb = by + BR + 2, dir = k < 2 ? 1 : -1;
        let g = '';
        [[5, 5, 3.2], [9, 14, 2.4], [12, 22, 1.7]].forEach(([dx, dy, r]) => { g += `<circle cx="${f(x + dir * dx)}" cy="${f(yb + dy)}" r="${r}" fill="${col}"/>`; });
        const lw = BLAB[k].length * .6 * 17 + 8;
        g += `<rect x="${f(x - lw / 2)}" y="${f(by + 16)}" width="${f(lw)}" height="19" rx="4" fill="#000" opacity=".8"/>` +
          GF.mono(x, by + 31, BLAB[k], { size: 17, anchor: 'middle', opacity: .97, glow: true });
        s += gop(ap * lop, g);
      });
      s += gop(q(t, c.pas - .05, .25) * (1 - qq(t, c.pasE + .05, c.pasE + .35)), words(236, 110, [['ПАСТУХ', c.pas]], 18, t, { glow: true }));
    }
    /* e05: three empty cells (seam B), the labels, the icons — under the camera listCam; the title goes on «совет» */
    s += gop(1 - qq(t, c.sov - .15, c.sov + .2), words(180, 72, [['ТРИ', c.tri], ['УМЕНИЯ', c.ume]], 22, t, { glow: true }));
    s += marquee(t, c);
    let L = cells(t, c);
    // «все семь тысяч»: a train of language codes runs along the first row into the counter
    for (let k = 0; k < STREAM.length; k++) {
      const a = c.vs5 - .1 + k * .056, u = clamp((t - a) / .45);
      if (u <= 0 || u >= 1) continue;
      const x = lerp(372, LBX + 40, u), op = .95 * (1 - qq(u, .7, 1));
      L += GF.mono(x, CYC[0] + 6, STREAM[k], { size: 14, anchor: 'middle', opacity: op, glow: k % 3 === 0 });
    }
    if (t >= c.sem - .08) {
      const n = Math.round(7000 * ease(qq(t, c.sem - .05, c.yaz - .02)));
      const txt = (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}` : `${n}`) + (t >= c.yaz - .02 ? '+' : '');
      const fl = pulse(t, c.yaz - .02, .06, .5);
      L += GF.mono(LBX, CYC[0] + 7, txt, { size: 21, anchor: 'start', glow: true, opacity: .97 * q(t, c.sem - .08, .12) });
      if (fl > .003) L += gop(.7 * fl, GF.mono(LBX, CYC[0] + 7, txt, { size: 21, anchor: 'start', glow: true, opacity: 1 }));
    }
    L += words(LBX + 7 * .6 * 21, CYC[0] + 7, [['ЯЗЫКОВ', c.yaz]], 16, t, { anchor: 'start' });
    L += words(LBX, CYC[1] + 6, [['ОБРАЗЫ', c.ob5], ['НАШЕГО', c.nas], ['ВРЕМЕНИ', c.vre]], 16, t, { anchor: 'start' });
    L += words(LBX, CYC[2] + 6, [['СОВЕТ', c.sov], ['КАЖДОМУ', c.lub]], 16, t, { anchor: 'start' });
    L += icon(0, t, c.tak, c) + icon(1, t, c.uch, c) + icon(2, t, c.shk, c);
    const cam = listCam(t, c);
    s += cam && L ? GF.zoom(L, cam[1], cam[2], cam[0], cam[3], cam[4]) : L;
    return s;
  }

  SCENES.gf_images = GF.scene('gf_images', (t, K, mode, p) => body(t, K || {}));
})();
