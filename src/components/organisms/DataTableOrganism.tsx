import type { ReactNode } from 'react'
import { Table } from 'react-bootstrap'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { LoadingMolecule } from '@/components/molecules/LoadingMolecule'
import { alignClass, renderCell, useTranslate, type ColumnDef, type SortDir } from '@/utils'

type Props<T> = {
  columns: ColumnDef<T>[]
  error?: unknown
  loading?: boolean
  onSort?: (key: string) => void
  renderActions?: (row: T) => ReactNode
  rows: T[] | undefined
  sortBy?: string
  sortDir?: SortDir
}

export function DataTableOrganism<T extends { id: number | string }>({
  columns: allColumns,
  error,
  loading,
  onSort,
  renderActions,
  rows,
  sortBy,
  sortDir,
}: Props<T>) {
  const t = useTranslate()
  const columns = allColumns.filter((column) => !column.hidden)
  const columnCount = columns.length + (renderActions ? 1 : 0)

  if (error) {
    return <ErrorAlertMolecule error={error} />
  }

  return (
    <Table
      hover
      responsive
      className="bg-white align-middle text-nowrap"
    >
      <thead>
        <tr>
          {renderActions && <th className="sticky-start" />}
          {columns.map((column) => (
            <th key={column.key} className={alignClass(column)}>
              {column.sortable && onSort ? (
                <button
                  type="button"
                  className="btn btn-link p-0 fw-bold text-decoration-none text-body"
                  onClick={() => onSort(column.key)}
                >
                  {t(column.header)}
                  {column.key === sortBy && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                </button>
              ) : (
                t(column.header)
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={columnCount} className="text-center py-4">
              <LoadingMolecule />
            </td>
          </tr>
        )}
        {!loading && rows?.length === 0 && (
          <tr>
            <td colSpan={columnCount} className="text-center text-muted py-4">
              Belum ada data.
            </td>
          </tr>
        )}
        {rows?.map((row) => (
          <tr key={row.id}>
            {renderActions && <td className="sticky-start">{renderActions(row)}</td>}
            {columns.map((column) => (
              <td key={column.key} className={alignClass(column)}>
                {renderCell(column, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
