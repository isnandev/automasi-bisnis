---
version: "1.0"
name: "Soft Studio"
description: "Design system untuk tool bisnis pribadi: permukaan putih lembut dan abu kabut, tinta hitam mengilap, tinta sekunder arang, dan satu aksen oranye neon. Ramah, futuristik, premium, minimal dan lembut. Bahasa antarmuka default: Bahasa Indonesia."
colors:
  primary: "#FF8A1F"
  on-primary: "#111216"
  primary-text: "#A3500B"
  secondary: "#111216"
  on-secondary: "#F1F1F4"
  tertiary: "#4A4D55"
  neutral: "#F1F1F4"
  mist: "#D8DCE6"
  background: "#F1F1F4"
  surface: "#FFFFFF"
  surface-hover: "#F1F1F4"
  surface-selected: "#E6E8EE"
  text-primary: "#111216"
  text-secondary: "#4A4D55"
  text-disabled: "#8A8E98"
  border: "#D8DCE6"
  success: "#15803D"
  danger: "#DC2626"
  dark-background: "#111216"
  dark-surface: "#1A1B20"
  dark-surface-raised: "#22242A"
  dark-surface-selected: "#2A2C33"
  dark-border: "#2E3038"
  dark-text-primary: "#F1F1F4"
  dark-text-secondary: "#9A9EA8"
  dark-primary-text: "#FF9F45"
  dark-success: "#22C55E"
  dark-danger: "#F87171"
  chart-1: "#E06A00"
  chart-2: "#2A78D6"
  chart-3: "#1BAF7A"
  chart-4: "#4A3AA7"
  chart-5: "#008300"
  chart-6: "#E87BA4"
  dark-chart-1: "#E06A00"
  dark-chart-2: "#3987E5"
  dark-chart-3: "#199E70"
  dark-chart-4: "#9085E9"
  dark-chart-5: "#008300"
  dark-chart-6: "#D55181"
  chart-comparison: "#8A8E98"
typography:
  display-lg: { fontFamily: "Inter", fontSize: "48px", fontWeight: 800, lineHeight: "52px", letterSpacing: "-0.04em" }
  headline-md: { fontFamily: "Inter", fontSize: "24px", fontWeight: 700, lineHeight: "32px", letterSpacing: "-0.02em" }
  title-md: { fontFamily: "Inter", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }
  body-md: { fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: "22px" }
  body-sm: { fontFamily: "Inter", fontSize: "13px", fontWeight: 400, lineHeight: "20px" }
  label-sm: { fontFamily: "Inter", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }
  numeric-lg: { fontFamily: "Inter", fontSize: "20px", fontWeight: 600, lineHeight: "28px" }
  section-index: { fontFamily: "Inter", fontSize: "14px", fontWeight: 700, lineHeight: "20px" }
