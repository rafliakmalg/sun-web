import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/lib/errors'
import { useSaveUnit } from './api'
import { unitInputSchema, type Unit, type UnitInput } from './schema'

type Props = {
  unit: Unit | null
}

export function UnitForm({ unit }: Props) {
  const save = useSaveUnit(unit)
  const finish = useFinishForm('/units')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UnitInput>({
    resolver: zodResolver(unitInputSchema),
    defaultValues: {
      code: unit?.code ?? '',
      name: unit?.name ?? '',
    },
  })

  function onSubmit(values: UnitInput) {
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
        name="code"
        label="Kode"
        autoFocus
      />
      <TextFieldMolecule
        control={control}
        name="name"
        label="Nama"
      />
    </FormOrganism>
  )
}
