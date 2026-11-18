// Format angka, Rupiah dan tanggal sesuai DESIGN.md (id-ID).
const rupiahFmt = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const angkaFmt = new Intl.NumberFormat('id-ID')
const tanggalFmt = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

export const rupiah = (n: number) => rupiahFmt.format(n)
export const angka = (n: number) => angkaFmt.format(n)
export const tanggal = (d: Date | string | number) => tanggalFmt.format(new Date(d))
