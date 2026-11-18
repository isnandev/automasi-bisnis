import { useRef, useState, type FormEvent } from 'react'
import { AlertTriangle, CalendarClock, Download, Package, PackageOpen, Trash2, Upload, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { downloadCsv, parseCsv, toCsv } from '@/lib/csv'
import { angka, rupiah, tanggal } from '@/lib/format'
import { useLocalStorage } from '@/lib/use-local-storage'

// Template: ganti tipe, kolom dan teks di bawah sesuai PLAN.md.
type Produk = { id: string; nama: string; harga: number; stok: number; diperbarui: string }

const KOLOM_CSV = ['nama', 'harga', 'stok']
const BATAS_STOK_MENIPIS = 5
const CONTOH: Omit<Produk, 'id' | 'diperbarui'>[] = [
  { nama: 'Kaos Polos Hitam L', harga: 59000, stok: 24 },
  { nama: 'Kaos Polos Putih M', harga: 59000, stok: 3 },
  { nama: 'Hoodie Abu XL', harga: 179000, stok: 8 },
]

const baru = (p: Omit<Produk, 'id' | 'diperbarui'>): Produk => ({
  ...p,
  id: crypto.randomUUID(),
  diperbarui: new Date().toISOString(),
})

export default function App() {
  const [produk, setProduk] = useLocalStorage<Produk[]>('produk', [])
  const [status, setStatus] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const nilaiStok = produk.reduce((total, p) => total + p.harga * p.stok, 0)
  const menipis = produk.filter((p) => p.stok <= BATAS_STOK_MENIPIS).length
  const terakhir = produk.reduce((t, p) => (p.diperbarui > t ? p.diperbarui : t), '')

  function tambah(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const nama = String(data.get('nama')).trim()
    setProduk((list) => [baru({ nama, harga: Number(data.get('harga')), stok: Number(data.get('stok')) }), ...list])
    setStatus(`${nama} disimpan.`)
    form.reset()
    form.querySelector('input')?.focus()
  }

  function hapus(p: Produk) {
    if (!confirm(`Hapus ${p.nama}? Data yang dihapus tidak bisa dikembalikan.`)) return
    setProduk((list) => list.filter((x) => x.id !== p.id))
    setStatus(`${p.nama} dihapus.`)
  }

  function ekspor() {
    const rows = produk.map((p) => ({ nama: p.nama, harga: String(p.harga), stok: String(p.stok) }))
    downloadCsv(`produk-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(rows, KOLOM_CSV))
  }

  async function impor(file: File) {
    const rows = parseCsv(await file.text())
    const valid = rows
      .map((r) => ({ nama: r.nama ?? '', harga: Number(r.harga), stok: Number(r.stok) }))
      .filter((r) => r.nama && Number.isFinite(r.harga) && Number.isFinite(r.stok))
    setProduk((list) => [...valid.map(baru), ...list])
    const dilewati = rows.length - valid.length
    setStatus(
      `${angka(valid.length)} data diimpor` +
        (dilewati ? `, ${angka(dilewati)} baris dilewati karena kolom nama, harga atau stok kosong.` : '.'),
    )
  }

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex items-center justify-between gap-2 px-4 py-3 md:flex-col md:items-stretch md:justify-start md:gap-6 md:px-3 md:py-5">
        <div className="flex items-center gap-2 px-2">
          <span className="grid size-7 place-items-center rounded-md bg-secondary text-secondary-foreground">
            <Package className="size-4" aria-hidden />
          </span>
          <span className="text-[13px] font-semibold">Dashboard Toko</span>
        </div>
        <nav aria-label="Navigasi utama">
          <a
            href="#"
            aria-current="page"
            className="flex h-[30px] items-center gap-2 rounded-md bg-selected px-2 text-[13px] text-foreground"
          >
            <PackageOpen className="size-4 text-muted-foreground" aria-hidden />
            Produk
          </a>
        </nav>
      </aside>

      <main className="space-y-4 bg-card p-4 md:my-3 md:mr-3 md:rounded-lg md:border md:p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-semibold">Produk</h1>
            <p className="text-[13px] text-muted-foreground">
              Data tersimpan di browser ini. Ekspor CSV berkala sebagai cadangan.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              tabIndex={-1}
              aria-hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) impor(file)
                e.target.value = ''
              }}
            />
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <Upload aria-hidden /> Impor CSV
            </Button>
            <Button variant="outline" size="sm" onClick={ekspor} disabled={!produk.length}>
              <Download aria-hidden /> Ekspor CSV
            </Button>
          </div>
        </header>

        <section aria-label="Ringkasan" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi ikon={Package} judul="Jumlah produk" nilai={angka(produk.length)} />
          <Kpi ikon={Wallet} judul="Nilai stok" nilai={rupiah(nilaiStok)} />
          <Kpi
            ikon={AlertTriangle}
            judul={`Stok ${BATAS_STOK_MENIPIS} atau kurang`}
            nilai={angka(menipis)}
            perhatian={menipis > 0}
          />
          <Kpi ikon={CalendarClock} judul="Terakhir diubah" nilai={terakhir ? tanggal(terakhir) : '–'} />
        </section>

        <Card className="gap-4 rounded-lg p-4 shadow-none">
          <h2 className="text-[13px] text-muted-foreground">Tambah produk</h2>
          <form onSubmit={tambah} className="grid items-end gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
            <div className="grid gap-1.5">
              <Label htmlFor="nama">Nama produk</Label>
              <Input id="nama" name="nama" required autoComplete="off" className="h-8" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="harga">Harga (Rp)</Label>
              <Input id="harga" name="harga" type="number" min={0} step={1} inputMode="numeric" required className="h-8" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="stok">Stok</Label>
              <Input id="stok" name="stok" type="number" min={0} step={1} inputMode="numeric" required className="h-8" />
            </div>
            <Button type="submit" size="sm">
              Simpan
            </Button>
          </form>
          <p role="status" aria-live="polite" className="min-h-5 text-[13px] text-muted-foreground">
            {status}
          </p>
        </Card>

        <Card className="gap-0 overflow-hidden rounded-lg py-0 shadow-none">
          {produk.length === 0 ? (
            <div className="grid place-items-center gap-3 px-4 py-12 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-muted">
                <PackageOpen className="size-6 text-muted-foreground" aria-hidden />
              </span>
              <p className="text-[13px] text-muted-foreground">
                Belum ada produk. Tambah lewat form di atas atau impor dari CSV.
              </p>
              <Button variant="outline" size="sm" onClick={() => setProduk(CONTOH.map(baru))}>
                Isi data contoh
              </Button>
            </div>
          ) : (
            <Table className="text-[13px]">
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="text-right">Stok</TableHead>
                  <TableHead>Diperbarui</TableHead>
                  <TableHead className="w-10">
                    <span className="sr-only">Aksi</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produk.map((p) => (
                  <TableRow key={p.id} className="h-10">
                    <TableCell className="max-w-64 truncate" title={p.nama}>
                      {p.nama}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{rupiah(p.harga)}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {p.stok <= BATAS_STOK_MENIPIS && (
                        <Badge variant="outline" className="mr-2 rounded-sm border-ember text-ember">
                          Menipis
                        </Badge>
                      )}
                      {angka(p.stok)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{tanggal(p.diperbarui)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm" onClick={() => hapus(p)} aria-label={`Hapus ${p.nama}`}>
                        <Trash2 aria-hidden />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </main>
    </div>
  )
}

function Kpi({
  ikon: Ikon,
  judul,
  nilai,
  perhatian = false,
}: {
  ikon: typeof Package
  judul: string
  nilai: string
  perhatian?: boolean
}) {
  return (
    <Card className="gap-2 rounded-lg p-4 shadow-none">
      <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
        <Ikon className="size-3.5" aria-hidden />
        {judul}
        {perhatian && <span className="ml-auto size-1.5 rounded-full bg-primary" role="img" aria-label="Perlu tindakan" />}
      </p>
      <p className="text-xl font-semibold tabular-nums">{nilai}</p>
    </Card>
  )
}
