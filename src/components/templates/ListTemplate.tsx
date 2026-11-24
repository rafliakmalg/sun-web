import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { PageHeaderMolecule } from '@/components/molecules/PageHeaderMolecule'
import { PaginationMolecule } from '@/components/molecules/PaginationMolecule'
import { RowActionsMolecule } from '@/components/molecules/RowActionsMolecule'
import { SearchBoxMolecule } from '@/components/molecules/SearchBoxMolecule'
import { DataTableOrganism } from '@/components/organisms/DataTableOrganism'
import { DeleteDialogOrganism, type DeleteHook } from '@/components/organisms/DeleteDialogOrganism'
import { FilterBuilderOrganism } from '@/components/organisms/FilterBuilderOrganism'
import { useListParams } from '@/hooks/useListParams'
import { useTranslate, type ColumnDef, type ListParams, type Paginated, type SortDir } from '@/utils'

type BaseProps<T> = {
  columns: ColumnDef<T>[]
  defPerPage?: number
  defSort: string
  defSortDir?: SortDir
  title: string
  useList: (params: ListParams) => { data?: Paginated<T>; isPending: boolean; error: unknown }
}

type CreateProps = { canCreate?: undefined } | { canCreate: boolean; urlCreate: string; createLabel?: string }

type ViewProps<T> = { canView?: undefined } | { canView: boolean; urlView: (item: T) => string }

type EditProps<T> = { canEdit?: undefined } | { canEdit: boolean; urlEdit: (item: T) => string }

type DeleteProps<T> = { canDelete?: undefined } | { canDelete: boolean; useDelete: DeleteHook<T>; itemName: (item: T) => string }

type Props<T> = BaseProps<T> & CreateProps & ViewProps<T> & EditProps<T> & DeleteProps<T>

export function ListTemplate<T extends { id: number }>(props: Props<T>) {
  const { title, columns, defSort, defSortDir = 'asc', defPerPage = 10, useList } = props
  const { params, update } = useListParams(defSort, defPerPage, defSortDir)
  const { data, isPending, error } = useList(params)
  const t = useTranslate()
  const [deleting, setDeleting] = useState<T | null>(null)
  const hasActions = props.canView || props.canEdit || props.canDelete

  function onDeleteClose() {
    setDeleting(null)
  }

  function onDeleteDone() {
    onDeleteClose()

    if (data?.data.length === 1 && params.page > 1) {
      update({ page: params.page - 1 })
    }
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
        {props.canCreate && (
          <Button
            href={props.urlCreate}
            target="_blank"
            rel="noopener"
          >
            <Plus size={20} /> {props.createLabel ? t(props.createLabel) : `${t('create')} ${t(title)}`}
          </Button>
        )}
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
        error={error}
        loading={isPending}
        renderActions={
          hasActions
            ? (row) => (
                <RowActionsMolecule
                  urlView={props.canView ? props.urlView(row) : undefined}
                  urlEdit={props.canEdit ? props.urlEdit(row) : undefined}
                  onDelete={props.canDelete ? () => setDeleting(row) : undefined}
                />
              )
            : undefined
        }
        rows={data?.data}
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

      {props.canDelete && deleting && (
        <DeleteDialogOrganism
          title={title}
          name={props.itemName(deleting)}
          item={deleting}
          useDelete={props.useDelete}
          onDeleted={onDeleteDone}
          onHide={onDeleteClose}
        />
      )}
    </>
  )
}
