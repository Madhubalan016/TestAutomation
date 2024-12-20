import { After, AfterAll, BeforeAll, setDefaultTimeout} from "@cucumber/cucumber";
import { Browser, chromium, Page} from "playwright/test";
import { pageFixture } from "../../provider/providers";
 setDefaultTimeout(30000);
let browser: Browser;
let page: Page;

BeforeAll( async function() {
    console.log("enter before all")
    browser = await chromium.launch({ 
    headless: false
   });
   const context = await browser.newContext({
    viewport:{
        height: 1024,
        width: 1824
    }
   });
   pageFixture.page = await context.newPage();
   return pageFixture.page;
});

After( async function ({ pickle }) {
    await pageFixture.page.waitForTimeout(3000);
    await pageFixture.page.screenshot({ path: `testResults/screenshot/${ pickle.name }.png`, fullPage: true});
});

AfterAll(async function() {
    console.log("afterall")
  //  await browser.close()
})
