import { Group, Text, Title } from '@mantine/core'

import styles from './SectionHeader.module.css'

type SectionHeaderProps = {
  label: string
  subtitle: string
  title: string
}

export function SectionHeader({ label, subtitle, title }: SectionHeaderProps) {
  return (
    <Group className={styles['section-head']} justify="space-between" wrap="nowrap">
      <Text className={styles['section-head__num']}>{label}</Text>
      <Title className={styles['section-head__title']} order={2}>
        {title}
      </Title>
      <Text className={styles['section-head__sub']}>{subtitle}</Text>
    </Group>
  )
}
