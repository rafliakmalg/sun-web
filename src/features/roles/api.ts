import { useGet, useOptions, useSend, type ListParams, type OptionResult, type Paginated } from '@/utils'
import type { Permission, Role, RoleInput } from './schema'

const path = '/auth/roles'

export function useDeleteRole() {
  return useSend<Role>('delete', (role) => `${path}/${role.id}`, [path])
}

export function useLoadRole(id: string | undefined) {
  return useGet<{ data: Role }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function usePermissionOptions(): OptionResult {
  const { data, isFetching } = useGet<{ data: Permission[] }>('/auth/permissions')

  return {
    loading: isFetching,
    options: (data?.data ?? []).map((permission) => {
      const [resource, action] = permission.name.split('.')

      return {
        group: resource,
        label: `permission.action.${action}`,
        value: String(permission.id),
      }
    }),
  }
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
