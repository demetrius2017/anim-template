/* gf_phone — «Бог ещё не создан», часть 3 из 3 «Бог будущего» (eps/god_future_p3), фразы e06–e08: три умения уже
 * у тебя в телефоне (ChatGPT, больше миллиарда человек в неделю); веками за советом шли к Богу — Он видит мысли, а
 * этому собеседнику мы пишем их сами; но он пока ученик — «умный старшеклассник», в простом ещё ошибается.
 * Раскадровка — eps/god_future/source/storyboard_p3new.md (раздел gf_phone, швы Б и В), текст — source/text_v26.md;
 * словарь — gf_00_lib.js (window.GF). Стиль: чёрный фон, белые точки и нити, моно Plex капсом, люди — облака точек без
 * лиц. Бога не рисуем: «к Богу» — огонь порядка (GF.spark, знак ролика из частей 1–2), не фигура. Красного нет.
 * Уроки слепого просмотра v1–v5: сцена на телефоне ужата в .72 — телефон с толпой и ученик за партой на всю ширину
 * (x 24..336), линии ≥ 1,2, подписи моно ≥ 13 (важные ≥ 16), числа крупно; новое событие каждые 0,3–1,5 с на слове;
 * отрезков ≥ 3 с без нового нет (по экрану бегут сообщения, по нитям — огоньки, точки дрожат); важное — y 20..345.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (phone · thoughts · student).
 *  e06 phone    вход наплывом из gf_images/skills (делает GF.scene) — шов Б, как кончается gf_images: три пустые клетки
 *               (центр x 52, y 122/188/254, сторона 28, рамки мигают тем же ритмом), подписи от x 92: 7 000+ (моно 21) ЯЗЫКОВ ·
 *               ОБРАЗЫ НАШЕГО ВРЕМЕНИ · СОВЕТ КАЖДОМУ (моно 16), на y 290 значки (те же отрезки, x 116/184/252, ×1,2): такси с
 *               шашечками, колба с пузырьками, рюкзак.
 *               «Узнал» — клетки по очереди отмечаются ✓ со вспышкой и волной; «телефоне» — список сжимается внутрь, вокруг
 *               него встаёт крупный контур телефона (140×230 ×1,15, пока он один; центр 180,212), строки — сообщения чата;
 *               «ChatGPT» — заголовок экрана CHATGPT (моно 18) со вспышкой; «меньше» — над телефоном МЕНЬШЕ 4 ЛЕТ (моно 22,
 *               y 60 — верх подписи ≥ 40); «четыре» — под надписью (y 67) по одной загораются 4 доли-года; «стали» — телефон
 *               уменьшается до 140×230 (центр 180,207), по бокам встают маленькие люди из точек;
 *               «ходить» — от их голов к телефону тянутся нити, по ним бегут огоньки, в чате бегут сообщения;
 *               «миллиарда» — МЕНЬШЕ 4 ЛЕТ гаснет, телефон уходит вниз и сжимается (×,55), в центре крупно счётчик
 *               0 → 1 200 000 000 (моно 38, на всю ширину, на тёмной плашке), поле точек толпы густеет вместе со счётчиком;
 *               «человек» — впереди встают четверо крупных людей; «неделю» — под счётчиком В НЕДЕЛЮ, вспышка; после
 *               «неделю» счётчик с подписью улетает наверх (y 64/84, как моно 26/16), телефон снова 140×230;
 *               «данным» — толпа подходит к телефону и крупнеет, внизу ПО ДАННЫМ OPENAI · 10.2026.
 *  e07 thoughts «Чаще» — счётчик и подпись гаснут, толпа тускнеет и отступает, телефон крупным планом (×1,18), из-над голов
 *               троих людей к экрану летят пузыри КАК БЫТЬ? · ЧТО ДЕЛАТЬ? · ПОМОГИ (моно 16, в полёте ×1,4 → ×1,18) и встают
 *               в чат (место в чате открывается за .3 с до посадки — пузыри не налезают);
 *               «Веками» … «этому» телефона в кадре нет (уходит вниз и гаснет к «Веками»; огонь не над телефоном):
 *               сверху опускается огонь порядка (волна), четверо выходят в центр под огонь и поднимают головы; «советом
 *               шли» — из голов к огню поднимаются пузыри «?»; «Богу» — огонь вспыхивает, волна, медленный наезд камеры;
 *               «верующие» — от огня к головам тянутся тёплые лучи; «видит» — лучи дошли, в головах тёплый свет;
 *               «мысли» — у голов облачка с тёплыми строками-мыслями (между лучами); «А этому» — огонь уходит вверх и гаснет,
 *               лучи гаснут, люди расходятся по бокам; «этому собеседнику» — снизу возвращается телефон (уже без огня),
 *               экран вспыхивает, бот отвечает; «пишем» — маленькая толпа вернулась, от людей к экрану стрелки,
 *               строки-мысли сами летят из облачков в чат (экран наполняется); «сами» — волна по экрану.
 *  e08 student  «Но» — люди расходятся и гаснут; «он» — контур телефона рассыпается в точки, заголовок CHATGPT взлетает
 *               на y 60; «ученик» — точки собираются в человека за партой (GF.personPts(180, 330, 210) — по умолчанию n 240,
 *               seed 1; парта — линия y 300, x 90–270, с ножками), вверху CHATGPT — УЧЕНИК (моно 18); на парте раскрытая
 *               книга, из неё в голову по дуге всё время летят огоньки (учится на наших текстах); «сравнивали» —
 *               Л. АШЕНБРЕННЕР · 2024 · О GPT-4 (моно 13, y 86); «умным» — подпись сменяется на УМНЫЙ СТАРШЕКЛАССНИК (моно 18,
 *               y 60); «простом» — справа доска, на ней 2+2= (моно 26); «ошибается» — дописывается 5, рядом белый крестик ✗
 *               (два штриха по очереди) со вспышкой и волной. Шов В (конец = начало gf_grow): ученик, парта, подпись на y 60;
 *               доска, книга и мелкая подпись гаснут в наплыве.
 * Слова-основы (GF.bare, начало слова, n — номер такого слова во фразе; сверены с build/words.json озвучки 05.11):
 *   e06 — узнал, телефон, chatgpt, меньше, четыре, стали, ходить, миллиард, человек, неделю, данным;
 *   e07 — чаще, за, советом (0, 1), веками, богу, верующ, видит, мысли, этому, собеседн, пишем, сами;
 *   e08 — но, он, ученик, сравнивали, умным, простом, ошибается. Нет слова в K.words — доля фразы (DEF — озвучка 05.11).
 * Параметры p: s (фраза), mode, K (cues.json части), prev/prev_mode (наплыв — GF.scene). Камера движка нейтральна.
 * Своих id в SVG — один (gfp-chat, окно чата). Пик ≈ 2,6 тыс. элементов (e08, «он»: люди уходят, телефон рассыпается).
 * Проверка — листы eps/god_future_p3/qa/gf_phone_final_e06/e07/e08.jpg (рендер на tesla, 05.11).
 * v6-правка (слепые зрители v6, 05.11): «Бог в телефоне» — от «Веками» до «этому» телефона нет, огонь над людьми, лучи к
 *   поднятым головам, телефон возвращается на «этому собеседнику» уже без огня; «стоит» в e06 — счётчик крупно в центре на
 *   «миллиарда» (телефон уходит вниз), потом улетает наверх, толпа подходит, на «Чаще» — крупный план телефона; пузыри
 *   КАК БЫТЬ? · ЧТО ДЕЛАТЬ? · ПОМОГИ — моно 16 (было 13) в крупном плане. Швы Б и В не менялись. Лист через 2 с —
 *   eps/god_future_p3/qa/gf_phone_v6fix_final.jpg (рендер на tesla).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI = Math.PI;
  const H = n => GF.hash(n);
  const { q, qq, lerp, clamp, ease } = GF;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const WARM = '#ffe9c4';
  const cl3 = (v, a, b) => Math.max(a, Math.min(b, v));
  const DEF = { e06: [44.31, 52.11], e07: [52.41, 61.05], e08: [61.55, 66.73] };

  /* ---------------- geometry ---------------- */
  // seam Б: the checklist of gf_images/skills
  const CX = 52, CS = 28, CY = [122, 188, 254], LBX = 92, ICY = 290, ICX = [116, 184, 252], ICS = 1.2;
  const SKILL = ['7 000+ ЯЗЫКОВ', 'ОБРАЗЫ НАШЕГО ВРЕМЕНИ', 'СОВЕТ КАЖДОМУ'];
  // the phone (centre 180,207) and its screen; the chat lives in CT..CB
  const PX0 = 110, PX1 = 250, PY0 = 92, PY1 = 322, PRX = 20, PCY = 207;
  const SX0 = 116, SX1 = 244, SY0 = 98, SY1 = 316, CT = 134, CB = 288;
  const FIRE = [180, 70], FR = 11;
  // people: small ones by the sides (row 0 and 1), four big ones in front; [x, ground y, height]
  const SMALL = [[30, 160, 34], [58, 160, 34], [86, 160, 34], [274, 160, 34], [302, 160, 34], [330, 160, 34],
    [34, 208, 40], [70, 208, 40], [290, 208, 40], [326, 208, 40]];
  const BIG = [[46, 326, 100], [90, 300, 80], [270, 300, 80], [314, 326, 100]];
  // v6: «Чаще» — the phone comes close, the inner two step aside; «Веками» — no phone, the four stand under the fire
  const BIG_Q = [[46, 326, 100], [78, 300, 80], [282, 300, 80], [314, 326, 100]];
  const BIG_F = [[66, 334, 120], [134, 318, 104], [226, 318, 104], [294, 334, 120]];
  const SMALL_P = SMALL.map(([x, gy, h], k) => GF.personPts(x, gy, h, 34, 20 + k));
  const BIG_P = BIG.map(([x, gy, h], k) => GF.personPts(x, gy, h, 150, 40 + k));
  const head = ([x, gy, h]) => [x, gy - .91 * h];
  const FIELD = [...GF.cloud(80, 31, [16, 96, 104, 330]), ...GF.cloud(80, 37, [256, 96, 344, 330])];
  // thought clouds over the big heads (towards the middle); in the fire layout — beside the warm rays (offsets from the head)
  const TB = [[44, 194], [94, 184], [266, 184], [316, 194]];
  const TBF = [[-8, -43], [-20, -33], [20, -33], [8, -43]];
  // seam В: the student behind the desk
  const STUDENT = GF.personPts(180, 330, 210);
  const DESK = [90, 270, 300];
  // the phone as dots (for «рассыпается»): its outline + rows of the chat
  function rrPoly(x0, y0, x1, y1, r) {
    const P = [], seg = 10;
    const corner = (cx, cy, a0) => { for (let j = 0; j <= seg; j++) { const a = a0 + j / seg * PI / 2; P.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } };
    corner(x1 - r, y0 + r, -PI / 2); corner(x1 - r, y1 - r, 0); corner(x0 + r, y1 - r, PI / 2); corner(x0 + r, y0 + r, PI);
    P.push(P[0]);
    return P;
  }
  function resample(P, n) {
    const L = [0];
    for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const tot = L[L.length - 1], R = [];
    let j = 1;
    for (let i = 0; i < n; i++) {
      const s = i / n * tot;
      while (j < L.length - 1 && L[j] < s) j++;
      const u = (s - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
      R.push([lerp(P[j - 1][0], P[j][0], u), lerp(P[j - 1][1], P[j][1], u)]);
    }
    return R;
  }
  const PHONE_P = [...resample(rrPoly(PX0, PY0, PX1, PY1, PRX), 176)];
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) PHONE_P.push([124 + i * (60 + 50 * H(j * 3 + 5)) / 8, 146 + 19 * j]);

  /* ---------------- time from words ---------------- */
  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  function W(K, id, stem, share, n = 0) {
    const ws = (K.words && K.words[id]) || [], s = GF.bare(stem);
    if (ws.filter(w => GF.bare(w.w).startsWith(s)).length > n) return GF.w(K, id, stem, n);
    const [a, e] = span(K, id);
    return a + share * (e - a);
  }
  const tw = (s, z) => s.length * UN.fs(z) * .6;
  const QZ = 16;   // v6: the key questions in the chat (КАК БЫТЬ? · ЧТО ДЕЛАТЬ? · ПОМОГИ) — mono 16, not 13
  function cues(K) {
    const c = {}, a = (id, st, sh, n = 0) => W(K, id, st, sh, n);
    [c.s6, c.e6] = span(K, 'e06'); [c.s7, c.e7] = span(K, 'e07'); [c.s8, c.e8] = span(K, 'e08');
    c.uz = a('e06', 'узнал', 0); c.tel = a('e06', 'телефон', .151); c.gpt = a('e06', 'chatgpt', .282);
    c.men = a('e06', 'меньше', .359); c.chet = a('e06', 'четыре', .448); c.stali = a('e06', 'стали', .52);
    c.hod = a('e06', 'ходить', .556); c.mil = a('e06', 'миллиард', .625); c.chel = a('e06', 'человек', .7);
    c.ned = a('e06', 'неделю', .761); c.dan = a('e06', 'данным', .861);
    c.cha = a('e07', 'чаще', 0); c.za7 = a('e07', 'за', .069); c.sov = a('e07', 'советом', .127);
    c.vek = a('e07', 'веками', .22); c.sov2 = a('e07', 'советом', .308, 1); c.bogu = a('e07', 'богу', .387);
    c.ver = a('e07', 'верующ', .451); c.vid = a('e07', 'видит', .607); c.mys = a('e07', 'мысли', .667);
    c.eto = a('e07', 'этому', .771); c.sob = a('e07', 'собеседн', .801); c.pish = a('e07', 'пишем', .894);
    c.sami = a('e07', 'сами', .942);
    c.no8 = a('e08', 'но', 0); c.on8 = a('e08', 'он', .035); c.uch = a('e08', 'ученик', .123);
    c.srav = a('e08', 'сравнивали', .328); c.umn = a('e08', 'умным', .448); c.prost = a('e08', 'простом', .729);
    c.osh = a('e08', 'ошибается', .857);
    c.tick = [c.uz + .1, c.uz + .35, c.uz + .6];
    // questions from heads into the chat: [text, big person, start, landing]
    c.qs = [['КАК БЫТЬ?', 0, c.cha + .04, c.za7 + .12], ['ЧТО ДЕЛАТЬ?', 2, c.za7 - .04, c.sov + .06], ['ПОМОГИ', 3, c.sov - .06, c.sov + .46]];
    // «пишем»: thoughts fly from the four clouds into the chat
    c.pf = [0, 1, 2, 3].map(k => [c.pish - .06 + .12 * k, c.pish + .4 + .15 * k]);
    // the chat: messages arrive at m.t, the chat scrolls up; u — the user (right, in a bubble), b — the bot (left, lines)
    const M = [];
    const user = (t0, k, o = {}) => M.push({ t: t0, side: 'u', k, n: o.n || 1, text: o.text, fly: o.fly,
      w: o.text ? tw(o.text, QZ) + 12 : (o.w || 44 + 46 * H(k * 7 + 1)), h: o.text ? 26 : 9 + 7 * (o.n || 1) });
    const bot = (t0, k, n) => M.push({ t: t0, side: 'b', k, n, h: 3 + 7 * n });
    user(c.tel + .42, 1, { w: 72 }); bot(c.tel + .58, 2, 3); user(c.tel + .74, 3, { w: 58 });
    for (let i = 0, t0 = c.hod + .1; t0 < c.e6 + .2; i++, t0 += .5) { if (i % 2) bot(t0, 10 + i, 2 + (i % 3 ? 0 : 1)); else user(t0, 10 + i); }
    c.qs.forEach(([text, , , t1], k) => user(t1, 40 + k, { text, fly: 1 }));
    bot(c.sov + .72, 50, 2);
    bot(c.sob + .08, 51, 2);
    c.pf.forEach(([, t1], k) => user(t1, 60 + k, { n: 1 + (k % 2), w: 52 + 10 * k, fly: 1 }));
    bot(c.sami + .5, 70, 3);
    M.sort((x, y) => x.t - y.t);
    c.msgs = M;
    return c;
  }

  /* ---------------- drawings ---------------- */
  const glowLine = (x1, y1, x2, y2, w, op, col = '#fff') =>
    `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${f(w * 3)}" opacity="${f(op * .3)}" stroke-linecap="round" filter="url(#un-soft)"/>` +
    `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${f(w)}" opacity="${f(op)}" stroke-linecap="round"/>`;
  const ringAt = (x, y, r0, grow, u, w = 1.8, col = '#fff') => u > .003 && u < 1 ?
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r0 + grow * u)}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(.85 * (1 - u))}"/>` : '';
  // a check mark drawn by its stroke (d 0..1)
  function tick(x, y, d, s = 1, w = 3.2) {
    if (d <= .003) return '';
    const p = `M${f(x - 8 * s)} ${f(y + 1 * s)} L${f(x - 2 * s)} ${f(y + 8 * s)} L${f(x + 9 * s)} ${f(y - 8 * s)}`, L = 30 * s;
    const da = `stroke-dasharray="${f(L)}" stroke-dashoffset="${f(L * (1 - d))}"`;
    return `<path d="${p}" fill="none" stroke="#fff" stroke-width="${f(w * 2.4)}" opacity=".4" stroke-linecap="round" stroke-linejoin="round" ${da} filter="url(#un-soft)"/>` +
      `<path d="${p}" fill="none" stroke="#fff" stroke-width="${f(w)}" stroke-linecap="round" stroke-linejoin="round" ${da}/>`;
  }
  // the icons of seam Б — as gf_images draws them at its end (same segments, x 116/184/252, y 290, ×1.2): a thin outline
  // and 46 dots along it; taxi with a checker sign, flask with liquid and bubbles, backpack
  const circ = (cx, cy, r, n, a0 = 0, a1 = 2 * PI) => Array.from({ length: n }, (_, i) => {
    const a = lerp(a0, a1, i / n), b = lerp(a0, a1, (i + 1) / n);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a), cx + r * Math.cos(b), cy + r * Math.sin(b)];
  });
  const ISEG = [
    [[-24, -3, -13, -3], [-13, -3, -8, -13], [-8, -13, 9, -13], [9, -13, 15, -3], [15, -3, 24, -3], [24, -3, 24, 7],
      [24, 7, 19, 7], [9, 7, -9, 7], [-19, 7, -24, 7], [-24, 7, -24, -3], [0.5, -13, 0.5, -3], ...circ(-14, 8, 5, 10), ...circ(14, 8, 5, 10)],
    [[-7, -17, 7, -17], [-4, -17, -4, -6], [4, -17, 4, -6], [-4, -6, -15, 13], [4, -6, 15, 13], [-15, 13, 15, 13], [-10, 4, 10, 4]],
    [[-8, -12, 8, -12], ...circ(8, -7, 5, 3, -PI / 2, 0), [13, -7, 13, 11], ...circ(8, 11, 5, 3, 0, PI / 2), [8, 16, -8, 16],
      ...circ(-8, 11, 5, 3, PI / 2, PI), [-13, 11, -13, -7], ...circ(-8, -7, 5, 3, PI, PI * 1.5), ...circ(0, -12, 5, 6, PI, 2 * PI),
      [-8, 3, 8, 3], [8, 3, 8, 12], [8, 12, -8, 12], [-8, 12, -8, 3], [-13, -3, 13, -3]]];
  function along(segs, N) {
    const L = segs.map(g => Math.hypot(g[2] - g[0], g[3] - g[1]) || .001), tot = L.reduce((a, b) => a + b, 0), P = [];
    for (let i = 0; i < N; i++) {
      let d = (i + .5) / N * tot, k = 0;
      while (k < segs.length - 1 && d > L[k]) { d -= L[k]; k++; }
      const u = clamp(d / L[k]), g = segs[k];
      P.push([lerp(g[0], g[2], u), lerp(g[1], g[3], u)]);
    }
    return P;
  }
  const IPTS = ISEG.map((segs, k) => along(segs, 46).map(p => [ICX[k] + p[0] * ICS, ICY + p[1] * ICS]));
  function icons(t) {
    let s = '';
    for (let k = 0; k < 3; k++) {
      const x = ICX[k], y = ICY, tr = `transform="translate(${x} ${y}) scale(${ICS})"`;
      s += `<g ${tr} opacity=".6"><path d="${ISEG[k].map(g => `M${f(g[0])} ${f(g[1])} L${f(g[2])} ${f(g[3])}`).join(' ')}" fill="none" stroke="#fff" stroke-width="${f(1.3 / ICS)}" stroke-linecap="round" stroke-linejoin="round"/></g>`;
      if (k === 0) {
        let ch = '';
        for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2 === 0) ch += `<rect x="${f(-5.6 + i * 2.8)}" y="${f(-19.6 + j * 2.8)}" width="2.8" height="2.8"/>`;
        s += `<g ${tr}><rect x="-5.6" y="-19.6" width="11.2" height="5.6" fill="none" stroke="#fff" stroke-width=".9"/><g fill="#fff">${ch}</g></g>`;
      }
      if (k === 1) {
        s += `<path d="M${f(x - 10 * ICS)} ${f(y + 4 * ICS)} L${f(x + 10 * ICS)} ${f(y + 4 * ICS)} L${f(x + 15 * ICS)} ${f(y + 13 * ICS)} L${f(x - 15 * ICS)} ${f(y + 13 * ICS)} Z" fill="${WARM}" opacity=".28"/>`;
        for (let j = 0; j < 3; j++) {
          const u = ((t * 1.1 + j / 3) % 1 + 1) % 1;
          s += `<circle cx="${f(x + (-4 + j * 4) * ICS)}" cy="${f(y + (11 - 10 * u) * ICS)}" r="${f(1.6 + .6 * u)}" fill="none" stroke="#fff" stroke-width="1.2" opacity="${f(.9 * Math.sin(PI * u))}"/>`;
        }
      }
      s += GF.dots(GF.jitter(IPTS[k], t, .3, k), { r: 1.45, op: .95, t, glow: .5 });
    }
    return s;
  }
  // seam Б (as gf_images ends): three empty cells blink (waiting), 7 000+ (mono 21) ЯЗЫКОВ · ОБРАЗЫ НАШЕГО ВРЕМЕНИ ·
  // СОВЕТ КАЖДОМУ (mono 16); «Узнал» — the cells are ticked one by one with a flash and a wave
  function checklist(t, c) {
    let s = '';
    for (let k = 0; k < 3; k++) {
      const y = CY[k], tk = c.tick[k], d = qq(t, tk, tk + .22), fl = pulse(t, tk, .06, .55);
      const bl = d > 0 ? 1 : .5 + .5 * Math.sin(t * 4.4 + k * 2.1);
      const box = `x="${CX - CS / 2}" y="${y - CS / 2}" width="${CS}" height="${CS}" rx="3.5"`;
      if (fl > .003) s += `<circle cx="${CX}" cy="${y}" r="30" fill="url(#gf-warm)" opacity="${f(fl)}"/>`;
      s += `<rect ${box} fill="rgba(255,255,255,${f(.04 + .12 * d + .3 * fl)})" stroke="#fff" stroke-width="5" opacity="${f(.2 * bl + .45 * fl)}" filter="url(#un-soft)"/>`;
      s += `<rect ${box} fill="none" stroke="#fff" stroke-width="2.4" opacity="${f(.5 + .5 * bl)}"/>`;
      s += tick(CX, y, d) + ringAt(CX, y, 16, 30, qq(t, tk, tk + .6));
      const g = fl > .3;
      if (k === 0) s += GF.mono(LBX, y + 7, '7 000+', { size: 21, anchor: 'start', glow: true, opacity: .97 }) +
        GF.mono(LBX + 7 * .6 * 21, y + 7, 'ЯЗЫКОВ', { size: 16, anchor: 'start', opacity: .95, glow: g });
      else s += GF.mono(LBX, y + 6, SKILL[k], { size: 16, anchor: 'start', opacity: .95, glow: g });
    }
    return s + icons(t);
  }
  // one message of the chat; user: a bubble on the right (x1 — its right edge), bot: lines on the left
  function msg(m, yb, op, fl, x1 = SX1 - 7) {
    if (op <= .003) return '';
    let s = '';
    if (m.side === 'u') {
      const x0 = x1 - m.w, y0 = yb - m.h;
      const rx = m.text ? 11 : 9;
      s += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(m.w)}" height="${f(m.h)}" rx="${rx}" fill="rgba(255,255,255,${f(.1 + .25 * fl)})" stroke="#fff" stroke-width="1.4" opacity=".92"/>`;
      if (fl > .003) s += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(m.w)}" height="${f(m.h)}" rx="${rx}" fill="none" stroke="#fff" stroke-width="5" opacity="${f(.5 * fl)}" filter="url(#un-soft)"/>`;
      if (m.text) s += GF.mono((x0 + x1) / 2, yb - 7.5, m.text, { size: QZ, anchor: 'middle', opacity: 1 });
      else for (let j = 0; j < m.n; j++) {
        const len = (m.w - 16) * (j === m.n - 1 && m.n > 1 ? .55 : 1);
        s += `<line x1="${f(x0 + 8)}" y1="${f(y0 + 8 + 7 * j)}" x2="${f(x0 + 8 + len)}" y2="${f(y0 + 8 + 7 * j)}" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>`;
      }
    } else {
      for (let j = 0; j < m.n; j++) {
        const len = (j === m.n - 1 ? .45 + .3 * H(m.k * 5 + j) : .8 + .2 * H(m.k * 3 + j)) * (SX1 - SX0 - 22);
        const y = yb - m.h + 4 + 7 * j;
        s += `<line x1="${SX0 + 9}" y1="${f(y)}" x2="${f(SX0 + 9 + len)}" y2="${f(y)}" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity="${f(.7 + .3 * fl)}"/>`;
      }
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // the chat scrolls up as messages arrive; a flying message (fly) opens its slot .3 s before it lands, so it lands into
  // a free place; layout → Map(message → [bottom y, open 0..1])
  function layout(t, c) {
    const L = new Map();
    let y = CB;
    for (let i = c.msgs.length - 1; i >= 0 && y > CT - 60; i--) {
      const m = c.msgs[i], o = m.fly ? m.t - .3 : m.t;
      if (t < o) continue;
      const a = q(t, o, .3);
      L.set(m, [y, a]);
      y -= (m.h + 6) * a;
    }
    return L;
  }
  function chat(t, c) {
    let s = '';
    for (const [m, [yb, a]] of layout(t, c)) if (t >= m.t && yb > CT - 4) s += msg(m, yb, m.fly ? 1 : a, pulse(t, m.t, .05, .6));
    return `<defs><clipPath id="gfp-chat"><rect x="${SX0}" y="${CT}" width="${SX1 - SX0}" height="${CB - CT + 3}"/></clipPath></defs><g clip-path="url(#gfp-chat)">${s}</g>`;
  }
  // the phone: body, screen, CHATGPT header («ChatGPT»), the chat and the input bar; glow 0..1; wave 0..1 — a light band runs down
  function phone(t, c, glow, wave) {
    const box = `x="${PX0}" y="${PY0}" width="${PX1 - PX0}" height="${PY1 - PY0}" rx="${PRX}"`;
    let s = `<rect ${box} fill="#000" fill-opacity=".92"/>` +
      `<rect ${box} fill="none" stroke="#fff" stroke-width="7" opacity="${f(.16 + .4 * glow)}" filter="url(#un-soft)"/>` +
      `<rect ${box} fill="none" stroke="#fff" stroke-width="2.6" opacity=".95"/>` +
      `<rect x="${SX0}" y="${SY0}" width="${SX1 - SX0}" height="${SY1 - SY0}" rx="14" fill="rgba(255,255,255,${f(.035 + .06 * glow)})" stroke="#fff" stroke-width="1.2" opacity=".5"/>` +
      `<rect x="166" y="101.5" width="28" height="5" rx="2.5" fill="#fff" opacity=".6"/>`;
    const hg = pulse(t, c.gpt, .1, .8);
    if (t >= c.gpt - .02) s += GF.typed(180, 126, 'CHATGPT', t, c.gpt - .02, { size: 18, cps: 16, op: .97, glow: hg > .2 }) +
      (hg > .003 ? `<circle cx="180" cy="120" r="${f(30 + 20 * hg)}" fill="url(#gf-warm)" opacity="${f(hg)}"/>` : '');
    s += `<line x1="${SX0 + 8}" y1="132" x2="${SX1 - 8}" y2="132" stroke="#fff" stroke-width="1.2" opacity=".35"/>`;
    s += chat(t, c);
    const ib = pulse(t, c.sob, .1, .7);
    s += `<rect x="122" y="294" width="116" height="16" rx="8" fill="rgba(255,255,255,${f(.04 + .2 * ib)})" stroke="#fff" stroke-width="1.3" opacity="${f(.6 + .4 * ib)}"/>`;
    if (Math.floor(t * 2.4) % 2 === 0) s += `<line x1="131" y1="298" x2="131" y2="306" stroke="#fff" stroke-width="1.6" opacity=".9"/>`;
    if (wave > 0 && wave < 1) {
      const y = lerp(SY0 + 6, SY1 - 6, wave), o = Math.sin(PI * wave);
      s += `<rect x="${SX0 + 2}" y="${f(y - 9)}" width="${SX1 - SX0 - 4}" height="18" rx="6" fill="#fff" opacity="${f(.22 * o)}" filter="url(#un-soft)"/>` +
        `<line x1="${SX0 + 4}" y1="${f(y)}" x2="${SX1 - 4}" y2="${f(y)}" stroke="#fff" stroke-width="1.6" opacity="${f(.8 * o)}"/>`;
    }
    return s;
  }
  // a thread from a to b with lights running to b (u — grown share, op); arrow — a head at b
  function thread(a, b, u, op, t, k, w = 1.2, arrow = false, col = '#fff') {
    if (u <= .003 || op <= .003) return '';
    const e = [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
    let s = `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="${col}" stroke-width="${w}" opacity="${f(.5 * op)}" stroke-linecap="round"/>`;
    if (u >= .999) {
      const v = ((t * .9 + k * .37) % 1 + 1) % 1;
      s += `<circle cx="${f(lerp(a[0], b[0], v))}" cy="${f(lerp(a[1], b[1], v))}" r="2.4" fill="${col}" opacity="${f(op * Math.sin(PI * v))}" filter="url(#un-soft)"/>` +
        `<circle cx="${f(lerp(a[0], b[0], v))}" cy="${f(lerp(a[1], b[1], v))}" r="1.5" fill="${col}" opacity="${f(op * Math.sin(PI * v))}"/>`;
    }
    if (arrow) {
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = 8;
      const p1 = [e[0] - L * Math.cos(ang - .45), e[1] - L * Math.sin(ang - .45)], p2 = [e[0] - L * Math.cos(ang + .45), e[1] - L * Math.sin(ang + .45)];
      s += `<path d="M${f(p1[0])} ${f(p1[1])} L${f(e[0])} ${f(e[1])} L${f(p2[0])} ${f(p2[1])}" fill="none" stroke="${col}" stroke-width="${f(w + .4)}" opacity="${f(.9 * op)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return s;
  }
  // v6: where the phone is — p → (180, Y) + Z·(p − (180, 207)), op. Forms from the checklist (1.15 until «стали», so
  // МЕНЬШЕ 4 ЛЕТ stays at y ≥ 40); «миллиарда» — shrinks to .55 at the bottom under the big counter; «неделю» — back to 1;
  // «Чаще» — close-up 1.18 (the questions large); «Веками» — sinks down and goes out (no phone next to the fire);
  // «этому» — rises back to 1, the fire is gone by then. From «Но» on — 1 (seam В unchanged).
  function phoneT(t, c, m) {
    const zf = lerp(1.3, 1, ease(m)), st = qq(t, c.stali - .2, c.stali + .35);
    let Z = zf * lerp(1.15, 1, st), Y = lerp(212 - 8 * (zf - 1), 207, st);
    const cz = qq(t, c.mil - .1, c.mil + .45) * (1 - qq(t, c.ned + .45, c.ned + 1));
    Z = lerp(Z, .55, cz); Y = lerp(Y, 258.75, cz);
    const cu = qq(t, c.cha + .1, c.cha + .7) * (1 - qq(t, c.vek + .7, c.vek + .8));
    Z = lerp(Z, 1.18, cu); Y = lerp(Y, 200, cu);
    const off = qq(t, c.vek - .3, c.vek + .2) * (1 - qq(t, c.eto + .12, c.eto + .62));
    return { Z, Y: Y + 250 * off, op: 1 - qq(off, .1, .7) };
  }
  const P2 = (T, x, y) => [180 + T.Z * (x - 180), T.Y + T.Z * (y - 207)];
  const edge = (h, T) => P2(T, h[0] < 180 ? PX0 + 1 : PX1 - 1, cl3(207 + (h[1] + 16 - T.Y) / T.Z, PY0 + 50, PY1 - 40));
  // v6: the four big people — L0 (BIG) → «Чаще» BIG_Q → «Веками» BIG_F (centre, under the fire, heads raised: up) →
  // «этому» back to L0. hd — the head, look — the raised head, cloud — the thought cloud
  function lay(t, c) {
    const l1 = qq(t, c.cha + .1, c.cha + .7) * (1 - qq(t, c.vek + 1, c.vek + 1.1));
    const lf = qq(t, c.vek + .1, c.vek + 1) * (1 - qq(t, c.eto - .05, c.eto + .6));
    const up = qq(t, c.vek + .45, c.vek + 1.15) * (1 - qq(t, c.eto - .2, c.eto + .3));
    return BIG.map((b, k) => {
      const [x, gy, h] = [0, 1, 2].map(i => lerp(lerp(b[i], BIG_Q[k][i], l1), BIG_F[k][i], lf));
      const s = h / 100, hd = [x, gy - .91 * h], lean = (x < 180 ? 1 : -1) * 2.5 * s * up;
      const o0 = [TB[k][0] - b[0], TB[k][1] - head(b)[1]];
      return { x, gy, h, sc: h / b[2], s, up, lean, hd, look: [x + lean, hd[1] - 5 * s * up],
        cloud: [x + lerp(o0[0], TBF[k][0], lf), hd[1] + lerp(o0[1], TBF[k][1], lf)] };
    });
  }
  const bigPts = (k, Lk) => BIG_P[k].map((p, i) => {
    const b = BIG[k], X = Lk.x + (p[0] - b[0]) * Lk.sc, Y = Lk.gy + (p[1] - b[1]) * Lk.sc;
    return i < 21 ? [X + Lk.lean, Y - 5 * Lk.s * Lk.up] : [X, Y];     // personPts: the first 14 % are the head
  });
  // a thought cloud (r ≈ 15) with three warm lines; lines 0..1 — they are still inside
  function cloudT(x, y, hd, op, lines, glow, t, k) {
    if (op <= .003) return '';
    let s = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(30 + 6 * glow)}" fill="url(#gf-warm)" opacity="${f(.5 + .5 * glow)}"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="18" fill="#000" fill-opacity=".6" stroke="#fff" stroke-width="1.6" opacity=".95"/>`;
    s += [[.62, 2.8], [.8, 1.9]].map(([u, r]) => `<circle cx="${f(lerp(x, hd[0], u))}" cy="${f(lerp(y, hd[1], u))}" r="${r}" fill="#fff" opacity=".85"/>`).join('');
    if (lines > .003) for (let j = 0; j < 3; j++) {
      const len = [21, 15, 18][j] * (.85 + .15 * Math.sin(t * 3 + j + k));
      s += `<line x1="${f(x - 10.5)}" y1="${f(y - 7 + 7 * j)}" x2="${f(x - 10.5 + len)}" y2="${f(y - 7 + 7 * j)}" stroke="${WARM}" stroke-width="2" stroke-linecap="round" opacity="${f(lines)}"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a small bubble with «?» rising to the fire
  function qBubble(x, y, op) {
    if (op <= .003) return '';
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="13" fill="#000" stroke="#fff" stroke-width="1.6"/>` +
      `<circle cx="${f(x)}" cy="${f(y)}" r="13" fill="none" stroke="#fff" stroke-width="4" opacity=".4" filter="url(#un-soft)"/>` +
      GF.mono(x, y + 6, '?', { size: 18, anchor: 'middle', opacity: 1 }) + '</g>';
  }
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* ---------------- the scene ---------------- */
  function body(t, K) {
    const c = cues(K);
    let s = '', top = '';
    const out8 = qq(t, c.no8 - .05, c.no8 + .55);                       // e08: the people leave
    const fireOn = qq(t, c.vek - .1, c.vek + .5);                         // e07: the old way — the fire over the heads, no phone
    const m = qq(t, c.tel - .05, c.tel + .7);                            // the checklist becomes the phone
    const T = phoneT(t, c, m), L = lay(t, c);

    // --- top: МЕНЬШЕ 4 ЛЕТ (y 60, the four years under it, top ≥ 40) — gives way to the counter on «миллиарда»
    const menOp = q(t, c.men - .1, .2) * (1 - qq(t, c.mil - .15, c.mil + .3));
    if (t >= c.men - .1 && menOp > .003) {
      let b = GF.typed(180, 60, 'МЕНЬШЕ 4 ЛЕТ', t, c.men - .05, { size: 22, cps: 24, op: .97 });
      for (let k = 0; k < 4; k++) {
        const tk = c.chet + .14 * k, l = q(t, tk, .12), fl = pulse(t, tk, .04, .4);
        const x = 111 + k * 36;
        b += `<rect x="${x}" y="67" width="30" height="6" rx="3" fill="#fff" fill-opacity="${f(.08 + .85 * l)}" stroke="#fff" stroke-width="1.2" opacity="${f(.55 + .45 * l)}"/>`;
        if (fl > .003) b += `<rect x="${x - 2}" y="65" width="34" height="10" rx="5" fill="#fff" opacity="${f(.5 * fl)}" filter="url(#un-soft)"/>`;
      }
      s += `<g opacity="${f(menOp)}">${GF.zoom(b, 180, 64, lerp(1, .85, qq(t, c.mil - .15, c.mil + .3)))}</g>`;
    }
    // «миллиарда» — the counter 0 → 1 200 000 000 large in the middle (mono 38, on a dark plate over the crowd, drawn last),
    // «неделю» — В НЕДЕЛЮ under it; after «неделю» both fly up to y 64 / 84 (as mono 26 / 16), the phone grows back; «Чаще» — gone
    const topOp = 1 - qq(t, c.cha - .1, c.cha + .3);
    if (t >= c.mil && topOp > .003) {
      const cu = qq(t, c.mil + .05, c.mil + .8), fl = pulse(t, c.mil + .8, .05, .5) + pulse(t, c.ned, .08, .6);
      const up = qq(t, c.ned + .45, c.ned + .95), pl = .88 * (1 - up);
      const b = (fl > .003 ? `<ellipse cx="180" cy="140" rx="${f(150 + 20 * fl)}" ry="36" fill="url(#gf-warm)" opacity="${f(clamp(fl))}"/>` : '') +
        GF.mono(180, 150, fmt(1.2e9 * cu), { size: 38, anchor: 'middle', opacity: 1, glow: fl > .2 }) +
        GF.typed(180, 179, 'В НЕДЕЛЮ', t, c.ned - .05, { size: 23, cps: 22, op: .95 });
      top += `<g opacity="${f(topOp * q(t, c.mil, .15))}">` +
        (pl > .003 ? `<rect x="14" y="108" width="332" height="84" rx="16" fill="#000" opacity="${f(pl)}"/>` : '') +
        GF.zoom(b, 180, 150, lerp(1, 26 / 38, up), 180, lerp(150, 64, up)) + '</g>';
    }
    if (t >= c.dan - .1 && topOp > .003) s += `<g opacity="${f(topOp)}">${GF.typed(180, 343, 'ПО ДАННЫМ OPENAI · 10.2026', t, c.dan - .05, { size: 13, cps: 34, op: .85 })}</g>`;

    // --- the fire of order (e07): comes down on «Веками» while the phone sinks away, flashes on «Богу», brighter on «видит»;
    //     on «А этому» it rises and goes out — before the phone comes back
    const gone = qq(t, c.eto - .32, c.eto + .12);
    const fop = q(t, c.vek, .5) * (1 - gone);
    if (fop > .003) {
      const land = qq(t, c.vek, c.vek + .6), fy = lerp(-24, FIRE[1], land) - 70 * gone;
      const fl = clamp(pulse(t, c.bogu + .05, .12, .8) + .5 * pulse(t, c.vid, .1, .6));
      s += GF.spark(FIRE[0], fy, FR * (1 + .45 * fl + .15 * qq(t, c.ver, c.vid)), { t, op: fop });
      s += ringAt(FIRE[0], fy, FR, 60, qq(t, c.vek + .55, c.vek + 1.5), 1.8, WARM) + ringAt(FIRE[0], FIRE[1], FR, 80, qq(t, c.bogu + .05, c.bogu + 1.1), 2, WARM);
    }
    // warm rays from the fire to the raised heads: grow on «верующие», reach on «видит»; gone on «А этому»
    const rr = qq(t, c.ver - .05, c.vid), rop = (1 - qq(t, c.eto - .4, c.eto)) * fop;
    if (rr > .003 && rop > .003) L.forEach((Lk, k) => {
      const a = [FIRE[0], FIRE[1] + 9], b = [Lk.look[0], Lk.look[1] - 9], e = [lerp(a[0], b[0], rr), lerp(a[1], b[1], rr)];
      s += glowLine(a[0], a[1], e[0], e[1], 1.6, .75 * rop, WARM);
      if (rr >= .999) { const v = ((t * .8 + k * .29) % 1 + 1) % 1;
        s += `<circle cx="${f(lerp(a[0], b[0], v))}" cy="${f(lerp(a[1], b[1], v))}" r="3" fill="${WARM}" opacity="${f(rop * Math.sin(PI * v))}" filter="url(#un-soft)"/>`; }
    });

    // --- the small crowd and the field of dots («стали»; «миллиарда» — the field fills in with the counter); «данным» — the
    //     crowd comes closer and larger; «Чаще» — dims and steps back; gone on «Веками», back on «пишем», leaves on «Но»
    const cop = Math.max((1 - .7 * qq(t, c.cha - .05, c.cha + .5)) * (1 - fireOn), .65 * qq(t, c.pish - .15, c.pish + .3)) * (1 - out8);
    const ap = qq(t, c.dan - .3, c.dan + .5) * (1 - qq(t, c.cha - .05, c.cha + .6));
    if (t >= c.stali - .05 && cop > .003) {
      const P = [], A = [];
      SMALL_P.forEach((pts, k) => {
        const at = c.stali + .5 * H(k * 13 + 7), pop = q(t, at, .35);
        if (pop <= .003) return;
        const [x, gy] = SMALL[k], dx = (180 - x) * .12 * ap, sc = 1 + .15 * ap;
        const J = GF.drift(GF.jitter(pts.map(p => [x + dx + (p[0] - x) * sc, gy + 6 * ap + (p[1] - gy) * sc]), t, .5, k), t, c.no8, 40, k);
        J.forEach(p => { P.push([p[0], p[1] + 10 * (1 - pop)]); A.push(pop); });
      });
      s += GF.dots(P, { r: 1.3, op: .9 * cop, t, glow: .35, alpha: i => A[i] });
      const F = GF.jitter(FIELD.map(p => [p[0] + (180 - p[0]) * .1 * ap, p[1]]), t, 1.2, 9);
      s += GF.dots(F, { r: 1, op: .5 * cop, t, glow: 0, alpha: i => q(t, c.mil + .9 * H(i * 3 + 1), .3) });
      // threads from the heads to the phone, lights run to the phone
      SMALL.forEach(([x, gy, hh], k) => {
        const h = [x + (180 - x) * .12 * ap, gy + 6 * ap - .91 * hh * (1 + .15 * ap)], at = c.hod + .04 * k;
        s += thread([h[0], h[1] - 2], edge(h, T), qq(t, at, at + .45), cop * T.op * q(t, c.stali + .5 * H(k * 13 + 7), .35), t, k, 1.2, t > c.pish - .2);
      });
    }

    // --- the phone: forms from the checklist on «телефоне», moves as phoneT says, crumbles into dots on «он» (e08)
    if (m < 1) {
      const z = lerp(1, .5, m);
      s += `<g opacity="${f(1 - qq(m, .35, .85))}">${GF.zoom(checklist(t, c), 166, 190, z, lerp(166, 180, m), lerp(190, 214, m))}</g>`;
    }
    const pdot = qq(t, c.on8 - .05, c.on8 + .2);
    const pop = qq(m, .15, .75) * (1 - pdot) * T.op;
    if (pop > .003) {
      const glow = pulse(t, c.gpt, .1, .8) + .5 * pulse(t, c.mil, .1, .8) + pulse(t, c.sob, .1, .8) + pulse(t, c.sami, .1, .8) + .6 * pulse(t, c.eto + .3, .2, .6);
      const wave = qq(t, c.sami - .02, c.sami + .5);
      s += `<g opacity="${f(pop)}">${GF.zoom(phone(t, c, clamp(glow), wave), 180, 207, T.Z, 180, T.Y)}</g>`;
    }
    // e08: the phone as dots → the student behind the desk
    if (pdot > .003) {
      const mm = qq(t, c.on8 + .12, c.uch + .55);
      const P = mm < 1 ? GF.morph(PHONE_P, STUDENT, mm, t, { spread: .4, amp: 9, bend: 34, seed: 5 }) : GF.jitter(STUDENT, t, .45, 2);
      const sh = pulse(t, c.osh + .3, .05, .5);
      s += GF.dots(sh > .003 ? P.map((p, i) => [p[0] + 1.6 * sh * Math.sin(t * 40 + i), p[1]]) : P, { r: 1.7, t, op: .95 * pdot, glow: .6 });
      const dk = qq(t, c.uch - .05, c.uch + .45);
      if (dk > .003) {
        const [x0, x1, y] = DESK, hw = (x1 - x0) / 2 * dk;
        s += glowLine(180 - hw, y, 180 + hw, y, 2.6, .95);
        const lg = qq(t, c.uch + .3, c.uch + .7);
        if (lg > .003) s += [x0 + 8, x1 - 8].map(x => `<line x1="${x}" y1="${y}" x2="${x}" y2="${f(y + 30 * lg)}" stroke="#fff" stroke-width="1.8" opacity=".8" stroke-linecap="round"/>`).join('');
      }
    }

    // e08: an open book on the desk (left), lights fly from it into the student's head — he learns on our texts
    const bk = q(t, c.uch + .35, .4);
    if (bk > .003) {
      const sx = 128, by = DESK[2] - 1, pg = (d) => `M${sx} ${by} L${sx + d * 26} ${by - 6} L${sx + d * 26} ${by - 32} L${sx} ${by - 26} Z`;
      let b = '';
      for (const d of [-1, 1]) {
        b += `<path d="${pg(d)}" fill="rgba(255,255,255,.07)" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" opacity=".95"/>`;
        for (let j = 0; j < 3; j++) {
          const yj = by - 21 + 6 * j, lit = .45 + .5 * pulse(((t * 1.3 + j * .33 + (d > 0 ? .5 : 0)) % 1 + 1) % 1, 0, .1, .4);
          b += `<line x1="${sx + d * 5}" y1="${f(yj - 1.15)}" x2="${sx + d * 21}" y2="${f(yj - 4.85)}" stroke="#fff" stroke-width="1.3" opacity="${f(lit)}" stroke-linecap="round"/>`;
        }
      }
      s += `<g opacity="${f(bk)}"><ellipse cx="${sx}" cy="${by - 16}" rx="44" ry="30" fill="url(#gf-warm)" opacity=".9"/>${b}</g>`;
      // lights from the book to the head along an arc, one every .3 s
      const hd = [180, 330 - 91 * 2.1];
      const arc = u => [lerp(sx, hd[0] - 6, u), lerp(by - 30, hd[1] + 4, u) - 50 * Math.sin(PI * u)];
      let tr = '';
      for (let j = 1; j < 16; j++) { const [x, y] = arc(j / 16); tr += `<circle cx="${f(x)}" cy="${f(y)}" r="1" fill="#fff" opacity="${f(.35 * bk)}"/>`; }
      s += tr;
      for (let k = 0; k < 7; k++) {
        const u = (((t - c.uch) / 1.6 + k / 7) % 1 + 1) % 1, [x, y] = arc(u), o = bk * Math.sin(PI * u);
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="${WARM}" opacity="${f(.6 * o)}" filter="url(#un-soft)"/>` +
          `<circle cx="${f(x)}" cy="${f(y)}" r="2.3" fill="#fff" opacity="${f(o)}"/>`;
      }
      // the head takes the light in
      s += `<circle cx="${hd[0]}" cy="${f(hd[1])}" r="${f(20 + 3 * Math.sin(t * 3))}" fill="url(#gf-warm)" opacity="${f(.7 * bk)}"/>`;
    }

    // --- the big people (e06 «человек» … e08 «Но»), placed by lay()
    if (t >= c.chel - .05 && out8 < .999) {
      const P = [], A = [];
      L.forEach((Lk, k) => {
        const pp = q(t, c.chel + .08 * k, .35);
        GF.drift(GF.jitter(bigPts(k, Lk), t, .4, k + 7), t, c.no8, 46, k + 3).forEach(p => { P.push([p[0], p[1] + 12 * (1 - pp)]); A.push(pp); });
      });
      s += GF.dots(P, { r: 1.45, op: .95 * (1 - out8), t, glow: .5, alpha: i => A[i] });
      // threads of e06 from the big heads to the phone
      const top6 = q(t, c.chel + .3, .4) * (1 - fireOn) * (1 - out8) * T.op;
      L.forEach((Lk, k) => { const h = Lk.hd; s += thread([h[0], h[1] - 2], edge(h, T), qq(t, c.chel + .3, c.chel + .7), top6, t, k + 20, 1.3); });
      // warm light in the heads («видит»), thought clouds («мысли»); on «пишем» the thoughts fly to the screen
      const hop = q(t, c.vid - .05, .3) * (1 - qq(t, c.pish + .3, c.pish + .9)) + .7 * pulse(t, c.vid, .1, .6);
      L.forEach((Lk, k) => {
        const h = Lk.look;
        if (hop > .003) s += `<circle cx="${f(h[0])}" cy="${f(h[1])}" r="${f(15 + 4 * clamp(hop))}" fill="url(#gf-warm)" opacity="${f(clamp(hop) * (1 - out8))}"/>` +
          `<circle cx="${f(h[0])}" cy="${f(h[1])}" r="4" fill="${WARM}" opacity="${f(.85 * clamp(hop) * (1 - out8))}" filter="url(#un-soft)"/>`;
        const [fx, fy] = Lk.cloud, [l0] = c.pf[k];
        const cl = q(t, c.mys - .05 + .06 * k, .3) * (1 - qq(t, l0 + .15, l0 + .5)) * (1 - out8);
        s += cloudT(fx, fy, h, cl, 1 - qq(t, l0 - .05, l0 + .05), pulse(t, c.mys + .06 * k, .1, .6), t, k);
        // «пишем»: arrows from the people to the phone
        s += thread([fx + (k < 2 ? 14 : -14), fy + 12], edge([Lk.hd[0], Lk.hd[1] - 20], T), qq(t, c.pish - .1, c.pish + .25), (1 - out8) * T.op, t, k + 30, 1.5, true);
      });
    }
    // the open place of a message in the chat, on screen (bottom-right corner of the bubble)
    const LAY = layout(t, c), slot = mm => P2(T, SX1 - 7, (LAY.get(mm) || [CB])[0]);
    // «советом» — question bubbles fly from the heads into the chat (into their open slot): ×1.4 → the size of the close-up
    c.qs.forEach(([text, who, t0, t1]) => {
      const u = qq(t, t0, t1);
      if (u <= 0 || u >= 1) return;
      const mm = c.msgs.find(x => x.text === text), h = L[who].hd, z0 = 1.4;
      const z = lerp(z0, T.Z, ease(u)), a = [cl3(h[0] + mm.w * z0 / 2, mm.w * z0 + 24, 354), h[1] - 30], b = slot(mm);
      const x1 = lerp(a[0], b[0], ease(u)), yb = lerp(a[1], b[1], ease(u)) - 52 * Math.sin(PI * u) * (1 - u);
      s += GF.zoom(msg(mm, yb, q(u, 0, .12), .7 * (1 - u), x1), x1, yb, z);
    });
    // «советом шли к Богу» — bubbles «?» rise from the raised heads into the fire
    L.forEach((Lk, k) => {
      const t0 = c.sov2 - .1 + .15 * k, t1 = c.bogu + .2 + .12 * k, u = qq(t, t0, t1);
      if (u <= 0 || u >= 1) return;
      const h = Lk.look, x = lerp(h[0], FIRE[0], ease(u)) + 10 * Math.sin(u * 6 + k), y = lerp(h[1] - 20, FIRE[1] + 6, ease(u));
      s += qBubble(x, y, q(u, 0, .15) * (1 - qq(u, .85, 1)));
    });
    // «пишем» — the thoughts fly from the clouds into the chat as messages
    c.pf.forEach(([t0, t1], k) => {
      const u = qq(t, t0, t1);
      if (u <= 0 || u >= 1) return;
      const mm = c.msgs.find(x => x.k === 60 + k), [fx, fy] = L[k].cloud, b = slot(mm);
      const x1 = lerp(fx + mm.w / 2, b[0], ease(u)), yb = lerp(fy + mm.h / 2, b[1], ease(u)) - 30 * Math.sin(PI * u);
      s += msg(mm, yb, q(u, 0, .12), .8, x1);
    });

    // --- e08: the header CHATGPT flies up from the screen; «ученик» — CHATGPT — УЧЕНИК; «умным» — УМНЫЙ СТАРШЕКЛАССНИК
    //     (y 60, seam В); «сравнивали» — the source; «простом» — the board 2+2=, «ошибается» — 5 and ✗
    const LAB = 'CHATGPT — УЧЕНИК', LX = 180 - LAB.length * 18 * .6 / 2;
    if (t >= c.on8 - .05 && t < c.uch - .05) {
      const u = ease(qq(t, c.on8 - .05, c.uch - .1));
      s += GF.mono(lerp(180 - 7 * 18 * .6 / 2, LX, u), lerp(126, 60, u), 'CHATGPT', { size: 18, anchor: 'start', opacity: .97, glow: true });
    }
    if (t >= c.uch - .05) {
      const sw = qq(t, c.umn - .15, c.umn + .05);
      if (sw < 1) s += `<g opacity="${f(1 - sw)}">${GF.typed(LX, 60, LAB, t, c.uch - 7 / 20 - .01, { size: 18, cps: 20, anchor: 'start', op: .97, glow: true })}</g>`;
      if (t >= c.umn - .05) s += GF.typed(180, 60, 'УМНЫЙ СТАРШЕКЛАССНИК', t, c.umn - .05, { size: 18, cps: 30, op: .97, glow: true });
      if (t >= c.srav - .05) s += GF.typed(180, 86, 'Л. АШЕНБРЕННЕР · 2024 · О GPT-4', t, c.srav - .05, { size: 13, cps: 40, op: .8 });
    }
    const bd = q(t, c.prost - .1, .35);
    if (bd > .003) {
      const x0 = 222, x1 = 340, y0 = 122, y1 = 200;
      s += `<g opacity="${f(bd)}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="4" fill="rgba(255,255,255,.05)" stroke="#fff" stroke-width="1.8" opacity=".9"/>` +
        `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="4" fill="none" stroke="#fff" stroke-width="5" opacity=".2" filter="url(#un-soft)"/>` +
        GF.typed(230, 170, '2+2=', t, c.prost + .05, { size: 26, cps: 12, anchor: 'start', op: .97 });
      const five = q(t, c.osh - .02, .15);
      if (five > .003) s += GF.zoom(GF.mono(292.4, 170, '5', { size: 26, anchor: 'start', opacity: .97 * five, glow: true }), 300, 161, 1 + .5 * (1 - five));
      const xf = pulse(t, c.osh + .3, .06, .6);
      if (t >= c.osh + .28) {
        const xc = 324, yc = 161, r = 9;
        const st = (d, x0, y0, x1, y1) => d <= .003 ? '' : [[8, .35 + .4 * xf, ' filter="url(#un-soft)"'], [3.2, 1, '']].map(([w, o, g]) =>
          `<line x1="${x0}" y1="${y0}" x2="${f(lerp(x0, x1, d))}" y2="${f(lerp(y0, y1, d))}" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity="${f(o)}"${g}/>`).join('');
        s += `<circle cx="${xc}" cy="${yc}" r="${f(22 + 10 * xf)}" fill="url(#gf-warm)" opacity="${f(.4 + .6 * xf)}"/>` +
          st(qq(t, c.osh + .28, c.osh + .4), xc - r, yc - r, xc + r, yc + r) + st(qq(t, c.osh + .4, c.osh + .52), xc + r, yc - r, xc - r, yc + r) +
          ringAt(xc, yc, 10, 40, qq(t, c.osh + .3, c.osh + 1));
      }
      s += '</g>';
    }
    s += top;
    // v6: a slow push-in on the fire phase («Богу» … «мысли»), back to 1 on «этому»
    const cam = .07 * qq(t, c.bogu - .2, c.mys + .2) * (1 - qq(t, c.eto - .3, c.eto + .4));
    return cam > 1e-4 ? GF.zoom(s, 180, 200, 1 + cam) : s;
  }

  SCENES.gf_phone = GF.scene('gf_phone', (t, K, mode, p) => body(t, K || {}));
})();
