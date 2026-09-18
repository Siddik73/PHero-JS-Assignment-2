export interface ShowImage {
  medium: string
  original: string
}

export interface CastMember {
  person: { id: number; name: string }
  character: { id: number; name: string }
}

export interface Show {
  id: number
  name: string
  genres: string[]
  status: string
  premiered: string | null
  ended: string | null
  runtime: number | null
  averageRuntime: number | null
  officialSite: string | null
  language: string | null
  rating: { average: number | null }
  network: { name: string; country?: { name: string } } | null
  webChannel: { name: string } | null
  image: ShowImage | null
  summary: string | null
  _embedded?: {
    cast?: CastMember[]
  }
}

export interface SearchResult {
  score: number
  show: Show
}
