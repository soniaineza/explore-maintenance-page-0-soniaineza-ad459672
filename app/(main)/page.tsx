import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HomeContent } from "@/components/home-content"
import { getAllTours, getFeaturedDestinations, resolveMediaUrl } from "@/lib/queries"
import { getPayload } from "@/lib/payload"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload()
  const [tours, destinations, homepage] = await Promise.all([
    getAllTours(),
    getFeaturedDestinations(),
    payload.findGlobal({ slug: 'homepage', depth: 1 }).catch(() => ({})),
  ])

  const heroImageUrl = resolveMediaUrl((homepage as any).heroBackgroundImage)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <HomeContent tours={tours} destinations={destinations} heroImageUrl={heroImageUrl} />
      <SiteFooter />
    </div>
  )
}
