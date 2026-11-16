import type { FormEventHandler, ReactNode } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'

type Props = {
  children: ReactNode
  error?: string | null
  onCancel: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  submitting: boolean
}

export function FormOrganism({ children, error, onCancel, onSubmit, submitting }: Props) {
  return (
    <Form
      noValidate
      onSubmit={onSubmit}
      className="d-flex flex-column flex-grow-1"
    >
      <Card.Body className="flex-grow-1 p-4">
        <div className="form-grid form-container">
          {error && (
            <ErrorAlertMolecule error={error} className="form-wide" />
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
