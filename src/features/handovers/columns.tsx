import { Badge } from 'react-bootstrap'
import { useUserOptions } from '@/features/users/api'
import { translate, type ColumnDef, type OptionSearch } from '@/utils'
import { handoverStatuses, type Handover, type HandoverItem, type HandoverLog } from './schema'

export const statusColors: Record<string, string> = {
  cancelled: 'secondary',
  completed: 'success',
  taken: 'primary',
}

const useStatusOptions: OptionSearch = (term) => ({
  options: handoverStatuses
    .map((status) => ({
      value: status,
      label: translate(`handover.status.${status}`),
    }))
    .filter((option) => option.label.toLowerCase().includes(term.toLowerCase())),
  loading: false,
})

export const handoverColumns: ColumnDef<Handover>[] = [
  {
    key: 'code',
    header: 'handover.code',
    sortable: true,
    filterable: true,
  },
  {
    key: 'status',
    header: 'handover.status',
    sortable: true,
    filterable: true,
    useOptions: useStatusOptions,
    render: (handover) => (
      <Badge bg={statusColors[handover.status] ?? 'secondary'}>{translate(`handover.status.${handover.status}`)}</Badge>
    ),
  },
  {
    key: 'custody_id',
    header: 'handover.custody_id',
    filterable: true,
    useOptions: useUserOptions,
    render: (handover) => handover.custody?.name,
  },
  {
    key: 'note',
    header: 'handover.note',
  },
  {
    key: 'created_at',
    header: 'handover.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]

export const handoverItemColumns: ColumnDef<HandoverItem>[] = [
  {
    key: 'product.name',
    header: 'handover.items.product_name',
  },
  {
    key: 'product.sku',
    header: 'handover.items.product_sku',
  },
  {
    key: 'rack_from.code',
    header: 'handover.items.rack_from_code',
  },
  {
    key: 'rack_from.warehouse.name',
    header: 'handover.items.warehouse_from_name',
  },
  {
    key: 'rack_to.code',
    header: 'handover.items.rack_to_code',
  },
  {
    key: 'rack_to.warehouse.name',
    header: 'handover.items.warehouse_to_name',
  },
  {
    key: 'quantity',
    header: 'handover.items.quantity',
    type: 'number',
    decimals: 3,
  },
]

export const handoverLogColumns: ColumnDef<HandoverLog>[] = [
  {
    key: 'action',
    header: 'handover.logs.action',
    render: (log) => (
      <Badge bg="light" text="dark">
        {translate(`handover.action.${log.action}`)}
      </Badge>
    ),
  },
  {
    key: 'custody_from.name',
    header: 'handover.logs.custody_from',
  },
  {
    key: 'custody_to.name',
    header: 'handover.logs.custody_to',
  },
  {
    key: 'created_by.name',
    header: 'handover.logs.created_by',
  },
  {
    key: 'note',
    header: 'handover.logs.note',
  },
  {
    key: 'created_at',
    header: 'handover.logs.created_at',
    type: 'datetime',
  },
]
