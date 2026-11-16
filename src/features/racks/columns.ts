import { useWarehouseOptions } from '@/features/warehouses/api'
import type { ColumnDef } from '@/utils'
import type { Rack } from './schema'

export const rackColumns: ColumnDef<Rack>[] = [
  {
    key: 'code',
    header: 'rack.code',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'rack.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'warehouse_id',
    header: 'rack.warehouse_id',
    filterable: true,
    useOptions: useWarehouseOptions,
    render: (rack) => rack.warehouse?.name,
  },
  {
    key: 'active',
    header: 'rack.active',
    type: 'boolean',
    labels: ['Aktif', 'Nonaktif'],
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'rack.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
