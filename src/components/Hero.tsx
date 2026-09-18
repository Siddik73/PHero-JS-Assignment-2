import { Link } from 'react-router-dom'
import { PlayIcon } from './icons'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-ink via-ink-2 to-ink" />
      <div className="absolute -top-32 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-2/20 blur-[120px]" />

      <div className="container-px flex flex-col items-center py-24 text-center md:py-32">
        <span className="animate-fade-in mb-5 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted">
          🎬 Thousands of shows · Powered by TVMaze
        </span>

        <h1 className="animate-fade-up font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Discover <span className="bg-linear-to-r from-gold to-brand-2 bg-clip-text text-transparent">Movies</span>
          <br className="hidden sm:block" /> From Around the World
        </h1>

        <p className="animate-fade-up mt-6 max-w-2xl text-base text-muted sm:text-lg">
          Browse, search, and explore detailed information about your favorite titles.
          Ratings, genres, cast and more, all in one clean and fast experience.
        </p>

        <div className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            <PlayIcon className="h-4 w-4" />
            Explore Now
          </Link>
          <a
            href="#featured"
            className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-text transition-colors hover:border-gold hover:text-gold"
          >
            See Featured
          </a>
        </div>
      </div>
    </section>
  )
}
