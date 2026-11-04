"""Bed «Открытие» (music sample 2) for «Что такое время»: bright, curious and moving. The owner heard the A-minor
piano bed (time_states_p1/music_bed.py) and said «музыка унылая (».

Eb major, 96 BPM, one chord a bar: Eb | Bb | Cm7 | Abmaj7 (I–V–vi–IV, 10 s a cycle). A celesta plays an eighth-note
arpeggio in a 3+3+2 accent grouping that climbs through each bar (the 9th and 7th as colour on weak eighths); soft
mallet chords answer on 2 and 4; a warm bass bounces (root on 1, the «and» of 2, beat 3, a fifth/octave pickup);
a soft kick on 1 and 3; a quiet pad glues it. Every second cycle the mallets add the «and» of 4 and bars 2 and 4
end on a sixteenth flourish. Awe points get a soft celesta run up the pentatonic and a high swell; the final is a
rolled Eb chord. Own synthesis only (numpy/scipy), no samples, no quoted melodies.
Room for the voice: the celesta sits at 390–1250 Hz with its bright partials short and quiet; pad and mallets are
low-passed; the whole bed gets a broad −6 dB dip at 2.2 kHz (about 1–4 kHz) and a low-pass at 7 kHz; no hats, claps or noise
attacks. Mono, exactly tuned voices, no LFO, nothing throbs (LEARNINGS 28.10, L15).

Same interface as time_states_p1/music_bed.py, a drop-in for mix.py:
    from bed import Score
    sc = Score(n_samples, sr)
    sc.layer("pad", [(0, 0), (2, 1), ...])   # linear gain keys: pad, arp (celesta + mallets), bass;
                                             # the kick follows bass unless sc.layer("kick", ...) is set
    sc.breaks([(33.0, 37.3)])                # drop-outs: .25 s out, .6 s back in
    sc.awe([5.0, 121.0])                     # celesta run + high swell at scale points
    sc.final(170.5)                          # a last chord that rings from this time
    y = sc.render()                          # float32 mono, peak-normalised
"""
import numpy as np
from scipy import signal

BPM = 96
# (bass midi, pad voicing, arpeggio tones low→high, mallet chord)
CHORDS = [
    (39, [55, 58, 63, 67], [70, 75, 77, 79, 82, 87], [63, 67, 70]),   # Eb (add9 in the arpeggio)
    (34, [53, 58, 62, 65], [70, 74, 77, 82, 84, 86], [62, 65, 70]),   # Bb (add9)
    (36, [55, 58, 60, 63], [67, 72, 75, 79, 82, 84], [60, 63, 67]),   # Cm7
    (32, [56, 60, 63, 67], [68, 72, 75, 79, 80, 84], [60, 63, 68]),   # Abmaj7
]
ARP = [[0, 2, 3, 1, 3, 4, 5, 3],          # tone index per eighth, 3+3+2: up, up, peak and back
       [1, 3, 4, 2, 4, 5, 3, 4]]
VEL = [1.0, .5, .62, .9, .52, .62, .86, .58]
BASS = [  # (eighth, length in eighths, interval, velocity)
    [(0, 2.6, 0, 1.0), (3, .9, 0, .7), (4, 2.7, 0, .9), (7, .85, 7, .6)],
    [(0, 2.6, 0, 1.0), (3, .9, 0, .7), (4, 1.8, 0, .9), (6, .85, 12, .55), (7, .85, 7, .6)],
]
RUN = [75, 77, 79, 82, 84, 87, 89, 91, 94]   # Eb major pentatonic, Eb5 → Bb6: fits all four chords
LEVEL_DB = {"cel": 0, "bass": -3, "kick": -6, "mal": -8, "pad": -9}   # bus RMS before the layer curves


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def db(x):
    return 10 ** (x / 20)


def filt(x, kind, fc, sr, order=2):
    return signal.sosfilt(signal.butter(order, fc, btype=kind, fs=sr, output="sos"), x).astype(np.float32)


def peaking(x, f0, gain_db, q, sr):
    """RBJ peaking EQ."""
    A, w0 = 10 ** (gain_db / 40), 2 * np.pi * f0 / sr
    al, c = np.sin(w0) / (2 * q), np.cos(w0)
    b = np.array([1 + al * A, -2 * c, 1 - al * A])
    a = np.array([1 + al / A, -2 * c, 1 - al / A])
    return signal.lfilter(b / a[0], a / a[0], x).astype(np.float32)


