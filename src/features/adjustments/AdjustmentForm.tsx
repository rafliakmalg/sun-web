import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { WarehousePickerMolecule } from '@/components/molecules/WarehousePickerMolecule'
import { AdjustmentItemsOrganism } from '@/components/organisms/AdjustmentItemsOrganism'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/utils'
import { useSaveAdjustment } from './api'
import { adjustmentInputSchema, type AdjustmentInput } from './schema'

export function AdjustmentForm() {
  const save = useSaveAdjustment()
  const finish = useFinishForm('/adjustments')
  const [warehouse, setWarehouse] = useState('')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AdjustmentInput>({
    resolver: zodResolver(adjustmentInputSchema),
    defaultValues: {
      items: [
        {
          product_id: '',
          quantity: '',
          rack_id: '',
          reason: '' as never,
        },
      ],
      note: '',
    },
  })

  function onSubmit(values: AdjustmentInput) {
    save.mutate(
      {
        items: values.items,
        note: values.note || undefined,
      },
      {
        onSuccess: (data) => finish(data.message),
        onError: (error) => applyApiErrors(error, setError),
      },
    )
  }

  return (
    <FormOrganism
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => finish()}
      submitting={save.isPending}
      error={errors.root?.message}
    >
      <WarehousePickerMolecule
        id="adjustment"
        heading="adjustment.items.rack_id"
        value={warehouse}
        onChange={setWarehouse}
      />
      <AdjustmentItemsOrganism
        control={control}
        warehouseId={warehouse}
        error={errors.items?.message ?? errors.items?.root?.message}
      />
      <TextareaFieldMolecule
        control={control}
        name="note"
        label="adjustment.note"
      />
    </FormOrganism>
  )
}
