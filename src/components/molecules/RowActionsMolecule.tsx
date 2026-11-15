import { useRef, useState } from 'react'
import { Button, Overlay } from 'react-bootstrap'
import { PencilSquare, ThreeDotsVertical, Trash } from 'react-bootstrap-icons'
import { IconButtonAtom } from '@/components/atoms/IconButtonAtom'

type Props = {
  editHref: string
  onDelete: () => void
}

export function RowActionsMolecule({ editHref, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const target = useRef<HTMLButtonElement>(null)

  return (
    <>
      <div className="d-none d-md-flex gap-1">
        <IconButtonAtom
          icon={PencilSquare}
          label="Ubah"
          variant="outline-primary"
          href={editHref}
          newTab
        />
        <IconButtonAtom
          icon={Trash}
          label="Hapus"
          variant="outline-danger"
          onClick={onDelete}
        />
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
          <div ref={ref} style={{ ...style, zIndex: 1060 }} className="dropdown-menu show shadow">
            <a className="dropdown-item" href={editHref} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
              <PencilSquare className="me-2" />
              Ubah
            </a>
            <button
              type="button"
              className="dropdown-item text-danger"
              onClick={() => {
                setOpen(false)
                onDelete()
              }}
            >
              <Trash className="me-2" />
              Hapus
            </button>
          </div>
        )}
      </Overlay>
    </>
  )
}
