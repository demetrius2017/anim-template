"""Own music bed, style 3 «Лёгкий бит», for «Что такое время» (own synthesis: numpy/scipy, no samples, no quotes).

Owner 03.11 on the piano bed (A minor, 84 BPM): «музыка унылая (». This one is bright and moving: D major, 100 BPM,
a light sixteenth swing. Eight-bar cycle, sevenths throughout:
    Dmaj9 | Gmaj7 | Bm9 | A7sus4 || Dmaj9 | F#m7 | Gmaj7 | Em7 A7
A plucked synth plays the chord tones on a syncopated 3-3-2 sixteenth grid (D4–G5), a round synth bass bounces under
it, a soft pad holds the chord and breathes with the kick; the groove is soft: kick on 1 and 3 (a pickup on «and of 2»
every second bar), a quiet snare on 2 and 4, a shaker-hat in sixteenths with the offbeat eighths accented.
Mono from the start, the pad is exactly tuned (no beating between voices, no LFO) — LEARNINGS 28.10, L15.
Room for the voice: tonal parts are low-passed (pad 1.4 kHz, bass 0.7 kHz, plucks have their 1–4 kHz partials 3 dB
down and dying fast), the whole bed gets a broad −4 dB dip centred at 2.2 kHz; the only noise (shaker, snare)
sits above 5 kHz with 2–3 ms attacks, so nothing sharp lands on the words.

Drop-in for eps/time_states_p1/music_bed.py (same interface, mix.py unchanged):
    from music_bed import Score
    sc = Score(n_samples, sr)
    sc.layer("pad", [(0, 0), (2, 1), ...])      # linear gain keys per layer: pad, arp (plucks), bass, drums, air
    sc.breaks([(33.0, 37.3)])                   # drop-outs: .25 s out; back in on the beat nearest the end
    sc.awe([5.0, 121.0])                        # a soft high swell at scale points
    sc.final(170.5)                             # a last chord that rings from this time
    y = sc.render()                             # float32 mono, peak-normalised
"drums" is optional: when a plan does not set it, the groove follows the plucks (square root of the arp gain), so a
plan written for the piano bed thins and builds the beat together with the arpeggio.
"""
import numpy as np
from scipy import signal

BPM = 100
SWING = .12                     # off-sixteenths late by 12% of a sixteenth (18 ms at 100 BPM)

# one cycle = 8 bars; a bar is a list of (start beat, bass midi, pad midis, pluck midis for the hits in that span)
_D9 = (38, [54, 57, 61, 64], [74, 69, 76, 78, 73, 76])      # Dmaj9   D | F# A C# E
_G7 = (43, [55, 59, 62, 66], [71, 67, 74, 78, 74, 71])      # Gmaj7   G | G B D F#
_Bm9 = (35, [57, 61, 62, 66], [73, 66, 69, 74, 71, 73])     # Bm9     B | A C# D F#
_A7s = (33, [55, 57, 62, 64], [76, 69, 74, 79, 76, 74])     # A7sus4  A | G A D E
_Fm7 = (42, [57, 61, 64, 66], [73, 66, 69, 76, 73, 69])     # F#m7    F# | A C# E F#
_Em7 = (40, [55, 59, 62, 64], [71, 67, 74])                 # Em7     E | G B D E   (half bar)
_A7 = (33, [55, 57, 61, 64], [73, 69, 76])                  # A7      A | G A C# E  (half bar)
CYCLE = [[(0, *_D9)], [(0, *_G7)], [(0, *_Bm9)], [(0, *_A7s)],
         [(0, *_D9)], [(0, *_Fm7)], [(0, *_G7)], [(0, *_Em7), (2, *_A7)]]

PLUCK_A = [(0, 1.0), (3, .72), (6, .82), (8, .92), (11, .7), (14, .76)]    # 3-3-2-3-3-2
PLUCK_B = [(0, 1.0), (3, .72), (6, .82), (10, .88), (12, .7), (14, .78)]   # 3-3-4-2-2
BASS = [(0, 0, 1.0, .42), (3, 0, .62, .22), (6, 12, .5, .14), (8, 0, .86, .36), (11, 0, .58, .2), (14, 7, .52, .2)]
SHAKER = [.34, .16, .66, .2]                     # per sixteenth in a beat: offbeat eighth accented
TARGET_DB = {"pad": -16.0, "arp": -9.0, "bass": -11.0, "kick": -13.5, "snare": -20.0, "hat": -25.5}
FINAL = (38, [50, 57, 61, 64, 66], [62, 69, 73, 76, 78, 81])   # Dmaj9 struck and left to ring


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lp1(x, fc, sr, order=2):
    """Butterworth low-pass (the name is kept from the piano bed)."""
    return signal.sosfilt(signal.butter(order, fc, fs=sr, output="sos"), x).astype(np.float32)


