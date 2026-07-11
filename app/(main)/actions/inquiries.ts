"use server"

import { db } from "@/lib/db"
import { inquiries } from "@/lib/db/schema"

export type InquiryState = {
  status: "idle" | "success" | "error"
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const tourSlug = String(formData.get("tourSlug") ?? "").trim()
  const travelDate = String(formData.get("travelDate") ?? "").trim()
  const groupSizeRaw = String(formData.get("groupSize") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and a short message." }
  }

  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const groupSize = groupSizeRaw ? parseInt(groupSizeRaw, 10) : null

  try {
    await db.insert(inquiries).values({
      name,
      email,
      phone: phone || null,
      tourSlug: tourSlug || null,
      travelDate: travelDate || null,
      groupSize: groupSize && !isNaN(groupSize) ? groupSize : null,
      message,
    })
  } catch {
    return { status: "error", message: "Failed to save inquiry. Please try again." }
  }

  return {
    status: "success",
    message: "Thank you! Your inquiry has been received.",
  }
}
