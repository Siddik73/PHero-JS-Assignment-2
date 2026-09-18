import type { SearchResult, Show } from '@/types/show'

const BASE_URL = 'https://api.tvmaze.com'

export async function fetchShows(page = 0): Promise<Show[]> {
  const res = await fetch(`${BASE_URL}/shows?page=${page}`)
  if (!res.ok) throw new Error(`Failed to load shows (${res.status})`)
  return (await res.json()) as Show[]
}

export async function searchShows(query: string): Promise<Show[]> {
  const q = query.trim()
  if (!q) return []
  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error(`Search failed (${res.status})`)
  const data = (await res.json()) as SearchResult[]
  return data.map((r) => r.show)
}

export async function getShowById(id: number): Promise<Show> {
  const res = await fetch(`${BASE_URL}/shows/${id}?embed=cast`)
  if (!res.ok) throw new Error(`Failed to load show ${id} (${res.status})`)
  return (await res.json()) as Show
}

export function stripHtml(html: string | null): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export function getYear(date: string | null): string {
  // "n.d." is the archivist's mark for an undated item.
  return date ? date.slice(0, 4) : 'n.d.'
}
