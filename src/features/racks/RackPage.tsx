import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteRack, useReadRack } from './api'
import { rackColumns } from './columns'

export function RackPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="rack"
      columns={rackColumns}
      defSort="code"
      useList={useReadRack}
      canCreate={can('rack.create')}
      urlCreate="/racks/create"
      canEdit={can('rack.update')}
      urlEdit={(rack) => `/racks/${rack.id}/edit`}
      canDelete={can('rack.delete')}
      useDelete={useDeleteRack}
      itemName={(rack) => rack.code}
    />
  )
}
