import { Badge } from '@/components/ui/badge'
import { stageBadgeClassName, type Stage } from '@/lib/projects'

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <Badge variant="secondary" className={stageBadgeClassName(stage)}>
      {stage}
    </Badge>
  )
}
