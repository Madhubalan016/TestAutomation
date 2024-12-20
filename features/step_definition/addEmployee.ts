import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { Employee, pageFixture } from "../provider/providers";
import { empLoginLocator } from "../page_action/loginTest";
import { addButton, employeeDeatils, saveButton, } from "../page_action/employeeInfo";
import { maxCharacter, maxData } from "../provider/invalidData";

// const textbox = pageFixture.page.locator('form').getByRole('textbox');
//const dateField = pageFixture.page.getByPlaceholder('yyyy-dd-mm');
// const selectField = pageFixture.page.getByText('-- Select --');
// const textareaField = pageFixture.page.getByRole('textbox');
// const addButtonField = pageFixture.page.getByRole('button', { name: ' Add' });

Given('the Admin navigates to the PIM page', async () => {
  await empLoginLocator();
  await pageFixture.page.getByRole('link', { name: 'PIM' }).click();

});

When('the Admin tries to add a new employee', async () => {
  await pageFixture.page.getByRole('button', { name: ' Add' }).click();
  await expect(pageFixture.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();

});

const fName = 'testUser';
const lName = 'first';
When('enters the employee Details on the Add Employee page', async () => {

  await pageFixture.page.getByRole('textbox', { name: `First Name` }).fill(`${fName}`);
  await pageFixture.page.getByRole('textbox', { name: 'Last Name' }).fill(`${lName}`);

});

When('the Admin wants to create a username', async () => {
  await pageFixture.page.locator(Employee.personalDetails.newUserField).click();

});

When('the Admin tries to save details without entering the name EmptyDetails', async () => {
  await saveButton();

});

Then('the Admin should not be able to save the details', async () => {
  await expect(pageFixture.page.getByText('Required')).toBeVisible();

});

const username = 'testuser1';
const password = 'Password@345';
When('fills in the employee\'s user details', async () => {
  await pageFixture.page.locator(Employee.personalDetails.usernameLocator).fill(`${username}`);
  await pageFixture.page.locator(Employee.personalDetails.passwordLocator).first().fill(`${password}`);
  await pageFixture.page.locator(Employee.personalDetails.passwordLocator).nth(1).fill(`${password}`);
  await pageFixture.page.locator('label').filter({ hasText: 'Enabled' }).locator('span').click();

});

When('the employee ID already exists', async () => {
  const existingId = '0303';
  await pageFixture.page.locator('div').filter({ hasText: /^Employee Full NameEmployee Id$/ }).getByRole('textbox').nth(3).fill(`${existingId}`);

});

Then('the Admin should see an error message', async () => {
  await expect(pageFixture.page.getByText('Employee Id already exists')).toBeVisible();

});

When('the Admin enters more than 10 characters in the Employee ID field', async () => {
  await pageFixture.page.locator('div').filter({ hasText: /^Employee Full NameEmployee IdEmployee Id already exists$/ }).getByRole('textbox').nth(3).fill(`${maxData}`);

});

Then('the Admin should see a Maximum 10 character limit exceeded error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 10 characters')).toBeVisible();

});

When('the Admin fills valid informations', async () => {
  await employeeDeatils.employeeInformation();

});

When('clicks the Save button', async () => {
  await saveButton();

});

Then('the Admin is redirected to the main details filling page', async () => {
  await pageFixture.page.waitForTimeout(3000);
  await expect(pageFixture.page.getByRole('heading', { name: `Personal Details` })).toBeVisible();

});

//======================================================= PERSONAL DETAILS ============================================================================

When('the Admin enters more than 30 characters in the Other ID field', async () => {
  await pageFixture.page.locator(Employee.personalDetails.otherIdLocator).fill(maxData);

});

Then('the Admin should see a Maximum 30 character limit exceeded error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 30 characters')).toBeVisible();

});

const filePath = Employee.filePathDetails.screenshotFile;
const maxFilePath = Employee.filePathDetails.videoFile;
const invalidFilePath = Employee.filePathDetails.invalidFile;

When('the Admin wants to upload the attachment file', async () => {
  await pageFixture.page.getByRole('button', { name: ' Add' }).click();

});

When('choose the file more than 1MB', async () => {
  await pageFixture.page.setInputFiles(Employee.filePathDetails.inputFileLocator, maxFilePath);

});

