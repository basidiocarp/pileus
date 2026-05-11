import { Group, Text, Title } from '@mantine/core'

type SectionHeaderProps = {
  label: string
  subtitle: string
  title: string
}

export function SectionHeader({ label, subtitle, title }: SectionHeaderProps) {
  return (
    <Group className="section-head" justify="space-between" wrap="nowrap">
      <Text className="section-head__num">{label}</Text>
      <Title className="section-head__title" order={2}>
        {title}
      </Title>
      <Text className="section-head__sub">{subtitle}</Text>
    </Group>
  )
}
