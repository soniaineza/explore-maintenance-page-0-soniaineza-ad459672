import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/i18n"
import { WhatsAppButton } from "@/components/whatsapp-button"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TruRwanda | Explore the Land of a Thousand Hills",
  description:
    "Discover Rwanda through curated tours and destinations — gorilla trekking, Big Five safaris, rainforest adventures and lakeside escapes.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#1f3d2b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TranslationProvider>
            {children}
            <WhatsAppButton />
          </TranslationProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
