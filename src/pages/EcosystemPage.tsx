import type { CSSProperties } from 'react'
import { Badge, Box, Container, Grid, Group, Stack, Text, Title } from '@mantine/core'

import { EcosystemGraph } from '../components/EcosystemGraph'
import { SectionHeader } from '../components/SectionHeader'
import { layers, tools } from '../data/ecosystem'
import { useStamp } from '../hooks/useStamp'

export function EcosystemPage() {
  useStamp('ecosystem')
  return (
    <Box className="page-ecosystem" component="main">
      <Container size="xl">
        <SectionHeader
          label="01 / Ecosystem"
          title="The whole organism, mapped."
          subtitle="surface → infrastructure"
        />

        <EcosystemGraph />

        <Stack className="layers" gap={0} mt="xl">
          {layers.map((layer, index) => (
            <Grid className="layer-row" gap="xl" key={layer.key}>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Text className="layer-row__num">/0{index + 1}</Text>
                <Title order={3}>{layer.title}</Title>
                <Text className="latin">{layer.latin}</Text>
                <Text className="layer-row__note">{layer.note}</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 9 }}>
                <Group gap="sm">
                  {tools
                    .filter((tool) => tool.layer === layer.key)
                    .map((tool) => (
                      <Badge
                        key={tool.key}
                        radius="sm"
                        size="xl"
                        style={{ '--tool-color': tool.color } as CSSProperties}
                        variant={"tool" as string}
                      >
                        {tool.name.toLowerCase()} / {tool.role}
                      </Badge>
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
