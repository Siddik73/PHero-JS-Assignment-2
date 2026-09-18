import { Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'

export default function NotFound() {
  return (
    <section className="page grid gap-8 pt-16 md:grid-cols-12 md:pt-24">
      <p
        aria-hidden="true"
        className="font-display text-[9rem] font-extrabold leading-[0.8] text-accent md:col-span-5 md:text-[14rem]"
      >
        404
      </p>
      <div className="md:col-span-6 md:col-start-7 md:self-end">
        <h1 className="font-display text-display-sm font-extrabold uppercase md:text-display">
          Nothing is filed here.
        </h1>
        <p className="measure mt-4 text-ink-2">
          The address may be mistyped, or the page has moved. The front page has the ten
          best-rated shows.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent hover:text-on-accent active:translate-y-px"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          Back to the front page
        </Link>
      </div>
    </section>
  )
}
