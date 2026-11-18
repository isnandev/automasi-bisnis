import { ambilData } from './ambil-data.js'

const $ = (id) => document.getElementById(id)
const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const KOLOM_CSV = ['nama', 'harga', 'url', 'diambil']

const muat = async () => (await chrome.storage.local.get({ data: [] })).data
const simpan = (data) => chrome.storage.local.set({ data })

function status(teks, jenis = '') {
  $('status').textContent = teks
  $('status').className = `status ${jenis}`
}

async function tampilkan() {
  const data = await muat()
  const { webhookUrl, webhookSecret } = await chrome.storage.local.get(['webhookUrl', 'webhookSecret'])
  $('jumlah').textContent = data.length.toLocaleString('id-ID')
  $('daftar').replaceChildren(
    ...data
      .slice(-50)
      .reverse()
      .map((d) => {
        const tr = document.createElement('tr')
        const nama = Object.assign(document.createElement('td'), { className: 'nama', textContent: d.nama, title: d.nama })
        const harga = Object.assign(document.createElement('td'), { className: 'num', textContent: rupiah.format(d.harga) })
        tr.append(nama, harga)
        return tr
      }),
  )
  const siap = Boolean(webhookUrl && webhookSecret)
  $('unduh').disabled = $('hapus').disabled = !data.length
  $('kirim').disabled = !siap || !data.some((d) => !d.terkirim)
  $('kirim').title = siap ? '' : 'Isi URL dan secret webhook di Pengaturan dulu'
}

$('ambil').onclick = async () => {
  $('ambil').disabled = true
  status('Mengambil data…')
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const [{ result = [] } = {}] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: ambilData })
    const baru = result.filter((d) => d.nama).map((d) => ({ ...d, diambil: new Date().toISOString() }))
    await simpan([...(await muat()), ...baru])
    if (baru.length) status(`${baru.length} data diambil dari halaman ini.`, 'ok')
    else status('Tidak ada data yang dikenali di halaman ini.', 'error')
  } catch (e) {
    status(`Halaman ini tidak bisa dibaca (${e.message}). Coba di halaman produk atau hasil pencarian.`, 'error')
  } finally {
    $('ambil').disabled = false
    tampilkan()
  }
}

$('unduh').onclick = async () => {
  const sel = (v) => (/[";,\n\r]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v)
  const baris = (await muat()).map((d) => KOLOM_CSV.map((k) => sel(String(d[k] ?? ''))).join(';'))
  // CSV untuk Excel Indonesia: pemisah titik koma, UTF-8 dengan BOM.
  const csv = '﻿' + [KOLOM_CSV.join(';'), ...baris].join('\r\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  Object.assign(document.createElement('a'), { href: url, download: `data-${new Date().toISOString().slice(0, 10)}.csv` }).click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

$('kirim').onclick = async () => {
  const { webhookUrl, webhookSecret } = await chrome.storage.local.get(['webhookUrl', 'webhookSecret'])
  const data = await muat()
  const belum = data.filter((d) => !d.terkirim)
  $('kirim').disabled = true
  let terkirim = 0
  try {
    for (const d of belum) {
      status(`Mengirim ${terkirim + 1} dari ${belum.length}…`)
      await kirimKeOctoBuild(webhookUrl, webhookSecret, { nama: d.nama, harga: d.harga, url: d.url, diambil: d.diambil })
      d.terkirim = true
      terkirim++
      await simpan(data) // simpan progres, supaya kirim ulang tidak menggandakan data
    }
    status(`${terkirim} data terkirim ke OctoBuild.`, 'ok')
  } catch (e) {
    status(`${terkirim} terkirim, sisanya gagal: ${e.message}. Tekan kirim lagi; yang sudah terkirim tidak dikirim ulang.`, 'error')
  } finally {
    tampilkan()
  }
}

$('hapus').onclick = async () => {
  if (!confirm('Hapus semua data tersimpan di ekstensi ini? Data yang dihapus tidak bisa dikembalikan.')) return
  await simpan([])
  status('Semua data dihapus.')
  tampilkan()
}

$('pengaturan').onclick = () => chrome.runtime.openOptionsPage()

// Webhook masuk OctoBuild: header x-webhook-signature = HMAC-SHA256(body, secret) dalam hex.
async function kirimKeOctoBuild(url, secret, isi) {
  const body = JSON.stringify(isi)
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(body)))
  const hex = Array.from(sig, (b) => b.toString(16).padStart(2, '0')).join('')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-webhook-signature': `sha256=${hex}` },
    body,
  })
  if (res.status === 401) throw new Error('secret tidak cocok, cek Pengaturan')
  if (res.status === 429) throw new Error('terlalu sering, tunggu sebentar')
  if (!res.ok) throw new Error(`OctoBuild menjawab ${res.status}`)
}

tampilkan()
