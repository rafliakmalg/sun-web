import { useGet, useSend, type ListParams, type Paginated } from '@/utils'
import type { Movement, MovementPayload } from './schema'

const path = '/movements'

export function useReadMovement(params: ListParams) {
  return useGet<Paginated<Movement>>(path, params, { keepPrevious: true })
}

export function useSaveMovement() {
  return useSend<MovementPayload>('post', path, [path, '/inventories'])
}
