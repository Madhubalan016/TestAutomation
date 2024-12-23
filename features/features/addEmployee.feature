@AddNewEmployee
Feature: Add new employee and verify by records

@CreateNew
Scenario: Admin creates a new employee
  Given the Admin navigates to the PIM page
  When the Admin tries to add a new employee
  And enters the employee Details on the Add Employee page

  When the Admin wants to create a username
  And the Admin tries to save details without entering the name EmptyDetails
  Then the Admin should not be able to save the details
  
  When fills in the employee's user details
  And the employee ID already exists
  Then the Admin should see an error message

  When the Admin enters more than 10 characters in the Employee ID field
  Then the Admin should see a Maximum 10 character limit exceeded error message
  When the Admin fills valid informations 
  And clicks the Save button
  Then the Admin is redirected to the main details filling page
 
@PersonalDetails
Scenario: Admin fill the personal Details
  When the Admin enters more than 30 characters in the Other ID field
  Then the Admin should see a Maximum 30 character limit exceeded error message

  When the Admin wants to upload the attachment file 
  And choose the file more than 1MB
  Then the Admin should be see the file size exceed error message

  When the Admin uploads the image instead of jpg or png 
  Then the Admin should see the file type not allowed error message 

  When the Admin enters valid personal details in the Personal Details fields
  Then saves the employee personal details
  # Then the Admin should see the personal information in the Records table


@ContactDetails
Scenario: Admin fills the contact details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the contact details
  And fills in the employee's contact details
  And the Admin enters more than 70 characters in the AddressFields
  Then the Admin should see the Maximum 70 characters limit error message

  When the Admin enters more than 25 characters in the SpecifiedFields
  Then the Admin should see the Maximum 25 characters limit error message

  When the Admin enters a string instead of a number in the phone number field
  Then the Admin should see the '<error>' message

  When the Admin enters an invalid email ID
  Then the Admin should see the Invalid email format error message

  When the Admin enters valid contact details in the contact details fields
  Then saves the employee contact details
  # Then the Admin should see the contact information in the Records table
  
  Examples: 
    | error                           |
    |Allows numbers and only + - / ( )|

@EmergencyContactDetails
Scenario: Admin fills the Emergency contact details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the Emergency contact details
  And fills in the employee's Emergency contact details
  And the Admin enters more than 100 characters in the NameFields
  Then the Admin should see the Maximum 100 characters limit error message

  When the Admin enters more than 30 characters in the specificFields
  Then the Admin should see the Maximum 30 characters limit error message

  When the Admin tries save the Emergency contact details without Home TelePhone number
  Then admin should see the At least one phone number is required error message

  When the Admin enters string instead of a number in the phone number field
  Then the Admin should see the '<error>' message

  When the Admin enters valid Emergency contact details in the Emergency contact details fields
  Then saves the employee Emergency contact details
  # Then the Admin should see the Emergency contact information in the Records table

 Examples: 
    | error                           |
    |Allows numbers and only + - / ( )|

@DependentsDetails
Scenario: Admin fills the Dependents details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the Dependents details
  And fills in the employee's Dependents details
  And the Admin enters more than 100 characters in the NameFields
  Then the Admin should see the Maximum 100 characters limit error message

  When the Admin choose the other option for Relationship
  Then the Admin should see the another text field for specify name
  
  When the Admin enters invalid on Date field
  Then the Admin should see the Date format wrong error message

  When the Admin enters valid details in the Dependents details fields
  Then saves the employee Dependents details
  # Then the Admin should see the Dependents information in the Records table

@ImmigrationDetails
Scenario: Admin fills the Immigration Details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the Immigration details
  And fills in the employee's Immigration details

  When the Admin enters more than 30 characters in the SpecificField
  Then the Admin should see the Maximum 30 characters limit error message
  
  When the Admin enters invalid on Issue Date field
  Then the Admin should see the Date format wrong error message

  When the Admin enters the expired date less than issued Date 
  Then the Admin should see the Expiry date should be after issued date error messge

  When the Admin enters more than 250 characters in comments section
  Then the Admin should see the Maximum 250 characters limit error message

  When the Admin enters valid details in the Immigration details fields
  Then saves the employee Immigration details
  # Then the Admin should see the Immigration information in the Records table


