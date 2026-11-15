import { useCategoryOptions } from '@/features/categories/api'
import { useUnitOptions } from '@/features/units/api'
import type { ColumnDef } from '@/lib/columns'
import type { Product } from './schema'

export const productColumns: ColumnDef<Product>[] = [
  {
    key: 'sku',
    header: 'product.sku',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    header: 'product.name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'category_id',
    header: 'product.category_id',
    filterable: true,
    useOptions: useCategoryOptions,
    render: (product) => product.category?.name,
  },
  {
    key: 'base_unit_id',
    header: 'product.base_unit_id',
    filterable: true,
    useOptions: useUnitOptions,
    render: (product) => product.base_unit?.name,
  },
  {
    key: 'min_stock',
    header: 'product.min_stock',
    type: 'number',
    decimals: 3,
    filterable: true,
  },
  {
    key: 'active',
    header: 'product.active',
    type: 'boolean',
    labels: ['Aktif', 'Nonaktif'],
    filterable: true,
  },
  {
    key: 'created_at',
    header: 'product.created_at',
    type: 'datetime',
    sortable: true,
    filterable: true,
  },
]
