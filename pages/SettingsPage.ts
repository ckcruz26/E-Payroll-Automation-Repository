import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

export class SettingsPage {
  readonly Page;

  readonly page: Page;

  readonly employmentTypes: string[];
  readonly employmentType: string;
  readonly randomNumber: number;
  readonly deductionName: string;
  readonly salaryTableName: string;

  readonly regexSalaryTable: RegExp;
  readonly regexSalaryTableMOA: RegExp;
  readonly regexDeductionName: RegExp;

  readonly minMoney = 10000;
  readonly maxMoney = 15000;
  readonly randomValueMoney: number;
  readonly randomValuePercent: number;

  readonly searchUserRelevantData: string[];
  readonly searchDeductionTypesArr: string[];

  //locators
  tableFlag: number = 0;
  readonly searchFieldName: Locator;
  readonly selectorVisibility: Locator;

  readonly createSalaryGradeBttn: Locator;
  readonly createSalaryGradeTxt: Locator;
  readonly nameSalaryGradeField: Locator;

  readonly elementLocatorsToClick: Locator[] = [];

  readonly salaryGradeTableLocator: Locator;
  readonly salaryGradeEdit: Locator;

  constructor(page: Page) {
    this.page = page;

    this.employmentTypes = ["MOA", "Permanent"];
    this.searchDeductionTypesArr = [
      "SWEAP",
      "Pagibig MPL",
      "MBA Membership Fee",
      "Landbank Salary Loan",
    ];
    this.employmentType = faker.helpers.arrayElement(this.employmentTypes);
    this.randomNumber = faker.number.int({ min: 1, max: 6 });
    this.deductionName = `Deduction Type - ${this.randomNumber} Dummy Test`;
    this.salaryTableName = `Salary Table - ${this.employmentType} Dummy ${this.randomNumber} Test`;

    this.regexSalaryTable = /Salary Table - (MOA|Permanent) Dummy \d+ Test/;
    this.regexSalaryTableMOA = /Salary Table - MOA Dummy \d+ Test/;

    this.regexDeductionName = /Deduction Type - \d+ Dummy Test/;

    this.randomValueMoney = faker.number.int({
      min: this.minMoney,
      max: this.maxMoney,
    });

    this.randomValuePercent = faker.number.int({ min: 1, max: 5 });
    this.searchUserRelevantData = [
      "03-11329",
      "ABAD",
      "ANGELICA",
      "TABANGAY",
      "IO1",
    ];

    this.searchFieldName = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[1]/div[2]/div[1]/input'
    );

    this.selectorVisibility = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

