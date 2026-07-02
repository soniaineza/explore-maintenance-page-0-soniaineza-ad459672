"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useTranslation } from "@/lib/i18n"

type Spread = {
  leftCaption: string
  leftDetail: string
  rightTitle: string
  rightText: string
  leftImage: string
  rightImage?: string
}

const spreads: Spread[] = [
  {
    leftCaption: "The Land of a Thousand Hills",
    leftDetail: "Rwanda's iconic terraced hillsides",
    rightTitle: "A Country Built on Hills",
    rightText:
      "Rwanda is the most densely populated country in mainland Africa, with over 530 people per square kilometer. This density has forced farmers to cultivate every available slope, creating the iconic terraced hillsides. Over 80% of Rwandans work in agriculture, growing coffee, tea, bananas, and beans on these meticulously tended slopes. The nickname 'Land of a Thousand Hills' was popularized by the book and film 'Gorillas in the Mist'.",
    leftImage: "/images/rwanda-hero.webp",
  },
  {
    leftCaption: "Virunga Mountains, Volcanoes National Park",
    leftDetail: "Africa's first national park, est. 1925",
    rightTitle: "Volcanoes National Park",
    rightText:
      "Volcanoes National Park protects five of the eight Virunga volcanoes, including Mount Karisimbi at 4,507 meters. Established in 1925, it was Africa's first national park and is now a UNESCO World Heritage site. The park is home to roughly 400 mountain gorillas — one of only two populations left in the world. The endangered golden monkey also inhabits the park's bamboo forests alongside over 200 bird species.",
    leftImage: "/images/volcanoes-national-park.webp",
    rightImage: "/images/gorilla-trekking.webp",
  },
  {
    leftCaption: "Mountain gorilla family in the wild",
    leftDetail: "One hour. A lifetime of wonder.",
    rightTitle: "Encountering the Mountain Gorilla",
    rightText:
      "There are approximately 1,063 mountain gorillas left in the wild, split between the Virunga massif and Bwindi Impenetrable Forest. Rwanda's gorilla trekking permits cost $1,500 per person, with a portion directly funding conservation. A trek can last from 30 minutes to 4 hours through steep terrain at altitudes over 2,500 meters. Visitors spend exactly one hour with the gorilla family — a life-changing experience.",
    leftImage: "/images/gorilla-trekking.webp",
    rightImage: "/images/rwanda-hills.webp",
  },
  {
    leftCaption: "Canopy walkway, Nyungwe Forest",
    leftDetail: "50 meters above the rainforest floor",
    rightTitle: "Nyungwe: Ancient Rainforest",
    rightText:
      "Nyungwe Forest National Park spans 1,019 square kilometers of ancient montane rainforest — one of the oldest in Africa, dating back over 40 million years. Its canopy walkway, suspended 50 meters above the forest floor, stretches 160 meters across a valley. The park hosts 13 primate species, over 300 bird species, and more than 1,000 plant species including giant lobelias and rare orchids found nowhere else on Earth.",
    leftImage: "/images/nyungwe-forest.webp",
    rightImage: "/images/nyungwe-bird.webp",
  },
  {
    leftCaption: "Savanna plains of Akagera National Park",
    leftDetail: "Rwanda's Big Five reserve",
    rightTitle: "Akagera: A Conservation Revival",
    rightText:
      "Akagera National Park covers 1,122 square kilometers in eastern Rwanda. After the 1994 genocide, the park's lion and rhino populations were wiped out. A remarkable reintroduction effort brought lions back in 2015 and black rhinos in 2017. Today the park is a thriving Big Five reserve with over 12,000 large mammals including elephants, buffalo, giraffe, zebra, and eland across two distinct ecosystems.",
    leftImage: "/images/akagera-safari.webp",
    rightImage: "/images/akagera-zebra.webp",
  },
  {
    leftCaption: "Lake Kivu, one of the African Great Lakes",
    leftDetail: "485 meters deep at its deepest point",
    rightTitle: "The Depths of Lake Kivu",
    rightText:
      "Lake Kivu stretches 89 kilometers along Rwanda's western border with the Democratic Republic of Congo. At 1,460 meters above sea level, it is one of the highest-elevation Great Lakes. The lake reaches depths of 485 meters. Its waters host the unique Isambaza fish, a staple of Rwandan cuisine. In 2023, Rwanda completed a methane gas extraction plant on the lake, powering thousands of homes while preventing natural gas buildup.",
    leftImage: "/images/lake-kivu.webp",
    rightImage: "/images/lake-kivu-sunset.webp",
  },
  {
    leftCaption: "Kigali — Africa's cleanest capital",
    leftDetail: "Monthly Umuganda community clean-ups",
    rightTitle: "Kigali: The City of a Thousand Hills",
    rightText:
      "Kigali has been named the cleanest city in Africa multiple times, thanks to monthly community clean-up days called 'Umuganda' — a tradition on the last Saturday of every month. Plastic bags have been banned since 2008. The city sits on rolling hills at 1,567 meters elevation and is home to approximately 1.2 million people. Kigali International Airport connects to over 25 international destinations worldwide.",
    leftImage: "/images/kigali-city.webp",
    rightImage: "/images/kigali-street.webp",
  },
  {
    leftCaption: "Traditional Intore dance",
    leftDetail: "UNESCO intangible cultural heritage",
    rightTitle: "Rwanda's Living Culture",
    rightText:
      "The Intore dance troupe originated as a warrior dance performed before battles to boost morale. Today it is Rwanda's most famous cultural performance, recognized by UNESCO as part of the country's intangible cultural heritage. Dancers wear grass crowns and carry spears and shields, moving with athletic jumps and stomps to the rhythm of Ingoma drums. The accompanying singers tell stories of bravery, love, and daily life in Kinyarwanda.",
    leftImage: "/images/cultural-experience.webp",
    rightImage: "/images/rwanda-market.webp",
  },
  {
    leftCaption: "Rwandan countryside near Volcanoes NP",
    leftDetail: "10% of permit fees go to communities",
    rightTitle: "Beyond the Parks",
    rightText:
      "Rwanda's Northern Province is the most densely populated region, home to Musanze and Ruhengeri. The area near Volcanoes National Park has seen significant development from gorilla tourism revenue, with 10% of permit fees going to local communities. The Iby'Iwacu Cultural Village provides employment for former poachers who now work as guides, performers, and conservation ambassadors — a model of community-driven tourism.",
    leftImage: "/images/rwanda-countryside.webp",
    rightImage: "/images/rwanda-landscape.webp",
  },
]

