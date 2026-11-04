"""«Тик-так»: own music bed for «Что такое время» (music round, sample 1; $0, own synthesis, no external files).

Owner 03.11 on the first bed (A minor, 84 BPM, piano and pad): «музыка унылая (». This one is playful and curious:
D major, 104 BPM, a clock motif: a marimba «tick» on A4 on beats 1 and 3 (one pitch, like a clock; A is a chord or
colour tone in every bar) and a pizzicato «tock» on beats 2 and 4 that moves with the harmony. A bouncy bass with a
soft kick on the strong beats, a light shaker, a warm low pad. On the odd bars the marimba answers with a short
rising figure of chord tones (our own, generic arpeggios, no quoted theme); the second half of every 16 bars adds a
ghost tick («tick-tick-tock») and more answers. Loop: D | Gadd9 | Bm7 | A | D | Gmaj7 | Em7 | A7sus4→A.
Mono from the start, exact tuning, no LFO and no detuned unisons, so nothing throbs (LEARNINGS 28.10, L15).
Room for the voice: tonal fundamentals stay at or below 880 Hz, the bus has a −5 dB bell at 2.5 kHz (Q .7, about
1.3–4.5 kHz) and a 5 kHz low-pass; the shaker lives at 5–10 kHz with a soft 7 ms attack, so no sharp high hits.

Same interface as time_states_p1/music_bed.py (a drop-in for mix.py):
    sc = Score(n_samples, sr)
    sc.layer("pad", [(0, 0), (2, 1), ...])      # linear gain keys: pad; arp (marimba + pizz); bass (bass + kick);
                                                # perc (shaker, follows arp unless set); air (kept, unused)
    sc.breaks([(33.0, 37.3)])                   # drop-outs: .25 s out, .6 s back in
    sc.awe([5.0, 121.0])                        # soft high swells at scale points (no attacks)
    sc.final(170.5)                             # a last D-major chord (pizz, rolled marimba, pad) rings from here
    y = sc.render()                             # float32 mono, peak-normalised
"""
import numpy as np
from scipy import signal

BPM = 104
TICK = 69                                       # A4, the clock
# per bar: bass root, pad [(sixteenth, notes)], pizz tocks on sixteenths 4 and 12, marimba answer [(sixteenth, midi,
# velocity)], bass pickup on sixteenth 14 (an approach note to the next root)
LOOP = [
    dict(root=38, pad=[(0, [50, 57, 62, 66])], tock=(66, 62), fill=[], pick=None),                       # D
    dict(root=43, pad=[(0, [55, 59, 62, 69])], tock=(67, 59),
         fill=[(11, 71, .50), (12, 74, .56), (14, 79, .50)], pick=None),                                 # Gadd9
    dict(root=47, pad=[(0, [54, 57, 59, 62])], tock=(66, 62), fill=[], pick=None),                       # Bm7
    dict(root=45, pad=[(0, [52, 57, 61, 64])], tock=(64, 61),
         fill=[(10, 73, .46), (11, 76, .50), (12, 81, .52), (14, 79, .44)], pick=37),                    # A
    dict(root=38, pad=[(0, [50, 57, 62, 66])], tock=(66, 57), fill=[], pick=None),                       # D
    dict(root=43, pad=[(0, [55, 59, 62, 66])], tock=(66, 62),
         fill=[(12, 74, .46), (13, 76, .48), (14, 78, .55)], pick=None),                                 # Gmaj7
    dict(root=40, pad=[(0, [52, 55, 59, 62])], tock=(67, 59), fill=[], pick=44),                         # Em7
    dict(root=45, pad=[(0, [57, 62, 64, 67]), (8, [57, 61, 64, 67])], tock=(62, 61),
         fill=[(10, 76, .46), (11, 74, .46), (12, 73, .50), (13, 76, .48), (14, 81, .55)], pick=37),     # A7sus4→A7
]
FILL_B = {2: [(13, 71, .40), (14, 73, .45)], 6: [(12, 71, .40), (14, 74, .46)]}   # second half: more answers
UP_B = {0: 62, 4: 62}                           # second half: an extra pizz «tock» up on sixteenth 14
SHAKER = (.50, .22, .90, .30)                   # shaker velocity by sixteenth within a beat: the off-beat leads
GAIN = {"mar": 1.0, "pizz": 1.15, "bass": .62, "kick": .62, "shaker": .28, "pad": .06, "air": .10}


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lp1(x, fc, sr, order=2):
    sos = signal.butter(order, fc, fs=sr, output="sos")
    return signal.sosfilt(sos, x).astype(np.float32)


