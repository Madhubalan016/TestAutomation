@AdminPage
Feature: Validate the Admin Access

@AdminAccess
Scenario: Admin can add,edit and delete the new username
Given user Navigates the Employee Dashboard Page
Given Admin is navigates to admin Page
And the Admin can try add the username
And the Admin try to assign role and new username
And the admin enter the Password 
And validate the confirm password
Then Admin can confirmed the assigned role on Record table

When admin want to edit the user details
And Save the user information 
Then updated the information to the Record table

When admin want to delete the username
Then admin should not see the deleted username on the record table

@ExistUserError
Scenario: Invalid user, password and exist user 
# Given user Navigates the Employee Dashboard Page
# Given Admin is navigates to admin Page
And the Admin can try add the username

When Admin can not enter the password less than 7
Then Admin should see the error message

When Admin can not enter the password without any number
Then Admin should see the password must error message

When Admin enter the password and confirm password is not same
Then Admin should see the password must match error message

When Admin can not enter the name which is not be there
Then Admin should see the Invalid error message

When Admin can not enter the name which is already exist
Then Admin should see the already exist error message