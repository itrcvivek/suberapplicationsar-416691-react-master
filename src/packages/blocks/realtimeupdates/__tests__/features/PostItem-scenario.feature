Feature: PostItem

    Scenario: User navigates to PostItem
        Given I am a User loading PostItem
        When I navigate to the PostItem
        Then PostItem will load with out errors
        And I can enter text with out errors
        And I can select the like button with out errors
        And I can leave the screen with out errors