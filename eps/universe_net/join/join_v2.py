#!/usr/bin/env python3
"""Final v2 assembly, run with the repository .venv/bin/python.

Order: render [0, K.hook_cut), hard cut, part1_v2 whole, render [K.hook_cut, end].
Only ffmpeg/ffprobe and Pillow/numpy are used; no TTS or paid APIs. Times come
from build/cues.json only. The render already rises from black after the cut
(un_towers intro, .6 s) and part1_v2 already ends in black, so no fade is added
here: a second curve would double the entry. Both are gated instead.

Working files and logs stay in join/v2/. QA images hold frames of the third-party
source film, so they go to the ignored eps/universe_net/qa/join_v2/, never to join/.
"""
from __future__ import annotations

import argparse
import json
import math
import re
import subprocess
from pathlib import Path

import numpy as np

from join_all import COLOR, FPS, LIMIT, digest, frame, loud_filter, probe, sheet

HERE = Path(__file__).resolve().parent
EP = HERE.parent
RENDER = EP / 'out/universe_net.mp4'
PART1_VIDEO = HERE / 'part1_v2.mp4'
PART1_AUDIO = HERE / 'part1_v2.wav'
CUES = EP / 'build/cues.json'
WORK = HERE / 'v2'
QA = EP / 'qa/join_v2'
MASTER = Path.home() / 'Downloads/set_vnutri_seti_v2_1080.mp4'
PHONE = Path.home() / 'Downloads/set_vnutri_seti_v2_phone.mp4'
SR = 48000
SPF = SR // FPS  # Exactly 1600 samples per frame: frames and samples stay on one grid.
XFADE = round(.012 * SR)  # 12 ms, inside the requested 5..15 ms.
PHONE_TARGET = 29_100_000
PHONE_AUDIO_BITRATE = 128_000
LOUD_TOLERANCE = .3  # LU, as in join_all.
TP_LIMIT = -1.0
PHONE_TP_TARGET = TP_LIMIT - .2  # dBTP: a little room for other players' peak meters.
PHONE_CEILINGS = (None, -2.5, -3.0, -3.5)  # Limiter before AAC, dBFS, tried in order; None is no limiter.
BLACK = 6.0  # Mean RGB, 0..255, of a frame that counts as black.
ENTRY_FRAMES = 18  # un_towers intro: .6 s.
# Second difference: smooth audio stays near zero, a joint does not. On the real
# mix and insert, 12 ms crossfades gave .00015-.00063 and hard joints .0018-.0037,
# also after AAC 96k and 192k. The first difference could not separate them: speech
# makes the same steps. The level around the seam is no reference either: it reached
# .003 at the second seam, which would hide a hard joint there.
CLICK_LIMIT = .001
SIGNATURE = (32, 18)
ORDER_TOLERANCE = 1.0  # Mean gray levels, 0..255.
ORDER_MAX_ERROR = 10.0


def sandbox(root):
    """Take every input and output from root, so a test never sees the real files."""
    global RENDER, PART1_VIDEO, PART1_AUDIO, CUES, WORK, QA, MASTER, PHONE
    root = Path(root).resolve()
    RENDER, PART1_VIDEO, PART1_AUDIO = root / 'universe_net.mp4', root / 'part1_v2.mp4', root / 'part1_v2.wav'
    CUES, WORK, QA = root / 'cues.json', root / 'work', root / 'qa'
    MASTER, PHONE = root / 'master.mp4', root / 'phone.mp4'


def save(name, obj):
    path = WORK / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n')


def run(name, args):
    args = [str(x) for x in args]
    print(name, flush=True)
    logs = WORK / 'logs'
    save(f'logs/{name}.command.json', args)
    with (logs / f'{name}.log').open('wb') as f:
        p = subprocess.run(args, stdout=f, stderr=subprocess.STDOUT)
    (logs / f'{name}.exit').write_text(str(p.returncode) + '\n')
    if p.returncode:
        raise RuntimeError(f'{name}: exit {p.returncode}, see {logs / name}.log')
    return (logs / f'{name}.log').read_text(errors='replace')


