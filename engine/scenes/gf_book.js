/* gf_book — «Бог ещё не создан», часть 2 «От мести к милосердию» (eps/god_future_p2), фразы d05–d07: от камня
 * Хаммурапи к Библии из двух частей (Ветхий Завет — «око за око», Новый — «обрати к нему и другую»), удар без ответа,
 * сжатый кулак разжимается в ладонь, «А ты бы смог?», «для каждого». Раскадровка — eps/god_future/source/storyboard_3parts.md
 * (строки d05–d07), текст — source/text_v21.md; словарь — gf_00_lib.js (window.GF). Стиль: чёрный фон, точки и нити,
 * моно Plex капсом (≥ 12), люди — облака точек без лиц. Книга — простой контур, уважительно: не ломается, не гаснет
 * рывком, не перечёркивается. Красного нет. Подписи-надписи текста v21 рисует сама сцена (story.py их не ставит).
 * Уроки слепого просмотра v1–v2: всё крупно (сцена на телефоне ужата в .72), главный объект на всю ширину, новое событие
 * каждые 1,5–2,5 с на слове, сказанное видно в момент слова.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, p.mode — лишь имя кадра (швов между режимами нет).
 *  old (d05)    вход наплывом из gf_law/equals (делает GF.scene). «Позже» — слева стела (контур, клинопись точками),
 *               под ней КАМЕНЬ ХАММУРАПИ, от неё пунктирная стрелка ПОЗЖЕ; «похожее» — справа проявляется закрытая книга;
 *               «правило» — строка клинописи на стеле теплеет; «записано» — огоньки летят по дуге со стелы в книгу,
 *               книга вспыхивает; «Библии» — стела уходит влево, книга едет в центр и раскрывается на всю ширину (две
 *               половины), вверху печатается БИБЛИЯ (моно 24); «священной» — СВЯЩЕННАЯ КНИГА; «иудеев», «христиан» —
 *               ИУДЕЕВ И ХРИСТИАН по словам, на «христиан» свет проходит по обеим половинам; «старой» — левая половина
 *               светится: ВЕТХИЙ ЗАВЕТ, внизу страницы КНИГА ЛЕВИТ, ГЛАВА 24, СТИХ 20; «части» — (ТО ЕСТЬ СТАРЫЙ);
 *               «око», «за», «око» — ОКО ЗА ОКО, (моно 18) по словам; «зуб», «за», «зуб» — ЗУБ ЗА ЗУБ.
 *  cheek (d06)  «новой» — левая половина тише, правая светится: НОВЫЙ ЗАВЕТ; «Иисус» — ЕВАНГЕЛИЕ / ОТ МАТФЕЯ, под книгой
 *               мелко ЕВАНГЕЛИЕ — РАССКАЗ О ЖИЗНИ ИИСУСА; / ДЛЯ ХРИСТИАН ИИСУС — СЫН БОЖИЙ; «отвечает» — ГЛАВА 5, СТИХ 39,
 *               тёплая дуга с правой половины к «ОКО ЗА ОКО» слева, там вспышка; «А (Я говорю)» — книга уменьшается вверх,
 *               под ней ЕВАНГЕЛИЕ ОТ МАТФЕЯ · ГЛАВА 5, СТИХ 39, цитата крупно по словам: «А Я ГОВОРЮ ВАМ: / НЕ ПРОТИВЬСЯ
 *               ЗЛОМУ.»; «злому» — книга и пояснение уходят, цитата — вверх, слева из тусклых дрожащих точек собирается
 *               человек (тот, кто бьёт); «Но (кто)» — справа собирается второй (светлый, спокойный); «ударит» — замах,
 *               рука первого летит к щеке второго (след), вспышка и волна; голова второго отклоняется, щека светится;
 *               «щеку» — щека вспыхивает ещё; «твою» — второй не отвечает: руки опущены, открытые ладони теплеют;
 *               «обрати» — второй поворачивается (плечи сужаются, по голове проходит блик, над головой дуга-стрелка),
 *               печатается «…ОБРАТИ К НЕМУ И ДРУГУЮ»»; «нему» — спокойный свет у другой щеки; «другую» — тёплая волна от
 *               второго, поднятый кулак первого опускается.
 *  you (d07)    «Проще» — первый рассыпается и уходит, второй — крупно (рост ≈ 245); «обидели» — в него летят острые
 *               штрихи, вспышка, он дрожит, рука поднимается и сжимается в крупный кулак; вверху ОБИДЕЛИ —; «не мсти» —
 *               НЕ МСТИ, кулак разжимается в открытую ладонь, в ладони тёплый свет, дрожь стихает; «А ты бы смог?» —
 *               фигура тише, по словам крупно (моно 42) А ТЫ / БЫ СМОГ?; «Это» — вопрос уходит вверх и остаётся (место
 *               для комментария), фигура уменьшается к центру низа; «правило» — свет в ладони вспыхивает; «не для суда» —
 *               НЕ ДЛЯ СУДА, справа весы суда (серые), на «а» они уходят; «каждого» — А ДЛЯ КАЖДОГО, по бокам встают
 *               ещё шесть человек с поднятой открытой ладонью, свет в ладонях — волной от центра. Поза держится —
 *               из неё наплывает gf_tribes/tribes.
 * Слова (GF.bare, точное совпадение, n — номер такого слова во фразе), сверены с build/words.json озвучки 05.11:
 *   d05 — позже, похожее, правило, записано, библии, священной, иудеев, и (1), христиан, старой, части, око (0, 1), за (0, 1),
 *   зуб (0, 1); d06 — новой, иисус, отвечает, а (1), я, говорю, вам, не, противься, злому, но, ударит, правую, щеку, твою,
 *   обрати, к, нему, и, другую; d07 — проще, обидели, не (0, 1), мсти, а (0, 1), ты, бы, смог, это, правило, для (0, 1),
 *   суда, каждого. Нет слова в K.words — доля фразы (DEF/доли — по озвучке 05.11, для scene_test без K).
 * Параметры p: s (фраза), mode, K (cues.json части), prev/prev_mode (наплыв — GF.scene). Камера движка нейтральна.
 * Важное — y≈26..346 (низ кадра пуст под субтитры). Пик ≈ 2,6 тыс. кружков (d07, «каждого»).
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI = Math.PI, PI2 = Math.PI * 2;
  const H = n => GF.hash(n);
  const { q, qq, lerp, clamp, ease } = GF;
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const WARM = '#ffe9c4';
  const DEF = { d05: [25.31, 32.83], d06: [33.13, 41.46], d07: [41.76, 47.47] };

  const span = (K, id) => K[id] != null ? [K[id], K[id + '_end'] != null ? K[id + '_end'] : K[id] + 3] : DEF[id];
  // start of the n-th word of phrase id that equals `word` (bare); without it — a share of the phrase
  function W(K, id, word, share, n = 0) {
    const ws = (K.words && K.words[id]) || [], b = GF.bare(word);
    const hit = ws.filter(w => GF.bare(w.w) === b);
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

  /* ---------------- text ---------------- */
  // words of one mono line appear on their words (pop + flash); mono advances .6 em (Plex), the line is centred when whole
  function words(x, y, items, size, t, o = {}) {
    const adv = .6 * UN.fs(size);
    const total = items.reduce((n, it) => n + it[0].length, 0) + items.length - 1;
    let pos = x - total * adv / 2, s = '';
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
  const typed = (x, y, text, t, t0, size, o = {}) => GF.typed(x, y, text, t, t0, { size, cps: o.cps ?? 26, anchor: o.anchor ?? 'middle', op: o.op ?? .95, glow: o.glow });
  const gop = (op, s) => op <= .003 || !s ? '' : op >= .999 ? s : `<g opacity="${f(op)}">${s}</g>`;

  /* ---------------- d05: the stele of Hammurabi, «ПОЗЖЕ», the stream into the book ---------------- */
  const STX = 74, STT = 128, STB = 292, STR = 36, RULE = 2;
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
  function stele(t, op, rule, dx) {
    if (op <= .003) return '';
    const x0 = STX - STR, x1 = STX + STR;
    const d = `M${x0} ${STB} L${x0} ${STT + STR} A${STR} ${STR} 0 0 1 ${x1} ${STT + STR} L${x1} ${STB} Z`;
    let s = `<path d="${d}" fill="rgba(255,255,255,.05)" stroke="#fff" stroke-width="5" opacity=".18" filter="url(#un-soft)"/>` +
      `<path d="${d}" fill="none" stroke="#fff" stroke-width="1.7" opacity=".85" stroke-linejoin="round"/>`;
    let other = '', lit = '';
    for (const m of MARKS) { if (m.r === RULE) lit += wedge(m) + ' '; else other += wedge(m) + ' '; }
    s += `<path d="${other}" fill="#fff" stroke="#fff" stroke-width="1" opacity=".6" stroke-linecap="round"/>`;
    s += `<path d="${lit}" fill="#fff" stroke="#fff" stroke-width="1.1" opacity="${f(.6 + .4 * rule)}" stroke-linecap="round"/>`;
    if (rule > .003) {
      const ry = STT + 52 + RULE * 12;
      s += `<rect x="${x0 + 5}" y="${ry - 7}" width="${2 * STR - 10}" height="14" rx="4" fill="${WARM}" opacity="${f(.22 * rule)}" filter="url(#un-soft)"/>` +
        `<path d="${lit}" fill="${WARM}" stroke="${WARM}" stroke-width="2.4" opacity="${f(.7 * rule)}" filter="url(#un-soft)"/>`;
    }
    s += GF.mono(STX, STB + 22, 'КАМЕНЬ ХАММУРАПИ', { size: 12, anchor: 'middle', opacity: .9 });
    return gop(op, dx ? `<g transform="translate(${f(dx)} 0)">${s}</g>` : s);
  }
  // the dashed arrow «ПОЗЖЕ» from the stele towards the book
  function later(t, c, op) {
    if (op <= .003) return '';
    const g = qq(t, c.poz - .05, c.poz + .55), x0 = 122, x1 = lerp(x0 + 4, 208, g), y = 212;
    let s = `<g stroke="#fff" fill="none" stroke-linecap="round"><line x1="${x0}" y1="${y}" x2="${f(x1)}" y2="${y}" stroke-width="2" stroke-dasharray="6 5" opacity=".9"/>`;
    if (g > .85) s += `<path d="M${f(x1 - 9)} ${y - 6} L${f(x1)} ${y} L${f(x1 - 9)} ${y + 6}" stroke-width="2" opacity="${f(qq(g, .85, 1))}"/>`;
    s += '</g>' + typed(164, y - 14, 'ПОЗЖЕ', t, c.poz, 14, { glow: true });
    return gop(op, s);
  }

  /* ---------------- the book: spine at x=0, top at y=0, two pages PW×PH ---------------- */
  const PW = 158, PH = 190;
  const pagePath = (side, w, lift) => {
    const x = side * w;
    return `M0 8 Q${f(x * .45)} -5 ${f(x)} ${f(-lift)} L${f(x)} ${f(PH + lift)} Q${f(x * .45)} ${PH + 1} 0 ${PH + 7} Z`;
  };
  function page(side, w, lift, lit) {
    if (w < .5) return '';
    const d = pagePath(side, w, lift);
    let s = '';
    for (let k = 2; k >= 1; k--) s += `<path d="${pagePath(side, w, lift)}" transform="translate(${f(side * 2.6 * k)} ${f(2.4 * k)})" fill="#000" stroke="#fff" stroke-width=".9" opacity="${f(.42 - .1 * k)}"/>`;
    if (lit > .003) s += `<path d="${d}" fill="none" stroke="${WARM}" stroke-width="7" opacity="${f(.4 * lit)}" filter="url(#un-soft)"/>`;
    s += `<path d="${d}" fill="#050505" stroke="none"/>` +
      `<path d="${d}" fill="rgba(255,246,228,${f(.04 + .11 * lit)})" stroke="#fff" stroke-width="1.8" opacity="${f(.62 + .36 * lit)}" stroke-linejoin="round"/>`;
    return s;
  }
  // faint lines of scripture (dashes of uneven length) on a page; they give way to the labels
  function rows(side, op, seed) {
    if (op <= .003) return '';
    let s = '';
    for (let r = 0; r < 12; r++) {
      const y = 22 + r * 14, x0 = side > 0 ? 16 : -(PW - 14), x1 = side > 0 ? PW - 14 : -16, len = r === 11 ? .5 : 1;
      const da = [];
      for (let k = 0; k < 9; k++) da.push(f(5 + 15 * H(seed * 37 + r * 11 + k)), f(4 + 2 * H(seed * 41 + r * 7 + k)));
      s += `<line x1="${x0}" y1="${y}" x2="${f(x0 + (x1 - x0) * len)}" y2="${y}" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="${da.join(' ')}" opacity="${f(.34 * op)}"/>`;
    }
    return s;
  }
  // the cover (the closed book, or the leaf while it turns): w — visible width, lift — the outer edge comes closer
  function cover(w, lift, flash) {
    if (w < .5) return '';
    const k = w / PW, x = w + 4 * k;
    const d = `M0 -3 L${f(x)} ${f(-3 - lift)} L${f(x)} ${f(PH + 5 + lift)} L0 ${PH + 5} Z`;
    let s = '';
    if (k > .9) for (let j = 2; j >= 1; j--) s += `<path d="${d}" transform="translate(${3 * j} ${3 * j})" fill="#000" stroke="#fff" stroke-width=".9" opacity="${f(.42 - .1 * j)}"/>`;
    if (flash > .003) s += `<path d="${d}" fill="none" stroke="${WARM}" stroke-width="8" opacity="${f(.55 * flash)}" filter="url(#un-soft)"/>`;
    s += `<path d="${d}" fill="#070707" stroke="#fff" stroke-width="1.9" opacity=".97" stroke-linejoin="round"/>` +
      `<path d="M${f(12 * k)} ${f(9 - lift * .1)} L${f(x - 11 * k)} ${f(9 - lift * .9)} L${f(x - 11 * k)} ${f(PH - 7 + lift * .9)} L${f(12 * k)} ${f(PH - 7 + lift * .1)} Z" fill="none" stroke="#fff" stroke-width="1" opacity=".55"/>` +
      `<line x1="${f(6 * k)}" y1="-2" x2="${f(6 * k)}" y2="${PH + 4}" stroke="#fff" stroke-width="1.1" opacity=".5"/>`;
    // a quiet ornament in the middle of the cover: a ring of dots and a light
    const cx = x / 2, cy = PH * .45;
    let o = '';
    for (let i = 0; i < 16; i++) { const a = i / 16 * PI2; o += `<circle cx="${f(cx + 20 * k * Math.cos(a))}" cy="${f(cy + 20 * Math.sin(a))}" r="1.3"/>`; }
    s += `<g fill="#fff" opacity=".7">${o}</g><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(5 + 4 * flash)}" fill="${WARM}" opacity="${f(.5 + .5 * flash)}" filter="url(#un-soft)"/>`;
    return s;
  }
  // where the book is: small and closed at the right («похожее») → to the centre, opening on «Библии» → small at the top
  // on «А Я говорю» → gone on «злому»
  function bookPose(t, c) {
    const g = qq(t, c.bib - .05, c.bib + .7), o = qq(t, c.bib + .12, c.bib + .85), m = qq(t, c.qa - .05, c.qa + .6);
    let sc = lerp(.7, 1, g), x = lerp(268 - PW / 2 * .7, 180, g), y = lerp(212 - PH / 2 * .7, 112, g);
    x = lerp(x, 180, m); y = lerp(y, 24, m); sc = lerp(sc, .5, m);
    const op = q(t, c.poh - .12, .45) * (1 - qq(t, c.zlo - .15, c.zlo + .2));
    return { x, y, sc, o, op, m };
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
      if (litR > .003) s += `<ellipse cx="${PW / 2}" cy="${PH / 2}" rx="125" ry="135" fill="url(#gf-warm)" opacity="${f(.75 * litR)}"/>`;
      if (o > .5 && litL > .003) s += `<ellipse cx="${-PW / 2}" cy="${PH / 2}" rx="125" ry="135" fill="url(#gf-warm)" opacity="${f(.75 * litL)}"/>`;
      s += page(1, PW, 0, litR) + rows(1, 1 - .85 * litR, 3);
      // right page (Новый Завет)
      s += typed(PW / 2, 32, 'НОВЫЙ ЗАВЕТ', t, c.nov, 14, { glow: true }) +
        typed(PW / 2, 60, 'ЕВАНГЕЛИЕ', t, c.iis, 13) + typed(PW / 2, 80, 'ОТ МАТФЕЯ', t, c.iis + .3, 13) +
        typed(PW / 2, PH - 14, 'ГЛАВА 5, СТИХ 39', t, c.otv, 12, { cps: 34 });
    }
    if (cw > .5) s += cover(cw, lift, pulse(t, c.zap + .55, .1, .7));
    else if (cw < -.5) {
      s += page(-1, -cw, lift, litL);
      if (o > .97) {
        const lo = .6 + .4 * clamp(litL / .9);
        s += rows(-1, 1 - .9 * q(t, c.sta - .05, .4), 5) + gop(lo,
          typed(-PW / 2, 32, 'ВЕТХИЙ ЗАВЕТ', t, c.sta, 14, { glow: true }) +
          typed(-PW / 2, 52, '(ТО ЕСТЬ СТАРЫЙ)', t, c.cha, 12) +
          words(-PW / 2, 102, [['ОКО', c.oko1], ['ЗА', c.za1], ['ОКО,', c.oko2]], 18, t, { glow: true }) +
          words(-PW / 2, 128, [['ЗУБ', c.zub1], ['ЗА', c.za2], ['ЗУБ', c.zub2]], 18, t, { glow: true }) +
          typed(-PW / 2, PH - 32, 'КНИГА ЛЕВИТ,', t, c.sta + .25, 12, { cps: 34 }) +
          typed(-PW / 2, PH - 14, 'ГЛАВА 24, СТИХ 20', t, c.sta + .6, 12, { cps: 34 }));
        // «иудеев и христиан»: one light passes over both halves — one book
        if (sweep > 0 && sweep < 1) s += `<ellipse cx="${f(lerp(-PW, PW, sweep))}" cy="${PH / 2}" rx="46" ry="${PH * .62}" fill="url(#gf-warm)" opacity="${f(.9 * Math.sin(PI * sweep))}"/>`;
      }
    }
    // the spine
    if (o > .5) s += `<line x1="0" y1="8" x2="0" y2="${PH + 7}" stroke="#fff" stroke-width="1.6" opacity="${f(.8 * qq(o, .5, 1))}"/>`;
    // «отвечает»: a warm arc from the new half to «ОКО ЗА ОКО» in the old one
    const ar = qq(t, c.otv - .05, c.otv + .5), aop = 1 - qq(t, c.qa - .05, c.qa + .35);
    if (ar > .003 && aop > .003) {
      const d = `M60 104 Q0 34 -52 92`;
      s += gop(aop, `<path d="${d}" pathLength="1" stroke-dasharray="${f(ar)} 1" fill="none" stroke="${WARM}" stroke-width="6" opacity=".45" filter="url(#un-soft)"/>` +
        `<path d="${d}" pathLength="1" stroke-dasharray="${f(ar)} 1" fill="none" stroke="#fff" stroke-width="2.2" opacity=".95" stroke-linecap="round"/>` +
        (ar > .9 ? `<path d="M-41 88 L-52 92 L-46 81" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity="${f(qq(ar, .9, 1))}"/>` : ''));
    }
    return `<g opacity="${f(B.op)}" transform="translate(${f(B.x)} ${f(B.y)}) scale(${(+B.sc).toFixed(4)})">${s}</g>`;
  }

  /* ---------------- people: dots after GF.personPts, with arms (two-bone IK) and hands ---------------- */
  const L1 = 18, L2 = 18;
  function elbow(S, T, side) {
    const dx = T[0] - S[0], dy = T[1] - S[1], d = Math.hypot(dx, dy) || 1, dd = Math.min(d, L1 + L2 - .05);
    const ux = dx / d, uy = dy / d, hgt = Math.sqrt(Math.max(0, L1 * L1 - (dd / 2) ** 2));
    let px = -uy, py = ux;
    if (py + .8 * side * px < 0) { px = -px; py = -py; }          // the elbow goes down and out
    const Tt = [S[0] + ux * dd, S[1] + uy * dd];
    return { E: [S[0] + ux * dd / 2 + px * hgt, S[1] + uy * dd / 2 + py * hgt], T: Tt };
  }
  // a hand in its own units: wrist at 0, fingers to −y, thumb to −x; k 0 — a fist, 1 — an open palm
  const FING = [[-2.55, 4.4], [-.85, 5.3], [.85, 5.0], [2.55, 4.0]];
  function handLocal(k, np, nf, nt, seed) {
    const P = [];
    const kp = ease(k / .5), rx = lerp(3.0, 3.4, kp), ry = lerp(3.7, 4.4, kp), cy = lerp(-4.7, -4.4, kp);
    for (let i = 0; i < np; i++) {
      const a = H(seed * 97 + i * 1.3), b = H(seed * 101 + i * 2.1), r = Math.sqrt(a), th = b * PI2;
      P.push([rx * r * Math.cos(th), cy + ry * r * Math.sin(th)]);
    }
    FING.forEach(([bx, L], j) => {
      const kj = ease((k - .08 * j) / .7), ang = (j - 1.5) * .2;
      for (let i = 0; i < nf; i++) {
        const u = (i + .5) / nf, w = (H(seed * 103 + j * 17 + i) - .5) * 1.2;
        const ox = bx * 1.15 + Math.sin(ang) * L * 1.25 * u + w, oy = -8.2 - Math.cos(ang) * L * 1.25 * u;
        // the fist: a row of knuckles on top, the folded fingers across the front of the palm
        const fx = bx * .88 + w * .7, fy = u < .35 ? -9.1 - .9 * Math.sin(PI * u / .35) : -8.6 + (u - .35) / .65 * 4.2;
        P.push([lerp(fx, ox, kj), lerp(fy, oy, kj)]);
      }
    });
    const kt = ease(k / .6);
    for (let i = 0; i < nt; i++) {
      const u = (i + .5) / nt, w = (H(seed * 107 + i) - .5) * 1.1;
      P.push([lerp(-3.3 + 5.0 * u, -3.4 - 5.0 * u + w * .7, kt), lerp(-4.0 - 1.4 * u + w * .5, -3.0 - 4.4 * u + w * .7, kt)]);
    }
    return P;
  }
  // a person: o.n dots, o.seed, o.sq (shoulders narrower — turning), o.lean (upper body to the side, units), o.hdx (head),
  // o.arms [left, right]: { tg: hand target [x,y] units or hanging, k: 0 fist..1 open, hs: hand size, up: fingers to the
  // sky 0..1, light: light in the palm, hn: [palm, finger, thumb] dots }; o.form 0..1 — gathers from a cloud;
  // o.drift — scatters away from time o.drift; o.amp — tremble; returns { svg, head:[x,y], hr, hands:[[x,y]] }
  function figure(cx, gy, s, o) {
    const n = o.n ?? 300, seed = o.seed ?? 1, sq = o.sq ?? 1, lean = o.lean ?? 0, t = o.t ?? 0;
    const off = y => lean * clamp((-46 - y) / 45);
    const P = [];
    const nh = Math.round(n * .15), nt = Math.round(n * .37), na = Math.round(n * .10), nl = n - nh - nt - 2 * na;
    const hdx = (o.hdx ?? 0) + off(-91);
    for (let i = 0; i < nh; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), r = 7.2 * Math.sqrt(a), th = b * PI2;
      P.push([r * Math.cos(th) * (o.hsq ?? 1) + hdx, -91 + r * 1.12 * Math.sin(th)]);
    }
    for (let i = 0; i < nt; i++) {
      const a = H(seed * 61 + i * 1.3), b = H(seed * 67 + i * 2.3), y = -80 + a * 34, w = (10.5 - Math.abs(y + 66) * .05) * sq;
      P.push([(b * 2 - 1) * w + off(y), y]);
    }
    for (let i = 0; i < nl; i++) {
      const a = H(seed * 71 + i * 1.9), b = H(seed * 73 + i * 3.1), cc = H(seed * 79 + i * 4.7), side = cc < .5 ? -1 : 1;
      P.push([side * (3.2 + a * 2.6) + (b - .5) * 3.4, -46 + a * 46]);
    }
    const hands = [], lights = [], HP = [];
    [-1, 1].forEach((side, j) => {
      const arm = (o.arms && o.arms[j]) || {};
      const S = [side * 11 * sq + off(-77), -77];
      const { E, T } = elbow(S, arm.tg || [side * 16.5 * sq, -42], side);
      for (let i = 0; i < na; i++) {
        const u = H(seed * 83 + j * 7 + i * 1.1), b = H(seed * 89 + j * 5 + i * 2.7);
        const A = u < .5 ? S : E, B = u < .5 ? E : T, v = u < .5 ? u * 2 : u * 2 - 1;
        const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, wd = (b - .5) * 2.8 * (1 - .3 * v);
        P.push([A[0] + dx * v - dy / L * wd, A[1] + dy * v + dx / L * wd]);
      }
      // the hand along the forearm (or bent to the sky by arm.up); palm towards us
      let dx = T[0] - E[0], dy = T[1] - E[1];
      const L = Math.hypot(dx, dy) || 1, up = arm.up ?? 0;
      dx = lerp(dx / L, 0, up); dy = lerp(dy / L, -1, up);
      const phi = Math.atan2(dy, dx) + PI / 2, co = Math.cos(phi), si = Math.sin(phi), hs = arm.hs ?? 1;
      const hn = arm.hn || [16, 5, 4];
      for (const [lx0, ly] of handLocal(arm.k ?? 1, hn[0], hn[1], hn[2], seed * 3 + j)) {
        const lx = lx0 * -side * hs, ly2 = ly * hs;           // the thumb towards the body
        HP.push([T[0] + lx * co - ly2 * si, T[1] + lx * si + ly2 * co]);
      }
      const pc = [T[0] + 5.5 * hs * si, T[1] - 5.5 * hs * co];
      hands.push([cx + T[0] * s, gy + T[1] * s]);
      lights.push([cx + pc[0] * s, gy + pc[1] * s, arm.light ?? 0, hs]);
    });
    const nb = P.length, amp = o.amp ?? .35, form = o.form ?? 1;
    let F = P.concat(HP).map(p => [cx + p[0] * s, gy + p[1] * s]);
    // gathers from sparse dim chaos over the lower part of the frame
    if (form < 1) F = GF.morph(GF.cloud(F.length, seed + 40, [10, 150, 350, 352]), F, form, t, { spread: .45, amp: 4, bend: 30, seed: seed + 2 });
    if (o.drift != null) F = GF.drift(F, t, o.drift, 70, seed + 9);
    F = GF.jitter(F.slice(0, nb), t, amp, seed).concat(GF.jitter(F.slice(nb), t, Math.min(amp, .45), seed + 1));
    let svg = '';
    for (const [x, y, l, hs] of lights) {
      if (l > .003) svg += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(9 * hs * s)}" fill="url(#gf-warm)" opacity="${f(clamp(l))}"/>` +
        `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2.2 * hs * s)}" fill="${WARM}" opacity="${f(.8 * clamp(l))}" filter="url(#un-soft)"/>`;
    }
    svg += GF.dots(F, { r: o.r ?? (.9 + .28 * s), op: (o.op ?? .95) * (.3 + .7 * form), t, glow: .55, color: o.color ?? '#fff', alpha: o.alpha });
    return { svg, head: [cx + hdx * s, gy - 91 * s], hr: 7.2 * s, hands, lights };
  }

  /* ---------------- d06: the one who strikes and the one who does not answer ---------------- */
  const AX = 112, VX = 232, GY = 345, FS = 2.4;
  const R0 = [16.5, -42], WND = [15, -104], THR = [21, -92];
  const HIT = [(VX - 7.2 * FS * .8 - 4 - AX) / FS, -90];          // the fist at the near cheek of the other one
  const mix2 = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
  function strikeArm(t, c) {
    const a1 = qq(t, c.ud - .05, c.ud + .22), a2 = clamp((t - (c.ud + .22)) / Math.max(.05, c.tc - c.ud - .22)) ** 2;
    const a3 = qq(t, c.tc + .15, c.tc + .6), a4 = qq(t, c.dru + .1, c.dru + 1.0);
    let p = mix2(R0, WND, a1); p = mix2(p, HIT, a2); p = mix2(p, THR, a3); p = mix2(p, R0, a4);
    const lean = lerp(lerp(lerp(lerp(0, -2, a1), 6, a2), 1, a3), 0, a4);
    return { tg: p, lean, a2, a4 };
  }
  function attacker(t, c) {
    const form = qq(t, c.zlo + .15, c.zlo + .8);
    if (form <= .003) return '';
    const op = 1 - qq(t, c.pro7 + .1, c.pro7 + .8);
    if (op <= .003) return '';
    const st = strikeArm(t, c);
    const F = figure(AX, GY, FS, {
      n: 400, seed: 17, t, lean: st.lean, form, amp: lerp(1.1, .55, st.a4), color: '#c8c8c8', op: .85 * op,
      drift: t > c.pro7 ? c.pro7 : null,
      arms: [{ k: 0 }, { tg: st.tg, k: 0 }],
    });
    let s = F.svg;
    // the hand flies: a trail of the fist along its path
    const sw = qq(t, c.ud + .18, c.ud + .24) * (1 - qq(t, c.tc + .05, c.tc + .3));
    if (sw > .003) {
      let tr = '';
      for (let k = 1; k <= 6; k++) {
        const p = strikeArm(t - k * .028, c).tg;
        tr += `<circle cx="${f(AX + p[0] * FS)}" cy="${f(GY + p[1] * FS)}" r="${f(7 - k * .8)}" fill="#fff" opacity="${f(.4 * (1 - k / 7) * sw)}"/>`;
      }
      s = `<g filter="url(#un-soft)">${tr}</g>` + s;
    }
    return s;
  }

  /* ---------------- small drawings ---------------- */
  function ring(x, y, r0, r1, u, op, w = 1.8, col = '#fff') {
    if (u <= 0 || u >= 1 || op <= .003) return '';
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(lerp(r0, r1, u))}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f(op * (1 - u))}"/>`;
  }
  function sparks(x, y, u, n, len, seed) {
    if (u <= 0 || u >= 1) return '';
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (H(seed + i * 3.1) - .5) * 2.6, d = len * (.4 + .6 * H(seed + i * 5.3)) * ease(u);
      s += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="${f(1.8 * (1 - u) + .6)}" fill="#fff" opacity="${f(.9 * (1 - u))}"/>`;
    }
    return `<g filter="url(#un-soft)">${s}</g>${s}`;
  }
  // the scales of a court (grey outline)
  function scales(x, y, z, op) {
    if (op <= .003) return '';
    const a = 30 * z, b = 26 * z;
    const pan = sx => `M${f(sx - 12 * z)} ${f(y + 4 * z)} Q${f(sx)} ${f(y + 15 * z)} ${f(sx + 12 * z)} ${f(y + 4 * z)}` +
      ` M${f(sx)} ${f(y - b * .5)} L${f(sx - 12 * z)} ${f(y + 4 * z)} M${f(sx)} ${f(y - b * .5)} L${f(sx + 12 * z)} ${f(y + 4 * z)}`;
    const d = `M${f(x)} ${f(y - b * .8)} L${f(x)} ${f(y + b)} M${f(x - 12 * z)} ${f(y + b)} L${f(x + 12 * z)} ${f(y + b)} ` +
      `M${f(x - a)} ${f(y - b * .5)} L${f(x + a)} ${f(y - b * .5)} ` + pan(x - a) + ' ' + pan(x + a);
    return gop(op, `<path d="${d}" fill="none" stroke="#d8d8d8" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<circle cx="${f(x)}" cy="${f(y - b * .8)}" r="${f(2.6 * z)}" fill="#d8d8d8"/>`);
  }

  /* ---------------- the scene ---------------- */
  const CROWD = [36, 84, 132, 180, 228, 276, 324];
  function body(t, K) {
    const c = cues(K);
    let s = '';
    /* d05: the stele and «ПОЗЖЕ» leave on «Библии» */
    const sgo = qq(t, c.bib - .1, c.bib + .55);
    const sop = q(t, c.s5 - .15, .35) * (1 - sgo);
    s += stele(t, sop, q(t, c.prv - .05, .3) * (1 - qq(t, c.bib, c.bib + .5)), -70 * sgo);
    s += later(t, c, q(t, c.poz - .1, .3) * (1 - sgo));
    const B = bookPose(t, c);
    s += book(t, c, B);
    // «записано»: lights fly from the rule on the stele into the book
    for (let i = 0; i < 16; i++) {
      const u = qq(t, c.zap - .05 + i * .028, c.zap + .5 + i * .028);
      if (u <= 0 || u >= 1) continue;
      const A = [STX + 30, STT + 52 + RULE * 12], Bk = [B.x + PW / 2 * B.sc, B.y + PH * .45 * B.sc];
      const x = lerp(A[0], Bk[0], u), y = lerp(A[1], Bk[1], u) - Math.sin(PI * u) * (46 + 14 * H(i + 3)) + (H(i * 7) - .5) * 8;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2.6 + H(i) * 1.4)}" fill="${WARM}" opacity="${f(.95 * Math.sin(PI * u))}" filter="url(#un-soft)"/>` +
        `<circle cx="${f(x)}" cy="${f(y)}" r="1.4" fill="#fff" opacity="${f(Math.sin(PI * u))}"/>`;
    }
    // the captions over the open book (gone when the book goes up on «А Я говорю»)
    const cap = 1 - qq(t, c.qa - .05, c.qa + .35);
    s += gop(cap, typed(180, 46, 'БИБЛИЯ', t, c.bib, 24, { glow: true, cps: 18 }) +
      typed(180, 72, 'СВЯЩЕННАЯ КНИГА', t, c.svy, 15, { cps: 30 }) +
      words(180, 94, [['ИУДЕЕВ', c.iud], ['И', c.i5], ['ХРИСТИАН', c.hri]], 15, t));
    /* d06: the small print under the book, the quote */
    const exp = 1 - qq(t, c.zlo - .1, c.zlo + .35);
    s += gop(exp, typed(180, 326, 'ЕВАНГЕЛИЕ — РАССКАЗ О ЖИЗНИ ИИСУСА;', t, c.iis, 12, { cps: 44, op: .9 }) +
      typed(180, 344, 'ДЛЯ ХРИСТИАН ИИСУС — СЫН БОЖИЙ', t, c.iis + .5, 12, { cps: 44, op: .9 }));
    s += gop(q(t, c.qa + .2, .3) * (1 - qq(t, c.zlo - .15, c.zlo + .15)),
      typed(180, 140, 'ЕВАНГЕЛИЕ ОТ МАТФЕЯ · ГЛАВА 5, СТИХ 39', t, c.qa + .25, 12, { cps: 44, op: .92 }));
    const up = qq(t, c.zlo + .12, c.zlo + .6), qop = (1 - qq(t, c.pro7 - .05, c.pro7 + .4)) *
      (1 - .35 * qq(t, c.ud - .1, c.ud + .2) * (1 - qq(t, c.obr - .15, c.obr + .25)));
    if (t >= c.qa - .05 && qop > .003) {
      const qt = words(180, 202, [['«А', c.qa], ['Я', c.ya], ['ГОВОРЮ', c.gov], ['ВАМ:', c.vam]], 24, t) +
        words(180, 242, [['НЕ', c.ne6], ['ПРОТИВЬСЯ', c.pro], ['ЗЛОМУ.»', c.zlo]], 26, t, { glow: true });
      s += gop(qop, GF.zoom(qt, 180, 222, lerp(1, .64, up), 180, lerp(222, 56, up)) +
        words(180, 94, [['…ОБРАТИ', c.obr], ['К', c.k6], ['НЕМУ', c.nem], ['И', c.i6], ['ДРУГУЮ»', c.dru]], 17, t, { glow: true }));
    }
    /* the people: the one who strikes (left), the one who is struck — later «you» (right → big → the centre of the row) */
    s += attacker(t, c);
    const vform = qq(t, c.no - .15, c.no + .45);
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
      const shake = [1.3 * anger * Math.sin(t * 41), 1.1 * anger * Math.cos(t * 37)];
      const tgR = raise > 0 ? mix2([16.5, -42], [24 + shake[0], -72 + shake[1]], raise) : null;
      const palm = q(t, c.msti - .05, .45) * (.85 + .15 * Math.sin(t * 2.4)) + .6 * pulse(t, c.prv7, .12, .8) +
        .3 * pulse(t, c.smog + .2, .1, .6);
      const lowL = .7 * q(t, c.tvo, .4) * (1 - qq(t, c.pro7, c.pro7 + .4));
      const dimQ = .72 * qq(t, c.a7 - .1, c.a7 + .2) * (1 - qq(t, c.eto - .05, c.eto + .4));
      const F = figure(vx, vgy, vs, {
        n: 420, seed: 5, t, form: vform, lean: 2.4 * rec, hdx: 3.4 * rec - 1.6 * turn, sq: 1 - .48 * turn, hsq: 1 - .2 * turn,
        amp: .35 + 1.5 * anger + .6 * rec, op: .97 * (1 - dimQ),
        alpha: i => i % 3 === 0 ? 1 : 1 - .62 * z2,
        arms: [{ k: 1, light: lowL }, { tg: tgR, k: clamp(kR), hs: lerp(1, 1.75, raise) * lerp(1, .66, z2), up: .75 * raise,
          light: (lowL + palm) * (1 - dimQ), hn: [34, 10, 8] }],
      });
      s += F.svg;
      const [hx, hy] = F.head, hr = F.hr, d6 = 1 - qq(t, c.pro7, c.pro7 + .45);
      // the struck cheek and the strike
      const ch = q(t, c.tc, .08) * (.7 + .3 * pulse(t, c.shch, .1, .5)) * (1 - qq(t, c.obr, c.obr + .5)) * d6;
      if (ch > .003) s += `<circle cx="${f(hx - hr * .72)}" cy="${f(hy + hr * .18)}" r="${f(hr * 1.05)}" fill="url(#gf-warm)" opacity="${f(ch)}"/>` +
        `<circle cx="${f(hx - hr * .7)}" cy="${f(hy + hr * .18)}" r="${f(hr * .38)}" fill="${WARM}" opacity="${f(.75 * ch)}" filter="url(#un-soft)"/>`;
      s += ring(hx - hr * .8, hy + hr * .1, 4, 34, qq(t, c.tc, c.tc + .55), .95) + sparks(hx - hr * .8, hy, qq(t, c.tc, c.tc + .5), 10, 26, 7) +
        ring(hx - hr * .75, hy + hr * .15, 3, 24, qq(t, c.shch, c.shch + .5), .7 * d6);
      // the turn: a light passes over the head, an arc-arrow above it; then calm light at the other cheek
      if (turn > .003) s += `<ellipse cx="${f(hx + hr * .55 * Math.cos(PI * tq))}" cy="${f(hy)}" rx="${f(hr * .32)}" ry="${f(hr * .85)}" fill="#fff" opacity="${f(.45 * turn)}" filter="url(#un-soft)"/>`;
      const arw = q(t, c.obr - .05, .25) * (1 - qq(t, c.dru + .2, c.dru + .7)) * d6, pr = qq(t, c.obr - .02, c.obr + .7);
      if (arw > .003) {
        const R = hr * 1.75, a0 = -.25, a1 = lerp(-.25, -PI + .25, pr), pts = [];
        for (let k = 0; k <= 16; k++) { const a = lerp(a0, a1, k / 16); pts.push(`${f(hx + R * Math.cos(a))} ${f(hy - 4 + R * Math.sin(a))}`); }
        const ex = hx + R * Math.cos(a1), ey = hy - 4 + R * Math.sin(a1), tx = -Math.sin(a1), ty = Math.cos(a1);   // back along the arc
        s += gop(arw, `<path d="M${pts.join(' L')}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".9"/>` +
          (pr > .8 ? `<path d="M${f(ex + tx * 7 - ty * 5)} ${f(ey + ty * 7 + tx * 5)} L${f(ex)} ${f(ey)} L${f(ex + tx * 7 + ty * 5)} ${f(ey + ty * 7 - tx * 5)}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="${f(qq(pr, .8, 1))}"/>` : ''));
      }
      const calm = q(t, c.nem - .05, .4) * d6;
      if (calm > .003) s += `<circle cx="${f(hx - hr * .72)}" cy="${f(hy + hr * .18)}" r="${f(hr * 1.1)}" fill="url(#gf-warm)" opacity="${f(.8 * calm)}"/>`;
      s += ring(vx, vgy - 62 * vs, 22, 110, qq(t, c.dru + .15, c.dru + 1.2), .8, 2.2, WARM);
      // d07 «обидели»: sharp strokes fly into him from the left, a flash at the chest
      const chx = vx - 6 * vs, chy = vgy - 70 * vs;
      for (let k = 0; k < 4; k++) {
        const u = qq(t, c.obi - .12 + k * .05, c.obi + .14 + k * .05);
        if (u <= 0 || u >= 1) continue;
        const sx = -16, sy = chy - 50 + k * 30, ex = chx - 6, ey = chy - 8 + k * 6;
        const x = lerp(sx, ex, u), y = lerp(sy, ey, u), ang = Math.atan2(ey - sy, ex - sx), L = 26;
        s += `<line x1="${f(x - Math.cos(ang) * L)}" y1="${f(y - Math.sin(ang) * L)}" x2="${f(x)}" y2="${f(y)}" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".95"/>`;
      }
      s += ring(chx, chy, 6, 46, qq(t, c.obi + .12, c.obi + .7), .95, 2) + sparks(chx, chy, qq(t, c.obi + .12, c.obi + .6), 12, 34, 23);
    }
    /* d07: the words */
    const top7 = 1 - qq(t, c.eto - .05, c.eto + .4);
    s += gop(top7 * (1 - .45 * qq(t, c.a7 - .1, c.a7 + .2)), words(180, 54, [['ОБИДЕЛИ', c.obi], ['—', c.obi + .45], ['НЕ', c.ne7], ['МСТИ', c.msti]], 20, t, { glow: true }));
    if (t >= c.a7 - .05) {
      const m = qq(t, c.eto - .05, c.eto + .55), fl = pulse(t, c.smog + .22, .08, .6);
      const big = words(180, 152, [['А', c.a7], ['ТЫ', c.ty]], 42, t, { glow: true }) + words(180, 200, [['БЫ', c.by], ['СМОГ?', c.smog]], 42, t, { glow: true });
      s += GF.zoom(big + (fl > .02 ? `<g opacity="${f(.5 * fl)}">${big}</g>` : ''), 180, 176, lerp(1, .62, m), 180, lerp(176, 64, m));
    }
    s += gop(1 - .4 * qq(t, c.kazh, c.kazh + .5), words(180, 122, [['НЕ', c.ne7b], ['ДЛЯ', c.dly1], ['СУДА,', c.suda]], 18, t, { op: .92 }));
    s += scales(300 + 22 * qq(t, c.a7b, c.a7b + .5), 100 - 12 * qq(t, c.a7b, c.a7b + .5), 1.1, .85 * q(t, c.suda - .1, .35) * (1 - qq(t, c.a7b, c.a7b + .5)));
    s += words(180, 162, [['А', c.a7b], ['ДЛЯ', c.dly2], ['КАЖДОГО', c.kazh]], 26, t, { glow: true });
    /* d07 «каждого»: six more people with an open palm up, light in the palms — a wave from the centre */
    if (t >= c.kazh - .1) {
      CROWD.forEach((x, k) => {
        if (k === 3) return;
        const dk = Math.abs(k - 3), op = q(t, c.kazh - .08 + .07 * dk, .35), rise = 12 * (1 - op);
        if (op <= .003) return;
        const side = k < 3 ? 1 : -1, j = side > 0 ? 1 : 0, arms = [{ k: 1 }, { k: 1 }];
        arms[j] = { tg: [side * 24, -72], k: 1, hs: 1.15, up: .75, light: q(t, c.kazh + .18 + .08 * dk, .3) * (.85 + .15 * Math.sin(t * 2.2 + k)), hn: [18, 5, 4] };
        s += figure(x, GY + rise, 1.2, { n: 150, seed: 30 + k * 3, t, op: .95 * op, amp: .35, arms }).svg;
      });
    }
    return s;
  }

  SCENES.gf_book = GF.scene('gf_book', (t, K, mode, p) => body(t, K || {}));
})();
