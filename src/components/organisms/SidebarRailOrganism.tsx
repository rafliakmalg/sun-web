import { SidebarLinksMolecule } from '@/components/molecules/SidebarLinksMolecule'
import { isActive, type MenuGroup } from '@/menu'
import { useTranslate } from '@/utils'

type Props = {
  groups: MenuGroup[]
  pathname: string
}

export function SidebarRailOrganism({ groups, pathname }: Props) {
  const t = useTranslate()

  return (
    <nav>
      {groups.map((group) => {
        const GroupIcon = group.icon

        return (
          <div key={group.label} className="mini-group mb-2">
            <div
              className={`mini-icon ${isActive(group, pathname) ? 'bg-primary text-white' : 'text-white-50'}`}
              tabIndex={0}
              aria-label={t(group.label)}
            >
              <GroupIcon size={20} />
            </div>
            <div className="mini-flyout">
              <div className="bg-dark text-white rounded shadow p-2">
                <div className="text-white-50 small px-2 pb-1">{t(group.label)}</div>
                <SidebarLinksMolecule items={group.items} />
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
