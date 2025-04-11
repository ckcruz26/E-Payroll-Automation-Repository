import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Login Suite", () => {
  const empNo = String(process.env.EMPLOYEE_ID);
  const empPassword = String(process.env.PASSWORD);

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.URL));
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_LOGIN_001", async ({ page }) => {
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
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");
    const modalError = page.locator(
      "xpath=/html/body/div[2]/div/div[2]/div[1]/p"
    );
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );

    await expect(page).toHaveTitle(/ePayroll System/);
    await page.waitForTimeout(1000);
    await empNoField.fill(empNo);
    await empPasswordField.fill("1231313131");
    await signInButton.click();

    await expect(modalError).toContainText("Incorrect username or password");
    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_LOGIN_003", async ({ page }) => {
    const empPasswordField = page.getByPlaceholder("Password");
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );
    const modalError = page.locator(
      "xpath=/html/body/div[2]/div/div[2]/div[1]/p"
    );

    await expect(page).toHaveTitle(/ePayroll System/);
    await page.waitForTimeout(1000);

    await empPasswordField.fill("1231313131");
    await signInButton.click();
    await page.waitForTimeout(2000);
    await expect(modalError).toContainText(
      "Username or password cannot be empty"
    );
  });

  test("E-PAYROLL_LOGIN_004", async ({ page }) => {
    await expect(page).toHaveTitle(/ePayroll System/);
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");

    await empNoField.fill(empNo);
    await empPasswordField.fill(empPassword);
    await page.waitForTimeout(2000);
    await page.locator("svg").click();
  });
});
