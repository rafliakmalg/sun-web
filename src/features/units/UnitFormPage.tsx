import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadUnit } from './api'
import { UnitForm } from './UnitForm'

export function UnitFormPage() {
  return (
    <FormTemplate
      title="unit"
      useOne={useLoadUnit}
      renderForm={(unit) => <UnitForm unit={unit} />}
    />
  )
}
