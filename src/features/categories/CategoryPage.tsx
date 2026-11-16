import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteCategory, useReadCategory } from './api'
import { categoryColumns } from './columns'

export function CategoryPage() {
  return (
    <ListTemplate
      title="category"
      columns={categoryColumns}
      defSort="name"
      useList={useReadCategory}
      canCreate
      urlCreate="/categories/create"
      canEdit
      urlEdit={(category) => `/categories/${category.id}/edit`}
      canDelete
      useDelete={useDeleteCategory}
      itemName={(category) => category.name}
    />
  )
}
