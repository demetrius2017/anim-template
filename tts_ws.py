"""WaveSpeed ElevenLabs + Whisper on tesla. No local ASR fallback.

synth(text, path, cfg) -> [(t0, t1, script_word)], same contract as tts_openai.
cfg: work (episode directory), voice (catalog name/id), speed (0.5..2),
stability/similarity (0..1), model, budget_usd. speed is pitch-preserving
ffmpeg atempo: eleven-v4 has no speed field. Cache raw generation separately
from tempo/alignment so rebuilds and speed edits never purchase another take.
ledger.jsonl reserves published price before POST. Unknown submissions are
NOT retried automatically. Persisted prediction IDs resume polling safely.
"""
import fcntl
import hashlib
import json
import math
import os
from pathlib import Path
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parent
API = "https://api.wavespeed.ai/api/v3"
MODEL = "elevenlabs/eleven-v4"
RATE = 0.08 / 1000  # verified /model/price; USD per character


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def save(path, value):
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    tmp.replace(path)


def _key():
    key = os.environ.get("WAVESPEED_API_KEY")
    if not key:
        for line in (ROOT / ".env").read_text().splitlines():
            if line.startswith("WAVESPEED_API_KEY="):
                key = line.split("=", 1)[1].strip().strip("\"'")
                break
    if not key:
        raise RuntimeError("WAVESPEED_API_KEY отсутствует")
    return key


