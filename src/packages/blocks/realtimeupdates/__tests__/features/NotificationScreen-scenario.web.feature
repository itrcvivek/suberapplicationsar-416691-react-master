Feature: NotificationScreen

    Scenario: User navigates to NotificationScreen web
        Given I am a User loading NotificationScreen web
        When I navigate to the NotificationScreen web
        Then NotificationScreen web will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors