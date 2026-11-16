import { useGet, useOptions, useSend, type ListParams, type Paginated } from '@/utils'
import type { Unit, UnitInput } from './schema'

const path = '/units'

export function useDeleteUnit() {
  return useSend<Unit>('delete', (unit) => `${path}/${unit.id}`, [path])
}

export function useLoadUnit(id: string | undefined) {
  return useGet<{ data: Unit }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadUnit(params: ListParams) {
  return useGet<Paginated<Unit>>(path, params, { keepPrevious: true })
}

export function useSaveUnit(unit: Unit | null) {
  return useSend<UnitInput>(unit ? 'put' : 'post', unit ? `${path}/${unit.id}` : path, [path])
}

export function useUnitOptions(search: string, enabled: boolean) {
  return useOptions(path, 'name', search, enabled)
}
