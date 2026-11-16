import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteRole, useReadRole } from './api'
import { roleColumns } from './columns'

export function RolePage() {
  return (
    <ListTemplate
      title="role"
      columns={roleColumns}
      defSort="label"
      useList={useReadRole}
      canCreate
      urlCreate="/roles/create"
      canEdit
      urlEdit={(role) => `/roles/${role.id}/edit`}
      canDelete
      useDelete={useDeleteRole}
      itemName={(role) => role.label}
    />
  )
}
