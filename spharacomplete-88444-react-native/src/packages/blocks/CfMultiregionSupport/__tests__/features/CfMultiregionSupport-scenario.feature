Feature: CfMultiregionSupport

    Scenario: User navigates to CfMultiregionSupport
        Given I am a User loading CfMultiregionSupport
        When I navigate to the CfMultiregionSupport
        Then CfMultiregionSupport will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors