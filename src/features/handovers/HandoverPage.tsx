import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useReadHandover } from './api'
import { handoverColumns } from './columns'

export function HandoverPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="handover"
      columns={handoverColumns}
      defSort="created_at"
      defSortDir="desc"
      useList={useReadHandover}
      canCreate={can('handover.create')}
      urlCreate="/handovers/create"
      createLabel="handover.action.take"
      canView={can('handover.read')}
      urlView={(handover) => `/handovers/${handover.id}`}
    />
  )
}
