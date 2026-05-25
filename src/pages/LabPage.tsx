import { Box, Button, Container, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useReadStamps, useStamp } from '../hooks/useStamp'
import shared from '../styles/shared.module.css'
import styles from './LabPage.module.css'

const ENTRIES = [
  {
    day: 'Day 03 · damp · hardwood substrate',
    text: (
      <>
        First contact with <em>Mycelium</em>. The proxy compresses my output by 87% and I have not
        yet missed a thing. There is a kind of silence that means <em>working</em>.
      </>
    ),
  },
  {
    day: 'Day 11 · contemplative',
    text: (
      <>
        <em>Hyphae</em> remembers what I forgot. I asked it about a function I wrote in March and
        it returned three memoirs, two memories, and a note I do not recall writing. The note was
        correct.
      </>
    ),
  },
  {
    day: 'Day 19 · cool, after rain',
    text: (
      <>
        <em>Cortina</em> only emits what is worth keeping. I once worried it would miss the small
        moments. It does not.
      </>
    ),
  },
  {
    day: 'Day 26 · fruiting',
    text: (
      <>
        The thirteenth tool is not a rumour. It is real, but it cannot be installed. It only
        watches. I have called it <em>Septa</em> in my notes — the internal walls between hyphae.
        It does no work. It only observes which walls are intact.
      </>
    ),
  },
  {
    day: 'Day 41 · sporing',
    text: (
      <>
        <em>Cap</em> shows me the whole ecosystem at once. I find I prefer to watch it the way one
        watches a weather map.
      </>
    ),
  },
  {
    day: 'Day 47 · spreading',
    text: (
      <>
        <em>Canopy</em> has not stopped coordinating since I left it running. Beautiful.
      </>
    ),
  },
  {
    day: 'Day 60 · saprophytic',
    text: (
      <>
        All twelve tools running in concert for the first time. The output reads less like a
        transcript and more like the breathing of a single organism. I have begun referring to the
        agent in the third person, fondly.
      </>
    ),
  },
]

function LabContent() {
  useStamp('lab')

  return (
    <Box className={shared.page} component="main">
      <Container size="md">
        <Text className={shared.eyebrow} mb="xl"><span className={shared.dot}>●</span> lab notebook · vol. III · unlocked</Text>
        <Box className={styles.notebook}>
          <Text className={styles['notebook__hd']}>FIELD NOTEBOOK · M. STAMETS · ENTRY VOL. III</Text>
          <Title className={styles['notebook__title']} order={1}>On the persistence of the colony</Title>
          <Text className={styles['notebook__sub']}>— a private log, kept beneath the cap</Text>

          {ENTRIES.map((entry, i) => (
            <Box className={styles['notebook__entry']} key={i}>
              <Text className={styles['notebook__day']} component="span">{entry.day}</Text>
              {entry.text}
            </Box>
          ))}

          <Box className={styles['notebook__seal']}>EX OBS<br />S/N 09</Box>
        </Box>
      </Container>
    </Box>
  )
}

export function LabPage() {
  const stamps = useReadStamps()
  const unlocked = Object.keys(stamps).filter((k) => k !== 'lab').length >= 7

  if (!unlocked) {
    return (
      <Box className={shared.page} component="main">
        <Container size="xl">
          <Box className={styles['lab-gate']}>
            <Text className={shared.eyebrow}><span className={shared.dot}>●</span> lab notebook · locus secretus</Text>
            <Title className={styles['lab-gate__title']} order={2}>The lab notebook is sealed.</Title>
            <Text className={shared.latin}>Collect at least 7 specimen stamps to unlock this page.</Text>
            <Text className={styles['lab-gate__hint']}>
              Visit each page in the site. Your stamps appear in the drawer at the top-right.
            </Text>
            <Button component={Link} mt="xl" to="/" variant="outline">← back to the surface</Button>
          </Box>
        </Container>
      </Box>
    )
  }

  return <LabContent />
}
