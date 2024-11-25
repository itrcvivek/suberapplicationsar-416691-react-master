Feature: RequestManagement

    Scenario: User navigates to RequestManagement
        Given I am a User loading RequestManagement
        When I navigate to the RequestManagement
        Then RequestManagement will load with out errors
        Then Get token function shoudl be called
        Then Get received request api should be called in first render
        When Network responed for received request api
        Then ReceivedRequests state should be update
        When User click on accept button to accept request
        Then Accept request review api should be call
        Then Network responed for accept request review api
        When User click on reject button
        Then User enter reason to reject
        Then User submit request review to reject
        Then User click on cancel button to close modal
        Then Network responed for reject request review api
        When User enter request id in input field to filter
        Then Input field value should be update
        When User press on view button to view request
        Then View request modal should be opened
        When User press on sent request button to navigate
        Then Navigation should be call