Feature: MedicalScreen

    Scenario: User navigates to MedicalScreen
        Given I am a User loading MedicalScreen
        When I navigate to the MedicalScreen
        Then MedicalScreen will load with out errors
        And I can leave the screen with out errors