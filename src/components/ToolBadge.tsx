import type { CSSProperties, ReactNode } from 'react'
import { Badge } from '@mantine/core'

type ToolBadgeStyle = CSSProperties & { '--tool-color': string }

interface ToolBadgeProps {
  children: ReactNode
  radius?: number | string
  size?: string
  toolColor: string
}

export function ToolBadge({ children, radius = 'sm', size = 'xl', toolColor }: ToolBadgeProps) {
  const style: ToolBadgeStyle = { '--tool-color': toolColor }

  return (
    <Badge radius={radius} size={size} style={style} variant={"tool" as string}>
      {children}
    </Badge>
  )
}
