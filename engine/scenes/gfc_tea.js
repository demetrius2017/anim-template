/* gfc_tea — «Бог ещё не создан», альтернативная версия «Цветная инфографика» (eps/god_future_color_p1), фразы a01 (hook)
 * и a02 (cool). v3, 06.11: стиль словаря GFC v2 (владелец о цветной части 1: «графика всё же не как на предложенной
 * картинке, цветов мало»; образец — eps/god_future/qa/style_flatcolor.jpg). Содержание и время — принятой сцены основной
 * версии engine/scenes/gf_tea.js (текст v21, фразы a01–a02): те же события на тех же основах слов. Словарь — gfc_00_lib.js
 * (window.GFC v2). Лиц, портретов, богов нет; красного нет. На телефоне сцена ужата в .72 (story.safe), поэтому всё крупно.
 *
 * Одна непрерывная линия времени: картинка зависит только от t и K, mode — лишь имя кадра (hook и cool рисует одно
 * и то же тело), поэтому между режимами шва нет. Все события — от слов: GFC.w(K, id, основа); секунд нет. Нет слова в
 * озвучке — запасное время от соседнего слова (а не начало фразы).
 *
 *  hook (a01)  ПЕРВЫЙ КАДР РОЛИКА (t=0, без наплыва, заголовок уже стоит): вверху крупный заголовок «ЗАЧЕМ НАМ / БОГИ?»
 *              (GFC.headline, «БОГИ?» золотом); под ним огонь порядка с лучами (fire(): GFC.spark + 12 лучей, 180,140,
 *              r 13; лучи вверх не заходят на заголовок); ниже фиолетовые холмы (GFC.ground, горизонт 240) и на них круг
 *              из 7 плоских людей шести цветов (GFC.person: фиалка, небо, коралл, зелёный, розовый, коралл, бирюза; рост
 *              80…127) у большого костра; от огня к макушке каждого — градиентная нить (золото → цвет человека), по ней
 *              бежит искра. Передний справа (бирюзовый) держит в ладонях коралловую чашку в белую полоску.
 *              «бог» — огонь вспыхивает, лучи вытягиваются, по нитям сбегает огонёк; «начн» — медленный наезд (×1,1);
 *              «странн» — огоньки поднимаются к огню, чашка обводится золотым кольцом, заголовок сменяется на
 *              «КЛЮЧ — / ЧАШКА ЧАЯ»; «чашк» — быстрый наезд в чашку (за 0,9 с), нити гаснут, огонь уходит вверх, люди,
 *              костёр и холмы гаснут; остаются чашка крупно и две бирюзовые ладони.
 *  cool (a02)  Чашка крупно (180,212, ширина 116): коралл, белые полосы, блик, пар — три струйки, тёплый чай. Слева значок-
 *              градусник (GFC.node, коралл → небо) и белая плашка 80° → 22° (к «беспоряд», там гаснет). Заголовок
 *              «ТЕПЛО / УХОДИТ» («остыва» … «назад»), затем «ПУТИ / НАЗАД НЕТ» («назад» … «беспоряд»). Частицы тепла —
 *              676 точек тумана: вылетают из чашки золотыми с хвостами, на лету остывают (золото → коралл → бирюза,
 *              небо, фиалка, розовый, зелёный), садятся мельче; первыми — к краям; под заголовком туман приглушён.
 *              «остыва» — первые частицы, чай и пар начинают остывать; «тепло» — от чашки расходится тёплое кольцо;
 *              «расход» — залп частиц к краям; «комнат» — отъезд: чашка меньше (180,250, ширина 96) встаёт на блюдце
 *              на столик, ладони отпускают; «назад» — рывок: все частицы на миг летят назад к чашке со следами, к чашке
 *              сжимается кольцо; «собер» — и тут же разлетаются обратно; «беспоряд» — на месте заголовка крупное слово
 *              БЕСПОРЯДОК (Montserrat 800, 27): разноцветные буквы слетаются из облака и стоят вразброс; «рассеива» —
 *              второй залп, буквы расходятся сильнее; «перемеш» — вихрь: облако закручивается вокруг середины кадра
 *              (остаётся), буквы кружат; «физик» — буквы белеют и встают ровно в плашку-термин; «энтроп» — буквы по одной
 *              переворачиваются в ЭНТРОПИЯ (32, золотом со свечением, как акцент заголовка), вспышка; «сам» (2-е, «Сам
 *              собой») — справа золотая стрелка ↑, чашка тускнеет, третий залп заполняет пустоту вокруг чашки;
 *              «растет» — частицы заполняют весь кадр, стрелка вырастает.
 *  Выход: туман и ЭНТРОПИЯ ↑ стоят, заголовков нет. Туман — SCENES.gfc_tea.fog: pts(t, K) — те же 676 точек в тех же
 *  местах (с вихрем), color(i), alpha(i) — мягкие края; его берёт gfc_body (a03) и собирает из него человека, поэтому
 *  наплыв без скачка. Огонь с лучами — SCENES.gfc_tea.fire(x, y, r, t, op, boost, ymin) (его же рисует gfc_body).
 * Чем вид отличается от gf_tea (основа — сюжет и время те же): плоские цветные люди вместо людей из точек; холмы под
 *   кругом; крупные заголовки GFC.headline на каждой фразе (основная версия — без заголовков) вместо пустого верха;
 *   градиентные нити вместо белых; чашка — коралловая в полоску на блюдце и столике (а не контур из точек над линией
 *   стола); значок-градусник 80° → 22°; туман цветной (горячие — золото, остывшие — пять холодных цветов палитры);
 *   буквы БЕСПОРЯДОК разноцветные, ЭНТРОПИЯ и стрелка — золотом. Раскладка круга своя (ниже основной: верх — под
 *   заголовок), мир с первого кадра крупный, как v22 основной (PRE ×1,15 там — здесь сразу в размер).
 * Слова: a01 — бог, начн, странн, чашк; a02 — остыва, тепло, расход, комнат, назад, собер, беспоряд, рассеива,
 *   перемеш, физик, энтроп, сам (n=1: «Сам собой», не «само назад»), только, растет. Все есть в K.words озвучки
 *   eps/god_future_color_p1/build/cues.json (текст v21; сверено 06.11).
 * Кадр: всё важное в y=46..345 (верх — заголовок не выше базовой линии 60). Пик ≈ 3 тыс. элементов (туман с хвостами).
 * Проверка: eps/god_future_color_p1/qa/gfc_tea_v3*.jpg (станция tesla, render.py --at … --sheet).
 * Параметры p: s, mode, K (cues.json), prev/prev_mode — их разбирает GFC.scene.
 */
