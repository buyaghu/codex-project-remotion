#!/usr/bin/env python3
"""Download the pinned upstream skill files and verify Git blob hashes."""
import concurrent.futures
import hashlib
import json
import os
from pathlib import Path
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / 'install-manifest.json').read_text())

def blob_hash(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()

def download(entry):
    destination = Path(entry['destination'])
    relative = destination.relative_to(MANIFEST['project']) if destination.is_absolute() else destination
    target = (ROOT / relative).resolve()
    target.relative_to(ROOT)
    if target.is_file() and blob_hash(target.read_bytes()) == entry['sha']:
        return
    url = 'https://raw.githubusercontent.com/{}/{}/{}'.format(
        entry['repo'], entry['commit'], urllib.parse.quote(entry['source']))
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=45) as response:
                data = response.read()
            if blob_hash(data) != entry['sha']:
                raise ValueError('Git blob hash mismatch: ' + entry['source'])
            target.parent.mkdir(parents=True, exist_ok=True)
            temporary = target.with_name(target.name + '.download')
            temporary.write_bytes(data)
            temporary.replace(target)
            if entry.get('mode') == '100755':
                os.chmod(target, 0o755)
            return
        except Exception:
            if attempt == 3:
                raise
            time.sleep(attempt + 1)

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        for number, _ in enumerate(pool.map(download, MANIFEST['files']), 1):
            if number % 100 == 0:
                print(f'Verified {number}/{len(MANIFEST["files"])} files', flush=True)
    print(f'Installed and verified {len(MANIFEST["files"])} upstream files.')
