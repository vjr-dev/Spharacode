Feature: NewPhoneNumberVerification Screen

    Scenario: User navigates to new phone number verification Screen
        Given I am a User attempting to verify new phone number with otp
        When I navigate to the new phone number verification Screen
        Then I can go back if i clicked back button
        Then I can add OTP without error
        Then I can not verify number without OTP entered
        Then I can verify number with correct OTP
        Then I can see the api error if any