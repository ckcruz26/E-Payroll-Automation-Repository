import { test, expect } from "@playwright/test";
import fs from "fs";

test("Save login session", async ({ page }) => {
  await page.goto("http://172.31.32.64:70/");

  const empNo = "03-12833";
  const empPassword = "LayRi!11120830!!";

  await expect(page).toHaveTitle(/ePayroll System/);
  await page.locator("#basic").fill(empNo);
  await page.getByPlaceholder("Password").fill(empPassword);
  await page.locator('//*[@id="app"]/div/div/div/div/div[3]/a').click();

  await page.waitForTimeout(2000);

  // Save storage state to a file
  await page.context().storageState({ path: "auth.json" });
});
