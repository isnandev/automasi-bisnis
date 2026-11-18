// CSV untuk Excel Indonesia: pemisah titik koma, UTF-8 dengan BOM.
// Impor menerima pemisah ; atau , (dideteksi dari baris judul).

export type Row = Record<string, string>

export function toCsv(rows: Row[], columns: string[]): string {
  const cell = (v: string) => (/[";,\n\r]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v)
  const lines = [columns.map(cell).join(';'), ...rows.map((r) => columns.map((c) => cell(r[c] ?? '')).join(';'))]
  return '\uFEFF' + lines.join('\r\n')
}

export function parseCsv(text: string): Row[] {
  text = text.replace(/^\uFEFF/, '')
  const firstLine = text.split(/\r?\n/, 1)[0] ?? ''
  const sep = (firstLine.match(/;/g)?.length ?? 0) >= (firstLine.match(/,/g)?.length ?? 0) ? ';' : ','
  const table: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (ch === '"') quoted = false
      else field += ch
    } else if (ch === '"') quoted = true
    else if (ch === sep) { row.push(field); field = '' }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(field); table.push(row); row = []; field = ''
    } else field += ch
  }
  if (field !== '' || row.length) { row.push(field); table.push(row) }
  const [header = [], ...body] = table.filter((r) => r.some((c) => c.trim() !== ''))
  return body.map((r) => Object.fromEntries(header.map((h, j) => [h.trim(), (r[j] ?? '').trim()])))
}

export function downloadCsv(filename: string, csv: string) {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}
