import type { OptionResult } from '@/lib/fields'
import { useGet } from '@/lib/request'
import type { Paginated } from '@/lib/types'

export function useOptions(path: string, labelKey: string, search: string, enabled: boolean): OptionResult {
  const { data, isFetching } = useGet<Paginated<{ id: number } & Record<string, unknown>>>(
    path,
    {
      per_page: 100,
      search,
      sort_by: labelKey,
    },
    { enabled, keepPrevious: true },
  )

  return {
    options: (data?.data ?? []).map((item) => ({ value: String(item.id), label: String(item[labelKey]) })),
    loading: enabled && isFetching,
  }
}
