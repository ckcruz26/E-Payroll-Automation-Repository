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

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  const employmentTypes: string[] = ["MOA", "Permanent"];
  const employmentType: string = faker.helpers.arrayElement(employmentTypes);
  const randomNumber = faker.number.int({ min: 1, max: 6 });
  const deductionName = `Deduction Type - ${randomNumber} Dummy Test`;
  const salaryTableName = `Salary Table - ${employmentType} Dummy ${randomNumber} Test`;

  const regexSalaryTable = /Salary Table - (MOA|Permanent) Dummy \d+ Test/;
  const regexDeductionName = /Deduction Type - \d+ Dummy Test/;

  const minMoney = 10000;
  const maxMoney = 15000;

  const randomValueMoney = faker.number.int({
    min: minMoney,
    max: maxMoney,
  });

  const randomValuePercent = faker.number.int({ min: 1, max: 5 });
  const searchUserRelevantData = [
    "03-11329",
    "ABAD",
    "ANGELICA",
    "TABANGAY",
    "IO1",
  ];

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

      const baseRateMOAField = page.locator('//*[@id="step1"]/input');
      const premiumPercentageField = page.getByRole("textbox", {
        name: "Premium Percentage*",
      });

      const saveButtonSalaryGrade = page.locator(
        "xpath=/html/body/div[2]/div/div[2]/div[4]/button[2]"
      );
      const verifySaveChangeText = page.getByText(
        "Are you sure you want to proceed?"
      );
      const modalSuccess = page.getByText("Salary Grade updated");

      const stringValueMoney = randomValueMoney.toString();

      await clickEditSpecificGradeMOA.click();
      await baseRateMOAField.clear();
      await baseRateMOAField.fill(stringValueMoney);
      await page.waitForTimeout(1000);
      await premiumPercentageField.fill(String(randomValuePercent));
      await saveButtonSalaryGrade.click();
      await verifySaveChangeText.isVisible();
      await modalSuccess.isVisible();
      await page.waitForTimeout(1000);
    }
  });

  test.skip("E-PAYROLL_SETTINGS_008", async ({ page }) => {
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

      const baseRateMOAField = page.locator('//*[@id="step1"]/input');

      const saveButtonSalaryGrade = page.locator(
        "xpath=/html/body/div[2]/div/div[2]/div[4]/button[2]"
      );
      const verifySaveChangeText = page.getByText(
        "Are you sure you want to proceed?"
      );
      const modalSuccess = page.getByText("Salary Grade updated");

      await clickEditSpecificGradeMOA.click();
      await baseRateMOAField.fill(String(randomValueMoney));
      await page.waitForTimeout(1000);
      await saveButtonSalaryGrade.click();
      await verifySaveChangeText.isVisible();
      await modalSuccess.isVisible();
      await page.waitForTimeout(1000);
    }
  });

  test("E-PAYROLL_SETTINGS_009", async ({ page }) => {
    goToLink(page, "deduction-types");
    await expect(page).toHaveURL(/.*\/deduction-types.*/);
  });

  test("E-PAYROLL_SETTINGS_010", async ({ page }) => {
    goToLink(page, "deduction-types");
    const searchFieldDeductions = page.getByRole("textbox");
    const searchButton = page.getByRole("textbox");

    await searchFieldDeductions.fill("SWEAP");
    await searchButton.click();
  });

  test("E-PAYROLL_SETTINGS_011", async ({ page }) => {
    goToLink(page, "deduction-types");
    const createDeductionButton = page.getByRole("button", { name: "Create" });
    const addDeductionModalHeader = page.getByText("Add Deduction");

    await createDeductionButton.click();
    await addDeductionModalHeader.isVisible();
  });

  test("E-PAYROLL_SETTINGS_012", async ({ page }) => {
    goToLink(page, "deduction-types");
    const createDeductionButton = page.getByRole("button", { name: "Create" });
    const dialogAddDeductionNameField = page
      .getByRole("dialog", { name: "Add Deduction" })
      .getByRole("textbox");
    const dialogStatusDeductionStatusDropdownBox = page.getByRole("combobox", {
      name: "Active",
    });
    const dialogStatusDeductionStatusValue = page.getByRole("option", {
      name: "Active",
    });
    const saveButtonDeduction = page.getByRole("button", { name: "Save" });
    const alertDialogSaveButton = page
      .getByRole("alertdialog", { name: "Confirmation" })
      .getByLabel("Save");
    const deductionSuccessMessage = page.getByText(
      "Information has been saved"
    );

    await createDeductionButton.click();
    await dialogAddDeductionNameField.fill(deductionName);
    await dialogStatusDeductionStatusDropdownBox.click();
    await dialogStatusDeductionStatusValue.click();
    await saveButtonDeduction.click();
    await alertDialogSaveButton.click();
    await deductionSuccessMessage.click();
  });

  test("E-PAYROLL_SETTINGS_013", async ({ page }) => {
    goToLink(page, "deduction-types");
    const createDeductionButton = page.getByRole("button", { name: "Create" });
    const saveButtonDeduction = page.getByRole("button", { name: "Save" });
    const alertDialogSaveButton = page
      .getByRole("alertdialog", { name: "Confirmation" })
      .getByLabel("Save");
    const allRequiredFieldsMsg = page.getByText("All fields are required");

    await createDeductionButton.click();
    await saveButtonDeduction.click();
    await alertDialogSaveButton.click();
    await allRequiredFieldsMsg.isVisible();
    await page.waitForTimeout(2000);
  });

  test("E-PAYROLL_SETTINGS_014", async ({ page }) => {
    goToLink(page, "deduction-types");

    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (regexDeductionName.test(cellText)) {
        await editButton.click();
        break;
      }
    }
  });

  test("E-PAYROLL_SETTINGS_015", async ({ page }) => {
    goToLink(page, "deduction-types");
    //deduction table
    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    let tableEditFlag = 0;

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (regexDeductionName.test(cellText)) {
        await editButton.click();
        tableEditFlag = 1;
        break;
      }
    }

    if (tableEditFlag == 1) {
      const deductionEditNameField = page
        .getByRole("dialog", { name: "Add Deduction" })
        .getByRole("textbox");
      const dialogStatusDeductionStatusDropdownBox = page.getByRole(
        "combobox",
        { name: "Active" }
      );
      const dialogStatusDeductionStatusValue = page.getByRole("option", {
        name: "Inactive",
      });
      const editDialogSaveButton = page.getByRole("button", { name: "Save" });
      const alertDialogSaveButton = page
        .getByRole("alertdialog", { name: "Confirmation" })
        .getByLabel("Save");
      const textUpdate = page.getByText("Information has been saved");

      await deductionEditNameField.fill(deductionName);
      await dialogStatusDeductionStatusDropdownBox.click();
      await dialogStatusDeductionStatusValue.click();
      await editDialogSaveButton.click();
      await alertDialogSaveButton.click();
      await textUpdate.isVisible();
    }
  });

  test("E-PAYROLL_SETTINGS_016", async ({ page }) => {
    goToLink(page, "deduction-types");

    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    let tableEditFlag = 0;

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (regexDeductionName.test(cellText)) {
        await editButton.click();
        tableEditFlag = 1;
        break;
      }
    }

    if (tableEditFlag == 1) {
      const deductionEditNameField = page
        .getByRole("dialog", { name: "Add Deduction" })
        .getByRole("textbox");
      const dialogStatusDeductionStatusDropdownBox = page.getByRole(
        "combobox",
        { name: "Active" }
      );
      const dialogStatusDeductionStatusValue = page.getByRole("option", {
        name: "Inactive",
      });
      const editDialogSaveButton = page.getByRole("button", { name: "Save" });
      const alertDialogSaveButton = page
        .getByRole("alertdialog", { name: "Confirmation" })
        .getByLabel("Save");
      const errorText = page.getByText("All fields are required");

      await deductionEditNameField.clear();
      await dialogStatusDeductionStatusDropdownBox.click();
      await dialogStatusDeductionStatusValue.click();
      await editDialogSaveButton.click();
      await alertDialogSaveButton.click();
      await errorText.isVisible();
    }
  });

  test("E-PAYROLL_SETTINGS_017", async ({ page }) => {
    goToLink(page, "deduction-types");
    //deduction table
    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    let tableEditFlag = 0;

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (regexDeductionName.test(cellText)) {
        await editButton.click();
        tableEditFlag = 1;
        break;
      }
    }

    if (tableEditFlag == 1) {
      const deductionEditNameField = page
        .getByRole("dialog", { name: "Add Deduction" })
        .getByRole("textbox");
      const dialogStatusDeductionStatusDropdownBox = page.getByRole(
        "combobox",
        { name: "Active" }
      );
      const dialogStatusDeductionStatusValue = page.getByRole("option", {
        name: "Inactive",
      });
      const editDialogSaveButton = page.getByRole("button", { name: "Save" });
      const alertDialogSaveButton = page
        .getByRole("alertdialog", { name: "Confirmation" })
        .getByLabel("Save");
      const textUpdate = page.getByText("Information has been saved");

      await deductionEditNameField.fill(deductionName);
      await dialogStatusDeductionStatusDropdownBox.click();
      await dialogStatusDeductionStatusValue.click();
      await editDialogSaveButton.click();
      await alertDialogSaveButton.click();
      await textUpdate.isVisible();
    }
  });

  test("E-PAYROLL_SETTINGS_018", async ({ page }) => {
    goToLink(page, "deduction-types");
    // Get the filter dropdown box and options
    const filterDropdownBox = page.getByRole("combobox", {
      name: "Rows per page",
    });
    const optionValues = ["20", "50"];

    for (const value of optionValues) {
      await filterDropdownBox.click();
      const option = page.getByRole("option", { name: value });
      await option.click();
      await page.waitForTimeout(500);
    }
  });

  test("E-PAYROLL_SETTINGS_019", async ({ page }) => {
    goToLink(page, "upload-deductions");
    const downloadTemplateButton = page.getByRole("button", {
      name: "Download Template",
    });
    await downloadTemplateButton.click();
  });

  test("E-PAYROLL_SETTINGS_020", async ({ page }) => {
    goToLink(page, "upload-deductions");
    const fileInputButton = await page.locator('input[type="file"]');
    const clickStartUpload = page.getByRole("button", { name: "Start Upload" });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/deduction-template (1).csv"
    );
    const successIndicator = page
      .locator("div")
      .filter({ hasText: /^Success, deduction data has been uploaded$/ })
      .nth(1);

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.click();
    await successIndicator.isVisible();
  });

  test("E-PAYROLL_SETTINGS_021", async ({ page }) => {
    goToLink(page, "upload-deductions");
    const fileInputButton = await page.locator('input[type="file"]');
    const clickStartUpload = page.getByRole("button", { name: "Start Upload" });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/testInvalid.txt"
    );
    const fileInputTextVisibility = page.getByText(
      `${path.basename(inputFileValue)}:`
    );

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.isDisabled();
    await fileInputTextVisibility.isVisible();
  });

  test("E-PAYROLL_SETTINGS_022", async ({ page }) => {
    goToLink(page, "optional-deductions");
    const downloadTemplateButton = page.getByRole("button", {
      name: "Download Template",
    });
    await downloadTemplateButton.click();
  });

  test("E-PAYROLL_SETTINGS_023", async ({ page }) => {
    goToLink(page, "optional-deductions");
    const fileInputButton = await page.locator('input[type="file"]');
    const clickStartUpload = page.getByRole("button", { name: "Start Upload" });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/deduction-template (1).csv"
    );
    const successIndicator = page
      .locator("div")
      .filter({ hasText: /^Success, deduction data has been uploaded$/ })
      .nth(1);

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.click();
    await successIndicator.isVisible();
  });

  test("E-PAYROLL_SETTINGS_024", async ({ page }) => {
    goToLink(page, "optional-deductions");
    const fileInputButton = await page.locator('input[type="file"]');
    const clickStartUpload = page.getByRole("button", { name: "Start Upload" });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/testInvalid.txt"
    );
    const fileInputTextVisibility = page.getByText(
      `${path.basename(inputFileValue)}:`
    );

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.isDisabled();
    await fileInputTextVisibility.isVisible();
  });

  test("E-PAYROLL_SETTINGS_025", async ({ page }) => {
    goToLink(page, "user-access");
    await expect(page).toHaveURL(/.*\/user-access.*/);
  });

  test("E-PAYROLL_SETTINGS_026", async ({ page }) => {
    goToLink(page, "user-access");
    const numberComboBox = page.getByRole("combobox", {
      name: "Rows per page",
    });
    const numberComboBoxVal = ["20", "50", "100"];

    for (const num of numberComboBoxVal) {
      await numberComboBox.click();
      const optionComboBox = page.getByRole("option", { name: num });

      await optionComboBox.click();
    }
  });

  test("E-PAYROLL_SETTINGS_027", async ({ page }) => {
    goToLink(page, "user-access");
    const searchFieldUser = page.getByRole("textbox", { name: "Search" });

    for (const data of searchUserRelevantData) {
      await searchFieldUser.fill(data);
    }
  });

  test("E-PAYROLL_SETTINGS_028", async ({ page }) => {
    goToLink(page, "user-access");
    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[6]/button'
    );
    const searchFieldUser = page.getByRole("textbox", { name: "Search" });
    const empNo = "03-12456";

    searchFieldUser.fill(empNo);
    await editButton.click();
  });

  test("E-PAYROLL_SETTINGS_029", async ({ page }) => {
    goToLink(page, "user-access");
    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[6]/button'
    );
    const searchFieldUser = page.getByRole("textbox", { name: "Search" });
    const empNo = "03-12456";
    const bulkAccessModulesCheckbox = page.locator(
      '//*[@id="pv_id_10_content"]/div/div[1]/div[1]/table/thead/tr/th[1]/div/div/input'
    );
    const saveAccessButton = page.getByRole("button", { name: "Save" });
    const saveConfirmButton = page
      .getByRole("alertdialog", { name: "Confirmation" })
      .getByLabel("Save");
    const successEditText = page.getByText("You have accepted").nth(1);

    searchFieldUser.fill(empNo);
    await editButton.click();
    await bulkAccessModulesCheckbox.click();
    await saveAccessButton.click();
    await saveConfirmButton.click();
    await successEditText.isVisible();
  });

  test("E-PAYROLL_SETTINGS_030", async ({ page }) => {
    goToLink(page, "user-access");
    await page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const editButton = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[6]/button'
    );
    const searchFieldUser = page.getByRole("textbox", { name: "Search" });
    const empNo = "03-12456";
    const filterAccessModules = page
      .getByRole("region", { name: "Access" })
      .getByLabel("Rows per page");
    const optionValues = ["20", "50"];

    searchFieldUser.fill(empNo);
    await editButton.click();

    for (const value of optionValues) {
      await filterAccessModules.click();
      const option = page.getByRole("option", { name: value });
      await option.click();
      await page.waitForTimeout(500);
    }
  });
});
