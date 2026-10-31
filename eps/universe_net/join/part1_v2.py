#!/usr/bin/env python3
"""Offline first-part v2, run using .venv/bin/python.

Uses the already supplied word timestamps; no ASR, TTS, network or paid APIs.
Only part1_v2* deliverables, QA files, and v2_e.done are written. The shared
join_all helpers are imported without changing or invoking its assembly.

Default: prepare, render, verify, create review sheets. Then inspect the sheets
as images and use --accept-visual to sign this exact candidate's receipt.
"""
from __future__ import annotations

import argparse
import io
import json
import math
import re
import shutil
import struct
import subprocess
import sys
import traceback
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

from join_all import (HERE, FIRST, CUT, FADE, FPS, COLOR, digest, ff, frame,
                      loudness, normalize, probe, sheet)

ROOT = HERE.parents[2]
QA = HERE / 'part1_v2_qa'
FONT = ROOT / 'fonts/PTSerif-Italic.ttf'
WORDS = HERE / 'part1_whisper.json'
VIDEO = HERE / 'part1_v2.mp4'
AUDIO = HERE / 'part1_v2.wav'
MANIFEST = HERE / 'part1_v2.json'
ASS = HERE / 'part1_v2.ass'
DONE = HERE.parent / 'status/v2_e.done'
START = 6 / FPS
LEFT = 550 / FPS
RIGHT = 707 / FPS
REMOVED = RIGHT - LEFT
SHIFT = START + REMOVED
DURATION = CUT - SHIFT
NFRAMES = round(DURATION * FPS)
SEAM = LEFT - START
VIDEO_FADE = 8 / FPS
AUDIO_FADE = .050
WIDTH = 906
Y = 1230
LINE = 87
COLOR_FILTER = ('scale=1080:1920:flags=lanczos:in_color_matrix=bt601:'
                'out_color_matrix=bt709:in_range=tv:out_range=tv,'
                'setsar=1,format=yuv420p')
# This pass only hides captions: the accepted sound must stay bit-identical.
ACCEPTED_AUDIO = 'e31c27bfda61da18aef6b05b0aad038e26232e57da6a8d6f853ab3503725c17a'
# Captions burned into the source that repeat a page of ours, in source frames
# [first visible, first clear), measured at the delivery colour conversion.
# roi (x, y, w, h) is clear of the tower; brightness() re-measures both edges.
BURNED = ({'page': 42, 'text': 'ChatGPT', 'frames': (1932, 1987),
           'roi': (300, 60, 200, 240)},
          {'page': 46, 'text': 'Число, умноженное на вес.', 'frames': (2101, 2182),
           'roi': (90, 930, 290, 110)})
MIN_LEAD = 15 / FPS  # A shorter lead-in would only flash: such a page goes whole.
PAGE_FADE = 8 / FPS  # A page ends its fade on the caption's first visible frame.
# The question is out from the start of «Обучи его угадывать» to the end of
# «его до винтика,»: it lies over the tower there and then over the heading.
QUESTION_HIDDEN_PAGES = (37, 44)
QUESTION_FADE_MS = 500
# Page ranges whose white captions lie on bright footage: the caption band is
# dimmed under them, the same device as the hook.
DIMMED_PAGES = ((10, 12), (42, 42), (45, 45))
DIM_LEAD = .2
# Two-frame transition glitch of the source, output frames of the first shot.
GLITCH_FRAMES = (19, 20)

# Deliberate phrase pages. Each entry consumes 2..5 corrected lexical tokens.
# "кусочки. Токены." keeps the one-word sentence without a one-word flash.
# Страницы субтитров: текст чужого ролика, лежит рядом и в репозиторий не идёт.
PAGE_TEXT = (Path(__file__).resolve().parent / 'part1_pages.txt').read_text().splitlines()


def write_json(path, obj):
    Path(path).write_text(json.dumps(obj, ensure_ascii=False, indent=2) + '\n')


def read_json(path):
    return json.loads(Path(path).read_text())


def output_time(t):
    assert t <= LEFT or t >= RIGHT, f'Time is inside removed speech: {t}'
    return t - START - (REMOVED if t >= RIGHT else 0)


def sfnt_scale():
    """ASS sizes use the hhea line box; CSS sizes use the em square.

    Keep Fontsize=72 (40 for question), compensate with ScaleX/Y so glyphs
    are the same size as CSS 24px rendered at 3x, rather than 25% smaller.
    A separate event for each line gives the exact 87px baseline separation.
    """
    b = FONT.read_bytes()
    table = {}
    for i in range(struct.unpack_from('>H', b, 4)[0]):
        tag, _, offset, _ = struct.unpack_from('>4sIII', b, 12 + 16*i)
        table[tag] = offset
    em = struct.unpack_from('>H', b, table[b'head'] + 18)[0]
    ascent, descent = struct.unpack_from('>hh', b, table[b'hhea'] + 4)
    return (ascent - descent) / em


