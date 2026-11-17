import { useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { LoadingMolecule } from '@/components/molecules/LoadingMolecule'
import { PageHeaderMolecule } from '@/components/molecules/PageHeaderMolecule'
import { AdjustmentCancelDialogOrganism } from '@/components/organisms/AdjustmentCancelDialogOrganism'
import { DataTableOrganism } from '@/components/organisms/DataTableOrganism'
import { formatDateTime, useTranslate } from '@/utils'
import { useLoadAdjustment } from './api'
import { adjustmentItemColumns, statusColors } from './columns'

export function AdjustmentDetailPage() {
  const { id } = useParams()
  const { data, isPending, error } = useLoadAdjustment(id)
  const navigate = useNavigate()
  const t = useTranslate()
  const [cancelling, setCancelling] = useState(false)

  if (error) {
    return <ErrorAlertMolecule error={error} />
  }

  if (isPending) {
    return <LoadingMolecule />
  }

  const adjustment = data.data

  return (
    <>
      <title>{`${t('adjustment')} ${adjustment.code}`}</title>
      <PageHeaderMolecule title={`${t('adjustment')} ${adjustment.code}`}>
        <div className="d-flex flex-wrap gap-2 justify-content-end">
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/adjustments')}
          >
            Kembali
          </Button>
          {adjustment.status === 'active' && (
            <Button
              variant="outline-danger"
              onClick={() => setCancelling(true)}
            >
              {t('adjustment.action.cancel')}
            </Button>
          )}
        </div>
      </PageHeaderMolecule>

      <Card className="mb-3">
        <Card.Body>
          <dl className="row mb-0">
            <dt className="col-sm-3">{t('adjustment.status')}</dt>
            <dd className="col-sm-9">
              <Badge bg={statusColors[adjustment.status] ?? 'secondary'}>{t(`adjustment.status.${adjustment.status}`)}</Badge>
            </dd>
            <dt className="col-sm-3">{t('adjustment.created_at')}</dt>
            <dd className="col-sm-9">{formatDateTime(adjustment.created_at)}</dd>
            <dt className="col-sm-3">{t('adjustment.note')}</dt>
            <dd className="col-sm-9 mb-0">{adjustment.note ?? '-'}</dd>
          </dl>
        </Card.Body>
      </Card>

      <DataTableOrganism columns={adjustmentItemColumns} rows={adjustment.items} />

      {cancelling && (
        <AdjustmentCancelDialogOrganism
          adjustment={adjustment}
          onHide={() => setCancelling(false)}
        />
      )}
    </>
  )
}
