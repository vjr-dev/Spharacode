Feature: SignUpScreen

    Scenario: User navigates to SignUp screen
        Given I am a User attempting to navigate SignUp Screen
        When I navigate to the SignUp Screen
        Then I can navigate back if I press back button
        Then 'Welcome to Sphara' text display as title if I'm first responder
        Then 'Sign Up' text display as title if I'm civilian
        Then 'Provide your work phone number which you were enrolled at your work. So we can be able to send you confirmation as authentication code' text display as label if I'm first responder
        Then 'Provide your phone number so we can be able to send you confirmation code' text display as label if I'm civilian
        Then I can pick the Country Code
        Then I can enter the phone number
        Then I can navigate to log in screen
        Then I can not continue without phone number
        Then I can signup and navigate to verification screen if I add correct details
        Then I can see error message if getting from signup API