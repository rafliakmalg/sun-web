import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteUnit, useReadUnit } from './api'
import { unitColumns } from './columns'

export function UnitPage() {
  return (
    <ListOrganism
      title="unit"
      basePath="/units"
      defaultSort="code"
      columns={unitColumns}
      itemName={(unit) => unit.name}
      useList={useReadUnit}
      useDelete={useDeleteUnit}
    />
  )
}
