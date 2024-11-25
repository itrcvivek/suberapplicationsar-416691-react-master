Feature: cfcaptaintocreatetrips

    Scenario: User can input text into cfcaptaintocreatetrips
        Given I am a user loading cfcaptaintocreatetrips
        When I navigate to the cfcaptaintocreatetrips
        Then cfcaptaintocreatetrips will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfcaptaintocreatetrips
        When I navigate to the cfcaptaintocreatetrips
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfcaptaintocreatetrips
        Given I am a user loading cfcaptaintocreatetrips
        When I navigate to the cfcaptaintocreatetrips
        Then cfcaptaintocreatetrips will load with out errors
        And I can dismiss cfcaptaintocreatetrips

    Scenario: cfcaptaintocreatetrips has event listeners for screen size changes added
        Given I am a user loading cfcaptaintocreatetrips
        When I load cfcaptaintocreatetrips
        Then the dimensions function has an event listener added

    Scenario: cfcaptaintocreatetrips resizing events are triggered
        Given I am a user loading cfcaptaintocreatetrips
        When I load cfcaptaintocreatetrips and change screen size
        Then the window change event is fired