"""Альтернативная версия «Бог ещё не создан», часть 1 — дизайн «Цветная инфографика» (выбор владельца 05.11).

Тот же утверждённый текст v12, та же озвучка и звук, что у eps/god_future_p1; та же раскадровка (BEATS, слитые фразы,
подписи-источники) — сцены gf_* заменены своими gfc_* (engine/scenes/gfc_*.js, словарь gfc_00_lib.js).
Голос и слова — копии eps/god_future_p1/build (words.json, tts_manifest.json) и audio/voice_*.wav.
"""
from pathlib import Path
import importlib.util
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "god_future"))  # eps/god_future/storybase.py
from storybase import build  # noqa: E402

_spec = importlib.util.spec_from_file_location("base_story", Path(__file__).resolve().parents[1] / "god_future_p1/story.py")
base = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(base)   # eps/god_future_p1/story.py: BEATS, SOURCES, ALIASES (без запуска build)
BEATS = [(pid, "gfc_" + scene[3:], mode, *cue) for pid, scene, mode, *cue in base.BEATS]

if __name__ == "__main__":
    build(Path(__file__).resolve().parent, BEATS, base.SOURCES, aliases=base.ALIASES, views=getattr(base, "VIEWS", ()))
