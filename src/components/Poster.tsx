import { useState } from 'react'
import type { Show } from '@/types/show'

type Props = {
  show: Show
  size?: 'medium' | 'original'
  className?: string
  eager?: boolean
}

// A poster, or, when TVMaze has none on file, a typeset stand-in card.
export default function Poster({ show, size = 'medium', className = '', eager = false }: Props) {
  const [failed, setFailed] = useState(false)
  const src = size === 'original' ? (show.image?.original ?? show.image?.medium) : show.image?.medium

  if (!src || failed) {
    return (
      <span
        className={`flex aspect-2/3 flex-col justify-between border border-rule bg-paper-2 p-3 ${className}`}
        role="img"
        aria-label={`${show.name} (no poster on file)`}
      >
        <span className="font-display text-display-sm font-bold uppercase text-ink-2 wrap-anywhere">
          {show.name}
        </span>
        <span className="index-line">No poster on file</span>
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={`Poster for ${show.name}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`block aspect-2/3 w-full bg-paper-2 object-cover ${className}`}
    />
  )
}
