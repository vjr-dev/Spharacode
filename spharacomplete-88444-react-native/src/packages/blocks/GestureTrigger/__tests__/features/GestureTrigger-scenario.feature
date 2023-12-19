Feature: GestureTrigger

    Scenario: User navigates to GestureTrigger
        Given I am a User loading GestureTrigger
        When I navigate to the GestureTrigger
        Then GestureTrigger will load with out errors
        And I can click goback button with out error
        And I can click switch button with out error
        And I can click m2close button with out error
        And request response SetsettingID successfully
        And request response SetsettingID error
        And I can mock sahck with out error
        And I can mock switch22 with out error
        And I can leave the screen with out errors