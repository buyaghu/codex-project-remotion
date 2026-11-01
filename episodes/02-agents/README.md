# Episode 02 — Panduan gaya brand dengan AGENTS.md

Reels vertikal 1080×1920, 30 fps, target 58 detik. Kodey, ilustrasi folder dan panduan brand, VO ElevenLabs Andi, musik latar, subtitle dengan sorotan kata.

Sumber: [dokumentasi resmi OpenAI](https://developers.openai.com/codex/guides/agents-md/). Episode membahas panduan di lingkup proyek. Tidak menyatakan bahwa file repo otomatis menjadi ingatan global atau selalu menjamin kepatuhan sempurna. Nama file persis: `AGENTS.md`.

Contoh aturan brand hanya tampil sebagai ilustrasi dalam animasi; bukan file instruksi baru yang menggantikan panduan produksi repo. Narasi menyebut nama file secara fonetis; nama tepat ditampilkan pada layar.

Render melalui Actions → Render Codex Creator Episode 02. Video: `renders/ep02/codex-agents.mp4`. Episode terdahulu tetap tersimpan.

Untuk lokal: jalankan `python episodes/02-agents/scripts/prepare.py`, `npx tsc --project episodes/02-agents/tsconfig.json`, lalu `npx remotion render episodes/02-agents/index.ts CodexAgents out/ep02/codex-agents.mp4 --codec=h264 --concurrency=2`. Node, Python, FFmpeg, dependensi npm serta faster-whisper diperlukan. Audio pertama disesuaikan temponya ke 56,6 detik tanpa mengubah pitch, lalu subtitle diselaraskan setelah penyesuaian. Narasi tersimpan dipakai kembali untuk render berikutnya.
