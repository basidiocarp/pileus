import { useEffect, useState } from 'react'

const STORAGE_KEY = 'bc-stickers'
export const STAMP_EVENT = 'bc-stamp-update'

export function readStamps(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function useStamp(pageKey: string): Record<string, number> {
  const [stamps, setStamps] = useState<Record<string, number>>(readStamps)

  useEffect(() => {
    const current = readStamps()
    if (!current[pageKey]) {
      const next = { ...current, [pageKey]: Date.now() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      window.dispatchEvent(new CustomEvent(STAMP_EVENT))
      setStamps(next)
    }
  }, [pageKey])

  return stamps
}

export function useReadStamps(): Record<string, number> {
  const [stamps, setStamps] = useState<Record<string, number>>(readStamps)
  useEffect(() => {
    const handler = () => setStamps(readStamps())
    window.addEventListener(STAMP_EVENT, handler)
    return () => window.removeEventListener(STAMP_EVENT, handler)
  }, [])
  return stamps
}

export function useStampCount(): number {
  const [count, setCount] = useState(() => Object.keys(readStamps()).length)

  useEffect(() => {
    const handler = () => setCount(Object.keys(readStamps()).length)
    window.addEventListener(STAMP_EVENT, handler)
    return () => window.removeEventListener(STAMP_EVENT, handler)
  }, [])

  return count
}
