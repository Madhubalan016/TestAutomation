import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './features/test',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
