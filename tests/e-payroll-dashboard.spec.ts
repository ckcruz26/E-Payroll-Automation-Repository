import { test} from "../fixtures/DashboardFixtures";
import path from "path";

test.describe.configure({ mode: 'parallel' });

test.describe("Dashboard Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  const url = String(process.env.URL);

  test.beforeEach(async ({ page }) => {
    await page.goto(`${url}dashboard`);
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_DASHBOARD_001", async ({ dashboardPage }) => {
    await dashboardPage.verifyDashboardPage();
  });

  test("E-PAYROLL_DASHBOARD_002", async ({ dashboardPage }) => {
    await dashboardPage.clickViewAll();
    await dashboardPage.verifyPayrollManagementPage();
  });
});
