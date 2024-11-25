Feature: NotificationScreen

    Scenario: User navigates to NotificationScreen
        Given I am a User loading NotificationScreen
        When I navigate to the NotificationScreen
        Then NotificationScreen will load with out errors
        And I can select the hide keyboard button with out errors
        And Notification api is called
        And Notification error api is called
        And I can leave the screen with out errors