import { FormTemplate } from '@/components/templates/FormTemplate'
import { MovementForm } from './MovementForm'

export function MovementFormPage() {
  return <FormTemplate title="movement" renderForm={() => <MovementForm />} />
}
