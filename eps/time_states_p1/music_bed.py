"""Own music bed for «Что такое время» (variant B, $0, no external files): a calm, curious piano with a soft pad.

Owner 03.11: «не хватает фоновой музыки — стоит гул». The drone goes; this bed carries the part instead.
Genre (studio/genres/science_explainer.md): no vocals, 84 BPM, calm curiosity, «awe» at scale points, thinning
before the conclusion. A minor, four chords one bar each: Am9 | Fmaj7 | Cadd9 | G6. The piano plays a sparse 3+3+2
figure (eighths 0, 3, 6 of the bar) with small velocity and timing variation — a gentle figure, not a clock.
Mono from the start (Mix is mono): no stereo-to-mono comb «pulse»; the pad is exactly tuned (no beating between
detuned voices) and has no LFO, so nothing throbs (LEARNINGS 28.10, L15).

    from music_bed import Score
    sc = Score(n_samples, sr)
    sc.layer("pad", [(0, 0), (2, 1), ...])      # linear gain keys per layer: pad, arp, bass, air
    sc.breaks([(33.0, 37.3)])                   # drop-outs: .25 s out, .6 s back in
    sc.awe([5.0, 121.0])                        # high shimmer swells at scale points
    sc.final(170.5)                             # a last chord that rings from this time
    y = sc.render()                             # float32 mono, peak-normalised
"""
import numpy as np

BPM = 84
CHORDS = [  # (bass midi, pad midis, arp midis)
    (45, [57, 60, 64, 71], [69, 72, 76, 71]),   # Am9
    (41, [53, 57, 60, 64], [65, 69, 72, 76]),   # Fmaj7
    (48, [55, 60, 62, 64], [67, 72, 74, 76]),   # Cadd9
    (43, [55, 59, 62, 64], [67, 71, 74, 79]),   # G6
]
SLOTS = [(0, 1.0), (3, .78), (6, .66)]           # eighth-note slot, velocity


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def lp1(x, fc, sr):
    """One-pole low-pass, twice (soft 12 dB/oct), vectorised through scipy if present."""
    from scipy import signal
    sos = signal.butter(2, fc, fs=sr, output="sos")
    return signal.sosfilt(sos, x).astype(np.float32)


