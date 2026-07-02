export default function ToursLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-border/60 bg-background/85" />
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="mb-4 h-4 w-20 shimmer rounded" />
          <div className="mt-2 h-10 w-80 shimmer rounded" />
          <div className="mt-4 h-6 w-160 shimmer rounded" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-24 shimmer rounded-full" />
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border">
              <div className="aspect-[4/3] shimmer" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 shimmer rounded" />
                <div className="h-4 w-full shimmer rounded" />
                <div className="h-10 w-full shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
