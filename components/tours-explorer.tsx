"use client"

import { useMemo, useState } from "react"
import { TourCard } from "@/components/tour-card"
import { cn } from "@/lib/utils"
import type { Tour } from "@/lib/db/schema"

export function ToursExplorer({ tours }: { tours: Tour[] }) {
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(tours.map((t) => t.category)))]
  }, [tours])

  const [active, setActive] = useState("All")

  const filtered =
    active === "All" ? tours : tours.filter((t) => t.category === active)

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          No tours in this category yet.
        </p>
      )}
    </div>
  )
}
