import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadWarehouse } from './api'
import { WarehouseForm } from './WarehouseForm'

export function WarehouseFormPage() {
  return (
    <FormTemplate
      title="warehouse"
      useOne={useLoadWarehouse}
      renderForm={(warehouse) => <WarehouseForm warehouse={warehouse} />}
    />
  )
}
