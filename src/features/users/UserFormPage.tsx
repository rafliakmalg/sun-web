import { FormTemplate } from '@/components/templates/FormTemplate'
import { useLoadUser } from './api'
import { UserForm } from './UserForm'

export function UserFormPage() {
  return (
    <FormTemplate
      title="user"
      useOne={useLoadUser}
      renderForm={(user) => <UserForm user={user} />}
    />
  )
}
