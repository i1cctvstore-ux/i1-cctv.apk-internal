import { AuthenticatedShell } from '@/components/authenticated-shell'

export default function ProyekLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedShell activePage="proyek">{children}</AuthenticatedShell>
}
