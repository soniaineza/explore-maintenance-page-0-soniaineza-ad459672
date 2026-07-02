export default function PlanLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-border/60 bg-background/85" />
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="mb-4 h-4 w-20 shimmer rounded" />
          <div className="mt-2 h-10 w-96 shimmer rounded" />
          <div className="mt-4 h-6 w-160 shimmer rounded" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-10 w-10 shrink-0 shimmer rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 shimmer rounded" />
                  <div className="h-4 w-full shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 shimmer rounded" />
                    <div className="h-9 w-full shimmer rounded" />
                  </div>
                ))}
                <div className="h-11 w-full shimmer rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
