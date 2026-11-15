import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteProduct, useReadProduct } from './api'
import { productColumns } from './columns'

export function ProductPage() {
  return (
    <ListOrganism
      title="Barang"
      basePath="/products"
      defaultSort="name"
      columns={productColumns}
      itemName={(product) => product.name}
      useList={useReadProduct}
      useDelete={useDeleteProduct}
    />
  )
}
