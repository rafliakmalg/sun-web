import type { ColumnDef } from '@/utils'
import type { Unit } from './schema'

export const unitColumns: ColumnDef<Unit>[] = [
  {
    key: 'code',
    header: 'unit.code',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'unit.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'unit.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
