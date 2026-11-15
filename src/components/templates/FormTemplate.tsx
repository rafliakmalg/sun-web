import { Fragment, type ReactNode } from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import { errorMessage } from '@/lib/errors'

type Props<T> = {
  title: string
  useOne: (id: string | undefined) => { data?: { data: T }; isPending: boolean; error: unknown }
  renderForm: (item: T | null) => ReactNode
}

export function FormTemplate<T>({ title, useOne, renderForm }: Props<T>) {
  const { id } = useParams()
  const { data, isPending, error } = useOne(id)
  const heading = `${id ? 'Ubah' : 'Buat'} ${title}`

  if (id && error) {
    return <Alert variant="danger" className="m-4">{errorMessage(error)}</Alert>
  }

  if (id && isPending) {
    return (
      <>
        <title>{heading}</title>
        <p className="p-4">
          <Spinner animation="border" size="sm" /> Memuat data...
        </p>
      </>
    )
  }

  return (
    <>
      <title>{heading}</title>
      <Card className="flex-grow-1 rounded-0 border-0">
        <Card.Header className="px-4 py-3">
          <h1 className="form-container h4 mb-0">{heading}</h1>
        </Card.Header>
        <Fragment key={id ?? 'baru'}>{renderForm(data?.data ?? null)}</Fragment>
      </Card>
    </>
  )
}
