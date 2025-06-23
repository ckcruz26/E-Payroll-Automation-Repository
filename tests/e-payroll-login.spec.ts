import { test } from "../fixtures/LoginFixtures"

test.describe.configure({ mode: 'parallel' });

test.describe("Login Suite", () => {
  const url = String(process.env.URL);
  const empNo = String(process.env.EMPLOYEE_ID);
  const empPassword = String(process.env.PASSWORD);

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_LOGIN_001", async ({ loginPage }) => {
    await loginPage.successfulLogin(empNo, empPassword);
  });

  test("E-PAYROLL_LOGIN_002", async ({ loginPage }) => {
    await loginPage.invalidLogin(empNo, "1231313131");
  });

  test("E-PAYROLL_LOGIN_003", async ({ loginPage }) => {
       await loginPage.emptyReqiredField(empPassword);
  });

  test("E-PAYROLL_LOGIN_004", async ({ loginPage }) => {
    await loginPage.togglePassword(empNo, empPassword);
  });
});
