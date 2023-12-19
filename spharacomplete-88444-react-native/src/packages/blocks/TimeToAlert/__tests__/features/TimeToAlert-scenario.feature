Feature: TimeToAlert

    Scenario: User navigates to TimeToAlert
        Given I am a User loading TimeToAlert
        When I navigate to the TimeToAlert
        Then TimeToAlert will load with out errors
        And I can click hour array button with out error
        And I can click minute array button with out error
        And I can click sec array button with out error
        And I can click circle Timer array button with out error
        And I can click cancle button with out error
        And I can click start click button with out error
        And I can click pause button with out error
        And I can press countdownBtn button with out error
        And I can press yes button with out error
        And I can press no button with out error
        And I can press timeruning and cancle button with out error
        And I can press cancle call button with out error
        And I can mock checkPermissions with out error
        And I can mock checkPermissions else with out error
        And should set Latitude and Longitude in state
        And should handle the error if the location cannot be obtained
        And get ProfileGetId response successfully
        And get PanicAgainId response successfully
        And get FiredataID response successfully
        And I can leave the screen with out errors