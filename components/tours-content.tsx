"use client"

import { useTranslation } from "@/lib/i18n"
import { PageHero } from "@/components/page-hero"
import { ToursExplorer } from "@/components/tours-explorer"
import type { TourWithImage } from "@/lib/queries"

export function ToursContent({ tours, heroImageUrl }: { tours: TourWithImage[]; heroImageUrl?: string | null }) {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        eyebrow={t('tours.badge')}
        title={t('tours.title')}
        description={t('tours.desc')}
        backHref="/"
        backLabel={t('tours.back')}
        imageSrc={heroImageUrl || "/images/gorilla-trekking.webp"}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <ToursExplorer tours={tours} />
      </section>
    </>
  )
}
