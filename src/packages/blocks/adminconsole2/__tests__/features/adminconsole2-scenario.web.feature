Feature: adminconsole2

    Scenario: User navigates to adminconsole2 and inputs text
        Given I am a User loading adminconsole2
        When I navigate to the adminconsole2
        Then adminconsole2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to adminconsole2 and inputs a password
        Given I am a User loading adminconsole2
        When I navigate to the adminconsole2
        And I want to enter a password
        Then adminconsole2 will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors