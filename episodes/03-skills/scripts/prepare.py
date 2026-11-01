"""Download narration and align the approved script to actual spoken word timings."""
import array
import difflib
import json
import math
import pathlib
import re
import subprocess
import urllib.request
import wave
from faster_whisper import WhisperModel

ROOT = pathlib.Path(__file__).resolve().parents[1]
PUBLIC = ROOT.parents[1] / 'public' / 'episodes' / '03-skills'
PUBLIC.mkdir(parents=True, exist_ok=True)
OUT = ROOT.parents[1] / 'out' / 'ep03'
OUT.mkdir(parents=True, exist_ok=True)
story = json.loads((ROOT / 'story.json').read_text())
voice = json.loads((ROOT / 'voice.json').read_text())
if not (PUBLIC/'narration.mp3').exists():
    request = urllib.request.Request(voice['url'], headers={'User-Agent': 'Remotion-History-Project/1.0'})
    with urllib.request.urlopen(request, timeout=90) as response:
        (PUBLIC / 'narration-original.mp3').write_bytes(response.read())
    raw_duration = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(PUBLIC/'narration-original.mp3')]))
    tempo = raw_duration / 56.6
    if not 0.75 <= tempo <= 1.35:
        raise RuntimeError('Voice take needs a pacing review before retiming.')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(PUBLIC/'narration-original.mp3'), '-af', f'atempo={tempo:.8f},loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '44100', str(PUBLIC/'narration.mp3')], check=True)
duration = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(PUBLIC/'narration.mp3')]))
model = WhisperModel('base', device='cpu', compute_type='int8', cpu_threads=4)
segments, _ = model.transcribe(str(PUBLIC/'narration.mp3'), language='id', word_timestamps=True, beam_size=5, vad_filter=True)
spoken = [w for segment in segments for w in (segment.words or [])]
if not spoken:
    raise RuntimeError('No spoken words found; refusing to render unsynchronized narration.')
def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())
original = [w for paragraph in story['narration'] for w in paragraph.split()]
matcher = difflib.SequenceMatcher(a=[norm(w) for w in original], b=[norm(w.word) for w in spoken], autojunk=False)
anchors = {}
for block in matcher.get_matching_blocks():
    for k in range(block.size):
        anchors[block.a+k] = spoken[block.b+k].start
coverage = len(anchors) / len(original)
print(f'Voice duration {duration:.2f}s; matched script words {coverage:.1%}')
if coverage < 0.75:
    raise RuntimeError('Narration alignment coverage too low; manual review required.')
# Keep approved wording; fill ASR-normalized numbers and names between real anchors.
anchors[-1] = 0.0
anchors[len(original)] = duration
keys = sorted(anchors)
starts = []
for i in range(len(original)):
    if i in anchors:
        value = anchors[i]
    else:
        lo = max(k for k in keys if k < i)
        hi = min(k for k in keys if k > i)
        value = anchors[lo] + (anchors[hi]-anchors[lo]) * (i-lo)/(hi-lo)
    starts.append(max(value, starts[-1] if starts else 0))
words = [{'text':w, 'start':round(starts[i],3), 'end':round(starts[i+1] if i+1<len(starts) else duration,3)} for i,w in enumerate(original)]
chapter_starts = [0]
count = len(story['narration'][0].split())
for paragraph in story['narration'][1:]:
    chapter_starts.append(round(starts[count]*30))
    count += len(paragraph.split())
total_frames = math.ceil((duration+1.4)*30)
ends = chapter_starts[1:] + [total_frames]
timing = {'durationInFrames':total_frames, 'alignmentCoverage':coverage, 'scenes':[{'from':a,'duration':b-a} for a,b in zip(chapter_starts,ends)], 'words':words}
(ROOT/'timing.json').write_text(json.dumps(timing,ensure_ascii=False,indent=2))
(OUT/'timing.json').write_text(json.dumps(timing,ensure_ascii=False,indent=2))

def stamp(t):
    ms=round(t*1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
lines=[]
for i in range(0,len(words),5):
    group=words[i:i+5]
    lines.append(f"{len(lines)+1}\n{stamp(group[0]['start'])} --> {stamp(group[-1]['end'])}\n{' '.join(w['text'] for w in group)}\n")
(OUT/'codex-skills.srt').write_text('\n'.join(lines))
# Original quiet instrumental bed, generated locally. No third-party music assets.
sample_rate=22050
pcm=array.array('h')
length=total_frames/30
chimes=[x/30 for x in chapter_starts]
for n in range(math.ceil(length*sample_rate)):
    t=n/sample_rate
    fade=min(1,t/2,max(0,(length-t)/2))
    pad=sum(math.sin(2*math.pi*hz*t) for hz in (130.8128,164.8138,195.9977))/3
    bell=sum(math.sin(2*math.pi*hz*(t-c))*math.exp(-(t-c)*3)*0.13 for c in chimes if 0<=t-c<2 for hz in (523.25,783.99))
    value=fade*(pad*0.09+bell)
    pcm.append(int(max(-1,min(1,value))*32767))
with wave.open(str(PUBLIC/'music.wav'),'w') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(sample_rate);w.writeframes(pcm.tobytes())
(OUT/'sources.json').write_text(json.dumps(story['sources'],ensure_ascii=False,indent=2))
