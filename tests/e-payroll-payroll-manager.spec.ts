import { test, expect } from "@playwright/test";

import path from "path";
import { PayrollManagerPage } from "../pages/PayrollManagerPage";

test.describe.configure({ mode: 'parallel' });

test.describe("Payroll Manager Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  const url = String(process.env.URL);

  test.beforeEach(async ({ page }) => {
    await page.goto(`${url}payroll-management`);
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_001", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.verifyPayrollManagerPage();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_002", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.searchSpecificPayroll();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_003", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.viewCreatePayrollModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_004", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.createPayroll();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_005", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.skipCreatePayrollRequiredFields();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_006", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.viewExisitingPayrollModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_007", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.downloadPayrollSummary();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_008", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.deleteExistingPayroll();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_010", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.viewOverstatedSalaryModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_011", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.fillUpOverstatedSalaryModal();
  });

  test('E-PAYROLL_PAYROLL_MANAGEMENT_012', async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.skipOverstatedSalaryRequiredFields();
  })

  test("E-PAYROLL_PAYROLL_MANAGEMENT_013", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.viewUnderstatedSalaryModal();
  })

  test("E-PAYROLL_PAYROLL_MANAGEMENT_014", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.fillUpUnderstatedSalaryModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_015", async ({ page }) => {
    const payrollManager = new PayrollManagerPage(page);
    await payrollManager.skipUnderstatedSalaryRequiredFields();
  });

});
