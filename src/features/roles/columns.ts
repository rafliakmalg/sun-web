import type { ColumnDef } from '@/utils'
import type { Role } from './schema'

export const roleColumns: ColumnDef<Role>[] = [
  {
    key: 'label',
    header: 'role.label',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'role.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'role.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
