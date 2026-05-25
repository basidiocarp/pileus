import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Box, Card, Group, SegmentedControl, Stack, Text } from '@mantine/core'

import { edges, layers, tools, type EcosystemLayerKey, type EcosystemToolKey } from '../data/ecosystem'
import styles from './EcosystemGraph.module.css'

type Position = { x: number; y: number }

const layerY: Record<EcosystemLayerKey, number> = {
  coordination: 220,
  infrastructure: 600,
  memory: 340,
  runtime: 470,
  surface: 90,
}

const layerOrder: EcosystemLayerKey[] = ['surface', 'coordination', 'memory', 'runtime', 'infrastructure']
const graphWidth = 1200
const graphHeight = 680

function getPositions() {
  const positions = {} as Record<EcosystemToolKey, Position>

  for (const layer of layerOrder) {
    const layerTools = tools.filter((tool) => tool.layer === layer)
    const padX = 180
    const span = graphWidth - padX * 2

    layerTools.forEach((tool, index) => {
      positions[tool.key] = {
        x: layerTools.length === 1 ? graphWidth / 2 : padX + (span * index) / (layerTools.length - 1),
        y: layerY[layer],
      }
    })
  }

  return positions
}

export function EcosystemGraph() {
  const [activeTool, setActiveTool] = useState<EcosystemToolKey | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const positions = useMemo(() => getPositions(), [])

  const activeLinks = useMemo(() => {
    if (!activeTool) return new Set<EcosystemToolKey>()
    const links = new Set<EcosystemToolKey>([activeTool])
    edges.forEach(([a, b]) => {
      if (a === activeTool) links.add(b)
      if (b === activeTool) links.add(a)
    })
    return links
  }, [activeTool])

  const selectedTool = tools.find((tool) => tool.key === activeTool)

  const activateTool = (toolKey: EcosystemToolKey) => {
    setActiveTool(toolKey)
  }

  const handleNodeKeyDown = (event: KeyboardEvent<SVGGElement>, toolKey: EcosystemToolKey) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    activateTool(toolKey)
  }

  return (
    <Card className={styles['graph-card']} id="ecosystem-graph" padding={0} radius="lg">
      <Group className={styles['graph-card__chrome']} justify="space-between">
        <Group className={styles['graph-card__legend']} gap="md">
          <Group align="center" gap={6}>
            <svg fill="none" height="8" viewBox="0 0 20 8" width="20">
              <line stroke="#6b4d38" strokeWidth="1.5" x1="0" x2="20" y1="4" y2="4" />
            </svg>
            <Text component="span">static edge</Text>
          </Group>
          <Group align="center" gap={6}>
            <svg fill="none" height="8" viewBox="0 0 20 8" width="20">
              <line stroke="#f2a93b" strokeDasharray="4 3" strokeWidth="1.6" x1="0" x2="20" y1="4" y2="4" />
            </svg>
            <Text component="span">active flow</Text>
          </Group>
        </Group>
        <SegmentedControl
          className={styles['graph-filter']}
          data={[
            { label: 'all', value: 'all' },
            { label: 'surface', value: 'surface' },
            { label: 'coord.', value: 'coordination' },
            { label: 'memory', value: 'memory' },
            { label: 'runtime', value: 'runtime' },
            { label: 'infra', value: 'infrastructure' },
          ]}
          onChange={setFilter}
          value={filter}
        />
      </Group>

      <Box className={styles['graph-card__stage']}>
        <svg className={styles['ecosystem-graph']} viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
          <defs>
            <pattern height="20" id="dotgrid" patternUnits="userSpaceOnUse" width="20">
              <circle cx="1" cy="1" fill="#1f150c" r="0.6" />
            </pattern>
          </defs>
          <rect fill="url(#dotgrid)" height={graphHeight} width={graphWidth} />

          {layerOrder.map((layer) => {
            const meta = layers.find((item) => item.key === layer)
            return (
              <g key={layer}>
                <line stroke="#1f150c" strokeDasharray="2 6" strokeWidth="1" x1="80" x2="1120" y1={layerY[layer]} y2={layerY[layer]} />
                <text fill="#5b4d3a" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" x="100" y={layerY[layer] - 18}>
                  {meta?.title.toUpperCase()}
                </text>
              </g>
            )
          })}

          {edges.map(([a, b]) => {
            const pa = positions[a]
            const pb = positions[b]
            const involved = activeTool === a || activeTool === b
            const mx = (pa.x + pb.x) / 2
            const dx = pb.x - pa.x
            const dy = pb.y - pa.y
            const cy = (pa.y + pb.y) / 2 + (dx > 0 ? -1 : 1) * Math.min(80, Math.abs(dy) * 0.4 + 20)

            const aLayer = tools.find((t) => t.key === a)?.layer
            const bLayer = tools.find((t) => t.key === b)?.layer
            const dimmedByFilter = filter !== 'all' && aLayer !== filter && bLayer !== filter
            const edgeOpacity = dimmedByFilter ? 0.08 : activeTool && !involved ? 0.28 : 1

            return (
              <path
                className={involved ? styles['ecosystem-graph__edge--active'] : undefined}
                d={`M${pa.x},${pa.y} Q${mx},${cy} ${pb.x},${pb.y}`}
                fill="none"
                key={`${a}-${b}`}
                opacity={edgeOpacity}
                stroke={involved ? '#f2a93b' : '#3b281a'}
                strokeDasharray={involved ? '4 3' : undefined}
                strokeWidth={involved ? 1.6 : 1}
              />
            )
          })}

          {tools.map((tool) => {
            const position = positions[tool.key]
            const dimmedByFilter = filter !== 'all' && tool.layer !== filter
            const dimmedByHover = activeTool && !activeLinks.has(tool.key)
            const opacity = dimmedByFilter || dimmedByHover ? 0.22 : 1
            const isActive = activeTool === tool.key

            return (
              <g
                className={styles['ecosystem-graph__node']}
                key={tool.key}
                onBlur={() => setActiveTool(null)}
                onClick={() => activateTool(tool.key)}
                onFocus={() => setActiveTool(tool.key)}
                onKeyDown={(event) => handleNodeKeyDown(event, tool.key)}
                onMouseEnter={() => setActiveTool(tool.key)}
                onMouseLeave={() => setActiveTool(null)}
                opacity={opacity}
                aria-label={`${tool.name}: ${tool.role}`}
                aria-pressed={isActive}
                role="button"
                tabIndex={0}
                transform={`translate(${position.x}, ${position.y})`}
              >
                <circle fill="transparent" opacity="0.4" r="28" stroke={tool.color} strokeWidth="0.6" />
                <circle fill={tool.color} opacity={isActive ? 0.25 : 0.08} r={isActive ? 32 : 22} />
                <circle className={styles['ecosystem-graph__core']} fill={tool.color} r={isActive ? 18 : 14} />
                <circle className={styles['ecosystem-graph__pulse']} fill="none" r="14" stroke={tool.color} strokeWidth="1" />
                <text fill="#f4ead8" fontFamily="JetBrains Mono" fontSize="12" fontWeight="500" textAnchor="middle" y="46">
                  {tool.name.toLowerCase()}
                </text>
                <text fill="#8b7a5e" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.5" textAnchor="middle" y="60">
                  {tool.role}
                </text>
              </g>
            )
          })}
        </svg>

        {selectedTool ? (
          <Stack className={styles['graph-card__tip']} gap={2}>
            <Text component="b">{selectedTool.name.toLowerCase()}</Text>
            <Text component="span">{selectedTool.latin}</Text>
            <Text>{selectedTool.role}</Text>
          </Stack>
        ) : null}
      </Box>
    </Card>
  )
}
