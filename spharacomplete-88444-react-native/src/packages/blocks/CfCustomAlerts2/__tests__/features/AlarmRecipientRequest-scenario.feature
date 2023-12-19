Feature: AlarmRecipientRequest
    
   Scenario: User navigates to Alarm Recipient Request screen as a first responder
    Given I am a User loadingAlarm Recipient Request screen
    When I navigate to the Alarm Recipient Request screen
    Then I can check the distance preview if I prees distance preview text
    Then I can go to reject alert screen if reject the alert
    Then I can go to map screen if accept the fire alert
    Then I can go to map screen if accept the ambulance alert
    Then I can go to map screen if accept the emergency assistance alert
    Then I can go to map screen if accept the panic alert
    Then I can close the distance preview if I press close icon on preview

  Scenario: User navigates to Alarm Recipient Request screen as a civilian
    Given I am a User loadingAlarm Recipient Request screen
    When I navigate to the Alarm Recipient Request screen
    Then I can go back if reject the alert
    Then I can see the distance text
    Then I can go to location map screen if accept the fire alert