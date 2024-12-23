import { Given, When, Then} from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { pageFixture, Test } from "../provider/providers";

Given('Admin is navigates to admin Page', async () => {
   await pageFixture.page.getByRole('link',{ name: 'Admin'}).click();
  });

When('the Admin can try add the username', async () => {
    await pageFixture.page.getByRole('button', { name: ' Add' }).click();
    expect(pageFixture.page.getByText('Add User')).toBeVisible();

  });
const username = 'testuser63';
const editUser = 'testuser91';
const empName = 'Radha Gupta'
When('the Admin try to assign role and new username', async () => {
   await pageFixture.page. getByText('-- Select --').first().click();
   await pageFixture.page.getByRole('option',{ name: 'Admin'}).click();
   await pageFixture.page.locator(Test.textLabelSelector.usernameFieldselector).click();
   await pageFixture.page.getByRole('option',{ name: 'Enabled'}).click();
   await pageFixture.page.getByPlaceholder('Type for hints...').fill(`${empName}`);
   await pageFixture.page.waitForTimeout(3000);
   await pageFixture.page.getByRole('option',{name:`${empName}`}).click();
   await pageFixture.page.getByRole('textbox').nth(2).fill(`${username}`);
  });
const password = "secure@123"
When('the admin enter the Password', async () => {
   await pageFixture.page.getByRole('textbox').nth(3).fill(`${password}`)
  });

When('validate the confirm password', async () => {
  await pageFixture.page.getByRole('textbox').nth(4).fill(`${password}`)
  });

Then('Admin can confirmed the assigned role on Record table', async () => {
  
  await pageFixture.page.getByRole('button',{name: 'Save'}).click();
  await pageFixture.page.waitForTimeout(3000);
  await pageFixture.page.screenshot({path: 'features/products/userData.png'})
  await expect(pageFixture.page.getByText(`${username}`)).toBeVisible();
  });

When('admin want to edit the user details', async () => {
   await pageFixture.page.getByRole('row', { name: ` ${username} Admin ${empName}` }).getByRole('button').nth(1).click();
   expect(pageFixture.page.getByText('Change Password ?')).toBeVisible();
   await pageFixture.page.getByRole('textbox').nth(2).click();
   await pageFixture.page.locator(Test.textLabelSelector.editUserSelector).fill(`${editUser}`);
  });

When('Save the user information', async () => {
  await pageFixture.page.getByRole('button',{name: 'Save'}).click();
  });

Then('updated the information to the Record table', async () => {
  await pageFixture.page.waitForTimeout(3000);
  await expect(pageFixture.page.getByRole('row', { name: ` ${editUser} Admin Radha` }).getByRole('button').first()).toBeVisible();
  });

When('admin want to delete the username', async () => {
   await pageFixture.page.getByRole('row', { name: ` ${editUser} Admin Radha` }).getByRole('button').first().click();
  
  });

Then('admin should not see the deleted username on the record table', async () => {
  await pageFixture.page.locator(Test.textLabelSelector.deleteUserLocator).click();
  await expect(pageFixture.page.getByText(`${editUser}`)).toBeHidden();
  await pageFixture.page.waitForTimeout(3000);
  await pageFixture.page.screenshot({path: 'features/products/deletedData.png'})

  });

When('Admin can not enter the password less than 7', async () => {
  const password = "secure";
   await pageFixture.page.getByRole('textbox').nth(3).fill(`${password}`);
   await pageFixture.page.waitForTimeout(2000);
  });

  
Then('Admin should see the error message', async () => {
   await expect(pageFixture.page.getByText('Should have at least 7 characters')).toBeVisible();
  });
  
When('Admin can not enter the password without any number', async () => {
  const password = "securePassword";
  await pageFixture.page.getByRole('textbox').nth(3).fill(`${password}`);
  await pageFixture.page.waitForTimeout(2000);
  });
  
Then('Admin should see the password must error message', async () => {
  await expect(pageFixture.page.getByText('Your password must contain minimum 1 number')).toBeVisible();

  });
  
When('Admin enter the password and confirm password is not same', async () => {
    const password = "securePassword123";
    await pageFixture.page.getByRole('textbox').nth(4).fill(`${password}`);
    await pageFixture.page.waitForTimeout(2000);
    });
    
Then('Admin should see the password must match error message', async () => {
    await expect(pageFixture.page.getByText('Passwords do not match')).toBeVisible();
  
    });
  
When('Admin can not enter the name which is not be there', async () => {
  const randomName = "random name"
  await pageFixture.page.getByPlaceholder('Type for hints...').fill(`${randomName}`);
   await pageFixture.page.waitForTimeout(3000);
   await pageFixture.page.getByRole('button',{name: 'Save'}).click();
  });
  
Then('Admin should see the Invalid error message', async () => {
  await expect(pageFixture.page.getByText('Invalid')).toBeVisible();

  });
  
When('Admin can not enter the name which is already exist', async () => {
  const existName = "prasanna kumar"
  await pageFixture.page.getByRole('textbox').nth(2).fill(`${existName}`);

  });
  
Then('Admin should see the already exist error message', async () => {
  await expect(pageFixture.page.getByText('Already exists')).toBeVisible();
  await pageFixture.page.screenshot({path: 'features/products/adminError.png'})

  });