def bell(x, f0, gain_db, q, sr):
    """RBJ peaking EQ."""
    a_ = 10 ** (gain_db / 40)
    w0 = 2 * np.pi * f0 / sr
    al = np.sin(w0) / (2 * q)
    b = np.array([1 + al * a_, -2 * np.cos(w0), 1 - al * a_])
    a = np.array([1 + al / a_, -2 * np.cos(w0), 1 - al / a_])
    return signal.lfilter(b / a[0], a / a[0], x).astype(np.float32)


class Score:
    def __init__(self, n, sr, seed=7):
        self.n, self.sr = n, sr
        self.rng = np.random.default_rng(seed)
        self.keys = {"pad": [(0, 1)], "arp": [(0, 1)], "bass": [(0, 1)], "air": [(0, 0)], "perc": None}
        self._breaks, self._awe, self._final = [], [], None
        self.beat = 60 / BPM
        self.bar = 4 * self.beat
        self.step = self.beat / 4
        self._cache = {}
        self.count = {}                          # attacks placed, by kind (for the report)
        self.debug = False                       # True keeps the layers in self.parts after render()

    # ---- plan (same as music_bed.Score)
    def layer(self, name, keys):
        self.keys[name] = sorted(keys)

    def breaks(self, spans):
        self._breaks = [(a, b) for a, b in spans if b > a]

    def awe(self, times):
        self._awe = list(times)

    def final(self, t):
        self._final = t

    # ---- instruments (tonal bodies are cached per pitch; velocity scales them)
    def _t(self, dur):
        return np.arange(int(dur * self.sr)) / self.sr

    def marimba(self, m):
        """Modal bar: fundamental, a quiet fast-dying 4th mode, a faint 10th; a soft 1.5 ms attack and a felt knock."""
        key = ("mar", m)
        if key not in self._cache:
            f0, sr = hz(m), self.sr
            t = self._t(1.3)
            tau = float(np.clip(.55 * (440 / f0) ** .5, .28, .9))
            y = np.sin(2 * np.pi * f0 * t) * np.exp(-t / tau)
            y += .10 * np.sin(2 * np.pi * 3.93 * f0 * t) * np.exp(-t / (tau * .14))
            if 9.4 * f0 < sr / 2.4:
                y += .025 * np.sin(2 * np.pi * 9.4 * f0 * t) * np.exp(-t / .012)
            att = np.sin(np.clip(t / .0015, 0, 1) * np.pi / 2) ** 2
            knock = lp1(np.random.default_rng(m).standard_normal(len(t)) * np.exp(-t / .004), 1400, sr) * .35
            self._cache[key] = ((y * att + knock) * np.clip((1.3 - t) / .1, 0, 1)).astype(np.float32)
        return self._cache[key]

    def pizz(self, m):
        """Plucked string: harmonics shaped by a pluck at .28 of the length, upper ones die faster; 2 ms attack."""
        key = ("pizz", m)
        if key not in self._cache:
            f0 = hz(m)
            t = self._t(1.0)
            tau1 = .42 * (220 / f0) ** .3
            y = np.zeros_like(t)
            for k in range(1, 13):
                if k * f0 > 4200:
                    break
                y += abs(np.sin(k * np.pi * .28)) / k ** 1.1 * np.sin(2 * np.pi * k * f0 * t) * np.exp(-t * (1 + .5 * (k - 1)) / tau1)
            env = np.sin(np.clip(t / .002, 0, 1) * np.pi / 2) ** 2 * np.clip((1.0 - t) / .1, 0, 1)
            self._cache[key] = (y * env).astype(np.float32)
        return self._cache[key]

    def bass_note(self, m, dur=.42):
        key = ("bass", m, round(dur, 3))
        if key not in self._cache:
            f0 = hz(m)
            t = self._t(dur + .07)
            y = np.sin(2 * np.pi * f0 * t) + .45 * np.sin(4 * np.pi * f0 * t) + .18 * np.sin(6 * np.pi * f0 * t)
            env = np.clip(t / .004, 0, 1) * np.exp(-t / .5) * np.clip((dur + .07 - t) / .07, 0, 1)
            self._cache[key] = (y * env).astype(np.float32)
        return self._cache[key]

    def kick(self):
        if "kick" not in self._cache:
            t = self._t(.35)
            f = 48 + 70 * np.exp(-t / .03)
            y = np.sin(2 * np.pi * np.cumsum(f) / self.sr) * np.exp(-t / .12) * np.clip(t / .001, 0, 1)
            self._cache["kick"] = lp1(y, 180, self.sr)
        return self._cache["kick"]

    def pad_note(self, f0, dur, att=1.0, rel=1.4):
        t = self._t(dur + rel)
        y = np.sin(2 * np.pi * f0 * t) + .28 * np.sin(4 * np.pi * f0 * t) + .1 * np.sin(6 * np.pi * f0 * t)
        env = np.clip(t / att, 0, 1) ** 2 * np.clip((dur + rel - t) / rel, 0, 1)
        return (y * env).astype(np.float32)

    # ---- render
    def _curve(self, keys):
        ts = np.array([k[0] for k in keys]) * self.sr
        vs = np.array([k[1] for k in keys], float)
        return np.interp(np.arange(self.n), ts, vs).astype(np.float32)

    def _put(self, dst, src, t0, g=1.0, tag=None):
        i = int(round(t0 * self.sr))
        if i >= len(dst):
            return
        if i < 0:
            src, i = src[-i:], 0
        m = min(len(src), len(dst) - i)
        if m > 0:
            dst[i:i + m] += src[:m] * g
            if tag:
                self.count[tag] = self.count.get(tag, 0) + 1

    def _hum(self, s=.004):
        return float(self.rng.normal(0, s))

    def _vel(self, v):
        return v * (.9 + .1 * float(self.rng.random()))

    def render(self):
        sr, n = self.sr, self.n
        dur = n / sr
        mar, pizz, bass, pad, air = (np.zeros(n, np.float32) for _ in range(5))
        shk_env = np.zeros(n, np.float32)
        st = self.step
        hit = self._t(.12)
        hit = (np.sin(np.clip(hit / .007, 0, 1) * np.pi / 2) ** 2 * np.exp(-np.clip(hit - .007, 0, None) / .035)).astype(np.float32)
        for b in range(int(dur / self.bar) + 2):
            t0 = b * self.bar
            L = LOOP[b % 8]
            second = (b // 8) % 2 == 1          # second half of every 16 bars: a little busier
            # pad: a whole-bar chord (or two halves), slow attack
            for k, (s, notes) in enumerate(L["pad"]):
                s1 = L["pad"][k + 1][0] if k + 1 < len(L["pad"]) else 16
                for m in notes:
                    self._put(pad, self.pad_note(hz(m), (s1 - s) * st, att=.5, rel=.9), t0 + s * st)
            # the clock: marimba tick on 1 and 3, pizz tock on 2 and 4
            self._put(mar, self.marimba(TICK), t0 + self._hum(), self._vel(.55), "tick")
            self._put(mar, self.marimba(TICK), t0 + 8 * st + self._hum(), self._vel(.46), "tick")
            if second:
                self._put(mar, self.marimba(TICK), t0 + 6 * st + self._hum(), self._vel(.24), "tick")
            self._put(pizz, self.pizz(L["tock"][0]), t0 + 4 * st + self._hum(), self._vel(.62), "tock")
            self._put(pizz, self.pizz(L["tock"][1]), t0 + 12 * st + self._hum(), self._vel(.54), "tock")
            if second and b % 8 in UP_B:
                self._put(pizz, self.pizz(UP_B[b % 8]), t0 + 14 * st + self._hum(), self._vel(.40), "tock")
            # the answer
            for s, m, v in L["fill"] + (FILL_B.get(b % 8, []) if second else []):
                self._put(mar, self.marimba(m), t0 + s * st + self._hum(), self._vel(v), "answer")
            # bass and kick on the strong beats; an approach note before some downbeats
            self._put(bass, self.bass_note(L["root"]), t0, self._vel(.85), "bass")
            self._put(bass, self.bass_note(L["root"] + (7 if second and b % 2 else 0)), t0 + 8 * st, self._vel(.72), "bass")
            if L["pick"]:
                self._put(bass, self.bass_note(L["pick"], .22), t0 + 14 * st, self._vel(.5), "bass")
            self._put(bass, self.kick() * GAIN["kick"] / GAIN["bass"], t0, self._vel(.9))
            self._put(bass, self.kick() * GAIN["kick"] / GAIN["bass"], t0 + 8 * st, self._vel(.7))
            # shaker: sixteenths, the off-beat eighth leads
            for s in range(16):
                v = SHAKER[s % 4] * (1.12 if second and s % 4 == 1 else 1)
                self._put(shk_env, hit, t0 + s * st + self._hum(.003), self._vel(v), "shaker")
        # shaker body: band noise 5–10 kHz under the hit envelopes
        noise = self.rng.standard_normal(n).astype(np.float32)
        shaker = signal.sosfilt(signal.butter(4, [5000, 10000], btype="band", fs=sr, output="sos"), noise).astype(np.float32) * shk_env
        # awe: a soft high swell (D5, F#5, A5, D6), no attack
        for ta in self._awe:
            for m, g in ((74, .18), (78, .16), (81, .14), (86, .07)):
                self._put(air, self.pad_note(hz(m), 2.6, att=1.6, rel=2.4) * g, ta - .4)
        c_arp = self._curve(self.keys["arp"])
        c_perc = c_arp if self.keys.get("perc") is None else self._curve(self.keys["perc"])
        parts = {"marimba": mar * GAIN["mar"] * c_arp, "pizz": lp1(pizz, 3000, sr) * GAIN["pizz"] * c_arp,
                 "bass_kick": lp1(bass, 900, sr) * GAIN["bass"] * self._curve(self.keys["bass"]),
                 "pad": lp1(pad, 1400, sr) * GAIN["pad"] * self._curve(self.keys["pad"]), "air": air * GAIN["air"]}
        tonal = sum(parts.values())
        tonal = bell(tonal, 2500, -5.0, .7, sr)
        tonal = lp1(tonal, 5000, sr)
        tonal = signal.sosfilt(signal.butter(2, 40, btype="high", fs=sr, output="sos"), tonal).astype(np.float32)
        parts["shaker"] = shaker * GAIN["shaker"] * c_perc
        y = tonal + parts["shaker"]
        # drop-outs on the turns
        tt = np.arange(n) / sr
        gate = np.ones(n, np.float32)
        for a, b in self._breaks:
            out = np.clip((tt - a) / .25, 0, 1)
            back = np.clip((tt - b) / .6, 0, 1)
            gate *= 1 - out * (1 - back)
        y *= gate
        # the last chord: D major, pizz strum, a rolled marimba arpeggio up, bass and pad left to ring
        if self._final is not None:
            tf = self._final
            fin = np.zeros(n, np.float32)
            self._put(fin, self.bass_note(38, 3.5) * GAIN["bass"], tf, .9)
            for k, m in enumerate((50, 57, 62, 66)):
                self._put(fin, lp1(self.pizz(m), 3000, sr) * GAIN["pizz"], tf + .012 * k, .6)
            for k, m in enumerate((62, 66, 69, 74)):
                self._put(fin, self.marimba(m) * GAIN["mar"], tf + .05 + .045 * k, .48)
            for m in (50, 57, 62, 66, 69):
                self._put(fin, lp1(self.pad_note(hz(m), 2.0, att=.4, rel=2.5), 1400, sr) * GAIN["pad"], tf, 1.2)
            fin = lp1(bell(fin, 2500, -5.0, .7, sr), 5000, sr)
            y = y * (1 - np.clip((tt - tf + .3) / .3, 0, 1)) + fin
        # a short room (mono)
        rt = 1.1
        ir_t = self._t(rt)
        ir = self.rng.standard_normal(len(ir_t)).astype(np.float32) * np.exp(-ir_t * 6.9 / rt)
        ir = lp1(ir, 3000, sr)
        wet = signal.fftconvolve(y, ir)[:n].astype(np.float32)
        wet *= np.sqrt((y ** 2).mean() + 1e-12) / (np.sqrt((wet ** 2).mean()) + 1e-12)
        y = .8 * y + .2 * wet
        peak = np.abs(y).max() + 1e-9
        if self.debug:
            self.parts = {k: v / peak for k, v in parts.items()}
        return (y / peak).astype(np.float32)
