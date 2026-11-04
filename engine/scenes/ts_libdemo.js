/* time_states: демо-лист словаря TS (ts_lib.js). 12 с, восемь участков по 1,5 с:
 * 0 плёнки (яблоко и яйцо), 1.5 часы, 3 человек стоя с часами у макушки и ступней,
 * 4.5 падение спиной вниз, 6 яблоко 0 / .5 / 1, 7.5 яблоко в холоде, 9 яйцо бьётся,
 * 10.5 атом и плёнка электрона. p не используется; время — абсолютное t.
 * Проверка: scene_test.py ts_libdemo '{}' --dur 12 --at 0.5,2,3.5,5,6.5,8,9.5,11
 */
(() => {
  const pad = (v, n) => String(Math.floor(v)).padStart(n, '0');
  const digits = (sec, nano) => `00:00:${pad(sec, 2)}.${pad(nano, 9)}`;
  function body(t) {
    const seg = Math.min(7, Math.floor(t / 1.5)), u = t - seg * 1.5;
    const vis = TS.fadeIn(t, seg * 1.5, .25) * (seg === 7 ? 1 : TS.fadeOut(t, seg * 1.5 + 1.3, .2));
    let s = '';
    const title = ['TS.STRIP', 'TS.CLOCK', 'TS.PERSON · STAND', 'TS.PERSON · FALL', 'TS.APPLE · DECAY', 'TS.APPLE · COLD', 'TS.EGG · BROKEN', 'TS.ATOM'][seg];
    s += UN.mono(180, 28, title, { size: 10, anchor: 'middle', opacity: .6 });
    if (seg === 0) {
      const decays = [0, .33, .66, 1, .5];
      s += TS.strip(180, 130, { id: 'ap', n: 5, offset: -20 + u * 18, t, view: 175,
        frame: (i, cx, cy) => TS.apple(cx, cy + 6, 21, { decay: decays[i], t: t + i }),
        lit: i => i === 2 ? 1 : .55, caption: i => `T${i + 1}` });
      const br = [0, .15, .45, .75, 1];
      s += TS.strip(180, 275, { id: 'eg', n: 5, offset: 20 - u * 18, t, view: 175, angle: -3,
        frame: (i, cx, cy) => TS.egg(cx, cy - 4, 26, { broken: br[i], t }),
        lit: i => .6 + .4 * Math.sin(t * 3 + i) ** 2, caption: i => i ? 'НАЗАД' : '' });
    } else if (seg === 1) {
      const sec = t * 3, a = sec * Math.PI * 2 / 6;
      s += TS.clock(180, 175, 92, a, { digits: digits(sec, (sec % 1) * 1e9), size: 12, trail: .8 });
      s += TS.clock(70, 330, 22, a * 12, { digits: '×12', size: 9.4 });
      s += TS.clock(290, 330, 22, a / 6, { digits: '÷6', size: 9.4 });
    } else if (seg === 2 || seg === 3) {
      const o = seg === 2 ? { pose: 'stand', t } : { fall: TS.between(t, 4.5, 5.1), t };
      const ground = seg === 2 ? 352 : 300, hgt = 270;
      s += TS.person(180, ground, hgt, o);
      const A = TS.personAnchors(180, ground, hgt, o);
      const sec = t, nano = (t % 1) * 1e9;
      if (seg === 2) {
        s += TS.clock(A.head.x + 92, A.head.y + 6, 17, t * 6.3, { digits: digits(sec, nano + 3), size: 9.4 });
        s += TS.clock(A.feet.x + 72, A.feet.y - 22, 17, t * 6.3, { digits: digits(sec, nano), size: 9.4 });
        s += UN.thread([A.head.x + 8, A.head.y + 2], [A.head.x + 75, A.head.y + 6], { opacity: .3 });
        s += UN.thread([A.feet.x + 14, A.feet.y - 4], [A.feet.x + 55, A.feet.y - 20], { opacity: .3 });
      } else {
        s += TS.clock(A.head.x, A.head.y - 40, 15, t * 6.3, { size: 9.4 });
        s += TS.clock(A.feet.x, A.feet.y - 40, 15, t * 6.3, { size: 9.4 });
        s += UN.surface((x, z) => 6 * Math.sin(x / 40 + t) * Math.cos(z / 50), { span: 300, steps: 14, opacity: .14 }, { cy: 345, yaw: -.2, pitch: .9 });
      }
    } else if (seg === 4) {
      [0, .5, 1].forEach((d, i) => {
        const x = 64 + i * 116;
        s += TS.apple(x, 190, 42, { decay: d, t });
        s += UN.mono(x, 268, `DECAY ${d}`, { size: 9.4, anchor: 'middle', opacity: .7 });
      });
      s += TS.apple(180, 330, 26, { decay: TS.between(t, 6, 7.4), t });
    } else if (seg === 5) {
      s += TS.apple(180, 210, 95, { cold: TS.between(t, 7.5, 8), t });
      s += TS.clock(300, 70, 20, t * 40, { digits: '×100', size: 9.4, trail: 1 });
    } else if (seg === 6) {
      s += TS.egg(180, 150, 70, { broken: TS.between(t, 9.2, 10.3), t });
      [0, .5, 1].forEach((b, i) => s += TS.egg(80 + i * 100, 315, 24, { broken: b, t }));
    } else {
      s += TS.atom(180, 150, 90, { phase: t * 5, rings: 2 });
      s += TS.strip(180, 300, { id: 'at', n: 4, t, offset: -u * 10,
        frame: (i, cx, cy, w) => TS.atom(cx, cy, w * .36, { phase: i * 1.4, rings: 1 }),
        lit: i => i === Math.floor(t * 4) % 4 ? 1 : .4, caption: i => `${i + 1}` });
    }
    s += UN.bokeh(t, { count: 14, opacity: .5, seed: 71 });
    return `<g opacity="${vis.toFixed(3)}">${s}</g>`;
  }
  SCENES.ts_libdemo = function (u, p = {}, d, t) { return UN.wrap(body(t)); };
})();
