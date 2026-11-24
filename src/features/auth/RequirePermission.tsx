import type { ReactNode } from 'react'
import { Alert } from 'react-bootstrap'
import { useCan } from './useCan'

type Props = {
  children: ReactNode
  permission: string
}

export function RequirePermission({ children, permission }: Props) {
  const can = useCan()

  if (!can(permission)) {
    return (
      <Alert
        variant="warning"
        className="m-4"
      >
        <title>Tidak Ada Akses</title>
        Anda tidak memiliki akses ke halaman ini.
      </Alert>
    )
  }

  return children
}
