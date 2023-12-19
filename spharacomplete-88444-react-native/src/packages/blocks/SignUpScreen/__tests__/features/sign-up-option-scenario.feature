Feature: SignUpOption

    Scenario: User navigates to Signup Option screen
        Given I am a User attempting to navigate Signup Option Screen
        When I navigate to the Signup Option Screen
        Then I can fetch role data with out error
        Then I can navigate to sigup screen as a First Responder
        Then I can navigate to sigup screen as a Civilian
        Then I can show the pop up if fetch data with error