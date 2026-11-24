import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteRole, useReadRole } from './api'
import { roleColumns } from './columns'

export function RolePage() {
  const can = useCan()

  return (
    <ListTemplate
      title="role"
      columns={roleColumns}
      defSort="label"
      useList={useReadRole}
      canCreate={can('role.create')}
      urlCreate="/roles/create"
      canEdit={can('role.update')}
      urlEdit={(role) => `/roles/${role.id}/edit`}
      canDelete={can('role.delete')}
      useDelete={useDeleteRole}
      itemName={(role) => role.label}
    />
  )
}
