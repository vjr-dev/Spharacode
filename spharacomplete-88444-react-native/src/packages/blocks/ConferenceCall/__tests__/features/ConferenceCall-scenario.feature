Feature: ConferenceCall

    Scenario: User navigates to ConferenceCall
        Given I am a User loading ConferenceCall
        When I navigate to the ConferenceCall
        Then ConferenceCall will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors