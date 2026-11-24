import { useGet, type ListParams, type Paginated } from '@/utils'
import type { Inventory } from './schema'

const path = '/wms/inventories'

export function useReadInventory(params: ListParams) {
  return useGet<Paginated<Inventory>>(path, params, { keepPrevious: true })
}
