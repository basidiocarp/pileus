import { Box } from '@mantine/core'
import { Outlet, ScrollRestoration } from 'react-router-dom'

import { PersonalityLayer } from './PersonalityLayer'
import { SiteFooter, SiteNav } from './SiteShell'
import styles from './SiteLayout.module.css'

export function SiteLayout() {
  return (
    <Box className={styles.site}>
      <ScrollRestoration />
      <PersonalityLayer />
      <SiteNav />
      <Outlet />
      <SiteFooter />
    </Box>
  )
}
