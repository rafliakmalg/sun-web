import { useGet, useOptions, useSend, type ListParams, type Paginated } from '@/utils'
import type { Product, ProductInput } from './schema'

const path = '/products'

export function useDeleteProduct() {
  return useSend<Product>('delete', (product) => `${path}/${product.id}`, [path])
}

export function useLoadProduct(id: string | undefined) {
  return useGet<{ data: Product }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useProductOptions(search: string, enabled: boolean) {
  return useOptions(path, 'name', search, enabled)
}

export function useReadProduct(params: ListParams) {
  return useGet<Paginated<Product>>(path, params, { keepPrevious: true })
}

export function useSaveProduct(product: Product | null) {
  return useSend<ProductInput>(product ? 'put' : 'post', product ? `${path}/${product.id}` : path, [path])
}
