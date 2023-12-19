Feature: RegistrationSuccessScreen

    Scenario: User navigates to Registration Screen
        Given I am a User loading Registration Screen
        When I navigate to the Registration Screen
        Then I can navigate to permission screen
        Then I can unmount screen without error
        