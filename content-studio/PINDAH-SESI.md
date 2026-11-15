# Memakai paket ini di sesi atau environment baru

File lokal sesi lama tidak otomatis tersedia pada environment baru. Simpan ZIP ini dan unggah kembali jika sesi baru tidak memiliki folder `content-studio`.

## Instruksi untuk agen di sesi baru

1. Ekstrak ZIP ke `/workspace` sehingga ada `/workspace/content-studio/.agents/skills/`. Periksa nama entri ZIP terlebih dahulu dan jangan menimpa file pengguna yang sudah ada. File tersembunyi `.agents` wajib ikut diekstrak.
2. Baca `/workspace/content-studio/AGENTS.md` dan skill yang cocok dengan permintaan pengguna. Skill bisa dibaca langsung tanpa mengunduh ulang.
3. Agar ditemukan lagi dari root workspace, tambahkan rujukan ke `/workspace/content-studio/AGENTS.md` pada `/workspace/AGENTS.md`. Pertahankan instruksi lain yang sudah ada.
4. Buat ulang tautan `libraries/lemo-opuscar/plugin/skills/lemo-opuscar` ke folder `.agents/skills/lemo-opuscar` jika panduan perpustakaan membutuhkan jalur itu. Alternatifnya, panggil skrip setup langsung dari folder skill yang terpasang.
5. Dependensi biner dan paket runtime sengaja tidak dibawa dalam ZIP. Status pemeriksaan dari environment lama tidak membuktikan runtime environment baru sudah siap. Periksa Node, Python, FFmpeg, dan dependensi terlebih dahulu.
6. Untuk menyiapkan runtime, jalankan dari `/workspace/content-studio` dengan akses jaringan:

```bash
. ./env.sh
npm ci --no-audit --no-fund
npx --no-install playwright install chromium --only-shell
sh .agents/skills/lemo-opuscar/scripts/setup.sh deps
```

Pemasangan dependensi suara dan musik tambahan dilakukan hanya ketika dibutuhkan oleh konten. Beberapa layanan atau fitur Pro membutuhkan akun masing-masing.

`install-manifest.json` memuat sumber dan hash 841 file. Semua file ini diverifikasi sebelum dikemas. Lisensi sumber ada di folder `licenses` dan perpustakaan terkait.

## Pesan yang bisa dikirim pengguna

> Em, ekstrak ZIP terlampir ke /workspace, baca content-studio/AGENTS.md dan PINDAH-SESI.md, lalu aktifkan skills lokalnya untuk sesi ini. Pertahankan file yang sudah ada. Setelah itu cek kesiapan alat render.

Skill ini terpasang secara lokal pada environment tempat ZIP diekstrak, bukan secara global di akun ChatGPT.
