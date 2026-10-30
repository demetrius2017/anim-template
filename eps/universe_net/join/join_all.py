#!/usr/bin/env python3
"""Reproducible, offline assembly. Run with the repository .venv/bin/python.

Only ffmpeg/ffprobe and Pillow/numpy are used; no TTS or paid APIs.
The separate Tesla Whisper receipt is required before choosing the trim.
Every subprocess command and its output are retained in logs/.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import math
import re
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
EP = HERE.parent
FIRST = Path.home() / 'Downloads/video_2026-10-30_18-54-27.mp4'
SECOND = EP / 'out/universe_net.mp4'
MASTER = Path.home() / 'Downloads/set_vnutri_seti_full_1080.mp4'
PHONE = Path.home() / 'Downloads/set_vnutri_seti_full_phone.mp4'
FPS = 30
CUT = 2224 / FPS  # 74.133333: last ASR word ends 73.56, fade starts 73.733333.
FADE = 12 / FPS
LIMIT = 30_000_000  # Decimal MB, the stricter interpretation.
COLOR = ['-colorspace', 'bt709', '-color_primaries', 'bt709',
         '-color_trc', 'bt709', '-color_range', 'tv']


def save(name, obj):
    (HERE / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n')


def digest(path):
    h = hashlib.sha256()
    with Path(path).open('rb') as f:
        for block in iter(lambda: f.read(8 * 1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def run(name, args):
    args = [str(x) for x in args]
    print(name, flush=True)
    logs = HERE / 'logs'
    logs.mkdir(exist_ok=True)
    save(f'logs/{name}.command.json', args)
    with (logs / f'{name}.log').open('wb') as f:
        p = subprocess.run(args, stdout=f, stderr=subprocess.STDOUT)
    (logs / f'{name}.exit').write_text(str(p.returncode) + '\n')
    if p.returncode:
        raise RuntimeError(f'{name}: exit {p.returncode}, see logs/{name}.log')
    return (logs / f'{name}.log').read_text(errors='replace')


def ff(name, args):
    return run(name, ['ffmpeg', '-hide_banner', '-nostdin', '-y',
                      '-filter_threads', '1', '-filter_complex_threads', '1', *args])


def probe(path):
    return json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))


def loudness(name, path, filters='anull', start=None, duration=None):
    seek = [] if start is None else ['-ss', str(start)]
    end = '' if duration is None else f',atrim=duration={duration},asetpts=PTS-STARTPTS'
    log = ff(name, [*seek, '-i', path, '-vn', '-af',
                    f'{filters}{end},loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json',
                    '-f', 'null', '-'])
    blocks = re.findall(r'\{\s*"input_i".*?\}', log, re.S)
    if not blocks:
        raise ValueError(f'Missing loudness report: {name}')
    return json.loads(blocks[-1])


def loud_filter(m):
    return ('loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:print_format=json'
            f':measured_I={m["input_i"]}:measured_TP={m["input_tp"]}'
            f':measured_LRA={m["input_lra"]}:measured_thresh={m["input_thresh"]}'
            f':offset={m["target_offset"]}')


def normalize(name, source, duration):
    base = (f'atrim=duration={duration:.9f},asetpts=PTS-STARTPTS,'
            'aresample=48000,aformat=channel_layouts=stereo')
    measured = loudness(f'{name}_pass1', source, base)
    dest = HERE / f'{name}_normalized.wav'
    ff(f'{name}_pass2', ['-i', source, '-vn', '-af',
                        base + ',' + loud_filter(measured), '-ar', '48000',
                        '-c:a', 'pcm_s24le', dest])
    checked = loudness(f'{name}_verify', dest)
    return dest, {'first_pass': measured, 'verified': checked}


def frame(path, t, width=180):
    data = subprocess.check_output([
        'ffmpeg', '-v', 'error', '-ss', f'{t:.9f}', '-i', str(path),
        '-frames:v', '1', '-vf', f'scale={width}:-1:flags=lanczos',
        '-threads', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'])
    return Image.open(io.BytesIO(data)).convert('RGB')


def sheet(path, times, dest, cols=7, width=180, labels=None):
    height = width * 16 // 9
    out = Image.new('RGB', (cols * (width + 8), math.ceil(len(times) / cols) * (height + 28)), '#242424')
    draw = ImageDraw.Draw(out)
    for i, t in enumerate(times):
        x, y = i % cols * (width + 8) + 4, i // cols * (height + 28)
        out.paste(frame(path, t, width), (x, y + 23))
        draw.text((x, y + 5), labels[i] if labels else f'{t:07.3f}s', fill='#ffe080')
    out.save(dest, quality=94, subsampling=0)


def assemble():
    if (HERE / 'build.exit').read_text().strip() != '0':
        raise RuntimeError('Fresh build has not passed')
    transcript = json.loads((HERE / 'part1_whisper.json').read_text())
    words = [w for s in transcript[str(FIRST)] for w in s['words']]
    assert ' '.join(w['w'].strip() for w in words[-3:]).lower() == 'повторенное миллиарды раз.'
    last_word = float(words[-1]['e'])
    assert CUT - FADE > last_word + .1, 'Preserve the full final word before fading'
    probes = [probe(FIRST), probe(SECOND)]
    v1, v2 = [next(s for s in p['streams'] if s['codec_type'] == 'video') for p in probes]
    assert (v1['width'], v1['height']) == (720, 1280)
    assert (v2['width'], v2['height']) == (1080, 1920)
    assert all(v['r_frame_rate'] == '30/1' for v in [v1, v2])
    assert v1['color_space'] == 'bt470bg' and v2['color_space'] == 'bt709'
    second_duration = int(v2['nb_frames']) / FPS
    duration = CUT + second_duration
    manifest = {
        'inputs': {str(p): digest(p) for p in [FIRST, SECOND]},
        'ffmpeg': subprocess.check_output(['ffmpeg', '-version'], text=True).splitlines()[0],
        'script_sha256': digest(__file__), 'source_probes': probes,
        'last_word_end': last_word, 'first_trim': CUT, 'first_video_trim': CUT - FADE/2,
        'transition_start': CUT - FADE, 'black_midpoint': CUT - FADE/2,
        'transition_end': CUT, 'transition_seconds': FADE,
        'second_video_preroll': FADE/2, 'second_audio_silent_preroll': FADE,
        'second_original_time_zero_in_output': CUT,
        'next_speech_start': CUT + .05, 'duration': duration,
        'color_conversion': 'part1 bt470bg/BT.601 limited -> BT.709 limited; Lanczos, no crop',
        'phone_limit_bytes': LIMIT, 'phone_budget_fraction': .97,
    }
    save('assembly_manifest.json', manifest)
    a1, m1 = normalize('part1', FIRST, CUT)
    a2, m2 = normalize('part2', SECOND, second_duration)
    raw = HERE / 'joined_prenorm.wav'
    ff('audio_join', ['-i', a1, '-i', a2, '-filter_complex',
                     f'[0:a]asetpts=PTS-STARTPTS[a];'
                     f'[1:a]adelay={round(FADE*48000)}S:all=1,asetpts=PTS-STARTPTS[b];'
                     f'[a][b]acrossfade=d={FADE}:c1=qsin:c2=qsin,'
                     f'apad,atrim=duration={duration:.9f}[out]',
                     '-map', '[out]', '-ar', '48000', '-c:a', 'pcm_s24le', raw])
    final_audio, mf = normalize('final', raw, duration)
    save('normalization.json', {'part1': m1, 'part2': m2, 'final': mf})
    vf = (
        f'[0:v]trim=end={CUT-FADE/2:.9f},setpts=PTS-STARTPTS,fps=30,'
        'scale=1080:1920:flags=lanczos:in_color_matrix=bt601:out_color_matrix=bt709:'
        'in_range=tv:out_range=tv,setsar=1,format=yuv420p,settb=1/30,'
        f'fade=t=out:st={CUT-FADE:.9f}:d={FADE/2}[a];'
        f'[1:v]trim=end={second_duration:.9f},setpts=PTS-STARTPTS,fps=30,'
        f'tpad=start_mode=clone:start_duration={FADE/2},setsar=1,format=yuv420p,settb=1/30,'
        f'fade=t=in:st=0:d={FADE/2}[b];'
        '[a][b]concat=n=2:v=1:a=0,fps=30,'
        f'trim=end={duration:.9f},format=yuv420p[out]')
    (HERE / 'video_filter.txt').write_text(vf + '\n')
    ff('master', ['-i', FIRST, '-i', SECOND, '-i', final_audio,
                  '-filter_complex', vf, '-map', '[out]', '-map', '2:a:0',
                  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-threads', '4',
                  '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', '30', *COLOR,
                  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', f'{duration:.9f}',
                  '-map_metadata', '-1', '-movflags', '+faststart', MASTER])
    duration = float(probe(MASTER)['format']['duration'])
    bitrate = math.floor((LIMIT * .97 * 8 / duration - 96000) / 1000) * 1000
    manifest['phone_video_bitrate'] = bitrate
    manifest['actual_master_duration'] = duration
    save('assembly_manifest.json', manifest)
    # Encode phone audio directly from normalized PCM: cascading 192k -> 96k AAC
    # increased true peak above -1 dBTP in the first candidate.
    common = ['-i', MASTER, '-i', final_audio, '-map', '0:v:0', '-vf', 'scale=720:1280:flags=lanczos,setsar=1',
              '-c:v', 'libx264', '-preset', 'slow', '-b:v', str(bitrate), '-threads', '4',
              '-pix_fmt', 'yuv420p', '-r', '30', *COLOR, '-passlogfile', HERE / 'phone_pass']
    ff('phone_pass1', [*common, '-pass', '1', '-an', '-f', 'null', '/dev/null'])
    ff('phone_pass2', [*common, '-pass', '2', '-map', '1:a:0', '-c:a', 'aac',
                      '-b:a', '96k', '-ar', '48000', '-map_metadata', '-1',
                      '-movflags', '+faststart', PHONE])
    if PHONE.stat().st_size > LIMIT:
        raise RuntimeError(f'Phone output exceeds {LIMIT}: {PHONE.stat().st_size}')


def qa():
    manifest = json.loads((HERE / 'assembly_manifest.json').read_text())
    duration = manifest['duration']
    report = {'outputs': {}, 'seam': {}}
    for name, path, dims in [('master', MASTER, (1080, 1920)), ('phone', PHONE, (720, 1280))]:
        p = probe(path)
        v = next(s for s in p['streams'] if s['codec_type'] == 'video')
        a = next(s for s in p['streams'] if s['codec_type'] == 'audio')
        l = loudness(f'{name}_loudness', path)
        item = {'path': str(path), 'sha256': digest(path), 'size_bytes': path.stat().st_size,
                'duration': p['format']['duration'], 'video': v, 'audio': a, 'loudness': l}
        item['pass'] = (abs(float(l['input_i']) + 14) <= .3 and float(l['input_tp']) <= -1
                        and (v['width'], v['height']) == dims and v['avg_frame_rate'] == '30/1'
                        and v['codec_name'] == 'h264' and a['codec_name'] == 'aac'
                        and abs(float(v['duration']) - duration) < .04)
        if name == 'phone':
            item['pass'] &= path.stat().st_size <= LIMIT
        ff(f'{name}_decode', ['-v', 'error', '-i', path, '-f', 'null', '-'])
        report['outputs'][name] = item
    for name, start, length in [('before', 69.5, 4.1), ('after', CUT + .05, 3.64)]:
        report['seam'][name] = loudness(f'seam_{name}', MASTER, start=start, duration=length)
    report['seam']['speech_loudness_difference_lu'] = abs(
        float(report['seam']['before']['input_i']) - float(report['seam']['after']['input_i']))
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-ss', str(CUT-FADE-.1), '-i', str(MASTER),
                                   '-t', str(FADE+.3), '-vn', '-ac', '2', '-ar', '48000', '-f', 'f32le', '-'])
    samples = np.frombuffer(raw, np.float32).reshape(-1, 2)
    report['seam']['max_adjacent_sample_step'] = float(np.max(np.abs(np.diff(samples, axis=0))))
    report['technical_pass'] = all(x['pass'] for x in report['outputs'].values())
    save('verification.json', report)
    # Concat/fps may end the video one frame before the audio container duration.
    # Seek to the last real video frame, never to the audio tail beyond video EOF.
    last_frame = (int(report['outputs']['master']['video']['nb_frames']) - 1) / FPS
    ts = list(np.arange(0, duration, 5)) + [last_frame]
    sheet(MASTER, ts, HERE / 'sheet.jpg')
    nums = list(range(round((CUT-FADE)*FPS)-6, round(CUT*FPS)+10))
    sheet(MASTER, [n/FPS for n in nums], HERE / 'seam.jpg',
          labels=[f'F{n} {n/FPS:.3f}s' for n in nums])
    for t in [10, CUT+12, CUT+78, CUT+87, duration-1]:
        frame(PHONE, t, 720).save(HERE / f'phone_{t:.3f}.png')
    ff('seam_preview', ['-ss', '69', '-i', MASTER, '-t', '9', '-c:v', 'libx264',
                       '-crf', '18', '-preset', 'fast', '-threads', '4', '-c:a', 'aac',
                       '-b:a', '192k', '-movflags', '+faststart', HERE / 'seam.mp4'])
    print(json.dumps({'technical_pass': report['technical_pass'],
                      'outputs': {k: {'size': v['size_bytes'], 'I': v['loudness']['input_i'],
                                      'TP': v['loudness']['input_tp']} for k, v in report['outputs'].items()},
                      'seam_delta_LU': report['seam']['speech_loudness_difference_lu']}, indent=2), flush=True)
    if not report['technical_pass']:
        raise RuntimeError('Technical delivery gate failed; see verification.json')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--qa-only', action='store_true')
    args = parser.parse_args()
    if not args.qa_only:
        assemble()
    qa()