def ff(name, args):
    return run(name, ['ffmpeg', '-hide_banner', '-nostdin', '-y',
                      '-filter_threads', '1', '-filter_complex_threads', '1', *args])


def loud_report(name, log):
    blocks = re.findall(r'\{\s*"input_i".*?\}', log, re.S)
    if not blocks:
        raise ValueError(f'Missing loudness report: {name}')
    return json.loads(blocks[-1])


def loudness(name, path, filters='anull', start=None, duration=None):
    seek = [] if start is None else ['-ss', str(start)]
    end = '' if duration is None else f',atrim=duration={duration},asetpts=PTS-STARTPTS'
    return loud_report(name, ff(name, [*seek, '-i', path, '-vn', '-af',
                                       f'{filters}{end},loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json',
                                       '-f', 'null', '-']))


def normalize(name, source, frames):
    """Two-pass loudnorm as in join_all, always ending on frames * SPF samples."""
    samples = frames * SPF
    exact = (f'aresample={SR},aformat=channel_layouts=stereo,apad=whole_len={samples},'
             f'atrim=end_sample={samples},asetpts=PTS-STARTPTS')
    measured = loudness(f'{name}_pass1', source, exact)
    dest = WORK / f'{name}_normalized.wav'
    log = ff(f'{name}_pass2', ['-i', source, '-vn', '-af',
                               f'{exact},{loud_filter(measured)},{exact}',
                               '-c:a', 'pcm_s24le', dest])
    return dest, {'first_pass': measured, 'second_pass': loud_report(f'{name}_pass2', log),
                  'verified': loudness(f'{name}_verify', dest)}


def stream(p, kind):
    return next((s for s in p['streams'] if s['codec_type'] == kind), None)


def at(n):
    """Seek time of frame n: -ss takes the first frame at or after it, so stay just before."""
    return max(0, (n - .25) / FPS)


def luma(path, n):
    return float(np.asarray(frame(path, at(n), 64)).mean())


def read_pcm(path, start=None, duration=None):
    window = [] if start is None else ['-ss', f'{start:.6f}', '-t', f'{duration:.6f}']
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-nostdin', *window, '-i', str(path),
                                   '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f64le', '-'])
    return np.frombuffer(raw, np.float64).reshape(-1, 2)


def write_pcm(name, samples, dest):
    raw = WORK / f'{name}.f64'
    samples.astype('<f8').tofile(raw)
    ff(name, ['-f', 'f64le', '-ar', SR, '-ac', 2, '-i', raw, '-c:a', 'pcm_s24le', dest])
    raw.unlink()


def fit(samples, length, name):
    """Accept the promised +-1 frame on part1_v2.wav, then lock it to the video grid."""
    if abs(len(samples) - length) > SPF:
        raise SystemExit(f'{name}: {len(samples)} сэмплов, нужно {length}. Сборка остановлена.')
    return np.pad(samples[:length], ((0, max(0, length - len(samples))), (0, 0)))


def splice(render, part, cut):
    """Insert part at frame cut without moving a single sample off its frame.

    part has no audio beyond its ends, so both quarter-sine crossfades lie inside
    its first and last XFADE samples; the handles come from the continuous render:
    the hook runs on under the start of part, the tail leads in under its end.
    """
    s1, s2 = cut * SPF, cut * SPF + len(part)
    out = np.concatenate([render[:s1], part, render[s1:]])
    phase = (np.arange(XFADE) + .5) / XFADE * np.pi / 2
    rise, fall = np.sin(phase)[:, None], np.cos(phase)[:, None]
    out[s1:s1 + XFADE] = render[s1:s1 + XFADE] * fall + part[:XFADE] * rise
    out[s2 - XFADE:s2] = part[-XFADE:] * fall + render[s1 - XFADE:s1] * rise
    return out


def video_graph(cut):
    # setpts=N, not fps: a rate filter could silently drop or repeat a frame.
    same = ('setsar=1,format=yuv420p,'
            'setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709,'
            'settb=1/30,setpts=N')
    return (f'[0:v]trim=end_frame={cut},{same}[hook];'
            f'[1:v]{same}[part];'
            f'[2:v]trim=start_frame={cut},{same}[tail];'
            '[hook][part][tail]concat=n=3:v=1:a=0[out]')