class Score:
    def __init__(self, n, sr, seed=7):
        self.n, self.sr = n, sr
        self.rng = np.random.default_rng(seed)
        self.keys = {"pad": [(0, 1)], "arp": [(0, 1)], "bass": [(0, 1)], "air": [(0, 0)]}
        self._breaks, self._awe, self._final = [], [], None
        self.beat = 60 / BPM
        self.bar = 4 * self.beat

    # ---- plan
    def layer(self, name, keys):
        self.keys[name] = sorted(keys)

    def breaks(self, spans):
        self._breaks = [(a, b) for a, b in spans if b > a]

    def awe(self, times):
        self._awe = list(times)

    def final(self, t):
        self._final = t

    # ---- instruments
    def piano(self, f0, dur, vel):
        sr = self.sr
        t = np.arange(int(dur * sr)) / sr
        B = .00035
        y = np.zeros_like(t)
        for k in range(1, 9):
            fk = k * f0 * np.sqrt(1 + B * k * k)
            if fk > sr / 2.4:
                break
            y += (1 / k ** 1.25) * np.sin(2 * np.pi * fk * t + .3 * k) * np.exp(-t * (.9 + .55 * k) * (f0 / 440) ** .35)
        att = np.clip(t / .006, 0, 1)
        rel = np.clip((dur - t) / .25, 0, 1)
        hammer = self.rng.standard_normal(len(t)) * np.exp(-t * 90) * .04
        return ((y * att * rel + hammer) * vel).astype(np.float32)

    def pad_note(self, f0, dur, att=1.0, rel=1.4):
        sr = self.sr
        t = np.arange(int((dur + rel) * sr)) / sr
        y = np.sin(2 * np.pi * f0 * t) + .28 * np.sin(4 * np.pi * f0 * t) + .1 * np.sin(6 * np.pi * f0 * t)
        env = np.clip(t / att, 0, 1) ** 2 * np.clip((dur + rel - t) / rel, 0, 1)
        return (y * env).astype(np.float32)

    # ---- render
    def _curve(self, keys):
        ts = np.array([k[0] for k in keys]) * self.sr
        vs = np.array([k[1] for k in keys], float)
        return np.interp(np.arange(self.n), ts, vs).astype(np.float32)

    def _put(self, dst, src, t0):
        i = int(round(t0 * self.sr))
        if i >= len(dst):
            return
        if i < 0:
            src, i = src[-i:], 0
        m = min(len(src), len(dst) - i)
        dst[i:i + m] += src[:m]

    def render(self):
        sr, n = self.sr, self.n
        dur = n / sr
        pad, arp, bass, air = (np.zeros(n, np.float32) for _ in range(4))
        nbars = int(dur / self.bar) + 2
        for b in range(nbars):
            t0 = b * self.bar
            bn, pn, an = CHORDS[b % 4]
            for m in pn:
                self._put(pad, self.pad_note(hz(m), self.bar, att=.9, rel=1.3) * .25, t0)
            self._put(bass, self.pad_note(hz(bn), self.bar, att=.35, rel=1.0) * .5, t0)
            for j, (slot, vel) in enumerate(SLOTS):
                m = an[(b + j) % len(an)] if j else an[0]
                jitter = self.rng.normal(0, .008)
                v = vel * (.88 + .12 * self.rng.random())
                self._put(arp, self.piano(hz(m), 2.6, v * .55), t0 + slot * self.beat / 2 + jitter)
            if b % 2 == 0:   # a low piano octave under every second bar: warmth on a phone speaker
                self._put(arp, self.piano(hz(bn + 12), 3.2, .32), t0 + .01)
        # awe: two high pad voices (E6, B5) swell and fade over ~5 s at scale points
        for ta in self._awe:
            for m, g in ((88, .16), (83, .2), (76, .18)):
                x = self.pad_note(hz(m), 2.6, att=1.6, rel=2.4) * g
                self._put(air, x, ta - .4)
        y = (pad * self._curve(self.keys["pad"]) + arp * self._curve(self.keys["arp"])
             + bass * self._curve(self.keys["bass"]) + air)
        y = lp1(y, 5200, sr)
        # drop-outs on the turns
        gate = np.ones(n, np.float32)
        tt = np.arange(n) / sr
        for a, b in self._breaks:
            out = np.clip((tt - a) / .25, 0, 1)
            back = np.clip((tt - b) / .6, 0, 1)
            gate *= 1 - out * (1 - back)
        y *= gate
        # the last chord: struck on the end title and left to ring (after the gate: it is the ending)
        if self._final is not None:
            fin = np.zeros(n, np.float32)
            for m, g in ((45, .5), (52, .4), (57, .45), (60, .4), (64, .42), (71, .3), (76, .22)):
                self._put(fin, self.piano(hz(m), 4.5, g), self._final + .012 * (m % 5))
                self._put(fin, self.pad_note(hz(m), 2.0, att=.6, rel=2.5) * .12, self._final)
            y = y * (1 - np.clip((tt - self._final + .3) / .3, 0, 1)) + lp1(fin, 5200, sr)
        # a short reverb tail (mono)
        rt = 2.2
        ir_t = np.arange(int(rt * sr)) / sr
        ir = self.rng.standard_normal(len(ir_t)).astype(np.float32) * np.exp(-ir_t * 6.9 / rt)
        ir = lp1(ir, 3800, sr)
        from scipy import signal
        wet = signal.fftconvolve(y, ir)[:n].astype(np.float32)
        wet *= np.sqrt((y ** 2).mean() + 1e-12) / (np.sqrt((wet ** 2).mean()) + 1e-12)
        y = .72 * y + .28 * wet
        return (y / (np.abs(y).max() + 1e-9)).astype(np.float32)
