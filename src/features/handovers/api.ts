import { useGet, useSend, type ListParams, type Paginated } from '@/utils'
import type { Handover, HandoverActionPayload, HandoverPayload } from './schema'

const path = '/handovers'

function refresh(id: number) {
  return [path, `${path}/${id}`, '/inventories', '/movements']
}

export function useCancelHandover(id: number) {
  return useSend<HandoverActionPayload>('post', `${path}/${id}/cancel`, refresh(id))
}

export function useCompleteHandover(id: number) {
  return useSend<HandoverActionPayload>('post', `${path}/${id}/complete`, refresh(id))
}

export function useLoadHandover(id: string | undefined) {
  return useGet<{ data: Handover }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadHandover(params: ListParams) {
  return useGet<Paginated<Handover>>(path, params, { keepPrevious: true })
}

export function useSaveHandover() {
  return useSend<HandoverPayload>('post', path, [path, '/inventories', '/movements'])
}

export function useTransferHandover(id: number) {
  return useSend<HandoverActionPayload>('post', `${path}/${id}/transfer`, refresh(id))
}
