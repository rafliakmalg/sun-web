import { List } from 'react-bootstrap-icons'
import { useLocation } from 'react-router'
import { SidebarMenuOrganism } from '@/components/organisms/SidebarMenuOrganism'
import { SidebarRailOrganism } from '@/components/organisms/SidebarRailOrganism'
import { visibleMenu } from '@/menu'
import { useAuth } from '@/stores/auth'
import { useSidebar } from '@/stores/sidebar'

export function SidebarOrganism() {
  const permissions = useAuth((state) => state.permissions)
  const collapsed = useSidebar((state) => state.collapsed)
  const toggleCollapsed = useSidebar((state) => state.toggleCollapsed)
  const { pathname } = useLocation()
  const groups = visibleMenu(permissions)

  return (
    <aside className={`sidebar bg-dark text-white p-3 ${collapsed ? 'collapsed' : ''}`}>
      <div className={`d-flex align-items-center mb-4 ${collapsed ? 'justify-content-center' : 'justify-content-between'}`}>
        {!collapsed && <span className="h5 mb-0">WMS</span>}
        <button
          type="button"
          className="btn btn-sm btn-outline-light border-0"
          aria-label={collapsed ? 'Perluas menu' : 'Lipat menu'}
          onClick={toggleCollapsed}
        >
          <List size={22} />
        </button>
      </div>
      {collapsed ? (
        <SidebarRailOrganism groups={groups} pathname={pathname} />
      ) : (
        <SidebarMenuOrganism groups={groups} pathname={pathname} />
      )}
    </aside>
  )
}
