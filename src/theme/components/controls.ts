import { ActionIcon, UnstyledButton, createTheme } from '@mantine/core'

export const controlStyles = createTheme({
  components: {
    UnstyledButton: UnstyledButton.extend({
      styles: {
        root: {
          fontFamily: 'var(--mantine-font-family-monospace)',
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: 'brandSpore',
        radius: 'md',
        variant: 'filled',
      },
    }),
  },
})
