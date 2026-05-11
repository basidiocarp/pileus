import { useState } from 'react'
import { Box, Burger, Container, Group, Image, Stack, Text, UnstyledButton } from '@mantine/core'
import { NavLink, Link } from 'react-router-dom'

import logo from '../assets/logo-basidiocarp.svg'
import { StampDrawer } from './StampDrawer'
import { useStampCount } from '../hooks/useStamp'

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
      <Box className="site-nav" component="nav">
        <Container size="xl" px="lg">
          <Group className="site-nav__inner">
            <Link className="brandmark" onClick={() => setMenuOpen(false)} to="/">
              <Image alt="" className="brandmark__glyph" src={logo} />
              <Text component="span">basidiocarp</Text>
              <Text className="brandmark__pronun" component="span">/bəˈsɪdiəˌkɑːrp/</Text>
            </Link>

            <Group className="site-nav__links" gap={4}>
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'site-nav__link is-active' : 'site-nav__link'
                  }
                  key={item.to}
                  onClick={() => setMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link className="site-nav__cta" to="/install">stipe init →</Link>
            </Group>

            <Group className="site-nav__end" gap={8}>
              <UnstyledButton
                aria-label={`${stampCount} of 9 specimens collected — open specimen log`}
                className="stamp-trigger"
                onClick={() => setDrawerOpen(true)}
              >
                <span className="stamp-trigger__dot" />
                <span>{stampCount}<span className="stamp-trigger__of">/9</span></span>
              </UnstyledButton>
              <Burger
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                className="nav-burger"
                color="var(--fg-2)"
                opened={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                size="sm"
              />
            </Group>
          </Group>
        </Container>

        {menuOpen && (
          <Box className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'mobile-nav__link is-active' : 'mobile-nav__link'
                }
                key={item.to}
                onClick={() => setMenuOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>
        )}
      </Box>

      <StampDrawer onClose={() => setDrawerOpen(false)} opened={drawerOpen} />
    </>
  )
}

export function SiteFooter() {
  return (
    <Box className="site-foot" component="footer">
      <Container size="xl">
        <Group align="flex-start" className="site-foot__grid">
          <Stack gap="xs" maw={440}>
            <Group gap="xs">
              <Image alt="" className="brandmark__glyph" src={logo} />
              <Text className="footer-brand">basidiocarp</Text>
            </Group>
            <Text className="site-foot__lat">
              the visible fruiting body of an underground agent tooling network
            </Text>
          </Stack>

          {[
            { title: 'Surface',  items: ['cap', 'annulus'] },
            { title: 'Memory',   items: ['hyphae', 'cortina'] },
            { title: 'Runtime',  items: ['mycelium', 'rhizome'] },
          ].map(({ title, items }) => (
            <Stack className="site-foot__col" gap={6} key={title}>
              <Text component="h4">{title}</Text>
              {items.map((item) => (
                <Link className="site-foot__link" key={item} to={`/tools#${item}`}>
                  {item}
                </Link>
              ))}
            </Stack>
          ))}
        </Group>
        <Group className="site-foot__bottom" justify="space-between">
          <Text>MIT licensed</Text>
          <Text>Rust + TypeScript</Text>
        </Group>
      </Container>
    </Box>
  )
}
