Feature: SearchHistory

Scenario: User navigates to SearchHistory
    Given I am a User loading SearchHistory
    Then I can see recent search list
    When I enter any text and submit button
    Then I should see updated list
    When I click delete search list button
    Then I should see updated recent list
