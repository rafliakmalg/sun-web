import { useGet, useSend } from '@/lib/request'
import type { ListParams, Paginated } from '@/lib/types'
import type { User, UserPayload } from './schema'

const path = '/users'

export function useDeleteUser() {
  return useSend<User>('delete', (user) => `${path}/${user.id}`, [path])
}

export function useLoadUser(id: string | undefined) {
  return useGet<{ data: User }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadUser(params: ListParams) {
  return useGet<Paginated<User>>(path, params, { keepPrevious: true })
}

export function useSaveUser(user: User | null) {
  return useSend<UserPayload>(user ? 'put' : 'post', user ? `${path}/${user.id}` : path, [path])
}