function PageSpread({
  spread,
  index,
  total,
  onPrev,
  onNext,
}: {
  spread: Spread
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}) {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 400)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Left page - image */}
      <motion.div
        key={`left-${index}`}
        initial={{ opacity: 0, x: -60, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.01 }}
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden md:aspect-auto md:w-1/2"
      >
        <Image
          src={spread.leftImage}
          alt={spread.leftCaption}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            {spread.leftCaption}
          </p>
          <p className="mt-1 text-sm text-white/80">{spread.leftDetail}</p>
        </div>
      </motion.div>

      {/* Right page - text */}
      <motion.div
        key={`right-${index}`}
        initial={{ opacity: 0, x: 60, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="flex flex-col justify-center bg-[#F7F1E8] p-8 md:w-1/2 md:p-10"
      >
        {spread.rightImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showText ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mb-5 aspect-[16/9] overflow-hidden rounded-sm"
          >
            <Image
              src={spread.rightImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-all duration-500 hover:scale-105 hover:shadow-lg"
            />
          </motion.div>
        )}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]"
        >
          Chapter {index + 1}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-2 font-serif text-2xl font-bold leading-tight text-[#2A2A2A] md:text-3xl"
        >
          {spread.rightTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-4 text-sm leading-relaxed text-[#2A2A2A]/70 md:text-base"
        >
          {spread.rightText}
        </motion.p>

        {/* Page number */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.9 }}
          className="mt-6 text-xs text-[#2A2A2A]/40"
        >
          {index + 1} / {total}
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function GalleryPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(-1)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalSpreads = spreads.length

  const openBook = useCallback(() => {
    setPage(0)
    setDirection(1)
  }, [])

  const prev = useCallback(() => {
    if (page > 0) {
      setDirection(-1)
      setPage((p) => p - 1)
    }
  }, [page])

  const next = useCallback(() => {
    if (page < totalSpreads - 1) {
      setDirection(1)
      setPage((p) => p + 1)
    }
  }, [page, totalSpreads])

  const closeBook = useCallback(() => {
    setDirection(-1)
    setPage(-1)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape" && page >= 0) closeBook()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [prev, next, closeBook, page])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
      rotateY: dir > 0 ? -20 : 20,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -600 : 600,
      opacity: 0,
      rotateY: dir > 0 ? 20 : -20,
      scale: 0.95,
    }),
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0E0E10]">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        {/* Compact header */}
        <div className="border-b border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white"
            >
              <ArrowLeft className="h-3 w-3" />
              {t('gallery.home')}
            </Link>
            <span className="text-xs text-white/50">{t('gallery.title')}</span>
            {page >= 0 && (
              <span className="ml-auto text-xs text-white/30">
                {page + 1} / {totalSpreads}
              </span>
            )}
          </div>
        </div>

        {/* Book viewer */}
        <div
          ref={containerRef}
          className="flex flex-1 items-center justify-center bg-[#0E0E10] bg-gradient-to-b from-[#1a1410] to-[#0E0E10] p-4 md:p-8"
        >
          <div className="relative w-full max-w-5xl" style={{ perspective: "1800px" }}>
            {/* Closed book */}
            {page === -1 && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative mx-auto max-w-md cursor-pointer"
                onClick={openBook}
              >
                {/* Book cover */}
                <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-[#3d2a1e] to-[#1a1008] p-1 shadow-2xl shadow-black/60">
                  <div className="rounded-sm border border-[#D4AF37]/30 bg-gradient-to-br from-[#2C1E17] to-[#1a1008] p-8 md:p-12">
                    {/* Gold border decoration */}
                    <div className="absolute inset-4 rounded-sm border border-[#D4AF37]/20" />
                    <div className="relative flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-10 w-10 text-[#D4AF37]/70" />
                      <h1 className="mt-6 text-center font-serif text-3xl font-bold tracking-wide text-[#D4AF37] md:text-4xl">
                        Rwanda
                      </h1>
                      <p className="mt-2 text-center text-sm uppercase tracking-[0.3em] text-[#D4AF37]/60">
                        {t('gallery.subtitle')}
                      </p>
                      <div className="mt-8 h-px w-16 bg-[#D4AF37]/40" />
                      <p className="mt-6 text-xs text-[#D4AF37]/40">{t('gallery.clickToOpen')}</p>
                    </div>
                  </div>
                </div>
                {/* Book spine shadow */}
                <div className="absolute -bottom-2 left-[10%] right-[10%] h-4 rounded-full bg-black/40 blur-lg" />
              </motion.div>
            )}

            {/* Open book */}
            <AnimatePresence mode="wait" custom={direction}>
              {page >= 0 && (
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 28, mass: 1 },
                    opacity: { duration: 0.35, ease: "easeOut" },
                    rotateY: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.35, ease: "easeOut" },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) next()
                    if (info.offset.x > 80) prev()
                  }}
                  className="relative overflow-hidden rounded-sm bg-white shadow-2xl shadow-black/50 cursor-grab active:cursor-grabbing"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <PageSpread
                    spread={spreads[page]}
                    index={page}
                    total={totalSpreads}
                    onPrev={prev}
                    onNext={next}
                  />

                  {/* Navigation overlay */}
                  <div className="absolute inset-0 flex">
                    <motion.button
                      type="button"
                      onClick={prev}
                      disabled={page === 0}
                      className="group relative w-1/2 cursor-pointer outline-none disabled:cursor-default"
                      aria-label={t('gallery.previous')}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      whileTap={{ scale: 1.0 }}
                    >
                      {page > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2A2A2A] shadow-md backdrop-blur-sm"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </motion.div>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={next}
                      disabled={page === totalSpreads - 1}
                      className="group relative w-1/2 cursor-pointer outline-none disabled:cursor-default"
                      aria-label={t('gallery.next')}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      whileTap={{ scale: 1.0 }}
                    >
                      {page < totalSpreads - 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2A2A2A] shadow-md backdrop-blur-sm"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>

                  {/* Page curl hint */}
                  {page < totalSpreads - 1 && (
                    <div className="pointer-events-none absolute bottom-3 right-3">
                      <div className="h-8 w-8 rounded-br-sm bg-gradient-to-tl from-gray-300/50 to-transparent" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* End of book */}
            {page === totalSpreads - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-6 text-center"
              >
                <button
                  type="button"
                  onClick={closeBook}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
                >
                  <ChevronLeft className="h-3 w-3" />
                  {t('gallery.close')}
                </button>
                <p className="mt-3 text-xs text-white/30">{t('gallery.end')}</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
