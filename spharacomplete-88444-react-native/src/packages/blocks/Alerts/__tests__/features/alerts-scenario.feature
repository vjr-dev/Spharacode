Feature: Alerts

    Scenario: User navigates to Alerts Screen
        Given I am a User getting alerts
        When I navigate to the Alerts Screen
        Then I can press back button
        Then I can press details button