import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadBranch } from './api'
import { BranchForm } from './BranchForm'

export function BranchFormPage() {
  return (
    <FormTemplate
      title="Cabang"
      useOne={useLoadBranch}
      renderForm={(branch) => <BranchForm branch={branch} />}
    />
  )
}
