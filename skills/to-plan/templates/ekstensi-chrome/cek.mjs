// Cek cepat pembaca data: node cek.mjs
import assert from 'node:assert/strict'

const ldJson = (obj) => ({ textContent: JSON.stringify(obj) })
const halaman = (scripts, teks = '', judul = 'Halaman') => {
  globalThis.document = { querySelectorAll: () => scripts, body: { innerText: teks }, title: judul }
  globalThis.location = { href: 'https://toko.test/produk' }
}
const { ambilData } = await import('./ambil-data.js')

halaman([ldJson({ '@type': 'Product', name: 'Kaos Hitam', offers: { price: '59000' } }), { textContent: '{rusak' }])
assert.deepEqual(ambilData(), [{ nama: 'Kaos Hitam', harga: 59000, url: 'https://toko.test/produk' }])

halaman([ldJson({ '@graph': [{ '@type': 'ItemList', itemListElement: [{ item: { '@type': 'Product', name: 'A', url: 'https://t/a', offers: [{ lowPrice: 1000 }] } }] }] })])
assert.deepEqual(ambilData(), [{ nama: 'A', harga: 1000, url: 'https://t/a' }])

halaman([], 'Harga spesial Rp 1.250.000 hari ini', ' Topi ')
assert.deepEqual(ambilData(), [{ nama: 'Topi', harga: 1250000, url: 'https://toko.test/produk' }])
console.log('ambil-data ok')