Then('the Admin should be see the file size exceed error message', async () => {
  await expect(pageFixture.page.getByText('Attachment Size Exceeded')).toBeVisible();

});

When('the Admin uploads the image instead of jpg or png', async () => {
  await pageFixture.page.setInputFiles(Employee.filePathDetails.inputFileLocator, invalidFilePath);

});

Then('the Admin should see the file type not allowed error message', async () => {
  await expect(pageFixture.page.getByText('File type not allowed')).toBeVisible();

});

When('the Admin enters valid personal details in the Personal Details fields', async () => {
  await pageFixture.page.setInputFiles(Employee.filePathDetails.inputFileLocator, filePath);
  await pageFixture.page.locator(Employee.personalDetails.otherIdLocator).fill('873843435');
  await pageFixture.page.getByText('-- Select --').first().click();
  await pageFixture.page.getByRole('option', { name: 'Indian' }).click();
  await pageFixture.page.getByText('-- Select --').first().click();
  await pageFixture.page.getByRole('option', { name: 'Single' }).click();
  await pageFixture.page.locator('div').filter({ hasText: Employee.personalDetails.genderLocator }).getByPlaceholder('yyyy-dd-mm').fill('2024-17-12');
  await pageFixture.page.getByText('-- Select --').first().click();
  await pageFixture.page.getByRole('option', { name: 'A+' }).click();
  await pageFixture.page.getByText('Male', { exact: true }).click();

});


Then('saves the employee personal details', async () => {
  await pageFixture.page.getByRole('button', { name: 'Save' }).nth(2).click();

});

//====================================================== CONTACT DETAILS =================================================================================

When('the Admin wants to fill the contact details', async () => {
  
  await employeeDeatils.empNaviagetTo('Contact Details', 'Contact Details');

});

When('fills in the employee\'s contact details', async () => {
  await pageFixture.page.locator(Employee.contactDetails.nameField).fill('sample name');

});

When('the Admin enters more than 70 characters in the AddressFields', async () => {
  await pageFixture.page.locator(Employee.contactDetails.addressField).fill(`${maxData}`);

});

Then('the Admin should see the Maximum 70 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 70 characters')).toBeVisible();

  //if admin enters the postalcode more than 10 characters

  await pageFixture.page.locator(Employee.contactDetails.postalField).fill(`${maxData}`)
  await expect(pageFixture.page.getByText('Should not exceed 10 characters')).toBeVisible();

});

When('the Admin enters more than 25 characters in the SpecifiedFields', async () => {
  await pageFixture.page.locator(Employee.contactDetails.phNumberField).fill(`${maxData}`);

});

Then('the Admin should see the Maximum 25 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 25 characters')).toBeVisible();

});

When('the Admin enters a string instead of a number in the phone number field', async () => {
  await pageFixture.page.locator(Employee.contactDetails.phNumberField).fill('randomstring')

});

Then('the Admin should see the {string} message', async (invalidString) => {
  await expect(pageFixture.page.getByText(invalidString)).toBeVisible();

});

When('the Admin enters an invalid email ID', async () => {
  await pageFixture.page.locator(Employee.contactDetails.emailField).fill('invalidEmail.com');

});

Then('the Admin should see the Invalid email format error message', async () => {
  //await pageFixture.page.pause();
  await pageFixture.page.locator('form').filter({ hasText: 'AddressStreet 1Should not' }).getByRole('button').click()
  await pageFixture.page.waitForTimeout(2000);
  await pageFixture.page.locator('form').filter({ hasText: 'AddressStreet 1Should not' }).getByRole('button').click()
  await expect(pageFixture.page.getByText('Expected format: admin@example.com')).toBeVisible();

});

When('the Admin enters valid contact details in the contact details fields', async () => {
  await employeeDeatils.contactInformation();

});

Then('saves the employee contact details', async () => {
  await pageFixture.page.waitForTimeout(2000)
  await pageFixture.page.locator('form').filter({ hasText: 'AddressStreet 1Should not' }).getByRole('button').click()
  await pageFixture.page.waitForTimeout(3000)

});

//===================================================== EMERGENCY CONTACT DETAILS ====================================================================

