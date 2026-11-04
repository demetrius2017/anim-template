"""Voice for one part of «Сеть внутри сети»: paid takes on the Mac (cloud), everything else on tesla.

Same as eps/time_states_p1/prepare_voice.py, plus spans: a phrase with an inner pause is voiced span by span,
as tts.py does, so «Вселенная гаснет. Зачем ей ты?» of o1 reuses the paid take of f1.

    .venv/bin/python eps/<part>/prepare_voice.py            # Mac: WaveSpeed takes -> tesla: tempo, Whisper, tts.py
    .venv/bin/python eps/<part>/prepare_voice.py --mix      # tesla: story.py + mix.py (after the voice)

The Mac only calls WaveSpeed (tts_ws.generate: raw takes in audio/.ws_cache, ledger.jsonl, budget from tts.json)
and moves files. Owner's rule (DECISIONS 03.11 15:09): ffmpeg tempo, Whisper, the voice track (tts.py), story.py
and mix.py run on tesla through ~/Projects/serial-studio/tools/remote_run.py (container tools/qa_container).
Changes of speed reuse paid raw audio; Whisper receipts are keyed by the sha of the tempo clip.
"""
from pathlib import Path
import hashlib
import json
import os
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
WORK = Path(__file__).resolve().parent
SERIAL = ROOT.parent / "serial-studio"  # not Path.home(): HOME in the tesla container is /qa-home
sys.path.insert(0, str(ROOT))
import tts_ws

ENGINE = ["tts.py", "tts_ws.py", "tts_openai.py", "engine_contracts.py", "storylib.py", "mixlib.py",
          "audio_report.py", "fonts"]


def stub_unused():
    """tts.py imports edge_tts and tts_openai imports openai at load time; the elevenlabs_ws provider uses neither,
    and the qa image on tesla has neither."""
    import types
    sys.modules.setdefault("edge_tts", types.ModuleType("edge_tts"))
    if "openai" not in sys.modules:
        m = types.ModuleType("openai")
        m.OpenAI = None
        sys.modules["openai"] = m


def voice_cfg():
    cfg = json.loads((WORK / "tts.json").read_text())
    voice = {"work": str(WORK), "model": cfg["model"], "budget_usd": cfg["budget_usd"], **cfg["voices"]["narr"]}
    if not .5 <= voice["speed"] <= 2:
        raise ValueError("speed must be 0.5..2")
    return voice


def phrases():
    """One item per synthesized segment: a phrase, or each span of a phrase with an inner pause ([0.4] in the text)."""
    out = []
    for ph in json.loads((WORK / "build/script.json").read_text())["phrases"]:
        for k, sp in enumerate(ph.get("spans") or [{"text": ph["text"]}]):
            out.append({"id": ph["id"] if "spans" not in ph else f"{ph['id']}/{k}", "text": sp["text"]})
    return out


def remote(*cmd, pull, gpu=True):
    """One command in the tesla container, from the engine root; pulls results back to the same paths."""
    sync = [str(WORK)] + [str(ROOT / p) for p in ENGINE] + [str(ROOT / "engine")]
    args = ["python3", str(SERIAL / "tools/remote_run.py"), "--sync", *sync, "--pull", *map(str, pull),
            "--gpu" if gpu else "--no-gpu", "--", "bash", "-c", f"cd {ROOT} && " + " && ".join(cmd)]
    subprocess.run(args, check=True, cwd=SERIAL)


def tesla_voice():
    """In the container: atempo clips, one faster-whisper batch on the GPU, alignment receipts."""
    stub_unused()
    from tts_openai import align_tokens, speech_bounds
    sys.path.insert(0, str(SERIAL / "tools"))
    import selfcheck as S
    voice = voice_cfg()
    speed = voice["speed"]
    todo = []
    for ph in phrases():
        raw = tts_ws.generate(ph["text"], voice)  # cache hit only: the Mac paid for every take before
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
    if not todo:
        return
    print(f"Whisper batch on tesla GPU: {len(todo)} clips, speed {speed}", flush=True)
    r = subprocess.run([sys.executable, "-c", S.FASTER_WHISPER_CODE, S.FW_MODEL, *[str(x[0]) for x in todo]],
                       capture_output=True, text=True)
    got = {}
    for line in r.stdout.splitlines():
        if line.startswith("@@"):
            d = json.loads(line[2:])
            got[d["file"]] = d.get("segments")
    for clip, receipt, sha, ph in todo:
        segments = got.get(str(clip))
        if not segments:
            raise RuntimeError(f"Whisper failed on {ph['id']}: {r.stderr[-600:]}")
        heard = [(round(float(w["s"]), 2), round(float(w["e"]), 2), w["w"].strip())
                 for s in segments for w in s.get("words", [])]
        onset, offset = speech_bounds(clip)
        bounds = align_tokens(ph["text"], heard, onset, offset)
        if any(b <= a or a < 0 or b > offset + .15 for a, b, _ in bounds):
            raise RuntimeError(f"Invalid alignment: {ph['id']}")
        tts_ws.save(receipt, {"audio_sha256": sha, "remote": "tesla", "segments": segments,
                              "bounds": bounds, "onset": onset, "offset": offset,
                              "interpolation_note": "script reconciled with Whisper as in tts_openai"})
        print(f"{ph['id']}: {offset-onset:.2f}s", flush=True)


def main():
    rel = WORK.relative_to(ROOT)
    if "--remote" in sys.argv:
        return tesla_voice()
    if "--tts" in sys.argv:  # tesla: the voice track and words.json from cached clips (tts.py, WORK=this part)
        import runpy
        stub_unused()
        os.environ["WORK"] = str(WORK)
        os.chdir(ROOT)
        return runpy.run_path(str(ROOT / "tts.py"), run_name="__main__")
    me = f"python {rel}/prepare_voice.py --remote"
    build = [WORK / "build/story.json", WORK / "build/cues.json", WORK / "build/scene_handoff.json",
             WORK / "audio/mix.wav", WORK / "build/audio_report.json"]
    mix = [f"python {rel}/story.py", f"python {rel}/mix.py"]
    if "--mix" in sys.argv:
        return remote(*mix, pull=build, gpu=False)
    voice = voice_cfg()
    for ph in phrases():  # paid cloud call on the Mac; ledger and budget guard inside tts_ws
        tts_ws.generate(ph["text"], voice)
        print(f"take {ph['id']} ready", flush=True)
    remote(me, f"python {rel}/prepare_voice.py --tts",
           pull=[WORK / "audio", WORK / "build/words.json", WORK / "build/tts_manifest.json"])


if __name__ == "__main__":
    main()
