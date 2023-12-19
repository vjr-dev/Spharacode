Feature: PermissionScreen

    Scenario: User navigates to PermissionScreen
        Given I am a User loading PermissionScreen
        When I navigate to the PermissionScreen
        Then I can give the location permission
        And I can give the phone permission
        And I can give the contacts permission
        And I can give the storage permission
        And I can give the camera permission
        And I can give the microphone permission
        And I can give the app setting permission
        And If user press allow button with all permission then user can navigate to MedicalScreen
        And I can remove the location permission
        And I can remove the phone permission
        And I can remove the contacts permission
        And I can remove the storage permission
        And I can remove the camera permission
        And I can remove the microphone permission
        And I can remove the app setting permission
        And If user press allow button without give permission then error pop up will show
        And I can not go back, on back press logout pop up will show