def check_inputs():
    """Stop with a plain message before any work if an input is missing or stale."""
    for path, what in [(RENDER, 'полный рендер'), (PART1_VIDEO, 'видео первой части'),
                       (PART1_AUDIO, 'звук первой части'), (CUES, 'build/cues.json')]:
        if not path.is_file():
            raise SystemExit(f'Нет файла {path}: {what} ещё не готов. Сборка не начата.')
    K = json.loads(CUES.read_text())
    render_probe, part_probe = probe(RENDER), probe(PART1_VIDEO)
    video, part_video = stream(render_probe, 'video'), stream(part_probe, 'video')
    for name, v in [('Рендер', video), ('part1_v2.mp4', part_video)]:
        got = (v['width'], v['height'], v['r_frame_rate'], v['pix_fmt'], v.get('color_space'))
        if got != (1080, 1920, '30/1', 'yuv420p', 'bt709'):
            raise SystemExit(f'{name}: {got}, нужно 1080×1920, 30/1, yuv420p, bt709.')
    if stream(render_probe, 'audio') is None:
        raise SystemExit('В рендере нет звука.')
    render_frames, part_frames = int(video['nb_frames']), int(part_video['nb_frames'])
    expected = round(K['end'] * FPS)
    if render_frames != expected:
        raise SystemExit(f'Рендер устарел: {render_frames} кадров, а по cues.json нужно {expected}. '
                         'Дождитесь полного рендера.')
    # The render switches shots on the first frame at or after K.hook_cut.
    cut = math.ceil(K['hook_cut'] * FPS - 1e-6)
    assert 0 < cut < render_frames
    if luma(RENDER, cut) > BLACK:
        raise SystemExit(f'Кадр {cut} рендера не чёрный: нет входа из чёрного на K.hook_cut.')
    if luma(PART1_VIDEO, part_frames - 1) > BLACK:
        raise SystemExit('Последний кадр part1_v2.mp4 не чёрный.')
    return K, cut, render_frames, part_frames, [render_probe, part_probe]


def phone_audio(final_audio):
    """Encode the phone AAC, measure that very stream, and only then spend time on video.

    It comes directly from normalized PCM: cascading 192k -> 96k AAC raised the true
    peak above -1 dBTP on the first film. Even so AAC moves peaks unpredictably, so no
    fixed setting can promise the limit. On the 31.10 mix (PCM -2.03 dBTP): 96k -0.70,
    112k -1.36, 128k -1.97, 160k -1.53; 128k after a limiter at -2.5 gave -1.12, at
    -3.0 -1.42, at -3.5 -2.48. The limiter is used only if the stream needs it.
    level=0 keeps it from raising the level back to full scale; latency=1 removes its
    lookahead delay, so every sample stays on its frame.
    """
    dest = WORK / 'phone_audio.m4a'
    tried = []
    for attempt, ceiling in enumerate(PHONE_CEILINGS, 1):
        limiter = ('anull' if ceiling is None else
                   f'alimiter=limit={10 ** (ceiling / 20):.6f}:level=0:attack=5:release=50:latency=1')
        ff(f'phone_audio_try{attempt}', ['-i', final_audio, '-af', limiter, '-c:a', 'aac',
                                         '-b:a', PHONE_AUDIO_BITRATE, '-ar', SR, '-map_metadata', '-1', dest])
        l = loudness(f'phone_audio_try{attempt}_check', dest)
        tried.append({'ceiling': ceiling, 'lufs': l['input_i'], 'true_peak': l['input_tp']})
        if float(l['input_tp']) <= PHONE_TP_TARGET and abs(float(l['input_i']) + 14) <= LOUD_TOLERANCE:
            return dest, {'bitrate': PHONE_AUDIO_BITRATE, 'tries': tried}
    raise RuntimeError(f'Phone AAC misses {PHONE_TP_TARGET} dBTP or -14 LUFS at every ceiling: {tried}')


