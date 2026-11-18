---
name: to-plan
description: Ubah pilihan tool dari analisa-pekerjaanku (atau ide tool dari user) menjadi PLAN.md, implementation plan langkah demi langkah, lalu siapkan template dashboard atau ekstensi Chrome dan DESIGN.md di folder kerja. Dipanggil otomatis setelah analisa-pekerjaanku, atau saat user bilang "buatkan plan", "rencanakan", "to-plan", "mau bikin dashboard/ekstensi/jadwal ...".
---

# To Plan

Tujuan: satu `PLAN.md` yang jelas untuk orang non-programmer, folder tool yang sudah berisi template, lalu eksekusi bertahap setelah user setuju.

Baca juga `../yagni-principle/SKILL.md` sebelum menulis rencana. Rencana yang membengkak adalah kegagalan.

## 1. Kumpulkan bahan

- Kalau ada `analisa.md` di folder kerja, ambil pilihan user dari sana.
- Kalau tidak, minta user menjelaskan tool yang diinginkan dalam 2–3 kalimat: untuk apa, data apa, dipakai kapan.
- Untuk tiap tool, pastikan tiga hal ini jelas. Tanyakan hanya yang belum jelas, dalam satu pesan:
  1. **Data** apa yang dicatat atau dibaca (nama kolom, contoh isi).
  2. **Dari mana** datanya (ketik manual, file export, halaman marketplace, OctoBuild).
  3. **Hasil** yang ingin dilihat (tabel, angka ringkasan, grafik, file CSV, notifikasi).

## 2. Pilih template dan tempat data

| Jenis tool | Template | Folder hasil |
| --- | --- | --- |
| Dashboard | `templates/dashboard/` (React + Vite + Tailwind + shadcn/ui) | `dashboard-<nama>/` |
| Ekstensi Chrome | `templates/ekstensi-chrome/` (Manifest V3, tanpa build) | `ekstensi-<nama>/` |
| Jadwal | Tidak ada template; ikuti `references/jadwal.md` | `jadwal-<nama>/` bila perlu skrip |

Tempat data, pilih yang paling sederhana yang cukup:

- **Lokal (default, gratis):** dashboard menyimpan di `localStorage`, ekstensi di `chrome.storage.local`. Pindah data antar tool lewat file CSV atau JSON (ekspor lalu impor).
- **OctoBuild (butuh paket yang mendukung MCP dan webhook):** data di koleksi OctoBuild, bisa dibuka dari mana saja. Ekstensi mengirim lewat webhook masuk. Dashboard dibuat sebagai halaman OctoBuild dan dipublish. Semua langkahnya ada di skill `octo-connect`. Pilih ini hanya kalau user sudah punya akun dengan paket yang sesuai, atau memintanya.

## 3. Siapkan folder

1. Salin `templates/DESIGN.md` ke folder kerja (kalau belum ada). Semua tool memakai design system ini.
2. Salin folder template ke folder hasil (lihat tabel). Ganti nama tool di `package.json` atau `manifest.json`, dan judul di halaman.
3. Jangan mengubah template di dalam folder plugin. Selalu kerjakan salinannya.

## 4. Tulis PLAN.md

Pakai kerangka di `references/plan-template.md`. Aturan:

- Maksimal 5 fitur per tool di versi pertama. Sisanya masuk bagian "Nanti".
- Setiap langkah kecil (selesai dalam satu kali kerja agent) dan punya **cara cek** yang bisa dilakukan user tanpa membaca kode ("buka dashboard, tambah satu produk, refresh halaman, produk masih ada").
- Tulis "Tidak termasuk" secara eksplisit: login, multi-user, aplikasi HP, dan semua yang tidak diminta.
- Untuk ekstensi yang membaca marketplace: hanya membaca halaman yang sedang dibuka user, saat user menekan tombol (atau berkala dengan jeda wajar). Tidak melewati CAPTCHA, tidak login otomatis.

## 5. Minta persetujuan

Tampilkan ringkasan PLAN.md dalam 5–8 baris (tool apa, fitur apa, tempat data, berapa langkah) dan tanyakan: "Rencananya sudah pas? Kalau iya, saya mulai kerjakan langkah 1." Revisi sampai user setuju.

## 6. Kerjakan bertahap

Setelah user setuju:

1. Kerjakan satu langkah, jalankan cek teknisnya sendiri (misalnya `npm run build`, membuka halaman di browser bawaan harness, atau memvalidasi `manifest.json`), lalu centang langkah itu di PLAN.md.
2. Setiap 1–2 langkah, beri tahu user apa yang bisa dicoba sekarang dan cara mencobanya.
3. Saat menulis UI, ikuti:
   - `DESIGN.md` di folder kerja (warna, font, jarak, bahasa Indonesia, format Rupiah dan tanggal `id-ID`);
   - skill `antislop` (jangan desain generik ala AI);
   - dashboard: skill `shadcn` dan `vercel-react-best-practices`;
   - ekstensi dan HTML/CSS biasa: skill `modern-web-guidance`;
   - selalu: `yagni-principle`.
4. Kalau ada error yang tidak selesai dalam dua kali coba, pindah ke alur skill `perbaiki`.
5. Di akhir, tulis "Cara pakai" singkat di README folder tool: cara menjalankan, cara membuka, dan cara mengecek bahwa tool bekerja.
