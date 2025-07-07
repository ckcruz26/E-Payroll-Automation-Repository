import { test } from "../fixtures/SettingsFixtures";
import path from "path";

test.describe.configure({ mode: "parallel" });

test.describe("Settings Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/auth.json"),
  });

  const url = String(process.env.URL);
  const searchData = "Plantilla";

  async function goToLink(setingsPage, variable) {
    await setingsPage.page.goto(`${url}settings/${variable}`);
  }

  test.afterEach(async ({ page }) => {
    await page.close(); // closes the current page after each test
  });

  test("E-PAYROLL_SETTINGS_000", async ({ settingsPage }) => {
    await goToLink(settingsPage, "audit-trail");
    await settingsPage.verifyAuditTrailPage();
  });

  test("E-PAYROLL_SETTINGS_001", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.verifySettingsPage();
  });

  test("E-PAYROLL_SETTINGS_002", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.searchSalaryGrade(searchData);
  });

  test("E-PAYROLL_SETTINGS_003", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.visibilityCreateSalaryGradeTblModal();
  });

  test("E-PAYROLL_SETTINGS_004", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.createSalaryGradeTranch();
  });

  test("E-PAYROLL_SETTINGS_005", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.skipRequiredFieldsSalaryGrade();
  });

  test("E-PAYROLL_SETTINGS_006", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.viewSalaryGradeTable();
  });

  test("E-PAYROLL_SETTINGS_007", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.salaryGradeTableEdit();
  });

  test("E-PAYROLL_SETTINGS_008", async ({ settingsPage }) => {
    await goToLink(settingsPage, "salary-grade");
    await settingsPage.salaryGradTableEditSkipRequiredFields();
  });

  test("E-PAYROLL_SETTINGS_009", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.verifyDeductionTypesPage();
  });

  test("E-PAYROLL_SETTINGS_010", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.searchDeductionTypes();
  });

  test("E-PAYROLL_SETTINGS_011", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.viewTheDeductionForm();
  });

  test("E-PAYROLL_SETTINGS_012", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.addDeductionType();
  });

  test("E-PAYROLL_SETTINGS_013", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.skipRequiredFieldsDeductionType();
  });

  test("E-PAYROLL_SETTINGS_014", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.viewEditFormDeductionType();
  });

  test("E-PAYROLL_SETTINGS_015", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.editDeductionType();
  });

  test("E-PAYROLL_SETTINGS_016", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.editDeductionTypeSkipRequiredFields();
  });

  test("E-PAYROLL_SETTINGS_017", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.editDeductionTypeStatus();
  });

  test("E-PAYROLL_SETTINGS_018", async ({ settingsPage }) => {
    await goToLink(settingsPage, "deduction-types");
    await settingsPage.changeNumberDisplayByValues();
  });

  test("E-PAYROLL_SETTINGS_019", async ({ settingsPage }) => {
    await goToLink(settingsPage, "upload-deductions");
    await settingsPage.downloadTemplateDeductions();
  });

  test("E-PAYROLL_SETTINGS_020", async ({ settingsPage }) => {
    await goToLink(settingsPage, "upload-deductions");
    await settingsPage.uploadDeductionsFile();
  });

  test("E-PAYROLL_SETTINGS_021", async ({ settingsPage }) => {
    await goToLink(settingsPage, "upload-deductions");
    await settingsPage.uploadInvalidDeductionsFile();
  });

  test("E-PAYROLL_SETTINGS_022" , async ({ settingsPage }) => {
    await goToLink(settingsPage, "optional-deductions");
    await settingsPage.downloadTemplateOptionalDeductions();
  });

  test("E-PAYROLL_SETTINGS_023", async ({ settingsPage }) => {
    await goToLink(settingsPage, "optional-deductions");
    await settingsPage.uploadOptionalDeductionsFile();
  });

  test("E-PAYROLL_SETTINGS_024", async ({ settingsPage }) => {
    await goToLink(settingsPage, "optional-deductions");
    await settingsPage.uploadInvalidOptionalDeductionsFile();
  });

  test("E-PAYROLL_SETTINGS_025", async ({ settingsPage }) => {
    await goToLink(settingsPage, "user-access");
    await settingsPage.verifyUserAccessPage();
  });

  test("E-PAYROLL_SETTINGS_026", async ({ settingsPage }) => {
    await goToLink(settingsPage, "user-access");
    await settingsPage.changeNumberDisplayByValuesOfUserAccess();
  });

  test("E-PAYROLL_SETTINGS_027", async ({ settingsPage }) => {
    await goToLink(settingsPage, "user-access");
    await settingsPage.searchDataInUserAccess();
  });

  test("E-PAYROLL_SETTINGS_028", async ({ settingsPage }) => {
    await goToLink(settingsPage, "user-access");
    await settingsPage.viewUserAccess();
  });

  test("E-PAYROLL_SETTINGS_029", async ({ settingsPage }) => {
    await goToLink(settingsPage, "user-access");
    await settingsPage.editUserAccess();
  });

  test('E-PAYROLL_SETTINGS_030', async ({ settingsPage }) => {
    await goToLink(settingsPage, "user-access");
    await settingsPage.changeNumberDisplayByModuleOfUserAccess();
  });
});
