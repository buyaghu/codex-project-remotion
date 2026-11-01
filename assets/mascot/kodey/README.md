# Maskot utama — Kodey

Disetujui pengguna pada 1 November 2026. Gambar acuan: [reference.jpg](reference.jpg).

## Identitas visual
- Tubuh berbentuk simpul hitam dengan volume dan pencahayaan bergaya 3D.
- Mata besar ekspresif dengan pantulan cahaya, mulut ramah.
- Lengan, sarung tangan, kaki dan sepatu putih.
- Pertahankan bentuk simpul, proporsi, warna, serta karakter wajah dari gambar acuan.
- Gunakan maskot ini sebagai default pada produksi berikutnya. Nama kerja yang sudah dipakai dalam seri: Kodey.

## Dua bentuk penggunaan yang disetujui
1. Gambar utuh: untuk kartu pembuka/penutup, poster, dan gerak seluruh karakter seperti geser, zoom atau melayang.
2. Versi dengan bagian terpisah: tubuh, mata/kelopak, mulut, tangan dan kaki untuk berkedip, berbicara, melambai dan menunjuk di Remotion. Pertahankan tampilan 3D pada asetnya.

Gambar acuan asli telah disimpan. Versi gambar utuh transparan sudah tersedia di `public/mascot/kodey-main.png` dan dipakai pada episode 03. Lihat [catatan versi transparan](cutout-notes.md). Versi host kini memakai body plate tanpa wajah di `public/mascot/kodey-body.png`, mata/kelopak dan mulut sebagai lapisan SVG terpisah, serta data gerak dari VO aktual. Implementasi: `episodes/03-skills/KodeyHost.tsx`. Kedipan terjadwal; bentuk mulut dituntun energi audio dan petunjuk vokal dari timestamp kata (animasi bergaya kartun, bukan penyelarasan fonem 3D sempurna). Lengan dan kaki belum memiliki rig terpisah.

## Penerapan
Desain video (palet, tipografi, latar, komposisi dan transisi) boleh berubah sesuai brief; identitas maskot tetap konsisten. Dua episode pertama telah diterima pengguna dan tetap sebagai versi yang sudah disetujui. Tidak perlu merender ulang episode lama hanya karena keputusan maskot baru.

Ini adalah maskot utama kanal/proyek pengguna, bukan pernyataan bahwa karakter ini maskot resmi OpenAI.

## Ketentuan host dari pengguna

Koreksi pengguna: maskot harus menjadi host, bukan sekadar gambar yang digeser. Pada produksi berikutnya, tampilkan kedipan mata dan gerak mulut mengikuti VO; gerak seluruh gambar saja tidak memenuhi kebutuhan ini. Sediakan pratinjau close-up untuk memeriksa wajah sebelum menyerahkan video. Di jeda suara, mulut harus menutup.
