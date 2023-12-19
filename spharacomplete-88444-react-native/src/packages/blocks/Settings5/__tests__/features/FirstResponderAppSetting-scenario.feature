Feature: FirstResponderAppSetting

    Scenario: User navigates to FirstResponderAppSetting
        Given I am a User loading FirstResponderAppSetting
        When I navigate to the FirstResponderAppSetting
        Then FirstResponderAppSetting will load with out errors
        And I can click goBack button with out error
        And display Global flatlist data
        And I can click on button to navigate to SecuritySetting screen
