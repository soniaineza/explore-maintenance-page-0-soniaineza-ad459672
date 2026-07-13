"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-heading text-3xl font-semibold text-foreground">
            {t('error.title')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('error.desc')}
          </p>
          <Button size="lg" className="mt-8" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            {t('error.btn')}
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
