Feature: cfwalletmanagement9

    Scenario: User can input text into cfwalletmanagement9
        Given I am a user loading cfwalletmanagement9
        When I navigate to the cfwalletmanagement9
        Then cfwalletmanagement9 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfwalletmanagement9
        When I navigate to the cfwalletmanagement9
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfwalletmanagement9
        Given I am a user loading cfwalletmanagement9
        When I navigate to the cfwalletmanagement9
        Then cfwalletmanagement9 will load with out errors
        And I can dismiss cfwalletmanagement9

    Scenario: cfwalletmanagement9 has event listeners for screen size changes added
        Given I am a user loading cfwalletmanagement9
        When I load cfwalletmanagement9
        Then the dimensions function has an event listener added

    Scenario: cfwalletmanagement9 resizing events are triggered
        Given I am a user loading cfwalletmanagement9
        When I load cfwalletmanagement9 and change screen size
        Then the window change event is fired