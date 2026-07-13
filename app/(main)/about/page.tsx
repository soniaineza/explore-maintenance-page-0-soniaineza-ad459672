import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { getPayload } from "@/lib/payload"
import { resolveMediaUrl } from "@/lib/queries"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "About | TruRwanda",
  description: "Discover the story behind TruRwanda — local experts crafting authentic Rwandan travel experiences.",
}

export default async function AboutPage() {
  const payload = await getPayload()
  const about = await payload.findGlobal({ slug: 'about', depth: 1 })
  const heroImageUrl = resolveMediaUrl((about as any).heroImage)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="About Us"
          title="About TruRwanda"
          description="Learn about our mission to share the beauty of Rwanda with the world."
          backHref="/"
          backLabel="Home"
          imageSrc={heroImageUrl || "/images/rwanda-hero.webp"}
        />

        <section className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="font-heading text-3xl font-semibold text-foreground">
            {about.aboutTitle}
          </h1>
          <p className="mt-6 leading-relaxed text-muted-foreground whitespace-pre-line">
            {about.description}
          </p>

          {about.mission && (
            <div className="mt-12">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground whitespace-pre-line">
                {about.mission}
              </p>
            </div>
          )}

          {about.vision && (
            <div className="mt-10">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Our Vision</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground whitespace-pre-line">
                {about.vision}
              </p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
