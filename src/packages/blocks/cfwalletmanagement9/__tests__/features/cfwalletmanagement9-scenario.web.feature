Feature: cfwalletmanagement9

    Scenario: User navigates to cfwalletmanagement9 and inputs text
        Given I am a User loading cfwalletmanagement9
        When I navigate to the cfwalletmanagement9
        Then cfwalletmanagement9 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to cfwalletmanagement9 and inputs a password
        Given I am a User loading cfwalletmanagement9
        When I navigate to the cfwalletmanagement9
        And I want to enter a password
        Then cfwalletmanagement9 will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors