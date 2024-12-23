import { Given, When, Then} from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { empLoginLocator } from "../page_action/loginTest";
import { pageFixture, Test } from "../provider/providers";
import { durationLocator, leaveDates, leaveTimes } from "../page_action/leaveDate";

Given('user Navigates the Employee Dashboard Page', async () => {
 await empLoginLocator();
  });

When('the user try to Apply the leave', async () => {
   await pageFixture.page.getByRole('button', { name: 'Apply Leave' }).click();
   expect(pageFixture.page.getByRole('heading',{ name: 'Apply Leave'})).toBeVisible();
  });

When('the user select the Leave type', async () => {
  await pageFixture.page.locator(Test.textLabelSelector.leaveTypeLocator).click();
  await pageFixture.page.getByRole('option', { name: 'CAN - FMLA' }).click();
  });

const dateObject = {
  fromDate: '2024-09-12',
  toDate: '2024-09-12'
}
When('the user choose the Leave date', async () => {
  await leaveDates(dateObject);
  await pageFixture.page.waitForTimeout(2000)
  });

Then('user should view the Duration label', async () => {
  await durationLocator();
  // await pageFixture.page.pause();
  
  });

When('the user select the Duration', async () => {
  //if employee Take leave only Morning
  await pageFixture.page.getByText('Half Day - Morning').click();
  });

When('the user can Apply the Leave', async () => {
  await pageFixture.page.getByRole('button',{ name: 'Apply'}).click();
  await pageFixture.page.waitForTimeout(2000)
  });

Then('user should see the Leave details on Record Table', async () => {
  expect(pageFixture.page.getByRole('heading',{ name: 'Overlapping Leave Request(s) Found'})).toBeVisible();
});

//=================================================== INVALID DATE =======================================================================================

const invalidDateObject = {
  fromDate: '2024-11-12',
  toDate: '2024-11-11'
}
Given('user is on Dashboard Page', async () => {
  await pageFixture.page.getByRole('link',{ name: 'Dashboard'}).click();
});

When('the user enter invalid Date', async () => {
  await leaveDates(invalidDateObject);
  await pageFixture.page.getByRole('button',{ name: 'Apply'}).click();

});

Then('the user should see the Error message', async () => {
  expect(pageFixture.page.getByText('To date should be after from')).toBeVisible()
});

//==================================================== DURATION VALIDATION ===============================================================================

const moreThanOneDayLeave = {
  fromDate: "2024-11-11",
  toDate: "2024-12-11"
}

Given('user is on Leave Page', async () => {
  await pageFixture.page.getByRole('link',{ name: 'Leave',exact: true}).click();
  await pageFixture.page.getByRole('link',{ name: 'Apply'}).click();
});

When('user apply more than one days', async () => {
  await leaveDates(moreThanOneDayLeave);
});

Then('user should see the partial days label', async () => {
  await durationLocator();
  await expect(pageFixture.page.locator(Test.textLabelSelector.partialDaysLabel)).toBeVisible();
});

When('user select {string}', async (options) => {
  await pageFixture.page.locator(Test.textLabelSelector.lableLocator).click();
  await pageFixture.page.getByRole('option',{ name: `${options}`}).click()
});

Then('user should see the {string} label', async (optionLabel) => {
  await expect(pageFixture.page.locator(`//label[@class="oxd-label oxd-input-field-required"][text()="${optionLabel}"]`)).toBeVisible();
  await pageFixture.page.getByRole('option',{ name: `Start And End Day`}).click();

});

//============================================ DURATION TIME VALIDATION ============================================================================

const timeObject = {
  FromHour: 8,
  FromMinutes: 15,
  toHour: 4,
  toMinutes: 15
}

const overTimeObject = {
  FromHour: 8,
  FromMinutes: 15,
  toHour: 6,
  toMinutes: 15
}

When('user select specify time', async () => {
  await pageFixture.page.locator(Test.timeAndDate.fulldayLabel).click();
  await pageFixture.page.getByRole('option',{ name: `Specify Time`}).click()
});

Then('user should see the Time edit options', async () => {
  await expect(pageFixture.page.locator(Test.timeAndDate.fromTimeLocator)).toBeVisible();
  await expect(pageFixture.page.locator(Test.timeAndDate.toTimeLocator)).toBeVisible();

});

When('user enter the time over the Workshift time', async () => {
  await leaveTimes(overTimeObject);
  await pageFixture.page.getByRole('button',{ name: 'Apply'}).click();
});

Then('user should see the overtime error message', async () => {
  await expect(pageFixture.page.getByText('Duration should be less than work shift length')).toBeVisible()
});

When('user enter the invalid time period', async () => {
  await pageFixture.page.getByPlaceholder(Test.timeAndDate.timePlaceholder).first().fill(`${timeObject.FromHour}:${timeObject.FromMinutes} PM`);
  //await pageFixture.page.getByPlaceholder('hh:mm').first().click();
  await pageFixture.page.getByPlaceholder(Test.timeAndDate.timePlaceholder).nth(1).fill(`${timeObject.toHour}:${timeObject.toMinutes} PM`);
  //await pageFixture.page.getByPlaceholder('hh:mm').first().click()
});

Then('user should see the FromTo time error message', async () => {
  await pageFixture.page.waitForTimeout(2000)
  await pageFixture.page.getByRole('button',{ name: 'Apply'}).click();
  await expect(pageFixture.page.getByText('From time should be before to time')).toBeVisible();
  await expect(pageFixture.page.getByText('To time should be after from time')).toBeVisible();
});

When('user Edit the Time period', async () => {
  await leaveTimes(timeObject);
  //await pageFixture.page.getByPlaceholder('hh:mm').first().click();
  await pageFixture.page.waitForTimeout(2000)
});

When('user should confirm the Duration hours', async () => {
  await expect(pageFixture.page.getByText('8.00',{ exact: true})).toBeVisible();
  await pageFixture.page.waitForTimeout(2000)
});

let commend = 'Due to Some personal reson';
When('user add the comment on the comment box', async () => {
  await pageFixture.page.locator('textarea').fill(`${commend}`);
  await pageFixture.page.getByRole('button',{ name: 'Apply'}).click();
  await pageFixture.page.waitForTimeout(3000);
  await pageFixture.page.screenshot({ path: 'features/products/comment.png', fullPage: true})
});

When('user navigates the My leave Module', async () => {
  await pageFixture.page.getByRole('link',{ name: 'My Leave'}).click();

});

Then('user should confirmed the leave is Added to the Record table Successfully', async () => {
   //await expect(pageFixture.page.getByText('2024-14-12 (08:15 - 16:15)')).toBeVisible();
   await expect(pageFixture.page.getByText(`${commend}`).first()).toBeVisible();
});

When('user want to cancel the applied leave', async () => {
   await pageFixture.page.getByRole('button',{ name: 'cancel'}).first().click();
});

Then('the applied leave should be cancelled', async () => {
  expect(pageFixture.page.getByText('Cancelled (1.00)').first()).toBeVisible();
});

