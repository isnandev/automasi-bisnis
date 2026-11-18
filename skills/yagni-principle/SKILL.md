---
name: yagni-principle
description: Prinsip YAGNI ("You Aren't Gonna Need It") untuk membuat tool sesederhana mungkin. Pakai setiap kali merencanakan, menulis, atau menambah fitur pada dashboard, jadwal otomatis, atau ekstensi Chrome, dan saat user minta "sederhana saja", "jangan ribet", atau saat sebuah rencana mulai membengkak.
---

# YAGNI: buat yang dibutuhkan sekarang saja

Tool di modul ini dipakai satu orang untuk satu pekerjaan. Kode yang tidak ditulis tidak bisa rusak.

## Sebelum menambah apa pun, tanya urut dari atas

1. **Perlu sekarang?** Kalau alasannya "nanti mungkin", jangan dibuat. Catat di bagian "Nanti" di PLAN.md.
2. **Sudah ada di proyek?** Pakai ulang fungsi, komponen, atau pola yang sudah ada.
3. **Bisa dengan fitur bawaan?** HTML (`<input type="date">`, `<dialog>`, `<details>`), CSS, `Intl` untuk format Rupiah dan tanggal, `chrome.storage` di ekstensi, `localStorage` di dashboard.
4. **Library yang sudah terpasang bisa?** Pakai itu. Jangan menambah dependency untuk hal yang cukup beberapa baris.
5. **Baru setelah itu**, tulis kode paling sedikit yang bekerja.

## Aturan

- Maksimal 5 fitur di versi pertama. Sisanya masuk "Nanti".
- Tidak ada login, akun, role, atau multi-user. Tool ini untuk kamu sendiri.
- Tidak ada server sendiri kalau bisa dihindari. Simpan data di browser, file JSON, atau OctoBuild.
- Tidak ada pengaturan untuk nilai yang tidak pernah berubah. Tulis langsung sebagai konstanta.
- Tidak ada abstraksi untuk satu pemakaian: tidak ada "service layer", "factory", atau "helper" yang dipanggil sekali.
- Satu file lebih baik daripada lima file kecil, selama masih mudah dibaca.
- Hapus kode yang tidak dipakai, jangan dikomentari.

## Yang tidak boleh disederhanakan

- Validasi input yang masuk dari luar (form, halaman web, webhook).
- Penanganan error yang mencegah data hilang. Jangan pernah membuang apa yang sudah diketik user.
- Keamanan: token dan secret tidak boleh masuk kode yang dibagikan atau di-commit.
- Aksesibilitas dasar: label pada input, kontras cukup, bisa dipakai dengan keyboard.

## Cara melapor

Setelah selesai, tulis paling banyak tiga baris: apa yang sengaja tidak dibuat, dan kapan perlu ditambahkan. Contoh: "Belum ada ekspor Excel; CSV sudah bisa dibuka di Excel. Tambahkan kalau butuh format sel."
