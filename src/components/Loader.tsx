export function Spinner() {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-gold"
      role="status"
      aria-label="Loading"
    />
  )
}

export function CardSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-line/70 bg-surface">
          <div className="aspect-2/3 animate-pulse bg-surface-2" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
            <div className="mt-3 h-8 w-full animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
