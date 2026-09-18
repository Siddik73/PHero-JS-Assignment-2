import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import type { Show } from '@/types/show'
import { fetchShows } from '@/lib/tvmaze'
import Hero from '@/components/Hero'
import MovieCard from '@/components/MovieCard'
import MovieGrid from '@/components/MovieGrid'
import MovieModal from '@/components/MovieModal'
import { PosterSkeleton } from '@/components/Loader'

export default function Home() {
  const [featured, setFeatured] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Show | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    fetchShows(0)
      .then((shows) => {
        if (!active) return
        const top = [...shows]
          .filter((s) => s.rating?.average != null)
          .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
          .slice(0, 10)
        setFeatured(top)
      })
      .catch((e: unknown) => active && setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [attempt])

  const retry = () => {
    setLoading(true)
    setError(null)
    setAttempt((n) => n + 1)
  }

  const [lead, ...rest] = featured
  const podium = rest.slice(0, 3)
  const remainder = rest.slice(3)

  return (
    <>
      <Hero lead={lead ?? null} loading={loading} onDetails={setSelected} />

      <section id="top-ten" aria-labelledby="top-ten-title" className="page scroll-mt-20">
        <div className="border-t-2 border-ink pt-6">
          <h2
            id="top-ten-title"
            className="font-display text-display-sm font-extrabold uppercase md:text-display"
          >
            The top ten
          </h2>
          <p className="measure mt-3 text-ink-2">
            Ranked by TVMaze viewer rating across the first 250 shows in its index. Number one is
            up top.
          </p>
        </div>

        <div className="mt-10">
          {loading ? (
            <RankedSkeleton />
          ) : error || featured.length === 0 ? (
            <MovieGrid
              shows={[]}
              loading={false}
              error={error}
              onDetails={setSelected}
              onRetry={retry}
            />
          ) : (
            <>
              <ol start={2} className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
                {podium.map((show, i) => (
                  <li key={show.id} className="grid max-w-[22rem] grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:max-w-none">
                    <Rank n={i + 2} large />
                    <MovieCard show={show} onDetails={setSelected} />
                  </li>
                ))}
              </ol>

              {remainder.length > 0 && (
                <ol
                  start={5}
                  className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 border-t border-rule pt-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6"
                >
                  {remainder.map((show, i) => (
                    <li key={show.id}>
                      <Rank n={i + 5} />
                      <MovieCard show={show} onDetails={setSelected} />
                    </li>
                  ))}
                </ol>
              )}
            </>
          )}
        </div>

        <Link
          to="/movies"
          className="mt-14 inline-flex items-center gap-2 text-sm font-medium underline decoration-rule underline-offset-4 transition-colors duration-150 hover:decoration-accent"
        >
          The full catalogue, with search
          <ArrowRight size={14} weight="bold" aria-hidden="true" />
        </Link>
      </section>

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function Rank({ n, large = false }: { n: number; large?: boolean }) {
  return (
    <span
      className={`block font-display font-extrabold leading-[0.8] text-ink-2 ${
        large ? 'text-[5rem] md:text-display-lg' : 'mb-2 text-display-sm'
      }`}
    >
      <span className="sr-only">Rank </span>
      {n}
    </span>
  )
}

function RankedSkeleton() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading the top ten</span>
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {[0, 1, 2].map((i) => (
          <PosterSkeleton key={i} className="max-w-[22rem] sm:max-w-none" />
        ))}
      </div>
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 border-t border-rule pt-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <PosterSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
