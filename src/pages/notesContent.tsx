import type { ReactNode } from 'react'
import { Box, Code, List, Text, Title } from '@mantine/core'

import shared from '../styles/shared.module.css'
import styles from './NotesPage.module.css'

export interface DocEntry {
  key: string
  repo: string
  name: string
  lines: number
  repoUrl: string
  content: ReactNode
}

export const DOCS: DocEntry[] = [
  {
    key: 'hyphae-readme',
    repo: 'hyphae',
    name: 'README.md',
    lines: 142,
    repoUrl: 'https://github.com/basidiocarp/hyphae/blob/main/README.md',
    content: (
      <Box className={styles['doc-body']}>
        <Title order={2}>hyphae</Title>
        <Text className={`${shared.latin} ${styles['doc-latin']}`}>Memoria persistens — persistent memory and RAG</Text>
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
      <Box className={styles['doc-body']}>
        <Title order={2}>mycelium</Title>
        <Text className={`${shared.latin} ${styles['doc-latin']}`}>Basidiocarp myceliumii — token-optimised CLI proxy</Text>
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
      <Box className={styles['doc-body']}>
        <Title order={2}>canopy</Title>
        <Text className={`${shared.latin} ${styles['doc-latin']}`}>Coordinatio multiplex — multi-agent coordination</Text>
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
      <Box className={styles['doc-body']}>
        <Title order={2}>septa</Title>
        <Text className={`${shared.latin} ${styles['doc-latin']}`}>Contractus validationis — shared schemas and fixtures</Text>
        <Text>The internal walls between hyphae. Septa owns the cross-tool payload schemas. Any change that crosses a tool boundary goes through septa first — update the schema, update the fixture, run validate-all.sh.</Text>
        <Code block mt="sm">{'cd septa && bash validate-all.sh'}</Code>
      </Box>
    ),
  },
]
