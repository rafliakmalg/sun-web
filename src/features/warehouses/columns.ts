import { useBranchOptions } from '@/features/branches/api'
import type { ColumnDef } from '@/lib/columns'
import type { Warehouse } from './schema'

export const warehouseColumns: ColumnDef<Warehouse>[] = [
  {
    key: 'code',
    header: 'warehouse.code',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'warehouse.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'branch_id',
    header: 'warehouse.branch_id',
    filterable: true,
    useOptions: useBranchOptions,
    render: (warehouse) => warehouse.branch?.name,
  },
  {
    key: 'address',
    header: 'warehouse.address',
  },
  {
    key: 'active',
    header: 'warehouse.active',
    type: 'boolean',
    labels: ['Aktif', 'Nonaktif'],
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'warehouse.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
