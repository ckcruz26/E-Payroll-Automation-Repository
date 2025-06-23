import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout :60000, 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "./playwright-report", open: "never" }]],
  use: {
    launchOptions: {
      args: ["--start-maximized"],
      //  slowMo: 2000,
      headless: false,
    },
    //trace: "on-first-retry",
    ignoreHTTPSErrors: true,
    trace: "off",
    //actionTimeout: 5000,
    video: "on",
    screenshot: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      use: {
        browserName: "chromium",
        viewport: null, // ✅ explicit size
        isMobile: false,
        hasTouch: false,
        deviceScaleFactor: undefined, // full screen (start-maximized will apply)
      },
    },
  ],
});