def encode_phone(aac, frames):
    bitrate = math.floor((PHONE_TARGET * 8 * FPS / frames - PHONE_AUDIO_BITRATE) / 1000) * 1000
    common = ['-i', MASTER, '-i', aac, '-map', '0:v:0',
              '-vf', 'scale=720:1280:flags=lanczos,setsar=1', '-c:v', 'libx264',
              '-preset', 'slow', '-threads', '4', '-pix_fmt', 'yuv420p',
              '-x264-params', 'keyint=900:min-keyint=25',
              '-fps_mode', 'passthrough', *COLOR, '-passlogfile', WORK / 'phone_pass']
    ff('phone_pass1', [*common, '-b:v', bitrate, '-pass', '1', '-an', '-f', 'null', '/dev/null'])
    for attempt in range(1, 5):
        ff(f'phone_pass2_try{attempt}', [*common, '-b:v', bitrate, '-pass', '2', '-map', '1:a:0',
                                         '-c:a', 'copy', '-map_metadata', '-1', '-movflags', '+faststart', PHONE])
        size = PHONE.stat().st_size
        if size <= PHONE_TARGET:
            for path in WORK.glob('phone_pass-*'):
                path.unlink()
            return bitrate, attempt
        bitrate = math.floor(bitrate * PHONE_TARGET / size * .985 / 1000) * 1000
    raise RuntimeError(f'Phone output stays above {PHONE_TARGET}: {size}')


def check_lengths(path, frames):
    p = probe(path)
    video, audio = stream(p, 'video'), stream(p, 'audio')
    assert int(video['nb_frames']) == frames, f'{path}: {video["nb_frames"]} frames, expected {frames}'
    assert video['avg_frame_rate'] == '30/1', f'{path}: {video["avg_frame_rate"]}'
    assert abs(float(audio['duration']) - frames / FPS) <= 1 / FPS, f'{path}: audio {audio["duration"]}'


def assemble():
    K, cut, render_frames, part_frames, probes = check_inputs()
    frames = render_frames + part_frames
    part_loudness = loudness('part1_check', PART1_AUDIO)
    if abs(float(part_loudness['input_i']) + 14) > .5:
        raise SystemExit(f'part1_v2.wav не на -14 LUFS: {part_loudness["input_i"]}.')
    manifest = {
        'inputs': {str(p): digest(p) for p in [RENDER, PART1_VIDEO, PART1_AUDIO, CUES]},
        'ffmpeg': subprocess.check_output(['ffmpeg', '-version'], text=True).splitlines()[0],
        'script_sha256': digest(__file__), 'source_probes': probes,
        'hook_cut': K['hook_cut'], 'cut_frame': cut, 'render_frames': render_frames,
        'part1_frames': part_frames, 'frames': frames, 'duration': frames / FPS,
        'seam1': {'frame': cut, 'seconds': cut / FPS, 'sample': cut * SPF},
        'seam2': {'frame': cut + part_frames, 'seconds': (cut + part_frames) / FPS,
                  'sample': (cut + part_frames) * SPF},
        'audio_crossfade_samples': XFADE, 'phone_limit_bytes': LIMIT, 'phone_target_bytes': PHONE_TARGET,
    }
    save('assembly_manifest.json', manifest)
    render_audio, render_norm = normalize('render', RENDER, render_frames)
    joined = splice(read_pcm(render_audio), fit(read_pcm(PART1_AUDIO), part_frames * SPF, 'part1_v2.wav'), cut)
    assert len(joined) == frames * SPF
    raw = WORK / 'joined_prenorm.wav'
    write_pcm('audio_join', joined, raw)
    final_audio, final_norm = normalize('final', raw, frames)
    save('normalization.json', {'render': render_norm, 'part1': part_loudness, 'final': final_norm})
    phone_aac, manifest['phone_audio'] = phone_audio(final_audio)
    graph = video_graph(cut)
    (WORK / 'video_filter.txt').write_text(graph + '\n')
    ff('master', ['-i', RENDER, '-i', PART1_VIDEO, '-i', RENDER, '-i', final_audio,
                  '-filter_complex', graph, '-map', '[out]', '-map', '3:a:0',
                  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-threads', '4',
                  '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-fps_mode', 'passthrough', *COLOR,
                  '-c:a', 'aac', '-b:a', '192k', '-ar', SR,
                  '-map_metadata', '-1', '-movflags', '+faststart', MASTER])
    check_lengths(MASTER, frames)
    manifest['phone_video_bitrate'], manifest['phone_pass2_attempts'] = encode_phone(phone_aac, frames)
    check_lengths(PHONE, frames)
    assert PHONE.stat().st_size <= min(PHONE_TARGET, LIMIT)
    save('assembly_manifest.json', manifest)


