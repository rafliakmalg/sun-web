import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CheckboxGroupFieldMolecule } from '@/components/molecules/CheckboxGroupFieldMolecule'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { ToggleFieldMolecule } from '@/components/molecules/ToggleFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useRoleOptions } from '@/features/roles/api'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/utils'
import { useSaveUser } from './api'
import { userInputSchema, type User, type UserInput } from './schema'

type Props = {
  user: User | null
}

export function UserForm({ user }: Props) {
  const save = useSaveUser(user)
  const roles = useRoleOptions('', true)
  const finish = useFinishForm('/users')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserInput>({
    resolver: zodResolver(userInputSchema(!!user)),
    defaultValues: {
      active: user?.active ?? true,
      email: user?.email ?? '',
      name: user?.name ?? '',
      password: '',
      role_ids: user?.roles?.map((role) => String(role.id)) ?? [],
      username: user?.username ?? '',
    },
  })

  function onSubmit({ password, ...values }: UserInput) {
    save.mutate(password ? { ...values, password } : values, {
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
        name="name"
        label="user.name"
        autoFocus
      />
      <TextFieldMolecule
        control={control}
        name="username"
        label="user.username"
      />
      <TextFieldMolecule
        control={control}
        name="email"
        label="user.email"
        type="email"
      />
      <CheckboxGroupFieldMolecule
        control={control}
        name="role_ids"
        label="user.role_ids"
        options={roles.options}
        loading={roles.loading}
        wide
      />
      <TextFieldMolecule
        control={control}
        name="password"
        label="user.password"
        type="password"
        autoComplete="new-password"
        placeholder={user ? 'Kosongkan jika tidak diubah' : undefined}
      />
      <ToggleFieldMolecule
        control={control}
        name="active"
        label="user.active"
      />
    </FormOrganism>
  )
}
