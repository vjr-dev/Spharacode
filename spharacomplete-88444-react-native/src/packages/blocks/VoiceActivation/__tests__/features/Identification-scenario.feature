Feature: VoiceActivation

    Scenario: User navigates to VoiceActivation
        Given I am a User loading VoiceActivation
        When I navigate to the VoiceActivation
        Then VoiceActivation will load with out errors
        And I can leave the screen with out errors