def _band(x, lo, hi, sr):
    return signal.sosfilt(signal.butter(2, [lo, hi], btype="band", fs=sr, output="sos"), x).astype(np.float32)


def _peq(x, f0, gain_db, q, sr):
    """RBJ peaking EQ."""
    a = 10 ** (gain_db / 40)
    w = 2 * np.pi * f0 / sr
    al = np.sin(w) / (2 * q)
    b = np.array([1 + al * a, -2 * np.cos(w), 1 - al * a])
    d = np.array([1 + al / a, -2 * np.cos(w), 1 - al / a])
    return signal.lfilter(b / d[0], d / d[0], x).astype(np.float32)


def _rms(x):
    return float(np.sqrt(np.mean(np.square(x, dtype=np.float64)) + 1e-18))


class Score:
    def __init__(self, n, sr, seed=7):
        self.n, self.sr = n, sr
        self.rng = np.random.default_rng(seed)
        self.keys = {"pad": [(0, 1)], "arp": [(0, 1)], "bass": [(0, 1)], "drums": None, "air": [(0, 0)]}
        self._breaks, self._awe, self._final = [], [], None
        self.beat = 60 / BPM
        self.bar = 4 * self.beat
        self.s16 = self.beat / 4
        self._cache = {}

    # ---- plan (same as the piano bed)
    def layer(self, name, keys):
        self.keys[name] = sorted(keys)

    def breaks(self, spans):
        self._breaks = [(a, b) for a, b in spans if b > a]

    def awe(self, times):
        self._awe = list(times)

    def final(self, t):
        self._final = t

    # ---- instruments
    def _t(self, dur):
        return np.arange(int(dur * self.sr)) / self.sr

    def pluck(self, m, dur=.95, ring=1.0):
        """Synth pluck: partials die faster the higher they are (a closing filter); 1–4 kHz partials at −3 dB."""
        key = ("pl", m, dur, ring)
        if key not in self._cache:
            t, f0 = self._t(dur), hz(m)
            y = np.zeros_like(t)
            for k in range(1, 14):
                fk = k * f0
                if fk > 5200:
                    break
                a = (1.15 if k % 2 else 1.0) / k ** 1.25
                if fk > 1000:
                    a *= .7
                y += a * np.sin(2 * np.pi * fk * t + .7 * k) * np.exp(-t * (3.2 + 2.1 * k) / ring)
            y *= np.clip(t / .004, 0, 1) * np.clip((dur - t) / .08, 0, 1)
            self._cache[key] = y.astype(np.float32)
        return self._cache[key]

    def bass_note(self, m, dur):
        key = ("ba", m, round(dur, 3))
        if key not in self._cache:
            t, f0 = self._t(dur + .04), hz(m)
            y = (np.sin(2 * np.pi * f0 * t) + .45 * np.sin(4 * np.pi * f0 * t) + .2 * np.sin(6 * np.pi * f0 * t)
                 + .07 * np.sin(8 * np.pi * f0 * t))
            y = np.tanh(1.3 * y) / np.tanh(1.3)          # a little grit: the bass is heard on a phone speaker
            env = np.clip(t / .005, 0, 1) * np.exp(-t * 1.6) * np.clip((dur + .04 - t) / .04, 0, 1)
            self._cache[key] = (y * env).astype(np.float32)
        return self._cache[key]

    def pad_note(self, m, dur, att=.09, rel=.55):
        key = ("pa", m, round(dur, 3), att, rel)
        if key not in self._cache:
            t, f0 = self._t(dur + rel), hz(m)
            y = (np.sin(2 * np.pi * f0 * t) + .35 * np.sin(4 * np.pi * f0 * t) + .15 * np.sin(6 * np.pi * f0 * t)
                 + .06 * np.sin(8 * np.pi * f0 * t))
            env = np.clip(t / att, 0, 1) ** 2 * np.clip((dur + rel - t) / rel, 0, 1)
            self._cache[key] = (y * env).astype(np.float32)
        return self._cache[key]

    def kick(self):
        if "kick" not in self._cache:
            t = self._t(.34)
            f = 50 + 78 * np.exp(-t * 30)
            y = np.sin(2 * np.pi * np.cumsum(f) / self.sr) * np.exp(-t * 9.5)
            click = lp1(np.random.default_rng(3).standard_normal(len(t)), 1800, self.sr) * np.exp(-t * 260) * .12
            y = (y + click) * np.clip(t / .0015, 0, 1) * np.clip((.34 - t) / .05, 0, 1)
            self._cache["kick"] = y.astype(np.float32)
        return self._cache["kick"]

    def snare(self, i):
        key = ("sn", i % 4)
        if key not in self._cache:
            t = self._t(.26)
            r = np.random.default_rng(20 + i % 4)
            body = .6 * np.sin(2 * np.pi * 188 * t) * np.exp(-t * 26) + .22 * np.sin(2 * np.pi * 331 * t) * np.exp(-t * 34)
            hiss = _band(r.standard_normal(len(t)), 5200, 9800, self.sr) * np.exp(-t * 23) * 1.4
            thud = _band(r.standard_normal(len(t)), 220, 820, self.sr) * np.exp(-t * 40) * .35
            y = (body + hiss + thud) * np.clip(t / .0025, 0, 1) * np.clip((.26 - t) / .05, 0, 1)
            self._cache[key] = y.astype(np.float32)
        return self._cache[key]

    def hat(self, i):
        key = ("hh", i % 6)
        if key not in self._cache:
            t = self._t(.1)
            x = np.random.default_rng(40 + i % 6).standard_normal(len(t))
            y = _band(x, 6800, 12500, self.sr) * np.clip(t / .003, 0, 1) * np.exp(-t * 52) * np.clip((.1 - t) / .02, 0, 1)
            self._cache[key] = y.astype(np.float32)
        return self._cache[key]

    # ---- helpers
    def _curve(self, keys):
        ts = np.array([k[0] for k in keys]) * self.sr
        vs = np.array([k[1] for k in keys], float)
        return np.interp(np.arange(self.n), ts, vs).astype(np.float32)

    def _put(self, dst, src, t0, g=1.0):
        i = int(round(t0 * self.sr))
        if i >= len(dst):
            return
        if i < 0:
            src, i = src[-i:], 0
        m = min(len(src), len(dst) - i)
        if m > 0:
            dst[i:i + m] += src[:m] * g

    def _when(self, bar, step):
        """Time of a sixteenth step of a bar, with swing on the off-sixteenths."""
        return bar * self.bar + step * self.s16 + (SWING * self.s16 if step % 2 else 0.0)

    def _chord_at(self, t):
        b = int(t // self.bar)
        beat = (t - b * self.bar) / self.beat
        spans = CYCLE[b % len(CYCLE)]
        return [s for s in spans if s[0] <= beat + 1e-6][-1]

    def _snap(self, t):
        return round(t / self.beat) * self.beat

    # ---- render
    def render(self):
        sr, n = self.sr, self.n
        S = {k: np.zeros(n, np.float32) for k in ("pad", "arp", "bass", "kick", "snare", "hat")}
        kicks = []
        nbars = int(n / sr / self.bar) + 2
        for b in range(nbars):
            cyc, pos = divmod(b, len(CYCLE))
            spans = CYCLE[pos]
            pattern = PLUCK_A if b % 2 == 0 else PLUCK_B
            for j, (beat0, bn, pn, an) in enumerate(spans):
                beat1 = spans[j + 1][0] if j + 1 < len(spans) else 4
                t0, dur = b * self.bar + beat0 * self.beat, (beat1 - beat0) * self.beat
                for m in pn:
                    self._put(S["pad"], self.pad_note(m, dur), t0, .25)
                hits = [(s, v) for s, v in pattern if beat0 * 4 <= s < beat1 * 4]
                notes = an if cyc % 2 == 0 else an[::-1]          # the second pass of the cycle runs the other way
                for k, (step, vel) in enumerate(hits):
                    v = vel * (.9 + .1 * self.rng.random())
                    self._put(S["arp"], self.pluck(notes[k % len(notes)]), self._when(b, step) + self.rng.normal(0, .003), v)
                for step, semi, vel, d in BASS:
                    if beat0 * 4 <= step < beat1 * 4:
                        self._put(S["bass"], self.bass_note(bn + semi, d), self._when(b, step), vel)
            # groove
            ksteps = [0, 8] + ([6] if b % 2 else [])
            for step in ksteps:
                tk = self._when(b, step)
                kicks.append(tk)
                self._put(S["kick"], self.kick(), tk, .55 if step == 6 else 1.0)
            for step in (4, 12):
                self._put(S["snare"], self.snare(b * 2 + step), self._when(b, step), 1.0)
            if pos == 7:                                          # a small fill into the next cycle
                self._put(S["snare"], self.snare(b + 1), self._when(b, 13), .28)
                self._put(S["snare"], self.snare(b + 2), self._when(b, 15), .4)
            for step in range(16):
                v = SHAKER[step % 4] * (.85 + .3 * self.rng.random())
                if pos == 7 and step >= 12:
                    v = max(v, .5)
                self._put(S["hat"], self.hat(b * 16 + step), self._when(b, step), v)
        # the pad breathes with the kick (a light pump, ~2.5 dB)
        pump = np.ones(n, np.float32)
        shape = 1 - .25 * np.exp(-np.arange(int(.45 * sr)) / (.13 * sr))
        for tk in kicks:
            i = int(tk * sr)
            if 0 <= i < n:
                m = min(len(shape), n - i)
                pump[i:i + m] = np.minimum(pump[i:i + m], shape[:m])
        S["pad"] = lp1(S["pad"], 1400, sr) * pump
        S["bass"] = lp1(S["bass"], 700, sr)
        S["kick"] = lp1(S["kick"], 2500, sr)
        # stems to a fixed balance (RMS), so the mix does not depend on note counts
        gain = {k: 10 ** (TARGET_DB[k] / 20) / (_rms(x) + 1e-9) for k, x in S.items()}
        S = {k: x * gain[k] for k, x in S.items()}
        drums_keys = self.keys.get("drums")
        c = {k: self._curve(self.keys[k]) for k in ("pad", "arp", "bass")}
        c["drums"] = self._curve(drums_keys) if drums_keys else np.sqrt(np.clip(c["arp"], 0, None))
        tonal_dry = S["bass"] * c["bass"]
        tonal_wet = S["pad"] * c["pad"] + S["arp"] * c["arp"]
        drums = (S["kick"] + S["hat"]) * c["drums"]
        snare = S["snare"] * c["drums"]
        # drop-outs on the turns: tonal out over .25 s, drums out over .1 s; all back on the beat nearest the end,
        # announced by a reversed swell of the chord that comes back
        tt = np.arange(n) / sr
        g_t, g_d = np.ones(n, np.float32), np.ones(n, np.float32)
        fx = np.zeros(n, np.float32)
        for a, b in self._breaks:
            te = max(self._snap(b), a + .5)
            g_t *= 1 - np.clip((tt - a) / .25, 0, 1) * (1 - np.clip((tt - te + .12) / .15, 0, 1))
            g_d *= 1 - np.clip((tt - a) / .1, 0, 1) * (1 - np.clip((tt - te + .005) / .01, 0, 1))
            _, bn, pn, _ = self._chord_at(te + .01)
            for m in pn + [pn[-1] + 12]:
                self._put(fx, self.pad_note(m, 1.1, att=1.1, rel=.02), te - 1.1, .3 * gain["pad"])
        tonal_dry, tonal_wet, drums, snare = tonal_dry * g_t, tonal_wet * g_t, drums * g_d, snare * g_d
        fx = lp1(fx, 1600, sr)
        # awe: a soft high swell (A5, C#6, E6 entering one after another), no attacks
        air = np.zeros(n, np.float32)
        for ta in self._awe:
            for k, (m, g) in enumerate(((81, .2), (85, .17), (88, .14))):
                self._put(air, self.pad_note(m, 2.4, att=1.3, rel=2.2) * g * gain["pad"], ta - .4 + .22 * k)
        air = lp1(air, 3000, sr)
        # the last chord: the bed fades into it, it is struck on the end title and left to ring (after the gates)
        fin_dry, fin_wet = np.zeros(n, np.float32), np.zeros(n, np.float32)
        if self._final is not None:
            tf = self._final
            out = 1 - np.clip((tt - tf + .3) / .3, 0, 1)
            tonal_dry, tonal_wet, drums, snare = tonal_dry * out, tonal_wet * out, drums * out, snare * out
            bn, pn, an = FINAL
            for k, m in enumerate(an):
                self._put(fin_wet, self.pluck(m, 3.6, ring=3.2), tf + .014 * k, (1 - .06 * k) * gain["arp"])
            for m in pn:
                self._put(fin_wet, lp1(self.pad_note(m, 1.6, att=.05, rel=2.6), 1400, sr) * .25 * gain["pad"], tf)
            self._put(fin_dry, lp1(self.bass_note(bn, 2.2), 700, sr), tf, gain["bass"])
            self._put(fin_dry, lp1(self.kick(), 2500, sr), tf, .8 * gain["kick"])
        # a short mono room on the plucks, pad, swells and snare; bass and kick stay dry
        lush = tonal_wet + air + fx + fin_wet
        send = lush + .5 * snare
        rt = 1.3
        ir_t = np.arange(int(rt * sr)) / sr
        ir = lp1(self.rng.standard_normal(len(ir_t)).astype(np.float32) * np.exp(-ir_t * 6.9 / rt), 3500, sr)
        wet = signal.fftconvolve(send, ir)[:n].astype(np.float32)
        wet *= _rms(send) / (_rms(wet) + 1e-12)
        y = tonal_dry + fin_dry + drums + snare + lush + .24 * wet
        # room for the voice: −4 dB over 1–4 kHz; soften the very top; no rumble
        y = _peq(y, 2200, -4.0, .6, sr)
        y = lp1(y, 10000, sr)
        y = signal.sosfilt(signal.butter(2, 32, btype="high", fs=sr, output="sos"), y).astype(np.float32)
        return (y / (np.abs(y).max() + 1e-9)).astype(np.float32)
