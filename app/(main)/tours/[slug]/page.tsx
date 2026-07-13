import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TourDetailContent } from "@/components/tour-detail-content"
import {
  getRelatedTours,
  getTourBySlug,
} from "@/lib/queries"
import type { Destination } from "@/payload-types"

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) return { title: "Circuit introuvable | TruRwanda" }
  return {
    title: `${tour.title} | TruRwanda`,
    description: tour.shortDescription,
  }
}

export default async function TourDetailPage({ params }: Params) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) notFound()

  const destId = typeof tour.destination === 'object'
    ? (tour.destination as Destination).id
    : undefined

  const related = await getRelatedTours(tour.slug, destId)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <TourDetailContent tour={tour} related={related} />
      </main>
      <SiteFooter />
    </div>
  )
}
