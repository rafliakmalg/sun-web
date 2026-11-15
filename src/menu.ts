import { Box, BoxSeam, Building, Gear, Grid3x3Gap, People, Rulers, ShieldLock, Shop, Tags, type Icon } from 'react-bootstrap-icons'

export type MenuItem = {
  to: string
  label: string
  icon: Icon
  roles?: string[]
}

export type MenuGroup = {
  label: string
  icon: Icon
  roles?: string[]
  items: MenuItem[]
}

export const menu: MenuGroup[] = [
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
    label: 'settings',
    icon: Gear,
    roles: ['admin'],
    items: [
      { to: '/roles', label: 'role', icon: ShieldLock },
      { to: '/users', label: 'user', icon: People },
    ],
  },
]
