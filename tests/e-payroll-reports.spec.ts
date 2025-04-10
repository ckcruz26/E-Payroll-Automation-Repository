import { test, expect } from "@playwright/test";

import path from "path";

test.describe.configure({ mode: "serial" });

test.describe("Reports Suite", () => {
  const remittanceArr = ["Pag-ibig", "SSS", "Philhealth"];

  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("http://172.31.32.64:70/reports");
  });

  test("E-PAYROLL_REPORTS_001", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_002", async ({ page }) => {
    const clickReports = page.locator(
      '//*[@id="app"]/div/div[2]/div/div[1]/ul/li[4]/ul/li/a'
    );

    const searchField = page.getByPlaceholder("Search");

    await clickReports.click();
    await expect(page).toHaveURL(/.*\/reports.*/);

    for (const searchRemittance of remittanceArr) {
      await searchField.fill(searchRemittance);
    }

    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_REPORTS_003", async ({ page }) => {
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    await expect(page).toHaveURL(/.*\/reports.*/);

    const rowsCount = await cellsLocator.count();

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        console.log(cellText);
        const pagIbigClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td/a'
        );
        await pagIbigClick.click();
        break;
      }
    }

    await page.waitForTimeout(2000);
  });

  //[CCRUZ] - ADD (04-08-2025) on hold script, due to the capturing of dropdown boxes
  test.skip("E-PAYROLL_REPORTS_004", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const rowsCount = await cellsLocator.count();
    const yearDropdown = page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = page.getByRole("option", { name: "2025" });
    const monthDropdown = page
      .locator("#pv_id_2")
      .getByRole("combobox", { name: "Please select" });
    const monthOptionVal = page.getByRole("option", { name: "January" });

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        console.log(cellText);
        const pagIbigClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td/a'
        );
        await pagIbigClick.click();
        await yearDropdown.click();
        await yearOptionVal.click();
        await monthDropdown.click();
        // await monthOptionVal.click();

        break;
      }
    }

    await page.waitForTimeout(2000);
  });
  test.skip("E-PAYROLL_REPORTS_005", async ({ page }) => {});
  // For on hold script, due to the capturing of dropdown boxes
  test.skip("E-PAYROLL_REPORTS_006", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/reports.*/);
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const rowsCount = await cellsLocator.count();
    const yearDropdown = page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = page.getByRole("option", { name: "2025" });
    const monthDropdown = page
      .locator("#pv_id_2")
      .getByRole("combobox", { name: "Please select" });
    const monthOptionVal = page.getByRole("option", { name: "January" });

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("SSS")) {
        console.log(cellText);
        const sssClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[3]/td/a'
        );
        await sssClick.click();
        await yearDropdown.click();
        await yearOptionVal.click();
        await monthDropdown.click();
        // await monthOptionVal.click();

        break;
      }
    }

    await page.waitForTimeout(2000);
  });
  //[CCRUZ] - END (04-08-2025) on hold script, due to the capturing of dropdown boxes

  test("E-PAYROLL_REPORTS_007", async ({ page }) => {
    const cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const generateButton = page.getByLabel("Generate");
    const modalMessageError = page.locator(
      "div:nth-child(3) > div > .p-toast-message > .p-toast-message-content"
    );

    await expect(page).toHaveURL(/.*\/reports.*/);

    const rowsCount = await cellsLocator.count();

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        console.log(cellText);
        const pagIbigClick = page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td/a'
        );
        await pagIbigClick.click();
        await generateButton.click();
        await expect(modalMessageError).toContainText("All fields required");
        break;
      }
    }

    await page.waitForTimeout(2000);
  });
});