When('the Admin wants to fill the Emergency contact details', async () => {
  await employeeDeatils.empNaviagetTo('Emergency Contacts', 'Assigned Emergency Contacts');

});

When('fills in the employee\'s Emergency contact details', async () => {
  await addButton();
  await expect(pageFixture.page.getByRole('heading', { name: 'Save Emergency Contact' })).toBeVisible();

});

When('the Admin enters more than 100 characters in the NameFields', async () => {
  await saveButton();
 await pageFixture.page.locator('form').getByRole('textbox').first().fill(maxData);

});

Then('the Admin should see the Maximum 100 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 100 characters').first()).toBeVisible();

});

When('the Admin enters more than 30 characters in the specificFields', async () => {
 await pageFixture.page.locator('form').getByRole('textbox').nth(2).fill(maxCharacter);
  await pageFixture.page.waitForTimeout(2000);

});

Then('the Admin should see the Maximum 30 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 30 characters')).toBeVisible();

});

When('the Admin tries save the Emergency contact details without Home TelePhone number', async () => {
 await pageFixture.page.locator('form').getByRole('textbox').nth(2).clear();

});

When('the Admin enters string instead of a number in the phone number field', async () => {
 await pageFixture.page.locator('form').getByRole('textbox').nth(2).fill('randomstring');

});

Then('admin should see the At least one phone number is required error message', async () => {
  await expect(pageFixture.page.getByText('At least one phone number is required')).toBeVisible();

});

When('the Admin enters valid Emergency contact details in the Emergency contact details fields', async () => {
  await employeeDeatils.emergencyContact();

});

When('saves the employee Emergency contact details', async () => {
  await saveButton();

});

//======================================================= DEPENDENTS DETAILS ==============================================================================

When('the Admin wants to fill the Dependents details', async () => {
  await employeeDeatils.empNaviagetTo('Dependents', 'Assigned Dependents');

});

When('fills in the employee\'s Dependents details', async () => {
  await addButton();
  await expect(pageFixture.page.getByRole('heading', { name: 'Add Dependent' })).toBeVisible();
 await pageFixture.page.locator('form').getByRole('textbox').first().fill(maxData);

});

When('the Admin choose the other option for Relationship', async () => {
  await pageFixture.page.getByText('-- Select --').click();
  await pageFixture.page.getByRole('option', { name: 'Other' }).click();

});

Then('the Admin should see the another text field for specify name', async () => {
  await pageFixture.page.getByRole('textbox').nth(2).fill('friend');

});

When('the Admin enters invalid on Date field', async () => {
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').fill('2024-27-14');
  await pageFixture.page.waitForTimeout(3000)
  await saveButton();;

});

Then("the Admin should see the Date format wrong error message", async () => {
  await expect(pageFixture.page.getByText('Should be a valid date in yyyy-dd-mm format')).toBeVisible();

});

When('the Admin enters valid details in the Dependents details fields', async () => {
  await employeeDeatils.dependentDetails();

});

Then('saves the employee Dependents details', async () => {
  await saveButton();

});

//=========================================================== IMMIGRATION DETAILS =======================================================================

When('the Admin wants to fill the Immigration details', async () => {
  await employeeDeatils.empNaviagetTo('Immigration', 'Assigned Immigration Records');

});

When('fills in the employee\'s Immigration details', async () => {
  await addButton();
  await expect(pageFixture.page.getByRole('heading', { name: 'Add Immigration' })).toBeVisible();
  await pageFixture.page.locator(Employee.immigrationDetails.passportName).first().fill(maxData);

});

When('the Admin enters more than 30 characters in the SpecificField', async () => {
  await pageFixture.page.locator(Employee.immigrationDetails.passportName).first().fill(maxData);

});

When('the Admin enters invalid on Issue Date field', async () => {
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill('2024-72-33');
  await saveButton();

});

When('the Admin enters the expired date less than issued Date', async () => {
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill('2024-12-12');
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2024-11-12');
  await saveButton();

});

Then('the Admin should see the Expiry date should be after issued date error messge', async () => {
  await expect(pageFixture.page.getByText('Expiry date should be after issued date')).toBeVisible();

});

When('the Admin enters more than 250 characters in comments section', async () => {
  await pageFixture.page.getByPlaceholder('Type Comments here').fill(maxData);

});

