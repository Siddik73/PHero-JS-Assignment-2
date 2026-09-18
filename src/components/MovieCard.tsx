import type { Show } from '@/types/show'
import { getYear, POSTER_FALLBACK } from '@/lib/tvmaze'
import { StarIcon } from './icons'

type Props = {
  show: Show
  onDetails: (show: Show) => void
}

export default function MovieCard({ show, onDetails }: Props) {
  const poster = show.image?.medium ?? POSTER_FALLBACK
  const rating = show.rating?.average

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl hover:shadow-brand/10">
      <div className="relative aspect-2/3 overflow-hidden bg-surface-2">
        <img
          src={poster}
          alt={show.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {rating != null && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-gold backdrop-blur">
            <StarIcon className="h-3.5 w-3.5" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-semibold leading-snug" title={show.name}>
          {show.name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {getYear(show.premiered)}
          {show.genres.length > 0 && <> · {show.genres.slice(0, 2).join(', ')}</>}
        </p>

        <button
          onClick={() => onDetails(show)}
          className="mt-4 w-full rounded-lg border border-line py-2 text-sm font-medium text-text transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          See Details
        </button>
      </div>
    </article>
  )
}
