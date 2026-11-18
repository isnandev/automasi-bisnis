# Asisten Toko (template ekstensi Chrome)

Ekstensi Manifest V3 tanpa proses build. Mengambil data dari halaman yang sedang kamu buka, menyimpannya di browser, mengunduhnya sebagai CSV, atau mengirimnya ke OctoBuild lewat webhook masuk.

## Memasang

1. Buka `chrome://extensions` (Edge: `edge://extensions`).
2. Nyalakan **Developer mode** di kanan atas.
3. Klik **Load unpacked**, pilih folder ini.
4. Klik ikon puzzle di toolbar, lalu pin **Asisten Toko**.

Setiap kali file diubah, klik ikon reload pada kartu ekstensi di `chrome://extensions`, lalu refresh halaman yang mau dibaca.

## Memakai

1. Buka halaman produk atau hasil pencarian.
2. Klik ikon Asisten Toko → **Ambil data dari halaman ini**.
3. **Unduh CSV** untuk dibuka di Excel/Google Sheets atau diimpor ke dashboard.
4. **Kirim ke OctoBuild**: isi dulu URL dan secret webhook di **Pengaturan**. Data yang sudah terkirim ditandai dan tidak dikirim ulang.

## Menyesuaikan

| File | Isi |
| --- | --- |
| `manifest.json` | Nama, versi, izin. Tambah domain tujuan di `host_permissions` kalau mengirim ke alamat lain. |
| `ambil-data.js` | Cara membaca halaman. Ganti bagian "Cadangan" dengan selector halaman target. |
| `popup.html`, `popup.js` | Tampilan dan tombol popup. |
| `options.html`, `options.js` | Halaman pengaturan webhook. |
| `style.css` | Token warna dan font dari DESIGN.md. |
| `cek.mjs` | Cek cepat pembaca data: `node cek.mjs`. |

## Batasan

- Ekstensi hanya membaca halaman yang kamu buka, saat kamu menekan tombol. Tidak login otomatis, tidak melewati CAPTCHA.
- Ikuti aturan marketplace. Jangan mengambil data ribuan halaman sekaligus.
- Data tersimpan di browser ini (`chrome.storage.local`). Unduh CSV berkala sebagai cadangan.
- Jangan pernah menaruh kunci API OctoBuild (`bldr_...`) di ekstensi. Cukup URL dan secret webhook.
