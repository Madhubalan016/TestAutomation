import { Given, When, Then} from "@cucumber/cucumber";
import { signUpLocators } from "../page_action/loginTest";
import { Page } from "playwright";
import * as dotenv from "dotenv";
import { usercredentials, webPage } from "../provider/providers";
import { pageFixture} from "../provider/providers";


dotenv.config();
let page: Page;

let email = process.env.USER_EMAIL;
let password = process.env.USER_PASSWORD;
let confirm_password = process.env.USER_CONFIRM_PASSWORD;


Given('user is on main page', async () => {
  await pageFixture.page.goto(webPage.webPageUrl);
    return pageFixture.page;  
  });

  When('user click on the signup button', async function () {
    await signUpLocators();
  });

  When('user enter the firstName and lastName', async function () {
   await pageFixture.page.locator(usercredentials.emailId).fill(email || "");
   await pageFixture.page.locator(usercredentials.password).fill(password || "")
   await pageFixture.page.locator(usercredentials.confirmPassword).fill(confirm_password || "")
  
  });

  When('user click the submit button', async function () {
    await pageFixture.page.getByRole('button',{ name: 'SIGN UP'}).click();
   await pageFixture.page.screenshot({ path: 'testResults/screenshot.png'})
  });

  Then('Login registration should be success', function () {
   console.log("login should be success")
  });

