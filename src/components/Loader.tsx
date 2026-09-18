// Placeholders share the exact geometry of what they stand in for,
// so nothing jumps when the real posters land.

export function PosterSkeleton({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`block ${className}`}>
      <span className="block aspect-2/3 animate-breathe bg-paper-2" />
      <span className="mt-3 block border-t border-rule pt-2">
        <span className="block h-4 w-3/4 animate-breathe bg-paper-2" />
        <span className="mt-2 block h-3 w-1/2 animate-breathe bg-paper-2" />
      </span>
    </span>
  )
}

export function LineSkeleton({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`block h-3 animate-breathe bg-paper-2 ${className}`} />
}

export function CardSkeletonGrid({ count = 12, lead = true }: { count?: number; lead?: boolean }) {
  return (
    <div role="status" aria-live="polite" className="grid-catalogue">
      <span className="sr-only">Loading shows</span>
      {Array.from({ length: count }).map((_, i) => (
        <PosterSkeleton key={i} className={lead && i === 0 ? 'lead-cell' : ''} />
      ))}
    </div>
  )
}
