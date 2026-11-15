import { Alert } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { canAccess } from '@/lib/access'
import { useAuth } from '@/stores/auth'

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
