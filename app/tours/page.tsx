import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { ToursExplorer } from "@/components/tours-explorer"
import { getAllTours } from "@/lib/queries"

export const metadata: Metadata = {
  title: "Tours | TruRwanda",
  description:
    "Browse curated Rwanda tours — gorilla trekking, safaris, rainforest adventures, cultural experiences and multi-day journeys.",
}

export default async function ToursPage() {
  const tours = await getAllTours()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Curated experiences"
          title="Rwanda tours"
          description="From an hour with the mountain gorillas to an eight-day grand tour, find the journey that fits how you want to explore."
          backHref="/"
          backLabel="Home"
        />
        <section className="mx-auto max-w-6xl px-4 py-10">
          <ToursExplorer tours={tours} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
