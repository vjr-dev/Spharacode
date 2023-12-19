Feature: LoginScreen

    Scenario: User navigates to LoginScreen
        Given I am a User loading LoginScreen
        When I navigate to the LoginScreen
        Then LoginScreen will load with out errors
        And I can click Cmodal Button with out error
        And I can enter text with out error
        And I can click goSignup Button with out error
        And I can click verificationgo Button with out error
        And I can click countrypicker Button with out error
        And I can mock checkPermissions with out error
        And I can mock checkPermissions else with out error
        And I can mock getPermission with out error
        And I can mock getPermission else part with out error
        And should set Latitude and Longitude in state
        And get apiEmailLoginCallId response successfully
        And should handle varificationgo
        And I can mock getFcmToken with error
        And I can leave the screen with out errors