import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadProduct } from './api'
import { ProductForm } from './ProductForm'

export function ProductFormPage() {
  return (
    <FormTemplate
      title="Barang"
      useOne={useLoadProduct}
      renderForm={(product) => <ProductForm product={product} />}
    />
  )
}
