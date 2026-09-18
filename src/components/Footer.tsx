import { GithubIcon, LinkedinIcon } from './icons'
import { SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line/70 bg-ink-2">
      <div className="container-px flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold">
            Movie<span className="text-gold">Explorer</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            © {SITE.year} {SITE.brand}. Built by {SITE.author}.
          </p>
          <p className="mt-1 text-xs text-muted">
            Data provided by{' '}
            <a
              href="https://www.tvmaze.com/api"
              target="_blank"
              rel="noreferrer"
              className="text-gold/90 hover:underline"
            >
              TVMaze API
            </a>
            .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