def corrected_words():
    original = [dict(w, index=i) for i, w in enumerate(
        w for s in read_json(WORDS)[str(FIRST)] for w in s['words'])]
    kept = []
    corrections = []
    i = 0
    while i < len(original):
        w = original[i]
        text = w['w'].strip()
        if w['s'] >= 18.62 and w['e'] <= 23.46:
            i += 1
            continue
        group = [w]
        new = {'все.': 'всё.', 'ее.': 'её —', 'Значит,': 'значит',
               'вернешься': 'вернёшься', 'повторенное': 'повторённое'}.get(text, text)
        if text == 'чуть' and original[i+1]['w'].strip() == '-чуть':
            group.append(original[i+1])
            new = 'чуть-чуть'
            i += 1
        if text == 'чат' and original[i+1]['w'].strip() == 'GPT.':
            group.append(original[i+1])
            new = 'ChatGPT.'
            i += 1
        token = {'text': new, 'source_start': group[0]['s'],
                 'source_end': group[-1]['e'], 'source_words': group,
                 'start': output_time(group[0]['s']),
                 'end': output_time(group[-1]['e'])}
        if new != ' '.join(g['w'].strip() for g in group):
            corrections.append(token)
        kept.append(token)
        i += 1
    return original, kept, corrections


def wrap(text):
    font = ImageFont.truetype(str(FONT), 72)
    def width(s):
        box = font.getbbox(s)
        return max(font.getlength(s), box[2] - box[0])
    if width(text) <= WIDTH:
        return [text], [width(text)]
    words = text.split()
    candidates = []
    for i in range(1, len(words)):
        lines = [' '.join(words[:i]), ' '.join(words[i:])]
        widths = [width(x) for x in lines]
        if max(widths) <= WIDTH and words[i] != '—' and words[i-1] != '—':
            candidates.append((abs(widths[0]-widths[1]), lines, widths))
    assert candidates, f'Cannot fit caption: {text}'
    _, lines, widths = min(candidates)
    return lines, widths


def build_pages(tokens):
    pages = []
    k = 0
    for i, wanted in enumerate(PAGE_TEXT):
        group = []
        while k < len(tokens):
            group.append(tokens[k])
            k += 1
            actual = ' '.join(w['text'] for w in group)
            if actual == wanted:
                break
            assert wanted.startswith(actual), (wanted, actual)
        assert 2 <= len(group) <= 5
        lines, widths = wrap(wanted)
        pages.append({'id': i+1, 'text': wanted, 'start': group[0]['start'],
                      'end': group[-1]['end'], 'source_start': group[0]['source_start'],
                      'source_end': group[-1]['source_end'], 'words': group,
                      'word_count': len(group), 'lines': lines,
                      'widths_px': widths, 'line_top_y': [Y+j*LINE for j in range(len(lines))]})
    assert k == len(tokens), f'{len(tokens)-k} missing words'
    assert all(p['end'] <= q['start'] + 1e-6 for p, q in zip(pages, pages[1:]))
    return pages


def runs(mask):
    edges = np.flatnonzero(np.diff(np.r_[False, mask, False]))
    return [(int(a), int(b)) for a, b in edges.reshape(-1, 2)]


def brightness():
    """Per-frame area mean, full 906x210 caption ROI, before overlays.

    Area downsampling preserves the ROI mean. The source conversion is exactly
    the delivery conversion. No speech timestamps are used to detect white.
    """
    means = {}
    for name, roi in [('subtitle', (906, 210, 87, 1230)),
                      ('question', (510, 72, 285, 150))]:
        w, h, x, y = roi
        dest = QA / f'{name}_luma.raw'
        ff(f'part1_v2_{name}_luma', ['-i', FIRST, '-an', '-vf',
           COLOR_FILTER + f',crop={w}:{h}:{x}:{y},scale=1:1:flags=area,format=gray',
           '-frames:v', str(round(CUT*FPS)), '-pix_fmt', 'gray', '-f', 'rawvideo', dest])
        values = np.frombuffer(dest.read_bytes(), np.uint8)
        means[name] = values.tolist()
    white = runs(np.asarray(means['subtitle']) >= 128)
    white = [(a,b) for a,b in white if b-a >= 3]
    assert len(white) == 1, white
    bounds = [{'source_start_frame': a, 'source_end_frame_exclusive': b,
               'source_start': a/FPS, 'source_end': b/FPS,
               'start': output_time(a/FPS), 'end': output_time(b/FPS)} for a,b in white]
    write_json(QA / 'brightness.json', {'fps': FPS, 'threshold': 128,
               'subtitle_roi_1080': [87,1230,906,210],
               'question_roi_1080': [285,150,510,72], 'mean_luma_by_source_frame': means,
               'white_intervals': bounds})
    return bounds


