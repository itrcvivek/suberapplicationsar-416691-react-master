Feature: cfcaptaintocreatetrips

    Scenario: User navigates to cfcaptaintocreatetrips and inputs text
        Given I am a User loading cfcaptaintocreatetrips
        When I navigate to the cfcaptaintocreatetrips
        Then cfcaptaintocreatetrips will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to cfcaptaintocreatetrips and inputs a password
        Given I am a User loading cfcaptaintocreatetrips
        When I navigate to the cfcaptaintocreatetrips
        And I want to enter a password
        Then cfcaptaintocreatetrips will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors