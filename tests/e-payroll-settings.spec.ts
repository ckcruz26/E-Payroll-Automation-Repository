import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";

test.describe.configure({ mode: "serial" });

test.describe("Settings Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  async function goToLink(page, variable) {
    await page.goto(`http://172.31.32.64:70/settings/${variable}`);
  }

  const employmentTypes: string[] = ["MOA", "Permanent"];
  const employmentType: string = faker.helpers.arrayElement(employmentTypes);
  const randomNumber = faker.number.int({ min: 1, max: 6 });
  const salaryTableName = `Salary Table - ${employmentType} Dummy ${randomNumber} Test`;

  const regexSalaryTable = /Salary Table - (MOA|Permanent) Dummy \d+ Test/;

  test("E-PAYROLL_SETTINGS_001", async ({ page }) => {
    goToLink(page, "salary-grade");
    await expect(page).toHaveURL(/.*\/salary-grade.*/);
  });

  test("E-PAYROLL_SETTINGS_002", async ({ page }) => {
    goToLink(page, "salary-grade");
    const searchFieldName = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[1]/div[2]/div[1]/input'
    );
    const searchData = "Plantilla";
    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td',
      { state: "visible" }
    );
    const tableCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const rowsCount = await tableCells.count();

    await searchFieldName.fill(searchData);

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = tableCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes(searchData)) {
        break;
      }
    }
  });

  test("E-PAYROLL_SETTINGS_003", async ({ page }) => {
    goToLink(page, "salary-grade");
    const clickCreate = page.getByRole("button", { name: "Create" });
    const createSalaryGradeTxt = page.getByText("Create Salary Grade Table");
    await createSalaryGradeTxt.isVisible();
    await clickCreate.click();
  });

  test("E-PAYROLL_SETTINGS_004", async ({ page }) => {
    goToLink(page, "salary-grade");

    const clickCreate = page.getByRole("button", { name: "Create" });
    const nameSalaryGrade = page.getByRole("textbox", {
      name: "Input Salary Grade Table Name",
    });

    const elementsToClick = [
      page.getByRole("combobox", { name: "Select Year" }),
      page.getByRole("option", { name: "2025" }),
      page.getByRole("combobox", { name: "Select Employment Type" }),
      page.getByRole("option", { name: "COS, JO" }),
      page
        .getByRole("dialog", { name: "Create Salary Grade Table" })
        .getByLabel("Create"),
    ];

    await clickCreate.click();
    await nameSalaryGrade.fill(salaryTableName);

    for (const el of elementsToClick) {
      await el.click();
    }
  });

  test("E-PAYROLL_SETTINGS_005", async ({ page }) => {
    goToLink(page, "salary-grade");

    const clickCreate = page.getByRole("button", { name: "Create" });
    const nameSalaryGrade = page.getByRole("textbox", {
      name: "Input Salary Grade Table Name",
    });

    const elementsToClick = [
      page.getByRole("combobox", { name: "Select Year" }),
      page.getByRole("option", { name: "2025" }),
      page
        .getByRole("dialog", { name: "Create Salary Grade Table" })
        .getByLabel("Create"),
    ];
    await clickCreate.click();
    await nameSalaryGrade.fill("");
    for (const el of elementsToClick) {
      await el.click();
    }
  });

  test("E-PAYROLL_SETTINGS_006", async ({ page }) => {
    goToLink(page, "salary-grade");

    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td',
      { state: "visible" }
    );
    const tableCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const salaryGradeEdit = page
      .getByRole("row", { name: "Salary Grade Table | MOA 2025" })
      .getByLabel("Edit");

    const rowsCount = await tableCells.count();

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = tableCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (
        cellText.includes("Salary Grade Table | Plantilla") ||
        cellText.includes("Salary Grade Table | MOA")
      ) {
        await salaryGradeEdit.click();
        break;
      }
    }
  });

  test("E-PAYROLL_SETTINGS_007", async ({ page }) => {
    goToLink(page, "salary-grade");

    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td',
      { state: "visible" }
    );

    //table for Salary Grade
    const tableCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    const salaryGradeEdit = page
      .getByRole("row", { name: regexSalaryTable })
      .getByLabel("Edit");

    const rowsCount = await tableCells.count();

    let tableEditFlag = 0;

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = tableCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (regexSalaryTable.test(cellText)) {
        await salaryGradeEdit.click();
        tableEditFlag = 1;
        break;
      }
    }

    if (tableEditFlag == 1) {
      // const clickEditSpecificGradePlantilla = page.locator( `//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[${randomNumber}]/td[10]/button`);

      const clickEditSpecificGradeMOA = page.locator(
        `//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[${randomNumber}]/td[6]/button`
      );

      const minMoney = 10000;
      const maxMoney = 15000;

      const randomValueMoney = faker.number.int({
        min: minMoney,
        max: maxMoney,
      });
      const randomValuePercent = faker.number.int({ min: 1, max: 5 });

      const baseRateMOAField = page.locator('//*[@id="step1"]/input');
      const premiumPercentageField = page.getByRole("textbox", {
        name: "Premium Percentage*",
      });
      await clickEditSpecificGradeMOA.click();
      await baseRateMOAField.fill(String(randomValueMoney));
      await page.waitForTimeout(1000);
      await premiumPercentageField.fill(String(randomValuePercent));
    }
  });
});
