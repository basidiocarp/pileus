import type { ReactNode } from 'react'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { PageSuspense } from './components/PageSuspense'
import { RouteErrorFallback } from './components/RouteErrorBoundary'
import { SiteLayout } from './components/SiteLayout'

const HomePage      = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const EcosystemPage = lazy(() => import('./pages/EcosystemPage').then((m) => ({ default: m.EcosystemPage })))
const ToolsPage     = lazy(() => import('./pages/ToolsPage').then((m) => ({ default: m.ToolsPage })))
const NotesPage     = lazy(() => import('./pages/NotesPage').then((m) => ({ default: m.NotesPage })))
const FlowPage      = lazy(() => import('./pages/FlowPage').then((m) => ({ default: m.FlowPage })))
const InstallPage   = lazy(() => import('./pages/InstallPage').then((m) => ({ default: m.InstallPage })))
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage })))
const CrosswordPage = lazy(() => import('./pages/CrosswordPage').then((m) => ({ default: m.CrosswordPage })))
const LabPage       = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })))
const NotFoundPage  = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

const page = (element: ReactNode) => (
  <PageSuspense>
    {element}
  </PageSuspense>
)

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { path: '/',          element: page(<HomePage />) },
      { path: '/ecosystem', element: page(<EcosystemPage />) },
      { path: '/tools',     element: page(<ToolsPage />) },
      { path: '/notes',     element: page(<NotesPage />) },
      { path: '/flow',      element: page(<FlowPage />) },
      { path: '/install',   element: page(<InstallPage />) },
      { path: '/changelog', element: page(<ChangelogPage />) },
      { path: '/crossword', element: page(<CrosswordPage />) },
      { path: '/lab',       element: page(<LabPage />) },
      { path: '*',          element: page(<NotFoundPage />) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
