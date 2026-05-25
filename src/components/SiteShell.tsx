import { useState } from 'react'
import { Box, Burger, Collapse, Container, Group, Image, Stack, Text, UnstyledButton } from '@mantine/core'
import { NavLink, Link } from 'react-router-dom'

import logo from '../assets/logo-basidiocarp.svg'
import { StampDrawer } from './StampDrawer'
import { useStampCount } from '../hooks/useStamp'
import styles from './SiteShell.module.css'

const navItems = [
  { to: '/ecosystem', label: 'ecosystem' },
  { to: '/tools',     label: 'tools' },
  { to: '/notes',     label: 'notes' },
  { to: '/flow',      label: 'flow' },
  { to: '/install',   label: 'install' },
  { to: '/changelog', label: 'changelog' },
]

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const stampCount = useStampCount()

  return (
    <>
      <Box className={styles['site-nav']} component="nav">
        <Container size="xl" px="lg">
          <Group className={styles['site-nav__inner']}>
            <Link className={styles.brandmark} onClick={() => setMenuOpen(false)} to="/">
              <Image alt="" className={styles['brandmark__glyph']} src={logo} />
              <Text component="span">basidiocarp</Text>
              <Text className={styles['brandmark__pronun']} component="span">/bəˈsɪdiəˌkɑːrp/</Text>
            </Link>

            <Group className={styles['site-nav__links']} gap={4}>
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles['site-nav__link']} ${styles.active}` : styles['site-nav__link']
                  }
                  key={item.to}
                  onClick={() => setMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link className={styles['site-nav__cta']} to="/install">stipe init →</Link>
            </Group>

            <Group className={styles['site-nav__end']} gap={8}>
              <UnstyledButton
                aria-label={`${stampCount} of 9 specimens collected — open specimen log`}
                className={styles['stamp-trigger']}
                onClick={() => setDrawerOpen(true)}
              >
                <span className={styles['stamp-trigger__dot']} />
                <span>{stampCount}<span className={styles['stamp-trigger__of']}>/9</span></span>
              </UnstyledButton>
              <Burger
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                aria-controls="site-mobile-nav"
                className={styles['nav-burger']}
                color="var(--fg-2)"
                opened={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                size="sm"
              />
            </Group>
          </Group>
        </Container>

        <Collapse expanded={menuOpen} id="site-mobile-nav">
          <Box className={styles['mobile-nav']}>
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles['mobile-nav__link']} ${styles.active}` : styles['mobile-nav__link']
                }
                key={item.to}
                onClick={() => setMenuOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>
        </Collapse>
      </Box>

      <StampDrawer onClose={() => setDrawerOpen(false)} opened={drawerOpen} />
    </>
  )
}

export function SiteFooter() {
  return (
    <Box className={styles['site-foot']} component="footer">
      <Container size="xl">
        <Group align="flex-start" className={styles['site-foot__grid']}>
          <Stack gap="xs" maw={440}>
            <Group gap="xs">
              <Image alt="" className={styles['brandmark__glyph']} src={logo} />
              <Text className={styles['footer-brand']}>basidiocarp</Text>
            </Group>
            <Text className={styles['site-foot__lat']}>
              the visible fruiting body of an underground agent tooling network
            </Text>
          </Stack>

          {[
            { title: 'Surface',  items: ['cap', 'annulus'] },
            { title: 'Memory',   items: ['hyphae', 'cortina'] },
            { title: 'Runtime',  items: ['mycelium', 'rhizome'] },
          ].map(({ title, items }) => (
            <Stack className={styles['site-foot__col']} gap={6} key={title}>
              <Text component="h4">{title}</Text>
              {items.map((item) => (
                <Link className={styles['site-foot__link']} key={item} to={`/tools#${item}`}>
                  {item}
                </Link>
              ))}
            </Stack>
          ))}
        </Group>
        <Group className={styles['site-foot__bottom']} justify="space-between">
          <Text>MIT licensed</Text>
          <Text>Rust + TypeScript</Text>
        </Group>
      </Container>
    </Box>
  )
}
