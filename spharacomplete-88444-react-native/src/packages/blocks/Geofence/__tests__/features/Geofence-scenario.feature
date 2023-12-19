Feature: Geofence

    Scenario: User navigates to Geofence
        Given I am a User loading Geofence
        When I navigate to the Geofence
        Then Geofence will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors