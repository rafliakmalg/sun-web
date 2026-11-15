import type { FilterCondition } from '@/lib/filters'

export type Paginated<T> = {
  data: T[]
  meta: {
    current_page: number
    from: number | null
    last_page: number
    per_page: number
    to: number | null
    total: number
  }
}

export type ApiError = {
  message?: string
  errors?: Record<string, string[]>
}

export type SortDir = 'asc' | 'desc'

export type ListParams = {
  page: number
  per_page: number
  search: string
  sort_by: string
  sort_dir: SortDir
  filters: FilterCondition[]
}
