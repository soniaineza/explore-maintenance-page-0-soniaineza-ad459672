"use client"

import { Clock, Coffee, Sun, Sunrise, Sunset, Moon, Utensils, Bus, Camera, Footprints, Home, MapPin } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

interface ItineraryDay {
  dayNumber: number
  label: string
  steps: string[]
}

function parseItinerary(text: string): ItineraryDay[] {
  const lines = text.split("\n").map((s) => s.trim()).filter(Boolean)
  const days: ItineraryDay[] = []
  let currentDay: ItineraryDay | null = null

  for (const line of lines) {
    const dayMatch = line.match(/^Day\s*(\d+):?\s*(.*)/i)
    if (dayMatch) {
      if (currentDay) days.push(currentDay)
      currentDay = {
        dayNumber: parseInt(dayMatch[1]),
        label: dayMatch[2].trim() || `Day ${dayMatch[1]}`,
        steps: [],
      }
    } else if (currentDay) {
      currentDay.steps.push(line)
    } else {
      // Lines before any "Day N:" header — treat as intro
      if (!currentDay) {
        currentDay = { dayNumber: 1, label: "Day 1", steps: [] }
      }
      currentDay.steps.push(line)
    }
  }
  if (currentDay) days.push(currentDay)
  return days
}

function getStepIcon(step: string) {
  const lower = step.toLowerCase()
  if (lower.includes("pick up") || lower.includes("drop off") || lower.includes("drive")) return Bus
  if (lower.includes("breakfast") || lower.includes("lunch") || lower.includes("dinner") || lower.includes("coffee")) return Utensils
  if (lower.includes("sunrise") || lower.includes("morning")) return Sunrise
  if (lower.includes("sunset") || lower.includes("afternoon")) return Sunset
  if (lower.includes("night") || lower.includes("evening")) return Moon
  if (lower.includes("game drive") || lower.includes("safari") || lower.includes("trekking") || lower.includes("trek")) return Footprints
  if (lower.includes("photo") || lower.includes("camera") || lower.includes("scenic")) return Camera
  if (lower.includes("check in") || lower.includes("check out") || lower.includes("checkin") || lower.includes("checkout") || lower.includes("accommodation") || lower.includes("hotel") || lower.includes("lodge")) return Home
  if (lower.includes("explore") || lower.includes("visit") || lower.includes("tour")) return MapPin
  return Sun
}

export function TourItinerary({ itinerary }: { itinerary: string }) {
  const { t } = useTranslation()
  const days = parseItinerary(itinerary)

  if (days.length === 0) return null

  return (
    <div className="relative">
      {/* Section heading */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-2xl font-semibold text-foreground">
            {t('tour.itinerary')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {days.length} {days.length === 1 ? t('tours.day') : t('tours.days')} &bull; {t('tour.itinerarySub')}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-0">
        {/* Vertical connecting line */}
        <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

        {days.map((day, dayIdx) => (
          <div key={day.dayNumber} className="group relative pb-10 last:pb-0">
            {/* Day header row */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Day number badge */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/30">
                <span className="text-sm font-bold">{String(day.dayNumber).padStart(2, "0")}</span>
              </div>

              {/* Day content card */}
              <div className="min-w-0 flex-1">
                <div className="overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
                  {/* Day header */}
                  <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-transparent px-5 py-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading text-lg font-semibold text-foreground">
                        {day.label}
                      </h4>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {day.steps.length} {day.steps.length === 1 ? t('tour.activity') : t('tour.activities')}
                      </span>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="divide-y divide-border/30">
                    {day.steps.map((step, stepIdx) => {
                      const Icon = getStepIcon(step)
                      return (
                        <div
                          key={stepIdx}
                          className="flex items-start gap-3 px-5 py-3 transition-colors duration-200 hover:bg-secondary/30"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors duration-200 group-hover:bg-primary/10">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                            {step}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
