# Sejarah Bandar Lampung — Satu Kota, Dua Tanggal

Video penjelasan 2D vertikal 1080×1920, 30 fps. Karakter pemandu orisinal, pesisir kartun, arsip, kalender, papan nama, narasi bahasa Indonesia, subtitle dengan sorotan kata hijau, musik instrumental sederhana. Durasi mengikuti audio, bukan dipaksakan ke 60 detik.

## Dasar cerita

- **17 Juni 1682:** hari jadi yang ditetapkan kemudian berdasarkan catatan sejarah Telukbetung. Bukan tahun penggunaan nama Bandar Lampung.
- **17 Juni 1983:** perubahan nama Tanjungkarang–Telukbetung menjadi Bandar Lampung melalui PP No. 24 Tahun 1983. Tidak digambarkan sebagai penggabungan kota pada tahun tersebut.

Sumber primer:

1. [Sejarah Kota — PPID Pemkot Bandar Lampung](https://e-ppid.bandarlampungkota.go.id/pemerintahan/sejarah).
2. [PP No. 24 Tahun 1983 — JDIH BPK](https://peraturan.bpk.go.id/Details/71880/pp-no-24-tahun-1983).

`story.json` memuat naskah, bab, sumber, dan catatan editorial. Ilustrasi tidak mengklaim kemiripan tokoh sejarah, bangunan asli, pakaian periode tertentu, atau peta berskala. Narasi dan tokoh pemandu merupakan kreasi baru; tidak menyalin karakter maupun audio video referensi.

## Render

GitHub Actions → Render Bandar Lampung → Run workflow. Workflow juga berjalan saat sumber diperbarui di main. Unduh artifact **bandar-lampung-sejarah-2d**: MP4, empat frame pratinjau, subtitle SRT, timing JSON, sumber, dan metadata hasil.

1. Unduh narasi yang dibuat melalui vidIQ dari URL di `voice.json`.
2. Normalisasi audio dan transkripsikan dengan Whisper untuk mendapatkan timestamp kata.
3. Selaraskan naskah asli ke timestamp, agar ejaan nama/tahun subtitle tetap mengikuti naskah.
4. Buat soundtrack instrumental asli dan render melalui Remotion.
5. Periksa durasi, ukuran gambar, dan keberadaan audio.

Timestamp untuk kata yang dinormalisasi berbeda oleh ASR (misalnya tahun dalam angka) diinterpolasi di antara kata yang cocok. Nilai `alignmentCoverage` dicatat untuk review; skrip menolak hasil jika kurang dari 50%. Periksa pelafalan dan subtitle sebelum publikasi.

## Lokal

Node 22+, Python 3.11, FFmpeg. URL narasi harus masih dapat diakses.

```bash
npm install
pip install faster-whisper==1.2.1
python scripts/prepare.py
npm run check
npm start
npm run render
```

`src/timing.json` awal adalah placeholder; jalankan prepare sebelum preview/render. Narasi dan musik dihasilkan ke `public/` saat build dan tidak disimpan dalam Git. URL audio berjangka di `voice.json` mungkin perlu diperbarui untuk render ulang di masa depan.
