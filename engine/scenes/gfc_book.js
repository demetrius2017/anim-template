/* gfc_book — «Бог ещё не создан», цветная версия («Цветная инфографика», словарь GFC v2 — gfc_00_lib.js) сцены gf_book;
 * часть 2 «От мести к милосердию» (eps/god_future_color_p2), фразы d05–d07. Содержание, слова, время, надписи-источники и
 * их места — как в принятой чёрно-белой gf_book.js (раскадровка eps/god_future/source/storyboard_3parts.md, строки d05–d07,
 * текст source/text_v21.md). Меняется только вид — под образец eps/god_future/qa/style_flatcolor.jpg.
 *
 * Чем вид отличается от gf_book: чёрный фон → тёплый фиолетовый градиент со звёздами (GFC.wrap) и фиолетовые холмы
 * GFC.ground (горизонт y 300) под всей сценой; моно Plex → Montserrat; крупные надписи (БИБЛИЯ, цитата, ОБИДЕЛИ — НЕ МСТИ,
 * А ТЫ БЫ СМОГ?, А ДЛЯ КАЖДОГО) — заголовки Montserrat 800 белым, главное слово золотом #ffc94a со свечением; на d05 до
 * Библии — заголовок GFC.headline «ИЗ КАМНЯ — В КНИГУ» (ключевая мысль; дальше верх занят надписями-источниками, заголовка
 * нет); подписи-источники (КАМЕНЬ ХАММУРАПИ, ЕВАНГЕЛИЕ ОТ МАТФЕЯ · ГЛАВА 5, СТИХ 39) — плашки-таблетки; стела — цветной
 * камень (сине-фиолетовый градиент, светлый кант, клинопись светлая, строка правила — золотая); книга — синяя обложка с
 * золотой рамкой и орнаментом-кольцом, кремовые страницы с полосками строк и краем блока, ВЕТХИЙ ЗАВЕТ на бирюзовой
 * ленте, НОВЫЙ ЗАВЕТ на золотой, ОКО ЗА ОКО / ЗУБ ЗА ЗУБ тёмным с золотым маркером на слове; люди из облаков точек →
 * плоские цветные фигуры (голова, туника, руки-штрихи с кистью: кулак ↔ открытая ладонь), собираются из цветных точек и
 * рассыпаются в них; тот, кто бьёт, — приглушённый серо-лиловый, тот, кто не отвечает («ты» в d07), — бирюзовый; свет в
 * поднятой ладони — золотое солнце с лучами (GFC.spark); весы суда — серый значок GFC.node; «для каждого» — семь
 * разноцветных людей, от центральной ладони к остальным — градиентные нити. Красный — только у острых штрихов обиды.
 * Сверх gf_book (вид, не сюжет): «правило» — из строки стелы выходит значок-весы GFC.node и на «записано» летит в книгу
 * вместе с огоньками; «иудеев» / «христиан» — под книгой встают две маленькие разноцветные группы людей (гаснут на «новой»).
 * Бога и Иисуса не рисуем — только надписи; книга уважительно: не ломается, не гаснет рывком, не перечёркивается.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, p.mode — лишь имя кадра (швов между режимами нет).
 *  old (d05)    вход наплывом из gfc_law/equals (GFC.scene); стела слева на прежнем месте (x 38..110, y 128..292), под ней
 *               КАМЕНЬ ХАММУРАПИ. «Позже» — заголовок ИЗ КАМНЯ — / В КНИГУ, золотая пунктирная стрелка ПОЗЖЕ; «похожее» —
 *               справа синяя закрытая книга; «правило» — строка клинописи золотая, из неё выскакивает значок-весы;
 *               «записано» — значок и цветные огоньки летят по дуге в книгу, книга вспыхивает; «Библии» — заголовок уходит,
 *               стела уходит влево, книга в центр и раскрывается на всю ширину, вверху БИБЛИЯ (золото); «священной» —
 *               СВЯЩЕННАЯ КНИГА; «иудеев», «христиан» — ИУДЕЕВ И ХРИСТИАН по словам, под книгой — группы людей, на
 *               «христиан» свет проходит по обеим половинам; «старой» — левая половина светится бирюзой, лента ВЕТХИЙ
 *               ЗАВЕТ, внизу КНИГА ЛЕВИТ, ГЛАВА 24, СТИХ 20; «части» — (ТО ЕСТЬ СТАРЫЙ); «око», «за», «око» — ОКО ЗА ОКО,
 *               «зуб», «за», «зуб» — ЗУБ ЗА ЗУБ по словам.
 *  cheek (d06)  «новой» — левая тише, правая светится золотом, лента НОВЫЙ ЗАВЕТ, группы уходят; «Иисус» — ЕВАНГЕЛИЕ / ОТ
 *               МАТФЕЯ, под книгой ЕВАНГЕЛИЕ — РАССКАЗ О ЖИЗНИ ИИСУСА; / ДЛЯ ХРИСТИАН ИИСУС — СЫН БОЖИЙ; «отвечает» —
 *               ГЛАВА 5, СТИХ 39, дуга золото → бирюза к ОКО ЗА ОКО; «А (Я говорю)» — книга уменьшается вверх (y 30),
 *               плашка ЕВАНГЕЛИЕ ОТ МАТФЕЯ · ГЛАВА 5, СТИХ 39, цитата крупно по словам «А Я ГОВОРЮ ВАМ: / НЕ ПРОТИВЬСЯ
 *               ЗЛОМУ.» (вторая строка золотом); «злому» — книга и пояснение уходят, цитата — вверх, слева из точек
 *               собирается серо-лиловый человек; «Но» — справа бирюзовый; «ударит» — замах, кулак со следом к щеке,
 *               вспышка и волна, голова отклоняется, щека светится; «щеку» — ещё вспышка; «твою» — открытые ладони теплеют;
 *               «обрати» — поворот (плечи уже, блик по голове, золотая дуга-стрелка), «…ОБРАТИ К НЕМУ И ДРУГУЮ»»;
 *               «нему» — тёплый свет у щеки; «другую» — золотая волна, кулак первого опускается.
 *  you (d07)    «Проще» — первый рассыпается в точки, бирюзовый — крупно; «обидели» — красные острые штрихи, вспышка, дрожь,
 *               рука вверх в крупный кулак; ОБИДЕЛИ —; «не мсти» — НЕ МСТИ (золото), кулак разжимается, над ладонью
 *               золотое солнце; «А ты бы смог?» — фигура тише, А ТЫ / БЫ СМОГ? по словам; «Это» — вопрос вверх, фигура к
 *               центру низа; «правило» — солнце в ладони вспыхивает; «не для суда» — НЕ ДЛЯ СУДА, справа серый значок-весы,
 *               на «а» уходит; «каждого» — А ДЛЯ КАЖДОГО, по бокам ещё шесть разноцветных людей с поднятой ладонью, солнца в
 *               ладонях и нити — волной от центра. Поза держится — из неё наплывает gfc_tribes/tribes.
 * Слова (GFC.bare, точное совпадение, n — номер такого слова во фразе) — те же, что в gf_book, сверены с build/words.json:
 *   d05 — позже, похожее, правило, записано, библии, священной, иудеев, и (1), христиан, старой, части, око (0, 1), за (0, 1),
 *   зуб (0, 1); d06 — новой, иисус, отвечает, а (1), я, говорю, вам, не, противься, злому, но, ударит, правую, щеку, твою,
 *   обрати, к, нему, и, другую; d07 — проще, обидели, не (0, 1), мсти, а (0, 1), ты, бы, смог, это, правило, для (0, 1),
 *   суда, каждого. Нет слова в K.words — доля фразы (как в gf_book).
 * Параметры p: s, mode, K, prev/prev_mode (наплыв — GFC.scene). Подписи — не выше базовой линии y 46; важное — y 20..352.
 */