def request(method, route, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(API + route, data=data, method=method,
        headers={"Authorization": "Bearer " + _key(), "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            return json.load(response)["data"]
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"WaveSpeed HTTP {exc.code} ({route}); no automatic paid retry") from None


def append(ledger, record):
    with ledger.open("a") as out:
        out.write(json.dumps({"at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), **record},
                             ensure_ascii=False) + "\n")
        out.flush()
        os.fsync(out.fileno())


def reserved_total(ledger):
    if not ledger.exists():
        return 0.0
    return sum(json.loads(line).get("reserved_usd", 0) for line in ledger.read_text().splitlines() if line.strip())


def generate(text, cfg):
    """Return immutable downloaded audio. All paid requests go through this guard."""
    work = Path(cfg["work"]).resolve()
    model = cfg.get("model", MODEL)
    if model != MODEL:
        raise ValueError("Budget rate verified only for elevenlabs/eleven-v4")
    params = {"text": text.replace("\u0301", ""), "voice_id": cfg["voice"],
              "stability": cfg.get("stability", .65), "similarity": cfg.get("similarity", .75)}
    for k in ("stability", "similarity"):
        if not 0 <= params[k] <= 1:
            raise ValueError(k)
    # Explicit per-text take selection is part of the voice config/fingerprint.
    # It never arises from a network retry: the owner of the episode must opt in.
    take = cfg.get("takes", {}).get(params["text"], 1)
    if isinstance(take, bool) or not isinstance(take, int) or take < 1:
        raise ValueError("take must be a positive integer")
    identity = [model, params] + ([{"take": take}] if take != 1 else [])
    cache = work / "audio" / ".ws_cache" / digest(identity)
    cache.mkdir(parents=True, exist_ok=True)
    meta_path, raw = cache / "job.json", cache / "raw.mp3"
    ledger = work / "ledger.jsonl"
    with (work / ".tts_ws.lock").open("a+") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        meta = json.loads(meta_path.read_text()) if meta_path.exists() else {}
        if raw.exists() and meta.get("audio_sha256") == hashlib.sha256(raw.read_bytes()).hexdigest():
            return raw
        if meta.get("status") in ("submitting", "failed"):
            raise RuntimeError(f"Previous submission {meta.get('status')}; inspect {meta_path}; do not repay")
        if not meta.get("id"):
            cost = round(len(params["text"]) * RATE, 6)
            budget = float(cfg.get("budget_usd", 1))
            if not math.isfinite(budget) or budget <= 0:
                raise ValueError("budget_usd must be finite and positive")
            budget = min(budget, 1.0)
            if reserved_total(ledger) + cost > budget + 1e-9:
                raise RuntimeError("WaveSpeed episode budget would exceed $1/configured limit")
            reservation = uuid.uuid4().hex
            meta = {"status": "submitting", "reservation": reservation, "model": model, "take": take,
                    "params": params, "reserved_usd": cost}
            # Write uncertainty before POST; connection loss can never cause silent repayment.
            save(meta_path, meta)
            append(ledger, {"event": "reserve", "reservation": reservation, "model": model,
                            "voice": cfg["voice"], "take": take, "characters": len(params["text"]), "reserved_usd": cost})
            result = request("POST", "/" + model, params)
            meta.update(id=result["id"], status="submitted")
            save(meta_path, meta)
            append(ledger, {"event": "submitted", "reservation": reservation, "id": meta["id"]})
    deadline = time.monotonic() + 600
    while True:
        result = request("GET", f"/predictions/{meta['id']}/result")
        if result["status"] in ("failed", "cancelled", "canceled", "deleted", "timeout"):
            meta["status"] = "failed"
            save(meta_path, meta)
            append(ledger, {"event": "failed", "id": meta["id"], "reservation": meta["reservation"]})
            raise RuntimeError(f"WaveSpeed failed: prediction {meta['id']}")
        if result["status"] == "completed":
            break
        if time.monotonic() > deadline:
            raise TimeoutError(f"Prediction {meta['id']} still pending; rerun resumes this ID")
        time.sleep(3)
    url = result["outputs"][0]
    if not isinstance(url, str) or not url.startswith("https://"):
        raise RuntimeError("WaveSpeed did not return an HTTPS audio URL")
    with urllib.request.urlopen(url, timeout=120) as response:
        blob = response.read()
    tmp = raw.with_suffix(".download")
    tmp.write_bytes(blob)
    subprocess.run(["ffprobe", "-v", "error", str(tmp)], check=True, capture_output=True)
    tmp.replace(raw)
    meta.update(status="completed", audio_sha256=hashlib.sha256(blob).hexdigest())
    save(meta_path, meta)
    append(ledger, {"event": "completed", "id": meta["id"], "reservation": meta["reservation"],
                    "cost_usd": meta["reserved_usd"], "cost_basis": "published_per_character_rate",
                    "audio_sha256": meta["audio_sha256"]})
    return raw


def synth(text, path, cfg):
    from tts_openai import align_tokens, speech_bounds
    speed = float(cfg.get("speed", 1))
    if not .5 <= speed <= 2:
        raise ValueError("speed must be 0.5..2")
    raw = generate(text, cfg)
    path = Path(path).resolve()
    path.parent.mkdir(parents=True, exist_ok=True)
    clip = raw.parent / f"speed_{speed:g}.mp3"
    receipt = clip.with_suffix(".json")
    if not clip.exists():
        if speed == 1:
            shutil.copyfile(raw, clip)
        else:
            tmp = clip.with_name(clip.stem + ".tmp.mp3")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", f"atempo={speed}",
                            "-ar", "48000", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "192k", str(tmp)], check=True)
            tmp.replace(clip)
    sha = hashlib.sha256(clip.read_bytes()).hexdigest()
    cached = json.loads(receipt.read_text()) if receipt.exists() else {}
    if cached.get("audio_sha256") != sha:
        remote = Path.home() / "Projects/serial-studio/tools"
        sys.path.insert(0, str(remote))
        import remote_whisper
        if os.environ.get("QA_REMOTE", "tesla") != "tesla":
            raise RuntimeError("This provider requires QA_REMOTE=tesla; no local Whisper")
        segments = remote_whisper.transcribe([clip])[str(clip)]
        heard = remote_whisper.words(segments)
        if not heard:
            raise RuntimeError("Whisper returned no words")
        onset, offset = speech_bounds(clip)
        bounds = align_tokens(text, heard, onset, offset)
        if any(b <= a or a < 0 or b > offset + .15 for a, b, _ in bounds):
            raise RuntimeError("Invalid ASR alignment; inspect remote transcription")
        cached = {"audio_sha256": sha, "remote": "tesla", "segments": segments,
                  "bounds": bounds, "onset": onset, "offset": offset,
                  "interpolation_note": "script words reconciled with Whisper; unmatched spans interpolated as in tts_openai"}
        save(receipt, cached)
    shutil.copyfile(clip, path)
    print(f"WaveSpeed {cfg['voice']}: {len(cached['bounds'])} words, {cached['offset']:.2f}s, cached/resumable", flush=True)
    return [tuple(b) for b in cached["bounds"]]
