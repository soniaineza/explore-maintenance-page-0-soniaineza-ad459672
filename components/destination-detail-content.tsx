"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { TourCard } from "@/components/tour-card"
import { useTranslation } from "@/lib/i18n"
import type { DestinationWithImage, TourWithImage } from "@/lib/queries"

export function DestinationDetailContent({
  destination,
  tours,
}: {
  destination: DestinationWithImage
  tours: TourWithImage[]
}) {
  const { t } = useTranslation()

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={destination.heroImageUrl || "/placeholder.svg"}
          alt={destination.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-8 text-white">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('destination.allDestinations')}
          </Link>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/85">
            <MapPin className="h-4 w-4" />
            {destination.location}
          </span>
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-semibold text-balance md:text-5xl">
            {destination.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            {destination.shortDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {t('destination.about')} {destination.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {destination.fullDescription}
            </p>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {t('destination.goodToKnow')}
              </h3>
              <div className="mt-4 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t('destination.region')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {destination.location}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {t('destination.toursHere')} {destination.title}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
