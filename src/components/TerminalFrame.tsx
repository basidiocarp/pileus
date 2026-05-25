import type { ReactNode } from 'react'
import { Box } from '@mantine/core'

import styles from './TerminalFrame.module.css'

interface TerminalFrameProps {
  bodyClassName?: string
  children: ReactNode
  className?: string
  footer?: ReactNode
  footerClassName?: string
  rightSection?: ReactNode
  title: ReactNode
  titleClassName?: string
}

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

export function TerminalFrame({
  bodyClassName,
  children,
  className,
  footer,
  footerClassName,
  rightSection,
  title,
  titleClassName,
}: TerminalFrameProps) {
  return (
    <Box className={cx(styles.frame, className)}>
      <Box className={styles.header}>
        <Box aria-hidden className={styles.lights}>
          <span /><span /><span />
        </Box>
        <Box className={cx(styles.title, titleClassName)}>
          {title}
        </Box>
        {rightSection ? <Box className={styles['right-section']}>{rightSection}</Box> : null}
      </Box>

      <Box className={bodyClassName}>
        {children}
      </Box>

      {footer ? <Box className={cx(styles.footer, footerClassName)}>{footer}</Box> : null}
    </Box>
  )
}
