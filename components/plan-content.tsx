"use client"

import { Clock, Mail, MessageSquare } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { InquiryForm } from "@/components/inquiry-form"
import { useTranslation } from "@/lib/i18n"

export function PlanContent({
  tours,
  defaultTour,
}: {
  tours: { slug: string; title: string }[]
  defaultTour?: string
}) {
  const { t } = useTranslation()

  const steps = [
    { icon: MessageSquare, title: t('plan.step1Title'), text: t('plan.step1Desc') },
    { icon: Mail, title: t('plan.step2Title'), text: t('plan.step2Desc') },
    { icon: Clock, title: t('plan.step3Title'), text: t('plan.step3Desc') },
  ]

  return (
    <>
      <PageHero
        eyebrow={t('plan.badge')}
        title={t('plan.title')}
        description={t('plan.desc')}
        backHref="/"
        backLabel={t('plan.back')}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {t('plan.howItWorks')}
            </h2>
            <ul className="mt-6 space-y-6">
              {steps.map((step) => (
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
              <InquiryForm tours={tours} defaultTour={defaultTour} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
