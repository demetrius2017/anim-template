"""Rough words.json before the voice exists: scene authors can render in context.

Timing is a guess (characters per second of Brian at speed 1.22), never a cue:
the real build/words.json from tts.py replaces this file. Writes build/words.json
only when it is absent or was written by this script ("fake": true).
"""
from pathlib import Path
import json
import sys

WORK = Path(__file__).resolve().parent
CPS = 15.5          # characters per second, measured on universe_net (Brian, 1.22)
out = WORK / "build/words.json"
if out.exists() and not json.loads(out.read_text()).get("fake"):
    sys.exit("build/words.json is a real voice alignment; not overwriting")
sc = json.loads((WORK / "build/script.json").read_text())
t, words, phrases = sc.get("lead", .05), [], []
for i, ph in enumerate(sc["phrases"]):
    t0 = t
    toks = ph["text"].split()
    for k, w in enumerate(toks):
        d = max(.18, (len(w) + 1) / CPS)
        words.append({"w": w, "c": "", "t0": round(t, 3), "t1": round(t + d - .03, 3), "ph": i,
                      "token_id": f"{ph['id']}.{k}", "segment": 0, "emphasis": False, "focus": None,
                      "pause_after": 0})
        t += d + (.12 if w[-1] in ",—:" else 0)
    t1 = round(t - .03, 3)
    pause = ph.get("pause", .3)
    words[-1].update(pause_after=pause, pause_t0=t1, pause_t1=round(t1 + pause, 3))
    phrases.append({"i": i, "id": ph["id"], "voice": ph.get("voice", "narr"), "t0": round(t0, 3), "t1": t1,
                    "pause_after": pause, "pause_t0": t1, "pause_t1": round(t1 + pause, 3),
                    "emphasis": False, "focus": None,
                    "segments": [{"i": 0, "t0": round(t0, 3), "t1": t1, "pause_after": 0,
                                  "pause_t0": t1, "pause_t1": t1, "emphasis": False, "focus": None}]})
    t = t1 + pause
voice_end = round(t, 3)
dur = round(voice_end + sc.get("tail", .3), 3)
out.write_text(json.dumps({"fake": True, "words": words, "phrases": phrases, "voice_end": voice_end,
                           "duration": dur, "sample_rate": 48000, "duration_samples": int(dur * 48000)},
                          ensure_ascii=False, indent=1))
print(f"fake words: {len(words)} words, voice_end {voice_end:.1f} s, duration {dur:.1f} s")
