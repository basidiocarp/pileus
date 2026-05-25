import { useEffect, useState } from 'react'
import { Box, Card, Drawer, SimpleGrid, Text, ThemeIcon } from '@mantine/core'
import { Link } from 'react-router-dom'
import { readStamps, STAMP_EVENT } from '../hooks/useStamp'
import styles from './StampDrawer.module.css'

const SPECIMENS = [
  { key: 'home',      label: 'home',      latin: 'locus primordius' },
  { key: 'ecosystem', label: 'ecosystem', latin: 'mappa viventis' },
  { key: 'tools',     label: 'tools',     latin: 'instrumenta omnia' },
  { key: 'notes',     label: 'notes',     latin: 'notae internae' },
  { key: 'flow',      label: 'flow',      latin: 'cursus signorum' },
  { key: 'install',   label: 'install',   latin: 'stipes fundamentum' },
  { key: 'changelog', label: 'changelog', latin: 'historia mutationum' },
  { key: 'crossword', label: 'crossword', latin: 'tessera verborum' },
  { key: 'lab',       label: 'lab',       latin: 'locus secretus' },
]

type Props = {
  opened: boolean
  onClose: () => void
}

export function StampDrawer({ opened, onClose }: Props) {
  const [stamps, setStamps] = useState<Record<string, number>>(readStamps)

  useEffect(() => {
    const handler = () => setStamps(readStamps())
    window.addEventListener(STAMP_EVENT, handler)
    return () => window.removeEventListener(STAMP_EVENT, handler)
  }, [])

  const count = Object.keys(stamps).length
  const nonLabCount = Object.keys(stamps).filter((k) => k !== 'lab').length
  const remaining = Math.max(0, 7 - nonLabCount)

  return (
    <Drawer
      onClose={onClose}
      opened={opened}
      position="right"
      size="280px"
      title={
        <Box>
          <Text className={styles['stamp-drawer__eyebrow']}>specimen log</Text>
          <Text className={styles['stamp-drawer__count']}>{count} / {SPECIMENS.length} collected</Text>
        </Box>
      }
    >
      <SimpleGrid className={styles['stamp-grid']} cols={3} spacing={8}>
        {SPECIMENS.map((spec) => {
          const collected = !!stamps[spec.key]
          return (
            <Card
              className={`${styles['stamp-card']}${collected ? ` ${styles['stamp-card--collected']}` : ''}`}
              key={spec.key}
              padding="xs"
              radius="md"
            >
              <ThemeIcon className={styles['stamp-card__glyph']} radius="xl" size="sm" variant="transparent">
                {collected ? '◉' : '○'}
              </ThemeIcon>
              <Text className={styles['stamp-card__name']}>{spec.label}</Text>
              <Text className={styles['stamp-card__latin']}>{spec.latin}</Text>
            </Card>
          )
        })}
      </SimpleGrid>
      {nonLabCount >= 7 ? (
        <Box className={`${styles['stamp-drawer__hint']} ${styles['stamp-drawer__hint--unlocked']}`}>
          ✓ lab notebook unlocked —{' '}
          <Link onClick={onClose} to="/lab">open it →</Link>
        </Box>
      ) : (
        <Text className={styles['stamp-drawer__hint']}>
          collect {remaining} more to unlock the lab
        </Text>
      )}
    </Drawer>
  )
}