Then('the Admin should see the Maximum 250 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 250')).toBeVisible();

});

When('the Admin enters valid details in the Immigration details fields', async () => {
  await employeeDeatils.immigrationDetails();

});

Then('saves the employee Immigration details', async () => {
  await saveButton();

});

//============================================================= JOB DETAILS ==============================================================================

When('the Admin wants to fill the Job details', async () => {
  await employeeDeatils.empNaviagetTo('Job', 'Job Details');

});

When('fills in the employee\'s Job details', async () => {
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

});

When('the Admin wants to includes contract details', async () => {
  await pageFixture.page.locator('form span').click();

});

When('fills the contract date and upload the file', async () => {
  await pageFixture.page.setInputFiles("input[type='file']", filePath);

});

When('the Admin enters the contract end date less than start Date', async () => {
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2024-18-12');
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(2).fill('2024-14-12');
  await saveButton();

});

Then('the Admin should see the End date should be after start date error messge', async () => {
  await expect(pageFixture.page.getByText('End date should be after Start date')).toBeVisible();

});

When('the Admin wants to terminate Employment', async () => {
  await pageFixture.page.getByRole('button', { name: ' Terminate Employment ' }).click();
  await pageFixture.page.waitForTimeout(3000);

});

const terminateDate = '2024-20-12';
When('fill the reason for Termination on the popup message', async () => {
  await pageFixture.page.getByRole('dialog').getByPlaceholder('yyyy-dd-mm').fill(`${terminateDate}`);
  await pageFixture.page.getByText('-- Select --').click();
  await pageFixture.page.getByRole('option', { name: 'Resigned', exact: true }).click();

});

When('save the termination information', async () => {
  await pageFixture.page.getByRole('dialog').getByRole('button', { name: 'Save' }).click();

});

Then('the Admin should see the Termination date with Activation option on Job details page', async () => {
  await pageFixture.page.waitForTimeout(5000);
  await expect(pageFixture.page.getByRole('button', { name: 'Activate Employment' })).toBeVisible();

});

When('the Admin enters valid details in the Job details fields', async () => {
  await employeeDeatils.jobDetails();

});

Then('saves the employee Job details', async () => {
  await saveButton();

});

//================================================================= REPORTING TO DETAILS ====================================================================

When('the Admin wants to fill the Reporters details', async () => {
  await employeeDeatils.empNaviagetTo('Report-to', 'Report to');

});

When('fills in the employee\'s Reporters details', async () => {
  await addButton();
  await expect(pageFixture.page.getByRole('heading', { name: 'Add Supervisor' })).toBeVisible();

});

const supervisorName = 'Virat  Kohli';
const invalidName = 'Mark';
When('the Admin enters the Supervisor name', async () => {
  await pageFixture.page.getByRole('textbox', { name: 'Type for hints...' }).fill(`${invalidName}`);
  await pageFixture.page.waitForTimeout(3000);

});

When('the Supervisor name doesn\'t exist', async () => {
  await saveButton();;

});

When('the Admin enters the Subordinate name', async () => {
  await pageFixture.page.getByRole('textbox', { name: 'Type for hints...' }).fill(`Virat`);
  await pageFixture.page.waitForTimeout(2000);
  await pageFixture.page.getByRole('option', { name: `${supervisorName}` }).click();
  await pageFixture.page.getByText('-- Select --').click();
  await pageFixture.page.getByRole('option', { name: 'Direct', exact: true }).click();
  await saveButton();;
  await pageFixture.page.waitForTimeout(2000)

});

When('the Subordinate name doesn\'t exist', async () => {
  await pageFixture.page.locator('div').filter({ hasText: Employee.reportingToDetails.subordinatorSelectButton }).getByRole('button').click();
  await pageFixture.page.locator(Employee.reportingToDetails.subordinatorField).fill(`${invalidName}`);
  await pageFixture.page.waitForTimeout(3000);
  await saveButton();

});

When('the Admin enters valid details in the Reporters details fields', async () => {
  await employeeDeatils.reportersDetails();

});

When('saves the employee Reporters details', async () => {
  await saveButton();

});

//========================================================= SALARY DETAILS ============================================================================

