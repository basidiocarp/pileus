import { Box } from '@mantine/core'
import { Outlet, ScrollRestoration } from 'react-router-dom'

import { PersonalityLayer } from './PersonalityLayer'
import { SiteFooter, SiteNav } from './SiteShell'

export function SiteLayout() {
  return (
    <Box className="site">
      <ScrollRestoration />
      <PersonalityLayer />
      <SiteNav />
      <Outlet />
      <SiteFooter />
    </Box>
  )
}
