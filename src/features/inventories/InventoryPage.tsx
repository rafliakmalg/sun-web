import { ListTemplate } from '@/components/templates/ListTemplate'
import { useReadInventory } from './api'
import { inventoryColumns } from './columns'

export function InventoryPage() {
  return (
    <ListTemplate
      title="inventory"
      columns={inventoryColumns}
      defSort="created_at"
      useList={useReadInventory}
    />
  )
}
