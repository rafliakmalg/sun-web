import type { ColumnDef } from '@/lib/columns'
import type { Branch } from './schema'

export const branchColumns: ColumnDef<Branch>[] = [
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
    key: 'phone',
    header: 'Telepon',
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
