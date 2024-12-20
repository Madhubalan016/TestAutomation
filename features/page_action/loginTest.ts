import { Page } from "playwright";
import { pageFixture, webPage } from "../provider/providers";
import { expect } from "playwright/test";

export const BrowserLaunch = async () : Promise<Page> =>{
      await pageFixture.page.goto(webPage.webPageUrl);
      return pageFixture.page;
      
      }
export const signUpLocators = async () => {
     pageFixture.page.getByRole('link', { name: 'Sign in'}).click();
     await expect(pageFixture.page.getByRole('heading',{ name: 'Sign In'})).toBeVisible();
     pageFixture.page.waitForTimeout(2000)
     pageFixture.page.getByRole('link', { name: 'Sign up for free'}).click();
     await expect(pageFixture.page.getByRole('heading',{ name: 'Sign Up'})).toBeVisible();
}

export const empLoginLocator = async () => {
  await pageFixture.page.goto(webPage.empLoginPageUrl);
  await pageFixture.page.getByRole('textbox',{ name: 'Username'}).fill('Admin');
  await pageFixture.page.getByRole('textbox',{ name: 'Password'}).fill('admin123');
  await pageFixture.page.getByRole('button',{ name: 'Login'}).click()
 // expect(pageFixture.page.getByRole('heading',{ name: 'Dashboard'})).toBeVisible();

}