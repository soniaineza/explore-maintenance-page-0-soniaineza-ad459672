"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronDown, Compass, Shield, Wallet, Luggage, Globe } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const faqs = [
  {
    icon: Shield,
    category: "Safety & Visas",
    items: [
      {
        q: "Is Rwanda safe for tourists?",
        a: "Rwanda is one of the safest countries in Africa for travelers. It has low crime rates, well-maintained roads, and a welcoming culture. Kigali is consistently ranked among the safest cities in the world. Our guides accompany you throughout your journey and know the local areas well.",
      },
      {
        q: "Do I need a visa to visit Rwanda?",
        a: "Most visitors can get a visa on arrival for $50 (single entry, 30 days). Citizens of AU member states, the Commonwealth, the US, UK, Germany, Canada, and several other countries are eligible. You can also apply online via the Rwanda Directorate General of Immigration. East African Tourist Visa holders ($100) can also visit Rwanda, Kenya, and Uganda.",
      },
      {
        q: "Do I need any vaccinations?",
        a: "A Yellow Fever vaccination certificate is required if you are arriving from an endemic country. We recommend consulting your doctor about Hepatitis A, Typhoid, and routine vaccinations. Malaria prophylaxis is strongly recommended — your guide will provide mosquito repellent and nets at all accommodations.",
      },
    ],
  },
  {
    icon: Wallet,
    category: "Payments & Costs",
    items: [
      {
        q: "How do I pay for my tour?",
        a: "We accept bank transfers, credit cards (Visa/Mastercard), and PayPal. A 30% deposit secures your booking, with the balance due 30 days before arrival. All prices are in USD and include all taxes and park fees unless stated otherwise. There are no hidden charges.",
      },
      {
        q: "What currency should I bring?",
        a: "The local currency is the Rwandan Franc (RWF). USD is widely accepted at hotels, lodges, and major tour operators. ATMs are available in Kigali and major towns. We recommend carrying some USD in small denominations for tips and roadside purchases.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Free cancellation up to 60 days before departure. 50% refund between 30-60 days. No refund within 30 days, but we can often transfer your booking to different dates at no extra charge. We strongly recommend comprehensive travel insurance.",
      },
    ],
  },
  {
    icon: Compass,
    category: "Tours & Activities",
    items: [
      {
        q: "How fit do I need to be for gorilla trekking?",
        a: "A moderate level of fitness is recommended. The trek can last from 1 to 4 hours through steep, muddy, and uneven terrain at altitudes of 2,500-4,000 meters. Porters are available for hire ($10-15) to carry your backpack and help you navigate tricky sections. Anyone with reasonable mobility can participate with determination.",
      },
      {
        q: "What should I pack for my trip?",
        a: "Essentials include: sturdy hiking boots, waterproof jacket, long trousers (for forest treks), lightweight clothing for savanna areas, insect repellent, sunscreen, a warm fleece (evenings can be cool at altitude), reusable water bottle, and binoculars. We provide a detailed packing list after booking.",
      },
      {
        q: "Can I customize my itinerary?",
        a: "Absolutely! Every TruRwanda tour is fully customizable. Use our WhatsApp inquiry form to share your preferences, budget, and timeline. Our team will craft a personalized itinerary that matches your travel style — whether you are a solo adventurer, a family, or a group of friends.",
      },
    ],
  },
  {
    icon: Globe,
    category: "Getting Around",
    items: [
      {
        q: "How do I get to Rwanda?",
        a: "Kigali International Airport (KGL) receives direct flights from London, Amsterdam, Brussels, Dubai, Doha, Istanbul, Addis Ababa, Nairobi, Johannesburg, and many other hubs. RwandAir is the national carrier with an excellent safety record and modern fleet.",
      },
      {
        q: "What type of transport is used for tours?",
        a: "We use custom-modified 4x4 Toyota Land Cruisers with pop-up roofs for optimal wildlife viewing. All vehicles are air-conditioned, equipped with Wi-Fi, charging ports, and complimentary water. For larger groups we provide premium minibuses with extra legroom.",
      },
      {
        q: "Is the driving safe in Rwanda?",
        a: "Rwanda has excellent paved roads connecting all major destinations. Our drivers are professionally trained, licensed, and have years of experience on Rwandan roads. Speed limits are strictly observed, and all vehicles are fitted with GPS tracking and safety equipment.",
      },
    ],
  },
  {
    icon: Luggage,
    category: "Packing & Preparation",
    items: [
      {
        q: "What is the weather like in Rwanda?",
        a: "Rwanda is known as 'The Land of a Thousand Hills' and has a pleasant tropical highland climate. Average temperatures range from 16-27°C (61-81°F). The dry seasons (June-September and December-February) are best for gorilla trekking and game viewing. The wet season brings dramatic afternoon showers that make the landscapes incredibly lush.",
      },
      {
        q: "Can I use my phone and internet?",
        a: "Yes! Rwanda has excellent 4G coverage across most of the country, including Volcanoes National Park and Akagera. You can buy a local MTN or Airtel SIM at the airport for under $5 with generous data packages. All our lodges and vehicles offer free Wi-Fi.",
      },
      {
        q: "Is the drinking water safe?",
        a: "We provide bottled and filtered water throughout all tours. We also support eco-friendly initiatives and encourage guests to bring reusable water bottles. All our partner lodges provide purified drinking water free of charge.",
      },
    ],
  },
]

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative flex min-h-[60vh] items-center overflow-hidden">
          <Image
            src="/images/rwanda-hills.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative mx-auto w-full max-w-3xl px-4 py-10 md:py-12">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('faq.back')}
            </Link>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {t('faq.badge')}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold text-white text-balance md:text-5xl">
              {t('faq.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
              {t('faq.desc')}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-10">
          {faqs.map((group) => (
            <div key={group.category} className="mb-10">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <group.icon className="h-4 w-4" />
                </span>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {group.category}
                </h2>
              </div>
              <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card px-5">
                {group.items.map((item, idx) => {
                  const globalIdx = faqs
                    .slice(0, faqs.indexOf(group))
                    .reduce((acc, g) => acc + g.items.length, 0) + idx

                  return (
                    <FAQItem
                      key={item.q}
                      question={item.q}
                      answer={item.a}
                      open={openIndex === globalIdx}
                      onToggle={() =>
                        setOpenIndex(openIndex === globalIdx ? null : globalIdx)
                      }
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
