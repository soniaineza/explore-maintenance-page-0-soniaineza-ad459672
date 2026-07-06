"use client"

import { useMemo, useState } from "react"
import { TourCard } from "@/components/tour-card"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { TourWithImage } from "@/lib/db/schema"

export function ToursExplorer({ tours }: { tours: TourWithImage[] }) {
  const { t } = useTranslation()

  return (
    <div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {tours.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          {t('tours.noTours')}
        </p>
      )}
    </div>
  )
}
