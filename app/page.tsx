import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HomeContent } from "@/components/home-content"
import { getAllTours, getFeaturedDestinations } from "@/lib/queries"

export default async function HomePage() {
  const [tours, destinations] = await Promise.all([
    getAllTours(),
    getFeaturedDestinations(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <HomeContent tours={tours} destinations={destinations} />
      <SiteFooter />
    </div>
  )
}
