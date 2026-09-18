import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight } from '@phosphor-icons/react'
import type { Show } from '@/types/show'
import MovieCard from './MovieCard'
import { PosterSkeleton } from './Loader'

type Props = {
  lead: Show | null
  loading: boolean
  onDetails: (show: Show) => void
}

export default function Hero({ lead, loading, onDetails }: Props) {
  return (
    <section className="page grid gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
      <div className="lg:col-span-7 lg:self-center">
        <h1 className="font-display text-[3.25rem] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-display md:text-display-lg">
          Every show,
          <br />
          filed and rated.
        </h1>
        <p className="measure mt-6 text-lg text-ink-2">
          Ratings, cast and synopses pulled live from TVMaze. Search by title, or start with the
          ten best-rated below.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to="/movies"
            className="inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-150 ease-film hover:bg-accent hover:text-on-accent active:translate-y-px"
          >
            Search the catalogue
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
          <a
            href="#top-ten"
            className="inline-flex items-center gap-2 text-sm font-medium underline decoration-rule underline-offset-4 transition-colors duration-150 hover:decoration-accent"
          >
            See the top ten
            <ArrowDown size={14} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="lg:col-span-4 lg:col-start-9">
        <p className="index-line mb-3 border-b border-rule pb-2">Highest rated right now</p>
        <div className="grid grid-cols-[auto_minmax(0,17rem)] items-start gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
          <span
            aria-hidden="true"
            className="font-display text-[7rem] font-extrabold leading-[0.75] text-accent md:text-[9rem]"
          >
            1
          </span>
          {lead ? (
            <MovieCard show={lead} onDetails={onDetails} lead eager />
          ) : loading ? (
            <PosterSkeleton />
          ) : (
            <p className="index-line pt-2">The list will be back once TVMaze answers.</p>
          )}
        </div>
      </div>
    </section>
  )
}
