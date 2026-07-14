"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Compass, Shield, Sun, Mountain } from "lucide-react"
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
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src={destination.heroImageUrl || "/placeholder.svg"}
          alt={destination.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-40% to-black/10" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
        
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 text-white">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('destination.allDestinations')}
          </Link>
          
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" />
              {destination.location}
            </span>
            {tours.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm">
                <Mountain className="h-3.5 w-3.5" />
                {tours.length} {tours.length === 1 ? 'tour' : 'tours'} available
              </span>
            )}
          </div>
          
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-balance drop-shadow-lg md:text-5xl lg:text-6xl">
            {destination.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 drop-shadow">
            {destination.shortDescription}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-14 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Compass className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {t('destination.about')} {destination.title}
                </h2>
              </div>
              <div className="relative mt-6 rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                <div className="absolute right-0 top-0 h-32 w-32 opacity-[0.03]" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                }} />
                <p className="leading-relaxed text-muted-foreground">
                  {destination.fullDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Good to know card */}
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
                <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-transparent px-5 py-3.5">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {t('destination.goodToKnow')}
                  </h3>
                </div>
                <div className="divide-y divide-border/30">
                  <div className="flex items-start gap-3 px-5 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('destination.region')}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {destination.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Sun className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('destination.bestTime')}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {t('destination.yearRound')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
                      <Shield className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('destination.safety')}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {t('destination.safeDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              {tours.length > 0 && (
                <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
                  <p className="text-sm font-medium text-foreground">
                    {t('destination.toursAvailable')}
                  </p>
                  <p className="mt-1 font-heading text-3xl font-bold text-primary">
                    {tours.length}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t('destination.startingFrom')} ${Math.min(...tours.map(t => t.price))}{t('tours.person')}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Tours Section */}
      {tours.length > 0 && (
        <section className="border-t border-border bg-gradient-to-b from-secondary/60 to-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                  Explore {destination.title}
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground md:text-3xl">
                  {t('destination.toursHere')} {destination.title}
                </h2>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
