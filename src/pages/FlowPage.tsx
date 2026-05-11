import { useEffect, useRef, useState } from 'react'
import { ActionIcon, Box, Container, Text } from '@mantine/core'

import { SectionHeader } from '../components/SectionHeader'
import { useStamp } from '../hooks/useStamp'

type Stage = {
  label: string
  detail: string
  duration: number
  lines: Array<{ kind: 'prompt' | 'out' | 'hl' | 'com' | 'grn'; text: string }>
}

const STAGES: Stage[] = [
  {
    label: 'Agent prompt arrives',
    detail: 'The raw prompt hits the execution host and is routed to the active session.',
    duration: 1.2,
    lines: [
      { kind: 'prompt', text: '$ claude "refactor auth middleware"' },
      { kind: 'com',    text: '# volva: routing to session bc-4a2f' },
      { kind: 'out',    text: 'session bc-4a2f ready' },
    ],
  },
  {
    label: 'Hyphae recalls context',
    detail: 'Entity linking, BM25, and cosine signals vote. Relevant memories surface.',
    duration: 1.8,
    lines: [
      { kind: 'prompt', text: '$ hyphae recall "auth middleware"' },
      { kind: 'hl',     text: '[memory] decisions/basidiocarp: JWT replaced session tokens (2026-02)' },
      { kind: 'hl',     text: '[memory] errors/resolved: cookie-store race condition fixed in PR #241' },
      { kind: 'com',    text: '# 2 memories surfaced (score > 0.71)' },
    ],
  },
  {
    label: 'Mycelium intercepts output',
    detail: 'Cargo test runs. Mycelium strips the 200 passing lines and keeps the 3 relevant ones.',
    duration: 2.4,
    lines: [
      { kind: 'prompt', text: '$ cargo test --lib auth' },
      { kind: 'com',    text: '# mycelium: 203 lines → 7 lines (−96%)' },
      { kind: 'out',    text: 'running 47 tests' },
      { kind: 'grn',    text: 'test auth::token_refresh ... ok' },
      { kind: 'grn',    text: 'test auth::session_expiry ... ok' },
      { kind: 'out',    text: '47 passed; 0 failed; 0 ignored' },
    ],
  },
  {
    label: 'Cortina writes a signal',
    detail: 'The successful test run triggers a PostToolUse hook. Cortina writes a structured event.',
    duration: 1.4,
    lines: [
      { kind: 'com',    text: '# cortina: PostToolUse hook fired' },
      { kind: 'hl',     text: 'event: { type: "test_pass", tool: "cargo", exit: 0 }' },
      { kind: 'com',    text: '# outcome: worth_keeping=true' },
    ],
  },
  {
    label: 'Canopy updates the ledger',
    detail: 'Task evidence is appended. The handoff state moves from in_progress to verified.',
    duration: 1.6,
    lines: [
      { kind: 'prompt', text: '$ canopy task update auth-refactor --status verified' },
      { kind: 'hl',     text: '[task] auth-refactor: in_progress → verified' },
      { kind: 'com',    text: '# evidence: test_pass logged at 14:32:07' },
    ],
  },
  {
    label: 'Cap surfaces the result',
    detail: 'The operator dashboard reflects the new state. Memory health stays green.',
    duration: 1.2,
    lines: [
      { kind: 'out',    text: 'cap: task auth-refactor → ✓ verified' },
      { kind: 'out',    text: 'cap: memory health 94% · 0 invalidated' },
      { kind: 'grn',    text: 'colony state: nominal' },
    ],
  },
]

const TOTAL_DURATION = STAGES.reduce((acc, s) => acc + s.duration, 0)

export function FlowPage() {
  useStamp('flow')
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const baseRef = useRef<number>(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const stageIndex = (() => {
    let elapsed = 0
    for (let i = 0; i < STAGES.length; i++) {
      elapsed += STAGES[i].duration
      if (progress * TOTAL_DURATION <= elapsed) return i
    }
    return STAGES.length - 1
  })()

  const visibleLines = (() => {
    const stageProgress = progress * TOTAL_DURATION
    let elapsed = 0
    const all: Array<Stage['lines'][0] & { stageIdx: number }> = []
    for (let i = 0; i <= stageIndex; i++) {
      const s = STAGES[i]
      const prevElapsed = elapsed
      elapsed += s.duration
      const withinStage = Math.min(1, (stageProgress - prevElapsed) / s.duration)
      const lineCount = i < stageIndex
        ? s.lines.length
        : Math.ceil(withinStage * s.lines.length)
      s.lines.slice(0, lineCount).forEach((l) => all.push({ ...l, stageIdx: i }))
    }
    return all
  })()

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000 + baseRef.current
      const p = Math.min(elapsed / TOTAL_DURATION, 1)
      setProgress(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPlaying(false)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [playing])

  const handlePlayPause = () => {
    if (progress >= 1) {
      baseRef.current = 0
      startRef.current = null
      setProgress(0)
      setPlaying(true)
    } else {
      if (playing) {
        baseRef.current = progress * TOTAL_DURATION
        startRef.current = null
        setPlaying(false)
      } else {
        startRef.current = null
        setPlaying(true)
      }
    }
  }

  const scrubTo = (clientX: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    baseRef.current = p * TOTAL_DURATION
    startRef.current = null
    setProgress(p)
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (draggingRef.current) scrubTo(e.clientX) }
    const onUp = () => { draggingRef.current = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, []) // scrubTo only closes over refs and stable setState

  return (
    <Box className="page-flow" component="main">
      <Container size="xl">
        <SectionHeader
          label="04 / Flow"
          title="How it works."
          subtitle="one prompt, six layers"
        />

        <Box className="scrubber">
          <Box className="scrub-bar">
            <Box className="lights">
              <span /><span /><span />
            </Box>
            <Text>basidiocarp pipeline · interactive trace</Text>
          </Box>

          <Box className="scrub-body">
            <Box className="scrub-term">
              {visibleLines.map((line, i) => (
                <Box className="scrub-row" key={`${line.stageIdx}-${i}`}>
                  {line.kind === 'prompt' ? (
                    <><span className="pr">›</span><span>{line.text}</span></>
                  ) : (
                    <><span className="pad">  </span><span className={line.kind}>{line.text}</span></>
                  )}
                </Box>
              ))}
            </Box>

            <Box className="scrub-side">
              <Text component="h4">stages</Text>
              {STAGES.map((stage, i) => (
                <Box
                  className={`scrub-step${i === stageIndex ? ' is-current' : ''}`}
                  key={stage.label}
                >
                  <Text className="label" component="span">
                    {String(i + 1).padStart(2, '0')} {stage.label}
                  </Text>
                  {i === stageIndex && stage.detail}
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="scrub-controls">
            <ActionIcon
              aria-label={progress >= 1 ? 'Restart' : playing ? 'Pause' : 'Play'}
              onClick={handlePlayPause}
              size="lg"
            >
              {playing ? '⏸' : '▶'}
            </ActionIcon>
            <Box
              className="scrub-track"
              onMouseDown={(e) => { draggingRef.current = true; scrubTo(e.clientX) }}
              ref={trackRef}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <Box className="scrub-fill" style={{ transform: `scaleX(${progress})` }} />
            </Box>
            <Text className="scrub-time" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
              {(progress * TOTAL_DURATION).toFixed(1)}s / {TOTAL_DURATION.toFixed(1)}s
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
