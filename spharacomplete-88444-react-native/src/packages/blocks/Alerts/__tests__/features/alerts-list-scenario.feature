Feature: Alerts List

    Scenario: User navigates to Alerts List Screen
        Given I am a User getting alerts list
        When I navigate to the Alerts List Screen
        Then I can press back button
        Then Get alert history with out errors
        Then Get alert history with errors
        Then I can press on alert
        