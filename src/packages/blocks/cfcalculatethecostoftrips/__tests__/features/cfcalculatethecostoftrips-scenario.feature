Feature: cfcalculatethecostoftrips

    Scenario: User can input text into cfcalculatethecostoftrips
        Given I am a user loading cfcalculatethecostoftrips
        When I navigate to the cfcalculatethecostoftrips
        Then cfcalculatethecostoftrips will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfcalculatethecostoftrips
        When I navigate to the cfcalculatethecostoftrips
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfcalculatethecostoftrips
        Given I am a user loading cfcalculatethecostoftrips
        When I navigate to the cfcalculatethecostoftrips
        Then cfcalculatethecostoftrips will load with out errors
        And I can dismiss cfcalculatethecostoftrips

    Scenario: cfcalculatethecostoftrips has event listeners for screen size changes added
        Given I am a user loading cfcalculatethecostoftrips
        When I load cfcalculatethecostoftrips
        Then the dimensions function has an event listener added

    Scenario: cfcalculatethecostoftrips resizing events are triggered
        Given I am a user loading cfcalculatethecostoftrips
        When I load cfcalculatethecostoftrips and change screen size
        Then the window change event is fired