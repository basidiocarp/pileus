import { useEffect, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'bc-stickers'
export const STAMP_EVENT = 'bc-stamp-update'

type StampMap = Record<string, number>
const EMPTY_STAMPS: StampMap = {}

function readStoredStamps(): StampMap {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!isStampMap(value)) return {}
    return value
  } catch {
    return {}
  }
}

function isStampMap(value: unknown): value is StampMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  return Object.entries(value).every(([key, timestamp]) => (
    typeof key === 'string'
    && typeof timestamp === 'number'
    && Number.isFinite(timestamp)
    && timestamp > 0
  ))
}

let stampSnapshot = readStoredStamps()

function getSnapshot() {
  return stampSnapshot
}

function getServerSnapshot() {
  return EMPTY_STAMPS
}

function syncSnapshotFromStorage() {
  stampSnapshot = readStoredStamps()
}

function subscribe(listener: () => void) {
  const handleStampUpdate = () => {
    syncSnapshotFromStorage()
    listener()
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      handleStampUpdate()
    }
  }

  window.addEventListener(STAMP_EVENT, handleStampUpdate)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(STAMP_EVENT, handleStampUpdate)
    window.removeEventListener('storage', handleStorage)
  }
}

function writeStamp(pageKey: string) {
  const current = stampSnapshot
  if (current[pageKey]) return

  const next = { ...current, [pageKey]: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  stampSnapshot = next
  window.dispatchEvent(new CustomEvent(STAMP_EVENT))
}

export function readStamps(): StampMap {
  syncSnapshotFromStorage()
  return stampSnapshot
}

function useStampsSnapshot(): StampMap {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useStamp(pageKey: string): StampMap {
  const stamps = useStampsSnapshot()

  useEffect(() => {
    writeStamp(pageKey)
  }, [pageKey])

  return stamps
}

export function useReadStamps(): StampMap {
  return useStampsSnapshot()
}

export function useStampCount(): number {
  return Object.keys(useStampsSnapshot()).length
}
