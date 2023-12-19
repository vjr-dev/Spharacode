Feature: PanicScreen

    Scenario: User navigates to PanicScreen
        Given I am a User loading PanicScreen
        When I navigate to the PanicScreen
        Then PanicScreen will load with out errors
        Then ProfileGetId request response successfully
        Then I can select the button with with out errors
        Then I can select Text input box without errors
        Then I can click on button to upload images without error
        Then should update the state with the selected image data
        Then I can click countdown button without error
        Then I can click sentAlert button without error
        Then I can mock checkPermissions with out error
        Then I can mock checkPermissions else with out error
        Then should set Latitude and Longitude in state
        Then should handle the error if the location cannot be obtained
        Then should able to call countdown
        Then hit post data successfully
        Then hit distance get api successfully
        Then should call OnPanicAgain with 25 when IsNotify is not true and callCount is 0
        Then I can leave the screen with out errors
