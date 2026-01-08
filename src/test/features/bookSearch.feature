Feature: Search for a book in the Book Cart application

  Background:
    Given the user is on the login page
@auth
  Scenario: Search for a book after logging in
    When the user searches for "The Great Gatsby"
    Then the search results should display "The Great Gatsby"
  