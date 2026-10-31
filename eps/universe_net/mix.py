"""Own synthesis only, $0, no external files. Every time comes from M.MK.

Hook: drone from the first frame, it sags on «гаснет». Middle: tower tones, soft
impacts, a muffled hit on «Смерть» with a hush after it, the only sharp spot.
Attention part g1–g6: plain drone; a soft dull snap on «пасть», far below the hit;
the tower's own five tones climb quietly under «между слоями» and the top one lands
in the pause after it; from «Третий» the drone thins to −8 dB by «творцом», from
«вдруг» it keeps falling to an exact zero on «Богом». The word and the pause after
it stand on the voice alone. From s13a it returns very quietly over .8 s, then the
silence under s13.
Finale: the drone turns back on «вспять», thins out from «смотреть», is gone on
«Кроме», breathes in from «себя» under f6 and f6b and tops out on «интеллекта». From
«множества» the tower's own five tones climb very quietly under the voice, the top
one landing in the pause after «наблюдателей». On «нужен» the background sinks the
way it does on «гаснет» in the hook, level and pitch together, and it is an exact
zero just after f6b, so «Ты — её осознанность» is a clean voice. After the word a
soft two-note motif and the drone hold under the last frame; the drone ends at its
first-frame level because the film loops.
"""
from pathlib import Path
import sys
import json
import subprocess

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import numpy as np
from mixlib import Mix, SR, db, rms, fade, lp, reverb, thump
from audio_report import measure_audio, write_audio_report

M = Mix(work=Path(__file__).resolve().parent)
tt = np.arange(M.N) / SR
K = M.MK
after_word = round(K["answer_word"] + .9, 5)
background_gone = round(K["f6b_end"] + .15, 5)


def rise(a, b):
    """0 before a, 1 from b on, smoothstep between; exact outside the ramp."""
    q = np.clip((tt-a)/max(b-a, 1/SR), 0, 1)
    return q*q*(3-2*q)


def fall(a, b):
    return 1 - rise(a, b)


def note(hz, dur, decay, attack, release):
    """Decaying tone. The upper partials keep it audible on a phone speaker."""
    t = np.arange(int(dur*SR)) / SR
    body = np.sin(2*np.pi*hz*t) + .3*np.sin(4*np.pi*hz*t) + .1*np.sin(6*np.pi*hz*t)
    return fade(body*np.exp(-t*decay), attack, release)


# A smooth time turn, centred on the spoken word: forward velocity -> zero
# on K.reverse -> backwards. Integrated tanh keeps phase and slope continuous.
delta = tt-K["reverse"]
turn = .45
clock = K["reverse"] - turn*(np.logaddexp(delta/turn, -delta/turn)-np.log(2))
clock -= turn*np.log(2)
# «гаснет» in the hook: level and pitch sag with the dying picture, and return
# when the tower starts to build. «нужен» sinks over the same length as «гаснет»; its
# release lies in the silence, so the tail plays at full pitch. The clock runs backwards
# after K.reverse, hence the sign of speed: without it the pitch would go up there.
# Integrating keeps the phase continuous.
sag = (rise(K["h_fades"], K["h_why"]) * fall(K["h_you"], K["h_build"])
       + rise(K["needed"], K["needed"]+K["h_why"]-K["h_fades"]) * fall(background_gone, K["f7"]))
sink = 1 - (1-db(-4))*sag
speed = -np.tanh(delta/turn)
clock -= .025*np.cumsum(sag*speed)/SR
# The 220 Hz and higher partials are what is left of the drone on a phone speaker.
drone = (np.sin(2*np.pi*55*clock) + .35*np.sin(2*np.pi*82.4*clock) + .22*np.sin(2*np.pi*110.15*clock)
         + .25*np.sin(2*np.pi*220.3*clock) + .15*np.sin(2*np.pi*329.9*clock) + .08*np.sin(2*np.pi*440.7*clock))
