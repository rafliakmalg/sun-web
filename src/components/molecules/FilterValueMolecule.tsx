import { Form } from 'react-bootstrap'
import { AutocompleteInputMolecule } from '@/components/molecules/AutocompleteInputMolecule'
import { SelectInputMolecule } from '@/components/molecules/SelectInputMolecule'
import { filterKind, type ColumnDef, type FilterCondition } from '@/utils'

type Props<T> = {
  column: ColumnDef<T>
  condition: FilterCondition
  onChange: (value: string) => void
}

export function FilterValueMolecule<T>({ column, condition, onChange }: Props<T>) {
  const kind = filterKind(column)
  const { operator, value } = condition

  if (operator === 'null') {
    return (
      <SelectInputMolecule
        value={value}
        onChange={onChange}
        options={[
          {
            label: 'Kosong',
            value: '1',
          },
          {
            label: 'Terisi',
            value: '0',
          },
        ]}
      />
    )
  }

  if (kind === 'option' && column.useOptions) {
    return (
      <AutocompleteInputMolecule
        key={column.key}
        value={value}
        onChange={onChange}
        useSearch={column.useOptions}
        placeholder="Ketik atau pilih..."
      />
    )
  }

  if (kind === 'boolean') {
    return (
      <SelectInputMolecule
        value={value}
        onChange={onChange}
        placeholder="Pilih..."
        options={[
          {
            label: column.labels?.[0] ?? 'Ya',
            value: '1',
          },
          {
            label: column.labels?.[1] ?? 'Tidak',
            value: '0',
          },
        ]}
      />
    )
  }

  const type = kind === 'date' ? 'date' : kind === 'number' && operator !== 'in' ? 'number' : 'text'

  if (operator === 'between') {
    const [from = '', to = ''] = value.split(',')

    return (
      <div className="d-flex gap-2">
        <Form.Control
          type={type}
          step="any"
          value={from}
          onChange={(event) => onChange(`${event.target.value},${to}`)}
        />
        <Form.Control
          type={type}
          step="any"
          value={to}
          onChange={(event) => onChange(`${from},${event.target.value}`)}
        />
      </div>
    )
  }

  return (
    <Form.Control
      type={type}
      step="any"
      value={value}
      placeholder={operator === 'in' ? 'Pisahkan dengan koma' : undefined}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
