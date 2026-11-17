import { useGet } from '@/utils'
import type { Dashboard } from './schema'

const path = '/dashboard'

export function useLoadDashboard() {
  return useGet<{ data: Dashboard }>(path)
}
