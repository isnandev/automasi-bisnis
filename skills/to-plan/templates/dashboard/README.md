# Dashboard (template)

React + Vite + Tailwind CSS v4 + shadcn/ui, memakai token dari `DESIGN.md`. Data tersimpan di browser (`localStorage`), dengan impor dan ekspor CSV.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`). Biarkan terminal tetap terbuka selama dashboard dipakai.

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan dashboard untuk dipakai sehari-hari |
| `npm run build` | Cek tipe dan membuat versi siap pakai di folder `dist/` |
| `npm run check` | Cek cepat logika CSV |
| `npx shadcn@latest add <komponen>` | Menambah komponen shadcn/ui (misalnya `select`, `tabs`, `chart`) |

## Struktur

| File | Isi |
| --- | --- |
| `src/App.tsx` | Halaman dashboard: ringkasan, form tambah, tabel. Ganti tipe `Produk` dan kolomnya sesuai PLAN.md. |
| `src/index.css` | Token warna, font, radius dari DESIGN.md (terang dan gelap). |
| `src/lib/format.ts` | Format Rupiah, angka, tanggal `id-ID`. |
| `src/lib/csv.ts` | Impor/ekspor CSV yang cocok dengan Excel Indonesia (pemisah `;`). |
| `src/lib/use-local-storage.ts` | Menyimpan data di browser. |
| `src/components/ui/` | Komponen shadcn/ui. |

## Catatan

- Data hanya ada di browser dan alamat yang sama. Ekspor CSV berkala sebagai cadangan.
- Butuh data yang bisa dibuka dari mana saja? Pakai OctoBuild (skill `octo-connect`).
