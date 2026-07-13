"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TourCard } from "@/components/tour-card"
import { DestinationCard } from "@/components/destination-card"
import { useTranslation } from "@/lib/i18n"
import type { TourWithImage, DestinationWithImage } from "@/lib/queries"

export function HomeContent({
  tours,
  destinations,
  heroImageUrl,
}: {
  tours: TourWithImage[]
  destinations: DestinationWithImage[]
  heroImageUrl?: string | null
}) {
  const { t, locale } = useTranslation()

  return (
    <main className="flex-1">
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <Image
          src={heroImageUrl || "/images/rwanda-hero.webp"}
          alt="Rwanda's rolling green hills at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white fade-in-up">
            <Sparkles className="h-4 w-4 text-accent" />
            {t('home.badge')}
          </span>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl md:text-7xl fade-in-up stagger-1">
            {t('home.heroTitle1')}<br />
            <span className="text-gradient-hero">{t('home.heroTitle2')}</span>
            <br />{t('home.heroTitle3')}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80 fade-in-up stagger-2">
            {t('home.heroDesc')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 fade-in-up stagger-3">
            <Button size="lg" className="shadow-xl shadow-primary/25" render={<Link href="/tours" />}>
              {t('home.browseTours')}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/20 hover:text-white shadow-xl"
              render={<Link href="/destinations" />}
            >
              {t('home.discoverDestinations')}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {t('home.sectionTours')}
            </p>
            <h2 className="mt-1 font-heading text-3xl font-semibold text-foreground text-balance md:text-4xl">
              {t('home.sectionToursTitle')}
            </h2>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t('home.viewAllTours')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {t('home.sectionDests')}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground text-balance md:text-4xl">
              {t('home.sectionDestsTitle')}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t('home.viewAllDests')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="glow-border relative overflow-hidden rounded-2xl px-8 py-12 text-center text-foreground">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
          <div className="relative">
            <h2 className="font-heading text-3xl font-semibold text-balance md:text-4xl">
              {t('home.ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {t('home.ctaDesc')}
            </p>
            <Button
              size="lg"
              variant="default"
              className="mt-8 shadow-xl shadow-primary/25"
              render={<Link href="/plan" />}
            >
              {t('home.ctaBtn')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
