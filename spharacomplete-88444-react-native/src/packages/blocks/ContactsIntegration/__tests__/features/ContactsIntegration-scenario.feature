Feature: ContactsIntegration

    Scenario: User navigates to ContactsIntegration
        Given I am a User loading ContactsIntegration
        When I navigate to the ContactsIntegration
        Then ContactsIntegration will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors