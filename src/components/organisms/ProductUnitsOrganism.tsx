import { useWatch, type Control } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { NumberFieldMolecule } from '@/components/molecules/NumberFieldMolecule'
import { FieldRowsOrganism } from '@/components/organisms/FieldRowsOrganism'
import type { Product, ProductInput } from '@/features/products/schema'
import { useUnitOptions } from '@/features/units/api'
import { useTranslate } from '@/utils'

type Props = {
  control: Control<ProductInput>
  product: Product | null
}

export function ProductUnitsOrganism({ control, product }: Props) {
  const t = useTranslate()
  const baseUnitId = useWatch({ control, name: 'base_unit_id' })
  const baseUnitName = useUnitOptions('', !!baseUnitId).options.find((unit) => unit.value === baseUnitId)?.label

  return (
    <FieldRowsOrganism
      control={control}
      name="units"
      label={t('product.units')}
      addLabel={`+ ${t('create')} ${t('unit')}`}
      removeLabel="Hapus satuan"
      newRow={{
        unit_id: '',
        factor: '',
      }}
      helper="Jumlah adalah isi satuan terkecil dalam 1 satuan tambahan, misalnya 1 Carton = 12 Pieces."
      empty="Belum ada satuan tambahan."
      columns={[
        {
          label: t('product.units.unit_id'),
          width: 6,
          render: (index, row) => (
            <AutocompleteFieldMolecule
              control={control}
              name={`units.${index}.unit_id`}
              label="product.units.unit_id"
              useSearch={useUnitOptions}
              initialLabel={product?.units?.find((unit) => String(unit.unit_id) === row.unit_id)?.unit?.name}
              compact
              hideLabel
            />
          ),
        },
        {
          label: t('product.units.factor'),
          width: 5,
          render: (index) => (
            <NumberFieldMolecule
              control={control}
              name={`units.${index}.factor`}
              label="product.units.factor"
              decimals={6}
              suffix={baseUnitName ?? t('product.base_unit_id').toLowerCase()}
              compact
              hideLabel
            />
          ),
        },
      ]}
    />
  )
}
