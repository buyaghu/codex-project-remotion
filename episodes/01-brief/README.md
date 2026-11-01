# Episode 01 — Kenapa hasil Codex masih generik?

Seri Codex untuk Kreator. Target 53 detik; 1080×1920, 30fps.

Visual: latar krem, teks hitam dengan penekanan merah, kartu prompt ilustratif, maskot Kodey berbentuk simpul dengan mata/mulut/tangan/kaki, subtitle dengan sorotan kata. Semua demonstrasi merupakan ilustrasi, bukan rekaman layar. Kodey adalah kreasi kanal, bukan maskot resmi OpenAI.

VO: ElevenLabs, Andi, eleven_v4. Audio disesuaikan temponya ke 51,6 detik tanpa mengubah pitch; penutup menambah 1,4 detik. Subtitle diselaraskan ke audio setelah perubahan tempo, dan naskah asli dipertahankan.

Kerangka lima unsur brief adalah saran editorial: tujuan, audiens, format, referensi, batasan. Tidak menjanjikan hasil pasti atau menggambarkan kelima unsur itu sebagai persyaratan teknis Codex. Acuan: https://learn.chatgpt.com/docs/prompting.

## Render

GitHub Actions → Render Codex Creator Episode 01. Hasil: renders/ep01/codex-brief.mp4. Episode dan hasil Bandar Lampung tetap tersedia secara terpisah.

```bash
npm install
pip install faster-whisper==1.2.1
python episodes/01-brief/scripts/prepare.py
npx tsc --project episodes/01-brief/tsconfig.json
npx remotion studio episodes/01-brief/index.ts
npx remotion render episodes/01-brief/index.ts CodexBrief out/ep01/codex-brief.mp4 --codec=h264 --concurrency=2
```

FFmpeg diperlukan. Narasi di public/episodes/01-brief/narration.mp3 digunakan kembali setelah render pertama. Jika naskah berubah, ganti audio beserta manifest yang sesuai sebelum menyelaraskan ulang.
