"""Own synthesis only, $0 music: low drone, tower tones, gentle bond impacts.
Final phrase is dry voice over silence; final card is silent. Times are K cues.
"""
from pathlib import Path
import sys
import json

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import numpy as np
from mixlib import Mix, SR, db, rms, tone, thump, fade
from audio_report import write_audio_report

M = Mix(work=Path(__file__).resolve().parent)
tt = np.arange(M.N) / SR
K = M.MK
drone = (np.sin(2*np.pi*55*tt) + .35*np.sin(2*np.pi*82.4*tt) + .22*np.sin(2*np.pi*110.15*tt))
drone *= .8 + .2*np.sin(tt*.37)
amb = fade(drone, .7, .5)
amb *= M.R_NARR / rms(amb) * db(-25) * M.duck(.35)
music = np.zeros(M.N, np.float32)
for key, hz in zip(["molecules", "cells", "organisms", "biosphere"], [164.81,196,246.94,329.63]):
    note = tone(hz,hz,1.3,.5) * np.exp(-np.arange(int(1.3*SR))/SR*3)
    M.put(fade(note,.08,.35),K[key],dst=music)
music *= M.R_NARR / rms(music) * db(-13) * M.duck(.3)
for i,key in enumerate(["weight","bond","bond_value","reaction","join","layer","third"]):
    M.put(fade(thump(65+i*3,.32,71+i),.035,.15), K[key], db(-28))
# Fade all backgrounds to exact zero at the first word of s13, including FX tails.
silence = np.clip((K["silence"]-tt)/.4,0,1)
amb *= silence; music *= silence; M.fx *= silence
M.finish(amb,music,lufs=-15)
# Mix.finish retains an extra safety second: trim this episode to exact timeline.
import subprocess
out=M.work/"audio/mix.wav"
tmp=M.work/"audio/mix_trim.wav"
subprocess.run(["ffmpeg","-v","error","-y","-i",str(out),"-t",str(M.DUR),"-c:a","pcm_s16le",str(tmp)],check=True)
tmp.replace(out)
report=write_audio_report([out], M.work/"build/audio_report.json")
item=report["audio_outputs"][0]
print(f"final mix: {item['integrated_lufs']} LUFS-I / {item['true_peak_dbtp']} dBTP")
if not report["audio_targets_pass"]:
    raise SystemExit("Mix failed loudness/peak gate; see build/audio_report.json")
