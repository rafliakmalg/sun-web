import type { ColumnDef } from '@/lib/columns'
import type { Category } from './schema'

export const categoryColumns: ColumnDef<Category>[] = [
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
