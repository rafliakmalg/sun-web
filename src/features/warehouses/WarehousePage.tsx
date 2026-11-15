import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteWarehouse, useReadWarehouse } from './api'
import { warehouseColumns } from './columns'

export function WarehousePage() {
  return (
    <ListOrganism
      title="warehouse"
      basePath="/warehouses"
      defaultSort="name"
      columns={warehouseColumns}
      itemName={(warehouse) => warehouse.name}
      useList={useReadWarehouse}
      useDelete={useDeleteWarehouse}
    />
  )
}
