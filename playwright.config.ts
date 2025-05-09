import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "./playwright-report", open: "never" }]],
  // timeout: 60000,
  use: {
    launchOptions: {
      args: ["--start-maximized"],
      //  slowMo: 2000,
      headless: false,
      
    },
    //trace: "on-first-retry", // Optional: Enables tracing for debugging
    ignoreHTTPSErrors: true,
    // actionTimeout: 10_000 
    trace: "off",
    //actionTimeout: 5000,
    video: "on",
    screenshot: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        viewport: null,
        deviceScaleFactor: undefined,
        // storageState : "./auth/auth.json"
      },
    },
    // Uncomment if you want to test other browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Optional: Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
