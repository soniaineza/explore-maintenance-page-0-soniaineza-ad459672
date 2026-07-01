"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n"
import { formatPrice } from "@/lib/utils"
import type { Tour } from "@/lib/db/schema"

export function TourCard({ tour }: { tour: Tour }) {
  const { t } = useTranslation()
  const price = formatPrice(tour.priceUsd)

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group card-hover relative flex flex-col overflow-hidden rounded-xl border border-border bg-card before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:bg-gradient-to-b before:from-primary/5 before:to-transparent"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.imageUrl || "/placeholder.svg"}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground shadow-lg">
          {tour.category}
        </Badge>
      </div>
      <div className="relative flex flex-1 flex-col p-5 z-10">
        <h3 className="font-heading text-xl font-semibold leading-snug text-foreground text-balance">
          {tour.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {tour.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5">
            <Clock className="h-3 w-3" />
            {tour.durationDays} {tour.durationDays === 1 ? "day" : "days"}
          </span>
          {tour.groupSize && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5">
              <Users className="h-3 w-3" />
              {tour.groupSize}
            </span>
          )}
          {tour.difficulty && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5">
              <MapPin className="h-3 w-3" />
              {tour.difficulty}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <span className="text-sm text-muted-foreground">{t('tours.from')} </span>
            <span className="text-base font-semibold text-foreground">
              ${price.usd}
            </span>
            <span className="block text-xs text-muted-foreground">
              FRw {price.rwf}
            </span>
          </div>
          <span className="text-sm font-medium text-primary group-hover:underline">
            {t('tours.viewDetails')}
          </span>
        </div>
      </div>
    </Link>
  )
}
