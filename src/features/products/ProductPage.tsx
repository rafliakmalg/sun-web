import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteProduct, useReadProduct } from './api'
import { productColumns } from './columns'

export function ProductPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="product"
      columns={productColumns}
      defSort="name"
      useList={useReadProduct}
      canCreate={can('product.create')}
      urlCreate="/products/create"
      canEdit={can('product.update')}
      urlEdit={(product) => `/products/${product.id}/edit`}
      canDelete={can('product.delete')}
      useDelete={useDeleteProduct}
      itemName={(product) => product.name}
    />
  )
}
