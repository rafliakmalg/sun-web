import { ListTemplate } from '@/components/templates/ListTemplate'
import { useReadMovement } from './api'
import { movementColumns } from './columns'

export function MovementPage() {
  return (
    <ListTemplate
      title="movement"
      columns={movementColumns}
      defSort="created_at"
      defSortDir="desc"
      useList={useReadMovement}
      canCreate
      urlCreate="/movements/create"
    />
  )
}
