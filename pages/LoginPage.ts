import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly Page;
  readonly empNoField: Locator;
  readonly empPasswordField: Locator;
  readonly signInButton: Locator;

  readonly modalError: Locator;
  readonly svgToggle : Locator;

  constructor(page: Page) {
    this.Page = page;
    this.empNoField = page.locator("#basic");
    this.empPasswordField = page.getByPlaceholder("Password");
    this.signInButton = page.locator('//*[@id="app"]/div/div/div/div/div[3]/a');
    this.modalError = page.locator(
      "xpath=/html/body/div[2]/div/div[2]/div[1]/p"
    );
    this.svgToggle = page.locator("svg");
  }

  async successfulLogin(empNo: string, empPassword: string) {
    await expect(this.Page).toHaveTitle(/ePayroll System/);
    await this.empNoField.fill(empNo);
    await this.empPasswordField.fill(empPassword);
    await this.signInButton.click();
    await expect(this.Page).toHaveURL(/.*\/dashboard.*/);
  }

  async invalidLogin(empNo: string, empPassword: string) {
    await expect(this.Page).toHaveTitle(/ePayroll System/);
    await this.empNoField.fill(empNo);
    await this.empPasswordField.fill(empPassword);
    await this.signInButton.click();
    await expect(this.modalError).toContainText(
      "Incorrect username or password"
    );
  }

  async emptyReqiredField(empPassword: string) {
    await expect(this.Page).toHaveTitle(/ePayroll System/);
    await this.empNoField.fill("");
    await this.empPasswordField.fill(empPassword);
    await this.signInButton.click();
    await expect(this.modalError).toContainText(
      "Username or password cannot be empty"
    );
  }
  async togglePassword(empNo: string, empPassword: string) {
    await expect(this.Page).toHaveTitle(/ePayroll System/);
    await this.empNoField.fill(empNo);
    await this.empPasswordField.fill(empPassword);
    await this.svgToggle.click();
    await this.Page.waitForTimeout(2000);
  }
}
