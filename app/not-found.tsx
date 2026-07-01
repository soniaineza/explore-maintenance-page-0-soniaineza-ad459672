import Link from "next/link"
import { ArrowLeft, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mountain className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-heading text-6xl font-semibold text-foreground">
            404
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            This page is off the map.
          </p>
          <Button size="lg" className="mt-8" render={<Link href="/" />}>
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
