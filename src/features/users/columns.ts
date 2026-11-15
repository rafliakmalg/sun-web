import { useRoleOptions } from '@/features/roles/api'
import type { ColumnDef } from '@/lib/columns'
import type { User } from './schema'

export const userColumns: ColumnDef<User>[] = [
  {
    key: 'name',
    header: 'user.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'username',
    header: 'user.username',
    sortable: true,
    filterable: true,
  },
  {
    key: 'email',
    header: 'user.email',
    sortable: true,
    filterable: true,
  },
  {
    key: 'role_id',
    header: 'user.role_id',
    filterable: true,
    useOptions: useRoleOptions,
    render: (user) => user.role?.label,
  },
  {
    key: 'active',
    header: 'user.active',
    type: 'boolean',
    labels: ['Aktif', 'Nonaktif'],
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'user.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
