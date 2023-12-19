Feature: RejectAlert
    
   Scenario: User navigates to Reject Alert screen
    Given I am a User loading Reject Alert screen
    When I navigate to the Reject Alert screen
    Then I can fetch option of cancellation
    Then I can select the reason of cancellation
    Then I can enter my customise reason if I select other option from dropdown
    Then I can see error message if I select other option but do not add reason and press send button
    Then I can reject ambulance alert if I enter proper details
    Then I can reject fire alert if I enter proper details
    Then I can reject emergency incident alert if I enter proper details
     Then I can reject panic alert if I enter proper details
    Then I can see error message if I send the report without adding reason
