import {
  LayoutDashboard,
  Boxes,
  Wrench,
  Users,
  FolderKanban,
  type LucideIcon,
} from 'lucide-react'
import type { Role } from '@/lib/supabase/types'

export type PageKey = 'dashboard' | 'stok' | 'servis' | 'proyek' | 'user-role'

export type NavItem = {
  key: PageKey
  label: string
  description: string
  icon: LucideIcon
  // Kalau diisi, menu ini cuma muncul untuk role yang disebut di sini.
  // Kalau kosong/undefined, menu terbuka untuk semua role yang sudah login.
  roles?: Role[]
  // Kalau diisi, menu ini adalah halaman Next.js sungguhan (route sendiri,
  // punya folder di app/) — Sidebar akan pakai router.push(href) alih-alih
  // switch tab di dalam shell SPA seperti Dashboard/Stok/Servis.
  href?: string
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
    key: 'proyek',
    label: 'Proyek',
    description: 'Tracking proyek instalasi CCTV',
    icon: FolderKanban,
    href: '/proyek',
  },
  {
    key: 'user-role',
    label: 'User Role',
    description: 'Manajemen pengguna dan hak akses',
    icon: Users,
    roles: ['super_admin'],
  },
]

// Dipakai di Sidebar & pengecekan akses halaman — daftar menu yang boleh
// dilihat role tertentu.
export function getVisibleNavItems(role: Role): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role))
}
