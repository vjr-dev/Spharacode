Feature: Authentication Screen

    Scenario: User navigates to Authentication Screen
        Given I am a User attempting to Authentication with otp
        When I navigate to the Authentication
        Then I can add OTP without error
        Then I can navigate to register success screen if i press confirm
        Then I can logout if I press back button and confirm