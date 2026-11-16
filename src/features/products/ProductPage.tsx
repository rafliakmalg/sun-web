import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteProduct, useReadProduct } from './api'
import { productColumns } from './columns'

export function ProductPage() {
  return (
    <ListTemplate
      title="product"
      columns={productColumns}
      defSort="name"
      useList={useReadProduct}
      canCreate
      urlCreate="/products/create"
      canEdit
      urlEdit={(product) => `/products/${product.id}/edit`}
      canDelete
      useDelete={useDeleteProduct}
      itemName={(product) => product.name}
    />
  )
}
