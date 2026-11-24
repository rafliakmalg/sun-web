import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useReadAdjustment } from './api'
import { adjustmentColumns } from './columns'

export function AdjustmentPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="adjustment"
      columns={adjustmentColumns}
      defSort="created_at"
      defSortDir="desc"
      useList={useReadAdjustment}
      canCreate={can('adjustment.create')}
      urlCreate="/adjustments/create"
      canView={can('adjustment.read')}
      urlView={(adjustment) => `/adjustments/${adjustment.id}`}
    />
  )
}
