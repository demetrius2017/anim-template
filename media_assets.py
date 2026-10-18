"""Local video -> content-addressed CFR PNGs; no browser video seeking.

Sources use seconds in the original clip. All intervals are half-open. The
episode timeline samples the normalized source at floor(source_time * fps).
Audio from inserted clips is deliberately not imported into the sound mix.
"""
import base64
import fcntl
import hashlib
import json
import math
from pathlib import Path
import shutil
import subprocess
import tempfile


def _sha256(path):
    with Path(path).open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def prepare_video(source, episode_root, fps=30):
    """Decode once under a process lock; return immutable frame-cache metadata."""
    root = Path(episode_root).resolve()
    path = Path(source["path"])
    path = (root / path).resolve() if not path.is_absolute() else path.resolve()
    if not path.is_file() or path.suffix.lower() != ".mp4":
        raise ValueError(f"Local MP4 not found: {path}")
    probe = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
        "stream=duration:format=duration", "-of", "json", str(path)], text=True))
    if not probe.get("streams"):
        raise ValueError(f"MP4 has no video stream: {path}")
    duration = float(probe["streams"][0].get("duration", probe.get("format", {}).get("duration", 0)))
    start, end = float(source.get("in", 0)), float(source["out"])
    speed = float(source.get("speed", 1))
    if not all(math.isfinite(x) for x in (start, end, speed, duration)) or not (0 <= start < end <= duration + 1e-6) or speed <= 0:
        raise ValueError(f"Invalid video in/out/speed for {duration}s clip: {source}")
    if source.get("fit", "contain") not in ("contain", "cover"):
        raise ValueError("Video fit must be contain or cover")
    version = subprocess.check_output(["ffmpeg", "-version"], text=True).splitlines()[0]
    signature = {"sha256": _sha256(path), "fps": fps, "decoder": version,
                 "filter": f"setpts=PTS-STARTPTS,fps=fps={fps}:start_time=0:round=near", "schema": 2}
    key = hashlib.sha256(json.dumps(signature, sort_keys=True).encode()).hexdigest()
    cache = root / "build" / "media_cache"
    cache.mkdir(parents=True, exist_ok=True)
    dest = cache / key
    with (cache / (key + ".lock")).open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        manifest = dest / "manifest.json"
        if manifest.exists():
            info = json.loads(manifest.read_text())
            if all((dest / f"f{i:08d}.png").is_file() for i in range(info["count"])):
                return {**info, "directory": str(dest)}
        temporary = Path(tempfile.mkdtemp(prefix=key + "-", dir=cache))
        try:
            subprocess.run(["ffmpeg", "-v", "error", "-nostdin", "-i", str(path),
                            "-map", "0:v:0", "-an", "-vf", signature["filter"],
                            "-fps_mode", "passthrough", "-start_number", "0",
                            str(temporary / "f%08d.png")], check=True)
            count = len(list(temporary.glob("f*.png")))
            if not count:
                raise ValueError(f"Video decoded to zero frames: {path}")
            if _sha256(path) != signature["sha256"]:
                raise ValueError("Video source changed while decoding")
            hashes = [_sha256(temporary / f"f{i:08d}.png") for i in range(count)]
            info = {**signature, "count": count, "duration": duration, "frame_sha256": hashes}
            (temporary / "manifest.json").write_text(json.dumps(info, indent=2))
            if dest.exists():
                shutil.rmtree(dest)  # Only this module's failed, content-addressed cache.
            temporary.rename(dest)
        finally:
            if temporary.exists():
                shutil.rmtree(temporary)
    return {**info, "directory": str(dest)}


def prepare_media(story, episode_root, fps=30):
    prepared = {}
    for index, shot in enumerate(story["shots"]):
        source = shot.get("source", {})
        if source.get("kind") != "video":
            continue
        prepared[index] = prepare_video(source, episode_root, fps)
        available = (source["out"] - source.get("in", 0)) / source.get("speed", 1)
        if shot["t1"] - shot["t0"] > available + 1e-8:
            raise ValueError(f"Shot {index} extends beyond video out point")
    return prepared


def video_frame_index(shot, t, info):
    if not shot["t0"] <= t < shot["t1"]:
        raise ValueError("Video time is outside the half-open shot interval")
    source = shot["source"]
    source_time = source.get("in", 0) + (t - shot["t0"]) * source.get("speed", 1)
    if source_time >= source["out"] + 1e-8:
        raise ValueError("Video time exceeds source out point")
    # Tiny epsilon stabilizes integer frame boundaries represented as floats.
    return min(info["count"] - 1, math.floor(source_time * info["fps"] + 1e-9))


def frame_for_time(story, t, prepared):
    for index, shot in enumerate(story["shots"]):
        if shot["t0"] <= t < shot["t1"]:
            if index not in prepared:
                return None
            info = prepared[index]
            frame = video_frame_index(shot, t, info)
            data = (Path(info["directory"]) / f"f{frame:08d}.png").read_bytes()
            if hashlib.sha256(data).hexdigest() != info["frame_sha256"][frame]:
                raise ValueError(f"Cached video frame {frame} hash mismatch")
            return "data:image/png;base64," + base64.b64encode(data).decode("ascii")
    return None
