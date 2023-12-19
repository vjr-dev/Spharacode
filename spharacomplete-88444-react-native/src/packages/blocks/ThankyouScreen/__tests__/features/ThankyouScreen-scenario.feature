Feature: ThankyouScreen

    Scenario: User navigates to ThankyouScreen
        Given I am a User loading ThankyouScreen
        When I navigate to the ThankyouScreen
        Then ThankyouScreen will load with out errors
        Then Handle onClick button press
        Then User can check authentication code popup if user is first responder
        Then User can close authentication code popup if user click outside
        Then I can unmount screen without error
        