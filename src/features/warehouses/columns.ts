import { useBranchOptions } from '@/features/branches/api'
import type { ColumnDef } from '@/lib/columns'
import type { Warehouse } from './schema'

export const warehouseColumns: ColumnDef<Warehouse>[] = [
  {
    key: 'code',
    header: 'Kode',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'Nama',
    sortable: true,
    filterable: true,
  },
  {
    key: 'branch_id',
    header: 'Cabang',
    filterable: true,
    useOptions: useBranchOptions,
    render: (warehouse) => warehouse.branch?.name,
  },
  {
    key: 'address',
    header: 'Alamat',
  },
  {
    key: 'active',
    header: 'Status',
    type: 'boolean',
    labels: ['Aktif', 'Nonaktif'],
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'Dibuat',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
