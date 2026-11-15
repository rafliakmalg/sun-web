import { useEffect, useState } from 'react'
import { Badge, Button, Form, Offcanvas } from 'react-bootstrap'
import { AutocompleteInputMolecule } from '@/components/molecules/AutocompleteInputMolecule'
import { operatorLabels, operatorsByKind, type FilterCondition, type FilterOperator } from '@/lib/filters'
import { filterKind, type ColumnDef } from '@/lib/columns'

type Props<T> = {
  columns: ColumnDef<T>[]
  conditions: FilterCondition[]
  onApply: (conditions: FilterCondition[]) => void
}

type ValueInputProps<T> = {
  column: ColumnDef<T>
  condition: FilterCondition
  onChange: (value: string) => void
}

export function FilterBuilderOrganism<T>({ columns, conditions, onApply }: Props<T>) {
  const fields = columns.filter((column) => column.filterable)
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState(conditions)
  const [seen, setSeen] = useState(JSON.stringify(conditions))

  const applied = JSON.stringify(conditions)

  if (applied !== seen) {
    setSeen(applied)

    if (applied !== JSON.stringify(rows.filter(isComplete))) {
      setRows(conditions)
    }
  }

  useEffect(() => {
    const complete = rows.filter(isComplete)

    if (JSON.stringify(complete) === applied) {
      return
    }

    const timer = setTimeout(() => onApply(complete), 500)

    return () => clearTimeout(timer)
  }, [rows, applied, onApply])

  if (fields.length === 0) {
    return null
  }

  function change(index: number, changes: Partial<FilterCondition>) {
    setRows(rows.map((row, position) => (position === index ? { ...row, ...changes } : row)))
  }

  function changeField(index: number, key: string) {
    const column = fields.find((field) => field.key === key)

    if (column) {
      setRows(rows.map((row, position) => (position === index ? newRow(column) : row)))
    }
  }

  function changeOperator(index: number, operator: FilterOperator) {
    change(index, { operator, value: operator === 'null' ? '1' : '' })
  }

  function newRow(column: ColumnDef<T>): FilterCondition {
    const operator = operatorsByKind[filterKind(column)][0]

    return { field: column.key, operator, value: operator === 'null' ? '1' : '' }
  }

  function reset() {
    setRows([])
    onApply([])
  }

  return (
    <>
      <Button
        variant="outline-secondary"
        className="flex-shrink-0 text-nowrap"
        onClick={() => setOpen(true)}
      >
        Filter {conditions.length > 0 && <Badge bg="primary">{conditions.length}</Badge>}
      </Button>

      <Offcanvas
        show={open}
        onHide={() => setOpen(false)}
        placement="end"
        backdrop={false}
        scroll
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="text-muted small">Semua syarat berlaku bersamaan dan diterapkan otomatis.</p>

          {rows.map((row, index) => {
            const column = fields.find((field) => field.key === row.field)

            if (!column) {
              return null
            }

            return (
              <div key={index} className="border rounded p-2 mb-3">
                <div className="d-flex gap-2 mb-2">
                  <Form.Select value={row.field} onChange={(event) => changeField(index, event.target.value)}>
                    {fields.map((field) => (
                      <option key={field.key} value={field.key}>
                        {field.header}
                      </option>
                    ))}
                  </Form.Select>
                  <Button
                    variant="outline-danger"
                    aria-label="Hapus filter"
                    onClick={() => setRows(rows.filter((_, position) => position !== index))}
                  >
                    ×
                  </Button>
                </div>
                <Form.Select
                  className="mb-2"
                  value={row.operator}
                  onChange={(event) => changeOperator(index, event.target.value as FilterOperator)}
                >
                  {operatorsByKind[filterKind(column)].map((operator) => (
                    <option key={operator} value={operator}>
                      {operatorLabels[operator]}
                    </option>
                  ))}
                </Form.Select>
                <ValueInput
                  column={column}
                  condition={row}
                  onChange={(value) => change(index, { value })}
                />
              </div>
            )
          })}

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setRows([...rows, newRow(fields[0])])}
            >
              + Tambah filter
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

function isComplete({ operator, value }: FilterCondition) {
  if (operator === 'between') {
    const [from, to] = value.split(',')

    return !!from && !!to
  }

  return value !== ''
}

function ValueInput<T>({ column, condition, onChange }: ValueInputProps<T>) {
  const kind = filterKind(column)
  const { operator, value } = condition

  if (operator === 'null') {
    return (
      <Form.Select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="1">Kosong</option>
        <option value="0">Terisi</option>
      </Form.Select>
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
      <Form.Select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Pilih...</option>
        <option value="1">{column.labels?.[0] ?? 'Ya'}</option>
        <option value="0">{column.labels?.[1] ?? 'Tidak'}</option>
      </Form.Select>
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
