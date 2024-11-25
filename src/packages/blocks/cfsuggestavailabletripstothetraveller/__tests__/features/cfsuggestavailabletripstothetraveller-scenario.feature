Feature: cfsuggestavailabletripstothetraveller

    Scenario: User can input text into cfsuggestavailabletripstothetraveller
        Given I am a user loading cfsuggestavailabletripstothetraveller
        When I navigate to the cfsuggestavailabletripstothetraveller
        Then cfsuggestavailabletripstothetraveller will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfsuggestavailabletripstothetraveller
        When I navigate to the cfsuggestavailabletripstothetraveller
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfsuggestavailabletripstothetraveller
        Given I am a user loading cfsuggestavailabletripstothetraveller
        When I navigate to the cfsuggestavailabletripstothetraveller
        Then cfsuggestavailabletripstothetraveller will load with out errors
        And I can dismiss cfsuggestavailabletripstothetraveller

    Scenario: cfsuggestavailabletripstothetraveller has event listeners for screen size changes added
        Given I am a user loading cfsuggestavailabletripstothetraveller
        When I load cfsuggestavailabletripstothetraveller
        Then the dimensions function has an event listener added

    Scenario: cfsuggestavailabletripstothetraveller resizing events are triggered
        Given I am a user loading cfsuggestavailabletripstothetraveller
        When I load cfsuggestavailabletripstothetraveller and change screen size
        Then the window change event is fired