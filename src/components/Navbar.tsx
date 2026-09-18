import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FilmIcon } from './icons'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies', end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-gold' : 'text-muted hover:text-text'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <nav className="container-px flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-brand to-brand-2 text-white">
            <FilmIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Movie<span className="text-gold">Explorer</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/movies"
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            Browse Movies
          </Link>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-text transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-text transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-text transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/70 bg-ink-2 md:hidden">
          <div className="container-px flex flex-col gap-4 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/movies"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gold px-5 py-2 text-center text-sm font-semibold text-ink"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
