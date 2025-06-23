import {test as base} from "@playwright/test";
import {PayrollManagerPage} from "../pages/PayrollManagerPage";


type Fixtures = {
  payrollManagerPage: PayrollManagerPage;
};

export const test = base.extend<Fixtures>({
  payrollManagerPage: async ({page}, use) => {
    await use(new PayrollManagerPage(page));
  },
});

export { expect } from '@playwright/test';