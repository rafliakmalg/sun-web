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
    label: 'Master',
    icon: Box,
    items: [
      { to: '/products', label: 'Barang', icon: BoxSeam },
      { to: '/categories', label: 'Kategori', icon: Tags },
      { to: '/units', label: 'Satuan Barang', icon: Rulers },
      { to: '/branches', label: 'Cabang', icon: Shop },
      { to: '/warehouses', label: 'Gudang', icon: Building },
      { to: '/racks', label: 'Rak', icon: Grid3x3Gap },
    ],
  },
  {
    label: 'Pengaturan',
    icon: Gear,
    roles: ['admin'],
    items: [
      { to: '/roles', label: 'Role', icon: ShieldLock },
      { to: '/users', label: 'Pengguna', icon: People },
    ],
  },
]
