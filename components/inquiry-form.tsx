"use client"

import { useState } from "react"
import { Loader2, Mail, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/lib/i18n"

const WA_NUMBER = "250795581177"
const EMAIL_TO = "trurwanda@gmail.com"

type Stage = "form" | "choice" | "sent"

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
  const { t } = useTranslation()
  const [stage, setStage] = useState<Stage>("form")
  const [sending, setSending] = useState(false)
  const [budget, setBudget] = useState(1500)
  const [error, setError] = useState("")
  const [savedData, setSavedData] = useState<Record<string, string> | null>(null)

  function buildMessage(data: Record<string, string>) {
    const tourTitle = data.tourSlug
      ? getTourTitle(data.tourSlug, tours)
      : t("plan.formNotSure")
    const lines = [
      `Hi TruRwanda! I'd love to plan a trip.`,
      ``,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.tourSlug ? `Tour interest: ${tourTitle}` : null,
      data.travelDate ? `Travel date: ${data.travelDate}` : null,
      data.groupSize ? `Group size: ${data.groupSize} people` : null,
      `Budget: ~$${data.budget}`,
      ``,
      `Message: ${data.message}`,
    ]
      .filter(Boolean)
      .join("\n")
    return lines
  }

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
      setError(t("plan.formRequired"))
      setSending(false)
      return
    }

    setSending(false)
    setSavedData({
      name,
      email,
      phone,
      tourSlug,
      travelDate,
      groupSize,
      message,
      budget: String(budget),
    })
    setStage("choice")
  }

  function handleSendWhatsApp() {
    if (!savedData) return
    setSending(true)
    const msg = buildMessage(savedData)
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(waUrl, "_blank")
    setSending(false)
    setStage("sent")
  }

  function handleSendEmail() {
    if (!savedData) return
    const msg = buildMessage(savedData)
    const subject = encodeURIComponent(
      `Trip Inquiry from ${savedData.name} - TruRwanda`
    )
    const body = encodeURIComponent(msg)
    const mailtoUrl = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`
    window.open(mailtoUrl, "_blank")
    setStage("sent")
  }

  function handleNew() {
    setStage("form")
    setSavedData(null)
    setBudget(1500)
    setError("")
  }

  if (stage === "choice") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h3 className="font-heading text-xl font-semibold text-foreground">
          {t("plan.formChoiceTitle")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("plan.formChoiceDesc")}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={handleSendWhatsApp}
            disabled={sending}
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MessageCircle className="h-4 w-4" />
            )}
            {t("plan.formSendWhatsApp")}
          </Button>
          <Button size="lg" variant="secondary" onClick={handleSendEmail}>
            <Mail className="h-4 w-4" />
            {t("plan.formSendEmail")}
          </Button>
        </div>
        <Button variant="link" className="mt-4" onClick={handleNew}>
          {t("plan.formChoiceBack")}
        </Button>
      </div>
    )
  }

  if (stage === "sent") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
          <Send className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">
          {t("plan.formSentTitle")}
        </h3>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted-foreground">
          {t("plan.formSentDesc")}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("plan.formSentLink")}{" "}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {t("plan.formSentLinkText")}
          </a>
          {" "}{t("plan.formSentEmailText")}
        </p>
        <Button
          size="lg"
          className="mt-6"
          onClick={handleNew}
          variant="outline"
        >
          {t("plan.formNew")}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("plan.formTitle")} *</Label>
          <Input id="name" name="name" required placeholder="Jane Traveler" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("plan.formEmail")} *</Label>
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
          <Label htmlFor="phone">{t("plan.formPhone")}</Label>
          <Input id="phone" name="phone" placeholder="+1 555 000 0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="groupSize">{t("plan.formGroupSize")}</Label>
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
          <Label htmlFor="tourSlug">{t("plan.formTour")}</Label>
          <select
            id="tourSlug"
            name="tourSlug"
            defaultValue={defaultTour ?? ""}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">{t("plan.formNotSure")}</option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.title}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelDate">{t("plan.formDate")}</Label>
          <Input id="travelDate" name="travelDate" type="date" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          {t("plan.formBudget")}:{" "}
          <span className="font-semibold text-primary">
            ${budget.toLocaleString()}
          </span>
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
        <Label htmlFor="message">{t("plan.formMessage")} *</Label>
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
            {t("plan.formSending")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t("plan.formSend")}
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {t("plan.formNote")}
      </p>
    </form>
  )
}
