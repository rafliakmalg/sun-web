import { Badge } from 'react-bootstrap'
import type { Movement } from '@/features/movements/schema'
import { formatNumber, type ColumnDef } from '@/utils'
import type { LowStock } from './schema'

export const lowStockColumns: ColumnDef<LowStock>[] = [
  {
    key: 'name',
    header: 'inventory.product_name',
  },
  {
    key: 'sku',
    header: 'inventory.product_sku',
  },
  {
    key: 'min_stock',
    header: 'product.min_stock',
    type: 'number',
    decimals: 3,
  },
  {
    key: 'total_quantity',
    header: 'inventory.quantity',
    type: 'number',
    decimals: 3,
  },
  {
    key: 'shortage',
    header: 'dashboard.shortage',
    align: 'end',
    render: (product) => <Badge bg="danger">{formatNumber(Number(product.min_stock) - Number(product.total_quantity), 3)}</Badge>,
  },
]

export const recentMovementColumns: ColumnDef<Movement>[] = [
  {
    key: 'product.name',
    header: 'movement.product_name',
  },
  {
    key: 'rack_from.code',
    header: 'movement.rack_from_code',
  },
  {
    key: 'rack_to.code',
    header: 'movement.rack_to_code',
  },
  {
    key: 'quantity',
    header: 'movement.quantity',
    type: 'number',
    decimals: 3,
  },
  {
    key: 'created_at',
    header: 'movement.created_at',
    type: 'datetime',
  },
]
