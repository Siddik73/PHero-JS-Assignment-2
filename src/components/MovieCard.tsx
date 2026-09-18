import type { Show } from '@/types/show'
import { getYear } from '@/lib/tvmaze'
import Poster from './Poster'

type Props = {
  show: Show
  onDetails: (show: Show) => void
  lead?: boolean
  eager?: boolean
}

export default function MovieCard({ show, onDetails, lead = false, eager = false }: Props) {
  const rating = show.rating?.average

  return (
    <article className="min-w-0">
      <button
        type="button"
        onClick={() => onDetails(show)}
        aria-label={`${show.name}, open details`}
        className="group block w-full text-left"
      >
        <span className="block transition-transform duration-200 ease-film group-hover:-translate-y-1 group-active:translate-y-0">
          <Poster
            show={show}
            size={lead ? 'original' : 'medium'}
            eager={eager}
            className="shadow-none transition-shadow duration-200 ease-film group-hover:shadow-lift"
          />
        </span>

        <span className="mt-3 block border-t border-rule pt-2">
          <span
            className={`block truncate font-medium leading-snug underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-accent ${
              lead ? 'text-lg md:text-xl' : 'text-[0.9375rem]'
            }`}
          >
            {show.name}
          </span>
          <span className="index-line mt-1 flex items-baseline gap-3">
            <span className="shrink-0">{getYear(show.premiered)}</span>
            <span className="min-w-0 flex-1 truncate">
              {show.genres.slice(0, lead ? 3 : 2).join(', ') || 'Unclassified'}
            </span>
            {rating != null && (
              <span className="shrink-0 font-medium text-accent">{rating.toFixed(1)}</span>
            )}
          </span>
        </span>
      </button>
    </article>
  )
}