def burned_edges():
    """Re-measure each burned-in caption's edges on the source.

    Plain pixel means of the frames at each edge: an area scale to 1x1 rounds
    these faint first and last frames away.
    """
    report = []
    for b in BURNED:
        first, clear = b['frames']
        x, y, w, h = b['roi']
        raw = QA / f'burned_{b["page"]}.gray'
        picks = '+'.join(f'eq(n,{n})' for n in [first-1, first, clear-1, clear])
        ff(f'part1_v2_burned_{b["page"]}', ['-i', FIRST, '-an', '-vf',
           f"select='{picks}',{COLOR_FILTER},crop={w}:{h}:{x}:{y},format=gray",
           '-fps_mode', 'passthrough', '-pix_fmt', 'gray', '-f', 'rawvideo', raw])
        before, on, last, after = [float(v) for v in np.frombuffer(
            raw.read_bytes(), np.uint8).reshape(-1, h, w).mean(axis=(1, 2))]
        raw.unlink()  # Source frames are not kept outside eps/universe_net/qa/.
        assert on - before >= 1.5 and last - after >= 1.5, (b, before, on, last, after)
        report.append({'page': b['page'], 'frames': [first, clear],
                       'mean_luma': {'before': before, 'first': on, 'last': last, 'after': after}})
    return report


def ass_time(t, end=False):
    # Preserve the exact set of 30fps frames start <= frame_time < end.
    # ASS only permits centiseconds, so put its boundary between the preceding
    # frame and the first frame >= t. Original word times remain in the JSON.
    first_frame = math.ceil(t*FPS - 1e-7)
    cs = math.floor(first_frame/FPS*100 + 1e-7)
    return f'{cs//360000}:{cs//6000%60:02}:{cs//100%60:02}.{cs%100:02}'


def pieces(start, end, white):
    boundaries = sorted({start, end, *[t for item in white for t in
                         [item['start'], item['end']] if start < t < end]})
    for a, b in zip(boundaries, boundaries[1:]):
        light = any(w['start'] <= (a+b)/2 < w['end'] for w in white)
        yield a, b, light


def hidden_spans(pages):
    """Where a page gives way to the burned-in caption that repeats it."""
    spans = {}
    for b in BURNED:
        p = pages[b['page']-1]
        on, off = [output_time(f/FPS) for f in b['frames']]
        assert p['start'] < off and on < p['end'], b
        whole = on - p['start'] < MIN_LEAD
        spans[p['id']] = {'start': p['start'] if whole else on, 'end': p['end'],
                          'whole': whole, 'burned_text': b['text'],
                          'burned_output': [on, off], 'burned_source_frames': list(b['frames']),
                          'fade_out_ms': 0 if whole else round(PAGE_FADE*1000)}
    return spans


