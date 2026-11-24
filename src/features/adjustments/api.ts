import { useGet, useSend, type ListParams, type Paginated } from '@/utils'
import type { Adjustment, AdjustmentPayload } from './schema'

const path = '/wms/adjustments'

export function useCancelAdjustment(id: number) {
  return useSend('post', `${path}/${id}/cancel`, [path, `${path}/${id}`, '/wms/inventories', '/wms/movements'])
}

export function useLoadAdjustment(id: string | undefined) {
  return useGet<{ data: Adjustment }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadAdjustment(params: ListParams) {
  return useGet<Paginated<Adjustment>>(path, params, { keepPrevious: true })
}

export function useSaveAdjustment() {
  return useSend<AdjustmentPayload>('post', path, [path, '/wms/inventories', '/wms/movements'])
}
