"""Измерение звука конкретных закодированных файлов, без изменения медиа."""
import hashlib
import json
import math
from pathlib import Path
import re
import subprocess


def measure_audio(path):
    """Декодирует файл и измеряет LUFS-I/true peak через FFmpeg loudnorm input_*.

    target_pass относится только к громкости; это не редакторская/слуховая приёмка.
    Тишина представляется null, а не невалидными JSON Infinity/NaN.
    """
    path = Path(path).resolve()
    with path.open("rb") as src:
        digest = hashlib.file_digest(src, "sha256").hexdigest()
    result = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-v", "info", "-i", str(path),
         "-map", "0:a:0", "-vn", "-af", "loudnorm=I=-15:TP=-1:LRA=11:print_format=json",
         "-f", "null", "-"], capture_output=True, text=True, check=True,
    )
    measurements = re.findall(r'\{\s*"input_i"\s*:.*?\}', result.stderr, re.S)
    if not measurements:
        raise ValueError(f"FFmpeg не вернул измерение громкости: {path}")
    raw = json.loads(measurements[-1])

    def finite(key):
        value = float(raw[key])
        return value if math.isfinite(value) else None

    integrated, peak = finite("input_i"), finite("input_tp")
    return {
        "path": str(path), "sha256": digest,
        "method": "ffmpeg loudnorm input measurements; decoded audio stream 0",
        "integrated_lufs": integrated, "true_peak_dbtp": peak,
        "loudness_range_lu": finite("input_lra"),
        "targets": {"integrated_lufs": -15.0, "tolerance_lu": 1.0, "true_peak_max_dbtp": -1.0},
        "target_pass": integrated is not None and peak is not None
                       and -16.0 <= integrated <= -14.0 and peak <= -1.0,
    }


def write_audio_report(paths, report_path):
    """Измеряет каждую выходную копию и сохраняет привязанный к хэшам отчёт."""
    outputs = [measure_audio(path) for path in paths]
    if not outputs:
        raise ValueError("Нужен хотя бы один выходной файл")
    report = {"schema_version": 1, "audio_outputs": outputs,
              "audio_targets_pass": all(item["target_pass"] for item in outputs),
              "listening_status": "unknown"}
    report_path = Path(report_path)
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n")
    return report
