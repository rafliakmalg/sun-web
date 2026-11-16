import { AutocompleteInputMolecule } from '@/components/molecules/AutocompleteInputMolecule'
import { FieldFrameMolecule } from '@/components/molecules/FieldFrameMolecule'
import { useWarehouseOptions } from '@/features/warehouses/api'
import { useTranslate } from '@/utils'

type Props = {
  heading: string
  id: string
  onChange: (value: string) => void
  value: string
}

export function WarehousePickerMolecule({ heading, id, onChange, value }: Props) {
  const t = useTranslate()

  return (
    <div>
      <p className="fw-semibold mb-2">{t(heading)}</p>
      <FieldFrameMolecule
        id={id}
        label="rack.warehouse_id"
      >
        <AutocompleteInputMolecule
          id={id}
          value={value}
          onChange={onChange}
          useSearch={useWarehouseOptions}
        />
      </FieldFrameMolecule>
    </div>
  )
}
