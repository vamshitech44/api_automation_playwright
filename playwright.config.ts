import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      ...(process.env.API_TOKEN
        ? { 'Authorization': `Bearer ${process.env.API_TOKEN}` }
        : {})
    },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'api',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
