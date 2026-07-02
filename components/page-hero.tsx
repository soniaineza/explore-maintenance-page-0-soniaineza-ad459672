import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function PageHero({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  imageSrc,
}: {
  eyebrow: string
  title: string
  description: string
  backHref?: string
  backLabel?: string
  imageSrc?: string
}) {
  return (
    <section
      className={`relative flex min-h-[60vh] items-center overflow-hidden ${!imageSrc ? "border-b border-border bg-secondary/40" : ""}`}
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        {backHref && (
          <Link
            href={backHref}
            className={`mb-4 inline-flex items-center gap-1 text-sm ${imageSrc ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel ?? "Retour"}
          </Link>
        )}
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
        <h1
          className={`mt-2 font-heading text-4xl font-semibold text-balance md:text-5xl ${imageSrc ? "text-white" : "text-foreground"}`}
        >
          {title}
        </h1>
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${imageSrc ? "text-white/80" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      </div>
    </section>
  )
}
