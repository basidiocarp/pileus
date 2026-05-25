import { Badge, createTheme } from '@mantine/core'

export const badgeStyles = createTheme({
  components: {
    Badge: Badge.extend({
      styles: (_theme, props) => {
        switch (props.variant) {
          case 'tool':
            return {
              root: {
                background: 'transparent',
                color: 'var(--tool-color)',
                borderColor: 'color-mix(in oklab, var(--tool-color) 42%, var(--site-border))',
                fontFamily: 'var(--mantine-font-family-monospace)',
                textTransform: 'none',
              },
            }
          case 'version':
            return {
              root: {
                background: 'var(--site-raised)',
                color: 'var(--site-muted)',
                border: '1px solid var(--site-border-strong)',
                fontFamily: 'var(--mantine-font-family-monospace)',
              },
            }
          case 'added':
            return {
              root: {
                background: 'var(--site-success-wash)',
                color: 'var(--site-success)',
                border: '1px solid transparent',
                fontFamily: 'var(--mantine-font-family-monospace)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              },
            }
          case 'changed':
            return {
              root: {
                background: 'var(--site-spore-badge-bg)',
                color: 'var(--glow-spore)',
                border: '1px solid transparent',
                fontFamily: 'var(--mantine-font-family-monospace)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              },
            }
          case 'fixed':
            return {
              root: {
                background: 'var(--site-purple-badge-bg)',
                color: 'var(--glow-purple)',
                border: '1px solid transparent',
                fontFamily: 'var(--mantine-font-family-monospace)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              },
            }
          default:
            return {}
        }
      },
    }),
  },
})
