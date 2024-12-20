import { When, Then} from "@cucumber/cucumber";
import { pageFixture, Test } from "../provider/providers";
import { expect, FrameLocator } from "playwright/test";

let iframeLocator: FrameLocator;
When('user click the iframe link', async () => {
  await pageFixture.page.getByRole('link',{ name: 'Iframes'}).click();
  expect( pageFixture.page.getByRole('heading',{ name: 'Iframe Example'})).toBeVisible();
  });

Then('user should validate the iframe locator', async () => {
    iframeLocator =  pageFixture.page.locator(Test.FrameLocator.iframeLocator).contentFrame();
    await iframeLocator.getByRole('button',{ name: 'Learn more'}).click();
    expect(iframeLocator.locator('#show-text')).toBeVisible();
  });