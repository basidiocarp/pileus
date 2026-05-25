import { useState } from 'react'
import {
  Badge,
  Box,
  Card,
  Chip,
  Container,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Timeline,
  Title,
} from '@mantine/core'

import { SectionHeader } from '../components/SectionHeader'
import { ToolColorCard } from '../components/ToolColorCard'
import { tools as ecosystemTools } from '../data/ecosystem'
import { useStamp } from '../hooks/useStamp'
import shared from '../styles/shared.module.css'
import styles from './ChangelogPage.module.css'

type ChangeKind = 'added' | 'changed' | 'fixed'

type Entry = {
  date: string
  tool: string
  ver: string
  kind: ChangeKind
  lat: string
  msg: string
}

const ENTRIES: Entry[] = [
  { date: '2026-04-15', tool: 'hyphae',   ver: '0.10.11', kind: 'fixed',   lat: 'tokenizer respectus diacriticorum',
    msg: 'FTS5 tokenizer now respects diacritics in code identifiers — Spanish, Vietnamese, and accented Rust source no longer fragment on recall.' },
  { date: '2026-04-14', tool: 'mycelium', ver: '0.8.4',   kind: 'added',   lat: 'addita compressio structurata',
    msg: 'Structured compression mode for JSON and TOML blobs — collapses repeated keys to ellipsis and preserves schema shape.' },
  { date: '2026-04-12', tool: 'rhizome',  ver: '0.6.2',   kind: 'changed', lat: 'mutata impactu analysis',
    msg: 'Impact analysis now traverses re-exports so renaming an alias shows the true blast radius across module boundaries.' },
  { date: '2026-04-10', tool: 'canopy',   ver: '0.4.1',   kind: 'fixed',   lat: 'fixum handoff idempotentiae',
    msg: 'Handoff evidence writes are now idempotent — re-running a completed lane no longer duplicates evidence rows.' },
  { date: '2026-04-08', tool: 'cap',      ver: '0.3.0',   kind: 'added',   lat: 'addita memoria salutis',
    msg: 'Memory health panel now shows decay-weighted topic distribution and surfaces topics approaching consolidation threshold.' },
  { date: '2026-04-06', tool: 'cortina',  ver: '0.5.7',   kind: 'changed', lat: 'mutata detectionem exitum',
    msg: 'Exit code detection reads the last non-zero exit in a pipeline rather than the final command, reducing false positives.' },
  { date: '2026-04-03', tool: 'stipe',    ver: '0.9.2',   kind: 'added',   lat: 'addita detectionem hostis',
    msg: 'Host auto-detection now recognises Codex CLI alongside Claude Code and Cursor without manual --host flag.' },
  { date: '2026-03-29', tool: 'hyphae',   ver: '0.10.10', kind: 'added',   lat: 'addita entitas extractio',
    msg: 'Entity linking retrieval signal (20% weight) surfaces memories that share ecosystem vocabulary even when the phrasing differs.' },
  { date: '2026-03-25', tool: 'annulus',  ver: '0.3.0',   kind: 'added',   lat: 'addita segmenta registri',
    msg: 'Segment registry, config, and tiered context bar shipped. Segment weights are user-editable in ~/.config/annulus/.' },
]

const STATS = [
  { v: '34', k: 'releases this month' },
  { v: '12', k: 'tools active' },
  { v: '−80%', k: 'avg shell-token noise' },
  { v: '0', k: 'production incidents' },
]

const ALL_TOOLS = [...new Set(ENTRIES.map((e) => e.tool))]

function groupByDate(entries: Entry[]) {
  const map = new Map<string, Entry[]>()
  for (const e of entries) {
    const list = map.get(e.date) ?? []
    list.push(e)
    map.set(e.date, list)
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
}

export function ChangelogPage() {
  useStamp('changelog')
  const [kindFilter, setKindFilter] = useState<string>('all')
  const [toolFilter, setToolFilter] = useState<string>('all')

  const filtered = ENTRIES.filter((e) => {
    if (kindFilter !== 'all' && e.kind !== kindFilter) return false
    if (toolFilter !== 'all' && e.tool !== toolFilter) return false
    return true
  })

  const groups = groupByDate(filtered)

  return (
    <Box className={shared.page} component="main">
      <Container size="xl">
        <SectionHeader
          label="06 / Changelog"
          title="What fruited this month."
          subtitle="CALENDARIVM · recently shipped"
        />

        <Box className={styles['cl-hero']} mt="xl">
          <Text className={`${shared.latin} ${styles['cl-lede']}`}>
            A merged feed of every CHANGELOG.md across the twelve repos. Filter by tool or by
            change type. Newest first.
          </Text>

          <SimpleGrid cols={{ base: 2, sm: 4 }} mt="xl" spacing="md">
            {STATS.map((s) => (
              <Card className={styles['cl-stat']} key={s.k} padding="lg" radius="md">
                <Text className={styles['cl-stat__v']}><em>{s.v}</em></Text>
                <Text className={styles['cl-stat__k']}>{s.k}</Text>
              </Card>
            ))}
          </SimpleGrid>

          <Box className={styles['cl-filters']}>
            <SegmentedControl
              className={`${styles['filter-row']} ${styles['filter-row--segmented']}`}
              data={['all', 'added', 'changed', 'fixed']}
              onChange={setKindFilter}
              value={kindFilter}
            />
            <Chip.Group value={toolFilter} onChange={setToolFilter}>
              <Group className={styles['filter-row']} gap={4}>
                <Chip type="radio" value="all">
                  all tools
                </Chip>
                {ALL_TOOLS.map((t) => (
                  <Chip key={t} type="radio" value={t}>
                    {t}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Box>
        </Box>

        <Timeline active={groups.length} bulletSize={12} className={styles['cl-timeline']} color="brandSpore" lineWidth={1}>
          {groups.map(([date, entries]) => (
            <Timeline.Item
              className={styles['tl-day']}
              key={date}
              title={
                <Text className={styles['tl-day__label']}>
                  <span className={styles.date}>{date}</span>
                  {entries.length} release{entries.length !== 1 ? 's' : ''}
                </Text>
              }
            >
              <Stack gap="sm">
                {entries.map((e, i) => (
                  <ToolColorCard
                    className={styles['tl-release']}
                    key={i}
                    padding="md"
                    radius="md"
                    toolColor={ecosystemTools.find((t) => t.key === e.tool)?.color ?? 'var(--glow-spore)'}
                  >
                    <Box className={styles['tl-release__head']}>
                      <Text className={styles['tl-release__tool']}>{e.tool}</Text>
                      <Badge radius="sm" size="xs" variant={"version" as string}>{e.ver}</Badge>
                      <Badge radius="sm" size="xs" variant={e.kind as string}>{e.kind}</Badge>
                      <Text className={styles['tl-release__lat']}>{e.lat}</Text>
                    </Box>
                    <Text className={styles['tl-release__msg']}>{e.msg}</Text>
                  </ToolColorCard>
                ))}
              </Stack>
            </Timeline.Item>
          ))}
          {filtered.length === 0 && (
            <Text className={styles['cl-empty']}>No entries match the current filter.</Text>
          )}
        </Timeline>

        <Box className={styles['cl-footnote']}>
          <Title className={styles['cl-footnote__title']} order={4}>On the matter of the thirteenth tool</Title>
          <Text className={styles['cl-footnote__sub']}>— septa absentia</Text>
          <Text>
            There are twelve repos. There is a thirteenth presence that appears in no changelog
            because it ships nothing. It only watches which walls between hyphae remain intact.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
