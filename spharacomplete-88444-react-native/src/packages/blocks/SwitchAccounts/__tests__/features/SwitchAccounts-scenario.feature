Feature: SwitchAccounts

    Scenario: User navigates to SwitchAccounts
        Given I am a User loading SwitchAccounts
        When I navigate to the SwitchAccounts
        Then SwitchAccounts will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors