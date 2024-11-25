Feature: cfspeedtrackingforthedriver

    Scenario: User can input text into cfspeedtrackingforthedriver
        Given I am a user loading cfspeedtrackingforthedriver
        When I navigate to the cfspeedtrackingforthedriver
        Then cfspeedtrackingforthedriver will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfspeedtrackingforthedriver
        When I navigate to the cfspeedtrackingforthedriver
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfspeedtrackingforthedriver
        Given I am a user loading cfspeedtrackingforthedriver
        When I navigate to the cfspeedtrackingforthedriver
        Then cfspeedtrackingforthedriver will load with out errors
        And I can dismiss cfspeedtrackingforthedriver

    Scenario: cfspeedtrackingforthedriver has event listeners for screen size changes added
        Given I am a user loading cfspeedtrackingforthedriver
        When I load cfspeedtrackingforthedriver
        Then the dimensions function has an event listener added

    Scenario: cfspeedtrackingforthedriver resizing events are triggered
        Given I am a user loading cfspeedtrackingforthedriver
        When I load cfspeedtrackingforthedriver and change screen size
        Then the window change event is fired