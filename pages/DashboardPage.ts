import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly Page;
  readonly viewAll: Locator;

  constructor(page: Page) {
    this.Page = page;
    this.viewAll = page.locator(
      '//*[@id="app"]/div/div[3]/div[1]/div[3]/div/div[1]/div/div/p[2]'
    );
  }

  async verifyDashboardPage() {
    await expect(this.Page).toHaveURL(/.*\/dashboard.*/);
  }

  async clickViewAll() {
    await this.viewAll.click();
  }
  async verifyPayrollManagementPage() {
    await expect(this.Page).toHaveURL(/.*\/payroll-management.*/);
  }
}
