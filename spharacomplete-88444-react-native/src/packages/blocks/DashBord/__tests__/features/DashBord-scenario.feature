Feature: DashBord

    Scenario: User navigates to DashBord
        Given I am a User loading DashBord
        When I navigate to the DashBord
        Then DashBord will load with out errors
        And I can navigate to toggledrawer with out errror
        And I can tempclick with out errror
        And renders correctly when ModalShow is true
        And should handle volumeEvents correctly
        And should handle volumeEventFunction correctly
        And I can open modal btn with out errror
        And emergencyscreenV condition true
        And I can press emergency screen with out errror
        And I can press isEmergencyScreenV with out errror
        And I can press emergencybtn with out error
        And I can press ambulanceBtn with out error
        And GetVolunteerID request response successfully
        And GetPercentage request response successfully
        And getList request response successfully
        And getList request response error
        And I can mock checkPermissions with out error
        And I can mock checkPermissions else with out error
        And I can mock getPermission with out error
        And I can mock getPermission else part with out error
        And should set Latitude and Longitude in state
        And should handle the error if the location cannot be obtained
        And I can mock VolumeEvents with out error
        And Should create new sound object
        And I can mock onlayout with out error
        And I can leave the screen with out errors
   
   
   