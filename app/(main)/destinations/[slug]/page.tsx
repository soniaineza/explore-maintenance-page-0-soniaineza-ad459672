import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DestinationDetailContent } from "@/components/destination-detail-content"
import {
  getDestinationBySlug,
  getToursForDestination,
} from "@/lib/queries"

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination) return { title: "Destination introuvable | TruRwanda" }
  return {
    title: `${destination.name} | TruRwanda`,
    description: destination.tagline,
  }
}

export default async function DestinationDetailPage({ params }: Params) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination) notFound()

  const tours = await getToursForDestination(destination.slug)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <DestinationDetailContent destination={destination} tours={tours} />
      </main>
      <SiteFooter />
    </div>
  )
}
