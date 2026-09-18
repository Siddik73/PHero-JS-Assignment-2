import { MagnifyingGlass, X } from '@phosphor-icons/react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="title-search" className="text-sm font-medium">
        Search by title
      </label>
      <div className="relative">
        <MagnifyingGlass
          size={22}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ink-2"
        />
        <input
          id="title-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Try The Wire, Fleabag, Dark"
          autoComplete="off"
          spellCheck={false}
          className="w-full border-b-2 border-ink bg-transparent py-3 pl-9 pr-10 text-xl text-ink outline-none transition-colors duration-150 placeholder:text-muted focus-visible:border-accent focus-visible:outline-none md:text-2xl [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-0 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-ink-2 transition-colors duration-150 hover:text-accent"
          >
            <X size={20} weight="bold" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
