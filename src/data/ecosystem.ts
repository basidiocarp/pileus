export type EcosystemLayerKey =
  | 'coordination'
  | 'infrastructure'
  | 'memory'
  | 'runtime'
  | 'surface'

export type EcosystemToolKey =
  | 'annulus'
  | 'canopy'
  | 'cap'
  | 'cortina'
  | 'hyphae'
  | 'hymenium'
  | 'lamella'
  | 'mycelium'
  | 'rhizome'
  | 'spore'
  | 'stipe'
  | 'volva'

export type EcosystemTool = {
  blurb: string
  color: string
  install: string
  key: EcosystemToolKey
  latin: string
  layer: EcosystemLayerKey
  name: string
  repo: string
  role: string
  tagline: string
  tier: 'headline' | 'support'
}

export type EcosystemLayer = {
  key: EcosystemLayerKey
  latin: string
  note: string
  title: string
}

export const tools: EcosystemTool[] = [
  {
    key: 'mycelium',
    name: 'Mycelium',
    latin: 'Basidiocarp myceliumii',
    role: 'Token-optimized CLI proxy',
    color: 'var(--mantine-color-mycelium-5)',
    layer: 'runtime',
    tier: 'headline',
    tagline: 'The hidden network underground.',
    blurb:
      'Filters and compresses command output before it reaches your model. Sits between the agent and the shell, swapping noise for signal.',
    repo: 'github.com/basidiocarp/mycelium',
    install: 'stipe install mycelium',
  },
  {
    key: 'hyphae',
    name: 'Hyphae',
    latin: 'Memoria persistens',
    role: 'Persistent memory and RAG',
    color: 'var(--mantine-color-substrate-5)',
    layer: 'memory',
    tier: 'headline',
    tagline: 'Branching filaments that carry memory.',
    blurb:
      'Two memory models doing different jobs: memories with decay for the day-to-day, memoirs as a durable concept graph.',
    repo: 'github.com/basidiocarp/hyphae',
    install: 'stipe install hyphae',
  },
  {
    key: 'rhizome',
    name: 'Rhizome',
    latin: 'Symbolium tractus',
    role: 'Code intelligence MCP',
    color: 'var(--mantine-color-spore-4)',
    layer: 'runtime',
    tier: 'headline',
    tagline: 'Root-like pathways through your code.',
    blurb:
      'Symbol-aware navigation, structure, and refactor surfaces for any MCP client. Tree-sitter keeps structure fast and local.',
    repo: 'github.com/basidiocarp/rhizome',
    install: 'stipe install rhizome',
  },
  {
    key: 'cap',
    name: 'Cap',
    latin: 'Visus operandi',
    role: 'Operator dashboard',
    color: 'var(--mantine-color-lichen-4)',
    layer: 'surface',
    tier: 'headline',
    tagline: 'The visible top of the organism.',
    blurb:
      'One interface for memory, token analytics, code intelligence, runtime health, and coordination evidence.',
    repo: 'github.com/basidiocarp/cap',
    install: 'stipe install cap',
  },
  {
    key: 'canopy',
    name: 'Canopy',
    latin: 'Coordinatio multiplex',
    role: 'Multi-agent coordination',
    color: 'var(--mantine-color-mycelium-3)',
    layer: 'coordination',
    tier: 'headline',
    tagline: 'The layer that organizes what sits beneath.',
    blurb:
      'A local-first ledger for task ownership, handoffs, evidence, and Council threads across parallel agent work.',
    repo: 'github.com/basidiocarp/canopy',
    install: 'stipe install canopy',
  },
  {
    key: 'cortina',
    name: 'Cortina',
    latin: 'Velum signorum',
    role: 'Lifecycle signal capture',
    color: 'var(--mantine-color-fruiting-5)',
    layer: 'memory',
    tier: 'support',
    tagline: 'A veil between cap and stipe.',
    blurb:
      'Reads host hook envelopes, normalizes them, detects outcomes worth keeping, and forwards narrow downstream writes.',
    repo: 'github.com/basidiocarp/cortina',
    install: 'stipe install cortina',
  },
  {
    key: 'hymenium',
    name: 'Hymenium',
    latin: 'Lamina fertilis',
    role: 'Workflow orchestration',
    color: 'var(--mantine-color-gill-4)',
    layer: 'coordination',
    tier: 'support',
    tagline: 'The fertile spore-bearing surface.',
    blurb:
      'Automates implementer and auditor patterns, phase gates, retries, and handoff decomposition.',
    repo: 'github.com/basidiocarp/hymenium',
    install: 'stipe install hymenium',
  },
  {
    key: 'annulus',
    name: 'Annulus',
    latin: 'Anulus operandi',
    role: 'Operator utilities',
    color: 'var(--mantine-color-chitin-3)',
    layer: 'surface',
    tier: 'support',
    tagline: 'A small structural ring.',
    blurb:
      'Read-only utilities that span statusline, hook validation, and ecosystem availability checks.',
    repo: 'github.com/basidiocarp/annulus',
    install: 'stipe install annulus',
  },
  {
    key: 'volva',
    name: 'Volva',
    latin: 'Velamen primum',
    role: 'Execution-host runtime',
    color: 'var(--mantine-color-decay-4)',
    layer: 'runtime',
    tier: 'support',
    tagline: 'The protective wrapper around a young fruiting body.',
    blurb:
      'Owns backend selection, context shaping, runtime policy, and host signal routing.',
    repo: 'github.com/basidiocarp/volva',
    install: 'stipe install volva',
  },
  {
    key: 'spore',
    name: 'Spore',
    latin: 'Particula vagans',
    role: 'Shared primitives',
    color: 'var(--mantine-color-spore-3)',
    layer: 'infrastructure',
    tier: 'support',
    tagline: 'Lightweight carriers of information.',
    blurb:
      'Reusable transport, discovery, and config-writing pieces that higher-level tools build on.',
    repo: 'github.com/basidiocarp/spore',
    install: '(library)',
  },
  {
    key: 'lamella',
    name: 'Lamella',
    latin: 'Lamella distributiva',
    role: 'Skills and plugin packaging',
    color: 'var(--mantine-color-hymenium-5)',
    layer: 'infrastructure',
    tier: 'support',
    tagline: 'The gills that organize spore release.',
    blurb:
      'Builds plugin marketplaces and exports the same skill inventory into installable Codex artifacts.',
    repo: 'github.com/basidiocarp/lamella',
    install: 'stipe install lamella',
  },
  {
    key: 'stipe',
    name: 'Stipe',
    latin: 'Stipes fundamentum',
    role: 'Installer and manager',
    color: 'var(--mantine-color-brandStipe-6)',
    layer: 'infrastructure',
    tier: 'support',
    tagline: 'The supporting stalk that holds it all up.',
    blurb:
      'Downloads binaries, registers MCP servers with hosts, installs hook adapters, and runs ecosystem health checks.',
    repo: 'github.com/basidiocarp/stipe',
    install: 'curl -fsSL https://stipe.sh/install.sh | sh',
  },
]

