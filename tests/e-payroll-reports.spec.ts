import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Dashboard Suite", () => {
  const empNo = String(process.env.EMPLOYEE_ID);
  const empPassword = String(process.env.PASSWORD);

  const remittanceArr = ["Pag-ibig", "SSS", "Philhealth"];

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.URL));
  });

  test("E-PAYROLL_REPORTS_001", async ({ page }) => {
    await expect(page).toHaveTitle(/ePayroll System/);
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );

    const clickReports = page.locator(
      '//*[@id="app"]/div/div[2]/div/div[1]/ul/li[4]/ul/li/a'
    );

    await empNoField.fill(empNo);
    await empPasswordField.fill(empPassword);
    await signInButton.click();
    await clickReports.click();

    await expect(page).toHaveURL(/.*\/reports.*/);

    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_002", async ({ page }) => {
    await expect(page).toHaveTitle(/ePayroll System/);
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );

    const clickReports = page.locator(
      '//*[@id="app"]/div/div[2]/div/div[1]/ul/li[4]/ul/li/a'
    );

    const searchField = page.getByPlaceholder("Search");

    await empNoField.fill(empNo);
    await empPasswordField.fill(empPassword);
    await signInButton.click();
    await clickReports.click();
    await expect(page).toHaveURL(/.*\/reports.*/);
    const remittanceArr = ["Pag-ibig", "SSS", "Philhealth"];

    for (const searchRemittance of remittanceArr) {
      await searchField.fill(searchRemittance);
    }

    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_003", async ({ page }) => {
    await expect(page).toHaveTitle(/ePayroll System/);
    const empNoField = page.locator("#basic");
    const empPasswordField = page.getByPlaceholder("Password");
    const signInButton = page.locator(
      '//*[@id="app"]/div/div/div/div/div[3]/a'
    );

    const clickReports = page.locator(
      '//*[@id="app"]/div/div[2]/div/div[1]/ul/li[4]/ul/li/a'
    );

    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    await empNoField.fill(empNo);
    await empPasswordField.fill(empPassword);
    await signInButton.click();
    await clickReports.click();
    await expect(page).toHaveURL(/.*\/reports.*/);

    const rowsCount = await cellsLocator.count();

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        console.log(cellText);
        const pagIbigClick = page.locator('//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td/a')
        await pagIbigClick.click()
        break;
      }
    }

    await page.waitForTimeout(2000);
  });
});
