import type { CSSProperties, ReactNode } from 'react'
import { Card } from '@mantine/core'

type ToolCardStyle = CSSProperties & { '--tool-color': string }

interface ToolColorCardProps {
  children: ReactNode
  className?: string
  padding?: number | string
  radius?: number | string
  toolColor: string
}

export function ToolColorCard({ children, className, padding, radius, toolColor }: ToolColorCardProps) {
  const style: ToolCardStyle = { '--tool-color': toolColor }

  return (
    <Card className={className} padding={padding} radius={radius} style={style}>
      {children}
    </Card>
  )
}
