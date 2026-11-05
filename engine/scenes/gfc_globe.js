/* gfc_globe — «Бог ещё не создан», часть 2, альтернативный дизайн «Цветная инфографика» (eps/god_future_color_p2,
 * выбор владельца 05.11): перенос gf_globe.js (фразы b07–b11 текста v15, eps/god_future/source/text_v15.md) в словарь
 * window.GFC (gfc_00_lib.js), проход 2 по слепому просмотру v1 (eps/god_future/qa/blind_view_v1/summary.md, p2 Л1 к28–30
 * и Л2 к1–19) — тот же, что у gf_globe: те же события на тех же словах, та же геометрия кадра; меняется только рисунок.
 * Правило прохода (как gf_globe): на телефоне сцена ужата в .72 и стоит вверху — главный объект на всю ширину сцены,
 * линии ≥ 1,2 px, подписи ≥ 12 px на тёмных плашках-таблетках, точки крупнее; каждые 1,5–2,5 с — новое событие от слова.
 * Рисунок:
 *   шар из сот (сфера Голдберга, 162 ячейки) — плоские цветные плитки со светотенью: бирюза → небо → фиалка → орхидея по
 *     диагонали шара, внутри — тёмная сфера и огонь порядка GFC.spark; задние ячейки — бледные контуры; пустые — тёмные
 *     дыры с пунктиром;
 *   золото — только тёплое: пятна ЗНАНИЯ · ЭНЕРГИЯ · ЖИЗНЬ, соты-вклады сценок (b10), «свет» (b11), «ты» и твоя сота (b11);
 *   иконки — круглые цветные плашки с белым знаком: ЗНАНИЯ (книга), ЭНЕРГИЯ (молния), ЖИЗНЬ (росток) — золотые; НАУКА
 *     (атом) — небо, МЕДИЦИНА (плюс) — бирюза, СЕТЬ (узлы) — орхидея, ИИ (чип) — фиалка; машина b09 — ледяной голубой;
 *   люди — плоские фигуры GFC без лиц (руки поднимаются по одной); дети — голова в 1,6 раза крупнее, тело короче;
 *   нити — золотые; соты людей — цвета их одежды; подставка — золотая плитка; кирпичи — коралл; метла — золотая.
 * Красный GFC.RED — только бомба b09 и миг «взрыва» b11. Без лиц, религиозных фигур и символов, без брендов.
 * Крупную плашку «ВЗГЛЯД АВТОРА» ставит story.py (VIEWS на «назову» в b07) — своей подписи у сцены нет.
 *
 *  mind (b07)      начало — огонь разрастается в шар на всю ширину (центр 152→182, R 24→148), соты рождаются волной;
 *                  «машина» — контур экрана рассыпается точками; «убери фантастику» — звёзды уносятся от шара;
 *                  «разум» — по шару бегут сигналы между сотами (огоньки по рёбрам сети), в центре плашка РАЗУМ (22 px);
 *                  «миру рассыпаться» — налетает хаос и отскакивает от шара (искры); «знания», «энергией», «жизнь» —
 *                  по нити от РАЗУМ бежит огонёк к золотому пятну сот, на пятне крупная плашка-иконка (книга, молния,
 *                  росток) и подпись ЗНАНИЯ / ЭНЕРГИЯ / ЖИЗНЬ (15 px); «такой» — функции гаснут, «разум» — РАЗУМ
 *                  вспыхивает; «наш» — слева человек (96 px), «машинный» — справа крупный чип, нити к шару; «Богом» —
 *                  РАЗУМ гаснет, по шару волна света, вспышка обода.
 *  parts (b08)     начало — человек и чип гаснут; «частям» — шар распадается на 4 куска (четверти расходятся и тускнеют,
 *                  в щелях видно ядро); «собирают» — пунктир контура будущего шара; «наука», «медицина», «сети»,
 *                  «интеллект» — кусок за куском влетает на место (вспышка) и окрашивается в цвет своей плашки: НАУКА
 *                  (атом), МЕДИЦИНА (+), СЕТЬ (узлы), ИИ (чип); на «интеллект» шар целый, сигналы бегут снова.
 *  bomb (b09)      начало — иконки и цвета кусков гаснут (ИИ остаётся); «опасно» — плитки мигают вразнобой, хаос
 *                  подступает; «машина» — ИИ вспыхивает, шар ледяно синеет от его угла и заполняется рисунком чипа
 *                  (кристалл в центре, дорожки к ободу, по ним огоньки) — без роста; «философ» — шар поднимается и
 *                  уменьшается (место подписи и людям); «Бостром» — вверху «НИК БОСТРОМ · «СВЕРХРАЗУМ» · 2014»;
 *                  «сверхразумом» — холодный свет сильнее, сигналы быстрее, холодная волна от обода; «умнее нас» — внизу
 *                  четыре взрослых; «дети» — они становятся детьми (большая голова, короткое тело); «играющие» — между
 *                  ними красная круглая бомба с фитилём и искрой, дети подпрыгивают и тянутся к ней; «бомбой» — искра
 *                  вспыхивает, красное зарево вокруг бомбы (не на весь кадр).
 *  coauthors (b10) «Поэтому» — красного и холодного нет, бомба гаснет, дети вырастают во взрослых (92 px) и расходятся
 *                  в ряд, шар выше (R 92) и в нём проступают пустые ячейки (пунктир); «кто» — в центре человек на
 *                  золотой подставке; «избранных … нет» — подставка уходит, он вровень со всеми; «каждый» — второй ряд
 *                  людей, от каждого золотая нить к шару, по нити летит сота его цвета и встаёт в пустую ячейку;
 *                  «борется с беспорядком» — хаос отступает к краям, слева вверху печатается БЕСПОРЯДОК, на «энтропией»
 *                  (текст v15) — «= ЭНТРОПИЯ»; «лечит» (плашка «+» в поднятой руке), «учит» (раскрытая книга над головой),
 *                  «строит» (третий кирпич ложится на стенку), «прибирает комнату» (метла сметает сор в кучку) — человек
 *                  сценки на миг крупнее, от каждой сценки золотая сота летит в шар; «соавтор» — все поднимают руки,
 *                  нити вспыхивают, по всем нитям летят соты, шар почти достроен.
 *  future (b11)    «создан» — шар тускнеет, оставшиеся пустые ячейки пульсируют; «выйдет» — в них мерцают призраки сот;
 *                  «свет» — шар теплеет к золоту, тёплый ореол (не на весь кадр); «взрыв» — на миг шар разлетается
 *                  красными осколками (≤ 0,55 R) с красной вспышкой в центре и собирается обратно; «зависит» —
 *                  остальные люди тускнеют, центральный становится золотым, в руках светится золотая сота; «от тебя» —
 *                  он поднимает её, сота взлетает к пустой ячейке внизу шара, шар плавно останавливается. Перед
 *                  карточкой story.py весь рисунок тускнеет до 40 %.
 * Слова — основы GFC.w(K, id, основа) в cues(); «энтропией» (b10, v15) — только если слово есть в K.words (до переозвучки
 * его нет — событие пропускается, не падает на начало фразы).
 * Параметры p: s (id фразы), mode (mind | parts | bomb | coauthors | future — только имя кадра), K (cues.json),
 *   prev / prev_mode (наплыв делает GFC.scene). SCENES.gfc_globe.body(t, K, mode, p) — сырой SVG без фона.
 * Вход — наплыв GFC.scene из позы выхода gfc_lastq/creator: кадр b07 начинается с той же позы, что у gf_globe — огонь
 * порядка в (180,152) r=11, бледный контур экрана 106×62, плоские соты r=14 в круге 100, звёзды. Камера нейтральна;
 * движение своё — вращение шара 0,07 рад/с, после «тебя» плавный стоп. Кадр 360×640: всё в y=24..340, x=12..348;
 * ниже — фон под субтитры. Выход: последний режим держит позу — следующей сцены нет, карточка. Детерминизм: только t и K.
 */
