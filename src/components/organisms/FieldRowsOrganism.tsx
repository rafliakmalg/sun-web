import type { ReactNode } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { useFieldArray, type ArrayPath, type Control, type FieldArray, type FieldArrayWithId, type FieldValues } from 'react-hook-form'
import { IconButtonAtom } from '@/components/atoms/IconButtonAtom'

export type RowColumn<T extends FieldValues, N extends ArrayPath<T>> = {
  label: string
  render: (index: number, row: FieldArrayWithId<T, N>) => ReactNode
  width: number
}

type Props<T extends FieldValues, N extends ArrayPath<T>> = {
  addLabel: string
  columns: RowColumn<T, N>[]
  control: Control<T>
  empty?: string
  error?: string
  helper?: string
  label: string
  name: N
  newRow: FieldArray<T, N>
  removeLabel: string
}

export function FieldRowsOrganism<T extends FieldValues, N extends ArrayPath<T>>({
  addLabel,
  columns,
  control,
  empty,
  error,
  helper,
  label,
  name,
  newRow,
  removeLabel,
}: Props<T, N>) {
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <div className="form-wide mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <Form.Label className="mb-0">{label}</Form.Label>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => append(newRow)}
        >
          {addLabel}
        </Button>
      </div>
      {helper && <Form.Text className="d-block mb-2">{helper}</Form.Text>}
      {error && <p className="text-danger small">{error}</p>}
      {fields.length === 0 && empty && <p className="text-muted small mb-0">{empty}</p>}
      {fields.length > 0 && (
        <div className="border rounded">
          <Row className="g-2 mx-0 px-2 py-2 bg-body-tertiary text-muted small d-none d-md-flex">
            {columns.map((column) => (
              <Col key={column.label} md={column.width}>
                {column.label}
              </Col>
            ))}
            <Col md={1} />
          </Row>
          {fields.map((row, index) => (
            <Row
              key={row.id}
              className="g-2 mx-0 p-2 border-top align-items-start"
            >
              {columns.map((column) => (
                <Col key={column.label} md={column.width}>
                  {column.render(index, row)}
                </Col>
              ))}
              <Col
                md={1}
                className="d-flex justify-content-end"
              >
                <IconButtonAtom
                  icon={Trash}
                  label={removeLabel}
                  variant="outline-danger"
                  onClick={() => remove(index)}
                />
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  )
}
