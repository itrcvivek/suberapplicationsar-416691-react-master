Feature: uploadmedia3

    Scenario: User can input text into uploadmedia3
        Given I am a user loading uploadmedia3
        When I navigate to the uploadmedia3
        Then uploadmedia3 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading uploadmedia3
        When I navigate to the uploadmedia3
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from uploadmedia3
        Given I am a user loading uploadmedia3
        When I navigate to the uploadmedia3
        Then uploadmedia3 will load with out errors
        And I can dismiss uploadmedia3

    Scenario: uploadmedia3 has event listeners for screen size changes added
        Given I am a user loading uploadmedia3
        When I load uploadmedia3
        Then the dimensions function has an event listener added

    Scenario: uploadmedia3 resizing events are triggered
        Given I am a user loading uploadmedia3
        When I load uploadmedia3 and change screen size
        Then the window change event is fired