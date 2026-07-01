"use client"

import { MessageCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const WA_NUMBER = "250795581177"
const WA_URL = `https://wa.me/${WA_NUMBER}`

export function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 hover:shadow-xl active:scale-95"
      aria-label={t('whatsapp.label')}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
