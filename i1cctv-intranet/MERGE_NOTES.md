# Catatan Penggabungan

File ini dibuat otomatis untuk mendokumentasikan penggabungan dua zip:

- `i1cctv-intranet-supabase` (project utama: login, employee management)
- `modul-proyek-i1cctv` (modul tracking proyek instalasi CCTV)

## Yang digabungkan

1. **File modul proyek** dicopy apa adanya ke root project:
   - `app/proyek/page.tsx`, `app/proyek/[id]/page.tsx`
   - `components/projects/*`
   - `lib/projects.ts`
   - `supabase/migrations/20260710000000_create_projects.sql`

2. **4 komponen UI shadcn yang belum ada** tapi dipakai modul proyek, dibuatkan
   mengikuti pola `@base-ui/react` yang sudah dipakai komponen UI lain di
   project ini (lihat `components/ui/dialog.tsx`, `select.tsx`, `switch.tsx`
   sebagai referensi pola):
   - `components/ui/tabs.tsx`
   - `components/ui/textarea.tsx`
   - `components/ui/checkbox.tsx`
   - `components/ui/alert-dialog.tsx`

3. **Menu "Proyek" disambungkan ke Sidebar** (README modul proyek bilang ini
   belum dibuatkan karena penulisnya tidak punya file sidebar) — ini yang
   ditambahkan:
   - `lib/nav-config.tsx`: tambah `PageKey` baru `'proyek'` + field opsional
     `href` di `NavItem` (dipakai untuk item menu yang route Next.js beneran,
     bukan tab di dalam SPA shell).
   - `components/sidebar.tsx`: item menu yang punya `href` sekarang navigasi
     pakai `router.push(href)`, status aktif dicek dari `usePathname()`.
   - `components/authenticated-shell.tsx` (baru): shell yang sama
     (Sidebar+Navbar+Footer) dipakai ulang untuk halaman `/proyek`, dengan
     cek sesi login sendiri (karena halaman ini route Next.js biasa, bukan
     tab di dalam `app/page.tsx`).
   - `app/proyek/layout.tsx` (baru): membungkus kedua halaman proyek dengan
     `AuthenticatedShell`, supaya tampilannya konsisten dengan halaman lain.

## Langkah manual yang TETAP harus dilakukan (tidak bisa diotomatisasi)

1. **Jalankan migration baru** di Supabase Dashboard → SQL Editor:
   `supabase/migrations/20260710000000_create_projects.sql`
   (`supabase/schema.sql` yang lama tetap dijalankan seperti biasa juga,
   kalau project Supabase-nya masih baru).
2. **Buat Storage bucket** bernama `project-files` di Supabase Dashboard →
   Storage → New bucket (dipakai fitur unggah dokumen proyek).
3. `npm install` seperti biasa — tidak ada dependency baru sebenarnya, 4
   komponen UI di atas cuma pakai `@base-ui/react` yang sudah ada di
   `package.json`.

Setelah 2 langkah Supabase di atas dijalankan, tinggal `npm run dev` /
push ke Vercel seperti biasa — menu **Proyek** sudah otomatis muncul di
Sidebar untuk semua role yang login.
