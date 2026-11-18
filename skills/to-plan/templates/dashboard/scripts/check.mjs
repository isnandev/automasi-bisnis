// Cek cepat logika CSV: npm run check
import assert from 'node:assert/strict'
import { parseCsv, toCsv } from '../src/lib/csv.ts'

const rows = [{ nama: 'Kaos "Polos"; Hitam', harga: '59000' }, { nama: 'Topi\nBaris dua', harga: '' }]
assert.deepEqual(parseCsv(toCsv(rows, ['nama', 'harga'])), rows)
assert.deepEqual(parseCsv('nama,harga\r\nA,1\r\n\r\nB,2\r\n'), [{ nama: 'A', harga: '1' }, { nama: 'B', harga: '2' }])
console.log('csv ok')
