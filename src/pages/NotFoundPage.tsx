import { Box, Button, Card, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

import shared from '../styles/shared.module.css'
import styles from './NotFoundPage.module.css'

const suggests = [
  { to: '/',          label: 'surface',   hint: 'the home page' },
  { to: '/ecosystem', label: 'ecosystem', hint: 'the full map' },
  { to: '/tools',     label: 'tools',     hint: '12 fruiting bodies' },
  { to: '/install',   label: 'install',   hint: 'quick start' },
]

/* Minimal spore-field SVG for the right column */
function AbsensIllustration() {
  return (
    <svg aria-hidden="true" className={styles['nf-illust']} viewBox="0 0 320 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soil line */}
      <path d="M20 300 Q160 318 300 300" stroke="#3b1f0f" strokeWidth="1" />
      <path d="M20 306 Q160 324 300 306" stroke="#5b3a20" strokeDasharray="2 4" strokeWidth="0.5" />

      {/* Stipe (faded / absent) */}
      <path
        d="M148 300 L148 190 Q148 184 154 182 L166 182 Q172 184 172 190 L172 300 Z"
        fill="#1a120b"
        stroke="#2a1910"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Cap outline (absent / ghost) */}
      <path
        d="M160 80 C100 80 58 130 58 178 C58 190 66 182 76 182 L244 182 C254 182 262 190 262 178 C262 130 220 80 160 80 Z"
        fill="none"
        stroke="#2a1910"
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />

      {/* Floating spores */}
      {[
        [70, 140], [240, 120], [90, 200], [230, 190], [55, 250],
        [270, 230], [130, 60], [200, 50], [300, 170], [40, 170],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.8 : 1.2} fill="#f2a93b" opacity={0.25 + (i % 4) * 0.1} />
      ))}

      {/* "404" in fine mono */}
      <text
        x="160" y="160"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="48"
        fontWeight="300"
        fill="#2a1910"
        letterSpacing="-2"
      >
        404
      </text>

      {/* Annotation */}
      <text x="275" y="296" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5b4d3a" letterSpacing="0.1em">fruiting</text>
      <text x="275" y="307" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#5b4d3a" letterSpacing="0.1em">body absent</text>
      <line x1="260" y1="300" x2="274" y2="300" stroke="#5b4d3a" strokeWidth="0.8" />
    </svg>
  )
}

export function NotFoundPage() {
  return (
    <Box className={shared.page} component="main">
      <Container size="xl">
        <Box className={styles['nf-grid']}>
          <Box className={styles['nf-card']}>
            <Box className={styles['nf-stamp']}>missing</Box>
            <Text className={shared.eyebrow}>
              <span className={shared.dot}>●</span> Field guide entry · 404 of 12
            </Text>
            <Title className={styles['nf-title']} order={1}>
              A <em>missing</em> fruiting body.
            </Title>
            <Text className={styles['nf-latin']} component="span">
              Carpophorus absens — the page that did not fruit
            </Text>

            <Box className={styles['nf-meta']} component="dl">
              <Text component="dt">habitat</Text>
              <Text component="dd">{window.location.pathname}</Text>
              <Text component="dt">last sighted</Text>
              <Text component="dd">never · no record in herbarium</Text>
              <Text component="dt">substrate</Text>
              <Text component="dd">broken link, expired link, hopeful guess</Text>
              <Text component="dt">edibility</Text>
              <Text component="dd"><span className={styles.strike}>choice</span> · unknown</Text>
            </Box>

            <Stack className={styles['nf-body']} gap="sm">
              <Text>
                The page you sought has either <em>not yet fruited</em>, has long since decayed
                back into the substrate, or was never in the herbarium to begin with.
              </Text>
              <Text>
                This is normal. Most of any organism is invisible — only the{' '}
                <em>fruiting body</em> rises into the light, and only briefly.
              </Text>
            </Stack>

            <Box className={styles['nf-actions']}>
              <Button component={Link} to="/" variant="filled">← back to the surface</Button>
              <Button component={Link} to="/tools" variant="outline">browse tools</Button>
              <Button component={Link} to="/install" variant="outline">quick start</Button>
            </Box>
          </Box>

          <Box className={styles['nf-illust-wrap']}>
            <AbsensIllustration />
          </Box>
        </Box>

        <Box className={styles['nf-suggest']} mt="xl">
          <Text className={styles['nf-suggest__label']}>you might find</Text>
          <SimpleGrid cols={{ base: 2, sm: 4 }} mt="md" spacing="md">
            {suggests.map((s) => (
              <Card className={styles['nf-suggest__card']} component={Link} key={s.to} padding="md" radius="md" to={s.to}>
                <Text component="strong">{s.label}</Text>
                <Text component="span">{s.hint}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
