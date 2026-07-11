'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import type { PageKey } from '@/lib/nav-config'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

type AuthenticatedShellProps = {
  // Tab mana yang harus tersorot aktif di Sidebar saat halaman ini terbuka.
  activePage: PageKey
  children: React.ReactNode
}

// Dipakai oleh halaman-halaman yang punya route Next.js sendiri (bukan tab
// di dalam SPA shell "/", seperti app/proyek/*) supaya tetap tampil dengan
// Sidebar/Navbar/Footer yang sama dan tetap wajib login. middleware.ts sudah
// memastikan hanya user yang login yang bisa sampai ke sini, komponen ini
// cuma mengambil profil untuk ditampilkan di Navbar/Sidebar.
export function AuthenticatedShell({ activePage, children }: AuthenticatedShellProps) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setProfile(null)
        setChecking(false)
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
      setChecking(false)
    }

    loadProfile()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadProfile()
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setProfile(null)
    router.push('/')
  }

  // Menu selain "proyek" (Dashboard/Stok/Servis/User Role) hidup sebagai tab
  // di dalam SPA shell "/", jadi dari sini cukup diarahkan ke sana.
  function handleNavigate() {
    router.push('/')
  }

  if (checking) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Memuat…</p>
      </main>
    )
  }

  if (!profile) {
    // Jaga-jaga kalau sesi habis di tengah jalan; middleware.ts normalnya
    // sudah menangani ini duluan dengan redirect ke "/".
    router.replace('/')
    return null
  }

  return (
    <AppShell
      activePage={activePage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      userName={profile.name}
      userEmail={profile.email}
      userRole={profile.role}
    >
      {children}
    </AppShell>
  )
}
