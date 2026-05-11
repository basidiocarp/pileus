import { Button, createTheme } from '@mantine/core'

export const buttonStyles = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'brandSpore',
        radius: 'md',
        size: 'md',
      },
      styles: {
        root: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontWeight: 600,
        },
      },
    }),
  },
})
