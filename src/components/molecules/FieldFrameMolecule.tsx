import type { ReactNode } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslate } from '@/utils'

type Props = {
  children: ReactNode
  className?: string
  compact?: boolean
  error?: string
  hideLabel?: boolean
  id: string
  label?: string
}

export function FieldFrameMolecule({ children, className = '', compact, error, hideLabel, id, label }: Props) {
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
