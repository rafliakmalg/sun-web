import { useEffect } from 'react'
import { Collapse, Nav } from 'react-bootstrap'
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons'
import { NavLink, useLocation } from 'react-router'
import { canAccess } from '@/lib/access'
import { menu } from '@/menu'
import { useAuth } from '@/stores/auth'
import { useSidebar } from '@/stores/sidebar'

export function SidebarMenuOrganism() {
  const user = useAuth((state) => state.user)
  const opened = useSidebar((state) => state.opened)
  const openGroup = useSidebar((state) => state.open)
  const collapsed = useSidebar((state) => state.collapsed)
  const toggle = useSidebar((state) => state.toggle)
  const { pathname } = useLocation()
  const role = user?.role?.name
  const groups = menu.filter((group) => canAccess(role, group.roles))

  useEffect(() => {
    const current = menu.find((group) => group.items.some((item) => pathname.startsWith(item.to)))

    if (current) {
      openGroup(current.label)
    }
  }, [pathname, openGroup])

  if (collapsed) {
    return (
      <nav>
        {groups.map((group) => {
          const GroupIcon = group.icon
          const active = group.items.some((item) => pathname.startsWith(item.to))

          return (
            <div key={group.label} className="mini-group mb-2">
              <div
                className={`mini-icon ${active ? 'bg-primary text-white' : 'text-white-50'}`}
                tabIndex={0}
                aria-label={group.label}
              >
                <GroupIcon size={20} />
              </div>
              <div className="mini-flyout">
                <div className="bg-dark text-white rounded shadow p-2">
                  <div className="text-white-50 small px-2 pb-1">{group.label}</div>
                  <Nav variant="pills" className="flex-column">
                    {group.items
                      .filter((item) => canAccess(role, item.roles))
                      .map((item) => {
                        const ItemIcon = item.icon

                        return (
                          <Nav.Link
                            key={item.to}
                            as={NavLink}
                            to={item.to}
                            className="text-white d-flex align-items-center gap-2"
                          >
                            <ItemIcon />
                            {item.label}
                          </Nav.Link>
                        )
                      })}
                  </Nav>
                </div>
              </div>
            </div>
          )
        })}
      </nav>
    )
  }

  return (
    <nav>
      {groups.map((group) => {
        const open = opened.includes(group.label)
        const GroupIcon = group.icon

        return (
          <div key={group.label} className="mb-2">
            <button
              type="button"
              className="btn btn-link text-white-50 text-decoration-none w-100 d-flex align-items-center gap-2 px-2"
              aria-expanded={open}
              onClick={() => toggle(group.label)}
            >
              <GroupIcon />
              <span className="flex-grow-1 text-start">{group.label}</span>
              {open ? <ChevronDown /> : <ChevronRight />}
            </button>
            <Collapse in={open}>
              <div>
                <Nav variant="pills" className="flex-column ps-3">
                  {group.items
                    .filter((item) => canAccess(role, item.roles))
                    .map((item) => {
                      const ItemIcon = item.icon

                      return (
                        <Nav.Link
                          key={item.to}
                          as={NavLink}
                          to={item.to}
                          className="text-white d-flex align-items-center gap-2"
                        >
                          <ItemIcon />
                          {item.label}
                        </Nav.Link>
                      )
                    })}
                </Nav>
              </div>
            </Collapse>
          </div>
        )
      })}
    </nav>
  )
}
