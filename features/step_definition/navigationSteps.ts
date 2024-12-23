import { Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber";
import { Page } from "playwright";
import { BrowserLaunch } from "../page_action/loginTest";
import { expect } from "playwright/test";

setDefaultTimeout(30000);
let page: Page;
Given('user is on HomePage', async () => {
    page = await BrowserLaunch();
    await expect(page.locator('a').filter({ hasText: /^mockaroo$/ })).toBeVisible();
});

When('user click {string} link', async (Navigation) => {
   await page.getByRole('button',{ name: Navigation }).click(Navigation);
});

Then('user verify the content on {string} page', async (PageContent) => {
   await expect(page.getByRole('heading',{ name: PageContent })).toBeVisible();
    
});