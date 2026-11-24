import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useReadMovement } from './api'
import { movementColumns } from './columns'

export function MovementPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="movement"
      columns={movementColumns}
      defSort="created_at"
      defSortDir="desc"
      useList={useReadMovement}
      canCreate={can('movement.create')}
      urlCreate="/movements/create"
    />
  )
}
