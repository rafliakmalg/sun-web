import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router'
import type { MenuItem } from '@/menu'
import { useTranslate } from '@/utils'

type Props = {
  className?: string
  items: MenuItem[]
}

export function SidebarLinksMolecule({ className, items }: Props) {
  const t = useTranslate()

  return (
    <Nav variant="pills" className={`flex-column ${className ?? ''}`}>
      {items.map((item) => {
        const ItemIcon = item.icon

        return (
          <Nav.Link
            key={item.to}
            as={NavLink}
            to={item.to}
            className="text-white d-flex align-items-center gap-2"
          >
            <ItemIcon />
            {t(item.label)}
          </Nav.Link>
        )
      })}
    </Nav>
  )
}
