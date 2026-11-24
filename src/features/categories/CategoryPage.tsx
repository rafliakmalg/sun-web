import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteCategory, useReadCategory } from './api'
import { categoryColumns } from './columns'

export function CategoryPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="category"
      columns={categoryColumns}
      defSort="name"
      useList={useReadCategory}
      canCreate={can('category.create')}
      urlCreate="/categories/create"
      canEdit={can('category.update')}
      urlEdit={(category) => `/categories/${category.id}/edit`}
      canDelete={can('category.delete')}
      useDelete={useDeleteCategory}
      itemName={(category) => category.name}
    />
  )
}
