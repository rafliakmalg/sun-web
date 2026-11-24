import { useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { LoadingMolecule } from '@/components/molecules/LoadingMolecule'
import { PageHeaderMolecule } from '@/components/molecules/PageHeaderMolecule'
import { DataTableOrganism } from '@/components/organisms/DataTableOrganism'
import { HandoverActionDialogOrganism, type HandoverAction } from '@/components/organisms/HandoverActionDialogOrganism'
import { useCan } from '@/features/auth/useCan'
import { formatDateTime, useTranslate } from '@/utils'
import { useLoadHandover } from './api'
import { handoverItemColumns, handoverLogColumns, statusColors } from './columns'

const actions: HandoverAction[] = ['transfer', 'complete', 'cancel']

function availableActions(status: string): HandoverAction[] {
  if (status === 'taken') {
    return actions
  }

  return status === 'completed' ? ['cancel'] : []
}

export function HandoverDetailPage() {
  const { id } = useParams()
  const { data, isPending, error } = useLoadHandover(id)
  const navigate = useNavigate()
  const t = useTranslate()
  const can = useCan()
  const [action, setAction] = useState<HandoverAction | null>(null)

  if (error) {
    return <ErrorAlertMolecule error={error} />
  }

  if (isPending) {
    return <LoadingMolecule />
  }

  const handover = data.data

  return (
    <>
      <title>{`${t('handover')} ${handover.code}`}</title>
      <PageHeaderMolecule title={`${t('handover')} ${handover.code}`}>
        <div className="d-flex flex-wrap gap-2 justify-content-end">
          <Button variant="outline-secondary" onClick={() => navigate('/handovers')}>
            Kembali
          </Button>
          {availableActions(handover.status).filter((item) => can(`handover.${item}`)).map((item) => (
            <Button
              key={item}
              variant={item === 'cancel' ? 'outline-danger' : item === 'complete' ? 'success' : 'primary'}
              onClick={() => setAction(item)}
            >
              {t(`handover.action.${item}`)}
            </Button>
          ))}
        </div>
      </PageHeaderMolecule>

      <Card className="mb-3">
        <Card.Body>
          <dl className="row mb-0">
            <dt className="col-sm-3">{t('handover.status')}</dt>
            <dd className="col-sm-9">
              <Badge bg={statusColors[handover.status] ?? 'secondary'}>{t(`handover.status.${handover.status}`)}</Badge>
            </dd>
            <dt className="col-sm-3">{t('handover.custody_id')}</dt>
            <dd className="col-sm-9">{handover.custody?.name}</dd>
            <dt className="col-sm-3">{t('handover.created_at')}</dt>
            <dd className="col-sm-9">{formatDateTime(handover.created_at)}</dd>
            <dt className="col-sm-3">{t('handover.note')}</dt>
            <dd className="col-sm-9 mb-0">{handover.note ?? '-'}</dd>
          </dl>
        </Card.Body>
      </Card>

      <h2 className="h5">{t('handover.items')}</h2>
      <DataTableOrganism columns={handoverItemColumns} rows={handover.items} />

      <h2 className="h5">{t('handover.logs')}</h2>
      <DataTableOrganism columns={handoverLogColumns} rows={handover.logs} />

      {action && (
        <HandoverActionDialogOrganism
          action={action}
          handover={handover}
          onHide={() => setAction(null)}
        />
      )}
    </>
  )
}
