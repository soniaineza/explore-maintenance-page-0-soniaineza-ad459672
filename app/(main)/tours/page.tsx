import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ToursContent } from "@/components/tours-content"
import { getAllTours } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Circuits | TruRwanda",
  description:
    "Parcourez les circuits organisés au Rwanda — trekking avec les gorilles, safaris, aventures en forêt tropicale, expériences culturelles et voyages de plusieurs jours.",
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
