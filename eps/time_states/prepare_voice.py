"""Prewarm speech cache with one remote Whisper batch (tesla). Normal build reuses it.

Uses exactly the same synth cache as tts_ws, but launches ASR once for all
phrases. Changes of speed reuse paid raw audio. Run with the repository venv.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
WORK = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))
import tts_ws
from tts_openai import align_tokens, speech_bounds


def main():
    if os.environ.get("QA_REMOTE", "tesla") != "tesla":
        raise RuntimeError("Whisper must run on tesla")
    cfg = json.loads((WORK / "tts.json").read_text())
    voice = {"work": str(WORK), "model": cfg["model"], "budget_usd": cfg["budget_usd"], **cfg["voices"]["narr"]}
    speed = voice["speed"]
    if not .5 <= speed <= 2:
        raise ValueError("speed must be 0.5..2")
    todo = []
    for ph in json.loads((WORK / "build/script.json").read_text())["phrases"]:
        raw = tts_ws.generate(ph["text"], voice)
        clip = raw.parent / f"speed_{speed:g}.mp3"
        if not clip.exists():
            tmp = clip.with_name(clip.stem + ".tmp.mp3")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", f"atempo={speed}",
                            "-ar", "48000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "192k", str(tmp)], check=True)
            tmp.replace(clip)
        receipt = clip.with_suffix(".json")
        sha = hashlib.sha256(clip.read_bytes()).hexdigest()
        cached = json.loads(receipt.read_text()) if receipt.exists() else {}
        if cached.get("audio_sha256") != sha:
            todo.append((clip, receipt, sha, ph))
    if todo:
        sys.path.insert(0, str(Path.home() / "Projects/serial-studio/tools"))
        import remote_whisper
        print(f"Whisper batch on tesla: {len(todo)} clips, speed {speed}", flush=True)
        transcripts = remote_whisper.transcribe([x[0] for x in todo])
        for clip, receipt, sha, ph in todo:
            segments = transcripts[str(clip)]
            heard = remote_whisper.words(segments)
            if not heard:
                raise RuntimeError(f"No words: {ph['id']}")
            onset, offset = speech_bounds(clip)
            bounds = align_tokens(ph["text"], heard, onset, offset)
            if any(b <= a or a < 0 or b > offset + .15 for a,b,_ in bounds):
                raise RuntimeError(f"Invalid alignment: {ph['id']}")
            tts_ws.save(receipt, {"audio_sha256": sha, "remote": "tesla", "segments": segments,
                "bounds": bounds, "onset": onset, "offset": offset,
                "interpolation_note": "script reconciled with Whisper as in tts_openai"})
            print(f"s{ph['id']}: {offset-onset:.2f}s", flush=True)


if __name__ == "__main__":
    main()
