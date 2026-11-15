import { useOptions } from '@/lib/options'
import { useGet, useSend } from '@/lib/request'
import type { ListParams, Paginated } from '@/lib/types'
import type { Branch, BranchInput } from './schema'

const path = '/branches'

export function useBranchOptions(search: string, enabled: boolean) {
  return useOptions(path, 'name', search, enabled)
}

export function useDeleteBranch() {
  return useSend<Branch>('delete', (branch) => `${path}/${branch.id}`, [path])
}

export function useLoadBranch(id: string | undefined) {
  return useGet<{ data: Branch }>(`${path}/${id}`, {}, { enabled: !!id })
}

export function useReadBranch(params: ListParams) {
  return useGet<Paginated<Branch>>(path, params, { keepPrevious: true })
}

export function useSaveBranch(branch: Branch | null) {
  return useSend<BranchInput>(branch ? 'put' : 'post', branch ? `${path}/${branch.id}` : path, [path])
}
