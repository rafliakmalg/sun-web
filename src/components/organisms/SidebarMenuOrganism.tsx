import { useEffect } from 'react'
import { Collapse } from 'react-bootstrap'
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons'
import { SidebarLinksMolecule } from '@/components/molecules/SidebarLinksMolecule'
import { isActive, type MenuGroup } from '@/menu'
import { useSidebar } from '@/stores/sidebar'
import { useTranslate } from '@/utils'

type Props = {
  groups: MenuGroup[]
  pathname: string
}

export function SidebarMenuOrganism({ groups, pathname }: Props) {
  const t = useTranslate()
  const opened = useSidebar((state) => state.opened)
  const openGroup = useSidebar((state) => state.open)
  const toggle = useSidebar((state) => state.toggle)

  useEffect(() => {
    const current = groups.find((group) => isActive(group, pathname))

    if (current) {
      openGroup(current.label)
    }
  }, [groups, pathname, openGroup])

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
              <span className="flex-grow-1 text-start">{t(group.label)}</span>
              {open ? <ChevronDown /> : <ChevronRight />}
            </button>
            <Collapse in={open}>
              <div>
                <SidebarLinksMolecule items={group.items} className="ps-3" />
              </div>
            </Collapse>
          </div>
        )
      })}
    </nav>
  )
}
