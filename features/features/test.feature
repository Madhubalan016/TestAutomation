@Navigation
Feature: Check the Login validatation

@Signup 
Scenario: User signup into the webpage
Given user is on main page
When user click on the signup button
And user enter the firstName and lastName
And user click the submit button
Then Login registration should be success

@Navigations
Scenario: click the All navigation and verify
Given user is on HomePage
When user click '<Navigation>' link
Then user verify the content on '<PageContent>' page

Examples:
| Navigation | PageContent |
| SCHEMAS    | My Schemas  |
| DATASET    | My Datasets |
| APIS       | Mock APIs   |
| SCENARIOS |  My Scenarios |
| PROJECTS | My Projects |
| FUNCTIONS | My Functions |