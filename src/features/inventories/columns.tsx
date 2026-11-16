import { useBranchOptions } from '@/features/branches/api'
import { useProductOptions } from '@/features/products/api'
import { useWarehouseOptions } from '@/features/warehouses/api'
import type { ColumnDef } from '@/utils'
import type { Inventory } from './schema'

export const inventoryColumns: ColumnDef<Inventory>[] = [
  {
    key: 'product_id',
    header: 'inventory.product_name',
    filterable: true,
    useOptions: useProductOptions,
    render: (inventory) => inventory.product?.name,
  },
  {
    key: 'product.sku',
    header: 'inventory.product_sku',
    filterable: true,
  },
  {
    key: 'rack.code',
    header: 'inventory.rack_code',
    filterable: true,
  },
  {
    key: 'rack.warehouse_id',
    header: 'inventory.warehouse_name',
    filterable: true,
    useOptions: useWarehouseOptions,
    render: (inventory) => inventory.rack?.warehouse?.name,
  },
  {
    key: 'rack.warehouse.branch_id',
    header: 'inventory.branch_name',
    filterable: true,
    useOptions: useBranchOptions,
    render: (inventory) => inventory.rack?.warehouse?.branch?.name,
  },
  {
    key: 'quantity',
    header: 'inventory.quantity',
    type: 'number',
    decimals: 3,
    sortable: true,
    filterable: true,
  },
  {
    key: 'quantity_incoming',
    header: 'inventory.quantity_incoming',
    type: 'number',
    decimals: 3,
    sortable: true,
    filterable: true,
  },
  {
    key: 'product.base_unit.name',
    header: 'product.base_unit_id',
  },
]
