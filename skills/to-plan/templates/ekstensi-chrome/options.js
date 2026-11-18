const form = document.getElementById('form')
const status = document.getElementById('status')

const isi = async () => {
  const { webhookUrl = '', webhookSecret = '' } = await chrome.storage.local.get(['webhookUrl', 'webhookSecret'])
  form.webhookUrl.value = webhookUrl
  form.webhookSecret.value = webhookSecret
}

form.onsubmit = async (e) => {
  e.preventDefault()
  await chrome.storage.local.set({
    webhookUrl: form.webhookUrl.value.trim(),
    webhookSecret: form.webhookSecret.value.trim(),
  })
  status.textContent = 'Tersimpan.'
  status.className = 'status ok'
}

document.getElementById('hapus').onclick = async () => {
  await chrome.storage.local.remove(['webhookUrl', 'webhookSecret'])
  await isi()
  status.textContent = 'Pengaturan dihapus.'
  status.className = 'status'
}

isi()
