import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from '@phosphor-icons/react'
import type { Show } from '@/types/show'
import { getShowById, stripHtml } from '@/lib/tvmaze'
import Poster from './Poster'
import { LineSkeleton } from './Loader'

type Props = {
  show: Show | null
  onClose: () => void
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function formatDate(date: string | null): string {
  if (!date) return 'Undated'
  const d = new Date(`${date}T00:00:00`)
  return Number.isNaN(d.getTime()) ? date : dateFormat.format(d)
}

export default function MovieModal({ show, onClose }: Props) {
  const [details, setDetails] = useState<Show | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

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

  // Move focus into the sheet on open, hand it back to the card on close.
  useEffect(() => {
    if (!show) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => previouslyFocused?.focus()
  }, [show])

  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Keep Tab inside the sheet while it is open.
      if (e.key === 'Tab' && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>('a[href], button')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
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
  const rating = data.rating?.average
  const cast = data._embedded?.cast?.slice(0, 8) ?? []
  const channel = data.network?.name ?? data.webChannel?.name
  const runtime = data.runtime ?? data.averageRuntime
  const summary = stripHtml(data.summary)

  return (
    <div
      className="fixed inset-0 z-50 flex animate-scrim-in items-start justify-center overflow-y-auto bg-scrim sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="sheet-scroll relative w-full max-w-4xl animate-sheet-in bg-paper shadow-lift sm:max-h-[90dvh] sm:overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-0 top-0 z-10 grid h-12 w-12 place-items-center bg-paper text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
        >
          <X size={22} weight="bold" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-5 gap-y-8 p-5 pt-6 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-x-10 sm:p-10">
          <div className="sm:row-span-2">
            <Poster show={data} size="original" eager />
          </div>

          <header className="min-w-0 pr-10 sm:pr-8">
            <h2
              id="sheet-title"
              className="font-display text-[2.25rem] font-extrabold uppercase leading-[0.92] wrap-break-word sm:text-display"
            >
              {data.name}
            </h2>
            <p className="mt-3 text-ink-2">
              {data.genres.length > 0 ? data.genres.join(', ') : 'Genre not listed'}
            </p>
            {rating != null && (
              <p className="mt-4 flex items-baseline gap-2 sm:mt-6">
                <span className="font-display text-display-sm font-extrabold leading-none text-accent sm:text-display">
                  {rating.toFixed(1)}
                </span>
                <span className="index-line">TVMaze rating, out of 10</span>
              </p>
            )}
          </header>

          <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
            <p className="measure leading-relaxed">
              {summary || 'TVMaze has no synopsis on file for this one.'}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-rule md:grid-cols-3">
              <Meta label="Premiered" value={formatDate(data.premiered)} />
              <Meta label="Status" value={data.status || 'Unknown'} />
              <Meta label="Language" value={data.language ?? 'Unknown'} />
              <Meta label="Network" value={channel ?? 'Unknown'} />
              <Meta label="Runtime" value={runtime != null ? `${runtime} min` : 'Varies'} />
            </dl>

            <section aria-labelledby="cast-title" className="mt-8">
              <h3 id="cast-title" className="text-sm font-semibold">
                Cast
              </h3>
              {loading && cast.length === 0 ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2" role="status">
                  <span className="sr-only">Loading cast</span>
                  {[0, 1, 2, 3].map((i) => (
                    <LineSkeleton key={i} className={i % 2 ? 'w-2/3' : 'w-5/6'} />
                  ))}
                </div>
              ) : cast.length > 0 ? (
                <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {cast.map((c) => (
                    <li key={`${c.person.id}-${c.character.id}`} className="min-w-0 text-sm">
                      <span className="font-medium">{c.person.name}</span>
                      <span className="text-muted"> as {c.character.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted">No cast listed.</p>
              )}
            </section>

            {data.officialSite && (
              <a
                href={data.officialSite}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent hover:text-on-accent active:translate-y-px"
              >
                Official site
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-rule py-3">
      <dt className="index-line">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
    </div>
  )
}