def write_ass(pages, white):
    scale = sfnt_scale()*100
    header = f'''[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Light,PT Serif,72,&H00F7F7F7,&H00F7F7F7,&H00101010,&H00000000,0,-1,0,0,{scale},{scale},0,0,1,3,0,8,0,0,0,1
Style: Dark,PT Serif,72,&H00151515,&H00151515,&H00FFFFFF,&H00000000,0,-1,0,0,{scale},{scale},0,0,1,3,0,8,0,0,0,1
Style: QuestionLight,PT Serif,46,&H40FFFFFF,&H40FFFFFF,&HA0000000,&H00000000,0,-1,0,0,{scale},{scale},0,0,1,1,0,8,0,0,0,1
Style: QuestionDark,PT Serif,46,&H40333333,&H40333333,&HA0FFFFFF,&H00000000,0,-1,0,0,{scale},{scale},0,0,1,1,0,8,0,0,0,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
'''
    events = []
    spans = hidden_spans(pages)
    for first, last in DIMMED_PAGES:
        a = pages[first-1]['start'] - DIM_LEAD
        hidden = spans.get(pages[last-1]['id'])  # Nothing of ours under a burned-in caption.
        b = hidden['start'] if hidden else pages[last-1]['end'] + DIM_LEAD
        # Scale 100 is required: the style's own scale would stretch the drawing.
        events.append(f'Dialogue: 0,{ass_time(a)},{ass_time(b)},Light,,0,0,0,,'
                      r'{\an7\pos(0,0)\fscx100\fscy100\fad(200,200)\p1\bord0\shad0\blur36'
                      r'\1c&H000000&\1a&H70&}m -60 1205 l 1140 1205 1140 1430 -60 1430{\p0}')
    for p in pages:
        p['events'] = []
        p['hidden'] = spans.get(p['id'])
        visible_end = p['hidden']['start'] if p['hidden'] else p['end']
        for a,b,light in pieces(p['start'], visible_end, white) if visible_end > p['start'] else ():
            style = 'Dark' if light else 'Light'
            fade_out = p['hidden']['fade_out_ms'] if p['hidden'] and b == visible_end else 0
            fad = f'\\fad(0,{fade_out})' if fade_out else ''
            p['events'].append({'start': a, 'end': b, 'style': style, 'fade_out_ms': fade_out,
                                'ass_start': ass_time(a), 'ass_end': ass_time(b, True)})
            for j,line in enumerate(p['lines']):
                # A broad, translucent outline is a halo, never a filled box.
                pos = f'\\an8\\pos(540,{Y+j*LINE})\\q2'
                events.append(f'Dialogue: 0,{ass_time(a)},{ass_time(b)},'+
                    f'{style},,0,0,0,,{{{pos}\\bord5\\blur4\\1a&HFF&\\3a&H40&{fad}}}{line}')
                events.append(f'Dialogue: 1,{ass_time(a)},{ass_time(b)},'+
                    f'{style},,0,0,0,,{{{pos}\\bord1.5\\blur0.7{fad}}}{line}')
    first, last = QUESTION_HIDDEN_PAGES
    hide_a, hide_b = pages[first-1]['start'], pages[last-1]['end']
    question_luma = read_json(QA/'brightness.json')['mean_luma_by_source_frame']['question']
    question_white = [{'source_start':a/FPS, 'source_end':b/FPS,
                       'start':output_time(a/FPS), 'end':output_time(b/FPS)}
                      for a,b in runs(np.asarray(question_luma)>=128) if b-a>=3]
    question_spans = [(0, hide_a), (hide_b, DURATION)]
    question_events = []
    for start,end in question_spans:
        for a,b,light in pieces(start,end,question_white):
            style = 'QuestionDark' if light else 'QuestionLight'
            # Re-hook at the restart «Теперь текст»: the open question flares once.
            # \fscx here is absolute, not relative to the style: it must carry the style's scale.
            pulse = (rf'\t(150,550,\alpha&H00&\fscx{scale*1.12:.1f}\fscy{scale*1.12:.1f})'
                     rf'\t(2100,2700,\alpha&H40&\fscx{scale:.1f}\fscy{scale:.1f})' if light else '')
            # ASS fad controls opacity, retaining the style's 75% maximum.
            fade_in = 500 if a == 0 else (QUESTION_FADE_MS if a == hide_b else 0)
            fade_out = QUESTION_FADE_MS if b == hide_a else 0
            events.append(f'Dialogue: 2,{ass_time(a)},{ass_time(b)},{style},,0,0,0,,'+
                f'{{\\an8\\pos(540,165)\\blur0.6\\fad({fade_in},{fade_out}){pulse}}}Зачем Вселенной ты?')
            question_events.append({'start':a,'end':b,'style':style,
                                    'fade_in_ms':fade_in,'fade_out_ms':fade_out})
    ASS.write_text(header+'\n'.join(events)+'\n')
    return {'text':'Зачем Вселенной ты?', 'font_px':46, 'y':165,'opacity':.75,
            'hidden_source':[hide_a+SHIFT,hide_b+SHIFT], 'hidden_output':[hide_a,hide_b],
            'hidden_pages':list(QUESTION_HIDDEN_PAGES),
            'fade_ms':QUESTION_FADE_MS, 'events':question_events, 'white_intervals':question_white,
            'reason':'The dim line is lost over the tower, then competes with the ChatGPT heading.'}


def filters():
    # Symmetric handles: dissolve and audio crossfade have different lengths,
    # but share their centre and time mapping. No cumulative A/V offset.
    v = (f'[0:v]split=2[vl][vr];'
         f'[vl]trim=start_frame=6:end_frame=554,setpts=PTS-STARTPTS,'
         f'fps=30,{COLOR_FILTER},settb=1/30[a];'
         f'[vr]trim=start_frame=703:end_frame=2224,setpts=PTS-STARTPTS,'
         f'fps=30,{COLOR_FILTER},settb=1/30[b];'
         f'[a][b]xfade=transition=fade:duration={VIDEO_FADE:.9f}:offset={SEAM-VIDEO_FADE/2:.9f},'
         f'fps=30,trim=end_frame={NFRAMES},format=yuv420p,'
         # Before the captions: they and the question stay on these frames.
         f"drawbox=color=black:t=fill:enable='between(n,{GLITCH_FRAMES[0]},{GLITCH_FRAMES[1]})',"
         f"ass='{ASS}':fontsdir='{FONT.parent}',"
         # join_all fades out over FADE/2, reaching black at CUT-FADE/2.
         # Hold that black until CUT: this part is a standalone insert.
         f'fade=t=out:st={DURATION-FADE:.9f}:d={FADE/2:.9f},'
         'setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709[out]')
    a = (f'[0:a]asplit=2[al][ar];'
         f'[al]atrim=start={START:.9f}:end={LEFT+AUDIO_FADE/2:.9f},asetpts=PTS-STARTPTS[a];'
         f'[ar]atrim=start={RIGHT-AUDIO_FADE/2:.9f}:end={CUT:.9f},asetpts=PTS-STARTPTS[b];'
         f'[a][b]acrossfade=d={AUDIO_FADE}:c1=qsin:c2=qsin,'
         f'aresample=48000,aformat=channel_layouts=stereo,'
         f'afade=t=in:st=0:d=0.005,afade=t=out:st={DURATION-FADE:.9f}:d={FADE:.9f},'
         f'apad,atrim=end_sample={round(DURATION*48000)}[out]')
    return v,a


