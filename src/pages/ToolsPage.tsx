import { useEffect, useState } from 'react'
import {
  Anchor,
  Box,
  Chip,
  Code,
  Collapse,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core'

import { useLocation } from 'react-router-dom'

import { SectionHeader } from '../components/SectionHeader'
import { ToolCardSurface } from '../components/ToolCardSurface'
import { tools, layers } from '../data/ecosystem'
import type { EcosystemLayerKey } from '../data/ecosystem'
import { useStamp } from '../hooks/useStamp'
import shared from '../styles/shared.module.css'
import styles from './ToolsPage.module.css'

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
    <Box className={shared.page} component="main">
      <Container size="xl">
        <SectionHeader
          label="02 / Tools"
          title="Every body in the colony."
          subtitle={`${tools.length} fruiting bodies · 5 layers`}
        />

        <Chip.Group value={filter} onChange={(value) => setFilter(value as Filter)}>
          <Group className={styles['filter-bar']} gap={4} mt="xl">
            {FILTERS.map((f) => (
              <Chip key={f.key} type="radio" value={f.key}>
                {f.label}
                <span className={styles.count}>{countByLayer(f.key)}</span>
              </Chip>
            ))}
          </Group>
        </Chip.Group>

        <SimpleGrid className={styles['tool-grid']} cols={{ base: 1, sm: 2, xl: 3 }} mt="xl" spacing="md">
          {visible.map((tool) => {
            const isOpen = open === tool.key
            return (
              <ToolCardSurface
                className={`${styles['tool-card']}${isOpen ? ` ${styles['is-open']}` : ''}`}
                id={tool.key}
                key={tool.key}
                padding={0}
                radius="lg"
                toolColor={tool.color}
              >
                <UnstyledButton
                  aria-controls={`${tool.key}-details`}
                  aria-expanded={isOpen}
                  className={styles['tool-card__head']}
                  onClick={() => toggle(tool.key)}
                  type="button"
                  w="100%"
                >
                  <ThemeIcon className={styles['tool-card__icon']} radius="md" variant="light">
                    <svg fill="none" height="30" viewBox="0 0 30 30" width="30">
                      <circle cx="15" cy="15" fill="currentColor" opacity="0.2" r="12" />
                      <circle cx="15" cy="15" fill="currentColor" r="5" />
                    </svg>
                  </ThemeIcon>
                  <Box className={styles['tool-card__head__main']}>
                    <Title className={styles['tool-card__title']} order={3}>
                      {tool.name.toLowerCase()}
                      <em>{tool.role}</em>
                    </Title>
                    <Text className={styles['tool-card__role']}>{tool.layer}</Text>
                    <Text className={styles['tool-card__tag']}>{tool.tagline}</Text>
                  </Box>
                  <Box className={styles['tool-card__chev']}>{isOpen ? '×' : '+'}</Box>
                </UnstyledButton>

                <Collapse className={styles['tool-card__body']} expanded={isOpen} id={`${tool.key}-details`}>
                  <Box className={styles['tool-card__body__inner']}>
                    <Grid gap="md" p="md">
                      <Grid.Col span={{ base: 12, sm: 7 }}>
                        <Box className={styles['body-section']}>
                          <Text component="h4">what it does</Text>
                          <Text component="p">{tool.blurb}</Text>
                        </Box>
                        <Box className={styles['body-section']}>
                          <Text component="h4">layer</Text>
                          <Text component="p">{layerNote(tool.layer)}</Text>
                        </Box>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 5 }}>
                        <Box className={styles['body-section']}>
                          <Text component="h4">latin name</Text>
                          <Text className={shared.latin} component="p">{tool.latin}</Text>
                        </Box>
                        <Box className={styles['body-section']}>
                          <Text component="h4">install</Text>
                          <Code>{tool.install.startsWith('(') ? tool.install : `$ ${tool.install}`}</Code>
                        </Box>
                        <Box className={styles['body-section']}>
                          <Text component="h4">repo</Text>
                          <Anchor href={`https://${tool.repo}`} rel="noopener noreferrer" target="_blank">{tool.repo}</Anchor>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Collapse>
              </ToolCardSurface>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
