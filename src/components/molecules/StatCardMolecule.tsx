import { Card } from 'react-bootstrap'
import type { Icon } from 'react-bootstrap-icons'
import { Link } from 'react-router'
import { useTranslate } from '@/utils'

type Props = {
  hint?: string
  icon: Icon
  label: string
  to?: string
  tone: 'danger' | 'info' | 'primary' | 'success' | 'warning'
  value: string
}

export function StatCardMolecule({ hint, icon: IconComponent, label, to, tone, value }: Props) {
  const t = useTranslate()

  return (
    <Card className="stat-card border-0 shadow-sm h-100">
      <Card.Body className="d-flex align-items-center gap-3">
        <div className={`stat-icon bg-${tone}-subtle text-${tone}`}>
          <IconComponent size={22} />
        </div>
        <div>
          <div className="text-muted small">{t(label)}</div>
          <div className="h3 fw-bold mb-0">{value}</div>
          {hint && <div className="text-muted small">{hint}</div>}
        </div>
        {to && (
          <Link
            to={to}
            className="stretched-link"
            aria-label={t(label)}
          />
        )}
      </Card.Body>
    </Card>
  )
}
