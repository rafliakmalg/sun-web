import { useGet, useSend } from '@/lib/request'
import type { ListParams, Paginated } from '@/lib/types'
import type { Product, ProductInput } from './schema'

const path = '/products'

export function useDeleteProduct() {
  return useSend<Product>('delete', (product) => `${path}/${product.id}`, [path])
}

export function useLoadProduct(id: string | undefined) {
  return useGet<{ data: Product }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadProduct(params: ListParams) {
  return useGet<Paginated<Product>>(path, params, { keepPrevious: true })
}

export function useSaveProduct(product: Product | null) {
  return useSend<ProductInput>(product ? 'put' : 'post', product ? `${path}/${product.id}` : path, [path])
}
