import { mergeThemeOverrides } from '@mantine/core'

import { badgeStyles } from './components/badge'
import { buttonStyles } from './components/button'
import { cardStyles } from './components/card'
import { controlStyles } from './components/controls'
import { textStyles } from './components/text'

export const themeComponentStyles = mergeThemeOverrides(badgeStyles, buttonStyles, cardStyles, controlStyles, textStyles)
