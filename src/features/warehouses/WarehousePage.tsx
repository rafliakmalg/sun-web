import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteWarehouse, useReadWarehouse } from './api'
import { warehouseColumns } from './columns'

export function WarehousePage() {
  const can = useCan()

  return (
    <ListTemplate
      title="warehouse"
      columns={warehouseColumns}
      defSort="name"
      useList={useReadWarehouse}
      canCreate={can('warehouse.create')}
      urlCreate="/warehouses/create"
      canEdit={can('warehouse.update')}
      urlEdit={(warehouse) => `/warehouses/${warehouse.id}/edit`}
      canDelete={can('warehouse.delete')}
      useDelete={useDeleteWarehouse}
      itemName={(warehouse) => warehouse.name}
    />
  )
}
