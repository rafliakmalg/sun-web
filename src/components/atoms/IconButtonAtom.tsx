import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import type { Icon } from 'react-bootstrap-icons'

type Props = {
  icon: Icon
  label: string
  variant?: string
  href?: string
  newTab?: boolean
  onClick?: () => void
}

export function IconButtonAtom({ icon: IconComponent, label, variant = 'outline-secondary', href, newTab, onClick }: Props) {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{label}</Tooltip>}>
      <Button
        size="sm"
        variant={variant}
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener' : undefined}
        aria-label={label}
        onClick={onClick}
      >
        <IconComponent />
      </Button>
    </OverlayTrigger>
  )
}
