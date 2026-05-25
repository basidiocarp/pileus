import type { CSSProperties, HTMLAttributes } from 'react'
import { Card } from '@mantine/core'

import toolSurface from '../styles/toolSurface.module.css'

type ToolCardStyle = CSSProperties & { '--tool-color': string }

interface ToolCardSurfaceProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'style'> {
  className?: string
  padding?: number | string
  radius?: number | string
  style?: CSSProperties
  toolColor: string
}

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

export function ToolCardSurface({ children, className, style, toolColor, ...props }: ToolCardSurfaceProps) {
  const toolStyle: ToolCardStyle = { ...style, '--tool-color': toolColor }

  return (
    <Card
      className={cx(toolSurface.surface, className)}
      style={toolStyle}
      {...props}
    >
      {children}
    </Card>
  )
}
