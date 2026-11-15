import { ListOrganism } from '@/components/organisms/ListOrganism'
import { useDeleteBranch, useReadBranch } from './api'
import { branchColumns } from './columns'

export function BranchPage() {
  return (
    <ListOrganism
      title="Cabang"
      basePath="/branches"
      defaultSort="name"
      columns={branchColumns}
      itemName={(branch) => branch.name}
      useList={useReadBranch}
      useDelete={useDeleteBranch}
    />
  )
}
