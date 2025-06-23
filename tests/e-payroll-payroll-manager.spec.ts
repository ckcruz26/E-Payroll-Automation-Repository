import { test } from "../fixtures/PayrollManagerFixtures";
import path from "path";

test.describe.configure({ mode: "parallel" });

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

  test("E-PAYROLL_PAYROLL_MANAGEMENT_001", async ({ payrollManagerPage }) => {
    await payrollManagerPage.verifyPayrollManagerPage();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_002", async ({ payrollManagerPage }) => {
    await payrollManagerPage.searchSpecificPayroll();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_003", async ({ payrollManagerPage }) => {
    await payrollManagerPage.viewCreatePayrollModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_004", async ({ payrollManagerPage }) => {
    await payrollManagerPage.createPayroll();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_005", async ({ payrollManagerPage }) => {
    await payrollManagerPage.skipCreatePayrollRequiredFields();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_006", async ({ payrollManagerPage }) => {
    await payrollManagerPage.viewExisitingPayrollModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_007", async ({ payrollManagerPage }) => {
    await payrollManagerPage.downloadPayrollSummary();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_008", async ({ payrollManagerPage }) => {
    await payrollManagerPage.deleteExistingPayroll();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_010", async ({ payrollManagerPage }) => {
    await payrollManagerPage.viewOverstatedSalaryModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_011", async ({ payrollManagerPage }) => {
    await payrollManagerPage.fillUpOverstatedSalaryModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_012", async ({ payrollManagerPage }) => {
    await payrollManagerPage.skipOverstatedSalaryRequiredFields();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_013", async ({ payrollManagerPage }) => {
    await payrollManagerPage.viewUnderstatedSalaryModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_014", async ({ payrollManagerPage }) => {
    await payrollManagerPage.fillUpUnderstatedSalaryModal();
  });

  test("E-PAYROLL_PAYROLL_MANAGEMENT_015", async ({ payrollManagerPage }) => {
    await payrollManagerPage.skipUnderstatedSalaryRequiredFields();
  });
});
