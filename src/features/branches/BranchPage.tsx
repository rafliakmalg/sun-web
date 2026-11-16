import { ListTemplate } from '@/components/templates/ListTemplate'
import { useDeleteBranch, useReadBranch } from './api'
import { branchColumns } from './columns'

export function BranchPage() {
  return (
    <ListTemplate
      title="branch"
      columns={branchColumns}
      defSort="name"
      useList={useReadBranch}
      canCreate
      urlCreate="/branches/create"
      canEdit
      urlEdit={(branch) => `/branches/${branch.id}/edit`}
      canDelete
      useDelete={useDeleteBranch}
      itemName={(branch) => branch.name}
    />
  )
}
