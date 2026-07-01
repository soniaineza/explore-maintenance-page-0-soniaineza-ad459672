"use client"

import { useState } from "react"
import { Loader2, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const WA_NUMBER = "250795581177"

function getTourTitle(slug: string, tours: { slug: string; title: string }[]) {
  return tours.find((t) => t.slug === slug)?.title ?? slug
}

export function InquiryForm({
  tours,
  defaultTour,
}: {
  tours: { slug: string; title: string }[]
  defaultTour?: string
}) {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [budget, setBudget] = useState(1500)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setSending(true)

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const tourSlug = String(data.get("tourSlug") ?? "").trim()
    const travelDate = String(data.get("travelDate") ?? "").trim()
    const groupSize = String(data.get("groupSize") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name || !email || !message) {
      setError("Please fill in your name, email, and a short message.")
      setSending(false)
      return
    }

    const tourTitle = tourSlug ? getTourTitle(tourSlug, tours) : "Not sure yet"
    const lines = [
      `Hi TruRwanda! I'd love to plan a trip.`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      tourSlug ? `Tour interest: ${tourTitle}` : null,
      travelDate ? `Travel date: ${travelDate}` : null,
      groupSize ? `Group size: ${groupSize} people` : null,
      `Budget: ~$${budget.toLocaleString()}`,
      ``,
      `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n")

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`

    setSending(false)
    setSent(true)

    window.open(waUrl, "_blank")
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
          <MessageCircle className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">
          WhatsApp opened!
        </h3>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted-foreground">
          Your message has been pre-filled. Just tap send on WhatsApp to
          reach the TruRwanda team.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Didn&apos;t open?{" "}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Click here to message us directly
          </a>
        </p>
        <Button
          size="lg"
          className="mt-6"
          onClick={() => setSent(false)}
          variant="outline"
        >
          Start a new inquiry
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" required placeholder="Jane Traveler" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@email.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+1 555 000 0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="groupSize">Group size</Label>
          <Input
            id="groupSize"
            name="groupSize"
            type="number"
            min={1}
            placeholder="2"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tourSlug">Tour of interest</Label>
          <select
            id="tourSlug"
            name="tourSlug"
            defaultValue={defaultTour ?? ""}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Not sure yet</option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.title}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelDate">Preferred travel date</Label>
          <Input id="travelDate" name="travelDate" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Budget per person: <span className="font-semibold text-primary">${budget.toLocaleString()}</span>
        </Label>
        <input
          type="range"
          name="budget"
          min={200}
          max={10000}
          step={100}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$200</span>
          <span>$5,000</span>
          <span>$10,000</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your trip *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What would you love to see and experience in Rwanda?"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={sending}>
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening WhatsApp...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send via WhatsApp
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No account needed. Your details go directly to our team on WhatsApp.
      </p>
    </form>
  )
}
