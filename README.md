# Bandar Lampung Tempo Dulu

Motion graphic Remotion vertikal, 1080×1920, 30 fps, 30 detik. Lima adegan bergaya sepia membahas ingatan kota, Telukbetung, dan Tanjungkarang. Visual berupa ilustrasi artistik, bukan foto arsip atau rekonstruksi sejarah yang terverifikasi. Tanpa audio.

## Render di GitHub

Buka Actions → Render Bandar Lampung. Workflow berjalan saat kode didorong ke main atau lewat Run workflow. Setelah sukses, unduh artifact bandar-lampung-tempo-dulu untuk mendapatkan MP4.

## Lokal

Node.js 22 atau lebih baru.

```bash
npm install
npm start
npm run check
npm run render
```

Edit adegan pada src/Film.tsx. Hasil render: out/bandar-lampung.mp4.
