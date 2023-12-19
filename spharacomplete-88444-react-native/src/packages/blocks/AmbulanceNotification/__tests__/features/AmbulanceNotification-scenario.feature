Feature: AmbulanceNotification

    Scenario: User navigates to AmbulanceNotification
        Given I am a User loading AmbulanceNotification
        When I navigate to the AmbulanceNotification
        Then AmbulanceNotification will load with out errors
        And I can click button with out errors
        And I can add array with out error
        And I can add array with null and undefined value
        And I can click done button with out errors
        And request response FirstapiID successfully
        And request response FirstapiID error
        And request response AmbulaceID successfully
        And request response AmbulaceID error
        And I can navigate to goback  with out errors
        And I can leave the screen with out errors

  