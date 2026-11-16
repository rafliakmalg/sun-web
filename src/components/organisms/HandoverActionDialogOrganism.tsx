import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AutocompleteFieldMolecule } from '@/components/molecules/AutocompleteFieldMolecule'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { TextareaFieldMolecule } from '@/components/molecules/TextareaFieldMolecule'
import { useCancelHandover, useCompleteHandover, useTransferHandover } from '@/features/handovers/api'
import { handoverNoteSchema, handoverTransferSchema, type Handover, type HandoverActionInput } from '@/features/handovers/schema'
import { useUserOptions } from '@/features/users/api'
import { applyApiErrors, useTranslate } from '@/utils'

export type HandoverAction = 'cancel' | 'complete' | 'transfer'

type Props = {
  action: HandoverAction
  handover: Handover
  onHide: () => void
}

export function HandoverActionDialogOrganism({ action, handover, onHide }: Props) {
  const cancel = useCancelHandover(handover.id)
  const complete = useCompleteHandover(handover.id)
  const transfer = useTransferHandover(handover.id)
  const t = useTranslate()
  const mutation = { cancel, complete, transfer }[action]

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<HandoverActionInput>({
    resolver: zodResolver(action === 'transfer' ? handoverTransferSchema : handoverNoteSchema),
    defaultValues: {
      custody_to_id: '',
      note: '',
    },
  })

  function onSubmit(values: HandoverActionInput) {
    mutation.mutate(
      {
        custody_to_id: action === 'transfer' ? values.custody_to_id : undefined,
        note: values.note || undefined,
      },
      {
        onSuccess: onHide,
        onError: (error) => applyApiErrors(error, setError),
      },
    )
  }

  return (
    <Modal
      show
      onHide={onHide}
      centered
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t(`handover.action.${action}`)} {handover.code}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errors.root && <ErrorAlertMolecule error={errors.root.message} />}
          {action === 'transfer' && (
            <AutocompleteFieldMolecule
              control={control}
              name="custody_to_id"
              label="handover.custody_to_id"
              useSearch={useUserOptions}
              autoFocus
            />
          )}
          <TextareaFieldMolecule
            control={control}
            name="note"
            label="handover.note"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onHide}
            disabled={mutation.isPending}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant={action === 'cancel' ? 'danger' : 'primary'}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Memproses...' : t(`handover.action.${action}`)}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
