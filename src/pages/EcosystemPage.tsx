import { Box, Container, Grid, Group, Stack, Text, Title } from '@mantine/core'

import { EcosystemGraph } from '../components/EcosystemGraph'
import { SectionHeader } from '../components/SectionHeader'
import { ToolBadge } from '../components/ToolBadge'
import { layers, tools } from '../data/ecosystem'
import { useStamp } from '../hooks/useStamp'
import layerStyles from '../styles/ecosystemLayers.module.css'
import shared from '../styles/shared.module.css'

export function EcosystemPage() {
  useStamp('ecosystem')
  return (
    <Box className={shared.page} component="main">
      <Container size="xl">
        <SectionHeader
          label="01 / Ecosystem"
          title="The whole organism, mapped."
          subtitle="surface → infrastructure"
        />

        <EcosystemGraph />

        <Stack className={layerStyles.layers} gap={0} mt="xl">
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
  )
}
