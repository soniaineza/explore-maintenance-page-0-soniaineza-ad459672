"use client"

import { useTranslation } from "@/lib/i18n"
import { PageHero } from "@/components/page-hero"
import { ToursExplorer } from "@/components/tours-explorer"
import type { Tour } from "@/lib/db/schema"

export function ToursContent({ tours }: { tours: Tour[] }) {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        eyebrow={t('tours.badge')}
        title={t('tours.title')}
        description={t('tours.desc')}
        backHref="/"
        backLabel={t('tours.back')}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <ToursExplorer tours={tours} />
      </section>
    </>
  )
}
