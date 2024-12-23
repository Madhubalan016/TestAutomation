import { pageFixture, Test, webEditor } from "../provider/providers";

export interface Checkout{
  phNumber: string,
  address: string,
  city: string,
  contry: string
}
export const checkoutService = async (checkout: Checkout) => {
  await pageFixture.page.getByRole('textbox',{ name: Test.userAddress.phoneNumberLocator}).fill(checkout.phNumber);
  await pageFixture.page.getByPlaceholder(Test.userAddress.addressLocator).fill(checkout.address);
  await pageFixture.page.getByPlaceholder(Test.userAddress.cityLocator).fill(checkout.city);
  await pageFixture.page.selectOption(Test.userAddress.contryLocator,{
  label: checkout.contry,
  value: checkout.contry
})
await pageFixture.page.getByRole('button',{ name: Test.Buttons.submitOrderLocator}).click();
}

export const formValidation = async () => {
  let Email = process.env.USER_EMAIL_FOR_SHOPPING;
  let Password = process.env.USER_PASSWORD_FOR_SHOPPING;
  console.log('user name, passsword', Email, Password)
  await pageFixture.page.goto(webEditor.webPageUrl);
  await pageFixture.page.getByPlaceholder(Test.userInputs.emailLocator).fill(Email || "");
  await pageFixture.page.getByPlaceholder(Test.userInputs.passwordLocator).fill(Password || "");
  await pageFixture.page.getByRole('button', { name: 'Submit' }).click();
}