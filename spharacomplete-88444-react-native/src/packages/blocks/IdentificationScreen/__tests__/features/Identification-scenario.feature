Feature: Identification

    Scenario: User navigates to Identification
        Given I am a User loading Identification
        When I navigate to the Identification
        Then Identification will load with out errors
        And I can leave the screen with out errors