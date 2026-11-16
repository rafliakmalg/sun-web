import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { NumberFieldMolecule } from '@/components/molecules/NumberFieldMolecule'
import { RackFieldMolecule } from '@/components/molecules/RackFieldMolecule'
import { RadioFieldMolecule } from '@/components/molecules/RadioFieldMolecule'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { WarehousePickerMolecule } from '@/components/molecules/WarehousePickerMolecule'
import { FormOrganism } from '@/components/organisms/FormOrganism'
import { useProductOptions } from '@/features/products/api'
import { useFinishForm } from '@/hooks/useFinishForm'
import { applyApiErrors, useTranslate } from '@/utils'
import { useSaveMovement } from './api'
import { movementFormTypes, movementInputSchema, type MovementInput } from './schema'

export function MovementForm() {
  const save = useSaveMovement()
  const finish = useFinishForm('/movements')
  const t = useTranslate()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<MovementInput>({
    resolver: zodResolver(movementInputSchema),
    defaultValues: {
      note: '',
      product_id: '',
      quantity: '',
      rack_from_id: '',
      rack_to_id: '',
      type: 'receive',
    },
  })

  const type = useWatch({ control, name: 'type' })
  const needsFrom = type !== 'receive'
  const needsTo = type !== 'issue'

  useEffect(() => {
    if (!needsFrom) {
      setValue('rack_from_id', '')
    }

    if (!needsTo) {
      setValue('rack_to_id', '')
    }
  }, [needsFrom, needsTo, setValue])

  function onSubmit(values: MovementInput) {
    save.mutate(
      {
        note: values.note || undefined,
        product_id: values.product_id,
        quantity: values.quantity,
        rack_from_id: needsFrom ? values.rack_from_id : undefined,
        rack_to_id: needsTo ? values.rack_to_id : undefined,
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
      <div className="form-wide">
        <RadioFieldMolecule
          control={control}
          name="type"
          label="movement.type"
          options={movementFormTypes.map((value) => ({ value, label: t(`movement.type.${value}`) }))}
        />
      </div>
      <AutocompleteFieldMolecule
        control={control}
        name="product_id"
        label="movement.product_id"
        useSearch={useProductOptions}
        autoFocus
      />
      <NumberFieldMolecule
        control={control}
        name="quantity"
        label="movement.quantity"
        decimals={3}
      />
      {needsFrom && (
        <div>
          <WarehousePickerMolecule
            id="from"
            heading="movement.rack_from_id"
            value={from}
            onChange={setFrom}
          />
          <RackFieldMolecule
            control={control}
            name="rack_from_id"
            label="movement.rack_from_id"
            warehouseId={from}
          />
        </div>
      )}
      {needsTo && (
        <div>
          <WarehousePickerMolecule
            id="to"
            heading="movement.rack_to_id"
            value={to}
            onChange={setTo}
          />
          <RackFieldMolecule
            control={control}
            name="rack_to_id"
            label="movement.rack_to_id"
            warehouseId={to}
            activeOnly
          />
        </div>
      )}
      <TextareaFieldMolecule
        control={control}
        name="note"
        label="movement.note"
      />
    </FormOrganism>
  )
}
