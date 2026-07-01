import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlanContent } from "@/components/plan-content"
import { getTourOptions } from "@/lib/queries"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Planifier un voyage | TruRwanda",
  description:
    "Dites-nous comment vous aimez voyager et nos experts rwandais créeront un itinéraire personnalisé rien que pour vous.",
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