export const layers: EcosystemLayer[] = [
  { key: 'surface', title: 'Surface', latin: 'stratum operatoris', note: 'What the operator sees' },
  { key: 'coordination', title: 'Coordination', latin: 'stratum dirigens', note: 'Workflow and ledger' },
  { key: 'memory', title: 'Memory and signal', latin: 'stratum memoriae', note: 'What survives the session' },
  { key: 'runtime', title: 'Runtime', latin: 'stratum executionis', note: 'Backend, code, command shaping' },
  { key: 'infrastructure', title: 'Infrastructure', latin: 'stratum subterraneum', note: 'Plumbing and packaging' },
]

export const edges: Array<[EcosystemToolKey, EcosystemToolKey]> = [
  ['volva', 'mycelium'],
  ['volva', 'hyphae'],
  ['volva', 'cortina'],
  ['volva', 'spore'],
  ['mycelium', 'hyphae'],
  ['mycelium', 'rhizome'],
  ['mycelium', 'spore'],
  ['rhizome', 'spore'],
  ['rhizome', 'cap'],
  ['hyphae', 'cortina'],
  ['hyphae', 'cap'],
  ['hyphae', 'spore'],
  ['cortina', 'canopy'],
  ['cortina', 'spore'],
  ['cap', 'mycelium'],
  ['cap', 'stipe'],
  ['cap', 'canopy'],
  ['canopy', 'hyphae'],
  ['canopy', 'cortina'],
  ['hymenium', 'canopy'],
  ['hymenium', 'cortina'],
  ['hymenium', 'volva'],
  ['annulus', 'mycelium'],
  ['annulus', 'hyphae'],
  ['annulus', 'canopy'],
  ['annulus', 'volva'],
  ['lamella', 'stipe'],
  ['lamella', 'cortina'],
  ['stipe', 'spore'],
  ['stipe', 'mycelium'],
  ['stipe', 'hyphae'],
  ['stipe', 'rhizome'],
  ['stipe', 'cortina'],
]

export const featuredTools = tools.filter((tool) => tool.tier === 'headline')
