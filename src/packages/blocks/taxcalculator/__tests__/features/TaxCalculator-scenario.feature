Feature: TaxCalculator

    Scenario: User navigates to TaxCalculator
        Given I am a User loading TaxCalculator
        When I navigate to the TaxCalculator
        Then TaxCalculator will load with out errors
        And I can select the button with with out errors
        And I can fetch country list without error
        And I can fetch product type list without error
        And I can fetch data with error
        And I can select country with out errors
        And I can enter price text with out errors
        And I can enter price text with errors
        And I can select product type with out errors
        And I can enter product name text with out errors
        And I can select product name with errors
        And I can fetch tax with out errors
        And I can fetch tax with errors
        And I can leave the screen with out errors