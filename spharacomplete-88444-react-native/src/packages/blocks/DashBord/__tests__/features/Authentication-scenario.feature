Feature:  Authentication

    Scenario: User navigates to Authentication
        Given I am a User loading Authentication
        When I navigate to the Authentication
        Then Authentication will load with out errors
        And  I can click goback button with out error
        And I can enter text with out error
        And I can click otpCheckbtn with out error
        And request response successfully
        And request response error
        And I can ckeck  optcheck with out error
        And I can mock checkPermissions with out error
        And I can mock checkPermissions else with out error
        And I can leave the screen with out errors