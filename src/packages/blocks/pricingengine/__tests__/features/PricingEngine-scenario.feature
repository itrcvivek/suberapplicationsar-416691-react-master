Feature: PricingEngine

    Scenario: User navigates to PricingEngine
        Given I am a User loading PricingEngine
        When I navigate to the PricingEngine
        Then PricingEngine will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors