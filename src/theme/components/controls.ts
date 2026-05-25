import {
  ActionIcon,
  Burger,
  Chip,
  CloseButton,
  Drawer,
  NavLink,
  SegmentedControl,
  Slider,
  Tabs,
  ThemeIcon,
  UnstyledButton,
  createTheme,
} from '@mantine/core'

import classes from './controls.module.css'

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
    Burger: Burger.extend({
      classNames: {
        root: classes.burgerRoot,
      },
    }),
    Chip: Chip.extend({
      defaultProps: {
        color: 'brandSpore',
        size: 'sm',
        variant: 'light',
      },
      styles: {
        label: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 11,
        },
      },
    }),
    CloseButton: CloseButton.extend({
      defaultProps: {
        radius: 'sm',
        variant: 'transparent',
      },
      classNames: {
        root: classes.closeButtonRoot,
      },
    }),
    Drawer: Drawer.extend({
      styles: {
        body: {
          padding: 16,
        },
        content: {
          background: 'var(--bg-surface)',
        },
        header: {
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-1)',
          padding: '16px 20px',
        },
      },
    }),
    NavLink: NavLink.extend({
      classNames: {
        root: classes.navLinkRoot,
      },
      styles: {
        label: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 12,
        },
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        color: 'brandSpore',
        size: 'xs',
      },
      styles: {
        label: {
          fontFamily: 'var(--mantine-font-family-monospace)',
          fontSize: 11,
        },
        root: {
          background: 'var(--site-overlay-medium)',
          border: '1px solid var(--site-border-strong)',
          maxWidth: '100%',
          width: 'fit-content',
        },
      },
    }),
    Slider: Slider.extend({
      defaultProps: {
        color: 'brandSpore',
        label: null,
      },
      styles: {
        bar: {
          background: 'linear-gradient(to right, var(--glow-mycelium), var(--glow-spore))',
        },
        thumb: {
          background: 'var(--site-bg)',
          borderColor: 'var(--glow-spore)',
        },
        track: {
          background: 'var(--site-raised)',
          border: '1px solid var(--site-border-strong)',
        },
      },
    }),
    Tabs: Tabs.extend({
      classNames: {
        list: classes.tabsList,
        tab: classes.tabsTab,
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        color: 'brandSpore',
      },
    }),
  },
})
