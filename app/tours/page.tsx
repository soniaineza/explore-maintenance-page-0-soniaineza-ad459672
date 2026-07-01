import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ToursContent } from "@/components/tours-content"
import { getAllTours } from "@/lib/queries"

export const dynamic = 'force-dynamic'

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
        <ToursContent tours={tours} />
      </main>
      <SiteFooter />
    </div>
  )
}
