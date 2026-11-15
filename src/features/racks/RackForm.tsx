import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { ToggleFieldMolecule } from '@/components/molecules/ToggleFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useWarehouseOptions } from '@/features/warehouses/api'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/lib/errors'
import { useSaveRack } from './api'
import { rackInputSchema, type Rack, type RackInput } from './schema'

type Props = {
  rack: Rack | null
}

export function RackForm({ rack }: Props) {
  const save = useSaveRack(rack)
  const finish = useFinishForm('/racks')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RackInput>({
    resolver: zodResolver(rackInputSchema),
    defaultValues: {
      active: rack?.active ?? true,
      code: rack?.code ?? '',
      name: rack?.name ?? '',
      warehouse_id: rack ? String(rack.warehouse_id) : '',
    },
  })

  function onSubmit(values: RackInput) {
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
      <AutocompleteFieldMolecule
        control={control}
        name="warehouse_id"
        label="Gudang"
        useSearch={useWarehouseOptions}
        initialLabel={rack?.warehouse?.name}
        autoFocus
      />
      <TextFieldMolecule
        control={control}
        name="code"
        label="Kode"
      />
      <TextFieldMolecule
        control={control}
        name="name"
        label="Nama"
      />
      <ToggleFieldMolecule
        control={control}
        name="active"
        label="Aktif"
      />
    </FormOrganism>
  )
}
