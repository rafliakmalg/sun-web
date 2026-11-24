import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CheckboxGroupFieldMolecule } from '@/components/molecules/CheckboxGroupFieldMolecule'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/utils'
import { usePermissionOptions, useSaveRole } from './api'
import { roleInputSchema, type Role, type RoleInput } from './schema'

type Props = {
  role: Role | null
}

export function RoleForm({ role }: Props) {
  const save = useSaveRole(role)
  const permissions = usePermissionOptions()
  const finish = useFinishForm('/roles')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RoleInput>({
    resolver: zodResolver(roleInputSchema),
    defaultValues: {
      label: role?.label ?? '',
      name: role?.name ?? '',
      permission_ids: role?.permissions?.map((permission) => String(permission.id)) ?? [],
    },
  })

  function onSubmit(values: RoleInput) {
    save.mutate(values, {
      onSuccess: (data) => finish(data.message),
      onError: (error) => applyApiErrors(error, setError),
    })
  }

  return (
    <FormOrganism
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => finish()}
      submitting={save.isPending}
      error={errors.root?.message}
    >
      <TextFieldMolecule
        control={control}
        name="label"
        label="role.label"
        autoFocus
      />
      <TextFieldMolecule
        control={control}
        name="name"
        label="role.name"
      />
      <CheckboxGroupFieldMolecule
        control={control}
        name="permission_ids"
        label="role.permission_ids"
        options={permissions.options}
        loading={permissions.loading}
        wide
      />
    </FormOrganism>
  )
}
