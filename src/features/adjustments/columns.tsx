import { Badge } from 'react-bootstrap'
import { translate, type ColumnDef, type OptionSearch } from '@/utils'
import { adjustmentStatuses, type Adjustment, type AdjustmentItem } from './schema'

export const statusColors: Record<string, string> = {
  active: 'success',
  cancelled: 'secondary',
}

const useStatusOptions: OptionSearch = (term) => ({
  options: adjustmentStatuses
    .map((status) => ({
      value: status,
      label: translate(`adjustment.status.${status}`),
    }))
    .filter((option) => option.label.toLowerCase().includes(term.toLowerCase())),
  loading: false,
})

export const adjustmentColumns: ColumnDef<Adjustment>[] = [
  {
    key: 'code',
    header: 'adjustment.code',
    sortable: true,
    filterable: true,
  },
  {
    key: 'status',
    header: 'adjustment.status',
    sortable: true,
    filterable: true,
    useOptions: useStatusOptions,
    render: (adjustment) => (
      <Badge bg={statusColors[adjustment.status] ?? 'secondary'}>{translate(`adjustment.status.${adjustment.status}`)}</Badge>
    ),
  },
  {
    key: 'note',
    header: 'adjustment.note',
  },
  {
    key: 'created_at',
    header: 'adjustment.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]

export const adjustmentItemColumns: ColumnDef<AdjustmentItem>[] = [
  {
    key: 'product.name',
    header: 'adjustment.items.product_name',
  },
  {
    key: 'product.sku',
    header: 'adjustment.items.product_sku',
  },
  {
    key: 'rack.code',
    header: 'adjustment.items.rack_code',
  },
  {
    key: 'rack.warehouse.name',
    header: 'adjustment.items.warehouse_name',
  },
  {
    key: 'quantity',
    header: 'adjustment.items.quantity',
    type: 'number',
    decimals: 3,
  },
  {
    key: 'reason',
    header: 'adjustment.items.reason',
    render: (item) => translate(`adjustment.reason.${item.reason}`),
  },
]
