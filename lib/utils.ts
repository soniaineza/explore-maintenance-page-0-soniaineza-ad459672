import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const RWF_RATE = 1300

export function formatPrice(usd: number) {
  const rwf = Math.round(usd * RWF_RATE)
  const rwfFormatted = rwf.toLocaleString("en-RW")
  return {
    usd: usd.toLocaleString(),
    rwf: rwfFormatted,
  }
}

export function formatPriceShort(usd: number) {
  const rwf = Math.round(usd * RWF_RATE)
  if (rwf >= 1_000_000) {
    return `${(rwf / 1_000_000).toFixed(1)}M`
  }
  if (rwf >= 1_000) {
    return `${(rwf / 1_000).toFixed(0)}K`
  }
  return rwf.toString()
}
