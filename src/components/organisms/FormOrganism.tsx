import type { FormEventHandler, ReactNode } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>
  onCancel: () => void
  submitting: boolean
  error?: string | null
  children: ReactNode
}

export function FormOrganism({ onSubmit, onCancel, submitting, error, children }: Props) {
  return (
    <Form
      noValidate
      onSubmit={onSubmit}
      className="d-flex flex-column flex-grow-1"
    >
      <Card.Body className="flex-grow-1 p-4">
        <div className="form-grid form-container">
          {error && (
            <Alert
              variant="danger"
              className="form-wide"
            >
              {error}
            </Alert>
          )}
          {children}
        </div>
      </Card.Body>
      <Card.Footer className="sticky-bottom bg-body-tertiary py-3 px-4">
        <div className="form-container d-flex justify-content-end gap-2">
          <Button
            variant="outline-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Batal
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </Card.Footer>
    </Form>
  )
}
