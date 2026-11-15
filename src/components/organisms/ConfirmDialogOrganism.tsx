import { Button, Modal } from 'react-bootstrap'

type Props = {
  title: string
  message: string
  confirmLabel?: string
  busy: boolean
  onConfirm: () => void
  onHide: () => void
}

export function ConfirmDialogOrganism({ title, message, confirmLabel = 'Hapus', busy, onConfirm, onHide }: Props) {
  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={busy}
        >
          Batal
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={busy}
        >
          {busy ? 'Memproses...' : confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