When('the Admin wants to fill the Salary details', async () => {
 
  await employeeDeatils.empNaviagetTo('Salary', 'Assigned Salary Components');
});

When('fills in the employee\'s Salary details', async () => {
  await addButton();

});

When('the Admin enters more than 100 characters in the Salary Component', async () => {
  await pageFixture.page.getByRole('textbox').nth(1).fill(maxData);

});

When('the Admin choose the {string} options', async (grade) => {
  await pageFixture.page.getByText('-- Select --').first().click();
  await pageFixture.page.getByRole('option', { name: grade }).click();

});

When('the Admin can choose the currency detail', async () => {
  await pageFixture.page.getByText('-- Select --').nth(1).click();
  await pageFixture.page.getByRole('option', { name: 'United States Dollar' }).click();

});

Then('the Admin should see the salary {string}', async (salaryLimits) => {
  await expect(pageFixture.page.getByText(salaryLimits)).toBeVisible();

});

When('the Admin enters the Salary Amount more than limitations', async () => {
  await pageFixture.page.getByRole('textbox').nth(2).fill('6000566');
  await pageFixture.page.waitForTimeout(2000)

});

When('the Admin enters the Salary Amount more than 1000000000', async () => {
  await pageFixture.page.getByRole('textbox').nth(2).fill('60005669087798465');

});

Then('the Admin should see the Amount limitation error message', async () => {
  await expect(pageFixture.page.getByText('Should be within Min/Max values')).toBeVisible();

});

Then('the Admin should see the salary limitation error message', async () => {
  await expect(pageFixture.page.getByText('Should be less than 1,000,000,000')).toBeVisible();

});

When('the Admin enters sting instead of number', async () => {
  await pageFixture.page.getByRole('textbox').nth(2).fill('Amount');

});

Then('the Admin should see the should be number error message', async () => {
  await expect(pageFixture.page.getByText('Should be a number')).toBeVisible();

});

When('the Admin enters more than 250 characters in Comments text area', async () => {
  await pageFixture.page.locator('textarea').fill(maxData);

});

When('the Admin wants to include the Direct Deposit details', async () => {
  await pageFixture.page.locator('div').filter({ hasText: Employee.salaryDetails.depositField }).locator('span').click();
  await pageFixture.page.waitForTimeout(2000)

});

When('the Admin enters more than 100 characters in the AccountFields', async () => {
  await pageFixture.page.locator('div').filter({ hasText: Employee.salaryDetails.accountField }).getByRole('textbox').fill(maxData);
});

When('the Admin enters more than 9 characters in Rounting number', async () => {
  await pageFixture.page.locator('div').filter({ hasText: Employee.salaryDetails.amountField }).getByRole('textbox').first().fill('97672343434424452')
  await pageFixture.page.waitForTimeout(2000)

});

Then('the Admin should see the Maximum 9 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 9 characters')).toBeVisible();

});

When('the Admin choose the other option instead of Accont type', async () => {
  await pageFixture.page.getByText('-- Select --').nth(1).click();
  await pageFixture.page.getByRole('option', { name: 'Other' }).click();
  await pageFixture.page.waitForTimeout(2000);

});

Then('the Admin should see the another text field for specified name', async () => {
  await expect(pageFixture.page.locator(Employee.salaryDetails.otherDepositMethodField).first()).toBeVisible();

});

When('the Admin enters more than 20 characters in Specify name field', async () => {
  await pageFixture.page.locator(Employee.salaryDetails.otherDepositMethodField).first().fill(maxData);
  await pageFixture.page.waitForTimeout(2000);

});

Then('the Admin should see the Maximum 20 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 20 characters')).toBeVisible();

});

When('the Admin enters valid details in the Salary details fields', async () => {
  await employeeDeatils.salaryDetails();

});

When('saves the employee Salary details', async () => {
  await saveButton();;

});

//============================================================= QUALIFICATION DETAILS =========================================================================

When('the Admin wants to fill the work experience details', async () => {
  await employeeDeatils.empNaviagetTo('Qualifications', 'Qualifications');

});

//=============================================================== WORK EXPERIENCE ===========================================================================//

When('fills in the employee\'s Work experience details', async () => {
  await addButton();

});

