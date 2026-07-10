import {
  LayoutDashboard,
  Boxes,
  Wrench,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type PageKey = 'dashboard' | 'stok' | 'servis' | 'user-role'

export type NavItem = {
  key: PageKey
  label: string
  description: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    description: 'Ringkasan operasional toko',
    icon: LayoutDashboard,
  },
  {
    key: 'stok',
    label: 'Stok',
    description: 'Kelola inventaris perangkat CCTV',
    icon: Boxes,
  },
  {
    key: 'servis',
    label: 'Servis',
    description: 'Antrian dan riwayat perbaikan',
    icon: Wrench,
  },
  {
    key: 'user-role',
    label: 'User Role',
    description: 'Manajemen pengguna dan hak akses',
    icon: Users,
  },
]
