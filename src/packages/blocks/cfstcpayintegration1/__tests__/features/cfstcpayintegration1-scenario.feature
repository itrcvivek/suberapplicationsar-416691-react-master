Feature: cfstcpayintegration1

    Scenario: User can input text into cfstcpayintegration1
        Given I am a user loading cfstcpayintegration1
        When I navigate to the cfstcpayintegration1
        Then cfstcpayintegration1 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading cfstcpayintegration1
        When I navigate to the cfstcpayintegration1
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from cfstcpayintegration1
        Given I am a user loading cfstcpayintegration1
        When I navigate to the cfstcpayintegration1
        Then cfstcpayintegration1 will load with out errors
        And I can dismiss cfstcpayintegration1

    Scenario: cfstcpayintegration1 has event listeners for screen size changes added
        Given I am a user loading cfstcpayintegration1
        When I load cfstcpayintegration1
        Then the dimensions function has an event listener added

    Scenario: cfstcpayintegration1 resizing events are triggered
        Given I am a user loading cfstcpayintegration1
        When I load cfstcpayintegration1 and change screen size
        Then the window change event is fired