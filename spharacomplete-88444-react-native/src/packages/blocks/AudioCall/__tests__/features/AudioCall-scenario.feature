Feature: AudioCall

    Scenario: User navigates to AudioCall
        Given I am a User loading AudioCall
        When I navigate to the AudioCall
        Then AudioCall will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors