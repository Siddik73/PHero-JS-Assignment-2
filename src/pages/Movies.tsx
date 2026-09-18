import { useEffect, useState } from 'react'
import type { Show } from '@/types/show'
import { fetchShows, searchShows } from '@/lib/tvmaze'
import { useDebounce } from '@/hooks/useDebounce'
import SearchBar from '@/components/SearchBar'
import MovieGrid from '@/components/MovieGrid'
import MovieModal from '@/components/MovieModal'

type SearchState = {
  query: string
  shows: Show[]
  error: string | null
}

export default function Movies() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  const [defaultShows, setDefaultShows] = useState<Show[]>([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)
  const [search, setSearch] = useState<SearchState | null>(null)
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
  }, [])

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) return

    let active = true
    searchShows(q)
      .then((shows) => active && setSearch({ query: q, shows, error: null }))
      .catch(
        (e: unknown) =>
          active &&
          setSearch({
            query: q,
            shows: [],
            error: e instanceof Error ? e.message : 'Search failed',
          }),
      )
    return () => {
      active = false
    }
  }, [debouncedQuery])

  const term = debouncedQuery.trim()
  const isSearching = term.length > 0
  const searchDone = search?.query === term

  const shows = isSearching ? (searchDone ? search.shows : []) : defaultShows
  const loading = isSearching ? !searchDone : listLoading
  const error = isSearching ? (searchDone ? search.error : null) : listError

  return (
    <section className="container-px py-12">
      <div className="mb-3 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Movie Listing</h1>
        <p className="mt-2 text-sm text-muted">
          Browse the catalogue or search for a specific title.
        </p>
      </div>

      <div className="mb-10 mt-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {isSearching && !loading && !error && (
        <p className="mb-6 text-sm text-muted">
          {shows.length} result{shows.length === 1 ? '' : 's'} for “{term}”
        </p>
      )}

      <MovieGrid shows={shows} loading={loading} error={error} onDetails={setSelected} />

      <MovieModal show={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
