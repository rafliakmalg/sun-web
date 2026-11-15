import type { ReactNode } from 'react'
import { Badge } from 'react-bootstrap'
import type { OptionSearch } from '@/lib/fields'
import type { FilterKind } from '@/lib/filters'

export type ColumnType = 'text' | 'number' | 'date' | 'time' | 'datetime' | 'boolean'

export type ColumnDef<T> = {
  key: keyof T & string
  header: string
  type?: ColumnType
  decimals?: number
  labels?: [string, string]
  sortable?: boolean
  filterable?: boolean
  useOptions?: OptionSearch
  align?: 'start' | 'center' | 'end'
  render?: (row: T) => ReactNode
}

const timeOnly = /^\d{2}:\d{2}(:\d{2})?$/

export function alignClass<T>(column: ColumnDef<T>): string {
  return `text-${column.align ?? (column.type === 'number' ? 'end' : 'start')}`
}

export function filterKind<T>(column: ColumnDef<T>): FilterKind {
  if (column.useOptions) {
    return 'option'
  }

  switch (column.type) {
    case 'number':
      return 'number'
    case 'date':
    case 'datetime':
      return 'date'
    case 'boolean':
      return 'boolean'
    default:
      return 'text'
  }
}

function formatValue(value: unknown, type: ColumnType, column: { decimals?: number; labels?: [string, string] }) {
  switch (type) {
    case 'number':
      return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: column.decimals ?? 0,
        maximumFractionDigits: column.decimals ?? 0,
      }).format(Number(value))
    case 'date':
      return new Date(String(value)).toLocaleDateString('sv-SE')
    case 'time':
      return timeOnly.test(String(value)) ? String(value).padEnd(8, ':00') : new Date(String(value)).toLocaleTimeString('sv-SE')
    case 'datetime':
      return new Date(String(value)).toLocaleString('sv-SE')
    case 'boolean': {
      const [yes, no] = column.labels ?? ['Ya', 'Tidak']

      return <Badge bg={value ? 'success' : 'secondary'}>{value ? yes : no}</Badge>
    }
    default:
      return String(value)
  }
}

export function renderCell<T>(column: ColumnDef<T>, row: T): ReactNode {
  if (column.render) {
    return column.render(row)
  }

  const value = row[column.key]

  if (value === null || value === undefined || value === '') {
    return <span className="text-muted">-</span>
  }

  return formatValue(value, column.type ?? 'text', column)
}