When('the Admin enters more than 100 characters in the JobFields', async () => {
 await pageFixture.page.locator('form').getByRole('textbox').first().fill(maxData);
 await pageFixture.page.locator('form').getByRole('textbox').nth(1).fill(maxData);
  await pageFixture.page.waitForTimeout(2000);
});

When('the Admin enters the To date less than From Date', async () => {
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill('2024-24-12');
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2024-14-12');
  await saveButton();;

});

Then('the Admin should see the To date should be after From date error messge', async () => {
  await expect(pageFixture.page.getByText('To date should be after from date')).toBeVisible();

});

When('the Admin enters more than 200 characters in comments section', async () => {
  await pageFixture.page.locator('textarea').fill(maxData);

});

Then('the Admin should see the Maximum 200 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 200 characters')).toBeVisible();

});

When('the Admin enters valid details in the Work experience details fields', async () => {
  await employeeDeatils.workExperienceDetails();

});

When('saves the employee Work experience details', async () => {
  await saveButton();;

});

Then('the Admin should see the work experience information in the Records table', async () => {
  await expect(pageFixture.page.getByRole('cell', { name: 'crystal delta' })).toBeVisible();

});

//================================================================== EDUCATION ====================================================================================//

When('the Admin wants to fill the Education details', async () => {
  await pageFixture.page.getByRole('button', { name: ' Add' }).nth(1).click();

});

When('fills in the employee\'s Education details', async () => {
  await expect(pageFixture.page.getByRole('heading', { name: "Add Education" })).toBeVisible();
});

When('the Admin enters more than 100 characters in the InstitutionFields', async () => {
  await pageFixture.page.locator(Employee.educationDeatils.institutionLocator).first().fill(maxData);
  await pageFixture.page.locator(Employee.educationDeatils.institutionLocator).first().fill(maxData);
  await pageFixture.page.waitForTimeout(2000);
});

When('the Admin enters the years more than 4 characters in years', async () => {
  await pageFixture.page.locator(Employee.educationDeatils.yearsField).fill('87873444343');

});

Then('the Admin should see the Maximum 4 characters limit error message', async () => {
  await expect(pageFixture.page.getByText('Should not exceed 4 characters')).toBeVisible();

});

When('the Admin enters sting instead of number in years', async () => {
  await pageFixture.page.locator(Employee.educationDeatils.yearsField).fill('sam');

});

When('the Admin enters the years more than 25 characters in CGPA and Score', async () => {
  await pageFixture.page.locator(Employee.educationDeatils.cgpaScoreField).fill(maxData);

});

When('the Admin enters the end date less than start Date', async () => {
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').first().fill('2024-24-12');
  await pageFixture.page.getByPlaceholder('yyyy-dd-mm').nth(1).fill('2024-14-12');
  await saveButton();;

});

When('the Admin enters valid details in the Education details fields', async () => {
  await employeeDeatils.educationDetails();

});

When('saves the employee Education details', async () => {
  await saveButton();;
  await pageFixture.page.waitForTimeout(3000);
  await saveButton();;

});

Then('the Admin should see the Education information in the Records table', async () => {
  await expect(pageFixture.page.getByRole('cell', { name: 'Bachelor\'s Degree' }).locator('div')).toBeVisible();

});

//================================================================== SKILL ====================================================================================//

When('the Admin wants to fill the Skill details', async () => {
  await pageFixture.page.getByRole('button', { name: ' Add' }).nth(2).click();

});

When('fills in the employee\'s Skill details', async () => {
  await expect(pageFixture.page.getByRole('heading', { name: "Add Skill" })).toBeVisible();

});

When('the Admin enters the years more than 100 in years of Experience', async () => {
  await pageFixture.page.locator('form input').fill(maxData);

});

Then('the Admin should see the Maximum 100 years limit error message', async () => {
  await expect(pageFixture.page.getByText('Should be a number')).toBeVisible();

});

When('the Admin enters more than 100 characters in comments section', async () => {
  await pageFixture.page.locator('textarea').fill(maxData);

});

When('the Admin enters valid details in the skill details fields', async () => {
  await employeeDeatils.skillDetails();

});

When('saves the employee skill details', async () => {
  await saveButton();

});

Then('the Admin should see the Skill information in the Records table', async () => {
  await expect(pageFixture.page.getByText('JIRA')).toBeVisible();

});
