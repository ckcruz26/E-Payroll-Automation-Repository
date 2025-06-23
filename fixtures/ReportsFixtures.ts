import {test as base} from "@playwright/test";
import {ReportsPage} from "../pages/ReportsPage";

type Fixtures = {
  reportsPage: ReportsPage;
};

export const test = base.extend<Fixtures>({
  reportsPage: async ({page}, use) => {
    await use(new ReportsPage(page));
  },
});

export { expect } from '@playwright/test';