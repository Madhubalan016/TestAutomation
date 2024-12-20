@SiteValidation 
Feature: validate the testing website

Scenario: Validate the login form
Given the user is on HomePage
When the user enter the email'<Email>'
And the user enter the password'<Password>'
And the user click the submit button
Then the user should view the shopping cart

Examples: 
| Email           | Password |
| admin@admin.com | admin123 |

Scenario: Validate the error message for wrong credentials
Given the user is on HomePage
When user enter the email is'<WrongEmail>'
And user enter the password is'<WrongPassword>'
And the user click the submit button
Then the user should view the error message

Examples: 
| WrongEmail | WrongPassword |
| wrongemail | wrongPass     |
| wrong@email.com | adminPass |

@ShoppingCart
Scenario: user purchase the products
Given the user is on HomePage
When user enter the login credentials'<Email>','<Password>'
And the user click the submit button
Then the user should be on the shopping page

Examples:
| Email           | Password |
| admin@admin.com | admin123 |

@ProductsValidation
Scenario: validate the user orders
Given the user is on shopping page
When the user try to buy a products through add to cart button
And user verify the product name
And user verify the product price 
And user verify the product Quantity
Then user should confirm the orders in the list of items

@RemoveButtonValidation
Scenario: validate the Remove button
Given the user is on shopping page
When the user after click the add to cart button
And the user should view on the Remove button
And the user click the Remove button
Then a product should Remove the list of items & its price should be decrease

Scenario: Validate the checkbox
Given the user is on HomePage
When the user try to validate the checkbox
And the user click the checkbox
And the user click the reset button
Then user should see the uncheck the checkbox

@ValidAddToCartButton
Scenario: user can not buy same product again
Given the user is on shopping page
When the user try to buy the same product
Then the user should view the alert message

@UserCredentialsValidation
Scenario: User try to proceed checkout
Given the user is on shopping page
When user buy the products
And user try to proceed the checkout
And user fill the credentials for checkout
Then user should view the confirmation message

@LogoutValidation
Scenario: user try to Logout
Given the user is on shopping page
When the user Logout from shopping page
Then the user should be on Login page
