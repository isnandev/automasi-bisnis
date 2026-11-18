// Fungsi ini dijalankan DI DALAM halaman yang sedang dibuka saat tombol "Ambil data" ditekan.
// Harus berdiri sendiri: tidak boleh memakai import atau variabel dari luar fungsi.
// Kembalikan array objek { nama, harga, url }.
//
// Template ini membaca data terstruktur (JSON-LD schema.org) yang dipakai banyak toko online.
// Untuk halaman tertentu (misalnya hasil pencarian marketplace), minta agent membuka halamannya,
// memeriksa elemennya, lalu mengganti bagian "Cadangan" dengan selector yang cocok.
export function ambilData() {
  const angka = (v) => Number(String(v ?? '').replace(/[^\d]/g, '')) || 0
  const hasil = []

  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    let json
    try {
      json = JSON.parse(script.textContent)
    } catch {
      continue
    }
    const nodes = [json].flat().flatMap((n) => n?.['@graph'] ?? n)
    for (const node of nodes) {
      const produk = node?.['@type'] === 'ItemList' ? (node.itemListElement ?? []).map((i) => i.item ?? i) : [node]
      for (const p of produk) {
        if (p?.['@type'] !== 'Product') continue
        const offer = [p.offers].flat()[0] ?? {}
        hasil.push({ nama: String(p.name ?? '').trim(), harga: angka(offer.price ?? offer.lowPrice), url: p.url ?? location.href })
      }
    }
  }
  if (hasil.length) return hasil

  // Cadangan: judul halaman dan harga "Rp" pertama yang terlihat.
  const harga = document.body.innerText.match(/Rp\s?[\d.]+/)
  return [{ nama: document.title.trim(), harga: harga ? angka(harga[0]) : 0, url: location.href }]
}
