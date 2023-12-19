Feature: SecuritySetting

    Scenario: User navigates to SecuritySetting screen
        Given I am a User attempting to SecuritySetting Screen
        When I navigate to the SecuritySetting Screen
        Then I can press back button
        Then I can turn on or off two step verifications
        Then I can edit passcode
        Then I can edit email
        Then I can accept two step verification on modal
        Then I can decline two step verification on modal
        