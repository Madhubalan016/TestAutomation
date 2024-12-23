import { Employee, pageFixture, Test } from "../provider/providers";
import { expect } from "playwright/test";


//=================================================== COMMON LOCATORS =======================================================================================================


export const saveButton = async () => {
    await pageFixture.page.getByRole('button', { name: 'Save' }).click()

}

export const addButton = async () => {
    await pageFixture.page.getByRole('button', { name: ' Add' }).first().click();
}

//===================================================== EMPLOYEEE DETAILS LOCATORS ===========================================================================================

const EmpId = '029';
const fName = 'testUser';
const lName = 'first';
const username = 'testUser@029';
const password = 'Pass@word123';

const employeeInformation = async () => {
    await pageFixture.page.getByRole('textbox', { name: `First Name` }).fill(`${fName}`);
    await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill(`${lName}`)
    await pageFixture.page.locator(Employee.personalDetails.usernameLocator).fill(`${username}`);
    await pageFixture.page.locator(Employee.personalDetails.passwordLocator).first().fill(`${password}`);
    await pageFixture.page.locator(Employee.personalDetails.passwordLocator).nth(1).fill(`${password}`);
    await pageFixture.page.locator('label').filter({ hasText: 'Enabled' }).locator('span').click();
    await pageFixture.page.locator('div').filter({ hasText: Employee.personalDetails.empIdLocator }).getByRole('textbox').nth(3).fill(`${EmpId}`);
}

//====================================================== CONTACT DETAILS LOCATORS =============================================================================================

const address = "21,South";
const postal = "123 456";
const phNumber = '8901234789';
const email = 'validEmail12@admin.com';

const contactInformation = async () => {
    await pageFixture.page.locator(Employee.contactDetails.addressField).fill(`${address}`);
    await pageFixture.page.locator(Employee.contactDetails.postalField).fill(`${postal}`)
    await pageFixture.page.locator(Employee.contactDetails.phNumberField).fill(phNumber)
    await pageFixture.page.locator(Employee.contactDetails.emailField).fill(email);

}

//====================================================== EMERGENCY CONTACT DETAILS LOCATORS =============================================================================================


const emergencyContact = async () => {
    const relationName = 'saravana';
    const relation = 'Brother';
    await pageFixture.page.locator('form').getByRole('textbox').first().fill(`${relationName}`);
    await pageFixture.page.locator('form').getByRole('textbox').nth(1).fill(`${relation}`);
    await pageFixture.page.locator('form').getByRole('textbox').nth(2).fill(`${phNumber}`);

}

//====================================================== DEPENDENT DETAILS LOCATORS =============================================================================================

const dependsName = 'madhu';

const dependentDetails = async () => {
    await pageFixture.page.locator('form').getByRole('textbox').first().fill(`${dependsName}`);
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').fill('2024-17-12');

}

//====================================================== IMMIGRATION DETAILS LOCATORS =============================================================================================

const passportName = 'tester'
const issueDate = '2024-11-12';
const expDate = '2024-20-12';
const eligibleStatus = 'Grauate';
const commendText = 'This is my Immigration Details';

const immigrationDetails = async () => {
    await pageFixture.page.locator(Employee.immigrationDetails.passportName).first().fill(`${passportName}`);
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill(`${issueDate}`);
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill(`${expDate}`);
    await pageFixture.page.locator(Employee.immigrationDetails.eligbleLocator).fill(`${eligibleStatus}`);
    await pageFixture.page.getByText('-- Select --').click();
    await pageFixture.page.getByRole('option', { name: 'India', exact: true }).click();
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(2).fill(`${expDate}`);
    await pageFixture.page.getByPlaceholder('Type Comments here').fill(`${commendText}`);

}

//====================================================== JOB DETAILS LOCATORS =============================================================================================

const filePath = Employee.filePathDetails.screenshotFile;

