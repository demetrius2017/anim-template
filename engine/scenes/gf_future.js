/* gf_future — «Бог ещё не создан», часть 2 из 3 «От мести к милосердию» (eps/god_future_p2), фраза d12 — конец части.
 * Раскадровка — eps/god_future/source/storyboard_3parts.md (строка d12), стиль — source/storyboard.md; текст — source/text_v21.md
 * (ч. 2, 12: «А что если Бога — того, кто дал заповеди и видит наши мысли и поступки, — не было в прошлом? Тогда, может
 * быть, мы строим Его в будущем. Как — в третьей части.»); словарь — gf_00_lib.js (window.GF).
 * Уроки слепого просмотра v1–v2: на телефоне сцена ужата в .72 — главный объект на всю ширину (линия времени x 24→336
 * на y 300, как gf_line v2), линии ≥ 1,3, подписи моно ≥ 13, точки крупные; новое событие каждые 0,5–1,5 с на слове; ни одного
 * отрезка ≥ 3 с без нового; под карточкой ЧАСТЬ 3 рисунок живёт (ячейки собираются и летят в контур, по линии бегут огни).
 * Лиц нет: люди — облака точек ростом 120 (свой walker по формуле GF.personPts: шаг ногами, руки вверх с ношей).
 * Бога не рисуем: «Бог в прошлом» — огонь порядка (как «Бог — в начале» в gf_line); заповеди — две скруглённые плиты,
 * их не ломаем и не убираем (на «не было» они только тише). Красного нет. Плашку ВЗГЛЯД АВТОРА ставит story.py (VIEWS).
 *
 * Одна непрерывная линия от t: картинка зависит только от t и K, mode — лишь имя кадра (future). Вход — наплыв 0,5 с
 * из gf_build/build (его делает GF.scene).
 *  «А (что если)»  линия времени прорисовывается слева направо (подписи ПРОШЛОЕ · БУДУЩЕЕ, моно 14, — когда уйдёт
 *               плашка ВЗГЛЯД АВТОРА: она лежит прямо на них, 3 с от «что»); проявляются трое людей у
 *               середины линии, каждый держит над головой то, что построили (d11): СУД (здание с колоннами), светящуюся
 *               соту, БОЛЬНИЦУ (здание с белым «+», не красный крест); подписи СУД · БОЛЬНИЦА (моно 13).
 *  «Бога»       огонь порядка падает сверху по лучу в начало линии (над ПРОШЛЫМ), садится со вспышкой и волной;
 *  «дал»        от огня вниз бежит свет; «заповеди» — под огнём встают две скруглённые плиты, печатается ЗАПОВЕДИ;
 *  «видит»      от огня к головам людей тянутся нити, по ним бегут огоньки; «мысли» — в головах тёплый свет;
 *               «поступки» — ноша каждого (суд, сота, больница) вспыхивает;
 *  «не (было)»  огонь гаснет и оставляет пунктирный контур, нити гаснут, плиты и подпись тише; «прошлом» — пунктир гаснет,
 *               начало линии пусто, на его месте крупный «?» (моно 64);
 *  «Тогда»      «?» гаснет, по линии из прошлого в конец бежит огонёк; «может» — в конце линии крупный пустой пунктирный
 *               контур огня (r 38) с пустыми гнёздами, волна; дальше по линии в контур всё время бегут огни;
 *  «мы строим»  люди идут к контуру; «Его» — больница летит в центральное гнездо (вспышка, волна, в гнезде «+»);
 *               «будущем» — сота в гнездо; «Как» — суд в гнездо (в гнезде — маленький фронтон);
 *  «третьей»    контур вспыхивает волной, весь рисунок плавно уменьшается и поднимается над местом карточки (×0,85, линия
 *               y 300 → 184, до K.card + 0,5); «части» — ещё волна.
 *  карточка     (K.card, ставит story.py, ≈3,5–4 с) — рисунок над ней тихо живёт: каждые 1,2 с у одного из людей над
 *               головой из точек собирается новая сота и летит в своё гнездо (вспышка, волна); одно гнездо остаётся
 *               пустым — Бог ещё не создан; контур дышит, по линии бегут огни.
 * Слова-основы GF.w (сверены с build/words.json озвучки 05.11): d12 — что, бога, дал, заповед, видит, мысли, поступк, не,
 *   прошл, тогда, может, мы (n=1: 0-е — «мысли»), строим, его, будущ, как, треть, част. Нет слова — доля фразы.
 * Параметры p: s (фраза), mode, K (cues части), prev/prev_mode (наплыв — GF.scene). Камера движка нейтральна.
 * Важное — в y=20..345 (низ кадра пуст под субтитры). Кадр ≤ ~1500 элементов. Своих id в SVG нет.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const PI2 = Math.PI * 2;
  const H = n => GF.hash(n);
  const { q, qq, lerp, clamp } = GF;
  // the timeline on the whole width (as gf_line v2): arrow y 280, x 24→336; labels under it (mono 14)
  const LY = 300, LX0 = 24, LX1 = 336, LAB = 14;
  // the big empty contour of the fire at the end of the line; БУДУЩЕЕ ends before it
  const EX = 296, ER = 38, FUTX = EX - ER - 8;
  const IR = ER * .58, IH = ER * .315;
  const NEST = [[0, 0], ...[0, 1, 2, 3, 4, 5].map(k => [IR * Math.cos(Math.PI / 3 * k), IR * Math.sin(Math.PI / 3 * k)])];
  // the past: the fire of order over the start of the line, the tablets under it (bottom on the line)
  const FX = 56, FY = 100, FR = 12, TBX = 56, TBY = LY - 3, LABY = LY - 49;
  // three people at the middle of the line, each holds overhead what was built: court · cell · hospital
  const PH = 120, PX = [116, 168, 220], SEED = [3, 11, 17], WALK = 8, PR = 1.5, LS = 1.15;
  const HEADY = LY - 109, CELLY = LY - 154;
  const KIND = ['court', 'cell', 'hosp'];
  // camera on «третьей части»: the picture shrinks and rises above the card (card ≈ scene y 222..306)
  const CZ = .85, CTY = 184;
  // draft phrase bounds only for scene_test without K (real proportions of the voice of 05.11)
  const DEF = [0, 9.25];

  const span = K => K.d12 != null ? [K.d12, K.d12_end != null ? K.d12_end : K.d12 + DEF[1]] : DEF;
  const hasW = (K, stem, n) => {
    const ws = (K.words && K.words.d12) || [], s = GF.bare(stem);
    return ws.filter(w => GF.bare(w.w).startsWith(s)).length > n;
  };
  const pulse = (t, a, up, down) => qq(t, a, a + up) * (1 - qq(t, a + up, a + up + down));
  const wave = (t, starts) => { let v = 0; for (const a of starts) if (t >= a) v = qq(t, a, a + 1.1); return v; };

  function cues(K) {
    const [s, e] = span(K), c = { s, e };
    const W = (stem, share, n = 0) => hasW(K, stem, n) ? GF.w(K, 'd12', stem, n) : s + share * (e - s);
    c.view = W('что', .015); c.bog = W('бога', .063); c.dal = W('дал', .191); c.zap = W('заповед', .212); c.vid = W('видит', .287);
    c.mysl = W('мысли', .338); c.post = W('поступк', .379); c.ne = W('не', .456); c.prosh = W('прошл', .504);
    c.togda = W('тогда', .55); c.mozh = W('может', .6); c.my = W('мы', .644, 1); c.str = W('строим', .657);
    c.ego = W('его', .695); c.bud = W('будущ', .725); c.kak = W('как', .785); c.tret = W('треть', .854);
    c.chast = W('част', .887);
    c.card = K.card != null ? K.card : e;
    c.land = c.bog + .45;
    // when each person lets the load go into the contour: hospital on «Его», cell on «будущем», court on «Как»
    c.rel = [c.kak, Math.max(c.bud, c.ego + .25), c.ego];
    // under the card: each person gathers a new cell of dots and sends it into its nest, one every 1.2 s
    c.gat = [0, 1, 2].map(k => c.card + .25 + 1.2 * k);
    c.fly2 = c.gat.map(a => a + .7);
    return c;
  }
  const SLOT1 = [5, 4, 0], SLOT2 = [6, 1, 3];         // nests: first loads, then the cells gathered under the card
  const ICON = { 0: 'hosp', 5: 'court' };              // a small sign stays in the nest of the hospital and of the court

  /* ---------------- drawings ---------------- */
  function tline(t, rev, lab) {
    if (rev <= .003) return '';
    let s = `<g stroke="#fff" fill="none" stroke-linecap="round"><line x1="${LX0}" y1="${LY}" x2="${LX1}" y2="${LY}" stroke-width="2.2" opacity=".92"/>` +
      `<line x1="${LX0}" y1="${LY}" x2="${LX1}" y2="${LY}" stroke-width="6" opacity=".2" filter="url(#un-soft)"/>` +
      `<path d="M${LX1 - 13} ${LY - 7} L${LX1} ${LY} L${LX1 - 13} ${LY + 7}" stroke-width="2.2" opacity=".95"/></g>`;
    for (let i = 0; i <= 12; i++) {
      const x = lerp(LX0 + 6, LX1 - 16, i / 12);
      s += `<line x1="${f(x)}" x2="${f(x)}" y1="${LY - 6}" y2="${LY + 6}" stroke="#fff" stroke-width="1.3" opacity=".55"/>`;
    }
    if (lab > .003) s += GF.mono(LX0, LY + 27, 'ПРОШЛОЕ', { size: LAB, anchor: 'start', opacity: .92 * lab }) +
      GF.mono(FUTX, LY + 27, 'БУДУЩЕЕ', { size: LAB, anchor: 'end', opacity: .92 * lab });
    // a light of time flowing along the line
    const u = ((t / 3.8) % 1 + 1) % 1, x = lerp(LX0 + 10, LX1 - 10, u);
    s += `<circle cx="${f(x)}" cy="${LY}" r="3.4" fill="#fff" opacity="${f(.7 * Math.sin(Math.PI * u))}" filter="url(#un-soft)"/>`;
    if (rev >= .999) return s;
    const w = lerp(LX0 - 18, 352, rev);
    return `<defs><clipPath id="gff-rev"><rect x="-10" y="0" width="${f(w + 10)}" height="640"/></clipPath></defs>` +
      `<g clip-path="url(#gff-rev)">${s}</g><circle cx="${f(Math.min(w, LX1))}" cy="${LY}" r="4" fill="#fff" opacity="${f(.95 * (1 - rev))}" filter="url(#un-soft)"/>`;
  }
  // lights running along the line from the past into the contour
  function flow(t, n, period, op) {
    if (op <= .003) return '';
    let s = '';
    for (let k = 0; k < n; k++) {
      const u = (((t / period) + k / n) % 1 + 1) % 1, a = op * Math.sin(Math.PI * u);
      for (let j = 0; j < 4; j++) {
        const x = lerp(LX0 + 8, EX - ER - 2, clamp(u - j * .02));
        s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4 - j * .6)}" fill="#fff" opacity="${f(a * (1 - j / 4))}"/>`;
      }
    }
    return `<g filter="url(#un-soft)">${s}</g>${s}`;
  }
  function comet(u, x0) {
    if (u <= 0 || u >= 1) return '';
    let s = '';
    for (let k = 0; k < 9; k++) {
      const x = lerp(x0, EX - ER, clamp(u - k * .025));
      s += `<circle cx="${f(x)}" cy="${LY}" r="${f(4.4 - k * .38)}" fill="#fff" opacity="${f((1 - k / 9) * .95 * Math.sin(Math.PI * u))}"/>`;
    }
    return `<g filter="url(#un-soft)">${s}</g>${s}`;
  }
  // small signs: the hospital «+» and the court front (inside a nest or on a load)
  function sign(kind, x, y, s, op) {
    if (op <= .003) return '';
    if (kind === 'hosp') return `<g opacity="${f(op)}" fill="#fff"><rect x="${f(x - 1.6 * s)}" y="${f(y - 5 * s)}" width="${f(3.2 * s)}" height="${f(10 * s)}"/>` +
      `<rect x="${f(x - 5 * s)}" y="${f(y - 1.6 * s)}" width="${f(10 * s)}" height="${f(3.2 * s)}"/></g>`;
    return `<g opacity="${f(op)}" stroke="#fff" fill="none" stroke-width="${f(1.1 * s)}" stroke-linejoin="round"><path d="M${f(x - 6 * s)} ${f(y - 2 * s)} L${f(x)} ${f(y - 6 * s)} L${f(x + 6 * s)} ${f(y - 2 * s)} Z"/>` +
      [-4, 0, 4].map(dx => `<line x1="${f(x + dx * s)}" x2="${f(x + dx * s)}" y1="${f(y - 1 * s)}" y2="${f(y + 4.5 * s)}"/>`).join('') +
      `<line x1="${f(x - 6.5 * s)}" x2="${f(x + 6.5 * s)}" y1="${f(y + 5.5 * s)}" y2="${f(y + 5.5 * s)}"/></g>`;
  }
  // the empty dashed contour of the fire: bright 0..1; cells — brightness of the 7 nests (centre first);
  // slots — faint dashed empty nests; ring — wave 0..1
  function contour(t, op, bright, cells, ring, slots, breath = .05) {
    if (op <= .003) return '';
    const br = 1 + breath * Math.sin(t * 2.3), r = ER * br, dash = 'stroke-dasharray="7 5"';
    let s = `<circle cx="${EX}" cy="${LY}" r="${f(r * 2.6)}" fill="url(#gf-warm)" opacity="${f(.18 + .45 * bright)}"/>` +
      `<circle cx="${EX}" cy="${LY}" r="${f(r - 1)}" fill="#000" opacity=".88"/>`;
    s += `<circle cx="${EX}" cy="${LY}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="5" ${dash} ` +
      `stroke-dashoffset="${f(-t * 4)}" opacity="${f(.25 + .4 * bright)}" filter="url(#un-soft)"/>`;
    s += `<circle cx="${EX}" cy="${LY}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="2.4" ${dash} ` +
      `stroke-dashoffset="${f(-t * 4)}" opacity="${f(.78 + .22 * bright)}"/>`;
    NEST.forEach(([dx, dy], k) => {
      const l = cells[k] || 0, x = EX + dx, y = LY + dy;
      if (slots > .003 && l < .98) {
        const V = [0, 1, 2, 3, 4, 5].map(j => { const a = Math.PI / 3 * j - Math.PI / 2; return [x + IH * Math.cos(a), y + IH * Math.sin(a)]; });
        const breathe = .75 + .25 * Math.sin(t * 2.6 + k);
        s += `<path d="M${V.map(v => `${f(v[0])} ${f(v[1])}`).join(' L')} Z" fill="none" stroke="#fff" stroke-width="1.3" stroke-dasharray="2.4 2.2" opacity="${f(.6 * slots * (1 - l) * breathe)}"/>`;
      }
      if (l <= .003) return;
      s += GF.hex(x, y, IH, { op: .97 * l, w: 1.7, fill: `rgba(255,255,255,${f(.26 * l)})` }) + GF.hex(x, y, IH, { op: .6 * l, w: 3.4, glow: true });
      if (ICON[k]) s += sign(ICON[k], x, y + (ICON[k] === 'court' ? -.5 : 0), .8, l);
    });
    if (ring > .003 && ring < 1) s += `<circle cx="${EX}" cy="${LY}" r="${f(ER + 50 * ring)}" fill="none" stroke="#fff" stroke-width="1.9" opacity="${f(.85 * (1 - ring))}"/>`;
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // the fire of order: GF.spark + a beam from above while it falls (beam 0..1) and a wave when it lands (ring 0..1)
  function fire(x, y, r, op, t, beam, ring) {
    let s = '';
    if (beam > .003) {
      s += `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#fff6e0" stroke-width="9" opacity="${f(.25 * beam)}" filter="url(#un-soft)"/>` +
        `<line x1="${f(x)}" y1="-10" x2="${f(x)}" y2="${f(y)}" stroke="#fff" stroke-width="1.8" opacity="${f(.8 * beam)}"/>`;
      for (let k = 1; k < 8; k++) s += `<circle cx="${f(x)}" cy="${f(y - k * 8)}" r="${f(3.8 - k * .4)}" fill="#fff" opacity="${f(.6 * beam * (1 - k / 8))}" filter="url(#un-soft)"/>`;
    }
    s += GF.spark(x, y, r, { t, op });
    if (ring > .003 && ring < 1) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r + 46 * ring)}" fill="none" stroke="#fff" stroke-width="1.8" opacity="${f(.85 * (1 - ring) * op)}"/>`;
    return s;
  }
  // the commandments: two plates with rounded tops side by side (bottom on the line), lines of text inside
  function tablets(x, by, op, glow) {
    if (op <= .003) return '';
    const w = 23, h = 37, r = w / 2;
    let s = '';
    for (const x0 of [x - w - 2, x + 2]) {
      const d = `M${f(x0)} ${f(by)} L${f(x0)} ${f(by - h + r)} A${r} ${r} 0 0 1 ${f(x0 + w)} ${f(by - h + r)} L${f(x0 + w)} ${f(by)} Z`;
      s += `<path d="${d}" fill="rgba(255,255,255,${f(.08 + .1 * glow)})" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" opacity=".95"/>`;
      if (glow > .003) s += `<path d="${d}" fill="none" stroke="#fff6e0" stroke-width="4" opacity="${f(.45 * glow)}" filter="url(#un-soft)"/>`;
      for (let i = 0; i < 3; i++) s += `<line x1="${f(x0 + 4)}" x2="${f(x0 + w - 4)}" y1="${f(by - h + r + 4 + i * 7)}" y2="${f(by - h + r + 4 + i * 7)}" stroke="#fff" stroke-width="1.2" opacity=".7"/>`;
    }
    return `<g opacity="${f(op)}">${s}</g>`;
  }
  // a glowing cell (centre x,y)
  function cell(x, y, r, op, t, glow = 0) {
    if (op <= .003) return '';
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * (2.6 + glow))}" fill="url(#gf-warm)" opacity="${f(.8 + .2 * glow)}"/>` +
      GF.hex(x, y, r, { op: .97, w: 1.8, fill: `rgba(255,255,255,${f(.26 + .05 * Math.sin(t * 3) + .2 * glow)})` }) +
      GF.hex(x, y, r, { op: .6 + .4 * glow, w: 3.4, glow: true }) + '</g>';
  }
  // the court: a front with columns (centre x,y; height 34·s)
  function court(x, y, s, op, glow) {
    if (op <= .003) return '';
    const by = y + 17 * s;
    let g = `<path d="M${f(x - 21 * s)} ${f(by - 24 * s)} L${f(x)} ${f(by - 34 * s)} L${f(x + 21 * s)} ${f(by - 24 * s)} Z" fill="rgba(255,255,255,.1)"/>` +
      `<line x1="${f(x - 19 * s)}" x2="${f(x + 19 * s)}" y1="${f(by - 21.5 * s)}" y2="${f(by - 21.5 * s)}"/>` +
      [-13.5, -4.5, 4.5, 13.5].map(dx => `<line x1="${f(x + dx * s)}" x2="${f(x + dx * s)}" y1="${f(by - 19 * s)}" y2="${f(by - 4 * s)}" stroke-width="${f(2.6 * s)}"/>`).join('') +
      `<line x1="${f(x - 19 * s)}" x2="${f(x + 19 * s)}" y1="${f(by - 2.5 * s)}" y2="${f(by - 2.5 * s)}"/>` +
      `<line x1="${f(x - 22 * s)}" x2="${f(x + 22 * s)}" y1="${f(by)}" y2="${f(by)}"/>`;
    const st = `stroke="#fff" fill="none" stroke-width="${f(1.7 * s)}" stroke-linecap="round" stroke-linejoin="round"`;
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(34 * s)}" fill="url(#gf-warm)" opacity="${f(.55 + .45 * glow)}"/>` +
      (glow > .003 ? `<g ${st} opacity="${f(.6 * glow)}" filter="url(#un-soft)" stroke-width="${f(4 * s)}">${g}</g>` : '') + `<g ${st}>${g}</g></g>`;
  }
  // the hospital: a house with a white «+» on the front (not a red cross); centre x,y, height 30·s
  function hosp(x, y, s, op, glow) {
    if (op <= .003) return '';
    const by = y + 15 * s;
    const g = `<path d="M${f(x - 18 * s)} ${f(by)} L${f(x - 18 * s)} ${f(by - 27 * s)} L${f(x + 18 * s)} ${f(by - 27 * s)} L${f(x + 18 * s)} ${f(by)} Z" fill="rgba(255,255,255,.08)"/>` +
      `<line x1="${f(x - 20 * s)}" x2="${f(x + 20 * s)}" y1="${f(by - 29 * s)}" y2="${f(by - 29 * s)}"/>` +
      `<path d="M${f(x - 3.5 * s)} ${f(by)} L${f(x - 3.5 * s)} ${f(by - 7 * s)} L${f(x + 3.5 * s)} ${f(by - 7 * s)} L${f(x + 3.5 * s)} ${f(by)}"/>`;
    const st = `stroke="#fff" fill="none" stroke-width="${f(1.7 * s)}" stroke-linecap="round" stroke-linejoin="round"`;
    return `<g opacity="${f(op)}"><circle cx="${f(x)}" cy="${f(y)}" r="${f(32 * s)}" fill="url(#gf-warm)" opacity="${f(.55 + .45 * glow)}"/>` +
      (glow > .003 ? `<g ${st} opacity="${f(.6 * glow)}" filter="url(#un-soft)" stroke-width="${f(4 * s)}">${g}</g>` : '') + `<g ${st}>${g}</g>` +
      sign('hosp', x, by - 16.5 * s, 1.15 * s, 1) + '</g>';
  }
  function load(kind, x, y, s, op, t, glow) {
    if (kind === 'court') return court(x, y, s, op, glow);
    if (kind === 'hosp') return hosp(x, y, s, op, glow);
    return cell(x, y, 13 * s, op, t, glow);
  }
  // a load flying from a to b along a raised arc (u 0..1), shrinking into the nest
  function flyLoad(kind, a, b, u, op, t, lift = 34) {
    if (u <= 0 || u >= 1 || op <= .003) return '';
    const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u) - Math.sin(Math.PI * u) * lift;
    const s = kind === 'cell' ? lerp(LS, IH / 13 * .9, u) : lerp(LS, .42, u);
    return load(kind, x, y, s, op * (1 - qq(u, .9, 1)), t, .4 * Math.sin(Math.PI * u));
  }
  // a person of dots (formula of GF.personPts): ph — step phase, amp — stride 0..1, up 0..1 — arms raised
  function walker(cx, gy, h, n, seed, ph, amp, up, t) {
    const P = [], s = h / 100, lift = [Math.max(0, Math.sin(ph)) * amp, Math.max(0, -Math.sin(ph)) * amp];
    const bob = -1.2 * s * Math.abs(Math.sin(ph)) * amp;
    for (let i = 0; i < n; i++) {
      const a = H(seed * 31 + i * 1.7), b = H(seed * 53 + i * 2.9), c = H(seed * 71 + i * 4.3);
      let x, y;
      if (i < n * .14) { const r = 7.2 * Math.sqrt(a), th = b * PI2; x = r * Math.cos(th); y = -91 + r * 1.12 * Math.sin(th); }
      else if (i < n * .50) { y = -80 + a * 34; const wdt = 10.5 - Math.abs(y + 66) * .05; x = (b * 2 - 1) * wdt; }
      else if (i < n * .72) {
        const side = c < .5 ? -1 : 1, u = a;
        const dx = lerp(6.5, -3.5, up) * u, dy = lerp(31, -34, up) * u;
        x = side * (11 + dx) + (b - .5) * 2.6; y = -78 + dy + (b - .5) * 2;
      } else {
        const side = c < .5 ? -1 : 1, u = a;
        x = side * (3.2 + u * 2.6) + (b - .5) * 3.4; y = -46 + u * 46 - 9 * lift[side < 0 ? 0 : 1] * u;
      }
      P.push([cx + x * s, gy + y * s + bob]);
    }
    return GF.dots(GF.jitter(P, t, .3, seed), { r: PR, op: .95, t, glow: .5 });
  }
  // a thread of light from the fire down to a head, lights run along it towards the person
  function ray(a, b, op, t, k) {
    if (op <= .003) return '';
    let s = `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#fff6e0" stroke-width="5" opacity="${f(.18 * op)}" filter="url(#un-soft)"/>` +
      `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#fff" stroke-width="1.4" opacity="${f(.6 * op)}"/>`;
    for (let j = 0; j < 2; j++) {
      const u = ((t * .8 + k * .31 + j * .5) % 1 + 1) % 1;
      s += `<circle cx="${f(lerp(a[0], b[0], u))}" cy="${f(lerp(a[1], b[1], u))}" r="2.8" fill="#fff" opacity="${f(.9 * op * Math.sin(Math.PI * u))}" filter="url(#un-soft)"/>`;
    }
    return s;
  }
  // a new cell gathering from dots over a head (g 0..1)
  const GSRC = Array.from({ length: 22 }, (_, i) => { const a = H(i * 7 + 501) * PI2, r = 26 + 22 * H(i * 3 + 77); return [r * Math.cos(a), r * .8 * Math.sin(a)]; });
  const GDST = Array.from({ length: 22 }, (_, i) => {
    const k = Math.floor(i / 2) % 6, a = Math.PI / 3 * k - Math.PI / 2, a2 = a + Math.PI / 3, r = 13;
    return i % 2 ? [r * (Math.cos(a) + Math.cos(a2)) / 2, r * (Math.sin(a) + Math.sin(a2)) / 2] : [r * Math.cos(a), r * Math.sin(a)];
  });
  function gather(x, y, g, t, seed) {
    if (g <= .003) return '';
    const P = GF.morph(GSRC.map(p => [x + p[0], y + p[1]]), GDST.map(p => [x + p[0], y + p[1]]), g, t, { spread: .4, amp: 2, bend: 18, seed });
    return GF.dots(P, { r: 1.6, op: .95 * (1 - qq(g, .85, 1)), t, glow: .7, color: '#fff3dc' }) + cell(x, y, 13, qq(g, .75, 1), t, pulse(g, .85, .1, .1));
  }

  /* ---------------- the scene ---------------- */
  function body(t, K) {
    const c = cues(K);
    let s = '';
    // the timeline is drawn from the left at the very start; ПРОШЛОЕ · БУДУЩЕЕ — when the plaque ВЗГЛЯД АВТОРА (story.py,
    // 3 s from «что») is gone: it lies right over them
    s += tline(t, qq(t, c.s - .12, c.s + .7), q(t, c.view + 2.9, .4));
    // the past: the fire falls on «Бога»; goes out into a dashed ring on «не было», the ring fades on «прошлом»
    const gone = qq(t, c.ne - .05, c.ne + .45);
    const fall = qq(t, c.bog - .1, c.land), fop = q(t, c.bog - .15, .25) * (1 - gone);
    const beam = q(t, c.bog - .15, .2) * (1 - qq(t, c.land - .05, c.land + .5));
    const fy = lerp(-30, FY, fall);
    if (fop > .003) s += fire(FX, fy, lerp(8, FR, fall) * (1 + .35 * pulse(t, c.land, .1, .6) + .2 * pulse(t, c.dal, .1, .5)), fop, t, beam, wave(t, [c.land, c.dal]));
    const ring = q(t, c.ne - .1, .3) * (1 - qq(t, c.prosh + .05, c.prosh + .6));
    if (ring > .003) {
      const r = FR * 1.7 * (1 + .04 * Math.sin(t * 3));
      s += `<circle cx="${FX}" cy="${FY}" r="${f(r)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-dasharray="5 4" stroke-dashoffset="${f(-t * 4)}" opacity="${f(.9 * ring)}"/>`;
    }
    // «дал» — a light runs down from the fire; «заповеди» — the two plates rise under it, ЗАПОВЕДИ is typed
    const dl = qq(t, c.dal - .05, c.zap + .15);
    if (dl > 0 && dl < 1) s += `<circle cx="${FX}" cy="${f(lerp(FY + 14, TBY - 30, dl))}" r="3.6" fill="#fff" opacity="${f(.95 * Math.sin(Math.PI * dl))}" filter="url(#un-soft)"/>`;
    const tq = q(t, c.zap - .1, .4), tdim = 1 - .5 * qq(t, c.ne, c.ne + .6);
    if (tq > .003) s += GF.zoom(tablets(TBX, TBY, tq * tdim, pulse(t, c.zap, .15, .8) + .4 * (1 - gone)), TBX, TBY, .6 + .4 * tq);
    if (t >= c.zap - .05) s += `<g opacity="${f(1 - .8 * qq(t, c.ne, c.ne + .6))}">${GF.typed(TBX, LABY, 'ЗАПОВЕДИ', t, c.zap - .05, { size: 13, cps: 26, glow: true })}</g>`;
    // the people: there from the start (they built courts and hospitals — d11); walk to the contour on «строим»
    const pop = q(t, c.s - .1, .45);
    const wu = clamp((t - (c.str - .1)) / 1.5), amp = Math.sqrt(Math.sin(Math.PI * wu));
    const xs = PX.map(x => x + WALK * GF.ease(wu));
    // «видит» — threads from the fire to the heads; «мысли» — warm light in the heads; «поступки» — the loads flash
    const rop = q(t, c.vid - .05, .35) * (1 - gone);
    const hop = q(t, c.mysl - .05, .3) * (1 - gone) + .6 * pulse(t, c.mysl, .1, .6) * (1 - gone);
    const deed = pulse(t, c.post - .05, .15, 1) + .35 * q(t, c.post, .4) * (1 - qq(t, c.ne, c.ne + .6));
    for (let k = 0; k < 3; k++) s += ray([FX, FY], [xs[k], HEADY], rop, t, k);
    // the contour at the end: on «может»; «Тогда» — a light runs from the past into the end first
    s += comet(qq(t, c.togda - .05, c.togda + .75), LX0 + 6);
    const cop = q(t, c.mozh - .15, .4);
    s += flow(t, 3, 2.4, .85 * cop);
    const dock = k => c.rel[k] + .5, dock2 = k => c.fly2[k] + .55;
    const cells = [0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < 3; k++) { cells[SLOT1[k]] = q(t, dock(k), .25); cells[SLOT2[k]] = q(t, dock2(k), .25); }
    const hits = [c.mozh, ...[0, 1, 2].map(dock), c.tret, c.chast, ...[0, 1, 2].map(dock2)];
    let bright = .2 + .12 * (.5 + .5 * Math.sin(t * 3.1)) + .5 * pulse(t, c.mozh, .1, .8) + .25 * q(t, c.ego, 1) +
      .6 * (pulse(t, c.tret, .1, .7) + pulse(t, c.chast, .1, .7));
    for (let k = 0; k < 3; k++) bright += .55 * (pulse(t, dock(k), .1, .8) + pulse(t, dock2(k), .1, .8));
    s += contour(t, cop, clamp(bright), cells, wave(t, hits), q(t, c.mozh + .2, .5));
    for (let k = 0; k < 3; k++) {
      const x = xs[k], rel = c.rel[k], ph = (t - c.str) * 5.4 + k * 1.7;
      const d = qq(t, rel - .1, rel + .5), d2 = qq(t, c.fly2[k], c.fly2[k] + .55);
      const up = clamp((1 - qq(t, rel + .25, rel + .7)) + qq(t, c.gat[k] - .35, c.gat[k] + .1) * (1 - qq(t, c.fly2[k] + .2, c.fly2[k] + .6)));
      s += `<g opacity="${f(pop)}">${walker(x, LY - 1, PH, 250, SEED[k], ph, amp, up, t)}</g>`;
      // warm light in the head («мысли»)
      if (hop > .003) s += `<circle cx="${f(x)}" cy="${HEADY}" r="17" fill="url(#gf-warm)" opacity="${f(clamp(hop))}"/>` +
        `<circle cx="${f(x)}" cy="${HEADY}" r="${f(3.5 + 2 * clamp(hop))}" fill="#fff6e0" opacity="${f(.9 * clamp(hop))}" filter="url(#un-soft)"/>`;
      // the load overhead until it flies into its nest
      s += load(KIND[k], x, CELLY, LS, pop * (d > 0 ? 0 : 1), t, clamp(deed));
      s += flyLoad(KIND[k], [PX[k] + WALK * GF.ease(clamp((rel - .1 - (c.str - .1)) / 1.5)), CELLY], [EX + NEST[SLOT1[k]][0], LY + NEST[SLOT1[k]][1]], d, 1, t);
      // under the card: a new cell gathers from dots overhead and flies into its own nest
      s += gather(x, CELLY, qq(t, c.gat[k] - .1, c.gat[k] + .55) * (d2 > 0 ? 0 : 1), t, SEED[k]);
      s += flyLoad('cell', [x, CELLY], [EX + NEST[SLOT2[k]][0], LY + NEST[SLOT2[k]][1]], d2, 1, t, 30);
    }
    // labels of the loads: СУД · БОЛЬНИЦА, gone when the load flies
    const lab = (k, text) => `<g opacity="${f(pop * (1 - qq(t, c.rel[k] - .15, c.rel[k] + .15)))}">${GF.mono(xs[k], CELLY - 34, text, { size: 13, anchor: 'middle', opacity: .95 })}</g>`;
    s += lab(0, 'СУД') + lab(2, 'БОЛЬНИЦА');
    // «прошлом?» — a big «?» where the fire was; gone on «Тогда»
    const qm = q(t, c.prosh - .05, .25) * (1 - qq(t, c.togda + .2, c.togda + .7));
    if (qm > .003) {
      const z = 1 + .4 * (1 - qq(t, c.prosh - .05, c.prosh + .3));
      s += `<g opacity="${f(qm)}">${GF.zoom(GF.mono(FX, FY + 22, '?', { size: 64, anchor: 'middle', glow: true, opacity: .97 }), FX, FY, z)}</g>`;
    }
    // «третьей части»: the picture shrinks and rises above the card
    const L = qq(t, c.tret - .05, Math.max(c.tret + 1.2, c.card + .5));
    return L > .001 ? GF.zoom(s, 180, LY, lerp(1, CZ, L), 180, lerp(LY, CTY, L)) : s;
  }

  SCENES.gf_future = GF.scene('gf_future', (t, K, mode, p) => body(t, K || {}));
})();
