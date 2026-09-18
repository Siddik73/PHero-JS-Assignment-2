import type { ReactNode } from 'react'
import type { Show } from '@/types/show'
import MovieCard from './MovieCard'
import { CardSkeletonGrid } from './Loader'

type Props = {
  shows: Show[]
  loading: boolean
  error: string | null
  onDetails: (show: Show) => void
  onRetry?: () => void
  empty?: ReactNode
}

export default function MovieGrid({ shows, loading, error, onDetails, onRetry, empty }: Props) {
  if (loading) return <CardSkeletonGrid />

  if (error) {
    return (
      <div role="alert" className="border-t-2 border-accent pt-6">
        <p className="font-display text-display-sm font-bold uppercase">The reel snapped.</p>
        <p className="measure mt-3 text-ink-2">
          TVMaze didn't answer. It's usually a dropped connection, and trying again tends to work.
        </p>
        <p className="index-line mt-2">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent hover:text-on-accent active:translate-y-px"
          >
            Try again
          </button>
        )}
      </div>
    )
  }

  if (shows.length === 0) {
    return (
      <div className="border-t border-rule pt-6">
        {empty ?? (
          <>
            <p className="font-display text-display-sm font-bold uppercase">Nothing on file.</p>
            <p className="measure mt-3 text-ink-2">There are no shows to list right now.</p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="grid-catalogue">
      {shows.map((show, i) => (
        <div key={show.id} className={i === 0 ? 'lead-cell' : ''}>
          <MovieCard show={show} onDetails={onDetails} lead={i === 0} eager={i < 6} />
        </div>
      ))}
    </div>
  )
}
