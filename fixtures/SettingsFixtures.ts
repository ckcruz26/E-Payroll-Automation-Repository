import {test as base} from "@playwright/test";
import { SettingsPage } from "../pages/SettingsPage";

type Fixtures = {
  settingsPage: SettingsPage;
};

export const test = base.extend<Fixtures>({
  settingsPage: async ({page}, use) => {
    await use(new SettingsPage(page));
  },
});

export { expect } from '@playwright/test';