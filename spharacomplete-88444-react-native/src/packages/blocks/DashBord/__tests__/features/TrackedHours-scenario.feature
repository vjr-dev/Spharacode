Feature: TrackedHours
    
   Scenario: User navigates to Tracked Hours screen
    Given I am a User loading Tracked Hours screen
    When I navigate to the Tracked Hours screen
    Then I can fetch data with out error
    Then I can not fetch data with out error
