# Episode 03 — Kerjaan berulang? Jadikan skill!

Target 58 detik, 1080×1920, 30fps. Desain mengikuti prinsip referensi baru pengguna: kertas kisi putih, timeline biru vertikal, kartu mengambang, alur diagram dengan garis animasi, dan kata aktif berbingkai. Narasi Indonesia: ElevenLabs Andi. Identitas visual dan isi dibuat untuk kanal ini; tidak menyalin branding pembuat referensi.

Sumber: [OpenAI — Build skills](https://developers.openai.com/codex/skills/). Skill memiliki SKILL.md dengan metadata name dan description; scripts, references, dan assets opsional. Jalur repo contoh: .agents/skills/reels-kanal/SKILL.md. Folder yang ditampilkan di video hanya ilustrasi; tidak menginstal skill baru atau menjamin hasil sempurna.

Maskot: versi gambar utuh transparan dari acuan Kodey 3D hitam, mata/mulut ekspresif, tangan/kaki putih. Aset: public/mascot/kodey-main.png. Versi revisi memakai rig wajah terpisah dengan kedipan dan mulut yang dituntun audio. Lengan/kaki belum dirig terpisah. Gambar acuan asli tetap disimpan.

Render: Actions → Render Codex Creator Episode 03. MP4 permanen: renders/ep03/codex-skills.mp4. Narasi tersimpan di public/episodes/03-skills/. Episode lama tetap tersedia.

Untuk lokal, instal dependensi npm, FFmpeg, faster-whisper; jalankan python episodes/03-skills/scripts/prepare.py, npx tsc --project episodes/03-skills/tsconfig.json, lalu npx remotion render episodes/03-skills/index.ts CodexSkills out/ep03/codex-skills.mp4 --codec=h264 --concurrency=2. Tempo VO disesuaikan ke 56,6 detik tanpa perubahan pitch; subtitle diselaraskan sesudahnya. Output wajib 45–60 detik dan memiliki audio.

## Revisi host

Kodey sekarang menggunakan body plate transparan, mata dan mulut sebagai lapisan animasi terpisah, dan data gerak per frame dari VO yang benar-benar dipakai. Mata berkedip; mulut menutup pada jeda suara dan mengganti bentuk sesuai petunjuk vokal dari kata yang diselaraskan. Ini rig wajah bergaya kartun yang dituntun energi audio dan tulisan, bukan fonem 3D yang presisi. Tangan/kaki belum dirig terpisah.

File: KodeyHost.tsx, host-motion.json, public/mascot/kodey-body.png. Video close-up 6 detik: renders/ep03/kodey-host-demo.mp4. Hasil lengkap: renders/ep03/codex-skills.mp4.
