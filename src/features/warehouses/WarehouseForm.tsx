import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { TextFieldMolecule } from '@/components/molecules/TextFieldMolecule'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { ToggleFieldMolecule } from '@/components/molecules/ToggleFieldMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useBranchOptions } from '@/features/branches/api'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/lib/errors'
import { useSaveWarehouse } from './api'
import { warehouseInputSchema, type Warehouse, type WarehouseInput } from './schema'

type Props = {
  warehouse: Warehouse | null
}

export function WarehouseForm({ warehouse }: Props) {
  const save = useSaveWarehouse(warehouse)
  const finish = useFinishForm('/warehouses')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<WarehouseInput>({
    resolver: zodResolver(warehouseInputSchema),
    defaultValues: {
      active: warehouse?.active ?? true,
      address: warehouse?.address ?? '',
      branch_id: warehouse ? String(warehouse.branch_id) : '',
      code: warehouse?.code ?? '',
      name: warehouse?.name ?? '',
    },
  })

  function onSubmit(values: WarehouseInput) {
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
        name="branch_id"
        label="warehouse.branch_id"
        useSearch={useBranchOptions}
        initialLabel={warehouse?.branch?.name}
        autoFocus
      />
      <TextFieldMolecule
        control={control}
        name="code"
        label="warehouse.code"
      />
      <TextFieldMolecule
        control={control}
        name="name"
        label="warehouse.name"
      />
      <ToggleFieldMolecule
        control={control}
        name="active"
        label="warehouse.active"
      />
      <TextareaFieldMolecule
        control={control}
        name="address"
        label="warehouse.address"
      />
    </FormOrganism>
  )
}
