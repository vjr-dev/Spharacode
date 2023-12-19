Feature: UpdateSecuritySetting

    Scenario: User navigates to UpdateSecuritySetting screen
        Given I am a User attempting to UpdateSecuritySetting Screen
        When I navigate to the UpdateSecuritySetting Screen
        Then I can dismiss the keyboard
        Then I can press back button
        Then I can enter the passcode
        Then I can enter the confirm passcode
        Then I can press next button with same passcode and confirm passcode
        Then I can not press next button with passcode and with out confirm passcode
        Then I can not press next button with out passcode and with confirm passcode
        Then I can not press next button if passcode and confirm passcode not match
        Then I can not press next button if passcode length less than 8 and confirm passcode length 8
        Then I can not press next button if confirm passcode length less than 8 and passcode length 8
        Then I can successfully leave the screen