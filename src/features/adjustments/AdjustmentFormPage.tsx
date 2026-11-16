import { FormTemplate } from '@/components/templates/FormTemplate'
import { AdjustmentForm } from './AdjustmentForm'

export function AdjustmentFormPage() {
  return <FormTemplate title="adjustment" renderForm={() => <AdjustmentForm />} />
}
