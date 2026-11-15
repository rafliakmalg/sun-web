import { useRoleOptions } from '@/features/roles/api'
import type { ColumnDef } from '@/lib/columns'
import type { User } from './schema'

export const userColumns: ColumnDef<User>[] = [
  {
    key: 'name',
    header: 'Nama',
    sortable: true,
    filterable: true,
  },
  {
    key: 'username',
    header: 'Username',
    sortable: true,
    filterable: true,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
    filterable: true,
  },
  {
    key: 'role_id',
    header: 'Role',
    filterable: true,
    useOptions: useRoleOptions,
    render: (user) => user.role?.label,
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
