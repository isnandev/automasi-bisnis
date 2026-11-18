---
name: analisa-pekerjaanku
description: Wawancarai user tentang pekerjaan atau bisnisnya, temukan bagian yang bisa diotomasi dengan AI, beri skor tiap peluang, lalu biarkan user memilih tool pribadi yang mau dibuat (dashboard, jadwal otomatis, atau ekstensi Chrome). Setelah user memilih, langsung lanjut ke skill to-plan. Pakai saat user bilang "analisa pekerjaanku", "apa yang bisa diotomasi", "bantu otomasi bisnisku", atau mulai menceritakan rutinitas kerjanya.
---

# Analisa Pekerjaanku

Tujuan: dari cerita user, hasilkan daftar peluang otomasi yang realistis untuk **pemakaian pribadi**, beri skor, dan bawa pilihan user langsung ke `to-plan`.

User biasanya bukan programmer. Pakai Bahasa Indonesia yang santai, sapa dengan "kamu", tanpa jargon teknis.

## 1. Dengarkan ceritanya

Kalau user belum bercerita, kirim satu pesan berisi pertanyaan ini (jangan dipecah satu-satu):

1. Bisnis atau pekerjaanmu apa, dan peranmu di sana?
2. Ceritakan rutinitas harian dan mingguanmu, langkah demi langkah.
3. Aplikasi atau website apa yang kamu pakai? (Excel/Google Sheets, WhatsApp, Tokopedia/Shopee Seller, dll.)
4. Bagian mana yang paling makan waktu, membosankan, atau sering salah?
5. Data apa yang kamu catat, dan disimpan di mana?

Kalau user sudah bercerita, jangan tanya ulang. Tanyakan hanya yang kurang, maksimal 3 pertanyaan susulan. Kalau user mengirim file (sheet, screenshot, export), baca dulu sebelum bertanya.

## 2. Pecah jadi tugas, lalu beri skor

Tulis setiap tugas sebagai satu kalimat kerja ("cek harga 20 produk kompetitor di Shopee setiap pagi"). Untuk tiap tugas, pilih satu jenis tool:

| Jenis | Cocok untuk |
| --- | --- |
| **Dashboard** | Melihat, mencatat, dan merangkum data: laporan penjualan, daftar stok, rekap harga. |
| **Jadwal** | Pekerjaan yang jalan sendiri di jam tertentu: rekap harian, pengingat, cek data rutin. |
| **Ekstensi Chrome** | Pekerjaan di dalam website: membaca halaman marketplace, menyalin data, mengisi form berulang. |

Beri nilai 1–5 untuk empat kriteria:

| Kriteria | 1 | 3 | 5 |
| --- | --- | --- | --- |
| **Hemat waktu** | < 15 menit/minggu | 1–3 jam/minggu | > 6 jam/minggu |
| **Repetitif** | Selalu beda, butuh penilaian | Pola sama, sedikit variasi | Langkah persis sama |
| **Mudah dibuat** | Butuh login otomatis, API berbayar, atau banyak pengguna | Perlu membaca halaman web | Data sudah ada, cukup diolah dan ditampilkan |
| **Aman** | Memindahkan uang, mengirim ke pelanggan, atau menghapus data | Mengubah data tapi bisa dicek dulu | Hanya membaca dan menampilkan |

**Skor = (jumlah empat nilai) × 5**, jadi 20–100.

- **75–100: Prioritas.** Buat duluan.
- **55–70: Layak.** Buat setelah yang prioritas jalan.
- **< 55: Nanti saja.** Jelaskan alasannya dalam satu kalimat.

### Batas yang wajib dijaga

Tool di modul ini hanya untuk **dipakai sendiri** dan **tidak rumit**. Taruh di "Tidak disarankan sekarang" (dengan alasan singkat) kalau tugasnya butuh:

- banyak pengguna, login pelanggan, pembayaran, atau website publik;
- aplikasi HP;
- melewati CAPTCHA, login otomatis ke akun orang lain, atau scraping massal yang melanggar aturan marketplace;
- mengirim pesan massal atau memindahkan uang tanpa dicek manusia.

Scraping marketplace (Tokopedia, Shopee) dilakukan lewat **ekstensi Chrome yang membaca halaman yang sedang kamu buka**, dengan jeda wajar, bukan robot server yang menyedot ribuan halaman.

## 3. Tampilkan hasil

Format jawaban:

1. Ringkasan cerita user dalam 2–3 kalimat (supaya user bisa mengoreksi).
2. Tabel diurutkan dari skor tertinggi:

   | No | Tugas | Ide tool | Jenis | Hemat | Repetitif | Mudah | Aman | Skor | Saran |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

3. Untuk 3 teratas: satu kalimat "kenapa ini bagus" dan perkiraan waktu yang dihemat per minggu.
4. Daftar "Tidak disarankan sekarang" (kalau ada).
5. Pertanyaan: "Mau dibuatkan yang mana? Boleh pilih lebih dari satu, sebut nomornya." Kalau harness punya tool pertanyaan pilihan ganda, pakai itu dengan opsi 3 teratas (multi-select).

Contoh baris untuk toko online:

| No | Tugas | Ide tool | Jenis | Hemat | Repetitif | Mudah | Aman | Skor | Saran |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Cek harga kompetitor di Shopee/Tokopedia tiap pagi | Tombol "Ambil harga" di halaman pencarian, hasil masuk tabel | Ekstensi Chrome | 4 | 5 | 4 | 5 | 90 | Prioritas |
| 2 | Rekap stok dan penjualan mingguan dari file export | Dashboard stok + grafik penjualan | Dashboard | 3 | 5 | 5 | 5 | 90 | Prioritas |
| 3 | Samakan stok di dua marketplace | Ekstensi yang mengisi form stok dari data pusat, user klik "Simpan" sendiri | Ekstensi Chrome | 4 | 5 | 3 | 3 | 75 | Prioritas |

## 4. Simpan, lalu lanjut ke to-plan

Setelah user memilih:

1. Simpan `analisa.md` di folder kerja: ringkasan cerita, tabel lengkap, daftar yang tidak disarankan, dan **pilihan user**.
2. **Langsung jalankan skill `to-plan`** dengan pilihan tersebut. Jangan menunggu perintah lagi dan jangan bertanya "mau lanjut?". Kalau harness punya tool untuk memanggil skill, panggil `to-plan`. Kalau tidak, baca `../to-plan/SKILL.md` lalu ikuti langkahnya.
