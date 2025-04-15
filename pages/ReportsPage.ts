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
    this.clickReports = page.locator(
      '//*[@id="app"]/div/div[2]/div/div[1]/ul/li[4]/ul/li/a'
    );
    this.searchField = page.getByPlaceholder("Search");
    this.cellsLocator = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr/td'
    );

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
    }

    await this.Page.waitForTimeout(2000);
  }

  async selectionOfRemittance() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);
    const rowsCount = await this.cellsLocator.count();
    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = this.cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        console.log(cellText);
        const pagIbigClick = this.Page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[2]/td/a'
        );
        await pagIbigClick.click();
        break;
      }
    }
    await this.Page.waitForTimeout(2000);
  }
  //RESTRUCTURE TO POM: [CCRUZ] - ADD (04-08-2025) on hold script, due to the capturing of dropdown boxes
  async selectionOfPagIbig() {}

  async selectionOfSSS() {}

  async selectionOfPhilhealth() {}
  //RESTRUCTURE TO POM: [CCRUZ] - END (04-08-2025) on hold script, due to the capturing of dropdown boxes
  async requiredFields() {
    await expect(this.Page).toHaveURL(/.*\/reports.*/);
    const rowsCount = await this.cellsLocator.count();

    for (let i = 0; i < rowsCount; i++) {
      const rowLocator = this.cellsLocator.nth(i);
      const cellText = await rowLocator.innerText();

      if (cellText.includes("Pag-ibig")) {
        const pagIbigClick = this.Page.locator(
          '//*[@id="app"]/div/div[3]/div[1]/div[2]/div/div[1]/table/tbody/tr[2]/td/a'
        );
        await pagIbigClick.click();
        await this.generateButton.click();
        await expect(this.modalMessageError).toContainText(
          "All fields required"
        );
        break;
      }
    }
    await this.Page.waitForTimeout(2000);
  }
}
