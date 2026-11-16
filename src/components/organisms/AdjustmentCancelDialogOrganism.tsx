import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { useCancelAdjustment } from '@/features/adjustments/api'
import type { Adjustment } from '@/features/adjustments/schema'
import { useTranslate } from '@/utils'

type Props = {
  adjustment: Adjustment
  onHide: () => void
}

export function AdjustmentCancelDialogOrganism({ adjustment, onHide }: Props) {
  const t = useTranslate()
  const cancel = useCancelAdjustment(adjustment.id)
  const [error, setError] = useState<unknown>(null)

  function onConfirm() {
    cancel.mutate(undefined, {
      onSuccess: onHide,
      onError: setError,
    })
  }

  return (
    <Modal
      show
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('adjustment.action.cancel')} {adjustment.code}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error !== null && <ErrorAlertMolecule error={error} />}
        Stok dikembalikan seperti sebelum penyesuaian ini. Pembatalan gagal jika stok sudah dipakai.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={cancel.isPending}
        >
          Kembali
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={cancel.isPending}
        >
          {cancel.isPending ? 'Memproses...' : t('adjustment.action.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
