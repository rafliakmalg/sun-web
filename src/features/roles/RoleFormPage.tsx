import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadRole } from './api'
import { RoleForm } from './RoleForm'

export function RoleFormPage() {
  return (
    <FormTemplate
      title="role"
      useOne={useLoadRole}
      renderForm={(role) => <RoleForm role={role} />}
    />
  )
}
