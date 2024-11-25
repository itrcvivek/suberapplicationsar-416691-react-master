Feature: Maps

    Scenario: User navigates to Maps
        Given I am a User loading Maps
        When I navigate to the Maps
        Then Maps will load with out errors
        And I can leave the screen with out errors