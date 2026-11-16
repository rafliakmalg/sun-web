import type { ColumnDef } from '@/utils'
import type { Branch } from './schema'

export const branchColumns: ColumnDef<Branch>[] = [
  {
    key: 'code',
    header: 'branch.code',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'branch.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'phone',
    header: 'branch.phone',
  },
  {
    key: 'address',
    header: 'branch.address',
  },
  {
    key: 'active',
    header: 'branch.active',
    type: 'boolean',
    labels: ['Aktif', 'Nonaktif'],
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'branch.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
