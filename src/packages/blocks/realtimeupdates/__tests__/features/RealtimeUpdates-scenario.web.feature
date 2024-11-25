Feature: RealtimeUpdates

    Scenario: User navigates to RealtimeUpdates
        Given I am a User loading RealtimeUpdates
        When I navigate to the RealtimeUpdates
        Then RealtimeUpdates will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And Network response from adding new comment
        And Network response from comment api with error
        And I can leave the screen with out errors