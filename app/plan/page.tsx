import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlanContent } from "@/components/plan-content"
import { getTourOptions } from "@/lib/queries"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Plan a Trip | TruRwanda",
  description:
    "Tell us how you like to travel and our Rwanda experts will craft a personalized itinerary just for you.",
}

type SearchParams = { searchParams: Promise<{ tour?: string }> }

export default async function PlanPage({ searchParams }: SearchParams) {
  const [tours, { tour }] = await Promise.all([
    getTourOptions(),
    searchParams,
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PlanContent tours={tours} defaultTour={tour} />
      </main>
      <SiteFooter />
    </div>
  )
}
