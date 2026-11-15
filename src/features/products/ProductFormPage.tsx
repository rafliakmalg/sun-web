import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadProduct } from './api'
import { ProductForm } from './ProductForm'

export function ProductFormPage() {
  return (
    <FormTemplate
      title="product"
      useOne={useLoadProduct}
      renderForm={(product) => <ProductForm product={product} />}
    />
  )
}
