import type { Control } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { NumberFieldMolecule } from '@/components/molecules/NumberFieldMolecule'
import { RackFieldMolecule } from '@/components/molecules/RackFieldMolecule'
import { SelectFieldMolecule } from '@/components/molecules/SelectFieldMolecule'
import { FieldRowsOrganism } from '@/components/organisms/FieldRowsOrganism'
import { adjustmentReasons, type AdjustmentInput } from '@/features/adjustments/schema'
import { useProductOptions } from '@/features/products/api'
import { useTranslate } from '@/utils'

type Props = {
  control: Control<AdjustmentInput>
  error?: string
  warehouseId: string
}

export function AdjustmentItemsOrganism({ control, error, warehouseId }: Props) {
  const t = useTranslate()
  const reasons = adjustmentReasons.map((value) => ({ value, label: t(`adjustment.reason.${value}`) }))

  return (
    <FieldRowsOrganism
      control={control}
      name="items"
      label={t('adjustment.items')}
      addLabel={`+ ${t('create')} ${t('adjustment.items.product_id')}`}
      removeLabel="Hapus"
      newRow={{
        product_id: '',
        quantity: '',
        rack_id: '',
        reason: '' as never,
      }}
      error={error}
      columns={[
        {
          label: t('adjustment.items.product_id'),
          width: 3,
          render: (index) => (
            <AutocompleteFieldMolecule
              control={control}
              name={`items.${index}.product_id`}
              label="adjustment.items.product_id"
              useSearch={useProductOptions}
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('adjustment.items.rack_id'),
          width: 3,
          render: (index) => (
            <RackFieldMolecule
              control={control}
              name={`items.${index}.rack_id`}
              label="adjustment.items.rack_id"
              warehouseId={warehouseId}
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('adjustment.items.quantity'),
          width: 2,
          render: (index) => (
            <NumberFieldMolecule
              control={control}
              name={`items.${index}.quantity`}
              label="adjustment.items.quantity"
              decimals={3}
              allowNegative
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('adjustment.items.reason'),
          width: 3,
          render: (index) => (
            <SelectFieldMolecule
              control={control}
              name={`items.${index}.reason`}
              label="adjustment.items.reason"
              options={reasons}
              compact
              hideLabel
            />
          ),
        },
      ]}
    />
  )
}
