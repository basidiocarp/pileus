import { Anchor, Box, Button, Card, Code, Container, Grid, Group, List, Stack, Text, Title } from '@mantine/core'

import { EcosystemGraph } from './EcosystemGraph'
import { HeroDiagram } from './HeroDiagram'
import { SectionHeader } from './SectionHeader'
import { ToolBadge } from './ToolBadge'
import { ToolCardSurface } from './ToolCardSurface'
import { featuredTools, layers, tools } from '../data/ecosystem'
import layerStyles from '../styles/ecosystemLayers.module.css'
import shared from '../styles/shared.module.css'
import styles from './MarketingPage.module.css'

export function MarketingPage() {
  return (
    <Box id="top">

      <Box className={styles.hero} component="header">
        <Container size="xl">
          <Grid align="flex-start" gap={{ base: 40, md: 64 }}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xl">
                <Group gap="sm">
                  <Box className={styles['hero__pulse']} />
                  <Text className={shared.eyebrow}>ecosystem / v0.7.2 / 12 tools shipping</Text>
                </Group>

                <Stack gap="lg">
                  <Title className={styles['hero__title']} order={1}>
                    The visible fruit of an <Text component="em">underground</Text>{' '}
                    <Text className={styles['hero__title-cap']} component="span">
                      network.
                    </Text>
                  </Title>
                  <Text className={styles['hero__lede']}>
                    Basidiocarp is a harness for AI coding agents: memory, code intelligence, token shaping,
                    coordination, and an operator dashboard that makes the stack legible.
                  </Text>
                </Stack>

                <Group className={styles['hero__meta']} gap="xl">
                  {[
                    ['tools', '12', 'repos'],
                    ['language', 'rust', '+ ts'],
                    ['license', 'MIT', ''],
                  ].map(([label, value, unit]) => (
                    <Stack gap={2} key={label}>
                      <Text component="dt">{label}</Text>
                      <Text component="dd">
                        {value}
                        {unit ? <Text component="span">{unit}</Text> : null}
                      </Text>
                    </Stack>
                  ))}
                </Group>

                <Group gap="sm">
                  <Button component="a" href="#why" variant="filled">
                    Why basidiocarp
                  </Button>
                  <Button component="a" color="brandSpore" href="#ecosystem" variant="outline">
                    See the ecosystem
                  </Button>
                </Group>

                <Group className={styles.quickline} gap="xs">
                  <Text>quick install</Text>
                  <Code>curl -fsSL https://stipe.sh/install.sh | sh</Code>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <HeroDiagram />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      <Box className={styles.manifesto} component="section">
        <Container size="xl">
          <Grid gap={{ base: 32, md: 80 }}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack className={styles['field-note']} gap="md">
                <Text className={shared.eyebrow}>Field note / 001</Text>
                <Text className={shared.latin}>
                  Basidiomycota are not the visible mushroom alone. They are mostly invisible, a network of
                  hyphae woven through wood and soil.
                </Text>
                <Grid gap="md">
                  {[
                    ['genus', 'tools for AI coding agents'],
                    ['habitat', 'your laptop, mostly'],
                    ['fruits', 'when an agent runs'],
                    ['spreads via', 'MCP, hooks, stdio'],
                  ].map(([term, description]) => (
                    <Grid.Col span={6} key={term}>
                      <Text className={styles['field-note__term']}>{term}</Text>
                      <Text className={styles['field-note__description']}>{description}</Text>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack className={styles['manifesto__copy']} gap="xl">
                <Text>
                  Most agent setups are chat plus a prompt. That works until the model forgets last week's bug,
                  test logs eat the context window, and parallel agents start overwriting each other's branches.
                </Text>
                <Text>
                  Basidiocarp treats the harness as plumbing. Memory lives in <Code>hyphae</Code>, code structure
                  lives in <Code>rhizome</Code>, shell output gets compressed by <Code>mycelium</Code>, and
                  coordination sits in <Code>canopy</Code>.
                </Text>
                <Text>
                  Each tool stays narrow. Boundaries are explicit, source-controlled, and surfaced through the
                  operator layer instead of being hidden in transcript history.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      <Box className={styles.featured} component="section" id="tools">
        <Container size="xl">
          <SectionHeader label="02 / Featured" subtitle="tier / headline / 5 of 12" title="Five fruiting bodies." />
          <Grid gap="md">
            {featuredTools.map((tool, index) => (
              <Grid.Col key={tool.key} span={{ base: 12, md: index < 2 ? 6 : 4 }}>
                <ToolCardSurface
                  className={styles['tool-card']}
                  id={tool.key}
                  padding={index === 0 ? 'xl' : 'lg'}
                  radius="lg"
                  toolColor={tool.color}
                >
                  <Stack gap="md" h="100%">
                    <Group align="baseline" gap="sm">
                      <Title className={styles['tool-card__name']} order={3}>
                        {tool.name.toLowerCase()}
                      </Title>
                      <Text className={styles['tool-card__role']}>{tool.role}</Text>
                    </Group>
                    <Text className={shared.latin}>{tool.latin}</Text>
                    <Text className={styles['tool-card__blurb']}>{tool.blurb}</Text>
                    <Anchor className={styles['tool-card__foot']} display="flex" href={`https://${tool.repo}`} mt="auto" rel="noopener noreferrer" target="_blank" underline="never">
                      <Text>{tool.repo}</Text>
                      <Text className={styles['tool-card__arrow']}>-&gt;</Text>
                    </Anchor>
                  </Stack>
                </ToolCardSurface>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box className={styles.ecosystem} component="section" id="ecosystem">
        <Container size="xl">
          <SectionHeader label="03 / Map" subtitle="surface -> infrastructure" title="The whole organism, mapped." />
          <EcosystemGraph />

          <Stack className={layerStyles.layers} gap={0}>
            {layers.map((layer, index) => (
              <Grid className={layerStyles['layer-row']} gap="xl" key={layer.key}>
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <Text className={layerStyles['layer-row__num']}>/0{index + 1}</Text>
                  <Title order={3}>{layer.title}</Title>
                  <Text className={shared.latin}>{layer.latin}</Text>
                  <Text className={layerStyles['layer-row__note']}>{layer.note}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 9 }}>
                  <Group gap="sm">
                    {tools
                      .filter((tool) => tool.layer === layer.key)
                      .map((tool) => (
                        <ToolBadge
                          key={tool.key}
                          toolColor={tool.color}
                        >
                          {tool.name.toLowerCase()} / {tool.role}
                        </ToolBadge>
                      ))}
                  </Group>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box className={styles.pair} component="section" id="why">
        <Container size="xl">
          <SectionHeader label="04 / Why" subtitle="north star" title="Three problems, one network." />
          <Grid gap="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card className={styles['pair-card']} padding="xl" radius="lg">
                <Title order={3}>Symptoms</Title>
                <Text>
                  Agent sessions waste context on raw terminal output. Architectural decisions vanish when the
                  transcript compacts. Multiple agents on one branch can create accidental reversions.
                </Text>
                <List mt="sm" spacing="sm">
                  <List.Item>verbose test logs eating tokens</List.Item>
                  <List.Item>rediscovering the same bug fix monthly</List.Item>
                  <List.Item>handoffs lost in chat history</List.Item>
                </List>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card className={`${styles['pair-card']} ${styles['pair-card--solution']}`} padding="xl" radius="lg">
                <Title order={3}>Network response</Title>
                <Text>
                  Compress what the model sees, persist what matters, route signals to the layer that owns them,
                  and surface the full organism through one operator view.
                </Text>
                <List mt="sm" spacing="sm">
                  <List.Item>mycelium filters and compresses at the shell boundary</List.Item>
                  <List.Item>hyphae keeps memories and durable concept graphs</List.Item>
                  <List.Item>cap provides one place to read the stack</List.Item>
                </List>
              </Card>
            </Grid.Col>
          </Grid>
          <Group className={styles['install-strip']} justify="space-between">
            <Stack gap={4}>
              <Text className={shared.eyebrow}>Install path</Text>
              <Code>curl -fsSL https://stipe.sh/install.sh | sh</Code>
            </Stack>
            <Anchor href="#top" underline="never">
              back to top
            </Anchor>
          </Group>
        </Container>
      </Box>

    </Box>
  )
}
