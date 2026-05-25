import { Box, Text } from '@mantine/core'

import styles from './HeroDiagram.module.css'

const annotations = [
  { key: 'cap',      label: 'cap',      latin: 'visus operandi',   text: 'operator dashboard', x: '76%', y: '20%' },
  { key: 'hymenium', label: 'hymenium', latin: 'lamina fertilis',  text: 'workflow gate',       x: '76%', y: '43%' },
  { key: 'annulus',  label: 'annulus',  latin: 'anulus operandi',  text: 'operator utilities',  x: '76%', y: '60%' },
  { key: 'stipe',    label: 'stipe',    latin: 'stipes fund.',      text: 'installer and repair', x: '76%', y: '77%' },
  { key: 'mycelium', label: 'mycelium', latin: 'myceliumii',        text: 'token proxy',         x: '0%', y: '90%', align: 'right' },
  { key: 'spore',    label: 'spore',    latin: 'particula vagans',  text: 'shared primitives',   x: '0%', y: '46%', align: 'right' },
  { key: 'volva',    label: 'volva',    latin: 'velamen primum',    text: 'execution host',      x: '0%', y: '18%', align: 'right' },
]

/* Leader line endpoints for each annotation part (SVG coordinate space 400×420) */
const leaders: Record<string, { x1: number; y1: number; x2: number; y2: number; dot: { cx: number; cy: number } }> = {
  cap:      { x1: 328, y1: 148, x2: 358, y2: 94,  dot: { cx: 358, cy: 94  } },
  hymenium: { x1: 330, y1: 218, x2: 358, y2: 200, dot: { cx: 358, cy: 200 } },
  annulus:  { x1: 228, y1: 252, x2: 358, y2: 262, dot: { cx: 358, cy: 262 } },
  stipe:    { x1: 222, y1: 300, x2: 358, y2: 330, dot: { cx: 358, cy: 330 } },
  mycelium: { x1: 170, y1: 390, x2: 44,  y2: 400, dot: { cx: 44,  cy: 400 } },
  spore:    { x1: 80,  y1: 220, x2: 44,  y2: 210, dot: { cx: 44,  cy: 210 } },
  volva:    { x1: 100, y1: 170, x2: 44,  y2: 90,  dot: { cx: 44,  cy: 90  } },
}

