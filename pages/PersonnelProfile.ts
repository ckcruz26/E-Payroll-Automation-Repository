import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class PersonnelProfile {
  readonly Page;
  readonly searchFieldSurname: Locator;
  readonly searchFieldFirstName: Locator;
  readonly searchFieldMiddleName: Locator;

  readonly searchFieldNameArr: Array<string> = [
    "ABAD",
    "EDDIE BOY",
    "CATACUTAN",
  ];

  readonly optionalDeductionNameArr: Array<string> = [
    "Landbank Salary Loan",
    "MABF Loan",
    "MABF Membership Fee",
    "MABF Quarterly Dues",
    "MBA Educational Loan",
    "MBA Emergency Loan",
    "MBA Livelihood Loan",
    "MBA Membership Fee",
    "MBA Salary Loan",
    "Pabahay Loan",
  ];

  readonly searchPayrollGroupDropdown: Locator;
  readonly searchPayrollGroupDropdownValue: Locator;
  readonly searchFundSourceDropdown: Locator;
  readonly searchFundSourceDropdownValue: Locator;
  readonly searchEmploymentStatusDropdown: Locator;
  readonly searchEmploymentStatusDropdownValue: Locator;

  readonly searchButton: Locator;
  readonly summaryDownload: Locator;

  readonly deductionModalView: Locator;

  readonly phic: Locator;
  readonly pagibig: Locator;
  readonly hdmf_mp2: Locator;
  readonly sweap_mpc_premium: Locator;
  readonly healthcard: Locator;
  readonly sss: Locator;

  readonly saveButton: Locator;
  readonly messageSuccess: Locator;
  readonly optionalDeductionBttn: Locator;

  readonly deductionTypeOption: Locator;
  readonly deductionTypeOptionValue: Locator;
  readonly totalAmountValue: Locator;
  readonly monthlyDeduction: Locator;
  readonly buttonSaveOptionalDeduction: Locator;

  readonly minMoney = 100;
  readonly maxMoney = 200;

  readonly minIndex = 0;
  readonly maxIndex = this.optionalDeductionNameArr.length - 1;

  readonly randomIndex = faker.number.int({
    min: this.minIndex,
    max: this.maxIndex,
  });

  readonly randomValueMoney = faker.number.int({
    min: this.minMoney,
    max: this.maxMoney,
  });

  // readonly monthsArr: Array<string> = [
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // readonly yearsArr: Array<string> = ["2025", "2026"];

  constructor(page: Page) {
    this.Page = page;

    this.searchFieldSurname = page
      .locator("div")
      .filter({ hasText: /^Surname$/ })
      .getByRole("textbox");
    this.searchFieldFirstName = page
      .locator("div")
      .filter({ hasText: /^First Name$/ })
      .getByRole("textbox");
    this.searchFieldMiddleName = page
      .locator("div")
      .filter({ hasText: /^Middle Name$/ })
      .getByRole("textbox");

    this.searchPayrollGroupDropdown = page
      .locator("#pv_id_4")
      .getByRole("combobox", {
        name: "Please select",
      });
    this.searchPayrollGroupDropdownValue = page.getByRole("option", {
      name: "POLICY AND PLANS DIVISION",
    });

    this.searchFundSourceDropdown = page
      .locator("#pv_id_5")
      .getByRole("combobox", {
        name: "Please select",
      });
    this.searchFundSourceDropdownValue = page.getByRole("option", {
      name: "ICTMS",
    });

    this.searchEmploymentStatusDropdown = page
      .locator("#pv_id_6")
      .getByRole("combobox", {
        name: "Please select",
      });

    this.searchEmploymentStatusDropdownValue = page.getByRole("option", {
      name: "CONTRACT OF SERVICE",
    });

    this.searchButton = page.getByRole("button", { name: "Search" });
    this.summaryDownload = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[1]/div[4]/div[1]/button'
    );

    this.deductionModalView = page.getByRole("button", { name: "Deductions" });
    this.phic = page.locator("//span[@id='phic']//input[@id='minmaxfraction']");
    this.pagibig = page.locator("#pagibig #minmaxfraction");
    this.hdmf_mp2 = page.locator("#hdmf_mp2 #minmaxfraction");
    this.sweap_mpc_premium = page.locator("#sweap_mpc_premium #minmaxfraction");
    this.healthcard = page.locator("#healthcard #minmaxfraction");
    this.sss = page.locator("#sss #minmaxfraction");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.messageSuccess = page.getByText("Deductions saved").nth(1);

    this.optionalDeductionBttn = page.getByRole("button", {
      name: "Optional Deductions",
    });
    this.deductionTypeOption = page
      .getByRole("dialog", { name: "Optional Deductions" })
      .getByLabel("Please select");
    this.deductionTypeOptionValue = page.getByRole("option", {
      name: this.optionalDeductionNameArr[this.randomIndex],
    });
    this.totalAmountValue = page
      .locator("div")
      .filter({ hasText: /^Total Amount \*$/ })
      .locator("#minmaxfraction");
    this.monthlyDeduction = page
      .locator("div")
      .filter({ hasText: /^Monthly Deduction \*$/ })
      .locator("#minmaxfraction");

    this.buttonSaveOptionalDeduction = page
      .getByRole("dialog", { name: "Optional Deductions" })
      .getByLabel("Save");
  }

  async verifyPersonnelProfilePage() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.Page.waitForTimeout(2000);
  }

  async searchEmployeeByFullName() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.searchFieldSurname.fill(this.searchFieldNameArr[0]);
    await this.searchFieldFirstName.fill(this.searchFieldNameArr[1]);
    await this.searchFieldMiddleName.fill(this.searchFieldNameArr[2]);
    await this.searchButton.click();
    await this.Page.waitForTimeout(2000);
  }

  async searchEmployeesByPayrollGroup() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.searchPayrollGroupDropdown.click();
    await this.searchPayrollGroupDropdownValue.click();
  }

  async searchEmployeesByFundSource() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.searchFundSourceDropdown.click();
    await this.searchFundSourceDropdownValue.click();
  }

  async searchEmployeesByEmploymentStatus() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.searchEmploymentStatusDropdown.click();
    await this.searchEmploymentStatusDropdownValue.click();
  }

  async downloadSummary() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.summaryDownload.click();
    await this.Page.waitForTimeout(2000);
  }

  async deductionModal() {
    await expect(this.Page).toHaveURL(/.*\/personnel-management.*/);
    await this.searchFieldFirstName.fill(this.searchFieldNameArr[1]);
    await this.searchButton.click();
    await this.deductionModalView.click();
    await this.Page.waitForTimeout(2000);
  }

  async inputDeduction() {
    await this.searchFieldFirstName.fill(this.searchFieldNameArr[1]);
    await this.searchButton.click();
    await this.deductionModalView.click();

    await this.phic.fill(this.randomValueMoney.toString());
    await this.pagibig.fill(this.randomValueMoney.toString());
    await this.hdmf_mp2.fill(this.randomValueMoney.toString());
    await this.sweap_mpc_premium.fill(this.randomValueMoney.toString());
    await this.healthcard.fill(this.randomValueMoney.toString());
    await this.sss.fill(this.randomValueMoney.toString());
    await this.saveButton.click();
    await this.Page.waitForTimeout(2000);
    await this.messageSuccess.waitFor({ state: "visible" });
  }

  async clearDeductions() {
    await this.searchFieldFirstName.fill(this.searchFieldNameArr[1]);
    await this.searchButton.click();
    await this.deductionModalView.click();

    await this.phic.fill("");
    await this.pagibig.fill("");
    await this.hdmf_mp2.fill("");
    await this.sweap_mpc_premium.fill("");
    await this.healthcard.fill("");
    await this.sss.fill("");
    await this.Page.waitForTimeout(2000);
    await this.messageSuccess.waitFor({ state: "visible" });
  }

  async optionalDeductionsView() {
    await this.searchFieldFirstName.fill(this.searchFieldNameArr[1]);
    await this.searchButton.click();
    await this.deductionModalView.click();
    await this.optionalDeductionBttn.click();
  }

  async inputOptionalDeductions() {
    console.log(">>> Starting inputOptionalDeductions");

    // Step 1: Search and open modal
    await this.searchFieldFirstName.waitFor({ state: "visible" });
    await this.searchFieldFirstName.fill(this.searchFieldNameArr[1]);
    await this.searchButton.click();

    await this.deductionModalView.waitFor({ state: "visible" });
    await this.deductionModalView.click();

    // Step 2: Open optional deduction section
    await this.optionalDeductionBttn.waitFor({ state: "visible" });
    await this.optionalDeductionBttn.click();

    // Step 3: Select deduction type
    await this.deductionTypeOption.waitFor({ state: "visible" });
    await this.deductionTypeOption.click();

    await this.deductionTypeOptionValue.waitFor({ state: "visible" });
    await this.deductionTypeOptionValue.click();

    // Step 4: Enter total amount
    await this.totalAmountValue.waitFor({ state: "visible" });
    await this.totalAmountValue.click();
    await this.totalAmountValue.pressSequentially(
      this.randomValueMoney.toString()
    );
    await this.totalAmountValue.press("Tab");

    // Step 5: Enter monthly deduction
    await this.monthlyDeduction.waitFor({ state: "visible" });
    await this.monthlyDeduction.click();
    await this.monthlyDeduction.pressSequentially(
      this.randomValueMoney.toString()
    );
    await this.monthlyDeduction.press("Tab");

    // Step 1: Open the first date picker and select the start date
    //start
    // await this.Page.locator("xpath=//*[@id='pv_id_22']/button").getByRole("button", { name: "Choose Date" }).click();
    // await this.Page.getByRole("gridcell", { name: "16" }).click();
    //end
   // await this.Page.locator("xpath=//*[@id='pv_id_23']/button").click();
    // await this.Page.getByRole('gridcell', { name: '23' }).click();
    
    await this.Page.evaluate(() => {
      const inputs = document.querySelectorAll('.p-datepicker-input');
      const targetInput = Array.from(inputs).find(i => i.getAttribute('aria-expanded') === 'true') as HTMLInputElement;
    
      if (targetInput) {
        targetInput.value = '2025-04-14'; // Use the format accepted by your datepicker
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    
    // Step 8: Save
    await this.buttonSaveOptionalDeduction.waitFor({ state: "visible" });
    await this.buttonSaveOptionalDeduction.click();

    console.log(">>> inputOptionalDeductions completed");
  }
}
//*[@id="pv_id_22"]/button
