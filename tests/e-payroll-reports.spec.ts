import { test, expect } from "@playwright/test";

import path from "path";
import { ReportsPage } from "../pages/ReportsPage";

test.describe.configure({ mode: "serial" });

test.describe("Reports Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("http://172.31.32.64:70/reports");
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_REPORTS_001", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.verifyReportsPage();
  });

  test("E-PAYROLL_REPORTS_002", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.searchReports();
  });

  test("E-PAYROLL_REPORTS_003", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.selectionOfRemittance();
  });

  test("E-PAYROLL_REPORTS_004", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const rowsCount = await cellsLocator.count();
    const yearDropdown = page.locator("#pv_id_3 div");
    const yearOptionVal = page.getByRole("option", { name: "2025" });
    const monthDropdown = page.locator("#pv_id_4 div");
    const monthOptionVal = page.getByRole("option", { name: "January" });
    const employmentStatus = page.locator("#pv_id_5 div");
    const employmentStatusVal = page.getByRole("option", {
      name: "Contract of Service / Job",
    });
    const generateButton = page.getByRole("button", { name: "Generate" });

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        const pagIbigClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[2]/td/a'
        );
        await pagIbigClick.click();
        await yearDropdown.click();
        await yearOptionVal.click();
        await monthDropdown.click();
        await monthOptionVal.click();
        await employmentStatus.click();
        await employmentStatusVal.click();
        await generateButton.click();
        break;
      }
    }

    await page.waitForTimeout(2000);
  });
  
  test.skip("E-PAYROLL_REPORTS_005", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const rowsCount = await cellsLocator.count();
    const yearDropdown = page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = page.getByRole("option", { name: "2025" });
    const monthDropdown = page
      .locator("#pv_id_2")
      .getByRole("combobox", { name: "Please select" });
    const monthOptionVal = page.getByRole("option", { name: "January" });
    const employmentStatus = page.locator("#pv_id_3 div");
    const employmentStatusVal = page.getByRole("option", {
      name: "Contract of Service / Job",
    });
    const generateButton = page.getByRole("button", { name: "Generate" });

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Philhealth")) {
        const pagIbigClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[3]/td/a'
        );
         await pagIbigClick.click();
        await yearDropdown.click();
        await yearOptionVal.click();
        await monthDropdown.isVisible();
        await monthDropdown.click();
        await monthOptionVal.click();
        await employmentStatus.click();
        await employmentStatusVal.click();
        await generateButton.click();

        
        break;
      }
    }

    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_006", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const rowsCount = await cellsLocator.count();

    const yearDropdown = page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = page.getByRole("option", { name: "2025" });
    const monthDropdown = page.getByRole("combobox", {
      name: "Please select Month",
    });
    const monthOptionVal = page.getByRole("option", { name: "January" });
    const generateButton = page.getByRole("button", { name: "Generate" });

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("SSS")) {
        const sssClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[4]/td/a'
        );
        await sssClick.click();
        await yearDropdown.click();
        await yearOptionVal.click();
        await monthDropdown.click();
        await monthOptionVal.click();
        await generateButton.click();
        break;
      }
    }

    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_007", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.requiredFields();
  });
});
