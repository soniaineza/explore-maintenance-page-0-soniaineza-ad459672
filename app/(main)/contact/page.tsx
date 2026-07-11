import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { getPayload } from "@/lib/payload"
import { Mail, Phone, MessageCircle, MapPin, Globe } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Contact | TruRwanda",
  description: "Get in touch with TruRwanda — email, WhatsApp, or visit us in Kigali.",
}

export default async function ContactPage() {
  const payload = await getPayload()
  const contact = await payload.findGlobal({ slug: 'contact', depth: 1 })

  const contacts = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp?.replace(/\D/g, '')}` },
    { icon: MapPin, label: 'Address', value: contact.address },
  ]

  const socials = [
    { icon: Globe, label: 'Facebook', href: contact.facebook },
    { icon: Globe, label: 'Instagram', href: contact.instagram },
    { icon: Globe, label: 'LinkedIn', href: contact.linkedin },
  ].filter((s) => s.href)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Contact"
          title="Get in Touch"
          description="We'd love to hear from you. Reach out to start planning your Rwandan adventure."
          backHref="/"
          backLabel="Home"
          imageSrc="/images/rwanda-hills.webp"
        />

        <section className="mx-auto max-w-4xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-foreground">Contact Information</h2>
              <div className="mt-6 space-y-5">
                {contacts.map((c) => {
                  const Icon = c.icon
                  return (
                    <div key={c.label} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{c.label}</p>
                        {c.href ? (
                          <Link href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                            {c.value}
                          </Link>
                        ) : (
                          <p className="text-sm text-muted-foreground">{c.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {socials.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Follow Us</h3>
                  <div className="mt-4 flex gap-3">
                    {socials.map((s) => {
                      const Icon = s.icon
                      return (
                        <Link
                          key={s.label}
                          href={s.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          aria-label={s.label}
                        >
                          <Icon className="h-4 w-4" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              {contact.address && (
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?query=${encodeURIComponent(contact.address)}&layer=mapnik`}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location"
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
