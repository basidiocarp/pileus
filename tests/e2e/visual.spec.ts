import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function stabilizeVisuals(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }

      canvas,
      [aria-label*="specimens collected"],
      [class*="ambient-flares"],
      [class*="spore-counter"],
      [class*="weather-readout"],
      [class*="moon-glyph"],
      [class*="spore-btn"] {
        visibility: hidden !important;
      }
    `,
  })
}

async function resetClientState(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })
}

test.describe('visual regression', () => {
  test.beforeEach(({ page }, testInfo) => {
    void page
    test.skip(testInfo.project.name !== 'chromium', 'visual baselines are captured in chromium only')
  })

  test('home desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await resetClientState(page)
    await page.goto('/')
    await stabilizeVisuals(page)
    await expect(page).toHaveScreenshot('home-desktop.png', {
      animations: 'disabled',
      caret: 'hide',
      fullPage: false,
    })
  })

  test('tools mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await resetClientState(page)
    await page.goto('/tools')
    await stabilizeVisuals(page)
    await expect(page).toHaveScreenshot('tools-mobile.png', {
      animations: 'disabled',
      caret: 'hide',
      fullPage: false,
    })
  })

  test('notes desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await resetClientState(page)
    await page.goto('/notes')
    await stabilizeVisuals(page)
    await expect(page).toHaveScreenshot('notes-desktop.png', {
      animations: 'disabled',
      caret: 'hide',
      fullPage: false,
    })
  })
})
