import { useState } from 'react'
import { Anchor, Box, Code, Container, List, Text, Title } from '@mantine/core'

import { SectionHeader } from '../components/SectionHeader'
import { useStamp } from '../hooks/useStamp'

type DocEntry = {
  key: string
  repo: string
  name: string
  lines: number
  repoUrl: string
  content: React.ReactNode
}

const DOCS: DocEntry[] = [
  {
    key: 'hyphae-readme',
    repo: 'hyphae',
    name: 'README.md',
    lines: 142,
    repoUrl: 'https://github.com/basidiocarp/hyphae/blob/main/README.md',
    content: (
      <Box className="doc-body">
        <Title order={2}>hyphae</Title>
        <Text className="latin" style={{ margin: '8px 0 20px' }}>Memoria persistens — persistent memory and RAG</Text>
        <Text>Two memory models doing different jobs. <strong>Memories</strong> have a decay curve — they fade unless reinforced, like real working memory. <strong>Memoirs</strong> are durable concept graphs that survive indefinitely.</Text>
        <Title order={3} mt="xl">Recall signals</Title>
        <List mt="sm" spacing="xs">
          <List.Item><strong>BM25 (25%)</strong> — keyword matching against stored summaries</List.Item>
          <List.Item><strong>Cosine (55%)</strong> — semantic similarity via sentence embeddings</List.Item>
          <List.Item><strong>Entity linking (20%)</strong> — ecosystem vocabulary overlap</List.Item>
        </List>
        <Title order={3} mt="xl">Quick start</Title>
        <Code block mt="sm">{'stipe install hyphae\nhyphae_memory_store topic="decisions/myproject" ...\nhyphae_memory_recall query="auth middleware" --limit 5'}</Code>
      </Box>
    ),
  },
  {
    key: 'mycelium-readme',
    repo: 'mycelium',
    name: 'README.md',
    lines: 98,
    repoUrl: 'https://github.com/basidiocarp/mycelium/blob/main/README.md',
    content: (
      <Box className="doc-body">
        <Title order={2}>mycelium</Title>
        <Text className="latin" style={{ margin: '8px 0 20px' }}>Basidiocarp myceliumii — token-optimised CLI proxy</Text>
        <Text>Sits between the agent and the shell. Verbose output from <Code>cargo test</Code>, <Code>git log</Code>, and similar commands is compressed before it reaches the model. The full output is chunked into hyphae if you need it.</Text>
        <Title order={3} mt="xl">Filters</Title>
        <List mt="sm" spacing="xs">
          <List.Item><strong>cargo test</strong> — strips passing lines, keeps failures and timings</List.Item>
          <List.Item><strong>git log</strong> — collapses identical commit runs, preserves merges</List.Item>
          <List.Item><strong>npm install</strong> — drops progress bars, keeps warnings and errors</List.Item>
        </List>
        <Code block mt="sm">{'# Savings summary (typical)\ncargo test:  −87%\ngit log:     −72%\nnpm install: −64%'}</Code>
      </Box>
    ),
  },
  {
    key: 'canopy-readme',
    repo: 'canopy',
    name: 'README.md',
    lines: 115,
    repoUrl: 'https://github.com/basidiocarp/canopy/blob/main/README.md',
    content: (
      <Box className="doc-body">
        <Title order={2}>canopy</Title>
        <Text className="latin" style={{ margin: '8px 0 20px' }}>Coordinatio multiplex — multi-agent coordination</Text>
        <Text>A local-first ledger for task ownership, handoffs, evidence, and Council threads across parallel agent work. Prevents two agents from taking the same branch at the same time.</Text>
        <Title order={3} mt="xl">Core concepts</Title>
        <List mt="sm" spacing="xs">
          <List.Item><strong>Task</strong> — an atomic unit of work with an owner</List.Item>
          <List.Item><strong>Handoff</strong> — evidence that a task transferred between agents</List.Item>
          <List.Item><strong>Council</strong> — a named thread for multi-agent discussion</List.Item>
        </List>
      </Box>
    ),
  },
  {
    key: 'septa-contracts',
    repo: 'septa',
    name: 'README.md',
    lines: 67,
    repoUrl: 'https://github.com/basidiocarp/septa/blob/main/README.md',
    content: (
      <Box className="doc-body">
        <Title order={2}>septa</Title>
        <Text className="latin" style={{ margin: '8px 0 20px' }}>Contractus validationis — shared schemas and fixtures</Text>
        <Text>The internal walls between hyphae. Septa owns the cross-tool payload schemas. Any change that crosses a tool boundary goes through septa first — update the schema, update the fixture, run validate-all.sh.</Text>
        <Code block mt="sm">{'cd septa && bash validate-all.sh'}</Code>
      </Box>
    ),
  },
]

export function NotesPage() {
  useStamp('notes')
  const [activeDoc, setActiveDoc] = useState(DOCS[0].key)
  const [openTabs, setOpenTabs] = useState<string[]>([DOCS[0].key])

  const doc = DOCS.find((d) => d.key === activeDoc) ?? DOCS[0]

  const openDoc = (key: string) => {
    setActiveDoc(key)
    if (!openTabs.includes(key)) {
      setOpenTabs((prev) => [...prev, key])
    }
  }

  const closeTab = (key: string, e: React.SyntheticEvent) => {
    e.stopPropagation()
    if (openTabs.length === 1) return
    const next = openTabs.filter((k) => k !== key)
    setOpenTabs(next)
    if (activeDoc === key) setActiveDoc(next[next.length - 1])
  }

  return (
    <Box className="page-notes" component="main">
      <Container size="xl">
        <SectionHeader
          label="03 / Notes"
          title="Notes from the repos."
          subtitle="architecture · decisions · field observations"
        />

        <Box className="editor-shell">
          <Box className="editor-bar">
            <Box className="lights">
              <span /><span /><span />
            </Box>
            <Text className="crumb">
              basidiocarp <span className="sep">/</span> {doc.repo} <span className="sep">/</span>{' '}
              <span style={{ color: 'var(--glow-spore)' }}>{doc.name}</span>
            </Text>
            <Box className="branch">
              <Anchor href={doc.repoUrl} rel="noopener noreferrer" style={{ color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }} target="_blank" underline="hover">
                main ↗
              </Anchor>
            </Box>
          </Box>

          <Box className="editor-body">
            <Box className="file-tree">
              <Text className="ft-section">repos</Text>
              {DOCS.map((d) => (
                <Box
                  className={`ft-row${activeDoc === d.key ? ' is-active' : ''}`}
                  key={d.key}
                  onClick={() => openDoc(d.key)}
                >
                  {d.repo}/{d.name}
                  <Text className="ln" component="span">{d.lines}L</Text>
                </Box>
              ))}
            </Box>

            <Box className="editor-content">
              <Box className="tabs">
                {openTabs.map((key) => {
                  const d = DOCS.find((x) => x.key === key)
                  if (!d) return null
                  return (
                    <Box
                      className={`tab${activeDoc === key ? ' is-active' : ''}`}
                      key={key}
                      onClick={() => setActiveDoc(key)}
                    >
                      {d.repo}/{d.name}
                      <span
                        aria-label="Close tab"
                        className="x"
                        onClick={(e) => closeTab(key, e)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeTab(key, e) }}
                        role="button"
                        tabIndex={0}
                      >×</span>
                    </Box>
                  )
                })}
              </Box>

              <Box className="doc" style={{ display: 'block' }}>
                {doc.content}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
