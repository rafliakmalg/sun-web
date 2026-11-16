import type { ColumnDef } from '@/utils'
import type { Category } from './schema'

export const categoryColumns: ColumnDef<Category>[] = [
  {
    key: 'name',
    header: 'category.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'category.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
