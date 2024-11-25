Feature: servicespecificsettingsadmin2

    Scenario: User can input text into servicespecificsettingsadmin2
        Given I am a user loading servicespecificsettingsadmin2
        When I navigate to the servicespecificsettingsadmin2
        Then servicespecificsettingsadmin2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading servicespecificsettingsadmin2
        When I navigate to the servicespecificsettingsadmin2
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from servicespecificsettingsadmin2
        Given I am a user loading servicespecificsettingsadmin2
        When I navigate to the servicespecificsettingsadmin2
        Then servicespecificsettingsadmin2 will load with out errors
        And I can dismiss servicespecificsettingsadmin2

    Scenario: servicespecificsettingsadmin2 has event listeners for screen size changes added
        Given I am a user loading servicespecificsettingsadmin2
        When I load servicespecificsettingsadmin2
        Then the dimensions function has an event listener added

    Scenario: servicespecificsettingsadmin2 resizing events are triggered
        Given I am a user loading servicespecificsettingsadmin2
        When I load servicespecificsettingsadmin2 and change screen size
        Then the window change event is fired