import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteUser, useReadUser } from './api'
import { userColumns } from './columns'

export function UserPage() {
  return (
    <ListOrganism
      title="user"
      basePath="/users"
      defaultSort="name"
      columns={userColumns}
      itemName={(user) => user.name}
      useList={useReadUser}
      useDelete={useDeleteUser}
    />
  )
}