(() => {
  const f = v => Number(v).toFixed(2);
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const H = GFC.hash, q = GFC.q, qq = GFC.qq, mix = GFC.mixC, INK = GFC.INK, PAL = GFC.PAL, SUN = GFC.SUN;
  const bump = (t, a, up, down) => q(t, a, up) * (1 - q(t, a + up, down));
  const nrm = v => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const PITCH = -.32, OM = .07, SHRINK = .84, RED = GFC.RED, TY = 38;   // TY — строка подписи мыслителя (как gf_globe)
  const GOLD = '#ffc24f', GOLDL = '#ffe7a3', LAV = '#d4c8ff', COLD = '#8fe9ff', DEEP = '#173b86';
  const TILE = ['#2fc9b6', '#4f9bf2', '#a66ef0', '#e27fd6'];   // плитки шара по диагонали (без красных тонов)
  const CHAOS = GFC.DOT.map(c => mix(c, '#8f86b8', .45));    // хаос — приглушённые цвета палитры
  const STARC = ['#ffffff', '#ffe9a8', ...GFC.DOT];

  /* ---------------- шар из сот: сфера Голдберга (как gf_globe) ---------------- */
  let GEO = null;   // ленивый неизменяемый кеш
  function geo() {
    if (GEO) return GEO;
    const F = 4, g = (1 + Math.sqrt(5)) / 2;
    const V = [[-1, g, 0], [1, g, 0], [-1, -g, 0], [1, -g, 0], [0, -1, g], [0, 1, g], [0, -1, -g], [0, 1, -g],
      [g, 0, -1], [g, 0, 1], [-g, 0, -1], [-g, 0, 1]].map(nrm);
    const FACES = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
    const pts = [], idx = new Map(), tris = [];
    const add = p => { const k = p.map(v => Math.round(v * 1e4)).join(','); if (!idx.has(k)) { idx.set(k, pts.length); pts.push(p); } return idx.get(k); };
    for (const [a, b, c] of FACES) {
      const A = V[a], B = V[b], C = V[c];
      const id = (i, j) => { const u = i / F, v = j / F, w = 1 - u - v; return add(nrm([0, 1, 2].map(k => A[k] * w + B[k] * u + C[k] * v))); };
      for (let i = 0; i < F; i++) for (let j = 0; i + j < F; j++) {
        tris.push([id(i, j), id(i + 1, j), id(i, j + 1)]);
        if (i + j + 2 <= F) tris.push([id(i + 1, j), id(i + 1, j + 1), id(i, j + 1)]);
      }
    }
    const adj = pts.map(() => []), nb = pts.map(() => new Set());
    for (const tr of tris) {
      const c = nrm([0, 1, 2].map(k => pts[tr[0]][k] + pts[tr[1]][k] + pts[tr[2]][k]));
      tr.forEach((v, k) => { adj[v].push(c); nb[v].add(tr[(k + 1) % 3]); nb[v].add(tr[(k + 2) % 3]); });
    }
    GEO = pts.map((p, i) => {
      const e1 = nrm(cross(Math.abs(p[1]) < .9 ? [0, 1, 0] : [1, 0, 0], p)), e2 = cross(p, e1);
      const ang = u => Math.atan2(dot(u, e2), dot(u, e1));
      return { c: p, poly: adj[i].slice().sort((u, v) => ang(u) - ang(v)), nb: [...nb[i]].sort((a, b) => a - b) };   // nb — соседи (сигналы)
    });
    return GEO;
  }
  function view(p, yaw) {   // поворот шара (yaw) и наклон к зрителю; z > 0 — к зрителю
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(PITCH), sp = Math.sin(PITCH);
    const x = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy;
    return [x, p[1] * cp - z1 * sp, p[1] * sp + z1 * cp];
  }

  /* ---------------- время от слов (основы — как gf_globe, текст v15) ---------------- */
  function cues(K) {
    const W = (id, s, n = 0) => GFC.w(K, id, s, n);
    const has = (id, s) => ((K && K.words && K.words[id]) || []).some(w => GFC.bare(w.w).startsWith(GFC.bare(s)));
    return {
      s7: GFC.T(K, 'b07'), s8: GFC.T(K, 'b08'), s9: GFC.T(K, 'b09'), s10: GFC.T(K, 'b10'), s11: GFC.T(K, 'b11'),
      mash: W('b07', 'машина'), uberi: W('b07', 'убери'), razum: W('b07', 'разум'), razum2: W('b07', 'разум', 1), miru: W('b07', 'миру'),
      znan: W('b07', 'знания'), energ: W('b07', 'энергией'), zhizn: W('b07', 'жизнь'), takoy: W('b07', 'такой'),
      nash: W('b07', 'наш'), mashn: W('b07', 'машинный'), bogom: W('b07', 'богом'),
      chast: W('b08', 'частям'), sobir8: W('b08', 'собирают'), nauka: W('b08', 'наука'), med: W('b08', 'медицина'),
      seti: W('b08', 'сети'), intel: W('b08', 'интеллект'),
      opasn: W('b09', 'опасно'), mash9: W('b09', 'машина'), filos: W('b09', 'философ'), bostr: W('b09', 'бостром'),
      sverh: W('b09', 'сверхразумом'), umnee: W('b09', 'умнее'), deti: W('b09', 'дети'), igr: W('b09', 'играющие'),
      bomb: W('b09', 'бомбой'),
      kto: W('b10', 'кто'), izbr: W('b10', 'избранных'), net: W('b10', 'нет'), kazhd: W('b10', 'каждый'), bor: W('b10', 'борется'),
      bespor: W('b10', 'беспорядком'), entr: has('b10', 'энтропией') ? W('b10', 'энтропией') : null,
      lech: W('b10', 'лечит'), uch: W('b10', 'учит'), stroit: W('b10', 'строит'), dazhe: W('b10', 'даже'),
      pribir: W('b10', 'прибирает'), komn: W('b10', 'комнату'), soavt: W('b10', 'соавтор'),
      sozd: W('b11', 'создан'), vyid: W('b11', 'выйдет'), svet: W('b11', 'свет'), vzryv: W('b11', 'взрыв'),
      zavis: W('b11', 'зависит'), tebya: W('b11', 'тебя'), card: K && K.card != null ? K.card : GFC.TE(K, 'b11'),
    };
  }
  // угол поворота: ровно OM рад/с, после «тебя» скорость плавно падает до нуля за D (поза финала стоит)
  const yawAt = (t, c) => { const D = 1.4, ts = c.tebya; if (t <= ts) return OM * t; const u = Math.min(t - ts, D); return OM * (ts + u - u * u / (2 * D)); };
  const phase10 = (t, c) => qq(t, c.s10 + .05, c.s10 + 1.4);   // b10: перестройка кадра (шар выше, люди в ряд)
  function place(t, c) {
    const grow = q(t, c.s7 + .1, 1.8), up9 = qq(t, c.filos - .35, c.filos + .7), m = phase10(t, c);
    let gy = lerp(152, 182, grow), R = lerp(24, 148, grow);   // огонь gfc_lastq — в (180,152); шар на всю ширину
    gy = lerp(lerp(gy, 154, up9), 122, m);                    // b09 «философ» — место подписи и людям; b10 — место рядам
    R = lerp(lerp(R, 104, up9), 92, m);
    return { gx: 180, gy, R };
  }

  /* ---------------- куски b08 (цвет — цвет плашки) и полёты сот b10 ---------------- */
  const CS = i => ({ fill: `url(#gfc-p${i})`, dk: PAL[i][1], lt: PAL[i][0] });
  const ORCH = { fill: 'url(#gfcg-orch)', dk: '#a8399a', lt: '#f7a8ea' };   // СЕТЬ — орхидея: коралл у бомбы читался бы красным
  const PARTS = [{ label: 'НАУКА', icon: 'atom', cs: CS(2), sx: -1, sy: -1 }, { label: 'МЕДИЦИНА', icon: 'plus', cs: CS(1), sx: 1, sy: -1 },
    { label: 'СЕТЬ', icon: 'net', cs: ORCH, sx: -1, sy: 1 }, { label: 'ИИ', icon: 'chip', cs: CS(3), sx: 1, sy: 1 }];
  const PCOL = PARTS.map(P => mix(P.cs.lt, P.cs.dk, .4));
  const dockT = c => [c.nauka + .2, c.med + .2, c.seti + .15, c.intel + .15];
  const partFade = (t, c, j) => j === 3 ? 1 - q(t, c.mash9 + .9, .6) : 1 - q(t, c.s9 + .1, .7);   // ИИ — до «машина» в b09
  function chunks(t, c, gp) {   // четверти шара: на «частям» расходятся и тускнеют, на своём слове влетают на место
    const D = dockT(c);
    return PARTS.map((P, j) => {
      const apart = q(t, c.chast - .05 + j * .07, .5) * (1 - q(t, D[j] - .45, .45));
      return { dx: P.sx * .28 * gp.R * apart, dy: P.sy * .08 * gp.R * apart, a: 1 - .5 * apart, fl: bump(t, D[j] - .05, .1, .8), apart,
        tint: q(t, D[j] - .1, .3) * partFade(t, c, j) };
    });
  }
  // люди: 0–3 — первый ряд (b09 — дети у бомбы, b10 — взрослые со сценками), 4 — центр («кто», «ты»), 5–8 — второй ряд
  const FRONT = [42, 120, 244, 316], KIDX = [64, 118, 242, 296], BACK = [82, 150, 212, 280], SX = [...FRONT, 180, ...BACK];
  const COLP = [3, 2, 1, 0, 3, 0, 1, 3, 2];   // цвета одежды; у бомбы (k 1, 2) — небо и бирюза, не коралл
  const vigT = c => [[c.lech, .2], [c.uch, .2], [c.stroit, .3], [c.komn, .2]].map(([w, d]) => ({ w, go: w + d, arr: w + d + .7 }));
  function plan(c, VT) {
    const G = geo(), taken = new Set();
    const pick = (dir, tt) => {
      const d = nrm(dir), yaw = yawAt(tt, c); let best = 0, bd = -9;
      for (let i = 0; i < G.length; i++) { if (taken.has(i)) continue; const v = dot(view(G[i].c, yaw), d); if (v > bd) { bd = v; best = i; } }
      taken.add(best); return best;
    };
    const yEnd = c.tebya + 3, yawE = yawAt(yEnd, c);
    const you = pick([0, .5, .86], yEnd);
    const fl = [], ord = k => Math.abs(SX[k] - 180) / 36;
    SX.forEach((x, k) => fl.push({ k, t0: c.kazhd + .1 + ord(k) * .08, dur: .75 }));                 // «каждый»
    VT.forEach((V, j) => fl.push({ k: j, t0: V.go, dur: V.arr - V.go, vig: j }));                     // сценки — золотые
    SX.forEach((x, k) => fl.push({ k, t0: c.soavt - .05 + ord(k) * .04, dur: .6 }));                 // «соавтор»
    fl.forEach((F, n) => { F.arr = F.t0 + F.dur; F.cell = pick([(SX[F.k] - 180) / 180 * .95, .42 + .28 * H(n * 2.7), .8], F.arr); });
    const free = G.map((g, i) => i).filter(i => !taken.has(i));
    const rest = free.filter(i => view(G[i].c, yawE)[2] > .35).sort((a, b) => H(a * 7.7) - H(b * 7.7)).slice(0, 7);   // не достроено к финалу
    const fill = new Map(), col = new Map();
    fl.forEach(F => { fill.set(F.cell, F.arr); col.set(F.cell, F.vig != null ? GOLD : PAL[COLP[F.k]][0]); });
    const yg = yawAt(c.chast, c), grp = G.map(g => { const v = view(g.c, yg); return (v[1] > 0 ? 2 : 0) + (v[0] > 0 ? 1 : 0); });
    return { you, flights: fl, gap: new Set([you, ...fl.map(F => F.cell), ...rest]), fill, col, grp };
  }

  /* ---------------- плашки-иконки: цветной круг (градиент палитры, светотень, тень) и белый знак, r=10 при s=1 ---------------- */
  const node = p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.7" fill="#fff"/>`;
  const GLY = {
    book: (dk, open = 1) => `<g transform="scale(${f(Math.max(.12, open))} 1)"><path d="M0 -3.6 L-7.6 -6 L-7.6 4.6 L0 7 Z M0 -3.6 L7.6 -6 L7.6 4.6 L0 7 Z" fill="#fff"/>` +
      `<path d="M-6 -3 L-2 -1.8 M-6 -.6 L-2 .6 M-6 1.8 L-2 3 M2 -1.8 L6 -3 M2 .6 L6 -.6 M2 3 L6 1.8" stroke="${dk}" stroke-width=".8" stroke-linecap="round" fill="none"/></g>`,
    bolt: () => `<path d="M1.9 -7.6 L-4.6 1.1 L-.5 1.1 L-1.9 7.6 L4.6 -1.1 L.5 -1.1 Z" fill="#fff" stroke="#fff" stroke-width=".6" stroke-linejoin="round"/>`,
    sprout: () => `<path d="M0 6.4 L0 -1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>` +
      `<path d="M0 2.4 C-2.4 2.4 -6.4 .8 -6.4 -3.2 C-3.2 -3.2 0 -1.6 0 2.4 Z M0 -1.5 C2.4 -1.5 6.4 -3.1 6.4 -7.1 C3.2 -7.1 0 -5.5 0 -1.5 Z" fill="#fff"/>` +
      `<path d="M-4.4 6.8 L4.4 6.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>`,
    atom: () => `<g fill="none" stroke="#fff" stroke-width="1.1"><ellipse rx="7.4" ry="2.7"/><ellipse rx="7.4" ry="2.7" transform="rotate(60)"/><ellipse rx="7.4" ry="2.7" transform="rotate(-60)"/></g><circle r="1.8" fill="#fff"/>`,
    plus: () => `<path d="M-2 -6.2 H2 V-2 H6.2 V2 H2 V6.2 H-2 V2 H-6.2 V-2 H-2 Z" fill="#fff" stroke="#fff" stroke-width=".5" stroke-linejoin="round"/>`,
    net: () => `<path d="M-6 -3.8 L0 0 L5.4 -5.4 L5.4 3.8 L0 0 L-4.6 5.4 L-6 -3.8 M-4.6 5.4 L5.4 3.8" stroke="#fff" stroke-width=".9" fill="none" opacity=".9"/>` +
      [[-6, -3.8], [5.4, -5.4], [0, 0], [-4.6, 5.4], [5.4, 3.8]].map(node).join(''),
    chip: () => `<rect x="-4.6" y="-4.6" width="9.2" height="9.2" rx="1.4" fill="none" stroke="#fff" stroke-width="1.3"/><rect x="-2" y="-2" width="4" height="4" rx=".6" fill="#fff"/>` +
      `<path d="M-2.3 -4.6 V-7.2 M0 -4.6 V-7.2 M2.3 -4.6 V-7.2 M-2.3 4.6 V7.2 M0 4.6 V7.2 M2.3 4.6 V7.2 M-4.6 -2.3 H-7.2 M-4.6 0 H-7.2 M-4.6 2.3 H-7.2 M4.6 -2.3 H7.2 M4.6 0 H7.2 M4.6 2.3 H7.2" stroke="#fff" stroke-width="1" stroke-linecap="round"/>`,
  };
  const badge = (x, y, s, op, cs, g, arg) => op <= .003 ? '' :
    `<g transform="translate(${f(x)} ${f(y)}) scale(${(+s).toFixed(3)})" opacity="${f(op)}"><circle cx=".7" cy="1.8" r="10.4" fill="${INK}" opacity=".42"/>` +
    `<circle r="10" fill="${cs.fill}"/><circle r="10" fill="url(#gfc-shade)"/><circle r="9.2" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".7"/>${GLY[g](cs.dk, arg)}</g>`;
  // подпись-таблетка: Montserrat 700 капсом на тёмной плашке с цветной обводкой; size — px сцены (≥ 12, без роста в зоне)
  function plate(x, y, text, size, op, o = {}) {
    if (op <= .003) return '';
    const em = o.ls ?? .08, str = String(text).toUpperCase(), w = GFC.textW(str, size, size * em) + size * 1.15, h = size * 1.5;
    const tr = o.sc && Math.abs(o.sc - 1) > 1e-3 ? ` transform="translate(${f(x)} ${f(y)}) scale(${(+o.sc).toFixed(3)}) translate(${f(-x)} ${f(-y)})"` : '';
    return `<g opacity="${f(op)}"${tr}><rect x="${f(x - w / 2 + .8)}" y="${f(y - h / 2 + 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="${INK}" opacity=".45"/>` +
      `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h / 2)}" fill="${o.fill ?? INK}" fill-opacity="${o.bg ?? .84}" stroke="${o.stroke ?? '#fff'}" stroke-opacity="${o.bo ?? .6}" stroke-width="1.3"/>` +
      GFC.mono(x, y + size * .36, str, { size, anchor: 'middle', grow: false, ls: em, color: o.color ?? '#fff', shadow: .6, opacity: 1 }) + '</g>';
  }
  // раскрытая книга (учит): небесная обложка, белые страницы
  const bookArt = (x, y, s, op, open = 1) => op <= .003 ? '' :
    `<g transform="translate(${f(x)} ${f(y)}) scale(${(+s).toFixed(3)})" opacity="${f(op)}"><g transform="scale(${f(Math.max(.12, open))} 1)">` +
    `<path d="M0 -3 L-9.4 -6.4 L-9.4 6.2 L0 9 L9.4 6.2 L9.4 -6.4 Z" fill="${INK}" opacity=".4" transform="translate(.6 1.6)"/>` +
    `<path d="M0 -3 L-9.4 -6.4 L-9.4 6.2 L0 9 L9.4 6.2 L9.4 -6.4 Z" fill="url(#gfc-p2)"/>` +
    `<path d="M0 -4.4 L-8.2 -7.2 L-8.2 4.8 L0 7.6 Z M0 -4.4 L8.2 -7.2 L8.2 4.8 L0 7.6 Z" fill="#fbf8ff"/>` +
    `<path d="M-6.6 -3.8 L-2.2 -2.4 M-6.6 -1.1 L-2.2 .3 M-6.6 1.6 L-2.2 3 M2.2 -2.4 L6.6 -3.8 M2.2 .3 L6.6 -1.1 M2.2 3 L6.6 1.6" stroke="${PAL[2][1]}" stroke-width=".8" stroke-linecap="round" fill="none"/></g></g>`;
  const brick = (x, y, op, b = 1) => op <= .003 ? '' :
    `<g opacity="${f(op)}"><rect x="${f(x - 7.5 * b + .5)}" y="${f(y - 3.5 * b + 1.2)}" width="${f(15 * b)}" height="${f(7 * b)}" rx="${f(1.1 * b)}" fill="${INK}" opacity=".4"/>` +
    `<rect x="${f(x - 7.5 * b)}" y="${f(y - 3.5 * b)}" width="${f(15 * b)}" height="${f(7 * b)}" rx="${f(1.1 * b)}" fill="url(#gfc-p0)"/>` +
    `<rect x="${f(x - 7.5 * b)}" y="${f(y - 3.5 * b)}" width="${f(15 * b)}" height="${f(7 * b)}" rx="${f(1.1 * b)}" fill="url(#gfc-shade)" stroke="#ffe1da" stroke-opacity=".7" stroke-width="1"/></g>`;
  // летящая сота: цветная плитка со светотенью и тенью; glow — золотой ореол
  const cellHex = (x, y, r, op, fill, glow = 0) => op <= .003 ? '' :
    (glow > .02 ? GFC.hex(x, y, r * 1.1, { op: .55 * glow * op, w: 3, color: GOLDL, glow: true }) : '') +
    GFC.hex(x, y, r, { op, fill, color: '#fff', w: 1.2, shadow: .7 });
  const glowDot = (x, y, r, op, col = '#fff') => op <= .003 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 2.2)}" fill="${col}" opacity="${f(.45 * op)}" filter="url(#gfc-soft)"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${col}" opacity="${f(op)}"/>`;
  const rimThread = (a, gp, op, w = 1.3, color = GOLDL) => { const dx = gp.gx - a[0], dy = gp.gy - a[1], D = Math.hypot(dx, dy) || 1;
    return op <= .003 ? '' : GFC.thread(a, [gp.gx - dx / D * gp.R * .96, gp.gy - dy / D * gp.R * .96], { opacity: op, width: w, color }); };

  /* ---------------- люди: плоская фигура GFC.person, но руки поднимаются по одной (upL / upR) ---------------- */
  const BODY = 'M-15 -58 C-15 -67 -9 -71 0 -71 C9 -71 15 -67 15 -58 L19 -5 C19 -2 17 0 14 0 L-14 0 C-17 0 -19 -2 -19 -5 Z';
  // оси GFC.person (gfc_00_lib rig): макушка −95,5 при голове 1, подошвы 0, s = h / (72,5·bs + 2·голова); o.kid 0..1 —
  // ребёнок: тело и руки короче (bs 1 → .68, руки ×.75), голова крупнее (o.head) — детские пропорции (слепой просмотр v1)
  function rig(h, o) {
    const t = o.t ?? 0, seed = o.seed ?? 0, kid = clamp(o.kid ?? 0), hr = 11.5 * (o.head ?? 1), bs = lerp(1, .68, kid), al = 35 * lerp(1, .75, kid);
    const s = h / (72.5 * bs + 2 * hr), idle = 2.4 * Math.sin(t * 1.4 + seed * 2.3);
    const arms = [[-1, o.upL ?? 0], [1, o.upR ?? 0]].map(([side, u0]) => {
      const up = GFC.ease(u0), wave = 6 * Math.sin(t * 2.2 + seed) * up, sh = [side * 12.5, -61 * bs];
      const th = (lerp(14, 150, up) + side * wave) * Math.PI / 180;
      const hx = sh[0] + side * al * Math.sin(th) + side * idle, hy = sh[1] + al * Math.cos(th);
      return [sh, [(sh[0] + hx) / 2 + side * 3.5 * up, (sh[1] + hy) / 2 + 1.5 * up], [hx, hy]];
    });
    return { s, hr, bs, headY: -72.5 * bs - hr, arms, br: 1 + .014 * Math.sin(t * 2.3 + seed * 1.7) };
  }
  const handAt = (cx, gy, h, side, o) => { const R = rig(h, o), a = R.arms[side < 0 ? 0 : 1][2]; return [cx + a[0] * R.s, gy + a[1] * R.s * R.br]; };
  function man(cx, gy, h, o = {}) {
    const op = o.op ?? 1; if (op <= .003 || !(h > 0)) return '';
    const R = rig(h, o), ci = o.color ?? 0;
    const armD = R.arms.map(a => `M${f(a[0][0])} ${f(a[0][1])} Q${f(a[1][0])} ${f(a[1][1])} ${f(a[2][0])} ${f(a[2][1])}`).join(' ');
    const head = `<circle cx="0" cy="${f(R.headY)}" r="${f(R.hr)}"`, bt = R.bs < .999 ? ` transform="scale(1 ${R.bs.toFixed(3)})"` : '';
    const shape = (fill, arm) => `<path d="${armD}" fill="none" stroke="${arm}" stroke-width="9" stroke-linecap="round"/><path d="${BODY}"${bt} fill="${fill}"/>${head} fill="${fill}"/>`;
    let b = shape(`url(#gfc-p${ci})`, PAL[ci][1]);
    const gold = clamp(o.gold ?? 0), shade = clamp(o.shade ?? 0), lit = clamp(o.lit ?? 0);
    if (gold > .003) b += `<g opacity="${f(gold)}">${shape('url(#gfc-p4)', PAL[4][1])}</g>`;
    if (shade > .003) b += `<g opacity="${f(.42 * shade)}">${shape(INK, INK)}</g>`;
    if (lit > .003) b += `<g opacity="${f(.32 * lit)}">${shape('#ffd08a', '#ffd08a')}</g>`;
    b += `<ellipse cx="${f(-R.hr * .38)}" cy="${f(R.headY - R.hr * .42)}" rx="${f(R.hr * .3)}" ry="${f(R.hr * .2)}" fill="#fff" opacity=".2"/>`;
    const sh = `<ellipse cx="${f(cx)}" cy="${f(gy + .4)}" rx="${f(h * .27)}" ry="${f(h * .06)}" fill="url(#gfc-shadow)"/>`;
    const glow = lit > .05 ? `<ellipse cx="${f(cx)}" cy="${f(gy - h * .5)}" rx="${f(h * .42)}" ry="${f(h * .62)}" fill="url(#gfc-halo)" opacity="${f(.55 * lit)}"/>` : '';
    return `<g opacity="${f(op)}">${glow}${sh}<g transform="translate(${f(cx)} ${f(gy)}) scale(${R.s.toFixed(4)} ${(R.s * R.br).toFixed(4)})">${b}</g></g>`;
  }
  const rigO = (P, t) => ({ t, seed: P.k, upL: P.upL, upR: P.upR, head: 1 + .55 * P.kid, kid: P.kid });   // дети: голова ×1,55, тело ×.68
  function crowd(t, c) {
    const m = phase10(t, c), kid = q(t, c.deti - .15, .5) * (1 - m), play = q(t, c.igr - .25, .35) * (1 - m);
    const vf = 1 - q(t, c.soavt + .15, .6), fl = bump(t, c.soavt - .05, .2, 1.1), VW = [c.lech, c.uch, c.stroit, c.pribir];
    const PP = [];
    for (let k = 0; k < 4; k++) {
      const app = q(t, c.umnee - .15 + k * .08, .45);
      if (app <= .003) { PP.push(null); continue; }
      const pop = bump(t, VW[k] - .25, .25, .9) * vf;   // человек сценки на миг крупнее
      const h = lerp(lerp(80, 60, kid), 92, m) * (1 + .12 * pop);
      const hop = 4.5 * Math.abs(Math.sin(t * 6.5 + k * 1.7)) * play, reach = play * (.5 + .12 * Math.sin(t * 5 + k));
      let L = k < 2 ? .2 * play : reach, R = k < 2 ? reach : .2 * play;   // дети тянутся к бомбе внутренней рукой
      if (k === 0) R = Math.max(R, q(t, c.lech - .3, .3) * vf);            // лечит: «+» во внутренней руке (наружная — у края кадра)
      if (k === 1) { const b = .82 * q(t, c.uch - .3, .3) * vf; L = Math.max(L, b); R = Math.max(R, b); }
      if (k === 2) L = Math.max(L, .45 * q(t, c.stroit - .35, .3) * vf);
      if (k === 3) L = Math.max(L, .2 * q(t, c.pribir - .3, .3) * vf);
      PP.push({ k, x: lerp(KIDX[k], FRONT[k], m), gy: lerp(336, 330, m) - hop, h, kid, upL: Math.max(L, .8 * fl), upR: Math.max(R, .8 * fl), app, row: 0, pop });
    }
    {
      const app = q(t, c.kto - .15, .4), ped = 22 * q(t, c.kto - .1, .5) * (1 - q(t, c.izbr + .1, .7)), lift = q(t, c.tebya - .35, .5);
      PP.push(app <= .003 ? null : { k: 4, x: 180, gy: 330 - ped, ped, h: 92, kid: 0, upL: Math.max(lift, .8 * fl), upR: Math.max(lift, .8 * fl), app, row: 0, pop: 0 });
    }
    for (let j = 0; j < 4; j++) {
      const app = q(t, c.kazhd - .2 + j * .07, .4);
      PP.push(app <= .003 ? null : { k: 5 + j, x: BACK[j], gy: 266, h: 54, kid: 0, upL: .8 * fl, upR: .8 * fl, app, row: 1, pop: 0 });
    }
    return PP;
  }
  const threadEnd = (P, gp) => { const ch = [P.x, P.gy - .62 * P.h], dx = ch[0] - gp.gx, dy = ch[1] - gp.gy, D = Math.hypot(dx, dy) || 1;
    return { ch, end: [gp.gx + dx / D * gp.R * .96, gp.gy + dy / D * gp.R * .96] }; };
  function people(t, c, gp, PP, st) {
    let back = '', front = '';
    const dimO = q(t, c.zavis - .1, .7), fl = bump(t, c.soavt - .05, .2, 1.1);
    const me4 = .6 * q(t, c.kto, .4) * (1 - q(t, c.izbr + .2, .75)) + .4 * bump(t, c.net - .1, .2, .5) + .3 * dimO;
    const m = phase10(t, c), ground = q(t, c.umnee - .2, .6);
    if (ground > .003) back += GFC.ground(180, lerp(339, 304, m), lerp(150, 176, m), lerp(16, 40, m), { op: .85 * ground * (1 - .45 * dimO), warm: .4 * fl });
    PP.forEach(P => {
      if (!P) return;
      const oth = P.k === 4 ? 0 : dimO;
      const op = Math.min(1, P.app * (1 - .6 * oth));
      let g = '';
      // золотая нить от груди к ободу (от «каждый»); по ней улетают соты (flights), шар не держит людей
      const { ch, end } = threadEnd(P, gp), th = q(t, c.kazhd - .05 + Math.abs(P.x - 180) / 36 * .06, .35) * P.app;
      if (th > .003) g += `<path d="M${f(ch[0])} ${f(ch[1])} L${f(end[0])} ${f(end[1])}" fill="none" stroke="${SUN}" stroke-width="${f(1.3 + .9 * fl)}" stroke-linecap="round" opacity="${f(th * (.5 + .45 * fl) * (1 - .7 * oth))}"/>`;
      if (P.ped > .2) g += `<g opacity="${f(P.app)}"><rect x="${f(P.x - 17 + .6)}" y="${f(P.gy + 1.4)}" width="34" height="${f(P.ped)}" rx="2.5" fill="${INK}" opacity=".4"/>` +
        `<rect x="${f(P.x - 17)}" y="${f(P.gy)}" width="34" height="${f(P.ped)}" rx="2.5" fill="url(#gfc-p4)"/><rect x="${f(P.x - 17)}" y="${f(P.gy)}" width="34" height="${f(P.ped)}" rx="2.5" fill="url(#gfc-shade)" stroke="#fff3c8" stroke-opacity=".7" stroke-width="1.2"/></g>`;
      g += man(P.x, P.gy, P.h, { color: COLP[P.k], ...rigO(P, t), op, shade: P.row ? .5 : 0,
        lit: Math.min(1, fl + (P.k === 4 ? me4 : 0) + .45 * P.pop), gold: P.k === 4 ? st.you : 0 });
      if (P.row) back += g; else front += g;
    });
    return { back, front };
  }

  /* ---------------- слои ---------------- */
  const STARS = GFC.cloud(70, 21, [12, 26, 348, 318]);
  function stars(t, c) {   // «убери фантастику» — звёзды и искры разлетаются от шара со следами и гаснут
    const k = q(t, c.uberi - .05, 1.0);
    if (k >= .997) return '';
    const at = (p, u) => [180 + (p[0] - 180) * (1 + 1.3 * u * u), 170 + (p[1] - 170) * (1 + 1.3 * u * u)];
    const P = k > 0 ? STARS.map(p => at(p, k)) : STARS;
    let tr = '', gl = '';
    if (k > .02) STARS.forEach((p, i) => { const a = at(p, Math.max(0, k - .22)), b = P[i]; tr += `<path d="M${f(a[0])} ${f(a[1])} L${f(b[0])} ${f(b[1])}" opacity="${f(.65 * (1 - k) * (.35 + .65 * H(i * 5.1)))}"/>`; });
    P.forEach((p, i) => {   // каждая седьмая — четырёхлучевая искра, как в фоне словаря
      if (i % 7) return;
      const sc = (.7 + .35 * H(i * 2.3)) * (.75 + .25 * Math.sin(t * 1.9 + i)) * (1 - .5 * k);
      gl += `<path d="M0 -6 Q.9 -.9 6 0 Q.9 .9 0 6 Q-.9 .9 -6 0 Q-.9 -.9 0 -6 Z" fill="#fff6d8" transform="translate(${f(p[0])} ${f(p[1])}) scale(${f(sc)})" opacity="${f(.9 * (1 - k))}"/>`;
    });
    return (tr ? `<g stroke="${LAV}" stroke-width="1.2" stroke-linecap="round" fill="none">${tr}</g>` : '') + gl +
      GFC.dots(P.filter((p, i) => i % 7), { r: 1.5, op: .95 * (1 - k), glow: .45, t: t * 1.3, color: STARC, size: i => .6 + .8 * H(i * 3.7), alpha: i => .4 + .6 * H(i * 5.1) });
  }

  function chaos(t, c, gp, st) {   // хаос: приглушённые цветные точки налетают на шар и отскакивают; «борется» — к краям
    const arrive = q(t, c.miru - .25, 1.0);
    if (arrive <= .003) return '';
    const push = q(t, c.bor - .1, 1.3);
    const op = .9 * arrive * (1 - .55 * push) * (1 - .3 * q(t, c.chast, 1));
    const P = [], A = [];
    let sp = '';
    for (let i = 0; i < 150; i++) {
      const a = H(i * 7.31) * 6.283 + t * (.04 + .08 * H(i * 2.1)) * (H(i * 4.4) < .5 ? -1 : 1);
      const amp = 14 + 105 * Math.pow(H(i * 5.7), 1.3), b = Math.abs(Math.sin((.55 + .9 * H(i * 3.3)) * t + H(i * 9.1) * 6.283));
      const r = gp.R + 8 + amp * b * (1 - .35 * st.danger) + push * 150 + (1 - arrive) * 190 * (.5 + H(i));
      const x = gp.gx + Math.cos(a) * r + 2 * Math.sin(t * 1.9 + i), y = gp.gy + Math.sin(a) * r + 2 * Math.cos(t * 1.6 + i * .7);
      P.push([x, y]); A.push(clamp((y - 22) / 14) * clamp((340 - y) / 26) * clamp((x - 8) / 14) * clamp((352 - x) / 14));
      if (b < .12 && arrive > .85) { const k = (1 - b / .12) * (1 - push); if (k > .05) sp += `<circle cx="${f(gp.gx + Math.cos(a) * (gp.R + 5))}" cy="${f(gp.gy + Math.sin(a) * (gp.R + 5))}" r="2.4" opacity="${f(.9 * k)}"/>`; }
    }
    return GFC.dots(P, { r: 1.9, op, glow: .3, color: CHAOS, t, alpha: i => A[i] }) +
      `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(gp.R + 5)}" fill="none" stroke="${LAV}" stroke-width="1.2" opacity="${f(.22 * arrive * (1 - push))}"/>` +
      (sp ? `<g fill="${GOLDL}">${sp}<g filter="url(#gfc-soft)">${sp}</g></g>` : '');
  }
  function disorder(t, c) {   // b10 «борется с беспорядком, то есть с энтропией» — подпись у хаоса слева вверху
    const op = q(t, c.bespor - .15, .35) * (1 - q(t, c.stroit - .1, .5));
    if (op <= .003) return '';
    const two = c.entr != null, sz = 11.8, fz = GFC.fs(sz);   // ×1,15 в зоне (GFC.fs) → 13,6 px
    const bw = Math.max(...(two ? ['БЕСПОРЯДОК', '= ЭНТРОПИЯ'] : ['БЕСПОРЯДОК']).map(x => GFC.textW(x, fz, fz * .06))) + 16;
    let s = `<g opacity="${f(op)}"><rect x="12" y="25" width="${f(bw)}" height="${two ? 50 : 27}" rx="8" fill="${INK}" opacity="${f(.8 * q(t, c.bespor - .15, .35))}" stroke="${LAV}" stroke-opacity=".5" stroke-width="1.2"/>`;
    s += GFC.typed(19, 44, 'БЕСПОРЯДОК', t, c.bespor - .1, { size: sz, anchor: 'start', op: .97, color: '#fff', ls: .06 });
    if (two) s += GFC.typed(19, 66, '= ЭНТРОПИЯ', t, c.entr - .1, { size: sz, anchor: 'start', op: .97, color: GOLDL, ls: .06 });
    return s + '</g>';
  }

  const WARM = [[-.5, -.42, .76], [.5, -.42, .76], [0, .62, .78]].map(nrm);
  const BR = nrm([.55, .42, .72]);   // угол куска ИИ: оттуда шар холодеет на «машина»
  const DEFS = `<defs><radialGradient id="gfcg-orb" cx=".4" cy=".34" r=".72"><stop offset="0" stop-color="#4b2a9e"/><stop offset=".62" stop-color="#26166a"/><stop offset="1" stop-color="#160d46"/></radialGradient>` +
    `<linearGradient id="gfcg-orch" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="#f7a8ea"/><stop offset="1" stop-color="#b543a6"/></linearGradient>` +
    `<radialGradient id="gfcg-cold"><stop stop-color="${COLD}" stop-opacity=".32"/><stop offset=".6" stop-color="#4f9bf2" stop-opacity=".12"/><stop offset="1" stop-color="#4f9bf2" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="gfcg-red" cx=".36" cy=".34" r=".72"><stop offset="0" stop-color="#ffb3b5"/><stop offset=".45" stop-color="${RED}"/><stop offset="1" stop-color="#8e1a26"/></radialGradient></defs>`;
  function globe(t, c, gp, PL, st, yaw) {
    const G = geo(), b0 = c.s7 + .05, yg = yawAt(b0, c), on = q(t, c.s7 - .1, .5);
    const warmK = [c.znan, c.energ, c.zhizn].map(w => q(t, w - .1, .45) * (1 - q(t, c.takoy, .6)));
    const jam = 1.3 * (1 - q(t, c.razum - .1, .9)) + 1.2 * st.danger;
    let back = '', front = '', gW = '', gG = '', gC = '', gR = '';
    for (let i = 0; i < G.length; i++) {
      const cl = G[i], v = view(cl.c, yaw);
      const born = q(t, b0 + Math.acos(Math.max(-1, Math.min(1, view(cl.c, yg)[2]))) / Math.PI * 1.5, .4);
      if (born <= .003) continue;
      const CH = st.chunk[PL.grp[i]];
      const ft = PL.fill.get(i), emp = PL.gap.has(i) ? q(t, c.s10 + .15 + H(i * 3.3) * .9, .3) : 0, fil = ft != null ? q(t, ft, .2) : 0;
      const built = born * (1 - emp * (1 - fil)) * CH.a, empty = born * emp * (1 - fil);
      let bx = 0, by = 0;
      if (st.burst > .003) {   // «взрыв»: осколки разлетаются от центра (≤ 0,55 R) и возвращаются
        const L = Math.hypot(v[0], v[1]) || 1, d = st.burst * gp.R * (.2 + .35 * H(i * 4.1));
        bx = v[0] / L * d + (H(i * 2.3) - .5) * 12 * st.burst; by = v[1] / L * d + (H(i * 6.7) - .5) * 12 * st.burst;
      }
      const ox = gp.gx + jam * Math.sin(t * 7.3 + i * 2.1) + CH.dx + bx, oy = gp.gy + jam * Math.cos(t * 6.1 + i * 1.3) + CH.dy + by;
      const d = 'M' + cl.poly.map(u => { const w = view(u, yaw); return f(ox + gp.R * (v[0] + SHRINK * (w[0] - v[0]))) + ' ' + f(oy + gp.R * (v[1] + SHRINK * (w[1] - v[1]))); }).join(' L') + ' Z';
      if (v[2] <= 0) { const o = .2 * (built + .6 * empty) * (1 + v[2] * .6) * (1 - st.burst); if (o > .004) back += `<path d="${d}" opacity="${f(o)}"/>`; continue; }
      const sh = .36 + .64 * v[2], red = clamp(st.burst * 3);
      const cold = st.cold * q(t, c.mash9 - .1 + (1 - dot(v, BR)) * .4, .35);
      if (built > .003) {
        const wave = Math.max(bump(t, c.razum - .1 + (1 - v[2]) * .45, .2, .7), bump(t, c.bogom - .1 + (1 - v[2]) * .45, .2, .7), bump(t, c.intel + .1 + (1 - v[2]) * .45, .2, .7));
        const tw = .9 + .1 * Math.sin(t * 1.4 + i * 2.7);
        const fc = 1 - st.danger * .6 * Math.pow(H(Math.floor(t * 9) * 1.3 + i * 7.1), 2);   // «опасно»: плитки мигают вразнобой
        const lvl = clamp((.6 + .45 * wave + .3 * st.sup + .35 * st.light) * tw * st.flick * fc * (1 - .45 * st.unbuilt));
        let warm = .75 * st.light; for (let k = 0; k < 3; k++) warm = Math.max(warm, warmK[k] * clamp((dot(v, WARM[k]) - .84) / .1));
        const flash = Math.max(ft != null ? bump(t, ft, .1, .9) : 0, CH.fl);
        let col = GFC.ramp(clamp(.5 + .42 * v[0] + .3 * v[1]), TILE);
        if (CH.tint > .003) col = mix(col, PCOL[PL.grp[i]], .62 * CH.tint);          // кусок b08 — цвет своей плашки
        if (ft != null && fil > .003) col = mix(col, PL.col.get(i), .7 * fil);       // сота человека — цвет его одежды
        if (cold > .02) col = mix(col, DEEP, .72 * cold);                            // машина — ледяная синева
        if (warm > .02) col = mix(col, GOLD, Math.min(1, warm * 1.15));
        if (red > .02) col = mix(col, RED, .85 * red);
        if (wave + flash > .02) col = mix(col, '#ffffff', Math.min(.7, .45 * wave + .55 * flash));
        const fo = Math.min(1, built * sh * (.5 + .46 * lvl) + .45 * flash + .2 * warm * built + .3 * red * built);
        const so = Math.min(1, built * sh * (.3 + .45 * lvl) + .6 * flash + .4 * red * built);
        const stc = red > .05 ? '#ffc4c6' : cold > .4 ? COLD : warm > .3 ? GOLDL : '#fff';
        front += `<path d="${d}" fill="${col}" fill-opacity="${f(fo)}" stroke="${stc}" stroke-opacity="${f(so)}" stroke-width="1.1" stroke-linejoin="round"/>` +
          `<path d="${d}" fill="url(#gfc-shade)" opacity="${f(fo)}"/>`;
        const gw = built * sh * Math.max(0, lvl - .55) * 1.4 + flash;
        if (gw > .04 && cold < .4 && red < .05) gW += `<path d="${d}" opacity="${f(Math.min(.8, .35 * gw))}"/>`;
        if (warm > .04) gG += `<path d="${d}" opacity="${f(Math.min(.8, .3 * warm * built))}"/>`;
        if (cold > .04) gC += `<path d="${d}" opacity="${f(Math.min(.8, .3 * cold * built + .2 * gw))}"/>`;
        if (red > .04) gR += `<path d="${d}" opacity="${f(Math.min(.8, .45 * red * built))}"/>`;
      }
      if (empty > .003) {
        const you = i === PL.you ? st.you * (.6 + .4 * Math.sin(t * 2.4)) : 0;
        const op = empty * sh * (.55 + .45 * st.unbuilt * (.7 + .3 * Math.sin(t * 2.6 + i * 1.9)) + .5 * you);
        const gh = Math.max(st.ghost * Math.pow(Math.max(0, Math.sin(t * 3.1 + i * 2.3)), 4), .85 * st.light);
        // пустая ячейка — тёмная дыра (ядро и задние соты не просвечивают), пунктирный контур; «свет» — тёплый призрак
        front += `<path d="${d}" fill="${INK}" opacity="${f(.8 * empty)}"/>`;
        const gfill = gh > .02 ? (st.light > .02 ? GOLD : LAV) : 'none';
        front += `<path d="${d}" fill="${gfill}" fill-opacity="${f(.34 * gh)}" stroke="${red > .05 ? RED : you > .02 ? GOLDL : '#f1ecff'}" stroke-width="1.2" stroke-dasharray="2.6 2.2" opacity="${f(Math.min(1, op))}"/>`;
        const ub = .3 * st.unbuilt * (.6 + .4 * Math.sin(t * 2.6 + i * 1.9));   // «не создан»: дыры светятся по контуру
        if (ub > .02) gW += `<path d="${d}" opacity="${f(ub * empty * sh)}"/>`;
        if (you > .02) gG += `<path d="${d}" opacity="${f(.6 * you * empty * sh)}"/>`;
      }
    }
    const R = gp.R, rim = Math.max(bump(t, c.bogom - .05, .15, .9), .5 * st.light, .6 * st.sup, bump(t, c.intel + .05, .15, .8));
    const rimCol = st.cold > .4 ? COLD : st.light > .3 || bump(t, c.bogom - .05, .15, .9) > .3 ? GOLDL : '#fff', apart = Math.max(...st.chunk.map(x => x.apart));
    const core = lerp(11, 5.5, q(t, b0, 1.2)) + 2.5 * st.light, coreOp = (1 - .4 * q(t, b0 + .4, 1.2)) * (1 - .3 * st.unbuilt) * st.flick * (1 - .8 * st.cold);
    const halo = on * (.35 + .3 * bump(t, c.razum - .1, .4, 1.6) + .3 * bump(t, c.bogom - .1, .3, 1.4)) * st.flick * (1 - st.cold);
    const warmHalo = on * (.7 * st.light + .3 * bump(t, c.bogom - .1, .3, 1.4)) * st.flick;
    const wv = clamp((t - c.sverh + .05) / .8);   // «сверхразумом»: холодная волна от обода
    const grp = (s, col, w) => s ? `<g fill="none" stroke="${col}" stroke-width="${w}" filter="url(#gfc-soft)">${s}</g>` : '';
    return `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R * 1.45)}" fill="url(#gfc-glowP)" opacity="${f(Math.min(1, halo))}"/>` +
      (warmHalo > .003 ? `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R * (1.35 + .12 * st.light))}" fill="url(#gfc-halo)" opacity="${f(warmHalo)}"/>` : '') +
      (st.cold > .003 ? `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R * 1.45)}" fill="url(#gfcg-cold)" opacity="${f(st.cold * (.6 + .4 * st.sup))}"/>` : '') +
      `<g fill="none" stroke="${LAV}" stroke-width=".9">${back}</g>` +
      `<circle cx="${f(gp.gx + .02 * R)}" cy="${f(gp.gy + .06 * R)}" r="${f(R)}" fill="${INK}" opacity="${f(.35 * on * (1 - apart) * (1 - st.burst))}" filter="url(#gfc-blur)"/>` +
      `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R * .985)}" fill="url(#gfcg-orb)" opacity="${f(.82 * on * (1 - .7 * apart) * (1 - .6 * st.burst))}"/>` +
      GFC.spark(gp.gx, gp.gy, core, { t, op: coreOp, rays: 12 }) +
      grp(gW, '#fff', 2.2) + grp(gG, GOLD, 2.4) + grp(gC, COLD, 2.4) + grp(gR, RED, 2.6) + front +
      `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(core * 3.2)}" fill="url(#gfc-halo)" opacity="${f(.7 * coreOp * on)}"/>` +
      `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(core * .5)}" fill="#fffbe8" opacity="${f(.65 * coreOp * on)}"/>` +
      `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R)}" fill="none" stroke="${rimCol}" stroke-width="${f(1.2 + 1.3 * rim)}" opacity="${f(on * (.28 + .6 * rim) * (1 - apart) * (1 - st.burst))}"/>` +
      (rim > .02 ? `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R)}" fill="none" stroke="${rimCol}" stroke-width="3.4" opacity="${f(.45 * rim * (1 - st.burst))}" filter="url(#gfc-soft)"/>` : '') +
      (wv > 0 && wv < 1 && st.cold > .3 ? `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R * (1 + .4 * wv))}" fill="none" stroke="${COLD}" stroke-width="${f(2.6 * (1 - wv) + 1.2)}" opacity="${f(.85 * (1 - wv))}"/>` : '');
  }

  // «разум»: огоньки бегут по соседним сотам (4 шага), за ними гаснущий след; только передняя сторона шара
  function signals(t, c, gp, yaw, amt, col) {
    if (amt <= .003) return '';
    const G = geo(), XY = i => { const v = view(G[i].c, yaw); return [gp.gx + gp.R * v[0], gp.gy + gp.R * v[1], v[2]]; };
    const tau = t + 1.2 * Math.max(0, Math.min(t, c.s10 + .4) - (c.sverh + .2));   // «сверхразум» — быстрее (фаза непрерывна)
    let tr = '', hd = '';
    for (let s = 0; s < 24; s++) {
      const P = 1.2 + .8 * H(s * 3.3), u0 = (tau + H(s * 7.7) * P) / P, n = Math.floor(u0), u = u0 - n;
      let i = Math.floor(H(s * 11.1 + n * 1.7) * G.length), prev = -1;
      const path = [i];
      for (let k = 0; k < 4; k++) { const nb = G[i].nb.filter(j => j !== prev); prev = i; i = nb[Math.floor(H(s * 5.3 + n * 2.9 + k * 1.1) * nb.length)]; path.push(i); }
      const pts = path.map(XY);
      if (pts.some(p => p[2] < .18)) continue;
      const head = u * 5.2;
      for (let k = 0; k < 4; k++) {
        const e = clamp(head - k); if (e <= 0) break;
        const a = pts[k], b = pts[k + 1], o = amt * clamp(1 - (head - k - 1) / 2.2) * Math.min(a[2], b[2]);
        if (o > .01) tr += `<path d="M${f(a[0])} ${f(a[1])} L${f(lerp(a[0], b[0], e))} ${f(lerp(a[1], b[1], e))}" opacity="${f(Math.min(1, o))}"/>`;
        if (head >= k + 1) hd += glowDot(b[0], b[1], 2.6, amt * clamp(1 - (head - k - 1) / 1.2) * b[2], col);
      }
      if (head < 4) { const k = Math.floor(head), e = head - k, a = pts[k], b = pts[k + 1]; hd += glowDot(lerp(a[0], b[0], e), lerp(a[1], b[1], e), 3.3, Math.min(1, 1.2 * amt), col); }
    }
    return (tr ? `<g fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round">${tr}</g>` : '') + hd;
  }

  // b09 «машина»: рисунок чипа внутри шара — кристалл в центре, дорожки к ободу, по ним огоньки (обрезано кругом шара)
  const TRACES = (() => {
    const T = [];
    for (let sd = 0; sd < 4; sd++) for (let k = 0; k < 4; k++) {
      const o = (k - 1.5) * .075, bnd = (H(sd * 4 + k + 1) - .5) * .5, x1 = .3 + .2 * H(sd * 9 + k * 3 + 2);
      const rot = ([x, y]) => sd === 0 ? [x, y] : sd === 1 ? [-y, x] : sd === 2 ? [-x, -y] : [y, -x];
      T.push([[.17, o], [x1, o], [x1 + Math.abs(bnd), o + bnd], [1.02, o + bnd]].map(rot));
    }
    return T;
  })();
  const polyAt = (P, u) => {   // точка на доле u длины ломаной
    const L = []; let tot = 0;
    for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(l); tot += l; }
    let left = tot * clamp(u);
    for (let i = 1; i < P.length; i++) { if (left <= L[i - 1]) { const e = left / (L[i - 1] || 1); return [lerp(P[i - 1][0], P[i][0], e), lerp(P[i - 1][1], P[i][1], e), i]; } left -= L[i - 1]; }
    return [P[P.length - 1][0], P[P.length - 1][1], P.length];
  };
  function chipArt(t, c, gp, st) {
    const k = st.cold; if (k <= .003) return '';
    const p = q(t, c.mash9 - .05, 1.0), R = gp.R, X = u => gp.gx + u[0] * R, Y = u => gp.gy + u[1] * R;
    let d = '', pads = '', run = '';
    const tau = t + 1.3 * Math.max(0, Math.min(t, c.s10 + .4) - (c.sverh + .2));   // «сверхразум» — огоньки быстрее
    TRACES.forEach((P, n) => {
      const e = clamp(p * 1.2 - .2 * H(n * 3.1)); if (e <= 0) return;
      const end = polyAt(P, e);
      d += `M${f(X(P[0]))} ${f(Y(P[0]))}` + P.slice(1, end[2]).map(u => ` L${f(X(u))} ${f(Y(u))}`).join('') + ` L${f(X(end))} ${f(Y(end))}`;
      if (end[2] > 2) pads += `<circle cx="${f(X(P[2]))}" cy="${f(Y(P[2]))}" r="2.8"/>`;
      if (e >= 1) { const s = polyAt(P, ((tau * .55 + H(n * 5.9)) % 1)); run += glowDot(X(s), Y(s), 2.4, .95, '#e9fdff'); }
    });
    const die = .34 * R * q(t, c.mash9 - .1, .4), inn = .16 * R;
    let pins = '';
    for (let s = 0; s < 4; s++) for (let j = 0; j < 4; j++) {
      const o = (j - 1.5) * .075 * R, a = die / 2, b = die / 2 + .045 * R;
      const L = s === 0 ? [a, o, b, o] : s === 1 ? [-o, a, -o, b] : s === 2 ? [-a, -o, -b, -o] : [o, -a, o, -b];
      pins += ` M${f(gp.gx + L[0])} ${f(gp.gy + L[1])} L${f(gp.gx + L[2])} ${f(gp.gy + L[3])}`;
    }
    return `<defs><clipPath id="gfcg-clip"><circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(R * .97)}"/></clipPath></defs><g clip-path="url(#gfcg-clip)" opacity="${f(k)}">` +
      (d ? `<path d="${d}" fill="none" stroke="${COLD}" stroke-width="3.4" opacity=".5" filter="url(#gfc-soft)"/><path d="${d}" fill="none" stroke="${COLD}" stroke-width="1.7" stroke-linejoin="round" opacity=".95"/>` : '') +
      `<g fill="${COLD}">${pads}</g>` +
      (die > 1 ? `<rect x="${f(gp.gx - die / 2 + 1)}" y="${f(gp.gy - die / 2 + 2.5)}" width="${f(die)}" height="${f(die)}" rx="${f(die * .1)}" fill="${INK}" opacity=".5"/>` +
        `<rect x="${f(gp.gx - die / 2)}" y="${f(gp.gy - die / 2)}" width="${f(die)}" height="${f(die)}" rx="${f(die * .1)}" fill="#0c1d4a" fill-opacity=".94" stroke="${COLD}" stroke-width="1.9"/>` +
        `<path d="${pins}" stroke="${COLD}" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
        `<rect x="${f(gp.gx - inn / 2)}" y="${f(gp.gy - inn / 2)}" width="${f(inn)}" height="${f(inn)}" rx="${f(inn * .12)}" fill="${COLD}" opacity="${f(.4 + .25 * st.sup + .15 * Math.sin(t * 4))}"/>` : '') +
      run + '</g>';
  }

  function burstFlash(t, gp, st) {   // «взрыв»: красная вспышка внутри шара (не на весь кадр)
    if (st.burst <= .003) return '';
    return `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(gp.R * (.22 + .2 * st.burst))}" fill="${RED}" opacity="${f(.36 * st.burst)}" filter="url(#gfc-soft)"/>` +
      `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(gp.R * .1 * st.burst)}" fill="#ffd0d2" opacity="${f(.75 * st.burst)}"/>`;
  }

  function combFlat(t, c) {   // b07: поза выхода gfc_lastq/creator — плоские цветные соты вокруг огня гаснут от края к центру
    const fc = 1 - q(t, c.s7, 1.4);
    if (fc <= .003) return '';
    return GFC.comb(180, 152, 14, 12, 12, { op: fc, w: .8, lit: (i, x, y) => { const d = Math.hypot(x - 180, y - 152); return d < 100 ? (1 - d / 100 * .6) * (1 - q(t, c.s7 + (1 - d / 100) * .8, .5)) : 0; } });
  }
  function screen(t, c) {   // b07: бледный контур экрана; «машина» — вспыхнул и рассыпался цветными точками
    if (t > c.mash + 1.8) return '';
    let s = '';
    const x0 = 127, y0 = 121, w = 106, h = 62;
    const op = .45 * (1 + .8 * bump(t, c.mash - .35, .25, .2)) * (1 - q(t, c.mash - .05, .25));
    if (op > .003) s += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="6" fill="none" stroke="#f1ecff" stroke-width="1.2" opacity="${f(op)}"/>`;
    const br = q(t, c.mash - .1, .2) * (1 - q(t, c.mash + .4, 1.1));
    if (br > .003) {
      const P = [], per = 2 * (w + h);
      for (let i = 0; i < 120; i++) {
        let u = i / 120 * per;
        if (u < w) P.push([x0 + u, y0]); else if ((u -= w) < h) P.push([x0 + w, y0 + u]); else if ((u -= h) < w) P.push([x0 + w - u, y0 + h]); else P.push([x0, y0 + h - (u - w)]);
      }
      s += GFC.dots(GFC.drift(P, t, c.mash - .1, 30, 4), { r: 1.4, op: .9 * br, glow: .4, t });
    }
    return s;
  }

  const LAB7 = [{ text: 'ЗНАНИЯ', icon: 'book', k: 'znan' }, { text: 'ЭНЕРГИЯ', icon: 'bolt', k: 'energ' }, { text: 'ЖИЗНЬ', icon: 'sprout', k: 'zhizn' }];
  function mind7(t, c, gp) {   // b07: РАЗУМ в центре шара, от него нити к трём золотым пятнам с плашками-иконками
    let s = '';
    const ctr = [gp.gx, gp.gy + 4];
    LAB7.forEach((L, j) => {
      const w = c[L.k], op = q(t, w - .15, .3) * (1 - q(t, c.takoy, .6));
      if (op <= .003) return;
      const pc = [gp.gx + gp.R * WARM[j][0], gp.gy + gp.R * WARM[j][1]], u = qq(t, w - .2, w + .3), pop = 1 + .3 * (1 - q(t, w - .1, .45));
      s += `<line x1="${f(ctr[0])}" y1="${f(ctr[1])}" x2="${f(pc[0])}" y2="${f(pc[1])}" stroke="${GOLDL}" stroke-width="1.6" stroke-linecap="round" opacity="${f(.65 * op)}"/>`;
      if (u > 0 && u < 1) s += glowDot(lerp(ctr[0], pc[0], u), lerp(ctr[1], pc[1], u), 3.3, 1, GOLDL);
      s += badge(pc[0], pc[1] - 12, 2.2 * pop, op, CS(4), L.icon);
      s += plate(pc[0], pc[1] + 22, L.text, 15, op, { stroke: GOLD, color: GOLDL, bo: .8 });
    });
    const rz = q(t, c.razum - .1, .3) * (1 - q(t, c.bogom - .05, .5));
    if (rz > .003) s += plate(ctr[0], ctr[1], 'РАЗУМ', 22, rz, { sc: 1 + .25 * (1 - q(t, c.razum - .1, .4)) + .14 * bump(t, c.razum2 - .1, .15, .6),
      ls: .14, fill: '#3b1a8c', bg: .94, stroke: '#eba2ff', bo: .95 });
    return s;
  }

  function ours(t, c, gp) {   // b07 «наш или машинный»: слева человек, справа крупная плашка-чип; нити к шару
    const fo = 1 - q(t, c.s8, .6), a = q(t, c.nash - .15, .4) * fo, b = q(t, c.mashn - .15, .4) * fo;
    let s = '';
    if (a > .003) s += rimThread([40, 272], gp, .7 * a) + man(36, 338, 96, { color: 1, t, seed: 3, op: a });
    if (b > .003) s += rimThread([318, 272], gp, .7 * b) + badge(324, 292, 2.5 * (1 + .25 * (1 - q(t, c.mashn - .15, .45))), b, CS(3), 'chip');
    return s;
  }

  function partIcons(t, c, gp, CH, st) {   // b08: плашка и подпись едут с куском; после — стоят на шаре (ИИ — до «машина» в b09)
    const D = dockT(c);
    let s = '';
    const ghost = q(t, c.sobir8 - .1, .4) * (1 - q(t, c.intel + .2, .5));   // «собирают»: пунктир контура будущего шара
    if (ghost > .003) s += `<circle cx="${f(gp.gx)}" cy="${f(gp.gy)}" r="${f(gp.R)}" fill="none" stroke="#f1ecff" stroke-width="1.4" stroke-dasharray="6 5" opacity="${f(.7 * ghost)}"/>`;
    PARTS.forEach((P, j) => {
      const op = q(t, D[j] - .5, .3) * partFade(t, c, j);
      if (op <= .003) return;
      const x = gp.gx + P.sx * .44 * gp.R + CH[j].dx, y = gp.gy + P.sy * .44 * gp.R + CH[j].dy - 10;
      const pop = 1 + .35 * (1 - q(t, D[j] - .5, .5)) + (j === 3 ? .35 * st.ai : 0);
      s += badge(x, y, 2.3 * pop, op, P.cs, P.icon) + plate(x, y + 34, P.label, 15, op, { stroke: P.cs.lt, bo: .9 });
    });
    return s;
  }

  function vignettes(t, c, PP) {   // b10: четыре сценки по словам; src — откуда летит золотая сота
    const fade = 1 - q(t, c.soavt + .15, .6), on = fade > .003 && t > c.lech - .5, src = [];
    let s = '';
    const [P0, P1, P2, P3] = PP;
    if (P0) { // лечит: плашка «+» в поднятой руке
      const [hx, hy] = handAt(P0.x, P0.gy, P0.h, 1, rigO(P0, t)), x = hx + 3, y = hy - 17;
      src.push([x, y]);
      if (on) s += `<circle cx="${f(x)}" cy="${f(y)}" r="22" fill="#fff" opacity="${f(.3 * bump(t, c.lech - .1, .15, .6))}" filter="url(#gfc-soft)"/>` + badge(x, y, 1.9, q(t, c.lech - .2, .25) * fade, CS(1), 'plus');
    } else src.push([70, 230]);
    if (P1) { // учит: раскрытая книга над головой
      const o = rigO(P1, t), [lx, ly] = handAt(P1.x, P1.gy, P1.h, -1, o), [rx, ry] = handAt(P1.x, P1.gy, P1.h, 1, o);
      const x = (lx + rx) / 2, y = Math.min(ly, ry, P1.gy - P1.h) - 12;
      src.push([x, y]);
      if (on) s += bookArt(x, y, 2.3, q(t, c.uch - .2, .2) * fade, q(t, c.uch - .2, .35));
    } else src.push([112, 220]);
    if (P2) { // строит: два кирпича стоят, третий ложится сверху из руки
      const b = 1.7, bx = P2.x - 30, gy = P2.gy, fall = q(t, c.stroit - .1, .35), [hx, hy] = handAt(P2.x, P2.gy, P2.h, -1, rigO(P2, t));
      if (on) s += brick(bx, gy - 3.5 * b, q(t, c.stroit - .55, .25) * fade, b) + brick(bx + 1.5 * b, gy - 10.5 * b, q(t, c.stroit - .45, .25) * fade, b) +
        brick(lerp(hx, bx - b, fall), lerp(hy + 4, gy - 17.5 * b, fall * fall), q(t, c.stroit - .35, .2) * fade, b);
      src.push([bx, gy - 24 * b]);
    } else src.push([220, 290]);
    if (P3) { // прибирает комнату: метла метёт справа налево, сор сбивается в кучку
      const gy = P3.gy, X0 = P3.x - 50, appear = q(t, c.dazhe - .3, .4) * fade, [hx, hy] = handAt(P3.x, P3.gy, P3.h, -1, rigO(P3, t));
      const go = qq(t, c.pribir - .1, c.komn + .45), bx = lerp(X0 + 36, X0 + 12, go) + 4 * Math.sin(t * 13) * bump(t, c.pribir - .2, .2, 1.6), B = 1.35, top = gy - 17;
      if (appear > .003 && on) {
        const D = [];
        for (let i = 0; i < 28; i++) {
          const x0 = X0 + 34 * H(i * 3.3), y0 = gy + 1 + (H(i * 2.2) - .5) * 6;
          const k = q(t, c.pribir - .1 + (X0 + 34 - x0) / 34 * ((c.komn + .45) - (c.pribir - .1)) * .9, .3);
          D.push([lerp(x0, X0 + 4 + (H(i * 5.3) - .5) * 7, k), lerp(y0, gy - 1 - 6 * H(i * 6.1) * k, k)]);
        }
        s += GFC.dots(D, { r: 2.8, op: .95 * appear, glow: .15, color: ['#a99bd6', '#8f86b8', '#b9a8c9'], t });
        s += `<g opacity="${f(appear)}" stroke-linecap="round" stroke-linejoin="round"><path d="M${f(hx)} ${f(hy)} L${f(bx + B)} ${f(top)}" stroke="#e9b66a" stroke-width="2.8" fill="none"/>` +
          `<path d="M${f(bx - 4 * B)} ${f(top)} L${f(bx + 6 * B)} ${f(top)} L${f(bx + 13 * B)} ${f(gy + 3)} L${f(bx - 11 * B)} ${f(gy + 3)} Z" fill="url(#gfc-p4)" stroke="${PAL[4][1]}" stroke-width="1.4"/>` +
          `<path d="M${f(bx - 4 * B)} ${f(top + 6)} L${f(bx - 7 * B)} ${f(gy + 3)} M${f(bx + B)} ${f(top + 6)} L${f(bx + B)} ${f(gy + 3)} M${f(bx + 6 * B)} ${f(top + 6)} L${f(bx + 9 * B)} ${f(gy + 3)}" stroke="${PAL[4][1]}" stroke-width="1.3" fill="none"/></g>`;
      }
      src.push([X0 + 4, gy - 8]);
    } else src.push([270, 320]);
    return { s, src };
  }
  function flights(t, gp, PL, PP, src, cellXY) {   // соты летят по нити от человека (золотые — от сценки) в пустую ячейку
    let s = '';
    PL.flights.forEach(F => {
      const u = qq(t, F.t0, F.arr), P = PP[F.k];
      if (u <= 0 || u >= 1 || !P) return;
      const { ch, end } = threadEnd(P, gp), [sx, sy] = F.vig != null ? src[F.vig] : ch, [cx, cy] = cellXY(F.cell);
      const x = (1 - u) * (1 - u) * sx + 2 * u * (1 - u) * end[0] + u * u * cx, y = (1 - u) * (1 - u) * sy + 2 * u * (1 - u) * end[1] + u * u * cy;
      s += F.vig != null ? cellHex(x, y, lerp(10, gp.R * .15, u), 1, 'url(#gfc-p4)', .9) : cellHex(x, y, lerp(9, gp.R * .15, u), 1, `url(#gfc-p${COLP[F.k]})`);
    });
    return s;
  }

  function bomb(t, c) {   // b09: красная круглая бомба с фитилём и искрой между детьми; «бомбой» — пик; в b10 гаснет
    const op = q(t, c.igr - .3, .3) * (1 - q(t, c.s10 + .05, .5));
    if (op <= .003) return '';
    const x = 180, y = 312, r = 23, pk = bump(t, c.bomb - .06, .12, .6), pop = 1 + .3 * (1 - q(t, c.igr - .3, .35));
    const fx = x + r * 1.28, fy = y - r * 1.5, fl = .75 + .25 * Math.sin(t * 31) * Math.sin(t * 17 + 1);
    let s = `<ellipse cx="${x}" cy="${f(y + r + 1)}" rx="${f(r * .95)}" ry="${f(r * .2)}" fill="url(#gfc-shadow)"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${f(r * (1.6 + .6 * pk))}" fill="${RED}" opacity="${f(.22 + .25 * pk)}" filter="url(#gfc-soft)"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#gfcg-red)" stroke="#ffc4c6" stroke-width="1.3"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#gfc-shade)"/>`;
    s += `<ellipse cx="${f(x - r * .33)}" cy="${f(y - r * .36)}" rx="${f(r * .2)}" ry="${f(r * .3)}" fill="#fff" opacity=".6" transform="rotate(36 ${f(x - r * .33)} ${f(y - r * .36)})"/>`;
    s += `<rect x="${f(x + r * .5 - 5)}" y="${f(y - r * .98 - 4)}" width="10" height="8" rx="1.5" fill="#4a1430" stroke="#ffc4c6" stroke-width="1.2" transform="rotate(38 ${f(x + r * .5)} ${f(y - r * .98)})"/>`;
    s += `<path d="M${f(x + r * .62)} ${f(y - r * 1.08)} Q${f(x + r * 1.25)} ${f(y - r * 1.05)} ${f(fx)} ${f(fy)}" fill="none" stroke="#f6e7c8" stroke-width="2" stroke-linecap="round"/>`;
    const sr = (5 + 3 * fl) * (1 + 1.1 * pk);   // искра: лучи, белое ядро, тёплое и красное свечение
    let rays = '';
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 3, L = sr * (.6 + .4 * H(k + Math.floor(t * 12))); rays += `M${f(fx)} ${f(fy)} L${f(fx + Math.cos(a) * L)} ${f(fy + Math.sin(a) * L)} `; }
    s += `<circle cx="${f(fx)}" cy="${f(fy)}" r="${f(sr * 1.5)}" fill="#ff9a3d" opacity="${f(.4 + .3 * pk)}" filter="url(#gfc-soft)"/>` +
      `<path d="${rays}" stroke="${SUN}" stroke-width="1.6" stroke-linecap="round"/><circle cx="${f(fx)}" cy="${f(fy)}" r="${f(2.3 + 1.2 * pk)}" fill="#fffbe8"/>`;
    return `<g opacity="${f(op)}" transform="translate(${x} ${y}) scale(${(+pop).toFixed(3)}) translate(${-x} ${-y})">${s}</g>`;
  }

  function yours(t, c, cellXY, PL, P) {   // b11: центральный (золотой) человек поднимает золотую соту к пустой ячейке
    const hold = q(t, c.zavis, .45);
    if (hold <= .003 || !P) return '';
    const lift = q(t, c.tebya - .3, .55), hov = q(t, c.tebya + .05, .9), [cx, cy] = cellXY(PL.you);
    const x = lerp(P.x, cx, hov), y = lerp(lerp(P.gy - .55 * P.h, P.gy - 1.22 * P.h, lift), cy + 17, hov) + 1.2 * Math.sin(t * 2.4) * hov;
    const th = q(t, c.tebya + .3, .6);
    return (th > .003 ? `<path d="M${f(x)} ${f(y - 10)} L${f(cx)} ${f(cy + 8)}" stroke="${GOLDL}" stroke-width="1.3" stroke-dasharray="3 3" stroke-linecap="round" opacity="${f(.9 * th)}" fill="none"/>` : '') +
      cellHex(x, y, 10, hold, 'url(#gfc-p4)', .6 + .4 * Math.sin(t * 2.4));
  }

  function backdrop(text, t, t0, t1) {   // тёмная мягкая подложка под подписью мыслителя
    const op = (t >= t0 ? q(t, t0, .3) : 0) * (1 - q(t, t1 - .5, .5));
    if (op <= .003) return '';
    const sz = GFC.fs(11), w = Math.min(326, GFC.textW(text, sz, sz * .08)) + 24;
    return `<rect x="${f(180 - w / 2)}" y="${f(TY - sz - 4)}" width="${f(w)}" height="${f(sz + 14)}" rx="${f((sz + 14) / 2)}" fill="${INK}" opacity="${f(.66 * op)}" filter="url(#gfc-soft)"/>`;
  }

  function body(t, K, mode, p) {
    const c = cues(K), gp = place(t, c), VT = vigT(c), PL = plan(c, VT), yaw = yawAt(t, c), CH = chunks(t, c, gp);
    const light = q(t, c.svet - .1, .6) * (1 - q(t, c.vzryv - .2, .3));
    const burst = q(t, c.vzryv - .08, .16) * (1 - q(t, c.vzryv + .35, .7));
    const danger = q(t, c.opasn - .15, .5) * (1 - q(t, c.s10 - .1, .6));
    const st = {
      danger, light, burst, chunk: CH,
      sup: q(t, c.sverh - .1, .8) * (1 - q(t, c.s10, .8)),
      cold: q(t, c.mash9 - .15, .4) * (1 - q(t, c.s10, .8)),
      unbuilt: q(t, c.sozd - .1, .6) * (1 - .7 * light),
      ghost: q(t, c.vyid - .1, .4) * (1 - q(t, c.tebya, .5)),
      you: q(t, c.zavis - .1, .5),
      ai: bump(t, c.mash9 - .1, .15, .8),
      flick: 1 - danger * .45 * H(Math.floor(t * 11) * 1.37 + 3) - .3 * burst * H(Math.floor(t * 17) * 2.1 + 1),
    };
    const apart = Math.max(...CH.map(x => x.apart));
    const sig = q(t, c.razum - .1, .4) * (.55 + .45 * bump(t, c.razum - .1, .3, 1.6) + .45 * st.sup + .4 * bump(t, c.intel, .2, 1.2)) *
      (1 - apart) * (1 - .55 * q(t, c.s10, .8)) * (1 - q(t, c.sozd - .1, .6)) * (1 - st.danger * .5 * (1 - st.cold));
    const cellXY = i => { const v = view(geo()[i].c, yaw); return [gp.gx + gp.R * v[0], gp.gy + gp.R * v[1]]; };
    const PP = crowd(t, c), ring = people(t, c, gp, PP, st), V = vignettes(t, c, PP);
    const dim = 1 - .6 * q(t, c.card - .35, .5);   // перед карточкой story.py рисунок тускнеет до 40 %
    const TH = 'НИК БОСТРОМ · «СВЕРХРАЗУМ» · 2014';
    const svg = DEFS + stars(t, c) + chaos(t, c, gp, st) + combFlat(t, c) + ring.back + globe(t, c, gp, PL, st, yaw) +
      signals(t, c, gp, yaw, sig, st.cold > .5 ? COLD : '#fff8e6') + chipArt(t, c, gp, st) + burstFlash(t, gp, st) + screen(t, c) +
      mind7(t, c, gp) + ours(t, c, gp) + partIcons(t, c, gp, CH, st) + ring.front + V.s + flights(t, gp, PL, PP, V.src, cellXY) +
      bomb(t, c) + yours(t, c, cellXY, PL, PP[4]) + disorder(t, c) +
      backdrop(TH, t, c.bostr - .15, c.s10 + .6) + GFC.thinker(TH, t, c.bostr - .15, c.s10 + .6, { size: 11, y: TY, maxW: 326, ls: .08 });
    return dim < .999 ? `<g opacity="${f(dim)}">${svg}</g>` : svg;
  }
  SCENES.gfc_globe = GFC.scene('gfc_globe', body);
})();
