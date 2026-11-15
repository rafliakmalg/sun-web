import type { ColumnDef } from '@/lib/columns'
import type { Role } from './schema'

export const roleColumns: ColumnDef<Role>[] = [
  {
    key: 'label',
    header: 'Label',
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
