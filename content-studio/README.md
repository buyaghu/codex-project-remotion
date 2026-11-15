# Studio konten

Empat paket skill berikut tersimpan di repo `buyaghu/codex-project-remotion`, lengkap dengan panduan, skrip, aset pendukung, dan lisensi sumber.

| Paket | Isi | Panduan awal |
| --- | --- | --- |
| HyperFrames | HTML menjadi video; enam skill inti | [.agents/skills/hyperframes/SKILL.md](.agents/skills/hyperframes/SKILL.md) |
| Animate | Animasi canvas; tujuh gaya bawaan | [.agents/skills/animate/SKILL.md](.agents/skills/animate/SKILL.md) |
| Lemo-Opuscar | 99 gaya film, ditambah template gaya | [.agents/skills/lemo-opuscar/SKILL.md](.agents/skills/lemo-opuscar/SKILL.md) |
| GSAP resmi | Delapan skill untuk gerakan, timeline, plugin, framework dan performa | [.agents/skills/gsap-core/SKILL.md](.agents/skills/gsap-core/SKILL.md) |

## Memakai di sesi baru

Pilih repo ini ketika membuka task atau sesi Codex dan gunakan `main` terbaru setelah PR pemasangan digabungkan. Skill tersedia dari checkout repo; chat yang tidak memuat repo ini tidak otomatis menerima file-file tersebut.

Folder `.agents/skills/` pada root repo menautkan 16 skill ke sumber di folder ini. `AGENTS.md` pada root repo menjelaskan kapan setiap skill dipakai dan mempertahankan workflow Remotion serta identitas maskot yang sudah ada.

Contoh permintaan:

> Em, buat konten Reels 30 detik berbahasa Indonesia tentang [topik], format 9:16, menggunakan Animate gaya cut paper.

> Em, buat video promosi produk [nama] menggunakan HyperFrames dan animasi GSAP.

> Em, buat video edukasi memakai gaya Whiteboard Explainer dari Lemo-Opuscar.

## Alat render

Panduan setup berada di [REPO-SETUP.md](REPO-SETUP.md). Skill dapat dibaca dari repo tanpa instalasi ulang. Untuk merender, periksa Node, Python, FFmpeg, paket npm, dan browser pada environment baru; dependensi, cache dan hasil render tidak disimpan di Git.

`env.sh` menemukan lokasinya sendiri sehingga checkout tidak harus berada di `/workspace/content-studio`. Dependensi suara dan musik tambahan Lemo-Opuscar dipasang saat diperlukan. Layanan berbayar dan fitur Pro mengikuti akun serta layanan yang dipilih ketika membuat konten.

## Sumber dan pemeriksaan

`install-manifest.json` mencatat commit, jalur dan hash 841 file upstream. Semua file ini sudah dicocokkan dengan sumbernya. Lisensi disertakan di folder `licenses/` dan perpustakaan terkait. Repo Lemo-Opuscar yang benar adalah https://github.com/lemomo-ai/lemo-opuscar.

Pemeriksaan awal juga membangun demo matematika bawaan Animate dan mengambil frame melalui browser. Skrip pemulihan telah diuji pada lokasi checkout berbeda, dan seluruh tautan skill diperiksa.

Untuk memulihkan berkas sumber dari commit yang sama, jalankan `python scripts/install-skills.py` dengan akses jaringan. Skrip mengembalikan berkas sumber yang berubah ke versi upstream yang tercatat; simpan modifikasi lokal sebelum menjalankannya.

Panduan pemindahan lewat ZIP, jika diperlukan, ada di [PINDAH-SESI.md](PINDAH-SESI.md).
