import type { Control } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { NumberFieldMolecule } from '@/components/molecules/NumberFieldMolecule'
import { RackFieldMolecule } from '@/components/molecules/RackFieldMolecule'
import { FieldRowsOrganism } from '@/components/organisms/FieldRowsOrganism'
import type { HandoverInput } from '@/features/handovers/schema'
import { useProductOptions } from '@/features/products/api'
import { useTranslate } from '@/utils'

type Props = {
  control: Control<HandoverInput>
  error?: string
  fromWarehouseId: string
  toWarehouseId: string
}

export function HandoverItemsOrganism({ control, error, fromWarehouseId, toWarehouseId }: Props) {
  const t = useTranslate()

  return (
    <FieldRowsOrganism
      control={control}
      name="items"
      label={t('handover.items')}
      addLabel={`+ ${t('create')} ${t('handover.items.product_id')}`}
      removeLabel="Hapus"
      newRow={{
        product_id: '',
        quantity: '',
        rack_from_id: '',
        rack_to_id: '',
      }}
      error={error}
      columns={[
        {
          label: t('handover.items.product_id'),
          width: 3,
          render: (index) => (
            <AutocompleteFieldMolecule
              control={control}
              name={`items.${index}.product_id`}
              label="handover.items.product_id"
              useSearch={useProductOptions}
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('handover.items.rack_from_id'),
          width: 3,
          render: (index) => (
            <RackFieldMolecule
              control={control}
              name={`items.${index}.rack_from_id`}
              label="handover.items.rack_from_id"
              warehouseId={fromWarehouseId}
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('handover.items.rack_to_id'),
          width: 3,
          render: (index) => (
            <RackFieldMolecule
              control={control}
              name={`items.${index}.rack_to_id`}
              label="handover.items.rack_to_id"
              warehouseId={toWarehouseId}
              activeOnly
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('handover.items.quantity'),
          width: 2,
          render: (index) => (
            <NumberFieldMolecule
              control={control}
              name={`items.${index}.quantity`}
              label="handover.items.quantity"
              decimals={3}
              compact
              hideLabel
            />
          ),
        },
      ]}
    />
  )
}
