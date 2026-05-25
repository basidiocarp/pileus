import { Fragment, useMemo, useRef, useState } from 'react'
import { Box, Container, List, Text, Title } from '@mantine/core'

import { SectionHeader } from '../components/SectionHeader'
import { useStamp } from '../hooks/useStamp'
import shared from '../styles/shared.module.css'
import styles from './CrosswordPage.module.css'

// Grid key:
//   Across  1: CANOPY    row 0  cols 5-10
//           2: MYCELIUM  row 4  cols 0-7
//           3: ANNULUS   row 5  cols 4-10
//   Down    4: HYPHAE    col 1  rows 3-8
//           5: CORTINA   col 5  rows 0-6
//           6: LAMELLA   col 4  rows 4-10
//
// Intersections verified:
//   (r0,c5)  CANOPY[0]=C   = CORTINA[0]=C  ✓
//   (r3,c1)  HYPHAE[0]=H                   (start)
//   (r4,c1)  MYCELIUM[1]=Y = HYPHAE[1]=Y   ✓
//   (r4,c4)  MYCELIUM[4]=L = LAMELLA[0]=L  ✓
//   (r4,c5)  MYCELIUM[5]=I = CORTINA[4]=I  ✓
//   (r5,c4)  ANNULUS[0]=A  = LAMELLA[1]=A  ✓
//   (r5,c5)  ANNULUS[1]=N  = CORTINA[5]=N  ✓

const GRID = [
  '#####CANOPY',
  '#####O#####',
  '#####R#####',
  '#H###T#####',
  'MYCELIUM###',
  '#P##ANNULUS',
  '#H##MA#####',
  '#A##E######',
  '#E##L######',
  '####L######',
  '####A######',
]

// Cell coordinates that start a numbered word
const CLUE_NUMBERS: Record<string, number> = {
  '0,5': 1,
  '3,1': 4,
  '4,0': 2,
  '4,4': 6,
  '5,4': 3,
}

const CLUES_ACROSS = [
  { n: 1, text: 'Multi-agent coordination runtime (6)', hint: 'c_____' },
  { n: 2, text: 'Token-optimizing output proxy (8)', hint: 'm_______' },
  { n: 3, text: 'The ring around the stipe (7)', hint: 'a______' },
]

const CLUES_DOWN = [
  { n: 4, text: 'Persistent memory filament (6)', hint: 'h_____' },
  { n: 5, text: 'Lifecycle signal runner (7)', hint: 'c______' },
  { n: 6, text: 'Gill-like spore-bearing surface (7)', hint: 'l______' },
]

export function CrosswordPage() {
  useStamp('crossword')
  const [cells, setCells] = useState<Record<string, string>>({})
  const boardRef = useRef<HTMLDivElement>(null)

  const handleInput = (r: number, c: number, value: string) => {
    setCells((prev) => ({ ...prev, [`${r},${c}`]: value.toUpperCase().slice(-1) }))

    if (value && boardRef.current) {
      const inputs = Array.from(boardRef.current.querySelectorAll<HTMLInputElement>('input'))
      const idx = inputs.findIndex((el) => el.dataset.cell === `${r},${c}`)
      if (idx !== -1 && idx < inputs.length - 1) {
        const next = inputs[idx + 1]
        const [nextR] = (next.dataset.cell ?? '').split(',').map(Number)
        // Only advance within the same row to avoid jumping across disconnected words
        if (nextR === r) next.focus()
      }
    }
  }

  const isSolved = useMemo(() =>
    GRID.every((row, r) =>
      [...row].every((ch, c) => ch === '#' || cells[`${r},${c}`] === ch)
    ), [cells])

  return (
    <Box className={shared.page} component="main">
      <Container size="xl">
        <SectionHeader
          label="easter egg · acrosticum fungorum"
          title="Verba retia."
          subtitle="A small crossword, all answers latin or fungal. Solve for the joy of it."
        />

        <Box className={styles['xw-grid']}>
          <Box className={styles['xw-board']} ref={boardRef}>
            {GRID.map((row, r) => (
              <Fragment key={r}>
                {[...row].map((ch, c) => {
                  const clueNum = CLUE_NUMBERS[`${r},${c}`]
                  return (
                    <Box
                      className={`${styles['xw-cell']}${ch === '#' ? ` ${styles['xw-cell--block']}` : ''}`}
                      key={`${r}-${c}`}
                    >
                      {clueNum && <span className={styles['xw-num']}>{clueNum}</span>}
                      {ch !== '#' && (
                        <input
                          aria-label={`row ${r + 1}, column ${c + 1}`}
                          data-cell={`${r},${c}`}
                          maxLength={1}
                          onChange={(e) => handleInput(r, c, e.target.value)}
                          value={cells[`${r},${c}`] ?? ''}
                        />
                      )}
                    </Box>
                  )
                })}
              </Fragment>
            ))}
          </Box>

          <Box className={styles['xw-clues']}>
            <Title order={3}>Across</Title>
            <List mt="xs" spacing="xs" type="ordered">
              {CLUES_ACROSS.map((clue) => (
                <List.Item key={clue.n}>
                  {clue.text} — <em>{clue.hint}</em>
                </List.Item>
              ))}
            </List>
            <Title order={3} mt="md">Down</Title>
            <List mt="xs" spacing="xs" start={4} type="ordered">
              {CLUES_DOWN.map((clue) => (
                <List.Item key={clue.n}>
                  {clue.text} — <em>{clue.hint}</em>
                </List.Item>
              ))}
            </List>
          </Box>
        </Box>

        {isSolved && (
          <Box className={styles['xw-solved']}>
            <Text className={styles['xw-solved__glyph']}>◉</Text>
            <Text className={styles['xw-solved__label']}>Solved. <em>Bene factum.</em></Text>
          </Box>
        )}
      </Container>
    </Box>
  )
}