breath = .8 + .2*np.sin(clock*.37)
drone *= breath
amb = drone * M.R_NARR / rms(drone) * db(-25) * M.duck(.35)

FLOORS = [164.81, 196, 220, 261.63, 329.63]  # E3 G3 A3 C4 E4, one tone per tower floor
music = np.zeros(M.N, np.float32)
for key, hz in zip(["chem", "organics", "cells", "organisms", "biosphere"], FLOORS):
    M.put(note(hz, 1.3, 3, .08, .35), K[key], dst=music)
tones_gain = M.R_NARR / rms(music) * db(-13)
# g4: the same tones, bottom to top, overlapping so they stack like the tower instead
# of playing a tune. The top one lands on the end of the phrase, in the voice's pause.
step = (K["sg4_end"]-K["g_between"]) / (len(FLOORS)-1)
for i, hz in enumerate(FLOORS):
    M.put(note(hz, 1.3, 3, .08, .35), K["g_between"]+i*step, db(-12), dst=music)
tones_duck = M.duck(.3)
music *= tones_gain * tones_duck
# f6b: the same climb far below the voice, from «множества» into the pause after
# «наблюдателей». Kept apart from music: the sections are zero here and would mute it.
climb_end = round(K["observers"] + .8, 5)
climb = np.zeros(M.N, np.float32)
step = (climb_end-K["many_layers"]) / (len(FLOORS)-1)
for i, hz in enumerate(FLOORS):
    M.put(note(hz, 1.3, 3, .08, .35), K["many_layers"]+i*step, db(-20), dst=climb)
climb *= tones_gain * tones_duck

for i, key in enumerate(["bond_weight", "like_neuron", "base_layer", "transformers"]):
    M.put(fade(thump(65+i*3, .32, 71+i) + .3*thump(195+i*9, .32, 81+i), .035, .15), K[key], db(-18))
# The voice leaves a real gap after «Смерть», right before K.mutation. The hush
# has to cover it: only there the near-silence is heard rather than spoken over.
M.put(lp(thump(48, .42, 77) + .4*thump(96, .42, 78) + .25*thump(192, .42, 79), 500), K["death"], db(-14))
hush = 1 - (1-db(-30))*rise(K["death"], K["death"]+.04)*fall(K["mutation"], K["mutation"]+.8)
# The snake's strike: short, low and rounded, no click of its own and no hush after it.
# The 440 Hz partial is what is left of it on a phone speaker: the body stays below the voice's band.
M.put(lp(fade(thump(110, .16, 91) + .35*thump(220, .16, 92) + .5*thump(440, .16, 93), .006, .08), 1400), K["g_mouth"], db(-27))

# Background sections, exact zeros between them: up to «Богом» with the g5 thinning
# on the way, the very quiet return under s13a, then the finale up to «Кроме». The
# rise from «себя» tops out on «интеллекта», holds until «нужен» and falls away to
# nothing just after f6b; its lift uses the motif's two notes, so the answer resolves
# what the rise opened.
# The −8 dB is the level heard: the drone's slow breath dips here on its own, so it
# is divided out of the target.
target = db(-8) * breath[int(K["g_third"]*SR)] / breath[int(K["g_creator"]*SR)]
thin = 1 - (1-target)*rise(K["g_third"], K["g_creator"])
back = rise(K["s13a"], K["s13a"]+.8) * fall(K["silence"]-.4, K["silence"]) * db(-14)
sections = (thin*fall(K["g_what"], K["g_god"]) + back
            + rise(K["f1"], K["f2"])*fall(K["look"], K["except"]))
