import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

import './index.css'
import './App.css'
import { cssVariablesResolver, theme } from './theme'
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

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/',          element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><HomePage /></Suspense> },
      { path: '/ecosystem', element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><EcosystemPage /></Suspense> },
      { path: '/tools',     element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><ToolsPage /></Suspense> },
      { path: '/notes',     element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><NotesPage /></Suspense> },
      { path: '/flow',      element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><FlowPage /></Suspense> },
      { path: '/install',   element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><InstallPage /></Suspense> },
      { path: '/changelog', element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><ChangelogPage /></Suspense> },
      { path: '/crossword', element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><CrosswordPage /></Suspense> },
      { path: '/lab',       element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><LabPage /></Suspense> },
      { path: '*',          element: <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><NotFoundPage /></Suspense> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider cssVariablesResolver={cssVariablesResolver} defaultColorScheme="dark" theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
