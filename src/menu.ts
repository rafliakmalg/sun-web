import { ArrowLeftRight, Box, Boxes, BoxSeam, Building, Gear, Grid3x3Gap, Layers, People, Rulers, ShieldLock, Shop, Sliders, Speedometer2, Tags, Truck, type Icon } from 'react-bootstrap-icons'
import { canAccess } from '@/utils'

export type MenuItem = {
  icon: Icon
  label: string
  roles?: string[]
  to: string
}

export type MenuGroup = {
  icon: Icon
  items: MenuItem[]
  label: string
  roles?: string[]
}

export const menu: MenuGroup[] = [
  {
    label: 'dashboard',
    icon: Speedometer2,
    items: [
      { to: '/dashboard', label: 'dashboard', icon: Speedometer2 },
    ],
  },
  {
    label: 'master',
    icon: Box,
    items: [
      { to: '/products', label: 'product', icon: BoxSeam },
      { to: '/categories', label: 'category', icon: Tags },
      { to: '/units', label: 'unit', icon: Rulers },
      { to: '/branches', label: 'branch', icon: Shop },
      { to: '/warehouses', label: 'warehouse', icon: Building },
      { to: '/racks', label: 'rack', icon: Grid3x3Gap },
    ],
  },
  {
    label: 'stock',
    icon: Boxes,
    items: [
      { to: '/inventories', label: 'inventory', icon: Layers },
      { to: '/movements', label: 'movement', icon: ArrowLeftRight },
      { to: '/adjustments', label: 'adjustment', icon: Sliders },
      { to: '/handovers', label: 'handover', icon: Truck },
    ],
  },
  {
    label: 'settings',
    icon: Gear,
    roles: ['admin'],
    items: [
      { to: '/roles', label: 'role', icon: ShieldLock },
      { to: '/users', label: 'user', icon: People },
    ],
  },
]

export function isActive(group: MenuGroup, pathname: string) {
  return group.items.some((item) => pathname.startsWith(item.to))
}

export function visibleMenu(role: string | undefined) {
  return menu
    .filter((group) => canAccess(role, group.roles))
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccess(role, item.roles)),
    }))
    .filter((group) => group.items.length > 0)
}
