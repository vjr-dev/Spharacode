Feature: Verificatiion Screen

    Scenario: User navigates to Verification Screen From SIGIN
        Given I am a User attempting to verification with otp
        When I navigate to the Verification
        Then I can go back if I press back button
        Then I can not submit form without OTP enter
        Then I can see the error message if getting from api
        Then I'm first responder I can navigate to thank you screen if I entered correct OTP
        Then I'm civilian I can navigate to thank you screen if I entered correct OTP

     Scenario: User navigates to Verification Screen From Login as First Responder
        Given I am a User attempting to verification with otp
        When I navigate to the Verification as first responder
        Then I should be navigate to authentication screen if my authentication pending
        Then I should be navigate to personal information screen if my personal information pending
        Then I should be navigate to credential screen if I didn't uploade credential
        Then I should be navigate to first responder home page if I completed account

    Scenario: User navigates to Verification Screen From Login as civilian
        Given I am a User attempting to verification with otp
        When I navigate to the Verification as civilian
        Then I should be navigate to personal information screen if my personal information pending
        Then I should be navigate to add emergency contact screen if I didn't add any emergency contact number
        Then I should be navigate to civilian home page if I completed account