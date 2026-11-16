import { useRef, useState } from 'react'
import { Button, Overlay } from 'react-bootstrap'
import { Eye, PencilSquare, ThreeDotsVertical, Trash } from 'react-bootstrap-icons'
import { Link } from 'react-router'
import { IconButtonAtom, type IconButtonProps } from '@/components/atoms/IconButtonAtom'

type Props = {
  onDelete?: () => void
  urlEdit?: string
  urlView?: string
}

export function RowActionsMolecule({ onDelete, urlEdit, urlView }: Props) {
  const [open, setOpen] = useState(false)
  const target = useRef<HTMLButtonElement>(null)

  const actions: IconButtonProps[] = []

  if (urlView) {
    actions.push({
      icon: Eye,
      label: 'Lihat',
      to: urlView,
      variant: 'outline-secondary',
    })
  }

  if (urlEdit) {
    actions.push({
      icon: PencilSquare,
      label: 'Ubah',
      newTab: true,
      to: urlEdit,
      variant: 'outline-primary',
    })
  }

  if (onDelete) {
    actions.push({
      icon: Trash,
      label: 'Hapus',
      onClick: onDelete,
      variant: 'outline-danger',
    })
  }

  function choose(action: IconButtonProps) {
    setOpen(false)
    action.onClick?.()
  }

  return (
    <>
      <div className="d-none d-md-flex gap-1">
        {actions.map((action) => (
          <IconButtonAtom key={action.label} {...action} />
        ))}
      </div>

      <Button
        ref={target}
        size="sm"
        variant="outline-secondary"
        className="d-md-none"
        aria-label="Aksi"
        active={open}
        onClick={() => setOpen(!open)}
      >
        <ThreeDotsVertical />
      </Button>
      <Overlay
        target={target}
        show={open}
        placement="bottom-start"
        rootClose
        onHide={() => setOpen(false)}
      >
        {({ ref, style }) => (
          <div
            ref={ref}
            style={{
              ...style,
              zIndex: 1060,
            }}
            className="dropdown-menu show shadow"
          >
            {actions.map((action) => {
              const ActionIcon = action.icon
              const className = `dropdown-item ${action.variant === 'outline-danger' ? 'text-danger' : ''}`

              if (!action.to) {
                return (
                  <button
                    key={action.label}
                    type="button"
                    className={className}
                    onClick={() => choose(action)}
                  >
                    <ActionIcon className="me-2" />
                    {action.label}
                  </button>
                )
              }

              if (action.newTab) {
                return (
                  <a
                    key={action.label}
                    className={className}
                    href={action.to}
                    target="_blank"
                    rel="noopener"
                    onClick={() => setOpen(false)}
                  >
                    <ActionIcon className="me-2" />
                    {action.label}
                  </a>
                )
              }

              return (
                <Link
                  key={action.label}
                  className={className}
                  to={action.to}
                  onClick={() => setOpen(false)}
                >
                  <ActionIcon className="me-2" />
                  {action.label}
                </Link>
              )
            })}
          </div>
        )}
      </Overlay>
    </>
  )
}
