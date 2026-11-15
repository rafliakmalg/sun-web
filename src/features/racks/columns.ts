import { useWarehouseOptions } from '@/features/warehouses/api'
import type { ColumnDef } from '@/lib/columns'
import type { Rack } from './schema'

export const rackColumns: ColumnDef<Rack>[] = [
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
    key: 'warehouse_id',
    header: 'Gudang',
    filterable: true,
    useOptions: useWarehouseOptions,
    render: (rack) => rack.warehouse?.name,
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
