import { useState } from 'react'
import { Card, Col, ProgressBar, Row } from 'react-bootstrap'
import { Boxes, BoxSeam, Sliders, Truck } from 'react-bootstrap-icons'
import { BarChartMolecule } from '@/components/molecules/BarChartMolecule'
import { DonutChartMolecule } from '@/components/molecules/DonutChartMolecule'
import { ErrorAlertMolecule } from '@/components/molecules/ErrorAlertMolecule'
import { LoadingMolecule } from '@/components/molecules/LoadingMolecule'
import { PageHeaderMolecule } from '@/components/molecules/PageHeaderMolecule'
import { RowActionsMolecule } from '@/components/molecules/RowActionsMolecule'
import { StatCardMolecule } from '@/components/molecules/StatCardMolecule'
import { DataTableOrganism } from '@/components/organisms/DataTableOrganism'
import { handoverColumns } from '@/features/handovers/columns'
import { useAuth } from '@/stores/auth'
import { formatNumber, useTranslate } from '@/utils'
import { useLoadDashboard } from './api'
import { lowStockColumns, recentMovementColumns } from './columns'

const variants = ['primary', 'success', 'warning', 'info', 'danger']

export function DashboardPage() {
  const { data, error, isPending } = useLoadDashboard()
  const name = useAuth((state) => state.user?.name ?? '')
  const t = useTranslate()
  const [today] = useState(() =>
    new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
      year: 'numeric',
    }),
  )

  if (error) {
    return <ErrorAlertMolecule error={error} />
  }

  if (isPending) {
    return <LoadingMolecule />
  }

  const dashboard = data.data
  const largestStock = Math.max(...dashboard.stock_by_warehouse.map((warehouse) => Number(warehouse.total_quantity)), 1)

  return (
    <>
      <title>{t('dashboard')}</title>
      <PageHeaderMolecule title={t('dashboard')} />
      <p className="text-muted mb-4">
        {t('dashboard.welcome', { name })} · {today}
      </p>

      <Row className="g-3 mb-3">
        <Col sm={6} xl={3}>
          <StatCardMolecule
            hint={t('dashboard.low_stock_hint', { count: dashboard.low_stock_total })}
            icon={BoxSeam}
            label="dashboard.total_products"
            to="/products"
            tone="primary"
            value={formatNumber(dashboard.total_products)}
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatCardMolecule
            hint={t('dashboard.warehouses_hint', { count: dashboard.stock_by_warehouse.length })}
            icon={Boxes}
            label="dashboard.total_quantity"
            to="/inventories"
            tone="success"
            value={formatNumber(dashboard.total_quantity, 3)}
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatCardMolecule
            icon={Truck}
            label="dashboard.taken_handovers"
            to="/handovers"
            tone="warning"
            value={formatNumber(dashboard.taken_handovers_total)}
          />
        </Col>
        <Col sm={6} xl={3}>
          <StatCardMolecule
            icon={Sliders}
            label="dashboard.recent_adjustments"
            to="/adjustments"
            tone="info"
            value={formatNumber(dashboard.recent_adjustments)}
          />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent fw-semibold">{t('dashboard.movements_per_day')}</Card.Header>
            <Card.Body>
              <BarChartMolecule
                data={dashboard.movements_per_day.map((day) => ({
                  label: new Date(`${day.date}T00:00:00`).toLocaleDateString('id-ID', { weekday: 'short' }),
                  value: day.total,
                }))}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent fw-semibold">{t('dashboard.stock_by_category')}</Card.Header>
            <Card.Body className="d-flex align-items-center">
              <DonutChartMolecule
                data={dashboard.stock_by_category.map((category) => ({
                  label: category.name,
                  value: Number(category.total_quantity),
                }))}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent fw-semibold">{t('dashboard.low_stock')}</Card.Header>
            <DataTableOrganism
              columns={lowStockColumns}
              rows={dashboard.low_stock}
            />
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent fw-semibold">{t('dashboard.stock_by_warehouse')}</Card.Header>
            <Card.Body>
              {dashboard.stock_by_warehouse.map((warehouse, index) => (
                <div key={warehouse.id} className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{warehouse.name}</span>
                    <span className="text-muted">{formatNumber(warehouse.total_quantity, 3)}</span>
                  </div>
                  <ProgressBar
                    now={(Number(warehouse.total_quantity) / largestStock) * 100}
                    variant={variants[index % variants.length]}
                    style={{ height: 8 }}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent fw-semibold">{t('dashboard.taken_handovers')}</Card.Header>
            <DataTableOrganism
              columns={handoverColumns}
              renderActions={(handover) => <RowActionsMolecule urlView={`/handovers/${handover.id}`} />}
              rows={dashboard.taken_handovers}
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent fw-semibold">{t('dashboard.recent_movements')}</Card.Header>
            <DataTableOrganism
              columns={recentMovementColumns}
              rows={dashboard.recent_movements}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
