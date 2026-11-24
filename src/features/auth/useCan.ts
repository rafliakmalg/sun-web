import { useAuth } from '@/stores/auth'

export function useCan() {
  const permissions = useAuth((state) => state.permissions)

  return (permission: string) => permissions.includes(permission)
}
