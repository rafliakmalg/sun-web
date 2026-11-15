import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { ToggleFieldMolecule } from '@/components/molecules/ToggleFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/lib/errors'
import { useSaveBranch } from './api'
import { branchInputSchema, type Branch, type BranchInput } from './schema'

type Props = {
  branch: Branch | null
}

export function BranchForm({ branch }: Props) {
  const save = useSaveBranch(branch)
  const finish = useFinishForm('/branches')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BranchInput>({
    resolver: zodResolver(branchInputSchema),
    defaultValues: {
      active: branch?.active ?? true,
      address: branch?.address ?? '',
      code: branch?.code ?? '',
      name: branch?.name ?? '',
      phone: branch?.phone ?? '',
    },
  })

  function onSubmit(values: BranchInput) {
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
      <TextFieldMolecule
        control={control}
        name="phone"
        label="Telepon"
      />
      <ToggleFieldMolecule
        control={control}
        name="active"
        label="Aktif"
      />
      <TextareaFieldMolecule
        control={control}
        name="address"
        label="Alamat"
      />
    </FormOrganism>
  )
}
