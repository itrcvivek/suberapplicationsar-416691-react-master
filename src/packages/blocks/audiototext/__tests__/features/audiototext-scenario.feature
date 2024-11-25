Feature: audiototext

    Scenario: User can input text into audiototext
        Given I am a user loading audiototext
        When I navigate to the audiototext
        Then audiototext will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading audiototext
        When I navigate to the audiototext
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from audiototext
        Given I am a user loading audiototext
        When I navigate to the audiototext
        Then audiototext will load with out errors
        And I can dismiss audiototext

    Scenario: audiototext has event listeners for screen size changes added
        Given I am a user loading audiototext
        When I load audiototext
        Then the dimensions function has an event listener added

    Scenario: audiototext resizing events are triggered
        Given I am a user loading audiototext
        When I load audiototext and change screen size
        Then the window change event is fired