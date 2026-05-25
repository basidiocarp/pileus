import { Card, createTheme } from '@mantine/core'

export const cardStyles = createTheme({
  components: {
    Card: Card.extend({
      defaultProps: {
        padding: 'sm',
        radius: 'md',
      },
      styles: {
        root: {
          border: '1px solid var(--site-border)',
          background: 'var(--site-surface)',
          color: 'var(--site-fg)',
        },
      },
    }),
  },
})
