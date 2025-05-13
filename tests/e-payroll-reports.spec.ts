import { test, expect } from "@playwright/test";

import path from "path";
import { ReportsPage } from "../pages/ReportsPage";

test.describe.configure({ mode: 'parallel' });

test.describe("Reports Suite", () => {
  
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  const url = String(process.env.URL);

  test.beforeEach(async ({ page }) => {
    await page.goto(`${url}reports`);
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
    const reports = new ReportsPage(page);
    await reports.selectionOfPagIbig();
  });

  test("E-PAYROLL_REPORTS_005", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.selectionOfPhilhealth();
  });

  test("E-PAYROLL_REPORTS_006", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.selectionOfSSS();
  });

  test("E-PAYROLL_REPORTS_007", async ({ page }) => {
    const reports = new ReportsPage(page);
    await reports.requiredFields();
  });
});
