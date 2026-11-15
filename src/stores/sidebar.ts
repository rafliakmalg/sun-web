import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SidebarState = {
  opened: string[]
  collapsed: boolean
  open: (label: string) => void
  toggle: (label: string) => void
  toggleCollapsed: () => void
}

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      opened: [],
      collapsed: window.innerWidth < 768,
      open: (label) => set((state) => ({ opened: state.opened.includes(label) ? state.opened : [...state.opened, label] })),
      toggle: (label) =>
        set((state) => ({
          opened: state.opened.includes(label) ? state.opened.filter((item) => item !== label) : [...state.opened, label],
        })),
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
    }),
    { name: 'sidebar' },
  ),
)
