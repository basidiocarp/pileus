import { useState } from 'react'
import {
  Anchor,
  Box,
  CloseButton,
  Container,
  NavLink as MantineNavLink,
  Tabs,
  Text,
} from '@mantine/core'

import { SectionHeader } from '../components/SectionHeader'
import { TerminalFrame } from '../components/TerminalFrame'
import { useStamp } from '../hooks/useStamp'
import shared from '../styles/shared.module.css'
import { DOCS } from './notesContent'
import styles from './NotesPage.module.css'

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

  const closeTab = (key: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (openTabs.length === 1) return
    const next = openTabs.filter((k) => k !== key)
    setOpenTabs(next)
    if (activeDoc === key) setActiveDoc(next[next.length - 1])
  }

  return (
    <Box className={shared.page} component="main">
      <Container size="xl">
        <SectionHeader
          label="03 / Notes"
          title="Notes from the repos."
          subtitle="architecture · decisions · field observations"
        />

        <TerminalFrame
          bodyClassName={styles['editor-body']}
          className={styles['editor-shell']}
          rightSection={(
            <Anchor className={styles['branch-link']} href={doc.repoUrl} rel="noopener noreferrer" target="_blank" underline="hover">
              main ↗
            </Anchor>
          )}
          title={(
            <Text className={styles.crumb}>
              basidiocarp <span className={styles.sep}>/</span> {doc.repo} <span className={styles.sep}>/</span>{' '}
              <span className={styles['crumb-current']}>{doc.name}</span>
            </Text>
          )}
        >
            <Box className={styles['file-tree']}>
              <Text className={styles['ft-section']}>repos</Text>
              {DOCS.map((d) => (
                <MantineNavLink
                  active={activeDoc === d.key}
                  className={styles['ft-row']}
                  color="brandSpore"
                  component="button"
                  key={d.key}
                  label={`${d.repo}/${d.name}`}
                  onClick={() => openDoc(d.key)}
                  rightSection={<Text className={styles.ln} component="span">{d.lines}L</Text>}
                  type="button"
                  variant="subtle"
                />
              ))}
            </Box>

            <Box className={styles['editor-content']}>
              <Tabs
                className={styles['editor-tabs']}
                keepMounted={false}
                onChange={(value) => { if (value) setActiveDoc(value) }}
                value={activeDoc}
              >
                <Tabs.List>
                  {openTabs.map((key) => {
                    const d = DOCS.find((x) => x.key === key)
                    if (!d) return null
                    return (
                      <Box className={styles['tab-wrap']} key={key}>
                        <Tabs.Tab pr={openTabs.length > 1 ? 32 : undefined} value={key}>
                          {d.repo}/{d.name}
                        </Tabs.Tab>
                        {openTabs.length > 1 && (
                          <CloseButton
                            aria-label={`Close ${d.repo}/${d.name}`}
                            className={styles['tab__close']}
                            onClick={(event) => closeTab(key, event)}
                            size="xs"
                            variant="transparent"
                          />
                        )}
                      </Box>
                    )
                  })}
                </Tabs.List>

                <Tabs.Panel className={styles.doc} value={doc.key}>
                  {doc.content}
                </Tabs.Panel>
              </Tabs>
            </Box>
        </TerminalFrame>
      </Container>
    </Box>
  )
}
