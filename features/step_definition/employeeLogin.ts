import { Given, When, Then} from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { pageFixture, Test, webPage } from "../provider/providers";


Given('user Navigates the Login Page', async () => {
    await pageFixture.page.goto(webPage.empLoginPageUrl);
    return pageFixture.page; 
  });

When('user enter the username is {string}', async (username) => {
   await pageFixture.page.getByRole('textbox',{ name: 'Username'}).fill(username);
  });

When('user enter the password is {string}', async (password) => {
   await pageFixture.page.getByRole('textbox',{ name: 'Password'}).fill(password);

  });

When('user click the login button', async () => {
    await pageFixture.page.waitForTimeout(2000);
  await pageFixture.page.getByRole('button',{ name: 'Login'}).click()
  });

Then('user should be on HomePage', async () => {
  expect(pageFixture.page.getByRole('heading',{ name: 'Dashboard'})).toBeVisible();
  });

When('user enter the wrong username is {string}', async (wrongUsername) => {
    await pageFixture.page.getByRole('textbox',{ name: 'Username'}).fill(wrongUsername);
});

When('user enter the wrong password is {string}', async (wrongPassword) => {
    await pageFixture.page.getByRole('textbox',{ name: 'Password'}).fill(wrongPassword);
  });

Then('user should view the Error message', async () => {
  const errorAlert = pageFixture.page.locator(Test.error.invalidError);
  await pageFixture.page.waitForTimeout(2000);
  expect(errorAlert).toBeVisible();
});

When('the user try to login with empty fields', async () => {
    await pageFixture.page.getByRole('textbox',{ name: 'Username'}).fill('');
    await pageFixture.page.getByRole('textbox',{ name: 'Password'}).fill('');
    await pageFixture.page.getByRole('button',{ name: 'Login'}).click()

  });

Then('the user should view required error message', async () => {
    const requireAlertForUsername = pageFixture.page.getByText('Required').first();
    expect(requireAlertForUsername).toBeVisible();
    const requireAlertForPassword = pageFixture.page.getByText('Required').nth(1);
    expect(requireAlertForPassword).toBeVisible();
  });

When('the user enters only username is {string} for login', async (username) => {
    await pageFixture.page.getByRole('textbox',{ name: 'Username'}).fill(username);
    await pageFixture.page.getByRole('button',{ name: 'Login'}).click();
  });

Then('the user should view password required error message', async () => {
    const requireAlertForPassword = pageFixture.page.locator(Test.error.requiredError);
    expect(requireAlertForPassword).toBeVisible();
  });

When('the user enters only password is {string} for login', async (password) => {
    await pageFixture.page.getByRole('textbox',{ name: 'Username'}).fill('');
    await pageFixture.page.getByRole('textbox',{ name: 'Password'}).fill(password);
    await pageFixture.page.getByRole('button',{ name: 'Login'}).click();

  });

Then('the user should view username required error message', async () => {
    const requireAlertForUsername = pageFixture.page.locator(Test.error.requiredError);
    expect(requireAlertForUsername).toBeVisible();
  });
