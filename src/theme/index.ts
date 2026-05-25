import type { MantineThemeOverride } from '@mantine/core'
import { mergeThemeOverrides } from '@mantine/core'

import { themeColors } from './colors'
import { themeComponentStyles } from './componentStyles'
import { themeInteractions } from './interactions'
import { themeShadows } from './shadows'
import { themeSpacing } from './spacing'
import { siteCssVariables, siteTokens, themeTokens } from './tokens'
import { themeTypography } from './typography'

export const theme: MantineThemeOverride = mergeThemeOverrides(
  themeTypography,
  themeShadows,
  themeInteractions,
  themeColors,
  themeSpacing,
  themeTokens,
  themeComponentStyles
)

export const cssVariablesResolver = () => ({
  variables: siteCssVariables,
  dark: {
    '--mantine-color-body': siteTokens.background,
    '--mantine-color-text': siteTokens.foreground,
    '--mantine-color-dimmed': siteTokens.foregroundDim,
    '--mantine-color-placeholder': siteTokens.dimmer,
    '--mantine-color-bright': '#ffffff',
    '--mantine-color-anchor': siteTokens.accent,
    '--mantine-color-default': siteTokens.surface,
    '--mantine-color-default-hover': siteTokens.raised,
    '--mantine-color-default-color': siteTokens.foreground,
    '--mantine-color-default-border': siteTokens.borderStrong,
    '--mantine-color-error': siteTokens.accent2,
  },
  light: {},
})
