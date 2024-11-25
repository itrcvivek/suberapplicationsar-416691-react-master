Feature: cfstcpayintegration1

    Scenario: User navigates to cfstcpayintegration1 and inputs text
        Given I am a User loading cfstcpayintegration1
        When I navigate to the cfstcpayintegration1
        Then cfstcpayintegration1 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to cfstcpayintegration1 and inputs a password
        Given I am a User loading cfstcpayintegration1
        When I navigate to the cfstcpayintegration1
        And I want to enter a password
        Then cfstcpayintegration1 will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors