Feature: ChatDashboard

    Scenario: User navigates to ChatDashboard
        Given I am a User loading ChatDashboard
        When I navigate to the ChatDashboard
        Then ChatDashboard will load with out errors
        And I can  click button with out errors
        And I can  click second button with out errors
        And I can leave the screen with out errors