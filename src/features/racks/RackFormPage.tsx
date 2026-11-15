import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadRack } from './api'
import { RackForm } from './RackForm'

export function RackFormPage() {
  return (
    <FormTemplate
      title="Rak"
      useOne={useLoadRack}
      renderForm={(rack) => <RackForm rack={rack} />}
    />
  )
}
