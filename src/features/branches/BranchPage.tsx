import { ListTemplate } from '@/components/templates/ListTemplate'
import { useCan } from '@/features/auth/useCan'
import { useDeleteBranch, useReadBranch } from './api'
import { branchColumns } from './columns'

export function BranchPage() {
  const can = useCan()

  return (
    <ListTemplate
      title="branch"
      columns={branchColumns}
      defSort="name"
      useList={useReadBranch}
      canCreate={can('branch.create')}
      urlCreate="/branches/create"
      canEdit={can('branch.update')}
      urlEdit={(branch) => `/branches/${branch.id}/edit`}
      canDelete={can('branch.delete')}
      useDelete={useDeleteBranch}
      itemName={(branch) => branch.name}
    />
  )
}
