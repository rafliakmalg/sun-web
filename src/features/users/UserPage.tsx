import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteUser, useReadUser } from './api'
import { userColumns } from './columns'

export function UserPage() {
  return (
    <ListTemplate
      title="user"
      columns={userColumns}
      defSort="name"
      useList={useReadUser}
      canCreate
      urlCreate="/users/create"
      canEdit
      urlEdit={(user) => `/users/${user.id}/edit`}
      canDelete
      useDelete={useDeleteUser}
      itemName={(user) => user.name}
    />
  )
}
