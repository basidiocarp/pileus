import { Box, Code, Container, Grid, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { useState } from 'react'

import { SectionHeader } from '../components/SectionHeader'
import { useStamp } from '../hooks/useStamp'

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
    <Box className="page-install" component="main">
      <Container size="xl">
        <SectionHeader
          label="05 / Install"
          title="Quick start."
          subtitle="from zero to colony"
        />

        <Stack className="install-steps" gap="xl">
          {steps.map((step, i) => (
            <Grid className="install-step" key={step.num}>
              <Grid.Col span={{ base: 12, md: 1 }}>
                <Text className="install-step__num">{step.num}</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Title className="install-step__title" order={3}>{step.title}</Title>
                <Text className="latin install-step__latin">{step.latin}</Text>
                <Text className="install-step__blurb">{step.blurb}</Text>

                {i === 1 && (
                  <Group className="host-tabs" gap={4} mt="md">
                    {hosts.map((h) => (
                      <UnstyledButton
                        className={`host-tab${activeHost === h.key ? ' host-tab--active' : ''}`}
                        key={h.key}
                        onClick={() => setActiveHost(h.key)}
                        type="button"
                      >
                        {h.label}
                      </UnstyledButton>
                    ))}
                  </Group>
                )}
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Box className="terminal-block">
                  <Box className="terminal-block__bar">
                    <span />
                    <span />
                    <span />
                  </Box>
                  <Code className="terminal-block__code" block>
                    {i === 1 ? host.config : step.terminal}
                  </Code>
                </Box>
              </Grid.Col>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
