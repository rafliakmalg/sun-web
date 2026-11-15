import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/stores/auth'

export function RequireAuth() {
  const token = useAuth((state) => state.token)

  return token ? <Outlet /> : <Navigate to="/login" replace />
}
