import { Page } from "playwright/test"

export const pageFixture = {
    //@ts-ignore
    page: undefined as Page
}


export const webPage = {
    webPageUrl :'https://www.mockaroo.com/',
    empLoginPageUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
}
export const usercredentials = {
    emailId: '//div[@class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"]/input[@name="email"]',
    password: '//div[@class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"]/input[@name="password"]',
    confirmPassword: '//div[@class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"]/input[@name="confirm_password"]',
  }

export const webEditor = {
    webPageUrl: "https://qa-practice.netlify.app/auth_ecommerce",
}

const userInputs = {
    emailLocator: 'Enter email - insert admin@admin.com',
    passwordLocator: 'Enter password - insert admin123'
}

const Buttons = {
    addToCartLocator: '#prooood > section:nth-child(2) > div > div:nth-child(1) > div > button',
    samSungButton: '#prooood > section:nth-child(2) > div > div:nth-child(3) > div > button',
    submitOrderLocator: 'Submit Order'
}
const userAddress = {
    phoneNumberLocator: 'Enter phone number',
    addressLocator: '5876 Little Streets',
    cityLocator: 'London',
    contryLocator: '#countries_dropdown_menu'
}
const FrameLocator = {
    iframeLocator: '//iframe[@class="embed-responsive-item"]'
}

const products = {
    appleIphone: `//span[@class="cart-item-title"][text()="Apple iPhone 12, 128GB, Black"]`,
    samsungGalaxy: '//span[@class="cart-item-title"][text()="Samsung Galaxy A32, 128GB, White"]'
}

const price ={
    totalPriceLocator: '//span[@class="cart-total-price"]',
    actualPrice: '//span[@class="cart-price cart-column"]'
}

const error = {
 requiredError: '//span[@class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]',
 invalidError: '//p[@class="oxd-text oxd-text--p oxd-alert-content-text"][text()="Invalid credentials"]'
}

const timeAndDate = {
    timePlaceholder: 'hh:mm',
    datePlaceholder: "yyyy-dd-mm",
    durationlabel: '//label[@class="oxd-label"][text()="Duration"]',
    fulldayLabel: '//div[@class="oxd-select-text-input"][text()="Full Day"]',
    fromTimeLocator: `//label[@class="oxd-label oxd-input-field-required"][text()="From"]`,
    toTimeLocator: `//label[@class="oxd-label oxd-input-field-required"][text()="To"]`
}

const textLabelSelector = {
    usernameFieldselector: '//div[@class="oxd-select-text-input"][text()="-- Select --"]',
    editUserSelector: '//input[@class="oxd-input oxd-input--focus"]',
    deleteUserLocator: '//button[@class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]',
    leaveTypeLocator: '//div[@class="oxd-select-text-input"][text()="-- Select --"]',
    partialDaysLabel: '//label[@class="oxd-label"][text()="Partial Days"]',
    lableLocator: '//div[@class="oxd-select-text-input"][text()="-- Select --"]',

}

export const Test = {
    userInputs,
    Buttons,
    userAddress,
    FrameLocator,
    products,
    price,
    error,
  timeAndDate,
  textLabelSelector
 }

//================================================ EMPLOYEE DETAILS LOCATORS ==========================================================================

const personalDetails = {
    newUserField: '//span[@class="oxd-switch-input oxd-switch-input--active --label-right"]',
    usernameLocator: 'div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input',
    passwordLocator: 'input[type="password"]',
    empIdLocator: /^Employee Full NameEmployee IdShould not exceed 10 characters$/,
    otherIdLocator: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(2) > input',
    genderLocator: /^Date of BirthGenderMaleFemale$/
}

const contactDetails = {
    nameField: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(2) > input',
     addressField: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(2) > input',
     postalField: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(3) > div > div:nth-child(5) > div > div:nth-child(2) > input',
     phNumberField: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(6) > div > div:nth-child(1) > div > div:nth-child(2) > input',
     emailField: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div.orangehrm-horizontal-padding.orangehrm-vertical-padding > form > div:nth-child(9) > div > div:nth-child(1) > div > div:nth-child(2) > input'
}

const immigrationDetails = {
    passportName: 'div:nth-child(2) > .oxd-input',
    eligbleLocator: 'div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-input',

}

const filePathDetails = {
    screenshotFile: './testResults/testFiles/Screenshot from 2024-12-16 16-46-52.png',
    videoFile: './testResults/testFiles/Madhubalan.mp4',
    invalidFile: './testResults/testFiles/cube-1655118_640.webp',
    inputFileLocator: "input[type='file']"
}

const salaryDetails = {
    accountNumberField: 'div:nth-child(4) > div > div > .oxd-input-group > div:nth-child(2) > .oxd-input',
    rountingNumberField: /^Routing NumberShould not exceed 9 charactersAmount$/,
    amountField: /^Routing NumberAmount$/,
    depositField: /^Include Direct Deposit Details$/,
    accountField: /^Account NumberAccount Type-- Select --$/,
    otherDepositMethodField: '//div[@class="oxd-input-group oxd-input-field-bottom-space"]//input[@class="oxd-input oxd-input--active"]'
}

const educationDeatils = {
    institutionLocator: '//div[@class="oxd-input-group oxd-input-field-bottom-space"]//input[@class="oxd-input oxd-input--active"]',
    institutionField: 'div:nth-child(2) > .oxd-input',
    departmentField: 'div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-input',
    yearsField: 'div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-input',
    cgpaScoreField: 'div:nth-child(5) > .oxd-input-group > div:nth-child(2) > .oxd-input'
}

const reportingToDetails = {
    reportTypeSelector: '//div[@class="oxd-select-text-input"][text()="-- Select --"]',
    subordinatorField: '#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div > div > div.orangehrm-edit-employee-content > div:nth-child(3) > div.orangehrm-horizontal-padding.orangehrm-top-padding > form > div.oxd-form-row > div > div:nth-child(1) > div > div:nth-child(2) > div > div > input',
    subordinatorSelectButton: /^Assigned Subordinates Add No Records FoundNameReporting MethodActions$/,

}

export const Employee = {
    personalDetails,
    contactDetails,
    immigrationDetails,
    filePathDetails,
    salaryDetails,
    educationDeatils,
    reportingToDetails
}


