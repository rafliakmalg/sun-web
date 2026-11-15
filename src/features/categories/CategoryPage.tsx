import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteCategory, useReadCategory } from './api'
import { categoryColumns } from './columns'

export function CategoryPage() {
  return (
    <ListOrganism
      title="category"
      basePath="/categories"
      defaultSort="name"
      columns={categoryColumns}
      itemName={(category) => category.name}
      useList={useReadCategory}
      useDelete={useDeleteCategory}
    />
  )
}
