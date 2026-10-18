"""Чистый Дмитрий, мягкая пульсация денег и звуковые акценты по словам."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2]))
import numpy as np
from mixlib import Mix, SR, db, rms, tone, chime, click, thump, fade

M = Mix()
tt = np.arange(M.N) / SR
# Собственная синтезированная подложка: не требует внешних медиа/лицензий.
pad = (np.sin(2 * np.pi * 130.81 * tt) + 0.35 * np.sin(2 * np.pi * 196 * tt)
       + 0.2 * np.sin(2 * np.pi * 261.63 * tt))
pad *= 0.7 + 0.3 * np.sin(2 * np.pi * 0.25 * tt) ** 2
amb = fade(pad, 0.15, 0.5)
amb *= M.R_NARR / rms(amb) * db(-24) * M.duck(0.45)
amb *= np.clip((M.DUR - tt) / 0.6, 0, 1)
music = np.zeros(M.N, np.float32)
for k, at in enumerate(np.arange(0, M.T("risk"), 0.6)):
    hz = [523.25, 659.25, 783.99, 659.25][k % 4]
    note = tone(hz, hz, 0.16) * np.exp(-np.arange(int(0.16 * SR)) / SR * 24)
    M.put(note, float(at), dst=music)
music *= M.R_NARR / rms(music) * db(-12) * M.duck(0.2)
# На повороте к риску музыкальная пульсация обрывается.
music[int(M.T("risk") * SR):] = 0
for k, shot in enumerate(M.ST["shots"]):
    M.put(click(seed=70 + k), max(0, shot["t0"]), db(-29))
for pid, stem in [("credit", "кредит"), ("salary", "зарплаты"),
                  ("return", "возвращают"), ("grow", "вес"),
                  ("refresh", "обновляется"), ("tail", "взлёт")]:
    M.put(chime(660, 990), M.word(pid, stem), db(-24))
M.put(thump(), M.MK["risk"], db(-21))
M.put(tone(520, 290, 0.24), M.T("cost"), db(-27))
M.put(tone(520, 290, 0.24), M.T("after"), db(-27))
M.put(chime(440, 660), M.T("end"), db(-25))
M.finish(amb, music)
