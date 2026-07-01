import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TourCard } from "@/components/tour-card"
import { formatPrice } from "@/lib/utils"
import {
  getRelatedTours,
  getTourBySlug,
} from "@/lib/queries"

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) return { title: "Tour not found | TruRwanda" }
  return {
    title: `${tour.title} | TruRwanda`,
    description: tour.summary,
  }
}

export default async function TourDetailPage({ params }: Params) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) notFound()

  const related = await getRelatedTours(tour.slug, tour.category)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[60vh] items-end overflow-hidden">
          <Image
            src={tour.imageUrl || "/placeholder.svg"}
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
              All tours
            </Link>
            <Badge className="mt-4 bg-accent text-accent-foreground">
              {tour.category}
            </Badge>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold text-balance md:text-5xl">
              {tour.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {tour.durationDays} {tour.durationDays === 1 ? "day" : "days"}
              </span>
              {tour.groupSize && (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {tour.groupSize}
                </span>
              )}
              {tour.difficulty && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {tour.difficulty}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                About this journey
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {tour.description}
              </p>

              {tour.highlights.length > 0 && (
                <>
                  <h3 className="mt-10 font-heading text-xl font-semibold text-foreground">
                    Highlights
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {tour.highlights.map((h) => (
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

              {tour.itinerary.length > 0 && (
                <>
                  <h3 className="mt-10 font-heading text-xl font-semibold text-foreground">
                    Itinerary
                  </h3>
                  <ol className="mt-4 space-y-6 border-l border-border pl-6">
                    {tour.itinerary.map((step) => (
                      <li key={step.day} className="relative">
                        <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {step.day}
                        </span>
                        <h4 className="font-semibold text-foreground">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-heading text-3xl font-semibold text-foreground">
                  ${formatPrice(tour.priceUsd).usd}
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    / person
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  ≈ FRw {formatPrice(tour.priceUsd).rwf}
                </p>

                {tour.included.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-foreground">
                      What&apos;s included
                    </p>
                    <ul className="mt-3 space-y-2">
                      {tour.included.map((item) => (
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

                <Button size="lg" className="mt-6 w-full" render={<Link href={`/plan?tour=${tour.slug}`} />}>
                  Request this tour
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Free to inquire. No payment required.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-secondary/40">
            <div className="mx-auto max-w-6xl px-4 py-10">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                You might also like
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((t) => (
                  <TourCard key={t.id} tour={t} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
