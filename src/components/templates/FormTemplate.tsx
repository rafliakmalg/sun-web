import { Fragment, type ReactNode } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { LoadingMolecule } from '@/components/molecules/LoadingMolecule'
import { useTranslate } from '@/utils'

type OneHook<T> = (id: string | undefined) => { data?: { data: T }; isPending: boolean; error: unknown }

type Props<T> = {
  heading?: string
  renderForm: (item: T | null) => ReactNode
  title: string
  useOne?: OneHook<T>
}

export function FormTemplate<T>({
  heading: headingKey,
  renderForm,
  title,
  useOne = useNoItem,
}: Props<T>) {
  const { id } = useParams()
  const { data, isPending, error } = useOne(id)
  const t = useTranslate()
  const heading = headingKey ? t(headingKey) : `${id ? t('edit') : t('create')} ${t(title)}`

  if (id && error) {
    return <ErrorAlertMolecule error={error} className="m-4" />
  }

  if (id && isPending) {
    return (
      <>
        <title>{heading}</title>
        <LoadingMolecule className="p-4" />
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

function useNoItem() {
  return {
    data: undefined,
    isPending: false,
    error: null,
  }
}