def prepare():
    QA.mkdir(exist_ok=True)
    p = probe(FIRST)
    v = next(s for s in p['streams'] if s['codec_type']=='video')
    assert (v['width'],v['height'],v['avg_frame_rate'],v['color_space']) == (720,1280,'30/1','bt470bg')
    original, tokens, corrections = corrected_words()
    excluded = [w for w in original if w['s']>=18.62 and w['e']<=23.46]
    assert ' '.join(w['w'].strip() for w in excluded) == (
        'Без этой функции, сколько нейронов не собирай, они смогут рисовать только прямые линии.')
    pages = build_pages(tokens)
    assert original[-1]['e'] < CUT-FADE-.1
    white = brightness()
    edges = burned_edges()
    question = write_ass(pages, white)
    vfilter, afilter = filters()
    (QA/'video_filter.txt').write_text(vfilter+'\n')
    (QA/'audio_filter.txt').write_text(afilter+'\n')
    report = {'source':str(FIRST),'source_sha256':digest(FIRST),
        'script_sha256':digest(__file__),'whisper_sha256':digest(WORDS),
        'font_sha256':digest(FONT),'ass_sha256':digest(ASS),'source_probe':p,
        'duration':DURATION,'frames':NFRAMES,'fps':FPS,'source_start':START,'source_end':CUT,
        'cut':{'source_start':LEFT,'source_end':RIGHT,'removed_seconds':REMOVED,
               'output_centre':SEAM,'post_cut_total_shift':SHIFT,
               'video_dissolve_frames':8,'video_dissolve_seconds':VIDEO_FADE,
               'video_output_window':[SEAM-VIDEO_FADE/2,SEAM+VIDEO_FADE/2],
               'audio_crossfade_seconds':AUDIO_FADE,
               'audio_output_window':[SEAM-AUDIO_FADE/2,SEAM+AUDIO_FADE/2],
               'neuron_word_source_end':18.22,'postav_word_source_start':23.90,
               'neuron_end_margin_seconds':LEFT-AUDIO_FADE/2-18.22,
               'postav_start_margin_seconds':23.90-(RIGHT+AUDIO_FADE/2),
               'audio_waveform_evidence':read_json(QA/'audio_cut_evidence.json')
                   if (QA/'audio_cut_evidence.json').exists() else None,
               'method':'Symmetric handles preserve the source-to-output map for video and audio.'},
        'time_map':[{'source':[START,LEFT],'offset':-START},
                    {'source':[RIGHT,CUT],'offset':-SHIFT}],
        'end_fade':{'source_start':CUT-FADE,'source_black_from':CUT-FADE/2,
                    'output_start':DURATION-FADE,'black_from':DURATION-FADE/2,
                    'audio_duration':FADE},
        'color':'BT.601 (bt470bg) limited to BT.709 limited, Lanczos, no crop',
        'encoding':{'codec':'libx264','crf':14,'preset':'slow','pix_fmt':'yuv420p'},
        'subtitle_style':{'font':'PT Serif Italic','font_px':72,'line_height':LINE,
                          'top':Y,'max_width':WIDTH,'max_lines':2,
                          'ass_em_compensation':sfnt_scale(),
                          'ass_time_quantization':'centisecond boundaries preserve the exact active 30fps frames; original word times retained',
                          'halo':'soft dark or light letter outline, no box'},
        'white_intervals':white,'brightness_report':str(QA/'brightness.json'),
        'question':question,'corrections':corrections,'pages':pages,
        'hidden_pages':[{'page':p['id'],'text':p['text'],'page_span':[p['start'],p['end']],
                         **p['hidden']} for p in pages if p['hidden']],
        'burned_edges':edges,
        'visual_review':{'pass':False,'status':'pending image inspection'}}
    write_json(MANIFEST,report)
    print(json.dumps({'duration':DURATION,'pages':len(pages),'white':white},ensure_ascii=False),flush=True)


