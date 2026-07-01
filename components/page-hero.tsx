import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function PageHero({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
}: {
  eyebrow: string
  title: string
  description: string
  backHref?: string
  backLabel?: string
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        {backHref && (
          <Link
            href={backHref}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel ?? "Retour"}
          </Link>
        )}
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-foreground text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  )
}