@JobDetails
Scenario: Admin fills the Job details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the Job details
  And fills in the employee's Job details
  
  When the Admin wants to includes contract details
  And fills the contract date and upload the file 

  And the Admin enters the contract end date less than start Date 
  Then the Admin should see the End date should be after start date error messge
  
  When the Admin wants to terminate Employment
  And fill the reason for Termination on the popup message 
  And save the termination information
  Then the Admin should see the Termination date with Activation option on Job details page

  When the Admin enters valid details in the Job details fields
  Then saves the employee Job details
#   Then the Admin should see the Job information in the Records table

@SalaryDetails
Scenario: Admin fills the Salary details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the Salary details
  And fills in the employee's Salary details
  And the Admin enters more than 100 characters in the Salary Component
  Then the Admin should see the Maximum 100 characters limit error message

  
  When the Admin choose the '<Grade>' options 
  And the Admin can choose the currency detail 
 Then the Admin should see the salary '<limitations>'

  When the Admin enters the Salary Amount more than limitations
  Then the Admin should see the Amount limitation error message
  
  When the Admin enters the Salary Amount more than 1000000000
  Then the Admin should see the salary limitation error message

  When the Admin enters sting instead of number
  Then the Admin should see the should be number error message

  When the Admin enters more than 250 characters in Comments text area
  Then the Admin should see the Maximum 250 characters limit error message

  When the Admin wants to include the Direct Deposit details
  And the Admin enters more than 100 characters in the AccountFields
  Then the Admin should see the Maximum 100 characters limit error message

  When the Admin enters more than 9 characters in Rounting number
  Then the Admin should see the Maximum 9 characters limit error message

  When the Admin choose the other option instead of Accont type
  Then the Admin should see the another text field for specified name

  When the Admin enters more than 20 characters in Specify name field
  Then the Admin should see the Maximum 20 characters limit error message

  When the Admin enters valid details in the Salary details fields
  And saves the employee Salary details
  # Then the Admin should see the Salary information in the Records table

Examples: 
  | Grade   | limitations             |
  | Grade 1 | Min: 50000 - Max: 60000 |

@ReportingToDetails
Scenario: Admin fills the Reporters Details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the Reporters details
  And fills in the employee's Reporters details

  When the Admin enters the Supervisor name 
  And the Supervisor name doesn't exist
  Then Admin should see the Invalid error message

  When the Admin enters the Subordinate name 
  And the Subordinate name doesn't exist
  Then Admin should see the Invalid error message

  When the Admin enters valid details in the Reporters details fields
  And saves the employee Reporters details
  # Then the Admin should see the Reporters information in the Records table

@QualificationDetails
Scenario: Admin fills the Qualification Details
  # Given the Admin navigates to the PIM page
  When the Admin wants to fill the work experience details
  And fills in the employee's Work experience details
  And the Admin enters more than 100 characters in the JobFields
  Then the Admin should see the Maximum 100 characters limit error message
 
  When the Admin enters the To date less than From Date 
  Then the Admin should see the To date should be after From date error messge

  When the Admin enters more than 200 characters in comments section
  Then the Admin should see the Maximum 200 characters limit error message
  
  When the Admin enters valid details in the Work experience details fields
  And saves the employee Work experience details
  Then the Admin should see the work experience information in the Records table

  When the Admin wants to fill the Education details
  And fills in the employee's Education details

  And the Admin enters more than 100 characters in the InstitutionFields
  Then the Admin should see the Maximum 100 characters limit error message

  When the Admin enters the years more than 4 characters in years
  Then the Admin should see the Maximum 4 characters limit error message

  When the Admin enters sting instead of number in years
  Then the Admin should see the should be number error message

  When the Admin enters the years more than 25 characters in CGPA and Score
  Then the Admin should see the Maximum 25 characters limit error message

  When the Admin enters the end date less than start Date 
  Then the Admin should see the End date should be after start date error messge

  When the Admin enters valid details in the Education details fields
  And saves the employee Education details
  Then the Admin should see the Education information in the Records table
  
  When the Admin wants to fill the Skill details
  And fills in the employee's Skill details

  When the Admin enters the years more than 100 in years of Experience
  Then the Admin should see the Maximum 100 years limit error message
  
  When the Admin enters more than 100 characters in comments section
  Then the Admin should see the Maximum 100 characters limit error message

  When the Admin enters valid details in the skill details fields
  And saves the employee skill details
  Then the Admin should see the Skill information in the Records table

  # Lanuage logics
   
  




 


