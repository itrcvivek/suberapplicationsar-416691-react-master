Feature: ImportExportData

    Scenario: User exports JSON file
        Given I am a User loading ImportExportData
        When I navigate to the ImportExportData
        Then ImportExportData will load with out errors
        When I press the export JSON button
        Then a request should be sent to download the JSON
        When a response is received containing the requested JSON
        Then a JSON file should be created on the user's device
        Then I can leave the screen with out errors

    Scenario: User exports CSV file
        Given I am a User loading ImportExportData
        When I navigate to the ImportExportData
        Then ImportExportData will load with out errors
        When I press the export CSV button
        Then a request should be sent to download the CSV
        When a response is received containing the requested CSV
        Then a CSV file should be created on the user's device
        Then I can leave the screen with out errors

    Scenario: CSV API call returns an error
        Given I am a User loading ImportExportData
        When I navigate to the ImportExportData
        Then ImportExportData will load with out errors
        When I press the export CSV button
        Then a request should be sent to download the CSV
        When a response is received containing the an error response
        Then an alert should shown with the correct error message
        Then I can leave the screen with out errors