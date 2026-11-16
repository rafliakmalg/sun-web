import { ListTemplate } from '@/components/templates/ListTemplate'
import { useReadHandover } from './api'
import { handoverColumns } from './columns'

export function HandoverPage() {
  return (
    <ListTemplate
      title="handover"
      columns={handoverColumns}
      defSort="created_at"
      defSortDir="desc"
      useList={useReadHandover}
      canCreate
      urlCreate="/handovers/create"
      createLabel="handover.action.take"
      canView
      urlView={(handover) => `/handovers/${handover.id}`}
    />
  )
}
