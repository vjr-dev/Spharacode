Feature: DialDelay

    Scenario: User navigates to DialDelay
        Given I am a User loading DialDelay
        When I navigate to the DialDelay
        Then DialDelay will load with out errors
        Then Handle back button press
        Then Handle the set button press