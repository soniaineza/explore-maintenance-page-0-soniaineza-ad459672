"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Clock, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TourCard } from "@/components/tour-card"
import { TourItinerary } from "@/components/tour-itinerary"
import { useTranslation } from "@/lib/i18n"
import { formatPrice } from "@/lib/utils"
import type { TourWithImage } from "@/lib/queries"

function splitLines(val: string | null): string[] {
  if (!val) return []
  return val.split("\n").map((s) => s.trim()).filter(Boolean)
}

export function TourDetailContent({
  tour,
  related,
}: {
  tour: TourWithImage
  related: TourWithImage[]
}) {
  const { t } = useTranslation()
  const highlights = splitLines(tour.highlights)
  const included = splitLines(tour.included)
  const excluded = splitLines(tour.excluded)

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={tour.heroImageUrl || "/placeholder.svg"}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-8 text-white">
          <Link
            href="/tours"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('tour.allTours')}
          </Link>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold text-balance md:text-5xl">
            {tour.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {tour.duration} {tour.duration === 1 ? t('tours.day') : t('tours.days')}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {t('tour.about')}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {tour.fullDescription}
            </p>

            {highlights.length > 0 && (
              <>
                <h3 className="mt-10 font-heading text-xl font-semibold text-foreground">
                  {t('tour.highlights')}
                </h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tour.itinerary && (
              <div className="mt-10">
                <TourItinerary itinerary={tour.itinerary} />
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">{t('tour.from')}</p>
              <p className="font-heading text-3xl font-semibold text-foreground">
                ${formatPrice(tour.price).usd}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  {t('tour.person')}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                ≈ FRw {formatPrice(tour.price).rwf}
              </p>

              {included.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-foreground">
                    {t('tour.included')}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {excluded.length > 0 && (
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm font-semibold text-foreground">
                    {t('tour.excluded')}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {excluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button size="lg" className="mt-6 w-full" render={<Link href={`/plan?tour=${tour.slug}`} />}>
                {t('tour.request')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {t('tour.free')}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {t('tour.related')}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
