import { useGet, useOptions, useSend, type FilterCondition, type ListParams, type Paginated } from '@/utils'
import type { Rack, RackInput } from './schema'

const path = '/wms/racks'

export function useDeleteRack() {
  return useSend<Rack>('delete', (rack) => `${path}/${rack.id}`, [path])
}

export function useLoadRack(id: string | undefined) {
  return useGet<{ data: Rack }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useRackOptions(search: string, enabled: boolean, filters: FilterCondition[] = []) {
  return useOptions(path, 'code', search, enabled, filters)
}

export function useReadRack(params: ListParams) {
  return useGet<Paginated<Rack>>(path, params, { keepPrevious: true })
}

export function useSaveRack(rack: Rack | null) {
  return useSend<RackInput>(rack ? 'put' : 'post', rack ? `${path}/${rack.id}` : path, [path])
}