# Not rise(): a smoothstep flattens out two seconds early, inside the ripple of the duck,
# and the top would arrive on «Ты», not on «интеллекта». This one climbs up to the word.
swell = np.clip((tt-K["recognized_self"])/(K["cosmic_mind"]-K["recognized_self"]), 0, 1)**1.5
swell *= fall(K["needed"], background_gone) * db(-3)
# The slow modulation stands elsewhere at the end: match the first frame, the film loops.
tail = rise(after_word, after_word+1.2) * .8/breath[int(M.DUR*SR)]
# The drone's slow breath loses 4 dB along this long rise and would top it out too
# early, so the rise divides it out: the drone follows the swell itself.
amb *= np.maximum.reduce([sections, swell/breath, tail]) * hush * sink
# The lift runs on its own clock, so it has to sag together with the drone.
lift_clock = tt - .025*np.cumsum(sag)/SR
amb += (np.sin(2*np.pi*329.63*lift_clock) + .6*np.sin(2*np.pi*440*lift_clock)) * M.R_NARR * db(-24) * swell * sink
music = music*sections*hush + climb
M.fx *= sections

# The motif plays three times, each softer; reverb carries it to the last frame.
dry = np.zeros(M.N, np.float32)
period = (K["end"]-after_word)/3
for i, gain_db in enumerate([0, -4, -8]):
    M.put(note(329.63, .45, 4, .035, .15), after_word+i*period, db(gain_db), dst=dry)
    M.put(note(440, .55, 3.5, .035, .2), after_word+i*period+.42, db(gain_db), dst=dry)
motif = reverb(dry, 2.4, .3, seed=31)
music += motif * M.R_NARR / rms(motif) * db(-19) * fall(K["end"]-.6, K["end"]) * (tt >= after_word)

# Persist the actual envelope for the episode acceptance check.
background = amb + music + M.fx


def peak(a, b):
    return float(np.max(np.abs(background[(tt >= a) & (tt < b)])))


def fx_peak(a):
    return float(np.max(np.abs(M.fx[(tt >= a) & (tt < a+.42)])))


def level(a, b, source=background):
    """RMS over [a, b) in dB re the voice; None means exact digital zero."""
    x = source[(tt >= a) & (tt < b)]
    return round(float(20*np.log10(np.sqrt(np.mean(x**2))/M.R_NARR)), 1) if np.any(x) else None


