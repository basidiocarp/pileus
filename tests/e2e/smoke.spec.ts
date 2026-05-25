import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', heading: 'The visible fruit' },
  { path: '/tools', heading: 'Every body in the colony.' },
  { path: '/notes', heading: 'Notes from the repos.' },
  { path: '/flow', heading: 'How it works.' },
  { path: '/install', heading: 'Quick start.' },
]

test.describe('primary routes', () => {
  for (const route of routes) {
    test(`${route.path} renders without console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })

      await page.goto(route.path)
      await expect(page.getByRole('heading', { name: new RegExp(route.heading, 'i') })).toBeVisible()
      await expect(page.locator('main, header').first()).toBeVisible()
      expect(errors).toEqual([])
    })
  }
})

test.describe('accessibility smoke', () => {
  for (const route of routes) {
    test(`${route.path} has no critical axe violations`, async ({ page }) => {
      await page.goto(route.path)

      const results = await new AxeBuilder({ page })
        .disableRules(['color-contrast'])
        .analyze()

      expect(results.violations.filter((violation) => violation.impact === 'critical')).toEqual([])
    })
  }
})

test('ecosystem graph nodes are keyboard-operable', async ({ page }) => {
  await page.goto('/ecosystem')

  const graph = page.locator('#ecosystem-graph')
  await expect(graph).toBeVisible()

  const firstNode = page.getByRole('button', { name: /mycelium/i }).first()
  await firstNode.focus()
  await expect(firstNode).toBeFocused()
  await page.keyboard.press('Enter')

  await expect(graph.getByText('myceliumii')).toBeVisible()
  await expect(firstNode).toHaveAttribute('aria-pressed', 'true')
})
