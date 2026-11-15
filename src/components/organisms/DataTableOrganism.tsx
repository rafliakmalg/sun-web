import type { ReactNode } from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import type { SortDir } from '@/lib/types'
import { alignClass, renderCell, type ColumnDef } from '@/lib/columns'

type Props<T> = {
  columns: ColumnDef<T>[]
  actions?: (row: T) => ReactNode
  rows: T[] | undefined
  rowKey: (row: T) => number | string
  isLoading: boolean
  error?: string | null
  sortBy: string
  sortDir: SortDir
  onSort: (key: string) => void
}

export function DataTableOrganism<T>({ columns, actions, rows, rowKey, isLoading, error, sortBy, sortDir, onSort }: Props<T>) {
  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  const columnCount = columns.length + (actions ? 1 : 0)

  return (
    <Table
      hover
      responsive
      className="bg-white align-middle text-nowrap"
    >
      <thead>
        <tr>
          {actions && <th className="sticky-start" />}
          {columns.map((column) => (
            <th key={column.key} className={alignClass(column)}>
              {column.sortable ? (
                <button
                  type="button"
                  className="btn btn-link p-0 fw-bold text-decoration-none text-body"
                  onClick={() => onSort(column.key)}
                >
                  {column.header}
                  {column.key === sortBy && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                </button>
              ) : (
                column.header
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={columnCount} className="text-center py-4">
              <Spinner animation="border" size="sm" /> Memuat data...
            </td>
          </tr>
        )}
        {!isLoading && rows?.length === 0 && (
          <tr>
            <td colSpan={columnCount} className="text-center text-muted py-4">
              Belum ada data.
            </td>
          </tr>
        )}
        {rows?.map((row) => (
          <tr key={rowKey(row)}>
            {actions && <td className="sticky-start">{actions(row)}</td>}
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
