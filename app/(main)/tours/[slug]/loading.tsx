export default function TourDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b border-border/60 bg-background/85" />
      <div className="relative min-h-[60vh] bg-secondary/40">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 w-1/3 shimmer rounded" />
            <div className="h-4 w-full shimmer rounded" />
            <div className="h-4 w-5/6 shimmer rounded" />
            <div className="h-4 w-3/4 shimmer rounded" />
            <div className="mt-8 h-6 w-1/4 shimmer rounded" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-full shimmer rounded" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border p-6 space-y-4">
              <div className="h-4 w-20 shimmer rounded" />
              <div className="h-8 w-32 shimmer rounded" />
              <div className="h-4 w-24 shimmer rounded" />
              <div className="h-10 w-full shimmer rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
