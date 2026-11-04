"""Часть 1: свой синтез, $0, без внешних файлов. Все времена — из M.MK (story.py), не руками.

По образцу eps/universe_net/mix.py: дрон с первого кадра под голосом (−25 дБ к голосу, приглушение под речью),
тоны этажей, мягкие удары, глухой удар на «Смерть» с тишиной после — единственное резкое место.
Блок ChatGPT (c1–c11): короткий тон на каждое новое понятие (кирпич, сумма, нейрон, слой, нейросеть, внимание,
блок), щелчок на «срабатывает», дрожащие тоны на «случайны», нисходящие ступени ошибки на «подкручивать»,
щелчки резки на «режут», этажи-тона на «Десятки блоков», подъём на «ChatGPT». Повороты — разрежения:
перед «А что, если этот рецепт придумали не мы?» фон редеет с «миллиарды» до −10 дБ и возвращается на «не»;
в q фон оседает на «гаснет» (уровень и высота, как в хуке исходного ролика), редеет с «зачем», на «ты?» — точный
ноль, «Во второй части.» — чистый голос; на карточке «ЧАСТЬ 2» — мотив из двух нот и дрон, до конца.
Громкость −14,2 LUFS (у копии на телефон — −14 ±0,5), true peak ≤ −1 dBTP.
"""
from pathlib import Path
import sys
import json
import subprocess

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import numpy as np
from mixlib import Mix, SR, db, rms, fade, lp, reverb, thump, click, tone
from audio_report import measure_audio, write_audio_report

LUFS = -14.2
M = Mix(work=Path(__file__).resolve().parent)
tt = np.arange(M.N) / SR
K = M.MK


def rise(a, b):
    q = np.clip((tt-a)/max(b-a, 1/SR), 0, 1)
    return q*q*(3-2*q)


def fall(a, b):
    return 1 - rise(a, b)


def note(hz, dur, decay, attack, release):
    t = np.arange(int(dur*SR)) / SR
    body = np.sin(2*np.pi*hz*t) + .3*np.sin(4*np.pi*hz*t) + .1*np.sin(6*np.pi*hz*t)
    return fade(body*np.exp(-t*decay), attack, release)


# q: «гаснет» — level and pitch sag as the web burns out; back up under the card.
sag = rise(K["h_fades"], K["h_why"]) * fall(K["card"], K["card"]+1.0)
clock = tt - .025*np.cumsum(sag)/SR
drone = (np.sin(2*np.pi*55*clock) + .35*np.sin(2*np.pi*82.4*clock) + .22*np.sin(2*np.pi*110.15*clock)
         + .25*np.sin(2*np.pi*220.3*clock) + .15*np.sin(2*np.pi*329.9*clock) + .08*np.sin(2*np.pi*440.7*clock))
breath = .8 + .2*np.sin(clock*.37)
drone *= breath
amb = drone * M.R_NARR / rms(drone) * db(-25) * M.duck(.35)
sink = 1 - (1-db(-4))*sag

FLOORS = [164.81, 196, 220, 261.63, 329.63]  # E3 G3 A3 C4 E4, one tone per tower floor
music = np.zeros(M.N, np.float32)
for key, hz in zip(["chem", "organics", "cells", "organisms", "biosphere"], FLOORS):
    M.put(note(hz, 1.3, 3, .08, .35), K[key], dst=music)
# ChatGPT block: one soft tone on each new idea, climbing like the floors.
IDEAS = [("c1_brick", 164.81), ("c2_sum", 196), ("c3_neuron", 220), ("c4_layer", 246.94), ("c4_net", 261.63),
         ("c8_att", 293.66), ("c9_block", 329.63)]
for key, hz in IDEAS:
    M.put(note(hz, 1.1, 3.4, .06, .3), K[key], db(-2), dst=music)
# «Десятки блоков»: the floors stack, ten short tones bottom to top.
for i in range(10):
    M.put(note(FLOORS[i % 5] * (2 if i >= 5 else 1), .5, 7, .02, .12), K["c9_many"] + i*.1, db(-8), dst=music)
# «ChatGPT»: the five floor tones together, softly.
for hz in FLOORS:
    M.put(note(hz, 1.6, 2.2, .1, .4), K["c10_name"], db(-6), dst=music)
# hook: the two towers' floors flash together on «собраны».
for i, hz in enumerate(FLOORS):
    M.put(note(hz, .7, 5, .03, .2), K["hn_built"] + i*.05, db(-9), dst=music)
tones_gain = M.R_NARR / rms(music) * db(-13)
music *= tones_gain * M.duck(.3)

fx_g = db(-20)
for i, key in enumerate(["bond_weight", "like_neuron", "base_layer", "transformers"]):
    M.put(fade(thump(65+i*3, .32, 71+i) + .3*thump(195+i*9, .32, 81+i), .035, .15), K[key], db(-18))
