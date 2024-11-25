Feature: cfsuggestavailabletripstothetraveller

    Scenario: User navigates to cfsuggestavailabletripstothetraveller and inputs text
        Given I am a User loading cfsuggestavailabletripstothetraveller
        When I navigate to the cfsuggestavailabletripstothetraveller
        Then cfsuggestavailabletripstothetraveller will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to cfsuggestavailabletripstothetraveller and inputs a password
        Given I am a User loading cfsuggestavailabletripstothetraveller
        When I navigate to the cfsuggestavailabletripstothetraveller
        And I want to enter a password
        Then cfsuggestavailabletripstothetraveller will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors