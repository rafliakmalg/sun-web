import { Button, Modal } from 'react-bootstrap'
import { useTranslate } from '@/utils'

export type DeleteHook<T> = () => {
  mutate: (item: T, options?: { onSuccess?: () => void; onError?: () => void }) => void
  isPending: boolean
}

type Props<T> = {
  item: T
  name: string
  onDeleted: () => void
  onHide: () => void
  title: string
  useDelete: DeleteHook<T>
}

export function DeleteDialogOrganism<T>({ item, name, onDeleted, onHide, title, useDelete }: Props<T>) {
  const t = useTranslate()
  const remove = useDelete()

  function onConfirm() {
    remove.mutate(item, {
      onSuccess: onDeleted,
      onError: onHide,
    })
  }

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`${t('delete')} ${t(title)}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`${t('delete')} ${t(title).toLowerCase()} "${name}"?`}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={remove.isPending}
        >
          Batal
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={remove.isPending}
        >
          {remove.isPending ? 'Memproses...' : t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