# «срабатывает»: a small click and a short high tick, the neuron fires.
M.put(click(.014, 5)*.6, K["c3_fire"], db(-22))
M.put(tone(880, 1320, .09, .25), K["c3_fire"], db(-22))
# «случайны»: three wobbling tones, out of tune with each other.
for i, hz in enumerate([311, 353, 277]):
    M.put(tone(hz, hz*1.06, .35, .35), K["c5_random"] + i*.18, db(-24))
# «невпопад»: wrong answers jump, three dry ticks.
for i in range(3):
    M.put(click(.01, 11+i), K["c5_wrong"] + .2 + i*.3, db(-26))
# «подкручивать»: the error ball steps down — seven descending soft ticks.
step = (K["c6_mill"] + .5 - K["c6_tweak"] + .2) / 7
for i in range(7):
    M.put(note(523.25 - i*30, .25, 12, .005, .08), K["c6_tweak"] - .2 + i*step, db(-27))
# «режут»: the line is cut into tokens.
for i in range(5):
    M.put(click(.012, 21+i), K["c7_cut"] + i*.05, db(-24))
# «Разбери его до кирпича»: soft low impact as the camera reaches the brick.
M.put(fade(thump(58, .4, 61) + .3*thump(174, .4, 62), .03, .2), K["c11_brick"], db(-19))
# The voice leaves a real gap after «Смерть»: the hush covers it.
M.put(lp(thump(48, .42, 77) + .4*thump(96, .42, 78) + .25*thump(192, .42, 79), 500), K["death"], db(-14))
hush = 1 - (1-db(-30))*rise(K["death"], K["death"]+.04)*fall(K["mutation"], K["mutation"]+.8)
# «не мы?»: a soft low thump where the second tower is implied.
M.put(fade(thump(52, .5, 91) + .25*thump(104, .5, 92), .04, .25), K["not_us"], db(-20))

# Rarefactions on the turns.
turn1 = 1 - (1-db(-10))*rise(K["c11_bill"], K["c11_bill"]+.8)*fall(K["not_us"]-.1, K["not_us"]+.5)
# q: thins from «зачем», exact zero just after «ты?»; «Во второй части.» is a clean voice; back under the card.
zero_at = round(K["h_you"] + .35, 5)
q_env = (fall(K["h_why"], zero_at)*(tt < zero_at) + rise(K["card"], K["card"]+.9)*(tt >= K["card"]))
sections = turn1 * np.where(tt < K["h_why"], 1.0, q_env)
amb *= sections * hush * sink
music *= sections * hush
M.fx *= np.where(tt < K["h_why"], 1.0, q_env)

# Card «ЧАСТЬ 2 — В ПРОФИЛЕ КАНАЛА»: a soft two-note motif, twice, reverb carries it to the last frame.
dry = np.zeros(M.N, np.float32)
period = (K["end"] - K["card"]) / 2.2
for i, gain_db in enumerate([0, -5]):
    M.put(note(329.63, .45, 4, .035, .15), K["card"] + .1 + i*period, db(gain_db), dst=dry)
    M.put(note(440, .55, 3.5, .035, .2), K["card"] + .52 + i*period, db(gain_db), dst=dry)
motif = reverb(dry, 2.4, .3, seed=31)
music += motif * M.R_NARR / rms(motif) * db(-17) * fall(K["end"]-.5, K["end"]) * (tt >= K["card"])
amb *= fall(K["end"]-.5, K["end"])

background = amb + music + M.fx
cues = {"hit": K["death"], "hush": [K["death"], K["mutation"]], "turn_t1": [K["c11_bill"], K["not_us"]],
        "q_sag": [K["h_fades"], K["h_why"]], "q_zero": [zero_at, K["card"]], "card": [K["card"], K["end"]],
        "max_background_in_q_zero": float(np.max(np.abs(background[(tt >= zero_at) & (tt < K["card"])]))) if K["card"] > zero_at else None}
(M.work/"build/mix_cues.json").write_text(json.dumps(cues, ensure_ascii=False, indent=2)+"\n")
if cues["max_background_in_q_zero"]:
    raise SystemExit("Background is not an exact zero before «Во второй части»; see build/mix_cues.json")
M.finish(amb, music, lufs=LUFS)
out = M.work/"audio/mix.wav"
tmp = M.work/"audio/mix_trim.wav"


def rewrite(af):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-af", af,
                    "-t", str(M.DUR), "-c:a", "pcm_s16le", str(tmp)], check=True)
    tmp.replace(out)


rewrite(f"afade=t=out:st={M.DUR-.25:.6f}:d=0.25")
rewrite(f"volume={LUFS-measure_audio(out)['integrated_lufs']:.2f}dB")
report = write_audio_report([out], M.work/"build/audio_report.json")
item = report["audio_outputs"][0]
print(f"final mix: {item['integrated_lufs']} LUFS-I / {item['true_peak_dbtp']} dBTP")
if not report["audio_targets_pass"]:
    raise SystemExit("Mix failed loudness/peak gate; see build/audio_report.json")
