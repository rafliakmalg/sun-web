import { useGet, useOptions, useSend, type ListParams, type Paginated } from '@/utils'
import type { Category, CategoryInput } from './schema'

const path = '/wms/categories'

export function useCategoryOptions(search: string, enabled: boolean) {
  return useOptions(path, 'name', search, enabled)
}

export function useDeleteCategory() {
  return useSend<Category>('delete', (category) => `${path}/${category.id}`, [path])
}

export function useLoadCategory(id: string | undefined) {
  return useGet<{ data: Category }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadCategory(params: ListParams) {
  return useGet<Paginated<Category>>(path, params, { keepPrevious: true })
}

export function useSaveCategory(category: Category | null) {
  return useSend<CategoryInput>(category ? 'put' : 'post', category ? `${path}/${category.id}` : path, [path])
}
