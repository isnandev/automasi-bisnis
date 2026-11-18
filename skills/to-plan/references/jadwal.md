# Jadwal: pekerjaan yang jalan sendiri

Pilih cara paling sederhana dari atas ke bawah. Berhenti di cara pertama yang cukup.

## 1. Jadwal di harness (paling mudah, tanpa kode)

Agent AI sendiri yang menjalankan prompt pada jam tertentu. Cocok untuk pekerjaan yang butuh "berpikir": merangkum, membandingkan harga, menulis laporan.

- **Antigravity:** ketik `/schedule` di percakapan, lalu tulis kapan dan apa tugasnya.
- **Claude Desktop:** menu Scheduled tasks (jadwal) di tab Code.
- **Codex (aplikasi ChatGPT desktop):** fitur scheduled tasks / automations.

Syarat: aplikasi terbuka dan komputer menyala pada jam tersebut. Tulis prompt jadwal selengkap mungkin (folder kerja, file yang dibaca, hasil disimpan di mana), karena agent mulai tanpa ingatan percakapan sebelumnya. Contoh:

```text
Setiap hari jam 08.00: buka folder kerja ini, baca data/harga-kompetitor.csv,
bandingkan dengan data/produk-saya.csv, lalu tulis laporan/harga-<tanggal>.md berisi
produk yang harganya lebih mahal 5% dari rata-rata kompetitor.
```

## 2. Ekstensi Chrome dengan `chrome.alarms`

Untuk pekerjaan di dalam website yang butuh sesi login kamu (Seller Center, marketplace). Ekstensi menjalankan tugas berkala selama Chrome terbuka.

- Tambahkan izin `"alarms"` di `manifest.json`.
- Di `background.js`: `chrome.alarms.create('cek-harga', { periodInMinutes: 60 })` lalu tangani di `chrome.alarms.onAlarm`.
- Jeda minimal 30 menit untuk halaman marketplace. Jangan membuka ratusan halaman sekaligus.

## 3. Otomasi OctoBuild (jalan di cloud, komputer boleh mati)

Kalau data sudah ada di OctoBuild, buat otomasi lewat MCP (`automation_create`, uji dengan `automation_dry_run`). Lihat skill `octo-connect`. Cek dulu pemicu apa yang tersedia lewat `automations_list` / `automation_get` pada otomasi yang ada, atau tanyakan ke asisten di dashboard OctoBuild.

## 4. Skrip Node + penjadwal sistem (tanpa AI)

Untuk pekerjaan mekanis tanpa login: mengolah file CSV, menggabungkan data, membuat backup.

- Satu file `jadwal-<nama>/run.mjs`, hanya modul bawaan Node (`node:fs`, `fetch`).
- Windows: `schtasks /Create /SC DAILY /ST 08:00 /TN "jadwal-<nama>" /TR "node C:\path\jadwal-<nama>\run.mjs"`
- macOS: `crontab -e` lalu `0 8 * * * /usr/local/bin/node /path/jadwal-<nama>/run.mjs`
- Minta izin user sebelum membuat jadwal sistem, dan beri tahu cara menghapusnya (`schtasks /Delete /TN "jadwal-<nama>"`).
