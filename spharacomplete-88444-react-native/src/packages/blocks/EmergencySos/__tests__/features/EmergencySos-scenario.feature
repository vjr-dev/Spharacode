Feature: EmergencySos

    Scenario: User navigates to EmergencySos
        Given I am a User loading EmergencySos
        When I navigate to the EmergencySos
        Then EmergencySos will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors