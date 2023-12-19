Feature: FirstResponderProfile

    Scenario: User navigates to First Responder Profile 
        Given I am a User loading First Responder Profile  
        When I navigate to the First Responder Profile  
        Then I can fetch the profile details with out error
        Then I can navigate to edit Profile screen
        Then I can navigate to change phone number screen
        Then I can navigate to update credential screen