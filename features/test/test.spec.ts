import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('madhu');
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('jkumar123');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('jk123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.getByRole('link', { name: 'Phones' }).click();
  await page.getByRole('link', { name: 'Laptops' }).click();
  await expect(page.getByRole('heading', { name: 'Sony vaio i5' })).toBeVisible();
  await page.getByRole('heading', { name: 'Sony vaio i5' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  //await page.getByLabel('Total:').click();
  await page.locator('#name').fill('jk');
  await page.locator('#country').fill('india');
  await page.getByLabel('City:').click();
  await page.getByLabel('City:').fill('tamilnadu');
  await page.getByLabel('Credit card:').click();
  await page.getByLabel('Credit card:').fill('65765768');
  await page.getByLabel('Month:').click();
  await page.getByLabel('Month:').fill('june');
  await page.getByLabel('Year:').click();
  await page.getByLabel('Year:').fill('2025');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});