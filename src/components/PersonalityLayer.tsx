import { useEffect, useMemo, useRef, useState } from 'react'
import { ActionIcon, Box, Group, Text } from '@mantine/core'

const moods = ['contemplative', 'damp', 'fruiting', 'spreading', 'sporing', 'colonising', 'quiescent', 'mycorrhizal']
const substrates = ['hardwood', 'conifer needle', 'cellulose', 'leaf litter', 'mossy log', 'oak duff', 'fallen birch']

function getMoonPhase() {
  const phases = ['○ new', '◔ waxing crescent', '◑ first quarter', '◕ waxing gibbous', '● full', '◕ waning gibbous', '◐ last quarter', '◔ waning crescent']
  const ms = Date.now() - Date.parse('2000-01-06T18:14:00Z')
  const phase = ((ms / 86400000 / 29.530588) % 1 + 1) % 1
  return phases[Math.floor(phase * 8) % 8]
}

function getSeason() {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return { className: 'season-spring', label: 'spring', latin: 'ver primum' }
  if (month >= 5 && month <= 7) return { className: 'season-summer', label: 'summer', latin: 'aestas pluvia' }
  if (month >= 8 && month <= 10) return { className: 'season-autumn', label: 'autumn', latin: 'autumni fructus' }
  return { className: 'season-winter', label: 'winter', latin: 'hibernatio' }
}

function seededIndex(seed: string, salt: number, length: number) {
  let hash = salt
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }
  return hash % length
}

function createPuff(x: number, y: number, count: number) {
  for (let index = 0; index < count; index += 1) {
    const spore = document.createElement('span')
    const angle = Math.random() * Math.PI * 2
    const speed = 80 + Math.random() * 500

    spore.className = 'puff-spore'
    spore.style.left = `${x}px`
    spore.style.top = `${y}px`
    spore.style.setProperty('--dx', `${Math.cos(angle) * speed}px`)
    spore.style.setProperty('--dy', `${Math.sin(angle) * speed}px`)
    spore.style.setProperty('--dur', `${1.6 + Math.random() * 1.6}s`)
    spore.style.setProperty('--sz', `${2 + Math.random() * 5}px`)
    document.body.appendChild(spore)
    window.setTimeout(() => spore.remove(), 3500)
  }
}

function drawSpores(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return () => undefined
  const ctx = context

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let frame = 0
  let width = 0
  let height = 0
  let dpr = 1

  function resize() {
    dpr = window.devicePixelRatio || 1
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function spawn(initial: boolean) {
    return {
      a: 0.15 + Math.random() * 0.55,
      hue: Math.random() < 0.7 ? 'spore' : Math.random() < 0.5 ? 'moss' : 'cap',
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.06,
      vy: -(0.05 + Math.random() * 0.18),
      wob: Math.random() * 6.28,
      wobs: 0.005 + Math.random() * 0.01,
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
    }
  }

  resize()
  window.addEventListener('resize', resize)
  const particles = Array.from({ length: Math.min(72, Math.floor((width * height) / 18000)) }, () => spawn(true))

  function tick() {
    ctx.clearRect(0, 0, width, height)
    for (const particle of particles) {
      if (!reduced) {
        particle.wob += particle.wobs
        particle.x += particle.vx + Math.sin(particle.wob) * 0.25
        particle.y += particle.vy
        if (particle.y < -10 || particle.x < -10 || particle.x > width + 10) {
          Object.assign(particle, spawn(false))
        }
      }

      const color = particle.hue === 'spore' ? '242,169,59' : particle.hue === 'moss' ? '76,175,80' : '233,78,27'
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color},${particle.a})`
      ctx.fill()
      if (particle.r > 1.2) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${particle.a * 0.08})`
        ctx.fill()
      }
    }
    frame = window.requestAnimationFrame(tick)
  }

  tick()
  return () => {
    window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
  }
}

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
          segment.className = 'myc-trail'
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
    createPuff(window.innerWidth / 2, window.innerHeight / 2, 140)
    window.setTimeout(() => document.documentElement.classList.remove('sporing'), 1700)
  }

  return (
    <>
      <Box aria-hidden className="ambient-flares" />
      <Box aria-hidden className="spore-field">
        <canvas ref={canvasRef} />
      </Box>
      <Group className="weather-readout" gap={8}>
        <Box className="weather-readout__dot" />
        <Text component="span">
          <b>{condition.humidity}%</b> RH
        </Text>
        <Text className="sep" component="span">
          ·
        </Text>
        <Text component="span">{condition.substrate}</Text>
        <Text className="sep" component="span">
          ·
        </Text>
        <Text className="mood" component="span">
          {condition.mood}
        </Text>
        <Text className="sep" component="span">
          ·
        </Text>
        <Text className="season-label" component="span">
          {season.label} · {season.latin}
        </Text>
      </Group>
      <Group className="spore-counter" gap={8}>
        <Text className="spore-counter__lbl" component="span">
          spores observed
        </Text>
        <Text className="spore-counter__n" component="span">
          {sporeCount.toLocaleString()}
        </Text>
      </Group>
      <Group className="moon-glyph" gap={6}>
        <Text className="moon-glyph__sym" component="span">
          {moonSymbol}
        </Text>
        <Text className="moon-glyph__lbl" component="span">
          {moonLabelParts.join(' ')}
        </Text>
      </Group>
      <ActionIcon aria-label="Spore the page" className="spore-btn" onClick={sporePage} radius="xl" variant="outline">
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
