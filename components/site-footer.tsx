"use client"

import Link from "next/link"
import { Mail, MapPin, MessageCircle, Mountain } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const WA_NUMBER = "250795581177"

export function SiteFooter() {
  const { t, locale } = useTranslation()

  return (
    <footer className="border-t border-border/60 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mountain className="h-4 w-4" />
              </span>
              <span className="font-heading text-lg font-semibold text-foreground">
                {t('site.name')}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('footer.explore')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tours" className="hover:text-primary transition-colors">
                  {t('nav.tours')}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-primary transition-colors">
                  {t('nav.destinations')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-primary transition-colors">
                  {t('nav.plan')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t('footer.visit')}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {t('footer.address1')}<br />
                  {t('footer.address2')}<br />
                  {t('footer.address3')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${t('footer.email')}`} className="hover:text-primary transition-colors">
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-green-500" />
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {t('footer.whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl overflow-hidden border border-border h-48">
          <iframe
            title="Norrsken Kigali House location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.1040%2C-1.9570%2C30.1090%2C-1.9538&amp;layer=mapnik&amp;marker=-1.9554%2C30.1065"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-6 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TruRwanda. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}
