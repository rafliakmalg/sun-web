import { Spinner } from 'react-bootstrap'

type Props = {
  className?: string
}

export function LoadingMolecule({ className }: Props) {
  return (
    <div className={className}>
      <Spinner animation="border" size="sm" /> Memuat data...
    </div>
  )
}
