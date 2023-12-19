Feature: Maps

    Scenario: User navigates to Maps
        Given I am a User loading Maps
        When I navigate to the Maps
        Then Maps will load with out errors
        And I can click userLocation button with out error
        And I can click openUrl button with out error
        And I can click switch button with out error
        And I can click modalvisble button with out error
        And I can click payment button with out error
        And I can click paymentViewfn button with out error
        And I can click paymentViewfn else with out error
        And I can click onpay button with out error
        And should set Latitude and Longitude in state
        And SwitchCasesId request response successfully
        And SwitchCasesId request response error
        And PlanId request response successfully
        And I can leave the screen with out errors