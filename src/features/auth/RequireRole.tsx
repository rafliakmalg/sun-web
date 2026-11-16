import { Alert } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { useAuth } from '@/stores/auth'
import { canAccess } from '@/utils'

type Props = {
  allow: string[]
}

export function RequireRole({ allow }: Props) {
  const role = useAuth((state) => state.user?.role?.name)

  if (!canAccess(role, allow)) {
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

  return <Outlet />
}
