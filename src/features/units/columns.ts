import type { ColumnDef } from '@/lib/columns'
import type { Unit } from './schema'

export const unitColumns: ColumnDef<Unit>[] = [
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
    key: 'created_at',
    header: 'Dibuat',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
