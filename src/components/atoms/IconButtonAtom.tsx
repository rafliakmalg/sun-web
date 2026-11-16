import type { MouseEvent } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import type { Icon } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

type ClickProps = {
  newTab?: never
  onClick: () => void
  to?: never
}

type LinkProps = {
  newTab?: boolean
  onClick?: never
  to: string
}

export type IconButtonProps = {
  icon: Icon
  label: string
  variant?: string
} & (ClickProps | LinkProps)

export function IconButtonAtom({ icon: IconComponent, label, newTab, onClick, to, variant = 'outline-secondary' }: IconButtonProps) {
  const navigate = useNavigate()

  function onButtonClick(event: MouseEvent) {
    if (to && !newTab && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      navigate(to)
    }

    onClick?.()
  }

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{label}</Tooltip>}
    >
      <Button
        size="sm"
        variant={variant}
        href={to}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener' : undefined}
        aria-label={label}
        onClick={onButtonClick}
      >
        <IconComponent />
      </Button>
    </OverlayTrigger>
  )
}
