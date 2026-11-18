# Automasi Bisnis

Plugin untuk Antigravity, Claude (Desktop dan Code) dan Codex. Membantu kamu menemukan pekerjaan yang bisa diotomasi dengan AI, lalu membuat tool bisnis pribadi (dashboard, jadwal otomatis, ekstensi Chrome) yang bisa disambungkan ke OctoBuild.

## Isi

| Skill | Fungsi |
| --- | --- |
| `starter` | Cek kesiapan komputer dan tawarkan langkah pertama |
| `analisa-pekerjaanku` | Wawancara pekerjaanmu, beri skor peluang otomasi, pilih tool yang mau dibuat |
| `to-plan` | Ubah pilihan menjadi PLAN.md + siapkan template dashboard / ekstensi + DESIGN.md |
| `perbaiki` | Cari akar masalah dan perbaiki tool yang error |
| `octo-connect` | Sambungkan agent dan tool ke OctoBuild (MCP + webhook masuk) |
| `yagni-principle` | Jaga tool tetap sederhana |
| `antislop` | Cegah desain generik "AI slop" |
| `shadcn` | Komponen shadcn/ui untuk dashboard |
| `vercel-react-best-practices` | Praktik terbaik React |
| `modern-web-guidance` | Praktik terbaik HTML, CSS, dan JavaScript modern |

Plugin juga mendaftarkan server MCP **OctoBuild** (`https://app.octobuild.site/mcp`). Login lewat OAuth saat pertama dipakai; tidak ada token di plugin ini.

## Pasang

### Antigravity

Di terminal (PowerShell / Terminal):

```bash
agy plugin install https://github.com/isnandev/automasi-bisnis
```

Belum punya perintah `agy`? Pasang dulu Antigravity CLI: `irm https://antigravity.google/cli/install.ps1 | iex` (Windows PowerShell). Atau unduh ZIP repo ini dan ekstrak ke `%USERPROFILE%\.gemini\config\plugins\automasi-bisnis` (macOS: `~/.gemini/config/plugins/automasi-bisnis`), lalu buka ulang Antigravity.

### Claude Desktop

**Customize → Plugins → Add → Add marketplace**, ketik `isnandev/automasi-bisnis`, lalu pasang plugin **automasi-bisnis**. Lewat terminal:

```bash
claude plugin marketplace add isnandev/automasi-bisnis
```

```bash
claude plugin install automasi-bisnis@automasi-bisnis
```

### Codex (aplikasi ChatGPT desktop / Codex CLI)

```bash
codex plugin marketplace add isnandev/automasi-bisnis
```

```bash
codex plugin add automasi-bisnis@automasi-bisnis
```

Lalu buka tab **Plugins** di aplikasi dan mulai percakapan baru.

## Mulai

Buka folder kerja baru di harness, lalu ketik: **mulai**.

## Lisensi pihak ketiga

Lihat [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
