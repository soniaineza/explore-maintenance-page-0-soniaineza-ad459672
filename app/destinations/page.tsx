import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DestinationsContent } from "@/components/destinations-content"
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
        <DestinationsContent destinations={destinations} />
      </main>
      <SiteFooter />
    </div>
  )
}
