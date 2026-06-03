// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3333',
    viewport: { width: 390, height: 844 }, // iPhone 15 Pro
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: {
    command: 'npx serve reference/eco-buddy_hi-fi -p 3333 --no-clipboard',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['iPhone 15 Pro'] } },
  ],
});
