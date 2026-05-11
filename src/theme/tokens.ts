import { createTheme, rem } from '@mantine/core'

// Semantic CSS variables are defined in src/styles/tokens.css
// Mantine `other` tokens here are for JS-side theme access (e.g. useMantineTheme().other.textPrimary)
export const themeTokens = createTheme({
  other: {
    borderLight: '#2a1d11',
    brand: {
      bark: '#a86a2c',
      cap: '#e94e1b',
      capSoft: '#c63d14',
      ink: '#0b0000',
      moss: '#4caf50',
      mossDeep: '#2e7d32',
      soil: '#3b1f0f',
      spores: '#f2a93b',
      sporesSoft: '#fabf64',
      stipe: '#fffdf8',
      stipeShade: '#f6efde',
    },
    containerPadding: rem(28),
    gradients: {
      decay: 'linear-gradient(135deg, var(--mantine-color-fruiting-6), var(--mantine-color-decay-6))',
      default: 'linear-gradient(135deg, var(--mantine-color-mycelium-6), var(--mantine-color-spore-6))',
      warm: 'linear-gradient(135deg, var(--mantine-color-brandCap-6), var(--mantine-color-brandSpore-5))',
    },
    site: {
      accent: '#f2a93b',
      accent2: '#e94e1b',
      background: '#0d0805',
      border: '#2a1d11',
      borderStrong: '#3b281a',
      foreground: '#f4ead8',
      foregroundDim: '#8b7a5e',
      foregroundMuted: '#c9b896',
      raised: '#1d1610',
      rule: '#2a1d11',
      sunken: '#080503',
      surface: '#15100a',
    },
    textPrimary: '#f4ead8',
    textSecondary: '#c9b896',
    toolColors: {
      annulus: 'var(--mantine-color-chitin-3)',
      canopy: 'var(--mantine-color-mycelium-3)',
      cap: 'var(--mantine-color-lichen-4)',
      cortina: 'var(--mantine-color-fruiting-5)',
      hyphae: 'var(--mantine-color-substrate-5)',
      hymenium: 'var(--mantine-color-gill-4)',
      lamella: 'var(--mantine-color-hymenium-5)',
      mycelium: 'var(--mantine-color-mycelium-5)',
      rhizome: 'var(--mantine-color-spore-4)',
      septa: 'var(--mantine-color-mycelium-7)',
      spore: 'var(--mantine-color-spore-3)',
      stipe: 'var(--mantine-color-brandStipe-6)',
      volva: 'var(--mantine-color-decay-4)',
    },
  },
})
