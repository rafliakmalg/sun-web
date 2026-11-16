import { FormTemplate } from '@/components/templates/FormTemplate'
import { HandoverForm } from './HandoverForm'

export function HandoverFormPage() {
  return (
    <FormTemplate
      title="handover"
      heading="handover.action.take"
      renderForm={() => <HandoverForm />}
    />
  )
}
