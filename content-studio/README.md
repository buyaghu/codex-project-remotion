# Studio konten

Empat paket yang diminta sudah dipasang secara lokal di workspace ini. Instalasi berisi 16 skill, panduan, skrip, dan aset pendukung dari repo aslinya.

| Paket | Isi | Lokasi awal |
| --- | --- | --- |
| HyperFrames | HTML menjadi video; enam skill inti | `.agents/skills/hyperframes/SKILL.md` |
| Animate | Animasi canvas; tujuh gaya bawaan | `.agents/skills/animate/SKILL.md` |
| Lemo-Opuscar | 99 gaya film, ditambah template gaya | `.agents/skills/lemo-opuscar/SKILL.md` |
| GSAP resmi | Delapan skill untuk gerakan, timeline, plugin, framework dan performa | `.agents/skills/gsap-core/SKILL.md` |

Repo Lemo-Opuscar yang benar adalah https://github.com/lemomo-ai/lemo-opuscar. Versi yang dipasang sudah memiliki 99 gaya, lebih banyak daripada 66 pada gambar referensi.

## Pakai lewat percakapan

Cukup sebut hasil yang diinginkan, contohnya:

> Buat konten Reels 30 detik berbahasa Indonesia tentang [topik], format 9:16, dengan Animate gaya cut paper.

> Buat video promosi produk [nama] menggunakan HyperFrames dan animasi GSAP.

> Buat video edukasi 45 detik memakai gaya Whiteboard Explainer dari Lemo-Opuscar.

`/workspace/AGENTS.md` mengarahkan agen ke skill yang sesuai untuk permintaan berikutnya. Ini merupakan pemasangan lokal proyek; daftar plugin akun ChatGPT tidak berubah. Folder skill bawaan `/workspace/.agents` dan `/workspace/.codex` hanya bisa dibaca pada lingkungan ini, sehingga instalasi memakai folder `.agents/skills` di proyek ini.

## Alat lokal

Node, Python dan FFmpeg tersedia. HyperFrames CLI, Playwright, browser headless, serta dependensi inti Lemo-Opuscar sudah dipasang. Aktifkan jalur alat dan cache sebelum menjalankan perintah:

```bash
cd /workspace/content-studio
. ./env.sh
hyperframes --version
sh .agents/skills/lemo-opuscar/scripts/setup.sh
```

Dependensi suara dan musik tambahan Lemo-Opuscar dipasang saat diperlukan:

```bash
sh .agents/skills/lemo-opuscar/scripts/setup.sh deps voice music
```

Voice-over eksternal, model berbayar, dan fitur HyperFrames Pro mengikuti akun dan layanan yang dipilih saat membuat konten. Pemasangan skill ini tidak membuat akun atau langganan baru.

Pada sandbox sesi ini, proses browser membutuhkan izin jaringan di alat eksekusi, termasuk saat membaca halaman lokal, karena sandbox tanpa jaringan menolak operasi socket browser.

## Sumber dan pemeriksaan

`install-manifest.json` mencatat repo, commit, jalur dan hash Git setiap file. Semua 841 file unduhan sudah diperiksa hash-nya, dan lisensi sumber disertakan. Berkas asli skill tidak diubah. Dependensi npm dikunci pada lockfile.

Uji instalasi membangun demo matematika bawaan Animate dan mengambil satu frame melalui browser. Ini pemeriksaan teknis instalasi, bukan video konten baru. Hasilnya berada di `verification/`.

Untuk memulihkan berkas sumber dari commit yang sama, jalankan `python scripts/install-skills.py` dengan akses jaringan. Skrip ini mengembalikan berkas yang berubah ke versi upstream yang tercatat; jangan jalankan untuk menyimpan modifikasi lokal skill.
