Feature: EditSecuritySetting

    Scenario: User navigates to EditSecuritySetting screen
        Given I am a User attempting to EditSecuritySetting Screen
        When I navigate to the EditSecuritySetting Screen
        Then I can dismiss the keyboard
        Then I can press back button
        Then I can enter the email
        Then I can enter the confirm email
        Then I can press next button with same email and confirm email
        Then I can not press next button with email and with out confirm email
        Then I can not press next button with out email and with confirm email
        Then I can not press next button with out validate email
        Then I can not press next button with out same email and confirm email
        Then I can successfully leave the screen