class Score:
    def __init__(self, n, sr, seed=7):
        self.n, self.sr = n, sr
        self.rng = np.random.default_rng(seed)
        self.keys = {"pad": [(0, 1)], "arp": [(0, 1)], "bass": [(0, 1)], "air": [(0, 0)]}
        self._breaks, self._awe, self._final = [], [], None
        self.beat = 60 / BPM
        self.bar = 4 * self.beat
        self.e8 = self.beat / 2

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
    def _t(self, dur):
        return np.arange(int(dur * self.sr)) / self.sr

    def celesta(self, f0, dur, vel):
        """Struck bar over a resonator: near-sine body, a short octave shimmer, a very short metallic partial."""
        t = self._t(dur)
        d = 2.0 * (f0 / 700) ** .45
        y = (np.sin(2 * np.pi * f0 * t) * np.exp(-t * d)
             + .12 * np.sin(2 * np.pi * 2 * f0 * t + .4) * np.exp(-t * d * 3.5)
             + .05 * np.sin(2 * np.pi * 3.93 * f0 * t + 1.1) * np.exp(-t * 28))
        env = np.clip(t / .004, 0, 1) * np.clip((dur - t) / .08, 0, 1)   # 4 ms onset: struck, not a click
        return (y * env * vel).astype(np.float32)

    def mallet(self, f0, dur, vel):
        """Soft marimba-like chord tone: body plus the tuned 4th partial, both short."""
        t = self._t(dur)
        y = np.sin(2 * np.pi * f0 * t) * np.exp(-t * 6.5) + .12 * np.sin(2 * np.pi * 4 * f0 * t) * np.exp(-t * 32)
        env = np.clip(t / .003, 0, 1) * np.clip((dur - t) / .05, 0, 1)
        return (y * env * vel).astype(np.float32)

    def bass_note(self, f0, dur, vel, rel=.06):
        t = self._t(dur + rel)
        y = (np.sin(2 * np.pi * f0 * t) + .5 * np.sin(4 * np.pi * f0 * t) + .2 * np.sin(6 * np.pi * f0 * t)
             + .07 * np.sin(8 * np.pi * f0 * t))
        env = np.clip(t / .006, 0, 1) * (.62 + .38 * np.exp(-t * 7)) * np.clip((dur + rel - t) / rel, 0, 1)
        return (y * env * vel).astype(np.float32)

    def kick(self, vel):
        """Soft kick: a sine sweeping 145 → 50 Hz, no click."""
        t = self._t(.5)
        f = 50 + 95 * np.exp(-t * 32)
        y = np.sin(2 * np.pi * np.cumsum(f) / self.sr) * np.exp(-t * 8) * np.clip(t / .0015, 0, 1)
        return (y * vel).astype(np.float32)

    def pad_note(self, f0, dur, att=.6, rel=1.0):
        t = self._t(dur + rel)
        y = sum(.62 ** (k - 1) * np.sin(2 * np.pi * k * f0 * t + .7 * k) for k in range(1, 7))
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

    def _room(self, x):
        """Small mono room for the tonal parts (bass and kick stay dry)."""
        sr = self.sr
        if not hasattr(self, "_ir"):
            rt = 1.8
            t = np.arange(int(rt * sr)) / sr
            ir = np.random.default_rng(11).standard_normal(len(t)).astype(np.float32) * np.exp(-t * 6.9 / rt)
            self._ir = filt(filt(ir, "lowpass", 4000, sr), "highpass", 250, sr)
        wet = signal.fftconvolve(x, self._ir)[:len(x)].astype(np.float32)
        wet *= np.sqrt((x ** 2).mean() + 1e-12) / (np.sqrt((wet ** 2).mean()) + 1e-12)
        return .75 * x + .25 * wet

    def _eq(self, y):
        """Room for the voice: no rumble, a broad dip at 2.2 kHz, nothing bright on top."""
        y = filt(y, "highpass", 35, self.sr)
        y = peaking(y, 2200, -6.0, .55, self.sr)
        return filt(y, "lowpass", 7000, self.sr)

    def render(self):
        sr, n = self.sr, self.n
        dur = n / sr
        B = {k: np.zeros(n, np.float32) for k in ("pad", "cel", "mal", "bass", "kick", "air", "swell")}
        for b in range(int(dur / self.bar) + 2):
            t0 = b * self.bar
            bn, pv, at, st = CHORDS[b % 4]
            second = (b // 4) % 2 == 1                     # every second cycle: flourishes, the «and» of 4
            for m in pv:
                self._put(B["pad"], self.pad_note(hz(m), self.bar), t0)
            for s, (k, v) in enumerate(zip(ARP[b % 2], VEL)):
                v *= .9 + .1 * self.rng.random()
                if second and b % 2 and s == 7:            # a sixteenth flourish closes bars 2 and 4
                    for j, kk in enumerate((4, 5)):
                        self._put(B["cel"], self.celesta(hz(at[kk]), 1.4, v * (.8 + .15 * j)), t0 + (s + j / 2) * self.e8)
                    continue
                self._put(B["cel"], self.celesta(hz(at[k]), 1.6, v), t0 + s * self.e8 + self.rng.normal(0, .004))
            for s, v in ((2, .9), (6, .8)) + (((7, .45),) if second else ()):
                tm = t0 + s * self.e8 + self.rng.normal(0, .003)
                for m in st:
                    self._put(B["mal"], self.mallet(hz(m), .7, v), tm)
            for s, ln, iv, v in BASS[b % 2]:
                self._put(B["bass"], self.bass_note(hz(bn + iv), ln * self.e8 * .92, v), t0 + s * self.e8)
            for s, v in ((0, 1.0), (4, .82)):
                self._put(B["kick"], self.kick(v), t0 + s * self.e8)
        # awe: a soft celesta run up the pentatonic and a high swell (Eb6, Bb5, G5)
        for ta in self._awe:
            for j, m in enumerate(RUN):
                self._put(B["air"], self.celesta(hz(m), 1.8, .22 + .03 * j), ta - .45 + j * .07)
            for m, g in ((87, .1), (82, .12), (79, .12)):
                self._put(B["swell"], self.pad_note(hz(m), 2.4, att=1.4, rel=2.2) * g, ta - .3)
        B["pad"] = filt(B["pad"], "lowpass", 1500, sr)
        B["air"] += filt(B["swell"], "lowpass", 1600, sr)   # the swell: fundamentals only, no sustained 2–6 kHz
        B["bass"] = filt(B["bass"], "lowpass", 650, sr)
        B["kick"] = filt(B["kick"], "lowpass", 900, sr)
        g = {k: db(v) / (np.sqrt((B[k] ** 2).mean()) + 1e-12) for k, v in LEVEL_DB.items()}
        self.bus_gain = g
        cp, ca, cb = (self._curve(self.keys[k]) for k in ("pad", "arp", "bass"))
        ck = self._curve(self.keys["kick"]) if "kick" in self.keys else cb
        tonal = B["pad"] * g["pad"] * cp + (B["cel"] * g["cel"] + B["mal"] * g["mal"]) * ca + B["air"] * g["cel"]
        y = self._eq(self._room(tonal) + B["bass"] * g["bass"] * cb + B["kick"] * g["kick"] * ck)
        # drop-outs on the turns
        tt = np.arange(n) / sr
        gate = np.ones(n, np.float32)
        for a, b in self._breaks:
            out = np.clip((tt - a) / .25, 0, 1)
            back = np.clip((tt - b) / .6, 0, 1)
            gate *= 1 - out * (1 - back)
        y *= gate
        # the last chord: a rolled Eb, struck on the end title and left to ring (after the gate: it is the ending)
        if self._final is not None:
            tf = self._final
            fc, fp, fd = (np.zeros(n, np.float32) for _ in range(3))
            for j, m in enumerate((70, 75, 79, 82, 87)):
                self._put(fc, self.celesta(hz(m), 4.5, .75 - .07 * j) * g["cel"], tf + .055 * j)
            for m in (63, 67, 70):
                self._put(fc, self.mallet(hz(m), 1.2, .9) * g["mal"], tf)
            for m in (51, 55, 58, 63, 67):
                self._put(fp, self.pad_note(hz(m), 1.5, att=.25, rel=3.0) * g["pad"], tf)
            self._put(fd, self.bass_note(hz(39), 2.0, 1.0, rel=2.0) * g["bass"], tf)
            self._put(fd, self.kick(.8) * g["kick"], tf)
            fin = self._eq(self._room(fc + filt(fp, "lowpass", 1500, sr)) + filt(fd, "lowpass", 650, sr))
            y = y * (1 - np.clip((tt - tf + .3) / .3, 0, 1)) + fin
        return (y / (np.abs(y).max() + 1e-9)).astype(np.float32)