def render():
    raw = QA/'audio_prenorm.wav'
    ff('part1_v2_audio_edit',['-i',FIRST,'-filter_complex',
        (QA/'audio_filter.txt').read_text().strip(),'-map','[out]',
        '-ar','48000','-ac','2','-c:a','pcm_s24le',raw])
    normalized, measured = normalize('part1_v2',raw,DURATION)
    assert digest(normalized)==ACCEPTED_AUDIO, 'Rebuilt sound differs from the accepted one'
    if digest(AUDIO)!=ACCEPTED_AUDIO:
        shutil.copyfile(normalized,AUDIO)
    m=read_json(MANIFEST)
    m['loudness']=measured
    write_json(MANIFEST,m)
    # The joined film reads this file: it only ever sees a complete encode.
    candidate=HERE/'part1_v2_candidate.mp4'
    ff('part1_v2_video',['-i',FIRST,'-filter_complex',
        (QA/'video_filter.txt').read_text().strip(),'-map','[out]','-an',
        '-c:v','libx264','-preset','slow','-crf','14','-threads','4',
        '-profile:v','high','-pix_fmt','yuv420p','-r','30',*COLOR,
        '-frames:v',str(NFRAMES),'-map_metadata','-1','-movflags','+faststart',candidate])
    candidate.replace(VIDEO)


def caption_raster_check(m):
    # Render every page over a synthetic black field, using the exact ASS and
    # libass. Font/bbox verification is separate from real-footage visual QA.
    pages = [p for p in m['pages'] if p['events']]
    times = [(p['start']+min(p['end'],p['events'][0]['end']))/2 for p in pages]
    raw=QA/'captions_raster.gray'
    select='+'.join(f'eq(n,{math.ceil(t*FPS-1e-7)})' for t in times)
    ff('part1_v2_caption_bounds',['-f','lavfi','-i',f'color=c=0x777777:s=1080x1920:r=30:d={DURATION}',
        '-vf',f"select='{select}',ass='{ASS}':fontsdir='{FONT.parent}',crop=1080:320:0:1170,format=gray",
        '-fps_mode','passthrough','-an','-pix_fmt','gray','-f','rawvideo',raw])
    images=np.frombuffer(raw.read_bytes(),np.uint8).reshape(-1,320,1080)
    assert len(images)==len(pages)
    checks=[]
    # 8px allowance is exclusively the intended soft halo outside glyph widths.
    for p,im in zip(pages,images):
        # Row by row: a dimmed band is uniform along each row, glyphs are not.
        bg=np.median(im[:,0:40],axis=1,keepdims=True)
        yy,xx=np.where(np.abs(im.astype(float)-bg)>24)
        assert len(xx), p['text']
        bbox=[int(xx.min()),int(yy.min()+1170),int(xx.max()+1),int(yy.max()+1171)]
        ok=bbox[0]>=79 and bbox[2]<=1001 and bbox[1]>=1220 and bbox[3]<=1450
        checks.append({'page':p['id'],'bbox':bbox,'pass':bool(ok)})
    assert all(x['pass'] for x in checks), checks
    return checks


def blank_frames(name, start, end, crop, control):
    """Exact ASS over grey: nothing of ours on any frame start <= t < end.

    The earlier control frame must show pixels, so a broken crop cannot pass.
    """
    first,clear=math.ceil(start*FPS-1e-7),math.ceil(end*FPS-1e-7)
    w,h,x,y=crop
    n=math.ceil(control*FPS-1e-7)
    assert n<first, name
    raw=QA/f'blank_{name}.gray'
    ff(f'part1_v2_blank_{name}',['-f','lavfi','-i',f'color=c=0x777777:s=1080x1920:r=30:d={DURATION}',
        '-vf',f"select='eq(n,{n})+between(n,{first},{clear-1})',ass='{ASS}':fontsdir='{FONT.parent}',"
              f'crop={w}:{h}:{x}:{y},format=gray',
        '-fps_mode','passthrough','-an','-pix_fmt','gray','-f','rawvideo',raw])
    images=np.frombuffer(raw.read_bytes(),np.uint8).reshape(-1,h,w).astype(float)
    assert len(images)==clear-first+1, name
    # The field itself: the control frame may lie under a dimmed band.
    bg=float(np.median(images[1:]))
    assert np.abs(images[0]-bg).max()>24, f'{name}: control frame is empty'
    peak=float(np.abs(images[1:]-bg).max())
    assert peak<=2, f'{name}: overlay pixels on a hidden frame, delta {peak}'
    return {'name':name,'first_frame':first,'clear_frame':clear,'frames':clear-first,
            'control_frame':n,'peak_delta':peak}


def hidden_check(m):
    a,b=m['question']['hidden_output']
    checks=[blank_frames('question',a,b,(1080,120,0,130),a-1)]
    for h in m['hidden_pages']:
        checks.append(blank_frames(f'page_{h["page"]}',h['start'],h['end'],
                                   (1080,320,0,1170),h['start']-.5))
    return checks