const jobDetails = async () => {
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').fill('2024-18-12');
    await pageFixture.page.getByText('-- Select --').first().click();
    await pageFixture.page.getByRole('option', { name: 'Software Engineer' }).click();
    await pageFixture.page.getByText('-- Select --').first().click();
    await pageFixture.page.getByRole('option', { name: 'Professionals' }).click();
    await pageFixture.page.getByText('-- Select --').first().click();
    await pageFixture.page.getByRole('option', { name: 'Engineering' }).click();
    await pageFixture.page.getByText('-- Select --').first().click();
    await pageFixture.page.getByRole('option', { name: 'Texas R&D' }).click();
    await pageFixture.page.getByText('-- Select --').first().click();
    await pageFixture.page.getByRole('option', { name: 'Full-Time Contract' }).click();

    await pageFixture.page.locator('form span').click();
    await pageFixture.page.setInputFiles("input[type='file']", filePath);
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2024-14-12');
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(2).fill('2024-18-12');

}


const empNaviagetTo = async (linkName: string, pageLocation: string) => {
    await pageFixture.page.getByRole('link', { name: linkName }).click();
    await expect(pageFixture.page.getByRole('heading', { name: pageLocation })).toBeVisible();
}

//====================================================== SALARY DETAILS LOCATORS =============================================================================================

const salaryDetails = async () => {
    await pageFixture.page.getByRole('textbox').nth(1).fill('something');
    await pageFixture.page.getByText('-- Select --').first().click();
    await pageFixture.page.getByRole('option', { name: 'Monthly', exact: true }).click();
    await pageFixture.page.getByRole('textbox').nth(2).fill('55000');
    await pageFixture.page.getByRole('textbox').nth(3).fill('salary comment');
    await pageFixture.page.locator(Employee.salaryDetails.accountNumberField).first().fill('12345678');
    await pageFixture.page.getByText('Other').click();
    await pageFixture.page.getByRole('option', { name: 'Savings' }).click();
    await pageFixture.page.locator('div').filter({ hasText: Employee.salaryDetails.rountingNumberField }).getByRole('textbox').first().fill('8766');
    await pageFixture.page.locator('div').filter({ hasText: Employee.salaryDetails.amountField }).getByRole('textbox').nth(1).fill('12376865');
}

//====================================================== REPORTING TO DETAILS LOCATORS =============================================================================================

const subordinatorName = 'Ranga  Akunuri';

const reportersDetails = async () => {
    await pageFixture.page.getByRole('textbox',{ name: 'Type for hints...'}).fill(`${subordinatorName}`);
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.getByRole('option',{ name: `${subordinatorName}`}).click();
    await pageFixture.page.locator(Employee.reportingToDetails.reportTypeSelector).click();
    await pageFixture.page.getByRole('option',{ name: 'Indirect',exact: true}).click();
    await pageFixture.page.waitForTimeout(2000)
}

//====================================================== QUALIFICATION DETAILS LOCATORS =============================================================================================

const workExperienceDetails = async () => {
    await pageFixture.page.locator('form').getByRole('textbox').first().fill('crystal delta');
    await pageFixture.page.locator('form').getByRole('textbox').nth(1).fill('Developer');
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill('2024-14-12');
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2025-24-12');
    await pageFixture.page.locator('textarea').fill('Work experience details');

}

const skillDetails = async () => {
    await pageFixture.page.getByText('-- Select --').click();
    await pageFixture.page.getByRole('option',{ name: 'JIRA'}).click();
    await pageFixture.page.locator('form input').fill('4');
    await pageFixture.page.locator('textarea').fill('Skill description');

}

const educationDetails = async () => {
    await pageFixture.page.getByText('-- Select --').click();
    await pageFixture.page.getByRole('option',{ name: "Bachelor's Degree"}).click();
    await pageFixture.page.locator(Employee.educationDeatils.institutionField).first().fill('RVCE');
    await pageFixture.page.locator(Employee.educationDeatils.departmentField).fill('cse Department');
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator(Employee.educationDeatils.yearsField).fill('4');
    await pageFixture.page.locator(Employee.educationDeatils.cgpaScoreField).fill('234');
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill('2024-14-12');
    await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2024-24-12');
}


export const employeeDeatils = {
    employeeInformation,
    contactInformation,
    emergencyContact,
    dependentDetails,
    immigrationDetails,
    jobDetails,
    empNaviagetTo,
    salaryDetails,
    reportersDetails,
    workExperienceDetails,
    skillDetails,
    educationDetails

}