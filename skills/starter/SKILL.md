---
name: starter
description: Langkah pertama plugin Automasi Bisnis. Sambut user, cek komputer siap (Node.js, npm, folder kerja, Chrome, koneksi OctoBuild), lalu tawarkan menu langkah berikutnya. Pakai saat user bilang "starter", "mulai", "halo", "baru install plugin", "apa yang bisa kamu lakukan", atau baru pertama kali memakai plugin ini.
---

# Starter

User baru saja memasang plugin. Buat mereka siap dalam beberapa menit, tanpa jargon.

## 1. Sambut (maksimal 4 baris)

Jelaskan singkat: plugin ini membantu menemukan pekerjaan yang bisa diotomasi, lalu membuatkan tool pribadi (dashboard, jadwal otomatis, ekstensi Chrome) yang bisa disambungkan ke OctoBuild.

## 2. Cek kesiapan

Jalankan sendiri, jangan suruh user mengetik perintah:

| Cek | Cara | Kalau gagal |
| --- | --- | --- |
| Node.js | `node -v` (butuh v20 atau lebih baru) | Tawarkan memasang versi LTS. Windows: `winget install OpenJS.NodeJS.LTS`. macOS: installer dari `https://nodejs.org` atau `brew install node`. **Minta izin dulu sebelum memasang.** Setelah terpasang, minta user menutup lalu membuka lagi aplikasi harness. |
| npm | `npm -v` | Ikut terpasang bersama Node.js. |
| Folder kerja | Lihat isi folder yang sedang dibuka | Kalau folder berisi file lain yang tidak berhubungan, sarankan membuat folder baru, misalnya `Documents/automasi-<nama-bisnis>`, lalu membukanya di harness. |
| Google Chrome | Tanyakan ke user | Dibutuhkan hanya untuk ekstensi Chrome. Ekstensi juga jalan di Edge dan Brave. |
| OctoBuild (opsional) | Panggil `workspace_get` dari server MCP `octobuild` | Tidak wajib sekarang. Sebutkan bahwa koneksi bisa dibuat nanti lewat skill `octo-connect`. |

Laporkan hasilnya sebagai daftar centang singkat (✅ siap / ⚠️ perlu tindakan).

## 3. Tawarkan menu

> Mau mulai dari mana?
> 1. **Analisa pekerjaanku**: ceritakan pekerjaanmu, aku carikan yang bisa diotomasi.
> 2. **Aku sudah tahu mau bikin apa**: langsung buat rencana tool.
> 3. **Ada tool yang error**: kita perbaiki bersama.
> 4. **Hubungkan ke OctoBuild**: sambungkan data dan tool ke akun OctoBuild-mu.

Arahkan pilihan ke skill: 1 → `analisa-pekerjaanku`, 2 → `to-plan`, 3 → `perbaiki`, 4 → `octo-connect`. Kalau harness punya tool pertanyaan pilihan ganda, pakai itu.
