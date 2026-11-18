---
name: octo-connect
description: Hubungkan agent dan tool buatan user (dashboard, ekstensi Chrome, skrip jadwal) ke OctoBuild. Agent membaca dan menulis data OctoBuild lewat MCP; tool mengirim data ke OctoBuild lewat webhook masuk; dashboard bisa dibuat sebagai halaman OctoBuild lalu dipublish. Pakai saat user bilang "octo-connect", "hubungkan ke OctoBuild", "simpan ke OctoBuild", "kirim data ke OctoBuild", "publish dashboard", atau saat PLAN.md memilih OctoBuild sebagai tempat data.
---

# Octo Connect

Ada dua jalur, dan keduanya punya tugas yang berbeda:

| Jalur | Siapa yang memakai | Untuk apa |
| --- | --- | --- |
| **MCP** `https://app.octobuild.site/mcp` | Agent AI (kamu) | Membuat koleksi, membaca dan menulis data, membuat otomasi, membuat dan mempublish halaman |
| **Webhook masuk** `https://hooks.octobuild.site/in/<workspaceId>/<endpointId>` | Tool user (ekstensi, skrip) | Mengirim data baru ke OctoBuild |

**REST API OctoBuild (`/api/v1/...`) belum dibuka untuk tool luar.** Endpoint itu hanya menerima sesi login dashboard. Jangan pernah membangun tool di atasnya. Webhook keluar (OctoBuild memanggil URL user) juga belum ada; jangan menjanjikannya.

## Syarat

- Akun di `https://app.octobuild.site` (masuk dengan Google).
- Paket yang mendukung MCP dan webhook masuk. Paket Free tidak mendukung keduanya. Kalau tool MCP ditolak karena batas paket, beri tahu user untuk memeriksa paket di Pengaturan, jangan mencoba jalan memutar.

## 1. Pastikan MCP terhubung

Panggil tool `workspace_get` atau `site_overview` dari server `octobuild`.

- **Berhasil:** sebutkan nama workspace ke user, lanjut ke langkah berikutnya.
- **Tool tidak ada / minta login:** plugin ini sudah mendaftarkan server `octobuild` dengan OAuth. Pandu user login:
  - Antigravity: ketik `/plugin`, buka `automasi-bisnis` di bagian Installed, pilih **Sign in**.
  - Claude: ketik `/mcp`, pilih `octobuild`, pilih Authenticate.
  - Codex: jalankan `codex mcp login octobuild`, atau buka pengaturan MCP di aplikasi.
  - Halaman persetujuan OctoBuild akan terbuka di browser. Setelah disetujui, mulai percakapan baru.
- **OAuth tidak bisa dipakai:** pakai kunci API. User membuat kunci di dashboard OctoBuild → Pengaturan → Kunci API (preset `content` cukup untuk data dan halaman). Kunci `bldr_...` hanya tampil sekali. **Minta user menempelkan kunci sendiri ke konfigurasi harness, jangan ke chat dan jangan ke folder proyek:**
  - Antigravity, file `~/.gemini/config/mcp_config.json`:
    ```json
    { "mcpServers": { "octobuild": { "serverUrl": "https://app.octobuild.site/mcp", "headers": { "Authorization": "Bearer bldr_KUNCI_KAMU" } } } }
    ```
  - Claude, satu perintah di terminal: `claude mcp add --transport http --scope user octobuild https://app.octobuild.site/mcp --header "Authorization: Bearer bldr_KUNCI_KAMU"`
  - Codex, file `~/.codex/config.toml`:
    ```toml
    [mcp_servers.octobuild]
    url = "https://app.octobuild.site/mcp"
    http_headers = { Authorization = "Bearer bldr_KUNCI_KAMU" }
    ```

## 2. Siapkan koleksi data

1. `collections_list` untuk melihat yang sudah ada. Pakai ulang kalau cocok.
2. Kalau belum ada: `collection_create`, lalu `field_add` untuk tiap kolom di PLAN.md (nama kolom Bahasa Indonesia, tipe yang sesuai: teks, angka, tanggal, pilihan).
3. Uji dengan `record_create` satu data contoh, baca lagi dengan `records_query`, lalu tunjukkan ke user.
4. Penghapusan dan publish menunggu persetujuan user di dashboard OctoBuild. Kalau tool menjawab "menunggu persetujuan", minta user menyetujui di dashboard, lalu cek dengan `approval_status`.

