import type { Metadata } from "next"
import { Clock, Mail, MessageSquare } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { InquiryForm } from "@/components/inquiry-form"
import { getTourOptions } from "@/lib/queries"

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
        <PageHero
          eyebrow="Plan a trip"
          title="Let's craft your Rwanda journey"
          description="Share a few details and our local travel team will design a personalized itinerary and get back to you within 24 hours."
          backHref="/"
          backLabel="Home"
        />
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                How it works
              </h2>
              <ul className="mt-6 space-y-6">
                {[
                  {
                    icon: MessageSquare,
                    title: "Tell us your dream",
                    text: "Send your interests, dates and group size using the form.",
                  },
                  {
                    icon: Mail,
                    title: "Get a tailored plan",
                    text: "Our experts reply with a custom itinerary and quote.",
                  },
                  {
                    icon: Clock,
                    title: "Book with confidence",
                    text: "Refine the details, confirm, and get ready to explore.",
                  },
                ].map((step) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                <InquiryForm tours={tours} defaultTour={tour} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
