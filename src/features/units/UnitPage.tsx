import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteUnit, useReadUnit } from './api'
import { unitColumns } from './columns'

export function UnitPage() {
  return (
    <ListTemplate
      title="unit"
      columns={unitColumns}
      defSort="code"
      useList={useReadUnit}
      canCreate
      urlCreate="/units/create"
      canEdit
      urlEdit={(unit) => `/units/${unit.id}/edit`}
      canDelete
      useDelete={useDeleteUnit}
      itemName={(unit) => unit.name}
    />
  )
}