def make_sheets(m):
    times=list(np.arange(0,DURATION,4))+[(NFRAMES-1)/FPS]
    overview=QA/'overview.jpg'
    sheet(VIDEO,times,overview,cols=6,width=216)
    dense=[(round(SEAM*FPS)+n)/FPS for n in range(-8,9)]
    seam=QA/'seam_frames.jpg'
    sheet(VIDEO,dense,seam,cols=9,width=216,
          labels=[f'CUT {t:.3f}s' for t in dense])
    a,b=Image.open(overview),Image.open(seam)
    combined=Image.new('RGB',(max(a.width,b.width),a.height+b.height+24),'#242424')
    combined.paste(a,(0,0));combined.paste(b,(0,a.height+24))
    combined.save(HERE/'part1_v2_sheet.jpg',quality=94,subsampling=0)
    selected=[]
    for p in m['pages']:
        if p['id']%10==0 or p['id']==1 or p['id']==len(m['pages']):
            selected.append(((p['start']+p['end'])/2,f"page {p['id']}"))
        if any(p['start']-.8<=t<=p['end']+.8 for w in m['white_intervals'] for t in [w['start'],w['end']]):
            for event in p['events']:
                selected.append(((event['start']+event['end'])/2,
                                 f"p{p['id']} {event['style']}"))
    for w in m['white_intervals']:
        for t in [w['start'],w['end']]:
            for n in [-2,-1,0,1,2]:
                selected.append((t+n/FPS,f'BG {t+n/FPS:.3f}s'))
    for h in m['hidden_pages']:
        on,off=h['burned_output']
        marks=[h['start']-.3,h['start'],on+.2,(on+off)/2,h['end']-.1,off-.1,off+.1]
        selected.extend((t,f"hide p{h['page']} {t:.3f}s") for t in marks)
    selected=sorted(set(selected))
    sheet(VIDEO,[t for t,_ in selected],HERE/'part1_v2_subs.jpg',cols=6,width=270,
          labels=[s for _,s in selected])
    # Readable crops of EVERY caption, not only the required every tenth page.
    font=ImageFont.truetype(str(FONT),22)
    all_pages=Image.new('RGB',(3*726,math.ceil(len(m['pages'])/3)*255),'#242424')
    draw=ImageDraw.Draw(all_pages)
    for i,p in enumerate(m['pages']):
        # A partly hidden page is shown at the middle of its visible part.
        t=(p['start']+(p['hidden']['start'] if p['hidden'] and not p['hidden']['whole'] else p['end']))/2
        im=frame(VIDEO,t,1080).crop((0,1170,1080,1500)).resize((720,220),Image.Resampling.LANCZOS)
        x,y=(i%3)*726,(i//3)*255
        all_pages.paste(im,(x,y+30))
        draw.text((x+8,y+3),f"{p['id']:02}  {t:.3f}s",font=font,fill='#ffe080')
    all_pages.save(QA/'all_subtitles.jpg',quality=95,subsampling=0)
    a,b=m['question']['hidden_output']
    fade=m['question']['fade_ms']/1000
    title_times=[a-fade-.2,a-fade/2,a-1/FPS,a,a+.5,(a+b)/2,b-1/FPS,b+fade/2,b+fade+.2,b+1]
    sheet(VIDEO,title_times,QA/'question_title.jpg',cols=5,width=270)
    write_json(QA/'sheet_times.json',{'overview':times,'seam':dense,
        'subtitles':[{'time':t,'label':s} for t,s in selected],'question_title':title_times})


def qa():
    m=read_json(MANIFEST)
    vp,ap=probe(VIDEO),probe(AUDIO)
    v=next(s for s in vp['streams'] if s['codec_type']=='video')
    a=next(s for s in ap['streams'] if s['codec_type']=='audio')
    assert v['codec_name']=='h264' and v['pix_fmt']=='yuv420p'
    assert (v['width'],v['height'],v['avg_frame_rate'])==(1080,1920,'30/1')
    assert all(v.get(k)=='bt709' for k in ['color_space','color_transfer','color_primaries']), v
    assert v['color_range']=='tv' and int(v['nb_frames'])==NFRAMES
    assert a['codec_name']=='pcm_s24le' and a['sample_rate']=='48000' and a['channels']==2
    assert abs(float(a['duration'])-float(v['duration']))<=1/FPS
    assert digest(AUDIO)==ACCEPTED_AUDIO, 'Sound changed'
    lm=m['loudness']['verified']
    assert abs(float(lm['input_i'])+14)<=.2 and float(lm['input_tp'])<=-1.5, lm
    ff('part1_v2_decode',['-v','error','-i',VIDEO,'-f','null','-'])
    ff('part1_v2_wav_decode',['-v','error','-i',AUDIO,'-f','null','-'])
    last=np.asarray(frame(VIDEO,(NFRAMES-1)/FPS,1080))
    assert float(last.max())<=3, 'Last frame must be black including overlays'
    bounds=caption_raster_check(m)
    hidden=hidden_check(m)
    m['verification']={'technical_pass':True,'video_probe':vp,'audio_probe':ap,
        'video_sha256':digest(VIDEO),'audio_sha256':digest(AUDIO),
        'last_frame_max_rgb':int(last.max()),'subtitle_bounds':bounds,
        'hidden_frames':hidden,
        'word_timing_preserved':True,'removed_phrase_absent':True,
        'not_checked':['No new Whisper run (explicitly prohibited).',
                       'No subjective listening; edit verified against waveform and supplied word timing.']}
    m['script_sha256']=digest(__file__)
    write_json(MANIFEST,m)
    make_sheets(m)
    print('Technical PASS; sheets ready for visual inspection.',flush=True)


def finish(accept=False):
    m=read_json(MANIFEST)
    DONE.parent.mkdir(exist_ok=True)
    if accept:
        assert m['verification']['technical_pass']
        assert m['verification']['video_sha256']==digest(VIDEO)
        assert m['verification']['audio_sha256']==digest(AUDIO)
        assert m['script_sha256']==digest(__file__)
        m['visual_review']={'pass':True,
            'reviewed_images':['part1_v2_sheet.jpg','part1_v2_subs.jpg',
                               'part1_v2_qa/all_subtitles.jpg','part1_v2_qa/question_title.jpg',
                               'part1_v2_qa/audio_waveform.jpg'],
            'findings':['Tower seen from below on the first frame.',
                        'All caption pages readable, within margins, with corrected spelling.',
                        'Colour switch follows the white-background frames without a low-contrast flash.',
                        'Question fades out before the tower close-up and returns after it has fallen apart.',
                        'Page 42 fades away as the burned-in ChatGPT heading appears; page 46 is gone, the burned-in caption carries it.',
                        '8-frame dissolve softens the change from a single neuron to the layer graph.',
                        'Final frames and overlays fade to black.'],
            'video_sha256':digest(VIDEO),'audio_sha256':digest(AUDIO)}
        write_json(MANIFEST,m)
    passed=accept and m['verification']['technical_pass']
    lm=m['loudness']['verified']
    hidden=', '.join(f"{h['page']} ({'целиком' if h['whole'] else 'с ' + format(h['start'], '.3f') + ' с'})"
                     for h in m['hidden_pages'])
    q=m['question']['hidden_output']
    DONE.write_text(('PASS' if passed else 'FAIL')+'\n'+
        'Первая часть готова: part1_v2.mp4 (без звука) и part1_v2.wav.\n'+
        f'Длина {DURATION:.3f} с, {NFRAMES} кадров, 1080×1920, 30 к/с, H.264 CRF 14, BT.709 limited.\n'+
        f'Начало 0.200 с; удалено {LEFT:.6f}–{RIGHT:.6f} с; общий сдвиг {SHIFT:.6f} с.\n'+
        'Наплыв 8 кадров и 50 мс аудио; целые слова подтверждены исходной разметкой и PCM-волной.\n'+
        f'{len(m["pages"])} страниц PT Serif Italic; ё исправлены; цвет следует покадровой яркости.\n'+
        f'Скрыты страницы {hidden}; вопрос убран на {q[0]:.3f}–{q[1]:.3f} с.\n'+
        f'Звук: два прохода loudnorm; {lm["input_i"]} LUFS, {lm["input_tp"]} dBTP, 48 кГц, stereo, PCM 24 bit.\n'+
        ('Все листы просмотрены изображениями; проверены поля, ореол, вопрос, склейка и чёрный конец.\n' if passed else
         'Визуальная проверка не подписана; PASS пока не установлен.\n')+
        'Проверены ffprobe, полный decode, длительности, libass-границы каждой страницы и последние кадры.\n'+
        'Не проверено субъективным прослушиванием; Whisper повторно не запускался. Сборка остальных частей не проверялась.\n')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--prepare-only',action='store_true')
    parser.add_argument('--render-only',action='store_true')
    parser.add_argument('--qa-only',action='store_true')
    parser.add_argument('--accept-visual',action='store_true')
    args=parser.parse_args()
    if args.accept_visual:
        finish(True)
        return
    if not (args.render_only or args.qa_only):
        prepare()
    if args.prepare_only:
        return
    if not args.qa_only:
        render()
    qa()
    finish(False)


if __name__=='__main__':
    try:
        main()
    except Exception:
        DONE.parent.mkdir(exist_ok=True)
        DONE.write_text('FAIL\nПодготовка или проверка первой части не завершена.\n'+
            'Подробности: join/part1_v2_qa/build.log и join/logs/part1_v2_*.log.\n'+
            'Текущий результат нельзя считать принятым.\n'+
            'Исходник и общая сборка не изменены.\n'+
            'Публикация, платные вызовы и повторный Whisper не выполнялись.\n')
        traceback.print_exc()
        sys.exit(1)
