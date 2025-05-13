import { test, expect } from "@playwright/test";

import path from "path";
import { PersonnelProfile } from "../pages/PersonnelProfile";

test.describe.configure({ mode: 'parallel' });

test.describe("Personnel Profile Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });
  
  const url = String(process.env.URL);

  test.beforeEach(async ({ page }) => {
    await page.goto(`${url}personnel-management`);
  });

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_001", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.verifyPersonnelProfilePage();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_002", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.searchEmployeeByFullName();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_003", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.searchEmployeesByPayrollGroup();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_004", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.searchEmployeesByFundSource();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_005", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.searchEmployeesByEmploymentStatus();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_006", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.clearFilterButton();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_007", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.downloadSummary();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_008", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.deductionModal();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_009", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.inputDeduction();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_010", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.clearDeductions();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_011", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.optionalDeductionsView();
  });

  test("E-PAYROLL_PERSONNEL_PROFILE_013", async ({ page }) => {
    const personnelProfile = new PersonnelProfile(page);
    await personnelProfile.skipOptionalDeductionsRequiredFields();
  });

});
