import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-px flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-extrabold text-gold">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
      >
        Back to Home
      </Link>
    </section>
  )
}
