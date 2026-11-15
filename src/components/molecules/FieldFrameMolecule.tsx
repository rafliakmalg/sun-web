import type { ReactNode } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslate } from '@/lib/lang'

type Props = {
  id: string
  label?: string
  error?: string
  className?: string
  compact?: boolean
  hideLabel?: boolean
  children: ReactNode
}

export function FieldFrameMolecule({ id, label, error, className = '', compact, hideLabel, children }: Props) {
  const t = useTranslate()
  return (
    <div className={`${compact ? '' : 'mb-3'} ${className}`}>
      {label && (
        <Form.Label
          htmlFor={id}
          className={hideLabel ? 'label-md-hidden' : ''}
        >
          {t(label)}
        </Form.Label>
      )}
      {children}
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </div>
  )
}
