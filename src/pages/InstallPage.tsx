import { Box, Code, Container, Grid, SegmentedControl, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'

import { SectionHeader } from '../components/SectionHeader'
import { TerminalFrame } from '../components/TerminalFrame'
import { useStamp } from '../hooks/useStamp'
import shared from '../styles/shared.module.css'
import styles from './InstallPage.module.css'

const hosts = [
  {
    key: 'claude',
    label: 'Claude Code',
    config: 'claude mcp add hyphae\nclaude mcp add rhizome\nclaude mcp add canopy',
  },
  {
    key: 'codex',
    label: 'Codex',
    config: 'codex mcp add hyphae\ncodex mcp add rhizome\ncodex mcp add canopy',
  },
  {
    key: 'cursor',
    label: 'Cursor',
    config: '# Add to .cursor/mcp.json:\n{\n  "mcpServers": {\n    "hyphae": { "command": "hyphae-mcp" },\n    "rhizome": { "command": "rhizome" }\n  }\n}',
  },
]

const steps = [
  {
    num: '01',
    title: 'Install Stipe',
    latin: 'stipes fundamentum',
    blurb: 'Stipe manages the full colony. One command fetches all binaries and registers them with your host.',
    terminal: 'curl -fsSL https://stipe.sh/install.sh | sh',
  },
  {
    num: '02',
    title: 'Onboard your host',
    latin: 'hospitium primum',
    blurb: 'Register the MCP servers with your agent host. Stipe auto-detects Claude Code, Codex, and Cursor.',
    terminal: 'stipe init',
  },
  {
    num: '03',
    title: 'Install headline tools',
    latin: 'instrumenta praecipua',
    blurb: 'Memory, code intelligence, and coordination — the three layers that matter most.',
    terminal: 'stipe install hyphae rhizome canopy',
  },
  {
    num: '04',
    title: 'Launch the dashboard',
    latin: 'visus operandi',
    blurb: 'Cap shows memory health, token analytics, and coordination state in one view.',
    terminal: 'cd cap && npm run dev:all',
  },
  {
    num: '05',
    title: 'Add siblings as needed',
    latin: 'additamenta selecta',
    blurb: 'Install only what you need. Each tool is independent; they compose rather than depend.',
    terminal: 'stipe install mycelium cortina hymenium annulus volva lamella',
  },
]

export function InstallPage() {
  useStamp('install')
  const [activeHost, setActiveHost] = useState('claude')
  const host = hosts.find((h) => h.key === activeHost) ?? hosts[0]

  return (
    <Box className={shared.page} component="main">
      <Container size="xl">
        <SectionHeader
          label="05 / Install"
          title="Quick start."
          subtitle="from zero to colony"
        />

        <Stack className={styles['install-steps']} gap="xl">
          {steps.map((step, i) => (
            <Grid key={step.num}>
              <Grid.Col span={{ base: 12, md: 1 }}>
                <Text className={styles['install-step__num']}>{step.num}</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Title className={styles['install-step__title']} order={3}>{step.title}</Title>
                <Text className={`${shared.latin} ${styles['install-step__latin']}`}>{step.latin}</Text>
                <Text className={styles['install-step__blurb']}>{step.blurb}</Text>

                {i === 1 && (
                  <SegmentedControl
                    className={styles['host-tabs']}
                    data={hosts.map((h) => ({ label: h.label, value: h.key }))}
                    mt="md"
                    onChange={setActiveHost}
                    value={activeHost}
                  />
                )}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <TerminalFrame
                  bodyClassName={styles['terminal-block__body']}
                  className={styles['terminal-block']}
                  title={`${step.num} · ${step.title.toLowerCase()}`}
                >
                  <Code className={styles['terminal-block__code']} block>
                    {i === 1 ? host.config : step.terminal}
                  </Code>
                </TerminalFrame>
              </Grid.Col>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
