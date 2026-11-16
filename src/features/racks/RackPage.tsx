import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteRack, useReadRack } from './api'
import { rackColumns } from './columns'

export function RackPage() {
  return (
    <ListTemplate
      title="rack"
      columns={rackColumns}
      defSort="code"
      useList={useReadRack}
      canCreate
      urlCreate="/racks/create"
      canEdit
      urlEdit={(rack) => `/racks/${rack.id}/edit`}
      canDelete
      useDelete={useDeleteRack}
      itemName={(rack) => rack.code}
    />
  )
}
