import { useGet, useOptions, useSend, type ListParams, type Paginated } from '@/utils'
import type { Role, RoleInput } from './schema'

const path = '/roles'

export function useDeleteRole() {
  return useSend<Role>('delete', (role) => `${path}/${role.id}`, [path])
}

export function useLoadRole(id: string | undefined) {
  return useGet<{ data: Role }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadRole(params: ListParams) {
  return useGet<Paginated<Role>>(path, params, { keepPrevious: true })
}

export function useRoleOptions(search: string, enabled: boolean) {
  return useOptions(path, 'label', search, enabled)
}

export function useSaveRole(role: Role | null) {
  return useSend<RoleInput>(role ? 'put' : 'post', role ? `${path}/${role.id}` : path, [path])
}
