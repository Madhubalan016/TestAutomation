@EmployeeLeaveReport
Feature: Validate the Employee Leave Report

@ApplyLeave
Scenario: Employee as user Apply leave 
Given user Navigates the Employee Dashboard Page
When the user try to Apply the leave
When the user select the Leave type
When the user choose the Leave date
Then user should view the Duration label
When the user select the Duration
And the user can Apply the Leave
Then user should see the Leave details on Record Table


Scenario: Employee as user Apply leave with invalid date
Given user is on Dashboard Page
When the user try to Apply the leave
And the user select the Leave type
And the user enter invalid Date
Then the user should see the Error message

# Scenario: Select Duration for leave
# Given user is on Leave Page
# When the user select the Leave type
# When user apply more than one days
# Then user should see the partial days label
# When user select '<options>'
# Then user should see the '<optionLabel>' label

# Examples: 
#   | options        | optionLabel |
#   | All Days       | Duration    |
#   | Start Day Only | Start Day   |
#   | End Day Only   | End Day     |
#   | Start And End Day | Start Day |

@EditTime
Scenario: Edit Duration time
Given user Navigates the Employee Dashboard Page
And user is on Leave Page
When the user select the Leave type
And the user choose the Leave date
And user select specify time
Then user should see the Time edit options

When user enter the time over the Workshift time
Then user should see the overtime error message

When user enter the invalid time period
Then user should see the FromTo time error message

When user Edit the Time period
And user should confirm the Duration hours
And user add the comment on the comment box

When user navigates the My leave Module 
Then user should confirmed the leave is Added to the Record table Successfully

When user want to cancel the applied leave 
Then the applied leave should be cancelled












