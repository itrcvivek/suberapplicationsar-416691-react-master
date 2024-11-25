Feature: TaxCalculator

    Scenario: Navigates to TaxCalculator
        Given User loading TaxCalculator
        When Navigate to the TaxCalculator
        Then TaxCalculator will load with out errors
        And Fetch country list without error
        And Fetch product type list without error
        And Fetch data with error
        And Select country with out errors
        And Enter price text with out errors
        And Enter price text with errors
        And Select product type with out errors
        And Enter product name text with out errors
        And Select product name with errors
        And Fetch tax with out errors
        And Fetch tax with errors
        And Leave the screen with out errors