(() => {
  const G = GFC;
  const f = v => Number(v).toFixed(2);
  const PI = Math.PI, PI2 = Math.PI * 2;
  const H = n => G.hash(n);
  const { q, qq, lerp, clamp, ease } = G;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const FF = 'GFCMont, Mont, sans-serif', W8 = 1.035, INK = G.INK, GOLD = G.GOLD, RED = G.RED;
  const TXT = '#2b1a63', TXT2 = '#5d4c94', CREAM = '#fff1d6';
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const gop = (op, s) => op <= .003 || !s ? '' : op >= .999 ? s : `<g opacity="${f(op)}">${s}</g>`;
  const DEF = { d05: [25.31, 32.83], d06: [33.13, 41.46], d07: [41.76, 47.47] };

  /* ---------------- time from words (as gf_book) ---------------- */
  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  function W(K, id, word, share, n = 0) {
    const ws = (K.words && K.words[id]) || [], b = G.bare(word);
    const hit = ws.filter(w => G.bare(w.w) === b);
    if (hit.length > n) return hit[n].t0;
    const [a, e] = span(K, id);
    return a + share * (e - a);
  }
  function cues(K) {
    const c = {}, a = (id, w, sh, n = 0) => W(K, id, w, sh, n);
    [c.s5, c.e5] = span(K, 'd05'); [c.s6, c.e6] = span(K, 'd06'); [c.s7, c.e7] = span(K, 'd07');
    c.poz = a('d05', 'позже', 0); c.poh = a('d05', 'похожее', .051); c.prv = a('d05', 'правило', .125);
    c.zap = a('d05', 'записано', .17); c.bib = a('d05', 'библии', .247); c.svy = a('d05', 'священной', .322);
    c.iud = a('d05', 'иудеев', .436); c.i5 = a('d05', 'и', .505, 1); c.hri = a('d05', 'христиан', .516);
    c.sta = a('d05', 'старой', .617); c.cha = a('d05', 'части', .652);
    c.oko1 = a('d05', 'око', .731, 0); c.za1 = a('d05', 'за', .787, 0); c.oko2 = a('d05', 'око', .806, 1);
    c.zub1 = a('d05', 'зуб', .894, 0); c.za2 = a('d05', 'за', .92, 1); c.zub2 = a('d05', 'зуб', .941, 1);
    c.nov = a('d06', 'новой', .026); c.iis = a('d06', 'иисус', .091); c.otv = a('d06', 'отвечает', .142);
    c.qa = a('d06', 'а', .223, 1); c.ya = a('d06', 'я', .274); c.gov = a('d06', 'говорю', .29); c.vam = a('d06', 'вам', .329);
    c.ne6 = a('d06', 'не', .379); c.pro = a('d06', 'противься', .415); c.zlo = a('d06', 'злому', .47);
    c.no = a('d06', 'но', .549); c.ud = a('d06', 'ударит', .6); c.prav = a('d06', 'правую', .686);
    c.shch = a('d06', 'щеку', .72); c.tvo = a('d06', 'твою', .761); c.obr = a('d06', 'обрати', .828);
    c.k6 = a('d06', 'к', .876); c.nem = a('d06', 'нему', .888); c.i6 = a('d06', 'и', .909); c.dru = a('d06', 'другую', .931);
    c.pro7 = a('d07', 'проще', 0); c.obi = a('d07', 'обидели', .112); c.ne7 = a('d07', 'не', .263, 0);
    c.msti = a('d07', 'мсти', .291); c.a7 = a('d07', 'а', .385, 0); c.ty = a('d07', 'ты', .441); c.by = a('d07', 'бы', .459);
    c.smog = a('d07', 'смог', .476); c.eto = a('d07', 'это', .56); c.prv7 = a('d07', 'правило', .634);
    c.ne7b = a('d07', 'не', .701, 1); c.dly1 = a('d07', 'для', .722, 0); c.suda = a('d07', 'суда', .746);
    c.a7b = a('d07', 'а', .837, 1); c.dly2 = a('d07', 'для', .865, 1); c.kazh = a('d07', 'каждого', .89);
    c.tc = c.ud + .4;                                   // the strike lands
    return c;
  }

  /* ---------------- colours and local gradients ---------------- */
  function paint(c) {
    if (typeof c === 'string' && G.NAME[c] != null) c = G.NAME[c];
    if (typeof c === 'number') { const i = ((Math.round(c) % 7) + 7) % 7; return { fill: `url(#gfc-p${i})`, dark: G.PAL[i][1], light: G.PAL[i][0] }; }
    return { fill: c, dark: G.mixC(c, INK, .38), light: G.mixC(c, '#ffffff', .3) };
  }
  const lg = (id, stops, at) => `<linearGradient id="${id}" ${at}>${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const PAGE = [[0, '#e2c69c'], [.1, '#f8e8cb'], [.5, '#fff6e4'], [1, '#fffaf0']];
  const DEFS = `<defs>
    ${lg('gcb-stone', [[0, '#8f86ea'], [.5, '#5b4cc0'], [1, '#2f2484']], 'x1="0" y1="0" x2=".85" y2="1"')}
    ${lg('gcb-cover', [[0, '#69b4ff'], [.45, '#3d78e6'], [1, '#2a3a9e']], 'x1="0" y1="0" x2=".8" y2="1"')}
    ${lg('gcb-pageR', PAGE, 'gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="158" y2="0"')}
    ${lg('gcb-pageL', PAGE, 'gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-158" y2="0"')}
    ${lg('gcb-later', [[0, '#63e6d2'], [1, GOLD]], 'gradientUnits="userSpaceOnUse" x1="122" y1="0" x2="210" y2="0"')}
    ${lg('gcb-arc', [[0, GOLD], [1, '#63e6d2']], 'gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="-52" y2="0"')}
    <radialGradient id="gcb-teal"><stop offset="0" stop-color="#63e6d2" stop-opacity=".5"/><stop offset=".45" stop-color="#2fc9b6" stop-opacity=".18"/><stop offset="1" stop-color="#17998f" stop-opacity="0"/></radialGradient>
  </defs>`;

  /* ---------------- text ---------------- */
  // one Montserrat 800 word: soft shadow, optional glow, optional gold marker behind it (dark words on a page)
  function htext(x, y, str, sz, o) {
    if (o.op <= .003) return '';
    const at = `x="${f(x)}" text-anchor="middle" font-family="${FF}" font-weight="800" font-size="${f(sz)}" letter-spacing="${f(sz * o.ls)}"`;
    let s = '';
    if (o.marker > .003) s += `<rect x="${f(x - o.w / 2 - 3)}" y="${f(y - sz * .86)}" width="${f(o.w + 6)}" height="${f(sz * 1.08)}" rx="${f(sz * .22)}" fill="${GOLD}" opacity="${f(o.marker)}"/>`;
    if (o.shadow) { const sh = `<text ${at} y="${f(y + Math.max(1, sz * .075))}" fill="${INK}">${esc(str)}</text>`; s += `<g filter="url(#gfc-hblur)" opacity=".7">${sh}</g><g opacity=".55">${sh}</g>`; }
    if (o.glow > .02) s += `<text ${at} y="${f(y)}" fill="${o.gcol}" opacity="${f(.8 * o.glow)}" filter="url(#gfc-glow3)">${esc(str)}</text>`;
    s += `<text ${at} y="${f(y)}" fill="${o.col}">${esc(str)}</text>`;
    return `<g opacity="${f(o.op)}">${s}</g>`;
  }
  // words of one line appear on their words (pop + flash): items [[text, t0, accent]]; the whole line fits o.maxW
  function hwords(x, y, items, size, t, o = {}) {
    const ls = o.ls ?? .02, big = o.big ?? 1, maxW = o.maxW ?? 326, gap = .3 * size;
    const segs = items.map(([tx, t0, acc]) => {
      const str = String(tx).toUpperCase(), sz = size * (acc ? big : 1);
      return { str, t0, acc, sz, w: G.textW(str, sz, sz * ls) * W8 };
    });
    const tot = segs.reduce((n, g) => n + g.w, 0) + gap * (segs.length - 1), k = tot > maxW ? maxW / tot : 1;
    let pos = x - tot * k / 2, s = '';
    for (const g of segs) {
      const w = g.w * k, sz = g.sz * k, cx = pos + w / 2;
      pos += w + gap * k;
      if (t < g.t0 - .03) continue;
      const a = q(t, g.t0 - .03, .12), pop = 1 + .13 * Math.min(1, 20 / size) * (1 - qq(t, g.t0 - .03, g.t0 + .25)), fl = pulse(t, g.t0 - .03, .05, .5);
      const dark = o.dark;
      s += G.zoom(htext(cx, y, g.str, sz, {
        op: (o.op ?? 1) * a, ls, w, col: g.acc ? (o.accent ?? (dark ? '#6a3fc8' : GOLD)) : (o.color ?? (dark ? TXT : '#fff')),
        shadow: !dark, glow: dark ? 0 : (g.acc ? (o.glow ?? 1) : .8 * fl), gcol: g.acc ? '#ffa040' : '#d9c8ff',
        marker: o.marker ? (o.marker * .45 + .4 * fl) * a : 0,
      }), cx, y - sz * .35, pop);
    }
    return s;
  }
  // a small Montserrat 700 label typed letter by letter
  const typed = (x, y, text, t, t0, size, o = {}) => G.typed(x, y, text, t, t0, {
    size, cps: o.cps ?? 26, anchor: o.anchor ?? 'middle', op: o.op ?? .95, color: o.color, glow: o.glow, ls: o.ls ?? .06,
    maxW: o.maxW, shadow: o.shadow, weight: o.weight });
  // a source caption: a pill (dark violet, gold rim) with the text typed in it
  function pillBox(x, y, str, size, o) {
    const ls = o.ls ?? .05, maxW = o.maxW ?? 320;
    let sz = G.fs(size); const w0 = G.textW(str.toUpperCase(), sz, sz * ls);
    if (w0 > maxW) sz *= maxW / w0;
    const w = Math.min(w0, maxW), pw = w + sz * 1.5, ph = sz * 1.7;
    return `<rect x="${f(x - pw / 2)}" y="${f(y - sz * 1.16 + 1.5)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="${INK}" opacity=".45"/>` +
      `<rect x="${f(x - pw / 2)}" y="${f(y - sz * 1.16)}" width="${f(pw)}" height="${f(ph)}" rx="${f(ph / 2)}" fill="#1a0e4a" opacity=".9" stroke="#ffd166" stroke-opacity=".6" stroke-width="1"/>`;
  }
  function pill(x, y, text, t, t0, size, o = {}) {
    if (t < t0 - .06) return '';
    const k = q(t, t0 - .06, .25), ls = o.ls ?? .05, maxW = o.maxW ?? 320;
    return gop((o.op ?? 1) * k, pillBox(x, y, text, size, o) +
      G.typed(x, y, text, t, t0, { size, cps: o.cps ?? 40, maxW, ls, color: '#ffe6a8', shadow: 0, op: 1 }));
  }
  const pillS = (x, y, text, size, o = {}) => pillBox(x, y, text, size, o) +
    G.mono(x, y, text, { size, anchor: 'middle', maxW: o.maxW ?? 320, ls: o.ls ?? .05, color: '#ffe6a8', shadow: 0, opacity: 1 });

  /* ---------------- d05: the stele of Hammurabi, «ПОЗЖЕ», the rule flies into the book ---------------- */
  const STX = 74, STT = 128, STB = 292, STR = 36, RULE = 2, RY = STT + 52 + RULE * 12;
  const MARKS = (() => {
    const M = [];
    for (let r = 0; r < 9; r++) for (let k = 0; k < 7; k++) {
      const i = r * 7 + k;
      if (H(i * 11 + 4) < .12) continue;
      M.push({ r, x: STX - 27 + k * 8.4 + (H(i * 3 + 1) - .5) * 2, y: STT + 52 + r * 12 + (H(i * 5 + 2) - .5) * 1.6, a: Math.floor(H(i * 7 + 3) * 4) });
    }
    return M;
  })();
  const wedge = m => {
    const { x, y } = m;
    if (m.a === 0) return `M${f(x)} ${f(y - 2.2)} L${f(x + 3.2)} ${f(y)} L${f(x)} ${f(y + 2.2)} Z M${f(x + 3.2)} ${f(y)} L${f(x + 7)} ${f(y)}`;
    if (m.a === 1) return `M${f(x + 1.3)} ${f(y - 4)} L${f(x + 3.5)} ${f(y - 4)} L${f(x + 2.4)} ${f(y - 1)} Z M${f(x + 2.4)} ${f(y - 1)} L${f(x + 2.4)} ${f(y + 4)}`;
    if (m.a === 2) return `M${f(x)} ${f(y - 3)} L${f(x + 3)} ${f(y - 2.4)} L${f(x + 1)} ${f(y)} Z M${f(x + 1.8)} ${f(y - 1.4)} L${f(x + 5.6)} ${f(y + 3)}`;
    return `M${f(x + 1)} ${f(y - 2)} L${f(x + 4.6)} ${f(y)} L${f(x + 1)} ${f(y + 2)} Z`;
  };
  const MARK_OTHER = MARKS.filter(m => m.r !== RULE).map(wedge).join(' '), MARK_RULE = MARKS.filter(m => m.r === RULE).map(wedge).join(' ');
  function stele(t, op, rule, dx) {
    if (op <= .003) return '';
    const x0 = STX - STR, x1 = STX + STR;
    const d = `M${x0} ${STB} L${x0} ${STT + STR} A${STR} ${STR} 0 0 1 ${x1} ${STT + STR} L${x1} ${STB} Z`;
    let s = `<ellipse cx="${STX + 6}" cy="${STB + 1}" rx="54" ry="8" fill="url(#gfc-shadow)"/>` +
      `<path d="${d}" transform="translate(4 3)" fill="${INK}" opacity=".5"/>` +
      `<path d="${d}" fill="url(#gcb-stone)"/><path d="${d}" fill="url(#gfc-shade)"/>` +
      `<path d="M${x0 + 3} ${STB - 3} L${x0 + 3} ${STT + STR} A${STR - 3} ${STR - 3} 0 0 1 ${STX + 4} ${STT + 3.2}" fill="none" stroke="#dcd4ff" stroke-width="2.2" stroke-linecap="round" opacity=".65"/>` +
      `<path d="M${x0 + 9} ${STT + 44} L${x0 + 9} ${STT + STR} A${STR - 9} ${STR - 9} 0 0 1 ${x1 - 9} ${STT + STR} L${x1 - 9} ${STT + 44} Z" fill="#c2b8ff" opacity=".26"/>` +
      `<path d="${MARK_OTHER}" fill="#f1ecff" stroke="#f1ecff" stroke-width="1" opacity=".8" stroke-linecap="round"/>`;
    if (rule > .003) s += `<rect x="${x0 + 4}" y="${RY - 7.5}" width="${2 * STR - 8}" height="15" rx="5" fill="${GOLD}" opacity="${f(.5 * rule)}" filter="url(#gfc-glow3)"/>` +
      `<rect x="${x0 + 5}" y="${RY - 6.5}" width="${2 * STR - 10}" height="13" rx="4.5" fill="#ffe27a" opacity="${f(.28 * rule)}"/>`;
    s += `<path d="${MARK_RULE}" fill="${G.mixC('#f1ecff', '#ffb23d', rule)}" stroke="${G.mixC('#f1ecff', '#ffb23d', rule)}" stroke-width="${f(1 + .5 * rule)}" opacity="${f(.8 + .2 * rule)}" stroke-linecap="round"/>`;
    s += pillS(STX + 8, STB + 24, 'КАМЕНЬ ХАММУРАПИ', 12, { maxW: 146, ls: .02 });
    return gop(op, dx ? `<g transform="translate(${f(dx)} 0)">${s}</g>` : s);
  }
  // the dashed arrow «ПОЗЖЕ» from the stele towards the book (teal → gold)
  function later(t, c, op) {
    if (op <= .003) return '';
    const g = qq(t, c.poz - .05, c.poz + .55), x0 = 122, x1 = lerp(x0 + 4, 208, g), y = 212;
    let s = `<line x1="${x0}" y1="${y + 1.5}" x2="${f(x1)}" y2="${y + 1.5}" stroke="${INK}" stroke-width="3.2" stroke-dasharray="7 6" stroke-linecap="round" opacity=".45"/>` +
      `<line x1="${x0}" y1="${y}" x2="${f(x1)}" y2="${y}" stroke="url(#gcb-later)" stroke-width="3.2" stroke-dasharray="7 6" stroke-linecap="round"/>`;
    if (g > .85) s += `<path d="M${f(x1 - 11)} ${y - 7} L${f(x1 + 1)} ${y} L${f(x1 - 11)} ${y + 7} Z" fill="${GOLD}" stroke="${GOLD}" stroke-width="1.5" stroke-linejoin="round" opacity="${f(qq(g, .85, 1))}"/>`;
    s += typed(164, y - 15, 'ПОЗЖЕ', t, c.poz, 15, { color: GOLD, glow: true, weight: 800 });
    return gop(op, s);
  }

  /* ---------------- the book: spine at x=0, top at y=0, two pages PW×PH ---------------- */
  const PW = 158, PH = 190;
  const pagePath = (side, w, lift) => {
    const x = side * w;
    return `M0 8 Q${f(x * .45)} -5 ${f(x)} ${f(-lift)} L${f(x)} ${f(PH + lift)} Q${f(x * .45)} ${PH + 1} 0 ${PH + 7} Z`;
  };
  // the open cover under a page (blue, slightly larger than the page)
  function coverUnder(side, w, lift) {
    if (w < .5) return '';
    const x = side * (w + 6);
    const d = `M0 4 L${f(x)} ${f(-6 - lift)} L${f(x)} ${f(PH + 13 + lift)} L0 ${PH + 14} Z`;
    return `<path d="${d}" transform="translate(${f(side * 2)} 4)" fill="${INK}" opacity=".45"/>` +
      `<path d="${d}" fill="url(#gcb-cover)" stroke="#1d2a78" stroke-width="1.2" stroke-linejoin="round"/><path d="${d}" fill="url(#gfc-shade)" opacity=".6"/>`;
  }
  function page(side, w, lift, lit, col) {
    if (w < .5) return '';
    const d = pagePath(side, w, lift);
    let s = '';
    // the block of pages: cream edges (stripes)
    for (let k = 3; k >= 1; k--) s += `<path d="${d}" transform="translate(${f(side * 1.7 * k)} ${f(1.9 * k)})" fill="${k % 2 ? '#e9d3ae' : '#f6e6c8'}" stroke="#c7a878" stroke-width=".6"/>`;
    if (lit > .003) s += `<path d="${d}" fill="none" stroke="${col}" stroke-width="10" opacity="${f(.55 * lit)}" filter="url(#gfc-glow3)"/>`;
    s += `<path d="${d}" fill="url(#gcb-page${side > 0 ? 'R' : 'L'})"/>`;
    if (lit > .003) s += `<path d="${d}" fill="${col}" opacity="${f(.13 * lit)}"/>`;
    s += `<path d="${d}" fill="none" stroke="#fff" stroke-width="1.1" opacity=".6" stroke-linejoin="round"/>`;
    return s;
  }
  // lines of scripture (violet dashes of uneven length); they give way to the labels
  function rows(side, op, seed) {
    if (op <= .003) return '';
    let s = '';
    for (let r = 0; r < 12; r++) {
      const y = 22 + r * 14, x0 = side > 0 ? 16 : -(PW - 14), x1 = side > 0 ? PW - 14 : -16, len = r === 11 ? .5 : 1;
      const da = [];
      for (let k = 0; k < 9; k++) da.push(f(5 + 15 * H(seed * 37 + r * 11 + k)), f(4 + 2 * H(seed * 41 + r * 7 + k)));
      s += `<line x1="${x0}" y1="${y}" x2="${f(x0 + (x1 - x0) * len)}" y2="${y}" stroke="#9a86cc" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="${da.join(' ')}" opacity="${f(.6 * op)}"/>`;
    }
    return s;
  }
  // a coloured ribbon with the name of the half (ВЕТХИЙ ЗАВЕТ — teal, НОВЫЙ ЗАВЕТ — gold)
  function ribbon(side, t, t0, fill, text, ink) {
    const k = q(t, t0 - .06, .3);
    if (k <= .003) return '';
    const cx = side * PW / 2, w = (PW - 20) * (.35 + .65 * k);
    return `<g opacity="${f(k)}"><rect x="${f(cx - w / 2 + 1)}" y="16.5" width="${f(w)}" height="22" rx="11" fill="${INK}" opacity=".3"/>` +
      `<rect x="${f(cx - w / 2)}" y="15" width="${f(w)}" height="22" rx="11" fill="${fill}"/><rect x="${f(cx - w / 2)}" y="15" width="${f(w)}" height="22" rx="11" fill="url(#gfc-shade)"/>` +
      `<rect x="${f(cx - w / 2 + 6)}" y="17.2" width="${f(w - 12)}" height="3" rx="1.5" fill="#fff" opacity=".3"/></g>` +
      typed(cx, 31.5, text, t, t0, 13, { color: ink, shadow: ink === '#fff' ? 1 : 0, weight: 800, maxW: PW - 34, ls: .05 });
  }
  // the cover (the closed book, or the leaf while it turns): w — visible width, lift — the outer edge comes closer
  function cover(w, lift, flash, t) {
    if (w < .5) return '';
    const k = w / PW, x = w + 4 * k;
    const d = `M0 -3 L${f(x)} ${f(-3 - lift)} L${f(x)} ${f(PH + 5 + lift)} L0 ${PH + 5} Z`;
    let s = '';
    if (k > .9) {
      s += `<path d="${d}" transform="translate(9 9)" fill="${INK}" opacity=".4" filter="url(#gfc-blur)"/>`;
      for (let j = 2; j >= 1; j--) s += `<path d="${d}" transform="translate(${3 * j} ${3 * j})" fill="${j === 2 ? '#e9d3ae' : CREAM}" stroke="#c7a878" stroke-width=".7"/>`;
    }
    if (flash > .003) s += `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="12" opacity="${f(.7 * flash)}" filter="url(#gfc-glow3)"/>`;
    s += `<path d="${d}" fill="url(#gcb-cover)" stroke="#1d2a78" stroke-width="1.4" stroke-linejoin="round"/><path d="${d}" fill="url(#gfc-shade)"/>` +
      `<path d="M${f(12 * k)} ${f(10 - lift * .1)} L${f(x - 11 * k)} ${f(10 - lift * .9)} L${f(x - 11 * k)} ${f(PH - 8 + lift * .9)} L${f(12 * k)} ${f(PH - 8 + lift * .1)} Z" fill="none" stroke="${GOLD}" stroke-width="1.6" opacity=".9"/>` +
      `<path d="M${f(16 * k)} ${f(14 - lift * .1)} L${f(x - 15 * k)} ${f(14 - lift * .9)} L${f(x - 15 * k)} ${f(PH - 12 + lift * .9)} L${f(16 * k)} ${f(PH - 12 + lift * .1)} Z" fill="none" stroke="${GOLD}" stroke-width=".7" opacity=".55"/>` +
      `<rect x="0" y="-2" width="${f(7 * k)}" height="${PH + 6}" fill="#1d2a78" opacity=".45"/>` +
      `<line x1="${f(7 * k)}" y1="-2" x2="${f(7 * k)}" y2="${PH + 4}" stroke="${GOLD}" stroke-width="1" opacity=".7"/>` +
      `<path d="M${f(x * .62)} -2 L${f(x * .78)} -2 L${f(x * .3)} ${PH + 4} L${f(x * .14)} ${PH + 4} Z" fill="#fff" opacity=".07"/>`;
    // the ornament in the middle of the cover: a ring of gold dots and a light
    const cx = x / 2, cy = PH * .45;
    let o = '';
    for (let i = 0; i < 16; i++) { const a = i / 16 * PI2; o += `<circle cx="${f(cx + 21 * k * Math.cos(a))}" cy="${f(cy + 21 * Math.sin(a))}" r="1.7"/>`; }
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(28 + 10 * flash)}" fill="url(#gfc-halo)" opacity="${f(.55 + .45 * flash)}"/>` +
      `<g fill="${GOLD}">${o}</g><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(6 + 3 * flash)}" fill="url(#gfc-ball)"/>` +
      `<circle cx="${f(cx - 2)}" cy="${f(cy - 2)}" r="1.6" fill="#fffdf2" opacity=".85"/>`;
    return s;
  }
  // where the book is: small and closed at the right («похожее») → to the centre, opening on «Библии» → small at the top
  // on «А Я говорю» (y 30: its labels stay under the Reels interface line) → gone on «злому»
  function bookPose(t, c) {
    const g = qq(t, c.bib - .05, c.bib + .7), o = qq(t, c.bib + .12, c.bib + .85), m = qq(t, c.qa - .05, c.qa + .6);
    let sc = lerp(.7, 1, g), x = lerp(268 - PW / 2 * .7, 180, g), y = lerp(212 - PH / 2 * .7, 112, g);
    x = lerp(x, 180, m); y = lerp(y, 30, m); sc = lerp(sc, .5, m);
    const op = q(t, c.poh - .12, .45) * (1 - qq(t, c.zlo - .15, c.zlo + .2));
    const pop = 1 + .12 * Math.sin(PI * qq(t, c.poh - .12, c.poh + .4));
    return { x, y, sc: sc * pop, o, op, m };
  }
  function book(t, c, B) {
    if (B.op <= .003) return '';
    const o = B.o, lift = 10 * Math.sin(PI * o), cw = PW * Math.cos(PI * o);
    const litR = q(t, c.nov - .05, .4);
    const litL = clamp(q(t, c.sta - .05, .45) * (1 - .5 * q(t, c.nov - .05, .4)) + .5 * pulse(t, c.cha + .2, .12, .6) +
      .55 * pulse(t, c.otv + .45, .1, .7));
    const sweep = qq(t, c.hri - .05, c.hri + .7);
    let s = '';
    if (o > 0) {
      if (litR > .003) s += `<ellipse cx="${PW / 2}" cy="${PH / 2}" rx="135" ry="145" fill="url(#gfc-halo)" opacity="${f(litR)}"/>`;
      if (o > .5 && litL > .003) s += `<ellipse cx="${-PW / 2}" cy="${PH / 2}" rx="135" ry="145" fill="url(#gcb-teal)" opacity="${f(litL)}"/>`;
      s += coverUnder(1, PW, 0) + page(1, PW, 0, litR, GOLD) + rows(1, 1 - .85 * litR, 3);
      // the right page (Новый Завет)
      s += ribbon(1, t, c.nov, 'url(#gfc-p4)', 'НОВЫЙ ЗАВЕТ', INK) +
        typed(PW / 2, 62, 'ЕВАНГЕЛИЕ', t, c.iis, 13, { color: TXT, shadow: 0, weight: 800, maxW: PW - 24 }) +
        typed(PW / 2, 82, 'ОТ МАТФЕЯ', t, c.iis + .3, 13, { color: TXT, shadow: 0, weight: 800, maxW: PW - 24 }) +
        typed(PW / 2, PH - 14, 'ГЛАВА 5, СТИХ 39', t, c.otv, 12, { cps: 34, color: TXT2, shadow: 0, maxW: PW - 24, ls: .03 });
    }
    if (cw > .5) s += cover(cw, lift, pulse(t, c.zap + .55, .1, .7), t);
    else if (cw < -.5) {
      s += coverUnder(-1, -cw, lift) + page(-1, -cw, lift, litL, '#63e6d2');
      if (o > .97) {
        const lo = .6 + .4 * clamp(litL / .9);
        s += rows(-1, 1 - .9 * q(t, c.sta - .05, .4), 5) + gop(lo,
          ribbon(-1, t, c.sta, 'url(#gfc-p1)', 'ВЕТХИЙ ЗАВЕТ', '#fff') +
          typed(-PW / 2, 54, '(ТО ЕСТЬ СТАРЫЙ)', t, c.cha, 12, { color: TXT2, shadow: 0, maxW: PW - 24, ls: .03 }) +
          hwords(-PW / 2, 102, [['ОКО', c.oko1], ['ЗА', c.za1], ['ОКО,', c.oko2]], 18, t, { dark: true, marker: 1, maxW: PW - 22 }) +
          hwords(-PW / 2, 128, [['ЗУБ', c.zub1], ['ЗА', c.za2], ['ЗУБ', c.zub2]], 18, t, { dark: true, marker: 1, maxW: PW - 22 }) +
          typed(-PW / 2, PH - 32, 'КНИГА ЛЕВИТ,', t, c.sta + .25, 12, { cps: 34, color: TXT2, shadow: 0, maxW: PW - 24, ls: .03 }) +
          typed(-PW / 2, PH - 14, 'ГЛАВА 24, СТИХ 20', t, c.sta + .6, 12, { cps: 34, color: TXT2, shadow: 0, maxW: PW - 24, ls: .03 }));
        // «иудеев и христиан»: one warm light passes over both halves — one book
        if (sweep > 0 && sweep < 1) s += `<ellipse cx="${f(lerp(-PW, PW, sweep))}" cy="${PH / 2}" rx="56" ry="${PH * .66}" fill="url(#gfc-halo)" opacity="${f(1.4 * Math.sin(PI * sweep))}"/>`;
      }
    }
    // the spine
    if (o > .5) s += `<line x1="0" y1="8" x2="0" y2="${PH + 7}" stroke="#b08e5e" stroke-width="1.8" opacity="${f(.85 * qq(o, .5, 1))}"/>`;
    // «отвечает»: an arc gold → teal from the new half to «ОКО ЗА ОКО» in the old one
    const ar = qq(t, c.otv - .05, c.otv + .5), aop = 1 - qq(t, c.qa - .05, c.qa + .35);
    if (ar > .003 && aop > .003) {
      const d = `M60 104 Q0 30 -52 92`;
      s += gop(aop, `<path d="${d}" pathLength="1" stroke-dasharray="${f(ar)} 1" fill="none" stroke="${GOLD}" stroke-width="9" opacity=".45" filter="url(#gfc-glow3)"/>` +
        `<path d="${d}" pathLength="1" stroke-dasharray="${f(ar)} 1" fill="none" stroke="url(#gcb-arc)" stroke-width="3.4" stroke-linecap="round"/>` +
        (ar > .9 ? `<path d="M-39 87 L-52 92 L-45 79 Z" fill="#2fc9b6" stroke="#2fc9b6" stroke-width="1.6" stroke-linejoin="round" opacity="${f(qq(ar, .9, 1))}"/>` : ''));
    }
    return `<g opacity="${f(B.op)}" transform="translate(${f(B.x)} ${f(B.y)}) scale(${(+B.sc).toFixed(4)})">${s}</g>`;
  }

  /* ---------------- people: flat figures (head, tunic, arms by two-bone IK, hands fist ↔ open palm) ---------------- */
  // units as in gf_book (soles 0, top of the head −98, shoulders y −73, arm bones 18 + 18), so the hand targets are the same
  const HR = 10, HY = -88, L1 = 18, L2 = 18;
  function elbow(S, T, side) {
    const dx = T[0] - S[0], dy = T[1] - S[1], d = Math.hypot(dx, dy) || 1, dd = Math.min(d, L1 + L2 - .05);
    const ux = dx / d, uy = dy / d, hgt = Math.sqrt(Math.max(0, L1 * L1 - (dd / 2) ** 2));
    let px = -uy, py = ux;
    if (py + .8 * side * px < 0) { px = -px; py = -py; }          // the elbow goes down and out
    const Tt = [S[0] + ux * dd, S[1] + uy * dd];
    return { E: [S[0] + ux * dd / 2 + px * hgt, S[1] + uy * dd / 2 + py * hgt], T: Tt };
  }
  // a hand in its own units: wrist at 0, fingers to −y, thumb to −x; k 0 — a fist, 1 — an open palm; tint — warm light
  const FING = [[-2.55, 4.4], [-.85, 5.3], [.85, 5.0], [2.55, 4.0]];
  function handSvg(k, col, dark, tint) {
    const kp = ease(k / .5);
    const px = lerp(4.2, 3.5, kp), y0 = lerp(-10.4, -9.6, kp), y1 = lerp(-1.4, -.6, kp), rx = lerp(4, 2.7, kp);
    const palm = `<rect x="${f(-px)}" y="${f(y0)}" width="${f(2 * px)}" height="${f(y1 - y0)}" rx="${f(rx)}"/>`;
    let fl = '';
    FING.forEach(([bx, L], j) => {
      const kj = ease((k - .08 * j) / .7), ang = (j - 1.5) * .2 * kj, Lj = L * 1.3 * kj + .01;
      const x0 = bx * 1.08, yb = y0 + 1.3;
      fl += `M${f(x0)} ${f(yb)} L${f(x0 + Math.sin(ang) * Lj)} ${f(yb - Math.cos(ang) * Lj)} `;
    });
    const kt = ease(k / .6);
    fl += `M-2.6 -3.8 L${f(lerp(1.6, -7.8, kt))} ${f(lerp(-6.4, -7.9, kt))}`;
    let s = `<g fill="${dark}" stroke="${dark}" stroke-width="1.6" stroke-linejoin="round">${palm}</g>` +
      `<path d="${fl}" stroke="${dark}" stroke-width="3.7" stroke-linecap="round" fill="none"/>` +
      `<g fill="${col}">${palm}</g><path d="${fl}" stroke="${col}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
    if (tint > .003) s += `<g opacity="${f(.75 * tint)}"><g fill="#ffd36b">${palm}</g><path d="${fl}" stroke="#ffd36b" stroke-width="2.2" stroke-linecap="round" fill="none"/></g>`;
    return s;
  }
  // a person: o.seed, o.color, o.sq (shoulders narrower — turning), o.lean (upper body to the side, units), o.hdx (head),
  // o.hsq, o.shake [dx, dy] units, o.arms [left, right]: { tg: hand target [x,y] or hanging, k: 0 fist..1 open, hs: hand
  // size, up: fingers to the sky 0..1, light: warm light (raised palm — a sun above it, lowered — a warm palm) };
  // o.form 0..1 — gathers from coloured dots; o.drift — scatters into dots from that time; o.op;
  // returns { svg, head:[x,y], hr, hands:[[x,y]], suns:[[x,y,r]] }
  function flat(cx, gy, s, o) {
    const t = o.t ?? 0, sq = o.sq ?? 1, lean = o.lean ?? 0, seed = o.seed ?? 1, op = o.op ?? 1;
    const C = paint(o.color ?? G.pick(seed)), hand = G.mixC(C.light, '#ffffff', .25);
    const off = y => lean * clamp((-46 - y) / 45);
    const sh = o.shake || [0, 0], X = cx + sh[0] * s, Y = gy + sh[1] * s;
    const hdx = (o.hdx ?? 0) + off(HY), hsq = o.hsq ?? 1;
    const tl = off(-80), sl = off(-72), bw = 12 * sq, hem = 17 * lerp(1, .86, 1 - sq);
    const body = `M${f(-bw + sl)} -67 C${f(-bw + sl)} -75 ${f(-7 * sq + tl)} -80 ${f(tl)} -80 C${f(7 * sq + tl)} -80 ${f(bw + sl)} -75 ${f(bw + sl)} -67 ` +
      `L${f(hem)} -5 C${f(hem)} -2 ${f(hem - 2)} 0 ${f(hem - 5)} 0 L${f(5 - hem)} 0 C${f(2 - hem)} 0 ${f(-hem)} -2 ${f(-hem)} -5 Z`;
    let armD = '', hands = '', glows = '', suns = '';
    const HP = [], SU = [];
    [-1, 1].forEach((side, j) => {
      const arm = (o.arms && o.arms[j]) || {};
      const S = [side * 10.5 * sq + off(-73), -73];
      const { E, T } = elbow(S, arm.tg || [side * 16.5 * sq, -42], side);
      armD += `M${f(S[0])} ${f(S[1])} L${f(E[0])} ${f(E[1])} L${f(T[0])} ${f(T[1])} `;
      let dx = T[0] - E[0], dy = T[1] - E[1];
      const Ln = Math.hypot(dx, dy) || 1, up = arm.up ?? 0;
      dx = lerp(dx / Ln, 0, up); dy = lerp(dy / Ln, -1, up);
      const phi = Math.atan2(dy, dx) + PI / 2, hs = arm.hs ?? 1, lt = clamp(arm.light ?? 0), raised = up > .3;
      const fx = Math.sin(phi), fy = -Math.cos(phi);
      hands += `<g transform="translate(${f(T[0])} ${f(T[1])}) rotate(${f(phi * 180 / PI)}) scale(${(-side * hs).toFixed(4)} ${hs.toFixed(4)})">${handSvg(arm.k ?? 1, hand, C.dark, raised ? .35 * lt : lt)}</g>`;
      HP.push([X + T[0] * s, Y + T[1] * s]);
      if (lt > .003) {
        const pc = [X + (T[0] + 5 * hs * fx) * s, Y + (T[1] + 5 * hs * fy) * s];
        glows += `<circle cx="${f(pc[0])}" cy="${f(pc[1])}" r="${f(15 * hs * s)}" fill="url(#gfc-halo)" opacity="${f(lt)}"/>`;
        if (raised) {
          const r = Math.max(5.6, 3.1 * hs * s) * (.7 + .4 * lt), dd = 14 * hs * s + r * 1.1;
          const sx = X + T[0] * s + fx * dd, sy = Y + T[1] * s + fy * dd;
          suns += G.spark(sx, sy, r, { t: t + seed, op: clamp(lt * 1.4), rays: 12, warm: .9 * lt });
          SU.push([sx, sy, r]);
        }
      }
    });
    const form = o.form ?? 1;
    const shapeOp = op * qq(form, .45, 1) * (o.drift != null ? 1 - qq(t, o.drift, o.drift + .35) : 1);
    let dotsS = '';
    if (form < 1 || o.drift != null) {
      let P = G.personPts(cx, gy, 100 * s, o.n ?? 240, seed);
      let dop = form < 1 ? 1 - qq(form, .7, 1) : 0;
      if (form < 1) P = G.morph(G.cloud(P.length, seed + 40, [10, 150, 350, 352]), P, form, t, { spread: .45, amp: 4, bend: 30, seed: seed + 2 });
      if (o.drift != null && t >= o.drift - .05) {
        P = G.drift(P, t, o.drift, 70, seed + 9);
        dop = Math.max(dop, q(t, o.drift - .05, .12) * (1 - qq(t, o.drift + .25, o.drift + .85)));
      }
      if (dop > .003) dotsS = G.dots(G.jitter(P, t, .9, seed), { r: .9 + .32 * s, op: op * dop * (.45 + .55 * form), t, glow: .6,
        color: [C.light, G.mixC(C.light, '#ffffff', .5), C.light, '#ffe9c4'], seed });
    }
    let svg = dotsS;
    if (shapeOp > .003) {
      const tr = `translate(${f(X)} ${f(Y)}) scale(${s.toFixed(4)})`, head = `<ellipse cx="${f(hdx)}" cy="${HY}" rx="${f(HR * hsq)}" ry="${HR}"`;
      svg += `<g opacity="${f(shapeOp)}"><ellipse cx="${f(cx)}" cy="${f(gy + .5)}" rx="${f(23 * s)}" ry="${f(4.8 * s)}" fill="url(#gfc-shadow)"/>` +
        `<g transform="${tr}"><path d="${body}" fill="${C.fill}"/><path d="${body}" fill="url(#gfc-shade)"/>` +
        `<path d="M${f(-bw + sl + 3)} -66 L${f(3.5 - hem)} -8" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".2"/>` +
        `${head} fill="${C.fill}"/>${head} fill="url(#gfc-shade)"/>` +
        `<ellipse cx="${f(hdx - HR * .38 * hsq)}" cy="${f(HY - HR * .42)}" rx="${f(HR * .32 * hsq)}" ry="${f(HR * .2)}" fill="#fff" opacity=".26"/></g>` +
        glows + `<g transform="${tr}"><path d="${armD}" fill="none" stroke="${C.dark}" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>${hands}</g>` +
        suns + '</g>';
    }
    return { svg, head: [X + hdx * s, Y + HY * s], hr: HR * s, hands: HP, suns: SU, color: C };
  }

  /* ---------------- d06: the one who strikes and the one who does not answer ---------------- */
  const AX = 112, VX = 232, GY = 345, FS = 2.4;
  const R0 = [16.5, -42], WND = [15, -104], THR = [21, -92];
  const HIT = [(VX - HR * FS * .8 - 4 - AX) / FS, HY + 1];          // the fist at the near cheek of the other one
  const mix2 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
  function strikeArm(t, c) {
    const a1 = qq(t, c.ud - .05, c.ud + .22), a2 = clamp((t - (c.ud + .22)) / Math.max(.05, c.tc - c.ud - .22)) ** 2;
    const a3 = qq(t, c.tc + .15, c.tc + .6), a4 = qq(t, c.dru + .1, c.dru + 1.0);
    let p = mix2(R0, WND, a1); p = mix2(p, HIT, a2); p = mix2(p, THR, a3); p = mix2(p, R0, a4);
    const lean = lerp(lerp(lerp(lerp(0, -2, a1), 6, a2), 1, a3), 0, a4);
    return { tg: p, lean, a2, a4 };
  }
  const ATT = '#8f86b8';                                         // the one who strikes: a muted grey-lilac
  function attacker(t, c) {
    const form = qq(t, c.zlo + .15, c.zlo + .8);
    if (form <= .003 || t > c.pro7 + 1) return '';
    const st = strikeArm(t, c), amp = lerp(1.1, .55, st.a4);
    const F = flat(AX, GY, FS, {
      seed: 17, t, lean: st.lean, form, color: ATT, n: 260, shake: [.5 * amp * Math.sin(t * 23), .35 * amp * Math.cos(t * 19)],
      drift: t > c.pro7 - .05 ? c.pro7 : null, arms: [{ k: 0 }, { tg: st.tg, k: 0 }],
    });
    let s = F.svg;
    // the hand flies: a trail of the fist along its path
    const sw = qq(t, c.ud + .18, c.ud + .24) * (1 - qq(t, c.tc + .05, c.tc + .3));
    if (sw > .003) {
      let tr = '';
      for (let k = 1; k <= 6; k++) {
        const p = strikeArm(t - k * .028, c).tg;
        tr += `<circle cx="${f(AX + p[0] * FS)}" cy="${f(GY + p[1] * FS)}" r="${f(8 - k * .9)}" fill="#fff3d6" opacity="${f(.5 * (1 - k / 7) * sw)}"/>`;
      }
      s = `<g filter="url(#gfc-soft)">${tr}</g>` + s;
    }
    return s;
  }

  /* ---------------- small drawings ---------------- */
  function ring(x, y, r0, r1, u, op, w = 2, col = '#fff') {
    if (u <= 0 || u >= 1 || op <= .003) return '';
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(lerp(r0, r1, u))}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(op * (1 - u))}"/>`;
  }
  const SPK = ['#fff6d0', '#ffd36b', '#ffb547', '#fff'];
  function sparks(x, y, u, n, len, seed, cols = SPK) {
    if (u <= 0 || u >= 1) return '';
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (H(seed + i * 3.1) - .5) * 2.6, d = len * (.4 + .6 * H(seed + i * 5.3)) * ease(u);
      s += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="${f(2 * (1 - u) + .7)}" fill="${cols[i % cols.length]}" opacity="${f(.95 * (1 - u))}"/>`;
    }
    return `<g filter="url(#gfc-soft)">${s}</g>${s}`;
  }
  // a gradient thread with a progress u (0..1) from a to b, bowed up
  function thread(a, b, u, c0, c1, id, op = 1) {
    if (u <= .003 || op <= .003) return '';
    const m = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 6 - .3 * Math.abs(b[0] - a[0])];
    const d = `M${f(a[0])} ${f(a[1])} Q${f(m[0])} ${f(m[1])} ${f(b[0])} ${f(b[1])}`;
    return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>` +
      `<g opacity="${f(op)}"><path d="${d}" pathLength="1" stroke-dasharray="${f(u)} 1" fill="none" stroke="url(#${id})" stroke-width="4.5" opacity=".35" filter="url(#gfc-soft)"/>` +
      `<path d="${d}" pathLength="1" stroke-dasharray="${f(u)} 1" fill="none" stroke="url(#${id})" stroke-width="1.8" stroke-linecap="round" opacity=".95"/></g>`;
  }

  /* ---------------- the scene ---------------- */
  const CROWD = [36, 84, 132, 180, 228, 276, 324], ROWC = [0, 2, 5, 1, 6, 3, 0];
  // «иудеев» / «христиан»: two small multicoloured groups under the open book
  const GROUPS = [[[44, 1, 0], [70, 5, 1], [96, 2, 2]], [[264, 6, 0], [290, 0, 1], [316, 3, 2]]];
  function body(t, K) {
    const c = cues(K);
    let s = DEFS;
    /* the hills under the whole scene: warm with the light in the palms at the end */
    const warm = .15 * q(t, c.msti, .5) + .35 * q(t, c.kazh, .6) + .3 * pulse(t, c.zap + .55, .1, .8);
    s += G.ground({ y: 300, warm, seed: 3 });
    /* d05: the headline until «Библии», then the stele and «ПОЗЖЕ» leave */
    s += G.headline('Из камня — / *в книгу*', t, c.s5 - .1, c.bib + .1);
    const sgo = qq(t, c.bib - .1, c.bib + .55);
    const sop = q(t, c.s5 - .15, .35) * (1 - sgo);
    const rule = q(t, c.prv - .05, .3) * (1 - qq(t, c.bib, c.bib + .5));
    s += stele(t, sop, rule, -70 * sgo);
    s += later(t, c, q(t, c.poz - .1, .3) * (1 - sgo));
    const B = bookPose(t, c);
    s += book(t, c, B);
    // «правило»: the scales badge pops from the rule row; «записано»: it and the lights fly along an arc into the book
    const Bk = [B.x + PW / 2 * B.sc, B.y + PH * .45 * B.sc], A0 = [128, 172];
    const nk = q(t, c.prv - .05, .35), fly = qq(t, c.zap - .02, c.zap + .55);
    if (nk > .003 && fly < 1) {
      const x = lerp(A0[0], Bk[0], fly), y = lerp(A0[1], Bk[1], fly) - Math.sin(PI * fly) * 58;
      s += G.node(x, y + 1.2 * Math.sin(t * 2.3), 14, 'scales', { color: 'teal', scale: (.55 + .45 * nk) * lerp(1, .45, fly ** 2), op: nk * (1 - qq(fly, .82, 1)) });
    }
    for (let i = 0; i < 18; i++) {
      const u = qq(t, c.zap - .05 + i * .026, c.zap + .5 + i * .026);
      if (u <= 0 || u >= 1) continue;
      const A = [STX + 30, RY], col = G.PAL[G.pick(i + 1)][0];
      const x = lerp(A[0], Bk[0], u), y = lerp(A[1], Bk[1], u) - Math.sin(PI * u) * (40 + 18 * H(i + 3)) + (H(i * 7) - .5) * 10;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(3 + H(i) * 1.6)}" fill="${col}" opacity="${f(.9 * Math.sin(PI * u))}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${f(x)}" cy="${f(y)}" r="1.6" fill="#fff" opacity="${f(Math.sin(PI * u))}"/>`;
    }
    // the captions over the open book (gone when the book goes up on «А Я говорю»)
    const cap = 1 - qq(t, c.qa - .05, c.qa + .35);
    if (cap > .003 && t >= c.bib - .05) s += gop(cap, G.headline('*Библия*', t, c.bib, null, { y: 52, size: 22, big: 1.45 }) +
      typed(180, 76, 'СВЯЩЕННАЯ КНИГА', t, c.svy, 15, { cps: 30, weight: 800, maxW: 300 }) +
      hwords(180, 98, [['ИУДЕЕВ', c.iud], ['И', c.i5], ['ХРИСТИАН', c.hri]], 15, t, { glow: .6 }));
    // the two groups under the book
    const gout = 1 - qq(t, c.nov - .1, c.nov + .4);
    GROUPS.forEach((grp, gi) => {
      const t0 = gi ? c.hri : c.iud;
      grp.forEach(([x, col, k]) => {
        const a = q(t, t0 - .05 + .08 * k, .35) * gout;
        if (a <= .003) return;
        s += G.person(x, 352 + 8 * (1 - a), 36, { color: col, t, seed: 40 + gi * 3 + k, opacity: a, up: .15 * pulse(t, c.hri + .2, .2, .8) });
      });
    });
    /* d06: the small print under the book, the citation pill, the quote */
    const exp = 1 - qq(t, c.zlo - .1, c.zlo + .35);
    s += gop(exp, typed(180, 328, 'ЕВАНГЕЛИЕ — РАССКАЗ О ЖИЗНИ ИИСУСА;', t, c.iis, 12, { cps: 44, op: .95, maxW: 326, ls: .02 }) +
      typed(180, 346, 'ДЛЯ ХРИСТИАН ИИСУС — СЫН БОЖИЙ', t, c.iis + .5, 12, { cps: 44, op: .95, maxW: 326, ls: .02 }));
    s += gop(1 - qq(t, c.zlo - .15, c.zlo + .15), pill(180, 152, 'ЕВАНГЕЛИЕ ОТ МАТФЕЯ · ГЛАВА 5, СТИХ 39', t, c.qa + .25, 12, { cps: 44, maxW: 300, ls: .03 }));
    const up = qq(t, c.zlo + .12, c.zlo + .6), qop = (1 - qq(t, c.pro7 - .05, c.pro7 + .4)) *
      (1 - .35 * qq(t, c.ud - .1, c.ud + .2) * (1 - qq(t, c.obr - .15, c.obr + .25)));
    if (t >= c.qa - .05 && qop > .003) {
      const qt = hwords(180, 206, [['«А', c.qa], ['Я', c.ya], ['ГОВОРЮ', c.gov], ['ВАМ:', c.vam]], 24, t) +
        hwords(180, 246, [['НЕ', c.ne6, 1], ['ПРОТИВЬСЯ', c.pro, 1], ['ЗЛОМУ.»', c.zlo, 1]], 26, t);
      s += gop(qop, G.zoom(qt, 180, 226, lerp(1, .64, up), 180, lerp(226, 62, up)) +
        hwords(180, 100, [['…ОБРАТИ', c.obr], ['К', c.k6], ['НЕМУ', c.nem], ['И', c.i6], ['ДРУГУЮ»', c.dru, 1]], 18, t));
    }
    /* the people: the one who strikes (left), the one who is struck — later «you» (right → big → the centre of the row) */
    s += attacker(t, c);
    const vform = qq(t, c.no - .15, c.no + .45);
    let you = null;
    if (vform > .003) {
      const z1 = qq(t, c.pro7 - .05, c.pro7 + .6), z2 = qq(t, c.eto - .05, c.eto + .75);
      let vx = lerp(VX, 138, z1), vgy = lerp(GY, 354, z1), vs = lerp(FS, 2.7, z1);
      vx = lerp(vx, 180, z2); vgy = lerp(vgy, GY, z2); vs = lerp(vs, 1.2, z2);
      // d06: the strike knocks the head aside; «обрати» — the turn (shoulders narrower, the head turns)
      const rec = qq(t, c.tc, c.tc + .08) * (1 - qq(t, c.tc + .3, c.tc + 1.0));
      const tq = qq(t, c.obr - .02, c.obr + .7), turn = Math.sin(PI * tq);
      // d07: «обидели» — the hand goes up and clenches; «не мсти» — it opens; anger trembles
      const raise = qq(t, c.obi - .05, c.obi + .35), anger = qq(t, c.obi + .05, c.obi + .35) * (1 - qq(t, c.ne7, c.msti + .25));
      const kR = lerp(1, 0, qq(t, c.obi, c.obi + .35)) + qq(t, c.ne7 - .02, c.msti + .15) * (1 - lerp(1, 0, qq(t, c.obi, c.obi + .35)));
      const amp = 1.5 * anger + .6 * rec;
      const shake = [amp * Math.sin(t * 41), .8 * amp * Math.cos(t * 37)];
      const tgR = raise > 0 ? mix2([16.5, -42], [24, -72], raise) : null;
      const palm = q(t, c.msti - .05, .45) * (.85 + .15 * Math.sin(t * 2.4)) + .6 * pulse(t, c.prv7, .12, .8) +
        .3 * pulse(t, c.smog + .2, .1, .6);
      const lowL = .7 * q(t, c.tvo, .4) * (1 - qq(t, c.pro7, c.pro7 + .4));
      const dimQ = .72 * qq(t, c.a7 - .1, c.a7 + .2) * (1 - qq(t, c.eto - .05, c.eto + .4));
      const F = flat(vx, vgy, vs, {
        seed: 5, t, form: vform, color: 'teal', n: 280, lean: 2.4 * rec, hdx: 3.4 * rec - 1.6 * turn, sq: 1 - .48 * turn, hsq: 1 - .2 * turn,
        shake, op: 1 - .55 * dimQ,
        arms: [{ k: 1, light: lowL }, { tg: tgR, k: clamp(kR), hs: lerp(1, 1.75, raise) * lerp(1, .66, z2), up: .75 * raise,
          light: (lowL + palm) * (1 - dimQ) }],
      });
      s += F.svg;
      you = F;
      const [hx, hy] = F.head, hr = F.hr, d6 = 1 - qq(t, c.pro7, c.pro7 + .45);
      // the struck cheek and the strike
      const ch = q(t, c.tc, .08) * (.7 + .3 * pulse(t, c.shch, .1, .5)) * (1 - qq(t, c.obr, c.obr + .5)) * d6;
      if (ch > .003) s += `<circle cx="${f(hx - hr * .72)}" cy="${f(hy + hr * .18)}" r="${f(hr * 1.2)}" fill="url(#gfc-halo)" opacity="${f(ch)}"/>` +
        `<circle cx="${f(hx - hr * .62)}" cy="${f(hy + hr * .2)}" r="${f(hr * .34)}" fill="#ffb46a" opacity="${f(.85 * ch)}" filter="url(#gfc-soft)"/>`;
      s += ring(hx - hr * .8, hy + hr * .1, 4, 40, qq(t, c.tc, c.tc + .55), .95, 2.4, '#fff3d6') + sparks(hx - hr * .8, hy, qq(t, c.tc, c.tc + .5), 12, 30, 7) +
        ring(hx - hr * .75, hy + hr * .15, 3, 28, qq(t, c.shch, c.shch + .5), .75 * d6, 2, GOLD);
      // the turn: a light passes over the head, a gold arc-arrow above it; then calm light at the cheek
      if (turn > .003) s += `<ellipse cx="${f(hx + hr * .55 * Math.cos(PI * tq))}" cy="${f(hy)}" rx="${f(hr * .32)}" ry="${f(hr * .85)}" fill="#fff" opacity="${f(.5 * turn)}" filter="url(#gfc-soft)"/>`;
      const arw = q(t, c.obr - .05, .25) * (1 - qq(t, c.dru + .2, c.dru + .7)) * d6, pr = qq(t, c.obr - .02, c.obr + .7);
      if (arw > .003) {
        const R = hr * 1.75, a0 = -.25, a1 = lerp(-.25, -PI + .25, pr), pts = [];
        for (let k = 0; k <= 16; k++) { const a = lerp(a0, a1, k / 16); pts.push(`${f(hx + R * Math.cos(a))} ${f(hy - 4 + R * Math.sin(a))}`); }
        const ex = hx + R * Math.cos(a1), ey = hy - 4 + R * Math.sin(a1), tx = -Math.sin(a1), ty = Math.cos(a1);
        s += gop(arw, `<path d="M${pts.join(' L')}" fill="none" stroke="${GOLD}" stroke-width="6" opacity=".35" filter="url(#gfc-soft)"/>` +
          `<path d="M${pts.join(' L')}" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-linecap="round"/>` +
          (pr > .8 ? `<path d="M${f(ex + tx * 8 - ty * 6)} ${f(ey + ty * 8 + tx * 6)} L${f(ex)} ${f(ey)} L${f(ex + tx * 8 + ty * 6)} ${f(ey + ty * 8 - tx * 6)} Z" fill="${GOLD}" stroke="${GOLD}" stroke-width="1.4" stroke-linejoin="round" opacity="${f(qq(pr, .8, 1))}"/>` : ''));
      }
      const calm = q(t, c.nem - .05, .4) * d6;
      if (calm > .003) s += `<circle cx="${f(hx - hr * .72)}" cy="${f(hy + hr * .18)}" r="${f(hr * 1.3)}" fill="url(#gfc-halo)" opacity="${f(.9 * calm)}"/>`;
      s += ring(vx, vgy - 62 * vs, 22, 120, qq(t, c.dru + .15, c.dru + 1.2), .9, 3, GOLD);
      // d07 «обидели»: sharp red strokes fly into him from the left, a flash at the chest
      const chx = vx - 6 * vs, chy = vgy - 66 * vs;
      for (let k = 0; k < 4; k++) {
        const u = qq(t, c.obi - .12 + k * .05, c.obi + .14 + k * .05);
        if (u <= 0 || u >= 1) continue;
        const sx = -16, sy = chy - 50 + k * 30, ex = chx - 6, ey = chy - 8 + k * 6;
        const x = lerp(sx, ex, u), y = lerp(sy, ey, u), ang = Math.atan2(ey - sy, ex - sx), Lk = 30;
        const ln = `x1="${f(x - Math.cos(ang) * Lk)}" y1="${f(y - Math.sin(ang) * Lk)}" x2="${f(x)}" y2="${f(y)}"`;
        s += `<line ${ln} stroke="${RED}" stroke-width="6" stroke-linecap="round" opacity=".45" filter="url(#gfc-soft)"/><line ${ln} stroke="${RED}" stroke-width="3" stroke-linecap="round"/>` +
          `<path d="M${f(x)} ${f(y)} L${f(x - Math.cos(ang - .5) * 9)} ${f(y - Math.sin(ang - .5) * 9)} M${f(x)} ${f(y)} L${f(x - Math.cos(ang + .5) * 9)} ${f(y - Math.sin(ang + .5) * 9)}" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>`;
      }
      s += ring(chx, chy, 6, 52, qq(t, c.obi + .12, c.obi + .7), .95, 2.4, '#ff8a8d') + sparks(chx, chy, qq(t, c.obi + .12, c.obi + .6), 14, 38, 23, ['#fff', '#ff8a8d', '#ffd36b']);
    }
    /* d07: the words (white, the key word gold) */
    const top7 = 1 - qq(t, c.eto - .05, c.eto + .4);
    s += gop(top7 * (1 - .45 * qq(t, c.a7 - .1, c.a7 + .2)), hwords(180, 58, [['ОБИДЕЛИ', c.obi], ['—', c.obi + .45], ['НЕ', c.ne7, 1], ['МСТИ', c.msti, 1]], 24, t, { big: 1.15 }));
    if (t >= c.a7 - .05) {
      const m = qq(t, c.eto - .05, c.eto + .55), fl = pulse(t, c.smog + .22, .08, .6);
      const big = hwords(180, 152, [['А', c.a7], ['ТЫ', c.ty]], 44, t) + hwords(180, 202, [['БЫ', c.by], ['СМОГ?', c.smog, 1]], 44, t);
      s += G.zoom(big + (fl > .02 ? `<g opacity="${f(.45 * fl)}" filter="url(#gfc-glow3)">${big}</g>` : ''), 180, 176, lerp(1, .62, m), 180, lerp(176, 66, m));
    }
    s += gop(1 - .4 * qq(t, c.kazh, c.kazh + .5), hwords(180, 124, [['НЕ', c.ne7b], ['ДЛЯ', c.dly1], ['СУДА,', c.suda]], 19, t, { op: .94 }));
    const sg = qq(t, c.a7b, c.a7b + .5), scop = q(t, c.suda - .1, .35) * (1 - sg);
    if (scop > .003) s += G.node(304 + 26 * sg, 110 - 14 * sg, 23, 'scales', { color: '#a9a5c4', op: .95 * scop, scale: .6 + .4 * q(t, c.suda - .1, .35), glow: .7 });
    s += hwords(180, 166, [['А', c.a7b], ['ДЛЯ', c.dly2], ['КАЖДОГО', c.kazh, 1]], 27, t);
    /* d07 «каждого»: six more people with an open palm up, suns in the palms and threads — a wave from the centre */
    if (t >= c.kazh - .1) {
      // the suns pass the light outwards: a thread from each palm to the next one away from the centre
      const sun = { 3: you && you.suns.length ? you.suns[you.suns.length - 1] : null };
      const P = {};
      CROWD.forEach((x, k) => {
        if (k === 3) return;
        const dk = Math.abs(k - 3), op = q(t, c.kazh - .08 + .07 * dk, .35), rise = 12 * (1 - op);
        if (op <= .003) return;
        const side = k < 3 ? 1 : -1, j = side > 0 ? 1 : 0, arms = [{ k: 1 }, { k: 1 }];
        const lt = q(t, c.kazh + .18 + .08 * dk, .3) * (.85 + .15 * Math.sin(t * 2.2 + k));
        arms[j] = { tg: [side * 24, -72], k: 1, hs: 1.15, up: .75, light: lt };
        P[k] = flat(x, GY + rise, 1.2, { seed: 30 + k * 3, color: ROWC[k], t, op, arms });
        P[k].op = op;
        if (P[k].suns.length) sun[k] = P[k].suns[0];
        s += P[k].svg;
      });
      let th = '';
      [2, 1, 0, 4, 5, 6].forEach(k => {
        const from = k < 3 ? k + 1 : k - 1, a = sun[from], b = sun[k], dk = Math.abs(k - 3);
        if (!a || !b || !P[k]) return;
        th += thread([a[0], a[1]], [b[0], b[1]], q(t, c.kazh + .1 + .08 * dk, .3), from === 3 ? GOLD : G.PAL[ROWC[from]][0], G.PAL[ROWC[k]][0], `gcb-th${k}`, P[k].op);
      });
      s += th;
    }
    return s;
  }

  SCENES.gfc_book = GFC.scene('gfc_book', (t, K, mode, p) => body(t, K || {}));
})();
