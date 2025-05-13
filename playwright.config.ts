import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4, // 👈 Use 4 workers explicitly
  // workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "./playwright-report", open: "never" }]],
  // timeout: 60000,
  use: {
    launchOptions: {
      args: ["--start-maximized"],
      //  slowMo: 2000,
      headless: true,
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
        viewport: { width: 1920, height: 1080 }, // ✅ explicit size
        isMobile: false,
        hasTouch: false,
        deviceScaleFactor: 1, // full screen (start-maximized will apply)
      },
    },
  ],
});