rounded: { sm: "6px", md: "8px", lg: "12px", xl: "16px", 2xl: "24px", full: "9999px" }
spacing: { base: "4px", xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", 2xl: "32px", 3xl: "48px", gap: "16px", card-padding: "16px", section-padding: "24px" }
components:
  button-primary: { backgroundColor: "{colors.primary}", textColor: "{colors.on-primary}", typography: "{typography.body-sm}", rounded: "{rounded.md}", height: "32px", padding: "0 14px" }
  button-secondary: { backgroundColor: "{colors.secondary}", textColor: "{colors.on-secondary}", typography: "{typography.body-sm}", rounded: "{rounded.md}", height: "32px", padding: "0 14px" }
  button-outline: { backgroundColor: "{colors.surface}", textColor: "{colors.text-primary}", typography: "{typography.body-sm}", rounded: "{rounded.md}", height: "32px", padding: "0 12px" }
  card: { backgroundColor: "{colors.surface}", textColor: "{colors.text-primary}", rounded: "{rounded.lg}", padding: "16px" }
  chip: { backgroundColor: "{colors.surface-hover}", textColor: "{colors.text-secondary}", typography: "{typography.label-sm}", rounded: "{rounded.sm}", height: "24px", padding: "0 8px" }
  nav-item-active: { backgroundColor: "{colors.surface-selected}", textColor: "{colors.text-primary}", typography: "{typography.body-sm}", rounded: "{rounded.md}", height: "30px" }
  input: { backgroundColor: "{colors.surface}", textColor: "{colors.text-primary}", typography: "{typography.body-sm}", rounded: "{rounded.md}", height: "32px", padding: "0 10px" }
---

## Overview

Lima kualitas: **ramah, futuristik, premium, minimal dan lembut**. Di antarmuka artinya:

- **Ramah dan lembut.** Sudut membulat, jarak lega, palet terang yang tenang.
- **Futuristik.** Tinta hitam mengilap dan satu aksen oranye neon yang terasa seperti lampu menyala, dipakai hemat.
- **Premium dan minimal.** Sedikit warna, garis tipis, bayangan halus, tanpa hiasan. Konten yang membawa layar, bukan dekorasi.

Komposisi: grid terbatas dengan sidebar tetap dan panel utama yang menjorok (inset). Kartu datar dengan border tipis. Section boleh diberi nomor dengan indeks oranye ("01 | Ringkasan").

## Colors

Lima warna inti adalah seluruh palet. Nilai lain hanya turunan atau status semantik.

| Nama          | Hex       | Peran                                                              |
| ------------- | --------- | ------------------------------------------------------------------ |
| Soft White    | `#F1F1F4` | Latar app, sidebar, isi hover                                      |
| Mist Gray     | `#D8DCE6` | Border, pemisah, outline, track tidak aktif                        |
| Gloss Black   | `#111216` | Teks utama, tombol sekunder, latar tema gelap                      |
| Charcoal Gray | `#4A4D55` | Teks dan ikon sekunder                                             |
| Neon Orange   | `#FF8A1F` | Satu-satunya aksen: tombol utama, focus ring, indikator aktif, titik perhatian |

Turunan:

| Nama              | Hex       | Kenapa ada                                                                 |
| ----------------- | --------- | -------------------------------------------------------------------------- |
| White             | `#FFFFFF` | Permukaan kartu dan panel utama                                            |
| Ember             | `#A3500B` | Teks oranye di permukaan terang (Neon Orange gagal kontras). 5.7:1 di putih |
| Selected          | `#E6E8EE` | Pill navigasi aktif dan baris terpilih (terang)                            |
| Disabled text     | `#8A8E98` | Placeholder dan teks nonaktif saja (3.3:1, jangan untuk teks penting)      |

Aturan:

- **Neon Orange tidak pernah jadi teks di permukaan terang** (2.4:1 di putih). Pakai Ember. Di permukaan gelap Neon Orange 7.3:1 dan boleh jadi teks.
- Teks di atas isi Neon Orange selalu Gloss Black (7.9:1), tidak pernah putih.
- Dalam satu tampilan hanya satu elemen oranye yang dominan, biasanya aksi utama. Sisanya abu-abu.
- Sukses dan bahaya adalah status, bukan warna brand. Selalu tampil bersama ikon atau tanda (+/−), tidak pernah warna saja.

### Tema

| Token               | Terang                                          | Gelap                         |
| ------------------- | ----------------------------------------------- | ----------------------------- |
| Latar, sidebar      | `#F1F1F4`                                       | `#111216`                     |
| Panel utama, kartu  | `#FFFFFF`                                       | `#1A1B20`                     |
| Raised (popover)    | `#FFFFFF`                                       | `#22242A`                     |
| Hover               | `#F1F1F4`                                       | `#22242A`                     |
| Selected            | `#E6E8EE`                                       | `#2A2C33`                     |
| Border              | `#D8DCE6`                                       | `#2E3038`                     |
| Teks utama          | `#111216` (18.2:1 di putih)                     | `#F1F1F4` (16.6:1)            |
| Teks sekunder       | `#4A4D55` (8.5:1 di putih)                      | `#9A9EA8` (6.4:1 di kartu)    |
| Tombol utama        | `#FF8A1F` dengan teks `#111216`                 | sama                          |
| Tombol sekunder     | `#111216` dengan teks `#F1F1F4`                 | `#F1F1F4` dengan teks `#111216` |
| Teks oranye         | `#A3500B` Ember                                 | `#FF9F45` (8.4:1)             |
| Teks sukses         | `#15803D` (5.0:1)                               | `#22C55E` (7.5:1)             |
| Teks bahaya         | `#DC2626` (4.8:1)                               | `#F87171` (6.2:1)             |
| Focus ring          | `#FF8A1F`, 2px, offset 2px                      | sama                          |

Mode gelap adalah palet pilihan, bukan inversi otomatis.

### Visualisasi data

Divalidasi terhadap permukaan kartu `#FFFFFF` dan `#1A1B20` (OKLab ΔE dan simulasi buta warna). Slot 1 adalah **Signal Orange `#E06A00`**, hue brand yang diturunkan supaya masuk pita terang chart.

| Slot | Hue           | Terang    | Gelap     |
| ---- | ------------- | --------- | --------- |
| 1    | Signal Orange | `#E06A00` | `#E06A00` |
| 2    | Blue          | `#2A78D6` | `#3987E5` |
| 3    | Aqua          | `#1BAF7A` | `#199E70` |
| 4    | Violet        | `#4A3AA7` | `#9085E9` |
| 5    | Green         | `#008300` | `#008300` |
| 6    | Magenta       | `#E87BA4` | `#D55181` |

- Slot dipakai dengan urutan tetap dan tidak diputar. Warna mengikuti entitas, bukan peringkat. Lebih dari enam seri dilipat jadi "Lainnya". Scatter maksimal tiga seri.
- Di mode terang Aqua (2.8:1) dan Magenta (2.7:1) di bawah 3:1, jadi chart yang memakainya diberi label langsung atau tampilan tabel.
- Seri pembanding (periode lalu) bukan kategori: garis putus-putus 1.5px `#8A8E98` di kedua mode.
- Skala berurutan memakai satu hue: ramp oranye terang ke gelap.
- Warna status (baik, waspada, serius, kritis) hanya untuk status dan selalu dengan ikon dan label. Teks sumbu, label dan nilai memakai token teks, bukan warna seri.
- Mark tipis: garis 2px, ujung data membulat 4px, celah 2px antar batang. Setiap chart punya tooltip hover, dan legenda bila ada dua seri atau lebih.

## Typography

**Inter** (variable) dipakai di semua tempat. Bobot 400, 500, 600, 700 dan 800. Ambil dari Google Fonts atau paket `@fontsource-variable/inter`.

| Style           | Ukuran / tinggi baris | Bobot | Pemakaian                                                       |
| --------------- | --------------------- | ----- | --------------------------------------------------------------- |
| `display-lg`    | 48 / 52, −0.04em      | 800   | Judul besar, halaman sambutan                                   |
| `headline-md`   | 24 / 32, −0.02em      | 700   | Judul empty state dan onboarding                                |
| `title-md`      | 16 / 24               | 600   | Judul halaman, judul dialog                                     |
| `body-md`       | 14 / 22               | 400   | Teks isi, form                                                  |
| `body-sm`       | 13 / 20               | 400   | Kerangka dashboard: navigasi, tombol, tabel, judul kartu        |
| `label-sm`      | 12 / 16               | 500   | Label section, chip, badge, label sumbu                         |
| `numeric-lg`    | 20 / 28               | 600   | Nilai KPI. Kolom tabel dan tick sumbu pakai `tabular-nums`      |
| `section-index` | 14 / 20               | 700   | Indeks oranye "01 \|" sebelum judul section (Ember di terang)   |

Kata Bahasa Indonesia panjang, jadi label harus bisa wrap atau terpotong dengan tooltip, tidak boleh dipaksa sempit.

## Layout

- Grid dasar 4px. Langkah umum: 8, 12, 16, 24, 32 dan 48.
- Sidebar 240px (52px saat diciutkan jadi ikon). Panel utama menjorok dengan celah 12px dan radius 12px di tema terang.
- Padding halaman 24px (16px di bawah 768px). Grid kartu bercelah 16px.
- Lebar konten dibatasi. Maksimal 12 kolom: baris KPI isi 4, baris chart 2:1, baris bawah isi 3.
- Breakpoint 640, 768, 1024, 1280 dan 1536. Di bawah 768px sidebar menjadi navigasi atas atau side sheet.
- Di bawah 768px dialog dan sheet menjadi bottom drawer. Pengecualian: navigasi utama boleh tetap side sheet.

## Elevation & Depth

Kedalaman mengikuti "pencahayaan studio lembut": bersih dan menyebar, tidak keras.

- **Kartu:** datar dengan border 1px (`#D8DCE6` terang, `#2E3038` gelap), tanpa bayangan.
- **Elemen melayang** (popover, menu, command palette): terang `0 8px 30px rgb(17 18 22 / 0.08)`; gelap `0 8px 30px rgb(0 0 0 / 0.5)` plus border.
- **Dialog:** terang `0 24px 60px -12px rgb(17 18 22 / 0.18)`.
- **Glass:** header sticky memakai `backdrop-filter: blur(12px)` di atas permukaan 72%.
- **Glow:** glow Neon Orange (`0 0 0 3px rgb(255 138 31 / 0.25)`) khusus untuk fokus dan status "live" (proses berjalan). Tidak pernah dekorasi.

## Shapes

- Radius 6 (chip, badge), 8 (tombol, input, item navigasi), 12 (kartu, panel), 16 (dialog, banner), 24 (kartu marketing). Pill dan avatar bulat penuh.
- Bentuk membulat dan empuk. Tidak ada sudut tajam di UI produk.
- Tile tool adalah squircle 18px dengan gradien lembut dua titik: oranye `#FFB36B→#FF8A1F`, arang `#6B6F78→#4A4D55`, kabut `#E6E8EE→#C9CEDA` atau hitam `#2A2C33→#111216`.

## Components

Komponen dashboard memakai shadcn/ui (new-york, Tailwind v4, Radix) yang diberi tema token di atas. Ekstensi Chrome memakai CSS biasa dengan token yang sama.

- **Tombol utama:** Neon Orange dengan teks Gloss Black, tinggi 32px, radius 8. Satu per tampilan ("Simpan", "Kirim").
- **Tombol sekunder:** Gloss Black dengan teks Soft White (terbalik di gelap).
- **Tombol outline dan ghost:** untuk semua yang lain.
- **Kartu:** permukaan putih, border 1px Mist Gray, radius 12, padding 16. Judul kartu `body-sm` warna teks sekunder dengan ikon 14px.
- **Navigasi:** baris 30px dengan ikon 16px. Item aktif mendapat isi selected. Tanpa garis tepi kiri atau bar aksen.
- **Badge:** `label-sm`, radius 6. "Terhubung" memakai tint sukses dengan teks sukses. "Data contoh" memakai Mist Gray dengan teks sekunder. "Baru" memakai outline Ember.
- **Titik perhatian:** titik 6px Neon Orange untuk item yang perlu tindakan ("Perlu tindakan").
- **Input:** tinggi 32px, border 1px, focus ring Neon Orange.
- **Tabel:** baris 40px, pemisah tipis, header sticky, angka rata kanan dengan `tabular-nums`.
- **Empty, loading, error, sukses:** ikon lucide besar di lingkaran Soft White, satu kalimat, satu aksi.

### Iconography

Ikon dari `lucide-react` (atau SVG lucide di ekstensi): garis 1.5px, ujung membulat, 16px di navigasi dan tombol, 14px di judul kartu, warna teks sekunder. Ikon terisi tidak dipakai kecuali tile tool dan status.

## Motion

Gerak terkendali, dipimpin antarmuka, dan menjelaskan perubahan. Lembut, cepat, tidak menghalangi.

- **Library:** CSS transition lebih dulu. `motion` (`motion/react`) hanya untuk koreografi yang tidak bisa dengan CSS.
- **Durasi:** 150ms (feedback), 220ms (masuk), 350ms (perpindahan besar), 700ms (chart menggambar). Interaksi tidak lebih dari 250ms.
- **Easing:** standar `cubic-bezier(0.2, 0.8, 0.2, 1)`, keluar `cubic-bezier(0.23, 1, 0.32, 1)`. Jangan pernah `ease-in` di UI.
- **Spring:** snappy (stiffness 520, damping 40) untuk indikator, gentle (260, 30) untuk panel.
- **Reduced motion:** `prefers-reduced-motion` mengubah gerak jadi perubahan instan dan menyisakan fade pendek.

## Content & language

- **Bahasa default: Bahasa Indonesia** (`id-ID`).
- **Suara:** ramah, jelas, pendek. Pembaca disapa **"kamu"**. Kalimat aktif, tanpa jargon, tanpa tanda seru di pesan error.
- **Format** lewat `Intl` dengan `id-ID`:

  | Jenis         | Contoh            |
  | ------------- | ----------------- |
  | Angka         | `1.240`, `12,5%`  |
  | Mata uang     | `Rp 168.920`      |
  | Tanggal       | `12 Okt 2026`     |
  | Jam           | `14.30` (24 jam)  |
  | Waktu relatif | `22 menit lalu`   |
  | Minggu        | Mulai Senin       |

- **Pesan error:** sebut apa yang terjadi dan apa yang harus dilakukan, dalam satu atau dua kalimat. Contoh: "Data gagal dikirim karena koneksi terputus. Coba kirim lagi."

## Do's and Don'ts

### Do

- Batasi palet pada lima warna inti, turunannya yang tercatat, dan status semantik.
- Pakai Neon Orange untuk satu aksi atau status terpenting di tiap tampilan.
- Pakai Ember untuk teks oranye di permukaan terang.
- Jaga jarak di grid 4px dan sudut di keluarga radius.
- Tulis teks antarmuka dalam Bahasa Indonesia, format angka dan tanggal `id-ID`.

### Don't

- Jangan pakai Neon Orange sebagai teks isi di permukaan terang, atau teks putih di atasnya.
- Jangan menambah warna aksen di luar palet chart dan status semantik.
- Jangan animasi berulang untuk dekorasi, dan jangan lebih dari 250ms untuk feedback interaksi.
- Jangan mewarnai teks chart dengan warna seri, dan jangan pakai chart dua sumbu.
- Jangan pakai gradien ungu, emoji sebagai ikon, atau kartu bertumpuk bayangan tebal (ciri "AI slop").
