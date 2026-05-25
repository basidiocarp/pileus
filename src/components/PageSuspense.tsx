import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Box } from '@mantine/core'

import { RouteErrorBoundary } from './RouteErrorBoundary'

interface PageSuspenseProps {
  children: ReactNode
}

export function PageSuspense({ children }: PageSuspenseProps) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<Box mih="100vh" />}>
        {children}
      </Suspense>
    </RouteErrorBoundary>
  )
}
