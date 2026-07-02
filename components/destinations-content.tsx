"use client"

import { useTranslation } from "@/lib/i18n"
import { PageHero } from "@/components/page-hero"
import { DestinationCard } from "@/components/destination-card"
import type { Destination } from "@/lib/db/schema"

export function DestinationsContent({ destinations }: { destinations: Destination[] }) {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        eyebrow={t('destinations.badge')}
        title={t('destinations.title')}
        description={t('destinations.desc')}
        backHref="/"
        backLabel={t('destinations.back')}
        imageSrc="/images/volcanoes-national-park.webp"
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </>
  )
}
