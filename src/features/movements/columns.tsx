import { useProductOptions } from '@/features/products/api'
import { useWarehouseOptions } from '@/features/warehouses/api'
import type { ColumnDef } from '@/utils'
import type { Movement } from './schema'

export const movementColumns: ColumnDef<Movement>[] = [
  {
    key: 'product_id',
    header: 'movement.product_name',
    filterable: true,
    useOptions: useProductOptions,
    render: (movement) => movement.product?.name,
  },
  {
    key: 'product.sku',
    header: 'movement.product_sku',
    filterable: true,
  },
  {
    key: 'rack_from.code',
    header: 'movement.rack_from_code',
    filterable: true,
  },
  {
    key: 'rack_from.warehouse_id',
    header: 'movement.warehouse_from_name',
    filterable: true,
    useOptions: useWarehouseOptions,
    render: (movement) => movement.rack_from?.warehouse?.name,
  },
  {
    key: 'rack_to.code',
    header: 'movement.rack_to_code',
    filterable: true,
  },
  {
    key: 'rack_to.warehouse_id',
    header: 'movement.warehouse_to_name',
    filterable: true,
    useOptions: useWarehouseOptions,
    render: (movement) => movement.rack_to?.warehouse?.name,
  },
  {
    key: 'quantity',
    header: 'movement.quantity',
    type: 'number',
    decimals: 3,
    sortable: true,
    filterable: true,
  },
  {
    key: 'handover.code',
    header: 'movement.handover_code',
    filterable: true,
  },
  {
    key: 'adjustment.code',
    header: 'movement.adjustment_code',
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'movement.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
