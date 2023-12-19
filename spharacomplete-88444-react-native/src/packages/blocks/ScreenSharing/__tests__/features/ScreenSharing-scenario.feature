Feature: ScreenSharing

    Scenario: User navigates to ScreenSharing
        Given I am a User loading ScreenSharing
        When I navigate to the ScreenSharing
        Then ScreenSharing will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors