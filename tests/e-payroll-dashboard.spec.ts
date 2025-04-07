import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Dashboard Suite", () => {
  const empNo = String(process.env.EMPLOYEE_ID);
  const empPassword = String(process.env.PASSWORD);

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.URL));
  });


  test("E-PAYROLL_DASHBOARD_001", async ({ page }) => {
    await expect(page).toHaveTitle(/ePayroll System/);
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );

    await empNoField.fill(empNo);
    await empPasswordField.fill(empPassword);
    await signInButton.click();

    await expect(page).toHaveURL(/.*\/dashboard.*/);
    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_LOGIN_002", async ({ page }) => {
    await expect(page).toHaveTitle(/ePayroll System/);
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );
    const viewAll = page.locator('//*[@id="app"]/div/div[3]/div[1]/div[3]/div/div[1]/div/div/p[2]')

    await empNoField.fill(empNo);
    await empPasswordField.fill(empPassword);
    await signInButton.click();

    await expect(page).toHaveURL(/.*\/dashboard.*/);
    await viewAll.click()
    await expect(page).toHaveURL(/.*\/payroll-management.*/);
    await page.waitForTimeout(2000);
  });
});
