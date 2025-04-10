import { test, expect } from "@playwright/test";
import path from "path";

test.describe.configure({ mode: "serial" });

test.describe("Dashboard Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.URL}dashboard`);
  });

  test("E-PAYROLL_DASHBOARD_001", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/dashboard.*/);
    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_DASHBOARD_002", async ({ page }) => {
    const viewAll = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[3]/div/div[1]/div/div/p[2]'
    );
    await expect(page).toHaveURL(/.*\/dashboard.*/);
    await viewAll.click();
    await expect(page).toHaveURL(/.*\/payroll-management.*/);
    await page.waitForTimeout(2000);
  });
});
