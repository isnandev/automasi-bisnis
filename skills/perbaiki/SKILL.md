---
name: perbaiki
description: Perbaiki tool yang error atau tidak berjalan sesuai harapan (dashboard, ekstensi Chrome, skrip jadwal, koneksi OctoBuild). Cari akar masalah, perbaiki seminimal mungkin, lalu buktikan sudah beres. Pakai saat user bilang "perbaiki", "error", "tidak jalan", "kok begini", "rusak", "gagal", atau menempelkan pesan error atau screenshot.
---

# Perbaiki

User biasanya bukan programmer. Jangan minta mereka membaca kode. Kamu yang menyelidiki.

## 1. Pahami masalahnya

Kalau belum jelas, tanyakan dalam satu pesan:

1. Tool yang mana, dan apa yang kamu lakukan sebelum masalah muncul?
2. Apa yang kamu harapkan terjadi?
3. Apa yang terjadi? Tempel pesan error atau kirim screenshot kalau ada.

Cara user mendapatkan pesan error, sebutkan yang relevan saja:

- **Dashboard:** teks merah di jendela terminal tempat `npm run dev` berjalan, atau klik kanan halaman → Inspect → tab Console.
- **Ekstensi Chrome:** buka `chrome://extensions` → tombol **Errors** pada ekstensi. Untuk popup: klik kanan popup → Inspect.
- **Koneksi OctoBuild:** pesan dari agent saat memanggil tool MCP, atau status di dashboard OctoBuild → Integrasi → Webhook.

## 2. Ulangi masalahnya sendiri

Sebelum mengubah apa pun, buat masalahnya terjadi lagi di depanmu:

- Jalankan `npm run build` atau `npm run dev` dan baca outputnya sampai habis.
- Buka halaman di browser bawaan harness dan lihat console.
- Untuk ekstensi: validasi `manifest.json` (JSON valid, file yang disebut memang ada, izin yang dibutuhkan tercantum).
- Kalau tidak bisa diulang, katakan terus terang dan minta langkah yang lebih rinci.

## 3. Cari akar masalah, bukan gejalanya

- Telusuri alurnya dari awal sampai akhir: dari tombol yang diklik sampai data tersimpan.
- Kalau fungsi yang bermasalah dipakai di beberapa tempat, perbaiki di fungsinya, bukan di setiap pemanggil.
- Satu hipotesis, satu perubahan, satu uji. Jangan mengubah lima hal sekaligus.

## 4. Perbaiki seminimal mungkin

- Ubah sesedikit mungkin baris. Jangan sekalian merapikan, mengganti library, atau menambah fitur.
- Kalau perbaikannya ternyata butuh fitur baru atau perubahan besar, berhenti dan tawarkan untuk membuat rencana lewat skill `to-plan`.
- Jangan pernah menghapus data user untuk "membereskan" error tanpa izin.

## 5. Buktikan, lalu laporkan

1. Ulangi langkah yang tadi gagal dan pastikan sekarang berhasil. Jalankan juga `npm run build` (dashboard) atau muat ulang ekstensi.
2. Laporkan ke user dalam bahasa sederhana: apa penyebabnya (satu kalimat), apa yang diubah (satu kalimat), dan apa yang perlu dia lakukan (misalnya "klik tombol reload di chrome://extensions").
3. Minta user mencoba sekali lagi dan mengonfirmasi.

## Masalah yang sering muncul

| Gejala | Penyebab biasa | Perbaikan |
| --- | --- | --- |
| `npm` / `node` tidak dikenal | Node.js belum terpasang, atau terminal dibuka sebelum instalasi | Pasang Node.js LTS, tutup lalu buka lagi terminal atau aplikasi harness |
| `Port 5173 is in use` | Dashboard masih jalan di jendela lain | Pakai yang sudah jalan, atau tutup jendela lama |
| Perubahan ekstensi tidak muncul | Ekstensi belum dimuat ulang | `chrome://extensions` → ikon reload pada ekstensi, lalu refresh halaman |
| Ekstensi tidak membaca data marketplace | Tampilan website berubah, selector lama tidak cocok | Buka halamannya, periksa elemen terbaru, perbarui selector di satu tempat |
| `Failed to fetch` dari ekstensi | Alamat tujuan tidak ada di `host_permissions` | Tambahkan domain tujuan di `manifest.json` |
| Webhook OctoBuild menjawab 401 | Signature salah atau secret sudah di-rotate | Cek secret di Integrasi → Webhook dan cara menghitung HMAC (lihat skill `octo-connect`) |
| Tool MCP OctoBuild tidak muncul | Belum login OAuth, atau paket belum mendukung MCP | Jalankan ulang koneksi OctoBuild (skill `octo-connect`) |
| Data dashboard hilang | Membuka di browser atau alamat berbeda (`localStorage` per alamat) | Buka dari alamat yang sama, dan biasakan ekspor CSV berkala |
