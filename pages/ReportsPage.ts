import { Page, Locator, expect } from "@playwright/test";

export class ReportsPage {
  readonly Page;
  readonly clickReports: Locator;
  readonly searchField: Locator;
  readonly remittanceArr: Array<string> = ["Pag-ibig", "SSS", "Philhealth"];
  readonly cellsLocator: Locator;

  readonly generateButton: Locator;
  readonly modalMessageError: Locator;

  constructor(page: Page) {
    this.Page = page;

    this.searchField = page.getByPlaceholder("Search");

    this.generateButton = page.getByLabel("Generate");
    this.modalMessageError = page.locator(
      "div:nth-child(3) > div > .p-toast-message > .p-toast-message-content"
    );
  }

  async verifyReportsPage() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);
    await this.Page.waitForTimeout(2000);
  }

  async searchReports() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);

    for (const searchRemittance of this.remittanceArr) {
      await this.searchField.fill(searchRemittance);
      await this.Page.waitForTimeout(2000);
    }
  }

  async selectionOfRemittance() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);
    const pagIbigRemittanceMenu = this.Page.locator(
      `xpath=//table//tr[td//a[contains(., 'Pag-ibig Remittance')]]//a`
    );
    await pagIbigRemittanceMenu.click();
    await this.Page.waitForTimeout(2000);
  }
  //RESTRUCTURE TO POM: [CCRUZ] - ADD (04-08-2025) on hold script, due to the capturing of dropdown boxes
  async selectionOfPagIbig() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);

    const pagIbigRemittanceMenu = this.Page.locator(
      `xpath=//table//tr[td//a[contains(., 'Pag-ibig Remittance')]]//a`
    );

    const yearDropdown = this.Page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = this.Page.getByRole("option", { name: "2025" });
    const monthDropdown = this.Page.getByRole("combobox", {
      name: "Please select Month",
    });
    const monthOptionVal = this.Page.getByRole("option", { name: "January" });
    const employmentStatus = this.Page.getByRole("combobox", {
      name: "Please select Status",
    });
    const employmentStatusVal = this.Page.getByRole("option", {
      name: "Contract of Service / Job",
    });
    const generateButton = this.Page.getByRole("button", { name: "Generate" });

    await pagIbigRemittanceMenu.click();
    await yearDropdown.click();
    await yearOptionVal.click();
    await monthDropdown.click();
    await monthOptionVal.click();
    await employmentStatus.click();
    await employmentStatusVal.click();
    await generateButton.click();

    await this.Page.waitForTimeout(2000);
  }

  async selectionOfPhilhealth() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);

    const philHealthRemittanceMenu = this.Page.locator(
      `xpath=//table//tr[td//a[contains(., 'Philhealth Remittance')]]//a`
    );
    const yearDropdown = this.Page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = this.Page.getByRole("option", { name: "2025" });
    const monthDropdown = this.Page.getByRole("combobox", {
      name: "Please select Month",
    });
    const monthOptionVal = this.Page.getByRole("option", { name: "January" });
    const employmentStatus = this.Page.getByRole("combobox", {
      name: "Please select Employment",
    });
    const employmentStatusVal = this.Page.getByRole("option", {
      name: "Contract of Service / Job",
    });
    const generateButton = this.Page.getByRole("button", { name: "Generate" });

    await philHealthRemittanceMenu.click();

    await yearDropdown.click();
    await yearOptionVal.click();
    await monthDropdown.isVisible();
    await monthDropdown.click();

    await monthOptionVal.click();
    await employmentStatus.click();
    await employmentStatusVal.click();
    await generateButton.click();

    await this.Page.waitForTimeout(2000);
  }

  async selectionOfSSS() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);

    const sssRemittanceMenu = this.Page.locator(
      `xpath=//table//tr[td//a[contains(., 'SSS Remittance')]]//a`
    );

    const yearDropdown = this.Page.getByRole("combobox", {
      name: "Please select Year",
    });
    const yearOptionVal = this.Page.getByRole("option", { name: "2025" });
    const monthDropdown = this.Page.getByRole("combobox", {
      name: "Please select Month",
    });
    const monthOptionVal = this.Page.getByRole("option", { name: "January" });
    const generateButton = this.Page.getByRole("button", { name: "Generate" });

    await sssRemittanceMenu.click();
    await yearDropdown.click();
    await yearOptionVal.click();
    await monthDropdown.click();
    await monthOptionVal.click();
    await generateButton.click();
    await this.Page.waitForTimeout(2000);
  }
  //RESTRUCTURE TO POM: [CCRUZ] - END (04-08-2025) on hold script, due to the capturing of dropdown boxes
  async requiredFields() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);

    const sssRemittanceMenu = this.Page.locator(
      `xpath=//table//tr[td//a[contains(., 'SSS Remittance')]]//a`
    );

    await sssRemittanceMenu.click();
    await this.generateButton.click();
    await expect(this.modalMessageError).toContainText("All fields required");

    await this.Page.waitForTimeout(2000);
  }
}
