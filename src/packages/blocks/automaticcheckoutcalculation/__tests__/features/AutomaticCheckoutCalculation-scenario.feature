Feature: AutomaticCheckoutCalculation

    Scenario: User navigates to AutomaticCheckoutCalculation
        Given I am a User loading AutomaticCheckoutCalculation
        When I navigate to the AutomaticCheckoutCalculation
        And I can render the flatlist and click on minus button for 1 item
        Then I can see quantity is decresing
        When I click on Increase  btn Icon
        Then I can see quantity is increasing
        When I came again on the AutomaticCheckoutCalculation page
        Then I can see network api calling