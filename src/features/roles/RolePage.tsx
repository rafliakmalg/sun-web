import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteRole, useReadRole } from './api'
import { roleColumns } from './columns'

export function RolePage() {
  return (
    <ListOrganism
      title="role"
      basePath="/roles"
      defaultSort="label"
      columns={roleColumns}
      itemName={(role) => role.label}
      useList={useReadRole}
      useDelete={useDeleteRole}
    />
  )
}
