import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { WarehousePickerMolecule } from '@/components/molecules/WarehousePickerMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { HandoverItemsOrganism } from '@/components/organisms/HandoverItemsOrganism'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors } from '@/utils'
import { useSaveHandover } from './api'
import { handoverInputSchema, type HandoverInput } from './schema'

export function HandoverForm() {
  const save = useSaveHandover()
  const finish = useFinishForm('/handovers')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<HandoverInput>({
    resolver: zodResolver(handoverInputSchema),
    defaultValues: {
      items: [
        {
          product_id: '',
          quantity: '',
          rack_from_id: '',
          rack_to_id: '',
        },
      ],
      note: '',
    },
  })

  function onSubmit(values: HandoverInput) {
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
        id="from"
        heading="handover.items.rack_from_id"
        value={from}
        onChange={setFrom}
      />
      <WarehousePickerMolecule
        id="to"
        heading="handover.items.rack_to_id"
        value={to}
        onChange={setTo}
      />
      <HandoverItemsOrganism
        control={control}
        fromWarehouseId={from}
        toWarehouseId={to}
        error={errors.items?.message ?? errors.items?.root?.message}
      />
      <TextareaFieldMolecule
        control={control}
        name="note"
        label="handover.note"
      />
    </FormOrganism>
  )
}
