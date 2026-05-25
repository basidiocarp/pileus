import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

import './index.css'
import { AppRouter } from './router'
import { cssVariablesResolver, theme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider cssVariablesResolver={cssVariablesResolver} defaultColorScheme="dark" theme={theme}>
      <AppRouter />
    </MantineProvider>
  </StrictMode>,
)
