import { test } from "../fixtures/ReportsFixtures";
import path from "path";


test.describe.configure({ mode: "parallel" });

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

  test("E-PAYROLL_REPORTS_001", async ({ reportsPage }) => {
    await reportsPage.verifyReportsPage();
  });

  test("E-PAYROLL_REPORTS_002", async ({ reportsPage }) => {
    await reportsPage.searchReports();
  });

  test("E-PAYROLL_REPORTS_003", async ({ reportsPage }) => {
    await reportsPage.selectionOfRemittance();
  });

  test("E-PAYROLL_REPORTS_004", async ({ reportsPage }) => {
    await reportsPage.selectionOfPagIbig();
  });

  test("E-PAYROLL_REPORTS_005", async ({ reportsPage }) => {
    await reportsPage.selectionOfPhilhealth();
  });

  test("E-PAYROLL_REPORTS_006", async ({ reportsPage }) => {
    await reportsPage.selectionOfSSS();
  });

  test("E-PAYROLL_REPORTS_007", async ({ reportsPage }) => {
    await reportsPage.requiredFields();
  });
});