(() => {
  const TAU = Math.PI * 2;
  const f = v => Number(v).toFixed(2);
  const H = n => GFC.hash(n);
  const frac = x => x - Math.floor(x);
  const lerp = (a, b, k) => a + (b - a) * k;
  const clamp = x => Math.max(0, Math.min(1, x));
  const pulse = (t, a, up, down) => GFC.qq(t, a, a + up) * (1 - GFC.qq(t, a + up, a + up + down));
  const bez = (a, b, c, u) => { const v = 1 - u; return [v * v * a[0] + 2 * v * u * b[0] + u * u * c[0], v * v * a[1] + 2 * v * u * b[1] + u * u * c[1]]; };
  const INK = GFC.INK, PAL = GFC.PAL, ACC = GFC.ACC, SUN = GFC.SUN, GOLD = GFC.GOLD;
  const FF = 'GFCMont, Mont, sans-serif';
  const WARM = '#ffb347';
  const cache = {};

  // свои заливки (id с приставкой gfct-, чтобы не пересечься с соседними сценами в наплыве)
  const DEFS = `<defs>
    <linearGradient id="gfct-flO" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff7a3d"/><stop offset="1" stop-color="#ffa23d"/></linearGradient>
    <linearGradient id="gfct-flM" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb03d"/><stop offset="1" stop-color="#ffd85a"/></linearGradient>
    <linearGradient id="gfct-steam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="gfct-tea" cx=".45" cy=".4"><stop offset="0" stop-color="#e8964a"/><stop offset="1" stop-color="#9a4d22"/></radialGradient>
    <radialGradient id="gfct-teaC" cx=".45" cy=".4"><stop offset="0" stop-color="#9c6440"/><stop offset="1" stop-color="#5a2e1e"/></radialGradient>
    <linearGradient id="gfct-saucer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd6ea"/><stop offset="1" stop-color="#e88cc0"/></linearGradient>
    <linearGradient id="gfct-table" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ccbff"/><stop offset=".55" stop-color="#7a6ae8"/><stop offset="1" stop-color="#9547d6"/></linearGradient>
    <linearGradient id="gfct-tableE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3fc0"/><stop offset="1" stop-color="#3a2690"/></linearGradient>
    <radialGradient id="gfct-plate"><stop offset="0" stop-color="#c48cff" stop-opacity=".55"/><stop offset=".6" stop-color="#8a50e0" stop-opacity=".2"/><stop offset="1" stop-color="#6a30c0" stop-opacity="0"/></radialGradient>
    <radialGradient id="gfct-glow"><stop offset="0" stop-color="#ffbe6a" stop-opacity=".55"/><stop offset=".45" stop-color="#ff9e45" stop-opacity=".2"/><stop offset="1" stop-color="#ff9e45" stop-opacity="0"/></radialGradient>
    <clipPath id="gfct-cupclip"><path d="M-52 -39 C-52 -5 -44 23 -28 33 C-14 39 14 39 28 33 C44 23 52 -5 52 -39 Z"/></clipPath>
  </defs>`;

  /* ---------------- слова ---------------- */
  // есть ли слово в озвучке: GFC.w без слова даёт начало фразы, здесь вместо этого — запасное время от соседнего слова
  const has = (K, id, s, n = 0) => ((K && K.words && K.words[id]) || []).filter(w => GFC.bare(w.w).startsWith(GFC.bare(s))).length > n;
  const wd = (K, id, s, n, alt) => has(K, id, s, n) ? GFC.w(K, id, s, n) : alt;
  function cues(K) {
    const c = { K, a1: GFC.T(K, 'a01'), a1e: GFC.TE(K, 'a01'), a2: GFC.T(K, 'a02'), a2e: GFC.TE(K, 'a02') };
    const A = (s, alt, n = 0) => wd(K, 'a01', s, n, alt), B = (s, alt, n = 0) => wd(K, 'a02', s, n, alt);
    // a01: «Зачем людям боги? Начнём, как ни странно, с чашки чая.»
    c.bogi = A('бог', c.a1 + .6); c.nach = A('начн', c.bogi + .8); c.strann = A('странн', c.nach + .8); c.chash = A('чашк', c.strann + .6);
    c.up = c.chash - .12;                       // огонь уходит вверх вместе с наездом на чашку
    // a02 (текст v21): «Чай остывает: тепло расходится по комнате и само назад не соберётся. Это и есть беспорядок —
    //   всё рассеивается и перемешивается. Физики называют его энтропией. Сам собой он только растёт.»
    c.ost = B('остыва', c.a2 + .25); c.teplo = B('тепло', c.ost + .8); c.rash = B('расход', c.teplo + .45);
    c.komn = B('комнат', c.rash + .6); c.nazad = B('назад', c.komn + .8); c.sober = B('собер', c.nazad + .45);
    c.bespor = B('беспоряд', c.sober + 1.4); c.rasse = B('рассеива', c.bespor + .95); c.mix = B('перемеш', c.rasse + .85);
    c.fiz = B('физик', c.mix + 1.0); c.entr = B('энтроп', c.fiz + .95); c.sam = B('сам', c.entr + .9, 1);
    c.tolko = B('только', c.sam + .9); c.rast = B('растет', c.tolko + .3);
    // заголовки: ключевая мысль фразы, не субтитр дословно; первый стоит с первого кадра; с «беспоряд» место заголовка
    // занимает само слово БЕСПОРЯДОК → ЭНТРОПИЯ
    c.HL = [
      { s: 'Зачем нам / *боги?*', t0: -1, t1: c.strann + .1, o: { y: 62, size: 27 } },
      { s: 'Ключ — / *чашка чая*', t0: c.strann + .05, t1: Math.max(c.chash + 1, c.ost + .05), o: { y: 62, size: 27 } },
      { s: 'Тепло / *уходит*', t0: Math.max(c.chash + 1.05, c.ost), t1: c.nazad - .02, o: { y: 64, size: 26 } },
      { s: 'Пути / *назад нет*', t0: c.nazad, t1: c.bespor - .05, o: { y: 64, size: 26 } },
    ];
    return c;
  }
  // насколько виден заголовок сейчас (туман под ним приглушается)
  const hvis = (t, c) => c.HL.reduce((m, h) => Math.max(m, GFC.q(t, h.t0, .3) * GFC.out(t, h.t1 - .35, .35)), 0);
  const headlines = (t, c) => c.HL.map(h => GFC.headline(h.s, t, h.t0, h.t1, h.o)).join('');

  /* ---------------- огонь порядка с лучами (общий с gfc_body: рифма первого кадра и «Ответ… к богам») ---------------- */
  // ymin — лучи вверх не заходят выше (здесь — под заголовок)
  function fire(x, y, r, t, op = 1, boost = 0, ymin = -1e9) {
    if (op <= .003) return '';
    const n = 12, rot = t * .12 + Math.PI / 14;
    let tri = '';
    for (let k = 0; k < n; k++) {
      const a = rot + k / n * TAU, lg = k % 2 ? .6 : 1, ca = Math.cos(a), sa = Math.sin(a);
      const r0 = r * 1.3, w = r * (.12 + .06 * lg);
      let L = r * (1.0 + 1.9 * lg) * (1 + .08 * Math.sin(t * 2.3 + k * 1.7)) * (1 + .45 * boost);
      if (sa < -.05) L = Math.max(r * .5, Math.min(L, (y - ymin) / -sa - r0));
      const b = [x + ca * r0, y + sa * r0], e = [x + ca * (r0 + L), y + sa * (r0 + L)];
      tri += `M${f(b[0] - sa * w)} ${f(b[1] + ca * w)}L${f(e[0])} ${f(e[1])}L${f(b[0] + sa * w)} ${f(b[1] - ca * w)}Z`;
    }
    return `<g opacity="${f(op)}"><path d="${tri}" fill="${SUN}" opacity="${f(Math.min(1, .4 + .3 * boost))}" filter="url(#gfc-soft)"/>` +
      `<path d="${tri}" fill="#ffe9a0" opacity=".82"/></g>` + GFC.spark(x, y, r * (1 + .15 * boost), { t, op });
  }

  /* ---------------- мир a01: холмы и круг у костра ---------------- */
  // 7 человек по кругу (углы — чтобы плоские фигуры почти не закрывали друг друга), задний центральный — за костром;
  // HOLDER — передний справа, держит чашку. Цвета: все шесть цветов людей GFC.CROWD, соседи по кругу и те, кто стоит
  // друг за другом, — разные; держатель бирюзовый (к коралловой чашке). Круг ниже основной версии: верх — под заголовок.
  const RING = { cx: 180, cy: 284, rx: 136, ry: 48 }, FIRE = [180, 288], SPARK = [180, 146], SPARK_R = 13, HOLDER = 6;
  const HORIZON = 240, HEAD_Y = 119;           // горизонт холмов; лучи огня — не выше низа заголовка
  const ANG = [270, 226, 314, 168, 12, 117, 63], COL = [3, 2, 0, 6, 5, 0, 1];
  function people() {
    if (cache.people) return cache.people;
    const L = [];
    for (let k = 0; k < ANG.length; k++) {
      const a = ANG[k] * Math.PI / 180, sn = Math.sin(a), d = (sn + 1) / 2;
      const x = RING.cx + RING.rx * Math.cos(a), gy = RING.cy + RING.ry * sn, h = 80 + 50 * d;
      L.push({ k, x, gy, h, d, front: gy > FIRE[1], col: COL[k], top: [x, gy - h] });
    }
    L.sort((p, q) => p.gy - q.gy);
    return (cache.people = L);
  }
  // чашка в руках держателя (мир a01): центр тела чашки и ширина
  const CUPU = { y: -42, w: 20 };             // в единицах фигуры GFC.person (макушка −95,5, подошвы 0)
  function cupWorld() {
    if (cache.cupW) return cache.cupW;
    const p = people().find(q => q.k === HOLDER), s = p.h / 95.5;
    return (cache.cupW = { x: p.x, y: p.gy + CUPU.y * s, w: CUPU.w * s });
  }

  // держатель: та же плоская фигура, что GFC.person (туника, голова-круг), но руки согнуты и держат чашку перед собой
  const TUNIC = 'M-15 -58 C-15 -67 -9 -71 0 -71 C9 -71 15 -67 15 -58 L19 -5 C19 -2 17 0 14 0 L-14 0 C-17 0 -19 -2 -19 -5 Z';
  function holderSvg(p, t, look) {
    const s = p.h / 95.5, br = 1 + .014 * Math.sin(t * 2.3 + 7 * 1.7), pal = PAL[p.col];
    const hx = 60 / 104 * CUPU.w, hy = CUPU.y + .4;     // ладонь у бока чашки
    const arms = [-1, 1].map(sd => `M${12.5 * sd} -61 Q${f(25 * sd)} -53 ${f(hx * sd)} ${f(hy)}`).join(' ');
    const body = (fill) => `<path d="${TUNIC}" fill="${fill}"/><circle cx="0" cy="-84" r="11.5" fill="${fill}"/>`;
    const arm = (c) => `<path d="${arms}" fill="none" stroke="${c}" stroke-width="7.5" stroke-linecap="round"/>`;
    let b = body(`url(#gfc-p${p.col})`) + `<path d="${TUNIC}" fill="url(#gfc-shade)"/>`;
    if (look.shade > .003) b += `<g opacity="${f(.42 * look.shade)}">${body(INK)}</g>`;
    if (look.lit > .003) b += `<g opacity="${f(.24 * look.lit)}">${body('#ffb46a')}</g>`;
    const sd = Math.sign(look.rim || 0);
    if (sd) b += `<path d="M${15 * sd} -58 L${19 * sd} -6" fill="none" stroke="#ffc27a" stroke-width="3" stroke-linecap="round" opacity=".6"/>` +
      `<path d="M${f(4 * sd)} -95 A11.5 11.5 0 0 ${sd > 0 ? 1 : 0} ${f(11 * sd)} -80" fill="none" stroke="#ffc27a" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>`;
    b += arm(pal[1]) + `<g opacity="${f(.3 * look.shade)}">${arm(INK)}</g>`;
    b += `<ellipse cx="-4.4" cy="-88.8" rx="3.45" ry="2.3" fill="#fff" opacity=".2"/>`;
    const sh = `<ellipse cx="${f(p.x)}" cy="${f(p.gy + .4)}" rx="${f(p.h * .27)}" ry="${f(p.h * .06)}" fill="url(#gfc-shadow)"/>`;
    return sh + `<g transform="translate(${f(p.x)} ${f(p.gy)}) scale(${s.toFixed(4)} ${(s * br).toFixed(4)})">${b}</g>`;
  }

  // костёр (как в пробе gfx_flatcolor, крупнее ×1,8): два полена крест-накрест, камни, три языка пламени, искры
  function campfire(x, y, t, sc) {
    const n = GFC.noise;
    const fl = k => 1 + .15 * n(t * 8 + k * 3) + .06 * n(t * 21 + k);
    const flame = (w, h, k, fill) => {
      const hh = h * fl(k), sw = 2.4 * n(t * 5 + k * 7);
      return `<path d="M${f(-w)} 0 C${f(-w)} ${f(-hh * .45)} ${f(-w * .25 + sw)} ${f(-hh * .7)} ${f(sw)} ${f(-hh)} C${f(w * .25 + sw)} ${f(-hh * .7)} ${f(w)} ${f(-hh * .45)} ${f(w)} 0 C${f(w)} ${f(w * .55)} ${f(-w)} ${f(w * .55)} ${f(-w)} 0 Z" fill="${fill}"/>`;
    };
    let s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})">`;
    for (let i = 0; i < 9; i++) { const a = Math.PI * (.05 + .9 * i / 8); s += `<ellipse cx="${f(21 * Math.cos(a))}" cy="${f(2 + 5 * Math.sin(a))}" rx="4.2" ry="3" fill="${i % 2 ? '#7d68c0' : '#6d5aa8'}"/>`; }
    s += `<g transform="rotate(13)"><rect x="-17" y="-3.2" width="34" height="6.4" rx="3.2" fill="#8a4a30"/><rect x="-15" y="-2.4" width="30" height="1.4" rx=".7" fill="#c07850" opacity=".7"/></g>` +
      `<g transform="rotate(-13)"><rect x="-17" y="-3.2" width="34" height="6.4" rx="3.2" fill="#6a3424"/><rect x="-15" y="-2.4" width="30" height="1.4" rx=".7" fill="#a86040" opacity=".6"/></g>`;
    s += `<g transform="translate(0 -4)"><g filter="url(#gfc-soft)" opacity=".7">${flame(13, 32, 1, '#ff9a3d')}</g>${flame(12, 30, 1, 'url(#gfct-flO)')}` +
      `${flame(8, 22, 2, 'url(#gfct-flM)')}${flame(4.5, 13, 3, '#fff1a8')}</g>`;
    for (let i = 0; i < 12; i++) {
      const u = frac(t * .6 + H(i * 3.1));
      const a = clamp(u / .12) * (1 - u);
      if (a > .01) s += `<circle cx="${f(11 * n(i * 5 + t * 1.3))}" cy="${f(-20 - u * 46)}" r="${f(1.4 * (1 - u) + .3)}" fill="#ffd36b" opacity="${f(a)}"/>`;
    }
    return s + '</g>';
  }

  // градиентная нить-дуга (золото огня → цвет человека) с бегущей искрой; id — номер человека
  function beam(a, b, t, k, col, op, hot) {
    if (op <= .003) return '';
    const c = [lerp(a[0], b[0], .5) + (b[0] - a[0]) * .25, lerp(a[1], b[1], .25)], id = `gfct-b${k}`;
    let s = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}">` +
      `<stop offset="0" stop-color="${SUN}"/><stop offset=".45" stop-color="${GFC.mixC(SUN, col, .5)}"/><stop offset="1" stop-color="${col}"/></linearGradient>`;
    const d = `M${f(a[0])} ${f(a[1])} Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`;
    s += `<path d="${d}" fill="none" stroke="url(#${id})" stroke-width="3.6" stroke-linecap="round" opacity="${f(.28 * (1 + hot))}" filter="url(#gfc-soft)"/>` +
      `<path d="${d}" fill="none" stroke="url(#${id})" stroke-width="1.5" stroke-linecap="round" opacity=".95"/>`;
    const u = frac(t * .42 + k * .37), kk = Math.sin(Math.PI * u), p = bez(a, c, b, u);
    s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="4.5" fill="${GFC.mixC(SUN, col, u)}" opacity="${f(.35 * kk)}"/><circle cx="${f(p[0])}" cy="${f(p[1])}" r="1.8" fill="#fff6d0" opacity="${f(kk)}"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  function fireWorld(t, c, C) {
    const L = people(), Z = C.Z;
    // наезд на чашку: люди, костёр и холмы сперва пролетают мимо (уходят за край кадра), потом гаснут; держатель —
    // позже (к концу — только чашка и ладони)
    const oth = 1 - clamp((C.E - .4) / .3), hop = 1 - clamp((C.E - .6) / .18);
    const fl = .82 + .18 * Math.sin(t * 9.1) * Math.sin(t * 5.3 + 1);
    const gop = fl * (1 - clamp((Z - 1.25) / .5));
    let s = GFC.ground({ y: HORIZON, op: oth, warm: .55 * gop, seed: 2 });
    if (gop * oth > .003) s += `<ellipse cx="${FIRE[0]}" cy="${FIRE[1] + 6}" rx="150" ry="44" fill="url(#gfct-glow)" opacity="${f(.95 * gop * oth)}"/>`;
    // свет костра: дальние освещены спереди, у ближних — тёплый ободок со стороны огня
    const look = p => ({ shade: .38 * p.d, lit: .9 * (1 - p.d) * fl, rim: p.x < FIRE[0] - 3 ? 1 : p.x > FIRE[0] + 3 ? -1 : 0 });
    const draw = p => p.k === HOLDER ? (hop > .003 ? `<g opacity="${f(hop)}">${holderSvg(p, t, look(p))}</g>` : '') :
      GFC.person(p.x, p.gy, p.h, { color: p.col, t, seed: p.k + 1, ...look(p), opacity: oth });
    L.filter(p => !p.front).forEach(p => { s += draw(p); });
    if (gop * oth > .003) s += `<circle cx="${FIRE[0]}" cy="${FIRE[1] - 30}" r="96" fill="url(#gfc-halo)" opacity="${f(gop * oth)}"/>`;
    if (oth > .003) s += `<g opacity="${f(oth)}">${campfire(FIRE[0], FIRE[1], t, 1.8)}</g>`;
    L.filter(p => p.front).forEach(p => { s += draw(p); });
    // «странно» — чашка в руках держателя обводится золотым кольцом
    const ring = pulse(t, c.strann - .05, .3, 1.2) * hop;
    if (ring > .01) {
      const cw = cupWorld(), y = cw.y - cw.w * .25, r = cw.w * 1.3;
      s += `<circle cx="${f(cw.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${GOLD}" stroke-width="4.5" opacity="${f(.45 * ring)}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${f(cw.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff6d0" stroke-width="1.8" opacity="${f(.95 * ring)}"/>`;
    }

    // огонь порядка и градиентные нити к людям
    const rise = GFC.qq(t, c.up, c.up + 1.2), sop = 1 - GFC.qq(t, c.up + .25, c.up + 1.1);
    const sp = [SPARK[0], SPARK[1] - 160 * rise * rise];
    const thr = 1 - GFC.qq(t, c.up, c.up + .45);
    if (thr > .003) {
      // «боги» — огонёк сбегает по нитям к людям; «странно» — поднимается от людей к огню
      const kb = GFC.qq(t, c.bogi, c.bogi + .75), ku = 1 - GFC.qq(t, c.strann, c.strann + .75);
      const hb = Math.max(Math.sin(Math.PI * kb), Math.sin(Math.PI * ku)), kk = ku < 1 && ku > 0 ? ku : kb;
      const hot = [];
      L.forEach(p => {
        const a = [sp[0], sp[1] + 12], b = [p.top[0], p.top[1] - 2], col = PAL[p.col][0];
        s += beam(a, b, t, p.k, col, thr * (p.k === HOLDER ? Math.max(hop, .3) : Math.max(oth, .3)), hb);
        if (hb > .01) { const cc = [lerp(a[0], b[0], .5) + (b[0] - a[0]) * .25, lerp(a[1], b[1], .25)]; hot.push(bez(a, cc, b, kk)); }
      });
      if (hot.length) {
        s += hot.map(p => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="11" fill="url(#gfc-halo)" opacity="${f(hb * thr)}"/>`).join('');
        s += GFC.dots(hot, { r: 3.2, op: .95 * hb * thr, t, glow: 1.2, color: '#fff6d0' });
      }
    }
    // лучи вверх — не выше низа заголовка (в координатах мира: заголовок стоит в кадре, мир под наездом)
    const ymin = C.cw.y + (HEAD_Y - C.ty) / Z;
    if (sop > .003) s += fire(sp[0], sp[1], SPARK_R, t, sop, .3 + .8 * pulse(t, c.bogi, .2, .8) + .5 * pulse(t, c.strann + .6, .2, .7), ymin);
    return s;
  }

  /* ---------------- камера: наезд на чашку на «чашки» (a01), отъезд на «комнате» (a02) ---------------- */
  const CUP0 = { x: 180, y: 212, w: 116 }, CUP1 = { x: 180, y: 250, w: 96 };
  function cam(t, c) {
    const cw = cupWorld();
    const zIn = Math.log(1.1) * GFC.qq(t, c.nach, c.chash);
    const z0 = c.chash - .1, z1 = c.chash + .8;
    const E = GFC.ease((t - z0) / (z1 - z0));
    const lz = zIn + (Math.log(CUP0.w / cw.w) - zIn) * E, Z = Math.exp(lz);
    const tx = lerp(cw.x, CUP0.x, E), ty = lerp(cw.y, CUP0.y, E);
    return { Z, lz, E, tx, ty, cw, P: p => [tx + (p[0] - cw.x) * Z, ty + (p[1] - cw.y) * Z] };
  }
  function cupAt(t, c, C) {
    const cw = C.cw, p = C.P([cw.x, cw.y]);
    let x = p[0], y = p[1], wd2 = cw.w * C.Z;
    const b = GFC.qq(t, c.komn - .1, c.komn + 1.2);
    if (b > 0) { x = lerp(x, CUP1.x, b); y = lerp(y, CUP1.y, b); wd2 = wd2 * Math.pow(CUP1.w / wd2, b); }
    return { x, y, w: wd2 };
  }

  /* ---------------- чашка, пар, ладони, столик (местные единицы пробы: ширина чашки 104, центр тела чашки) ---------------- */
  const CUPD = 'M-52 -39 C-52 -5 -44 23 -28 33 C-14 39 14 39 28 33 C44 23 52 -5 52 -39 Z';
  function cupSvg(cu, t, heat, op, sauc) {
    if (op <= .003) return '';
    let s = '';
    if (sauc > .003) s += `<g opacity="${f(sauc)}"><ellipse cx="0" cy="40" rx="118" ry="26" fill="url(#gfct-plate)"/>` +
      `<ellipse cx="4" cy="45" rx="84" ry="13" fill="${INK}" opacity=".5" filter="url(#gfc-blur)"/>` +
      `<ellipse cx="0" cy="37" rx="80" ry="14" fill="url(#gfct-saucer)"/><ellipse cx="0" cy="36" rx="50" ry="8" fill="#c86aa6" opacity=".5"/>` +
      `<path d="M-72 32 Q0 22 72 32" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".45"/></g>`;
    s += `<path d="M51 -25 C82 -31 88 7 56 17" fill="none" stroke="#e8505b" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M51 -25 C78 -29 82 3 56 13" fill="none" stroke="#ff9d8f" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`;
    s += `<path d="${CUPD}" fill="url(#gfc-p0)"/>`;
    // полоски и блики, как в образце: две белые полосы, тонкая золотая, тень справа
    s += `<g clip-path="url(#gfct-cupclip)"><rect x="-58" y="-21" width="120" height="9" fill="#fff4ef" opacity=".92"/>` +
      `<rect x="-58" y="-7" width="120" height="3.4" fill="${GOLD}" opacity=".85"/>` +
      `<rect x="-58" y="2" width="120" height="6" fill="#fff4ef" opacity=".7"/>` +
      `<path d="M22 -39 C28 -5 24 23 12 39 L62 39 L62 -39 Z" fill="${INK}" opacity=".16"/></g>`;
    s += `<path d="M-41 -29 C-39 -5 -34 15 -25 26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".4"/>`;
    s += `<ellipse cx="0" cy="-39" rx="52" ry="10" fill="#ffd3ca"/>`;
    s += `<ellipse cx="0" cy="-38" rx="46" ry="7.4" fill="url(#gfct-teaC)"/>`;
    if (heat > .01) s += `<ellipse cx="0" cy="-38" rx="46" ry="7.4" fill="url(#gfct-tea)" opacity="${f(heat)}"/>` +
      `<ellipse cx="0" cy="-38" rx="40" ry="6" fill="#ffc98a" opacity="${f(.45 * heat)}" filter="url(#gfc-soft)"/>`;
    s += `<ellipse cx="${f(-2 + 10 * Math.sin(t * 1.6))}" cy="-39" rx="14" ry="2.2" fill="#fff" opacity="${f(.12 + .16 * heat)}"/>`;
    // пар: три струйки, слабеют вместе с теплом
    if (heat > .01) for (let i = 0; i < 3; i++) {
      const x0 = -22 + i * 22;
      let d = '';
      for (let k = 0; k <= 14; k++) {
        const yy = -46 - k * 7.6, xx = x0 + 7 * Math.sin(k * .55 - t * 3.2 + i * 2) * (.35 + k / 14);
        d += (k ? ' L' : 'M') + f(xx) + ' ' + f(yy);
      }
      s += `<path d="${d}" fill="none" stroke="url(#gfct-steam)" stroke-width="${f(5.2 - i * .6)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f(heat)}"/>`;
    }
    return `<g opacity="${f(op)}" transform="translate(${f(cu.x)} ${f(cu.y)}) scale(${(cu.w / 104).toFixed(4)})">${s}</g>`;
  }
  // ладони держателя: овал у бока чашки и четыре пальца-капсулы на её переде (бирюза, светотень)
  const FINGERS = [[-17, 27], [-6, 31], [5, 30], [16, 25]];
  function handsSvg(cu, t, op) {
    if (op <= .003) return '';
    const col = `url(#gfc-p${COL[HOLDER]})`, dark = PAL[COL[HOLDER]][1];
    let s = '';
    for (const sd of [-1, 1]) {
      s += `<ellipse cx="${60 * sd}" cy="2" rx="14" ry="30" fill="${col}"/><ellipse cx="${60 * sd}" cy="2" rx="14" ry="30" fill="url(#gfc-shade)"/>`;
      FINGERS.forEach(([y, len]) => {
        const x0 = sd < 0 ? -64 : 64 - len;
        const a = `x="${x0}" y="${y - 5}" width="${len}" height="10" rx="5"`;
        s += `<rect ${a} fill="${col}"/><rect ${a} fill="url(#gfc-shade)"/><rect ${a} fill="none" stroke="${dark}" stroke-width="1.3" opacity=".55"/>`;
      });
      s += `<path d="M${54 * sd} -26 Q${66 * sd} -30 ${72 * sd} -18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".3"/>`;
    }
    return `<g opacity="${f(op)}" transform="translate(${f(cu.x)} ${f(cu.y)}) scale(${(cu.w / 104).toFixed(4)})">${s}</g>`;
  }
  // столик под чашкой после отъезда (вместо коробки-комнаты): цветная столешница с кантом и бликом, две ножки
  function table(t, c, cu) {
    const op = GFC.qq(t, c.komn + .3, c.komn + 1.2);
    if (op <= .003) return '';
    const k = cu.w / 74, ty = cu.y + .356 * cu.w + 4 * k;
    return `<g opacity="${f(op)}" transform="translate(${f(cu.x)} ${f(ty)}) scale(${k.toFixed(4)})">` +
      `<ellipse cx="4" cy="40" rx="74" ry="8" fill="${INK}" opacity=".45" filter="url(#gfc-blur)"/>` +
      `<rect x="-46" y="4" width="10" height="36" rx="4" fill="#3c2890"/><rect x="36" y="4" width="10" height="36" rx="4" fill="#3c2890"/>` +
      `<rect x="-44" y="6" width="3" height="30" rx="1.5" fill="#8a70e8" opacity=".5"/><rect x="38" y="6" width="3" height="30" rx="1.5" fill="#8a70e8" opacity=".5"/>` +
      `<rect x="-84" y="-1" width="168" height="11" rx="5.5" fill="url(#gfct-tableE)"/>` +
      `<ellipse cx="0" cy="-1" rx="84" ry="9" fill="url(#gfct-table)"/>` +
      `<ellipse cx="0" cy="-1" rx="83" ry="8.4" fill="none" stroke="#fff" stroke-width="1.1" opacity=".4"/>` +
      `<path d="M-60 -4 Q-30 -8 -6 -8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".5"/></g>`;
  }

  /* ---------------- туман: 676 цветных точек тепла по всему кадру (общие с gfc_body) ---------------- */
  const FOG = { cols: 26, rows: 26, box: [4, 14, 356, 356], amp: 1.8, op: .92, r: 1.9, glow: .55 };
  FOG.n = FOG.cols * FOG.rows;
  // остывшие — пять холодных цветов палитры v2 (светлые тона: бирюза, небо, фиалка, розовый, зелёный); горячие — золото
  const COOL = [PAL[1][0], PAL[2][0], PAL[3][0], PAL[5][0], PAL[6][0]];
  const STAGES = 5;
  // цвет точки по ходу остывания: 0 — горячая (золото), STAGES−1 — её холодный цвет в тумане
  const STAGE = COOL.map(cc => Array.from({ length: STAGES }, (_, k) => k === 0 ? '#ffe9a0' :
    k === STAGES - 1 ? cc : GFC.mixC(k < 2 ? '#ffb547' : '#ff9d8f', cc, (k - 1) / (STAGES - 2))));
  const fogCol = i => Math.floor(H(i * 7 + 1200) * COOL.length) % COOL.length;
  // вихрь только в середине кадра: края тумана не перекашиваются
  const SWIRL = { c: [180, 190], a: 1.3, r: 100 };
  function fogBase() {
    if (cache.fog) return cache.fog;
    const [x0, y0, x1, y1] = FOG.box, cw = (x1 - x0) / FOG.cols, ch = (y1 - y0) / FOG.rows, P = [];
    for (let j = 0; j < FOG.rows; j++) for (let i = 0; i < FOG.cols; i++) {
      const k = j * FOG.cols + i;
      P.push([x0 + (i + .1 + .8 * H(k * 3 + 1100)) * cw, y0 + (j + .1 + .8 * H(k * 5 + 1101)) * ch]);
    }
    return (cache.fog = P);
  }
  // мягкие края тумана: к краю сцены точки тускнеют (ровный прямоугольник читался бы той же коробкой-комнатой)
  const fogAlpha = () => cache.fogA || (cache.fogA = fogBase().map(([x, y], i) => {
    const e = Math.min(x, 360 - x, (y - 8) * 1.2, 358 - y);
    return Math.pow(clamp(e / 46), .85) * (.75 + .25 * H(i * 31 + 1200));
  }));
  // «перемешивается» — вихрь: поворот убывает с расстоянием от центра (туман остаётся ровным)
  function fogPts(t, K) {
    let P = fogBase();
    if (has(K, 'a02', 'перемеш')) {
      const m = GFC.w(K, 'a02', 'перемеш'), q = GFC.qq(t, m - .05, m + 1.7);
      if (q > 0) P = P.map(p => {
        const dx = p[0] - SWIRL.c[0], dy = p[1] - SWIRL.c[1], a = SWIRL.a * q * Math.exp(-((dx * dx + dy * dy) / (SWIRL.r * SWIRL.r)));
        const ca = Math.cos(a), sa = Math.sin(a);
        return [SWIRL.c[0] + dx * ca - dy * sa, SWIRL.c[1] + dx * sa + dy * ca];
      });
    }
    return GFC.jitter(P, t, FOG.amp, 7);
  }
  // когда и откуда летит каждая точка: первыми — дальние (к краям), последний залп («Сам собой… растёт») — ближние
  function plan(c) {
    const key = [c.ost, c.teplo, c.rash, c.komn, c.rasse, c.mix, c.sam, c.tolko].join(',');
    if (cache.plan && cache.plan.key === key) return cache.plan;
    const B = fogBase(), n = B.length, ox = CUP1.x, oy = CUP1.y - 30;
    const kf = i => Math.hypot(B[i][0] - ox, B[i][1] - oy) * (.5 + 1.0 * H(i * 29 + 5));
    const ids = B.map((p, i) => i).sort((a, b) => kf(b) - kf(a));
    const E = new Array(n), D = new Array(n), S0 = new Array(n);
    ids.forEach((i, j) => {
      const r = j / n, h = H(i * 23 + 7), g = H(i * 9 + 4);
      let e, d;
      if (r < .12) { e = c.ost + (c.teplo + .15 - c.ost) * (r / .12) + .1 * h; d = 1.5 + .6 * g; }
      else if (r < .42) { e = c.rash - .05 + .85 * ((r - .12) / .3) + .08 * h; d = 1.0 + .5 * g; }
      else if (r < .66) { e = c.rasse - .1 + (c.mix + .15 - c.rasse) * ((r - .42) / .24) + .06 * h; d = 1.0 + .4 * g; }
      else { e = c.sam - .05 + (c.tolko - c.sam + .1) * ((r - .66) / .34) + .05 * h; d = .75 + .2 * g; }
      const cu = cupAt(e, c, cam(e, c));
      S0[i] = [cu.x + (H(i * 13 + 6) - .5) * .6 * cu.w, cu.y - (.4 + .1 * H(i * 17 + 8)) * cu.w];
      E[i] = e; D[i] = d;
    });
    return (cache.plan = { key, E, D, S0 });
  }
  function vapor(t, c) {
    if (t < c.ost - .05) return { land: '', fly: '' };
    const F = fogPts(t, c.K), PL = plan(c), n = F.length, VA = fogAlpha();
    const rw = pulse(t, c.nazad - .02, .22, .55);       // «назад» — рывок к чашке
    const hv = hvis(t, c);                              // под заголовком туман приглушён (к концу фразы заголовков нет)
    const dim = y => hv > .003 ? 1 - .75 * hv * clamp((122 - y) / 30) : 1;
    const L = [], LA = [], LC = [], FL = [], FA = [], FS = [], FC = [], tails = new Map();
    let streak = '';
    for (let i = 0; i < n; i++) {
      const e = PL.E[i]; if (t < e) continue;
      const x = clamp((t - e) / PL.D[i]), s0 = PL.S0[i], ci = fogCol(i);
      const ctrl = [lerp(s0[0], F[i][0], .3), Math.max(12, Math.min(s0[1], F[i][1]) - 18 - 40 * H(i * 19 + 2))];
      const ue = (1 - Math.pow(1 - x, 2.2)) * (1 - .5 * rw);
      const p = ue >= 1 ? F[i] : bez(s0, ctrl, F[i], ue);
      if (x >= 1) { L.push(p); LA.push(VA[i] * dim(p[1])); LC.push(COOL[ci]); }
      else {
        const col = STAGE[ci][Math.min(STAGES - 1, Math.floor(x * (STAGES - .01)))], a = lerp(1.5, VA[i], x) * dim(p[1]);
        FL.push(p); FS.push(lerp(2.0, 1.05, Math.pow(x, .7))); FA.push(a); FC.push(col);
        // хвост летящей частицы: короткий след назад по пути, цвета её стадии остывания
        if (x < .8 && rw < .04) {
          const p2 = bez(s0, ctrl, F[i], Math.max(0, ue - .09));
          tails.set(col, (tails.get(col) || '') + `M${f(p2[0])} ${f(p2[1])}L${f(p[0])} ${f(p[1])}`);
        }
      }
      if (rw > .04) { const q2 = bez(s0, ctrl, F[i], Math.min(1, ue + .28 * rw)); streak += `M${f(p[0])} ${f(p[1])}L${f(q2[0])} ${f(q2[1])}`; }
    }
    let fly = '';
    for (const [col, d] of tails) fly += `<path d="${d}" stroke="${col}" stroke-width="1.3" stroke-linecap="round" fill="none" opacity=".42"/>`;
    fly += GFC.dots(FL, { r: FOG.r, op: .8, t, glow: 1, alpha: i => FA[i], size: i => FS[i], color: i => FC[i] });
    if (streak) fly += `<path d="${streak}" stroke="#fff6e0" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="${f(.55 * rw)}"/>`;
    return { land: GFC.dots(L, { r: FOG.r, op: FOG.op, t, glow: FOG.glow, alpha: i => LA[i], color: i => LC[i] }), fly };
  }

  /* ---------------- кольца: тепло расходится («тепло»), всё тянется назад («назад») ---------------- */
  function rings(t, c, cu) {
    let s = '';
    const qw = GFC.qq(t, c.teplo - .05, c.teplo + 1.3), ow = GFC.q(t, c.teplo - .05, .15) * (1 - qw);
    if (ow > .01) {
      const r = lerp(cu.w * .5, 240, qw), y = cu.y - .3 * cu.w;
      s += `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="none" stroke="${WARM}" stroke-width="7" opacity="${f(.45 * ow)}" filter="url(#gfc-soft)"/>` +
        `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * .8)}" fill="none" stroke="${WARM}" stroke-width="2.6" opacity="${f(.9 * ow)}"/>` +
        `<ellipse cx="${f(cu.x)}" cy="${f(y)}" rx="${f(r * .86)}" ry="${f(r * .69)}" fill="none" stroke="#ff9d8f" stroke-width="1.4" opacity="${f(.6 * ow)}"/>`;
    }
    const qb = GFC.qq(t, c.nazad - .05, c.nazad + .32), ob = pulse(t, c.nazad - .05, .08, .45);
    if (ob > .01) {
      const r = lerp(200, cu.w * .7, qb), y = cu.y - .3 * cu.w;
      s += `<circle cx="${f(cu.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#8ccbff" stroke-width="5" opacity="${f(.45 * ob)}" filter="url(#gfc-soft)"/>` +
        `<circle cx="${f(cu.x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#fff6e0" stroke-width="2" opacity="${f(.85 * ob)}"/>`;
    }
    return s;
  }

  /* ---------------- слово: БЕСПОРЯДОК вразброс → ровно в плашке → ЭНТРОПИЯ ↑ (на месте заголовка) ---------------- */
  const W1 = 'БЕСПОРЯДОК', W2 = 'ЭНТРОПИЯ', WC = [180, 92], S1 = 27, S2 = 32, GAP = 2.4, W800 = 1.035;
  // середины букв от центра слова (Montserrat 800: таблица GFC.textW (700) × 1,035)
  function slotsOf(w, size) {
    const A = [...w].map(ch => GFC.textW(ch, size) * W800 + GAP), T = A.reduce((a, b) => a + b, 0);
    let x = -T / 2;
    return { T, X: A.map(a => { const m = x + a / 2; x += a; return m; }) };
  }
  function glyph(x, y, ch, size, rot, sy, op, glow, color, glowC) {
    if (op <= .003 || sy <= .003) return '';
    const tx = `<text x="0" y="${f(size * .36)}" font-family="${FF}" font-weight="800" font-size="${f(size)}" text-anchor="middle"`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(1 ${sy.toFixed(3)})" opacity="${f(op)}">` +
      (glow > .01 ? `${tx} fill="${glowC || color}" opacity="${f(Math.min(1, glow))}" filter="url(#gfc-glow3)">${ch}</text>` : '') +
      `${tx} fill="${color}" stroke="${INK}" stroke-width="3.8" stroke-linejoin="round" paint-order="stroke">${ch}</text></g>`;
  }
  const LETTER = k => PAL[GFC.CROWD[k % GFC.CROWD.length]][0];   // разноцветные буквы беспорядка
  function word(t, c) {
    if (t < c.bespor - .1) return '';
    const n1 = W1.length, n2 = W2.length, B = fogBase();
    const J = (1 + .6 * GFC.qq(t, c.rasse, c.rasse + .9)) * (1 - GFC.qq(t, c.fiz - .05, c.fiz + .55));
    const spread = 1 + .12 * GFC.qq(t, c.rasse, c.rasse + .9) * (1 - GFC.qq(t, c.fiz - .05, c.fiz + .55));
    const ph = TAU * GFC.qq(t, c.mix, c.mix + 1.5);
    const sw = GFC.qq(t, c.entr, c.entr + .45), grow = GFC.qq(t, c.rast - .1, c.rast + .7), S2g = S2 * (1 + .06 * grow);
    const flash = pulse(t, c.entr + .3, .2, .9);
    const L1 = slotsOf(W1, S1), L2 = slotsOf(W2, S2g);
    const wN = lerp(L1.T * spread, L2.T, sw) + 28, hN = S2 + 20;
    const app = GFC.q(t, c.bespor - .1, .5), box = GFC.qq(t, c.fiz + .1, c.fiz + .6);
    const white = GFC.qq(t, c.fiz - .05, c.fiz + .45);
    const rx = WC[0] - wN / 2, ry = WC[1] - hN / 2;
    let s = `<rect x="${f(rx - 6)}" y="${f(ry - 2)}" width="${f(wN + 12)}" height="${f(hN + 12)}" rx="18" fill="${INK}" opacity="${f(.5 * app)}" filter="url(#gfc-blur)"/>`;
    s += `<rect x="${f(rx)}" y="${f(ry)}" width="${f(wN)}" height="${f(hN)}" rx="14" fill="${INK}" opacity="${f(.45 * app + .3 * box)}"/>`;
    if (box > .003) {
      const a = `x="${f(rx)}" y="${f(ry)}" width="${f(wN)}" height="${f(hN)}" rx="14" fill="none" stroke="${GFC.mixC('#ffffff', GOLD, sw)}"`;
      s += `<rect ${a} stroke-width="5" opacity="${f((.25 + .5 * flash) * box)}" filter="url(#gfc-soft)"/><rect ${a} stroke-width="2" opacity="${f(.9 * box)}"/>`;
    }
    for (let k = 0; k < n1; k++) {
      const st = c.bespor - .15 + k * .03, a = GFC.qq(t, st, st + .35);
      if (a <= 0) continue;
      const slot = [WC[0] + L1.X[k] * spread, WC[1]];
      // вразброс, но читается: буквы скачут по высоте и наклонены; «перемешивается» — каждая описывает свой кружок
      const jx = 3 * Math.sin(ph + k * 2.1) * J, jy = ((k % 2 ? 1 : -1) * 6 + (H(k * 5 + 2) - .5) * 6) * J + 5 * Math.cos(ph + k * 2.1) * J * Math.sign(ph);
      const src = B[(k * 89 + 31) % B.length];
      const x = lerp(src[0], slot[0] + jx, a), y = lerp(src[1], slot[1] + jy, a);
      const out = 1 - GFC.qq(t, c.entr - .05 + k * .03, c.entr + .13 + k * .03);
      const col = GFC.mixC(LETTER(k), '#ffffff', white);
      s += glyph(x, y, W1[k], S1 * (.4 + .6 * a), (H(k * 7 + 3) - .5) * 36 * J * a, out, Math.min(1, a * 1.4), .4 + .5 * pulse(t, st + .3, .1, .4), col);
    }
    if (t > c.entr) for (let k = 0; k < n2; k++) {
      const sy = GFC.qq(t, c.entr + .1 + k * .04, c.entr + .3 + k * .04);
      s += glyph(WC[0] + L2.X[k], WC[1], W2[k], S2g, 0, sy, 1, .55 + .7 * flash, GOLD, '#ffa040');
    }
    // «Сам собой» — справа золотая стрелка вверх; «растёт» — она вырастает
    const ar = GFC.q(t, c.sam - .05, .5);
    if (ar > .003) {
      const x = WC[0] + wN / 2 + 16, yb = WC[1] + 16, yt = yb - 22 - 24 * grow;
      const d = `M${f(x)} ${f(yb)}L${f(x)} ${f(yt)}M${f(x - 8)} ${f(yt + 9)}L${f(x)} ${f(yt)}L${f(x + 8)} ${f(yt + 9)}`;
      s += `<g opacity="${f(ar)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="${INK}" stroke-width="8" opacity=".8"/>` +
        `<path d="${d}" stroke="#ffa040" stroke-width="7" opacity="${f(.4 + .3 * grow)}" filter="url(#gfc-glow3)"/><path d="${d}" stroke="${GOLD}" stroke-width="3.4"/></g>`;
    }
    return s;
  }

  // градусник: цветной значок (GFC.node, коралл → небо, ртуть опускается) и белая плашка с градусами; тепло уходит,
  // градусы падают с «остывает» до «беспорядок»; там гаснет (дальше — слово)
  function chip(t, c) {
    const op = GFC.q(t, c.ost - .1, .4) * GFC.out(t, c.bespor - .15, .45);
    if (op <= .003) return '';
    const cool = GFC.qq(t, c.ost, c.bespor), deg = Math.round(lerp(80, 22, cool));
    const col = GFC.mixC('#ff8a4a', '#4c8dff', cool), node = GFC.mixC(PAL[0][1], PAL[2][1], cool);
    const lv = lerp(-6.8, 1.6, cool);
    const thermo = (ink, dark) => `<rect x="-3.4" y="-10" width="6.8" height="15" rx="3.4" fill="${ink}"/><circle cy="5.4" r="5.4" fill="${ink}"/>` +
      `<rect x="-1.5" y="${f(lv)}" width="3" height="${f(6 - lv)}" rx="1.5" fill="${dark}"/><circle cy="5.4" r="3.4" fill="${dark}"/>`;
    const x0 = 22, y0 = 150, pw = 62, ph = 28;
    let s = `<rect x="${x0 + 14}" y="${f(y0 - ph / 2 + 2.5)}" width="${pw}" height="${ph}" rx="${ph / 2}" fill="${INK}" opacity=".45"/>` +
      `<rect x="${x0 + 14}" y="${f(y0 - ph / 2)}" width="${pw}" height="${ph}" rx="${ph / 2}" fill="#fff" opacity=".97"/>`;
    s += GFC.mono(x0 + 14 + pw / 2 + 8, y0 + 6.2, `${deg}°`, { size: 17, anchor: 'middle', color: col, shadow: 0, ls: 0, opacity: 1, grow: false, weight: 800 });
    s += GFC.node(x0 + 6, y0, 17, thermo, { color: node, scale: .7 + .3 * GFC.q(t, c.ost - .1, .4) });
    return `<g opacity="${f(op)}">${s}</g>`;
  }

  /* ---------------- сцена ---------------- */
  function body(t, K) {
    const c = cues(K), C = cam(t, c), cu = cupAt(t, c, C);
    const heat = 1 - GFC.qq(t, c.ost, c.rasse);
    const crowd = 1 - clamp((C.E - .78) / .2);
    const hands = 1 - GFC.qq(t, c.komn, c.komn + 1);
    const cop = 1 - .5 * GFC.qq(t, c.sam, c.rast + .5);
    const sauc = GFC.qq(t, c.komn + .2, c.komn + 1.1);
    const V = vapor(t, c);
    let s = DEFS;
    if (crowd > .003) s += `<g opacity="${f(crowd)}">${GFC.zoom(fireWorld(t, c, C), C.cw.x, C.cw.y, C.Z, C.tx, C.ty)}</g>`;
    s += rings(t, c, cu) + V.land + table(t, c, cu);
    s += cupSvg(cu, t, heat, cop, sauc) + handsSvg(cu, t, hands);
    s += V.fly + word(t, c) + chip(t, c) + headlines(t, c);
    return s;
  }
  SCENES.gfc_tea = GFC.scene('gfc_tea', (t, K, mode, p) => body(t, K));
  // туман конца a02 для gfc_body (a03): те же точки (с вихрем «перемешивается»), те же цвета, та же яркость
  SCENES.gfc_tea.fog = Object.freeze({ n: FOG.n, op: FOG.op, r: FOG.r, glow: FOG.glow, pts: fogPts,
    color: i => COOL[fogCol(i)], alpha: i => fogAlpha()[i] });
  // огонь порядка с лучами — его же ставит gfc_body над головой на «Ответ… к богам» (рифма с первым кадром)
  SCENES.gfc_tea.fire = fire;
})();
