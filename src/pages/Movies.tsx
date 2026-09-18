import { useEffect, useMemo, useState } from 'react'
import type { Show } from '@/types/show'
import { fetchShows, searchShows } from '@/lib/tvmaze'
import { useDebounce } from '@/hooks/useDebounce'
import SearchBar from '@/components/SearchBar'
import MovieGrid from '@/components/MovieGrid'
import MovieModal from '@/components/MovieModal'

type SearchState = { q: string; attempt: number; shows: Show[]; error: string | null }

export default function Movies() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  const [defaultShows, setDefaultShows] = useState<Show[]>([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)
  const [listAttempt, setListAttempt] = useState(0)
  // Search results remember which query and attempt they answer, so loading is derived, not set.
  const [search, setSearch] = useState<SearchState | null>(null)
  const [searchAttempt, setSearchAttempt] = useState(0)
  const [selected, setSelected] = useState<Show | null>(null)

  useEffect(() => {
    let active = true
    fetchShows(0)
      .then((shows) => {
        if (!active) return
        const sorted = [...shows].sort(
          (a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0),
        )
        setDefaultShows(sorted.slice(0, 48))
      })
      .catch((e: unknown) => active && setListError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => active && setListLoading(false))
    return () => {
      active = false
    }
  }, [listAttempt])

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) return

    let active = true
    searchShows(q)
      .then((shows) => active && setSearch({ q, attempt: searchAttempt, shows, error: null }))
      .catch(
        (e: unknown) =>
          active &&
          setSearch({
            q,
            attempt: searchAttempt,
            shows: [],
            error: e instanceof Error ? e.message : 'Search failed',
          }),
      )
    return () => {
      active = false
    }
  }, [debouncedQuery, searchAttempt])

  const term = debouncedQuery.trim()
  const isSearching = term.length > 0
  const searchPending = isSearching && (search?.q !== term || search.attempt !== searchAttempt)

  const loading = isSearching ? searchPending : listLoading
  const error = isSearching ? (searchPending ? null : (search?.error ?? null)) : listError
  const shows = useMemo(
    () => (isSearching ? (search?.shows ?? []) : defaultShows),
    [isSearching, search, defaultShows],
  )

  const retry = () => {
    if (isSearching) {
      setSearchAttempt((n) => n + 1)
    } else {
      setListLoading(true)
      setListError(null)
      setListAttempt((n) => n + 1)
    }
  }


  return (
    <section className="page pt-10 md:pt-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <h1 className="font-display text-display font-extrabold uppercase md:text-display-lg lg:col-span-5">
          The catalogue
        </h1>
        <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      <p className="index-line mb-8 mt-12 border-t border-rule pt-3" aria-live="polite">
        {loading
          ? isSearching
            ? `Looking for “${term}”`
            : 'Pulling the index'
          : error
            ? 'Nothing loaded'
            : isSearching
              ? `${shows.length} ${shows.length === 1 ? 'match' : 'matches'} for “${term}”, best match first`
              : `The ${shows.length} best-rated shows, highest first. Search covers all of TVMaze.`}
      </p>

      <MovieGrid
        shows={shows}
        loading={loading}
        error={error}
        onDetails={setSelected}
        onRetry={retry}
        empty={
          isSearching ? (
            <>
              <p className="font-display text-display-sm font-bold uppercase wrap-anywhere">
                Nothing filed under &ldquo;{term}&rdquo;.
              </p>
              <p className="measure mt-3 text-ink-2">
                Check the spelling, or try the original-language title. Search looks at show names
                only, not actors or plots.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-6 bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent hover:text-on-accent active:translate-y-px"
              >
                Clear the search
              </button>
            </>
          ) : undefined
        }
      />

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
