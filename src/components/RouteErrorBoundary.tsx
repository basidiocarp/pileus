import type { ReactNode } from 'react'
import { Component } from 'react'
import { Box, Button, Text, Title } from '@mantine/core'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

import styles from './RouteErrorBoundary.module.css'

interface RouteErrorBoundaryProps {
  children: ReactNode
}

interface RouteErrorBoundaryState {
  error: Error | null
}

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unexpected rendering error occurred.'
}

export function RouteErrorFallback({ error }: { error?: unknown }) {
  const routeError = useRouteError()
  const message = getErrorMessage(error ?? routeError)

  return (
    <Box className={styles.error} component="main">
      <Box className={styles.panel}>
        <Text className={styles.eyebrow}>fruiting body failed</Text>
        <Title className={styles.title} order={1}>Something broke above the soil.</Title>
        <Text className={styles.copy}>{message}</Text>
        <Button component={Link} mt="xl" to="/" variant="outline">
          back to surface
        </Button>
      </Box>
    </Box>
  )
}

export class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch() {
    // Intentionally quiet in production UI; CI/browser tests catch console errors separately.
  }

  render() {
    if (this.state.error) return <RouteErrorFallback error={this.state.error} />
    return this.props.children
  }
}