## 3. Kirim data dari tool lewat webhook masuk

### Buat endpoint

1. User membuka dashboard OctoBuild → Integrasi → Webhook → buat endpoint baru (verifikasi: HMAC).
2. User menyalin **URL** endpoint dan **secret** `whsec_...` (secret hanya tampil sekali).
3. Payload webhook tidak otomatis menjadi data. Buat otomasi dengan pemicu webhook endpoint tersebut yang memetakan `$payload` ke langkah `create_record` (atau `update_record`) di koleksi tujuan: `automation_create`, lalu uji dengan `automation_dry_run` memakai contoh payload. Kalau pemicu webhook belum bisa dibuat lewat MCP, minta user membuat otomasinya di dashboard (Otomasi) dengan contoh payload darimu.

### Kirim dari tool

Kirim `POST` dengan body JSON dan header `x-webhook-signature: sha256=<hex>`, yaitu HMAC-SHA256 dari **body mentah persis seperti dikirim**, dengan secret `whsec_...` (seluruh teksnya) sebagai kunci.

Ekstensi Chrome atau browser (Web Crypto, tanpa library):

```js
async function kirimKeOctoBuild(url, secret, data) {
  const body = JSON.stringify(data);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(body)));
  const hex = Array.from(sig, (b) => b.toString(16).padStart(2, '0')).join('');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-webhook-signature': `sha256=${hex}` },
    body,
  });
  if (!res.ok) throw new Error(`OctoBuild menolak data (${res.status})`);
}
```

Node (skrip jadwal):

```js
import { createHmac } from 'node:crypto';
const body = JSON.stringify(data);
const sig = createHmac('sha256', process.env.OCTO_WEBHOOK_SECRET).update(body).digest('hex');
const res = await fetch(process.env.OCTO_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-webhook-signature': `sha256=${sig}` },
  body,
});
```

Arti jawaban: `200` tersimpan · `401` signature salah atau secret sudah diganti · `404` URL salah · `413` data terlalu besar (kirim per bagian) · `415` bukan JSON · `429` terlalu sering (beri jeda) · `503` coba lagi nanti.

### Di mana menyimpan URL dan secret

- **Ekstensi:** halaman Pengaturan ekstensi menyimpan ke `chrome.storage.local`. Jangan ditulis di kode.
- **Skrip:** variabel lingkungan atau file `.env` yang masuk `.gitignore`.
- Secret webhook hanya bisa mengirim ke satu endpoint, jadi lebih aman daripada kunci API. **Kunci `bldr_...` tidak boleh ada di ekstensi, dashboard, atau halaman web mana pun.**
- Kalau secret bocor, user me-rotate di Integrasi → Webhook (secret lama langsung mati) dan memperbarui pengaturan tool.

Tambahkan `https://hooks.octobuild.site/*` ke `host_permissions` di `manifest.json` ekstensi.

## 4. Dashboard sebagai halaman OctoBuild (opsional)

Kalau user ingin dashboard yang bisa dibuka dari mana saja dan langsung membaca koleksi OctoBuild:

1. `design_md_write` dengan isi `DESIGN.md` dari folder kerja.
2. `page_code_create` untuk halaman baru, `component_write` untuk komponen, lalu `page_code_write`. Data koleksi dibaca dan ditulis lewat penanda data halaman OctoBuild (list dan form), bukan lewat kunci. Kalau tool panduan seperti `guide_read` tersedia, baca panduan halaman React dulu.
3. `site_publish_check`, perbaiki semua temuannya, lalu `site_publish`. Publish menunggu persetujuan user di dashboard.
4. Berikan alamat hasilnya (`https://<slug>.octobuild.site`) ke user.

## 5. Laporkan

Tulis di README tool: koleksi yang dipakai, nama endpoint webhook (bukan secret-nya), otomasi yang dibuat, dan alamat halaman bila dipublish.
