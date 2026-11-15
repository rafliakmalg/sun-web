import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BoxArrowRight, List } from 'react-bootstrap-icons'
import { Outlet } from 'react-router'
import { SidebarMenuOrganism } from '@/components/organisms/SidebarMenuOrganism'
import { logout, useSession } from '@/features/auth/api'
import { onSavedElsewhere } from '@/lib/tabs'
import { useAuth } from '@/stores/auth'
import { useSidebar } from '@/stores/sidebar'
import { toast } from '@/stores/toast'

export function AppLayoutTemplate() {
  const user = useAuth((state) => state.user)
  const collapsed = useSidebar((state) => state.collapsed)
  const toggleCollapsed = useSidebar((state) => state.toggleCollapsed)
  const queryClient = useQueryClient()

  useSession()

  useEffect(
    () =>
      onSavedElsewhere((message) => {
        if (message) {
          toast.success(message)
        }

        queryClient.invalidateQueries()
      }),
    [queryClient],
  )

  async function onLogout() {
    await logout()
    queryClient.clear()
  }

  return (
    <div className="d-flex">
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
        <SidebarMenuOrganism />
      </aside>
      <div className="flex-grow-1 content">
        <header className="bg-white border-bottom px-4 py-2 d-flex justify-content-end align-items-center gap-3">
          <span>
            {user?.name}
            {user?.role && <small className="text-muted"> ({user.role.label})</small>}
          </span>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={onLogout}
          >
            <BoxArrowRight className="me-1" /> Keluar
          </Button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
