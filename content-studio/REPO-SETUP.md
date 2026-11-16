# Skills di repo GitHub

Skill disimpan dalam repo agar ikut tersedia saat sesi Codex membuka checkout repo yang sama. Membuka chat tanpa memuat repo tersebut tidak membawa file ini secara otomatis.

Folder `content-studio/.agents/skills/` berisi 16 skill dan referensinya. Folder `.agents/skills/` pada root repo menautkan setiap skill ke sumber itu agar dapat ditemukan oleh Codex. `AGENTS.md` pada root repo juga memberikan petunjuk pemakaian.

## Sesi baru

1. Pilih repo ini ketika membuat task atau sesi Codex, lalu gunakan `main` terbaru setelah PR pemasangan di-merge.
2. Minta konten yang diinginkan dan sebut skill atau gaya jika sudah punya pilihan.
3. Skill dan panduan langsung tersedia. Paket runtime dan browser perlu diperiksa pada setiap environment baru.

## Setup runtime

Dari root repo, dalam Bash dengan Node, Python, FFmpeg dan akses jaringan tersedia:

```bash
. ./content-studio/env.sh
cd "$CONTENT_STUDIO_ROOT"
npm ci --no-audit --no-fund
npx --no-install playwright install chromium --only-shell
sh .agents/skills/lemo-opuscar/scripts/setup.sh deps
```

Perintah ini juga dapat dipasang sebagai setup script environment Codex jika environment repo mendukungnya. Dependensi suara atau musik tambahan Lemo-Opuscar dipasang ketika dibutuhkan.

Cache, paket npm, virtual environment Python, dan hasil render tidak disimpan di Git. Sumber upstream dikunci oleh commit dan hash dalam `install-manifest.json`, serta lisensinya disertakan.

## Empat skills kreatif tambahan

Bang Motion, Vox Director, Huashu Art Motion dan Claude Drawing tersedia melalui `.agents/skills/` di root repo. Buka task Codex baru dengan repo ini dan branch terbaru untuk memuatnya. Contoh: "Pakai bang-motion untuk opener 10 detik" atau "Pakai claude-drawing untuk ilustrasi tinta".

Instalasi sumber tidak menjalankan generator atau memasang runtime ke semua environment. Untuk Claude Drawing, pasang dependensi bila belum ada:

```bash
python3 -m pip install -r content-studio/.agents/skills/claude-drawing/requirements.txt
```

Huashu membutuhkan uv, FFmpeg dan Playwright Chromium. Bang Motion memakai browser; alat ekspor opsional membutuhkan Node/Puppeteer dan FFmpeg. Vox Director membutuhkan Python/Pillow, FFmpeg/ffprobe dan `ATLASCLOUD_API_KEY` milik pengguna. Simpan API key sebagai environment secret, jangan dalam repo. Baca prasyarat pada SKILL.md masing-masing sebelum render. Galeri gambar/video dan arsip .skill tidak dibundel; kode contoh serta aset runtime tetap disertakan. Provenance tercatat di `creative-skills-manifest.json`.
