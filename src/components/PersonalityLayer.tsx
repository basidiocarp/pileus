import { useEffect, useMemo, useRef, useState } from 'react'
import { ActionIcon, Box, Group, Text } from '@mantine/core'

import { createPuff, drawSpores, getMoonPhase, getSeason, moods, seededIndex, substrates } from './personalityEffects'
import styles from './PersonalityLayer.module.css'

export function PersonalityLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [sporeCount, setSporeCount] = useState(() => Number.parseInt(sessionStorage.getItem('bc-spore-count') || '0', 10))
  const condition = useMemo(() => {
    const seed = new Date().toDateString()
    return {
      humidity: 60 + seededIndex(seed, 11, 35),
      mood: moods[seededIndex(seed, 23, moods.length)],
      substrate: substrates[seededIndex(seed, 37, substrates.length)],
    }
  }, [])

  const moon = useMemo(() => getMoonPhase(), [])
  const season = useMemo(() => getSeason(), [])
  const [moonSymbol, ...moonLabelParts] = moon.split(' ')

  useEffect(() => {
    document.documentElement.classList.add('colonizing', season.className)
    const first = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => document.documentElement.classList.add('colonized'))
    })

    return () => {
      window.cancelAnimationFrame(first)
      document.documentElement.classList.remove('colonizing', 'colonized', season.className, 'sporing')
    }
  }, [season.className])

  useEffect(() => {
    if (!canvasRef.current) return undefined
    return drawSpores(canvasRef.current)
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    const interval = window.setInterval(() => {
      if (document.hidden) return
      setSporeCount((count) => {
        const next = count + 1
        sessionStorage.setItem('bc-spore-count', String(next))
        return next
      })
    }, 3500)

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY)
      if (delta > 20) {
        setSporeCount((count) => {
          const next = count + Math.max(1, Math.floor(delta / 20))
          sessionStorage.setItem('bc-spore-count', String(next))
          return next
        })
        lastY = window.scrollY
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return undefined
    let last: { x: number; y: number } | null = null
    let lastTime = 0

    const onMouseMove = (event: MouseEvent) => {
      const now = performance.now()
      if (now - lastTime < 30) return
      lastTime = now

      if (last) {
        const dx = event.clientX - last.x
        const dy = event.clientY - last.y
        const length = Math.hypot(dx, dy)
        if (length >= 4 && length <= 60) {
          const segment = document.createElement('span')
          segment.className = styles['myc-trail']
          segment.style.left = `${last.x}px`
          segment.style.top = `${last.y}px`
          segment.style.width = `${length}px`
          segment.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`
          document.body.appendChild(segment)
          window.setTimeout(() => segment.remove(), 1200)
        }
      }

      last = { x: event.clientX, y: event.clientY }
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  const sporePage = () => {
    document.documentElement.classList.add('sporing')
    createPuff(window.innerWidth / 2, window.innerHeight / 2, 140, styles['puff-spore'])
    window.setTimeout(() => document.documentElement.classList.remove('sporing'), 1700)
  }

  return (
    <>
      <Box aria-hidden className={styles['ambient-flares']} />
      <Box aria-hidden className={styles['spore-field']}>
        <canvas ref={canvasRef} />
      </Box>
      <Group className={styles['weather-readout']} gap={8}>
        <Box className={styles['weather-readout__dot']} />
        <Text component="span">
          <b>{condition.humidity}%</b> RH
        </Text>
        <Text className={styles.sep} component="span">
          ·
        </Text>
        <Text component="span">{condition.substrate}</Text>
        <Text className={styles.sep} component="span">
          ·
        </Text>
        <Text className={styles.mood} component="span">
          {condition.mood}
        </Text>
        <Text className={styles.sep} component="span">
          ·
        </Text>
        <Text className={styles['season-label']} component="span">
          {season.label} · {season.latin}
        </Text>
      </Group>
      <Group className={styles['spore-counter']} gap={8}>
        <Text className={styles['spore-counter__lbl']} component="span">
          spores observed
        </Text>
        <Text className={styles['spore-counter__n']} component="span">
          {sporeCount.toLocaleString()}
        </Text>
      </Group>
      <Group className={styles['moon-glyph']} gap={6}>
        <Text className={styles['moon-glyph__sym']} component="span">
          {moonSymbol}
        </Text>
        <Text className={styles['moon-glyph__lbl']} component="span">
          {moonLabelParts.join(' ')}
        </Text>
      </Group>
      <ActionIcon aria-label="Spore the page" className={styles['spore-btn']} onClick={sporePage} radius="xl" variant="outline">
        <svg aria-hidden fill="currentColor" height="14" viewBox="0 0 24 24" width="14">
          <circle cx="12" cy="12" r="2.4" />
          <circle cx="5" cy="6" r="1.4" />
          <circle cx="19" cy="7" r="1.6" />
          <circle cx="6" cy="18" r="1.2" />
          <circle cx="20" cy="17" r="1.4" />
          <circle cx="12" cy="3" r="1" />
          <circle cx="3" cy="12" r="1" />
          <circle cx="21" cy="12" r="1" />
          <circle cx="12" cy="21" r="1" />
        </svg>
      </ActionIcon>
    </>
  )
}
