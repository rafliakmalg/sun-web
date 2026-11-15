import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadCategory } from './api'
import { CategoryForm } from './CategoryForm'

export function CategoryFormPage() {
  return (
    <FormTemplate
      title="Kategori"
      useOne={useLoadCategory}
      renderForm={(category) => <CategoryForm category={category} />}
    />
  )
}
