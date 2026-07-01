"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Moon, Sun, X, Languages } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DancingGorilla } from "@/components/dancing-gorilla"
import { useTranslation } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/tours", key: "tours" },
  { href: "/destinations", key: "destinations" },
  { href: "/gallery", key: "gallery" },
  { href: "/faq", key: "faq" },
  { href: "/plan", key: "plan" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t, locale, setLocale } = useTranslation()

  function toggleLang() {
    setLocale(locale === 'en' ? 'fr' : 'en')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <DancingGorilla />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {t('site.name')}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                pathname.startsWith(link.href) && "text-primary",
              )}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={t('nav.theme')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          <button
            type="button"
            onClick={toggleLang}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground text-xs font-semibold"
            aria-label={t('nav.language')}
          >
            <Languages className="h-3.5 w-3.5 absolute opacity-0 scale-0 transition-all group-hover:opacity-100 group-hover:scale-100" />
            <span className="text-xs font-bold">{locale === 'en' ? 'FR' : 'EN'}</span>
          </button>
          <Button size="sm" render={<Link href="/plan" />}>
            {t('nav.startPlanning')}
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleLang}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground text-xs font-bold"
            aria-label={t('nav.language')}
          >
            {locale === 'en' ? 'FR' : 'EN'}
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
            aria-label={t('nav.theme')}
          >
            <Sun className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary",
                  pathname.startsWith(link.href) && "text-primary",
                )}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
