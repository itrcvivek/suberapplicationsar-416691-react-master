Feature: audiototext

    Scenario: User navigates to audiototext and inputs text
        Given I am a User loading audiototext
        When I navigate to the audiototext
        Then audiototext will load with out errors

        When I click on start record button without error
        Then Audio recording is start without error

        When I click on start record button with error
        Then Audio recording is start with error

        When I click on stop recording button
        Then Audio recording is stop

