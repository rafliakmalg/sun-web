import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BoxArrowRight } from 'react-bootstrap-icons'
import { Outlet } from 'react-router'
import { ChatPanelOrganism } from '@/components/organisms/ChatPanelOrganism'
import { SidebarOrganism } from '@/components/organisms/SidebarOrganism'
import { logout, useSession } from '@/features/auth/api'
import { useAuth } from '@/stores/auth'
import { toast } from '@/stores/toast'
import { onSavedElsewhere } from '@/utils'

export function AppLayoutTemplate() {
  const user = useAuth((state) => state.user)
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
      <SidebarOrganism />
      <div className="flex-grow-1 content">
        <header className="bg-white border-bottom px-4 py-2 d-flex justify-content-end align-items-center gap-3">
          <span>
            {user?.name}
            {!!user?.roles?.length && <small className="text-muted"> ({user.roles.map((role) => role.label).join(', ')})</small>}
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
      <ChatPanelOrganism />
    </div>
  )
}
