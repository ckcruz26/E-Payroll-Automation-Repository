import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

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
    const loginPage = new LoginPage(page);
    await loginPage.successfulLogin(empNo, empPassword);
  });

  test("E-PAYROLL_LOGIN_002", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.invalidLogin(empNo, "1231313131");
  });

  test("E-PAYROLL_LOGIN_003", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.emptyReqiredField(empPassword);
  });

  test("E-PAYROLL_LOGIN_004", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.togglePassword(empNo, empPassword);
  });
});
