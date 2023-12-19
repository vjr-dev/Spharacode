Feature: VoiceActivation

    Scenario: User navigates to VoiceActivation
        Given I am a User loading VoiceActivation
        When I navigate to the VoiceActivation
        Then VoiceActivation will load with out errors
        And I can select the start voice button with with out errors
        And I can select the goback button with with out errors
        And I can select the activate button with with out errors
        And Display the code list without error
        And I can select the button with with out errors
        And I can leave the screen with out errors