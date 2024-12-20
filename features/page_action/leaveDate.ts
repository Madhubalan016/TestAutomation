import { pageFixture, Test } from "../provider/providers";
import { expect } from "playwright/test";

interface Dates{
    fromDate: string,
    toDate: string
}

interface Times{
    FromHour: number,
    FromMinutes: number,
    toHour: number,
    toMinutes: number
}
export const leaveDates = async (dates: Dates) =>{
  await pageFixture.page.getByPlaceholder(Test.timeAndDate.datePlaceholder).first().fill(dates.fromDate);
  await pageFixture.page.getByPlaceholder(Test.timeAndDate.datePlaceholder).nth(1).click();
  await pageFixture.page.getByPlaceholder(Test.timeAndDate.datePlaceholder).nth(1).fill(dates.toDate);
  await pageFixture.page.getByPlaceholder(Test.timeAndDate.datePlaceholder).nth(1).click()
}

export const durationLocator = async () => {
    await expect(pageFixture.page.locator(Test.timeAndDate.durationlabel)).toBeVisible();
    expect(pageFixture.page.locator(Test.timeAndDate.fulldayLabel)).toBeVisible();
    await pageFixture.page.locator(Test.timeAndDate.fulldayLabel).click();
}

export const leaveTimes = async (times: Times) =>{
    await pageFixture.page.getByPlaceholder(Test.timeAndDate.timePlaceholder).first().fill(`${times.FromHour}:${times.FromMinutes} AM`);
    //await pageFixture.page.getByPlaceholder('hh:mm').first().click();
    await pageFixture.page.getByPlaceholder(Test.timeAndDate.timePlaceholder).nth(1).fill(`${times.toHour}:${times.toMinutes} PM`);
    //await pageFixture.page.getByPlaceholder('hh:mm').first().click()
  }

