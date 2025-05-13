import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class PayrollManagerPage {
  readonly Page;
  readonly payrollSearchField: Locator;
  readonly payrollCreateButton: Locator;
  readonly payrollGroup: Locator;
  readonly payrollGroupVal: Locator;
  readonly fundSource: Locator;
  readonly fundSourceVal: Locator;

  readonly employmentType: Locator;
  readonly employmentTypeVal: Locator;

  readonly yearStart: Locator;
  readonly yearStartVal: Locator;

  readonly claimType: Locator;
  readonly claimTypeVal: Locator;

  readonly month: Locator;
  readonly monthVal: Locator;
  readonly batch: Locator;
  readonly batchVal: Locator;

  readonly cutOff: Locator;
  readonly cutOffVal: Locator;

  readonly createPayrollBtn: Locator;
  readonly bulkCheckOfEmployee: Locator;
  readonly createPayrollModal: Locator;

  readonly viewButtonPayrollLocator: Locator;
  readonly viewButtonPayroll: Locator;

  readonly generatePayrollButton: Locator;

  readonly deleteButtonPayrollLocator: Locator;
  readonly deleteButtonPayroll: Locator;
  readonly deleteButtonInDialog: Locator;
  readonly errorTextDeletion: Locator;
  readonly errorTextDeletionField: Locator;

  readonly randomMonth: string = faker.date.month();

  readonly overstatedSalaryRightClick: Locator;
  readonly overstatedSalaryMenuItem: Locator;
  readonly overstatedSalaryField: Locator;
  readonly overstatedSalarySaveBttn: Locator;
  readonly overstatedSalarySuccessMsg: Locator;
  readonly overstatedSalaryErrorMsg: Locator;

  readonly understatedSalaryRightClick: Locator;
  readonly understatedSalaryMenuItem: Locator;
  readonly understatedSalaryField: Locator;
  readonly understatedSalarySaveBttn: Locator;
  readonly understatedSalarySuccessMsg: Locator;
  readonly understatedSalaryErrorMsg: Locator;

  readonly minIndexNth = 1;
  readonly maxIndexNth = 10;

  readonly minMoney = 100;
  readonly maxMoney = 200;

  readonly randomIndexNth = faker.number.int({
    min: this.minIndexNth,
    max: this.maxIndexNth,
  });

  readonly randomValueMoney = faker.number.int({
    min: this.minMoney,
    max: this.maxMoney,
  });

  constructor(page: Page) {
    this.Page = page;
    this.payrollSearchField = page.getByPlaceholder("Payroll Code");
    this.payrollCreateButton = page.getByRole("button", {
      name: "Create",
    });

    this.payrollGroup = page.locator("#prGroup");
    this.payrollGroupVal = page.getByRole("option", {
      name: "POLICY AND PLANS DIVISION",
    });
    this.fundSource = page.locator("#FundSource");
    this.fundSourceVal = page.getByRole("option", { name: "ICTMS" });
    this.employmentType = page.locator("#EmploymentType");
    this.employmentTypeVal = page.getByRole("option", {
      name: "CONTRACT OF SERVICE",
    });
    this.yearStart = page.locator("#pv_id_9 #year");
    this.yearStartVal = page.getByRole("option", { name: "2025" });

    this.claimType = page.locator("#pv_id_10 #year");
    this.claimTypeVal = page.getByRole("option", { name: "Salary" });

    this.month = page.locator("#month");
    this.monthVal = page.getByRole("option", { name: this.randomMonth });

    this.batch = page.locator("#batch");
    this.batchVal = page.getByRole("option", { name: "00" });

    this.cutOff = page.locator("//*[@id=cutOff]");
    this.cutOffVal = page.getByRole("option", { name: "1-15" });

    this.createPayrollBtn = page.getByRole("button", {
      name: "Create Payroll",
    });

    this.bulkCheckOfEmployee = page
      // .getByRole("row", { name: "All items unselected Name" })
      .locator(
        "xpath=/html/body/div[2]/div/div[2]/div[1]/div[1]/table/thead/tr/th[1]/div/div/input"
      );
    //.first();

    this.createPayrollModal = page.getByRole("button", {
      name: "Create Payroll",
    });

    this.viewButtonPayrollLocator = page
      .locator("tr")
      .filter({ hasText: "PPD-ICTMS-COS-2025-SAL-01-00" })
      .first();
    this.viewButtonPayroll = this.viewButtonPayrollLocator.getByLabel("View");

    this.generatePayrollButton = page.getByRole("button", { name: "Generate" });

    this.deleteButtonPayrollLocator = page
      .locator("tr")
      .filter({ hasText: "PPD-ICTMS-COS-2025-SAL-09-00" })
      .first();
    this.deleteButtonPayroll =
      this.deleteButtonPayrollLocator.getByLabel("Delete");

    this.deleteButtonInDialog = page
      .getByRole("dialog", { name: "Delete Payroll" })
      .getByLabel("Delete");

    this.errorTextDeletion = page.getByText("Please enter reason for deletion");
    this.errorTextDeletionField = page
      .getByRole("dialog", { name: "Delete Payroll" })
      .getByRole("textbox");

    this.overstatedSalaryRightClick = page
      .getByRole("cell", { name: /^\d+$/ })
      .nth(this.randomIndexNth);
    this.overstatedSalaryMenuItem = page
      .getByRole("menuitem", { name: "Add Overstated Salary" })
      .locator("a");

    this.overstatedSalaryField = page.locator(
      "xpath=/html/body/div[2]/div/div[2]/div[1]/span/input"
    );
    this.overstatedSalarySaveBttn = page.getByRole("button", { name: "Save" });
    this.overstatedSalarySuccessMsg = page.getByText(
      "Overstated Salary successfully updated."
    );

    this.overstatedSalaryErrorMsg = page
      .locator("div")
      .filter({ hasText: /^No amount has been specified\.$/ })
      .nth(1);

    this.understatedSalaryRightClick = page
      .getByRole("cell", { name: /^\d+$/ })
      .nth(this.randomIndexNth);

    this.understatedSalaryMenuItem = page
      .getByRole("menuitem", { name: "Add Understated Salary" })
      .locator("a");

    this.understatedSalaryField = page.locator(
      "xpath=/html/body/div[2]/div/div[2]/div[1]/span/input"
    );
    this.understatedSalarySaveBttn = page.getByRole("button", { name: "Save" });
    this.understatedSalarySuccessMsg = page.getByText(
      "Understated Salary successfully updated."
    );
    this.understatedSalaryErrorMsg = page
      .locator("div")
      .filter({ hasText: /^No amount has been specified\.$/ })
      .nth(1);
  }

  async verifyPayrollManagerPage() {
    await expect(this.Page).toHaveURL(/.*\/payroll-management.*/);
    await this.Page.waitForTimeout(2000);
  }

  async searchSpecificPayroll() {
    await this.payrollSearchField.fill("PPD");
    await this.Page.waitForTimeout(2000);
  }

  async viewCreatePayrollModal() {
    await this.payrollCreateButton.click();
    await this.Page.waitForTimeout(2000);
  }

  async createPayroll() {

    await this.payrollCreateButton.click();

    await this.Page.locator("#prGroup").click();
    await this.Page.getByRole("searchbox").fill("POLI");
    await this.Page.getByRole("option", {
      name: "POLICY AND PLANS DIVISION",
    }).click();

    await this.Page.locator("#FundSource").click();
    await this.Page.getByRole("option", { name: "ICTMS" }).click();
    await this.Page.locator("#EmploymentType").click();
    await this.Page.getByRole("searchbox").fill("CON");
    await this.Page.getByRole("option", {
      name: "CONTRACT OF SERVICE",
    }).click();
    await this.Page.locator("#cutOff").click();
    await this.Page.getByRole("option", { name: "1-15" }).click();
    await this.Page.locator("#pv_id_9 #year").click();
    await this.Page.getByRole("searchbox").fill("2025");
    await this.Page.getByRole("option", { name: "2025" }).click();

    await this.Page.locator("#pv_id_10 #year").click();
    await this.Page.getByRole("option", { name: "Salary" }).click();

    await this.month.waitFor({ state: "visible" });
    await this.month.click();
    await this.monthVal.click();
    await this.Page.locator("#batch").click();
    await this.Page.getByRole("option", { name: "00" }).click();
    await this.createPayrollBtn.waitFor({ state: "visible"});
    await this.createPayrollBtn.click();

    await this.bulkCheckOfEmployee.waitFor({
      state: "visible",
    });
    await this.bulkCheckOfEmployee.click();

    await this.createPayrollModal.waitFor({ state: "visible"});
    await this.createPayrollModal.click();
    await this.Page.waitForTimeout(2000);
  }

  async skipCreatePayrollRequiredFields() {
    await this.payrollCreateButton.click();
    await this.payrollGroup.click();
    await this.payrollGroupVal.click();

    await this.fundSource.click();
    await this.fundSourceVal.click();

    await this.employmentType.click();
    await this.employmentTypeVal.click();

    await this.yearStart.click();
    await this.yearStartVal.click();

    await this.claimType.click();
    await this.claimTypeVal.click();

    await this.createPayrollBtn.click();
    await this.Page.waitForTimeout(2000);
  }

  async viewExisitingPayrollModal() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();
    await this.Page.waitForTimeout(2000);
  }

  async downloadPayrollSummary() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();
    await this.generatePayrollButton.click();
    await this.Page.waitForTimeout(2000);
  }

  async deleteExistingPayroll() {
    
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-09-00");
    await this.deleteButtonPayroll.click();
    await this.errorTextDeletion.isVisible();
    await this.errorTextDeletionField.fill("Testing Deletion");
    await this.deleteButtonInDialog.click();
    
    await this.Page.waitForTimeout(2000);
  }

  async viewOverstatedSalaryModal() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();

    await this.overstatedSalaryRightClick.click({
      button: "right",
    });
    await this.overstatedSalaryMenuItem.click();
    await this.Page.waitForTimeout(2000);
  }

  async fillUpOverstatedSalaryModal() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();

    await this.overstatedSalaryRightClick.click({
      button: "right",
    });
    await this.overstatedSalaryMenuItem.click();

    await this.overstatedSalaryField.click();
    await this.overstatedSalaryField.fill("");
    await this.overstatedSalaryField.focus();
    await this.overstatedSalaryField.pressSequentially(
      this.randomValueMoney.toString()
    );
    await this.overstatedSalaryField.press("Tab");
    await this.overstatedSalarySaveBttn.click();
    await this.overstatedSalarySuccessMsg.isVisible();
    await this.Page.waitForTimeout(2000);
  }

  async skipOverstatedSalaryRequiredFields() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();

    await this.overstatedSalaryRightClick.click({
      button: "right",
    });
    await this.overstatedSalaryMenuItem.click();

    await this.overstatedSalaryField.click();
    await this.overstatedSalaryField.fill("");
    await this.overstatedSalaryField.focus();
    await this.overstatedSalarySaveBttn.click();
    await this.overstatedSalaryErrorMsg.isVisible();
    await this.Page.waitForTimeout(2000);
  }

  async viewUnderstatedSalaryModal() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();

    await this.understatedSalaryRightClick.click({
      button: "right",
    });
    await this.understatedSalaryMenuItem.click();
  }

  async fillUpUnderstatedSalaryModal() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();

    await this.understatedSalaryRightClick.click({
      button: "right",
    });
    await this.understatedSalaryMenuItem.click();
    await this.understatedSalaryField.click();
    await this.understatedSalaryField.fill("");
    await this.understatedSalaryField.focus();
    await this.understatedSalaryField.pressSequentially(
      this.randomValueMoney.toString()
    );
    await this.understatedSalaryField.press("Tab");
    await this.understatedSalarySaveBttn.click();
    await this.understatedSalarySuccessMsg.isVisible();
    await this.Page.waitForTimeout(2000);
  }

  async skipUnderstatedSalaryRequiredFields() {
    await this.payrollSearchField.fill("PPD-ICTMS-COS-2025-SAL-01-00");
    await this.viewButtonPayroll.click();

    await this.understatedSalaryRightClick.click({
      button: "right",
    });
    await this.understatedSalaryMenuItem.click();
    await this.understatedSalaryField.click();
    await this.understatedSalaryField.fill("");
    await this.understatedSalaryField.press("Tab");
    await this.understatedSalarySaveBttn.click();
    await this.understatedSalaryErrorMsg.isVisible();
    await this.Page.waitForTimeout(2000);
  }
}
