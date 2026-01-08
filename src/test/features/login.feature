Feature: User authentication
  As a registered user
  I want to authenticate using my credentials
  So that I can access the application securely

  Background:
    Given the user is on the login page
  @regression
  Scenario: Successful login with valid credentials
    When the user logs in with valid credentials
    Then the user should be logged in successfully

  Scenario Outline: Login attempts with invalid credentials
    When the user logs in with username "<username>" and password "<password>"
    Then an authentication error should be displayed

    Examples:
      | username | password    |
      | ortoni11  | Pass1234    | 
      | koushik  | Passkoushik | 
