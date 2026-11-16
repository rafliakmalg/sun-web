import { Button } from 'react-bootstrap'
import { FilterValueMolecule } from '@/components/molecules/FilterValueMolecule'
import { SelectInputMolecule } from '@/components/molecules/SelectInputMolecule'
import { filterKind, operatorLabels, operatorsByKind, useTranslate, type ColumnDef, type FilterCondition, type FilterOperator } from '@/utils'

type Props<T> = {
  column: ColumnDef<T>
  condition: FilterCondition
  fields: ColumnDef<T>[]
  onField: (key: string) => void
  onOperator: (operator: FilterOperator) => void
  onRemove: () => void
  onValue: (value: string) => void
}

export function FilterRowMolecule<T>({ column, condition, fields, onField, onOperator, onRemove, onValue }: Props<T>) {
  const t = useTranslate()

  return (
    <div className="border rounded p-2 mb-3">
      <div className="d-flex gap-2 mb-2">
        <SelectInputMolecule
          value={condition.field}
          onChange={onField}
          options={fields.map((field) => ({
            label: t(field.header),
            value: field.key,
          }))}
        />
        <Button
          variant="outline-danger"
          aria-label="Hapus filter"
          onClick={onRemove}
        >
          ×
        </Button>
      </div>
      <SelectInputMolecule
        className="mb-2"
        value={condition.operator}
        onChange={(operator) => onOperator(operator as FilterOperator)}
        options={operatorsByKind[filterKind(column)].map((operator) => ({
          label: operatorLabels[operator],
          value: operator,
        }))}
      />
      <FilterValueMolecule
        column={column}
        condition={condition}
        onChange={onValue}
      />
    </div>
  )
}