finale = [
    ("себя", K["recognized_self"], K["f_attention"]),
    ("внимание", K["f_attention"], K["turned"]),
    ("повернулось", K["turned"], K["sf6_end"]),
    ("пауза_перед_f6b", K["sf6_end"], K["f6b"]),
    ("ты_венец", K["f6b"], K["many_layers"]),
    ("множества_слоёв", K["many_layers"], K["observers"]),
    ("наблюдателей", K["observers"], climb_end),
    ("до_части", climb_end, K["whole_part"]),
    ("часть_вселенского", K["whole_part"], K["cosmic_mind"]),
    ("вершина_интеллекта", K["cosmic_mind"], K["needed"]),
    ("нужен", K["needed"], K["needed_her"]),
    ("ей", K["needed_her"], K["f6b_end"]),
    ("после_f6b", K["f6b_end"], background_gone),
    ("пауза_перед_f7", background_gone, K["f7"]),
    ("ты_её", K["f7"], K["answer_word"]),
]
cues = {
    "hit": K["death"], "hush": [K["death"], K["mutation"]],
    "strike": K["g_mouth"], "tower_tones": [K["g_between"], K["sg4_end"]],
    "thinning": [K["g_third"], K["g_creator"]],
    "god_fall": [K["g_what"], K["g_god"]],
    "god_silence": [K["g_god"], K["s13a"]],
    "return": [K["s13a"], K["s13a"]+.8],
    "silence": [K["silence"], K["f1"]],
    "reverse": K["reverse"], "reverse_softness_seconds": turn,
    "rarefaction": [K["look"], K["except"]],
    "silent_before_rise": [K["except"], K["recognized_self"]],
    "rise": [K["recognized_self"], background_gone],
    "rise_top": [K["cosmic_mind"], K["needed"]],
    "floor_tones": [K["many_layers"], climb_end],
    "needed_sag": [K["needed"], background_gone],
    "exact_zero": [background_gone, after_word],
    "clean_voice": [K["f7"], after_word],
    "tail": [after_word, M.DUR],
    "max_background_in_silence": peak(K["silence"], K["f1"]),
    "max_background_before_rise": peak(K["except"], K["recognized_self"]),
    "max_background_before_answer": peak(background_gone, K["f7"]),
    "max_background_on_answer": peak(K["f7"], after_word),
    "max_background_after_hit": peak(K["death"]+.25, K["mutation"]),
    "max_background_on_god": peak(K["g_god"], K["s13a"]),
    "strike_below_hit_db": round(float(20*np.log10(fx_peak(K["death"])/fx_peak(K["g_mouth"]))), 1),
    # Lowest playback speed of the drone and of the lift; 1 is the true pitch.
    "lowest_pitch_ratio": {
        "hook": round(float(np.abs(np.diff(clock[tt < K["h_build"]])).min()*SR), 4),
        "needed_drone": round(float(np.abs(np.diff(clock[(tt >= K["needed"]) & (tt < K["f7"])])).min()*SR), 4),
        "needed_lift": round(float(np.diff(lift_clock[(tt >= K["needed"]) & (tt < K["f7"])]).min()*SR), 4),
    },
    "background_rms_db_re_voice": {
        "g1": level(K["sg1"], K["sg1_end"]),
        "g2": level(K["sg2"], K["sg2_end"]),
        "g3": level(K["sg3"], K["sg3_end"]),
        "g4_before_tones": level(K["sg4"], K["g_between"]),
        "g4_tones": level(K["g_between"], K["g_third"]),
        "g5_thinning": level(K["g_third"], K["g_creator"]),
        "g5_held": level(K["g_creator"], K["sg6"]),
        "g6_before_fall": level(K["sg6"], K["g_what"]),
        "g6_fall": level(K["g_what"], K["g_god"]),
        "g6_god_silence": level(K["g_god"], K["s13a"]),
        "s13a_return": level(K["s13a"], K["s13a"]+.8),
        "s13a_held": level(K["s13a"]+.8, K["silence"]-.4),
    },
    # Everything under the voice, then the drone and the lift alone, without the tones.
    "finale_background_rms_db_re_voice": {name: level(a, b) for name, a, b in finale},
    "finale_rise_alone_rms_db_re_voice": {name: level(a, b, amb) for name, a, b in finale},
    "floor_tones_alone_db_re_voice": level(K["many_layers"], climb_end, climb),
}
(M.work/"build/finale_audio_cues.json").write_text(json.dumps(cues, ensure_ascii=False, indent=2)+"\n")
if cues["max_background_on_god"] != 0:
    raise SystemExit("Background is not an exact zero on «Богом»; see build/finale_audio_cues.json")
if cues["max_background_before_answer"] != 0 or cues["max_background_on_answer"] != 0:
    raise SystemExit("Background is not an exact zero before the last word; see build/finale_audio_cues.json")
M.finish(amb, music, lufs=-15)
out = M.work/"audio/mix.wav"
tmp = M.work/"audio/mix_trim.wav"


def rewrite(af):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-af", af,
                    "-t", str(M.DUR), "-c:a", "pcm_s16le", str(tmp)], check=True)
    tmp.replace(out)


# Mix.finish retains an extra safety second: trim this episode to exact timeline.
# The 12 ms edge fade only prevents a click where the loop restarts.
rewrite(f"afade=t=out:st={M.DUR-.012:.6f}:d=0.012")
# The limiter inside Mix.finish costs a little level; close the gap on the trimmed file.
rewrite(f"volume={-15-measure_audio(out)['integrated_lufs']:.2f}dB")
report = write_audio_report([out], M.work/"build/audio_report.json")
item = report["audio_outputs"][0]
print(f"final mix: {item['integrated_lufs']} LUFS-I / {item['true_peak_dbtp']} dBTP")
if not report["audio_targets_pass"]:
    raise SystemExit("Mix failed loudness/peak gate; see build/audio_report.json")
