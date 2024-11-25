Feature: cfcalculatethecostoftrips

    Scenario: User navigates to cfcalculatethecostoftrips and inputs text
        Given I am a User loading cfcalculatethecostoftrips
        When I navigate to the cfcalculatethecostoftrips
        Then cfcalculatethecostoftrips will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to cfcalculatethecostoftrips and inputs a password
        Given I am a User loading cfcalculatethecostoftrips
        When I navigate to the cfcalculatethecostoftrips
        And I want to enter a password
        Then cfcalculatethecostoftrips will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors