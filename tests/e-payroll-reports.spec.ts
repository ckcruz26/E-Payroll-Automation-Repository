import { test, expect } from "@playwright/test";

import path from 'path';

test.describe.configure({ mode: "serial" });

test.describe("Reports Suite", () => {
  const remittanceArr = ["Pag-ibig", "SSS", "Philhealth"];

  test.use({
    storageState: path.resolve(__dirname, '../auth/auth.json'),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`http://172.31.32.64:70/reports`);
  });

  test("E-PAYROLL_REPORTS_001", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_002", async ({ page }) => {
    const clickReports = page.locator(
      '//*[@id="app"]/div/div[2]/div/div[1]/ul/li[4]/ul/li/a'
    );

    const searchField = page.getByPlaceholder("Search");

    await clickReports.click();
    await expect(page).toHaveURL(/.*\/reports.*/);

    for (const searchRemittance of remittanceArr) {
      await searchField.fill(searchRemittance);
    }

    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_003", async ({ page }) => {

    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    await expect(page).toHaveURL(/.*\/reports.*/);

    const rowsCount = await cellsLocator.count();

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        console.log(cellText);
        const pagIbigClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td/a'
        );
        await pagIbigClick.click();
        break;
      }
    }

    await page.waitForTimeout(2000);
  });
});
