Feature: PostItem

    Scenario: User navigates to PostItem web
        Given I am a User loading PostItem web
        When I navigate to the PostItem web
        Then PostItem web will load with out errors
        And I can enter text with out errors
        And I can select the like button with out errors
        And I can leave the screen with out errors