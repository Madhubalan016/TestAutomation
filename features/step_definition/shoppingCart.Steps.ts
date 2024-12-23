import { Given, When, Then} from "@cucumber/cucumber";
import { pageFixture, Test, webEditor } from "../provider/providers";
import { expect } from "playwright/test";
import { checkoutService, formValidation } from "../page_action/checkout";
import * as dotenv from "dotenv";

dotenv.config();

export let appleIphone = {
  name: "apple",
  price: 905.99
};
export let samsungPhone = {
  name: "samsung",
  price: 286.99
}
export let total = appleIphone.price + samsungPhone.price;

// ==============================LOGIN WITH RIGHT CREADENTIALS================================================================================

Given('the user is on HomePage', async () => {
  await pageFixture.page.goto(webEditor.webPageUrl);
 
});

When('the user enter the email{string}', async (Email) => {
  await pageFixture.page.getByPlaceholder(Test.userInputs.emailLocator).fill(Email);
});

When('the user enter the password{string}', async (Password) => {
  await pageFixture.page.getByPlaceholder(Test.userInputs.passwordLocator).fill(Password);
});

When('the user click the submit button', async () => {
  await pageFixture.page.getByRole('button', { name: 'Submit' }).click();
});

Then('the user should view the shopping cart', async () => {
  expect(pageFixture.page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();
});

// ==============================LOGIN WITH WRONG CREADENTIALS================================================================================

When('user enter the email is{string}', async (WrongEmail) => {
  await pageFixture.page.getByPlaceholder(Test.userInputs.emailLocator).fill(WrongEmail);
});

When('user enter the password is{string}', async (WrongPassword) => {
  await pageFixture.page.getByPlaceholder(Test.userInputs.emailLocator).fill(WrongPassword);
});

Then('the user should view the error message', async () => {
  console.log("enter error message")
  await pageFixture.page.getByRole('alert', { name: "Bad credentials! Please try again! Make sure that you've registered." }).isVisible();
});

When('user enter the login credentials{string},{string}', async (Email, Password) => {
  await pageFixture.page.getByPlaceholder(Test.userInputs.emailLocator).fill(Email);
  await pageFixture.page.getByPlaceholder(Test.userInputs.passwordLocator).fill(Password);
});

Then('the user should be on the shopping page', async () => {
  expect(pageFixture.page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })).toBeVisible();
});

// ==============================PRODUCTS VALIDATION================================================================================

Given('the user is on shopping page', async () => {
  await formValidation();
  await pageFixture.page.getByRole('heading', { name: 'SHOPPING CART' }).isVisible();
  await pageFixture.page.screenshot({ path: './features/products/product.png' })
});

When('the user try to buy a products through add to cart button', async () => {
  const iPhoneLocator = await pageFixture.page.locator(Test.Buttons.addToCartLocator).isEnabled();

  if (iPhoneLocator) {
    await pageFixture.page.locator(Test.Buttons.addToCartLocator).click();
  }
});

When('user verify the product name', async () => {
  expect(pageFixture.page.locator(Test.products.appleIphone)).toBeVisible();
  await pageFixture.page.screenshot({ path: 'features/products/products.png', fullPage: true })
});

When('user verify the product price', async () => {

  expect(pageFixture.page.locator(Test.price.actualPrice)).toHaveText(`$${appleIphone.price}`);
  const samSungLocator = await pageFixture.page.locator(Test.Buttons.samSungButton).isEnabled();

  // if user want to buy another product
  if (samSungLocator) {
    await pageFixture.page.locator(Test.Buttons.samSungButton).click();
    expect(pageFixture.page.locator(Test.products.samsungGalaxy)).toBeVisible();
    await pageFixture.page.screenshot({ path: 'features/products/products.png', fullPage: true });
    expect(pageFixture.page.locator(Test.price.totalPriceLocator)).toHaveText(`$${total}`);
  }
});

When('user verify the product Quantity', async () => {
  const defaultvalue = 1;
  const incrementValue = 3
  
  expect(pageFixture.page.getByRole('spinbutton').first()).toHaveValue(`${defaultvalue}`);
  if (await pageFixture.page.locator(Test.products.samsungGalaxy).isHidden() || await pageFixture.page.locator(Test.products.samsungGalaxy).isVisible()) {

    const totalProductValue = samsungPhone.price * incrementValue + appleIphone.price;
    await pageFixture.page.getByRole('spinbutton').nth(1).fill(`${incrementValue}`);
    await pageFixture.page.keyboard.press('Enter');
    expect(pageFixture.page.locator(Test.price.totalPriceLocator)).toHaveText(`$${totalProductValue}`);
    await pageFixture.page.screenshot({ path: "features/products/totalValue.png", fullPage: true });
  }
 
});

Then('user should confirm the orders in the list of items', async () => {
  expect(pageFixture.page.locator(Test.products.appleIphone)).toBeVisible();
  expect(pageFixture.page.locator(Test.products.samsungGalaxy)).toBeVisible();
  
});

// ==============================REMOVE BUTTON VALIDATION================================================================================

