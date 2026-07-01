import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { DestinationCard } from "@/components/destination-card"
import { getAllDestinations } from "@/lib/queries"

export const metadata: Metadata = {
  title: "Destinations | TruRwanda",
  description:
    "Explore Rwanda's iconic destinations — national parks, lakes, forests and the capital city of Kigali.",
}

export default async function DestinationsPage() {
  const destinations = await getAllDestinations()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Where to go"
          title="Destinations"
          description="Volcanic peaks, savanna plains, ancient rainforests and a great inland lake — discover the places that make Rwanda unforgettable."
          backHref="/"
          backLabel="Home"
        />
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
