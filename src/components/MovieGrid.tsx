import type { Show } from '@/types/show'
import MovieCard from './MovieCard'
import { CardSkeletonGrid } from './Loader'

type Props = {
  shows: Show[]
  loading: boolean
  error: string | null
  onDetails: (show: Show) => void
}

export default function MovieGrid({ shows, loading, error, onDetails }: Props) {
  if (loading) return <CardSkeletonGrid />

  if (error) {
    return (
      <div className="rounded-2xl border border-line/70 bg-surface p-10 text-center">
        <p className="text-lg font-semibold">Something went wrong</p>
        <p className="mt-1 text-sm text-muted">{error}</p>
      </div>
    )
  }

  if (shows.length === 0) {
    return (
      <div className="rounded-2xl border border-line/70 bg-surface p-12 text-center">
        <p className="text-4xl">🎬</p>
        <p className="mt-3 text-lg font-semibold">No movies found</p>
        <p className="mt-1 text-sm text-muted">Try a different title or clear the search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {shows.map((show) => (
        <MovieCard key={show.id} show={show} onDetails={onDetails} />
      ))}
    </div>
  )
}
