import { useGet, useOptions, useSend, type FilterCondition, type ListParams, type Paginated } from '@/utils'
import type { Warehouse, WarehouseInput } from './schema'

const path = '/wms/warehouses'

export function useDeleteWarehouse() {
  return useSend<Warehouse>('delete', (warehouse) => `${path}/${warehouse.id}`, [path])
}

export function useLoadWarehouse(id: string | undefined) {
  return useGet<{ data: Warehouse }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadWarehouse(params: ListParams) {
  return useGet<Paginated<Warehouse>>(path, params, { keepPrevious: true })
}

export function useSaveWarehouse(warehouse: Warehouse | null) {
  return useSend<WarehouseInput>(
    warehouse ? 'put' : 'post',
    warehouse ? `${path}/${warehouse.id}` : path,
    [path],
  )
}

export function useWarehouseOptions(search: string, enabled: boolean, filters: FilterCondition[] = []) {
  return useOptions(path, 'name', search, enabled, filters)
}
