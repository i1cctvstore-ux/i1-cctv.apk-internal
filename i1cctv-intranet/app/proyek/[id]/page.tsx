import { ProjectDetail } from '@/components/projects/project-detail'

// Next.js 15: `params` berupa Promise. Kalau project ini masih di Next.js 14
// ke bawah, ganti signature jadi `{ params }: { params: { id: string } }`
// dan hapus `await`-nya.
export default async function ProyekDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProjectDetail projectId={id} />
}