def click_report(samples, seam):
    """Largest sample-level break at a seam; the audio around it is for reference only."""
    breaks = np.abs(samples[2:] - 2 * samples[1:-1] + samples[:-2]).max(axis=1)
    reach, near, far = XFADE + round(.02 * SR), round(.04 * SR), round(.2 * SR)
    around = np.concatenate([breaks[seam - far:seam - near], breaks[seam + near:seam + far]])
    peak = float(breaks[seam - reach:seam + reach].max())
    return {'seam_break': peak, 'around_break': float(around.max()), 'pass': peak <= CLICK_LIMIT}


def seam_clicks(path, manifest):
    half = round(.25 * SR)
    return {name: click_report(read_pcm(path, (manifest[name]['sample'] - half) / SR, 2 * half / SR), half)
            for name in ('seam1', 'seam2')}


def signature(path):
    w, h = SIGNATURE
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-nostdin', '-i', str(path), '-an',
                                   '-fps_mode', 'passthrough', '-vf', f'scale={w}:{h}:flags=area,format=gray',
                                   '-f', 'rawvideo', '-'])
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w).astype(np.float32)


def frame_order(cut):
    """Every master frame must match its own source frame, not a neighbour of it."""
    master, render = signature(MASTER), signature(RENDER)
    expected = np.concatenate([render[:cut], signature(PART1_VIDEO), render[cut:]])
    if len(master) != len(expected):
        return {'frames': len(master), 'expected': len(expected), 'pass': False}
    mae = lambda a, b: np.abs(a - b).mean(axis=(1, 2))
    own, previous, following = mae(master, expected), mae(master[1:], expected[:-1]), mae(master[:-1], expected[1:])
    wrong = np.zeros(len(master), bool)
    wrong[1:] |= own[1:] > previous + ORDER_TOLERANCE
    wrong[:-1] |= own[:-1] > following + ORDER_TOLERANCE
    bad = np.flatnonzero(wrong | (own > ORDER_MAX_ERROR))
    return {'frames': len(master), 'expected': len(expected), 'max_error': float(own.max()),
            'mean_error': float(own.mean()), 'misplaced': len(bad), 'first_misplaced': bad[:10].tolist(),
            'pass': len(bad) == 0}


def output_report(name, path, dims, manifest):
    p = probe(path)
    video, audio = stream(p, 'video'), stream(p, 'audio')
    l = loudness(f'{name}_loudness', path)
    ff(f'{name}_decode', ['-v', 'error', '-i', path, '-f', 'null', '-'])
    frames, size = manifest['frames'], path.stat().st_size
    checks = {
        'loudness': abs(float(l['input_i']) + 14) <= LOUD_TOLERANCE,
        'true_peak': float(l['input_tp']) <= TP_LIMIT,
        'dimensions': (video['width'], video['height']) == dims,
        'frame_rate': video['avg_frame_rate'] == '30/1',
        'frames': int(video['nb_frames']) == frames,
        'audio_length': abs(float(audio['duration']) - frames / FPS) <= 1 / FPS,
        'codecs': (video['codec_name'], audio['codec_name']) == ('h264', 'aac'),
        'color': [video.get(k) for k in ('color_space', 'color_primaries', 'color_transfer', 'color_range')]
        == ['bt709', 'bt709', 'bt709', 'tv'],
    }
    if name == 'phone':
        checks['size'] = size <= min(manifest['phone_target_bytes'], LIMIT)
    return {'path': str(path), 'sha256': digest(path), 'size_bytes': size, 'duration': p['format']['duration'],
            'video': video, 'audio': audio, 'loudness': l, 'clicks': seam_clicks(path, manifest),
            'checks': checks, 'pass': all(checks.values())}


