import 'server-only'
import { createClient } from '@/lib/supabase/server'

// Dipakai di setiap Route Handler yang mengubah data karyawan.
// Mengembalikan { error } (response 401/403 siap pakai) jika bukan admin/super_admin aktif,
// atau { userId, role } jika lolos verifikasi.
// Catatan: saat ini admin & super_admin diperlakukan SAMA di sini (keduanya
// boleh kelola karyawan). Pembatasan lebih detail — mis. hanya super_admin
// yang boleh mengubah akun ber-role admin/super_admin lain — belum diterapkan,
// menyusul bareng rancangan matriks akses menu.
export async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: Response.json({ message: 'Belum login.' }, { status: 401 }) }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, active')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'super_admin'].includes(profile.role) || !profile.active) {
    return {
      error: Response.json(
        { message: 'Hanya Admin atau Super Admin aktif yang boleh melakukan aksi ini.' },
        { status: 403 },
      ),
    }
  }

  return { userId: user.id, role: profile.role }
}
