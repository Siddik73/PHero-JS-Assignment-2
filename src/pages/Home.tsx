import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Show } from '@/types/show'
import { fetchShows } from '@/lib/tvmaze'
import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'
import MovieModal from '@/components/MovieModal'

export default function Home() {
  const [featured, setFeatured] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Show | null>(null)

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
  }, [])

  return (
    <>
      <Hero />

      <section id="featured" className="container-px py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Featured Titles</h2>
            <p className="mt-1 text-sm text-muted">Top-rated picks to get you started.</p>
          </div>
          <Link
            to="/movies"
            className="hidden shrink-0 text-sm font-semibold text-gold hover:underline sm:block"
          >
            View all →
          </Link>
        </div>

        <MovieGrid shows={featured} loading={loading} error={error} onDetails={setSelected} />

        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/movies"
            className="inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink"
          >
            Browse all movies
          </Link>
        </div>
      </section>

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </>
  )
}
