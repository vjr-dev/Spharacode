Feature: PrivateChat

    Scenario: User navigates to PrivateChat
        Given I am a User loading PrivateChat
        When I navigate to the PrivateChat
        Then PrivateChat will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors