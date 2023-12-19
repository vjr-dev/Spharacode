Feature: ProfileChat

    Scenario: User navigates to ProfileChat
        Given I am a User loading ProfileChat
        When I navigate to the ProfileChat
        Then ProfileChat will load with out errors
        And I can leave the screen with out errors