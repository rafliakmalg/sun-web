import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteUnit, useReadUnit } from './api'
import { unitColumns } from './columns'

export function UnitPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="unit"
      columns={unitColumns}
      defSort="code"
      useList={useReadUnit}
      canCreate={can('unit.create')}
      urlCreate="/units/create"
      canEdit={can('unit.update')}
      urlEdit={(unit) => `/units/${unit.id}/edit`}
      canDelete={can('unit.delete')}
      useDelete={useDeleteUnit}
      itemName={(unit) => unit.name}
    />
  )
}
