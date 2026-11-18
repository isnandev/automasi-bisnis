import { useEffect, useState } from 'react'

// Data tersimpan di browser ini saja. Ekspor CSV berkala sebagai cadangan.
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ponytail: penyimpanan penuh atau diblokir; data tetap ada di layar sampai halaman ditutup.
    }
  }, [key, value])
  return [value, setValue] as const
}