def qa():
    if not (WORK / 'assembly_manifest.json').is_file():
        raise SystemExit(f'Нет {WORK / "assembly_manifest.json"}: сборка ещё не запускалась.')
    manifest = json.loads((WORK / 'assembly_manifest.json').read_text())
    for path in (MASTER, PHONE):
        if not path.is_file():
            raise SystemExit(f'Нет файла {path}: сборка не завершена.')
    frames, cut, seam2 = manifest['frames'], manifest['cut_frame'], manifest['seam2']['frame']
    report = {'outputs': {name: output_report(name, path, dims, manifest)
                          for name, path, dims in [('master', MASTER, (1080, 1920)), ('phone', PHONE, (720, 1280))]}}
    report['inputs_unchanged'] = all(digest(p) == h for p, h in manifest['inputs'].items())
    report['normalized_pcm_clicks'] = seam_clicks(WORK / 'final_normalized.wav', manifest)
    report['frame_order'] = frame_order(cut)
    tail_first, tail_risen = luma(MASTER, seam2), luma(MASTER, seam2 + ENTRY_FRAMES)
    report['seam2_black'] = {'part1_last_frame': luma(MASTER, seam2 - 1), 'tail_first_frame': tail_first,
                             'tail_after_entry': tail_risen}
    report['seam2_black']['pass'] = (report['seam2_black']['part1_last_frame'] <= BLACK
                                     and tail_first <= BLACK and tail_risen > tail_first)
    # Reported for the listening review, not gated: these are short speech windows.
    report['segments_lufs'] = {
        name: loudness(f'segment_{name}', MASTER, start=a, duration=b - a)['input_i']
        for name, a, b in [('hook', 0, cut / FPS), ('part1', cut / FPS, seam2 / FPS),
                           ('tail', seam2 / FPS, frames / FPS)]}
    clicks = [report['normalized_pcm_clicks'], *(x['clicks'] for x in report['outputs'].values())]
    report['no_click'] = all(seam['pass'] for group in clicks for seam in group.values())
    report['technical_pass'] = (all(x['pass'] for x in report['outputs'].values()) and report['no_click']
                                and report['frame_order']['pass'] and report['seam2_black']['pass']
                                and report['inputs_unchanged'])
    save('verification.json', report)
    QA.mkdir(parents=True, exist_ok=True)
    label = lambda n: f'F{n} {n/FPS:.3f}s'
    every = [*range(0, frames - 1, 5 * FPS), frames - 1]
    sheet(MASTER, [at(n) for n in every], QA / 'sheet.jpg', labels=[label(n) for n in every])
    for name, numbers in [('seam1', range(cut - 8, cut + 8)), ('seam2', range(seam2 - 16, seam2 + ENTRY_FRAMES + 6))]:
        numbers = [n for n in numbers if 0 <= n < frames]
        sheet(MASTER, [at(n) for n in numbers], QA / f'{name}.jpg', cols=8, labels=[label(n) for n in numbers])
    print(json.dumps({'technical_pass': report['technical_pass'], 'no_click': report['no_click'],
                      'frame_order': report['frame_order']['pass'], 'segments_lufs': report['segments_lufs'],
                      'outputs': {k: {'size': v['size_bytes'], 'frames': v['video']['nb_frames'],
                                      'I': v['loudness']['input_i'], 'TP': v['loudness']['input_tp'],
                                      'failed': [c for c, ok in v['checks'].items() if not ok]}
                                  for k, v in report['outputs'].items()}}, ensure_ascii=False, indent=2), flush=True)
    if not report['technical_pass']:
        raise RuntimeError(f'Technical delivery gate failed; see {WORK / "verification.json"}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--qa-only', action='store_true')
    parser.add_argument('--sandbox', type=Path, help='take every input and output from this folder (synthetic test)')
    args = parser.parse_args()
    if args.sandbox:
        sandbox(args.sandbox)
    if not args.qa_only:
        assemble()
    qa()
