"""md (script_vNN_part2.md) -> phrases with ids for eps/time_states_p2/build/script.json. Usage: p2_final_json.py <md> <out.json>"""
import json, re, sys
from pathlib import Path
IDS = {"1": ["k1"], "2": ["k2"], "3": ["r1"], "4": ["r1_2"], "5": ["r2b"], "6": ["r2"], "7": ["f1"], "8": ["f1_2"],
       "9": ["f2"], "10": ["f2_2"], "11": ["f2_3"], "18а": ["g2", "g2_2", "g2_3", "g2_4"], "18б": ["g3", "g3_2", "g3_3"], "19": ["z2"], "20": ["z3"],
       "12": ["r4"], "14": ["p1"], "16а": ["e1"], "16б": ["e1_2"], "16в": ["e1_3"], "17": ["z1"], "21": ["z4", "z4_2"],
       "22": ["z4_3"], "23": ["z5"], "24": ["z5_2"]}
out = []
for l in Path(sys.argv[1]).read_text().split("\n"):
    m = re.match(r"^(\S+)\. (.*)$", l)
    if not m or m.group(1) not in IDS:
        continue
    key, text = m.groups()
    notes = re.findall(r"\[(надпись:[^\]]*)\]", text)
    text = re.sub(r"\s*\[надпись:[^\]]*\]", "", text)
    parts = [p for p in re.split(r"\s*\[(\d+(?:\.\d+)?)\]\s*", text)]
    chunks = [(parts[i].strip(), float(parts[i + 1]) if i + 1 < len(parts) else 0.0) for i in range(0, len(parts), 2) if parts[i].strip()]
    ids = IDS[key]
    assert len(chunks) == len(ids), (key, len(chunks), ids, chunks)
    for pid, (t, pz) in zip(ids, chunks):
        out.append({"id": pid, "line": key, "text": t, "pause": pz, **({"onscreen": notes} if notes and pid == ids[-1] else {})})
Path(sys.argv[2]).write_text(json.dumps(out, ensure_ascii=False, indent=1))
print(len(out), "phrases;", sum(len(re.findall(r"[А-Яа-яЁёA-Za-z0-9]+", p["text"])) for p in out), "words")
