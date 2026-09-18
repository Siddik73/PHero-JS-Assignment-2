import { useEffect, useState } from 'react'
import type { Show } from '@/types/show'
import { getShowById, getYear, POSTER_FALLBACK, stripHtml } from '@/lib/tvmaze'
import { CloseIcon, StarIcon } from './icons'
import { Spinner } from './Loader'

type Props = {
  show: Show | null
  onClose: () => void
}

export default function MovieModal({ show, onClose }: Props) {
  const [details, setDetails] = useState<Show | null>(null)

  useEffect(() => {
    if (!show) return
    let active = true
    getShowById(show.id)
      .then((d) => active && setDetails(d))
      .catch(() => active && setDetails(show))
    return () => {
      active = false
    }
  }, [show])

  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [show, onClose])

  if (!show) return null

  const enriched = details && details.id === show.id ? details : null
  const data = enriched ?? show
  const loading = !enriched
  const poster = data.image?.original ?? data.image?.medium ?? POSTER_FALLBACK
  const rating = data.rating?.average
  const cast = data._embedded?.cast?.slice(0, 6) ?? []
  const channel = data.network?.name ?? data.webChannel?.name

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${data.name} details`}
    >
      <div
        className="animate-fade-up scroll-thin relative my-4 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-text backdrop-blur transition-colors hover:bg-gold hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="relative h-48 w-full overflow-hidden sm:h-60">
          <img src={poster} alt="" className="h-full w-full object-cover object-top blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/70 to-transparent" />
        </div>

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-24 flex flex-col gap-5 sm:flex-row">
            <img
              src={data.image?.medium ?? POSTER_FALLBACK}
              alt={data.name}
              className="h-56 w-40 shrink-0 self-center rounded-xl border border-line object-cover shadow-lg sm:self-start"
            />
            <div className="pt-2 sm:pt-24">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{data.name}</h2>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                {rating != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 font-semibold text-gold">
                    <StarIcon className="h-4 w-4" />
                    {rating.toFixed(1)}
                  </span>
                )}
                <span className="text-muted">Released: {data.premiered ?? 'N/A'}</span>
                {data.status && (
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {data.status}
                  </span>
                )}
              </div>

              {data.genres.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.genres.map((g) => (
                    <span
                      key={g}
                      className="rounded-full bg-surface-2 px-3 py-1 text-xs text-text"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Overview</h3>
            <p className="mt-2 leading-relaxed text-text/90">
              {stripHtml(data.summary) || 'No overview available for this title.'}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <Meta label="Premiered" value={getYear(data.premiered)} />
            <Meta label="Language" value={data.language ?? 'N/A'} />
            <Meta label="Network" value={channel ?? 'N/A'} />
            {data.runtime != null && <Meta label="Runtime" value={`${data.runtime} min`} />}
          </div>

          {loading && cast.length === 0 && (
            <div className="mt-6 flex justify-center">
              <Spinner />
            </div>
          )}
          {cast.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Cast</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {cast.map((c) => (
                  <span
                    key={c.person.id}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs"
                  >
                    <span className="text-text">{c.person.name}</span>
                    <span className="text-muted"> as {c.character.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.officialSite && (
            <a
              href={data.officialSite}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              Visit Official Site
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line/70 bg-ink-2 px-3 py-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  )
}
