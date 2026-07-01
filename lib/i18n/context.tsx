'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { translations, type Locale } from './translations'

type TranslationContext = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const Context = createContext<TranslationContext | null>(null)
const STORAGE_KEY = 'trw-locale'

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'fr') {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const t = useCallback(
    (key: string) => {
      const keys = key.split('.')
      let value: unknown = translations[locale]
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key
        }
      }
      return typeof value === 'string' ? value : key
    },
    [locale],
  )

  return (
    <Context value={{ locale, setLocale, t }}>
      {children}
    </Context>
  )
}

export function useTranslation() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useTranslation must be used within TranslationProvider')
  return ctx
}