When('the user after click the add to cart button', async () => {
  await pageFixture.page.locator(Test.Buttons.addToCartLocator).click();
  //if user have more than one products
  if(await pageFixture.page.locator(Test.products.samsungGalaxy).isHidden()){
    
    await pageFixture.page.locator(Test.Buttons.samSungButton).click();
    expect(pageFixture.page.locator(Test.products.samsungGalaxy)).toBeVisible();
    expect(pageFixture.page.locator(Test.price.totalPriceLocator)).toHaveText(`$${total}`);
  }
});

When('the user should view on the Remove button', async () => {
  expect( pageFixture.page.getByRole('button',{ name: 'REMOVE'}).first()).toBeVisible();

});

When('the user click the Remove button', async () => {

   await pageFixture.page.getByRole('button',{ name: 'REMOVE'}).first().click();
   if(await pageFixture.page.locator(Test.products.samsungGalaxy).isVisible()){
    expect(pageFixture.page.locator(Test.price.totalPriceLocator)).toHaveText(`$${total-appleIphone.price}`);
}

});

Then('a product should Remove the list of items & its price should be decrease', async () =>{
  await pageFixture.page.waitForTimeout(2000);
   expect(pageFixture.page.locator(Test.products.appleIphone)).toBeHidden();
   expect(pageFixture.page.locator(Test.price.totalPriceLocator)).toHaveText(`$${total-appleIphone.price}`);

});


// ===========================CAN'T BUY SAME PRODUCT=======================================================================================

When('the user try to buy the same product', async () => {
  await pageFixture.page.locator(Test.Buttons.addToCartLocator).click();
  expect(pageFixture.page.locator(Test.products.appleIphone)).toBeVisible();
 
});

Then('the user should view the alert message', async () => {
   const dialog = pageFixture.page.waitForEvent('dialog');
   pageFixture.page.locator(Test.Buttons.addToCartLocator).click();
   const alert = await dialog;
   if(alert.message().includes('This item is already added to the cart')){
    alert.accept();
   }
   else{
    console.log("Default message",alert.message())
   }
   
});

// ==============================CHECKOUT CREDENTIALS==========================================================================================

When('user buy the products', async () => {
 await pageFixture.page.locator(Test.Buttons.addToCartLocator).click();
 expect(pageFixture.page.getByRole('button',{ name: 'REMOVE'})).toBeVisible();
 expect(pageFixture.page.locator(Test.price.actualPrice)).toHaveText(`$${appleIphone.price}`);
});

When('user try to proceed the checkout', async () => {
  await pageFixture.page.getByRole('button',{ name: 'PROCEED TO CHECKOUT'}).click();
  expect(pageFixture.page.getByText('Shipping Details')).toBeVisible();
});

const object = {
  phNumber: "990099000",
  address: "test1/home",
  city: "Tamilnadu",
  contry: "India"
};

When('user fill the credentials for checkout', async () => {
  //if user submit the button without fill any cradentials
  await pageFixture.page.getByRole('button',{ name: Test.Buttons.submitOrderLocator}).click();
  const placeholer = await pageFixture.page.locator(Test.userAddress.contryLocator).evaluate(input => {
    const nameStyle = window.getComputedStyle(input, '::placeholder');
    return nameStyle.color;
})
expect(placeholer).toBe('rgb(255, 0, 0)')
await pageFixture.page.screenshot({ path: "features/products/error.png"})
await checkoutService(object);
});

Then('user should view the confirmation message', async () => {
  expect(pageFixture.page.locator('#message')).toHaveText(`Congrats! Your order of $${appleIphone.price} has been registered and will be shipped to ${object.address}, ${object.city} - ${object.contry}.`);
});

//==================================VALIDATE LOGOUT=======================================================================================

When('the user Logout from shopping page', async () =>{
  expect(pageFixture.page.getByRole('link',{ name: 'Log Out'})).toBeVisible();
  await pageFixture.page.getByRole('link',{ name: 'Log Out'}).click();
});

Then('the user should be on Login page', async () =>{
  expect(pageFixture.page.getByRole('heading',{ name: 'Login - Shop'})).toBeVisible();
});

//==================================VALIDATE CHECKBOX=======================================================================================

When('the user try to validate the checkbox', async () => {
 await pageFixture.page.getByRole('link',{ name: 'Buttons'}).click();
 await pageFixture.page.getByRole('link',{ name: 'Checkboxes'}).click();
 expect(pageFixture.page.getByRole('heading',{ name: 'Checkboxes'})).toBeVisible();
});

When('the user click the checkbox', async () => {
await pageFixture.page.locator('#checkbox1').check();
expect(pageFixture.page.locator('#checkbox1')).toBeChecked();
await pageFixture.page.locator('#checkbox2').check();
expect(pageFixture.page.locator('#checkbox2')).toBeChecked();
});

When('the user click the reset button', async () => {
 await pageFixture.page.getByRole('button',{ name: 'Reset'}).click();
});

Then('user should see the uncheck the checkbox', async () => {
  expect(pageFixture.page.locator('#checkbox1')).toBeChecked({ checked: false});
});
