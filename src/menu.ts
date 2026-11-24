import { ArrowLeftRight, Box, Boxes, BoxSeam, Building, Gear, Grid3x3Gap, Layers, People, Rulers, ShieldLock, Shop, Sliders, Speedometer2, Tags, Truck, type Icon } from 'react-bootstrap-icons'

export type MenuItem = {
  icon: Icon
  label: string
  permission: string
  to: string
}

export type MenuGroup = {
  icon: Icon
  items: MenuItem[]
  label: string
}

export const menu: MenuGroup[] = [
  {
    label: 'dashboard',
    icon: Speedometer2,
    items: [
      { to: '/dashboard', label: 'dashboard', icon: Speedometer2, permission: 'dashboard.read' },
    ],
  },
  {
    label: 'master',
    icon: Box,
    items: [
      { to: '/products', label: 'product', icon: BoxSeam, permission: 'product.read' },
      { to: '/categories', label: 'category', icon: Tags, permission: 'category.read' },
      { to: '/units', label: 'unit', icon: Rulers, permission: 'unit.read' },
      { to: '/branches', label: 'branch', icon: Shop, permission: 'branch.read' },
      { to: '/warehouses', label: 'warehouse', icon: Building, permission: 'warehouse.read' },
      { to: '/racks', label: 'rack', icon: Grid3x3Gap, permission: 'rack.read' },
    ],
  },
  {
    label: 'stock',
    icon: Boxes,
    items: [
      { to: '/inventories', label: 'inventory', icon: Layers, permission: 'inventory.read' },
      { to: '/movements', label: 'movement', icon: ArrowLeftRight, permission: 'movement.read' },
      { to: '/adjustments', label: 'adjustment', icon: Sliders, permission: 'adjustment.read' },
      { to: '/handovers', label: 'handover', icon: Truck, permission: 'handover.read' },
    ],
  },
  {
    label: 'settings',
    icon: Gear,
    items: [
      { to: '/roles', label: 'role', icon: ShieldLock, permission: 'role.read' },
      { to: '/users', label: 'user', icon: People, permission: 'user.read' },
    ],
  },
]

export function isActive(group: MenuGroup, pathname: string) {
  return group.items.some((item) => pathname.startsWith(item.to))
}

export function visibleMenu(permissions: string[]) {
  return menu
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => permissions.includes(item.permission)),
    }))
    .filter((group) => group.items.length > 0)
}
