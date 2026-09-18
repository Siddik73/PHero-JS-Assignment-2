import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { SITE } from '@/lib/site'

const linkClass =
  'inline-flex items-center gap-2 text-sm text-ink-2 underline decoration-rule underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-accent'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="page grid gap-8 py-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-display text-display-sm font-extrabold uppercase">Movie Explorer</p>
          <p className="measure mt-3 text-sm text-ink-2">
            Built by {SITE.author}, {SITE.year}. Show data comes from the{' '}
            <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer" className={linkClass}>
              TVMaze API
            </a>{' '}
            under CC BY-SA.
          </p>
        </div>

        <ul className="flex gap-6 md:col-span-5 md:justify-end">
          <li>
            <a href={SITE.github} target="_blank" rel="noreferrer" className={linkClass}>
              <GithubLogo size={18} aria-hidden="true" />
              GitHub
            </a>
          </li>
          <li>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
              <LinkedinLogo size={18} aria-hidden="true" />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
