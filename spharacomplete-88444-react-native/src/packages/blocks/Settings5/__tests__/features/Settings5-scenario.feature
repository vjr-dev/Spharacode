Feature: Settings5

    Scenario: User navigates to Settings5
        Given I am a User loading Settings5
        When I navigate to the Settings5
        Then Settings5 will load with out errors
        And I can click goBack button with out error
        And display Global flatlist data
        And display emergencyApp flatlist data
        And display globalApp flatlist data
        And getListId request response successfully
        And getListId request response error
        And LogoutapiId request response successfully
        And LogoutapiId request response error
        And I can leave the screen with out errors