import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteUser, useReadUser } from './api'
import { userColumns } from './columns'

export function UserPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="user"
      columns={userColumns}
      defSort="name"
      useList={useReadUser}
      canCreate={can('user.create')}
      urlCreate="/users/create"
      canEdit={can('user.update')}
      urlEdit={(user) => `/users/${user.id}/edit`}
      canDelete={can('user.delete')}
      useDelete={useDeleteUser}
      itemName={(user) => user.name}
    />
  )
}
