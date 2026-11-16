import { Alert } from 'react-bootstrap'
import { errorMessage } from '@/utils'

type Props = {
  className?: string
  error: unknown
}

export function ErrorAlertMolecule({ className, error }: Props) {
  return (
    <Alert variant="danger" className={className}>
      {typeof error === 'string' ? error : errorMessage(error)}
    </Alert>
  )
}
