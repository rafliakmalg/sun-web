import { ListTemplate } from '@/components/templates/ListTemplate'
import { useReadAdjustment } from './api'
import { adjustmentColumns } from './columns'

export function AdjustmentPage() {
  return (
    <ListTemplate
      title="adjustment"
      columns={adjustmentColumns}
      defSort="created_at"
      defSortDir="desc"
      useList={useReadAdjustment}
      canCreate
      urlCreate="/adjustments/create"
      canView
      urlView={(adjustment) => `/adjustments/${adjustment.id}`}
    />
  )
}
