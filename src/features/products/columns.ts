import { useCategoryOptions } from '@/features/categories/api'
import { useUnitOptions } from '@/features/units/api'
import type { ColumnDef } from '@/lib/columns'
import type { Product } from './schema'

export const productColumns: ColumnDef<Product>[] = [
  {
    key: 'sku',
    header: 'SKU',
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
    key: 'category_id',
    header: 'Kategori',
    filterable: true,
    useOptions: useCategoryOptions,
    render: (product) => product.category?.name,
  },
  {
    key: 'base_unit_id',
    header: 'Satuan terkecil',
    filterable: true,
    useOptions: useUnitOptions,
    render: (product) => product.base_unit?.name,
  },
  {
    key: 'min_stock',
    header: 'Stok minimum',
    type: 'number',
    decimals: 3,
    filterable: true,
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
