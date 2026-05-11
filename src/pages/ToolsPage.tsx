import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { Anchor, Box, Button, Card, Code, Container, Grid, SimpleGrid, Text, Title } from '@mantine/core'

import { useLocation } from 'react-router-dom'

import { SectionHeader } from '../components/SectionHeader'
import { tools, layers } from '../data/ecosystem'
import type { EcosystemLayerKey } from '../data/ecosystem'
import { useStamp } from '../hooks/useStamp'

type Filter = 'all' | EcosystemLayerKey

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',            label: 'all' },
  { key: 'surface',        label: 'surface' },
  { key: 'coordination',   label: 'coordination' },
  { key: 'memory',         label: 'memory' },
  { key: 'runtime',        label: 'runtime' },
  { key: 'infrastructure', label: 'infrastructure' },
]

function layerNote(key: EcosystemLayerKey): string {
  return layers.find((l) => l.key === key)?.note ?? ''
}

export function ToolsPage() {
  useStamp('tools')
  const location = useLocation()
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])
  const [open, setOpen] = useState<string | null>(null)

  const visible = filter === 'all' ? tools : tools.filter((t) => t.layer === filter)
  const countByLayer = (key: Filter) =>
    key === 'all' ? tools.length : tools.filter((t) => t.layer === key).length

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key))

  return (
    <Box className="page-tools" component="main">
      <Container size="xl">
        <SectionHeader
          label="02 / Tools"
          title="Every body in the colony."
          subtitle={`${tools.length} fruiting bodies · 5 layers`}
        />

        <Box className="filter-bar" component="div" mt="xl">
          {FILTERS.map((f) => (
            <Button
              aria-pressed={filter === f.key}
              key={f.key}
              onClick={() => setFilter(f.key)}
              size="compact-sm"
              type="button"
              variant={filter === f.key ? 'filled' : 'subtle'}
            >
              {f.label}
              <span className="count">{countByLayer(f.key)}</span>
            </Button>
          ))}
        </Box>

        <SimpleGrid className="tool-grid" cols={{ base: 1, sm: 2, xl: 3 }} mt="xl" spacing="md">
          {visible.map((tool) => {
            const isOpen = open === tool.key
            return (
              <Card
                className={`tool-card${isOpen ? ' is-open' : ''}`}
                id={tool.key}
                key={tool.key}
                padding={0}
                radius="lg"
                style={{ '--tool-color': tool.color } as CSSProperties}
              >
                <Box className="tool-card__head" onClick={() => toggle(tool.key)}>
                  <Box className="tool-card__icon">
                    <svg fill="none" height="30" viewBox="0 0 30 30" width="30">
                      <circle cx="15" cy="15" fill="currentColor" opacity="0.2" r="12" />
                      <circle cx="15" cy="15" fill="currentColor" r="5" />
                    </svg>
                  </Box>
                  <Box className="tool-card__head__main">
                    <Title className="tool-card__title" order={3}>
                      {tool.name.toLowerCase()}
                      <em>{tool.role}</em>
                    </Title>
                    <Text className="tool-card__role">{tool.layer}</Text>
                    <Text className="tool-card__tag">{tool.tagline}</Text>
                  </Box>
                  <Box className="tool-card__chev">{isOpen ? '×' : '+'}</Box>
                </Box>

                <Box className="tool-card__body">
                  <Box className="tool-card__body__inner">
                    <Grid gap="md" p="md">
                      <Grid.Col span={{ base: 12, sm: 7 }}>
                        <Box className="body-section">
                          <Text component="h4">what it does</Text>
                          <Text component="p">{tool.blurb}</Text>
                        </Box>
                        <Box className="body-section">
                          <Text component="h4">layer</Text>
                          <Text component="p">{layerNote(tool.layer)}</Text>
                        </Box>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 5 }}>
                        <Box className="body-section">
                          <Text component="h4">latin name</Text>
                          <Text className="latin" component="p">{tool.latin}</Text>
                        </Box>
                        <Box className="body-section">
                          <Text component="h4">install</Text>
                          <Code>{tool.install.startsWith('(') ? tool.install : `$ ${tool.install}`}</Code>
                        </Box>
                        <Box className="body-section">
                          <Text component="h4">repo</Text>
                          <Anchor href={`https://${tool.repo}`} rel="noopener noreferrer" target="_blank">{tool.repo}</Anchor>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Box>
              </Card>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
