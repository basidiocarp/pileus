import type { MantineThemeOverride } from '@mantine/core'
import { Card, mergeThemeOverrides } from '@mantine/core'

import { themeColors } from './colors'
import { themeComponentStyles } from './componentStyles'
import { themeInteractions } from './interactions'
import { themeShadows } from './shadows'
import { themeSpacing } from './spacing'
import { themeTokens } from './tokens'
import { themeTypography } from './typography'

const cardDefaults = {
  components: {
    Card: Card.extend({
      defaultProps: {
        padding: 'sm',
        radius: 'md',
      },
    }),
  },
}

export const theme: MantineThemeOverride = mergeThemeOverrides(
  themeTypography,
  themeShadows,
  themeInteractions,
  themeColors,
  themeSpacing,
  themeTokens,
  themeComponentStyles,
  cardDefaults
)

export const cssVariablesResolver = () => ({
  variables: {},
  dark: {
    '--mantine-color-body': '#0d0805',
    '--mantine-color-text': '#f4ead8',
    '--mantine-color-dimmed': '#8b7a5e',
    '--mantine-color-placeholder': '#5b4d3a',
    '--mantine-color-bright': '#ffffff',
    '--mantine-color-anchor': '#f2a93b',
    '--mantine-color-default': '#15100a',
    '--mantine-color-default-hover': '#1d1610',
    '--mantine-color-default-color': '#f4ead8',
    '--mantine-color-default-border': '#3b281a',
    '--mantine-color-error': '#e94e1b',
  },
  light: {},
})