export function HeroDiagram() {
  return (
    <Box aria-label="Mushroom anatomy diagram mapped to ecosystem tools" className={styles['hero-diagram']}>
      <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 420">
        <defs>
          <radialGradient cx="50%" cy="60%" id="hd-cap" r="60%">
            <stop offset="0%" stopColor="#ff8a4a" />
            <stop offset="60%" stopColor="#e94e1b" />
            <stop offset="100%" stopColor="#7a2308" />
          </radialGradient>
          <linearGradient id="hd-stipe" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4ead8" />
            <stop offset="100%" stopColor="#a86a2c" />
          </linearGradient>
          <radialGradient cx="50%" cy="50%" id="hd-glow" r="50%">
            <stop offset="0%" stopColor="rgba(242,169,59,0.45)" />
            <stop offset="100%" stopColor="rgba(242,169,59,0)" />
          </radialGradient>
          <pattern height="6" id="hd-gills" patternUnits="userSpaceOnUse" width="6">
            <path d="M0 3 L6 3" stroke="#33231a" strokeWidth="0.6" />
          </pattern>
        </defs>

        <ellipse cx="200" cy="180" fill="url(#hd-glow)" rx="180" ry="180" />

        <g data-part="spore" id="hd-spores" opacity="0.6">
          <circle cx="80" cy="220" fill="#f2a93b" r="1.5" />
          <circle cx="320" cy="200" fill="#f2a93b" r="1.2" />
          <circle cx="100" cy="280" fill="#f2a93b" r="1" />
          <circle cx="310" cy="260" fill="#f2a93b" r="1.5" />
          <circle cx="60" cy="180" fill="#f2a93b" r="1" />
          <circle cx="340" cy="160" fill="#f2a93b" r="1" />
        </g>

        <path d="M20 360 Q200 380 380 360" fill="none" stroke="#3b1f0f" strokeWidth="1" />
        <path d="M20 366 Q200 386 380 366" fill="none" stroke="#5b3a20" strokeDasharray="2 4" strokeWidth="0.5" />

        <g data-part="mycelium" fill="none" id="hd-roots" opacity="0.55" stroke="#f2a93b" strokeWidth="0.8">
          <path d="M200 360 Q190 380 170 395 Q150 408 130 415" />
          <path d="M200 360 Q210 382 230 396 Q252 408 270 412" />
          <path d="M200 360 Q200 385 198 400" />
          <path d="M180 365 Q165 385 150 400" />
          <path d="M220 365 Q235 385 250 400" />
          <path d="M170 395 Q160 405 145 410" />
          <path d="M230 396 Q240 408 255 414" />
        </g>

        <path
          d="M178 360 L178 230 Q178 222 184 220 L216 220 Q222 222 222 230 L222 360 Z"
          data-part="stipe"
          fill="url(#hd-stipe)"
          stroke="#3b1f0f"
          strokeWidth="1"
        />
        <g data-part="annulus">
          <ellipse cx="200" cy="252" fill="#c9a878" rx="28" ry="5" stroke="#3b1f0f" strokeWidth="0.8" />
          <path d="M174 252 Q200 260 226 252" fill="none" stroke="#3b1f0f" strokeWidth="0.6" />
        </g>
        <g data-part="hymenium">
          <ellipse cx="200" cy="218" fill="url(#hd-gills)" rx="92" ry="14" />
          <ellipse cx="200" cy="218" fill="none" rx="92" ry="14" stroke="#3b1f0f" strokeWidth="1" />
        </g>
        <path
          d="M200 80 C 120 80 70 140 70 200 C 70 215 80 220 95 220 L305 220 C320 220 330 215 330 200 C330 140 280 80 200 80 Z"
          data-part="cap"
          fill="url(#hd-cap)"
          stroke="#3b1f0f"
          strokeWidth="1.2"
        />
        <g data-part="volva">
          <ellipse cx="140" cy="160" fill="#fffdf8" opacity="0.85" rx="10" ry="6" />
          <ellipse cx="240" cy="135" fill="#fffdf8" opacity="0.75" rx="7" ry="4" />
          <ellipse cx="260" cy="180" fill="#fffdf8" opacity="0.7" rx="6" ry="4" />
          <ellipse cx="180" cy="120" fill="#fffdf8" opacity="0.7" rx="5" ry="3" />
          <ellipse cx="100" cy="195" fill="#fffdf8" opacity="0.6" rx="6" ry="3" />
        </g>
        <path d="M120 130 Q180 95 240 100" fill="none" stroke="rgba(255,200,140,0.5)" strokeLinecap="round" strokeWidth="2" />

        {/* Leader lines — one per annotation */}
        {Object.entries(leaders).map(([part, l]) => (
          <g className={styles['hd-leader']} data-part={part} key={part}>
            <path
              className={styles['hd-leader__line']}
              d={`M${l.x1} ${l.y1} L${l.x2} ${l.y2}`}
              fill="none"
              stroke="rgba(242,169,59,0.35)"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <circle
              className={styles['hd-leader__dot']}
              cx={l.dot.cx}
              cy={l.dot.cy}
              fill="rgba(242,169,59,0.6)"
              r="2.5"
            />
          </g>
        ))}
      </svg>

      {annotations.map((annotation) => (
        <Text
          className={styles['hero-diagram__anno']}
          data-part={annotation.key}
          key={annotation.key}
          style={{ left: annotation.x, textAlign: annotation.align === 'right' ? 'right' : 'left', top: annotation.y }}
        >
          <Text component="b">{annotation.label}</Text>
          <Text component="span">{annotation.latin}</Text>
          {annotation.text}
        </Text>
      ))}
    </Box>
  )
}
