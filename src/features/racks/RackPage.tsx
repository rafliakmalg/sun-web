import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteRack, useReadRack } from './api'
import { rackColumns } from './columns'

export function RackPage() {
  return (
    <ListOrganism
      title="rack"
      basePath="/racks"
      defaultSort="code"
      columns={rackColumns}
      itemName={(rack) => rack.code}
      useList={useReadRack}
      useDelete={useDeleteRack}
    />
  )
}