    this.createSalaryGradeTxt = page.getByText("Create Salary Grade Table");
    this.createSalaryGradeBttn = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[1]/div[2]/div[2]/button'
    );

    this.nameSalaryGradeField = page.getByRole("textbox", {
      name: "Input Salary Grade Table Name",
    });

    this.elementLocatorsToClick = [
      page.getByRole("combobox", { name: "Select Year" }),
      page.getByRole("option", { name: "2025" }),
      page.getByRole("combobox", { name: "Select Employment Type" }),
      page.getByRole("option", { name: "COS, JO" }),
      page
        .getByRole("dialog", { name: "Create Salary Grade Table" })
        .getByLabel("Create"),
    ];

    this.salaryGradeTableLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    this.salaryGradeEdit = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[5]/div/button'
    );
  }

  async verifyAuditTrailPage() {
    await expect(this.page).toHaveURL(/.*\/audit-trail.*/);
  }

  async verifySettingsPage() {
    await expect(this.page).toHaveURL(/.*\/salary-grade.*/);
    await this.page.waitForTimeout(2000);
  }

  async searchSalaryGrade(salaryGrade: string) {
    await this.searchFieldName.fill(salaryGrade);
    await this.page.waitForTimeout(2000);
  }

  async visibilityCreateSalaryGradeTblModal() {
    await this.createSalaryGradeBttn.isVisible();
    await this.createSalaryGradeBttn.click();
    await expect(this.createSalaryGradeTxt).toBeVisible();
  }

  async createSalaryGradeTranch() {
    await this.createSalaryGradeBttn.click();
    await this.nameSalaryGradeField.fill(this.salaryTableName);
    await this.page.waitForTimeout(2000);

    for (const el of this.elementLocatorsToClick) {
      await el.click();
      await this.page.waitForTimeout(2000);
    }
  }
  async skipRequiredFieldsSalaryGrade() {
    await this.createSalaryGradeBttn.click();
    await this.nameSalaryGradeField.fill("");
    await this.page.waitForTimeout(2000);

    for (const el of this.elementLocatorsToClick) {
      await el.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async viewSalaryGradeTable() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td',
      { state: "visible" }
    );
    const salaryGradeRows = await this.salaryGradeTableLocator.count();

    for (let i = 0; i < salaryGradeRows; i++) {
      const row = this.salaryGradeTableLocator.nth(i);
      const cellText = await row.innerText();

      if (
        cellText.includes("Salary Grade Table | Plantilla") ||
        cellText.includes("Salary Grade Table | MOA")
      ) {
        await this.salaryGradeEdit.click();
        break;
      }
    }
  }

  async salaryGradeTableEdit() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td',
      { state: "visible" }
    );

    const salaryGradeRows = await this.salaryGradeTableLocator.count();

    for (let i = 0; i < salaryGradeRows; i++) {
      const row = this.salaryGradeTableLocator.nth(i);
      const cellText = await row.innerText();

      if (cellText.match(this.regexSalaryTableMOA)) {
        const salaryGradeEdit = this.page
          .locator(
            `xpath=//table//tr[td[contains(normalize-space(), "${cellText}")]]`
          )
          .first() // ← this ensures only the first matching row is used
          .locator(`xpath=.//button[.//span[contains(text(), "Edit")]]`);

        await salaryGradeEdit.click();
        this.tableFlag = 1;
        this.salaryGradeTableEditFormOne();
      }
    }
  }

  async salaryGradTableEditSkipRequiredFields() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td',
      { state: "visible" }
    );

    const salaryGradeRows = await this.salaryGradeTableLocator.count();

    for (let i = 0; i < salaryGradeRows; i++) {
      const row = this.salaryGradeTableLocator.nth(i);
      const cellText = await row.innerText();

      if (cellText.match(this.regexSalaryTableMOA)) {
        const salaryGradeEdit = this.page
          .locator(
            `xpath=//table//tr[td[contains(normalize-space(), "${cellText}")]]`
          )
          .first() // ← this ensures only the first matching row is used
          .locator(`xpath=.//button[.//span[contains(text(), "Edit")]]`);

        await salaryGradeEdit.click();
        this.tableFlag = 1;
        this.salaryGradeTableEditFormTow();
      }
    }
  }

  async salaryGradeTableEditFormOne() {
    if (this.tableFlag == 1) {
      const clickEditSpecificGradeMOA = this.page.locator(
        `//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[${this.randomNumber}]/td[6]/button`
      );
      const baseRateMOAField = this.page.locator('//*[@id="step1"]/input');
      const premiumPercentageField = this.page.locator(
        '//*[@id="premium"]/input'
      );

      const saveButtonSalaryGrade = this.page.locator(
        "xpath=/html/body/div[2]/div/div[2]/div[4]/button[2]"
      );
      const verifySaveChangeText = this.page.getByText(
        "Are you sure you want to proceed?"
      );
      const saveButtonSG = this.page.getByRole("button", { name: "Yes" });
      const modalSuccess = this.page.getByText("Salary Grade updated");

      const stringValueMoney = this.randomValueMoney.toString();

      await clickEditSpecificGradeMOA.click();
      await baseRateMOAField.clear();

      await baseRateMOAField.click();
      await baseRateMOAField.fill("");
      await baseRateMOAField.focus();
      await baseRateMOAField.pressSequentially(stringValueMoney);
      await baseRateMOAField.press("Tab");

      await premiumPercentageField.click();
      await premiumPercentageField.fill("");
      await premiumPercentageField.focus();
      await premiumPercentageField.pressSequentially(
        String(this.randomValuePercent)
      );
      await baseRateMOAField.press("Tab");

      await saveButtonSalaryGrade.click();
      await verifySaveChangeText.isVisible();
      await saveButtonSG.click();
      await modalSuccess.isVisible();
      await this.page.waitForTimeout(1000);
    }
  }

  async salaryGradeTableEditFormTow() {
    if (this.tableFlag == 1) {
      const clickEditSpecificGradeMOA = this.page.locator(
        `//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[${this.randomNumber}]/td[6]/button`
      );

      const baseRateMOAField = this.page.locator('//*[@id="step1"]/input');

      const saveButtonSalaryGrade = this.page.locator(
        "xpath=/html/body/div[2]/div/div[2]/div[4]/button[2]"
      );

      const verifySaveChangeText = this.page.getByText(
        "Are you sure you want to proceed?"
      );

      const modalErrMsg = this.page
        .locator("div")
        .filter({ hasText: /^Please fill-up all required fields$/ })
        .nth(1);

      await clickEditSpecificGradeMOA.click();
      await baseRateMOAField.click();
      await baseRateMOAField.focus();
      await baseRateMOAField.pressSequentially("");
      await baseRateMOAField.press("Tab");
      await this.page.waitForTimeout(1000);
      await saveButtonSalaryGrade.click();
      await verifySaveChangeText.isVisible();
      await modalErrMsg.isVisible();
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyDeductionTypesPage() {
    await expect(this.page).toHaveURL(/.*\/deduction-types.*/);
  }

  async searchDeductionTypes() {
    const searchFieldDeductions = this.page.getByRole("textbox");
    const searchButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[1]/div[4]/div[2]/button[1]'
    );

    for (const searchDeduction of this.searchDeductionTypesArr) {
      await searchFieldDeductions.fill(searchDeduction);
      await this.page.waitForTimeout(500);
      await searchButton.click();
    }
  }

  async viewTheDeductionForm() {
    const createDeductionButton = this.page.getByRole("button", {
      name: "Create",
    });
    const addDeductionModalHeader = this.page.getByText("Add Deduction");

    await createDeductionButton.click();
    await addDeductionModalHeader.isVisible();
  }

  async addDeductionType() {
    const createDeductionButton = this.page.getByRole("button", {
      name: "Create",
    });
    const dialogAddDeductionNameField = this.page
      .getByRole("dialog", { name: "Add Deduction" })
      .getByRole("textbox");
    const deductionSuccessMessage = this.page.getByText(
      "Information has been saved"
    );

    await createDeductionButton.click();
    await dialogAddDeductionNameField.fill(this.deductionName);
    await this.page.getByRole("combobox", { name: "Active" }).click();
    await this.page.getByRole("option", { name: "Inactive" }).click();
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page
      .getByRole("alertdialog", { name: "Confirmation" })
      .getByLabel("Save")
      .click();
    await deductionSuccessMessage.click();
  }

  async skipRequiredFieldsDeductionType() {
    const createDeductionButton = this.page.getByRole("button", {
      name: "Create",
    });
    const saveButtonDeduction = this.page.getByRole("button", { name: "Save" });
    const alertDialogSaveButton = this.page
      .getByRole("alertdialog", { name: "Confirmation" })
      .getByLabel("Save");
    const allRequiredFieldsMsg = this.page.getByText("All fields are required");

    await createDeductionButton.click();
    await saveButtonDeduction.click();
    await alertDialogSaveButton.click();
    await allRequiredFieldsMsg.isVisible();
    await this.page.waitForTimeout(2000);
  }

  async viewEditFormDeductionType() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.match(this.regexDeductionName)) {
        await editButton.click();
        break;
      }
    }
  }

  async editDeductionType() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.match(this.regexDeductionName)) {
        await editButton.click();
        this.tableFlag = 1;
        await this.editDeductionTypeFormOne();
        break;
      }
    }
  }

  async editDeductionTypeSkipRequiredFields() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.match(this.regexDeductionName)) {
        await editButton.click();
        this.tableFlag = 1;
        await this.editDeductionTypeFormTwo();
        break;
      }
    }
  }

  async editDeductionTypeStatus() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const dueductionCells = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const rowsCount = await dueductionCells.count();
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[4]/button'
    );

    for (var i = 0; i < rowsCount; i++) {
      const rowLocator = dueductionCells.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.match(this.regexDeductionName)) {
        await editButton.click();
        this.tableFlag = 1;
        await this.editDeductionTypeStatusFormThree();
        break;
      }
    }
  }

  async editDeductionTypeFormOne() {
    if (this.tableFlag == 1) {
      const deductionEditNameField = this.page
        .getByRole("dialog", { name: "Edit Deduction" })
        .getByRole("textbox");
      const dialogStatusDeductionStatusDropdownBox = this.page.getByRole(
        "combobox",
        { name: "Active" }
      );
      const dialogStatusDeductionStatusValue = this.page.getByRole("option", {
        name: "Inactive",
      });
      const editDialogSaveButton = this.page.getByRole("button", {
        name: "Save",
      });
      const alertDialogSaveButton = this.page
        .getByRole("alertdialog", { name: "Confirmation" })
        .getByLabel("Save");
      const textUpdate = this.page.getByText("Information has been saved");

      await deductionEditNameField.click();
      await deductionEditNameField.fill(this.deductionName);
      await dialogStatusDeductionStatusDropdownBox.click();
      await dialogStatusDeductionStatusValue.click();
      await editDialogSaveButton.click();
      await alertDialogSaveButton.click();
      await textUpdate.isVisible();
    }
  }

  async editDeductionTypeFormTwo() {
    if (this.tableFlag == 1) {
      const deductionEditNameField = this.page
        .getByRole("dialog", { name: "Edit Deduction" })
        .getByRole("textbox");
      const dialogStatusDeductionStatusDropdownBox = this.page.getByRole(
        "combobox",
        { name: "Active" }
      );
      const dialogStatusDeductionStatusValue = this.page.getByRole("option", {
        name: "Inactive",
      });
      const editDialogSaveButton = this.page.getByRole("button", {
        name: "Save",
      });
      const alertDialogSaveButton = this.page
        .getByRole("alertdialog", { name: "Confirmation" })
        .getByLabel("Save");
      const errorText = this.page.getByText("All fields are required");

      await deductionEditNameField.clear();
      await dialogStatusDeductionStatusDropdownBox.click();
      await dialogStatusDeductionStatusValue.click();
      await editDialogSaveButton.click();
      await alertDialogSaveButton.click();
      await errorText.isVisible();
    }
  }

  async editDeductionTypeStatusFormThree() {
    if (this.tableFlag == 1) {
      const dialogStatusDeductionStatusDropdownBox = this.page.getByRole(
        "combobox",
        { name: "Active" }
      );
      const dialogStatusDeductionStatusValue = this.page.getByRole("option", {
        name: "Inactive",
      });
      const editDialogSaveButton = this.page.getByRole("button", {
        name: "Save",
      });
      const alertDialogSaveButton = this.page
        .getByRole("alertdialog", { name: "Confirmation" })
        .getByLabel("Save");
      const textUpdate = this.page.getByText("Information has been saved");

      await dialogStatusDeductionStatusDropdownBox.click();
      await dialogStatusDeductionStatusValue.click();
      await editDialogSaveButton.click();
      await alertDialogSaveButton.click();
      await textUpdate.isVisible();
    }
  }

  async changeNumberDisplayByValues() {
    const filterDropdownBox = this.page.getByRole("combobox", {
      name: "Rows per page",
    });
    const optionValues = ["20", "50"];

    for (const value of optionValues) {
      await filterDropdownBox.click();
      const option = this.page.getByRole("option", { name: value });
      await option.click();
      await this.page.waitForTimeout(500);
    }
  }

  async downloadTemplateDeductions() {
    const downloadsDir = path.resolve(process.cwd(), "test-data/downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    const downloadTemplateButton = this.page.getByRole("button", {
      name: "Download Template",
    });
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      downloadTemplateButton.click(),
    ]);

    const savePath = path.resolve(downloadsDir, " deduction-template.xlsx");
    await download.saveAs(savePath);
  }

  async uploadDeductionsFile() {
    const fileInputButton = await this.page.locator('input[type="file"]');
    const clickStartUpload = this.page.getByRole("button", {
      name: "Start Upload",
    });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/deduction-types-contractual.csv"
    );

    const successIndicator = this.page
      .locator("div")
      .filter({ hasText: /^Success, deduction data has been uploaded$/ })
      .nth(1);

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.click();
    await successIndicator.isVisible();
  }

  async uploadInvalidDeductionsFile() {
    const fileInputButton = await this.page.locator('input[type="file"]');
    const clickStartUpload = this.page.getByRole("button", {
      name: "Start Upload",
    });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/testInvalid.txt"
    );
    const fileInputTextVisibility = this.page.getByText(
      `${path.basename(inputFileValue)}:`
    );

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.isDisabled();
    await fileInputTextVisibility.isVisible();
  }

  async downloadTemplateOptionalDeductions() {
    const downloadsDir = path.resolve(process.cwd(), "test-data/downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    const downloadTemplateButton = this.page.getByRole("button", {
      name: "Download Template",
    });
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      downloadTemplateButton.click(),
    ]);

    const savePath = path.resolve(
      downloadsDir,
      " optional-deduction-template.xlsx"
    );
    await download.saveAs(savePath);
  }

  async uploadOptionalDeductionsFile() {
    const fileInputButton = await this.page.locator('input[type="file"]');
    const clickStartUpload = this.page.getByRole("button", {
      name: "Start Upload",
    });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/optional_deduction1.csv"
    );
    const successIndicator = this.page
      .locator("div")
      .filter({ hasText: /^Success, deduction data has been uploaded$/ })
      .nth(1);

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.click();
    await successIndicator.isVisible();
  }

  async uploadInvalidOptionalDeductionsFile() {
    const fileInputButton = await this.page.locator('input[type="file"]');
    const clickStartUpload = this.page.getByRole("button", {
      name: "Start Upload",
    });
    const currentDir = __dirname;
    const parentDir = path.dirname(currentDir);
    const inputFileValue = path.resolve(
      parentDir + "/test-data/testInvalid.txt"
    );
    const fileInputTextVisibility = this.page.getByText(
      `${path.basename(inputFileValue)}:`
    );

    await fileInputButton.setInputFiles(inputFileValue);
    await clickStartUpload.isDisabled();
    await fileInputTextVisibility.isVisible();
  }

  async verifyUserAccessPage() {
    await expect(this.page).toHaveURL(/.*\/user-access.*/);
  }

  async changeNumberDisplayByValuesOfUserAccess() {
    const numberComboBox = this.page.getByRole("combobox", {
      name: "Rows per page",
    });
    const numberComboBoxVal = ["20", "50", "100"];

    for (const num of numberComboBoxVal) {
      await numberComboBox.click();
      const optionComboBox = this.page.getByRole("option", { name: num });

      await optionComboBox.click();
    }
  }

  async searchDataInUserAccess() {
    const searchFieldUser = this.page.getByRole("textbox", { name: "Search" });

    for (const data of this.searchUserRelevantData) {
      await searchFieldUser.fill(data);
      await this.page.waitForTimeout(1000);
    }
  }

  async viewUserAccess() {
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[6]/button'
    );
    const searchFieldUser = this.page.getByRole("textbox", { name: "Search" });
    const empNo = "03-12456";

    searchFieldUser.fill(empNo);
    await editButton.click();
  }

  async editUserAccess() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[6]/button'
    );
    const searchFieldUser = this.page.getByRole("textbox", { name: "Search" });
    const empNo = "03-12456";
    const bulkAccessModulesCheckbox = this.page.locator(
      '//*[@id="pv_id_10_content"]/div/div[1]/div[1]/table/thead/tr/th[1]/div/div/input'
    );
    const saveAccessButton = this.page.getByRole("button", { name: "Save" });
    const saveConfirmButton = this.page
      .getByRole("alertdialog", { name: "Confirmation" })
      .getByLabel("Save");
    const successEditText = this.page.getByText("You have accepted").nth(1);

    searchFieldUser.fill(empNo);
    await editButton.click();
    await bulkAccessModulesCheckbox.click();
    await saveAccessButton.click();
    await saveConfirmButton.click();
    await successEditText.isVisible();
  }

  async changeNumberDisplayByModuleOfUserAccess() {
    await this.page.waitForSelector(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );
    const editButton = this.page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[6]/button'
    );
    const searchFieldUser = this.page.getByRole("textbox", { name: "Search" });
    const empNo = "03-12456";
    const filterAccessModules = this.page
      .getByRole("region", { name: "Access" })
      .getByLabel("Rows per page");
    const optionValues = ["20", "50"];

    searchFieldUser.fill(empNo);
    await editButton.click();

    for (const value of optionValues) {
      await filterAccessModules.click();
      const option = this.page.getByRole("option", { name: value });
      await option.click();
      await this.page.waitForTimeout(500);
    }
  }
}
