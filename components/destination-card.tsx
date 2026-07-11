"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import type { DestinationWithImage } from "@/lib/queries"

export function DestinationCard({
  destination,
}: {
  destination: DestinationWithImage
}) {
  const { t } = useTranslation()
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group card-hover relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl border border-border shadow-md"
    >
      <Image
        src={destination.heroImageUrl || "/placeholder.svg"}
        alt={destination.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="relative p-5 text-white">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm">
          <MapPin className="h-3 w-3" />
          {destination.location}
        </span>
        <h3 className="mt-3 font-heading text-xl font-semibold text-balance drop-shadow-lg">
          {destination.title}
        </h3>
        <p className="mt-1 text-sm text-white/85 drop-shadow">{destination.shortDescription}</p>
        <span className="mt-3 inline-block text-xs font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          {t('destinations.explore')} →
        </span>
      </div>
    </Link>
  )
}
