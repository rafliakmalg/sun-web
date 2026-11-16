import { useEffect, useState } from 'react'
import { Badge, Button, Offcanvas } from 'react-bootstrap'
import { FilterRowMolecule } from '@/components/molecules/FilterRowMolecule'
import { filterKind, operatorsByKind, type ColumnDef, type FilterCondition, type FilterOperator } from '@/utils'

type Props<T> = {
  columns: ColumnDef<T>[]
  conditions: FilterCondition[]
  onApply: (conditions: FilterCondition[]) => void
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

    return {
      field: column.key,
      operator,
      value: operator === 'null' ? '1' : '',
    }
  }

  function onReset() {
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
              <FilterRowMolecule
                key={index}
                fields={fields}
                column={column}
                condition={row}
                onField={(key) => changeField(index, key)}
                onOperator={(operator) => changeOperator(index, operator)}
                onValue={(value) => change(index, { value })}
                onRemove={() => setRows(rows.filter((_, position) => position !== index))}
              />
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
              onClick={onReset}
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
