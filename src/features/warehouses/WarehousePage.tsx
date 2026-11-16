import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteWarehouse, useReadWarehouse } from './api'
import { warehouseColumns } from './columns'

export function WarehousePage() {
  return (
    <ListTemplate
      title="warehouse"
      columns={warehouseColumns}
      defSort="name"
      useList={useReadWarehouse}
      canCreate
      urlCreate="/warehouses/create"
      canEdit
      urlEdit={(warehouse) => `/warehouses/${warehouse.id}/edit`}
      canDelete
      useDelete={useDeleteWarehouse}
      itemName={(warehouse) => warehouse.name}
    />
  )
}
