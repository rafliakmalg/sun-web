import { useGet } from '@/utils'
import type { Dashboard } from './schema'

const path = '/wms/dashboard'

export function useLoadDashboard() {
  return useGet<{ data: Dashboard }>(path)
}
