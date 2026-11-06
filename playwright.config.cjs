const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/browser', fullyParallel: false, timeout: 45000,
  use: { baseURL: 'http://127.0.0.1:5500', serviceWorkers: 'block', trace: 'retain-on-failure' },
  webServer: [
    { command: 'node scripts/dev-server.cjs', url: 'http://127.0.0.1:5500', reuseExistingServer: !process.env.CI },
    { command: 'node scripts/dev-server.cjs --dist --port 5501', url: 'http://127.0.0.1:5501', reuseExistingServer: !process.env.CI }
  ],
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: process.platform === 'win32' ? 'msedge' : undefined } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel: process.platform === 'win32' ? 'msedge' : undefined } }
  ]
});
