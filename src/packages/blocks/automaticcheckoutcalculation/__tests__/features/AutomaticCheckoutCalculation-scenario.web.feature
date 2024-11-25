Feature: AutomaticCheckoutCalculation

    Scenario: User navigates to AutomaticCheckoutCalculation
        Given I am a User loading AutomaticCheckoutCalculation
        When I navigate to the AutomaticCheckoutCalculation
        And I can select the buttons with with out errors
        Then I can decrease counter display minusIcon
        Then I can increase counter display plusIcon