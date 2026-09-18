import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'

const links = [
  { to: '/', label: 'Front page', end: true },
  { to: '/movies', label: 'Catalogue', end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `border-b-2 py-1 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'border-accent text-ink'
        : 'border-transparent text-ink-2 hover:border-rule hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <nav aria-label="Main" className="page flex h-14 items-center justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-tight"
        >
          Movie Explorer
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="-mr-2 grid h-10 w-10 place-items-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-rule md:hidden">
          <div className="page flex flex-col py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 font-display text-display-sm font-bold uppercase ${
                    isActive ? 'text-accent' : 'text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
