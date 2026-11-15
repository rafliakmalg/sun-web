import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { PageHeaderMolecule } from '@/components/molecules/PageHeaderMolecule'
import { PaginationMolecule } from '@/components/molecules/PaginationMolecule'
import { RowActionsMolecule } from '@/components/molecules/RowActionsMolecule'
import { SearchBoxMolecule } from '@/components/molecules/SearchBoxMolecule'
import { ConfirmDialogOrganism } from '@/components/organisms/ConfirmDialogOrganism'
import { DataTableOrganism } from '@/components/organisms/DataTableOrganism'
import { FilterBuilderOrganism } from '@/components/organisms/FilterBuilderOrganism'
import { useListParams } from '@/hooks/useListParams'
import type { ColumnDef } from '@/lib/columns'
import { errorMessage } from '@/lib/errors'
import type { ListParams, Paginated } from '@/lib/types'
import { useTranslate } from '@/lib/lang'

type Props<T extends { id: number }> = {
  title: string
  basePath: string
  columns: ColumnDef<T>[]
  defaultSort: string
  defaultPerPage?: number
  itemName: (item: T) => string
  useList: (params: ListParams) => { data?: Paginated<T>; isPending: boolean; error: unknown }
  useDelete: () => {
    mutate: (item: T, options?: { onSuccess?: () => void; onError?: () => void }) => void
    isPending: boolean
  }
}

export function ListOrganism<T extends { id: number }>({
  title,
  basePath,
  columns,
  defaultSort,
  defaultPerPage = 10,
  itemName,
  useList,
  useDelete,
}: Props<T>) {
  const { params, update } = useListParams(defaultSort, defaultPerPage)
  const { data, isPending, error } = useList(params)
  const remove = useDelete()
  const t = useTranslate()
  const [deleting, setDeleting] = useState<T | null>(null)

  function closeDelete() {
    setDeleting(null)
  }

  function confirmDelete(item: T) {
    remove.mutate(item, {
      onSuccess: () => {
        closeDelete()

        if (data?.data.length === 1 && params.page > 1) {
          update({ page: params.page - 1 })
        }
      },
      onError: closeDelete,
    })
  }

  function onSort(key: string) {
    update({
      sort_by: key,
      sort_dir: params.sort_by === key && params.sort_dir === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <>
      <title>{`${t('list')} ${t(title)}`}</title>
      <PageHeaderMolecule title={t(title)}>
        <Button
          href={`${basePath}/create`}
          target="_blank"
          rel="noopener"
        >
          <Plus size={20} /> {t('create')} {t(title)}
        </Button>
      </PageHeaderMolecule>

      <div className="d-flex justify-content-between gap-2 mb-3">
        <div className="flex-grow-1" style={{ maxWidth: 360 }}>
          <SearchBoxMolecule value={params.search} onChange={(search) => update({ search })} />
        </div>
        <FilterBuilderOrganism
          columns={columns}
          conditions={params.filters}
          onApply={(filters) => update({ filters })}
        />
      </div>

      <DataTableOrganism
        columns={columns}
        actions={(row) => <RowActionsMolecule editHref={`${basePath}/${row.id}/edit`} onDelete={() => setDeleting(row)} />}
        rows={data?.data}
        rowKey={(row) => row.id}
        isLoading={isPending}
        error={error ? errorMessage(error) : null}
        sortBy={params.sort_by}
        sortDir={params.sort_dir}
        onSort={onSort}
      />

      {data && (
        <PaginationMolecule
          page={data.meta.current_page}
          lastPage={data.meta.last_page}
          from={data.meta.from}
          to={data.meta.to}
          total={data.meta.total}
          perPage={params.per_page}
          onChange={(page) => update({ page })}
          onPerPageChange={(per_page) => update({ per_page })}
        />
      )}

      {deleting && (
        <ConfirmDialogOrganism
          title={`${t('delete')} ${t(title)}`}
          message={`${t('delete')} ${t(title).toLowerCase()} "${itemName(deleting)}"?`}
          confirmLabel={t('delete')}
          busy={remove.isPending}
          onConfirm={() => confirmDelete(deleting)}
          onHide={closeDelete}
        />
      )}
    </>
  )
}
