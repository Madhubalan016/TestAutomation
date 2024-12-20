@EmployeeManagement
Feature: Validate the Employee Management Application

@InvalidLogin
Scenario: Invalid login
Given user Navigates the Login Page
When user enter the wrong username is '<wrongUsername>'
And user enter the wrong password is '<wrongPassword>'
And user click the login button
Then user should view the Error message

Examples: 
 | wrongUsername | wrongPassword |
 | Admin123       | wrong admin   |
 
@LoginWithEmptyData
Scenario: Login with empty Data
# Given user Navigates the Login Page
When the user try to login with empty fields
Then the user should view required error message
When the user enters only username is '<username>' for login
Then the user should view password required error message
When the user enters only password is '<password>' for login
Then the user should view username required error message 

Examples: 
 | username | password |
 | Admin    | admin123 |

@BadCredentials
Scenario: Valid login
# Given user Navigates the Login Page
When user enter the username is '<username>'
And user enter the wrong password is '<wrongPassword>'
And user click the login button
Then user should view the Error message
When user enter the wrong username is '<wrongUsername>'
And user enter the password is '<password>'
And user click the login button
Then user should view the Error message

Examples:
 | username | password | wrongUsername | wrongPassword |
 | Admin    | admin123 | Admin123      | wrong admin   |
 
@LoginValidation
Scenario: Valid login
# Given user Navigates the Login Page
When user enter the username is '<username>'
And user enter the password is '<password>'
And user click the login button
Then user should be on HomePage

Examples: 
 | username | password |
 | Admin    | admin123 |

