export const moods = ['contemplative', 'damp', 'fruiting', 'spreading', 'sporing', 'colonising', 'quiescent', 'mycorrhizal']
export const substrates = ['hardwood', 'conifer needle', 'cellulose', 'leaf litter', 'mossy log', 'oak duff', 'fallen birch']

export function getMoonPhase() {
  const phases = ['○ new', '◔ waxing crescent', '◑ first quarter', '◕ waxing gibbous', '● full', '◕ waning gibbous', '◐ last quarter', '◔ waning crescent']
  const ms = Date.now() - Date.parse('2000-01-06T18:14:00Z')
  const phase = ((ms / 86400000 / 29.530588) % 1 + 1) % 1
  return phases[Math.floor(phase * 8) % 8]
}

export function getSeason() {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return { className: 'season-spring', label: 'spring', latin: 'ver primum' }
  if (month >= 5 && month <= 7) return { className: 'season-summer', label: 'summer', latin: 'aestas pluvia' }
  if (month >= 8 && month <= 10) return { className: 'season-autumn', label: 'autumn', latin: 'autumni fructus' }
  return { className: 'season-winter', label: 'winter', latin: 'hibernatio' }
}

export function seededIndex(seed: string, salt: number, length: number) {
  let hash = salt
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }
  return hash % length
}

export function createPuff(x: number, y: number, count: number, className: string) {
  for (let index = 0; index < count; index += 1) {
    const spore = document.createElement('span')
    const angle = Math.random() * Math.PI * 2
    const speed = 80 + Math.random() * 500

    spore.className = className
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

export function drawSpores(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return () => undefined
  const ctx = context

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let frame = 0
  let width = 0
  let height = 0
  let dpr = 1
  let particles: ReturnType<typeof spawn>[] = []

  function resize() {
    dpr = window.devicePixelRatio || 1
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (reduced || document.hidden) {
      render(false)
    }
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
  particles = Array.from({ length: Math.min(72, Math.floor((width * height) / 18000)) }, () => spawn(true))

  function render(advance: boolean) {
    ctx.clearRect(0, 0, width, height)
    for (const particle of particles) {
      if (advance) {
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
  }

  function stop() {
    if (!frame) return
    window.cancelAnimationFrame(frame)
    frame = 0
  }

  function schedule() {
    if (reduced || document.hidden || frame) return
    frame = window.requestAnimationFrame(tick)
  }

  function tick() {
    frame = 0
    render(true)
    schedule()
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stop()
    } else if (reduced) {
      render(false)
    } else {
      schedule()
    }
  }

  render(false)
  schedule()
  document.addEventListener('visibilitychange', handleVisibilityChange)

  return () => {
    stop()
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}
