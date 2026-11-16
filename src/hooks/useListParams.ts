import qs from 'qs'
import { useSearchParams } from 'react-router'
import { filtersSchema, type ListParams, type SortDir } from '@/utils'

export function useListParams(defSort: string, defPerPage = 10, defSortDir: SortDir = 'asc') {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = qs.parse(searchParams.toString())
  const filters = filtersSchema.safeParse(query.filters)

  const params: ListParams = {
    page: Math.max(1, Number(query.page) || 1),
    per_page: Math.min(100, Math.max(1, Number(query.per_page) || defPerPage)),
    search: typeof query.search === 'string' ? query.search : '',
    sort_by: typeof query.sort_by === 'string' ? query.sort_by : defSort,
    sort_dir: query.sort_dir === 'asc' || query.sort_dir === 'desc' ? query.sort_dir : defSortDir,
    filters: filters.success ? filters.data : [],
  }

  function update(changes: Partial<ListParams>) {
    const next = {
      ...params,
      page: 1,
      ...changes,
    }

    setSearchParams(
      qs.stringify(
        {
          page: next.page > 1 ? next.page : undefined,
          per_page: next.per_page !== defPerPage ? next.per_page : undefined,
          search: next.search || undefined,
          sort_by: next.sort_by !== defSort ? next.sort_by : undefined,
          sort_dir: next.sort_dir !== defSortDir ? next.sort_dir : undefined,
          filters: next.filters,
        },
        {
          arrayFormat: 'indices',
          encodeValuesOnly: true,
        },
      ),
    )
  }

  return { params, update }
}
