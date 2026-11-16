import { Form, Pagination as BootstrapPagination } from 'react-bootstrap'

type Props = {
  from: number | null
  lastPage: number
  onChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  page: number
  perPage: number
  perPageOptions?: number[]
  to: number | null
  total: number
}

export function PaginationMolecule({
  from,
  lastPage,
  onChange,
  onPerPageChange,
  page,
  perPage,
  perPageOptions = [10, 25, 50, 100],
  to,
  total,
}: Props) {
  const start = Math.max(1, Math.min(page - 2, lastPage - 4))
  const end = Math.min(lastPage, start + 4)
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index)
  const sizes = [...new Set([...perPageOptions, perPage])].sort((a, b) => a - b)

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <small className="text-muted">
        {total > 0 ? `Menampilkan ${from}–${to} dari ${total}` : 'Tidak ada data'}
      </small>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">Per halaman</small>
          <Form.Select
            size="sm"
            style={{ width: 80 }}
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
        </div>
        {lastPage > 1 && (
          <BootstrapPagination className="mb-0">
            <BootstrapPagination.Prev disabled={page <= 1} onClick={() => onChange(page - 1)} />
            {pages.map((number) => (
              <BootstrapPagination.Item
                key={number}
                active={number === page}
                onClick={() => onChange(number)}
              >
                {number}
              </BootstrapPagination.Item>
            ))}
            <BootstrapPagination.Next disabled={page >= lastPage} onClick={() => onChange(page + 1)} />
          </BootstrapPagination>
        )}
      </div>
    </div>
  )
}
