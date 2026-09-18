import { SearchIcon, CloseIcon } from './icons'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie by title..."
        className="w-full rounded-full border border-line bg-surface py-3.5 pl-12 pr-12 text-text placeholder:text-muted outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-gold"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
